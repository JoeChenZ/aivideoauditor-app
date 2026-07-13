import type { Metadata } from 'next';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';
import { WidePageShell, Breadcrumb, ArticleHeader, SectionHead, RuleDivider, Kicker } from '@/components/editorial';
import { AffiliateLink, AffiliateDisclosure } from '@/components/affiliate-link';

const URL = 'https://www.aivideoauditor.com/billing-pattern-watch/heygen';

export const metadata: Metadata = {
  title: 'HeyGen Billing & Credit Issues (2026): What to Know Before You Pay',
  description:
    "An honest breakdown of how HeyGen's credit and plan model actually works — where the surprises hide (credit expiry, plan caps, upgrade prompts) and how to trial it without losing money. Plus avatar/TTS alternatives if the model doesn't fit.",
  alternates: { canonical: URL },
  openGraph: {
    title: 'HeyGen Billing & Credit Issues (2026): What to Know Before You Pay',
    description: "How HeyGen's credit model really works, where the surprises hide, and how to trial it safely. Alternatives if the model doesn't fit your workflow.",
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'HeyGen Billing & Credit Issues (2026): What to Know Before You Pay',
  description: "A structural, honestly-framed guide to HeyGen's credit and plan model and how to avoid billing surprises.",
  author: { '@type': 'Organization', name: 'AIVideoAuditor' },
  publisher: { '@type': 'Organization', name: 'AIVideoAuditor', url: 'https://www.aivideoauditor.com' },
  datePublished: '2026-07-12',
  dateModified: '2026-07-12',
  image: 'https://www.aivideoauditor.com/opengraph-image',
  articleSection: 'Billing patterns',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.aivideoauditor.com' },
    { '@type': 'ListItem', position: 2, name: 'Billing Pattern Watch', item: 'https://www.aivideoauditor.com/billing-pattern-watch' },
    { '@type': 'ListItem', position: 3, name: 'HeyGen', item: URL },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does HeyGen billing work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HeyGen sells subscription plans that grant a monthly allowance of video credits, where credits roughly map to minutes of generated video. Higher tiers grant more credits, longer maximum video length, more avatars/seats and features like API access. The number that governs your real cost is the monthly credit allowance and how fast your videos consume it — not the headline plan price.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do HeyGen credits expire or roll over?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Treat monthly credits as use-it-or-lose-it unless the plan explicitly states rollover. This is the most common billing surprise: buying a large plan "to be safe," under-using it, and losing the unused allowance every month. Match the tier to your real monthly output and verify the current rollover terms before you commit annually.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is HeyGen worth it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For talking-head avatar video — spokesperson clips, training, localized presenter videos — HeyGen has best-in-class avatar and lip-sync quality. It is worth it if you produce that kind of video regularly enough to burn the credits. If you only need occasional avatar clips, or you mainly need voiceover/text-to-video, the credit model can be poor value versus alternatives.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are good HeyGen alternatives?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Synthesia is the closest enterprise-grade avatar alternative (minute-based rather than credit-based, which some teams find more predictable). Fliki is the better pick if you mostly need AI voiceover and text-to-video rather than a photorealistic avatar, usually at lower cost.',
      },
    },
  ],
};

function GotchaCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-l-2 border-neon-amber/50 pl-5 py-2">
      <p className="font-display text-lg text-ink-primary mb-1.5">{title}</p>
      <p className="text-sm text-ink-secondary leading-relaxed">{body}</p>
    </div>
  );
}

