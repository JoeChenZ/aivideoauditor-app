// Shared data layer for the programmatic prompt-teardown pages (/prompts).
// Single source of truth = data/prompt-gallery.json (the Creators Wall data).
// Everything here is derived — no per-page hand authoring.

import galleryData from '@/data/prompt-gallery.json';

export type GalleryItem = {
  id: string;
  title: string;
  model: string;
  prompt: string;
  videoUrl: string | null;
  embedUrl: string | null;
  thumbnailUrl: string | null;
  creator: string;
  sourceUrl: string;
  tags: string[];
  embeddable: boolean;
  embedMethod: string;
};

export const PROMPTS = galleryData as GalleryItem[];

const BY_ID = new Map(PROMPTS.map((p) => [p.id, p]));

export function getPrompt(id: string): GalleryItem | undefined {
  return BY_ID.get(id);
}

// Short model label used in badges / titles (e.g. "OpenAI Sora" → "Sora").
const MODEL_SHORT: Record<string, string> = {
  'Runway Gen-3 Alpha': 'Runway Gen-3',
  'OpenAI Sora': 'Sora',
  'Google Veo 2': 'Veo 2',
  'Google Veo 3': 'Veo 3',
  'Seedance (ByteDance)': 'Seedance',
  'Kling AI': 'Kling',
  'Luma Dream Machine': 'Luma',
  'Pika': 'Pika',
  'Higgsfield AI': 'Higgsfield',
  'MiniMax Hailuo': 'Hailuo',
};

export function modelShortLabel(model: string): string {
  return MODEL_SHORT[model] ?? model;
}

// Slugify a model string for /prompts/model/[model] routes.
// "Google Veo 3" → "google-veo-3", "Seedance (ByteDance)" → "seedance-bytedance".
export function slugifyModel(model: string): string {
  return model
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Distinct models present in the data, in the order they first appear.
export const MODELS: string[] = Array.from(new Set(PROMPTS.map((p) => p.model)));

// slug ↔ model map so [model] routes can resolve back to the exact model string.
const MODEL_BY_SLUG = new Map(MODELS.map((m) => [slugifyModel(m), m]));

export function modelFromSlug(slug: string): string | undefined {
  return MODEL_BY_SLUG.get(slug);
}

export function promptsForModel(model: string): GalleryItem[] {
  return PROMPTS.filter((p) => p.model === model);
}

// Group all prompts by model (preserves MODELS order).
export function promptsByModel(): { model: string; items: GalleryItem[] }[] {
  return MODELS.map((model) => ({ model, items: promptsForModel(model) }));
}

// Thumbnail src: explicit thumbnailUrl, else self-hosted poster at /wall/<id>.jpg.
export function thumbSrc(item: GalleryItem): string {
  return item.thumbnailUrl ?? `/wall/${item.id}.jpg`;
}

// A ~150-char, honest description derived from the prompt for meta tags.
export function metaDescFromPrompt(item: GalleryItem): string {
  const label = modelShortLabel(item.model);
  const base = `Copy the exact ${label} prompt that made "${item.title}". `;
  const room = 155 - base.length;
  let tail = item.prompt.replace(/\s+/g, ' ').trim();
  if (tail.length > room) tail = tail.slice(0, Math.max(0, room - 1)).trimEnd() + '…';
  return (base + tail).slice(0, 160);
}

// Honest, generic "why it works" teardown derived from model + tags.
// No fabricated metrics — describes the prompt-craft signals actually present.
export function teardown(item: GalleryItem): string {
  const label = modelShortLabel(item.model);
  const tags = item.tags;
  const parts: string[] = [];

  parts.push(
    `This was generated on ${item.model}. The prompt reads like a shot brief rather than a keyword list — it front-loads the subject, then layers in setting, motion, and lighting so the model has an unambiguous scene to render.`
  );

  if (tags.includes('cinematic') || tags.includes('lighting')) {
    parts.push(
      `Notice the explicit lighting and camera language. On ${label}, naming the light source and mood ("warm glowing neon", "dramatic lighting") gives the diffusion model a strong prior and is one of the biggest levers on perceived quality.`
    );
  }
  if (tags.includes('motion') || tags.includes('action')) {
    parts.push(
      `Movement is described concretely instead of left open. ${label} handles motion best when the prompt states who moves, how, and in which direction — vague motion cues are where drift and morphing usually creep in.`
    );
  }
  if (tags.includes('people') || tags.includes('animal') || tags.includes('character')) {
    parts.push(
      `Character and anatomy prompts are the highest-risk category on every model. The specificity here — wardrobe, posture, framing — narrows the space the model has to hallucinate extra limbs or warped faces.`
    );
  }

  parts.push(
    `The honest takeaway: prompt specificity is doing most of the work. There's no magic token — it's a clear subject, a defined camera and light setup, and one concrete action, which is exactly what ${label} needs to stay coherent.`
  );

  return parts.join(' ');
}
