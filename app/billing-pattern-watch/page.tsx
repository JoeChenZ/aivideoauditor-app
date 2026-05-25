import type { Metadata } from 'next';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';
import { WidePageShell, Breadcrumb, ArticleHeader, SectionHead, RuleDivider, Kicker } from '@/components/editorial';

export const metadata: Metadata = {
  title: 'AI Video Billing Pattern Watch — Pre-Subscription Risk Check (2026)',
  description:
    'Per-vendor billing pattern data for AI-video platforms with the highest documented subscription-mechanic complaints: Higgsfield, Pollo, Krea, Runway. Sourced from 132 tagged Trustpilot reviews + Reddit cross-check + public investigations. Pre-purchase risk information.',
  alternates: { canonical: 'https://www.aivideoauditor.com/billing-pattern-watch' },
  openGraph: {
    title: 'AI Video Billing Pattern Watch — Pre-Subscription Risk Check',
    description: 'Higgsfield, Pollo, Krea, Runway: documented billing patterns from 132 reviews + Reddit cross-check + public investigations. Read before you commit credits.',
    type: 'article',
  },
};

const VENDORS = [
  {
    name: 'Higgsfield',
    trustpilotBilling: '~80%',
    redditBilling: '64%',
    severity: 'red',
    headline: '"Unlimited" Black-Friday plan converted to credit-metered behaviour after day 7. Refund-window cuts off at 7 days regardless of usage. Multi-charge incidents documented.',
    documented: [
      'Black Friday "unlimited" plans showed credit-metered behavior post-day-7, contradicting marketing claims.',
      'Refund policy: only first subscription within 7 days, only if credits not touched. Renewals: no path.',
      '"Battery" usage-lockout system introduced mid-subscription — paid users hit with $5 extortion fee to bypass.',
      'December 2025 mass account purge with "suspicious payment" excuse; bans without appeal pathway.',
      '5× $39 invoices documented on a single user account in one day during the December 2025 incident.',
      '6+ Trustpilot 1-stars from May 2026 independently name the same wait-time shift.',
    ],
    publicEvidence: [
      'YouTube exposé: 47K views, 1.6K likes, Dec 2025 (Yaroflasher: "Higgsfield\'s Unlimited Plan Scam Exposed").',
      'LinkedIn warning posts from independent creators (e.g. Rick Sander).',
      'Trustpilot: 41 1-star reviews tagged. ~80% cite billing mechanic, not output quality.',
      'Reddit r/HiggsfieldAI: multiple active complaint threads in last 90 days.',
    ],
    beforeYouSubscribe: [
      'Read the refund window precisely — 7 days from purchase, not from cancellation request.',
      'Do not generate anything on a new sub until you are certain you want to keep it. Generation consumes refund eligibility.',
      'If trialling, monthly only. Avoid annual / "lifetime" / Black Friday "unlimited" tiers.',
      'Check card statement weekly for the first month. Multi-charge incidents have been documented.',
    ],
  },
  {
    name: 'Pollo AI',
    trustpilotBilling: '~80%',
    redditBilling: '78%',
    severity: 'red',
    headline: 'Auto-renewal subscriptions documented at $15/mo to $70K/yr without clear consent flows. Refund-with-cut policy: company keeps a percentage when issuing refunds.',
    documented: [
      'Auto-renewal triggered on accounts that had not used the service for the prior month.',
      'Single-charge incidents include $80 with no service delivered.',
      'One documented yearly auto-renewal at $70,000 — refund offered with company taking a "service cut".',
      '3-day refund window per stated policy (referenced at the bottom of confirmation emails).',
      'r/FraudPrevention warning thread cites "Systematic Fraud, Unauthorized Charges, breach of Creator Partner Program contracts."',
    ],
    publicEvidence: [
      'r/FraudPrevention warning post (community-flagged).',
      'r/apps + r/generativeAI + r/techsupport threads independently report identical patterns over 12 months.',
      'Trustpilot: 1-star pool dominated by subscription-mechanic complaints.',
    ],
    beforeYouSubscribe: [
      'Avoid in-app purchase flows that auto-renew. Use a prepaid card or virtual card with a hard limit.',
      'Calendar reminder for day 2 of the 3-day window. Shorter than industry norm.',
      'Short-term use → credit-pack only. Avoids the renewal trigger entirely.',
      'Monitor email after purchase. Renewal notifications have been documented as going to spam.',
    ],
  },
  {
    name: 'Krea',
    trustpilotBilling: 'Mixed',
    redditBilling: 'Mixed',
    severity: 'yellow',
    headline: 'Support response time + billing complaint pattern flagged on Reddit. Smaller corpus than Higgsfield / Pollo; yellow not red.',
    documented: [
      'Reddit users report support-billing complaint pattern but without the volume of Higgsfield or Pollo.',
      'Less documented multi-charge volume. Still on watch list.',
    ],
    publicEvidence: [
      'r/Freepik_AI thread: "Freepik\'s trust issues are valid, their support and billing got complaints."',
      'Limited Trustpilot footprint — small corpus.',
    ],
    beforeYouSubscribe: [
      'Same refund-window discipline as Higgsfield / Pollo: do not generate until certain.',
      'Smaller community signal than the top two — caution, not blanket avoidance.',
    ],
  },
  {
    name: 'Runway',
    trustpilotBilling: '~29%',
    redditBilling: '~24%',
    severity: 'yellow',
    headline: 'Lowest billing-predation rate of the major paid AI-video vendors, but the active risk pattern shifted in May 2026: "Unlimited" tier wait-times roughly doubled, with 6 of 11 May 1-stars naming the same slowdown independently.',
    documented: [
      'May 2026: 6 of 11 May 1-stars on Trustpilot name the same wait-time shift (5–10 min → 25–40 min).',
      'Queue quotas on Unlimited are documented as separate buckets (image vs video) per tier docs since Gen-4.',
      'Annual subscriptions get pro-rated refunds within the 14-day window — wider than Higgsfield (7d) or Pollo (varies).',
      'Multi-platform creators report production-efficiency impact of ~50% in May.',
    ],
    publicEvidence: [
      'May 18 + May 20 X threads from @IntLab0000 (2.8K + 8.4K-view follow-up).',
      'May 19 X thread from @phencasedguy (1.3K views).',
      'r/runwayML "How can I get unlimited plan?" (2026-05-19) — multiple commenters confirm.',
      'Trustpilot mid-May surge: identical wording "way slower," "cut in half," "production efficiency hit."',
    ],
    beforeYouSubscribe: [
      'Monthly carries no annual lock-in. If throughput shifts mid-cycle you bail at next renewal.',
      'For Unlimited specifically: assume throughput claims are stale. Treat pre-May-2026 "unlimited" language as outdated.',
      'Pay monthly until you have personally validated 2+ weeks of throughput. Throughput is not contractual — only the per-month price is.',
      'Watch for policy quietude — silent throughput nerfs have happened twice in 2026 without explicit announcement.',
    ],
  },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AI Video Billing Pattern Watch — Pre-Subscription Risk Check (2026)',
  description: 'Per-vendor billing-pattern data for AI-video platforms with the highest documented subscription-mechanic complaints.',
  author: { '@type': 'Organization', name: 'AIVideoAuditor' },
  publisher: { '@type': 'Organization', name: 'AIVideoAuditor', url: 'https://www.aivideoauditor.com' },
  datePublished: '2026-05-20',
  dateModified: '2026-05-25',
  image: 'https://www.aivideoauditor.com/opengraph-image',
  articleSection: 'Billing patterns',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.aivideoauditor.com' },
    { '@type': 'ListItem', position: 2, name: 'Billing Pattern Watch', item: 'https://www.aivideoauditor.com/billing-pattern-watch' },
  ],
};

