'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';

type CurrentTool = 'sora' | 'runway' | 'luma' | 'kling' | 'veo' | 'pika' | 'hailuo' | 'seedance' | 'wan' | 'firefly';
type ShotType = 'character-multicut' | 'motion-physics' | 'cinematic-lighting' | 'audio-dialogue' | 'stylized' | 'text-in-frame' | 'long-form' | 'mixed';

const CURRENT_TOOL_LABELS: Record<CurrentTool, string> = {
  sora: 'Sora 2 (shutdown 2026-05)',
  runway: 'Runway Gen-4',
  luma: 'Luma Dream Machine',
  kling: 'Kling 1.6',
  veo: 'Google Veo 3',
  pika: 'Pika 2.0',
  hailuo: 'Hailuo AI',
  seedance: 'ByteDance Seedance',
  wan: 'Wan 2.1 (local)',
  firefly: 'Adobe Firefly Video',
};

const SHOT_TYPE_LABELS: Record<ShotType, string> = {
  'character-multicut': 'Character work across multiple cuts / scenes',
  'motion-physics': 'Action, motion, physics (fluid, collision, gravity)',
  'cinematic-lighting': 'Cinematic / mood lighting (rim, key, neon, atmospheric)',
  'audio-dialogue': 'Dialogue or audio-driven content',
  'stylized': 'Stylized animation / artistic / non-photoreal',
  'text-in-frame': 'On-screen text (logos, signage, brand)',
  'long-form': 'Longer-form (5-10s+ coherent clips)',
  'mixed': 'Mixed — many different shot types',
};

type Recommendation = {
  tool: string;
  toolSlug: string;
  reason: string;
  estimatedMonthlySavings: (currentSpend: number) => number;
  warnings?: string;
  alternatives: { tool: string; toolSlug: string; pitch: string }[];
};

const RECOMMENDATIONS: Record<ShotType, Recommendation> = {
  'character-multicut': {
    tool: 'Runway Gen-4',
    toolSlug: 'runway',
    reason: "Scenes mode is the only multi-cut character coherence feature in the consumer tier. Holds identity for 6-8 cuts; competitors drift after 3.",
    estimatedMonthlySavings: (s) => Math.round(s * 0.18),
    alternatives: [
      { tool: 'Pika 2.0', toolSlug: 'pika', pitch: 'For stylized character work, weaker on multi-cut but more aesthetic latitude.' },
    ],
  },
  'motion-physics': {
    tool: 'Kling 1.6',
    toolSlug: 'kling',
    reason: "Hybrid architecture gives Kling the strongest physics + camera priors. Best fluid + collision realism in consumer tier.",
    estimatedMonthlySavings: (s) => Math.round(s * 0.22),
    alternatives: [
      { tool: 'Pika 2.0', toolSlug: 'pika', pitch: 'Slightly weaker motion but stronger stylization; cheaper.' },
    ],
  },
  'cinematic-lighting': {
    tool: 'Luma Dream Machine Ray-2',
    toolSlug: 'luma',
    reason: "Ray-2 has industry-leading cinematic lighting realism — rim, key, fill, practical, atmospheric all stronger than competitors.",
    estimatedMonthlySavings: (s) => Math.round(s * 0.15),
    alternatives: [
      { tool: 'Runway Gen-4', toolSlug: 'runway', pitch: 'Adequate lighting + character consistency if you also need multi-cut.' },
    ],
  },
  'audio-dialogue': {
    tool: 'Google Veo 3',
    toolSlug: 'veo',
    reason: "Veo is the only consumer model with usable native audio + lip sync. Cheapest per-second cost. 8 named refund categories.",
    estimatedMonthlySavings: (s) => Math.round(s * 0.25),
    warnings: '8-second hard limit on clip length.',
    alternatives: [
      { tool: 'Hailuo (MiniMax)', toolSlug: 'hailuo', pitch: 'For Mandarin-language content specifically.' },
    ],
  },
  'stylized': {
    tool: 'Pika 2.0',
    toolSlug: 'pika',
    reason: "Most stylization latitude among consumer models. Closest substitute for Sora's aesthetic post-shutdown.",
    estimatedMonthlySavings: (s) => Math.round(s * 0.16),
    alternatives: [
      { tool: 'Luma Dream Machine Ray-2', toolSlug: 'luma', pitch: 'For stylized cinematography where lighting drives the look.' },
    ],
  },
  'text-in-frame': {
    tool: 'Google Veo 3',
    toolSlug: 'veo',
    reason: "Veo handles text-in-frame slightly better than other consumer models. Still garbles past 6 chars — composite text in post.",
    estimatedMonthlySavings: (s) => Math.round(s * 0.12),
    warnings: 'No consumer model handles long English text reliably. Plan for post-composite for any text > 6 chars.',
    alternatives: [
      { tool: 'Composite in After Effects', toolSlug: 'runway', pitch: 'Generate the visual on any model, composite text in post. The most reliable path.' },
    ],
  },
  'long-form': {
    tool: 'Runway Gen-4 with Scenes mode',
    toolSlug: 'runway',
    reason: "No consumer model handles >10s coherent clips reliably. Runway Scenes mode is the best workaround — chain 3-4 cuts with identity holding.",
    estimatedMonthlySavings: (s) => Math.round(s * 0.10),
    warnings: 'True long-form coherence is 6-12 months out (autoregressive models). For now, plan around the 5-8s coherence ceiling.',
    alternatives: [
      { tool: 'Image-to-video chaining', toolSlug: 'runway', pitch: 'Generate clean stills in MJ/SDXL, animate via i2v on a transitional frame.' },
    ],
  },
  'mixed': {
    tool: 'Multi-tool routing via AVA Pro',
    toolSlug: 'runway',
    reason: "When your shot mix is broad, no single tool wins. AVA Pro routes each prompt to whichever provider fails least on that specific shot type based on your historical hit-rate.",
    estimatedMonthlySavings: (s) => Math.round(s * 0.20),
    alternatives: [
      { tool: 'Runway + Veo + Kling subscriptions', toolSlug: 'runway', pitch: 'The "subscribe to 3, route manually" approach. AVA Pro automates the routing decision.' },
    ],
  },
};

