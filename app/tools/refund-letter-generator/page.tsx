'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';

type Provider = 'runway' | 'luma' | 'kling' | 'veo' | 'pika' | 'hailuo' | 'seedance' | 'sora' | 'vidu';
type FailureMode =
  | 'anatomy-hand'
  | 'anatomy-limb'
  | 'color-drift'
  | 'identity-coherence'
  | 'lip-sync'
  | 'camera-jitter'
  | 'physics-collapse'
  | 'text-rendering'
  | 'watermark-bleed'
  | 'temporal-flicker';

const PROVIDER_LABELS: Record<Provider, string> = {
  runway: 'Runway',
  luma: 'Luma Dream Machine',
  kling: 'Kling AI',
  veo: 'Google Veo',
  pika: 'Pika Labs',
  hailuo: 'Hailuo (MiniMax)',
  seedance: 'ByteDance Seedance',
  sora: 'OpenAI Sora 2 (app shut down April 26, 2026; API winds down September 2026)',
  vidu: 'Vidu (ShengShu)',
};

const PROVIDER_SUPPORT_PATH: Record<Provider, string> = {
  runway: 'In-app AI Assistant (Pro+) at app.runwayml.com, or Discord #community-help with @On Call - Moderators (Free/Standard)',
  luma: 'Luma Labs billing support at https://lumalabs.ai/support',
  kling: 'Kling support via the in-app help widget or kling.com billing',
  veo: 'Google AI Studio billing support at https://aistudio.google.com',
  pika: 'Pika Labs support via pika.art/help',
  hailuo: 'MiniMax / Hailuo support at hailuoai.com/support',
  seedance: 'ByteDance Seedance support via the in-app help center',
  sora: 'OpenAI billing support at https://help.openai.com — file before the September 2026 API shutdown',
  vidu: 'ShengShu / Vidu support via the in-app help widget at vidu.com or hello@vidu.com',
};

const FAILURE_LABELS: Record<FailureMode, string> = {
  'anatomy-hand': 'Hand-Anatomy Topology Failure (wrong finger count, fused knuckles)',
  'anatomy-limb': 'Anatomical Topology Failure (extra limbs, impossible joints)',
  'color-drift': 'Temporal Color Coherence Failure (hue shift across frames)',
  'identity-coherence': 'Identity Coherence Failure (face morphs / drifts)',
  'lip-sync': 'Audio-Visual Lip Sync & Phoneme Alignment Failure',
  'camera-jitter': 'Camera Path Coherence Failure (unwanted jitter on locked-off prompt)',
  'physics-collapse': 'Physics Simulation Constraint Violation (fluid inversion, gravity violation)',
  'text-rendering': 'Text Rendering Failure (garbled letters in frame)',
  'watermark-bleed': 'Watermark Bleed Failure (visible brand overlay on paid output)',
  'temporal-flicker': 'Temporal Flicker (sub-pixel intensity drift on stable subjects)',
};

const FAILURE_TECHNICAL_NAME: Record<FailureMode, string> = {
  'anatomy-hand': 'Hand-Anatomy Topology Failure',
  'anatomy-limb': 'Anatomical Topology Failure',
  'color-drift': 'Temporal Color Coherence Failure',
  'identity-coherence': 'Identity Coherence Failure',
  'lip-sync': 'Audio-Visual Lip Sync & Phoneme Alignment Failure',
  'camera-jitter': 'Camera Path Coherence Failure',
  'physics-collapse': 'Physics Simulation Constraint Violation',
  'text-rendering': 'Text Rendering Failure',
  'watermark-bleed': 'Watermark Bleed Failure',
  'temporal-flicker': 'Temporal Flicker',
};

