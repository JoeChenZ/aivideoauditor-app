import type { Metadata } from 'next';
import Link from 'next/link';
import StudioCtaBanner from '@/components/studio-cta-banner';

const PAGE_URL = 'https://www.aivideoauditor.com/veo-vs-runway-vs-kling-for-product-videos';

export const metadata: Metadata = {
  title: 'Veo 3 vs Runway vs Kling for Product Videos (2026)',
  description:
    'Head-to-head for DTC brands: Veo 3 vs Runway Gen-4 vs Kling for product video. Which keeps your product, label, and brand color consistent across frames? Honest, shot-type-first comparison.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Veo 3 vs Runway vs Kling for Product Videos (2026)',
    description:
      'Which AI video model keeps your product consistent — Veo 3, Runway Gen-4, or Kling? A DTC-buyer head-to-head focused on product fidelity, not cinematic quality.',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Veo 3 vs Runway vs Kling for Product Videos (2026)',
  description:
    'A DTC-buyer head-to-head comparing Veo 3, Runway Gen-4, and Kling for product video across product fidelity, brand-color stability, vertical output, speed, cost, turnaround, and native audio.',
  author: { '@type': 'Organization', name: 'AIVideoAuditor' },
  publisher: { '@type': 'Organization', name: 'AIVideoAuditor', url: 'https://www.aivideoauditor.com' },
  datePublished: '2026-08-14',
  dateModified: '2026-08-14',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which AI video tool keeps my product looking consistent across frames?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'None is perfect. Runway Gen-4 Scenes mode holds the most consistency across cuts (roughly 6–8 cuts before visible drift); Kling is strongest on physical-product motion and food; Veo 3 has strong single-shot prompt adherence but caps at ~8 seconds. On any of them, product shape and color can drift on longer clips, so the reliable path is generating short, QC-ing each output, and reshooting the rejects.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Veo 3, Runway, or Kling render my logo or label text?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Not reliably. All three current models garble in-frame text and logos past a few characters — letters morph, kern wrong, or dissolve between frames. This is the single biggest failure mode for product video. The dependable fix is to generate the motion clean and composite the real logo/label back in during post, rather than trusting the model to render it.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does my product video need native audio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Veo 3 is the only one of the three with usable joint audio+video, which is handy for a quick first cut. But most DTC product Reels are scored with licensed music or a voiceover added in edit, so native audio is a nice-to-have, not a deciding factor for product video.',
      },
    },
    {
      '@type': 'Question',
      name: "What's the fastest way to get a usable product video?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Skip the model-picking and prompt-iteration loop. Send one product photo to a done-for-you studio that selects the right model per shot, QCs every generation for drift and text garble, reshoots the rejects, and composites your real label back in. Turnaround is typically 2–3 days with a preview and one revision.',
      },
    },
  ],
};

type Winner = 'VEO' | 'RUNWAY' | 'KLING' | 'TIE';

function WinnerBadge({ winner }: { winner: Winner }) {
  if (winner === 'VEO') return <span className="text-xs font-mono font-bold text-neon-green">Veo 3</span>;
  if (winner === 'RUNWAY') return <span className="text-xs font-mono font-bold text-neon-purple">Runway</span>;
  if (winner === 'KLING') return <span className="text-xs font-mono font-bold text-neon-amber">Kling</span>;
  return <span className="text-xs font-mono font-bold text-ink-muted">Tie</span>;
}

