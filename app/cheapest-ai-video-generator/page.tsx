import type { Metadata } from 'next';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';
import { WidePageShell, Breadcrumb, ArticleHeader, RuleDivider, Kicker } from '@/components/editorial';
import { AffiliateLink, AffiliateDisclosure } from '@/components/affiliate-link';

const URL = 'https://www.aivideoauditor.com/cheapest-ai-video-generator';

export const metadata: Metadata = {
  title: 'Cheapest AI Video Generator (2026): Real Cost Per Video, Not Headline Price',
  description:
    "The cheapest AI video tool isn't the one with the lowest sticker price — it's the one with the lowest cost per finished, watermark-free video. We break down effective cost across credits, watermarks and limits. InVideo and Fliki come out ahead for most people.",
  alternates: { canonical: URL },
  openGraph: {
    title: 'Cheapest AI Video Generator (2026): Real Cost Per Video, Not Headline Price',
    description: "Sticker price lies. We compare effective cost per finished video — credits, watermarks, limits — and name the genuine value picks.",
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Cheapest AI Video Generator (2026): Real Cost Per Video, Not Headline Price',
  description: 'A billing-data analysis of effective cost per finished video across AI video tools — accounting for credits, watermarks and usage limits.',
  author: { '@type': 'Organization', name: 'AIVideoAuditor' },
  publisher: { '@type': 'Organization', name: 'AIVideoAuditor', url: 'https://www.aivideoauditor.com' },
  datePublished: '2026-07-12',
  dateModified: '2026-07-12',
  image: 'https://www.aivideoauditor.com/opengraph-image',
  articleSection: 'Buyer guide',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.aivideoauditor.com' },
    { '@type': 'ListItem', position: 2, name: 'Cheapest AI Video Generator', item: URL },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the cheapest AI video generator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For most people it is InVideo AI or Fliki, because low effective cost per finished, watermark-free video matters more than the lowest sticker price. A "free" tool that watermarks exports or caps you at a minute of usable video has a very high real cost per publishable video. Both InVideo and Fliki reach a usable paid tier around $8–$20/month with enough allowance to actually ship content.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are free AI video generators actually free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rarely for real use. Free tiers typically add a watermark, cap resolution, or limit weekly/monthly generation minutes to a level that only works for testing. If you need publishable, watermark-free video, price the cheapest paid tier that removes those limits — that is your true floor, not $0.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is cost-per-video different from the monthly price?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Because plans are metered by credits, minutes, or videos per month — not by an unlimited flat fee. Your real cost per video is the monthly price divided by how many finished videos that allowance actually produces at your settings. A cheap plan you can only make three videos on can cost more per video than a pricier plan with a generous allowance.',
      },
    },
    {
      '@type': 'Question',
      name: 'What hidden costs should I watch for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Watermark removal locked behind an upgrade, re-renders that re-charge credits, premium voices or HD that burn allowance faster, no rollover of unused credits, and annual lock-in before you have validated the tool. Each one raises your effective cost per video above the advertised price.',
      },
    },
  ],
};

function CostRow({ tool, sticker, realCost, verdict }: { tool: string; sticker: string; realCost: string; verdict: string }) {
  return (
    <tr className="border-t border-rule/60 align-top">
      <td className="py-4 pr-4 font-display text-lg text-ink-primary">{tool}</td>
      <td className="py-4 pr-4 text-sm text-ink-secondary">{sticker}</td>
      <td className="py-4 pr-4 text-sm text-ink-secondary">{realCost}</td>
      <td className="py-4 text-sm text-ink-secondary">{verdict}</td>
    </tr>
  );
}

