import type { Metadata } from 'next';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';
import { WidePageShell, Breadcrumb, ArticleHeader, SectionHead, Kicker } from '@/components/editorial';

export const metadata: Metadata = {
  title: 'AI Video Vendor Changelog — Documented Mid-Subscription Policy Changes',
  description:
    'Documented changes to AI-video vendor pricing, "unlimited" routing rules, refund policy, and NSFW filters AFTER users subscribed. Hand-tracked from Trustpilot + Reddit + public investigations across Higgsfield, Pollo, Runway, Krea, and others.',
  alternates: { canonical: 'https://www.aivideoauditor.com/vendor-changelog' },
  openGraph: {
    title: 'AI Video Vendor Changelog — Documented Policy Changes',
    description:
      'What changed on AI-video vendors AFTER users subscribed. Per-vendor entries from the 132-review corpus + public investigations.',
    type: 'article',
  },
};

type Change = {
  date: string;
  vendor: string;
  category: 'Pricing' | 'Unlimited routing' | 'Refund policy' | 'NSFW filter' | 'Feature removal' | 'Cancel UX';
  headline: string;
  what: string;
  evidence: string[];
  impact: string;
};

const CHANGES: Change[] = [
  {
    date: '2026-05',
    vendor: 'Higgsfield',
    category: 'Pricing',
    headline: 'Trustpilot reviewers continue to report unauthorized charges off the credit card on file, with no in-product credit issued in return.',
    what: 'On 2026-05-22 a Trustpilot reviewer reported: "You guys took a random $50 out of my account and didn\'t offer me any credit in return. It wasn\'t even the monthly payment of the month. It\'s weird how you guys took $50 and didn\'t give me anything type of credit to use." This is a different pattern from the Black Friday "Battery" lockout: the unauthorized charge here is mid-cycle, off-schedule from the documented billing period, and produces no credit balance the user can spend. Combined with the April 2026 entry below, it shows the post-purchase billing surface continues to be where the largest disputes originate.',
    evidence: [
      'Trustpilot 1-star (2026-05-22): "You guys took a random $50 out of my account and didn\'t offer me any credit in return... it wasn\'t even the monthly payment of the month."',
      'Trustpilot 1-stars (2026-04): same pattern of off-cycle charges + no credit issued.',
      'r/HiggsfieldAI ongoing threads document the same complaint across multiple users.',
    ],
    impact: 'Customers who keep a card on file with Higgsfield are exposed to off-schedule charges that do not produce a usable credit balance. Without external monitoring, a customer would only notice when reconciling a bank statement — by which point the refund window may have closed.',
  },
  {
    date: '2026-05',
    vendor: 'Runway',
    category: 'Feature removal',
    headline: 'Runway mod team acknowledges a wave of "Account Suspensions for Usage Violations" affecting paying users who report no policy-violating activity.',
    what: 'On 2026-05-21 a user posted "Sudden Account Suspension - Didn\'t do anything other than creating videos" in r/runwayml. The Runway mod reply on that thread confirms "we\'re investigating an issue that\'s causing an increase in suspensions" and links to the formal appeals process. The mod admission, combined with the May Trustpilot 1-stars citing the same pattern, indicates a server-side flag-and-suspend mechanism mis-targeting paying customers — not a per-account violation. Resolution requires a multi-day appeal with a Generation ID and use-case statement; without those receipts the appeal is harder.',
    evidence: [
      'r/runwayml thread (2026-05-21): "Sudden Account Suspension - Didn\'t do anything other than creating videos." Runway-team-flaired comment: "we\'re investigating an issue that\'s causing an increase in suspensions" — link to Account-Suspensions-for-Usage-Violations help article.',
      'Trustpilot 1-stars from May 2026: 4 of 11 cite suspension or downgrade without prior notice.',
      'Trustpilot 1-star (2026-05-22): "Don\'t fall for the unlimited plan. Mass account suspension. They first introduced the unlimited plan, and then restrictions started piling up one after another, without any warning. First, they removed the promised 1080p — fine. Then the queue time increased from 15 minutes to an hour…" — stacks suspension wave with the wait-time shift documented in the May 2026 Unlimited-routing entry below.',
      'Appeal-success pattern: resolution within 7-14 business days when filed with timestamps + use-case statement + billing receipt.',
    ],
    impact: 'A "billing pattern watch" surface should treat a sudden suspension as functionally equivalent to a refund-window-closing event — the user is unable to use the service they paid for, with no in-product recourse other than an external appeal. The vendor has acknowledged the suspension wave, which is itself a useful confirmation signal: AVA flags accounts on this vendor for elevated suspension risk in the May 2026 window.',
  },
  {
    date: '2025-12',
    vendor: 'Higgsfield',
    category: 'Unlimited routing',
    headline: '"Unlimited Nano Banana Pro" Black Friday plan converted to a "Battery" credit-lockout system mid-subscription.',
    what: 'Users who bought Black Friday "unlimited" plans for $129+ found that, after day 7, generation triggered a usage-lockout requiring a $5 "Battery" purchase to continue. Simultaneous-generation count was also reduced from 8 → 4 → 2 over the following weeks. Documented bans-during-dispute on accounts that complained publicly.',
    evidence: [
      'YouTube investigation (47K views, 1,660 likes, Dec 2025): "Higgsfield\'s Unlimited Plan Scam Exposed — Final Chapter" (Yaroflasher channel).',
      'r/HiggsfieldAI: "Got burned by Higgsfield\'s unlimited plan" thread.',
      'Trustpilot 1-stars #18, #20, #22, #24: independent users reporting same pattern between Dec 2025 and May 2026.',
      'Documented case of 5× $39 invoices on one account in a single day during the December 2025 cluster.',
    ],
    impact: 'Users who paid for "unlimited" found themselves credit-metered + paying additional fees. Refund window had already closed (7 days from purchase). This is the failure mode AVA exists to flag at pre-purchase — once the window passes, recovery is no longer in the vendor surface.',
  },
  {
    date: '2026-04',
    vendor: 'Higgsfield',
    category: 'Pricing',
    headline: 'Credit cost per 4-second video clip rose from ~8 credits to 48–90 credits mid-subscription.',
    what: 'Annual subscribers report the per-clip credit cost increased roughly 6–11× between subscription start and May 2026, without notice. The list-price plan stayed the same; the in-product credit cost changed beneath it.',
    evidence: [
      'Trustpilot 1-star (2026-04-25): "credit cost jumped: generating a 4-second video costs around 48–90 credits, while before it was closer to 8 credits."',
      'Trustpilot 1-star (2026-04-26): "they change the subscriptions prices month by month because they are SUPER greedy."',
      'Multiple users on r/HiggsfieldAI confirm the same shift.',
    ],
    impact: 'Effective cost per usable clip multiplied 6–11× silently. The advertised plan price did not change, so a customer reading the pricing page would have no way to detect this from outside the product.',
  },
  {
    date: '2026-05',
    vendor: 'Runway',
    category: 'Unlimited routing',
    headline: '"Unlimited" Gen-4 plan generation queue times shifted from 5–10 min to 25–40 min over the first two weeks of May.',
    what: 'Six independent Trustpilot 1-stars in May 2026 name the same wait-time shift on the Runway "Unlimited" tier. Some report 120+ minute waits on the $95/mo plan. Six independent reports of the same delta is not crowding — it is a vendor-side throughput change.',
    evidence: [
      'Trustpilot 1-stars from May 2026: 6 of 11 1-stars cite the same wait-time shift in the same week.',
      'r/runwayml "So frustrated with Runway" + "Runway Unlimited is a Scam" threads (May 2026).',
      'r/runwayml profile bio: "For a $95/month plan, a 10–30 minute wait is understandable; 120+ minutes is a different problem."',
    ],
    impact: '"Unlimited" plan effective throughput dropped 3–8× without any change in advertised plan price. A paying user without external monitoring would not know whether the slowdown is on their end or the vendor\'s.',
  },
  {
    date: '2026-04',
    vendor: 'Pollo',
    category: 'Refund policy',
    headline: 'Pollo offers refunds with the company taking a "service cut" of the refund amount.',
    what: 'When users dispute charges (including unauthorized $70K JPY annual auto-upgrades), Pollo support has offered refunds minus their cut — described by one Trustpilot reviewer as "They offered me a refund but also taking a cut from the refund for their services. How despicable."',
    evidence: [
      'r/generativeAI 1sjcuth: "Pollo AI Suddenly Billed me 70K for a Yearly Pro Subscription" — OP reports refund offered minus service cut.',
      'r/FraudPrevention 1o220dl: "Warning: Pollo AI — Systematic Fraud, Unauthorized Charges" thread documents the same pattern across multiple users.',
      'Trustpilot 1-star (2026-05-22): "I upgraded to a monthly plan with them, and they charged me immediately £1,380. I did not ask for this as I was still evaluating the product." — fresh confirmation that the auto-upgrade pattern continues into May 2026, with the same large unauthorized charge structure as the December 2025 JPY case.',
    ],
    impact: 'Standard refund mechanics in most retail/SaaS contexts are full-amount refunds. Pollo\'s "refund minus cut" structure means a user who recovers 50–70% of an unauthorized charge has still lost money on what should be a fully reversible transaction. AVA\'s position: this vendor pattern is best avoided pre-purchase, since post-purchase recovery is structurally lossy by design.',
  },
  {
    date: '2026-04',
    vendor: 'Krea',
    category: 'Cancel UX',
    headline: 'Annual subscription auto-renewed with no visible cancel button until users navigated hidden workspace menus.',
    what: 'A Trustpilot reviewer paid for yearly Krea Pro and reported "billing dashboard was incomplete and did not display the active plan, so I had no way to cancel in time. Only after searching through hidden workspace menus I found a downgrade option." Pattern matches multiple other Krea 1-stars on subscription mechanics.',
    evidence: [
      'Trustpilot 1-star (Krea) about hidden cancel UI.',
      'Trustpilot 1-star: "I purchased a subscription on April 16 under the understanding that I would receive unlimited access to Seedance 2.0... Instead of unlimited usage, the system immediately began deducting credits from my account."',
      'r/Freepik_AI thread: "Freepik\'s trust issues are valid, their support and billing got complaints."',
    ],
    impact: 'Reverse-default subscription mechanics make it operationally difficult to cancel even when the customer has decided to. This is the kind of friction that FTC\'s 2024 "click-to-cancel" rule was designed to prevent in the U.S. market.',
  },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AI Video Vendor Changelog — Documented Mid-Subscription Policy Changes',
  description:
    'Documented changes to AI-video vendor pricing, routing rules, refund policy, and filter behavior AFTER users subscribed. Sourced from the 132-review Trustpilot corpus, Reddit triangulation, and public investigations.',
  author: { '@type': 'Organization', name: 'AIVideoAuditor' },
  publisher: { '@type': 'Organization', name: 'AIVideoAuditor', url: 'https://www.aivideoauditor.com' },
  datePublished: '2026-05-20',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.aivideoauditor.com' },
    { '@type': 'ListItem', position: 2, name: 'Research', item: 'https://www.aivideoauditor.com/research/132-ai-video-vendor-reviews' },
    { '@type': 'ListItem', position: 3, name: 'Vendor changelog', item: 'https://www.aivideoauditor.com/vendor-changelog' },
  ],
};

