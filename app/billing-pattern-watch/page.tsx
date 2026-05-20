import type { Metadata } from 'next';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';

export const metadata: Metadata = {
  title: 'AI Video Billing Pattern Watch — Pre-Subscription Risk Check (2026)',
  description:
    'Per-vendor billing pattern data for AI-video platforms with the highest documented subscription-mechanic complaints: Higgsfield, Pollo, Krea. Sourced from 132 tagged Trustpilot reviews + Reddit cross-check + public creator investigations. Pre-purchase risk information, not legal or chargeback advice.',
  alternates: { canonical: 'https://www.aivideoauditor.com/billing-pattern-watch' },
  openGraph: {
    title: 'AI Video Billing Pattern Watch — Pre-Subscription Risk Check',
    description:
      'Higgsfield, Pollo, Krea: documented billing patterns from 132 reviews + Reddit cross-check + public investigations. Read before you commit credits.',
    type: 'article',
  },
};

const VENDORS = [
  {
    name: 'Higgsfield',
    trustpilotBilling: '~80%',
    redditBilling: '64%',
    headline: '"Unlimited" Black-Friday plan converted to credit-metered behaviour after day 7. Refund-window cuts off at 7 days regardless of usage. Multi-charge incidents documented.',
    documented: [
      'Black Friday "unlimited" plans showed credit-metered behavior post-day-7, contradicting marketing claims.',
      'Refund policy: only first subscription within 7 days, only if credits not touched. Renewals: no refund ever.',
      '"Battery" usage-lockout system introduced mid-subscription — paid users hit with $5 extortion fee to bypass.',
      'December 2025 mass account purge with "suspicious payment" excuse; bans without appeal pathway.',
      '5× $39 invoices documented on a single user account in one day during the December 2025 incident.',
      '6+ Trustpilot 1-stars from May 2026 independently name same wait-time shift (5–10 min → 25–40 min per generation).',
    ],
    publicEvidence: [
      'YouTube exposé: 47K views, 1.6K likes, Dec 2025 (Yaroflasher: "Higgsfield\'s Unlimited Plan Scam Exposed").',
      'LinkedIn warning posts from independent creators (e.g. Rick Sander).',
      'Trustpilot: 41 1-star reviews tagged. ~80% cite billing mechanic, not output quality.',
      'Reddit r/HiggsfieldAI: multiple active refund-help threads in last 90 days.',
    ],
    beforeYouSubscribe: [
      'Read the refund window precisely — it is 7 days from purchase, not from cancellation request.',
      'Do not generate anything on the new subscription until you are certain you want to keep it. Generating consumes the refund eligibility.',
      'If you must trial, use the monthly plan first. Avoid annual / "lifetime" / Black Friday "unlimited" tiers — these carry the most documented post-purchase rule changes.',
      'Check your card statement weekly for the first month. Multi-charge incidents have been documented.',
    ],
  },
  {
    name: 'Pollo AI',
    trustpilotBilling: '~80%',
    redditBilling: '78%',
    headline: 'Auto-renewal subscriptions documented at $15/mo to $70K/yr without clear consent flows. Refund-with-cut policy: company keeps a percentage when issuing refunds.',
    documented: [
      'Auto-renewal triggered on accounts that had not used the service for the prior month.',
      'Single-charge incidents include $80 with no service delivered ("billed $80, received nothing").',
      'One documented yearly auto-renewal at $70,000 — refund offered with company taking a "service cut" from the refund.',
      '3-day refund window per stated policy (referenced at the bottom of subscription confirmation emails).',
      'r/FraudPrevention warning thread cites "Systematic Fraud, Unauthorized Charges, breach of Creator Partner Program contracts."',
    ],
    publicEvidence: [
      'r/FraudPrevention warning post (community-flagged).',
      'r/apps + r/generativeAI + r/techsupport threads independently report identical patterns over 12 months.',
      'Trustpilot: 1-star pool dominated by subscription-mechanic complaints, not product-quality complaints.',
    ],
    beforeYouSubscribe: [
      'Do not subscribe via in-app purchase flows that auto-renew. Use a prepaid card or virtual card with a hard limit.',
      'Set a calendar reminder for day 2 of the 3-day refund window. The window is shorter than industry norm.',
      'If you only need short-term access, pay credit-pack-style rather than subscription — avoids the renewal trigger entirely.',
      'Monitor your email after purchase. Auto-renewal notifications have been documented as going to spam folders.',
    ],
  },
  {
    name: 'Krea',
    trustpilotBilling: 'Mixed',
    redditBilling: 'Mixed',
    headline: 'Support response time + billing complaint pattern flagged on Reddit ("trust issues are valid, their support and billing got complaints"). Smaller corpus than Higgsfield / Pollo; treat as YELLOW not RED.',
    documented: [
      'Reddit users report support-billing complaint pattern but without the volume of Higgsfield or Pollo.',
      'Less documented multi-charge incidents than Higgsfield / Pollo. Still on watch list.',
    ],
    publicEvidence: [
      'r/Freepik_AI thread: "Freepik\'s trust issues are valid, their support and billing got complaints."',
      'Limited Trustpilot footprint — still small corpus.',
    ],
    beforeYouSubscribe: [
      'Apply the same refund-window discipline as for Higgsfield / Pollo: do not generate until certain.',
      'Smaller community signal than the top two — this is yellow not red. Treat with caution, not blanket avoidance.',
    ],
  },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AI Video Billing Pattern Watch — Pre-Subscription Risk Check (2026)',
  description:
    'Per-vendor billing-pattern data for AI-video platforms with the highest documented subscription-mechanic complaints. Sourced from 132 tagged Trustpilot reviews, Reddit neutral cross-check, and public creator investigations.',
  author: { '@type': 'Organization', name: 'AIVideoAuditor' },
  publisher: { '@type': 'Organization', name: 'AIVideoAuditor', url: 'https://www.aivideoauditor.com' },
  datePublished: '2026-05-20',
};