// FAQPage — billing-mechanic risk queries.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a billing pattern in AI video subscriptions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A documented mechanic that affects what users actually pay versus what the headline pricing implied — silent unlimited-tier throttles, dark-pattern cancel flows, trial-to-paid auto-conversion without notice, hidden per-feature surcharges, and pricing-tier consolidations that remove a previous plan mid-subscription.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which vendors have the highest billing-mechanic risk right now?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The severity table on this page ranks 8 platforms by documented billing complaints from the 132-review Trustpilot corpus plus Reddit cross-checks. Severity is colored: red (multiple independent reports + recent), yellow (one or two reports), grey (clean record at time of review). The data is updated weekly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is severity assigned?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Severity follows a 3-tier rubric: (red) three or more documented complaints from independent sources within 90 days OR a single pattern affecting cancel flow / refund policy / silent tier change; (yellow) one to two complaints OR a pattern affecting auto-renewal notification; (grey) no documented complaints in the current review window. Each tag links the underlying source records.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this advice or due-diligence reporting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Due-diligence reporting. We document patterns; we do not tell you which vendor to buy from. The page is structured so a buyer can do their own risk weighting — compare the severity table against their own tolerance for billing surprises and decide accordingly.',
      },
    },
  ],
};

function SeverityTag({ severity }: { severity: string }) {
  const colorClass =
    severity === 'red' ? 'text-neon-red border-neon-red/40' :
    severity === 'yellow' ? 'text-neon-amber border-neon-amber/40' :
    'text-ink-muted border-rule';
  return (
    <span className={`font-mono text-[10px] tracking-kicker uppercase px-2 py-0.5 border rounded ${colorClass}`}>
      {severity}
    </span>
  );
}