const CAT_COLOR: Record<Change['category'], string> = {
  'Pricing': 'text-neon-amber border-neon-amber/40',
  'Unlimited routing': 'text-neon-purple border-neon-purple/40',
  'Refund policy': 'text-neon-red border-neon-red/40',
  'NSFW filter': 'text-neon-cyan border-neon-cyan/40',
  'Feature removal': 'text-neon-green border-neon-green/40',
  'Cancel UX': 'text-neon-amber border-neon-amber/40',
};

export default function VendorChangelogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <WidePageShell>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Vendor Changelog' }]} />

        <div className="max-w-reading">
          <ArticleHeader
            kicker="Mid-subscription vendor changes · Updated 2026-05-20"
            title={<>What changed on AI-video vendors <span className="italic">after</span> users subscribed.</>}
            lede={
              <>
                Tracks AI-video vendor policy changes that occurred mid-subscription — pricing, &ldquo;unlimited&rdquo; routing, refund policy, NSFW filters, feature availability, cancel UX. Sourced from the{' '}
                <Link href="/research/132-ai-video-vendor-reviews">132-review tagged Trustpilot corpus</Link>, cross-checked against{' '}
                <Link href="/billing-pattern-watch">Reddit and public creator investigations</Link>.
              </>
            }
            byline={<>AIVideoAuditor desk · Hand-curated · Each entry backed by ≥2 independent public sources</>}
          />
        </div>

        <div className="space-y-12 mb-20">
          {CHANGES.map((c, i) => (
            <article key={i} className="border-t-2 border-rule pt-8 max-w-reading">
              <div className="flex flex-wrap items-baseline gap-4 mb-4 font-mono text-[11px] text-ink-muted">
                <span className="tracking-wider">{c.date}</span>
                <span className="text-rule">/</span>
                <span className="text-ink-primary font-semibold">{c.vendor}</span>
                <span className={`tracking-kicker uppercase px-2 py-0.5 border rounded ${CAT_COLOR[c.category]}`}>
                  {c.category}
                </span>
              </div>

              <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink-primary mb-4 leading-tight tracking-tight">{c.headline}</h2>
              <p className="text-ink-secondary leading-relaxed mb-6 max-w-prose">{c.what}</p>

              <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 mb-6">
                <div>
                  <Kicker className="mb-3">Public evidence</Kicker>
                  <ul className="space-y-2">
                    {c.evidence.map((e, j) => (
                      <li key={j} className="text-sm text-ink-secondary leading-relaxed flex gap-2.5">
                        <span className="text-neon-purple font-mono mt-1 shrink-0">▸</span>
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Kicker className="mb-3">Effective impact</Kicker>
                  <p className="text-sm text-ink-secondary leading-relaxed border-l-2 border-neon-amber/50 pl-4">{c.impact}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mb-16 max-w-prose">
          <SectionHead kicker="Methodology" title="What counts as an entry." />
          <ul className="space-y-3 text-sm text-ink-secondary leading-relaxed">
            <li>▸ ≥2 independent public sources required (Trustpilot, Reddit, YouTube, LinkedIn, news coverage). A single complaint is not enough.</li>
            <li>▸ Changes must occur mid-subscription. Pre-purchase pricing changes are normal and not tracked here.</li>
            <li>▸ Vendor responses (where they exist) are noted in the impact section. We do not include or omit changes based on whether the vendor disputes the description.</li>
            <li>▸ Documented public behavior, not legal opinion. The page does not assert that any specific vendor practice violates law in any specific jurisdiction.</li>
            <li>▸ Corrections, additions, vendor responses: DM @AIVideoAuditor on X.</li>
          </ul>
        </section>

        <section className="mb-16 max-w-prose">
          <LeadCaptureForm
            source="vendor-changelog"
            heading="Get the next entry when it ships"
            blurb="The change-alert pipeline goes live next. When it does, you get one short email per week (only when a tracked vendor materially changes a policy). Submit a vendor change you've documented — it routes to the curation queue. No marketing spam."
            cta="Track the changelog"
            successMessage="In. The first alert lands as soon as the pipeline goes live and only when a tracked vendor actually changes a policy. Unsubscribe one-click."
          />
        </section>

        <footer className="border-t border-rule/40 pt-8 font-mono text-[11px] text-ink-muted max-w-reading">
          Last updated 2026-05-20 · Source corpus:{' '}
          <Link href="/research/132-ai-video-vendor-reviews" className="text-ink-secondary hover:text-ink-primary transition-colors">132 Trustpilot 1-star reviews + Reddit triangulation</Link>. Vendor risk by tier:{' '}
          <Link href="/billing-pattern-watch" className="text-ink-secondary hover:text-ink-primary transition-colors">/billing-pattern-watch</Link>.
        </footer>
      </WidePageShell>
    </>
  );
}
