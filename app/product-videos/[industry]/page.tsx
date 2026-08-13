import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { VERTICALS, getVertical } from '../data';
import { getPrompt, thumbSrc, modelShortLabel } from '../../prompts/data';

const BASE = 'https://www.aivideoauditor.com';

export function generateStaticParams() {
  return VERTICALS.map((v) => ({ industry: v.slug }));
}

export function generateMetadata({ params }: { params: { industry: string } }): Metadata {
  const v = getVertical(params.industry);
  if (!v) return {};
  const title = `AI Product Videos for ${v.industry} Brands | AI Video Auditor`;
  return {
    title,
    description: v.metaDescription,
    alternates: { canonical: `${BASE}/product-videos/${v.slug}` },
    openGraph: {
      title,
      description: v.metaDescription,
      type: 'website',
      url: `${BASE}/product-videos/${v.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: v.metaDescription,
    },
  };
}

const STEPS = [
  {
    n: '1',
    title: 'Send your product photo',
    desc: 'One clean photo of the product plus a sentence about the vibe and your target platform. That’s the whole brief.',
  },
  {
    n: '2',
    title: 'We generate + QC',
    desc: 'We produce your 9:16 clip and run every frame through a consistency gate so your product never morphs, warps, or drifts.',
  },
  {
    n: '3',
    title: 'Approve & post',
    desc: 'You approve a preview, then get platform-native files for IG Reels, TikTok, and 小紅書 — ready to upload. 2–3 days end to end.',
  },
];

export default function IndustryPage({ params }: { params: { industry: string } }) {
  const v = getVertical(params.industry);
  if (!v) notFound();

  const videos = v.videoIds.map((id) => getPrompt(id)).filter((p): p is NonNullable<typeof p> => !!p);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `AI Product Videos for ${v.industry} Brands`,
    serviceType: 'AI product video production',
    description: v.metaDescription,
    provider: { '@type': 'Organization', name: 'AI Video Auditor', url: BASE },
    areaServed: 'Worldwide',
    audience: { '@type': 'Audience', audienceType: `${v.industry} brands and small businesses` },
    offers: { '@type': 'Offer', priceCurrency: 'USD', price: '59', url: `${BASE}/order` },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: v.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Product Videos', item: `${BASE}/product-videos` },
      { '@type': 'ListItem', position: 3, name: v.industry, item: `${BASE}/product-videos/${v.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="bg-zinc-950 text-white min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <nav className="text-xs text-zinc-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2 text-zinc-700">/</span>
            <Link href="/product-videos" className="hover:text-white transition-colors">Product Videos</Link>
            <span className="mx-2 text-zinc-700">/</span>
            <span className="text-zinc-300">{v.industry}</span>
          </nav>

          {/* Hero */}
          <header className="mb-10">
            <span className="inline-flex items-center gap-1 bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full mb-3">
              {v.industry}
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
              {v.h1}
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">{v.subhead}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/order"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
              >
                Order a Video — from $59
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/pricing" className="text-zinc-400 hover:text-white text-sm transition-colors">
                See pricing →
              </Link>
            </div>
          </header>

          {/* Pain points */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-5">
              Why {v.industry.toLowerCase()} brands struggle with video
            </h2>
            <div className="space-y-4">
              {v.painPoints.map((p) => (
                <div key={p.title} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-1.5">{p.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Solution */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-3">How we solve it</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">{v.solution}</p>
          </section>

          {/* Example videos */}
          {videos.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-bold text-white mb-1">Example clips</h2>
              <p className="text-zinc-500 text-sm mb-5">
                A few clips in the direction we produce for {v.industry.toLowerCase()}. Tap any one for the full teardown.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {videos.map((item) => {
                  const thumb = thumbSrc(item);
                  const showVideo = !!item.videoUrl && item.embeddable;
                  return (
                    <Link
                      key={item.id}
                      href={`/prompts/${item.id}`}
                      className="group block rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-colors bg-zinc-900"
                    >
                      <div className="relative aspect-video bg-zinc-900">
                        {showVideo ? (
                          <video
                            src={item.videoUrl!}
                            poster={thumb}
                            muted
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
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <p className="text-zinc-300 group-hover:text-white text-xs p-2 truncate transition-colors">
                        {item.title}
                        <span className="text-zinc-600"> · {modelShortLabel(item.model)}</span>
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* 3-day steps */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-5">3 days from photo to post</h2>
            <div className="space-y-4">
              {STEPS.map((s) => (
                <div key={s.n} className="flex gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-300 font-bold flex items-center justify-center">
                    {s.n}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{s.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-5">{v.industry} video FAQ</h2>
            <div className="space-y-4">
              {v.faqs.map((f) => (
                <div key={f.q} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-1.5">{f.q}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="border border-blue-500/30 rounded-xl p-8 text-center bg-blue-500/5">
            <p className="text-zinc-400 mb-2">Ready to give your {v.industry.toLowerCase()} a scroll-stopping Reel?</p>
            <h2 className="text-2xl font-bold text-white mb-6">Send one photo. We’ll make the video.</h2>
            <Link
              href="/order"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              Order a Video — from $59
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-zinc-500 text-sm mt-4">
              or <Link href="/pricing" className="text-blue-400 hover:text-blue-300 transition-colors">compare packages</Link> · 2–3 day turnaround · preview + one revision
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
