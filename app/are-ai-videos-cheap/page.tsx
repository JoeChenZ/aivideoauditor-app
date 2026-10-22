import type { Metadata } from 'next';
import Link from 'next/link';
import { WidePageShell, Breadcrumb, ArticleHeader, RuleDivider, Kicker } from '@/components/editorial';
import StudioCtaBanner from '@/components/studio-cta-banner';

const URL = 'https://www.aivideoauditor.com/are-ai-videos-cheap';
const TITLE = 'Are AI Videos Cheap? What a Second, a Clip and a Finished Minute Cost (October 2026)';
const DESC =
  'Per second of generated footage, yes: Google lists Gemini Omni Flash at about $0.10 per second of 720p video, and Runway Standard works out to roughly $0.29 per second of Gen-4.5. The real cost is the takes you throw away. Worked numbers from the vendors’ own pricing pages, checked October 22, 2026.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, type: 'article' },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DESC,
  author: { '@type': 'Organization', name: 'AIVideoAuditor' },
  publisher: { '@type': 'Organization', name: 'AIVideoAuditor', url: 'https://www.aivideoauditor.com' },
  datePublished: '2026-10-22',
  dateModified: '2026-10-22',
  image: 'https://www.aivideoauditor.com/opengraph-image',
  articleSection: 'Buyer guide',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.aivideoauditor.com' },
    { '@type': 'ListItem', position: 2, name: 'Are AI Videos Cheap?', item: URL },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are AI videos cheap?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Per second of generated footage, usually yes. On October 22, 2026, Google’s Gemini API pricing page listed Gemini Omni Flash at an effective price of about $0.10 per second of 720p video, and Runway’s Standard plan ($15 billed monthly) included 625 credits, which Runway says equals 52 seconds of Gen-4.5, or roughly $0.29 per second. The cost that decides whether AI video is cheap for you is how many generations you discard before you get one you keep.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does one minute of AI video cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'At list prices checked October 22, 2026: about $6 for 60 seconds of 720p from Gemini Omni Flash, and about $17 for 60 seconds of Runway Gen-4.5 on the monthly Standard plan. Those are costs for footage generated, not footage kept. If you keep one take in four, multiply by four.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you pay for failed AI video generations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on what failed means. Google’s pricing page says you are only charged if a video is successfully generated, so a request that errors out is not billed. A video that generates fine but is not usable (wrong motion, warped hands, garbled text) is a successful generation and is billed on every per-second or per-credit service.',
      },
    },
  ],
};

function Row({ what, price, perSecond, perMinute }: { what: string; price: string; perSecond: string; perMinute: string }) {
  return (
    <tr className="border-t border-rule/60 align-top">
      <td className="py-4 pr-4 font-display text-lg text-ink-primary">{what}</td>
      <td className="py-4 pr-4 text-sm text-ink-secondary">{price}</td>
      <td className="py-4 pr-4 text-sm text-ink-secondary">{perSecond}</td>
      <td className="py-4 text-sm text-ink-secondary">{perMinute}</td>
    </tr>
  );
}

