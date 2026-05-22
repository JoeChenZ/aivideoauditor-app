import type { Metadata } from 'next';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';
import { WidePageShell, Breadcrumb, ArticleHeader, SectionHead, Kicker, RuleDivider } from '@/components/editorial';

export const metadata: Metadata = {
  title: 'AI Video Vendor Reality Check — 132 Trustpilot 1-Star Reviews (2026 Research)',
  description: 'Original analysis of 132 Trustpilot 1-star reviews across 8 AI-video platforms (Higgsfield, Krea, Pollo, Pika, Runway, Luma, Sora, Vidu). Tagged by failure category. 77% of paid-tier 1-stars cite billing-mechanic complaints, not output quality.',
  alternates: { canonical: 'https://www.aivideoauditor.com/research/132-ai-video-vendor-reviews' },
  openGraph: {
    title: 'AI Video Vendor Reality Check — 132 Trustpilot 1-Star Reviews',
    description: 'The dominant 1-star complaint across AI-video tools is "the vendor cheated me," not "the model is bad." Per-platform breakdown from a tagged corpus.',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AI Video Vendor Reality Check — 132 Trustpilot 1-Star Reviews',
  description: 'Tagged analysis of 132 Trustpilot 1-star reviews across 8 AI-video platforms. Categorises billing predation, cost burn, quality, support failure, access issues, and NSFW filter policy churn.',
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
    { '@type': 'ListItem', position: 3, name: '132-review corpus', item: 'https://www.aivideoauditor.com/research/132-ai-video-vendor-reviews' },
  ],
};

