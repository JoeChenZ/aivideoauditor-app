import type { Metadata } from 'next';
import Link from 'next/link';
import { ALTERNATIVES } from './[slug]/data';
import LeadCaptureForm from '@/components/lead-capture-form';
import { WidePageShell, Breadcrumb, ArticleHeader, SectionHead, Kicker, RuleDivider } from '@/components/editorial';

export const metadata: Metadata = {
  title: 'AI Video Tool Alternatives — Honest Comparison Guide (2026)',
  description: 'Ranked alternatives to every major AI video generator by shot type. Runway, Luma, Kling, Veo, Pika, Sora, Hailuo, Seedance — pick the right substitute for your specific work.',
  alternates: { canonical: 'https://www.aivideoauditor.com/alternatives' },
  openGraph: {
    title: 'AI Video Tool Alternatives — Honest Comparison Guide',
    description: 'Pick the right substitute by shot type, not by leaderboard.',
    type: 'website',
  },
};

// Structured data — currently the page exposed zero schema. Adds ItemList for the
// per-tool guides, BreadcrumbList for hierarchy, and FAQPage for SERP rich results.
const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'AI Video Tool Alternatives Guides',
  itemListElement: ALTERNATIVES.map((a, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `https://www.aivideoauditor.com/alternatives/${a.slug}`,
    name: `${a.toolFullName} — Alternatives`,
  })),
};
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.aivideoauditor.com' },
    { '@type': 'ListItem', position: 2, name: 'Alternatives', item: 'https://www.aivideoauditor.com/alternatives' },
  ],
};
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I pick the right alternative to my current AI video tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pick by failure mode of your most common shot, not by leaderboard. Every AI video generator fails differently — Runway nails character consistency but loses on cinematic lighting; Luma is the inverse. Identify the failure type you keep hitting on your current tool, then pick the alternative that handles that shot type best.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which AI video tool has shut down?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sora\'s consumer app shut on 2026-04-26; API access remains until September 2026. The /graveyard page tracks the full deprecation timeline plus per-tool migration paths so you can find a replacement before the cut-off.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Runway better than Luma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Neither is universally better. Runway Gen-4 wins on character consistency across cuts (Scenes mode) and named-failure-category coverage. Luma Ray-2 wins on lighting realism and per-clip cost. The /compare/runway-vs-luma page maps the dimensions and example prompts head-to-head.',
      },
    },
    {
      '@type': 'Question',
      name: 'What replaces Sora 2 now that it is sunsetting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For stylized motion (Sora\'s strength), Pika 2.0 is the closest substitute. For native audio, Veo. For production reliability and refund recognition, Runway Gen-4. The /alternatives/sora migration guide ranks the substitutes per shot type.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there free alternatives to paid AI video tools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most consumer-tier generators offer a free quota (5-10 clips/month) before paywalling. Quality on free tiers typically tracks the paid tier — what changes is volume, queue priority, and output resolution. Each alternatives guide flags which providers have meaningful free tiers and which gate everything behind paid plans.',
      },
    },
  ],
};

export default function AlternativesIndex() {
  return (
    <WidePageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Alternatives' }]} />

      <div className="max-w-reading">
        <ArticleHeader
          kicker={`Alternatives guides · ${ALTERNATIVES.length} tools covered`}
          title={<>Looking for an alternative to your current AI video tool?</>}
          lede="Every consumer-tier AI video generator has shot types where it shines and shot types where it fails. The right alternative depends on which failure mode you are hitting on your current tool — not on which model is &ldquo;the best.&rdquo;"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
        {ALTERNATIVES.map((a) => (
          <Link
            key={a.slug}
            href={`/alternatives/${a.slug}`}
            className="border border-rule hover:border-neon-amber/40 rounded-md p-6 bg-surface transition-colors block"
          >
            <Kicker className="mb-2">
              {a.toolStatus === 'dead' ? 'Migration guide' : 'Alternatives to'}
            </Kicker>
            <h2 className="font-display text-xl font-semibold text-ink-primary mb-1.5 leading-snug">{a.toolFullName}</h2>
            <p className="font-mono text-[11px] text-ink-muted">{a.options.length} ranked alternatives</p>
          </Link>
        ))}
      </div>

      <RuleDivider label="Continue exploring" />

      <section className="mb-16" aria-label="Continue exploring">
        <p className="text-ink-muted text-sm mb-6 max-w-prose">
          More resources for picking the right tool before you subscribe.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/compare" className="border border-rule hover:border-ink-secondary rounded-md p-5 bg-surface transition-colors block">
            <Kicker className="mb-2">Head-to-head comparisons</Kicker>
            <p className="font-display text-base font-semibold text-ink-primary mb-1.5">Detailed pairwise comparisons</p>
            <p className="text-ink-muted text-xs">Runway vs Luma, Sora vs Veo, Kling vs Runway, more.</p>
          </Link>
          <Link href="/failures" className="border border-rule hover:border-ink-secondary rounded-md p-5 bg-surface transition-colors block">
            <Kicker className="mb-2">Failure reference</Kicker>
            <p className="font-display text-base font-semibold text-ink-primary mb-1.5">105 documented failure modes</p>
            <p className="text-ink-muted text-xs">Across 8 providers, with the technical names support recognises.</p>
          </Link>
          <Link href="/case-studies" className="border border-rule hover:border-ink-secondary rounded-md p-5 bg-surface transition-colors block">
            <Kicker className="mb-2">Case studies</Kicker>
            <p className="font-display text-base font-semibold text-ink-primary mb-1.5">Real-world failure-mode walk-throughs</p>
            <p className="text-ink-muted text-xs">Anonymized stories — solo creator, agency, brand account.</p>
          </Link>
          <Link href="/graveyard" className="border border-rule hover:border-ink-secondary rounded-md p-5 bg-surface transition-colors block">
            <Kicker className="mb-2">AI tool graveyard</Kicker>
            <p className="font-display text-base font-semibold text-ink-primary mb-1.5">Stability tracker + migration paths</p>
            <p className="text-ink-muted text-xs">Tracked record of every shut-down or deprecated tool.</p>
          </Link>
        </div>
      </section>

      <section className="mb-16 max-w-prose">
        <LeadCaptureForm
          source="alternatives-index"
          heading="Want AVA Pro to pick the right tool for you, automatically?"
          blurb="AVA Pro routes each prompt to whichever provider fails least on that shot type based on your historical hit-rate. Pre-register for a 30% lifetime discount on launch day."
          cta="Notify me on launch"
        />
      </section>

      <section className="border-t border-rule/60 pt-10 max-w-reading">
        <SectionHead kicker="Methodology" title="Why pick by shot type, not by leaderboard." />
        <p className="text-ink-secondary leading-relaxed mb-3 max-w-prose">
          Most &ldquo;best AI video tool&rdquo; rankings sort by demo quality. That is misleading for production work — every generator fails differently, and the question that matters is which one fails least on your specific shot type.
        </p>
        <p className="text-ink-secondary leading-relaxed max-w-prose">
          Each alternatives guide on this site ranks substitutes by use case, not by overall &ldquo;best.&rdquo; The right alternative to Runway depends on whether you are replacing it for character work, motion, lighting, or audio — and the answer differs for each.
        </p>
      </section>
    </WidePageShell>
  );
}
