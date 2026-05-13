import { MetadataRoute } from 'next';
import { FAILURES } from './failures/[slug]/data';

const BASE = 'https://www.aivideoauditor.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const failurePages: MetadataRoute.Sitemap = FAILURES.map((f) => ({
    url: `${BASE}/failures/${f.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/failures`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.92 },
    { url: `${BASE}/guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/luma-refund-guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/security`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    ...failurePages,
  ];
}