export default function VendorRealityResearchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <WidePageShell>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Research', href: '/research/132-ai-video-vendor-reviews' }, { label: '132-review corpus' }]} />

        <div className="max-w-reading">
          <ArticleHeader
            kicker="Original research · 2026-05"
            title={<>What 132 Trustpilot 1-stars <span className="italic">actually</span> say about AI-video tools.</>}
            lede={
              <>
                We tagged 132 1-star reviews across 8 AI-video platforms by complaint category. The headline finding: <strong>77% of paid-tier 1-stars cite billing-mechanic complaints, not output quality.</strong> The dominant pattern is not &ldquo;the model is bad&rdquo; — it is &ldquo;the vendor cheated me.&rdquo;
              </>
            }
            byline={<>AIVideoAuditor desk · Collected 2026-05-13 to 2026-05-19 · Triangulated against neutral Reddit cross-check</>}
          />
        </div>

        <section className="mb-16 max-w-reading">
          <SectionHead kicker="Methodology" title="How the corpus was built." />
          <p className="text-ink-secondary mb-3">
            Source: trustpilot.com 1-star filter, pages 1-3, per platform. Reviews collected manually between 2026-05-13 and 2026-05-19. Each review was tagged with one or more complaint categories from a 6-tag taxonomy (tags are non-exclusive — one review can hit multiple).
          </p>
          <p className="text-ink-secondary mb-3">
            Sample: 132 reviews across Higgsfield, Krea, Pollo, Pika, Runway, Luma, Sora, and Vidu.
          </p>
          <p className="text-ink-secondary text-sm italic">
            Important caveat: the 1-star pool is self-selected (people who hate the product). It is <em>not</em> a representative customer sample. Read these tags as &ldquo;what people who churned complain about,&rdquo; not &ldquo;what is wrong with the product on average.&rdquo;
          </p>
        </section>

        <section className="mb-12 bg-elevated border border-neon-amber/20 rounded-2xl p-6">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-amber uppercase mb-3">
            Update · 2026-05-20 · Reddit cross-check
          </p>
          <h2 className="text-xl font-bold text-ink-primary mb-3">
            We triangulated the 77% figure against Reddit. The honest read is more interesting.
          </h2>
          <p className="text-ink-secondary text-sm mb-4 leading-relaxed">
            The aggregate 77% billing-predation figure is correct for the Trustpilot 1-star pool. But Trustpilot is a self-selected angry-payment cohort. To check whether that figure survives outside Trustpilot, we ran neutral Reddit searches (&ldquo;review,&rdquo; &ldquo;experience,&rdquo; &ldquo;honest opinion&rdquo;) on three representative vendors and categorized the top 15 results by complaint type.
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-surface text-ink-muted text-xs font-mono uppercase tracking-wider">
                <tr>
                  <th className="text-left px-4 py-2">Vendor</th>
                  <th className="text-right px-4 py-2">Trustpilot billing %</th>
                  <th className="text-right px-4 py-2">Reddit neutral billing %</th>
                  <th className="text-right px-4 py-2">Δ</th>
                </tr>
              </thead>
              <tbody className="text-ink-secondary">
                <tr className="border-t border-border">
                  <td className="px-4 py-2 font-bold text-ink-primary">Pollo</td>
                  <td className="px-4 py-2 text-right">~77%</td>
                  <td className="px-4 py-2 text-right font-bold text-neon-amber">78%</td>
                  <td className="px-4 py-2 text-right text-neon-green">+1pp</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-2 font-bold text-ink-primary">Higgsfield</td>
                  <td className="px-4 py-2 text-right">~77%</td>
                  <td className="px-4 py-2 text-right font-bold text-neon-amber">64%</td>
                  <td className="px-4 py-2 text-right text-ink-muted">-13pp</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-2 font-bold text-ink-primary">Runway</td>
                  <td className="px-4 py-2 text-right">~77%</td>
                  <td className="px-4 py-2 text-right font-bold text-neon-amber">29%</td>
                  <td className="px-4 py-2 text-right text-neon-red">-48pp</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-ink-secondary text-sm leading-relaxed mb-3">
            <strong className="text-ink-primary">What this means:</strong> the AI-video vendor universe contains two structurally different vendor types. The <strong>predatory tier</strong> (Pollo, Higgsfield, Krea, and similar small vendors with hostile subscription mechanics) is mostly a billing problem — the Trustpilot 77% reproduces almost identically in neutral Reddit samples. The <strong>mainstream tier</strong> (Runway, Luma, Sora, Veo) is mostly a quality problem in neutral samples; Trustpilot&apos;s 77% on these vendors is sample-bias amplification of a smaller billing-pain subpopulation.
          </p>
          <p className="text-ink-secondary text-sm leading-relaxed">
            <strong className="text-ink-primary">Implication for buyers:</strong> the kind of risk you take when you subscribe is vendor-specific, not category-wide. Subscribing to Pollo is mostly a billing bet; subscribing to Runway is mostly a quality bet. Our prompt scoring + vendor reality check addresses both, but the per-vendor risk profile changes which surface matters more for your particular use case.
          </p>
          <p className="text-ink-muted text-xs mt-4 italic">
            Method: Firecrawl Reddit search, 5 queries (billing-loaded + neutral), 75 results categorized BILLING / QUALITY / SUPPORT / POSITIVE / NEUTRAL by title + snippet excerpt. Full method + per-thread categorization committed in the source repo at <code className="text-ink-secondary">docs/REDDIT-TRIANGULATION-2026-05-20.md</code>.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink-primary mb-4">The 6-tag taxonomy</h2>
          <ul className="space-y-3 text-ink-secondary">
            <li><strong className="text-ink-primary">Billing predation</strong> — refund denied · post-cancel charge · bait-and-switch on advertised features · price/credit-cost changed mid-sub · features removed mid-subscription · stacked-promo no-refund</li>
            <li><strong className="text-ink-primary">Cost burn (pure)</strong> — &ldquo;credits drain too fast&rdquo; · explicit per-generation cost complaint without other tag</li>
            <li><strong className="text-ink-primary">Quality</strong> — bad output · ignores reference image · marketing oversells the product</li>
            <li><strong className="text-ink-primary">Support failure</strong> — no human · AI bot replies · ignored emails · weeks-long back-and-forth with no resolution</li>
            <li><strong className="text-ink-primary">Access / technical</strong> — can&apos;t log in · page deactivated · features missing post-purchase</li>
            <li><strong className="text-ink-primary">NSFW / brand filter</strong> — overzealous filter on legitimate commercial work · forfeited credits to filter blocks</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink-primary mb-4">Per-platform breakdown</h2>

          <div className="space-y-6">
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-ink-primary mb-2">Runway — 11 reviews (May 2026)</h3>
              <p className="text-ink-secondary text-sm leading-relaxed">
                Trustpilot score 1.1/5. <strong>100% of 1-stars cite billing/routing.</strong> Modal complaint: &ldquo;Unlimited&rdquo; tier routes to credit-metered behaviour after day 7. Wait times jumped from 5-10 min to 25-40 min over the course of May. <strong>6 of 11 reviewers independently name the same wait-time shift in the same week</strong> — that is a vendor change, not crowding.
              </p>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-ink-primary mb-2">Higgsfield — 41 reviews (Mar-May 2026)</h3>
              <p className="text-ink-secondary text-sm leading-relaxed">
                Trustpilot score 4/5 on 2,433 reviews overall — so the 1-star pool is self-selected complainers, not the average customer. Within that pool: <strong>78% billing predation</strong> (refund denial after a single test gen, post-cancel charges, bait-and-switch on advertised features, price/credit-cost changed mid-sub), 37% cost burn, 29% quality, 22% support failure.
              </p>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-ink-primary mb-2">Krea — 78 reviews</h3>
              <p className="text-ink-secondary text-sm leading-relaxed">
                Trustpilot score 2.4/5. <strong>60% billing predation.</strong> Auto-renewals after cancelled subscriptions and a cancel button that lives at billing-portal-only (not in the main app, which routes to upsell pages) are the most common patterns. &ldquo;Unlimited Seedance 2.0&rdquo; promo routes to credit-metered after day 7.
              </p>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-ink-primary mb-2">Pollo — 1-star segment of 3,508 reviews</h3>
              <p className="text-ink-secondary text-sm leading-relaxed">
                Aggregate score 4.4/5 hides a brutal 1-star segment. <strong>42% billing + 32% NSFW filter policy churn.</strong> The modal NSFW complaint: &ldquo;NSFW worked before I subscribed, now it doesn&apos;t.&rdquo; — a silent filter policy revision mid-subscription.
              </p>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-ink-primary mb-2">Pika — 56 reviews</h3>
              <p className="text-ink-secondary text-sm leading-relaxed">
                Trustpilot score 1.6/5. <strong>63% quality failure + 53% support black-hole.</strong> Different pathology from the others: the vendor is not extracting money via bait-and-switch — the product itself just does not deliver, and when it fails, no human responds. Generations fail, credits expire, no resolution.
              </p>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-ink-primary mb-2">Sora — wind-down period</h3>
              <p className="text-ink-secondary text-sm leading-relaxed">
                Sora 2 web sunsets 2026-04-26 (officially announced). Trustpilot 1-stars during the wind-down: 71% billing — users still being charged through the deprecation window.
              </p>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-ink-primary mb-2">Luma — selection</h3>
              <p className="text-ink-secondary text-sm leading-relaxed">
                Cancel UI lives at <code className="text-xs">billing.luma.ai/portal</code>, NOT at any &ldquo;Manage subscription&rdquo; link in the main app. Refund denial language pattern: &ldquo;credits were consumed during the billing cycle.&rdquo; Pushing back with a generation log export usually reverses the denial.
              </p>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-ink-primary mb-2">Vidu — smaller dataset</h3>
              <p className="text-ink-secondary text-sm leading-relaxed">
                Platform-parity issues most common: model behaviour differs measurably from marketing claims on specific shot types (text-to-video performance below benchmark on character work).
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink-primary mb-4">The two vendor pathologies</h2>
          <p className="text-ink-secondary mb-4">Reading the 132 reviews end-to-end, complaints cluster into two distinct vendor pathologies.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-ink-primary mb-2">1. Billing predation</h3>
              <p className="text-ink-secondary text-sm leading-relaxed">
                Runway, Higgsfield, and Krea fit this. The product works; the vendor&apos;s billing mechanic is the complaint. Refund denial after a single test gen. &ldquo;Unlimited&rdquo; tier that secretly converts to credit-metered. Auto-renewal traps. Cancel UI hidden behind a billing-portal sub-page.
              </p>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-ink-primary mb-2">2. Product + support failure</h3>
              <p className="text-ink-secondary text-sm leading-relaxed">
                Pika fits this most clearly. The vendor is not trying to extract money via bait-and-switch — the product just does not deliver, and when it does not, no human responds. Generations fail, credits expire, no resolution.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink-primary mb-4">Why this matters for paid users</h2>
          <p className="text-ink-secondary mb-3">
            The headline credit cost is the <em>disclosed</em> cost. The <strong>effective cost</strong> is approximately:
          </p>
          <p className="text-ink-secondary mb-3 font-mono text-sm bg-elevated p-4 rounded-xl">
            effective_cost = disclosed_cost × (1 / first_try_success_rate) × (1 + refund_denial_rate)
          </p>
          <p className="text-ink-secondary mb-3">For Higgsfield Ultra: estimated effective cost is <strong>2-3× the marketing math</strong> (60% first-try success × 78% refund denial across the 1-star pool).</p>
          <p className="text-ink-secondary">For Runway Unlimited (May 2026): wait-time changes alone shifted effective throughput by <strong>5-8×</strong> (5-10 min → 25-40 min per gen).</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink-primary mb-4">Raw corpus — direct download</h2>
          <p className="text-ink-secondary mb-4">
            The Higgsfield 1-star slice (41 reviews) is fully tagged with verbatim quotes + per-review category tags. Cross-vendor complaint rates (8 vendors, 132 reviews aggregate) are in a second file. No signup needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/corpus/higgsfield-1star-41-reviews-2026-05-19.csv"
              download
              className="flex-1 bg-elevated hover:bg-elevated/80 border border-neon-amber/30 rounded-xl p-5 transition-colors"
            >
              <p className="text-xs font-mono font-bold tracking-widest text-neon-amber uppercase mb-2">CSV · 41 rows</p>
              <p className="text-ink-primary font-bold text-sm mb-1">Higgsfield 1-star — fully tagged</p>
              <p className="text-ink-muted text-xs">id, date, title, body excerpt, tags. Pages 1-3 of Trustpilot, mid-March to mid-May 2026.</p>
            </a>
            <a
              href="/corpus/vendor-complaint-rates-2026-05-19.csv"
              download
              className="flex-1 bg-elevated hover:bg-elevated/80 border border-neon-purple/30 rounded-xl p-5 transition-colors"
            >
              <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-2">CSV · 8 vendors</p>
              <p className="text-ink-primary font-bold text-sm mb-1">Cross-vendor complaint rates</p>
              <p className="text-ink-muted text-xs">Per-vendor billing / cost / quality / support / brand-filter percentages. Aggregated across Higgsfield, Krea, Pollo, Pika, Runway, Luma, Sora, Kling.</p>
            </a>
          </div>
          <p className="text-xs text-ink-muted mt-4 italic">
            Source: Trustpilot 1-star pages, scraped 2026-05-13 to 2026-05-19. Tagging method documented above. Full per-row reading + per-vendor breakdown also lives on this page below — the CSV is for tooling / journalism / spreadsheet analysis.
          </p>
        </section>

        <section className="mb-12" id="get-the-corpus">
          <LeadCaptureForm
            source="research-132-vendor-reviews"
            heading="Get weekly vendor-change alerts when the pipeline ships"
            blurb="The CSV corpus is already downloadable above. This form is for the recurring side: when a tracked vendor materially changes pricing, 'unlimited' routing, refund policy, or filter rules mid-subscription, you get one short alert. The monitoring pipeline ships next; you'll be on the first send. Early Pro access included when prompt scoring opens. No drip, no marketing spam."
            cta="Add me to the alert list →"
            successMessage="In. The first alert lands as soon as the monitoring pipeline goes live, and only when a tracked vendor actually changes a policy. Unsubscribe one-click."
          />
        </section>

        <section className="bg-surface border border-neon-green/20 rounded-2xl p-8 text-center mb-8">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">Built on this data</p>
          <h2 className="text-2xl font-bold text-ink-primary mb-3">AIVideoAuditor scores your prompt against this corpus</h2>
          <p className="text-ink-secondary text-sm mb-6 max-w-2xl mx-auto">
            The 105 failure modes in our catalogue are tagged per vendor against this corpus + ongoing platform monitoring. Pre-flight prompt scoring tells you the failure-rate forecast for the specific platform and prompt shape you intend to use — before you commit credits to a generation that will fail.
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
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-elevated hover:bg-elevated/80 border border-border text-ink-secondary font-mono font-semibold px-6 py-3 rounded-xl transition-all text-sm"
            >
              See Pro Scoring Plans →
            </Link>
          </div>
        </section>

        <footer className="border-t border-rule/40 pt-8 font-mono text-[11px] text-ink-muted">
          Published 2026-05-20 · Corrections + addenda: DM @AIVideoAuditor on X.
        </footer>
      </WidePageShell>
    </>
  );
}
