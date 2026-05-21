import type { Metadata } from 'next';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';

export const metadata: Metadata = {
  title: 'Higgsfield Refund Guide — When the 7-Day Window Closes (2026)',
  description:
    'Higgsfield\'s refund policy: 7-day window, first subscription only, credits-untouched. Annual subs and renewals: vendor discretion. What to do when their policy doesn\'t cover you — chargeback evidence checklist + alternatives.',
  alternates: { canonical: 'https://www.aivideoauditor.com/higgsfield-refund' },
  openGraph: {
    title: 'Higgsfield Refund Guide — When the 7-Day Window Closes',
    description:
      '64% of our Higgsfield 1-star reviews cite billing-mechanic disputes. Here\'s the policy reality + recovery paths.',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Higgsfield Refund Guide',
  description: 'Higgsfield refund policy explained + chargeback alternatives when the window doesn\'t cover you.',
  author: { '@type': 'Organization', name: 'AIVideoAuditor' },
  publisher: { '@type': 'Organization', name: 'AIVideoAuditor', url: 'https://www.aivideoauditor.com' },
  datePublished: '2026-05-21',
};

export default function HiggsfieldRefundPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <main className="min-h-screen py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-primary">Higgsfield Refund</span>
          </nav>

          <div className="mb-10">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-red uppercase mb-3">
              64% billing-predation rate · 132-review corpus
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-ink-primary mb-4 leading-tight">
              Higgsfield refund: <span className="text-neon-amber">narrow window, narrower scope.</span>
            </h1>
            <p className="text-ink-secondary leading-relaxed">
              Higgsfield&apos;s native refund window is 7 days, applies to first subscription only, and requires that no credits have been used. Renewals, annual subscriptions, and mid-cycle disputes fall outside the policy &mdash; meaning recovery has to go through your card issuer, not the vendor.
            </p>
            <p className="text-xs font-mono text-ink-muted mt-4 italic">
              Information from observed patterns. Not legal advice.
            </p>
          </div>

          {/* The 7-day policy */}
          <section className="mb-12 bg-elevated border border-border rounded-2xl p-6">
            <h2 className="text-xl font-bold text-ink-primary mb-4">The official policy (as of 2026-05-21)</h2>
            <ul className="space-y-3 text-sm text-ink-secondary">
              <li className="flex gap-3">
                <span className="text-neon-amber font-mono shrink-0">▸</span>
                <span><strong className="text-ink-primary">Window:</strong> 7 days from initial purchase.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neon-amber font-mono shrink-0">▸</span>
                <span><strong className="text-ink-primary">First subscription only:</strong> Subsequent renewals and upgrades are not refundable through the native policy.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neon-amber font-mono shrink-0">▸</span>
                <span><strong className="text-ink-primary">Credits untouched:</strong> If you&apos;ve generated even one credit-deducting output, the refund window is voided.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neon-amber font-mono shrink-0">▸</span>
                <span><strong className="text-ink-primary">Annual subs:</strong> No pro-rated refund. The 7-day window still applies but is effectively unusable for users who needed to test before committing.</span>
              </li>
            </ul>
          </section>

          {/* Documented failure patterns */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-4">What our corpus documents</h2>
            <p className="text-ink-secondary text-sm mb-4">
              From 41 Higgsfield-specific 1-star reviews tagged in our <Link href="/research/132-ai-video-vendor-reviews" className="text-neon-purple underline">132-review corpus</Link>:
            </p>
            <div className="space-y-3">
              <div className="bg-surface border border-border rounded-xl p-4">
                <p className="text-xs font-mono font-bold tracking-widest text-ink-muted uppercase mb-1">"Unlimited" → credit-metered</p>
                <p className="text-sm text-ink-secondary">Black Friday &ldquo;unlimited&rdquo; subscriptions reported credit-metered behavior post-day-7. Specifically: users who paid for unlimited generation found their throughput silently capped after the 7-day refund window closed.</p>
              </div>
              <div className="bg-surface border border-border rounded-xl p-4">
                <p className="text-xs font-mono font-bold tracking-widest text-ink-muted uppercase mb-1">"Battery" lockout</p>
                <p className="text-sm text-ink-secondary">Mid-subscription, a &ldquo;battery&rdquo; usage-lockout system was introduced. Paid Unlimited users hit with a $5 extortion fee to bypass the new restriction, contradicting the original marketing terms.</p>
              </div>
              <div className="bg-surface border border-border rounded-xl p-4">
                <p className="text-xs font-mono font-bold tracking-widest text-ink-muted uppercase mb-1">December 2025 account purge</p>
                <p className="text-sm text-ink-secondary">Mass account terminations with &ldquo;suspicious payment&rdquo; cited as justification. No appeal pathway documented. Multiple users in the corpus describe being banned without warning while still in active paid subscription.</p>
              </div>
              <div className="bg-surface border border-border rounded-xl p-4">
                <p className="text-xs font-mono font-bold tracking-widest text-ink-muted uppercase mb-1">Multi-charge incidents</p>
                <p className="text-sm text-ink-secondary">Verified: 5× $39 invoices documented on a single user account in a single day during December 2025. Support response was &gt;7 days.</p>
              </div>
              <div className="bg-surface border border-border rounded-xl p-4">
                <p className="text-xs font-mono font-bold tracking-widest text-ink-muted uppercase mb-1">May 2026 wait-time shift</p>
                <p className="text-sm text-ink-secondary">6+ May Trustpilot 1-stars independently name the same wait-time shift (5-10 min &rarr; 25-40 min per generation). Independent reporters, same vendor, same week.</p>
              </div>
            </div>
          </section>

          {/* If you're outside the window */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-4">If the 7-day window doesn&apos;t cover you</h2>
            <div className="space-y-4">
              <div className="bg-elevated border border-neon-amber/30 rounded-2xl p-5">
                <h3 className="font-bold text-ink-primary mb-2">Path 1 — Chargeback</h3>
                <p className="text-sm text-ink-secondary mb-3">
                  For credit card purchases: file with your issuer under &ldquo;Service not as described&rdquo; (not &ldquo;fraud&rdquo;). The strongest dispute frames for Higgsfield specifically:
                </p>
                <ul className="space-y-2 text-sm text-ink-secondary list-disc list-inside ml-2">
                  <li>Marketing &ldquo;Unlimited&rdquo; vs actual credit-metered behavior post-window.</li>
                  <li>Mid-cycle introduction of &ldquo;battery&rdquo; extortion fees not disclosed at purchase.</li>
                  <li>Account terminated while paid balance was active.</li>
                </ul>
                <p className="text-xs font-mono text-ink-muted mt-3">
                  See <Link href="/chargeback-guide" className="text-neon-purple underline">the full chargeback guide</Link> for card-issuer ranking and the 4-step process.
                </p>
              </div>
              <div className="bg-elevated border border-neon-cyan/30 rounded-2xl p-5">
                <h3 className="font-bold text-ink-primary mb-2">Path 2 — Escalate via Resolution Center</h3>
                <p className="text-sm text-ink-secondary">
                  If you&apos;re still in the 7-day window: file the refund request via Higgsfield support, screenshot everything, do NOT generate any more outputs. The clock runs from purchase, not from when you contact them.
                </p>
              </div>
              <div className="bg-elevated border border-neon-green/30 rounded-2xl p-5">
                <h3 className="font-bold text-ink-primary mb-2">Path 3 — Switch vendors</h3>
                <p className="text-sm text-ink-secondary">
                  If recovery isn&apos;t coming and you need to keep producing: see <Link href="/alternatives/runway" className="text-neon-purple underline">Runway</Link>, <Link href="/alternatives/kling" className="text-neon-purple underline">Kling</Link>, or <Link href="/alternatives/luma" className="text-neon-purple underline">Luma</Link>. Different vendors have different billing-predation rates (Runway 29% vs Higgsfield 64% in our corpus). Pay monthly initially &mdash; not annual &mdash; on any AI tool you haven&apos;t personally validated for 2+ weeks.
                </p>
              </div>
            </div>
          </section>

          {/* Lead capture */}
          <section className="mb-12 bg-elevated border border-border rounded-2xl p-6">
            <h2 className="text-xl font-bold text-ink-primary mb-2">Get the alert when Higgsfield changes its policy</h2>
            <p className="text-sm text-ink-secondary mb-4">
              AVA tracks Higgsfield&apos;s refund terms and pricing weekly. When their policy materially changes &mdash; window length, eligibility, refund grounds &mdash; you&apos;ll know within 24-48 hours.
            </p>
            <LeadCaptureForm
              source="higgsfield-refund"
              heading=""
              blurb=""
              cta="Notify me on policy change →"
            />
          </section>

          {/* Related */}
          <section className="text-center text-sm">
            <p className="text-ink-muted mb-3">Related</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 font-mono text-xs">
              <Link href="/billing-pattern-watch" className="text-neon-purple hover:underline">Billing Pattern Watch</Link>
              <span className="text-ink-muted">·</span>
              <Link href="/chargeback-guide" className="text-neon-purple hover:underline">Chargeback Guide</Link>
              <span className="text-ink-muted">·</span>
              <Link href="/research/132-ai-video-vendor-reviews" className="text-neon-purple hover:underline">132-Review Corpus</Link>
              <span className="text-ink-muted">·</span>
              <Link href="/sora-refund" className="text-neon-purple hover:underline">Sora Refund</Link>
              <span className="text-ink-muted">·</span>
              <Link href="/luma-refund-guide" className="text-neon-purple hover:underline">Luma Refund</Link>
              <span className="text-ink-muted">·</span>
              <Link href="/" className="text-neon-purple hover:underline">Home</Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
