import { generateKlingJWT, parseApiKey } from '../lib/kling-auth';

describe('parseApiKey', () => {
  it('splits on first colon only', () => {
    const { accessKeyId, accessKeySecret } = parseApiKey('myid:mysecret');
    expect(accessKeyId).toBe('myid');
    expect(accessKeySecret).toBe('mysecret');
  });

  it('handles secret containing colons', () => {
    const { accessKeyId, accessKeySecret } = parseApiKey('myid:sec:ret:extra');
    expect(accessKeyId).toBe('myid');
    expect(accessKeySecret).toBe('sec:ret:extra');
  });

  it('throws if no colon present', () => {
    expect(() => parseApiKey('nocolonkey')).toThrow(
      'Kling API key must be in format accessKeyId:accessKeySecret'
    );
  });

  it('throws on empty string', () => {
    expect(() => parseApiKey('')).toThrow();
  });

  it('throws if accessKeyId is empty (:secret)', () => {
    expect(() => parseApiKey(':mysecret')).toThrow();
  });

  it('throws if accessKeySecret is empty (id:)', () => {
    expect(() => parseApiKey('myid:')).toThrow();
  });
});

describe('generateKlingJWT', () => {
  it('returns a 3-part dot-separated string', () => {
    const token = generateKlingJWT('myid', 'mysecret');
    expect(token.split('.')).toHaveLength(3);
  });

  it('header decodes to alg:HS256, typ:JWT', () => {
    const token = generateKlingJWT('myid', 'mysecret');
    const header = JSON.parse(Buffer.from(token.split('.')[0], 'base64url').toString());
    expect(header.alg).toBe('HS256');
    expect(header.typ).toBe('JWT');
  });

  it('payload iss equals accessKeyId', () => {
    const token = generateKlingJWT('test-access-key', 'test-secret');
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString());
    expect(payload.iss).toBe('test-access-key');
  });

  it('payload exp is in the future', () => {
    const token = generateKlingJWT('myid', 'mysecret');
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString());
    expect(payload.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
  });

  it('payload nbf is in the past or present', () => {
    const token = generateKlingJWT('myid', 'mysecret');
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString());
    expect(payload.nbf).toBeLessThanOrEqual(Math.floor(Date.now() / 1000));
  });

  it('different secrets produce different signatures', () => {
    const t1 = generateKlingJWT('id', 'secret-a');
    const t2 = generateKlingJWT('id', 'secret-b');
    expect(t1.split('.')[2]).not.toBe(t2.split('.')[2]);
  });

  it('throws if accessKeySecret is empty', () => {
    expect(() => generateKlingJWT('myid', '')).toThrow();
  });
});
