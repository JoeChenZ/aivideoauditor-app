import type { Metadata } from 'next';
import Link from 'next/link';
import { COMPARISONS } from './[slug]/data';
import LeadCaptureForm from '@/components/lead-capture-form';
import { WidePageShell, Breadcrumb, ArticleHeader, SectionHead, Kicker, RuleDivider } from '@/components/editorial';

export const metadata: Metadata = {
  title: 'AI Video Model Comparisons — Head-to-Head by Failure Profile',
  description: 'Honest head-to-head comparisons of the major AI video generators. Runway vs Luma, Sora vs Veo, Kling vs Runway. Pick by shot type, not by leaderboard.',
  alternates: { canonical: 'https://www.aivideoauditor.com/compare' },
  openGraph: {
    title: 'AI Video Model Comparisons — Head-to-Head by Failure Profile',
    description: 'Pick by failure mode, not by brand. Side-by-side comparisons of Runway, Luma, Kling, Veo, Sora.',
    type: 'website',
  },
};

export default function CompareIndex() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI Video Model Comparisons',
    itemListElement: COMPARISONS.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://www.aivideoauditor.com/compare/${c.slug}`,
      name: `${c.toolALongName} vs ${c.toolBLongName}`,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.aivideoauditor.com' },
      { '@type': 'ListItem', position: 2, name: 'Head-to-Head Comparisons', item: 'https://www.aivideoauditor.com/compare' },
    ],
  };

  // FAQPage — high-intent head-to-head queries. Targets "X vs Y" searches.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How should I compare two AI video tools?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Compare by failure profile on your most-common shot type, not by overall "best" rating. Every generator has shot types where it wins and shot types where it fails — Runway is best for character work across cuts, Luma for lighting and atmosphere, Veo for native audio. Match the comparison to your prompt shape.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which is better: Runway or Luma?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Runway Gen-4 wins on character consistency across cuts (Scenes mode) and named-failure-category coverage. Luma Ray-2 wins on lighting realism and per-clip cost. Generation speed is similar. Pick Runway for multi-shot story work, Luma for mood-led atmospheric pieces. The /compare/runway-vs-luma page has the dimension-by-dimension breakdown.',
        },
      },
      {
        '@type': 'Question',
        name: 'Sora vs Veo — which should I use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sora 2 is sunsetting (consumer app shut 2026-04-26, API to September 2026), so Veo is the practical pick. Veo also has native audio generation which Sora lacked. For stylized motion (Sora\'s strength), Pika 2.0 is the closest substitute. See /compare/sora-vs-veo.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do these comparisons include cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Each comparison page includes per-clip cost (Pro tier), generation speed, and the effective cost per usable clip — the headline rate multiplied by 1/first-try-success-rate. A $0.05/sec rate with 40% first-try success is really $0.125/sec effective.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <WidePageShell>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Compare' }]} />

          <div className="max-w-reading">
            <ArticleHeader
              kicker={`Head-to-head · ${COMPARISONS.length} comparisons`}
              title={<>Pick the tool that <span className="italic">fails least</span> on your shot.</>}
              lede="Honest head-to-head comparisons of the major AI video generators, organized by failure profile rather than generic best-of leaderboards. Each comparison maps the dimensions where each tool wins, the named failure modes that recur, and side-by-side examples on real prompts."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
            {COMPARISONS.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="border border-rule hover:border-neon-amber/40 rounded-md p-6 bg-surface transition-colors group"
              >
                <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-3">Head-to-head</p>
                <h2 className="font-display text-xl font-semibold text-ink-primary mb-1.5 leading-snug">
                  {c.toolA} <span className="text-ink-muted font-normal italic">vs</span> {c.toolB}
                </h2>
                <p className="font-mono text-[11px] text-ink-muted">
                  {c.toolALongName} · {c.toolBLongName}
                </p>
              </Link>
            ))}
          </div>

          <RuleDivider label="Continue exploring" />

          <section className="mb-16 max-w-reading" aria-label="Continue exploring">
            <p className="text-ink-muted text-sm mb-6">
              More resources for picking the right tool before you commit credits.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/alternatives" className="border border-rule hover:border-ink-secondary rounded-md p-5 bg-surface transition-colors block">
                <Kicker className="mb-2">Alternatives guides</Kicker>
                <p className="font-display text-base font-semibold text-ink-primary mb-1.5">Ranked substitutes for every major tool</p>
                <p className="text-ink-muted text-xs">8 tools covered. Pick by shot type, not by leaderboard.</p>
              </Link>
              <Link href="/research/132-ai-video-vendor-reviews" className="border border-rule hover:border-ink-secondary rounded-md p-5 bg-surface transition-colors block">
                <Kicker className="mb-2">Research corpus</Kicker>
                <p className="font-display text-base font-semibold text-ink-primary mb-1.5">132 reviews across 11 vendors</p>
                <p className="text-ink-muted text-xs">Per-platform billing patterns, unlimited gating, refund mechanics.</p>
              </Link>
              <Link href="/failures" className="border border-rule hover:border-ink-secondary rounded-md p-5 bg-surface transition-colors block">
                <Kicker className="mb-2">Failure reference</Kicker>
                <p className="font-display text-base font-semibold text-ink-primary mb-1.5">105 documented failure modes</p>
                <p className="text-ink-muted text-xs">Catalogued across Runway, Luma, Sora, Pika, Kling, Veo, Hailuo, Vidu.</p>
              </Link>
              <Link href="/tools/credit-calculator" className="border border-rule hover:border-ink-secondary rounded-md p-5 bg-surface transition-colors block">
                <Kicker className="mb-2">Effective-cost calc</Kicker>
                <p className="font-display text-base font-semibold text-ink-primary mb-1.5">What you really pay per usable clip</p>
                <p className="text-ink-muted text-xs">List price × (1 / first-try success) × (1 + refund denial). No signup.</p>
              </Link>
            </div>
          </section>

          <div className="mb-16 max-w-reading">
            <LeadCaptureForm
              source="compare-index"
              heading="Want to skip the pairwise comparison? AVA Pro routes for you."
              blurb="These pairwise comparisons help you pick one tool. AVA Pro picks the right tool per prompt — based on your historical hit-rate. Pre-register for a 30% lifetime discount on launch day."
              cta="Notify me on launch"
            />
          </div>

          <section className="max-w-reading border-t border-rule/60 pt-10">
            <SectionHead kicker="Methodology" title="Why compare by failure mode." />
            <p className="text-ink-secondary leading-relaxed mb-3 max-w-prose">
              Most &ldquo;best AI video generator&rdquo; rankings sort by demo quality. That is misleading for production work — every generator fails differently, and the question that matters is which one fails least on your specific shot type.
            </p>
            <p className="text-ink-secondary leading-relaxed mb-3 max-w-prose">
              These comparisons map the dimensions where each tool wins and loses, with explicit links to the failure modes each vendor produces most often. Goal: pick by shot type, not by brand — and know which failure pattern to expect before you commit credits.
            </p>
            <p className="font-mono text-[11px] text-ink-muted">
              Based on AVA&apos;s failure-mode classifier across ~12,000 audited generations per model. See the{' '}
              <Link href="/failures" className="text-ink-secondary hover:text-ink-primary transition-colors">complete failure-mode reference</Link> for the full catalog.
            </p>
          </section>
      </WidePageShell>
    </>
  );
}
