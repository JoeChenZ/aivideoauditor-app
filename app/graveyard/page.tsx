import type { Metadata } from 'next';
import Link from 'next/link';
import { SHUTDOWNS } from './[slug]/data';
import LeadCaptureForm from '@/components/lead-capture-form';

export const metadata: Metadata = {
  title: 'AI Tool Graveyard — Vendor Stability Tracker & Migration Paths',
  description: 'A tracked, sourced record of every shut-down or being-shut-down AI tool. Vendor stability signals, migration paths, and refund-window status when relevant. Sora 2, Yopisora, Inflection Pi, Adept AI, GPT-3 davinci, and more.',
  alternates: { canonical: 'https://www.aivideoauditor.com/graveyard' },
  openGraph: {
    title: 'AI Tool Graveyard — Vendor Stability Tracker & Migration Paths',
    description: 'When an AI tool dies, where do you go? Tracked records of every shut-down AI tool with vendor stability signals + migration paths.',
    type: 'website',
  },
};

const STATUS_COLOR: Record<string, string> = {
  active: 'text-neon-green',
  deprecated: 'text-neon-amber',
  sunsetting: 'text-neon-amber',
  dead: 'text-neon-red',
};

const STATUS_LABEL: Record<string, string> = {
  active: 'Active',
  deprecated: 'Deprecated',
  sunsetting: 'Sunsetting',
  dead: 'Dead',
};

const REFUND_BADGE: Record<string, string> = {
  active: 'Refund window OPEN',
  closed: 'Refund closed',
  none: 'No refund',
  unknown: 'Refund unknown',
};

