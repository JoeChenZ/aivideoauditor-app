import type { Metadata } from 'next';
import Link from 'next/link';
import { FAILURES, FAILURE_CLUSTERS, getFailure } from './[slug]/data';
import { WidePageShell, Breadcrumb, ArticleHeader, Kicker, RuleDivider } from '@/components/editorial';

export const metadata: Metadata = {
  title: 'AI Video Failure Reference — 105 Failure Modes Across 11 Platforms',
  description:
    'The complete catalogue of AI video generation failure modes across Runway, Sora, Veo, Luma, Kling, Pika, Hailuo, Vidu, Higgsfield, Krea, and Pollo. Click any failure to see the exact prompt-shape risk + the technical term that signals the underlying model fault.',
  alternates: { canonical: 'https://www.aivideoauditor.com/failures' },
  openGraph: {
    title: 'AI Video Failure Reference — 105 Failure Modes Across 11 Platforms',
    description:
      'The complete catalogue of AI video generation failure modes across all major platforms. Each failure is documented with the prompt-shape risk + the technical term that identifies the underlying model fault.',
    type: 'article',
  },
};

const CLUSTER_META: Record<string, { label: string; intent: string }> = {
  watermark: {
    label: 'Watermark Bleed',
    intent: 'Model leaks the licensor watermark into clean output — major usability blocker.',
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
      'Complete catalogue of AI video generation failures across all major models, each documented with reproducible triggers, the exact technical term, and prompt-rewrite patterns that avoid the failure.',
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.aivideoauditor.com' },
      { '@type': 'ListItem', position: 2, name: 'Failure Reference', item: 'https://www.aivideoauditor.com/failures' },
    ],
  };

  // FAQPage schema — high-intent Q&As for the failure-reference landing.
  // Targets queries about specific failure modes, why they happen, how to avoid them.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an AI video failure mode?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A failure mode is a reproducible defect that AI video models produce when prompts hit known weak spots — limb distortion, temporal flicker, physics collapse, face drift, text rendering, prompt mismatch. Each entry on this page names the failure with the technical term so it is identifiable in support tickets and replicable in research.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why do AI video models still fail in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Current diffusion and latent-token video models share a common set of weak spots: extended physics (>5 seconds), hand and finger anatomy at close range, in-frame text past ~6 characters, fast motion at low FPS, and identity persistence across cuts. The architectures have improved but the underlying weak spots remain stable across vendors — which is why AVA can score prompts against a single rule catalog.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I avoid each failure mode?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each failure page contains: (a) the trigger pattern in plain English, (b) prompt-rewrite examples that bypass it, (c) a HowTo schema with the three concrete steps to identify and fix the failure on your own prompt. The Chrome extension applies these patterns automatically before you generate.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are the failure rates documented?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Each failure mode includes the first-try success rate when triggered (the share of generations that produce usable output despite the trigger) and the per-vendor rate. Source data comes from our 132-review Trustpilot study plus rolling vendor-changelog tracking; methodology is on the /research page.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which models have the highest failure rates?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Failure rate depends on prompt-shape, not vendor — a hand-close-up prompt fails on Runway, Luma, and Veo at similar rates. The /compare pages map which vendor wins on which shot type. The honest answer is: pick by failure profile of your most common shot, not by leaderboard.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <WidePageShell>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Failure Reference' }]} />

          <div className="max-w-reading">
            <ArticleHeader
              kicker={`Failure reference · ${FAILURES.length} documented failures`}
              title={<>The AI video <span className="italic">failure</span> reference.</>}
              lede="Every failure mode catalogued across Runway, Sora, Veo, Luma, Kling, Pika, Hailuo, and Seedance — grouped by type, with the exact technical term to cite with support and a usability-impact assessment for each."
            />
          </div>

          {/* Clusters */}
          {CLUSTER_ORDER.map((cluster) => {
            const meta = CLUSTER_META[cluster];
            const slugs = FAILURE_CLUSTERS[cluster] ?? [];
            const failures = slugs.map(getFailure).filter(Boolean) as ReturnType<typeof getFailure>[];
            if (failures.length === 0) return null;

            return (
              <section key={cluster} className="mb-16 border-t border-rule/60 pt-8">
                <Kicker className="mb-2">Cluster · {cluster}</Kicker>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink-primary mb-3 leading-tight tracking-tight">{meta.label}</h2>
                <p className="text-ink-muted text-sm mb-6 max-w-prose leading-relaxed">{meta.intent}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {failures.map((f) => {
                    if (!f) return null;
                    const model = f.slug.split('-')[0];
                    const modelLabel = model.charAt(0).toUpperCase() + model.slice(1);
                    return (
                      <Link
                        key={f.slug}
                        href={`/failures/${f.slug}`}
                        className="border border-rule hover:border-neon-amber/40 rounded-md p-4 bg-surface transition-colors block"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted">
                              {modelLabel}
                            </span>
                            <p className="font-mono font-semibold text-ink-primary text-xs">
                              {f.technicalTerm.split(' ')[0]}
                            </p>
                          </div>
                          <span
                            className={`font-mono text-[10px] tracking-kicker uppercase ${
                              f.risk === 'CRITICAL' ? 'text-neon-red' : 'text-neon-amber'
                            }`}
                          >
                            {f.risk}
                          </span>
                        </div>
                        <p className="text-ink-muted text-xs leading-relaxed">
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
            <section className="mb-16 border-t border-rule/60 pt-8">
              <Kicker className="mb-2">Cluster · uncategorized</Kicker>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink-primary mb-3 leading-tight tracking-tight">Other failures</h2>
              <p className="text-ink-muted text-sm mb-6 max-w-prose leading-relaxed">
                Failure modes that do not fit cleanly into the clusters above — still well-documented in the catalog.
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

          <RuleDivider label="Continue exploring" />

          <section className="mb-16" aria-label="Continue exploring">
            <p className="text-ink-muted text-sm mb-6 max-w-prose">
              The failure reference is the deepest part of the site. These four surfaces help you act on it.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/compare" className="border border-rule hover:border-ink-secondary rounded-md p-5 bg-surface transition-colors block">
                <Kicker className="mb-2">Head-to-head comparisons</Kicker>
                <p className="font-display text-base font-semibold text-ink-primary mb-1.5">Pick the right tool per shot type</p>
                <p className="text-ink-muted text-xs">Runway vs Luma. Sora vs Veo. Kling vs Runway. Compare by failure profile.</p>
              </Link>
              <Link href="/case-studies" className="border border-rule hover:border-ink-secondary rounded-md p-5 bg-surface transition-colors block">
                <Kicker className="mb-2">Case studies</Kicker>
                <p className="font-display text-base font-semibold text-ink-primary mb-1.5">Real-world failure-mode walk-throughs</p>
                <p className="text-ink-muted text-xs">Anonymized stories — solo creator, agency, brand account.</p>
              </Link>
              <Link href="/tools/credit-calculator" className="border border-rule hover:border-ink-secondary rounded-md p-5 bg-surface transition-colors block">
                <Kicker className="mb-2">Free calculator</Kicker>
                <p className="font-display text-base font-semibold text-ink-primary mb-1.5">Your real cost per usable clip</p>
                <p className="text-ink-muted text-xs">Effective cost = list × (1/first-try success) × (1+denial). No signup.</p>
              </Link>
              <Link href="/graveyard" className="border border-rule hover:border-ink-secondary rounded-md p-5 bg-surface transition-colors block">
                <Kicker className="mb-2">AI tool graveyard</Kicker>
                <p className="font-display text-base font-semibold text-ink-primary mb-1.5">Stability tracker + migration paths</p>
                <p className="text-ink-muted text-xs">Tracked record of every shut-down AI tool.</p>
              </Link>
            </div>
          </section>

          <section className="border-t border-rule/60 pt-12 max-w-reading">
            <Kicker className="mb-3">Stop documenting by hand</Kicker>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink-primary mb-4 leading-tight tracking-tight">
              AVA captures the evidence in the same tab as your generation.
            </h2>
            <p className="text-ink-secondary leading-relaxed mb-6 max-w-prose">
              Install the free Chrome extension. It captures Generation IDs and lets you mark broken frames with timestamps for documentation, alongside the live prompt-failure score.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://chromewebstore.google.com/detail/aivideoauditor/ecomchbdfkgakaoponipjgpnjfpimdef"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-neon-green/15 hover:bg-neon-green/25 border border-neon-green/40 text-neon-green font-mono font-semibold text-[11px] tracking-wide uppercase px-5 py-2.5 rounded-md transition-colors"
              >
                Install free
              </a>
              <Link
                href="/research/132-ai-video-vendor-reviews"
                className="inline-flex items-center gap-2 border border-rule hover:border-ink-secondary text-ink-secondary hover:text-ink-primary font-mono font-medium text-[11px] tracking-wide uppercase px-5 py-2.5 rounded-md transition-colors"
              >
                Read the Vendor Reality Report
              </Link>
            </div>
          </section>
      </WidePageShell>
    </>
  );
}
