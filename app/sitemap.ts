import { MetadataRoute } from 'next';

const BASE = 'https://www.aivideoauditor.com';

const FAILURE_SLUGS = [
  // Runway
  'runway-limb-artifact',
  'runway-physics-collapse',
  'runway-face-distortion',
  'runway-text-rendering-failure',
  'runway-temporal-flicker',
  'runway-hallucinated-text',
  'runway-camera-jitter',
  'runway-color-drift',
  // Luma
  'luma-physics-collapse',
  'luma-face-distortion',
  // Google Veo
  'veo-text-rendering-failure',
  'veo-hand-artifact',
  // Kling
  'kling-anatomy-artifact',
  // Seedance
  'seedance-motion-drift',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const failurePages: MetadataRoute.Sitemap = FAILURE_SLUGS.map((slug) => ({
    url: `${BASE}/failures/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/luma-refund-guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/security`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    ...failurePages,
  ];
}
