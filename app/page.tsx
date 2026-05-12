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
  },
];

/* ── Feature highlights ───────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: '🛡️',
    title: 'Pre-Flight Risk Check',
    body: 'Before you hit Generate, the L1 engine scans your prompt for known Runway failure patterns — fingers, text, physics, motion — instantly, zero API calls, as you type.',
    accent: 'border-neon-purple/30 hover:border-neon-purple/60',
    label: 'text-neon-purple',
  },
  {
    icon: '⚑',
    title: 'Mark Failure Frames',
    body: 'Hover the failed video and click ⚑ to tag the exact broken frames — limb artifact, physics collapse, face distortion, text failure. Screenshots are captured with zero CORS issues.',
    accent: 'border-neon-red/30 hover:border-neon-red/60',
    label: 'text-neon-red',
  },
  {
    icon: '📋',
    title: 'Professional Refund Letter',
    body: 'Free tier auto-generates a professional refund letter with engineering-grade failure terminology — "Anatomical Topology Failure" lands better than "the arm looks weird". Ready to copy and paste.',
    accent: 'border-neon-green/30 hover:border-neon-green/60',
    label: 'text-neon-green',
  },
  {
    icon: '📄',
    title: 'PDF Audit Report (Pro)',
    body: 'Pro tier generates a formal Technical Diagnostic Report PDF with your generation ID, share link, annotated failure frames, engineering diagnosis, and credit refund calculation — built to look like an official audit.',
    accent: 'border-neon-amber/30 hover:border-neon-amber/60',
    label: 'text-neon-amber',
  },
];

/* ── Trust points ─────────────────────────────────────────────────────── */
const TRUST = [
  {
    icon: '🔒',
    title: 'Encrypted at rest.',
    body: 'Your session token is encrypted with AES-GCM before being stored locally — only your browser can read it. No plaintext credentials ever touch storage.',
  },
  {
    icon: '🚫',
    title: 'Zero AI vision cost.',
    body: 'The new scope has no cloud AI vision calls. All diagnosis is local (L1 heuristics) + your manual marks. Your credits stay on Runway, not our servers.',
  },
  {
    icon: '⚡',
    title: 'Instant L1 checks.',
    body: 'Heuristic rules fire in-browser with zero latency. No network call, no wait — the warning appears as you type.',
  },
  {
    icon: '🛡️',
    title: 'Open to audit.',
    body: 'The extension source is readable. No obfuscation. CustomEvent-only communication between page and extension — no postMessage XSS surface.',
  },
];

/* ── Pricing tiers ────────────────────────────────────────────────────── */
const TIERS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    accent: 'border-border',
    badge: null,
    features: [
      '✓ Generation ID & share link capture',
      '✓ Pre-flight L1 prompt risk scanner',
      '✓ Mark failure frames (all types)',
      '✓ Professional refund letter (copy & paste)',
      '✓ Refund outcome tracking',
      '✓ Unlimited generations monitored',
    ],
    cta: { label: 'Add to Chrome — Free', href: CHROME_EXT_URL, style: 'bg-elevated hover:bg-elevated/80 border border-border text-ink-primary' },
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'per month',
    accent: 'border-neon-amber/50 shadow-neon-amber/10 shadow-lg',
    badge: 'Most Effective',
    features: [
      '✓ Everything in Free',
      '✓ Red-box annotation tool on failure frames',
      '✓ PDF Technical Audit Report download',
      '✓ Annotated screenshots embedded in PDF',
      '✓ Refund history cloud sync',
      '✓ Advanced L1 full analysis mode',
    ],
    cta: { label: 'Upgrade to Pro →', href: '/pricing', style: 'bg-neon-amber/20 hover:bg-neon-amber/30 border border-neon-amber/40 text-neon-amber font-bold' },
  },
];

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AIVideoAuditor',
  applicationCategory: 'BrowserApplication',
  operatingSystem: 'Chrome',
  offers: [
    { '@type': 'Offer', price: '0', priceCurrency: 'USD', name: 'Free' },
    { '@type': 'Offer', price: '9', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', billingDuration: 'P1M' }, name: 'Pro' },
  ],
  description: 'Free Chrome extension for Runway ML and Luma AI. Flags bad prompts before you generate, marks broken frames, and builds a Technical Audit PDF Report to maximize credit refund success.',
  url: 'https://www.aivideoauditor.com',
  downloadUrl: 'https://chromewebstore.google.com/detail/aivideoauditor/dnehhjbgpfjdihfigahimmpgnemplljn',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '47' },
  featureList: [
    'Generation ID & share link capture',
    'Pre-flight prompt risk scanner',
    'Mark failure frames with red-box annotation',
    'Professional refund letter generator',
    'PDF Technical Audit Report (Pro)',
  ],
};

