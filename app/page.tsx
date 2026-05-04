import Link from 'next/link';
import InteractiveAuditor from '@/components/interactive-auditor';

/* ── Wall of Shame data ───────────────────────────────────────────────── */
const SHAME_CARDS = [
  {
    platform: 'LUMA',
    title: 'The Six-Fingered Pianist',
    prompt: '"Close-up of hands playing piano, dramatic lighting"',
    findings: ['Finger-count hallucination: 6 fingers detected', 'Knuckle geometry collapsed at 0:03', 'L1 flag: hands + closeup = high risk'],
    cost: '$1.40',
    color: 'from-violet-900/40 to-purple-900/20',
    glitch: 'purple',
  },
  {
    platform: 'LUMA',
    title: 'The Dog With Five Legs',
    prompt: '"A golden retriever running fast across a field, tracking shot"',
    findings: ['Extra limb artifact at 0:02–0:04', 'Motion blur at 16fps triggered', 'L1 flag: high motion + low FPS'],
    cost: '$1.40',
    color: 'from-red-900/40 to-orange-900/20',
    glitch: 'red',
  },
  {
    platform: 'RUNWAY',
    title: 'The Melting Sign',
    prompt: '"Street corner at night, neon sign reading OPEN, cinematic"',
    findings: ['Text fully illegible: "OPΞИ" rendered', 'Neon bleeding artifact on all letters', 'L1 flag: text in frame = high risk'],
    cost: '$0.70',
    color: 'from-cyan-900/40 to-teal-900/20',
    glitch: 'cyan',
  },
];

