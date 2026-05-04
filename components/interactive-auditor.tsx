'use client';

import { useState, useEffect, useRef } from 'react';

/* ── L1 Rules (mirrors extension/src/modules/l1-engine.js) ─────────────── */
interface ParamCondition { gte?: number; lte?: number; }
interface Rule {
  id: string;
  keywords_a: string[];
  keywords_b: string[];
  params_check: Record<string, ParamCondition>;
  message: string;
  risk: 'low' | 'medium' | 'high';
}

const LUMA_RULES: Rule[] = [
  {
    id: 'high-motion-low-fps',
    keywords_a: ['fast motion','high speed','rapid','quick','running','chase','sprint','rush','speeding'],
    keywords_b: [],
    params_check: { motion_strength: { gte: 8 }, fps: { lte: 16 } },
    message: 'High motion + low FPS → severe motion blur artifacts. Raise FPS to 24+.',
    risk: 'high',
  },
  {
    id: 'complex-physics-long',
    keywords_a: ['falling','explosion','water','fire','cloth','hair','crowd','liquid','smoke','rain'],
    keywords_b: [],
    params_check: { duration: { gte: 10 } },
    message: 'Complex physics over 10s: Luma degrades past 5s. Split into 2 × 5s clips.',
    risk: 'high',
  },
  {
    id: 'multiple-subjects-camera',
    keywords_a: ['two people','multiple','crowd','group','people','couple','trio'],
    keywords_b: ['camera pan','zoom','dolly','tracking shot','panning','sweeping','crane'],
    params_check: {},
    message: 'Multiple subjects + camera movement → high limb artifact risk.',
    risk: 'medium',
  },
  {
    id: 'text-in-frame',
    keywords_a: ['text','sign','letters','words','label','caption','title','writing','font','banner'],
    keywords_b: [],
    params_check: {},
    message: 'Luma cannot reliably render readable text. Expect garbled, melting letters.',
    risk: 'high',
  },
  {
    id: 'hands-closeup',
    keywords_a: ['hands','fingers','hand','finger','grip','holding','typing','clapping'],
    keywords_b: ['closeup','close-up','close up','macro','extreme close','detailed'],
    params_check: {},
    message: 'Hands in closeup: finger-count hallucination is a documented Luma failure mode.',
    risk: 'high',
  },
  {
    id: 'face-extreme-motion',
    keywords_a: ['face','person','man','woman','human','portrait','head'],
    keywords_b: ['fast','rapid','spinning','shaking','blur','whip'],
    params_check: { motion_strength: { gte: 7 } },
    message: 'Human face + high motion → facial distortion and uncanny valley artifacts.',
    risk: 'medium',
  },
];

const RUNWAY_RULES: Rule[] = [
  {
    id: 'text-rendering',
    keywords_a: ['text','words','letters','sign','label','caption','title','subtitle','writing','font'],
    keywords_b: [],
    params_check: {},
    message: 'Runway cannot reliably render readable text. Add text in post with a compositing tool.',
    risk: 'high',
  },
  {
    id: 'complex-physics-long',
    keywords_a: ['falling','explosion','water','fire','cloth','hair','crowd','smoke','liquid'],
    keywords_b: [],
    params_check: { duration: { gte: 8 } },
    message: 'Complex physics over 8s: Runway degrades past 5s. Split into 2 clips.',
    risk: 'high',
  },
  {
    id: 'rapid-scene-changes',
    keywords_a: ['cut to','then','suddenly','transitions to','followed by','next scene','meanwhile'],
    keywords_b: [],
    params_check: {},
    message: 'Multiple scene transitions in one prompt → incoherent cuts. Generate each scene separately.',
    risk: 'high',
  },
  {
    id: 'many-people',
    keywords_a: ['crowd','group of people','many people','several people','audience','team'],
    keywords_b: [],
    params_check: {},
    message: 'Crowds cause face/limb artifacts. Runway works best with 1–2 subjects max.',
    risk: 'medium',
  },
  {
    id: 'precise-hand-detail',
    keywords_a: ['hands','fingers','typing','playing piano','writing','gesturing'],
    keywords_b: [],
    params_check: {},
    message: "Hand/finger detail is unreliable in Runway. Specify 'hands out of frame' if not needed.",
    risk: 'medium',
  },
  {
    id: 'fast-motion-short',
    keywords_a: ['fast','speeding','racing','blurring','rapid','quick pan','whip pan'],
    keywords_b: [],
    params_check: { duration: { lte: 4 } },
    message: 'Fast motion on short clips can cause flickering artifacts. Try 5s duration.',
    risk: 'low',
  },
];

