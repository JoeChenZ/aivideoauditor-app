import { MetadataRoute } from 'next';
import { FAILURES } from './failures/[slug]/data';
import { SHUTDOWNS } from './graveyard/[slug]/data';
import { COMPARISONS } from './compare/[slug]/data';
import { CASE_STUDIES } from './case-studies/[slug]/data';
import { ALTERNATIVES } from './alternatives/[slug]/data';

const BASE = 'https://www.aivideoauditor.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const failurePages: MetadataRoute.Sitemap = FAILURES.map((f) => ({
    url: `${BASE}/failures/${f.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const graveyardPages: MetadataRoute.Sitemap = SHUTDOWNS.map((s) => ({
    url: `${BASE}/graveyard/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const comparePages: MetadataRoute.Sitemap = COMPARISONS.map((c) => ({
    url: `${BASE}/compare/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = CASE_STUDIES.map((c) => ({
    url: `${BASE}/case-studies/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const alternativesPages: MetadataRoute.Sitemap = ALTERNATIVES.map((a) => ({
    url: `${BASE}/alternatives/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.86,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/failures`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.92 },
    { url: `${BASE}/case-studies`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.91 },
    { url: `${BASE}/tools/credit-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.88 },
    { url: `${BASE}/tools/migration-planner`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.88 },
    { url: `${BASE}/alternatives`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.89 },
    { url: `${BASE}/compare`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/graveyard`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/luma-refund-guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/guide-refund-categories`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.92 },
    { url: `${BASE}/sora-refund`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.95 },
    { url: `${BASE}/affiliate-program`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.88 },
    { url: `${BASE}/research/132-ai-video-vendor-reviews`, lastModified: new Date('2026-05-20'), changeFrequency: 'monthly', priority: 0.93 },
    { url: `${BASE}/security`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    ...failurePages,
    ...graveyardPages,
    ...comparePages,
    ...caseStudyPages,
    ...alternativesPages,
  ];
}
