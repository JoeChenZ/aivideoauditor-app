export type KlingModel = 'kling-v1' | 'kling-v1-5';
export type KlingMode = 'std' | 'pro';
export type KlingDuration = 5 | 10;

export interface GenerationSettings {
  model: KlingModel;
  mode: KlingMode;
  duration: KlingDuration;
}

export const PRICING: Record<string, number> = {
  'kling-v1:std:5':    0.07,
  'kling-v1:std:10':   0.14,
  'kling-v1:pro:5':    0.14,
  'kling-v1:pro:10':   0.28,
  'kling-v1-5:std:5':  0.14,
  'kling-v1-5:std:10': 0.28,
  'kling-v1-5:pro:5':  0.28,
  'kling-v1-5:pro:10': 0.56,
};

export function calculateCost(settings: GenerationSettings): number {
  const key = `${settings.model}:${settings.mode}:${settings.duration}`;
  return PRICING[key] ?? 0;
}
