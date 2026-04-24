import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why BYOK? — AI Video Auditor',
  description: 'Aggregator platforms charge 30–70% markup on AI video generation. BYOK eliminates that tax.',
};

const COMPARISONS = [
  { label: 'Kling v1 (5s, std)', directCost: '$0.07', aggregatorCost: '$0.10–$0.12', savings: '30–40%' },
  { label: 'Kling v1.5 (5s, pro)', directCost: '$0.35', aggregatorCost: '$0.50–$0.60', savings: '30–40%' },
  { label: 'Kling v1 (10s, pro)', directCost: '$0.28', aggregatorCost: '$0.40–$0.47', savings: '40–60%' },
];

export default function WhyByokPage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-bold tracking-widest text-neon-purple uppercase mb-4">The Hidden Cost</p>
        <h1 className="text-4xl font-bold text-ink-primary mb-6">
          Aggregator platforms charge 30–70% markup.<br />
          <span className="text-neon-green">You don&apos;t have to pay it.</span>
        </h1>
        <p className="text-ink-secondary leading-relaxed mb-12 text-lg">
          When you generate AI video through an aggregator platform, you&apos;re not just buying compute — you&apos;re paying their margin, their infrastructure, and their investor returns. Direct API access costs a fraction.
        </p>

        {/* Cost comparison table */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-ink-primary mb-6">Direct vs. Aggregator Pricing</h2>
          <div className="bg-surface border border-border rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-4 text-ink-muted font-medium">Generation</th>
                  <th className="text-right px-6 py-4 text-ink-muted font-medium">Direct API</th>
                  <th className="text-right px-6 py-4 text-ink-muted font-medium">Aggregator</th>
                  <th className="text-right px-6 py-4 text-neon-green font-medium">You Save</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISONS.map((row, i) => (
                  <tr key={row.label} className={i < COMPARISONS.length - 1 ? 'border-b border-border' : ''}>
                    <td className="px-6 py-4 text-ink-secondary">{row.label}</td>
                    <td className="px-6 py-4 text-right text-ink-primary font-mono">{row.directCost}</td>
                    <td className="px-6 py-4 text-right text-neon-red font-mono">{row.aggregatorCost}</td>
                    <td className="px-6 py-4 text-right text-neon-green font-semibold">{row.savings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-ink-muted text-xs mt-3">Aggregator prices based on typical market rates. Your actual savings may vary.</p>
        </section>

        {/* What is BYOK */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-ink-primary mb-4">What is BYOK?</h2>
          <p className="text-ink-secondary leading-relaxed mb-4">
            BYOK — Bring Your Own Key — means you sign up directly with the AI provider (Kling AI, Runway, Seedance), get your API credentials, and use our platform only for routing logic, cost tracking, and quality optimization.
          </p>
          <p className="text-ink-secondary leading-relaxed">
            We never touch your API credits. Every generation request goes directly from your browser to the provider&apos;s API using your credentials. We&apos;re the intelligence layer — not the billing layer.
          </p>
        </section>

        {/* The math */}
        <section className="mb-16 bg-elevated border border-border rounded-2xl p-8">
          <h2 className="text-xl font-bold text-ink-primary mb-4">The Math</h2>
          <p className="text-ink-secondary leading-relaxed mb-4">
            If you generate 500 videos per month at $0.35 each (Kling v1.5 pro):
          </p>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-surface rounded-xl p-4">
              <p className="text-ink-muted text-xs uppercase tracking-widest mb-1">Via Aggregator</p>
              <p className="text-2xl font-bold text-neon-red font-mono">$262.50</p>
              <p className="text-ink-muted text-xs mt-1">at $0.525/video (50% markup)</p>
            </div>
            <div className="bg-surface rounded-xl p-4">
              <p className="text-ink-muted text-xs uppercase tracking-widest mb-1">Direct via BYOK</p>
              <p className="text-2xl font-bold text-neon-green font-mono">$175.00</p>
              <p className="text-ink-muted text-xs mt-1">at $0.35/video (direct API)</p>
            </div>
          </div>
          <p className="text-center text-ink-secondary mt-4 text-sm">
            That&apos;s <span className="text-neon-green font-semibold">$87.50/month</span> — or <span className="text-neon-green font-semibold">$1,050/year</span> — back in your pocket.
          </p>
        </section>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/guide"
            className="inline-flex items-center justify-center gap-2 bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple/40 text-neon-purple font-semibold px-6 py-3 rounded-xl transition-all"
          >
            Get your API key →
          </Link>
          <Link
            href="/security"
            className="inline-flex items-center justify-center gap-2 bg-elevated hover:bg-elevated/80 border border-border text-ink-secondary font-medium px-6 py-3 rounded-xl transition-all text-sm"
          >
            How we protect your keys
          </Link>
        </div>
      </div>
    </main>
  );
}