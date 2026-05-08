import Link from 'next/link';
import InteractiveAuditor from '@/components/interactive-auditor';

const CHROME_EXT_URL = 'https://chromewebstore.google.com/detail/aivideoauditor/dnehhjbgpfjdihfigahimmpgnemplljn';

/* ── Wall of Shame — Runway-specific failures ─────────────────────────── */
const SHAME_CARDS = [
  {
    platform: 'RUNWAY GEN-4',
    title: 'The Melting Sign',
    prompt: '"Street corner at night, neon sign reading OPEN, cinematic"',
    findings: [
      'Text fully illegible: "OPΞИ" rendered',
      'Neon bleed artifact across all letters',
      'L1 flag: text in frame = high warp risk',
    ],
    cost: '$0.70',
    color: 'from-cyan-900/40 to-teal-900/20',
    glitch: 'cyan',
  },
  {
    platform: 'RUNWAY GEN-4',
    title: 'The Six-Fingered Pianist',
    prompt: '"Close-up of hands playing piano, dramatic lighting"',
    findings: [
      'Finger-count hallucination: 6 fingers detected',
      'Knuckle geometry collapsed at 0:03',
      'L1 flag: hands + closeup = limb artifact risk',
    ],
    cost: '$1.40',
    color: 'from-violet-900/40 to-purple-900/20',
    glitch: 'purple',
  },
  {
    platform: 'RUNWAY GEN-4',
    title: 'Physics Collapse at 0:04',
    prompt: '"Water fountain exploding upward, slow motion, 120fps"',
    findings: [
      'Fluid inversion at 0:04 — water falls upward',
      'Frame-rate mismatch: 120fps prompt on Gen-4',
      'L1 flag: slow-motion + complex fluid = collapse risk',
    ],
    cost: '$2.10',
    color: 'from-red-900/40 to-orange-900/20',
    glitch: 'red',
  },
];

