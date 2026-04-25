import { aggregatorCostsFor, AGGREGATOR_PRICES, AGGREGATOR_LABELS } from '../lib/aggregator-prices';

describe('AGGREGATOR_PRICES', () => {
  it('has pika_pro entry for 5s and 10s', () => {
    expect(AGGREGATOR_PRICES.pika_pro[5]).toBe(0.80);
    expect(AGGREGATOR_PRICES.pika_pro[10]).toBe(1.60);
  });

  it('has runway_standard entry for 5s and 10s', () => {
    expect(AGGREGATOR_PRICES.runway_standard[5]).toBe(0.60);
    expect(AGGREGATOR_PRICES.runway_standard[10]).toBe(1.20);
  });
});

describe('AGGREGATOR_LABELS', () => {
  it('has human-readable labels', () => {
    expect(AGGREGATOR_LABELS.pika_pro).toBe('Pika Pro');
    expect(AGGREGATOR_LABELS.runway_standard).toBe('Runway Std');
  });
});

describe('aggregatorCostsFor', () => {
  it('returns two entries for 5s', () => {
    const entries = aggregatorCostsFor(5);
    expect(entries).toHaveLength(2);
  });

  it('returns entries sorted cheapest first for 5s', () => {
    const entries = aggregatorCostsFor(5);
    expect(entries[0].cost).toBeLessThanOrEqual(entries[1].cost);
    expect(entries[0].key).toBe('runway_standard');
    expect(entries[0].cost).toBe(0.60);
    expect(entries[1].key).toBe('pika_pro');
    expect(entries[1].cost).toBe(0.80);
  });

  it('returns correct 10s prices sorted cheapest first', () => {
    const entries = aggregatorCostsFor(10);
    expect(entries[0].cost).toBe(1.20);
    expect(entries[1].cost).toBe(1.60);
  });

  it('each entry has key, label, and cost fields', () => {
    const entries = aggregatorCostsFor(5);
    for (const e of entries) {
      expect(typeof e.key).toBe('string');
      expect(typeof e.label).toBe('string');
      expect(typeof e.cost).toBe('number');
    }
  });
});