const FAILURE_DESCRIPTION: Record<FailureMode, string> = {
  'anatomy-hand': 'The generated clip shows physically impossible hand geometry — wrong finger count, fused knuckles, or thumb pointing in non-anatomical directions. This is a documented critical failure mode for diffusion video models where hand topology is statistically under-represented in training data.',
  'anatomy-limb': 'The generated clip shows physically impossible limb geometry — extra arms or legs, fused joints, or limbs passing through other geometry. This is a documented critical failure mode for diffusion video models.',
  'color-drift': 'The same surface in the generated clip drifts hue significantly across frames — a documented temporal coherence failure where the model fails to constrain frame-to-frame color consistency.',
  'identity-coherence': 'The subject\'s facial structure morphs visibly across frames within the same clip — a documented identity coherence failure where the model fails to maintain a stable subject across the temporal axis.',
  'lip-sync': 'The mouth motion in the generated clip does not match the audio track — a documented audio-visual alignment failure where viseme-to-phoneme mapping is statistical rather than ground-truth aligned.',
  'camera-jitter': 'The generated clip shows unwanted camera shake or jitter despite the prompt specifying a static, locked-off, or tripod camera — a documented camera-conditioning failure where the model defaults to handheld motion patterns from training data.',
  'physics-collapse': 'The generated clip violates fundamental Newtonian physics — fluid flowing in impossible directions, gravity reversal, or collision failures — a documented physics simulation constraint violation.',
  'text-rendering': 'On-screen text in the generated clip is garbled or illegible past ~6 characters — a documented text rendering failure where letters are encoded as visual texture rather than character tokens.',
  'watermark-bleed': 'The paid-tier output contains a visible watermark or brand overlay — a documented refund-eligible failure where the model output is legally unusable for commercial purposes.',
  'temporal-flicker': 'The generated clip exhibits sub-pixel intensity flickering on stable subjects — a documented denoising-schedule artifact where early-step noise variance does not decay smoothly across frames.',
};

