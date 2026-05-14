import type { Metadata } from 'next';
import Link from 'next/link';
import { CASE_STUDIES } from './[slug]/data';

export const metadata: Metadata = {
  title: 'AVA Case Studies — Refund Recovery Stories',
  description: 'Anonymous case studies of AVA users recovering AI video credits across providers. Solo creators, agencies, brand accounts — typical recovery $84-612/mo in week 1.',
  alternates: { canonical: 'https://www.aivideoauditor.com/case-studies' },
  openGraph: {
    title: 'AVA Case Studies — Refund Recovery Stories',
    description: 'How real AVA users recover AI video credits — solo creators, agencies, brand accounts.',
    type: 'website',
  },
};

export default function CaseStudiesIndex() {
  const totalRecovered = CASE_STUDIES.reduce((sum, c) => sum + c.totalRefundedMonthly, 0);

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">

        <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-ink-primary">Case Studies</span>
        </nav>

        <div className="mb-12">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
            Case Studies · ${totalRecovered}/mo recovered across {CASE_STUDIES.length} users
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-ink-primary mb-4 leading-tight">
            How AVA users recover AI video credits
          </h1>
          <p className="text-ink-secondary leading-relaxed max-w-2xl">
            Anonymous case studies of real AVA users — solo creators, boutique agencies, brand accounts.
            Each story is structured the same way: customer profile, problem, before AVA, with AVA,
            month-one refund breakdown, workflow changes that stuck.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {CASE_STUDIES.map((c) => (
            <Link
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              className="bg-elevated border border-border rounded-2xl p-6 hover:border-neon-green/30 transition-colors block"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">{c.customerType}</p>
                  <h2 className="font-bold text-ink-primary text-lg leading-tight mb-2">{c.title}</h2>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-neon-green">${c.totalRefundedMonthly}</p>
                  <p className="text-xs font-mono text-ink-muted uppercase tracking-wider">recovered/mo</p>
                </div>
              </div>
              <p className="text-ink-secondary text-sm leading-relaxed mb-4">{c.problemSummary.substring(0, 220)}…</p>
              <div className="flex flex-wrap gap-2">
                {c.primaryFailureModes.slice(0, 3).map((fm, i) => (
                  <span key={i} className="text-xs font-mono bg-surface border border-border px-2 py-1 rounded text-ink-muted">
                    {fm}
                  </span>
                ))}
              </div>
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
            <Link href="/tools/credit-calculator" className="bg-elevated border border-border rounded-xl p-5 hover:border-neon-green/30 transition-colors block">
              <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-2">Free calculator</p>
              <p className="text-ink-primary font-bold text-sm mb-1">Estimate your own recovery potential</p>
              <p className="text-ink-muted text-xs">Inputs: monthly spend + primary failure mode. No signup.</p>
            </Link>
            <Link href="/alternatives" className="bg-elevated border border-border rounded-xl p-5 hover:border-neon-purple/30 transition-colors block">
              <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-2">Alternatives guides</p>
              <p className="text-ink-primary font-bold text-sm mb-1">Ranked substitutes for every major tool</p>
              <p className="text-ink-muted text-xs">8 tools covered. Pick by shot type, not by leaderboard.</p>
            </Link>
            <Link href="/compare" className="bg-elevated border border-border rounded-xl p-5 hover:border-neon-purple/30 transition-colors block">
              <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-2">Head-to-head comparisons</p>
              <p className="text-ink-primary font-bold text-sm mb-1">Detailed pairwise comparisons</p>
              <p className="text-ink-muted text-xs">Runway vs Luma, Sora vs Veo, Kling vs Runway, and more.</p>
            </Link>
            <Link href="/failures" className="bg-elevated border border-border rounded-xl p-5 hover:border-neon-red/30 transition-colors block">
              <p className="text-xs font-mono font-bold tracking-widest text-neon-red uppercase mb-2">Failure reference</p>
              <p className="text-ink-primary font-bold text-sm mb-1">94 documented failure modes</p>
              <p className="text-ink-muted text-xs">Use these technical names in refund tickets.</p>
            </Link>
          </div>
        </section>

        <section className="mt-12 bg-elevated border border-border rounded-2xl p-8">
          <h2 className="text-xl font-bold text-ink-primary mb-4">Why we publish case studies anonymously</h2>
          <p className="text-ink-secondary text-sm leading-relaxed mb-3">
            Most AI video customers don&apos;t want to publicly disclose their refund recovery — partly because
            it advertises their failure rate, partly because they want to keep the refund flow as their competitive
            advantage. We respect that.
          </p>
          <p className="text-ink-secondary text-sm leading-relaxed mb-3">
            All case studies are based on real AVA users with their permission to publish anonymized. Customer
            types, monthly spend ranges, and recovery numbers are accurate. Specific provider names, failure
            categories, and workflow patterns are real — only the customer identity is obscured.
          </p>
          <p className="text-ink-muted text-xs">
            If you&apos;re an AVA user willing to be named in a case study, email
            {' '}<a href="mailto:joe@aivideoauditor.com" className="text-neon-purple hover:underline">joe@aivideoauditor.com</a>.
            Named case studies typically include a 10-15 minute interview and your sign-off on the draft before publish.
          </p>
        </section>

      </div>
    </main>
  );
}
