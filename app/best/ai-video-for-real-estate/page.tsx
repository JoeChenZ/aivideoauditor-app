import type { Metadata } from 'next';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';
import { WidePageShell, Breadcrumb, ArticleHeader, RuleDivider, Kicker } from '@/components/editorial';
import { AffiliateLink, AffiliateDisclosure } from '@/components/affiliate-link';

const URL = 'https://www.aivideoauditor.com/best/ai-video-for-real-estate';

export const metadata: Metadata = {
  title: 'Best AI Video Generator for Real Estate Agents (2026)',
  description:
    'The AI video tools that actually fit real estate work: listing walkthroughs, agent intro/talking-head videos, and social clips. HeyGen for on-camera presence without filming, InVideo for listing montages — with the billing gotchas flagged.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'Best AI Video Generator for Real Estate Agents (2026)',
    description: 'Listing walkthroughs, agent intros, social clips — the AI video tools that fit real estate work, with honest pricing and billing caveats.',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best AI Video Generator for Real Estate Agents (2026)',
  description: 'Which AI video tools fit real estate workflows — listing walkthroughs, agent talking-head video, and social clips — with honest pricing and billing caveats.',
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
    { '@type': 'ListItem', position: 2, name: 'Best', item: 'https://www.aivideoauditor.com/best/ai-video-for-real-estate' },
    { '@type': 'ListItem', position: 3, name: 'AI Video for Real Estate', item: URL },
  ],
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best AI video generators for real estate agents (2026)',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'HeyGen — agent talking-head / intro video' },
    { '@type': 'ListItem', position: 2, name: 'InVideo AI — listing walkthroughs & social montages' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the best AI video tool for real estate agents?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no single winner because agents make two different videos. For an agent on-camera without filming — intros, market updates, listing narration — HeyGen produces a talking-head avatar of you. For listing walkthroughs and social montages from photos and a script, InVideo AI is the faster fit. Most agents use one of each rather than forcing one tool to do both.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can AI make a real estate listing video?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Tools like InVideo AI take listing photos plus a text description (or MLS blurb) and assemble a captioned, music-backed walkthrough video with AI voiceover. It will not fly a drone or shoot cinematic interiors — for hero footage you still want a real videographer — but for fast social-ready listing clips it is effective and cheap.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I have to film myself?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. HeyGen can build a photorealistic avatar from a short recording, then generate new videos of "you" from a script — so you can publish weekly agent updates without setting up a camera each time. Disclose AI use where your brokerage or local regulations require it, and keep claims about properties accurate regardless of how the video is made.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does AI real estate video cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Entry paid plans on both HeyGen (avatar) and InVideo (listing video) land in the roughly $20–$30/month range, cheaper billed annually. The real cost driver is the usage metric — HeyGen credits/minutes and InVideo weekly generation minutes — so match the tier to how many videos you actually publish, and start monthly before committing annually.',
      },
    },
  ],
};