/* ── Feature highlights ───────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: '🛡️',
    title: 'Pre-Flight Risk Check',
    body: 'Before you hit Generate, the L1 engine scans your prompt for known Runway failure patterns — fingers, text, physics, motion — instantly, with zero API calls.',
    accent: 'border-neon-purple/30 hover:border-neon-purple/60',
    label: 'text-neon-purple',
  },
  {
    icon: '⚑',
    title: 'Mark Anomaly Frames',
    body: 'Hover the failed video and click ⚑ to tag the broken frames by type — limb artifact, physics collapse, face distortion, and more. Your marks become the evidence in the refund email.',
    accent: 'border-neon-red/30 hover:border-neon-red/60',
    label: 'text-neon-red',
  },
  {
    icon: '📧',
    title: 'One-Click Refund Email',
    body: 'Auto-generates a Runway support email with your generation ID, L1 failure flags, marked frame evidence, and credit cost — pre-filled and ready to send in seconds.',
    accent: 'border-neon-green/30 hover:border-neon-green/60',
    label: 'text-neon-green',
  },
  {
    icon: '📁',
    title: 'Diagnosis History',
    body: 'Every analysis is saved to your account. Track patterns across your projects, see which prompts fail most, and build a record for recurring refund claims.',
    accent: 'border-neon-blue/30 hover:border-neon-blue/60',
    label: 'text-neon-blue',
  },
];

/* ── Trust points ─────────────────────────────────────────────────────── */
const TRUST = [
  {
    icon: '🔒',
    title: 'Encrypted at rest.',
    body: 'Your session token is encrypted with AES-GCM before being stored — only your browser can read it. No plaintext credentials ever touch local storage.',
  },
  {
    icon: '👁️',
    title: 'PII-free analysis.',
    body: 'Names, emails, and URLs are stripped from your prompt before any analysis is sent. The engine only sees the risk pattern.',
  },
  {
    icon: '⚡',
    title: 'Instant L1 checks.',
    body: 'Heuristic rules fire in-browser with zero latency. No network call, no wait — the warning appears as you type.',
  },
  {
    icon: '🛡️',
    title: 'Open to audit.',
    body: 'The extension source is readable. No obfuscation. What you install is exactly what you see.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-void bg-grid-pattern bg-grid pt-28 pb-20 px-6 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
          }}
        />
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-neon-purple/5 blur-3xl" />
        <div className="pointer-events-none absolute top-20 right-0 w-[300px] h-[300px] rounded-full bg-neon-red/5 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs font-mono font-bold px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            Built for Runway · Free Chrome Extension
          </div>

          <h1 className="font-mono text-5xl md:text-6xl font-bold text-ink-primary mb-6 leading-tight">
            Runway Ate Your Credits.<br />
            <span className="text-neon-red line-through decoration-2">Again.</span>{' '}
            <span className="text-neon-amber">We Fix That.</span>
          </h1>

          <p className="text-ink-secondary text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
            AVA is the free Chrome extension that{' '}
            <em className="text-ink-primary not-italic font-semibold">flags bad prompts before you generate</em>,
            lets you mark exactly what broke after generation, and drafts your refund email in one click.
          </p>

          <p className="text-ink-muted text-sm font-mono mb-10">
            Pre-flight risk check · Mark anomaly frames · One-click refund email · Sign in to unlock
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={CHROME_EXT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-mono font-bold px-8 py-3.5 rounded-xl transition-all text-base"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Add to Chrome — It&apos;s Free
            </a>
            <Link
              href="/login?redirectTo=/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-neon-purple/10 hover:bg-neon-purple/20 border border-neon-purple/30 text-neon-purple font-mono font-semibold px-8 py-3.5 rounded-xl transition-all text-sm"
            >
              Sign In &amp; Track Diagnoses →
            </Link>
          </div>

          <p className="mt-5 text-ink-muted text-xs font-mono">
            No credit card · Works on Chrome · Brave · Edge · Arc
          </p>
        </div>
      </section>

      {/* ── CREDIT LOSS BANNER ────────────────────────────────────────────── */}
      <section className="bg-neon-red/5 border-y border-neon-red/20 py-8 px-6 overflow-x-hidden">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-mono font-bold text-neon-red">$0.70–$5</span>
            <span className="text-sm text-ink-muted font-mono">per failed<br/>Runway generation</span>
          </div>
          <div className="w-px h-8 bg-border hidden sm:block" />
          <div className="flex items-center gap-3">
            <span className="text-3xl font-mono font-bold text-neon-amber">3–8×</span>
            <span className="text-sm text-ink-muted font-mono">avg retries<br/>before giving up</span>
          </div>
          <div className="w-px h-8 bg-border hidden sm:block" />
          <div className="flex items-center gap-3">
            <span className="text-3xl font-mono font-bold text-neon-green">$0</span>
            <span className="text-sm text-ink-muted font-mono">cost to install<br/>AVA and stop it</span>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section className="bg-surface py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-3">
              What AVA Does
            </p>
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-ink-primary mb-4">
              Catch it. Diagnose it. Claim it back.
            </h2>
            <p className="text-ink-secondary max-w-xl mx-auto">
              From risky prompt to refund email — handled inside the extension while you&apos;re on Runway.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className={`bg-elevated border rounded-2xl p-5 transition-colors ${f.accent}`}>
                <div className="text-2xl mb-3">{f.icon}</div>
                <p className={`text-xs font-mono font-bold tracking-wider uppercase mb-2 ${f.label}`}>{f.title}</p>
                <p className="text-ink-muted text-xs leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARK & REFUND CTA ─────────────────────────────────────────────── */}
      <section className="bg-void py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-surface border border-neon-purple/20 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent" />
            <div className="relative z-10">
              <div className="text-3xl mb-4">⚑</div>
              <h2 className="font-mono text-2xl md:text-3xl font-bold text-ink-primary mb-3">
                Don&apos;t let that credit go to waste.
              </h2>
              <p className="text-ink-secondary mb-3 leading-relaxed max-w-xl mx-auto">
                Sign in, mark the broken frames by failure type, and let AVA{' '}
                <strong className="text-neon-purple">auto-generate your refund email</strong> — pre-filled with your generation ID, L1 failure flags, and marked evidence.
              </p>
              <p className="text-ink-muted text-sm font-mono mb-8">
                📁 Every refund request is saved to your account history.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/login?redirectTo=/auth/extension-callback"
                  className="inline-flex items-center justify-center gap-2 bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple/40 text-neon-purple font-mono font-bold px-8 py-3 rounded-xl transition-all"
                >
                  Sign In &amp; Start Claiming →
                </Link>
                <a
                  href={CHROME_EXT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-elevated hover:bg-elevated/80 border border-border text-ink-secondary font-mono text-sm px-8 py-3 rounded-xl transition-all"
                >
                  Install Extension First ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLAYGROUND ────────────────────────────────────────────────────── */}
      <section id="playground" className="bg-surface py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-3">
              Interactive L1 Engine
            </p>
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-ink-primary mb-4">
              Test Your Runway Prompt.
            </h2>
            <p className="text-ink-secondary max-w-xl mx-auto">
              Paste what you&apos;re about to send to Runway. The same heuristic engine
              that runs inside the extension checks it in real time — no install required.
            </p>
          </div>

          <InteractiveAuditor />

          <p className="text-center text-xs text-ink-muted font-mono mt-6">
            L1 checks heuristic rules only. Install the extension for VLM visual diagnosis + one-click refund email.
          </p>
        </div>
      </section>

      {/* ── WALL OF SHAME ─────────────────────────────────────────────────── */}
      <section id="wall-of-shame" className="bg-void py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-red uppercase mb-3">
              Real Failures. Real Runway Credits Lost.
            </p>
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-ink-primary mb-4">
              The Wall of Shame
            </h2>
            <p className="text-ink-secondary max-w-xl mx-auto">
              Every one of these was preventable. The L1 engine would have flagged it
              before the Generate button was pressed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {SHAME_CARDS.map((card) => (
              <div key={card.title} className="bg-surface border border-border rounded-2xl overflow-hidden group hover:border-neon-red/30 transition-colors">
                <div className={`relative h-40 bg-gradient-to-br ${card.color} overflow-hidden`}>
                  <div className="absolute inset-0 opacity-40"
                    style={{
                      background: `repeating-linear-gradient(0deg, transparent 0px, transparent 6px, rgba(0,0,0,0.4) 6px, rgba(0,0,0,0.4) 7px)`,
                    }}
                  />
                  {[20, 45, 72].map(top => (
                    <div key={top} className="absolute h-px w-full opacity-60 mix-blend-screen"
                      style={{ top: `${top}%`, background: `#fff` }}
                    />
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-5xl opacity-20 select-none">⚠</span>
                  </div>
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm border border-white/10 rounded-md px-2 py-0.5">
                    <span className="font-mono text-xs text-ink-secondary">{card.platform}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-neon-red/20 border border-neon-red/40 rounded-md px-2 py-0.5">
                    <span className="font-mono text-xs text-neon-red font-bold">{card.cost} wasted</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-mono font-bold text-ink-primary mb-2">{card.title}</h3>
                  <p className="text-xs text-ink-muted font-mono mb-4 italic">{card.prompt}</p>
                  <div className="space-y-1.5">
                    {card.findings.map((f, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-neon-red text-xs mt-0.5 shrink-0">▸</span>
                        <span className="text-xs text-ink-secondary font-mono">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-ink-muted text-sm font-mono mt-10">
            Loss aversion is real. You felt it just reading this.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-surface py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-3">
              Under the Hood
            </p>
            <h2 className="font-mono text-3xl font-bold text-ink-primary">How It Works</h2>
          </div>

          <div className="space-y-0">
            {[
              {
                n: '01',
                title: 'Install & Open Runway',
                body: 'Install the extension, open Runway, and click the AVA panel. It activates automatically across all Runway models — no setup required.',
                accent: 'text-neon-purple',
              },
              {
                n: '02',
                title: 'L1 Pre-Flight Screen',
                body: 'As you type your prompt, AVA scans for Runway\'s highest-cost failure modes: text in frame, complex physics, finger artifacts, slow-motion conflicts. Warnings appear instantly.',
                accent: 'text-neon-amber',
              },
              {
                n: '03',
                title: 'Mark the Broken Frames',
                body: 'Hover the failed video and click ⚑ to tag the exact frames that broke — limb artifact, physics collapse, face distortion, text rendering failure, and more. Your marks become the evidence attached to the refund request.',
                accent: 'text-neon-blue',
              },
              {
                n: '04',
                title: 'One-Click Refund Email + Follow-Up',
                body: 'AVA pre-fills a Runway support email with your generation ID, L1 failure flags, marked frame evidence, credit cost, and timestamp. After you send, AVA asks "Did you get your refund?" — so you can track what works.',
                accent: 'text-neon-green',
              },
            ].map((step, i, arr) => (
              <div key={step.n} className="flex gap-6 items-start relative">
                {i < arr.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-px bg-border" />
                )}
                <span className={`font-mono font-bold text-sm shrink-0 w-8 mt-0.5 ${step.accent}`}>{step.n}</span>
                <div className="pb-10">
                  <h3 className="font-mono font-semibold text-ink-primary mb-1.5">{step.title}</h3>
                  <p className="text-ink-secondary text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ─────────────────────────────────────────────────────────── */}
      <section id="trust" className="bg-void py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
              Privacy-First Architecture
            </p>
            <h2 className="font-mono text-3xl font-bold text-ink-primary mb-4">
              Free to use. Nothing to trust us with.
            </h2>
            <p className="text-ink-secondary max-w-xl mx-auto">
              Sign in with Google or email — that&apos;s it. Your token is AES-GCM encrypted locally. No API keys, no payment info, no prompts stored on our servers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRUST.map((t) => (
              <div key={t.title} className="bg-surface border border-border rounded-2xl p-5 hover:border-neon-green/30 transition-colors">
                <div className="text-2xl mb-3">{t.icon}</div>
                <h3 className="font-mono font-semibold text-ink-primary text-sm mb-2">{t.title}</h3>
                <p className="text-ink-muted text-xs leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-surface border-t border-border py-24 px-6 text-center relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neon-purple/3 to-transparent" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-red uppercase mb-4">
            Already Burned Credits?
          </p>
          <h2 className="font-mono text-4xl md:text-5xl font-bold text-ink-primary mb-6 leading-tight">
            Every generation without AVA<br />
            is a gamble on Runway&apos;s dime.
          </h2>
          <p className="text-ink-secondary mb-10 text-lg">
            Install in 30 seconds. Sign in free. The L1 engine starts protecting
            your credits on your very next Runway prompt.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={CHROME_EXT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-mono font-bold px-10 py-4 rounded-xl transition-all text-lg"
            >
              Add to Chrome — Free
            </a>
            <Link
              href="/login?redirectTo=/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-neon-purple/10 hover:bg-neon-purple/20 border border-neon-purple/30 text-neon-purple font-mono font-semibold px-10 py-4 rounded-xl transition-all"
            >
              Sign In &amp; Track Diagnoses →
            </Link>
          </div>
          <p className="mt-5 text-ink-muted text-sm font-mono">
            No credit card · Works on Chrome · Brave · Edge · Arc
          </p>
        </div>
      </section>

    </main>
  );
}
