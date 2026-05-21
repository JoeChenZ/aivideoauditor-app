import type { Metadata } from 'next';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';

export const metadata: Metadata = {
  title: 'Runway Unlimited Slowdown — May 2026 Data + What to Do',
  description:
    'Documented wait-time shift on Runway Unlimited tier in May 2026 (generations 5-10 min → 25-40 min). 6 of 11 May Trustpilot 1-stars cite it independently. Plus options: chargeback, downgrade, switch.',
  alternates: { canonical: 'https://www.aivideoauditor.com/runway-unlimited-slowdown' },
  openGraph: {
    title: 'Runway Unlimited Slowdown — May 2026 Data + What to Do',
    description:
      'Wait times roughly doubled on the Unlimited tier this month. 6 of 11 May Trustpilot 1-stars confirm independently. Here\'s the data + recovery paths.',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Runway Unlimited Slowdown — May 2026 Data + What to Do',
  description: 'Documented wait-time shift on Runway Unlimited tier in May 2026.',
  author: { '@type': 'Organization', name: 'AIVideoAuditor' },
  publisher: { '@type': 'Organization', name: 'AIVideoAuditor', url: 'https://www.aivideoauditor.com' },
  datePublished: '2026-05-21',
};

export default function RunwayUnlimitedSlowdownPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <main className="min-h-screen py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/billing-pattern-watch" className="hover:text-ink-secondary transition-colors">Billing Watch</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-primary">Runway Unlimited Slowdown</span>
          </nav>

          <div className="mb-10">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-amber uppercase mb-3">
              Active issue · May 2026
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-ink-primary mb-4 leading-tight">
              Runway Unlimited got <span className="text-neon-amber">~2× slower</span> in May 2026.
            </h1>
            <p className="text-ink-secondary leading-relaxed text-lg">
              If your Runway generations went from <strong className="text-ink-primary">5–10 minutes</strong> to <strong className="text-neon-amber">25–40 minutes</strong> sometime around the second week of May, you&apos;re not imagining it. <strong>6 of 11 May Runway Trustpilot 1-stars</strong> cite the same shift unprompted, plus a wave of creator complaints on X and Reddit.
            </p>
          </div>

          {/* The data */}
          <section className="mb-12 bg-elevated border border-border rounded-2xl p-6">
            <h2 className="text-xl font-bold text-ink-primary mb-4">The data</h2>
            <ul className="space-y-3 text-sm text-ink-secondary">
              <li className="flex gap-3">
                <span className="text-neon-amber font-mono shrink-0">▸</span>
                <span><strong className="text-ink-primary">Trustpilot:</strong> 6 of 11 1-star reviews dated 2026-05-01 to 2026-05-21 explicitly name wait-time as the primary complaint. Identical wording across reviewers: &ldquo;way slower,&rdquo; &ldquo;cut in half,&rdquo; &ldquo;production efficiency.&rdquo;</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neon-amber font-mono shrink-0">▸</span>
                <span><strong className="text-ink-primary">X / Twitter:</strong> Multiple creator threads — including @IntLab0000 (2.8K-view May 18 + 8.4K-view May 20 follow-up) and @phencasedguy (May 19, 1.3K views) — describe the same slowdown affecting production output.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neon-amber font-mono shrink-0">▸</span>
                <span><strong className="text-ink-primary">Reddit:</strong> r/runwayML thread &ldquo;How can I get unlimited plan?&rdquo; (2026-05-19) has commenters confirming the slowdown.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neon-amber font-mono shrink-0">▸</span>
                <span><strong className="text-ink-primary">Independence:</strong> Same vendor, same week, independent reporters who don&apos;t cite each other. Convergence on wording strongly suggests a real backend change rather than a perception cluster.</span>
              </li>
            </ul>
          </section>

          {/* What Runway has + hasn't said */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-4">What Runway has and hasn&apos;t said</h2>
            <div className="space-y-3 text-sm">
              <div className="bg-surface border border-border rounded-xl p-4">
                <p className="text-xs font-mono font-bold tracking-widest text-ink-muted uppercase mb-1">No official statement</p>
                <p className="text-ink-secondary">As of 2026-05-21, no public Runway statement attributes the slowdown to capacity, infrastructure, or model upgrades. Recent comms focus on the AI Festival (May 20), Seedance 2.0 rollout, and the Aleph push.</p>
              </div>
              <div className="bg-surface border border-border rounded-xl p-4">
                <p className="text-xs font-mono font-bold tracking-widest text-ink-muted uppercase mb-1">Quota structure unchanged on paper</p>
                <p className="text-ink-secondary">Unlimited remains paid + uncapped per tier docs. Image and video are separate buckets; usage of one doesn&apos;t deduct from the other. But throughput &mdash; how fast each generation completes &mdash; is not contractual.</p>
              </div>
              <div className="bg-surface border border-border rounded-xl p-4">
                <p className="text-xs font-mono font-bold tracking-widest text-ink-muted uppercase mb-1">Pattern fits prior silent nerfs</p>
                <p className="text-ink-secondary">This is the second documented silent throughput change on Runway in 2026 (the previous wave hit early Q1). Neither was preceded by a tier-docs update or email notice.</p>
              </div>
            </div>
          </section>

          {/* What to do */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-4">Your options</h2>
            <div className="space-y-4">
              <div className="bg-elevated border border-neon-cyan/30 rounded-2xl p-5">
                <h3 className="font-bold text-ink-primary mb-2">If you&apos;re on monthly Unlimited</h3>
                <p className="text-sm text-ink-secondary">Easiest path: cancel before next renewal. Monthly carries no annual lock-in; you bail out at the next cycle without dispute. Runway support generally honors mid-month proration only if you escalate; most users just ride out the current cycle.</p>
              </div>
              <div className="bg-elevated border border-neon-amber/30 rounded-2xl p-5">
                <h3 className="font-bold text-ink-primary mb-2">If you&apos;re on annual Unlimited</h3>
                <p className="text-sm text-ink-secondary">More tools available. Within the first 14 days: vendor&apos;s native refund window applies. After 14 days: card-issuer chargeback is the fastest recovery path for a marketing-vs-actual mismatch (&ldquo;Unlimited&rdquo; tier no longer delivering the unlimited throughput marketed at purchase). See <Link href="/chargeback-guide" className="text-neon-purple underline">the chargeback path</Link> for the 4-step process.</p>
              </div>
              <div className="bg-elevated border border-neon-green/30 rounded-2xl p-5">
                <h3 className="font-bold text-ink-primary mb-2">If you need to keep producing now</h3>
                <p className="text-sm text-ink-secondary">Compare to alternatives that haven&apos;t experienced the same throughput change recently. <Link href="/compare/kling-vs-runway" className="text-neon-purple underline">Kling vs Runway</Link>, <Link href="/compare/runway-vs-luma" className="text-neon-purple underline">Runway vs Luma</Link>, and <Link href="/compare/sora-vs-veo" className="text-neon-purple underline">Sora vs Veo</Link> all cover throughput + per-second cost. Different tools have different failure modes; pick based on your prompt risk profile.</p>
              </div>
            </div>
          </section>

          {/* Chargeback specifics */}
          <section className="mb-12 bg-neon-amber/5 border border-neon-amber/30 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-ink-primary mb-3">If you&apos;re going the chargeback route</h2>
            <p className="text-sm text-ink-secondary mb-4">
              The strongest dispute frame is &ldquo;Service not as described.&rdquo; Document evidence:
            </p>
            <ol className="space-y-2 text-sm text-ink-secondary list-decimal list-inside">
              <li>Screenshot Runway&apos;s Unlimited tier marketing page from your <strong className="text-ink-primary">purchase date</strong> (use Wayback Machine if it&apos;s changed since).</li>
              <li>Screenshot your most recent generation queue showing the 25-40 min wait times.</li>
              <li>Screenshot a generation completed pre-May for comparison if you have one.</li>
              <li>One polite email to Runway support describing the discrepancy. Save their reply (or 7-day silence).</li>
              <li>File the dispute with your card issuer. Category: &ldquo;Service not as described.&rdquo; Attach all four screenshots + the email exchange.</li>
            </ol>
            <p className="text-xs font-mono text-ink-muted mt-4 italic">
              We don&apos;t draft refund letters — but the <Link href="/chargeback-guide" className="text-neon-purple underline">full chargeback guide</Link> has card-issuer success-rate rankings (Amex highest, debit lowest).
            </p>
          </section>

          {/* Lead capture */}
          <section className="mb-12 bg-elevated border border-border rounded-2xl p-6">
            <h2 className="text-xl font-bold text-ink-primary mb-2">Get notified when Runway changes its policy</h2>
            <p className="text-sm text-ink-secondary mb-4">
              AVA monitors vendor tier docs + community sentiment weekly. If Runway either restores throughput OR formally announces a quota change, you&apos;ll know within 24-48 hours of the change. No marketing spam.
            </p>
            <LeadCaptureForm
              source="runway-unlimited-slowdown"
              heading=""
              blurb=""
              cta="Add me to the Runway watch list →"
            />
          </section>

          {/* Related */}
          <section className="text-center text-sm">
            <p className="text-ink-muted mb-3">Related</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 font-mono text-xs">
              <Link href="/billing-pattern-watch" className="text-neon-purple hover:underline">Billing Pattern Watch (Runway entry)</Link>
              <span className="text-ink-muted">·</span>
              <Link href="/chargeback-guide" className="text-neon-purple hover:underline">Chargeback Guide</Link>
              <span className="text-ink-muted">·</span>
              <Link href="/research/132-ai-video-vendor-reviews" className="text-neon-purple hover:underline">132-Review Corpus</Link>
              <span className="text-ink-muted">·</span>
              <Link href="/alternatives/runway" className="text-neon-purple hover:underline">Runway Alternatives</Link>
              <span className="text-ink-muted">·</span>
              <Link href="/" className="text-neon-purple hover:underline">Home</Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
