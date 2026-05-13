import Link from 'next/link';
import { CheckoutButton } from './CheckoutButtons';

const EXTENSION_API = 'https://aivideoauditor-extension.vercel.app';

type TierPrice = {
  tier: string;
  priceId: string | null;
  amountCents: number;
  currency: string;
  interval: string;
  fallback?: boolean;
};

type PricesResponse = {
  tiers: { free: TierPrice; pro: TierPrice; business: TierPrice };
  fallback: boolean;
};

const FALLBACK_PRICES: PricesResponse = {
  tiers: {
    free:     { tier: 'free',     priceId: null, amountCents: 0,    currency: 'usd', interval: 'month' },
    pro:      { tier: 'pro',      priceId: null, amountCents: 1900, currency: 'usd', interval: 'month' },
    business: { tier: 'business', priceId: null, amountCents: 7900, currency: 'usd', interval: 'month' },
  },
  fallback: true,
};

export const revalidate = 3600;

async function getPrices(): Promise<PricesResponse> {
  try {
    const res = await fetch(`${EXTENSION_API}/api/prices`, { next: { revalidate: 3600 } });
    if (!res.ok) return FALLBACK_PRICES;
    return await res.json();
  } catch {
    return FALLBACK_PRICES;
  }
}

function formatPrice(p: TierPrice): string {
  if (p.amountCents === 0) return '$0';
  const dollars = p.amountCents / 100;
  return `$${dollars % 1 === 0 ? dollars.toFixed(0) : dollars.toFixed(2)}`;
}

const FREE_FEATURES = [
  '10 audits per month',
  'Frame-mark broken generations on Runway + Luma',
  'Generation ID + Asset ID auto-capture',
  'Professional refund letter (copy & paste)',
  'Pre-flight L1 prompt risk scanner',
  'Refund outcome tracking',
];

const PRO_FEATURES = [
  'Everything in Free, plus:',
  '300 audits per month',
  'PDF Technical Audit Report',
  'Engineering-grade failure classification',
  'Annotated failure-frame screenshots',
  'Credit refund calculation',
  'Advanced L1 full-analysis mode',
  'Refund-success rate tracker',
];

const BUSINESS_FEATURES = [
  'Everything in Pro, plus:',
  'Fair-use unlimited audits',
  'Team seats (coming soon)',
  'Priority refund-letter review',
  'Slack / email support SLA',
  'API access for high-volume teams',
];

const FAQ = [
  {
    q: 'How does the 7-day money-back guarantee work?',
    a: 'Subscribe and use the PDF audit report on real failures. If you don\'t recover at least the subscription cost in approved refunds within 7 days, email hello@aivideoauditor.com — we refund the subscription, no questions asked.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel in one click from your dashboard or via the Stripe-managed billing portal. You keep Pro / Business access until the end of the current billing period.',
  },
  {
    q: 'What does "fair-use unlimited" mean on Business?',
    a: 'No hard cap on audits. We monitor for automated abuse (scripted spam against the same generation IDs); legitimate human-driven volume is fine even if you run hundreds of audits a month.',
  },
  {
    q: 'Do I need my own AI API key?',
    a: 'No. All AI analysis runs on our servers, gated by your subscription tier. There is nothing to configure — sign up, install the extension, run the audit.',
  },
  {
    q: 'Will this work for [Sora / Hailuo / Kling / Pika]?',
    a: 'Currently Runway ML and Luma AI Dream Machine. Additional platforms are queued — each needs a small adapter for ID capture and frame extraction. Vote on the next platform at github.com/JoeChenZ/aivideoauditor-extension.',
  },
  {
    q: 'Is my data shared with you?',
    a: 'Audit frames are sent to our server only for the duration of the AI analysis call (multimodal Gemini) and are not stored. Generation IDs and refund outcomes are stored against your account so the dashboard works. No third-party analytics, no advertising, no resale. See /privacy.',
  },
];

export default async function PricingPage() {
  const { tiers } = await getPrices();

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-amber uppercase mb-4">
            Pricing
          </p>
          <h1 className="text-4xl font-bold text-ink-primary mb-3 leading-tight">
            Recover more in credits than you spend on the subscription.
          </h1>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto">
            Free gets you started. Pro is what professional creators use to claim refunds.
            Business is fair-use unlimited for teams running high audit volume.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">

          {/* FREE */}
          <div className="bg-surface border border-border rounded-2xl p-8">
            <p className="text-xs font-mono font-bold tracking-widest text-ink-muted uppercase mb-2">
              Free
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-ink-primary">{formatPrice(tiers.free)}</span>
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
                Most Popular
              </span>
            </div>
            <p className="text-xs font-mono font-bold tracking-widest text-neon-amber uppercase mb-2">
              Pro
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-ink-primary">{formatPrice(tiers.pro)}</span>
              <span className="text-ink-muted ml-2">per {tiers.pro.interval}</span>
            </div>
            <CheckoutButton tier="pro" label="Upgrade to Pro" variant="amber" />
            <p className="text-xs text-ink-muted text-center mb-6">
              7-day money-back guarantee · Cancel anytime
            </p>
            <ul className="space-y-2">
              {PRO_FEATURES.map((f, i) => (
                <li key={f} className={`flex gap-2 text-sm ${i === 0 ? 'text-ink-muted italic' : 'text-ink-secondary'}`}>
                  {i > 0 && <span className="text-neon-amber flex-shrink-0">✓</span>}
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* BUSINESS */}
          <div className="bg-surface border border-neon-purple/40 rounded-2xl p-8">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-2">
              Business
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-ink-primary">{formatPrice(tiers.business)}</span>
              <span className="text-ink-muted ml-2">per {tiers.business.interval}</span>
            </div>
            <CheckoutButton tier="business" label="Upgrade to Business" variant="primary" />
            <p className="text-xs text-ink-muted text-center mb-6">
              Fair-use unlimited · Cancel anytime
            </p>
            <ul className="space-y-2">
              {BUSINESS_FEATURES.map((f, i) => (
                <li key={f} className={`flex gap-2 text-sm ${i === 0 ? 'text-ink-muted italic' : 'text-ink-secondary'}`}>
                  {i > 0 && <span className="text-neon-purple flex-shrink-0">✓</span>}
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Cost-justification */}
        <div className="bg-elevated border border-border rounded-2xl p-8 mb-16">
          <h2 className="text-xl font-bold text-ink-primary mb-4">
            The math: Pro pays for itself in week 1
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
