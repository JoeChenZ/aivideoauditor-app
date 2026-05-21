import type { Metadata } from 'next';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';
import { PageShell, Breadcrumb, ArticleHeader, SectionHead, DataCallout, RuleDivider, Prose } from '@/components/editorial';

export const metadata: Metadata = {
  title: 'Runway Unlimited Slowdown — May 2026 Data + What to Do',
  description:
    'Documented wait-time shift on Runway Unlimited tier in May 2026 (generations 5-10 min → 25-40 min). 6 of 11 May Trustpilot 1-stars cite it independently. Plus pre-purchase risk options.',
  alternates: { canonical: 'https://www.aivideoauditor.com/runway-unlimited-slowdown' },
  openGraph: {
    title: 'Runway Unlimited Slowdown — May 2026 Data + What to Do',
    description:
      'Wait times roughly doubled on the Unlimited tier this month. 6 of 11 May Trustpilot 1-stars confirm independently. Here\'s the data + what it means for subscribers.',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Runway Unlimited Slowdown — May 2026 Data + What to Do',
  description: 'Documented wait-time shift on Runway Unlimited tier in May 2026.',
  author: { '@type': 'Organization', name: 'AIVideoAuditor' },
  publisher: { '@type': 'Organization', name: 'AIVideoAuditor', url: 'https://www.aivideoauditor.com' },
  datePublished: '2026-05-21',
};

const SOURCES = [
  { label: 'Trustpilot', body: '6 of 11 1-star reviews dated 2026-05-01 to 2026-05-21 explicitly name wait-time as the primary complaint. Identical wording across reviewers: "way slower," "cut in half," "production efficiency."' },
  { label: 'X / Twitter', body: 'Creator threads from @IntLab0000 (2.8K-view May 18 + 8.4K-view May 20 follow-up) and @phencasedguy (May 19, 1.3K views) describe the same slowdown affecting production output.' },
  { label: 'Reddit', body: 'r/runwayML thread "How can I get unlimited plan?" (2026-05-19) — multiple commenters confirm the slowdown.' },
  { label: 'Independence', body: 'Same vendor, same week, independent reporters who do not cite each other. Convergence on wording strongly suggests a backend change, not a perception cluster.' },
];

const VENDOR_STATEMENTS = [
  {
    label: 'No official statement',
    body: 'As of 2026-05-21, no Runway communication attributes the slowdown to capacity, infrastructure, or model upgrades. Recent comms focus on the AI Festival (May 20), Seedance 2.0 rollout, and the Aleph push.',
  },
  {
    label: 'Quota structure unchanged on paper',
    body: 'Unlimited remains paid + uncapped per tier docs. Image and video are separate buckets. But throughput — how fast each generation completes — is not contractual.',
  },
  {
    label: 'Pattern fits prior silent nerfs',
    body: 'Second documented silent throughput change on Runway in 2026 (previous wave hit early Q1). Neither preceded by a tier-docs update or email notice.',
  },
];

const OPTIONS = [
  {
    label: 'Monthly Unlimited',
    body: 'Easiest path: cancel before next renewal. Monthly carries no annual lock-in; you bail at the next cycle without dispute. Runway support occasionally honors mid-month proration on escalation; most users ride out the current cycle.',
  },
  {
    label: 'Annual Unlimited',
    body: 'Annual commits are exactly the failure mode AVA exists to prevent — throughput claims at purchase are not contractually held. Watch the policy + tier-docs page for changes (we monitor weekly) and use the remaining months. Future subscriptions: pay monthly until the vendor has been validated for 2+ weeks personally.',
  },
  {
    label: 'Need to keep producing',
    body: (
      <>
        Compare to alternatives that have not experienced the same throughput change recently.{' '}
        <Link href="/compare/kling-vs-runway">Kling vs Runway</Link>,{' '}
        <Link href="/compare/runway-vs-luma">Runway vs Luma</Link>, and{' '}
        <Link href="/compare/sora-vs-veo">Sora vs Veo</Link> all cover throughput plus per-second cost. Different tools, different failure modes — pick on prompt-risk profile.
      </>
    ),
  },
];

export default function RunwayUnlimitedSlowdownPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <PageShell>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Billing Watch', href: '/billing-pattern-watch' },
            { label: 'Runway Unlimited slowdown' },
          ]}
        />

        <ArticleHeader
          kicker="Active issue · May 2026"
          title={<>Runway Unlimited got <span className="italic text-neon-amber">~2× slower</span> in May 2026.</>}
          lede={
            <>If your Runway generations went from <strong>5–10 minutes</strong> to <strong>25–40 minutes</strong> around the second week of May, you are not imagining it. Six of eleven May Runway Trustpilot 1-stars cite the same shift unprompted, plus a wave of creator complaints on X and Reddit.</>
          }
          byline={<>AIVideoAuditor desk · Published 2026-05-21 · Monitored weekly</>}
        />

        <section className="grid grid-cols-2 gap-x-8 gap-y-6 mb-16">
          <DataCallout label="Before" value="5–10 min" delta="Relaxed mode · Q1 2026" />
          <DataCallout label="After" value="25–40 min" delta="May 2026 sample" tone="warn" />
          <DataCallout label="1-stars citing wait-time" value="6 / 11" delta="May 2026 Trustpilot" tone="bad" />
          <DataCallout label="Vendor acknowledgement" value="None" delta="As of 2026-05-21" tone="warn" />
        </section>

        <SectionHead kicker="The evidence" title="What the public sources show." />
        <ul className="space-y-4 mb-16">
          {SOURCES.map((s) => (
            <li key={s.label} className="grid grid-cols-[140px_1fr] gap-6 border-t border-rule/60 pt-4">
              <span className="font-mono text-xs tracking-wide uppercase text-ink-muted">{s.label}</span>
              <span className="text-ink-secondary leading-relaxed">{s.body}</span>
            </li>
          ))}
        </ul>

        <SectionHead kicker="The record" title="What Runway has — and has not — said." />
        <div className="space-y-5 mb-16">
          {VENDOR_STATEMENTS.map((v) => (
            <div key={v.label} className="border border-rule rounded-md p-5 bg-surface">
              <p className="font-mono text-[11px] tracking-kicker uppercase text-ink-muted mb-2">{v.label}</p>
              <p className="text-ink-secondary leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>

        <SectionHead kicker="Your options" title="Three paths, by subscription type." />
        <div className="space-y-6 mb-16">
          {OPTIONS.map((opt) => (
            <article key={opt.label} className="border-t border-rule/60 pt-5">
              <h3 className="font-display text-xl font-semibold text-ink-primary mb-2">{opt.label}</h3>
              <Prose><p>{opt.body}</p></Prose>
            </article>
          ))}
        </div>

        <RuleDivider label="Stay current" />

        <section className="border border-rule rounded-md p-8 bg-paper mb-16">
          <h2 className="font-display text-2xl font-semibold text-ink-primary mb-3">Get the watch-list alert</h2>
          <p className="text-ink-secondary leading-relaxed mb-6 max-w-prose">
            AVA monitors vendor tier docs + community sentiment weekly. If Runway restores throughput OR formally announces a quota change, you will hear within 24–48 hours. No marketing spam.
          </p>
          <LeadCaptureForm source="runway-unlimited-slowdown" heading="" blurb="" cta="Add me to the Runway watch list" />
        </section>

        <nav className="font-mono text-xs text-ink-muted">
          <span className="block tracking-kicker uppercase text-[10px] mb-3">Related</span>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/billing-pattern-watch" className="hover:text-ink-primary transition-colors">Billing Pattern Watch (Runway entry)</Link>
            <Link href="/research/132-ai-video-vendor-reviews" className="hover:text-ink-primary transition-colors">132-Review Corpus</Link>
            <Link href="/alternatives/runway" className="hover:text-ink-primary transition-colors">Runway Alternatives</Link>
          </div>
        </nav>
      </PageShell>
    </>
  );
}
