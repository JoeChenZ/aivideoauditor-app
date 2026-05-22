import type { Metadata } from 'next';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';

const LAUNCH_ETA = 'mid-July 2026';

export const metadata: Metadata = {
  title: 'AVA Pro — Founders Waitlist',
  description: 'Founders round for AVA Pro at $50 for 6 months (vs $114 regular). Payment opens after end-to-end purchase flow is verified. Join the waitlist now to lock the founders price.',
  alternates: { canonical: 'https://www.aivideoauditor.com/early-access' },
};

export default function EarlyAccessPage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-2xl mx-auto">

        <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
          <span className="mx-2 text-rule">/</span>
          <span className="text-ink-secondary">Early Access</span>
        </nav>

        <div className="mb-10">
          <p className="font-mono text-[11px] tracking-kicker uppercase text-neon-amber mb-3">
            Founders&apos; round · waitlist open · payment opens soon
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink-primary mb-4 leading-tight tracking-tight">
            Lock in AVA Pro at $50 for 6 months.
          </h1>
          <p className="text-ink-secondary leading-relaxed">
            AVA Pro launches around <strong>{LAUNCH_ETA}</strong> at $19/mo. Founders pay $50 flat for the first 6 months instead of $114 — a 56% founders&apos; discount, locked in even after public pricing changes.
          </p>
        </div>

        {/* Why waitlist not pay-now */}
        <div className="bg-neon-amber/5 border border-neon-amber/30 rounded-md p-5 mb-6 text-sm">
          <p className="font-mono text-[11px] tracking-kicker uppercase text-neon-amber mb-3">
            Why this is a waitlist (read first)
          </p>
          <p className="text-ink-secondary leading-relaxed mb-3">
            The $50 Stripe link is built, the checkout flow is not yet end-to-end verified for auto-granting Pro access on payment. Rather than ship a broken purchase pipeline, the founders&apos; round is a waitlist for ~72 hours while we finish wiring it.
          </p>
          <p className="text-ink-secondary leading-relaxed">
            Drop your email below. When the auto-grant is live + tested, the first batch of waitlist emails get the $50 link with the founders&apos; price locked in. No marketing spam.
          </p>
        </div>

        <div className="border border-rule rounded-md p-6 mb-6 bg-surface">
          <h2 className="font-display text-lg font-semibold text-ink-primary mb-4">What you&apos;re paying $50 for</h2>
          <ul className="space-y-3 text-sm text-ink-secondary">
            <li className="flex gap-3">
              <span className="text-neon-green font-mono shrink-0">→</span>
              <span><strong className="text-ink-primary">Pre-generation prompt critique.</strong> Predicts likely failure modes <em>before</em> you spend credits, with a concrete rewrite suggestion.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-green font-mono shrink-0">→</span>
              <span><strong className="text-ink-primary">Cross-model A/B routing.</strong> Sends the same prompt to 2-3 models, returns the best result. Stops you betting all credits on one platform.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-green font-mono shrink-0">→</span>
              <span><strong className="text-ink-primary">Failure-mode dashboard.</strong> Tracks your historical credit waste by category and platform — find patterns, fix the root cause.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-green font-mono shrink-0">→</span>
              <span><strong className="text-ink-primary">All current free-tier features.</strong> Pre-purchase prompt scoring, vendor change alerts, seed library.</span>
            </li>
          </ul>
        </div>

        <div className="bg-neon-amber/5 border border-neon-amber/30 rounded-md p-5 mb-6 text-sm">
          <p className="font-mono text-[11px] tracking-kicker uppercase text-neon-amber mb-2">
            Honest disclosure
          </p>
          <ul className="space-y-2 text-ink-secondary leading-relaxed">
            <li>
              <strong className="text-ink-primary">Launch ETA is {LAUNCH_ETA}, not a guarantee.</strong> If Pro doesn&apos;t ship by August 31, 2026, you get a full refund plus a $20 apology credit. No questions.
            </li>
            <li>
              <strong className="text-ink-primary">Feature set is being finalized.</strong> The three Pro features above are what we&apos;re committed to. Specific UI / model coverage may evolve.
            </li>
            <li>
              <strong className="text-ink-primary">14-day refund window.</strong> Cancel in the first 14 days after Pro ships for a full refund. After that, the 6 months are non-refundable but transferable.
            </li>
            <li>
              <strong className="text-ink-primary">AVA is a prevention tool, not a recovery tool.</strong> The value is catching prompt-failures before you commit credits. Goodwill credits from platforms are discretionary and not something we promise.
            </li>
          </ul>
        </div>

        <div className="border border-neon-green/40 rounded-md p-8 mb-6 bg-paper">
          <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-2 text-center">
            Founders&apos; price (locked when payment opens)
          </p>
          <p className="font-display text-5xl font-semibold text-neon-green text-center mb-1">$50</p>
          <p className="text-sm text-ink-secondary text-center mb-6">
            for 6 months · then $19/mo (cancel anytime) · locked at $13/mo for life
          </p>

          <LeadCaptureForm
            source="early-access-founders-waitlist"
            heading=""
            blurb=""
            cta="Reserve my founders' slot"
            successMessage="Reserved. You'll be in the first batch when the $50 link opens (~72 hours). Watch your inbox."
          />
        </div>

        <div className="text-center">
          <Link href="/" className="text-sm font-mono text-ink-muted hover:text-ink-secondary transition-colors">
            ← Back to home
          </Link>
        </div>

      </div>
    </main>
  );
}
