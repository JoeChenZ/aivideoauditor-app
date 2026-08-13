import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MODELS,
  modelFromSlug,
  modelShortLabel,
  slugifyModel,
  promptsForModel,
  thumbSrc,
} from '../../data';

const BASE = 'https://www.aivideoauditor.com';

export function generateStaticParams() {
  return MODELS.map((m) => ({ model: slugifyModel(m) }));
}

export function generateMetadata({ params }: { params: { model: string } }): Metadata {
  const model = modelFromSlug(params.model);
  if (!model) return {};
  const label = modelShortLabel(model);
  const count = promptsForModel(model).length;
  const title = `Best ${label} Video Prompts & Examples (${count})`;
  const description = `${count} real ${label} prompts with the videos they produced. Copy the exact prompt, see why it works, or have us make a ${label}-style product video for you.`;
  return {
    title,
    description,
    alternates: { canonical: `${BASE}/prompts/model/${params.model}` },
    openGraph: {
      title: `${title} | AI Video Auditor`,
      description,
      type: 'website',
    },
  };
}

export default function ModelHubPage({ params }: { params: { model: string } }) {
  const model = modelFromSlug(params.model);
  if (!model) notFound();

  const label = modelShortLabel(model);
  const items = promptsForModel(model);
  const otherModels = MODELS.filter((m) => m !== model);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best ${label} video prompts`,
    itemListElement: items.map((p, i) => ({
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
      { '@type': 'ListItem', position: 3, name: label, item: `${BASE}/prompts/model/${params.model}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="bg-zinc-950 text-white min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <nav className="text-xs text-zinc-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2 text-zinc-700">/</span>
            <Link href="/prompts" className="hover:text-white transition-colors">Prompts</Link>
            <span className="mx-2 text-zinc-700">/</span>
            <span className="text-zinc-300">{label}</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
              Best {label} video prompts &amp; examples
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl">
              {items.length} real {label} prompts, each paired with the video it produced. {model} rewards specific shot
              briefs — a clear subject, defined camera and lighting, and one concrete action. Copy any prompt below, or
              have us produce a {label}-style product video for you.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-14">
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

          {/* CTA */}
          <div className="border border-blue-500/30 rounded-xl p-8 text-center bg-blue-500/5 mb-12">
            <p className="text-zinc-400 mb-2">Want a {label}-quality video without the prompt grind?</p>
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

          {/* Other models */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Prompts for other models</h2>
            <div className="flex flex-wrap gap-2">
              {otherModels.map((m) => (
                <Link
                  key={m}
                  href={`/prompts/model/${slugifyModel(m)}`}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-sm px-3 py-1.5 rounded-full transition-colors"
                >
                  {modelShortLabel(m)}
                </Link>
              ))}
              <Link
                href="/prompts"
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-blue-400 hover:text-blue-300 text-sm px-3 py-1.5 rounded-full transition-colors"
              >
                All prompts →
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