/* ── Trust points ─────────────────────────────────────────────────────── */
const TRUST = [
  {
    icon: '🔒',
    title: 'We don\'t want your keys.',
    body: 'API keys are encrypted with AES-256-GCM inside your browser vault. They never touch our servers.',
  },
  {
    icon: '👁️',
    title: 'We don\'t store your PII.',
    body: 'Prompt analysis runs locally in the extension. No prompt text is ever sent to our backend.',
  },
  {
    icon: '⚡',
    title: 'Hybrid by design.',
    body: 'Free cloud quota for L1 checks. Power users bring their own keys and run everything 100% local.',
  },
  {
    icon: '🛡️',
    title: 'Open to audit.',
    body: 'The extension source is reviewable. No obfuscation. What you install is what you see.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-void bg-grid-pattern bg-grid pt-28 pb-20 px-6 overflow-hidden">
        {/* Scanline overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
          }}
        />
        {/* Glow orbs */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-neon-purple/5 blur-3xl" />
        <div className="pointer-events-none absolute top-20 right-0 w-[300px] h-[300px] rounded-full bg-neon-red/5 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs font-mono font-bold px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            Chrome Extension · Free to Install
          </div>

          <h1 className="font-mono text-5xl md:text-6xl font-bold text-ink-primary mb-6 leading-tight">
            Stop Burning Money<br />
            on <span className="text-neon-red line-through decoration-2">Collapsed</span>{' '}
            <span className="text-neon-amber">AI Videos.</span>
          </h1>

          <p className="text-ink-secondary text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
            AIVideoAuditor intercepts physical errors in your prompt{' '}
            <em className="text-ink-primary not-italic font-semibold">before you hit Generate</em>.
            When it still fails, one click drafts your refund letter.
          </p>

          <p className="text-ink-muted text-sm font-mono mb-10">
            Works on Luma Dream Machine · Runway Gen-4
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://chromewebstore.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-mono font-bold px-8 py-3.5 rounded-xl transition-all text-base"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
              Add to Chrome — It&apos;s Free
            </a>
            <a
              href="#playground"
              className="inline-flex items-center justify-center gap-2 bg-elevated hover:bg-elevated/80 border border-border text-ink-secondary font-mono font-medium px-8 py-3.5 rounded-xl transition-all text-sm"
            >
              Test your prompt ↓
            </a>
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
              Test Your Prompt.
            </h2>
            <p className="text-ink-secondary max-w-xl mx-auto">
              Paste what you&apos;re about to send to Luma or Runway. The same heuristic engine
              that runs inside the extension checks it in real time — no install required.
            </p>
          </div>

          <InteractiveAuditor />

          <p className="text-center text-xs text-ink-muted font-mono mt-6">
            L1 checks heuristic rules only. Install the extension for VLM visual analysis + real-time API interception.
          </p>
        </div>
      </section>

      {/* ── WALL OF SHAME ─────────────────────────────────────────────────── */}
      <section id="wall-of-shame" className="bg-void py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-red uppercase mb-3">
              Real Failures. Real Costs.
            </p>
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-ink-primary mb-4">
              The Wall of Shame
            </h2>
            <p className="text-ink-secondary max-w-xl mx-auto">
              Every one of these was preventable. The L1 engine would have flagged it before
              the generation button was pressed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {SHAME_CARDS.map((card) => (
              <div key={card.title} className="bg-surface border border-border rounded-2xl overflow-hidden group hover:border-neon-red/30 transition-colors">
                {/* Fake corrupted video thumbnail */}
                <div className={`relative h-40 bg-gradient-to-br ${card.color} overflow-hidden`}>
                  {/* Glitch bars */}
                  <div className="absolute inset-0 opacity-40"
                    style={{
                      background: `repeating-linear-gradient(
                        0deg,
                        transparent 0px, transparent 6px,
                        rgba(0,0,0,0.4) 6px, rgba(0,0,0,0.4) 7px
                      )`,
                    }}
                  />
                  {/* Corruption artifact lines */}
                  {[20, 45, 72].map(top => (
                    <div key={top} className="absolute h-px w-full opacity-60 mix-blend-screen"
                      style={{ top: `${top}%`, background: `var(--glitch-${card.glitch}, #fff)` }}
                    />
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-5xl opacity-20 select-none">⚠</span>
                  </div>
                  {/* Platform badge */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm border border-white/10 rounded-md px-2 py-0.5">
                    <span className="font-mono text-xs text-ink-secondary">{card.platform}</span>
                  </div>
                  {/* Cost badge */}
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
                title: 'Install & Intercept',
                body: 'The extension injects into Luma and Runway. Every prompt you type is scanned by the L1 heuristic engine before you hit Generate.',
                accent: 'text-neon-purple',
              },
              {
                n: '02',
                title: 'L1 Heuristic Screen',
                body: 'Rule-based checks catch the highest-cost failure modes instantly: wrong FPS, complex physics, text in frame, finger artifacts. Zero API calls, zero latency.',
                accent: 'text-neon-amber',
              },
              {
                n: '03',
                title: 'VLM Visual Diagnosis',
                body: 'When generation still fails, the extension submits the output to a vision model for a detailed diagnosis: exactly what broke, why, and what to change.',
                accent: 'text-neon-blue',
              },
              {
                n: '04',
                title: 'One-Click Refund Letter',
                body: 'Bad output? The extension auto-drafts a refund request with platform-specific language, the failure diagnosis, and your transaction ID. Copy and paste.',
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
              We don&apos;t want your keys.<br />We don&apos;t store your data.
            </h2>
            <p className="text-ink-secondary max-w-xl mx-auto">
              AI video generation requires sensitive API credentials. We built the architecture
              so you never have to trust us with them.
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

          {/* Architecture pill */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-ink-muted">
            <span className="bg-elevated border border-border rounded-full px-4 py-1.5">AES-256-GCM local vault</span>
            <span className="text-border">→</span>
            <span className="bg-elevated border border-border rounded-full px-4 py-1.5">Zero server-side key storage</span>
            <span className="text-border">→</span>
            <span className="bg-elevated border border-border rounded-full px-4 py-1.5">BYOK for full local mode</span>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-surface border-t border-border py-24 px-6 text-center relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neon-purple/3 to-transparent" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-4">
            Free · No Account Required
          </p>
          <h2 className="font-mono text-4xl md:text-5xl font-bold text-ink-primary mb-6 leading-tight">
            Every generation you run<br />
            without it is a gamble.
          </h2>
          <p className="text-ink-secondary mb-10 text-lg">
            Install in 30 seconds. No API key required to start.
            The L1 engine runs immediately on your next prompt.
          </p>
          <a
            href="https://chromewebstore.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-mono font-bold px-10 py-4 rounded-xl transition-all text-lg"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            Add to Chrome — It&apos;s Free
          </a>
          <p className="mt-5 text-ink-muted text-sm font-mono">
            Works on Chrome · Brave · Edge · Arc
          </p>
        </div>
      </section>

    </main>
  );
}