const PLATFORM_RULES: Record<string, Rule[]> = { luma: LUMA_RULES, runway: RUNWAY_RULES };
const RISK_ORDER = { low: 0, medium: 1, high: 2 };

function checkParam(value: number | undefined, condition: ParamCondition): boolean {
  if (value === undefined) return false;
  if (condition.gte !== undefined && value < condition.gte) return false;
  if (condition.lte !== undefined && value > condition.lte) return false;
  return true;
}

function ruleMatches(rule: Rule, prompt: string, params: Record<string, number>): boolean {
  const lower = prompt.toLowerCase();
  const aMatch = rule.keywords_a.length === 0 || rule.keywords_a.some(kw => lower.includes(kw));
  if (!aMatch) return false;
  const bMatch = rule.keywords_b.length === 0 || rule.keywords_b.some(kw => lower.includes(kw));
  if (!bMatch) return false;
  for (const [key, condition] of Object.entries(rule.params_check)) {
    const value = params[key];
    if (value === undefined) continue;
    if (!checkParam(value, condition)) return false;
  }
  return true;
}

function runL1(prompt: string, params: Record<string, number>, platform: string) {
  const rules = PLATFORM_RULES[platform] ?? LUMA_RULES;
  const warnings: Array<{ message: string; risk: 'low' | 'medium' | 'high' }> = [];
  let topRisk: 'low' | 'medium' | 'high' = 'low';
  for (const rule of rules) {
    if (ruleMatches(rule, prompt, params)) {
      warnings.push({ message: rule.message, risk: rule.risk });
      if (RISK_ORDER[rule.risk] > RISK_ORDER[topRisk]) topRisk = rule.risk;
    }
  }
  return { warnings, riskLevel: topRisk };
}

/* ── Component ─────────────────────────────────────────────────────────── */
const RISK_STYLES = {
  low:    { badge: 'bg-neon-green/10 text-neon-green border-neon-green/30',    bar: 'bg-neon-green',    label: 'LOW RISK',    barW: 'w-1/4' },
  medium: { badge: 'bg-neon-amber/10 text-neon-amber border-neon-amber/30',    bar: 'bg-neon-amber',    label: 'MEDIUM RISK', barW: 'w-2/4' },
  high:   { badge: 'bg-neon-red/10   text-neon-red   border-neon-red/30',      bar: 'bg-neon-red',      label: 'HIGH RISK',   barW: 'w-full' },
};

const SAMPLE_PROMPTS: Record<string, string> = {
  luma:   'A crowd of people running through a city street with a camera zoom following the action, text overlay reading "THE CHASE" at the top.',
  runway: 'Multiple people falling into water with splashing, then cut to a close-up of a hand holding a burning torch, subtitle says "The End".',
};

