import type { Metadata } from 'next';
import Link from 'next/link';
import { VERTICALS } from './data';

const BASE = 'https://www.aivideoauditor.com';

export const metadata: Metadata = {
  title: 'AI Product Videos for Your Industry | AI Video Auditor',
  description:
    'Done-for-you AI product videos by industry. Send one product photo, get a QC-checked 9:16 Reel for IG, TikTok & 小紅書 in 2–3 days. From $59.',
  alternates: { canonical: `${BASE}/product-videos` },
  openGraph: {
    title: 'AI Product Videos for Your Industry | AI Video Auditor',
    description:
      'Done-for-you AI product videos by industry. One photo → a QC-checked 9:16 Reel in 2–3 days. From $59.',
    type: 'website',
    url: `${BASE}/product-videos`,
  },
};

export default function ProductVideosHub() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI Product Videos by Industry',
    itemListElement: VERTICALS.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `AI Product Videos for ${v.industry} Brands`,
      url: `${BASE}/product-videos/${v.slug}`,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Product Videos', item: `${BASE}/product-videos` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="bg-zinc-950 text-white min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <nav className="text-xs text-zinc-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2 text-zinc-700">/</span>
            <span className="text-zinc-300">Product Videos</span>
          </nav>

          {/* Hero */}
          <header className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
              AI product videos for your industry
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              We turn a single product photo into a scroll-stopping 9:16 clip for IG Reels, TikTok, and 小紅書 —
              generated, QC-checked so the product never morphs, and delivered in 2–3 days. Pick your category to see
              how it works for you.
            </p>
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

          {/* Vertical grid */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-5">Browse by industry</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {VERTICALS.map((v) => (
                <Link
                  key={v.slug}
                  href={`/product-videos/${v.slug}`}
                  className="group block rounded-xl border border-zinc-800 hover:border-zinc-600 transition-colors bg-zinc-900 p-5"
                >
                  <h3 className="text-white font-semibold group-hover:text-blue-300 transition-colors mb-1">
                    {v.industry}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-snug line-clamp-2">{v.subhead}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="border border-blue-500/30 rounded-xl p-8 text-center bg-blue-500/5">
            <p className="text-zinc-400 mb-2">Don’t see your exact category?</p>
            <h2 className="text-2xl font-bold text-white mb-6">If it fits in a photo, we can make its video.</h2>
            <Link
              href="/order"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              Order a Video — from $59
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-zinc-500 text-sm mt-4">2–3 day turnaround · preview + one revision · 9:16 platform-native exports</p>
          </div>
        </div>
      </main>
    </>
  );
}
