import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getFailure, FAILURES, getRelatedFailures } from './data';
import { ALTERNATIVES } from '../../alternatives/[slug]/data';
import { COMPARISONS } from '../../compare/[slug]/data';

// Vendor slugs that have a dedicated /alternatives/[slug] page.
const ALTERNATIVES_SLUGS = new Set(ALTERNATIVES.map((a) => a.slug));

// Find /compare/[slug] pages where the given vendor is one of the two tools.
// Slugs follow the `<a>-vs-<b>` convention from compare/[slug]/data.ts.
function comparePagesForVendor(vendor: string) {
  return COMPARISONS.filter((c) => {
    const parts = c.slug.split('-vs-');
    return parts[0] === vendor || parts[1] === vendor;
  });
}

const FOUNDERS_URL = process.env.NEXT_PUBLIC_PREORDER_STRIPE_URL || '';

export async function generateStaticParams() {
  return FAILURES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const f = getFailure(params.slug);
  if (!f) return {};
  return {
    title: f.metaTitle,
    description: f.metaDesc,
    alternates: { canonical: `https://www.aivideoauditor.com/failures/${f.slug}` },
    openGraph: {
      title: f.metaTitle,
      description: f.metaDesc,
      type: 'article',
    },
  };
}

export default function FailurePage({ params }: { params: { slug: string } }) {
  const f = getFailure(params.slug);
  if (!f) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: f.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: f.title,
    description: f.metaDesc,
    author: { '@type': 'Organization', name: 'AIVideoAuditor' },
    publisher: {
      '@type': 'Organization',
      name: 'AIVideoAuditor',
      url: 'https://www.aivideoauditor.com',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.aivideoauditor.com' },
      { '@type': 'ListItem', position: 2, name: 'Failure Reference', item: 'https://www.aivideoauditor.com/failures' },
      { '@type': 'ListItem', position: 3, name: f.title, item: `https://www.aivideoauditor.com/failures/${f.slug}` },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Prevent ${f.technicalTerm} Before You Generate`,
    description: `Step-by-step process to recognise ${f.technicalTerm} risk in your prompt before committing credits, and how to escalate to support if the failure happens anyway.`,
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Score your prompt before you generate',
        text: `Run your prompt through AVA's pre-flight scoring against the ${f.technicalTerm} pattern. If the indicator is yellow or red, rewrite using the suggested fix before you commit credits.`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Capture Generation ID + timestamp if it failed anyway',
        text: 'If you generated and the failure occurred, capture the Generation ID from the URL or share link plus the exact timestamp the failure first appears.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Use the correct technical term in your support ticket',
        text: `Describe the failure to support as "${f.technicalTerm}". This term maps to a recognised internal workflow in support systems and routes the ticket to the right team faster.`,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Submit through the correct support channel',
        text: 'Pro+ tier: in-app AI Assistant on app.runwayml.com (help widget bottom-right). Free / Standard tier: Discord #community-help. Attach your evidence package either way.',
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen py-20 px-6">
        <div className="max-w-3xl mx-auto">

          <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
            <span className="mx-2 text-rule">/</span>
            <Link href="/failures" className="hover:text-ink-secondary transition-colors">Failure Modes</Link>
            <span className="mx-2 text-rule">/</span>
            <span className="text-ink-secondary">{f.technicalTerm}</span>
          </nav>

          {/* Hero */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className={`font-mono text-[10px] tracking-kicker uppercase px-2 py-0.5 rounded border ${
                f.risk === 'CRITICAL'
                  ? 'bg-neon-red/10 border-neon-red/30 text-neon-red'
                  : 'bg-neon-amber/10 border-neon-amber/30 text-neon-amber'
              }`}>{f.risk}</span>
              <span className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted">Failure Reference</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink-primary mb-4 leading-tight tracking-tight">
              {f.title}
            </h1>
            <div className="border border-rule rounded-md p-4 mb-4 bg-surface">
              <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-1">Technical Classification</p>
              <p className="font-mono font-semibold text-ink-primary text-sm">{f.technicalTerm}</p>
            </div>
            <p className="text-ink-secondary leading-relaxed">{f.longDesc}</p>
          </div>

          {/* Symptoms */}
          <section className="mb-10" aria-label="Symptoms">
            <h2 className="font-display text-2xl font-semibold text-ink-primary mb-4 leading-tight tracking-tight">How to identify this failure</h2>
            <ul className="space-y-2">
              {f.symptoms.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm text-ink-secondary">
                  <span className="text-neon-red mt-0.5 shrink-0">✕</span>
                  {s}
                </li>
              ))}
            </ul>
          </section>

          {/* Real examples */}
          {f.examples.length > 0 && (
            <section className="mb-10" aria-label="Examples">
              <h2 className="font-display text-2xl font-semibold text-ink-primary mb-4 leading-tight tracking-tight">Real generation examples</h2>
              <div className="space-y-4">
                {f.examples.map((ex, i) => (
                  <div key={i} className="border border-rule rounded-md p-5 bg-surface">
                    <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-2">Prompt used</p>
                    <p className="font-mono text-sm text-ink-secondary italic mb-3">{ex.prompt}</p>
                    <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-1">Failure observed{ex.timestamp ? ` @ ${ex.timestamp}` : ''}</p>
                    <p className="text-sm text-neon-red">{ex.failure}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Evidence quality signal (no refund framing) */}
          <section className="mb-10">
            <h2 className="font-display text-2xl font-semibold text-ink-primary mb-4 leading-tight tracking-tight">Documentation strength</h2>
            <div className="border-l-2 border-neon-green/50 pl-5 py-1">
              <p className="font-mono text-[10px] tracking-kicker uppercase text-neon-green mb-2">If you need to escalate</p>
              <p className="text-ink-secondary text-sm leading-relaxed">{f.documentationStrength}</p>
              <p className="text-ink-muted text-xs mt-3 italic leading-relaxed">
                AVA is a pre-purchase prevention tool, not a post-purchase recovery tool. Platforms generally do not guarantee credit refunds for output-quality failures; goodwill credits are at each platform&apos;s discretion. The strength rating reflects how well-formed your support ticket can be, not a promised outcome.
              </p>
            </div>
          </section>

          {/* How to document */}
          <section className="mb-10">
            <h2 className="font-display text-2xl font-semibold text-ink-primary mb-4 leading-tight tracking-tight">Prevention + documentation steps</h2>
            <ol className="space-y-5">
              {[
                {
                  n: '01',
                  title: 'Score your prompt before you generate',
                  body: `Run your prompt through AVA's pre-flight scoring against the ${f.technicalTerm} pattern. Green light = generate. Yellow/red = rewrite using the suggested fix before you commit credits.`,
                },
                {
                  n: '02',
                  title: 'Capture Generation ID + timestamp if it failed anyway',
                  body: `Find the Generation ID in the URL or share link. Note the exact time when the ${f.technicalTerm} first appears (e.g. "failure first visible at 1.2s"). Timestamped evidence is significantly stronger than a general complaint.`,
                },
                {
                  n: '03',
                  title: 'Use the correct technical term in your support ticket',
                  body: `Describe this failure as "${f.technicalTerm}". This term maps to a recognised internal workflow in the support system and routes the ticket to the right team.`,
                },
                {
                  n: '04',
                  title: 'Submit via the correct support channel',
                  body: "Runway has no direct email intake. Pro+ plan: open the in-app AI Assistant (help widget bottom-right of app.runwayml.com), describe the failure with the technical term, attach evidence. Free/Standard plan: human support isn't available — your channel is Discord #community-help with @On Call - Moderators.",
                },
              ].map((step) => (
                <li key={step.n} className="flex gap-5">
                  <div className="shrink-0 w-9 h-9 rounded border border-rule flex items-center justify-center bg-paper">
                    <span className="text-neon-amber font-mono font-semibold text-xs">{step.n}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-ink-primary text-sm mb-1">{step.title}</p>
                    <p className="text-ink-secondary text-sm leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          <section className="mb-12" aria-label="FAQ">
            <h2 className="font-display text-2xl font-semibold text-ink-primary mb-6 leading-tight tracking-tight">Frequently asked questions</h2>
            <div className="space-y-4">
              {f.faq.map((item) => (
                <div key={item.q} className="border border-rule rounded-md p-5 bg-surface">
                  <h3 className="text-ink-primary font-semibold mb-2 text-sm">{item.q}</h3>
                  <p className="text-ink-secondary text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA — free extension first, founders' offer second */}
          {(() => {
            const platform = f.slug.split('-')[0];
            const autoDetected = platform === 'luma' || platform === 'runway';
            return (
              <>
                <div className="border border-neon-green/30 rounded-md p-8 text-center bg-paper">
                  <p className="font-mono text-[10px] tracking-kicker uppercase text-neon-green mb-3">
                    {autoDetected ? 'Catch it before you generate' : 'Score your prompt'}
                  </p>
                  <h2 className="font-display text-2xl font-semibold text-ink-primary mb-3 leading-tight tracking-tight">
                    {autoDetected ? 'AVA scores this failure mode against your prompt in real time' : 'Score your prompt against this failure mode in 30 seconds'}
                  </h2>
                  <p className="text-ink-secondary text-sm leading-relaxed mb-6 max-w-md mx-auto">
                    {autoDetected
                      ? 'Free Chrome extension. Analyzes your prompt as you type, flags failure-prone patterns specific to this model, and tells you what to rewrite — before you commit credits to a generation that will fail.'
                      : 'Paste your prompt and the platform you intend to use. AVA returns a red/yellow/green score against this specific failure mode plus a concrete rewrite if the risk is high.'}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <a
                      href="https://chromewebstore.google.com/detail/aivideoauditor/ecomchbdfkgakaoponipjgpnjfpimdef"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-neon-green/15 hover:bg-neon-green/25 border border-neon-green/40 text-neon-green font-mono font-semibold text-[11px] tracking-wide uppercase px-5 py-2.5 rounded-md transition-colors"
                    >
                      Install free
                    </a>
                    <Link
                      href="/failures"
                      className="inline-flex items-center gap-2 border border-rule hover:border-ink-secondary text-ink-secondary hover:text-ink-primary font-mono font-medium text-[11px] tracking-wide uppercase px-5 py-2.5 rounded-md transition-colors"
                    >
                      All 105 failure modes
                    </Link>
                  </div>
                </div>

                {/* Founders' offer — secondary nudge */}
                {FOUNDERS_URL && (
                  <div className="mt-6 border border-neon-amber/30 rounded-md p-5 bg-paper">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div>
                        <p className="font-mono text-[10px] tracking-kicker uppercase text-neon-amber mb-1">
                          AVA Pro · founders&apos; round
                        </p>
                        <p className="text-sm text-ink-secondary leading-relaxed">
                          <strong className="text-ink-primary">$50 for 6 months</strong> of unlimited scoring across all failure modes + personal failure-history dashboard. Locks in $13/mo grandfathered after.
                        </p>
                      </div>
                      <a
                        href={FOUNDERS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-neon-amber/15 hover:bg-neon-amber/25 border border-neon-amber/40 text-neon-amber font-mono font-semibold text-[11px] tracking-wide uppercase px-5 py-2.5 rounded-md transition-colors whitespace-nowrap"
                      >
                        Claim $50 founders
                      </a>
                    </div>
                  </div>
                )}
              </>
            );
          })()}

          {/* Related failures (cross-model) */}
          <section className="mt-12">
            <h2 className="font-display text-xl font-semibold text-ink-primary mb-2 leading-tight tracking-tight">Related failures across models</h2>
            <p className="text-ink-muted text-sm mb-4 max-w-prose">
              If you&rsquo;re seeing this failure, you may also encounter these on other models:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {getRelatedFailures(f.slug, 6).map((other) => {
                const model = other.slug.split('-')[0];
                const modelLabel = model.charAt(0).toUpperCase() + model.slice(1);
                return (
                  <Link
                    key={other.slug}
                    href={`/failures/${other.slug}`}
                    className="border border-rule hover:border-neon-amber/40 rounded-md p-4 bg-surface transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted">{modelLabel}</span>
                        <p className="font-mono font-semibold text-ink-primary text-xs">{other.technicalTerm.split(' ')[0]}</p>
                      </div>
                      <span className={`font-mono text-[10px] tracking-kicker uppercase ${other.risk === 'CRITICAL' ? 'text-neon-red' : 'text-neon-amber'}`}>
                        {other.risk}
                      </span>
                    </div>
                    <p className="text-ink-muted text-xs leading-relaxed">{other.shortDesc.substring(0, 70)}…</p>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Internal-linking density: cross-link to alternatives + head-to-head comparisons
              for this failure's vendor. Boosts PageRank flow between the failure ledger,
              the alternatives ladder, and the comparison matrix. */}
          {(() => {
            const vendor = f.slug.split('-')[0];
            const vendorLabel = vendor.charAt(0).toUpperCase() + vendor.slice(1);
            const hasAlt = ALTERNATIVES_SLUGS.has(vendor);
            const comparePages = comparePagesForVendor(vendor).slice(0, 3);
            if (!hasAlt && comparePages.length === 0) return null;
            return (
              <section className="mt-12">
                <h2 className="font-display text-xl font-semibold text-ink-primary mb-2 leading-tight tracking-tight">
                  Pick a different tool for {vendorLabel} failures
                </h2>
                <p className="text-ink-muted text-sm mb-4 max-w-prose">
                  Some prompt shapes will keep failing on {vendorLabel}. Routing those shots to a different vendor is the cheapest fix.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hasAlt && (
                    <Link
                      href={`/alternatives/${vendor}`}
                      className="border border-rule hover:border-neon-amber/40 rounded-md p-4 bg-surface transition-colors"
                    >
                      <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-1">Alternatives</p>
                      <p className="font-mono font-semibold text-ink-primary text-xs mb-1">{vendorLabel} alternatives</p>
                      <p className="text-ink-muted text-xs leading-relaxed">Ranked substitutes by shot type — character, motion, lighting, audio, brand product.</p>
                    </Link>
                  )}
                  {comparePages.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/compare/${c.slug}`}
                      className="border border-rule hover:border-neon-amber/40 rounded-md p-4 bg-surface transition-colors"
                    >
                      <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-1">Head-to-head</p>
                      <p className="font-mono font-semibold text-ink-primary text-xs mb-1">{c.toolA} vs {c.toolB}</p>
                      <p className="text-ink-muted text-xs leading-relaxed">{c.toolALongName} · {c.toolBLongName}</p>
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
