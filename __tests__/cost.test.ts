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
  it('all pricing keys follow model:mode:duration or model:duration format', () => {
    Object.keys(PRICING).forEach(key => {
      const parts = key.split(':');
      expect([2, 3]).toContain(parts.length);
    });
  });
});

describe('Runway pricing', () => {
  it('runway-gen4 5s = $0.50', () => {
    expect(calculateCost({ model: 'runway-gen4', mode: null, duration: 5 })).toBe(0.50);
  });

  it('runway-gen4 10s = $1.00', () => {
    expect(calculateCost({ model: 'runway-gen4', mode: null, duration: 10 })).toBe(1.00);
  });
});

describe('Seedance pricing', () => {
  it('seedance-1-lite 5s = $0.08', () => {
    expect(calculateCost({ model: 'seedance-1-lite', mode: null, duration: 5 })).toBe(0.08);
  });

  it('seedance-1-lite 10s = $0.16', () => {
    expect(calculateCost({ model: 'seedance-1-lite', mode: null, duration: 10 })).toBe(0.16);
  });

  it('seedance-1-pro 5s = $0.20', () => {
    expect(calculateCost({ model: 'seedance-1-pro', mode: null, duration: 5 })).toBe(0.20);
  });

  it('seedance-1-pro 10s = $0.40', () => {
    expect(calculateCost({ model: 'seedance-1-pro', mode: null, duration: 10 })).toBe(0.40);
  });
});
