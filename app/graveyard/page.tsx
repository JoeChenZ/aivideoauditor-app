import type { Metadata } from 'next';
import Link from 'next/link';
import { SHUTDOWNS } from './[slug]/data';
import LeadCaptureForm from '@/components/lead-capture-form';
import { WidePageShell, Breadcrumb, ArticleHeader, SectionHead, Kicker, RuleDivider } from '@/components/editorial';

export const metadata: Metadata = {
  title: 'AI Tool Graveyard — Vendor Stability Tracker & Migration Paths',
  description: 'A tracked, sourced record of every shut-down or being-shut-down AI tool. Vendor stability signals and migration paths. Sora 2, Yopisora, Inflection Pi, Adept AI, GPT-3 davinci, and more.',
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

export default function GraveyardIndex() {
  const sorted = [...SHUTDOWNS].sort((a, b) => {
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
    description: 'Catalog of shut-down AI tools with stability signals and migration paths.',
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
      <WidePageShell>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Graveyard' }]} />

        <div className="max-w-reading">
          <ArticleHeader
            kicker={`AI tool graveyard · ${SHUTDOWNS.length} tools tracked`}
            title={<>When an AI tool <span className="italic">dies</span>, where do you go?</>}
            lede="A tracked, sourced record of every shut-down or being-shut-down AI tool. Vendor stability signals, parent-company status, and migration paths for users who need to move."
            byline={<>AIVideoAuditor desk · Updated weekly · Some records marked Draft while we close fact-checks</>}
          />
        </div>

        <section className="mb-16">
          <SectionHead kicker="Full catalog" title="By category." />
          <div className="space-y-10 mt-8">
            {Object.entries(byCategory).map(([cat, items]) => (
              <div key={cat} className="border-t border-rule/60 pt-6">
                <Kicker className="mb-4">{cat} · {items.length}</Kicker>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {items.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/graveyard/${s.slug}`}
                      className="border border-rule hover:border-neon-amber/40 rounded-md p-5 bg-surface transition-colors block"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-display text-base font-semibold text-ink-primary">{s.toolName}</p>
                        <span className={`font-mono text-[10px] tracking-kicker uppercase ${STATUS_COLOR[s.status]}`}>
                          {STATUS_LABEL[s.status]}
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-ink-muted mb-2">{s.parentCompany}</p>
                      {s.shutdownAnnounced && (
                        <p className="font-mono text-[10px] text-ink-muted">
                          Announced {s.shutdownAnnounced}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <RuleDivider label="Continue exploring" />

        <section className="mb-16" aria-label="Continue exploring">
          <p className="text-ink-muted text-sm mb-6 max-w-prose">
            More resources for picking the right tool before you subscribe.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/alternatives" className="border border-rule hover:border-ink-secondary rounded-md p-5 bg-surface transition-colors block">
              <Kicker className="mb-2">Alternatives guides</Kicker>
              <p className="font-display text-base font-semibold text-ink-primary mb-1.5">Ranked substitutes for every major tool</p>
              <p className="text-ink-muted text-xs">8 tools covered. Pick by shot type, not by leaderboard.</p>
            </Link>
            <Link href="/compare" className="border border-rule hover:border-ink-secondary rounded-md p-5 bg-surface transition-colors block">
              <Kicker className="mb-2">Head-to-head comparisons</Kicker>
              <p className="font-display text-base font-semibold text-ink-primary mb-1.5">Detailed pairwise comparisons</p>
              <p className="text-ink-muted text-xs">Runway vs Luma, Sora vs Veo, Kling vs Runway, more.</p>
            </Link>
            <Link href="/failures" className="border border-rule hover:border-ink-secondary rounded-md p-5 bg-surface transition-colors block">
              <Kicker className="mb-2">Failure reference</Kicker>
              <p className="font-display text-base font-semibold text-ink-primary mb-1.5">105 documented failure modes</p>
              <p className="text-ink-muted text-xs">Catalogued across Runway, Luma, Sora, Pika, Kling, Veo, Hailuo, Vidu.</p>
            </Link>
            <Link href="/tools/credit-calculator" className="border border-rule hover:border-ink-secondary rounded-md p-5 bg-surface transition-colors block">
              <Kicker className="mb-2">Free calculator</Kicker>
              <p className="font-display text-base font-semibold text-ink-primary mb-1.5">Your real cost per usable clip</p>
              <p className="text-ink-muted text-xs">No signup.</p>
            </Link>
          </div>
        </section>

        <section className="mb-16 max-w-prose">
          <LeadCaptureForm
            source="graveyard-index"
            heading="When the next AI tool dies, we will let you know"
            blurb="The AI-tool category is consolidating violently. Drop your email — one notification per major shutdown event with the migration path, never marketing."
            cta="Track the graveyard for me"
          />
        </section>

        <section className="border-t border-rule/60 pt-10 max-w-reading">
          <SectionHead kicker="Why this exists" title="Stranded users need one place to check." />
          <p className="text-ink-secondary leading-relaxed mb-3 max-w-prose">
            The AI-tool category is consolidating violently. VC funding cliffs, acquihires, architecture obsolescence, and product pivots are killing tools at unprecedented rate.
          </p>
          <p className="text-ink-secondary leading-relaxed mb-3 max-w-prose">
            This page is what we would want as a stranded user: one place to check, every record sourced, every migration path mapped.
          </p>
          <p className="font-mono text-[11px] text-ink-muted">
            Built as a companion to <Link href="/" className="text-ink-secondary hover:text-ink-primary transition-colors">AVA</Link>, the AI video failure-mode auditor. Some records are flagged for verification — we publish them with a Draft badge rather than hide them.
          </p>
        </section>
      </WidePageShell>
    </>
  );
}