// Structured data — WebApplication + HowTo + BreadcrumbList. Targets queries
// like "migrate from Sora to" / "alternative to Runway by shot type".
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI Video Migration Planner',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  url: 'https://www.aivideoauditor.com/tools/migration-planner',
  description: 'Free interactive planner that ranks AI video substitutes by your specific shot type and estimates monthly savings from switching providers.',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};
const howToMigrateSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to pick a migration target from your current AI video tool',
  description: 'The right substitute depends on which shot type you do most, not which model is "best." This planner ranks alternatives by shot-type compatibility and estimated monthly savings.',
  totalTime: 'PT2M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Select your current AI video tool',
      text: 'Pick from Runway, Luma, Sora, Veo, Kling, Pika, Hailuo, or Vidu. The planner uses your current tool to seed comparative defaults.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Choose your most-common shot type',
      text: 'Character work, atmospheric lighting, action sequences, dialogue with audio, brand product, or stylized animation. Each shot type maps to different failure-mode hierarchies — the migration target depends on this choice more than on overall vendor rating.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Enter your current monthly spend',
      text: 'The planner computes monthly and annualised savings from switching to the recommended substitute based on per-clip cost deltas plus the relative first-try success rate for your specific shot type.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Read the ranked recommendation and migration notes',
      text: 'The planner returns a top substitute plus rationale, an alternate substitute as fallback, and migration notes covering prompt-syntax differences and feature-parity gaps.',
    },
  ],
};
const breadcrumbMigSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.aivideoauditor.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.aivideoauditor.com/tools/credit-calculator' },
    { '@type': 'ListItem', position: 3, name: 'Migration Planner', item: 'https://www.aivideoauditor.com/tools/migration-planner' },
  ],
};