export default function RealEstateAIVideoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <WidePageShell>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Best' }, { label: 'AI Video for Real Estate' }]} />

        <div className="max-w-reading">
          <ArticleHeader
            kicker="Buyer guide · Updated 2026-07-12"
            title={<>The best AI video tools for real estate agents — split by the video you&apos;re actually making.</>}
            lede={
              <>
                Agents ask for &ldquo;the best AI video generator&rdquo; as if it&apos;s one product.
                It isn&apos;t. You make two different videos: <strong>you talking to camera</strong>{' '}
                (intros, market updates) and <strong>the property on screen</strong> (listing
                walkthroughs, social clips). Different jobs, different tools. Here&apos;s the honest
                pick for each — with the billing caveats we flag on every vendor.
              </>
            }
            byline={<>AIVideoAuditor desk · Picks by job-to-be-done · Pricing verified against public plan pages, confirm current</>}
          />
        </div>

        <AffiliateDisclosure />

        <RuleDivider label="Job 1 — you, on camera, without filming" />

        <article className="mb-16">
          <header className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink-primary tracking-tight">HeyGen</h2>
            <span className="font-mono text-[11px] text-ink-muted">Primary pick · agent avatar / talking-head</span>
          </header>
          <p className="font-display text-xl leading-snug text-ink-primary italic max-w-prose mb-6">
            Record yourself once; generate weekly agent videos from a script forever. The best way
            to keep a consistent on-camera presence without setting up a camera every time.
          </p>
          <div className="max-w-prose space-y-4 text-sm text-ink-secondary leading-relaxed mb-6">
            <p>
              <strong>Use it for:</strong> agent intro videos, weekly market updates, &ldquo;just
              listed / just sold&rdquo; announcements, neighborhood guides, and buyer/seller tip
              clips where <em>you</em> are the brand.
            </p>
            <p>
              <strong>Why it wins here:</strong> HeyGen&apos;s avatar and lip-sync quality is
              best-in-class, and it removes the real bottleneck — agents don&apos;t skip video
              because they can&apos;t write a script, they skip it because filming is a hassle.
              Generate from text, translate into other languages for multilingual markets, done.
            </p>
            <p>
              <strong>Pricing &amp; the gotcha:</strong> a Creator-level plan is around
              <strong> $24–$29/mo</strong> (cheaper annually). It&apos;s <strong>credit/minute-metered</strong>,
              and re-renders after script edits cost credits again — so voice- and script-check
              before you generate. We wrote the full breakdown on our{' '}
              <Link href="/billing-pattern-watch/heygen" className="text-neon-purple hover:underline">HeyGen billing page</Link>:
              assume credits don&apos;t roll over, and start monthly before going annual.
            </p>
          </div>
          <AffiliateLink tool="heygen" variant="button">Try HeyGen free →</AffiliateLink>
        </article>

        <RuleDivider label="Job 2 — the property on screen" />

        <article className="mb-16">
          <header className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink-primary tracking-tight">InVideo AI</h2>
            <span className="font-mono text-[11px] text-ink-muted">Primary pick · listing walkthroughs &amp; social clips</span>
          </header>
          <p className="font-display text-xl leading-snug text-ink-primary italic max-w-prose mb-6">
            Feed it listing photos and the description; it assembles a captioned, music-backed
            walkthrough with AI voiceover. From MLS blurb to social-ready clip in minutes.
          </p>
          <div className="max-w-prose space-y-4 text-sm text-ink-secondary leading-relaxed mb-6">
            <p>
              <strong>Use it for:</strong> photo-based listing videos, price-drop and open-house
              promos, Reels/TikTok/Shorts montages, and turning a written listing into a narrated
              video without editing software.
            </p>
            <p>
              <strong>Why it wins here:</strong> it&apos;s built around prompt-and-script input,
              which is exactly how agents already describe a property. You get stock B-roll for
              neighborhood context, auto-captions for silent autoplay feeds, and templates sized
              for each platform.
            </p>
            <p>
              <strong>Pricing &amp; the gotcha:</strong> free tier exists but exports carry a
              watermark and weekly generation minutes are capped; paid plans start around
              <strong> $20/mo</strong> (cheaper annually). The limiter that bites is
              <strong> weekly generation minutes</strong>, not a video count — if you batch a
              week&apos;s listings in one sitting you can hit the wall, so spread output or size the
              tier to your real volume.
            </p>
          </div>
          <AffiliateLink tool="invideo" variant="button">Try InVideo AI free →</AffiliateLink>
        </article>

        <RuleDivider label="What AI video won't do for you" />

        <section className="max-w-prose space-y-5 text-ink-secondary leading-relaxed mb-16">
          <p>
            Straight talk, because we&apos;re a watchdog first: AI video <strong>will not</strong>{' '}
            shoot cinematic interior footage, fly a drone over the property, or replace a real
            videographer for a luxury hero listing. If the listing justifies premium production,
            hire a human. AI video is for <strong>volume and consistency</strong> — the weekly
            content that keeps you visible between big shoots, produced cheaply enough that you
            actually keep doing it.
          </p>
          <p>
            One more caveat that isn&apos;t about billing: disclose AI use where your brokerage,
            MLS, or local advertising rules require it, and keep every claim about a property
            accurate no matter how the video was made. An AI avatar saying something misleading is
            still your license on the line.
          </p>
        </section>

        <section className="border-l-2 border-neon-green/50 pl-5 py-2 bg-paper max-w-prose mb-20">
          <Kicker className="text-neon-green mb-3">The efficient stack for most agents</Kicker>
          <ul className="space-y-2 text-sm text-ink-secondary leading-relaxed">
            <li className="flex gap-3"><span className="text-neon-green font-mono mt-1 shrink-0">→</span><span><strong>HeyGen</strong> for your face-to-camera content (intros, updates) — record once, publish weekly.</span></li>
            <li className="flex gap-3"><span className="text-neon-green font-mono mt-1 shrink-0">→</span><span><strong>InVideo AI</strong> for per-listing walkthroughs and social clips.</span></li>
            <li className="flex gap-3"><span className="text-neon-green font-mono mt-1 shrink-0">→</span><span>Both start monthly. Validate on two weeks of real listings before you touch annual billing.</span></li>
          </ul>
        </section>

        <section className="mb-20 max-w-prose">
          <LeadCaptureForm
            source="best-ai-video-real-estate"
            heading="Get the vendor-change alert (free)"
            blurb="When a tool you rely on changes credit rules, pricing, or watermark policy mid-subscription, you hear from us before your next listing push. No marketing spam."
            cta="Add me to the alert list"
            successMessage="In. You'll hear from us the next time a tracked vendor materially changes a policy."
          />
        </section>

        <section className="border-t border-rule/60 pt-10 max-w-reading">
          <Kicker className="mb-3">Keep reading</Kicker>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/billing-pattern-watch/heygen" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors">
              <p className="font-mono font-semibold text-ink-primary text-sm">HeyGen billing explained</p>
              <p className="text-xs text-ink-muted mt-1">Before you pay for the avatar plan</p>
            </Link>
            <Link href="/cheapest-ai-video-generator" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors">
              <p className="font-mono font-semibold text-ink-primary text-sm">Cheapest AI video generator</p>
              <p className="text-xs text-ink-muted mt-1">Real cost per video</p>
            </Link>
            <Link href="/invideo-alternatives" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors">
              <p className="font-mono font-semibold text-ink-primary text-sm">InVideo AI alternatives</p>
              <p className="text-xs text-ink-muted mt-1">Other listing-video options</p>
            </Link>
          </div>
        </section>
      </WidePageShell>
    </>
  );
}
