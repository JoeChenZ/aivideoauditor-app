import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { COMPARISONS, getComparison } from './data';
import { ALTERNATIVES } from '../../alternatives/[slug]/data';

const ALT_SLUGS = new Set(ALTERNATIVES.map((a) => a.slug));
const ALT_BY_SLUG = new Map(ALTERNATIVES.map((a) => [a.slug, a]));

export async function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const c = getComparison(params.slug);
  if (!c) return {};
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: { canonical: `https://www.aivideoauditor.com/compare/${c.slug}` },
    openGraph: { title: c.metaTitle, description: c.metaDesc, type: 'article' },
  };
}

function WinnerBadge({ winner }: { winner: 'A' | 'B' | 'TIE' | 'NA' }) {
  if (winner === 'A') return <span className="text-xs font-mono font-bold text-neon-green">A wins</span>;
  if (winner === 'B') return <span className="text-xs font-mono font-bold text-neon-purple">B wins</span>;
  if (winner === 'TIE') return <span className="text-xs font-mono font-bold text-neon-amber">Tie</span>;
  return <span className="text-xs font-mono font-bold text-ink-muted">N/A</span>;
}

export default function ComparePage({ params }: { params: { slug: string } }) {
  const c = getComparison(params.slug);
  if (!c) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.metaTitle,
    description: c.metaDesc,
    author: { '@type': 'Organization', name: 'AIVideoAuditor' },
    publisher: { '@type': 'Organization', name: 'AIVideoAuditor', url: 'https://www.aivideoauditor.com' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Breadcrumb */}
          <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/compare" className="hover:text-ink-secondary transition-colors">Compare</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-primary">{c.toolA} vs {c.toolB}</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-3">
              Head-to-head
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink-primary mb-4 leading-tight tracking-tight">
              {c.toolALongName} <span className="text-ink-muted">vs</span> {c.toolBLongName}
            </h1>
            <p className="text-ink-secondary leading-relaxed">{c.intro}</p>
          </div>

          {/* Quick verdict */}
          <div className="mb-10 bg-elevated border border-border rounded-2xl p-6">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-4">
              Quick verdict
            </p>
            <div className="space-y-3">
              <p className="text-ink-secondary text-sm">
                <span className="text-neon-green font-bold">Pick {c.toolA}</span> when {c.quickVerdict.useToolA}
              </p>
              <p className="text-ink-secondary text-sm">
                <span className="text-neon-purple font-bold">Pick {c.toolB}</span> when {c.quickVerdict.useToolB}
              </p>
              <p className="text-ink-muted text-xs italic pt-2">{c.quickVerdict.honestNote}</p>
            </div>
          </div>

          {/* Comparison table */}
          <section className="mb-12" aria-label="Side-by-side comparison">
            <h2 className="text-xl font-bold text-ink-primary mb-4">Side-by-side comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 text-ink-muted font-mono uppercase text-xs tracking-wider">Dimension</th>
                    <th className="text-left py-3 px-3 text-neon-green font-bold">{c.toolA}</th>
                    <th className="text-left py-3 px-3 text-neon-purple font-bold">{c.toolB}</th>
                    <th className="text-left py-3 pl-3 text-ink-muted font-mono uppercase text-xs tracking-wider">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {c.comparisonTable.map((row, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-3 pr-4 text-ink-primary font-medium">{row.dimension}</td>
                      <td className="py-3 px-3 text-ink-secondary">{row.toolA}</td>
                      <td className="py-3 px-3 text-ink-secondary">{row.toolB}</td>
                      <td className="py-3 pl-3"><WinnerBadge winner={row.winner} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* When to pick A */}
          <section className="mb-10" aria-label={`When to pick ${c.toolA}`}>
            <h2 className="text-xl font-bold text-ink-primary mb-4">When to pick {c.toolA}</h2>
            <p className="text-ink-secondary leading-relaxed mb-5">{c.whenToPickA.description}</p>
            <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-3">
              Failure-mode profile ({c.whenToPickA.refundCategoriesCount} named failure categories)
            </p>
            <ul className="space-y-2">
              {c.whenToPickA.failureModes.map((fm, i) => (
                <li key={i}>
                  <Link href={fm.href} className="text-sm text-neon-purple hover:underline">
                    {fm.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* When to pick B */}
          <section className="mb-10" aria-label={`When to pick ${c.toolB}`}>
            <h2 className="text-xl font-bold text-ink-primary mb-4">When to pick {c.toolB}</h2>
            <p className="text-ink-secondary leading-relaxed mb-5">{c.whenToPickB.description}</p>
            <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-3">
              Failure-mode profile ({c.whenToPickB.refundCategoriesCount} named failure categories)
            </p>
            <ul className="space-y-2">
              {c.whenToPickB.failureModes.map((fm, i) => (
                <li key={i}>
                  <Link href={fm.href} className="text-sm text-neon-purple hover:underline">
                    {fm.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Side-by-side examples */}
          <section className="mb-12" aria-label="Side-by-side examples">
            <h2 className="text-xl font-bold text-ink-primary mb-4">Side-by-side examples</h2>
            <div className="space-y-4">
              {c.examples.map((ex, i) => (
                <div key={i} className="bg-elevated border border-border rounded-xl p-5">
                  <p className="text-xs font-mono text-ink-muted mb-2">Prompt:</p>
                  <p className="font-mono text-sm text-ink-secondary italic mb-4">{ex.prompt}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs font-mono font-bold text-neon-green mb-1">{c.toolA}</p>
                      <p className="text-sm text-ink-secondary">{ex.toolA}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono font-bold text-neon-purple mb-1">{c.toolB}</p>
                      <p className="text-sm text-ink-secondary">{ex.toolB}</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border/40">
                    <p className="text-xs font-mono text-ink-muted mb-1">Verdict</p>
                    <p className="text-sm text-ink-primary font-medium">{ex.verdict}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Failure documentation flow */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-ink-primary mb-4">Failure documentation: filing tickets when output goes wrong</h2>
            <div className="bg-neon-green/5 border border-neon-green/20 rounded-xl p-5">
              <p className="text-ink-secondary text-sm leading-relaxed">{c.refundFlowSummary}</p>
            </div>
          </section>

          {/* Final verdict */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-ink-primary mb-4">Final verdict</h2>
            <p className="text-ink-secondary leading-relaxed">{c.finalVerdict}</p>
          </section>

          {/* CTA */}
          <div className="bg-surface border border-neon-green/20 rounded-2xl p-8 text-center">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
              Automate the routing
            </p>
            <h2 className="text-2xl font-bold text-ink-primary mb-3">
              AVA Pro picks the right tool per prompt — based on your historical hit-rate
            </h2>
            <p className="text-ink-secondary text-sm mb-6 max-w-md mx-auto">
              Free Chrome extension audits every generation. Pro tier routes new prompts to whichever
              provider fails least on that specific shot type. $19/mo, pays back in saved credits.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-mono font-bold px-6 py-3 rounded-xl transition-all"
              >
                See Pro features →
              </Link>
              <Link
                href="/failures"
                className="inline-flex items-center justify-center gap-2 bg-elevated hover:bg-elevated/80 border border-border text-ink-secondary font-mono font-semibold px-6 py-3 rounded-xl transition-all text-sm"
              >
                Browse all failure modes
              </Link>
            </div>
          </div>

          {/* Cross-link to /alternatives/[A] and /alternatives/[B] — closes the link-graph
              triangle so PageRank flows between comparisons and ranked substitutes. */}
          {(() => {
            const [aSlug, bSlug] = c.slug.split('-vs-');
            const aAlt = ALT_BY_SLUG.get(aSlug);
            const bAlt = ALT_BY_SLUG.get(bSlug);
            if (!aAlt && !bAlt) return null;
            return (
              <section className="mt-12">
                <h2 className="text-lg font-bold text-ink-primary mb-4">If neither wins your shot type</h2>
                <p className="text-ink-muted text-sm mb-4 max-w-prose">
                  When the head-to-head verdict is &ldquo;equivalent&rdquo; or both fail on your shape, route to a third tool. These guides rank substitutes by shot-type rather than overall rating.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {aAlt && (
                    <Link
                      href={`/alternatives/${aSlug}`}
                      className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-amber/30 transition-colors"
                    >
                      <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-1">Alternatives</p>
                      <p className="font-mono font-bold text-ink-primary text-sm mb-1">{aAlt.toolName} alternatives</p>
                      <p className="text-xs text-ink-muted">Ranked substitutes by shot type.</p>
                    </Link>
                  )}
                  {bAlt && (
                    <Link
                      href={`/alternatives/${bSlug}`}
                      className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-amber/30 transition-colors"
                    >
                      <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-1">Alternatives</p>
                      <p className="font-mono font-bold text-ink-primary text-sm mb-1">{bAlt.toolName} alternatives</p>
                      <p className="text-xs text-ink-muted">Ranked substitutes by shot type.</p>
                    </Link>
                  )}
                </div>
              </section>
            );
          })()}

          {/* Other comparisons */}
          <section className="mt-12">
            <h2 className="text-lg font-bold text-ink-primary mb-4">Other comparisons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COMPARISONS.filter((other) => other.slug !== c.slug).map((other) => (
                <Link
                  key={other.slug}
                  href={`/compare/${other.slug}`}
                  className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors"
                >
                  <p className="font-mono font-bold text-ink-primary text-sm mb-1">
                    {other.toolA} vs {other.toolB}
                  </p>
                  <p className="text-xs text-ink-muted">{other.toolALongName} · {other.toolBLongName}</p>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
