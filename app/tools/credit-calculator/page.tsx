'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';

type Provider = 'runway' | 'luma' | 'kling' | 'veo' | 'pika' | 'hailuo' | 'seedance' | 'multi';
type PrimaryFailure = 'anatomy' | 'color' | 'identity' | 'lipsync' | 'camera' | 'physics' | 'text' | 'mixed';

const PROVIDER_LABELS: Record<Provider, string> = {
  runway: 'Runway Gen-4',
  luma: 'Luma Dream Machine',
  kling: 'Kling 1.6',
  veo: 'Google Veo 3',
  pika: 'Pika 2.0',
  hailuo: 'Hailuo AI',
  seedance: 'ByteDance Seedance',
  multi: 'Multiple providers',
};

const FAILURE_LABELS: Record<PrimaryFailure, string> = {
  anatomy: 'Hand or limb anatomy (extra fingers, fused joints)',
  color: 'Color drift across frames (hue shift)',
  identity: 'Face / identity drift (subject morphs)',
  lipsync: 'Lip sync drift on dialogue',
  camera: 'Camera jitter on locked-off prompts',
  physics: 'Physics violations (fluid inversion, gravity)',
  text: 'Garbled text in frame',
  mixed: 'Mixed — many different failures',
};

// Goodwill-credit hit rate by failure mode (observed, not guaranteed).
// Most platform ToS only refund credits when generation throws an error; output-quality
// failures are normally "completed" and credits consumed. Numbers below are observed
// discretionary rates — they are an input to the effective-cost calc, not a recovery path.
const REFUND_HIT_RATE: Record<PrimaryFailure, number> = {
  anatomy: 0.45,
  color: 0.35,
  identity: 0.35,
  lipsync: 0.30,
  camera: 0.30,
  physics: 0.40,
  text: 0.50,
  mixed: 0.35,
};

// Industry typical first-pass failure rate by provider (consumer-tier output)
const FAILURE_RATE: Record<Provider, number> = {
  runway: 0.32,
  luma: 0.34,
  kling: 0.30,
  veo: 0.28,
  pika: 0.36,
  hailuo: 0.38,
  seedance: 0.35,
  multi: 0.33,
};

// Structured data — client component, but JSON-LD renders on first paint
// which Googlebot reads. WebApplication signals an interactive tool;
// HowTo gives a SERP step carousel for "how to calculate AI video credit waste".
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI Video Credit Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  url: 'https://www.aivideoauditor.com/tools/credit-calculator',
  description: 'Free calculator that estimates monthly credit waste, recoverable spend by failure mode, and AVA Pro payback period for AI video subscribers.',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};
const howToCalcSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to calculate your real cost per usable AI video clip',
  description: 'The headline rate is not your real cost. Multiply by 1/first-try-success-rate to get the effective per-usable-clip cost.',
  totalTime: 'PT1M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your current monthly AI video spend',
      text: 'Use the credits-purchased value from your latest invoice, in dollars. The calculator handles any provider — Runway, Luma, Sora, Veo, Kling, Pika, Hailuo, Vidu.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Select your primary provider and most-common failure mode',
      text: 'Provider sets the base first-try success rate. Failure mode adjusts the recovery-rate-per-ticket estimate based on the technical category vendors document.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Read your effective cost per usable clip and AVA Pro payback period',
      text: 'The calculator shows your monthly wasted spend, the share recoverable by filing well-documented tickets, and how many weeks AVA Pro pays for itself versus current ad-hoc behavior.',
    },
  ],
};
const breadcrumbCalcSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.aivideoauditor.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.aivideoauditor.com/tools/credit-calculator' },
    { '@type': 'ListItem', position: 3, name: 'Credit Calculator', item: 'https://www.aivideoauditor.com/tools/credit-calculator' },
  ],
};