export default function HeyGenBillingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <WidePageShell>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Billing Pattern Watch', href: '/billing-pattern-watch' }, { label: 'HeyGen' }]} />

        <div className="max-w-reading">
          <ArticleHeader
            kicker="Pre-subscription risk check · Updated 2026-07-12"
            title={<>HeyGen billing &amp; credits, explained before you pay.</>}
            lede={
              <>
                HeyGen makes some of the best AI avatar video available. It also runs a{' '}
                <strong>credit-metered</strong> subscription model, and credit models are where
                buyers get surprised. This page explains how the model actually works, where the
                surprises hide, and how to trial it without wasting money — in the same warn-first
                voice as the rest of our{' '}
                <Link href="/billing-pattern-watch">billing pattern watch</Link>.
              </>
            }
            byline={<>AIVideoAuditor desk · Structural breakdown, not a complaint dump · Verify current pricing on HeyGen&apos;s site</>}
          />
        </div>

        <AffiliateDisclosure />

        <p className="text-sm text-ink-muted leading-relaxed max-w-prose mb-14">
          Scope note: this is not an accusation. HeyGen is a legitimate, high-quality product. We
          document how its pricing <em>mechanics</em> work so you can subscribe with full
          information — because a credit model rewards buyers who understand it and quietly
          penalizes buyers who don&apos;t. Exact numbers change; always confirm the current plan
          page before paying.
        </p>

        <RuleDivider label="How the model works" />

        <div className="max-w-prose space-y-5 text-ink-secondary leading-relaxed mb-16">
          <p>
            HeyGen sells <strong>subscription tiers that grant a monthly credit allowance</strong>.
            Credits roughly convert to <strong>minutes of generated video</strong>. As you move up
            tiers you get more credits, longer maximum video length per clip, more avatar/seat
            capacity, and features like API access and higher-resolution export.
          </p>
          <p>
            There is a free tier so you can test avatar quality, but it is bounded (short videos, a
            watermark, limited credits) and is a demo rather than a workflow. The paid tiers —
            commonly a Creator-level plan around <strong>$24–$29/mo</strong> and team plans that
            step up from there, cheaper billed annually — are where real work happens. <strong>The
            single most important number is the monthly credit allowance</strong>, because that,
            not the sticker price, is what runs out.
          </p>
          <p>
            The trap in any credit model is simple: your cost per finished video is
            <em> variable</em>, but your bill is <em>fixed</em>. Long videos, re-renders after
            edits, and premium features all draw down credits faster than a beginner estimates. So
            you can pay for a plan and still hit a wall mid-month, or pay for a big plan and waste
            most of it.
          </p>
        </div>

        <RuleDivider label="Where the surprises hide" />

        <div className="space-y-8 max-w-prose mb-20">
          <GotchaCard
            title="Credit expiry / no rollover"
            body="Assume monthly credits are use-it-or-lose-it unless the plan explicitly says otherwise. Buying a large plan and under-using it means you lose the unused allowance every single month. Verify the current rollover terms before choosing a tier."
          />
          <GotchaCard
            title="Re-renders cost credits"
            body="Every regeneration after an edit — a script tweak, a new voice, a fixed typo — can consume credits again. Script and voice-check before you generate, not after. This is where a month's allowance disappears fastest for perfectionists."
          />
          <GotchaCard
            title="Premium features draw down faster"
            body="Longer clips, higher resolution, certain avatar or voice options can consume credits at a higher rate. Estimate your monthly minutes at the settings you'll actually ship at, not at the cheapest setting."
          />
          <GotchaCard
            title="Annual lock-in before validation"
            body="Annual billing is genuinely cheaper — but only if the plan fits. Committing annually before you've run two weeks of real output means you're betting a year of budget on an estimate. Start monthly, measure your true credit burn, then switch to annual once."
          />
          <GotchaCard
            title="Upgrade prompts at the credit wall"
            body="Hitting zero credits mid-project creates pressure to upgrade immediately. That's a bad moment to make a pricing decision. If you're consistently running out, the fix is usually the right tier chosen calmly — or a different tool — not an impulse upgrade under deadline."
          />
        </div>

        <RuleDivider label="If the credit model doesn't fit your workflow" />

        <div className="max-w-prose space-y-5 text-ink-secondary leading-relaxed mb-10">
          <p>
            HeyGen is the right tool when you produce talking-head avatar video regularly enough to
            burn the credits. If you don&apos;t — or the variable credit math makes budgeting
            painful — two alternatives fit different shapes of the same job:
          </p>
        </div>

        <div className="space-y-14 mb-20">
          <article className="border-t-2 border-rule pt-10">
            <header className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink-primary tracking-tight">Synthesia</h2>
              <span className="font-mono text-[11px] text-ink-muted">Closest avatar alternative · often minute-based</span>
            </header>
            <div className="max-w-prose space-y-4 text-sm text-ink-secondary leading-relaxed mb-6">
              <p>
                <strong>Best for:</strong> enterprise training, L&amp;D, and localized presenter
                video at scale. Synthesia is the other heavyweight in AI avatars.
              </p>
              <p>
                <strong>Why it can fit better:</strong> its plans are commonly framed around
                <strong> minutes of video per month/year</strong> rather than abstract credits,
                which some teams find easier to budget and forecast. Pricing (verify current) runs
                from an entry Starter tier up to Creator and Enterprise.
              </p>
              <p>
                <strong>Honest caveat:</strong> minute caps are still caps. The lowest tiers have
                tight monthly minute limits, so confirm the allowance matches your output before
                committing — the same discipline as with HeyGen credits.
              </p>
            </div>
            <AffiliateLink tool="synthesia" variant="button">See Synthesia plans →</AffiliateLink>
          </article>

          <article className="border-t-2 border-rule pt-10">
            <header className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink-primary tracking-tight">Fliki</h2>
              <span className="font-mono text-[11px] text-ink-muted">Better if you don&apos;t need a photoreal avatar</span>
            </header>
            <div className="max-w-prose space-y-4 text-sm text-ink-secondary leading-relaxed mb-6">
              <p>
                <strong>Best for:</strong> creators who mainly need <strong>AI voiceover and
                text-to-video</strong> — faceless YouTube, narrated explainers, multilingual
                content — rather than a talking human avatar.
              </p>
              <p>
                <strong>Why it can fit better:</strong> usually meaningfully cheaper than HeyGen,
                with strong multi-language voices. If you were reaching for HeyGen just for the
                voice and captions, Fliki does that job for less.
              </p>
              <p>
                <strong>Honest caveat:</strong> Fliki is also credit/minute-metered, and premium
                voices burn faster — so the same &ldquo;estimate at your real settings&rdquo; rule
                applies. It is not a photorealistic-avatar tool; if you specifically need a human
                presenter on screen, stay with HeyGen or Synthesia.
              </p>
            </div>
            <AffiliateLink tool="fliki" variant="button">Try Fliki free →</AffiliateLink>
          </article>
        </div>

        <section className="border-l-2 border-neon-green/50 pl-5 py-2 bg-paper max-w-prose mb-20">
          <Kicker className="text-neon-green mb-3">Before you subscribe to HeyGen</Kicker>
          <ul className="space-y-2 text-sm text-ink-secondary leading-relaxed">
            <li className="flex gap-3"><span className="text-neon-green font-mono mt-1 shrink-0">→</span><span>Test avatar quality on the free tier first — it&apos;s a real product, make sure the output clears your bar.</span></li>
            <li className="flex gap-3"><span className="text-neon-green font-mono mt-1 shrink-0">→</span><span>Estimate monthly minutes at your <em>shipping</em> settings (length + resolution + premium voice), not the cheapest.</span></li>
            <li className="flex gap-3"><span className="text-neon-green font-mono mt-1 shrink-0">→</span><span>Confirm whether credits roll over. Assume they don&apos;t until the plan page says they do.</span></li>
            <li className="flex gap-3"><span className="text-neon-green font-mono mt-1 shrink-0">→</span><span>Start monthly. Only switch to annual after two weeks of real, measured credit burn.</span></li>
          </ul>
        </section>

        <section className="mb-20 max-w-prose">
          <LeadCaptureForm
            source="billing-pattern-watch-heygen"
            heading="Get the vendor-change alert (free)"
            blurb="When HeyGen or another tracked AI-video tool changes credit rules, pricing tiers, or plan structure, you hear from us before your next renewal. No marketing spam."
            cta="Add me to the alert list"
            successMessage="In. You'll hear from us the next time a tracked vendor materially changes a billing policy."
          />
        </section>

        <section className="border-t border-rule/60 pt-10 max-w-reading">
          <Kicker className="mb-3">Keep reading</Kicker>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/best/ai-video-for-real-estate" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors">
              <p className="font-mono font-semibold text-ink-primary text-sm">Best AI video for real estate</p>
              <p className="text-xs text-ink-muted mt-1">Where HeyGen fits agents</p>
            </Link>
            <Link href="/billing-pattern-watch" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors">
              <p className="font-mono font-semibold text-ink-primary text-sm">Billing pattern watch</p>
              <p className="text-xs text-ink-muted mt-1">Every vendor we track</p>
            </Link>
            <Link href="/cheapest-ai-video-generator" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors">
              <p className="font-mono font-semibold text-ink-primary text-sm">Cheapest AI video generator</p>
              <p className="text-xs text-ink-muted mt-1">Real cost per video</p>
            </Link>
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t border-rule/40 font-mono text-[11px] text-ink-muted max-w-reading">
          Last updated 2026-07-12 · Pricing mechanics described structurally; exact figures change — confirm on HeyGen&apos;s current plan page before purchase. Corrections or vendor-side responses: DM @AIVideoAuditor on X.
        </footer>
      </WidePageShell>
    </>
  );
}
