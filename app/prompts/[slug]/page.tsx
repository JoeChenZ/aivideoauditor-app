import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  PROMPTS,
  getPrompt,
  modelShortLabel,
  slugifyModel,
  promptsForModel,
  thumbSrc,
  metaDescFromPrompt,
  teardown,
} from '../data';

const BASE = 'https://www.aivideoauditor.com';

export function generateStaticParams() {
  return PROMPTS.map((p) => ({ slug: p.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = getPrompt(params.slug);
  if (!item) return {};
  const label = modelShortLabel(item.model);
  const title = `"${item.title}" — the exact ${label} prompt`;
  const description = metaDescFromPrompt(item);
  const og = thumbSrc(item);
  return {
    title,
    description,
    alternates: { canonical: `${BASE}/prompts/${item.id}` },
    openGraph: {
      title: `${title} | AI Video Auditor`,
      description,
      type: 'article',
      images: [{ url: og }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | AI Video Auditor`,
      description,
      images: [og],
    },
  };
}

export default function PromptTeardownPage({ params }: { params: { slug: string } }) {
  const item = getPrompt(params.slug);
  if (!item) notFound();

  const label = modelShortLabel(item.model);
  const thumb = thumbSrc(item);
  const showVideo = !!item.videoUrl && item.embeddable;
  const related = promptsForModel(item.model).filter((p) => p.id !== item.id).slice(0, 6);

  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: item.title,
    description: item.prompt,
    thumbnailUrl: thumb.startsWith('http') ? thumb : `${BASE}${thumb}`,
    uploadDate: '2026-01-01',
    ...(item.videoUrl ? { contentUrl: item.videoUrl } : {}),
    creator: { '@type': 'Organization', name: item.creator },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Prompts', item: `${BASE}/prompts` },
      { '@type': 'ListItem', position: 3, name: item.title, item: `${BASE}/prompts/${item.id}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="bg-zinc-950 text-white min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <nav className="text-xs text-zinc-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2 text-zinc-700">/</span>
            <Link href="/prompts" className="hover:text-white transition-colors">Prompts</Link>
            <span className="mx-2 text-zinc-700">/</span>
            <Link href={`/prompts/model/${slugifyModel(item.model)}`} className="hover:text-white transition-colors">{label}</Link>
          </nav>

          {/* Header */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-1 bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full mb-3">
              {label}
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3 leading-tight">
              {item.title}
            </h1>
            <p className="text-zinc-400">
              The exact {label} prompt behind this clip — copy it, study why it works, or have us make one like it for your product.
            </p>
          </div>

          {/* Video or poster */}
          <div className="relative aspect-video bg-zinc-900 rounded-xl overflow-hidden mb-8 border border-zinc-800">
            {showVideo ? (
              <video
                src={item.videoUrl!}
                poster={thumb}
                controls
                loop
                playsInline
                preload="none"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumb}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>

          {/* Full exact prompt — copy-friendly block */}
          <section className="mb-8">
            <div className="text-zinc-500 text-[10px] uppercase tracking-widest font-semibold mb-2">The exact prompt</div>
            <p className="text-zinc-200 text-sm leading-relaxed font-mono bg-zinc-900 rounded-xl p-5 border border-zinc-800 whitespace-pre-wrap select-all">
              {item.prompt}
            </p>
            <div className="mt-3">
              <Link href="/wall" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                Copy this prompt on the Creators Wall →
              </Link>
            </div>
          </section>

          {/* Tags */}
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-8">
              {item.tags.map((tag) => (
                <span key={tag} className="bg-zinc-800 text-zinc-400 text-[10px] px-2 py-1 rounded-full capitalize">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Teardown */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3">Why this prompt works</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">{teardown(item)}</p>
          </section>

          {/* Credit */}
          <div className="text-sm text-zinc-500 mb-10">
            Originally created by{' '}
            <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white underline underline-offset-2">
              {item.creator}
            </a>
            .
          </div>

          {/* CTA */}
          <div className="border border-blue-500/30 rounded-xl p-8 text-center bg-blue-500/5 mb-12">
            <p className="text-zinc-400 mb-2">Want videos like this for your product?</p>
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

          {/* Related same-model videos */}
          {related.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Related {label} videos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/prompts/${r.id}`}
                    className="group block rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-colors bg-zinc-900"
                  >
                    <div className="relative aspect-video bg-zinc-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thumbSrc(r)}
                        alt={r.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-zinc-300 group-hover:text-white text-xs p-2 truncate transition-colors">{r.title}</p>
                  </Link>
                ))}
              </div>
              <div className="mt-4">
                <Link href={`/prompts/model/${slugifyModel(item.model)}`} className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                  All {label} prompts →
                </Link>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
