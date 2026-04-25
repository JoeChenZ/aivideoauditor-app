import { providerFor, modelUsesMode } from '../lib/providers';

describe('providerFor', () => {
  it('returns kling for kling-v1', () => {
    expect(providerFor('kling-v1')).toBe('kling');
  });
  it('returns kling for kling-v1-5', () => {
    expect(providerFor('kling-v1-5')).toBe('kling');
  });
  it('returns runway for runway-gen4', () => {
    expect(providerFor('runway-gen4')).toBe('runway');
  });
  it('returns seedance for seedance-1-lite', () => {
    expect(providerFor('seedance-1-lite')).toBe('seedance');
  });
  it('returns seedance for seedance-1-pro', () => {
    expect(providerFor('seedance-1-pro')).toBe('seedance');
  });
});

describe('modelUsesMode', () => {
  it('returns true for kling-v1', () => {
    expect(modelUsesMode('kling-v1')).toBe(true);
  });
  it('returns true for kling-v1-5', () => {
    expect(modelUsesMode('kling-v1-5')).toBe(true);
  });
  it('returns false for runway-gen4', () => {
    expect(modelUsesMode('runway-gen4')).toBe(false);
  });
  it('returns false for seedance-1-lite', () => {
    expect(modelUsesMode('seedance-1-lite')).toBe(false);
  });
  it('returns false for seedance-1-pro', () => {
    expect(modelUsesMode('seedance-1-pro')).toBe(false);
  });
});
