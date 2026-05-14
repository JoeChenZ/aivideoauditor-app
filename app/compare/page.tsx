import type { Metadata } from 'next';
import Link from 'next/link';
import { COMPARISONS } from './[slug]/data';
import LeadCaptureForm from '@/components/lead-capture-form';

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <main className="min-h-screen py-20 px-6">
        <div className="max-w-3xl mx-auto">

          <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-primary">Compare</span>
          </nav>

          <div className="mb-12">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-3">
              Head-to-head · {COMPARISONS.length} comparisons
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-ink-primary mb-4 leading-tight">
              Pick the tool that fails least on your shot
            </h1>
            <p className="text-ink-secondary leading-relaxed">
              Honest head-to-head comparisons of the major AI video generators, organized by
              failure profile rather than generic "best of" leaderboards. Each comparison maps
              the dimensions where each tool wins, the named failure modes that get refunded,
              and side-by-side examples on real prompts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COMPARISONS.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="bg-elevated border border-border rounded-xl p-6 hover:border-neon-purple/30 transition-colors"
              >
                <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">Head-to-head</p>
                <h2 className="font-bold text-ink-primary text-lg mb-1">
                  {c.toolA} <span className="text-ink-muted">vs</span> {c.toolB}
                </h2>
                <p className="text-xs text-ink-muted">
                  {c.toolALongName} · {c.toolBLongName}
                </p>
              </Link>
            ))}
          </div>

          {/* Continue exploring — cross-links */}
          <section className="mt-12" aria-label="Continue exploring">
            <h2 className="text-xl font-bold text-ink-primary mb-2">Continue exploring</h2>
            <p className="text-ink-muted text-sm mb-6">
              More resources for picking the right tool and recovering credits when things go wrong.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/alternatives" className="bg-elevated border border-border rounded-xl p-5 hover:border-neon-purple/30 transition-colors block">
                <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-2">Alternatives guides</p>
                <p className="text-ink-primary font-bold text-sm mb-1">Ranked substitutes for every major tool</p>
                <p className="text-ink-muted text-xs">8 tools covered. Pick by shot type, not by leaderboard.</p>
              </Link>
              <Link href="/case-studies" className="bg-elevated border border-border rounded-xl p-5 hover:border-neon-green/30 transition-colors block">
                <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-2">Case studies</p>
                <p className="text-ink-primary font-bold text-sm mb-1">$84-612/mo recovered by real users</p>
                <p className="text-ink-muted text-xs">Anonymized refund-recovery stories — solo creator, agency, brand account.</p>
              </Link>
              <Link href="/failures" className="bg-elevated border border-border rounded-xl p-5 hover:border-neon-red/30 transition-colors block">
                <p className="text-xs font-mono font-bold tracking-widest text-neon-red uppercase mb-2">Failure reference</p>
                <p className="text-ink-primary font-bold text-sm mb-1">94 documented failure modes</p>
                <p className="text-ink-muted text-xs">The technical names support recognises in refund tickets.</p>
              </Link>
              <Link href="/tools/credit-calculator" className="bg-elevated border border-border rounded-xl p-5 hover:border-neon-green/30 transition-colors block">
                <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-2">Free calculator</p>
                <p className="text-ink-primary font-bold text-sm mb-1">How much are you leaving on the table?</p>
                <p className="text-ink-muted text-xs">Estimate your refund recovery — no signup.</p>
              </Link>
            </div>
          </section>

          {/* Lead capture — converts comparison-shopping buyers */}
          <div className="mt-12">
            <LeadCaptureForm
              source="compare-index"
              heading="Want to skip the pairwise comparison? AVA Pro routes for you."
              blurb="These pairwise comparisons help you pick one tool. AVA Pro picks the right tool per prompt — based on your historical hit-rate. Pre-register for a 30% lifetime discount on launch day."
              cta="Notify me on launch →"
            />
          </div>

          <section className="mt-12 bg-elevated border border-border rounded-2xl p-8">
            <h2 className="text-xl font-bold text-ink-primary mb-4">Why compare by failure mode</h2>
            <p className="text-ink-secondary text-sm leading-relaxed mb-3">
              Most "best AI video generator" rankings sort by demo quality. That's misleading for
              production work — every generator fails differently, and the question that matters is
              which one fails least on your specific shot type.
            </p>
            <p className="text-ink-secondary text-sm leading-relaxed mb-3">
              These comparisons map the dimensions where each tool wins and loses, with explicit
              links to the named refund categories so you know what's recoverable when things go wrong.
              The goal is to help you pick by shot type, not by brand.
            </p>
            <p className="text-ink-muted text-xs">
              Based on AVA's failure-mode classifier across ~12,000 audited generations per model.
              See the <Link href="/failures" className="text-neon-purple hover:underline">complete failure-mode reference</Link>
              {' '}for the full catalog.
            </p>
          </section>

        </div>
      </main>
    </>
  );
}
