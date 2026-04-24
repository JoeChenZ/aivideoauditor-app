import type { KlingModel, KlingMode, KlingDuration } from './cost';
import { PRICING } from './cost';

export type PromptCategory = 'portrait' | 'action' | 'product' | 'general';

export interface Recommendation {
  model: KlingModel;
  mode: KlingMode;
  duration: KlingDuration;
  reason: string;
  estimatedCost: number;
}

const PORTRAIT_KEYWORDS = ['person', 'woman', 'man', 'face', 'portrait', 'character', 'people', 'human', 'girl', 'boy', 'celebrity'];
const ACTION_KEYWORDS   = ['dance', 'dancing', 'action', 'fast', 'motion', 'running', 'sport', 'fight', 'jump', 'speed'];
const PRODUCT_KEYWORDS  = ['product', 'logo', 'text', 'brand', 'commercial', 'advertisement', 'item', 'object'];

export function analyzePrompt(prompt: string): PromptCategory {
  const lower = prompt.toLowerCase();
  if (ACTION_KEYWORDS.some(k => lower.includes(k)))   return 'action';
  if (PORTRAIT_KEYWORDS.some(k => lower.includes(k))) return 'portrait';
  if (PRODUCT_KEYWORDS.some(k => lower.includes(k)))  return 'product';
  return 'general';
}

export const SUCCESS_RATES: Record<string, number> = {
  'kling-v1:std':   0.85,
  'kling-v1:pro':   0.90,
  'kling-v1-5:std': 0.88,
  'kling-v1-5:pro': 0.93,
};

export const ECTS: Record<string, number> = Object.fromEntries(
  Object.entries(PRICING).map(([key, price]) => {
    const [model, mode] = key.split(':');
    const rate = SUCCESS_RATES[`${model}:${mode}`] ?? 0.85;
    return [key, parseFloat((price / rate).toFixed(4))];
  })
);

const CATEGORY_MODELS: Record<PromptCategory, { model: KlingModel; mode: KlingMode; duration: KlingDuration; reason: string }> = {
  general:  { model: 'kling-v1',   mode: 'std', duration: 5, reason: 'Best value for general scenes — lowest expected cost per successful generation.' },
  portrait: { model: 'kling-v1-5', mode: 'std', duration: 5, reason: 'Kling v1.5 has better face tracking — higher success rate for portrait prompts.' },
  action:   { model: 'kling-v1-5', mode: 'pro', duration: 5, reason: 'Pro mode handles fast motion more consistently — reduces reroll cost.' },
  product:  { model: 'kling-v1',   mode: 'pro', duration: 5, reason: 'Pro mode produces more precise, stable output for product/logo shots.' },
};

export function getECtSRecommendation(prompt: string): Recommendation {
  const category = analyzePrompt(prompt);
  const { model, mode, duration, reason } = CATEGORY_MODELS[category];
  const estimatedCost = PRICING[`${model}:${mode}:${duration}`] ?? 0.07;
  return { model, mode, duration, reason, estimatedCost };
}