export default function BillingPatternWatchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <WidePageShell>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Billing Pattern Watch' }]} />

        <div className="max-w-reading">
          <ArticleHeader
            kicker="Pre-subscription risk check · Updated 2026-05-20"
            title={<>Four AI-video vendors with documented billing-pattern issues. <span className="italic">Read before you subscribe.</span></>}
            lede={
              <>
                This page lists AI-video platforms where the dominant complaint in public sources is about billing mechanics, not output quality. Sourced from the{' '}
                <Link href="/research/132-ai-video-vendor-reviews">132-review tagged Trustpilot corpus</Link>, a Reddit neutral cross-check (75 categorized threads), and public creator investigations.
              </>
            }
            byline={<>AIVideoAuditor desk · Methodology: 132 1-stars tagged across 8 vendors · Reddit cross-check of 75 threads</>}
          />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed max-w-prose mb-16">
          What this page is: pre-purchase risk information. What this page is not: legal advice, post-purchase dispute guidance, or a guarantee. We surface documented patterns. The subscription decision is yours.
        </p>

        <div className="space-y-16 mb-20">
          {VENDORS.map((vendor) => (
            <article key={vendor.name} className="border-t-2 border-rule pt-10">
              <header className="flex flex-wrap items-baseline justify-between gap-4 mb-5">
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink-primary tracking-tight">{vendor.name}</h2>
                <div className="flex items-center gap-3 font-mono text-[11px] text-ink-muted">
                  <SeverityTag severity={vendor.severity} />
                  <span>TP billing <span className="text-neon-amber font-semibold">{vendor.trustpilotBilling}</span></span>
                  <span className="text-rule">/</span>
                  <span>Reddit <span className="text-neon-amber font-semibold">{vendor.redditBilling}</span></span>
                </div>
              </header>

              <p className="font-display text-xl leading-snug text-ink-primary italic max-w-prose mb-8">{vendor.headline}</p>

              <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 mb-8">
                <div>
                  <Kicker className="mb-3">Documented patterns</Kicker>
                  <ul className="space-y-2.5">
                    {vendor.documented.map((d) => (
                      <li key={d} className="text-sm text-ink-secondary leading-relaxed flex gap-3">
                        <span className="text-neon-amber font-mono mt-1 shrink-0">▸</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Kicker className="mb-3">Public evidence</Kicker>
                  <ul className="space-y-2.5">
                    {vendor.publicEvidence.map((e) => (
                      <li key={e} className="text-sm text-ink-secondary leading-relaxed flex gap-3">
                        <span className="text-neon-purple font-mono mt-1 shrink-0">▸</span>
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-l-2 border-neon-green/50 pl-5 py-2 bg-paper">
                <Kicker className="text-neon-green mb-3">Before you subscribe</Kicker>
                <ul className="space-y-2">
                  {vendor.beforeYouSubscribe.map((b) => (
                    <li key={b} className="text-sm text-ink-secondary leading-relaxed flex gap-3">
                      <span className="text-neon-green font-mono mt-1 shrink-0">→</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <RuleDivider label="Important context" />

        <section className="mb-20 max-w-prose">
          <SectionHead kicker="Scope" title="What this list does not do." />
          <ul className="space-y-3 text-sm text-ink-secondary leading-relaxed">
            <li>▸ Does not call any of these vendors a &ldquo;scam&rdquo; in a legal sense. Documents patterns from public sources so you can subscribe with full information.</li>
            <li>▸ Does not give legal advice or post-purchase dispute guidance. Existing billing disputes are between you, the vendor, and your payment provider.</li>
            <li>▸ Does not draft refund letters, chargeback evidence packets, or dispute templates. AVA is a pre-purchase prevention tool, not a post-purchase recovery tool.</li>
            <li>▸ Not exhaustive. AI-video vendor universe is larger than four platforms. We list those with the strongest documented public evidence as of 2026-05-20.</li>
          </ul>
        </section>

        <section className="mb-20 max-w-prose">
          <LeadCaptureForm
            source="billing-pattern-watch"
            heading="Get the vendor-change alert (free)"
            blurb="Weekly change-alert pipeline (Trustpilot + Reddit + public-creator monitoring). When a tracked vendor materially changes pricing, unlimited routing, refund policy, or filter rules mid-subscription, you hear from us. No marketing spam."
            cta="Add me to the alert list"
            successMessage="In. You hear from us when the alert system ships and next time a tracked vendor materially changes a policy. Unsubscribe one-click."
          />
        </section>

        <section className="border-t border-rule/60 pt-12 max-w-reading">
          <Kicker className="mb-3">For mainstream vendors (Runway, Luma, Sora, Pika, Kling, Veo, Hailuo, Vidu)</Kicker>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink-primary mb-4 leading-tight tracking-tight">
            The dominant pain is quality, not billing.
          </h2>
          <p className="text-ink-secondary text-sm leading-relaxed mb-6 max-w-prose">
            Reddit neutral cross-check shows mainstream vendors have a fundamentally different complaint profile (Runway: 29% billing, 71% quality). For those, the better tool is pre-generation prompt scoring — predict failure before you commit credits. That is AVA&apos;s other surface.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://chromewebstore.google.com/detail/aivideoauditor/ecomchbdfkgakaoponipjgpnjfpimdef"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-neon-green/15 hover:bg-neon-green/25 border border-neon-green/40 text-neon-green font-mono font-semibold text-[11px] tracking-wide uppercase px-5 py-2.5 rounded-md transition-colors"
            >
              Install free extension
            </a>
            <Link
              href="/research/132-ai-video-vendor-reviews"
              className="inline-flex items-center gap-2 border border-rule hover:border-ink-secondary text-ink-secondary hover:text-ink-primary font-mono font-medium text-[11px] tracking-wide uppercase px-5 py-2.5 rounded-md transition-colors"
            >
              Read 132-review research
            </Link>
          </div>
        </section>

        <footer className="mt-20 pt-8 border-t border-rule/40 font-mono text-[11px] text-ink-muted">
          Last updated 2026-05-20 · Sources, methodology, and per-thread Reddit categorization in <code>docs/REDDIT-TRIANGULATION-2026-05-20.md</code>. Corrections, addenda, or vendor-side responses: DM @AIVideoAuditor on X.
        </footer>
      </WidePageShell>
    </>
  );
}