const TABLE: { dimension: string; veo: string; runway: string; kling: string; winner: Winner }[] = [
  {
    dimension: 'Product / label fidelity & consistency',
    veo: 'Strong single-shot adherence; product holds within one 8s clip but no cross-cut identity lock',
    runway: 'Scenes mode holds product across ~6–8 cuts before visible drift — best for multi-cut sequences',
    kling: 'Solid within a clip; physical-product shape holds well on motion, weaker cross-cut',
    winner: 'RUNWAY',
  },
  {
    dimension: 'Brand-color stability',
    veo: 'Good within a clip; slight temporal color drift possible on longer motion',
    runway: 'Competent but exposure-bound; color can shift under changing light',
    kling: 'Reasonable, but hard-surface color less precise than on food/organic subjects',
    winner: 'TIE',
  },
  {
    dimension: '9:16 vertical output',
    veo: 'Native vertical supported; frames well for Reels/TikTok',
    runway: 'Vertical supported; reliable for platform-native cuts',
    kling: 'Vertical supported; strong for motion-led vertical shots',
    winner: 'TIE',
  },
  {
    dimension: 'Generation speed',
    veo: 'Fast per clip, but 8s ceiling means more clips for longer edits',
    runway: 'Moderate per clip',
    kling: 'Fast per clip; among the quicker of the three',
    winner: 'KLING',
  },
  {
    dimension: 'Cost per clip',
    veo: 'Cheapest in the consumer tier per second',
    runway: '~$0.05/sec output',
    kling: 'Variable per region; ~$0.04–0.06/sec',
    winner: 'VEO',
  },
  {
    dimension: 'Ease / turnaround',
    veo: 'Simple prompt-to-clip; short clips mean more stitching for longer stories',
    runway: 'Scenes workflow adds control but more setup',
    kling: 'Straightforward prompt-to-clip; good default for single motion shots',
    winner: 'TIE',
  },
  {
    dimension: 'Native audio',
    veo: 'Only model here with usable joint audio+video',
    runway: 'No native audio — add in post',
    kling: 'No native audio — add in post',
    winner: 'VEO',
  },
];

const BREAKS = [
  'In-frame logos garble past a few characters — letters morph or dissolve between frames',
  'Label text (ingredients, brand name, size) kerns wrong or turns to noise',
  'Exact brand hex color drifts across frames, especially on longer or motion-heavy clips',
  'Product shape morphs subtly — a bottle narrows, a jar lid changes, a chain link collapses',
];

