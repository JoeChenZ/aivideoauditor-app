import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Welcome to AVA Pro',
  description: 'Your AIVideoAuditor Pro subscription is active. PDF audit reports are unlocked.',
  alternates: { canonical: 'https://www.aivideoauditor.com/pro-success' },
  robots: { index: false, follow: false }, // post-payment page, don't index
};

export default function ProSuccessPage() {
  return (
    <main className="min-h-screen py-20 px-6">
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
            Your subscription is active. Your next refund request is going to look very different.
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
                <strong className="text-ink-primary">PDF Technical Audit Report.</strong>
                {' '}Frame-marked screenshots, your Generation/Asset ID, engineering-grade failure classification, credit refund calculation. Drop into any Runway or Luma support ticket.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-amber flex-shrink-0">▸</span>
              <div>
                <strong className="text-ink-primary">Advanced L1 full analysis.</strong>
                {' '}Pre-flight prompt risk scan with deeper failure-mode prediction so you stop generating prompts that will fail.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-amber flex-shrink-0">▸</span>
              <div>
                <strong className="text-ink-primary">Refund-success tracker.</strong>
                {' '}Log every refund you submit and watch your approval rate climb as you internalise the failure taxonomy.
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
              href="https://chromewebstore.google.com/detail/aivideoauditor/dnehhjbgpfjdihfigahimmpgnemplljn"
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
            7-day money-back guarantee
          </h2>
          <p className="text-sm text-ink-secondary leading-relaxed">
            If AVA Pro doesn&apos;t help you recover at least the $9 subscription cost in approved refunds within your first 7 days, reply to your Stripe receipt or email <a href="mailto:hello@aivideoauditor.com" className="text-neon-purple underline">hello@aivideoauditor.com</a> and we&apos;ll refund the subscription. No questions asked.
          </p>
        </div>

        <div className="text-center text-xs text-ink-muted">
          <p>
            Receipt sent to your email · <Link href="/guide" className="text-neon-purple underline">Read the refund guide</Link> · <Link href="/" className="text-neon-purple underline">Back to home</Link>
          </p>
        </div>

      </div>
    </main>
  );
}
