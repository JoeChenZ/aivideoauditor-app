'use client';

import { useState } from 'react';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';

const PREORDER_URL = process.env.NEXT_PUBLIC_PREORDER_STRIPE_URL || '';
const LAUNCH_ETA = 'mid-July 2026';

export default function EarlyAccessPage() {
  const [showStripeWarning, setShowStripeWarning] = useState(false);

  const handlePreorderClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!PREORDER_URL) {
      e.preventDefault();
      setShowStripeWarning(true);
    }
  };

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-2xl mx-auto">

        <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-ink-primary">Early Access</span>
        </nav>

        <div className="mb-10">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-3">
            Founders&apos; round · limited slots
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-ink-primary mb-4 leading-tight">
            Lock in AVA Pro at $50 for 6 months.
          </h1>
          <p className="text-ink-secondary leading-relaxed">
            AVA Pro launches around <strong>{LAUNCH_ETA}</strong> at $19/mo. Pre-order today and pay
            $50 flat for the first 6 months instead of $114 — a 56% founders&apos; discount, locked
            in even after public pricing changes.
          </p>
        </div>

        {/* What you get */}
        <div className="bg-elevated border border-border rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-ink-primary mb-4">What you&apos;re paying for</h2>
          <ul className="space-y-3 text-sm text-ink-secondary">
            <li className="flex gap-3">
              <span className="text-neon-green font-mono shrink-0">→</span>
              <span><strong className="text-ink-primary">Pre-generation prompt critique.</strong> Predicts likely failure modes <em>before</em> you spend credits, with a tweaked prompt suggestion.</span>
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
              <span><strong className="text-ink-primary">All current free-tier features.</strong> Auditor, refund-letter drafter (note: refund approval is at platform discretion), seed library.</span>
            </li>
          </ul>
        </div>

        {/* Honest disclaimer */}
        <div className="bg-neon-amber/5 border border-neon-amber/30 rounded-2xl p-5 mb-6 text-sm">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-amber uppercase mb-2">
            Honest disclosure
          </p>
          <ul className="space-y-2 text-ink-secondary leading-relaxed">
            <li>
              <strong>Launch ETA is {LAUNCH_ETA}, not a guarantee.</strong> If Pro doesn&apos;t ship by
              August 31, 2026, you get a full refund plus a $20 apology credit. No questions.
            </li>
            <li>
              <strong>Feature set is being finalized.</strong> The three Pro features above are what
              we&apos;re committed to. Specific UI / model coverage may evolve based on user research.
            </li>
            <li>
              <strong>You can cancel anytime in the first 14 days for a full refund.</strong> After
              that, the 6 months are non-refundable but transferable.
            </li>
            <li>
              <strong>Refund-letter drafter is a bonus, not the wedge.</strong> Platforms generally
              do not refund credits for output-quality failures. Goodwill credits are at agent
              discretion. AVA writes a better ticket; we cannot guarantee approval.
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-surface border border-neon-green/30 rounded-2xl p-8 mb-6 text-center">
          <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">
            Founders&apos; price
          </p>
          <p className="text-5xl font-bold text-neon-green mb-1">$50</p>
          <p className="text-sm text-ink-secondary mb-6">
            for 6 months · then $19/mo (cancel anytime) · locked at $13/mo for life
          </p>

          <a
            href={PREORDER_URL || '#'}
            onClick={handlePreorderClick}
            target={PREORDER_URL ? '_blank' : undefined}
            rel={PREORDER_URL ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center justify-center gap-2 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-mono font-bold px-8 py-4 rounded-xl transition-all"
          >
            Pre-order with Stripe →
          </a>

          {showStripeWarning && (
            <p className="text-xs text-neon-amber mt-3 font-mono">
              Pre-order link not configured yet. Set <code className="bg-elevated px-1 rounded">NEXT_PUBLIC_PREORDER_STRIPE_URL</code> env var in Vercel.
            </p>
          )}
        </div>

        {/* Not ready yet */}
        <div className="bg-elevated border border-border rounded-2xl p-6 mb-10">
          <p className="text-sm text-ink-secondary mb-4">
            Not ready to pre-order? Drop your email and I&apos;ll notify you when Pro launches —
            you can decide then.
          </p>
          <LeadCaptureForm
            source="early-access-notify"
            heading=""
            blurb=""
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