export default function RefundLetterGeneratorPage() {
  const [provider, setProvider] = useState<Provider>('runway');
  const [failureMode, setFailureMode] = useState<FailureMode>('anatomy-hand');
  const [generationId, setGenerationId] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [accountEmail, setAccountEmail] = useState('');
  const [creditCost, setCreditCost] = useState('');
  const [copied, setCopied] = useState(false);

  const letter = useMemo(() => {
    const technicalName = FAILURE_TECHNICAL_NAME[failureMode];
    const providerName = PROVIDER_LABELS[provider].split(' (')[0]; // strip parenthetical
    const description = FAILURE_DESCRIPTION[failureMode];

    const subject = `Refund request — ${technicalName} — Generation ID ${generationId || '[INSERT_ID]'}`;

    const body = `Hello ${providerName} Support,

I am requesting a credit refund for a generation that exhibits a documented ${technicalName}.

Account email: ${accountEmail || '[INSERT_YOUR_ACCOUNT_EMAIL]'}
Generation ID: ${generationId || '[INSERT_GENERATION_ID]'}
${timestamp ? `Failure first visible at: ${timestamp}` : 'Failure timestamp: [INSERT_TIMESTAMP, e.g., "0:02" or "1.5s"]'}
${creditCost ? `Credit cost of this generation: $${creditCost}` : ''}

Failure category: ${technicalName}

Description:
${description}

I have attached a timestamped screenshot showing the failure point. Per ${providerName}'s published refund policy for documented failure modes, I am requesting credit reinstatement for this generation.

Thank you for your time.

Best regards,
[YOUR NAME]`;

    return { subject, body };
  }, [provider, failureMode, generationId, timestamp, accountEmail, creditCost]);

  const fullLetter = `Subject: ${letter.subject}\n\n${letter.body}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard might be blocked in some contexts; ignore
    }
  };

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">

        <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-ink-secondary transition-colors">Tools</Link>
          <span className="mx-2">/</span>
          <span className="text-ink-primary">Refund Letter Generator</span>
        </nav>

        <div className="mb-10">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
            Free tool · No signup
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-ink-primary mb-4 leading-tight">
            AI Video Refund Letter Generator
          </h1>
          <p className="text-ink-secondary leading-relaxed">
            Generate a copy-paste-ready refund letter using the technical failure-mode names
            provider support teams recognise. Hit rate is ~75-85% on these refunds when the technical
            name is used — way higher than colloquial descriptions like &ldquo;weird fingers&rdquo;.
          </p>
        </div>

        {/* Inputs */}
        <div className="bg-elevated border border-border rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-ink-primary mb-5">Generation details</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="provider" className="text-sm font-mono text-ink-muted uppercase tracking-wider mb-2 block">
                Provider
              </label>
              <select
                id="provider"
                value={provider}
                onChange={(e) => setProvider(e.target.value as Provider)}
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-ink-primary"
              >
                {(Object.keys(PROVIDER_LABELS) as Provider[]).map((p) => (
                  <option key={p} value={p}>{PROVIDER_LABELS[p]}</option>
                ))}
              </select>
              <p className="text-xs text-ink-muted mt-1">{PROVIDER_SUPPORT_PATH[provider]}</p>
            </div>

            <div>
              <label htmlFor="failure" className="text-sm font-mono text-ink-muted uppercase tracking-wider mb-2 block">
                Failure mode
              </label>
              <select
                id="failure"
                value={failureMode}
                onChange={(e) => setFailureMode(e.target.value as FailureMode)}
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-ink-primary"
              >
                {(Object.keys(FAILURE_LABELS) as FailureMode[]).map((f) => (
                  <option key={f} value={f}>{FAILURE_LABELS[f]}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="genid" className="text-sm font-mono text-ink-muted uppercase tracking-wider mb-2 block">
                  Generation ID
                </label>
                <input
                  id="genid"
                  type="text"
                  placeholder="abc123def456"
                  value={generationId}
                  onChange={(e) => setGenerationId(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-ink-primary font-mono"
                />
              </div>
              <div>
                <label htmlFor="ts" className="text-sm font-mono text-ink-muted uppercase tracking-wider mb-2 block">
                  Failure timestamp
                </label>
                <input
                  id="ts"
                  type="text"
                  placeholder="0:02 or 1.5s"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-ink-primary font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="text-sm font-mono text-ink-muted uppercase tracking-wider mb-2 block">
                  Account email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={accountEmail}
                  onChange={(e) => setAccountEmail(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-ink-primary"
                />
              </div>
              <div>
                <label htmlFor="cost" className="text-sm font-mono text-ink-muted uppercase tracking-wider mb-2 block">
                  Credit cost (USD, optional)
                </label>
                <input
                  id="cost"
                  type="text"
                  placeholder="0.25"
                  value={creditCost}
                  onChange={(e) => setCreditCost(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-ink-primary font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="bg-elevated border border-border rounded-2xl p-6 mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-ink-primary">Your refund letter</h2>
            <button
              onClick={handleCopy}
              className="text-xs font-mono font-bold tracking-widest text-neon-green hover:text-neon-green/80 uppercase"
            >
              {copied ? '✓ Copied' : 'Copy to clipboard'}
            </button>
          </div>
          <pre className="bg-surface border border-border rounded-lg p-4 text-sm text-ink-secondary font-mono whitespace-pre-wrap leading-relaxed">{fullLetter}</pre>
        </div>

        {/* Lead capture */}
        <div className="mb-10">
          <LeadCaptureForm
            source="refund-letter-generator"
            metadata={{ provider, failureMode }}
            heading="Get a launch-day discount + the auto-drafter when AVA Pro is live"
            blurb="This generator is the manual version. AVA Pro drafts these for every failed generation automatically — Generation ID + technical name + timestamp + screenshot all pre-filled. Drop your email for a 30% lifetime discount on launch day."
          />
        </div>

        {/* CTA */}
        <div className="bg-surface border border-neon-green/20 rounded-2xl p-8 text-center mb-12">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
            One letter per failure is fine. Doing this for every gen gets old fast.
          </p>
          <h2 className="text-2xl font-bold text-ink-primary mb-3">
            AVA drafts these automatically — every generation, every failure mode
          </h2>
          <p className="text-ink-secondary text-sm mb-6 max-w-md mx-auto">
            Free Chrome extension audits each generation, identifies the failure category, and pre-fills
            the letter with Generation ID + timestamp + technical name. Click send.
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
              Calculator: see your potential savings
            </Link>
          </div>
        </div>

        {/* Tips */}
        <section className="bg-elevated border border-border rounded-2xl p-8 text-sm">
          <h2 className="text-lg font-bold text-ink-primary mb-3">Tips for higher approval rate</h2>
          <ul className="space-y-3 text-ink-secondary leading-relaxed">
            <li>
              <strong className="text-ink-primary">Use the technical name in the subject line.</strong>{' '}
              Support teams have internal routing on these exact phrases. &ldquo;Refund — Hand-Anatomy
              Topology Failure&rdquo; routes faster than &ldquo;Refund — broken video&rdquo;.
            </li>
            <li>
              <strong className="text-ink-primary">Always include the Generation ID.</strong> Without it,
              support cannot verify the generation on their end. Find it in the URL or share link.
            </li>
            <li>
              <strong className="text-ink-primary">Attach a timestamped screenshot.</strong> Visual
              evidence shortcuts the back-and-forth. The screenshot doesn&apos;t need to be edited —
              just clear and at the failure timestamp.
            </li>
            <li>
              <strong className="text-ink-primary">Be polite and brief.</strong> Long emotional complaints
              get deprioritised. The pattern that works is: factual claim, technical name, generation ID,
              timestamp, evidence. One paragraph each.
            </li>
            <li>
              <strong className="text-ink-primary">Batch refunds if you have many.</strong> One ticket
              with 10 Generation IDs is faster for support than 10 separate tickets. Use this when
              filing end-of-month batches.
            </li>
            <li>
              <strong className="text-ink-primary">Don&apos;t escalate immediately on rejection.</strong>{' '}
              First reply might be a template. Reply with the technical name + a clearer evidence
              package and the second response is usually the human-reviewed decision.
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
