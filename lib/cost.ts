// lib/cost.ts
import type { VideoModel } from './providers';

export type KlingModel = 'kling-v1' | 'kling-v1-5';
export type KlingMode = 'std' | 'pro';
export type KlingDuration = 5 | 10;

export interface GenerationSettings {
  model: VideoModel;
  mode: KlingMode | null;  // null for Runway and Seedance (no quality tier)
  duration: 5 | 10;
}

export const PRICING: Record<string, number> = {
  // Kling — keyed as model:mode:duration
  'kling-v1:std:5':    0.07,
  'kling-v1:std:10':   0.14,
  'kling-v1:pro:5':    0.14,
  'kling-v1:pro:10':   0.28,
  'kling-v1-5:std:5':  0.14,
  'kling-v1-5:std:10': 0.28,
  'kling-v1-5:pro:5':  0.28,
  'kling-v1-5:pro:10': 0.56,
  // Runway — keyed as model:duration (no mode)
  'runway-gen4:5':      0.50,
  'runway-gen4:10':     1.00,
  // Seedance — keyed as model:duration (no mode)
  'seedance-1-lite:5':  0.08,
  'seedance-1-lite:10': 0.16,
  'seedance-1-pro:5':   0.20,
  'seedance-1-pro:10':  0.40,
};

export function calculateCost(settings: GenerationSettings): number {
  const key = settings.mode !== null
    ? `${settings.model}:${settings.mode}:${settings.duration}`
    : `${settings.model}:${settings.duration}`;
  return PRICING[key] ?? 0;
}
