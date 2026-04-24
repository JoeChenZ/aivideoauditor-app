const mockFetch = jest.fn();
global.fetch = mockFetch as typeof fetch;

import { checkVendorHealth } from '../lib/vendor-health';

beforeEach(() => {
  mockFetch.mockReset();
});

describe('checkVendorHealth', () => {
  it('returns up=true and latency when vendor responds with 200', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200 });
    const result = await checkVendorHealth('https://api.klingai.com', 5000);
    expect(result.up).toBe(true);
    expect(typeof result.latencyMs).toBe('number');
    expect(result.latencyMs).toBeGreaterThanOrEqual(0);
  });

  it('returns up=true even when vendor returns 401 (server is reachable)', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 401 });
    const result = await checkVendorHealth('https://api.klingai.com', 5000);
    expect(result.up).toBe(true);
  });

  it('returns up=false when fetch throws network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    const result = await checkVendorHealth('https://api.klingai.com', 5000);
    expect(result.up).toBe(false);
    expect(result.latencyMs).toBeUndefined();
  });

  it('returns up=false on AbortError (timeout)', async () => {
    const abortError = new DOMException('aborted', 'AbortError');
    mockFetch.mockRejectedValueOnce(abortError);
    const result = await checkVendorHealth('https://api.klingai.com', 5000);
    expect(result.up).toBe(false);
  });

  it('includes error message when up=false', async () => {
    mockFetch.mockRejectedValueOnce(new Error('ECONNREFUSED'));
    const result = await checkVendorHealth('https://api.klingai.com', 5000);
    expect(result.error).toBeDefined();
    expect(typeof result.error).toBe('string');
  });
});