export default function CreditCalculatorPage() {
  const [monthlySpend, setMonthlySpend] = useState<number>(200);
  const [provider, setProvider] = useState<Provider>('multi');
  const [primaryFailure, setPrimaryFailure] = useState<PrimaryFailure>('mixed');
  const [currentRefundsManual, setCurrentRefundsManual] = useState<number>(0);

  const calc = useMemo(() => {
    const failureRate = FAILURE_RATE[provider];
    const wastedSpend = monthlySpend * failureRate;
    const hitRate = REFUND_HIT_RATE[primaryFailure];
    const recoverable = wastedSpend * hitRate;
    const additionalRecovery = Math.max(0, recoverable - currentRefundsManual);
    const annualisedAdditional = additionalRecovery * 12;
    const proCost = 19;
    const netMonthly = additionalRecovery - proCost;
    const paybackWeeks = additionalRecovery > 0 ? (proCost / additionalRecovery) * 4.33 : 999;
    return {
      failureRate: Math.round(failureRate * 100),
      wastedSpend: Math.round(wastedSpend),
      hitRate: Math.round(hitRate * 100),
      recoverable: Math.round(recoverable),
      additionalRecovery: Math.round(additionalRecovery),
      annualisedAdditional: Math.round(annualisedAdditional),
      netMonthly: Math.round(netMonthly),
      paybackWeeks: paybackWeeks > 4 ? '>1 month' : `${paybackWeeks.toFixed(1)} weeks`,
      paysBack: netMonthly > 0,
    };
  }, [monthlySpend, provider, primaryFailure, currentRefundsManual]);

  return (
    <main className="min-h-screen py-20 px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToCalcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbCalcSchema) }} />
      <div className="max-w-3xl mx-auto">

        <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-ink-secondary transition-colors">Tools</Link>
          <span className="mx-2">/</span>
          <span className="text-ink-primary">Credit Recovery Calculator</span>
        </nav>

        <div className="mb-10">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
            Free tool · No signup
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink-primary mb-4 leading-tight tracking-tight">
            How much are you wasting on failed generations?
          </h1>
          <p className="text-ink-secondary leading-relaxed">
            Estimate the dollar value of credits burned on failed generations each month, and the
            <em> maximum potential</em> goodwill credits you might recover if a support agent
            discretionarily grants them. Most platforms&apos; published policies only refund hard
            generation errors — output-quality failures are case-by-case.
          </p>
        </div>

        {/* Honesty disclaimer */}
        <div className="bg-neon-amber/5 border border-neon-amber/30 rounded-2xl p-5 mb-6 text-sm">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-amber uppercase mb-2">
            Important · Read first
          </p>
          <p className="text-ink-secondary leading-relaxed">
            Runway, Luma, OpenAI, Veo and most other platforms <strong>do not guarantee credit
            refunds for output-quality failures</strong>. Their ToS typically state that credits
            are consumed once a generation completes — even if the result is unusable. The
            &quot;recovery&quot; estimate below assumes a support agent grants discretionary goodwill
            credits, which happens at very different rates depending on the platform, the agent,
            your account history, and how clearly you document the failure. <strong>Treat this
            as an upper-bound estimate, not a guarantee.</strong>
          </p>
        </div>

        {/* Calculator inputs */}
        <div className="bg-elevated border border-border rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-ink-primary mb-5">Your inputs</h2>

          <div className="space-y-5">
            {/* Monthly spend */}
            <div>
              <label htmlFor="spend" className="text-sm font-mono text-ink-muted uppercase tracking-wider mb-2 block">
                Monthly AI video spend (USD)
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="spend"
                  type="range"
                  min={20}
                  max={5000}
                  step={20}
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="flex-1 accent-neon-green"
                />
                <input
                  type="number"
                  min={0}
                  step={20}
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value) || 0)}
                  className="w-28 bg-surface border border-border rounded-lg px-3 py-2 text-ink-primary font-mono text-right"
                />
              </div>
              <p className="text-xs text-ink-muted mt-1">Slide to ~$5,000 max; type any value for higher.</p>
            </div>

            {/* Provider */}
            <div>
              <label htmlFor="provider" className="text-sm font-mono text-ink-muted uppercase tracking-wider mb-2 block">
                Primary provider
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
            </div>

            {/* Primary failure mode */}
            <div>
              <label htmlFor="failure" className="text-sm font-mono text-ink-muted uppercase tracking-wider mb-2 block">
                Most common failure mode you see
              </label>
              <select
                id="failure"
                value={primaryFailure}
                onChange={(e) => setPrimaryFailure(e.target.value as PrimaryFailure)}
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-ink-primary"
              >
                {(Object.keys(FAILURE_LABELS) as PrimaryFailure[]).map((f) => (
                  <option key={f} value={f}>{FAILURE_LABELS[f]}</option>
                ))}
              </select>
            </div>

            {/* Already-recovered manual */}
            <div>
              <label htmlFor="manual" className="text-sm font-mono text-ink-muted uppercase tracking-wider mb-2 block">
                Already recovering manually (per month, $)
              </label>
              <input
                id="manual"
                type="number"
                min={0}
                step={10}
                value={currentRefundsManual}
                onChange={(e) => setCurrentRefundsManual(Number(e.target.value) || 0)}
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-ink-primary font-mono"
              />
              <p className="text-xs text-ink-muted mt-1">If you already file some refund tickets manually, enter your typical monthly recovery.</p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-neon-green/5 border border-neon-green/30 rounded-2xl p-6 mb-6">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-4">
            Maximum potential recovery (if granted)
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Per month</p>
              <p className="text-4xl font-bold text-neon-green">${calc.additionalRecovery}</p>
            </div>
            <div>
              <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Annualised</p>
              <p className="text-4xl font-bold text-ink-primary">${calc.annualisedAdditional.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-neon-green/20 text-sm">
            <div>
              <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Industry failure rate</p>
              <p className="text-ink-primary font-mono font-bold">{calc.failureRate}% on first pass</p>
            </div>
            <div>
              <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Goodwill grant rate (observed)</p>
              <p className="text-ink-primary font-mono font-bold">~{calc.hitRate}% — varies widely</p>
            </div>
            <div>
              <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Wasted spend/mo</p>
              <p className="text-ink-primary font-mono font-bold">${calc.wastedSpend}</p>
            </div>
          </div>
        </div>

        {/* Pro math */}
        <div className="bg-elevated border border-border rounded-2xl p-6 mb-10">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-4">
            AVA Pro math
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-secondary">Additional monthly recovery</span>
              <span className="font-mono text-neon-green">+${calc.additionalRecovery}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-secondary">AVA Pro subscription</span>
              <span className="font-mono text-ink-secondary">-$19</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border">
              <span className="text-ink-primary font-bold">Net monthly</span>
              <span className={`font-mono font-bold ${calc.paysBack ? 'text-neon-green' : 'text-neon-amber'}`}>
                {calc.netMonthly >= 0 ? `+$${calc.netMonthly}` : `-$${Math.abs(calc.netMonthly)}`}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-ink-muted">Payback time</span>
              <span className="font-mono text-ink-muted">{calc.paybackWeeks}</span>
            </div>
          </div>

          {!calc.paysBack && (
            <p className="text-xs text-ink-muted mt-4 italic">
              At your current spend, the free tier covers it — Pro doesn&apos;t pay back yet.
              Free tier still drafts your refund emails automatically.
            </p>
          )}
        </div>

        {/* Lead capture */}
        <div className="mb-10">
          <LeadCaptureForm
            source="credit-calculator"
            metadata={{
              monthlySpend,
              provider,
              primaryFailure,
              estimatedMonthlyRecovery: calc.additionalRecovery,
              estimatedAnnualised: calc.annualisedAdditional,
            }}
            heading={`Get notified when AVA Pro is live + grab the 30% discount${calc.additionalRecovery > 0 ? ` (save another $${Math.round(calc.additionalRecovery * 0.3)} on your first year)` : ''}`}
            blurb="AVA Pro pays back the calculator estimate in week 1 for most users. Drop your email — one notification on launch day with a 30% lifetime discount code. No marketing list. No spam."
          />
        </div>

        {/* CTA */}
        <div className="bg-surface border border-neon-green/20 rounded-2xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold text-ink-primary mb-3">
            Start with the free Chrome extension
          </h2>
          <p className="text-ink-secondary text-sm mb-6 max-w-md mx-auto">
            Free tier covers the auditor, refund-email drafter, and seed library — no upgrade needed
            for the math above to work. Pro adds cross-model A/B routing if you generate &gt; 100 clips/month.
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
              href="/case-studies"
              className="inline-flex items-center justify-center gap-2 bg-elevated hover:bg-elevated/80 border border-border text-ink-secondary font-mono font-semibold px-6 py-3 rounded-xl transition-all text-sm"
            >
              Read case studies
            </Link>
          </div>
        </div>

        {/* Methodology */}
        <section className="bg-elevated border border-border rounded-2xl p-8 text-sm">
          <h2 className="text-lg font-bold text-ink-primary mb-3">How this calculator works</h2>
          <ul className="space-y-2 text-ink-secondary leading-relaxed">
            <li>
              <strong>Industry failure rate</strong> is based on AVA&apos;s classifier output across audited
              generations per provider. Numbers vary by use case but the band (28-38%) is consistent
              with independent measurements.
            </li>
            <li>
              <strong>Goodwill grant rate</strong> reflects the observed rate at which support agents
              discretionarily issue goodwill credits when a ticket is filed with a Generation ID,
              technical failure-mode label, and timestamped screenshot. This is <em>not</em> a published
              refund policy — it&apos;s case-by-case discretion. Outcomes range from 0% to ~80% depending on
              platform, agent, account history, and documentation quality.
            </li>
            <li>
              <strong>Wasted spend</strong> = monthly spend × failure rate. This is the total dollar value of
              your failed generations — the theoretical upper bound on what could be recovered.
            </li>
            <li>
              <strong>Recoverable</strong> = wasted spend × goodwill grant rate. An upper-bound estimate
              of what a heavy ticketer might recover via goodwill credits — not a guarantee.
            </li>
            <li>
              <strong>Additional recovery</strong> subtracts what you&apos;re already recovering manually, so the
              number represents the potential lift on top of your current process.
            </li>
          </ul>
          <p className="text-xs text-ink-muted mt-4 italic">
            Estimates only. The goodwill-credit column is an observed input to the effective-cost
            calc — not a recovery promise. AVA&apos;s primary value is in <em>preventing</em> wasted
            credits (better prompts, A/B routing, failure-mode tagging at pre-purchase) — not in
            post-generation reimbursement.
          </p>
        </section>

      </div>
    </main>
  );
}
