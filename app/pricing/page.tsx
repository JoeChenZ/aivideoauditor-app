import Link from 'next/link';

// Keep in sync with the order form's source of truth: app/order/page.tsx PRICES.
const PACKAGES = [
  {
    key: '1',
    name: '1 Product Video',
    price: 59,
    tagline: 'Test one hook, no commitment',
    features: [
      '9:16 vertical, ready for Reels/TikTok/小紅書',
      '2–3 day turnaround (24h rush +$30)',
      'Full commercial rights + 1 free revision',
    ],
    footnote: 'Want more cuts from the same product photos? See the projects below.',
  },
  {
    key: '3',
    name: '3-Video Project',
    price: 149,
    tagline: 'One shoot, three cuts — most popular',
    highlight: true,
    features: [
      'Same product photos, ×3 different clips',
      'One consistent brand look across all three',
      'Full commercial rights + 1 free revision per clip',
    ],
  },
  {
    key: '5',
    name: '5-Video Project',
    price: 229,
    tagline: 'One shoot, five cuts — full launch kit',
    features: [
      'Same product photos, ×5 different clips',
      'Best per-video price of the three',
      'Full commercial rights + 1 free revision per clip',
    ],
  },
];

const ADD_ONS = [
  { name: 'Rush delivery (24h)', price: '+$30' },
  { name: 'Extra export formats (1:1, 16:9)', price: '+$15' },
];

const WHAT_YOU_GET = [
  {
    label: 'Turnaround',
    detail: '2–3 business days from photo submission to delivery. Need it faster? Rush delivery lands in 24 hours for +$30.',
  },
  {
    label: 'Usage rights',
    detail: 'Once delivered and paid, the video is yours — full commercial rights, no royalties, no re-licensing fee. Post it on IG, TikTok, your site, or paid ads.',
  },
  {
    label: 'Formats',
    detail: 'Every order includes 9:16 vertical (Reels/TikTok/小紅書native). 1:1 square and 16:9 landscape are available as add-ons for +$15.',
  },
  {
    label: 'Revisions',
    detail: '1 free revision per video, included in every package. Request it within 7 days of delivery.',
  },
];

const FAQ = [
  {
    q: 'Are these videos AI-generated?',
    a: 'Yes — every clip starts as an AI-generated animation from your product photo, not a camera shoot. We say this upfront because it is also the advantage: no shoot to schedule, no photographer\'s day rate, no editor\'s vacation to work around mid-launch. Every clip still goes through a manual QC pass that checks for product drift, color shift, or shape changes before it ships. We recommend disclosing "AI-assisted" in your caption; most platforms currently allow AI-generated video in organic posts.',
  },
  {
    q: 'What do I send you?',
    a: 'One or more product photos and a short description of what you sell. No filming, no editing software, no AI prompting on your end.',
  },
  {
    q: 'When do I get charged?',
    a: 'You fill in the order form with your product photo and brief, then go straight to secure Stripe checkout. If your photo will not produce a video we are happy to ship, we tell you and refund in full before any work starts.',
  },
  {
    q: 'What if I don’t like the result?',
    a: 'Every package includes 1 free revision per video. See the full policy on the FAQ page.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.aivideoauditor.com' },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://www.aivideoauditor.com/pricing' },
  ],
};

export const metadata = {
  title: 'Pricing — AI Product Video Packages',
  description: 'AI product videos delivered in 2–3 days, not the usual week-long freelancer back-and-forth. $59–$229 per package, full commercial rights, real 9:16 video files.',
  alternates: { canonical: 'https://www.aivideoauditor.com/pricing' },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-amber uppercase mb-4">
            Pricing
          </p>
          <h1 className="text-4xl font-bold text-ink-primary mb-3 leading-tight">
            Your product video back in 2–3 days — not the usual week of back-and-forth.
          </h1>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto">
            No photographer to reschedule, no editor&apos;s vacation to plan around, no rate hike
            halfway through the project. Send a product photo, pick a package, get a QC-checked
            video back — flat price, no subscription.
          </p>
        </div>

        {/* What you actually get — plain terms, no ambiguity */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {WHAT_YOU_GET.map((item) => (
            <div key={item.label} className="bg-elevated border border-border rounded-2xl p-6">
              <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-2">
                {item.label}
              </p>
              <p className="text-ink-secondary text-sm leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.key}
              className={`bg-surface border rounded-2xl p-8 relative flex flex-col ${
                pkg.highlight ? 'border-neon-amber/40 shadow-lg shadow-neon-amber/10' : 'border-border'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-3 left-8 bg-neon-amber/20 border border-neon-amber/40 px-3 py-1 rounded-full">
                  <span className="text-xs font-mono font-bold tracking-widest text-neon-amber uppercase">
                    Most Popular
                  </span>
                </div>
              )}
              <p className="text-xs font-mono font-bold tracking-widest text-ink-muted uppercase mb-2">
                {pkg.tagline}
              </p>
              <h2 className="text-lg font-semibold text-ink-primary mb-2">{pkg.name}</h2>
              <div className="mb-6">
                <span className="text-4xl font-bold text-ink-primary">${pkg.price}</span>
                <span className="text-ink-muted ml-2">one-time</span>
              </div>
              <Link
                href="/order"
                className={`block w-full text-center font-mono font-semibold px-6 py-3 rounded-xl transition-all mb-6 ${
                  pkg.highlight
                    ? 'bg-neon-amber/20 hover:bg-neon-amber/30 border border-neon-amber/40 text-neon-amber'
                    : 'bg-elevated hover:bg-elevated/80 border border-border text-ink-primary'
                }`}
              >
                Order this package →
              </Link>
              <ul className="space-y-2 mb-4">
                {pkg.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-ink-secondary">
                    <span className="text-neon-green flex-shrink-0">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {pkg.footnote && (
                <p className="text-xs text-ink-muted mt-auto pt-2 border-t border-border">{pkg.footnote}</p>
              )}
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="bg-elevated border border-border rounded-2xl p-8 mb-16">
          <h2 className="text-xl font-bold text-ink-primary mb-4">Add-ons</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {ADD_ONS.map((a) => (
              <div key={a.name} className="flex justify-between border-b border-border pb-3">
                <span className="text-ink-secondary text-sm">{a.name}</span>
                <span className="text-ink-primary font-mono font-semibold">{a.price}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-muted mt-4">Available at checkout on the order form.</p>
        </div>

        {/* FAQ */}
        <section aria-label="FAQ" className="mb-16">
          <h2 className="text-2xl font-bold text-ink-primary mb-6">Pricing FAQ</h2>
          <div className="space-y-3">
            {FAQ.map((item) => (
              <details key={item.q} className="bg-surface border border-border rounded-xl group">
                <summary className="cursor-pointer px-5 py-4 text-ink-primary font-semibold text-sm flex justify-between items-center">
                  <span>{item.q}</span>
                  <span className="text-ink-muted group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="px-5 pb-4 text-ink-secondary text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="text-sm text-ink-muted mt-4">
            More questions? See the full <Link href="/faq" className="text-neon-purple underline">FAQ</Link>.
          </p>
        </section>

        <div className="text-center">
          <p className="text-xs text-ink-muted">
            Questions? <a href="mailto:hello@aivideoauditor.com" className="text-neon-purple underline">Email support</a>
          </p>
        </div>

      </div>
    </main>
  );
}