export default function InteractiveAuditor() {
  const [platform, setPlatform]       = useState<'luma' | 'runway'>('luma');
  const [prompt, setPrompt]           = useState('');
  const [motionStrength, setMotion]   = useState(5);
  const [fps, setFps]                 = useState(24);
  const [duration, setDuration]       = useState(5);
  const [result, setResult]           = useState<ReturnType<typeof runL1> | null>(null);
  const [showUpsell, setShowUpsell]   = useState(false);
  const [typed, setTyped]             = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!prompt.trim()) { setResult(null); setShowUpsell(false); return; }
    const params = { motion_strength: motionStrength, fps, duration, seconds: duration };
    const r = runL1(prompt, params, platform);
    setResult(r);
    setShowUpsell(r.riskLevel === 'high');
  }, [prompt, motionStrength, fps, duration, platform]);

  const loadSample = () => {
    setPrompt(SAMPLE_PROMPTS[platform]);
    setTyped(true);
  };

  const risk = result?.riskLevel ?? 'low';
  const rs = RISK_STYLES[result ? risk : 'low'];

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Platform Tabs */}
      <div className="flex gap-1 mb-6 bg-elevated border border-border rounded-xl p-1 w-fit">
        {(['luma', 'runway'] as const).map(p => (
          <button
            key={p}
            onClick={() => { setPlatform(p); setPrompt(''); setResult(null); setShowUpsell(false); }}
            className={`px-5 py-2 rounded-lg text-sm font-mono font-semibold transition-all ${
              platform === p
                ? 'bg-neon-purple/20 border border-neon-purple/40 text-neon-purple'
                : 'text-ink-muted hover:text-ink-secondary'
            }`}
          >
            {p.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* ── Input Panel ── */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-elevated">
            <span className="font-mono text-xs text-ink-muted tracking-widest uppercase">Prompt Input</span>
            <button
              onClick={loadSample}
              className="text-xs text-neon-purple/70 hover:text-neon-purple transition-colors font-mono"
            >
              load sample →
            </button>
          </div>

          <div className="p-5 space-y-5">
            <textarea
              value={prompt}
              onChange={e => { setPrompt(e.target.value); setTyped(true); }}
              placeholder={`Paste your ${platform === 'luma' ? 'Luma Dream Machine' : 'Runway Gen-4'} prompt here…`}
              rows={5}
              className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-sm text-ink-primary placeholder:text-ink-muted font-mono resize-none focus:outline-none focus:border-neon-purple/40 transition-colors"
            />

            {/* Params */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-mono text-ink-muted tracking-wider uppercase">Motion Strength</label>
                  <span className="text-xs font-mono text-neon-purple">{motionStrength}</span>
                </div>
                <input
                  type="range" min={1} max={10} value={motionStrength}
                  onChange={e => setMotion(Number(e.target.value))}
                  className="w-full accent-neon-purple h-1.5 rounded-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-mono text-ink-muted tracking-wider uppercase">Duration (seconds)</label>
                  <span className="text-xs font-mono text-neon-purple">{duration}s</span>
                </div>
                <input
                  type="range" min={2} max={15} value={duration}
                  onChange={e => setDuration(Number(e.target.value))}
                  className="w-full accent-neon-purple h-1.5 rounded-full"
                />
              </div>

              {platform === 'luma' && (
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-ink-muted tracking-wider uppercase">FPS</label>
                  <select
                    value={fps}
                    onChange={e => setFps(Number(e.target.value))}
                    className="bg-elevated border border-border rounded-lg px-3 py-1.5 text-xs font-mono text-ink-primary focus:outline-none focus:border-neon-purple/40"
                  >
                    {[8, 12, 16, 24, 30].map(f => <option key={f} value={f}>{f} fps</option>)}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Output Panel ── */}
        <div ref={outputRef} className="bg-surface border border-border rounded-2xl overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-elevated">
            <span className="font-mono text-xs text-ink-muted tracking-widest uppercase">L1 Diagnostic Output</span>
            {result && (
              <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${rs.badge} transition-all`}>
                {rs.label}
              </span>
            )}
          </div>

          <div className="flex-1 p-5 flex flex-col gap-4">
            {!typed && (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-ink-muted text-sm font-mono text-center">
                  Paste a prompt to start diagnosis<br />
                  <span className="text-ink-muted/50 text-xs">← or load a sample</span>
                </p>
              </div>
            )}

            {typed && result && (
              <>
                {/* Risk bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-ink-muted">
                    <span>RISK LEVEL</span>
                    <span className={`font-bold ${risk === 'high' ? 'text-neon-red' : risk === 'medium' ? 'text-neon-amber' : 'text-neon-green'}`}>
                      {risk.toUpperCase()}
                    </span>
                  </div>
                  <div className="h-1.5 bg-elevated rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${rs.bar} ${rs.barW}`} />
                  </div>
                </div>

                {/* Warnings */}
                {result.warnings.length === 0 ? (
                  <div className="flex items-start gap-3 bg-neon-green/5 border border-neon-green/20 rounded-xl p-4">
                    <span className="text-neon-green text-lg mt-0.5">✓</span>
                    <div>
                      <p className="text-neon-green text-sm font-mono font-semibold">No L1 conflicts detected</p>
                      <p className="text-ink-muted text-xs mt-1">This prompt passes heuristic checks. Install the extension for VLM visual analysis.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5 flex-1">
                    {result.warnings.map((w, i) => {
                      const ws = RISK_STYLES[w.risk];
                      return (
                        <div key={i} className={`flex items-start gap-3 bg-elevated border rounded-xl p-3.5 ${ws.badge}`}>
                          <span className="text-sm mt-0.5 shrink-0">
                            {w.risk === 'high' ? '⚠' : w.risk === 'medium' ? '▲' : '◆'}
                          </span>
                          <p className="text-xs font-mono leading-relaxed">{w.message}</p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Upsell */}
                {showUpsell && (
                  <div className="mt-auto bg-neon-purple/5 border border-neon-purple/30 rounded-xl p-4 animate-fade-in">
                    <p className="text-xs font-mono text-neon-purple font-bold mb-1 tracking-wider uppercase">L1 only shows heuristic risks</p>
                    <p className="text-xs text-ink-secondary mb-3">Install the extension to unlock VLM visual diagnosis, real-time interception, and one-click refund letters.</p>
                    <a
                      href="https://chromewebstore.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green text-xs font-mono font-bold px-4 py-2 rounded-lg transition-all"
                    >
                      Add to Chrome — Free →
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
