import type { Metadata } from 'next';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';
import { WidePageShell, Breadcrumb, ArticleHeader, SectionHead, RuleDivider, Kicker } from '@/components/editorial';
import { AffiliateLink, AffiliateDisclosure } from '@/components/affiliate-link';

const URL = 'https://www.aivideoauditor.com/sora-alternatives';

export const metadata: Metadata = {
  title: 'Sora Alternatives (2026): What to Use After the Standalone App Was Killed',
  description:
    'OpenAI killed the standalone Sora app. If you were mid-workflow, here are the alternatives that actually match what most people used Sora for — plus the honest billing gotchas AVA tracks. InVideo, Fliki, Pictory for practical work; Runway/Kling/Veo for cinematic.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'Sora Alternatives (2026): What to Use After the Standalone App Was Killed',
    description: 'Sora went away. The alternatives that match real workflows — practical (InVideo, Fliki, Pictory) vs cinematic (Runway, Kling, Veo) — with the billing gotchas called out.',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Sora Alternatives (2026): What to Use After the Standalone App Was Killed',
  description: 'A practical, honestly-framed guide to replacing Sora for the workflows most people actually used it for.',
  author: { '@type': 'Organization', name: 'AIVideoAuditor' },
  publisher: { '@type': 'Organization', name: 'AIVideoAuditor', url: 'https://www.aivideoauditor.com' },
  datePublished: '2026-07-12',
  dateModified: '2026-07-12',
  image: 'https://www.aivideoauditor.com/opengraph-image',
  articleSection: 'Alternatives',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.aivideoauditor.com' },
    { '@type': 'ListItem', position: 2, name: 'Sora Alternatives', item: URL },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Sora shut down?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The standalone consumer Sora experience was discontinued and rolled into other OpenAI surfaces, which left people who built a workflow around the dedicated app stranded. Model access has shifted, pricing changed, and the app people bookmarked no longer works the way it did. That churn — not a quality problem — is why "Sora alternatives" spikes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the closest alternative to Sora for everyday content?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For most real workflows — social clips, faceless YouTube, marketing videos, turning a script into a finished video — a prompt-to-video editor like InVideo AI or a text-to-video tool like Fliki is a closer match than another raw generative model. They give you editing, voiceover, captions and stock, not just a clip you still have to assemble.',
      },
    },
    {
      '@type': 'Question',
      name: 'What replaces Sora for cinematic, generative shots?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Runway Gen-4, Kling and Google Veo are the closest cinematic-generation substitutes. They are the right pick only if you genuinely need raw generative shots — most people who used Sora were assembling content, and a full video tool serves that better.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will I lose money moving off Sora?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can, if you subscribe annually to the first tool you try. AVA tracks credit-expiry, watermark limits and mid-subscription pricing changes across AI-video vendors. Start any replacement on a monthly plan, validate it on your actual shot types for two weeks, and only then consider annual.',
      },
    },
  ],
};