export default function BillingPatternWatchPage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div className="max-w-4xl mx-auto">

        <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-ink-primary">Billing Pattern Watch</span>
        </nav>

        <header className="mb-12">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-amber uppercase mb-3">
            Pre-Subscription Risk Check · Updated 2026-05-20
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-ink-primary mb-4 leading-tight">
            Three AI-video vendors with documented billing-pattern issues. Read before you subscribe.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed">
            This page lists AI-video platforms where the dominant complaint in public sources is about billing mechanics, not output quality. Sourced from our{' '}
            <Link href="/research/132-ai-video-vendor-reviews" className="text-neon-purple underline">132-review tagged Trustpilot corpus</Link>, a Reddit neutral cross-check (75 categorized threads), and public creator investigations.
          </p>
          <p className="text-sm text-ink-muted leading-relaxed mt-4">
            What this page is: pre-purchase risk information. What this page is not: legal advice, chargeback assistance, refund draft, or a guarantee. We surface documented patterns. The subscription decision and any dispute path are yours.
          </p>
        </header>

        <div className="space-y-8 mb-12">
          {VENDORS.map((vendor) => (
            <section key={vendor.name} className="bg-surface border border-border rounded-2xl p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
                <h2 className="text-2xl font-bold text-ink-primary">{vendor.name}</h2>
                <div className="text-xs font-mono text-ink-muted">
                  Trustpilot 1-star billing: <span className="text-neon-amber font-bold">{vendor.trustpilotBilling}</span> · Reddit neutral billing: <span className="text-neon-amber font-bold">{vendor.redditBilling}</span>
                </div>
              </div>

              <p className="text-ink-secondary leading-relaxed mb-5 italic">
                {vendor.headline}
              </p>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <p className="text-xs font-mono font-bold tracking-widest text-ink-muted uppercase mb-2">Documented patterns</p>
                  <ul className="space-y-1.5">
                    {vendor.documented.map((d) => (
                      <li key={d} className="text-sm text-ink-secondary leading-relaxed flex gap-2">
                        <span className="text-neon-amber shrink-0">▸</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-mono font-bold tracking-widest text-ink-muted uppercase mb-2">Public evidence</p>
                  <ul className="space-y-1.5">
                    {vendor.publicEvidence.map((e) => (
                      <li key={e} className="text-sm text-ink-secondary leading-relaxed flex gap-2">
                        <span className="text-neon-purple shrink-0">▸</span>
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-elevated border border-neon-green/20 rounded-xl p-4">
                <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-2">Before you subscribe</p>
                <ul className="space-y-1.5">
                  {vendor.beforeYouSubscribe.map((b) => (
                    <li key={b} className="text-sm text-ink-secondary leading-relaxed flex gap-2">
                      <span className="text-neon-green shrink-0">→</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>

        <section className="mb-12 bg-elevated border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold text-ink-primary mb-3">What this list does NOT do</h2>
          <ul className="space-y-2 text-sm text-ink-secondary leading-relaxed">
            <li>▸ It does not call any of these vendors a &ldquo;scam&rdquo; in a legal sense. It documents patterns that appear in public sources and lets you make a subscription decision with full information.</li>
            <li>▸ It does not give legal advice. If you are considering a chargeback or formal dispute, talk to your card issuer or, for amounts over a few hundred dollars, a consumer-protection lawyer in your jurisdiction.</li>
            <li>▸ It does not draft refund letters or chargeback evidence packets. Those carry liability we are not licensed to take. There are public templates available from consumer-protection organizations if you need that path.</li>
            <li>▸ It is not exhaustive. The AI-video vendor universe is larger than three platforms. We list the ones with the strongest documented public evidence as of 2026-05-20.</li>
          </ul>
        </section>

        <section className="mb-12">
          <LeadCaptureForm
            source="billing-pattern-watch"
            heading="Get the weekly vendor-change alert (free)"
            blurb="Drop your email. We send one alert per week when a tracked vendor changes pricing, 'unlimited' routing rules, refund policy, or NSFW filter mid-subscription. Sourced from active Trustpilot + Reddit + public-creator monitoring. No marketing spam."
            cta="Subscribe to weekly alerts →"
            successMessage="In. The first weekly alert lands within 7 days. We only email when a tracked vendor materially changes a policy. Unsubscribe one-click."
          />
        </section>

        <section className="bg-surface border border-neon-purple/20 rounded-2xl p-8 text-center mb-8">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-3">For mainstream vendors (Runway, Luma, Sora, Pika, Kling, Veo, Hailuo, Vidu)</p>
          <h2 className="text-2xl font-bold text-ink-primary mb-3">The dominant pain is quality, not billing.</h2>
          <p className="text-ink-secondary text-sm mb-6 max-w-2xl mx-auto">
            Reddit neutral cross-check shows mainstream vendors have a fundamentally different complaint profile (Runway: 29% billing, 71% quality). For those, the better tool is pre-generation prompt scoring — predict failure before you commit credits. That is AVA&apos;s other surface.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://chromewebstore.google.com/detail/aivideoauditor/ecomchbdfkgakaoponipjgpnjfpimdef"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-mono font-bold px-6 py-3 rounded-xl transition-all"
            >
              Install Free Extension →
            </a>
            <Link
              href="/research/132-ai-video-vendor-reviews"
              className="inline-flex items-center justify-center gap-2 bg-elevated hover:bg-elevated/80 border border-border text-ink-secondary font-mono font-semibold px-6 py-3 rounded-xl transition-all text-sm"
            >
              Read the 132-review research →
            </Link>
          </div>
        </section>

        <footer className="text-xs text-ink-muted">
          Last updated 2026-05-20. Sources, methodology, and per-thread Reddit categorization in the source repo at <code>docs/REDDIT-TRIANGULATION-2026-05-20.md</code>. Corrections, addenda, or vendor-side responses: DM @AIVideoAuditor on X.
        </footer>

      </div>
    </main>
  );
}
