import { calculateCost, PRICING } from '../lib/cost';
import type { GenerationSettings } from '../lib/cost';

describe('calculateCost', () => {
  it('kling-v1 std 5s = $0.07', () => {
    expect(calculateCost({ model: 'kling-v1', mode: 'std', duration: 5 })).toBe(0.07);
  });

  it('kling-v1 std 10s = $0.14', () => {
    expect(calculateCost({ model: 'kling-v1', mode: 'std', duration: 10 })).toBe(0.14);
  });

  it('kling-v1 pro 5s = $0.14', () => {
    expect(calculateCost({ model: 'kling-v1', mode: 'pro', duration: 5 })).toBe(0.14);
  });

  it('kling-v1 pro 10s = $0.28', () => {
    expect(calculateCost({ model: 'kling-v1', mode: 'pro', duration: 10 })).toBe(0.28);
  });

  it('kling-v1-5 std 5s = $0.14', () => {
    expect(calculateCost({ model: 'kling-v1-5', mode: 'std', duration: 5 })).toBe(0.14);
  });

  it('kling-v1-5 pro 5s = $0.28', () => {
    expect(calculateCost({ model: 'kling-v1-5', mode: 'pro', duration: 5 })).toBe(0.28);
  });

  it('returns 0 for unknown combination', () => {
    const settings = { model: 'unknown-model', mode: 'std', duration: 5 } as unknown as GenerationSettings;
    expect(calculateCost(settings)).toBe(0);
  });
});

describe('PRICING keys', () => {
  it('all pricing keys follow model:mode:duration format', () => {
    Object.keys(PRICING).forEach(key => {
      const parts = key.split(':');
      expect(parts).toHaveLength(3);
    });
  });
});
