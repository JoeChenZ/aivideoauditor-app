import Link from 'next/link';
import InteractiveAuditor from '@/components/interactive-auditor';
import LeadCaptureForm from '@/components/lead-capture-form';
import { Kicker, SectionHead, RuleDivider, DataCallout } from '@/components/editorial';

const CHROME_EXT_URL = 'https://chromewebstore.google.com/detail/aivideoauditor/ecomchbdfkgakaoponipjgpnjfpimdef';

const COMPARE_VIDEOS = [
  { name: 'kling',    platform: 'Kling 1.6',      accent: 'border-rule' },
  { name: 'veo',      platform: 'Google Veo 3.1', accent: 'border-rule' },
  { name: 'seedance', platform: 'Seedance 2.0',   accent: 'border-rule' },
  { name: 'vidu',     platform: 'Vidu Q2 Pro',    accent: 'border-rule' },
];

const FEATURES = [
  {
    label: '01 · Vendor reality check',
    title: 'See what subscription actually buys.',
    body: 'Per-second cost (credits × failure rate), unlimited-tier gating rules, refund-window traps, and pricing-change history. Built from 132 tagged Trustpilot 1-stars across 8 vendors plus 8 months of fetch-intercept data.',
  },
  {
    label: '02 · Prompt indicator',
    title: 'A live failure score on every prompt.',
    body: 'Red, yellow, green — trained on 105 catalogued failure modes across Runway, Luma, Sora, Pika, Kling, Veo, Hailuo, Vidu. Updates per keystroke. No cloud calls. Green light before the credit is spent.',
  },
  {
    label: '03 · Rewrite suggestions',
    title: 'Names the phrase pulling the score down.',
    body: '"Fingers in frame." "120fps slow-mo." "Neon text." Each red prompt gets a concrete rewrite, not a generic warning. Edit until the indicator turns.',
  },
  {
    label: '04 · Personal failure history',
    title: 'Your repeating mistakes, surfaced.',
    body: 'Every generation feeds your private history. "You\'ve hit hand-anatomy failure 7 times on Runway this month." The aggregate forecast learns which platform survives your prompt habits.',
  },
];

const HOW_STEPS = [
  {
    n: '01',
    title: 'Check the platform before you subscribe.',
    body: 'Install the extension and pick a vendor you are considering. AVA surfaces per-second cost, unlimited-tier gating, refund mechanics, and the public change history. Free on every tier.',
  },
  {
    n: '02',
    title: 'Score every prompt you draft.',
    body: 'After subscribing, AVA runs your prompt through 105 known failure modes per vendor — Runway, Luma, Sora, Pika, Kling, Veo, Hailuo, Vidu — and emits a red/yellow/green score in browser, zero API roundtrips.',
  },
  {
    n: '03',
    title: 'Rewrite until the score turns.',
    body: 'When red, AVA names the specific phrase pulling the score down and offers a rewrite. Edit, watch the indicator climb, generate when the light is green.',
  },
  {
    n: '04',
    title: 'Build your private failure pattern.',
    body: 'Every generation feeds your history. After a few weeks the aggregate tells you which vendor is most likely to succeed on this specific prompt today.',
  },
];

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    accent: 'border-rule',
    badge: null,
    features: [
      'Unlimited vendor reality checks',
      '50 prompt scores per month',
      'Red / yellow / green indicator',
      'Concrete rewrite suggestions',
      'Coverage across 8 video providers',
    ],
    cta: { label: 'Install free', href: CHROME_EXT_URL, style: 'bg-elevated hover:bg-elevated/70 border border-rule text-ink-primary' },
  },
  {
    name: 'Pro',
    price: '$19',
    period: 'per month',
    accent: 'border-neon-amber/40',
    badge: 'Most chosen',
    features: [
      'Unlimited prompt scoring',
      'Personal failure-history dashboard',
      'Change alerts on pricing + tier gating',
      'Cross-model comparison per prompt',
      'L2 deep analysis on borderline scores',
    ],
    cta: { label: 'See Pro', href: '/pricing', style: 'bg-neon-amber/15 hover:bg-neon-amber/25 border border-neon-amber/40 text-neon-amber font-semibold' },
  },
  {
    name: 'Business',
    price: '$79',
    period: 'per month',
    accent: 'border-rule',
    badge: null,
    features: [
      'Everything in Pro',
      'API access to failure-mode catalog',
      'Team dashboards (per-seat history)',
      'Cross-platform change feed',
      'Priority email support',
    ],
    cta: { label: 'Talk to sales', href: '/pricing#business', style: 'bg-elevated hover:bg-elevated/70 border border-rule text-ink-primary' },
  },
];

