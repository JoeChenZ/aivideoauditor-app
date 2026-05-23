import type { Metadata } from 'next';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';
import StripeBuyButton from './stripe-buy-button';

const LAUNCH_ETA = 'mid-July 2026';
const PREORDER_URL = process.env.NEXT_PUBLIC_PREORDER_STRIPE_URL || '';
const CHROME_EXT_URL = 'https://chromewebstore.google.com/detail/aivideoauditor/ecomchbdfkgakaoponipjgpnjfpimdef';

export const metadata: Metadata = {
  title: 'AIVideoAuditor — Free Chrome extension scores your prompt before you Generate',
  description: 'Free Chrome extension that scores your AI-video prompt before you click Generate. Predicts the likely failure mode and a rewrite, so you don’t burn credits on a retry-bait result. Optional $50 founders upgrade.',
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

        {/* HERO — free Chrome extension (matches Reddit ad promise) */}
        <div className="mb-8">
          <p className="font-mono text-[11px] tracking-kicker uppercase text-neon-green mb-3">
            Free Chrome extension · live in the Chrome Web Store
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink-primary mb-4 leading-tight tracking-tight">
            Score your AI-video prompt before you click Generate.
          </h1>
          <p className="text-ink-secondary leading-relaxed">
            Free Chrome extension. Reads the prompt on Runway / Luma / Higgsfield / Pika, predicts the
            most-likely failure mode from a 105-mode catalogue, suggests a concrete rewrite. Stops you
            burning credits on a prompt the model already mis-handled in our 132-review corpus.
          </p>
        </div>

        {/* HERO CTAs — Chrome install (primary) + email capture (secondary) */}
        <div className="border border-neon-green/40 rounded-md p-8 mb-6 bg-paper">
          <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-3 text-center">
            Free path · no card, no signup wall
          </p>
          <a
            href={CHROME_EXT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-neon-green text-paper font-mono font-bold text-base px-6 py-4 rounded-md hover:bg-neon-green/90 transition-colors mb-4"
            data-cta="early-access-chrome-install"
          >
            ADD TO CHROME — FREE →
          </a>
          <p className="text-center text-xs font-mono text-ink-muted mb-6">
            Chrome Web Store · v1.1.0 · works on Runway, Luma, Higgsfield, Pika
          </p>

          <div className="border-t border-rule pt-5">
            <p className="text-sm text-ink-secondary mb-3 text-center">
              Not on Chrome? Drop your email — we&apos;ll ping you when the Firefox / Safari builds ship.
            </p>
            <LeadCaptureForm
              source="early-access-hero"
              heading=""
              blurb=""
              cta="Notify me when other browsers ship →"
            />
          </div>
        </div>

        {/* What the extension does (above-fold-ish, keeps user reading) */}
        <div className="border border-rule rounded-md p-6 mb-10 bg-surface">
          <h2 className="font-display text-lg font-semibold text-ink-primary mb-4">What the free extension does</h2>
          <ul className="space-y-3 text-sm text-ink-secondary">
            <li className="flex gap-3">
              <span className="text-neon-green font-mono shrink-0">→</span>
              <span><strong className="text-ink-primary">Pre-generation prompt scoring.</strong> 0-100 risk score with the named failure mode (e.g. &ldquo;Anatomical Topology — high risk on Runway Gen-3, fingers&rdquo;) before you spend a credit.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-green font-mono shrink-0">→</span>
              <span><strong className="text-ink-primary">Concrete rewrite.</strong> Suggests the specific edit that reduces the predicted failure — not vague &ldquo;be more specific&rdquo; advice.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-green font-mono shrink-0">→</span>
              <span><strong className="text-ink-primary">Cross-vendor stability alerts.</strong> Tells you when a tool you use silently changed its credit accounting or output policy (built on our 132-review corpus + ongoing scrape).</span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-green font-mono shrink-0">→</span>
              <span><strong className="text-ink-primary">Seed library.</strong> Lock-in seeds that survived a generation so you can re-roll variations without losing the part that worked.</span>
            </li>
          </ul>
        </div>

        {/* DEMOTED — $50 founders upgrade, below the fold */}
        <div className="border-t-2 border-rule pt-10 mb-6">
          <p className="font-mono text-[11px] tracking-kicker uppercase text-neon-amber mb-3">
            Optional upgrade · founders&apos; round · skip if free extension is enough
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink-primary mb-4 leading-tight tracking-tight">
            Want AVA Pro early? $50 for 6 months.
          </h2>
          <p className="text-ink-secondary leading-relaxed mb-6">
            AVA Pro launches around <strong>{LAUNCH_ETA}</strong> at $19/mo. Founders pay $50 flat for the first 6 months instead of $114 — a 56% founders&apos; discount, locked in even after public pricing changes. Free extension stays free; Pro adds unlimited scoring, personal failure history, A/B model routing.
          </p>
        </div>

        <div className="bg-neon-green/5 border border-neon-green/30 rounded-md p-5 mb-6 text-sm">
          <p className="font-mono text-[11px] tracking-kicker uppercase text-neon-green mb-3">
            Founders&apos; round · OPEN · payment + auto-grant verified end-to-end
          </p>
          <p className="text-ink-secondary leading-relaxed">
            $50 charge via Stripe. Webhook auto-grants 6 months of Pro to the email on the receipt (you&apos;ll get a magic-link to log in). Limited slots — when Pro ships in {LAUNCH_ETA} the price reverts to $19/mo.
          </p>
        </div>

        <div className="border border-rule rounded-md p-6 mb-6 bg-surface">
          <h3 className="font-display text-lg font-semibold text-ink-primary mb-4">What Pro adds on top of the free extension</h3>
          <ul className="space-y-3 text-sm text-ink-secondary">
            <li className="flex gap-3">
              <span className="text-neon-green font-mono shrink-0">→</span>
              <span><strong className="text-ink-primary">Unlimited prompt scoring.</strong> Free tier is 50 scores/month. Pro is unlimited.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-green font-mono shrink-0">→</span>
              <span><strong className="text-ink-primary">Personal failure history.</strong> Tracks your historical credit waste by category and platform — find patterns, fix the root cause.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-green font-mono shrink-0">→</span>
              <span><strong className="text-ink-primary">Cross-model A/B routing.</strong> Sends the same prompt to 2-3 models, returns the best result. Stops you betting all credits on one platform.</span>
            </li>
          </ul>
        </div>

        <div className="bg-neon-amber/5 border border-neon-amber/30 rounded-md p-5 mb-6 text-sm">
          <p className="font-mono text-[11px] tracking-kicker uppercase text-neon-amber mb-2">
            Honest disclosure (only matters if you upgrade)
          </p>
          <ul className="space-y-2 text-ink-secondary leading-relaxed">
            <li>
              <strong className="text-ink-primary">Launch ETA is {LAUNCH_ETA}, not a guarantee.</strong> If Pro doesn&apos;t ship by August 31, 2026, you get a full refund plus a $20 apology credit.
            </li>
            <li>
              <strong className="text-ink-primary">14-day refund window.</strong> Cancel in the first 14 days after Pro ships for a full refund. After that, the 6 months are non-refundable but transferable.
            </li>
            <li>
              <strong className="text-ink-primary">AVA is a prevention tool, not a recovery tool.</strong> The value is catching prompt-failures before you commit credits. Goodwill credits from platforms are discretionary and not something we promise.
            </li>
          </ul>
        </div>

        <div className="border border-neon-green/40 rounded-md p-8 mb-6 bg-paper text-center">
          <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-2">
            Founders&apos; price
          </p>
          <p className="font-display text-5xl font-semibold text-neon-green mb-1">$50</p>
          <p className="text-sm text-ink-secondary mb-6">
            for 6 months · then $19/mo (cancel anytime) · locked at $13/mo for life
          </p>

          {PREORDER_URL ? (
            <StripeBuyButton url={PREORDER_URL} />
          ) : (
            <p className="font-mono text-xs text-neon-amber">
              Pre-order link not configured yet.
            </p>
          )}

          <p className="mt-4 font-mono text-[10px] text-ink-muted">
            Secured by Stripe · Email-based auto-grant · <Link href="/refund-policy" className="underline hover:text-ink-secondary">30-day refund</Link>
          </p>
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
