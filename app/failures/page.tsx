import type { Metadata } from 'next';
import Link from 'next/link';
import { FAILURES, FAILURE_CLUSTERS, getFailure } from './[slug]/data';

export const metadata: Metadata = {
  title: 'AI Video Failure Reference — Refund Guide for Every Model',
  description:
    'The complete catalogue of AI video generation failures across Runway, Sora, Veo, Luma, Kling, Pika, Hailuo and Seedance. Click any failure to see refund-strength evidence + the exact technical term to use with support.',
  alternates: { canonical: 'https://www.aivideoauditor.com/failures' },
  openGraph: {
    title: 'AI Video Failure Reference — Refund Guide for Every Model',
    description:
      'The complete catalogue of AI video generation failures across all major models. Every failure is documented with refund-strength evidence + the exact technical term to cite.',
    type: 'article',
  },
};

const CLUSTER_META: Record<string, { label: string; intent: string }> = {
  watermark: {
    label: 'Watermark Bleed',
    intent: 'Model leaks the licensor watermark into clean output — strong refund grounds.',
  },
  physics: {
    label: 'Physics Collapse',
    intent: 'Gravity, collisions and rigid-body behaviour break mid-clip.',
  },
  face: {
    label: 'Face Distortion',
    intent: 'Identity drift, melting features, asymmetric anatomy across frames.',
  },
  text: {
    label: 'Text Rendering & Hallucination',
    intent: 'On-screen text becomes glyph soup or invents words that were not prompted.',
  },
  anatomy: {
    label: 'Limb & Anatomy Artifacts',
    intent: 'Extra fingers, fused limbs, anatomically impossible body geometry.',
  },
  promptAdherence: {
    label: 'Prompt Adherence Failure',
    intent: 'Model ignores the prompt — wrong subject, wrong action, wrong scene.',
  },
  camera: {
    label: 'Camera Motion Artifacts',
    intent: 'Jitter, drift, ignored camera directions, unintended shake.',
  },
  motion: {
    label: 'Motion & Temporal Failures',
    intent: 'Motion blur overload, drift, flicker, broken temporal coherence.',
  },
  audioLipSync: {
    label: 'Audio Sync & Lip Sync',
    intent: 'Lip movements detached from speech; ambient audio missing or warped.',
  },
};

const CLUSTER_ORDER: (keyof typeof CLUSTER_META)[] = [
  'anatomy',
  'face',
  'physics',
  'text',
  'promptAdherence',
  'camera',
  'motion',
  'watermark',
  'audioLipSync',
];

