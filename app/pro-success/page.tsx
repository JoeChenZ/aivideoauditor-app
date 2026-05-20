import type { Metadata } from 'next';
import Link from 'next/link';
import ProSuccessTrack from './track';

export const metadata: Metadata = {
  title: 'Welcome to AVA Pro',
  description: 'Your AIVideoAuditor Pro subscription is active. Vendor reality check, prompt scoring, and platform change alerts are unlocked.',
  alternates: { canonical: 'https://www.aivideoauditor.com/pro-success' },
  robots: { index: false, follow: false }, // post-payment page, don't index
};

export default function ProSuccessPage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <ProSuccessTrack />
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-neon-green/15 border border-neon-green/30 rounded-full mb-6">
            <span className="text-4xl">✓</span>
          </div>
          <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
            Payment Confirmed
          </p>
          <h1 className="text-4xl font-bold text-ink-primary mb-3">
            Welcome to AVA Pro.
          </h1>
          <p className="text-ink-secondary text-lg">
            Your subscription is active. You can now check any AI video platform&apos;s reality before you commit credits, and stay ahead of the ones you already use.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-ink-primary mb-4">
            What just unlocked
          </h2>
          <ul className="space-y-3 text-sm text-ink-secondary">
            <li className="flex gap-3">
              <span className="text-neon-amber flex-shrink-0">▸</span>
              <div>
                <strong className="text-ink-primary">Vendor reality check across 11 platforms.</strong>
                {' '}Real per-second cost (credits divided by success rate), &quot;unlimited&quot; gating rules, refund-policy traps, pricing change history. The math vendors don&apos;t publish.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-amber flex-shrink-0">▸</span>
              <div>
                <strong className="text-ink-primary">Pre-generation prompt scoring (L1 full analysis).</strong>
                {' '}Red/yellow/green score on every prompt with deeper failure-mode prediction and rewrite suggestions, so you stop generating prompts that will fail.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-amber flex-shrink-0">▸</span>
              <div>
                <strong className="text-ink-primary">Personal failure history + platform change alerts.</strong>
                {' '}Your per-platform success rate by prompt shape, plus alerts when a vendor changes pricing, &quot;unlimited&quot; routing, or NSFW policy mid-subscription.
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-elevated border border-border rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-ink-primary mb-3">
            Activate Pro in the extension
          </h2>
          <ol className="space-y-2 text-sm text-ink-secondary list-decimal pl-5 marker:text-neon-purple">
            <li>If you don&apos;t have the extension yet, install it from the Chrome Web Store.</li>
            <li>Click the AVA icon on a Runway or Luma generation page.</li>
            <li>Make sure you&apos;re signed in with the same email you just paid with — that&apos;s the link that flips your account to Pro.</li>
            <li>Pro features unlock within ~30 seconds of payment confirmation. If you don&apos;t see them, click &quot;Refresh Pro status&quot; in extension Settings.</li>
          </ol>
          <div className="mt-4">
            <a
              href="https://chromewebstore.google.com/detail/aivideoauditor/ecomchbdfkgakaoponipjgpnjfpimdef"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-mono font-bold px-5 py-2.5 rounded-xl transition-all text-sm"
            >
              Open Chrome Web Store →
            </a>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold text-ink-primary mb-3">
            Not what you expected? Reach out.
          </h2>
          <p className="text-sm text-ink-secondary leading-relaxed">
            If AVA Pro isn&apos;t a fit, email <a href="mailto:hello@aivideoauditor.com" className="text-neon-purple underline">hello@aivideoauditor.com</a> within your first 7 days and we&apos;ll refund the subscription, no questions asked. AVA surfaces what AI video platforms actually deliver vs. what they advertise. We don&apos;t handle the platforms&apos; refund decisions, and we don&apos;t claim to.
          </p>
        </div>

        <div className="text-center text-xs text-ink-muted">
          <p>
            Receipt sent to your email · <Link href="/" className="text-neon-purple underline">Back to home</Link>
          </p>
        </div>

      </div>
    </main>
  );
}
