import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sora 2 Wind-Down — What Happened and What to Watch Going Forward',
  description: 'OpenAI discontinued Sora 2 on April 26, 2026. The API closes September 2026. Here is the timeline, what your dashboard still shows, and how to read this kind of platform-stability signal before subscribing to the next AI video tool.',
  alternates: { canonical: 'https://www.aivideoauditor.com/sora-refund' },
  openGraph: {
    title: 'Sora 2 Wind-Down — Timeline + Vendor-Stability Read',
    description: 'What the Sora 2 shutdown actually looks like for paid users, and how to spot the next platform that will do this.',
    type: 'article',
  },
  robots: { index: true, follow: true },
};

const APP_SHUTDOWN_DATE = 'April 26, 2026';
const API_SHUTDOWN = 'September 2026';

export default function SoraWindDownPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: 'Sora 2 Wind-Down — Timeline + Vendor-Stability Read',
    description: 'OpenAI shut down Sora 2 on April 26, 2026. Timeline + vendor-stability framing.',
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

          <div className="mb-8 bg-neon-amber/10 border border-neon-amber/40 rounded-2xl p-5">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-amber uppercase mb-1">
              Sora 2 shutdown · App discontinued {APP_SHUTDOWN_DATE} · API runs until {API_SHUTDOWN}
            </p>
            <p className="text-ink-primary font-bold text-lg">
              If you were paying for Sora 2 when it went dark, you are not the first user this has happened to and you will not be the last.
            </p>
          </div>

          <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-primary">Sora 2 wind-down</span>
          </nav>

          <header className="mb-10">
            <h1 className="text-3xl md:text-5xl font-bold text-ink-primary mb-4 leading-tight">
              Sora 2 is shut down. Here is what that actually means for paid users.
            </h1>
            <p className="text-ink-secondary text-lg leading-relaxed mb-4">
              OpenAI discontinued the Sora 2 app on {APP_SHUTDOWN_DATE}. The API will continue accepting calls until {API_SHUTDOWN}, then stop. If you paid for Sora 2 inside that window, your dashboard probably still shows the credit balance, and your subscription may even still renew. Both of those facts are unrelated to whether you can actually use the product.
            </p>
            <p className="text-ink-muted text-sm leading-relaxed">
              This page explains the timeline, what to do about your billing relationship with OpenAI, and how the Sora wind-down fits a pattern that shows up across every major AI-video vendor. The pattern matters more than the Sora-specific case, because the next platform you subscribe to is statistically likely to do at least one piece of it.
            </p>
          </header>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-4">Timeline of the wind-down</h2>
            <ul className="space-y-3 text-sm text-ink-secondary leading-relaxed">
              <li><strong className="text-ink-primary">April 26, 2026:</strong> OpenAI announces Sora 2 is being discontinued. The standalone app stops accepting new generations. Existing paid plans remain on file.</li>
              <li><strong className="text-ink-primary">May 2026 onward:</strong> Some users report continued auto-renewal charges. Some report the cancel flow in the OpenAI billing dashboard returns errors. The user experience is uneven.</li>
              <li><strong className="text-ink-primary">{API_SHUTDOWN}:</strong> API access ends. Whatever credit balance remains becomes unspendable.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-4">Your billing relationship is with OpenAI, not Sora</h2>
            <p className="text-ink-secondary leading-relaxed mb-3">
              If you have an active subscription, charge dispute, or unused-credit question, the channel is OpenAI Billing Support at <a href="https://help.openai.com" target="_blank" rel="noopener noreferrer" className="text-neon-purple underline">help.openai.com</a>. AVA does not handle refunds for OpenAI or any other platform and does not promise refund outcomes. We exist to help you understand what platforms actually deliver before you commit to them.
            </p>
            <p className="text-ink-muted text-sm leading-relaxed">
              If your card has been charged for an annual plan after the {APP_SHUTDOWN_DATE} announcement, the cleanest path is usually a card-issuer chargeback for &ldquo;service not rendered&rdquo; rather than a long-running ticket. That choice is yours and depends on your card&apos;s policy. AVA is not a financial or legal advisor and does not draft chargeback letters.
            </p>
          </section>

          <section className="mb-12 bg-elevated border border-border rounded-2xl p-6">
            <h2 className="text-xl font-bold text-ink-primary mb-3">What the Sora 2 wind-down tells you about the next platform</h2>
            <p className="text-ink-secondary leading-relaxed mb-3">
              Sora 2 is not a one-off. From a tagged sample of 132 Trustpilot 1-star reviews across 8 major AI-video vendors (Runway, Higgsfield, Krea, Pollo, Pika, Luma, Sora, Kling), about 77% of paid-tier complaints cite billing or platform-stability issues, not output quality. Runway sits at 1.1/5 on Trustpilot. Three universal patterns show up across every paid vendor in the sample:
            </p>
            <ul className="space-y-2 text-sm text-ink-secondary leading-relaxed">
              <li><strong className="text-ink-primary">&ldquo;Unlimited&rdquo; routes back to credit-metered.</strong> Every &ldquo;unlimited&rdquo; tier in the sample has a hidden gating mechanism: time window, model routing, queue priority, or watermark. Users feel deceived once they hit the gate.</li>
              <li><strong className="text-ink-primary">Refund policy as a trap.</strong> Every vendor&apos;s refund policy in the sample treats any credit usage as forfeiture. You cannot evaluate the product without triggering the no-refund clause.</li>
              <li><strong className="text-ink-primary">Support black-hole.</strong> Every vendor with billing complaints in the sample also has an absent or bot-only support channel.</li>
            </ul>
            <p className="text-ink-muted text-sm leading-relaxed mt-4">
              The framing AVA uses is &ldquo;effective cost = list price / success rate.&rdquo; The list price is the floor. Your real per-clip cost depends on how often the platform delivers what its marketing claims. Sora 2 ran into the same wall every other platform does, except OpenAI made the unusual call to shut down rather than degrade.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-4">Practical next steps</h2>
            <ol className="space-y-2 text-sm text-ink-secondary leading-relaxed list-decimal pl-5">
              <li>Check your bank statement for OpenAI charges after {APP_SHUTDOWN_DATE}. If renewal hit after the shutdown was announced, that is the cleanest case for either ticket support or a chargeback.</li>
              <li>Decide which platform you want to move to. Before subscribing, read its refund policy line by line, specifically the clause about credit usage. Ask support in writing whether the feature you want stays uncapped past the trial period.</li>
              <li>If you use AVA, the prompt scoring + change-alert system surfaces platform pricing changes, &ldquo;unlimited&rdquo; routing changes, and NSFW policy changes when vendors shift them mid-subscription. That is the closest thing to insurance against the next Sora-shaped event.</li>
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
