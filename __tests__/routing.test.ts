import { analyzePrompt, getECtSRecommendation, SUCCESS_RATES, ECTS } from '../lib/routing';

describe('analyzePrompt', () => {
  it('returns "portrait" category for face/person keywords', () => {
    expect(analyzePrompt('a woman walking in the rain')).toBe('portrait');
    expect(analyzePrompt('close-up face of a man')).toBe('portrait');
    expect(analyzePrompt('portrait of a character')).toBe('portrait');
  });

  it('returns "action" category for motion keywords', () => {
    expect(analyzePrompt('fast dancing in a club')).toBe('action');
    expect(analyzePrompt('action sequence with motion blur')).toBe('action');
  });

  it('returns "product" category for product/text keywords', () => {
    expect(analyzePrompt('product shot of a bottle')).toBe('product');
    expect(analyzePrompt('logo animation reveal')).toBe('product');
  });

  it('returns "general" category for other prompts', () => {
    expect(analyzePrompt('cinematic aerial shot of mountains')).toBe('general');
    expect(analyzePrompt('foggy landscape at dawn')).toBe('general');
    expect(analyzePrompt('')).toBe('general');
  });

  it('category matching is case-insensitive', () => {
    expect(analyzePrompt('PORTRAIT of a WOMAN')).toBe('portrait');
  });
});

describe('SUCCESS_RATES', () => {
  it('all keys follow model:mode or model format', () => {
    Object.keys(SUCCESS_RATES).forEach(key => {
      const parts = key.split(':');
      expect([1, 2]).toContain(parts.length);
    });
  });

  it('all rates are between 0 and 1', () => {
    Object.values(SUCCESS_RATES).forEach(rate => {
      expect(rate).toBeGreaterThan(0);
      expect(rate).toBeLessThanOrEqual(1);
    });
  });
});

describe('ECTS', () => {
  it('kling-v1:std:5 ECtS is cost / success_rate', () => {
    const rate = SUCCESS_RATES['kling-v1:std'];
    const expected = parseFloat((0.07 / rate).toFixed(4));
    expect(ECTS['kling-v1:std:5']).toBe(expected);
  });
});

describe('getECtSRecommendation', () => {
  it('returns a recommendation with model, mode, duration, reason, and estimatedCost', () => {
    const rec = getECtSRecommendation('a cat playing piano');
    expect(rec).toHaveProperty('model');
    expect(rec).toHaveProperty('mode');
    expect(rec).toHaveProperty('duration');
    expect(rec).toHaveProperty('reason');
    expect(rec).toHaveProperty('estimatedCost');
    expect(typeof rec.reason).toBe('string');
    expect(rec.reason.length).toBeGreaterThan(0);
  });

  it('returns kling-v1 std for general prompts (cheapest ECtS)', () => {
    const rec = getECtSRecommendation('cinematic aerial landscape');
    expect(rec.model).toBe('kling-v1');
    expect(rec.mode).toBe('std');
  });

  it('returns kling-v1-5 for portrait prompts', () => {
    const rec = getECtSRecommendation('portrait of a woman smiling');
    expect(rec.model).toBe('kling-v1-5');
  });

  it('estimatedCost reflects ECtS (greater than raw price due to success_rate < 1)', () => {
    const rec = getECtSRecommendation('cinematic aerial landscape'); // general → kling-v1:std:5
    const rawPrice = 0.07;
    expect(rec.estimatedCost).toBeGreaterThan(rawPrice);
  });
});