const TRUST = [
  {
    title: 'Encrypted at rest',
    body: 'Session tokens are AES-GCM encrypted before local storage. No plaintext credentials touch disk.',
  },
  {
    title: 'No cloud vision',
    body: 'All diagnosis is local L1 heuristics plus your manual marks. Zero AI-vision calls on our backend.',
  },
  {
    title: 'In-browser inference',
    body: 'Heuristic rules fire client-side with zero latency. The warning appears as you type — no network roundtrip.',
  },
  {
    title: 'Auditable source',
    body: 'Extension source is readable. No obfuscation. CustomEvent-only page communication — no postMessage XSS surface.',
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
    { '@type': 'Offer', price: '19', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', billingDuration: 'P1M' }, name: 'Pro' },
    { '@type': 'Offer', price: '79', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', billingDuration: 'P1M' }, name: 'Business' },
  ],
  description:
    'Pre-purchase research desk + prompt failure scoring for AI video. Before subscribing to Runway, Higgsfield, Krea, Pollo, Pika, Sora, Luma, or Vidu, see real per-second cost, unlimited-tier gating, refund mechanics, and pricing-change history. After subscribing, a live failure-risk score on every prompt plus personal failure history.',
  url: 'https://www.aivideoauditor.com',
  downloadUrl: CHROME_EXT_URL,
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '47' },
  featureList: [
    'Pre-purchase vendor reality check across 11 AI video platforms',
    'Refund mechanics and unlimited-tier gating per platform',
    'Live prompt failure-risk score',
    'Concrete rewrite suggestions',
    'Personal failure history per model',
    '105 failure modes across 8 providers',
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
            function play(){ document.querySelectorAll('main section video[autoplay]').forEach(function(v){ var p=v.play(); if(p&&p.catch) p.catch(function(){}); }); }
            if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', play); else play();
            var events=['click','scroll','touchstart','keydown'];
            function handler(){ play(); events.forEach(function(e){ document.removeEventListener(e, handler, true); }); }
            events.forEach(function(e){ document.addEventListener(e, handler, {capture:true, passive:true}); });
          })();`,
        }}
      />

      <main className="min-h-screen overflow-x-hidden">

        {/* ── MASTHEAD ─────────────────────────────────────────────────── */}
        <section className="relative pt-20 pb-16 px-6 border-b border-rule/60">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-baseline gap-3 mb-8 font-mono text-[11px] tracking-kicker uppercase text-ink-muted">
              <span className="text-neon-amber">●</span>
              <span>Issue 002 · {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              <span className="text-rule">/</span>
              <span>Independent vendor research</span>
            </div>

            <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] tracking-tight text-ink-primary font-semibold max-w-5xl">
              See what AI-video platforms <span className="italic text-neon-amber">actually deliver</span>{' '}
              <span className="block">before you subscribe.</span>
            </h1>

            <p className="mt-8 max-w-prose text-lg leading-relaxed text-ink-secondary">
              We tagged 132 1-star reviews across Runway, Higgsfield, Krea, Pollo, Pika, Luma, Sora, and Vidu. Between <strong className="text-ink-primary font-semibold">42% and 78%</strong> cite billing predation, not bad output. AVA surfaces the real per-second cost, unlimited-tier gating, and refund mechanics <em className="text-ink-primary not-italic font-semibold">before</em> you commit. After you subscribe, the same engine scores every prompt against 105 failure modes.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={CHROME_EXT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-neon-green/15 hover:bg-neon-green/25 border border-neon-green/40 text-neon-green font-mono font-semibold text-sm tracking-wide uppercase px-6 py-3 rounded-md transition-colors"
              >
                Install free Chrome extension
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17l10-10M17 7v10H7"/></svg>
              </a>
              <Link
                href="/research/132-ai-video-vendor-reviews"
                className="inline-flex items-center gap-2 border border-rule hover:border-ink-secondary text-ink-secondary hover:text-ink-primary font-mono font-medium text-sm tracking-wide uppercase px-6 py-3 rounded-md transition-colors"
              >
                Read the 132-review corpus
              </Link>
            </div>

            <p className="mt-5 font-mono text-[11px] text-ink-muted">
              No credit card on the free tier · Chrome · Brave · Edge · Arc
            </p>

            <div className="mt-12 max-w-xl">
              <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-3">
                Not ready to install? Get the digest in your inbox.
              </p>
              <LeadCaptureForm
                source="home-hero"
                heading="One email when the vendor changelog flags something."
                blurb="We watch silent pricing-page edits, 'unlimited' policy walks, and credit-burn rule shifts across 11 AI-video vendors. You get a note only when a change matters. Maybe twice a month, often less."
                cta="Add me →"
                successMessage="In. We'll only ping you when a vendor pulls something worth knowing about."
              />
            </div>
          </div>
        </section>

        {/* ── EVIDENCE BAR ─────────────────────────────────────────────── */}
        <section className="border-b border-rule/60 px-6 py-10 bg-paper">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
            <DataCallout label="Generations that fail" value="~33%" delta="Aggregate across 8 video providers" tone="bad" />
            <DataCallout label="Catalogued failure modes" value="105" delta="Across 8 providers" tone="warn" />
            <DataCallout label="Trustpilot 1-stars tagged" value="132" delta="8 vendors · 8 months" />
            <DataCallout label="Cost to install AVA" value="$0" delta="Free tier · no card" tone="good" />
          </div>
        </section>

        {/* ── COMPARISON FILMSTRIP ─────────────────────────────────────── */}
        <section className="px-6 py-20 border-b border-rule/60">
          <div className="max-w-6xl mx-auto">
            <Kicker className="mb-3">Same prompt · four platforms · four failures</Kicker>
            <h2 className="font-display text-3xl md:text-4xl leading-tight tracking-tight text-ink-primary font-semibold max-w-2xl mb-8">
              Each platform breaks the same prompt in a different way.
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {COMPARE_VIDEOS.map((v) => (
                <figure key={v.platform} className={`relative aspect-[9/16] rounded-md overflow-hidden border ${v.accent} bg-surface group`}>
                  <video
                    src={`/demo-videos/${v.name}.mp4`}
                    poster={`/demo-videos/${v.name}.jpg`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void via-void/85 to-transparent px-3 py-2.5 z-10">
                    <p className="font-mono text-[11px] font-semibold text-ink-primary">{v.platform}</p>
                    <p className="font-mono text-[10px] text-ink-muted mt-0.5">Same prompt</p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="mt-6 font-mono text-xs text-ink-muted max-w-prose">
              Broken motion, garbled signs, melted hands, color drift. AVA learns the per-model failure pattern and warns you which provider will choke on which prompt — before the credit is spent.
            </p>
          </div>
        </section>

        {/* ── FEATURES ─────────────────────────────────────────────────── */}
        <section className="px-6 py-24 border-b border-rule/60">
          <div className="max-w-6xl mx-auto">
            <SectionHead
              kicker="What AVA does"
              title={<>Check the vendor. <span className="italic text-neon-amber">Score</span> the prompt. Keep the credit.</>}
            />
            <p className="text-ink-secondary leading-relaxed max-w-prose mb-12">
              Four signals run inside the extension — before you subscribe and while you draft — so the money you spend produces a clip you keep.
            </p>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              {FEATURES.map((f) => (
                <article key={f.label} className="border-t border-rule/60 pt-6">
                  <p className="font-mono text-[11px] tracking-kicker uppercase text-ink-muted mb-3">{f.label}</p>
                  <h3 className="font-display text-2xl leading-tight tracking-tight text-ink-primary font-semibold mb-3">{f.title}</h3>
                  <p className="text-ink-secondary text-sm leading-relaxed">{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── EFFECTIVE COST ───────────────────────────────────────────── */}
        <section id="effective-cost" className="px-6 py-24 border-b border-rule/60 bg-paper">
          <div className="max-w-3xl mx-auto">
            <Kicker className="mb-3">The math vendors do not publish</Kicker>
            <h2 className="font-display text-3xl md:text-4xl leading-tight tracking-tight text-ink-primary font-semibold mb-6">
              Your real cost per clip isn&apos;t the list price.
            </h2>
            <p className="text-ink-secondary leading-relaxed mb-10 max-w-prose">
              It is the list price divided by how often a generation works on the first try, multiplied by how often a refund is denied. AVA estimates both sides of that equation before you click Generate.
            </p>

            <div className="border border-rule rounded-md p-8 bg-surface mb-8">
              <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-5 text-center">
                Effective cost per usable clip
              </p>
              <div className="font-mono text-center text-base sm:text-lg text-ink-primary leading-relaxed">
                <span className="text-neon-cyan">list_price</span>
                <span className="text-ink-muted"> × </span>
                <span className="text-neon-amber">(1 / first_try_success_rate)</span>
                <span className="text-ink-muted"> × </span>
                <span className="text-neon-purple">(1 + refund_denial_rate)</span>
              </div>
              <p className="text-xs text-ink-muted text-center mt-6 max-w-xl mx-auto leading-relaxed">
                On the vendors we track, a 35% first-try success rate and a 60% refund denial rate turn a $0.50 disclosed cost into a $2.29 real cost. The disclosed price stays the same. The cost you actually pay does not.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-5 mb-8">
              {[
                { tag: 'list_price', tone: 'text-neon-cyan', body: 'What the vendor advertises. AVA reads the live page so you do not have to translate credits to dollars.' },
                { tag: 'first_try_success_rate', tone: 'text-neon-amber', body: 'Estimated from 105 catalogued failure modes plus your personal history. Climbs when your prompt scores green.' },
                { tag: 'refund_denial_rate', tone: 'text-neon-purple', body: 'Read off the 132-review Trustpilot corpus, per platform. Vendors with no refund path score 1.0.' },
              ].map((row) => (
                <div key={row.tag} className="border-l-2 border-rule pl-4">
                  <p className={`font-mono text-[11px] tracking-kicker uppercase mb-2 ${row.tone}`}>{row.tag}</p>
                  <p className="text-xs text-ink-secondary leading-relaxed">{row.body}</p>
                </div>
              ))}
            </div>

            <p className="text-center font-mono text-xs text-ink-muted">
              Full per-platform breakdown in the{' '}
              <Link href="/research/132-ai-video-vendor-reviews" className="text-neon-purple underline decoration-neon-purple/40 underline-offset-2 hover:decoration-neon-purple">132-review research corpus</Link>.
            </p>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
        <section id="how-it-works" className="px-6 py-24 border-b border-rule/60">
          <div className="max-w-3xl mx-auto">
            <SectionHead kicker="Under the hood" title="How it works." />

            <ol className="mt-10 space-y-0">
              {HOW_STEPS.map((step, i, arr) => (
                <li key={step.n} className="flex gap-8 items-start relative pb-10 last:pb-0">
                  {i < arr.length - 1 && <span className="absolute left-3 top-8 bottom-0 w-px bg-rule/60" aria-hidden />}
                  <span className="font-mono font-semibold text-xs shrink-0 text-neon-amber mt-1">{step.n}</span>
                  <div>
                    <h3 className="font-display text-xl leading-snug font-semibold text-ink-primary mb-2">{step.title}</h3>
                    <p className="text-ink-secondary text-sm leading-relaxed max-w-prose">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── PRICING ──────────────────────────────────────────────────── */}
        <section id="upgrade" className="px-6 py-24 border-b border-rule/60 bg-paper">
          <div className="max-w-5xl mx-auto">
            <SectionHead
              kicker="Pricing"
              title={<>Free checks the vendor. <span className="italic text-neon-amber">Pro</span> scores every prompt.</>}
            />
            <p className="text-ink-secondary leading-relaxed max-w-prose mb-12">
              Vendor reality checks are unlimited on every tier. Pro unlocks unlimited prompt scoring, personal failure history, and silent-policy-change alerts.
            </p>

            <div className="grid md:grid-cols-3 gap-5">
              {TIERS.map((tier) => (
                <div key={tier.name} className={`border rounded-md p-7 relative bg-surface ${tier.accent}`}>
                  {tier.badge && (
                    <span className="absolute -top-3 left-6 bg-neon-amber text-black font-mono text-[10px] tracking-kicker uppercase px-3 py-1 rounded">
                      {tier.badge}
                    </span>
                  )}
                  <p className="font-mono text-[11px] tracking-kicker uppercase text-ink-muted mb-3">{tier.name}</p>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="font-display text-4xl font-semibold text-ink-primary">{tier.price}</span>
                    <span className="font-mono text-xs text-ink-muted">{tier.period}</span>
                  </div>
                  <ul className="space-y-2.5 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="flex gap-2 text-sm text-ink-secondary leading-relaxed">
                        <span className="text-neon-amber mt-0.5 shrink-0">·</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={tier.cta.href}
                    target={tier.cta.href.startsWith('http') ? '_blank' : undefined}
                    rel={tier.cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`block text-center py-3 px-6 rounded-md font-mono text-xs tracking-wide uppercase transition-colors ${tier.cta.style}`}
                  >
                    {tier.cta.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PLAYGROUND ───────────────────────────────────────────────── */}
        <section id="playground" className="px-6 py-24 border-b border-rule/60">
          <div className="max-w-5xl mx-auto">
            <SectionHead
              kicker="Interactive L1 engine"
              title="Test your Runway prompt."
            />
            <p className="text-ink-secondary leading-relaxed max-w-prose mb-10">
              Paste what you are about to send to Runway. The heuristic engine that runs inside the extension checks it in real time — no install required.
            </p>

            <InteractiveAuditor />

            <p className="mt-6 font-mono text-xs text-ink-muted">
              L1 checks heuristic rules only. Install the extension for failure-frame marking and audit reports.
            </p>
          </div>
        </section>

        {/* ── TRUST ────────────────────────────────────────────────────── */}
        <section id="trust" className="px-6 py-24 border-b border-rule/60 bg-paper">
          <div className="max-w-5xl mx-auto">
            <SectionHead
              kicker="Privacy-first architecture"
              title="Free to use. Nothing to trust us with."
            />
            <p className="text-ink-secondary leading-relaxed max-w-prose mb-12">
              Sign in with Google or email — that is it. Tokens are AES-GCM encrypted locally. No cloud AI vision calls. No prompts stored on our servers.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
              {TRUST.map((t) => (
                <div key={t.title} className="border-t border-rule/60 pt-5">
                  <h3 className="font-display text-lg font-semibold text-ink-primary mb-2">{t.title}</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────────── */}
        <section className="px-6 py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <Kicker className="mb-5">Already paying a vendor that doesn&apos;t deliver?</Kicker>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.1] tracking-tight font-semibold text-ink-primary mb-8">
              Every subscription without AVA is a bet on what the marketing page said.
            </h2>
            <p className="text-ink-secondary mb-10 max-w-prose mx-auto leading-relaxed">
              Install in thirty seconds. Sign in free. AVA checks vendor reality on Runway, Higgsfield, Krea, Pollo, Pika, Sora, Luma, and Vidu — and scores every prompt you write after.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={CHROME_EXT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-neon-green/15 hover:bg-neon-green/25 border border-neon-green/40 text-neon-green font-mono font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-md transition-colors"
              >
                Install free
              </a>
              <Link
                href="#upgrade"
                className="inline-flex items-center gap-2 border border-rule hover:border-ink-secondary text-ink-secondary hover:text-ink-primary font-mono font-medium text-sm tracking-wide uppercase px-8 py-3.5 rounded-md transition-colors"
              >
                See Pro
              </Link>
            </div>
            <p className="mt-6 font-mono text-[11px] text-ink-muted">
              No credit card on the free tier · Chrome · Brave · Edge · Arc
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
