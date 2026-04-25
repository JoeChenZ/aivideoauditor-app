// lib/aggregator-prices.ts
export interface AggregatorEntry {
  key: string;
  label: string;
  cost: number;
}

// USD per generation equivalent, based on subscription plan credits
export const AGGREGATOR_PRICES: Record<string, Record<5 | 10, number>> = {
  pika_pro:        { 5: 0.80, 10: 1.60 },
  runway_standard: { 5: 0.60, 10: 1.20 },
};

export const AGGREGATOR_LABELS: Record<string, string> = {
  pika_pro:        'Pika Pro',
  runway_standard: 'Runway Std',
};

export function aggregatorCostsFor(duration: 5 | 10): AggregatorEntry[] {
  return Object.entries(AGGREGATOR_PRICES)
    .map(([key, prices]) => ({
      key,
      label: AGGREGATOR_LABELS[key] ?? key,
      cost: prices[duration],
    }))
    .sort((a, b) => a.cost - b.cost);
}
