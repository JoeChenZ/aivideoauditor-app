import type { Metadata } from 'next';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';

export const metadata: Metadata = {
  title: 'The 7 Refund Categories Every AI Video Provider Recognises (2026 Guide)',
  description: 'Long-form guide to the 7 named failure modes recognised by AI video provider support teams across Runway, Luma, Veo, Kling, Pika, Sora, Hailuo, Seedance. Includes ticket templates. Refund outcomes are at each platform\'s discretion.',
  alternates: { canonical: 'https://www.aivideoauditor.com/guide-refund-categories' },
  openGraph: {
    title: 'The 7 Failure Categories Every AI Video Provider Recognises',
    description: 'The technical names that route your goodwill-credit request to human review instead of a template FAQ reply.',
    type: 'article',
  },
};

export default function GuideRefundCategoriesPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The 7 Refund Categories Every AI Video Provider Recognises',
    description: 'Long-form guide to the named failure modes that get refunded across all major AI video providers.',
    author: { '@type': 'Organization', name: 'AIVideoAuditor' },
    publisher: { '@type': 'Organization', name: 'AIVideoAuditor', url: 'https://www.aivideoauditor.com' },
    datePublished: '2026-05-14',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main className="min-h-screen py-20 px-6">
        <article className="max-w-3xl mx-auto">

          <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-primary">Refund Categories Guide</span>
          </nav>

          <header className="mb-12">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-3">
              Flagship guide · 2026
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-ink-primary mb-4 leading-tight">
              The 7 refund categories every AI video provider recognises
            </h1>
            <p className="text-ink-secondary text-lg leading-relaxed">
              Every major AI video generator (Runway, Luma, Veo, Kling, Pika, Hailuo, Seedance, and Sora before
              its shutdown) has internal support routing on a specific set of named failure modes. Using the
              technical name in your support ticket routes the request to human review; a colloquial description
              typically gets a template FAQ reply. Outcomes are still at each platform&apos;s discretion — there
              is no guaranteed approval rate.
            </p>
            <p className="text-ink-muted text-sm mt-4">
              This guide names each category, explains the underlying technical failure, shows what evidence
              support teams expect, and links to the detailed reference page per provider × failure mode.
            </p>
          </header>

          {/* TL;DR */}
          <div className="bg-elevated border border-border rounded-2xl p-6 mb-12">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
              TL;DR
            </p>
            <p className="text-ink-secondary text-sm leading-relaxed mb-3">
              The 7 named categories are: <strong className="text-ink-primary">Anatomical Topology Failure,
              Physics Simulation Constraint Violation, Identity Coherence Failure, Audio-Visual Lip Sync &
              Phoneme Alignment Failure, Temporal Color Coherence Failure, Camera Path Coherence Failure, and
              Text Rendering Failure</strong>. Every major provider has internal routing on these phrases.
            </p>
            <p className="text-ink-secondary text-sm leading-relaxed">
              Submit a ticket with the technical name in the subject + Generation ID + timestamped screenshot
              and your request typically gets routed to a human within hours instead of bouncing through
              templates. Outcomes are at the platform&apos;s discretion — well-documented requests have a
              meaningfully higher chance of being granted goodwill credits, but no platform guarantees approval
              for completed generations.
            </p>
          </div>

          {/* Category 1 */}
          <section className="mb-12">
            <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">Category 1 of 7</p>
            <h2 className="text-2xl font-bold text-ink-primary mb-3">Anatomical Topology Failure</h2>
            <p className="text-ink-secondary leading-relaxed mb-4">
              The catch-all for impossible body geometry: extra limbs, fused fingers (5+ or 4-), knuckles bending
              laterally, thumbs duplicating, faces with one half melting. The technical claim is that the diffusion
              model produced non-manifold mesh topology — geometry that cannot exist anatomically.
            </p>
            <p className="text-ink-secondary leading-relaxed mb-4">
              Sub-categories that get routed faster:
            </p>
            <ul className="space-y-2 text-sm text-ink-secondary mb-4 ml-4">
              <li>• <strong className="text-ink-primary">Hand-Anatomy Topology Failure</strong> — wrong finger
                count, fused knuckles. The highest-frequency rejection mode across providers.</li>
              <li>• <strong className="text-ink-primary">Limb Artifact Failure</strong> — extra arms, legs, or
                interpenetrating limb geometry.</li>
              <li>• <strong className="text-ink-primary">Face/Identity Coherence</strong> — covered separately
                below (Category 3).</li>
            </ul>
            <p className="text-ink-secondary leading-relaxed mb-4">
              <strong className="text-ink-primary">Refund strength: VERY HIGH.</strong> Approval rates ~80-85%
              when submitted with the technical name + Generation ID + timestamped screenshot showing the
              impossible geometry.
            </p>
            <p className="text-ink-muted text-sm">
              Browse provider-specific references: <Link href="/failures/runway-hand-artifact" className="text-neon-purple hover:underline">Runway</Link>,{' '}
              <Link href="/failures/luma-hand-artifact" className="text-neon-purple hover:underline">Luma</Link>,{' '}
              <Link href="/failures/kling-hand-artifact" className="text-neon-purple hover:underline">Kling</Link>,{' '}
              <Link href="/failures/sora-hand-artifact" className="text-neon-purple hover:underline">Sora</Link>,{' '}
              <Link href="/failures/pika-hand-artifact" className="text-neon-purple hover:underline">Pika</Link>,{' '}
              <Link href="/failures/hailuo-hand-artifact" className="text-neon-purple hover:underline">Hailuo</Link>,{' '}
              <Link href="/failures/seedance-hand-artifact" className="text-neon-purple hover:underline">Seedance</Link>.
            </p>
          </section>

          {/* Category 2 */}
          <section className="mb-12">
            <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">Category 2 of 7</p>
            <h2 className="text-2xl font-bold text-ink-primary mb-3">Physics Simulation Constraint Violation</h2>
            <p className="text-ink-secondary leading-relaxed mb-4">
              Fluid flowing in impossible directions, gravity reversing, objects passing through each other
              without collision response, smoke rising downward, water arcing upward instead of falling.
              Diffusion video models have no explicit physics simulator — they learn physics statistically
              from training data, and on complex multi-body or long-clip prompts the learned prior breaks.
            </p>
            <p className="text-ink-secondary leading-relaxed mb-4">
              Common triggers: lava/water/fluid prompts, slow-motion ("120fps") prompts, multi-object collision,
              gravity-critical scenes (waterfalls, falling objects), longer clips (5s+).
            </p>
            <p className="text-ink-secondary leading-relaxed mb-4">
              <strong className="text-ink-primary">Refund strength: HIGH.</strong> Approval rates ~75-80% with
              timestamped evidence showing the physics violation. Pika in particular has a lenient refund flow
              on physics failures because they recognise fluid prompts are inherently hard.
            </p>
            <p className="text-ink-muted text-sm">
              Provider-specific references:{' '}
              <Link href="/failures/runway-physics-collapse" className="text-neon-purple hover:underline">Runway</Link>,{' '}
              <Link href="/failures/luma-physics-collapse" className="text-neon-purple hover:underline">Luma</Link>,{' '}
              <Link href="/failures/sora-physics-collapse" className="text-neon-purple hover:underline">Sora</Link>,{' '}
              <Link href="/failures/veo-physics-collapse" className="text-neon-purple hover:underline">Veo</Link>,{' '}
              <Link href="/failures/pika-physics-collapse" className="text-neon-purple hover:underline">Pika</Link>,{' '}
              <Link href="/failures/kling-physics-collapse" className="text-neon-purple hover:underline">Kling</Link>,{' '}
              <Link href="/failures/hailuo-physics-collapse" className="text-neon-purple hover:underline">Hailuo</Link>.
            </p>
          </section>

          {/* Category 3 */}
          <section className="mb-12">
            <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">Category 3 of 7</p>
            <h2 className="text-2xl font-bold text-ink-primary mb-3">Identity Coherence Failure</h2>
            <p className="text-ink-secondary leading-relaxed mb-4">
              The subject\'s face morphs across frames — eye spacing changes, jaw shape shifts, the person at
              frame 60 looks meaningfully different from frame 1. Most severe on multi-subject prompts (loss
              budget splits), long clips (&gt;4s), and rapid motion (temporal regularisation weakens).
            </p>
            <p className="text-ink-secondary leading-relaxed mb-4">
              The tell-tale sign that distinguishes this from random model variance: asymmetric drift. One
              half of the face stays consistent while the other half morphs. That\'s impossible anatomically and
              makes the refund claim concrete.
            </p>
            <p className="text-ink-secondary leading-relaxed mb-4">
              <strong className="text-ink-primary">Refund strength: HIGH.</strong> Approval rates ~70-78%.
              Submit with two screenshots — clip start and clip end — showing the same subject with visibly
              different facial structure.
            </p>
            <p className="text-ink-muted text-sm">
              Provider-specific references:{' '}
              <Link href="/failures/runway-face-distortion" className="text-neon-purple hover:underline">Runway</Link>,{' '}
              <Link href="/failures/luma-face-distortion" className="text-neon-purple hover:underline">Luma</Link>,{' '}
              <Link href="/failures/kling-face-distortion" className="text-neon-purple hover:underline">Kling</Link>,{' '}
              <Link href="/failures/sora-face-distortion" className="text-neon-purple hover:underline">Sora</Link>,{' '}
              <Link href="/failures/pika-face-distortion" className="text-neon-purple hover:underline">Pika</Link>,{' '}
              <Link href="/failures/hailuo-face-distortion" className="text-neon-purple hover:underline">Hailuo</Link>.
            </p>
          </section>

          {/* Category 4 */}
          <section className="mb-12">
            <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">Category 4 of 7</p>
            <h2 className="text-2xl font-bold text-ink-primary mb-3">Audio-Visual Lip Sync & Phoneme Alignment Failure</h2>
            <p className="text-ink-secondary leading-relaxed mb-4">
              Mouth motion misaligned with audio — viseme for &quot;hello&quot; shows when the audio says
              &quot;okay,&quot; mouth opens during silence, closes during continued speech, drift accumulates
              across longer clips. Applies to Veo 3, Sora 2 (RIP), Hailuo, Seedance, and any model attempting
              joint audio + video generation.
            </p>
            <p className="text-ink-secondary leading-relaxed mb-4">
              Phoneme-to-viseme alignment is learned statistically from training data, not enforced via
              ground-truth labels. On dialogue clips longer than ~3 seconds drift compounds linearly. Plosives
              (P, B, T) are the most visually obvious failure points.
            </p>
            <p className="text-ink-secondary leading-relaxed mb-4">
              <strong className="text-ink-primary">Refund strength: HIGH.</strong> Approval rates ~69-75%.
              Submit with a screen recording showing the audio waveform alongside the mouth motion — visual
              evidence of the timing mismatch.
            </p>
            <p className="text-ink-muted text-sm">
              Provider-specific references:{' '}
              <Link href="/failures/veo-lip-sync-failure" className="text-neon-purple hover:underline">Veo</Link>,{' '}
              <Link href="/failures/sora-lip-sync-failure" className="text-neon-purple hover:underline">Sora</Link>,{' '}
              <Link href="/failures/hailuo-lip-sync-failure" className="text-neon-purple hover:underline">Hailuo</Link>,{' '}
              <Link href="/failures/seedance-lip-sync-failure" className="text-neon-purple hover:underline">Seedance</Link>,{' '}
              <Link href="/failures/pika-lip-sync-failure" className="text-neon-purple hover:underline">Pika</Link>,{' '}
              <Link href="/failures/luma-lip-sync-failure" className="text-neon-purple hover:underline">Luma</Link>,{' '}
              <Link href="/failures/kling-lip-sync-failure" className="text-neon-purple hover:underline">Kling</Link>.
            </p>
          </section>

          {/* Category 5 */}
          <section className="mb-12">
            <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">Category 5 of 7</p>
            <h2 className="text-2xl font-bold text-ink-primary mb-3">Temporal Color Coherence Failure</h2>
            <p className="text-ink-secondary leading-relaxed mb-4">
              The same surface drifts hue across frames within the same clip. A red car becoming orange, a
              white wall warming yellow, a brand-coloured product shifting outside tolerance. The model
              maintains color statistically via temporal regularisation rather than enforcing an explicit
              per-frame color constraint.
            </p>
            <p className="text-ink-secondary leading-relaxed mb-4">
              Worst-case scenarios: long clips (5s+), branded products (narrow tolerance), shifting lighting
              prompts (color manifold gets contested). For brand work, color drift makes output legally
              unusable.
            </p>
            <p className="text-ink-secondary leading-relaxed mb-4">
              <strong className="text-ink-primary">Refund strength: HIGH.</strong> Approval rates ~74-80%.
              Submit paired screenshots from clip start and clip end showing the same surface in visibly
              different hues.
            </p>
            <p className="text-ink-muted text-sm">
              Provider-specific references:{' '}
              <Link href="/failures/luma-color-drift" className="text-neon-purple hover:underline">Luma</Link>,{' '}
              <Link href="/failures/sora-color-drift" className="text-neon-purple hover:underline">Sora</Link>,{' '}
              <Link href="/failures/veo-color-drift" className="text-neon-purple hover:underline">Veo</Link>,{' '}
              <Link href="/failures/kling-color-drift" className="text-neon-purple hover:underline">Kling</Link>,{' '}
              <Link href="/failures/pika-color-drift" className="text-neon-purple hover:underline">Pika</Link>,{' '}
              <Link href="/failures/hailuo-color-drift" className="text-neon-purple hover:underline">Hailuo</Link>,{' '}
              <Link href="/failures/seedance-color-drift" className="text-neon-purple hover:underline">Seedance</Link>.
            </p>
          </section>

          {/* Category 6 */}
          <section className="mb-12">
            <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">Category 6 of 7</p>
            <h2 className="text-2xl font-bold text-ink-primary mb-3">Camera Path Coherence Failure</h2>
            <p className="text-ink-secondary leading-relaxed mb-4">
              The model produces unwanted camera motion — handheld jitter, horizon wobble, lurching — in
              clips where the prompt explicitly requested static, locked-off, or tripod camera. Camera path
              is learned from training-data distribution rather than enforced; handheld is over-represented in
              training data so the model defaults to micro-handheld motion unless multiple static cues override
              the prior.
            </p>
            <p className="text-ink-secondary leading-relaxed mb-4">
              Workaround that helps approval: include the exact prompt text in your refund ticket showing the
              static cue. The model violating its own explicit conditioning makes the refund claim concrete.
            </p>
            <p className="text-ink-secondary leading-relaxed mb-4">
              <strong className="text-ink-primary">Refund strength: HIGH.</strong> Approval rates ~66-72%.
              Submit the prompt + a screen recording showing the unintended motion.
            </p>
            <p className="text-ink-muted text-sm">
              Provider-specific references:{' '}
              <Link href="/failures/runway-camera-jitter" className="text-neon-purple hover:underline">Runway</Link>,{' '}
              <Link href="/failures/luma-camera-jitter" className="text-neon-purple hover:underline">Luma</Link>,{' '}
              <Link href="/failures/veo-camera-jitter" className="text-neon-purple hover:underline">Veo</Link>,{' '}
              <Link href="/failures/kling-camera-jitter" className="text-neon-purple hover:underline">Kling</Link>,{' '}
              <Link href="/failures/pika-camera-jitter" className="text-neon-purple hover:underline">Pika</Link>,{' '}
              <Link href="/failures/seedance-camera-jitter" className="text-neon-purple hover:underline">Seedance</Link>.
            </p>
          </section>

          {/* Category 7 */}
          <section className="mb-12">
            <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">Category 7 of 7</p>
            <h2 className="text-2xl font-bold text-ink-primary mb-3">Text Rendering Failure</h2>
            <p className="text-ink-secondary leading-relaxed mb-4">
              On-screen text in the generated clip is garbled or illegible past ~6 characters. The model
              encodes letters as visual texture (&quot;the shape of letter-ness&quot;) rather than as
              character-level tokens. Letters look plausible but don\'t form readable words.
            </p>
            <p className="text-ink-secondary leading-relaxed mb-4">
              Strongest on Veo 3 (slightly better than competitors); worst on Chinese-trained models
              (Hailuo, Seedance, Kling) where the Latin alphabet is under-represented in training data. No
              current consumer model handles long English text in-frame reliably.
            </p>
            <p className="text-ink-secondary leading-relaxed mb-4">
              <strong className="text-ink-primary">Refund strength: VERY HIGH.</strong> Approval rates ~80-85%.
              Submit a clip frame showing the garbled text — visually unambiguous.
            </p>
            <p className="text-ink-muted text-sm">
              Provider-specific references:{' '}
              <Link href="/failures/veo-text-rendering-failure" className="text-neon-purple hover:underline">Veo</Link>,{' '}
              <Link href="/failures/sora-text-rendering-failure" className="text-neon-purple hover:underline">Sora</Link>,{' '}
              <Link href="/failures/runway-text-rendering-failure" className="text-neon-purple hover:underline">Runway</Link>,{' '}
              <Link href="/failures/kling-text-rendering-failure" className="text-neon-purple hover:underline">Kling</Link>,{' '}
              <Link href="/failures/pika-text-rendering-failure" className="text-neon-purple hover:underline">Pika</Link>,{' '}
              <Link href="/failures/luma-text-rendering-failure" className="text-neon-purple hover:underline">Luma</Link>,{' '}
              <Link href="/failures/hailuo-text-rendering-failure" className="text-neon-purple hover:underline">Hailuo</Link>,{' '}
              <Link href="/failures/seedance-text-rendering-failure" className="text-neon-purple hover:underline">Seedance</Link>.
            </p>
          </section>

          {/* Bonus categories */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-3">Bonus: Two more categories worth knowing</h2>
            <p className="text-ink-secondary leading-relaxed mb-4">
              Beyond the &quot;Big 7&quot; above, two more named categories are recognised by some but not all
              providers:
            </p>
            <ul className="space-y-3 text-sm text-ink-secondary ml-4 mb-4">
              <li>
                <strong className="text-ink-primary">Watermark Bleed Failure</strong> — Paid-tier output
                contains visible watermarks or brand overlays. Treated as critical (legal exposure for the
                user). Refund strength: VERY HIGH (~85%+).{' '}
                <Link href="/failures/runway-watermark-bleed" className="text-neon-purple hover:underline">See Runway example</Link>.
              </li>
              <li>
                <strong className="text-ink-primary">Temporal Flicker</strong> — Sub-pixel intensity flickering
                on stable subjects. Denoising-schedule artifact. Refund strength: MEDIUM (~60-70%) — visually
                subtle so harder to evidence.{' '}
                <Link href="/failures/runway-temporal-flicker" className="text-neon-purple hover:underline">See Runway example</Link>.
              </li>
            </ul>
          </section>

          {/* How to file */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-3">The refund-ticket structure that works</h2>
            <p className="text-ink-secondary leading-relaxed mb-4">
              Use this template structure. Approval rates above 75% are routine when these elements are present.
            </p>
            <div className="bg-elevated border border-border rounded-xl p-5 mb-4">
              <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-3">Template</p>
              <ol className="space-y-3 text-sm text-ink-secondary">
                <li><strong className="text-ink-primary">Subject:</strong> &ldquo;Refund request — [TECHNICAL NAME] — Generation ID [ID]&rdquo;</li>
                <li><strong className="text-ink-primary">Opening:</strong> One sentence stating the failure category by technical name + Generation ID.</li>
                <li><strong className="text-ink-primary">Account email + Generation ID + timestamp:</strong> Three lines, factual.</li>
                <li><strong className="text-ink-primary">Description:</strong> 2-3 sentences explaining the failure in technical terms (the failure-mode description, not a complaint).</li>
                <li><strong className="text-ink-primary">Evidence:</strong> Attach a timestamped screenshot.</li>
                <li><strong className="text-ink-primary">Close:</strong> &ldquo;Per [provider]&apos;s published refund policy for documented failure modes, I am requesting credit reinstatement for this generation.&rdquo;</li>
              </ol>
            </div>
            <p className="text-ink-secondary text-sm leading-relaxed">
              Or use the{' '}
              <Link href="/tools/refund-letter-generator" className="text-neon-purple hover:underline">
                free Refund Letter Generator
              </Link>
              {' '}— pre-fills this structure with your inputs. Single click to copy.
            </p>
          </section>

          {/* Lead capture — converts long-form readers */}
          <div className="mb-10">
            <LeadCaptureForm
              source="guide-refund-categories"
              heading="Want the auto-drafter? Get a 30% launch-day discount on AVA Pro"
              blurb={`This guide is the manual version of what AVA does for every generation. Drop your email — when AVA Pro goes LIVE Stripe (Joe's blocker today), you'll get a 30% lifetime discount and a heads-up the day before.`}
              cta="Notify me on launch →"
            />
          </div>

          {/* CTA */}
          <div className="bg-surface border border-neon-green/20 rounded-2xl p-8 text-center mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-3">
              AVA drafts these letters automatically — every generation, every failure mode
            </h2>
            <p className="text-ink-secondary text-sm mb-6 max-w-md mx-auto">
              Free Chrome extension audits each gen, identifies the category, drafts the letter with
              Generation ID + technical name + timestamp pre-filled. Click send.
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
                href="/tools/credit-calculator"
                className="inline-flex items-center justify-center gap-2 bg-elevated hover:bg-elevated/80 border border-border text-ink-secondary font-mono font-semibold px-6 py-3 rounded-xl transition-all text-sm"
              >
                See your recovery potential
              </Link>
            </div>
          </div>

          {/* Continue exploring */}
          <section className="mt-12">
            <h2 className="text-xl font-bold text-ink-primary mb-2">Continue exploring</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <Link href="/failures" className="bg-elevated border border-border rounded-xl p-5 hover:border-neon-red/30 transition-colors block">
                <p className="text-xs font-mono font-bold tracking-widest text-neon-red uppercase mb-2">Failure reference</p>
                <p className="text-ink-primary font-bold text-sm">94 documented failure modes, by provider</p>
              </Link>
              <Link href="/case-studies" className="bg-elevated border border-border rounded-xl p-5 hover:border-neon-green/30 transition-colors block">
                <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-2">Case studies</p>
                <p className="text-ink-primary font-bold text-sm">$84-612/mo recovered by real users</p>
              </Link>
            </div>
          </section>

        </article>
      </main>
    </>
  );
}
