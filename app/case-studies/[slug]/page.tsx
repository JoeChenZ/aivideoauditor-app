import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CASE_STUDIES, getCaseStudy } from './data';
import { ALTERNATIVES } from '../../alternatives/[slug]/data';
import { COMPARISONS } from '../../compare/[slug]/data';

const ALT_BY_SLUG = new Map(ALTERNATIVES.map((a) => [a.slug, a]));

// Pull recognisable vendor slugs out of the case-study's toolsUsed strings.
// Each tool string is free-text ("Sora 2 (until April 26, 2026...)"), so we
// look for known vendor tokens. Returns unique slugs in encounter order.
function detectVendors(toolsUsed: string[]): string[] {
  const tokens: Array<[RegExp, string]> = [
    [/\brunway\b/i, 'runway'],
    [/\bluma\b/i, 'luma'],
    [/\bsora\b/i, 'sora'],
    [/\bveo\b/i, 'veo'],
    [/\bkling\b/i, 'kling'],
    [/\bpika\b/i, 'pika'],
    [/\bhailuo\b/i, 'hailuo'],
    [/\bvidu\b/i, 'vidu'],
    [/\bseedance\b/i, 'seedance'],
  ];
  const found = new Set<string>();
  const ordered: string[] = [];
  for (const t of toolsUsed) {
    for (const [re, slug] of tokens) {
      if (re.test(t) && !found.has(slug)) {
        found.add(slug);
        ordered.push(slug);
      }
    }
  }
  return ordered;
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const c = getCaseStudy(params.slug);
  if (!c) return {};
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: { canonical: `https://www.aivideoauditor.com/case-studies/${c.slug}` },
    openGraph: { title: c.metaTitle, description: c.metaDesc, type: 'article' },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const c = getCaseStudy(params.slug);
  if (!c) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.title,
    description: c.metaDesc,
    author: { '@type': 'Organization', name: 'AIVideoAuditor' },
    publisher: { '@type': 'Organization', name: 'AIVideoAuditor', url: 'https://www.aivideoauditor.com' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.aivideoauditor.com' },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: 'https://www.aivideoauditor.com/case-studies' },
      { '@type': 'ListItem', position: 3, name: c.customerType, item: `https://www.aivideoauditor.com/case-studies/${c.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen py-20 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/case-studies" className="hover:text-ink-secondary transition-colors">Case Studies</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-primary">{c.customerType}</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-mono font-bold text-neon-green bg-neon-green/10 border border-neon-green/30 px-2 py-1 rounded">
                Case Study
              </span>
              <span className="text-xs font-mono text-ink-muted uppercase tracking-widest">
                Anonymized
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink-primary mb-6 leading-tight tracking-tight">
              {c.title}
            </h1>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="bg-elevated border border-border rounded-xl p-4">
                <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Recovered/mo</p>
                <p className="text-2xl font-bold text-neon-green">${c.totalRefundedMonthly}</p>
              </div>
              <div className="bg-elevated border border-border rounded-xl p-4">
                <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Net savings/mo</p>
                <p className="text-2xl font-bold text-ink-primary">${c.netMonthlySavings}</p>
              </div>
              <div className="bg-elevated border border-border rounded-xl p-4">
                <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Payback</p>
                <p className="text-2xl font-bold text-ink-primary">{c.paybackWeeks}wk</p>
              </div>
              <div className="bg-elevated border border-border rounded-xl p-4">
                <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Monthly spend</p>
                <p className="text-sm font-mono text-ink-primary">{c.monthlyAiVideoSpend}</p>
              </div>
            </div>

            {/* Pullout quote */}
            <blockquote className="border-l-4 border-neon-green pl-6 py-3 mb-8 bg-neon-green/5 rounded-r-xl">
              <p className="text-ink-primary text-lg leading-relaxed italic">&ldquo;{c.quotePullout}&rdquo;</p>
              <p className="text-ink-muted text-xs mt-3 font-mono">— {c.customerType}</p>
            </blockquote>
          </div>

          {/* Customer profile */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-ink-primary mb-4">Customer profile</h2>
            <div className="bg-elevated border border-border rounded-xl p-5 space-y-3 text-sm">
              <div>
                <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Type</p>
                <p className="text-ink-secondary">{c.customerType}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Scale</p>
                <p className="text-ink-secondary">{c.customerSize}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Tools used</p>
                <p className="text-ink-secondary">{c.toolsUsed.join(', ')}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Primary failure modes</p>
                <p className="text-ink-secondary">{c.primaryFailureModes.join(', ')}</p>
              </div>
            </div>
          </section>

          {/* Problem */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-ink-primary mb-4">The problem</h2>
            <p className="text-ink-secondary leading-relaxed">{c.problemSummary}</p>
          </section>

          {/* Before AVA */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-ink-primary mb-4">Before AVA</h2>
            <p className="text-ink-secondary leading-relaxed">{c.beforeAva}</p>
          </section>

          {/* With AVA */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-ink-primary mb-4">With AVA</h2>
            <p className="text-ink-secondary leading-relaxed">{c.withAva}</p>
          </section>

          {/* Refund breakdown */}
          <section className="mb-10" aria-label="Refund breakdown">
            <h2 className="text-xl font-bold text-ink-primary mb-4">Refund breakdown (first month)</h2>
            <div className="bg-elevated border border-border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface/50 border-b border-border">
                    <th className="text-left py-3 px-4 text-ink-muted font-mono uppercase text-xs tracking-wider">Provider</th>
                    <th className="text-left py-3 px-4 text-ink-muted font-mono uppercase text-xs tracking-wider">Failure mode</th>
                    <th className="text-right py-3 px-4 text-ink-muted font-mono uppercase text-xs tracking-wider">Count</th>
                    <th className="text-right py-3 px-4 text-ink-muted font-mono uppercase text-xs tracking-wider">Refunded</th>
                  </tr>
                </thead>
                <tbody>
                  {c.refundBreakdown.map((r, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-b-0">
                      <td className="py-3 px-4 text-ink-secondary">{r.provider}</td>
                      <td className="py-3 px-4">
                        <Link href={r.href} className="text-neon-purple hover:underline">
                          {r.failureMode}
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-right text-ink-secondary font-mono">{r.count}</td>
                      <td className="py-3 px-4 text-right text-neon-green font-mono font-bold">${r.refundDollars}</td>
                    </tr>
                  ))}
                  <tr className="bg-neon-green/5">
                    <td className="py-3 px-4 text-ink-primary font-bold" colSpan={3}>Total recovered (first month)</td>
                    <td className="py-3 px-4 text-right text-neon-green font-mono font-bold text-lg">${c.totalRefundedMonthly}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Workflow changes */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-ink-primary mb-4">Workflow changes that stuck</h2>
            <ul className="space-y-3">
              {c.workflowChanges.map((change, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="text-neon-green mt-0.5 shrink-0">✓</span>
                  <span className="text-ink-secondary leading-relaxed">{change}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* What transfers */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-ink-primary mb-4">What transfers to similar customers</h2>
            <p className="text-ink-secondary leading-relaxed">{c.whatTransfers}</p>
          </section>

          {/* CTA */}
          <div className="bg-surface border border-neon-green/20 rounded-2xl p-8 text-center">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
              Recover credits you didn&apos;t know you could
            </p>
            <h2 className="text-2xl font-bold text-ink-primary mb-3">
              Free Chrome extension. Most users see $50-200/mo recovery in week 1.
            </h2>
            <p className="text-ink-secondary text-sm mb-6 max-w-md mx-auto">
              The auditor identifies the failure by name (Anatomical Topology, Color Coherence, Lip Sync, etc.)
              and drafts the refund email with the Generation ID. You click send.
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
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-elevated hover:bg-elevated/80 border border-border text-ink-secondary font-mono font-semibold px-6 py-3 rounded-xl transition-all text-sm"
              >
                See Pro features ($19/mo)
              </Link>
            </div>
          </div>

          {/* Cross-link to /alternatives/[vendor] + /compare/[A-vs-B] for vendors mentioned
              in this case study. Closes the link-graph triangle for case-studies as well —
              PageRank flows from a high-engagement narrative page to the high-intent
              alternatives + comparison ladder for the same vendors. */}
          {(() => {
            const vendors = detectVendors(c.toolsUsed);
            const altLinks = vendors.filter((v) => ALT_BY_SLUG.has(v)).slice(0, 3);
            const compareLinks = COMPARISONS.filter((cmp) => {
              const [a, b] = cmp.slug.split('-vs-');
              return vendors.includes(a) || vendors.includes(b);
            }).slice(0, 3);
            if (altLinks.length === 0 && compareLinks.length === 0) return null;
            return (
              <section className="mt-12">
                <h2 className="text-lg font-bold text-ink-primary mb-4">Compare the tools in this case study</h2>
                <p className="text-ink-muted text-sm mb-4 max-w-prose">
                  The customer in this story used multiple providers. These guides rank substitutes by shot type and break each vendor down head-to-head.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {altLinks.map((slug) => {
                    const alt = ALT_BY_SLUG.get(slug)!;
                    return (
                      <Link
                        key={`alt-${slug}`}
                        href={`/alternatives/${slug}`}
                        className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-amber/30 transition-colors"
                      >
                        <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-1">Alternatives</p>
                        <p className="font-mono font-bold text-ink-primary text-sm">{alt.toolName} alternatives</p>
                      </Link>
                    );
                  })}
                  {compareLinks.map((cmp) => (
                    <Link
                      key={`cmp-${cmp.slug}`}
                      href={`/compare/${cmp.slug}`}
                      className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors"
                    >
                      <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-1">Head-to-head</p>
                      <p className="font-mono font-bold text-ink-primary text-sm">{cmp.toolA} vs {cmp.toolB}</p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* Other case studies */}
          <section className="mt-12">
            <h2 className="text-lg font-bold text-ink-primary mb-4">Other case studies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CASE_STUDIES.filter((other) => other.slug !== c.slug).map((other) => (
                <Link
                  key={other.slug}
                  href={`/case-studies/${other.slug}`}
                  className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-green/30 transition-colors"
                >
                  <p className="font-mono font-bold text-ink-primary text-sm mb-1">${other.totalRefundedMonthly}/mo recovered</p>
                  <p className="text-xs text-ink-muted">{other.customerType}</p>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
