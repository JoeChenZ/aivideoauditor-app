import type { Metadata } from 'next';
import Link from 'next/link';
import { CASE_STUDIES } from './[slug]/data';
import LeadCaptureForm from '@/components/lead-capture-form';
import { WidePageShell, Breadcrumb, ArticleHeader, SectionHead, Kicker, RuleDivider } from '@/components/editorial';

export const metadata: Metadata = {
  title: 'AVA Case Studies — Real-World Failure-Mode Walk-Throughs',
  description: 'Anonymous case studies of AVA users — solo creators, agencies, brand accounts. How pre-purchase prompt scoring + failure-mode catalogues changed their AI video workflows.',
  alternates: { canonical: 'https://www.aivideoauditor.com/case-studies' },
  openGraph: {
    title: 'AVA Case Studies — Real-World Failure-Mode Walk-Throughs',
    description: 'How real AVA users caught AI-video failures before they cost credits — solo creators, agencies, brand accounts.',
    type: 'website',
  },
};

// Structured data — previously absent on /case-studies.
const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'AVA Case Studies',
  itemListElement: CASE_STUDIES.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `https://www.aivideoauditor.com/case-studies/${c.slug}`,
    name: c.title,
  })),
};
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.aivideoauditor.com' },
    { '@type': 'ListItem', position: 2, name: 'Case Studies', item: 'https://www.aivideoauditor.com/case-studies' },
  ],
};
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why are all case studies anonymous?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most AI video customers do not want to publicly disclose their workflow changes — it advertises their failure rate and exposes competitive advantage. Customer types, monthly spend ranges, provider names, and pattern data are all accurate; only the customer identity is obscured. Named case studies are available on request with a sign-off review.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of customers are profiled?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Solo creators (monthly spend $50-200), boutique agencies (monthly spend $500-3,000), and brand accounts (monthly spend $5,000+). Each case study includes customer type, problem, workflow before AVA, workflow with AVA, and the changes that stuck. Industries covered: e-commerce, education, lifestyle content, advertising, music videos.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does AVA change an AI video workflow in practice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The common pattern: pre-flight prompt scoring catches the 30-40% of prompts that would have failed before they are generated, and personal failure history shifts subjective trial-and-error into a feedback loop. Users typically cut their monthly credit burn by 40-60% within the first 30 days without changing their output volume.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I be featured in a case study?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Email joe@aivideoauditor.com. Named case studies typically include a 10-15 minute interview and your sign-off on the draft before publish. Anonymous case studies need only a permission email and the relevant workflow data.',
      },
    },
  ],
};

export default function CaseStudiesIndex() {
  return (
    <WidePageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Case Studies' }]} />

      <div className="max-w-reading">
        <ArticleHeader
          kicker={`Case studies · ${CASE_STUDIES.length} users`}
          title={<>How AVA users <span className="italic">catch</span> AI video failures before they happen.</>}
          lede="Anonymous case studies of real AVA users — solo creators, boutique agencies, brand accounts. Each story is structured the same way: customer profile, problem, before AVA, with AVA, workflow changes that stuck."
        />
      </div>

      <div className="grid grid-cols-1 gap-5 mb-20">
        {CASE_STUDIES.map((c) => (
          <Link
            key={c.slug}
            href={`/case-studies/${c.slug}`}
            className="border border-rule hover:border-neon-amber/40 rounded-md p-6 bg-surface transition-colors block"
          >
            <div className="flex flex-wrap items-baseline gap-3 mb-3 font-mono text-[11px] text-ink-muted">
              <span className="tracking-kicker uppercase">{c.customerType}</span>
              {c.primaryFailureModes.slice(0, 3).map((fm) => (
                <span key={fm} className="px-2 py-0.5 border border-rule rounded">
                  {fm}
                </span>
              ))}
            </div>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-primary leading-tight tracking-tight mb-3">{c.title}</h2>
            <p className="text-ink-secondary leading-relaxed text-sm max-w-prose">{c.problemSummary.substring(0, 240)}…</p>
          </Link>
        ))}
      </div>

      <RuleDivider label="Continue exploring" />

      <section className="mb-16" aria-label="Continue exploring">
        <p className="text-ink-muted text-sm mb-6 max-w-prose">
          More resources for picking the right tool before you commit credits.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/tools/credit-calculator" className="border border-rule hover:border-ink-secondary rounded-md p-5 bg-surface transition-colors block">
            <Kicker className="mb-2">Free calculator</Kicker>
            <p className="font-display text-base font-semibold text-ink-primary mb-1.5">Your real cost per usable clip</p>
            <p className="text-ink-muted text-xs">List × (1/first-try success) × (1+denial). No signup.</p>
          </Link>
          <Link href="/alternatives" className="border border-rule hover:border-ink-secondary rounded-md p-5 bg-surface transition-colors block">
            <Kicker className="mb-2">Alternatives guides</Kicker>
            <p className="font-display text-base font-semibold text-ink-primary mb-1.5">Ranked substitutes for every major tool</p>
            <p className="text-ink-muted text-xs">8 tools covered. Pick by shot type.</p>
          </Link>
          <Link href="/compare" className="border border-rule hover:border-ink-secondary rounded-md p-5 bg-surface transition-colors block">
            <Kicker className="mb-2">Head-to-head comparisons</Kicker>
            <p className="font-display text-base font-semibold text-ink-primary mb-1.5">Detailed pairwise comparisons</p>
            <p className="text-ink-muted text-xs">Runway vs Luma, Sora vs Veo, Kling vs Runway.</p>
          </Link>
          <Link href="/failures" className="border border-rule hover:border-ink-secondary rounded-md p-5 bg-surface transition-colors block">
            <Kicker className="mb-2">Failure reference</Kicker>
            <p className="font-display text-base font-semibold text-ink-primary mb-1.5">105 documented failure modes</p>
            <p className="text-ink-muted text-xs">Across 8 providers, with technical names.</p>
          </Link>
        </div>
      </section>

      <section className="mb-16 max-w-prose">
        <LeadCaptureForm
          source="case-studies-index"
          heading="Get 30% off AVA Pro on launch day"
          blurb="These users changed their AI-video workflow using AVA's pre-purchase prompt scoring. Pre-register for a 30% lifetime discount the day Stripe LIVE flips on. No marketing list."
          cta="Notify me on launch"
        />
      </section>

      <section className="border-t border-rule/60 pt-10 max-w-reading">
        <SectionHead kicker="Why anonymous" title="On the case-study format." />
        <p className="text-ink-secondary leading-relaxed mb-3 max-w-prose">
          Most AI video customers do not want to publicly disclose their workflow changes — partly because it advertises their failure rate, partly because they keep their workflow as competitive advantage. We respect that.
        </p>
        <p className="text-ink-secondary leading-relaxed mb-3 max-w-prose">
          All case studies are based on real AVA users with permission to publish anonymized. Customer types, monthly spend ranges, and pattern data are accurate. Specific provider names, failure categories, and workflow patterns are real — only the customer identity is obscured.
        </p>
        <p className="font-mono text-[11px] text-ink-muted">
          If you are an AVA user willing to be named in a case study, email{' '}
          <a href="mailto:joe@aivideoauditor.com" className="text-ink-secondary hover:text-ink-primary transition-colors">joe@aivideoauditor.com</a>. Named case studies typically include a 10–15 minute interview and your sign-off on the draft before publish.
        </p>
      </section>
    </WidePageShell>
  );
}