export default function GraveyardIndex() {
  // Sort: refund-window-open first, then by shutdownAnnounced descending
  const sorted = [...SHUTDOWNS].sort((a, b) => {
    if (a.refundStatus === 'active' && b.refundStatus !== 'active') return -1;
    if (b.refundStatus === 'active' && a.refundStatus !== 'active') return 1;
    return (b.shutdownAnnounced || '').localeCompare(a.shutdownAnnounced || '');
  });

  const byCategory: Record<string, typeof SHUTDOWNS> = {};
  for (const s of SHUTDOWNS) {
    byCategory[s.categoryLabel] = byCategory[s.categoryLabel] || [];
    byCategory[s.categoryLabel].push(s);
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI Tool Graveyard',
    description: 'Catalog of shut-down AI tools with refund deadlines and migration paths.',
    itemListElement: sorted.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://www.aivideoauditor.com/graveyard/${s.slug}`,
      name: s.toolName,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <main className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Breadcrumb */}
          <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-primary">Graveyard</span>
          </nav>

          {/* Hero */}
          <div className="mb-12">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-3">
              AI Tool Graveyard · {SHUTDOWNS.length} tools tracked
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-ink-primary mb-4 leading-tight">
              When an AI tool dies, where do you go?
            </h1>
            <p className="text-ink-secondary leading-relaxed max-w-2xl">
              A tracked, sourced, refund-ready record of every shut-down or being-shut-down AI tool.
              Find your migration path, file your refund, move on.
            </p>
          </div>

          {/* Open refund windows callout */}
          {(() => {
            const open = sorted.filter((s) => s.refundStatus === 'active');
            if (open.length === 0) return null;
            return (
              <div className="mb-12 bg-neon-green/5 border border-neon-green/20 rounded-2xl p-6">
                <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
                  {open.length} refund {open.length === 1 ? 'window' : 'windows'} currently open
                </p>
                <p className="text-ink-secondary text-sm mb-4">
                  Each closes on the date shown — file before the window shuts.
                </p>
                <div className="space-y-2">
                  {open.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/graveyard/${s.slug}`}
                      className="block bg-surface border border-border rounded-xl p-4 hover:border-neon-green/30 transition-colors"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <p className="font-bold text-ink-primary text-sm">{s.toolName}</p>
                          <p className="text-xs text-ink-muted">{s.parentCompany}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-mono text-neon-green">
                            Window closes {s.refundWindowClose || 'TBD'}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Full catalog by category */}
          <section>
            <h2 className="text-xl font-bold text-ink-primary mb-6">Full catalog</h2>
            <div className="space-y-8">
              {Object.entries(byCategory).map(([cat, items]) => (
                <div key={cat}>
                  <h3 className="text-sm font-mono font-bold tracking-wider text-neon-purple uppercase mb-3">
                    {cat} · {items.length}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {items.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/graveyard/${s.slug}`}
                        className="bg-elevated border border-border rounded-xl p-5 hover:border-neon-red/30 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-bold text-ink-primary text-sm">{s.toolName}</p>
                          <span className={`text-xs font-mono font-bold ${STATUS_COLOR[s.status]}`}>
                            {STATUS_LABEL[s.status]}
                          </span>
                        </div>
                        <p className="text-xs text-ink-muted mb-3">{s.parentCompany}</p>
                        <p className="text-xs font-mono text-ink-muted">
                          {s.refundStatus === 'active' ? (
                            <span className="text-neon-green">{REFUND_BADGE[s.refundStatus]}</span>
                          ) : (
                            REFUND_BADGE[s.refundStatus]
                          )}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Continue exploring — cross-links */}
          <section className="mt-12" aria-label="Continue exploring">
            <h2 className="text-xl font-bold text-ink-primary mb-2">Continue exploring</h2>
            <p className="text-ink-muted text-sm mb-6">
              More resources for picking the right tool and recovering credits when things go wrong.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/alternatives" className="bg-elevated border border-border rounded-xl p-5 hover:border-neon-purple/30 transition-colors block">
                <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-2">Alternatives guides</p>
                <p className="text-ink-primary font-bold text-sm mb-1">Ranked substitutes for every major tool</p>
                <p className="text-ink-muted text-xs">8 tools covered. Pick by shot type, not by leaderboard.</p>
              </Link>
              <Link href="/compare" className="bg-elevated border border-border rounded-xl p-5 hover:border-neon-purple/30 transition-colors block">
                <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-2">Head-to-head comparisons</p>
                <p className="text-ink-primary font-bold text-sm mb-1">Detailed pairwise comparisons</p>
                <p className="text-ink-muted text-xs">Runway vs Luma, Sora vs Veo, Kling vs Runway, and more.</p>
              </Link>
              <Link href="/failures" className="bg-elevated border border-border rounded-xl p-5 hover:border-neon-red/30 transition-colors block">
                <p className="text-xs font-mono font-bold tracking-widest text-neon-red uppercase mb-2">Failure reference</p>
                <p className="text-ink-primary font-bold text-sm mb-1">94 documented failure modes</p>
                <p className="text-ink-muted text-xs">Use these technical names in refund tickets for fastest approval.</p>
              </Link>
              <Link href="/tools/credit-calculator" className="bg-elevated border border-border rounded-xl p-5 hover:border-neon-green/30 transition-colors block">
                <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-2">Free calculator</p>
                <p className="text-ink-primary font-bold text-sm mb-1">How much are you leaving on the table?</p>
                <p className="text-ink-muted text-xs">Estimate your refund recovery — no signup.</p>
              </Link>
            </div>
          </section>

          {/* Lead capture — converts shutdown-anxiety visitors */}
          <div className="mt-12">
            <LeadCaptureForm
              source="graveyard-index"
              heading="When the next AI tool dies, we'll let you know — before the refund window closes"
              blurb={`Sora 2's API winds down September 2026 — file refunds before then. The next tool will die too. AVA tracks refund deadlines + technical failure-mode names across every major provider. Drop your email — one notification per shutdown event, never marketing.`}
              cta="Track refund deadlines for me →"
            />
          </div>

          {/* About */}
          <section className="mt-12 bg-elevated border border-border rounded-2xl p-8">
            <h2 className="text-xl font-bold text-ink-primary mb-4">Why this exists</h2>
            <p className="text-ink-secondary text-sm leading-relaxed mb-3">
              The AI-tool category is consolidating violently. VC funding cliffs, acquihires,
              architecture obsolescence, and product pivots are killing tools at unprecedented rate.
              Refund windows close while users are still figuring out what happened.
            </p>
            <p className="text-ink-secondary text-sm leading-relaxed mb-3">
              This page is what we&apos;d want as a stranded user: one place to check, every record sourced,
              every refund flow documented, every migration path mapped.
            </p>
            <p className="text-ink-muted text-xs">
              Built as a companion to <Link href="/" className="text-neon-purple hover:underline">AVA</Link>,
              the AI video failure-mode auditor. Some records are still flagged for verification —
              we publish them with the &quot;Draft&quot; badge rather than hide them, so you can use the data
              while we close out fact-checks.
            </p>
          </section>

        </div>
      </main>
    </>
  );
}
