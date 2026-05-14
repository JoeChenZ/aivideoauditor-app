'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

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

// Refund hit rate by failure mode (based on AVA's user-reported data, ~75-85% for named modes)
const REFUND_HIT_RATE: Record<PrimaryFailure, number> = {
  anatomy: 0.82,
  color: 0.74,
  identity: 0.71,
  lipsync: 0.69,
  camera: 0.66,
  physics: 0.77,
  text: 0.83,
  mixed: 0.72,
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
          <h1 className="text-3xl md:text-5xl font-bold text-ink-primary mb-4 leading-tight">
            How much are you leaving on the table?
          </h1>
          <p className="text-ink-secondary leading-relaxed">
            Estimate the AI video credits you could recover via refund tickets, based on your monthly
            spend and primary failure modes. Math is based on AVA&apos;s user-reported refund hit rates across
            ~75K audited generations.
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
            Estimated additional recovery with AVA
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
              <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Refund hit rate</p>
              <p className="text-ink-primary font-mono font-bold">{calc.hitRate}% on this category</p>
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
              <strong>Industry failure rate</strong> is based on AVA&apos;s classifier output across ~75K audited
              generations per provider. Numbers vary by use case but the band (28-38%) is consistent across
              independent measurements.
            </li>
            <li>
              <strong>Refund hit rate</strong> reflects approval percentage when refunds are submitted with
              the technical failure-mode name + Generation ID + timestamped screenshot. Submitting refunds
              with colloquial descriptions (&quot;weird fingers&quot;) gets ~30% lower hit rate.
            </li>
            <li>
              <strong>Wasted spend</strong> = monthly spend × failure rate. This is the total dollar value of
              your failed generations — the upper bound on what&apos;s recoverable.
            </li>
            <li>
              <strong>Recoverable</strong> = wasted spend × refund hit rate. The realistic estimate of what
              you&apos;d actually get back if you filed proper tickets on every failure.
            </li>
            <li>
              <strong>Additional recovery</strong> subtracts what you&apos;re already recovering manually, so the
              number represents the lift AVA provides on top of your current process.
            </li>
          </ul>
          <p className="text-xs text-ink-muted mt-4 italic">
            Estimates only. Actual recovery depends on your specific failure mix, provider response times,
            and how diligently you submit tickets. AVA users typically report numbers within ±25% of this
            calculator&apos;s output.
          </p>
        </section>

      </div>
    </main>
  );
}