export default function VeoVsRunwayVsKling() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Breadcrumb */}
          <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-primary">Veo 3 vs Runway vs Kling for product videos</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-3">
              Head-to-head · Updated 2026-08-14
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink-primary mb-4 leading-tight tracking-tight">
              Veo 3 <span className="text-ink-muted">vs</span> Runway Gen-4 <span className="text-ink-muted">vs</span> Kling for product videos
            </h1>
            <p className="text-ink-secondary leading-relaxed">
              If you sell a physical product, the thing that breaks in AI video is not &ldquo;cinematic
              quality&rdquo; — it&apos;s <strong>product fidelity</strong>. Your logo garbles, your label text
              turns to noise, your exact brand color drifts, and your product&apos;s shape morphs across
              frames. Generic AI-video benchmarks don&apos;t test for any of that. This is a DTC-buyer
              head-to-head across the axes that actually decide whether a clip is usable on your storefront
              or your Reels.
            </p>
          </div>

          {/* Quick verdict */}
          <div className="mb-10 bg-elevated border border-border rounded-2xl p-6">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-4">
              Quick verdict
            </p>
            <div className="space-y-3 text-sm">
              <p className="text-ink-secondary">
                <span className="text-neon-purple font-bold">Pick Runway Gen-4</span> when you need the same
                product to stay consistent across multiple cuts — its Scenes mode holds identity longest
                (~6–8 cuts before drift).
              </p>
              <p className="text-ink-secondary">
                <span className="text-neon-amber font-bold">Pick Kling</span> when motion is the hero — pours,
                steam, food, a physical product rotating or being handled. Its physics prior is the strongest
                of the three.
              </p>
              <p className="text-ink-secondary">
                <span className="text-neon-green font-bold">Pick Veo 3</span> when you want the cheapest
                per-second cost or a quick first cut with native audio — but plan around the ~8s clip ceiling.
              </p>
              <p className="text-ink-muted text-xs italic pt-2">
                Honest note: on any of the three, in-frame logo/label text and exact brand color are
                unreliable. No current model &ldquo;wins&rdquo; that — see the section below.
              </p>
            </div>
          </div>

          {/* Comparison table */}
          <section className="mb-12" aria-label="Side-by-side comparison">
            <h2 className="text-xl font-bold text-ink-primary mb-4">What a DTC brand actually cares about</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 text-ink-muted font-mono uppercase text-xs tracking-wider">Dimension</th>
                    <th className="text-left py-3 px-3 text-neon-green font-bold">Veo 3</th>
                    <th className="text-left py-3 px-3 text-neon-purple font-bold">Runway Gen-4</th>
                    <th className="text-left py-3 px-3 text-neon-amber font-bold">Kling</th>
                    <th className="text-left py-3 pl-3 text-ink-muted font-mono uppercase text-xs tracking-wider">Edge</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 align-top">
                      <td className="py-3 pr-4 text-ink-primary font-medium">{row.dimension}</td>
                      <td className="py-3 px-3 text-ink-secondary">{row.veo}</td>
                      <td className="py-3 px-3 text-ink-secondary">{row.runway}</td>
                      <td className="py-3 px-3 text-ink-secondary">{row.kling}</td>
                      <td className="py-3 pl-3"><WinnerBadge winner={row.winner} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-ink-muted text-xs italic mt-3">
              Ratings are directional, based on observed failure patterns for product-video shot types — not
              a fixed leaderboard. The right model depends on your specific shot.
            </p>
          </section>

          {/* The thing they all break on */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-ink-primary mb-4">The thing they all break on</h2>
            <div className="bg-neon-red/5 border border-neon-red/20 rounded-xl p-6">
              <p className="text-ink-secondary text-sm leading-relaxed mb-4">
                Here is the honest core message no vendor demo will show you:{' '}
                <strong className="text-ink-primary">in-frame logo/label text and exact brand color are
                unreliable on every current model.</strong>{' '}
                Veo 3, Runway Gen-4, and Kling all fall down in the same places when a real product is on screen:
              </p>
              <ul className="space-y-2 text-sm text-ink-secondary">
                {BREAKS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-neon-red mt-0.5 shrink-0">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-ink-secondary text-sm leading-relaxed mt-4">
                That is why picking &ldquo;the best model&rdquo; only gets you halfway. The reliable workflow
                is to generate motion clean, keep clips short, QC every output for drift and garble, reshoot
                the rejects, and composite your real logo and label back in during post. We document these
                patterns in the{' '}
                <Link href="/best-ai-model-for-product-videos" className="text-neon-amber hover:underline">
                  category-by-category model breakdown
                </Link>{' '}
                and on the{' '}
                <Link href="/wall" className="text-neon-amber hover:underline">
                  wall of real failures
                </Link>.
              </p>
            </div>
          </section>

          {/* Proof / internal links */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-ink-primary mb-4">See it for yourself</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/prompts/kling-chef-plating" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-amber/30 transition-colors">
                <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-1">Prompt teardown</p>
                <p className="font-mono font-bold text-ink-primary text-sm mb-1">Kling chef-plating shot</p>
                <p className="text-xs text-ink-muted">How Kling handles food motion, frame by frame.</p>
              </Link>
              <Link href="/compare/kling-vs-veo" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors">
                <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-1">Deep dive</p>
                <p className="font-mono font-bold text-ink-primary text-sm mb-1">Kling vs Veo — full head-to-head</p>
                <p className="text-xs text-ink-muted">Every dimension, not just product video.</p>
              </Link>
              <Link href="/product-videos/food-beverage" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-green/30 transition-colors">
                <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-1">By vertical</p>
                <p className="font-mono font-bold text-ink-primary text-sm mb-1">Food &amp; beverage product video</p>
                <p className="text-xs text-ink-muted">Shot types and pitfalls for F&amp;B brands.</p>
              </Link>
              <Link href="/wall" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-red/30 transition-colors">
                <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-1">Proof</p>
                <p className="font-mono font-bold text-ink-primary text-sm mb-1">The failure wall</p>
                <p className="text-xs text-ink-muted">Real generations that garbled text and drifted.</p>
              </Link>
            </div>
          </section>

          {/* Skip-the-fight CTA → /order */}
          <div className="border border-blue-500/30 rounded-xl p-8 text-center bg-blue-500/5">
            <p className="text-xs font-mono font-bold tracking-widest text-blue-300 uppercase mb-3">
              The skip-the-fight option
            </p>
            <h2 className="text-2xl font-bold text-ink-primary mb-3">
              Don&apos;t pick a model. We produce the video for you.
            </h2>
            <p className="text-ink-secondary text-sm mb-6 max-w-md mx-auto">
              Send one product photo. We select the right model per shot, QC every generation for drift and
              text garble, reshoot the rejects, and composite your real label back in. 2–3 day turnaround,
              preview and one revision.
            </p>
            <Link
              href="/order"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              Order a Video — from $59
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-ink-muted text-sm mt-4">
              or <Link href="/pricing" className="text-blue-400 hover:text-blue-300 transition-colors">compare packages</Link> · we handle model selection and QC so you don&apos;t
            </p>
          </div>

          <StudioCtaBanner />
        </div>
      </main>
    </>
  );
}