export default function AreAIVideosCheapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <WidePageShell>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Are AI Videos Cheap?' }]} />

        <div className="max-w-reading">
          <ArticleHeader
            kicker="Cost explainer · Prices checked 2026-10-22"
            title={<>Are AI videos cheap? Per second, yes. Per keeper, it depends on you.</>}
            lede={
              <>
                Generated footage is priced by the second or by the credit, and at list prices a
                second of AI video costs cents. What you actually pay is that price multiplied by
                every take you generate and throw away. Below are the per-second numbers from the
                vendors&apos; own pricing pages, then the one multiplier that decides your real cost.
              </>
            }
            byline={<>AIVideoAuditor desk · Sources: Google Gemini API pricing, Runway pricing · Verify before buying</>}
          />
        </div>

        <RuleDivider label="The short answer" />

        <div className="max-w-prose space-y-5 text-ink-secondary leading-relaxed mb-14">
          <p>
            <strong>Yes, per second of footage.</strong> Google&apos;s Gemini API pricing page lists
            Gemini Omni Flash (<code>gemini-omni-1.1-flash</code>) at about <strong>$0.10 per second</strong>{' '}
            of 720p video. Runway&apos;s Standard plan works out to roughly <strong>$0.29 per second</strong>{' '}
            of Gen-4.5 when billed monthly.
          </p>
          <p>
            <strong>Not automatically, per finished video.</strong> Both services bill for every clip
            they successfully generate, including the ones you reject. If it takes you four
            generations to get one usable shot, your real price per kept second is four times the
            list price.
          </p>
        </div>

        <RuleDivider label="List price per second and per minute" />

        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse text-left min-w-[640px]">
            <thead>
              <tr className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted">
                <th className="py-2 pr-4 font-medium">Option</th>
                <th className="py-2 pr-4 font-medium">How it is priced</th>
                <th className="py-2 pr-4 font-medium">Per generated second</th>
                <th className="py-2 font-medium">Per generated minute</th>
              </tr>
            </thead>
            <tbody>
              <Row
                what="Gemini Omni Flash (Gemini API, paid tier)"
                price="$17.50 per 1M video output tokens, at 5,792 tokens per second of 720p"
                perSecond="About $0.10 at 720p (Google's own figure)"
                perMinute="About $6 at 720p"
              />
              <Row
                what="Runway Standard, Gen-4.5"
                price="$15/month billed monthly ($12 billed yearly), 625 credits, Gen-4.5 uses 12 credits per second"
                perSecond="About $0.29 monthly, about $0.23 yearly"
                perMinute="About $17 monthly, about $14 yearly"
              />
              <Row
                what="Runway Pro, Gen-4.5"
                price="$35/month billed monthly ($28 billed yearly), 2,250 credits = 187s of Gen-4.5 per Runway"
                perSecond="About $0.19 monthly, about $0.15 yearly"
                perMinute="About $11 monthly, about $9 yearly"
              />
            </tbody>
          </table>
        </div>
        <p className="font-mono text-[11px] text-ink-muted max-w-prose mb-16">
          Read from ai.google.dev/gemini-api/docs/pricing and runwayml.com/pricing on October 22,
          2026. Per-second and per-minute figures are our arithmetic on those list prices, rounded.
          Google does not state a per-second Omni figure for 1080p or 4K. Prices change; check the
          vendor page before you budget.
        </p>

        <RuleDivider label="The multiplier that decides your real cost" />

        <div className="max-w-prose space-y-5 text-ink-secondary leading-relaxed mb-14">
          <p className="border-l-2 border-neon-amber/50 pl-5 py-2 font-mono text-sm text-ink-primary">
            real cost per kept second = list price per second × generations per kept shot
          </p>
          <p>
            Here is how that plays out on one 60-second finished video, using Gemini Omni Flash at
            720p. The keep rates are examples to show the arithmetic, not measurements:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-3"><span className="text-neon-amber font-mono mt-1 shrink-0">▸</span><span><strong>Every take usable:</strong> about $6.</span></li>
            <li className="flex gap-3"><span className="text-neon-amber font-mono mt-1 shrink-0">▸</span><span><strong>One in two usable:</strong> about $12.</span></li>
            <li className="flex gap-3"><span className="text-neon-amber font-mono mt-1 shrink-0">▸</span><span><strong>One in four usable:</strong> about $24.</span></li>
            <li className="flex gap-3"><span className="text-neon-amber font-mono mt-1 shrink-0">▸</span><span><strong>One in ten usable:</strong> about $60.</span></li>
          </ul>
          <p>
            The same multiplier applies on Runway, starting from about $17 per generated minute on
            the monthly Standard plan. Your keep rate depends on the shot: text in frame, hands,
            fast motion and multi-person dialogue tend to need more retries than a slow product
            turn. Our <Link href="/failures" className="text-neon-purple hover:underline">failure library</Link>{' '}
            lists the common ways clips come out wrong, and the{' '}
            <Link href="/ai-video-prompt-structure" className="text-neon-purple hover:underline">prompt structure guide</Link>{' '}
            covers what reduces retries.
          </p>
        </div>

        <RuleDivider label="Costs that are easy to miss" />

        <div className="max-w-prose space-y-5 text-ink-secondary leading-relaxed mb-14">
          <p>
            <strong>Successful but unusable still bills.</strong> Google&apos;s pricing page says you
            are only charged if a video is successfully generated, so a request that errors out is
            free. A clip that renders but has warped hands is a successful generation and is billed.
            On Runway, credits are spent per generation, so a take you discard costs the same as a
            take you keep.
          </p>
          <p>
            <strong>Unused credits can expire.</strong> Runway says Standard and Pro monthly credits
            do not roll over and reset within 24 hours of the billing date. Only the Max plan rolls
            over up to one month of unused credits. A plan larger than your output raises your
            effective price per second every month you underuse it.
          </p>
          <p>
            <strong>Clip length caps.</strong> Gemini Omni Flash produces 3 to 10 second clips per
            Google&apos;s guide, so a 60-second video is at least six generations plus editing.
            Longer videos mean more stitching, and every re-generated shot is billed again.
          </p>
          <p>
            <strong>Model shutdowns force re-tests.</strong> Hosted models retire on short notice.
            The Veo 3.1 preview IDs in the Gemini API are listed for shutdown on October 22, 2026.
            See the <Link href="/graveyard/veo-3-1-preview-shutdown" className="text-neon-purple hover:underline">Veo 3.1 Preview shutdown record</Link>{' '}
            for how per-second prices moved for each tier.
          </p>
        </div>

        <section className="border-l-2 border-neon-green/50 pl-5 py-2 bg-paper max-w-prose mb-20">
          <Kicker className="text-neon-green mb-3">Before you decide AI video is cheap for you</Kicker>
          <ul className="space-y-2 text-sm text-ink-secondary leading-relaxed">
            <li className="flex gap-3"><span className="text-neon-green font-mono mt-1 shrink-0">→</span><span>Generate ten takes of one real shot you need and count how many you would publish. That is your keep rate.</span></li>
            <li className="flex gap-3"><span className="text-neon-green font-mono mt-1 shrink-0">→</span><span>Divide the list price per second by that keep rate. That is your real price per second.</span></li>
            <li className="flex gap-3"><span className="text-neon-green font-mono mt-1 shrink-0">→</span><span>If you are on a credit plan, size it to the seconds you actually generate, since Standard and Pro credits on Runway do not roll over.</span></li>
            <li className="flex gap-3"><span className="text-neon-green font-mono mt-1 shrink-0">→</span><span>For finished, narrated videos rather than raw clips, compare tools on cost per finished video in our <Link href="/cheapest-ai-video-generator" className="text-neon-purple hover:underline">cheapest AI video generator guide</Link>.</span></li>
          </ul>
        </section>

        <section className="border-t border-rule/60 pt-10 max-w-reading">
          <Kicker className="mb-3">Keep reading</Kicker>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/cheapest-ai-video-generator" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors">
              <p className="font-mono font-semibold text-ink-primary text-sm">Cheapest AI video generator</p>
              <p className="text-xs text-ink-muted mt-1">Cost per finished video, not sticker price</p>
            </Link>
            <Link href="/graveyard/veo-3-1-preview-shutdown" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors">
              <p className="font-mono font-semibold text-ink-primary text-sm">Veo 3.1 Preview shutdown</p>
              <p className="text-xs text-ink-muted mt-1">October 22, 2026, and what replaces it</p>
            </Link>
            <Link href="/billing-pattern-watch" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors">
              <p className="font-mono font-semibold text-ink-primary text-sm">Billing pattern watch</p>
              <p className="text-xs text-ink-muted mt-1">Vendors with documented billing issues</p>
            </Link>
          </div>
        </section>
        <StudioCtaBanner />
      </WidePageShell>
    </>
  );
}
