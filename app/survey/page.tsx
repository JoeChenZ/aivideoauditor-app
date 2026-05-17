'use client';

import { useState } from 'react';
import Link from 'next/link';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const PLATFORMS = ['Runway', 'Luma', 'OpenAI Sora', 'Google Veo', 'Kling', 'Pika', 'Hailuo', 'Seedance', 'Other'];
const FAILURE_MODES = [
  'Hand / limb anatomy',
  'Face / identity drift',
  'Color / lighting drift',
  'Lip-sync drift',
  'Camera jitter',
  'Physics violations',
  'Garbled text in frame',
  'Misinterpreted prompt entirely',
  'Style inconsistent with prompt',
  'Other',
];
const FEATURE_OPTIONS = [
  'Pre-generation prompt critique (predicts failure before you generate)',
  'Auto-suggested prompt rewrite (fixes the predicted failure for you)',
  'Cross-model A/B router (sends prompt to 2-3 models, returns the best)',
  'Failure-mode dashboard (tracks your historical waste, finds patterns)',
  'Auto-tagged generation library (organizes what worked, by failure mode avoided)',
];

const DEMO_LOOM_URL = process.env.NEXT_PUBLIC_DEMO_LOOM_URL || '';

export default function SurveyPage() {
  const [state, setState] = useState<SubmitState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState<string[]>([]);
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState<string[]>([]);
  const [q5, setQ5] = useState('');
  const [q6, setQ6] = useState('');
  const [q7, setQ7] = useState('');
  const [q8, setQ8] = useState<string[]>([]);
  const [q8b, setQ8b] = useState('');
  const [q8c, setQ8c] = useState('');
  const [q9a, setQ9a] = useState('');
  const [q9b, setQ9b] = useState('');
  const [q9c, setQ9c] = useState('');
  const [q9d, setQ9d] = useState('');
  const [q10, setQ10] = useState('');
  const [q11, setQ11] = useState('');
  const [q12, setQ12] = useState('');

  const toggleArr = (arr: string[], val: string, max?: number) => {
    if (arr.includes(val)) return arr.filter((x) => x !== val);
    if (max && arr.length >= max) return arr;
    return [...arr, val];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!q1) {
      setErrorMsg('At least answer Q1 so we know your usage level.');
      return;
    }
    if (q1 === "I don't") {
      setErrorMsg('Thanks — this survey is for active AI video users. No data needed from you.');
      return;
    }
    setState('submitting');
    setErrorMsg('');

    const email = q12.trim() || `anonymous-${Date.now()}@survey.local`;
    const payload = {
      email,
      source: 'survey-v2-draft',
      metadata: {
        q1_frequency: q1,
        q2_platforms: q2,
        q3_failure_pct: q3,
        q4_failure_modes: q4,
        q5_monthly_spend: q5,
        q6_what_do_on_fail: q6,
        q7_refund_history: q7,
        q8_top_two_features: q8,
        q8b_least_useful: q8b,
        q8c_refund_letter_side: q8c,
        q9_vw_too_expensive: q9a,
        q9_vw_expensive_but_ok: q9b,
        q9_vw_bargain: q9c,
        q9_vw_too_cheap: q9d,
        q10_preorder: q10,
        q11_open: q11,
        anonymous: !q12.trim(),
      },
    };

    try {
      const res = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Submit failed');
      }
      setState('success');
    } catch (err) {
      setState('error');
      setErrorMsg(err instanceof Error ? err.message : 'Submit failed');
    }
  };

  if (state === 'success') {
    return (
      <main className="min-h-screen py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
            Submitted · Thank you
          </p>
          <h1 className="text-3xl font-bold text-ink-primary mb-4">Got it — appreciate you.</h1>
          <p className="text-ink-secondary mb-8">
            {q10 === 'Yes — send the Stripe link' ? (
              <>You marked &quot;yes&quot; on pre-order. Check your email for the Stripe link within the next hour, or grab it now:</>
            ) : (
              <>Results report will go out to email respondents in ~4 weeks.</>
            )}
          </p>
          {q10 === 'Yes — send the Stripe link' && (
            <Link
              href="/early-access"
              className="inline-flex items-center justify-center gap-2 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-mono font-bold px-6 py-3 rounded-xl transition-all"
            >
              Go to pre-order →
            </Link>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Draft banner — remove when interview phase is complete */}
        <div className="bg-neon-amber/10 border border-neon-amber/40 rounded-xl p-4 mb-8 text-sm">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-amber uppercase mb-1">
            Draft — Internal preview only
          </p>
          <p className="text-ink-secondary">
            This survey is gated on Joe completing 10 user interviews (Phase 0.5). Wording may
            change. Page is noindex&apos;d. Remove this banner before public distribution.
          </p>
        </div>

        <nav className="text-xs font-mono text-ink-muted mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-ink-primary">Survey</span>
        </nav>

        <div className="mb-10">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
            4 minutes · First 50 to complete: 30% lifetime Pro discount
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-ink-primary mb-4 leading-tight">
            How does AI video credit waste affect you?
          </h1>
          <p className="text-ink-secondary text-sm leading-relaxed">
            We&apos;re researching what AI video creators actually need. Your input directly shapes
            what we build next. Results will be shared (anonymized) with everyone who answers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Q1 */}
          <fieldset className="bg-elevated border border-border rounded-2xl p-6">
            <legend className="text-sm font-mono font-bold text-ink-primary mb-3 px-2">
              1. How often do you generate AI video?
            </legend>
            {['Multiple times a day', 'A few times a week', 'A few times a month', 'Tried it once or twice', "I don't"].map((opt) => (
              <label key={opt} className="flex items-center gap-2 py-1 text-sm text-ink-secondary cursor-pointer">
                <input type="radio" name="q1" value={opt} checked={q1 === opt} onChange={(e) => setQ1(e.target.value)} className="accent-neon-green" />
                {opt}
              </label>
            ))}
          </fieldset>

          {/* Q2 */}
          <fieldset className="bg-elevated border border-border rounded-2xl p-6">
            <legend className="text-sm font-mono font-bold text-ink-primary mb-3 px-2">
              2. Which platforms do you use? <span className="text-ink-muted font-normal">(check all)</span>
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {PLATFORMS.map((p) => (
                <label key={p} className="flex items-center gap-2 py-1 text-sm text-ink-secondary cursor-pointer">
                  <input type="checkbox" checked={q2.includes(p)} onChange={() => setQ2(toggleArr(q2, p))} className="accent-neon-green" />
                  {p}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Q3 */}
          <fieldset className="bg-elevated border border-border rounded-2xl p-6">
            <legend className="text-sm font-mono font-bold text-ink-primary mb-3 px-2">
              3. Roughly what % of first-pass generations are unusable?
            </legend>
            {['<10%', '10–25%', '25–50%', '50–75%', '>75%'].map((opt) => (
              <label key={opt} className="flex items-center gap-2 py-1 text-sm text-ink-secondary cursor-pointer">
                <input type="radio" name="q3" value={opt} checked={q3 === opt} onChange={(e) => setQ3(e.target.value)} className="accent-neon-green" />
                {opt}
              </label>
            ))}
          </fieldset>

          {/* Q4 */}
          <fieldset className="bg-elevated border border-border rounded-2xl p-6">
            <legend className="text-sm font-mono font-bold text-ink-primary mb-3 px-2">
              4. When a generation fails, what&apos;s most often wrong? <span className="text-ink-muted font-normal">(pick top 2)</span>
            </legend>
            {FAILURE_MODES.map((m) => (
              <label key={m} className="flex items-center gap-2 py-1 text-sm text-ink-secondary cursor-pointer">
                <input type="checkbox" checked={q4.includes(m)} onChange={() => setQ4(toggleArr(q4, m, 2))} disabled={!q4.includes(m) && q4.length >= 2} className="accent-neon-green" />
                {m}
              </label>
            ))}
            {q4.length >= 2 && <p className="text-xs text-ink-muted mt-2">Max 2 selected. Uncheck one to change.</p>}
          </fieldset>

          {/* Q5 */}
          <fieldset className="bg-elevated border border-border rounded-2xl p-6">
            <legend className="text-sm font-mono font-bold text-ink-primary mb-3 px-2">
              5. Monthly credit spend across all platforms?
            </legend>
            {['<$20', '$20–$100', '$100–$500', '$500–$2,000', '>$2,000'].map((opt) => (
              <label key={opt} className="flex items-center gap-2 py-1 text-sm text-ink-secondary cursor-pointer">
                <input type="radio" name="q5" value={opt} checked={q5 === opt} onChange={(e) => setQ5(e.target.value)} className="accent-neon-green" />
                {opt}
              </label>
            ))}
          </fieldset>

          {/* Q6 */}
          <fieldset className="bg-elevated border border-border rounded-2xl p-6">
            <legend className="text-sm font-mono font-bold text-ink-primary mb-3 px-2">
              6. When a generation fails, what do you usually do? <span className="text-ink-muted font-normal">(pick one)</span>
            </legend>
            {[
              'Re-run with a tweaked prompt',
              'Switch to a different model',
              'Give up, move on',
              'File a support ticket',
              'Use a tool to analyze why before retrying',
            ].map((opt) => (
              <label key={opt} className="flex items-center gap-2 py-1 text-sm text-ink-secondary cursor-pointer">
                <input type="radio" name="q6" value={opt} checked={q6 === opt} onChange={(e) => setQ6(e.target.value)} className="accent-neon-green" />
                {opt}
              </label>
            ))}
          </fieldset>

          {/* Q7 */}
          <fieldset className="bg-elevated border border-border rounded-2xl p-6">
            <legend className="text-sm font-mono font-bold text-ink-primary mb-3 px-2">
              7. Have you ever filed a credit-refund ticket?
            </legend>
            {[
              "Never — didn't know I could",
              'Tried once, got nothing',
              'Tried multiple, mixed results',
              'Yes, regularly — usually get something',
              'Yes — almost always denied',
            ].map((opt) => (
              <label key={opt} className="flex items-center gap-2 py-1 text-sm text-ink-secondary cursor-pointer">
                <input type="radio" name="q7" value={opt} checked={q7 === opt} onChange={(e) => setQ7(e.target.value)} className="accent-neon-green" />
                {opt}
              </label>
            ))}
          </fieldset>

          {/* Demo embed gate */}
          <div className="bg-surface border border-neon-purple/30 rounded-2xl p-6">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-3">
              60-second demo · please watch before answering 8 + 9
            </p>
            {DEMO_LOOM_URL ? (
              <div className="aspect-video rounded-xl overflow-hidden bg-black">
                <iframe
                  src={DEMO_LOOM_URL}
                  className="w-full h-full"
                  allow="fullscreen"
                  title="AVA Pro demo"
                />
              </div>
            ) : (
              <div className="bg-elevated border border-dashed border-border rounded-xl p-8 text-center">
                <p className="text-sm text-ink-muted font-mono">
                  Demo Loom not configured.<br />
                  Set <code className="bg-surface px-1 rounded">NEXT_PUBLIC_DEMO_LOOM_URL</code> env var.
                </p>
              </div>
            )}
          </div>

          {/* Q8 */}
          <fieldset className="bg-elevated border border-border rounded-2xl p-6">
            <legend className="text-sm font-mono font-bold text-ink-primary mb-3 px-2">
              8. Based on the demo, which TWO would help you most? <span className="text-ink-muted font-normal">(check exactly 2)</span>
            </legend>
            {FEATURE_OPTIONS.map((f) => (
              <label key={f} className="flex items-start gap-2 py-2 text-sm text-ink-secondary cursor-pointer">
                <input type="checkbox" checked={q8.includes(f)} onChange={() => setQ8(toggleArr(q8, f, 2))} disabled={!q8.includes(f) && q8.length >= 2} className="accent-neon-green mt-1" />
                <span>{f}</span>
              </label>
            ))}
          </fieldset>

          {/* Q8b */}
          <fieldset className="bg-elevated border border-border rounded-2xl p-6">
            <legend className="text-sm font-mono font-bold text-ink-primary mb-3 px-2">
              8b. Which ONE would you NOT use?
            </legend>
            {FEATURE_OPTIONS.map((f) => (
              <label key={f} className="flex items-start gap-2 py-2 text-sm text-ink-secondary cursor-pointer">
                <input type="radio" name="q8b" value={f} checked={q8b === f} onChange={(e) => setQ8b(e.target.value)} className="accent-neon-green mt-1" />
                <span>{f}</span>
              </label>
            ))}
          </fieldset>

          {/* Q8c */}
          <fieldset className="bg-elevated border border-border rounded-2xl p-6">
            <legend className="text-sm font-mono font-bold text-ink-primary mb-3 px-2">
              8c. Bonus: would you want auto-drafted goodwill-credit tickets as a side feature?
            </legend>
            <p className="text-xs text-ink-muted mb-3">Knowing platforms don&apos;t guarantee approval — it&apos;s a copy-paste ticket to support.</p>
            {['Yes, as a bonus feature', "No, don't need it", 'Already do this manually'].map((opt) => (
              <label key={opt} className="flex items-center gap-2 py-1 text-sm text-ink-secondary cursor-pointer">
                <input type="radio" name="q8c" value={opt} checked={q8c === opt} onChange={(e) => setQ8c(e.target.value)} className="accent-neon-green" />
                {opt}
              </label>
            ))}
          </fieldset>

          {/* Q9 — Van Westendorp */}
          <fieldset className="bg-elevated border border-border rounded-2xl p-6">
            <legend className="text-sm font-mono font-bold text-ink-primary mb-3 px-2">
              9. For the prediction tool in the demo — at what monthly price would it feel:
            </legend>
            <div className="space-y-3">
              {[
                { label: "So expensive you wouldn't buy it?", v: q9a, set: setQ9a },
                { label: 'Starting to feel expensive but worth it?', v: q9b, set: setQ9b },
                { label: "Such a bargain you'd buy without thinking?", v: q9c, set: setQ9c },
                { label: "So cheap you'd question quality?", v: q9d, set: setQ9d },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3">
                  <label className="text-xs text-ink-secondary flex-1">{row.label}</label>
                  <div className="flex items-center gap-1">
                    <span className="text-ink-muted text-sm">$</span>
                    <input
                      type="number"
                      min={0}
                      step={1}
                      value={row.v}
                      onChange={(e) => row.set(e.target.value)}
                      className="w-20 bg-surface border border-border rounded-lg px-2 py-1 text-ink-primary font-mono text-right text-sm"
                    />
                    <span className="text-ink-muted text-xs">/mo</span>
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          {/* Q10 — pre-order */}
          <fieldset className="bg-surface border border-neon-green/30 rounded-2xl p-6">
            <legend className="text-sm font-mono font-bold text-neon-green mb-3 px-2 uppercase tracking-wider">
              10. Real ask
            </legend>
            <p className="text-sm text-ink-secondary mb-3">
              If we opened early access TODAY at <strong>$50 flat for 6 months</strong> locked-in at
              launch price (vs $114 at the regular $19/mo) — would you pre-order?
            </p>
            {[
              'Yes — send the Stripe link',
              'Maybe — email me when launch is closer',
              'No',
            ].map((opt) => (
              <label key={opt} className="flex items-center gap-2 py-1 text-sm text-ink-secondary cursor-pointer">
                <input type="radio" name="q10" value={opt} checked={q10 === opt} onChange={(e) => setQ10(e.target.value)} className="accent-neon-green" />
                {opt}
              </label>
            ))}
          </fieldset>

          {/* Q11 — open */}
          <fieldset className="bg-elevated border border-border rounded-2xl p-6">
            <legend className="text-sm font-mono font-bold text-ink-primary mb-3 px-2">
              11. What&apos;s the single most frustrating thing about AI video that nobody is solving yet?
            </legend>
            <textarea
              value={q11}
              onChange={(e) => setQ11(e.target.value)}
              rows={4}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-ink-primary text-sm"
              placeholder="Be specific. The unexpected pain point is the most valuable thing in this survey."
            />
          </fieldset>

          {/* Q12 — email */}
          <fieldset className="bg-elevated border border-border rounded-2xl p-6">
            <legend className="text-sm font-mono font-bold text-ink-primary mb-3 px-2">
              12. Email <span className="text-ink-muted font-normal">(optional, for results report + early-access slot)</span>
            </legend>
            <input
              type="email"
              value={q12}
              onChange={(e) => setQ12(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-ink-primary text-sm"
              placeholder="you@example.com"
            />
            <p className="text-xs text-ink-muted mt-2">
              Required if you said &quot;Yes&quot; on Q10. Optional otherwise — anonymous responses welcome.
            </p>
          </fieldset>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={state === 'submitting'}
              className="w-full inline-flex items-center justify-center gap-2 bg-neon-green/20 hover:bg-neon-green/30 disabled:opacity-50 disabled:cursor-not-allowed border border-neon-green/40 text-neon-green font-mono font-bold px-6 py-3 rounded-xl transition-all"
            >
              {state === 'submitting' ? 'Submitting…' : 'Submit survey'}
            </button>
            {errorMsg && <p className="text-xs text-neon-amber mt-3 text-center">{errorMsg}</p>}
            <p className="text-xs text-ink-muted mt-4 text-center italic">
              Results published in aggregate. With N&lt;200, conclusions are directional, not
              statistically significant. Individual responses never shared.
            </p>
          </div>

        </form>

      </div>
    </main>
  );
}
