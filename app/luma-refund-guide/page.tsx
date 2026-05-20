import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Luma Dream Machine — What Paid Users Actually Get vs. What the Marketing Promises',
  description: 'The Trustpilot 1-star pattern on Luma: 70% billing complaints, 70% cost-burn, broken cancel flow in some accounts. Here is the vendor-reality read on Luma Dream Machine before you subscribe, and what to do if you are already burned.',
  alternates: { canonical: 'https://www.aivideoauditor.com/luma-refund-guide' },
  openGraph: {
    title: 'Luma Dream Machine — Vendor Reality Read for Paid Users',
    description: 'What Luma 1-star reviewers consistently complain about, what the credit interface actually does, and how to evaluate the platform before subscribing.',
    type: 'article',
  },
  robots: { index: true, follow: true },
};

export default function LumaVendorRealityPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: 'Luma Dream Machine — Vendor Reality Read',
    description: 'What Luma actually delivers vs. what the marketing promises, based on a tagged sample of Trustpilot 1-star reviews.',
    datePublished: '2026-05-14',
    dateModified: '2026-05-19',
    author: { '@type': 'Organization', name: 'AIVideoAuditor' },
    publisher: { '@type': 'Organization', name: 'AIVideoAuditor', url: 'https://www.aivideoauditor.com' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main className="min-h-screen py-12 px-6">
        <article className="max-w-3xl mx-auto">

          <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-primary">Luma vendor reality</span>
          </nav>

          <header className="mb-10">
            <h1 className="text-3xl md:text-5xl font-bold text-ink-primary mb-4 leading-tight">
              Luma Dream Machine — what paid users actually get.
            </h1>
            <p className="text-ink-secondary text-lg leading-relaxed mb-4">
              If you arrived here searching for help with a Luma charge or a stuck cancel, you are part of a measurable pattern. Luma sits at 1.5/5 on Trustpilot with 51 reviews. Out of the 10 1-star reviews tagged in our sample, 70% cite billing issues, 70% cite cost-burn (entire month of credits gone in a single session), 60% cite quality, and 40% cite support failure.
            </p>
            <p className="text-ink-muted text-sm leading-relaxed">
              This page explains what those numbers actually look like in practice, what your billing options are with Luma directly, and how the Luma pattern fits a broader story about every major AI-video vendor in this market.
            </p>
          </header>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-4">The recurring Luma complaint patterns</h2>
            <ul className="space-y-3 text-sm text-ink-secondary leading-relaxed">
              <li><strong className="text-ink-primary">Credit interface described as &ldquo;obtuse and unresponsive&rdquo;.</strong> Multiple reviewers report an entire month&apos;s credit allowance vanishing in a single session without clear consumption breakdowns per generation.</li>
              <li><strong className="text-ink-primary">Cancel-button failures.</strong> Reviewers describe Stripe redirect loops, 404 pages, and a cancel flow that fails silently while billing continues. This pattern appears in roughly half the billing complaints in the tagged 1-star sample.</li>
              <li><strong className="text-ink-primary">Refund-policy interpretation:</strong> any credit usage in the billing period typically treated as full acceptance of the plan. Multiple reviewers describe being denied refunds within the first 24 hours after a single failed generation.</li>
              <li><strong className="text-ink-primary">Camera jitter and motion drift</strong> on Ray-2 clips over 3 seconds. This is an architectural limitation of Luma&apos;s motion model and is partially predictable from prompt language (long pans are riskier than slow dollies). It also drives credit waste because users re-run the same prompt expecting a different result.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-4">Your billing relationship is with Luma, not AVA</h2>
            <p className="text-ink-secondary leading-relaxed mb-3">
              AVA does not handle Luma refunds, does not promise refund outcomes, and is not a financial or legal advisor. If you have a charge dispute, the channels are:
            </p>
            <ul className="space-y-2 text-sm text-ink-secondary leading-relaxed list-disc pl-5">
              <li><a href="https://lumalabs.ai/support" target="_blank" rel="noopener noreferrer" className="text-neon-purple underline">Luma Labs billing support</a> at lumalabs.ai/support</li>
              <li>Your card issuer&apos;s chargeback process under &ldquo;service not as described&rdquo; if Luma support is non-responsive past a reasonable window</li>
            </ul>
            <p className="text-ink-muted text-sm leading-relaxed mt-3">
              Which path makes sense depends on your card&apos;s policy and the dollar amount. AVA does not draft chargeback letters or coach you through the dispute. We surface what platforms actually deliver so you can make these calls with eyes open.
            </p>
          </section>

          <section className="mb-12 bg-elevated border border-border rounded-2xl p-6">
            <h2 className="text-xl font-bold text-ink-primary mb-3">The vendor-reality math, in one formula</h2>
            <p className="text-ink-secondary leading-relaxed mb-3">
              The framing that matters most for any AI-video platform, including Luma:
            </p>
            <p className="text-ink-primary font-mono text-lg mb-3 text-center">
              effective cost = list price / success rate
            </p>
            <p className="text-ink-secondary leading-relaxed">
              A nominal Luma 50-credit generation at 60% success rate is functionally 83 credits. A $30/mo plan at 60% success rate is functionally $50. Luma&apos;s marketing quotes the floor. Your real per-clip cost depends on how often your prompt shape lands inside the model&apos;s strong zone. AVA&apos;s Pro tier scores your prompts before you submit them, so you stop spending credits in regions where the model is known to fail.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-4">Before you subscribe to Luma (or its alternatives)</h2>
            <ol className="space-y-3 text-sm text-ink-secondary leading-relaxed list-decimal pl-5">
              <li>Read the refund policy verbatim. Specifically the clause about credit usage. If &ldquo;any credit usage = no refund&rdquo; appears, you cannot test the product without triggering the no-refund clause.</li>
              <li>Find the cancel button before you commit. Multiple Luma reviewers report a broken cancel flow. If you cannot find a working cancel link in the billing dashboard before subscribing, assume it will be hard to cancel later.</li>
              <li>Check Trustpilot, not the marketing page. Luma&apos;s overall Trustpilot score sits below 1.6/5 with 51 reviews. The 1-star segment is a self-selected complainer sample, but the pattern matters: 70% billing, 70% cost-burn.</li>
              <li>If you already use AVA, the change-alert system fires when vendors shift pricing, gating rules, or NSFW policies mid-subscription. That is the closest thing to insurance against the post-purchase surprise.</li>
            </ol>
          </section>

          <div className="bg-surface border border-border rounded-2xl p-6 text-center">
            <p className="text-ink-secondary mb-3 text-sm">
              AVA is a Chrome extension that scores your AI video prompts before you click Generate, surfaces real per-second cost (list price / success rate) across 11 platforms, and alerts you when vendors move the goalposts. Free tier includes unlimited platform reality checks.
            </p>
            <Link href="/" className="inline-block bg-neon-amber/20 hover:bg-neon-amber/30 border border-neon-amber/40 text-neon-amber font-mono font-bold px-5 py-2.5 rounded-xl transition-all text-sm">
              How AVA works →
            </Link>
          </div>

        </article>
      </main>
    </>
  );
}
