import type { Metadata } from 'next';
import Link from 'next/link';
import {
  PROMPTS,
  promptsByModel,
  modelShortLabel,
  slugifyModel,
  thumbSrc,
} from './data';

const BASE = 'https://www.aivideoauditor.com';

export const metadata: Metadata = {
  title: 'AI Video Prompts, by Model — Copy the Exact Prompts',
  description:
    `The exact prompts behind ${PROMPTS.length} of the best AI videos on the internet, grouped by model — Sora, Veo 3, Runway, Kling, Seedance, Hailuo, Luma, Pika. Copy them or have us make one for your product.`,
  alternates: { canonical: `${BASE}/prompts` },
  openGraph: {
    title: 'AI Video Prompts, by Model — Copy the Exact Prompts | AI Video Auditor',
    description:
      'The exact prompts behind the best AI videos, grouped by the model that made them. Sora, Veo 3, Runway, Kling, Seedance, Hailuo, Luma, Pika.',
    type: 'website',
  },
};

const groups = promptsByModel();

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'AI Video Prompts by Model',
  itemListElement: PROMPTS.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${BASE}/prompts/${p.id}`,
    name: p.title,
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'Prompts', item: `${BASE}/prompts` },
  ],
};

export default function PromptsIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="bg-zinc-950 text-white min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
              AI video prompts, by model
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl">
              The exact prompts behind {PROMPTS.length} of the best AI videos on the internet — grouped by the model that
              made them. Copy any prompt, study why it works, or have us make one like it for your product.
            </p>
          </div>

          {/* Jump nav */}
          <div className="flex flex-wrap gap-2 mb-12">
            {groups.map(({ model, items }) => (
              <Link
                key={model}
                href={`/prompts/model/${slugifyModel(model)}`}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-sm px-3 py-1.5 rounded-full transition-colors"
              >
                {modelShortLabel(model)} <span className="text-zinc-500">{items.length}</span>
              </Link>
            ))}
          </div>

          {/* Grouped by model */}
          {groups.map(({ model, items }) => (
            <section key={model} className="mb-14">
              <div className="flex items-baseline justify-between mb-5">
                <h2 className="text-2xl font-bold text-white">{modelShortLabel(model)}</h2>
                <Link
                  href={`/prompts/model/${slugifyModel(model)}`}
                  className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  Best {modelShortLabel(model)} prompts →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/prompts/${item.id}`}
                    className="group block rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-colors bg-zinc-900"
                  >
                    <div className="relative aspect-video bg-zinc-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thumbSrc(item)}
                        alt={item.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-zinc-300 group-hover:text-white text-xs p-2 truncate transition-colors">{item.title}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {/* CTA */}
          <div className="border border-blue-500/30 rounded-xl p-8 text-center bg-blue-500/5">
            <p className="text-zinc-400 mb-2">Don&apos;t want to wrestle with prompts?</p>
            <h2 className="text-2xl font-bold text-white mb-6">We&apos;ll make your product video for you.</h2>
            <Link
              href="/order"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              Order a Video — from $59
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
