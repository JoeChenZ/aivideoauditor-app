import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getFailure, FAILURES, getRelatedFailures } from './data';
// FAILURES still referenced by generateStaticParams below.

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

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Document ${f.technicalTerm} for a Refund`,
    description: `Step-by-step process to document ${f.technicalTerm} and submit a refund-grade evidence package to support.`,
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Capture your Generation ID',
        text: 'Find it in the URL or share link. Without this, support cannot verify the generation on their end.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Note the exact timestamp',
        text: `Note the exact time when the ${f.technicalTerm} first appears (e.g., "failure first visible at 1.2s"). Timestamped evidence is significantly stronger than a general complaint.`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Use the correct technical term',
        text: `In your refund request, describe this failure as "${f.technicalTerm}". This term maps to a recognised internal workflow in the support system.`,
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

      <main className="min-h-screen py-20 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/guide" className="hover:text-ink-secondary transition-colors">Refund Guide</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-primary">{f.technicalTerm}</span>
          </nav>

          {/* Hero */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${
                f.risk === 'CRITICAL'
                  ? 'bg-neon-red/10 border border-neon-red/30 text-neon-red'
                  : 'bg-neon-amber/10 border border-neon-amber/30 text-neon-amber'
              }`}>{f.risk}</span>
              <span className="text-xs font-mono text-ink-muted uppercase tracking-widest">Failure Reference</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-ink-primary mb-4 leading-tight">
              {f.title}
            </h1>
            <div className="bg-elevated border border-border rounded-xl p-4 mb-4">
              <p className="text-xs font-mono text-neon-purple mb-1">Technical Classification</p>
              <p className="font-mono font-bold text-ink-primary text-sm">{f.technicalTerm}</p>
            </div>
            <p className="text-ink-secondary leading-relaxed">{f.longDesc}</p>
          </div>

          {/* Symptoms */}
          <section className="mb-10" aria-label="Symptoms">
            <h2 className="text-xl font-bold text-ink-primary mb-4">How to Identify This Failure</h2>
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
              <h2 className="text-xl font-bold text-ink-primary mb-4">Real Generation Examples</h2>
              <div className="space-y-4">
                {f.examples.map((ex, i) => (
                  <div key={i} className="bg-elevated border border-border rounded-xl p-5">
                    <p className="text-xs font-mono text-ink-muted mb-2">Prompt used:</p>
                    <p className="font-mono text-sm text-ink-secondary italic mb-3">{ex.prompt}</p>
                    <p className="text-xs font-mono text-ink-muted mb-1">Failure observed{ex.timestamp ? ` @ ${ex.timestamp}` : ''}:</p>
                    <p className="text-sm text-neon-red">{ex.failure}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Refund strength */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-ink-primary mb-4">Refund Success Likelihood</h2>
            <div className="bg-neon-green/5 border border-neon-green/20 rounded-xl p-5">
              <p className="text-neon-green text-sm font-mono font-bold mb-1">Refund Strength</p>
              <p className="text-ink-secondary text-sm">{f.refundStrength}</p>
            </div>
          </section>

          {/* How to document */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-ink-primary mb-4">How to Document This for a Refund</h2>
            <ol className="space-y-4">
              {[
                { n: '01', title: 'Capture your Generation ID', body: 'Find it in the URL or share link. Without this, Runway support cannot verify the generation on their end.' },
                { n: '02', title: 'Note the exact timestamp', body: `Note the exact time when the ${f.technicalTerm} first appears (e.g., "failure first visible at 1.2s"). Timestamped evidence is significantly stronger than a general complaint.` },
                { n: '03', title: 'Use the correct technical term', body: `In your refund request, describe this failure as "${f.technicalTerm}". This term maps to a recognised internal workflow in Runway's support system.` },
                { n: '04', title: 'Submit via Runway AI Assistant (Pro+) or Discord #community-help (Free/Standard)', body: "Runway has no direct email intake. Pro+ plan: open the in-app AI Assistant (help widget bottom-right of app.runwayml.com), describe the failure, request a refund — the support team replies via email after the ticket opens. Free/Standard plan: human support isn't available, your channel is Discord #community-help with @On Call - Moderators. Paste your refund message either way and attach the PDF audit report." },
              ].map((step) => (
                <li key={step.n} className="flex gap-5">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-neon-red/10 border border-neon-red/30 flex items-center justify-center">
                    <span className="text-neon-red font-mono font-bold text-xs">{step.n}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-ink-primary text-sm mb-1">{step.title}</p>
                    <p className="text-ink-secondary text-sm">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          <section className="mb-12" aria-label="FAQ">
            <h2 className="text-xl font-bold text-ink-primary mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {f.faq.map((item) => (
                <div key={item.q} className="bg-surface border border-border rounded-xl p-5">
                  <h3 className="text-ink-primary font-semibold mb-2 text-sm">{item.q}</h3>
                  <p className="text-ink-secondary text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA — platform-aware: extension auto-detects on Luma + Runway, manual generator for everything else */}
          {(() => {
            const platform = f.slug.split('-')[0];
            const autoDetected = platform === 'luma' || platform === 'runway';
            return (
              <div className="bg-surface border border-neon-green/20 rounded-2xl p-8 text-center">
                <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
                  {autoDetected ? 'Document It Automatically' : 'Build Your Audit Report'}
                </p>
                <h2 className="text-2xl font-bold text-ink-primary mb-3">
                  {autoDetected ? 'AVA captures all the evidence for you' : 'Generate a refund-ready letter in 2 minutes'}
                </h2>
                <p className="text-ink-secondary text-sm mb-6 max-w-md mx-auto">
                  {autoDetected
                    ? 'Install the free Chrome extension. It captures your Generation ID, lets you mark the exact broken frames with timestamps, and generates a professional refund letter — or a PDF Technical Audit Report (Pro).'
                    : 'Paste your Generation ID, prompt, and the timestamp of the visible failure. AVA formats the technical audit letter using the correct named failure category — the language that maps to the support team’s internal workflow.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {autoDetected ? (
                    <>
                      <a
                        href="https://chromewebstore.google.com/detail/aivideoauditor/ecomchbdfkgakaoponipjgpnjfpimdef"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-mono font-bold px-6 py-3 rounded-xl transition-all"
                      >
                        Install Free Extension →
                      </a>
                      <Link
                        href="/tools/refund-letter-generator"
                        className="inline-flex items-center justify-center gap-2 bg-elevated hover:bg-elevated/80 border border-border text-ink-secondary font-mono font-semibold px-6 py-3 rounded-xl transition-all text-sm"
                      >
                        Or Generate Manually →
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/tools/refund-letter-generator"
                        className="inline-flex items-center justify-center gap-2 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-mono font-bold px-6 py-3 rounded-xl transition-all"
                      >
                        Generate Refund Letter →
                      </Link>
                      <Link
                        href="/guide"
                        className="inline-flex items-center justify-center gap-2 bg-elevated hover:bg-elevated/80 border border-border text-ink-secondary font-mono font-semibold px-6 py-3 rounded-xl transition-all text-sm"
                      >
                        Read the Full Refund Guide
                      </Link>
                    </>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Related failures (cross-model) */}
          <section className="mt-12">
            <h2 className="text-lg font-bold text-ink-primary mb-2">Related Failures Across Models</h2>
            <p className="text-ink-muted text-sm mb-4">
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
                    className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-red/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-neon-purple uppercase tracking-wider">{modelLabel}</span>
                        <p className="font-mono font-bold text-ink-primary text-sm">{other.technicalTerm.split(' ')[0]}</p>
                      </div>
                      <span className={`text-xs font-mono font-bold ${other.risk === 'CRITICAL' ? 'text-neon-red' : 'text-neon-amber'}`}>
                        {other.risk}
                      </span>
                    </div>
                    <p className="text-ink-muted text-xs">{other.shortDesc.substring(0, 70)}…</p>
                  </Link>
                );
              })}
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
