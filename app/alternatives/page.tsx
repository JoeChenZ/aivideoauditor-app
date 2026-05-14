import type { Metadata } from 'next';
import Link from 'next/link';
import { ALTERNATIVES } from './[slug]/data';

export const metadata: Metadata = {
  title: 'AI Video Tool Alternatives — Honest Comparison Guide (2026)',
  description: 'Ranked alternatives to every major AI video generator by shot type. Runway, Luma, Kling, Veo, Pika, Sora, Hailuo, Seedance — pick the right substitute for your specific work.',
  alternates: { canonical: 'https://www.aivideoauditor.com/alternatives' },
  openGraph: {
    title: 'AI Video Tool Alternatives — Honest Comparison Guide',
    description: 'Pick the right substitute by shot type, not by leaderboard.',
    type: 'website',
  },
};

export default function AlternativesIndex() {
  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">

        <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-ink-primary">Alternatives</span>
        </nav>

        <div className="mb-12">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-3">
            Alternatives guides · {ALTERNATIVES.length} tools covered
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-ink-primary mb-4 leading-tight">
            Looking for an alternative to your current AI video tool?
          </h1>
          <p className="text-ink-secondary leading-relaxed max-w-2xl">
            Every consumer-tier AI video generator has shot types where it shines and shot types
            where it fails. The right alternative depends on which failure mode you&apos;re hitting on
            your current tool — not on which model is &ldquo;the best.&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ALTERNATIVES.map((a) => (
            <Link
              key={a.slug}
              href={`/alternatives/${a.slug}`}
              className="bg-elevated border border-border rounded-xl p-6 hover:border-neon-purple/30 transition-colors"
            >
              <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">
                {a.toolStatus === 'dead' ? 'Migration guide' : 'Alternatives to'}
              </p>
              <h2 className="font-bold text-ink-primary text-lg mb-1">{a.toolFullName}</h2>
              <p className="text-xs text-ink-muted">{a.options.length} ranked alternatives</p>
            </Link>
          ))}
        </div>

        <section className="mt-16 bg-elevated border border-border rounded-2xl p-8">
          <h2 className="text-xl font-bold text-ink-primary mb-4">Why pick by shot type, not by leaderboard</h2>
          <p className="text-ink-secondary text-sm leading-relaxed mb-3">
            Most &ldquo;best AI video tool&rdquo; rankings sort by demo quality. That&apos;s misleading for
            production work — every generator fails differently, and the question that matters is which
            one fails least on your specific shot type.
          </p>
          <p className="text-ink-secondary text-sm leading-relaxed">
            Each alternatives guide on this site ranks substitutes by use case, not by overall &ldquo;best&rdquo;
            ranking. The right alternative to Runway depends on whether you&apos;re replacing it for character
            work, motion, lighting, or audio — and the answer is different for each.
          </p>
        </section>

      </div>
    </main>
  );
}
