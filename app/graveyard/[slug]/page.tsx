import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SHUTDOWNS, getShutdown, getRelatedShutdowns } from './data';

export async function generateStaticParams() {
  return SHUTDOWNS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const s = getShutdown(params.slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDesc,
    alternates: { canonical: `https://www.aivideoauditor.com/graveyard/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDesc, type: 'article' },
  };
}

const STATUS_LABEL: Record<string, string> = {
  active: 'Active (still operating)',
  deprecated: 'Deprecated',
  sunsetting: 'Sunsetting',
  dead: 'Dead',
};

const STATUS_COLOR: Record<string, string> = {
  active: 'bg-neon-green/10 border-neon-green/30 text-neon-green',
  deprecated: 'bg-neon-amber/10 border-neon-amber/30 text-neon-amber',
  sunsetting: 'bg-neon-amber/10 border-neon-amber/30 text-neon-amber',
  dead: 'bg-neon-red/10 border-neon-red/30 text-neon-red',
};

const REFUND_LABEL: Record<string, string> = {
  active: 'Refund window OPEN',
  closed: 'Refund window CLOSED',
  none: 'No refund applicable',
  unknown: 'Refund status unknown',
};

export default function GraveyardPage({ params }: { params: { slug: string } }) {
  const s = getShutdown(params.slug);
  if (!s) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: s.metaTitle,
    description: s.metaDesc,
    author: { '@type': 'Organization', name: 'AIVideoAuditor' },
    publisher: {
      '@type': 'Organization',
      name: 'AIVideoAuditor',
      url: 'https://www.aivideoauditor.com',
    },
    datePublished: s.shutdownAnnounced || undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main className="min-h-screen py-20 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/graveyard" className="hover:text-ink-secondary transition-colors">Graveyard</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-primary">{s.toolName}</span>
          </nav>

          {/* Hero */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`text-xs font-mono font-bold px-2 py-1 rounded border ${STATUS_COLOR[s.status]}`}>
                {STATUS_LABEL[s.status]}
              </span>
              <span className="text-xs font-mono text-ink-muted uppercase tracking-widest">
                {s.categoryLabel}
              </span>
              {s.verificationStatus === 'DRAFT_REQUIRES_VERIFY' && (
                <span className="text-xs font-mono bg-neon-amber/10 border border-neon-amber/30 text-neon-amber px-2 py-1 rounded">
                  Draft — pending verification
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink-primary mb-2 leading-tight tracking-tight">
              {s.toolName}
            </h1>
            <p className="text-ink-muted text-sm mb-6">by {s.parentCompany}</p>

            <div className="bg-elevated border border-border rounded-xl p-5 mb-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Announced</p>
                <p className="font-mono text-ink-primary">{s.shutdownAnnounced || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Complete</p>
                <p className="font-mono text-ink-primary">{s.shutdownComplete || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Refund window closes</p>
                <p className="font-mono text-ink-primary">{s.refundWindowClose || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Refund status</p>
                <p className={`font-mono ${s.refundStatus === 'active' ? 'text-neon-green' : 'text-ink-secondary'}`}>
                  {REFUND_LABEL[s.refundStatus]}
                </p>
              </div>
            </div>

            <p className="text-ink-secondary leading-relaxed">{s.summary}</p>
          </div>

          {/* Refund flow */}
          <section className="mb-10" aria-label="Refund flow">
            <h2 className="text-xl font-bold text-ink-primary mb-4">Refund flow</h2>
            <ol className="space-y-3">
              {s.refundFlow.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-neon-green/10 border border-neon-green/30 flex items-center justify-center mt-0.5">
                    <span className="text-neon-green font-mono font-bold text-xs">{i + 1}</span>
                  </div>
                  <p className="text-ink-secondary text-sm leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Migration path */}
          <section className="mb-10" aria-label="Migration path">
            <h2 className="text-xl font-bold text-ink-primary mb-4">Migration path</h2>
            <div className="bg-elevated border border-border rounded-xl p-5">
              <p className="text-xs font-mono text-neon-purple mb-1">Recommended successor</p>
              <p className="font-bold text-ink-primary mb-4">{s.migration.name}</p>
              <p className="text-xs font-mono text-ink-muted mb-1">Why this is the closest fit</p>
              <p className="text-ink-secondary text-sm mb-4">{s.migration.whyClose}</p>
              <p className="text-xs font-mono text-ink-muted mb-1">What differs from the original</p>
              <p className="text-ink-secondary text-sm">{s.migration.whatDiffers}</p>
            </div>
          </section>

          {/* Alternatives shortlist */}
          {s.alternativesShortlist && s.alternativesShortlist.length > 0 && (
            <section className="mb-10" aria-label="Alternatives by use case">
              <h2 className="text-xl font-bold text-ink-primary mb-4">Alternatives by use case</h2>
              <div className="space-y-3">
                {s.alternativesShortlist.map((alt, i) => (
                  <div key={i} className="bg-elevated border border-border rounded-xl p-4">
                    <p className="text-xs font-mono text-neon-purple uppercase tracking-wider mb-1">{alt.useCase}</p>
                    <p className="text-ink-secondary text-sm">{alt.recommendation}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* What this tool meant */}
          <section className="mb-10" aria-label="What this tool meant">
            <h2 className="text-xl font-bold text-ink-primary mb-4">What this tool meant</h2>
            <p className="text-ink-secondary leading-relaxed">{s.whatThisToolMeant}</p>
          </section>

          {/* Sources */}
          <section className="mb-12" aria-label="Sources">
            <h2 className="text-xl font-bold text-ink-primary mb-4">Sources</h2>
            <ul className="space-y-2">
              {s.sources.map((src, i) => (
                <li key={i} className="text-sm">
                  <a
                    href={src.url}
                    target={src.url.startsWith('http') ? '_blank' : undefined}
                    rel={src.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-neon-purple hover:underline"
                  >
                    {src.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Verification note (if draft) */}
          {s.verificationStatus === 'DRAFT_REQUIRES_VERIFY' && s.verificationNote && (
            <div className="mb-12 bg-neon-amber/5 border border-neon-amber/20 rounded-xl p-5">
              <p className="text-xs font-mono font-bold text-neon-amber uppercase tracking-widest mb-2">
                Verification note
              </p>
              <p className="text-ink-secondary text-sm">{s.verificationNote}</p>
            </div>
          )}

          {/* CTA */}
          <div className="bg-surface border border-neon-green/20 rounded-2xl p-8 text-center">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
              Spent credits on AI video that failed?
            </p>
            <h2 className="text-2xl font-bold text-ink-primary mb-3">
              AVA automates the refund flow across every video provider
            </h2>
            <p className="text-ink-secondary text-sm mb-6 max-w-md mx-auto">
              Free Chrome extension. Detects the failure mode, captures evidence, drafts the
              refund email with the technical term and Generation ID. Click send.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://chromewebstore.google.com/detail/aivideoauditor/ecomchbdfkgakaoponipjgpnjfpimdef"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-mono font-bold px-6 py-3 rounded-xl transition-all"
              >
                Install Free Extension →
              </a>
              <Link
                href="/failures"
                className="inline-flex items-center justify-center gap-2 bg-elevated hover:bg-elevated/80 border border-border text-ink-secondary font-mono font-semibold px-6 py-3 rounded-xl transition-all text-sm"
              >
                Browse 94 Failure Modes
              </Link>
            </div>
          </div>

          {/* Related shutdowns */}
          {(() => {
            const related = getRelatedShutdowns(s.slug, 4);
            if (related.length === 0) return null;
            return (
              <section className="mt-12">
                <h2 className="text-lg font-bold text-ink-primary mb-2">Other shutdowns in {s.categoryLabel}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {related.map((other) => (
                    <Link
                      key={other.slug}
                      href={`/graveyard/${other.slug}`}
                      className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-red/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-mono font-bold text-ink-primary text-sm">{other.toolName}</p>
                        <span className={`text-xs font-mono font-bold ${STATUS_COLOR[other.status].split(' ').pop()}`}>
                          {STATUS_LABEL[other.status]}
                        </span>
                      </div>
                      <p className="text-ink-muted text-xs">{other.parentCompany}</p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })()}

        </div>
      </main>
    </>
  );
}
