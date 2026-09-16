import type { Metadata } from 'next';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';

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

        {/* 2026-09-16: the "$50 founders round" AVA Pro subscription upgrade
            previously advertised below the fold has been removed — AVA Pro
            never shipped by its own stated ETA/deadline and the product is
            now a done-for-you per-video studio instead. See drive-board/ava.md. */}
        <div className="border-t-2 border-rule pt-10 mb-6 text-center">
          <p className="font-mono text-[11px] tracking-kicker uppercase text-neon-green mb-3">
            Want more than the free extension?
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink-primary mb-4 leading-tight tracking-tight">
            Skip the prompting — we&apos;ll make the video for you.
          </h2>
          <p className="text-ink-secondary leading-relaxed mb-6 max-w-md mx-auto">
            Send us your product photos and get a finished, platform-ready video back. From $59,
            no subscription.
          </p>
          <Link
            href="/studio"
            className="inline-flex items-center justify-center gap-2 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-mono font-bold px-6 py-3 rounded-xl transition-all"
          >
            See the studio →
          </Link>
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