export default function FailuresHubPage() {
  const clusteredSlugs = new Set<string>(
    Object.values(FAILURE_CLUSTERS).flat(),
  );
  const uncategorized = FAILURES.filter((f) => !clusteredSlugs.has(f.slug));

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AI Video Failure Reference',
    description:
      'Complete catalogue of AI video generation failures across all major models, each documented with refund-strength evidence and the exact technical term to cite with support.',
    url: 'https://www.aivideoauditor.com/failures',
    isPartOf: {
      '@type': 'WebSite',
      name: 'AIVideoAuditor',
      url: 'https://www.aivideoauditor.com',
    },
    hasPart: FAILURES.map((f) => ({
      '@type': 'Article',
      headline: f.title,
      url: `https://www.aivideoauditor.com/failures/${f.slug}`,
      description: f.metaDesc,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <main className="min-h-screen py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-primary">Failure Reference</span>
          </nav>

          {/* Hero */}
          <header className="mb-12">
            <p className="text-xs font-mono uppercase tracking-widest text-neon-purple mb-3">
              Failure Reference · {FAILURES.length} documented failures
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-ink-primary mb-4 leading-tight">
              AI Video Failure Reference
            </h1>
            <p className="text-ink-secondary leading-relaxed max-w-2xl">
              Every failure mode we&rsquo;ve catalogued across Runway, Sora, Veo, Luma, Kling, Pika,
              Hailuo and Seedance — grouped by failure type, with the exact technical term to cite
              with support and a refund-strength assessment for each one.
            </p>
          </header>

          {/* Clusters */}
          {CLUSTER_ORDER.map((cluster) => {
            const meta = CLUSTER_META[cluster];
            const slugs = FAILURE_CLUSTERS[cluster] ?? [];
            const failures = slugs.map(getFailure).filter(Boolean) as ReturnType<typeof getFailure>[];
            if (failures.length === 0) return null;

            return (
              <section key={cluster} className="mb-12">
                <h2 className="text-2xl font-bold text-ink-primary mb-2">{meta.label}</h2>
                <p className="text-ink-muted text-sm mb-5 max-w-2xl">{meta.intent}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {failures.map((f) => {
                    if (!f) return null;
                    const model = f.slug.split('-')[0];
                    const modelLabel = model.charAt(0).toUpperCase() + model.slice(1);
                    return (
                      <Link
                        key={f.slug}
                        href={`/failures/${f.slug}`}
                        className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-red/30 transition-colors block"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-neon-purple uppercase tracking-wider">
                              {modelLabel}
                            </span>
                            <p className="font-mono font-bold text-ink-primary text-sm">
                              {f.technicalTerm.split(' ')[0]}
                            </p>
                          </div>
                          <span
                            className={`text-xs font-mono font-bold ${
                              f.risk === 'CRITICAL' ? 'text-neon-red' : 'text-neon-amber'
                            }`}
                          >
                            {f.risk}
                          </span>
                        </div>
                        <p className="text-ink-muted text-xs">
                          {f.shortDesc.substring(0, 90)}
                          {f.shortDesc.length > 90 ? '…' : ''}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {/* Uncategorized */}
          {uncategorized.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-ink-primary mb-2">Other Failures</h2>
              <p className="text-ink-muted text-sm mb-5 max-w-2xl">
                Failure modes that don&rsquo;t fit cleanly into the clusters above — still
                refund-worthy when documented correctly.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {uncategorized.map((f) => {
                  const model = f.slug.split('-')[0];
                  const modelLabel = model.charAt(0).toUpperCase() + model.slice(1);
                  return (
                    <Link
                      key={f.slug}
                      href={`/failures/${f.slug}`}
                      className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-red/30 transition-colors block"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-neon-purple uppercase tracking-wider">
                            {modelLabel}
                          </span>
                          <p className="font-mono font-bold text-ink-primary text-sm">
                            {f.technicalTerm.split(' ')[0]}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-mono font-bold ${
                            f.risk === 'CRITICAL' ? 'text-neon-red' : 'text-neon-amber'
                          }`}
                        >
                          {f.risk}
                        </span>
                      </div>
                      <p className="text-ink-muted text-xs">
                        {f.shortDesc.substring(0, 90)}
                        {f.shortDesc.length > 90 ? '…' : ''}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Continue exploring — cross-links to other AVA surfaces */}
          <section className="mt-16" aria-label="Continue exploring">
            <h2 className="text-xl font-bold text-ink-primary mb-2">Continue exploring</h2>
            <p className="text-ink-muted text-sm mb-6">
              The failure reference is the deepest part of the site. These four surfaces help you act on it.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/compare"
                className="bg-elevated border border-border rounded-xl p-5 hover:border-neon-purple/30 transition-colors block"
              >
                <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-2">
                  Head-to-head comparisons
                </p>
                <p className="text-ink-primary font-bold text-sm mb-1">Pick the right tool per shot type</p>
                <p className="text-ink-muted text-xs">
                  Runway vs Luma. Sora vs Veo. Kling vs Runway. Compare by failure profile, not by leaderboard.
                </p>
              </Link>
              <Link
                href="/case-studies"
                className="bg-elevated border border-border rounded-xl p-5 hover:border-neon-green/30 transition-colors block"
              >
                <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-2">
                  Case studies
                </p>
                <p className="text-ink-primary font-bold text-sm mb-1">$84-612/mo recovered by real users</p>
                <p className="text-ink-muted text-xs">
                  Anonymized stories — solo creator, agency, brand account. Refund breakdowns + workflow changes.
                </p>
              </Link>
              <Link
                href="/tools/credit-calculator"
                className="bg-elevated border border-border rounded-xl p-5 hover:border-neon-green/30 transition-colors block"
              >
                <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-2">
                  Free calculator
                </p>
                <p className="text-ink-primary font-bold text-sm mb-1">How much are you leaving on the table?</p>
                <p className="text-ink-muted text-xs">
                  Estimate your monthly refund recovery based on spend and primary failure mode. No signup.
                </p>
              </Link>
              <Link
                href="/graveyard"
                className="bg-elevated border border-border rounded-xl p-5 hover:border-neon-red/30 transition-colors block"
              >
                <p className="text-xs font-mono font-bold tracking-widest text-neon-red uppercase mb-2">
                  AI Tool Graveyard
                </p>
                <p className="text-ink-primary font-bold text-sm mb-1">Refund deadlines + migration paths</p>
                <p className="text-ink-muted text-xs">
                  Tracked record of every shut-down AI tool. Sora 2 refund window closes 2026-05-23.
                </p>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-surface border border-neon-green/20 rounded-2xl p-8 text-center mt-16">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
              Stop documenting these by hand
            </p>
            <h2 className="text-2xl font-bold text-ink-primary mb-3">
              AVA captures the evidence in the same tab as your generation
            </h2>
            <p className="text-ink-secondary text-sm mb-6 max-w-md mx-auto">
              Install the free Chrome extension. It captures Generation IDs, lets you mark exact
              broken frames with timestamps, and generates a refund letter — or a PDF Technical
              Audit Report (Pro).
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://chromewebstore.google.com/detail/aivideoauditor/ecomchbdfkgakaoponipjgpnjfpimdef"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-mono font-bold px-6 py-3 rounded-xl transition-all"
              >
                Install Free Extension →
              </a>
              <Link
                href="/guide"
                className="inline-flex items-center justify-center gap-2 bg-elevated hover:bg-elevated/80 border border-border text-ink-secondary font-mono font-semibold px-6 py-3 rounded-xl transition-all text-sm"
              >
                Read the Full Refund Guide
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
