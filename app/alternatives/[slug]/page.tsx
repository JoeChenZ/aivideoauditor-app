import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALTERNATIVES, getAlternativesPage } from './data';
import { FAILURES } from '../../failures/[slug]/data';
import { COMPARISONS } from '../../compare/[slug]/data';

export async function generateStaticParams() {
  return ALTERNATIVES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const a = getAlternativesPage(params.slug);
  if (!a) return {};
  return {
    title: a.metaTitle,
    description: a.metaDesc,
    alternates: { canonical: `https://www.aivideoauditor.com/alternatives/${a.slug}` },
    openGraph: { title: a.metaTitle, description: a.metaDesc, type: 'article' },
  };
}

const STATUS_COLOR: Record<string, string> = {
  active: 'bg-neon-green/10 border-neon-green/30 text-neon-green',
  deprecated: 'bg-neon-amber/10 border-neon-amber/30 text-neon-amber',
  dead: 'bg-neon-red/10 border-neon-red/30 text-neon-red',
};

const STATUS_LABEL: Record<string, string> = {
  active: 'Active',
  deprecated: 'Deprecated',
  dead: 'Dead',
};

export default function AlternativesPage({ params }: { params: { slug: string } }) {
  const a = getAlternativesPage(params.slug);
  if (!a) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.metaTitle,
    description: a.metaDesc,
    author: { '@type': 'Organization', name: 'AIVideoAuditor' },
    publisher: { '@type': 'Organization', name: 'AIVideoAuditor', url: 'https://www.aivideoauditor.com' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.aivideoauditor.com' },
      { '@type': 'ListItem', position: 2, name: 'Alternatives', item: 'https://www.aivideoauditor.com/alternatives' },
      { '@type': 'ListItem', position: 3, name: a.toolName, item: `https://www.aivideoauditor.com/alternatives/${a.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen py-20 px-6">
        <div className="max-w-3xl mx-auto">

          <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/alternatives" className="hover:text-ink-secondary transition-colors">Alternatives</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-primary">{a.toolName}</span>
          </nav>

          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`text-xs font-mono font-bold px-2 py-1 rounded border ${STATUS_COLOR[a.toolStatus]}`}>
                {STATUS_LABEL[a.toolStatus]}
              </span>
              <span className="text-xs font-mono text-ink-muted uppercase tracking-widest">
                AI Video
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink-primary mb-3 leading-tight tracking-tight">
              {a.toolFullName} alternatives
            </h1>
            <p className="text-ink-muted mb-6">{a.options.length} ranked alternatives, picked by shot type</p>

            <p className="text-ink-secondary leading-relaxed mb-6">{a.toolSummary}</p>
            <div className="bg-elevated border border-border rounded-xl p-5">
              <p className="text-xs font-mono text-neon-purple mb-2 uppercase tracking-wider">Why you&apos;re probably here</p>
              <p className="text-ink-secondary text-sm leading-relaxed">{a.whyLookingForAlternatives}</p>
            </div>
          </div>

          {a.toolStatus === 'dead' && (
            <div className="mb-10 bg-neon-red/5 border border-neon-red/30 rounded-xl p-5">
              <p className="text-xs font-mono font-bold text-neon-red uppercase tracking-widest mb-2">
                Tool shutdown — file refund first
              </p>
              <p className="text-ink-secondary text-sm leading-relaxed">
                Before picking an alternative, check the{' '}
                <Link href={`/graveyard/${a.slug}-2`} className="text-neon-purple hover:underline">
                  refund flow on /graveyard
                </Link>
                . Most shutdown providers honor refund tickets if you file before the window closes.
              </p>
            </div>
          )}

          <section className="mb-12" aria-label="Alternatives ranked">
            <h2 className="text-xl font-bold text-ink-primary mb-6">Ranked alternatives</h2>
            <div className="space-y-5">
              {a.options.map((option, i) => (
                <div key={option.name} className="bg-elevated border border-border rounded-xl p-6">
                  <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                    <div>
                      <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">
                        Option {i + 1}
                      </p>
                      <h3 className="text-xl font-bold text-ink-primary">{option.name}</h3>
                    </div>
                    {option.compareHref && (
                      <Link
                        href={option.compareHref}
                        className="text-xs font-mono text-neon-purple hover:underline"
                      >
                        Detailed comparison →
                      </Link>
                    )}
                  </div>
                  <p className="text-ink-primary text-sm leading-relaxed mb-4 italic">
                    {option.shortPitch}
                  </p>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Best for</p>
                      <p className="text-ink-secondary">{option.bestForUseCase}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Why it&apos;s a close fit</p>
                      <p className="text-ink-secondary">{option.whyClose}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">What differs</p>
                      <p className="text-ink-secondary">{option.whatDiffers}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-ink-primary mb-4">Final advice</h2>
            <p className="text-ink-secondary leading-relaxed">{a.finalAdvice}</p>
          </section>

          <div className="bg-surface border border-neon-green/20 rounded-2xl p-8 text-center">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
              Automate the routing decision
            </p>
            <h2 className="text-2xl font-bold text-ink-primary mb-3">
              AVA Pro routes each prompt to whichever tool fails least on your shot type
            </h2>
            <p className="text-ink-secondary text-sm mb-6 max-w-md mx-auto">
              Free tier scores 50 prompts per month against the 105 failure-mode catalogue. Pro
              adds unlimited scoring + personal failure history + cross-vendor stability alerts so
              you switch off a tool before it silently changes the deal. $19/mo, pays back in saved credits.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/tools/credit-calculator"
                className="inline-flex items-center justify-center gap-2 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-mono font-bold px-6 py-3 rounded-xl transition-all"
              >
                See your potential savings →
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-elevated hover:bg-elevated/80 border border-border text-ink-secondary font-mono font-semibold px-6 py-3 rounded-xl transition-all text-sm"
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Cross-link to /failures/[slug] for this vendor + /compare/[slug] head-to-heads.
              Closes the link-graph triangle between alternatives, failures, and comparisons —
              Google flows PageRank along contextual outbound links. */}
          {(() => {
            const vendorFailures = FAILURES.filter((f) => f.slug.startsWith(`${a.slug}-`)).slice(0, 4);
            const vendorCompares = COMPARISONS.filter((c) => {
              const parts = c.slug.split('-vs-');
              return parts[0] === a.slug || parts[1] === a.slug;
            }).slice(0, 3);
            if (vendorFailures.length === 0 && vendorCompares.length === 0) return null;
            return (
              <section className="mt-12">
                <h2 className="text-lg font-bold text-ink-primary mb-4">Why people search for {a.toolName} alternatives</h2>
                <p className="text-ink-muted text-sm mb-4 max-w-prose">
                  The specific {a.toolName} failure modes most users hit, plus head-to-head comparisons against the substitutes ranked above.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vendorFailures.map((f) => (
                    <Link
                      key={f.slug}
                      href={`/failures/${f.slug}`}
                      className="bg-elevated border border-border rounded-xl p-3 hover:border-neon-amber/30 transition-colors"
                    >
                      <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-1">{a.toolName} failure</p>
                      <p className="font-mono font-semibold text-ink-primary text-sm">{f.title}</p>
                    </Link>
                  ))}
                  {vendorCompares.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/compare/${c.slug}`}
                      className="bg-elevated border border-border rounded-xl p-3 hover:border-neon-purple/30 transition-colors"
                    >
                      <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-1">Head-to-head</p>
                      <p className="font-mono font-semibold text-ink-primary text-sm">{c.toolA} vs {c.toolB}</p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })()}

          <section className="mt-12">
            <h2 className="text-lg font-bold text-ink-primary mb-4">Other alternatives guides</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ALTERNATIVES.filter((other) => other.slug !== a.slug).map((other) => (
                <Link
                  key={other.slug}
                  href={`/alternatives/${other.slug}`}
                  className="bg-elevated border border-border rounded-xl p-3 hover:border-neon-purple/30 transition-colors text-center"
                >
                  <p className="font-mono font-bold text-ink-primary text-sm">{other.toolName}</p>
                  <p className="text-xs text-ink-muted">alternatives</p>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