export default function CheapestAIVideoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <WidePageShell>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cheapest AI Video Generator' }]} />

        <div className="max-w-reading">
          <ArticleHeader
            kicker="Billing-data buyer guide · Updated 2026-07-12"
            title={<>The cheapest AI video generator isn&apos;t the one with the lowest price.</>}
            lede={
              <>
                It&apos;s the one with the lowest <strong>cost per finished, watermark-free
                video</strong>. Sticker price is marketing; effective cost is what actually leaves
                your account. AVA tracks the billing mechanics — credits, watermarks, minute caps —
                that separate the two. Here&apos;s how to compare tools on real cost, and which ones
                win when you do.
              </>
            }
            byline={<>AIVideoAuditor desk · Effective-cost method · Verify current pricing before buying</>}
          />
        </div>

        <AffiliateDisclosure />

        <RuleDivider label="The method: effective cost per video" />

        <div className="max-w-prose space-y-5 text-ink-secondary leading-relaxed mb-14">
          <p>
            Every AI video tool wants you to compare monthly prices. Don&apos;t. Compare{' '}
            <strong>effective cost per publishable video</strong>:
          </p>
          <p className="border-l-2 border-neon-amber/50 pl-5 py-2 font-mono text-sm text-ink-primary">
            effective cost = monthly price ÷ number of finished, watermark-free videos the plan
            actually produces at <em>your</em> settings
          </p>
          <p>
            Three things quietly inflate that number above the advertised price:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-3"><span className="text-neon-amber font-mono mt-1 shrink-0">▸</span><span><strong>Watermarks.</strong> A free or low tier that watermarks exports produces zero <em>publishable</em> videos for most use cases. Real cost per usable video: effectively infinite until you upgrade.</span></li>
            <li className="flex gap-3"><span className="text-neon-amber font-mono mt-1 shrink-0">▸</span><span><strong>Credits / minute caps.</strong> Plans meter by credits, minutes, or videos per month. Long videos and re-renders drain the allowance faster than the price implies.</span></li>
            <li className="flex gap-3"><span className="text-neon-amber font-mono mt-1 shrink-0">▸</span><span><strong>No rollover.</strong> Unused allowance usually vanishes monthly, so an oversized plan raises your true per-video cost every month you underuse it.</span></li>
          </ul>
        </div>

        <RuleDivider label="How the common options really price out" />

        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse text-left min-w-[640px]">
            <thead>
              <tr className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted">
                <th className="py-2 pr-4 font-medium">Tool</th>
                <th className="py-2 pr-4 font-medium">Headline / free tier</th>
                <th className="py-2 pr-4 font-medium">What drives real cost</th>
                <th className="py-2 font-medium">Verdict</th>
              </tr>
            </thead>
            <tbody>
              <CostRow
                tool="InVideo AI"
                sticker="Free (watermarked, weekly-minute capped); paid ~$20/mo"
                realCost="Weekly generation minutes. Watermark removed on paid. Cheap per video once you're on a paid tier and spread output across the week."
                verdict="Best value for volume content — low effective cost if you publish regularly."
              />
              <CostRow
                tool="Fliki"
                sticker="Free (small monthly minutes); paid ~$8–$28/mo"
                realCost="Credits/minutes of audio + video; premium voices burn faster. Lowest paid entry point of the group."
                verdict="Cheapest genuine entry point for voiceover-led / faceless video."
              />
              <CostRow
                tool="Pictory"
                sticker="Free trial; paid ~$19–$39/mo"
                realCost="Videos + minutes per month, no rollover. Good for repurposing existing text/footage."
                verdict="Fair value only if you fully use the monthly video allowance."
              />
              <CostRow
                tool="Generative models (Runway/Kling/Veo)"
                sticker="~$12–$95/mo tiers, credit-metered"
                realCost="Per-second/credit generation, high rejection rate — you pay for failed generations too."
                verdict="Not the cheapest for finished content; you pay to generate clips you still assemble."
              />
            </tbody>
          </table>
        </div>
        <p className="font-mono text-[11px] text-ink-muted max-w-prose mb-16">
          Figures are indicative and change frequently — always confirm on each tool&apos;s current
          plan page. The point is the <em>method</em>, not any single number.
        </p>

        <RuleDivider label="The value picks" />

        <div className="space-y-14 mb-20">
          <article className="border-t-2 border-rule pt-10">
            <header className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink-primary tracking-tight">InVideo AI</h2>
              <span className="font-mono text-[11px] text-ink-muted">Best value for most people</span>
            </header>
            <div className="max-w-prose space-y-4 text-sm text-ink-secondary leading-relaxed mb-6">
              <p>
                Lowest effective cost per finished video once you factor in that it produces a{' '}
                <strong>complete, editable video</strong> — voiceover, captions, stock, transitions —
                not a raw clip you still have to assemble in a separate editor. That &ldquo;it
                finishes the job&rdquo; factor is where the real savings live.
              </p>
              <p>
                <strong>Watch:</strong> the free tier is a demo (watermark + weekly minute cap).
                Price your real floor at the cheapest paid tier that removes the watermark, and
                spread output across the week so you don&apos;t hit the minute wall.
              </p>
            </div>
            <AffiliateLink tool="invideo" variant="button">Try InVideo AI free →</AffiliateLink>
          </article>

          <article className="border-t-2 border-rule pt-10">
            <header className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink-primary tracking-tight">Fliki</h2>
              <span className="font-mono text-[11px] text-ink-muted">Cheapest real entry point</span>
            </header>
            <div className="max-w-prose space-y-4 text-sm text-ink-secondary leading-relaxed mb-6">
              <p>
                Usually the <strong>lowest paid starting price</strong> of the practical tools, with
                strong multi-language AI voices. If your content is narration over visuals —
                faceless YouTube, explainers, multilingual clips — Fliki&apos;s cost per finished
                video is hard to beat.
              </p>
              <p>
                <strong>Watch:</strong> it&apos;s credit/minute-metered and premium (cloned/ultra)
                voices consume faster. If you standardize on a premium voice, re-estimate your
                monthly minutes at that burn rate before picking a tier.
              </p>
            </div>
            <AffiliateLink tool="fliki" variant="button">Try Fliki free →</AffiliateLink>
          </article>
        </div>

        <section className="border-l-2 border-neon-green/50 pl-5 py-2 bg-paper max-w-prose mb-20">
          <Kicker className="text-neon-green mb-3">Stop overpaying — the checklist</Kicker>
          <ul className="space-y-2 text-sm text-ink-secondary leading-relaxed">
            <li className="flex gap-3"><span className="text-neon-green font-mono mt-1 shrink-0">→</span><span>Count finished videos per month you actually need. Divide the plan price by that. That&apos;s your real cost.</span></li>
            <li className="flex gap-3"><span className="text-neon-green font-mono mt-1 shrink-0">→</span><span>Never judge by the free tier — price the cheapest <em>watermark-free</em> tier as your floor.</span></li>
            <li className="flex gap-3"><span className="text-neon-green font-mono mt-1 shrink-0">→</span><span>Check rollover. If credits don&apos;t roll over, buy the smallest tier that covers your real output, not the &ldquo;safe&rdquo; big one.</span></li>
            <li className="flex gap-3"><span className="text-neon-green font-mono mt-1 shrink-0">→</span><span>Cross-check the vendor on our <Link href="/billing-pattern-watch" className="text-neon-purple hover:underline">billing pattern watch</Link> before committing credits.</span></li>
          </ul>
        </section>

        <section className="mb-20 max-w-prose">
          <LeadCaptureForm
            source="cheapest-ai-video-generator"
            heading="Get the vendor-change alert (free)"
            blurb="When a tracked AI-video tool raises prices, tightens credit rules, or changes watermark policy, you hear from us before your next renewal. No marketing spam."
            cta="Add me to the alert list"
            successMessage="In. You'll hear from us the next time a tracked vendor materially changes a pricing policy."
          />
        </section>

        <section className="border-t border-rule/60 pt-10 max-w-reading">
          <Kicker className="mb-3">Keep reading</Kicker>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/sora-alternatives" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors">
              <p className="font-mono font-semibold text-ink-primary text-sm">Sora alternatives</p>
              <p className="text-xs text-ink-muted mt-1">After the standalone app was killed</p>
            </Link>
            <Link href="/invideo-alternatives" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors">
              <p className="font-mono font-semibold text-ink-primary text-sm">InVideo AI alternatives</p>
              <p className="text-xs text-ink-muted mt-1">Options by use case</p>
            </Link>
            <Link href="/billing-pattern-watch" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors">
              <p className="font-mono font-semibold text-ink-primary text-sm">Billing pattern watch</p>
              <p className="text-xs text-ink-muted mt-1">Vendors with documented billing issues</p>
            </Link>
          </div>
        </section>
      </WidePageShell>
    </>
  );
}