export default function HomePage() {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
    />
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

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs font-mono font-bold px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            Runway · Luma · Veo · Kling · Seedance · Vidu — Free Chrome Extension
          </div>

          <h1 className="font-mono text-5xl md:text-6xl font-bold text-ink-primary mb-6 leading-[1.05] tracking-tight">
            Same prompt. <br/>
            <span className="text-neon-amber">Four AI tools.</span>{' '}
            <span className="text-neon-red">Four different failures.</span>
          </h1>

          <p className="text-ink-secondary text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Every AI video tool fails. They just fail <em className="text-ink-primary not-italic font-semibold">differently</em> — and they all charge you for the broken output. AVA spots the failure, classifies it with engineering-grade terminology, and builds the refund-ready audit report.
          </p>

          {/* ── Same-prompt-multi-platform comparison grid ────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto mb-10">
            {[
              { src: '/demo-videos/kling.mp4',    platform: 'Kling 1.6',        accent: 'border-neon-amber/30',  textColor: 'text-neon-amber' },
              { src: '/demo-videos/veo.mp4',      platform: 'Google Veo 3.1',   accent: 'border-neon-cyan/30',   textColor: 'text-neon-cyan' },
              { src: '/demo-videos/seedance.mp4', platform: 'Seedance 2.0',     accent: 'border-neon-red/30',    textColor: 'text-neon-red' },
              { src: '/demo-videos/vidu.mp4',     platform: 'Vidu Q2 Pro',      accent: 'border-neon-purple/30', textColor: 'text-neon-purple' },
            ].map((v) => (
              <div key={v.platform} className={`relative aspect-[9/16] rounded-xl overflow-hidden border ${v.accent} bg-surface group shadow-2xl`}>
                <video
                  src={v.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
                {/* Failure-marker badge — top-right corner */}
                <div className="absolute top-2 right-2 bg-void/85 backdrop-blur-sm border border-neon-red/40 text-neon-red font-mono text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider z-10">
                  ⚑ Spot the fail
                </div>
                {/* Bottom platform label with gradient */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void via-void/85 to-transparent px-3 py-2.5">
                  <div className={`font-mono text-[11px] md:text-xs font-bold ${v.textColor}`}>{v.platform}</div>
                  <div className="text-[9px] font-mono text-ink-muted mt-0.5">Same prompt</div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-ink-muted text-xs md:text-sm font-mono mb-8 max-w-3xl mx-auto leading-relaxed">
            Watch them play. Each tool failed in a different way on identical input — broken motion, garbled signs, melted hands, color drift.{' '}
            <span className="text-ink-secondary">AVA tags each one with the technical taxonomy support teams escalate fast.</span>
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
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-neon-amber/10 hover:bg-neon-amber/20 border border-neon-amber/30 text-neon-amber font-mono font-semibold px-8 py-3.5 rounded-xl transition-all text-sm"
            >
              ✦ See Pro PDF Reports →
            </Link>
          </div>

          <p className="mt-5 text-ink-muted text-xs font-mono">
            No credit card for free tier · Works on Chrome · Brave · Edge · Arc
          </p>
        </div>
      </section>

      {/* ── CREDIT LOSS BANNER ────────────────────────────────────────────── */}
      <section className="bg-neon-red/5 border-y border-neon-red/20 py-8 px-6 overflow-x-hidden">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-mono font-bold text-neon-red">$0.20–$5</span>
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
              From risky prompt to PDF audit report — handled inside the extension while you&apos;re on Runway.
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

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-void py-20 px-6">
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
                body: 'Install the extension, open Runway, and the AVA panel activates automatically. The network interceptor silently captures your generation ID and share link in the background — no setup required.',
                accent: 'text-neon-purple',
              },
              {
                n: '02',
                title: 'L1 Pre-Flight Screen',
                body: 'As you type your prompt, AVA scans for Runway\'s highest-cost failure modes: text in frame, complex physics, finger artifacts, slow-motion conflicts. Warnings appear instantly with no API calls — pure in-browser heuristics.',
                accent: 'text-neon-amber',
              },
              {
                n: '03',
                title: 'Mark the Broken Frames',
                body: 'Hover the failed video and click ⚑ to tag the exact broken frames by failure type. A red-box annotation tool (Pro) lets you circle the exact defect area. Screenshots are captured CORS-safely via the extension.',
                accent: 'text-neon-blue',
              },
              {
                n: '04',
                title: 'Build Your Audit Report',
                body: 'Free: copy a professional refund letter with engineering-grade failure terminology. Pro: download a PDF Technical Diagnostic Report with annotated screenshots, technical IDs, failure analysis, and credit refund calculation — built to escalate support priority.',
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

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <section id="upgrade" className="bg-surface py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-amber uppercase mb-3">
              Pricing
            </p>
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-ink-primary mb-4">
              Free gets you the letter.<br />Pro gets you the evidence.
            </h2>
            <p className="text-ink-secondary max-w-xl mx-auto">
              The PDF Audit Report is designed to look like an official diagnostic document.
              Visual authority gets your ticket escalated faster.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {TIERS.map((tier) => (
              <div key={tier.name} className={`bg-elevated border rounded-2xl p-7 relative ${tier.accent}`}>
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon-amber text-black text-xs font-mono font-bold px-4 py-1 rounded-full">
                    {tier.badge}
                  </div>
                )}
                <div className="mb-6">
                  <p className="font-mono font-bold text-ink-primary text-lg mb-1">{tier.name}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-4xl font-bold text-ink-primary">{tier.price}</span>
                    <span className="text-ink-muted text-sm font-mono">{tier.period}</span>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="text-xs font-mono text-ink-secondary leading-relaxed">{f}</li>
                  ))}
                </ul>
                <a
                  href={tier.cta.href}
                  target={tier.cta.href.startsWith('http') ? '_blank' : undefined}
                  rel={tier.cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`block text-center py-3 px-6 rounded-xl font-mono text-sm transition-all ${tier.cta.style}`}
                >
                  {tier.cta.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLAYGROUND ────────────────────────────────────────────────────── */}
      <section id="playground" className="bg-void py-20 px-6">
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
            L1 checks heuristic rules only. Install the extension to mark failure frames + generate your audit report.
          </p>
        </div>
      </section>

      {/* ── WALL OF SHAME ─────────────────────────────────────────────────── */}
      <section id="wall-of-shame" className="bg-surface py-20 px-6">
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
              <div key={card.title} className="bg-elevated border border-border rounded-2xl overflow-hidden group hover:border-neon-red/30 transition-colors">
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
              Sign in with Google or email — that&apos;s it. Your token is AES-GCM encrypted locally.
              No cloud AI vision calls, no prompts stored on our servers.
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
            your credits on your very next Runway prompt — and the PDF report is ready when you need it.
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
            <a
              href="#upgrade"
              className="inline-flex items-center justify-center gap-2 bg-neon-amber/10 hover:bg-neon-amber/20 border border-neon-amber/30 text-neon-amber font-mono font-semibold px-10 py-4 rounded-xl transition-all"
            >
              ✦ See Pro PDF Reports →
            </a>
          </div>
          <p className="mt-5 text-ink-muted text-sm font-mono">
            No credit card for free tier · Works on Chrome · Brave · Edge · Arc
          </p>
        </div>
      </section>

    </main>
    </>
  );
}
