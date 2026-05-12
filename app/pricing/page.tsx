'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const EXTENSION_API = 'https://aivideoauditor-extension.vercel.app';

const FREE_FEATURES = [
  'Frame-mark broken generations on Runway and Luma',
  'Generation ID + Asset ID auto-capture',
  'Professional refund letter (copy & paste)',
  'Pre-flight L1 prompt risk scanner',
  'Refund outcome tracking',
  'Unlimited generations monitored',
];

const PRO_FEATURES = [
  'Everything in Free, plus:',
  'PDF Technical Audit Report (Pro)',
  'Engineering-grade failure classification',
  'Annotated failure-frame screenshots in the report',
  'Credit refund calculation',
  'BYOK AI summary (bring your own Gemini key)',
  'Advanced L1 full-analysis mode',
  'Refund-success rate tracker',
];

const FAQ = [
  {
    q: 'How does the 7-day money-back guarantee work?',
    a: 'Subscribe and try every Pro feature. If you don\'t recover at least the $9 subscription cost in approved refunds within 7 days, email hello@aivideoauditor.com and we refund the subscription. No questions asked.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel in one click from your dashboard or via the Stripe-managed billing portal. You keep Pro access until the end of the current billing period.',
  },
  {
    q: 'Do I need to use my own API key?',
    a: 'Only if you enable the optional AI-summarized failure analysis. The core refund workflow (frame marking, refund letter generation, technical taxonomy) works without any external API. The BYOK path is for users who want AI-summarized reports — your Gemini key, your bill, no resale.',
  },
  {
    q: 'Will this work for [Sora / Hailuo / Kling / Pika]?',
    a: 'Currently Runway ML and Luma AI Dream Machine. Additional platforms are queued — each needs a small adapter for ID capture and frame extraction. Vote on the next platform at github.com/JoeChenZ/aivideoauditor-extension.',
  },
  {
    q: 'Is my data shared with you?',
    a: 'No. Your Generation IDs and frame screenshots stay on your device or in your private vault. No analytics, no advertising, no third-party tracking. See the privacy policy at /privacy.',
  },
];

export default function PricingPage() {
  const supabase = createClient();
  const router = useRouter();
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSignedIn(!!session);
    });
  }, [supabase]);

  async function startCheckout() {
    setError(null);
    setBusy(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login?redirectTo=/pricing');
        return;
      }

      const res = await fetch(`${EXTENSION_API}/api/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? `Checkout failed (${res.status})`);
      }

      const { url } = await res.json();
      if (!url) throw new Error('No checkout URL returned');
      window.location.href = url;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout failed');
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-amber uppercase mb-4">
            Pricing
          </p>
          <h1 className="text-4xl font-bold text-ink-primary mb-3 leading-tight">
            Pay $9 to recover $50 in credits.
          </h1>
          <p className="text-ink-secondary text-lg max-w-xl mx-auto">
            The Free tier covers the workflow. Pro gives you the PDF audit report
            Runway and Luma support take seriously.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">

          {/* FREE */}
          <div className="bg-surface border border-border rounded-2xl p-8">
            <p className="text-xs font-mono font-bold tracking-widest text-ink-muted uppercase mb-2">
              Free
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-ink-primary">$0</span>
              <span className="text-ink-muted ml-2">forever</span>
            </div>
            <a
              href="https://chromewebstore.google.com/detail/aivideoauditor/dnehhjbgpfjdihfigahimmpgnemplljn"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-elevated hover:bg-elevated/80 border border-border text-ink-primary font-mono font-semibold px-6 py-3 rounded-xl transition-all mb-6"
            >
              Add to Chrome — Free
            </a>
            <ul className="space-y-2">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-ink-secondary">
                  <span className="text-neon-green flex-shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* PRO */}
          <div className="bg-surface border border-neon-amber/40 shadow-lg shadow-neon-amber/10 rounded-2xl p-8 relative">
            <div className="absolute -top-3 left-8 bg-neon-amber/20 border border-neon-amber/40 px-3 py-1 rounded-full">
              <span className="text-xs font-mono font-bold tracking-widest text-neon-amber uppercase">
                Most Effective
              </span>
            </div>
            <p className="text-xs font-mono font-bold tracking-widest text-neon-amber uppercase mb-2">
              Pro
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-ink-primary">$9</span>
              <span className="text-ink-muted ml-2">per month</span>
            </div>
            <button
              onClick={startCheckout}
              disabled={busy || signedIn === null}
              className="block w-full text-center bg-neon-amber/20 hover:bg-neon-amber/30 disabled:bg-neon-amber/10 disabled:cursor-not-allowed border border-neon-amber/40 text-neon-amber font-mono font-bold px-6 py-3 rounded-xl transition-all mb-2"
            >
              {busy ? 'Loading checkout…'
                : signedIn === null ? 'Checking session…'
                : signedIn ? 'Upgrade to Pro →'
                : 'Sign in to subscribe →'}
            </button>
            <p className="text-xs text-ink-muted text-center mb-6">
              7-day money-back guarantee · Cancel anytime
            </p>
            {error && (
              <div className="mb-4 bg-neon-red/10 border border-neon-red/30 rounded-lg px-4 py-2">
                <p className="text-xs text-neon-red">{error}</p>
              </div>
            )}
            <ul className="space-y-2">
              {PRO_FEATURES.map((f, i) => (
                <li key={f} className={`flex gap-2 text-sm ${i === 0 ? 'text-ink-muted italic' : 'text-ink-secondary'}`}>
                  {i > 0 && <span className="text-neon-amber flex-shrink-0">✓</span>}
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Cost-justification */}
        <div className="bg-elevated border border-border rounded-2xl p-8 mb-16">
          <h2 className="text-xl font-bold text-ink-primary mb-4">
            The math: $9/mo if you generate at all
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-ink-muted mb-1">Average creator burn</p>
              <p className="text-2xl font-bold text-ink-primary">$30–50</p>
              <p className="text-xs text-ink-muted">in credits per week on Runway / Luma failures</p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-ink-muted mb-1">With AVA Pro report</p>
              <p className="text-2xl font-bold text-neon-green">~70% approved</p>
              <p className="text-xs text-ink-muted">refund rate when documented with technical taxonomy</p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-ink-muted mb-1">Effective monthly recovery</p>
              <p className="text-2xl font-bold text-neon-amber">$80–140</p>
              <p className="text-xs text-ink-muted">in credits back. Subscription pays for itself in week 1.</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section aria-label="FAQ" className="mb-16">
          <h2 className="text-2xl font-bold text-ink-primary mb-6">
            Pricing FAQ
          </h2>
          <div className="space-y-3">
            {FAQ.map((item) => (
              <details key={item.q} className="bg-surface border border-border rounded-xl group">
                <summary className="cursor-pointer px-5 py-4 text-ink-primary font-semibold text-sm flex justify-between items-center">
                  <span>{item.q}</span>
                  <span className="text-ink-muted group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="px-5 pb-4 text-ink-secondary text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="text-center">
          <p className="text-xs text-ink-muted">
            Questions? <Link href="/guide" className="text-neon-purple underline">Read the refund guide</Link> ·{' '}
            <a href="mailto:hello@aivideoauditor.com" className="text-neon-purple underline">Email support</a>
          </p>
        </div>

      </div>
    </main>
  );
}