export default function SoraAlternativesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <WidePageShell>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Sora Alternatives' }]} />

        <div className="max-w-reading">
          <ArticleHeader
            kicker="Alternatives · Updated 2026-07-12"
            title={<>Sora got killed off. Here&apos;s what to actually use instead.</>}
            lede={
              <>
                OpenAI discontinued the standalone Sora app and folded model access elsewhere,
                which stranded everyone who had built a real workflow around it. We track shutdowns
                like this on the{' '}
                <Link href="/graveyard">AI graveyard</Link> — the pattern is always the same:
                a tool people depended on changes the deal overnight. This page is the honest
                replacement guide, split by what you were actually doing with Sora.
              </>
            }
            byline={<>AIVideoAuditor desk · Picks split by workflow, not hype · Billing gotchas flagged</>}
          />
        </div>

        <AffiliateDisclosure />

        <div className="max-w-prose space-y-5 text-ink-secondary leading-relaxed mb-14">
          <p>
            First, the uncomfortable truth: most people never needed Sora&apos;s raw generative
            horsepower. They needed <strong>finished video</strong> — a script turned into clips
            with a voiceover, captions and B-roll. Sora gave you a beautiful eight-second shot and
            left you to assemble the rest. So &ldquo;Sora alternative&rdquo; usually means one of
            two very different things. Sort yourself into a lane before you subscribe to anything.
          </p>
          <p>
            <strong>Lane A — practical content:</strong> social clips, faceless YouTube, ads,
            explainers, turning a blog post or script into a video. You want an editor with AI
            baked in, not a bare model.
          </p>
          <p>
            <strong>Lane B — cinematic generation:</strong> you genuinely need raw generative
            shots — stylized motion, dreamlike sequences, hero footage. This is the smaller group,
            and the honest answer is a generative model, covered at the bottom.
          </p>
        </div>

        <RuleDivider label="Lane A — practical content (most people)" />

        <div className="space-y-14 mb-20">
          {/* InVideo */}
          <article className="border-t-2 border-rule pt-10">
            <header className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink-primary tracking-tight">InVideo AI</h2>
              <span className="font-mono text-[11px] text-ink-muted">Best all-round Sora replacement</span>
            </header>
            <p className="font-display text-xl leading-snug text-ink-primary italic max-w-prose mb-6">
              Type a prompt or paste a script; it builds a full video — scenes, stock, voiceover,
              captions — that you can then edit by talking to it. Closest thing to &ldquo;Sora but it
              finishes the job.&rdquo;
            </p>
            <div className="max-w-prose space-y-4 text-sm text-ink-secondary leading-relaxed mb-6">
              <p>
                <strong>Best for:</strong> social + YouTube creators, marketers, anyone who wants a
                publishable video out the other end rather than a clip to assemble.
              </p>
              <p>
                <strong>Pricing model (verify current):</strong> a free tier exists but exports carry
                a watermark and weekly generation minutes are capped. Paid plans (roughly $20/mo Plus,
                ~$48/mo Max, cheaper billed annually) unlock more generation minutes, HD and watermark
                removal. The metric that actually bites is <strong>generation minutes per week</strong>,
                not a flat video count — budget against that, not the headline price.
              </p>
              <p>
                <strong>Billing gotcha AVA flags:</strong> the free tier&apos;s weekly minute reset
                and watermark make it a demo, not a workflow. Don&apos;t commit to annual until
                you&apos;ve confirmed the weekly minute cap survives your real output for two weeks.
              </p>
            </div>
            <AffiliateLink tool="invideo" variant="button">Try InVideo AI free →</AffiliateLink>
          </article>

          {/* Fliki */}
          <article className="border-t-2 border-rule pt-10">
            <header className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink-primary tracking-tight">Fliki</h2>
              <span className="font-mono text-[11px] text-ink-muted">Best for voiceover-led + faceless video</span>
            </header>
            <p className="font-display text-xl leading-snug text-ink-primary italic max-w-prose mb-6">
              Script-to-video with genuinely good AI voices in dozens of languages. If your Sora
              output was narration over visuals, this is the tighter fit.
            </p>
            <div className="max-w-prose space-y-4 text-sm text-ink-secondary leading-relaxed mb-6">
              <p>
                <strong>Best for:</strong> faceless YouTube, multilingual content, podcast-to-video,
                anything where the voiceover carries the video.
              </p>
              <p>
                <strong>Pricing model (verify current):</strong> free tier with a small monthly
                minute allowance; paid tiers (roughly $8–$28/mo depending on annual vs monthly) buy
                more <strong>credits/minutes of audio + video</strong> and premium voices. It is
                credit-metered, so a long project can drain an allowance faster than the monthly
                price implies.
              </p>
              <p>
                <strong>Billing gotcha AVA flags:</strong> premium (cloned/ultra-realistic) voices
                often consume credits at a higher rate than standard voices. If you standardize on a
                premium voice, re-estimate your monthly minutes at the premium burn rate before you
                pick a tier.
              </p>
            </div>
            <AffiliateLink tool="fliki" variant="button">Try Fliki free →</AffiliateLink>
          </article>

          {/* Pictory */}
          <article className="border-t-2 border-rule pt-10">
            <header className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink-primary tracking-tight">Pictory</h2>
              <span className="font-mono text-[11px] text-ink-muted">Best for long-form → clips</span>
            </header>
            <p className="font-display text-xl leading-snug text-ink-primary italic max-w-prose mb-6">
              Turns a blog post, script, or long recording into short, captioned, social-ready
              videos. Repurposing, not generation.
            </p>
            <div className="max-w-prose space-y-4 text-sm text-ink-secondary leading-relaxed mb-6">
              <p>
                <strong>Best for:</strong> bloggers, course creators and teams sitting on existing
                text or webinar footage they want chopped into clips.
              </p>
              <p>
                <strong>Pricing model (verify current):</strong> free trial, then paid tiers
                (roughly $19/mo Starter to ~$39/mo Professional billed annually). The cap that
                matters is <strong>videos and video-minutes per month</strong> — a Starter plan
                runs out faster than heavy creators expect.
              </p>
              <p>
                <strong>Billing gotcha AVA flags:</strong> plans are measured in videos/minutes per
                month, and unused allowance generally does not roll over. Match the tier to your
                real monthly output; over-buying a big plan &ldquo;to be safe&rdquo; is money lost
                each month you underuse it.
              </p>
            </div>
            <AffiliateLink tool="pictory" variant="button">Try Pictory free →</AffiliateLink>
          </article>
        </div>

        <RuleDivider label="Lane B — cinematic generation (the smaller group)" />

        <section className="max-w-prose space-y-5 text-ink-secondary leading-relaxed mb-16">
          <p>
            If you truly need raw generative shots, the honest picks are{' '}
            <strong>Runway Gen-4</strong> (best character consistency across cuts),{' '}
            <strong>Kling</strong> (strongest motion and physics) and{' '}
            <strong>Google Veo</strong> (native audio, cheapest short clips). We do not earn
            anything from those three, and we&apos;re telling you anyway: for most former Sora
            users they&apos;re the wrong pick, because you&apos;ll spend credits generating clips
            you still have to assemble by hand.
          </p>
          <p>
            We keep the shot-by-shot breakdown — and every documented failure mode — on our{' '}
            <Link href="/alternatives/sora">Sora migration guide</Link> and{' '}
            <Link href="/failures">failure catalogue</Link>. If you go the generative route, read
            those first so you know which model fails on your shot type before you burn credits.
          </p>
        </section>

        <section className="border-l-2 border-neon-green/50 pl-5 py-2 bg-paper max-w-prose mb-20">
          <Kicker className="text-neon-green mb-3">Before you subscribe to anything</Kicker>
          <ul className="space-y-2 text-sm text-ink-secondary leading-relaxed">
            <li className="flex gap-3"><span className="text-neon-green font-mono mt-1 shrink-0">→</span><span>Start monthly. Never annual on a tool you haven&apos;t run for two weeks on your real content.</span></li>
            <li className="flex gap-3"><span className="text-neon-green font-mono mt-1 shrink-0">→</span><span>Find the real limiter (weekly minutes, credits, videos/month) — it&apos;s rarely the headline price.</span></li>
            <li className="flex gap-3"><span className="text-neon-green font-mono mt-1 shrink-0">→</span><span>Check whether unused allowance rolls over. Usually it doesn&apos;t.</span></li>
            <li className="flex gap-3"><span className="text-neon-green font-mono mt-1 shrink-0">→</span><span>Cross-check the vendor against our <Link href="/billing-pattern-watch" className="text-neon-purple hover:underline">billing pattern watch</Link> before you commit credits.</span></li>
          </ul>
        </section>

        <section className="mb-20 max-w-prose">
          <LeadCaptureForm
            source="sora-alternatives"
            heading="Get the vendor-change alert (free)"
            blurb="When a tracked AI-video tool changes pricing, credit rules, watermark policy or shuts down mid-subscription, you hear from us before it costs you. No marketing spam."
            cta="Add me to the alert list"
            successMessage="In. You'll hear from us the next time a tracked vendor materially changes a policy — or gets added to the graveyard."
          />
        </section>

        <section className="border-t border-rule/60 pt-10 max-w-reading">
          <Kicker className="mb-3">Keep reading</Kicker>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/cheapest-ai-video-generator" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors">
              <p className="font-mono font-semibold text-ink-primary text-sm">Cheapest AI video generator</p>
              <p className="text-xs text-ink-muted mt-1">Real cost per video, not sticker price</p>
            </Link>
            <Link href="/invideo-alternatives" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors">
              <p className="font-mono font-semibold text-ink-primary text-sm">InVideo AI alternatives</p>
              <p className="text-xs text-ink-muted mt-1">Options by use case</p>
            </Link>
            <Link href="/graveyard" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors">
              <p className="font-mono font-semibold text-ink-primary text-sm">The AI graveyard</p>
              <p className="text-xs text-ink-muted mt-1">Every tool that shut down on its users</p>
            </Link>
          </div>
        </section>
      </WidePageShell>
    </>
  );
}
