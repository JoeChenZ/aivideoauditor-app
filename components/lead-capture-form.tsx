'use client';

import { useState } from 'react';

type LeadCaptureFormProps = {
  source: string;
  metadata?: Record<string, unknown>;
  heading?: string;
  blurb?: string;
  cta?: string;
  successMessage?: string;
};

export default function LeadCaptureForm({
  source,
  metadata,
  heading = 'Get notified when AVA Pro goes live',
  blurb = 'Drop your email. When AVA Pro launches, you get a one-time 30% lifetime discount + a heads-up the day before, so you can grab credits the moment the LIVE switch flips.',
  cta = 'Notify me on launch →',
  successMessage = "You're in. We'll only email when there's news worth opening — launch day + maybe one followup. No marketing spam.",
}: LeadCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setStatus('error');
      setErrorMsg('Looks like an invalid email address.');
      return;
    }
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, metadata }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Try again?');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Try again in a moment.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-neon-green/5 border border-neon-green/30 rounded-2xl p-6 text-center">
        <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-2">
          ✓ You&apos;re in
        </p>
        <p className="text-ink-secondary text-sm leading-relaxed">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-elevated border border-neon-green/20 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-ink-primary mb-2">{heading}</h3>
      <p className="text-ink-muted text-sm mb-4 leading-relaxed">{blurb}</p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'submitting'}
          className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-ink-primary font-mono text-sm focus:border-neon-green/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-mono font-bold text-sm px-5 py-2 rounded-lg transition-all disabled:opacity-60"
        >
          {status === 'submitting' ? 'Saving…' : cta}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-xs text-neon-red mt-2 font-mono">{errorMsg}</p>
      )}
      <p className="text-xs text-ink-muted mt-3">
        One email when we launch + maybe one followup. No marketing spam, ever. Unsubscribe one-click.
      </p>
    </form>
  );
}