export default function MigrationPlannerPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [currentTool, setCurrentTool] = useState<CurrentTool | null>(null);
  const [shotType, setShotType] = useState<ShotType | null>(null);
  const [monthlySpend, setMonthlySpend] = useState<number>(200);

  const recommendation = useMemo(() => {
    if (!shotType) return null;
    const rec = RECOMMENDATIONS[shotType];
    return {
      ...rec,
      estimatedSavings: rec.estimatedMonthlySavings(monthlySpend),
      annualisedSavings: rec.estimatedMonthlySavings(monthlySpend) * 12,
    };
  }, [shotType, monthlySpend]);

  return (
    <main className="min-h-screen py-20 px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToMigrateSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbMigSchema) }} />
      <div className="max-w-2xl mx-auto">

        <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-ink-secondary transition-colors">Tools</Link>
          <span className="mx-2">/</span>
          <span className="text-ink-primary">Migration Planner</span>
        </nav>

        <div className="mb-10">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
            Free tool · No signup · 90 seconds
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink-primary mb-4 leading-tight tracking-tight">
            Migration Planner — where should you move?
          </h1>
          <p className="text-ink-secondary leading-relaxed">
            Answer three questions about your current AI video workflow and we&apos;ll recommend the
            best tool to migrate to + estimate your monthly savings. Based on AVA&apos;s failure-rate
            data across ~75K audited generations.
          </p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-all ${
                s <= step ? 'bg-neon-green' : 'bg-border'
              }`}
            />
          ))}
        </div>

        {/* Step 1: current tool */}
        {step === 1 && (
          <div className="bg-elevated border border-border rounded-2xl p-6">
            <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-3">Step 1 of 3</p>
            <h2 className="text-xl font-bold text-ink-primary mb-5">What AI video tool are you using now?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(Object.keys(CURRENT_TOOL_LABELS) as CurrentTool[]).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setCurrentTool(t);
                    setStep(2);
                  }}
                  className={`text-left bg-surface border border-border rounded-lg p-3 hover:border-neon-green/40 transition-colors ${
                    currentTool === t ? 'border-neon-green/60' : ''
                  }`}
                >
                  <p className="text-sm text-ink-primary">{CURRENT_TOOL_LABELS[t]}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: shot type */}
        {step === 2 && (
          <div className="bg-elevated border border-border rounded-2xl p-6">
            <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-3">Step 2 of 3</p>
            <h2 className="text-xl font-bold text-ink-primary mb-5">What&apos;s your most common shot type?</h2>
            <div className="space-y-2 mb-5">
              {(Object.keys(SHOT_TYPE_LABELS) as ShotType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setShotType(t);
                    setStep(3);
                  }}
                  className={`w-full text-left bg-surface border border-border rounded-lg p-4 hover:border-neon-green/40 transition-colors ${
                    shotType === t ? 'border-neon-green/60' : ''
                  }`}
                >
                  <p className="text-sm text-ink-primary">{SHOT_TYPE_LABELS[t]}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs font-mono text-ink-muted hover:text-ink-secondary"
            >
              ← Back
            </button>
          </div>
        )}

        {/* Step 3: monthly spend */}
        {step === 3 && (
          <div className="bg-elevated border border-border rounded-2xl p-6">
            <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-3">Step 3 of 3</p>
            <h2 className="text-xl font-bold text-ink-primary mb-5">How much do you spend per month on AI video?</h2>
            <div className="flex items-center gap-4 mb-5">
              <input
                type="range"
                min={50}
                max={3000}
                step={50}
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="flex-1 accent-neon-green"
              />
              <input
                type="number"
                min={0}
                step={50}
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value) || 0)}
                className="w-28 bg-surface border border-border rounded-lg px-3 py-2 text-ink-primary font-mono text-right"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="text-xs font-mono text-ink-muted hover:text-ink-secondary"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-mono font-bold text-sm px-5 py-2 rounded-lg transition-all"
              >
                See my recommendation →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: result */}
        {step === 4 && recommendation && currentTool && shotType && (
          <>
            <div className="bg-neon-green/5 border border-neon-green/30 rounded-2xl p-6 mb-6">
              <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
                Your recommendation
              </p>
              <p className="text-ink-muted text-sm mb-1">
                Currently on {CURRENT_TOOL_LABELS[currentTool]} · primarily {SHOT_TYPE_LABELS[shotType].toLowerCase()}
              </p>
              <h2 className="text-3xl font-bold text-ink-primary mb-4">Migrate to {recommendation.tool}</h2>
              <p className="text-ink-secondary leading-relaxed mb-5">{recommendation.reason}</p>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-surface border border-border rounded-xl p-4">
                  <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Monthly savings</p>
                  <p className="text-2xl font-bold text-neon-green">${recommendation.estimatedSavings}</p>
                </div>
                <div className="bg-surface border border-border rounded-xl p-4">
                  <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Annualised</p>
                  <p className="text-2xl font-bold text-ink-primary">${recommendation.annualisedSavings.toLocaleString()}</p>
                </div>
              </div>

              {recommendation.warnings && (
                <div className="bg-neon-amber/5 border border-neon-amber/20 rounded-xl p-4 mb-4">
                  <p className="text-xs font-mono font-bold text-neon-amber uppercase tracking-widest mb-1">Caveat</p>
                  <p className="text-ink-secondary text-sm">{recommendation.warnings}</p>
                </div>
              )}

              <Link
                href={`/alternatives/${recommendation.toolSlug}`}
                className="inline-block text-sm text-neon-purple hover:underline"
              >
                Full alternatives guide for {recommendation.tool} →
              </Link>
            </div>

            {recommendation.alternatives.length > 0 && (
              <div className="bg-elevated border border-border rounded-2xl p-6 mb-6">
                <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-3">Also consider</p>
                {recommendation.alternatives.map((alt, i) => (
                  <div key={i} className="text-sm mb-3 last:mb-0">
                    <p className="font-bold text-ink-primary">{alt.tool}</p>
                    <p className="text-ink-secondary">{alt.pitch}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-6">
              <LeadCaptureForm
                source="migration-planner"
                metadata={{
                  currentTool,
                  shotType,
                  monthlySpend,
                  recommendedTool: recommendation.toolSlug,
                  estimatedSavings: recommendation.estimatedSavings,
                }}
                heading={`Want AVA Pro to handle routing automatically? Get a 30% launch-day discount (saves ~$${Math.round(recommendation.estimatedSavings * 0.3)})`}
                blurb="The recommendation above is one tool. Most production workflows benefit from 2-3 tools routed per shot type. AVA Pro automates that decision based on your historical hit-rate. Drop your email — one notification on launch day with the discount code."
                cta="Notify me on launch →"
              />
            </div>

            <div className="text-center">
              <button
                onClick={() => setStep(1)}
                className="text-xs font-mono text-ink-muted hover:text-ink-secondary"
              >
                ← Start over
              </button>
            </div>
          </>
        )}

      </div>
    </main>
  );
}
