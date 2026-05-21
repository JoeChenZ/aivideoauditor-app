import type { Metadata } from 'next';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';

export const metadata: Metadata = {
  title: 'AI Video Tool Chargeback Guide — When the Vendor Won\'t Refund (2026)',
  description:
    'Why chargebacks recover money faster than vendor refunds for AI-video subscriptions. Card-issuer ranking, the 4-step process, and what evidence to attach. Data from 132 tagged 1-star reviews across Runway, Higgsfield, Pollo, Pika, Kling, Luma, Sora, Vidu.',
  alternates: { canonical: 'https://www.aivideoauditor.com/chargeback-guide' },
  openGraph: {
    title: 'AI Video Tool Chargeback Guide — When the Vendor Won\'t Refund',
    description:
      'Card-issuer chargeback hierarchy, the 4-step process, and what evidence wins. Built from 132 tagged 1-star reviews + creator interviews.',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AI Video Tool Chargeback Guide — When the Vendor Won\'t Refund',
  description: 'Card-issuer chargeback hierarchy and 4-step process for AI-video subscription refund disputes.',
  author: { '@type': 'Organization', name: 'AIVideoAuditor' },
  publisher: { '@type': 'Organization', name: 'AIVideoAuditor', url: 'https://www.aivideoauditor.com' },
  datePublished: '2026-05-21',
};

const ISSUERS = [
  {
    name: 'American Express (Platinum / Gold / Business)',
    rate: 'Highest',
    why: 'Amex routinely sides with cardholder on subscription-mechanic disputes. The default reps in their chat queue have authority to refund subscription charges without manager escalation.',
    timeline: '1–3 business days for provisional credit. Final resolution 30–45 days.',
  },
  {
    name: 'Chase Sapphire / Visa Signature tier',
    rate: 'High',
    why: 'Chase\'s online dispute portal is responsive. They request supporting documentation but resolve in your favor when the evidence is clear (screenshots of "unlimited" marketing + screenshot of throttling).',
    timeline: '5–10 business days for provisional credit. Final 45–60 days.',
  },
  {
    name: 'Capital One Venture / Quicksilver',
    rate: 'Medium',
    why: 'Capital One requires more documentation than Amex/Chase, but their automated dispute system is competent. Higher chance the vendor counter-claims; document well.',
    timeline: '7–14 business days for provisional credit. Final 60 days.',
  },
  {
    name: 'Debit card direct',
    rate: 'Low',
    why: 'Debit-card disputes go through Reg E (US) or your bank\'s discretionary process. Most retail banks are far less generous than credit card issuers. If you paid by debit and the vendor refuses refund, recovery is uncertain.',
    timeline: '14+ business days. Final 60–90 days. Often unsuccessful for "service degraded" claims.',
  },
];

const VENDOR_RATES = [
  { vendor: 'Pollo AI', rate: '78%', note: 'Highest documented billing-predation rate in our 132-review corpus.' },
  { vendor: 'Higgsfield', rate: '64%', note: '"Unlimited" → credit-metered, 7-day refund cutoff, multi-charge incidents.' },
  { vendor: 'Runway', rate: '29%', note: 'Lowest of the major vendors, but May 2026 saw Unlimited-tier throughput halve unannounced.' },
];

export default function ChargebackGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <main className="min-h-screen py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-primary">Chargeback Guide</span>
          </nav>

          <div className="mb-10">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-amber uppercase mb-3">
              When the vendor won&apos;t refund
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-ink-primary mb-4 leading-tight">
              The chargeback path for AI video subscriptions.
            </h1>
            <p className="text-ink-secondary leading-relaxed">
              After tagging <Link href="/research/132-ai-video-vendor-reviews" className="text-neon-purple underline">132 Trustpilot 1-star reviews</Link> across 8 paid AI-video tools, one pattern is loud: when the vendor stalls a refund, the card issuer settles it faster. This page walks you through which issuer to call, what to say, and what evidence wins.
            </p>
            <p className="text-xs font-mono text-ink-muted mt-4 italic">
              Honest disclaimer: this is information from observed patterns, not legal advice. Chargeback outcomes depend on issuer policy, your card tier, and the specific facts. Always read your card&apos;s dispute terms.
            </p>
          </div>

          {/* Card Issuer Ranking */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-4">Card-issuer ranking</h2>
            <p className="text-ink-secondary text-sm mb-6">
              From the corpus + creator interviews, here&apos;s the rough success-rate ordering for AI-tool subscription disputes. Pay with these cards if you can; switch before your next paid AI-video sub if you can&apos;t.
            </p>
            <div className="space-y-4">
              {ISSUERS.map((i) => (
                <div key={i.name} className="bg-elevated border border-border rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-bold text-ink-primary">{i.name}</h3>
                    <span className={`shrink-0 text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
                      i.rate === 'Highest' ? 'bg-neon-green/10 text-neon-green border-neon-green/40' :
                      i.rate === 'High' ? 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/40' :
                      i.rate === 'Medium' ? 'bg-neon-amber/10 text-neon-amber border-neon-amber/40' :
                      'bg-neon-red/10 text-neon-red border-neon-red/40'
                    }`}>
                      {i.rate}
                    </span>
                  </div>
                  <p className="text-sm text-ink-secondary mb-2">{i.why}</p>
                  <p className="text-xs font-mono text-ink-muted">Timeline: {i.timeline}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 4-step process */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-4">The 4-step process</h2>
            <ol className="space-y-5">
              <li className="bg-surface border border-border rounded-2xl p-5">
                <div className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-2">Step 1 · Document</div>
                <p className="text-sm text-ink-secondary">
                  Before contacting anyone: screenshot the vendor&apos;s marketing claim (e.g. "unlimited"), screenshot the actual behavior that contradicts it (e.g. credit counter, throttling, queue time), screenshot the refund-policy page, screenshot your subscription transaction date. Save the vendor support ticket transcript (or absence of reply).
                </p>
              </li>
              <li className="bg-surface border border-border rounded-2xl p-5">
                <div className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-2">Step 2 · Ask vendor one time</div>
                <p className="text-sm text-ink-secondary">
                  Most card issuers require you to attempt resolution with the vendor first. Send one polite email through their support channel referencing the specific marketing-vs-actual mismatch. Save the email + their response (or 7-day silence). This becomes Exhibit A in your dispute.
                </p>
              </li>
              <li className="bg-surface border border-border rounded-2xl p-5">
                <div className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-2">Step 3 · File the dispute</div>
                <p className="text-sm text-ink-secondary">
                  In the card issuer&apos;s app or website, file a dispute. Use the category: <strong className="text-ink-primary">"Service not as described"</strong> or <strong className="text-ink-primary">"Cancelled service still being charged"</strong> (not "fraud" — fraud is a different category and has different rules). Attach all screenshots from Step 1 + vendor reply from Step 2. State the specific dollar amount being disputed.
                </p>
              </li>
              <li className="bg-surface border border-border rounded-2xl p-5">
                <div className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-2">Step 4 · Hold the line</div>
                <p className="text-sm text-ink-secondary">
                  The vendor will typically counter-claim within 30 days (they have a fiduciary duty to their merchant-acquirer to push back). Don&apos;t back down. The issuer makes the final call. If they side with the vendor on a clear marketing-mismatch case, you can escalate to the Consumer Financial Protection Bureau (US) or your local financial-services regulator (UK/EU).
                </p>
              </li>
            </ol>
          </section>

          {/* Vendor-specific rates */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-4">Billing-predation rate by vendor</h2>
            <p className="text-ink-secondary text-sm mb-4">
              From our 132 1-star review corpus. &quot;Billing predation&quot; = annual locked + service degraded + refund refused.
            </p>
            <div className="bg-elevated border border-border rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface border-b border-border">
                    <th className="text-left p-3 font-mono text-xs uppercase tracking-widest text-ink-muted">Vendor</th>
                    <th className="text-left p-3 font-mono text-xs uppercase tracking-widest text-ink-muted">Rate</th>
                    <th className="text-left p-3 font-mono text-xs uppercase tracking-widest text-ink-muted">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {VENDOR_RATES.map((v) => (
                    <tr key={v.vendor} className="border-b border-border/50 last:border-0">
                      <td className="p-3 font-semibold text-ink-primary">{v.vendor}</td>
                      <td className="p-3 font-mono text-neon-amber">{v.rate}</td>
                      <td className="p-3 text-ink-secondary text-xs">{v.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs font-mono text-ink-muted mt-4">
              Full per-vendor data: <Link href="/billing-pattern-watch" className="text-neon-purple underline">Billing Pattern Watch</Link>
            </p>
          </section>

          {/* What NOT to do */}
          <section className="mb-12 bg-neon-red/5 border border-neon-red/30 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-ink-primary mb-3">What NOT to do</h2>
            <ul className="space-y-2 text-sm text-ink-secondary">
              <li>
                <strong className="text-ink-primary">Don&apos;t file under "Fraud"</strong> unless the charge is genuinely unauthorized. "Service not as described" is the right category for marketing-mismatch disputes.
              </li>
              <li>
                <strong className="text-ink-primary">Don&apos;t threaten the vendor</strong> publicly with chargeback before filing. Some Terms of Service include clauses that void your account for "chargeback misuse" — meaning they could ban you AND keep the money. File with the issuer first; tell the vendor only via the issuer&apos;s formal notice.
              </li>
              <li>
                <strong className="text-ink-primary">Don&apos;t skip Step 2</strong> (one-time vendor contact). Issuers want evidence you tried to resolve it directly. Without it, your dispute is weaker.
              </li>
              <li>
                <strong className="text-ink-primary">Don&apos;t use the same disputed-charge card with the same vendor again.</strong> Some vendors blacklist disputing customers from re-subscribing.
              </li>
            </ul>
          </section>

          {/* Lead capture */}
          <section className="mb-12 bg-elevated border border-border rounded-2xl p-6">
            <h2 className="text-xl font-bold text-ink-primary mb-2">Get the watchlist before you commit credits</h2>
            <p className="text-sm text-ink-secondary mb-4">
              AVA tracks per-vendor billing patterns and warns you before subscribing. Drop your email and we&apos;ll notify you when a vendor on your shortlist quietly changes their refund policy or throughput.
            </p>
            <LeadCaptureForm
              source="chargeback-guide"
              heading=""
              blurb=""
              cta="Notify me when policies change →"
            />
          </section>

          {/* Related */}
          <section className="text-center text-sm">
            <p className="text-ink-muted mb-3">Related reading</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 font-mono text-xs">
              <Link href="/billing-pattern-watch" className="text-neon-purple hover:underline">Billing Pattern Watch</Link>
              <span className="text-ink-muted">·</span>
              <Link href="/research/132-ai-video-vendor-reviews" className="text-neon-purple hover:underline">132-Review Corpus</Link>
              <span className="text-ink-muted">·</span>
              <Link href="/sora-refund" className="text-neon-purple hover:underline">Sora Refund Guide</Link>
              <span className="text-ink-muted">·</span>
              <Link href="/luma-refund-guide" className="text-neon-purple hover:underline">Luma Refund Guide</Link>
              <span className="text-ink-muted">·</span>
              <Link href="/guide-refund-categories" className="text-neon-purple hover:underline">Failure Categories</Link>
              <span className="text-ink-muted">·</span>
              <Link href="/" className="text-neon-purple hover:underline">Home</Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
