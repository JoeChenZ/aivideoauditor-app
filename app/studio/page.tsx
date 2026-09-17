import type { Metadata } from 'next';
import LeadCaptureForm from '@/components/lead-capture-form';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Product Video Studio — Done-for-You for DTC & Handmade Brands',
  description: 'Send your product photos. We produce scroll-stopping AI videos for IG, TikTok & 小紅書. DTC & handmade brands. From $59, 2-3 day turnaround.',
  alternates: { canonical: 'https://www.aivideoauditor.com/studio' },
};

export default function StudioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'AVA AI Video Studio',
            serviceType: 'AI Product Video Production',
            url: 'https://www.aivideoauditor.com/studio',
            description: 'Done-for-you AI product video studio for IG, TikTok & 小紅書. DTC & handmade brands.',
            priceRange: '$59–$229',
            areaServed: 'Worldwide',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'AI Product Video Production',
            provider: { '@type': 'Organization', name: 'AVA AI Video Studio' },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Video Packages',
              itemListElement: [
                { '@type': 'Offer', name: '1 Video', price: '59', priceCurrency: 'USD' },
                { '@type': 'Offer', name: '3-Pack', price: '149', priceCurrency: 'USD' },
                { '@type': 'Offer', name: '5-Pack', price: '229', priceCurrency: 'USD' },
              ],
            },
          }),
        }}
      />
      <main className="bg-zinc-950 min-h-screen py-20 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Hero */}
          <div className="mb-16">
            <p className="text-xs font-mono tracking-kicker uppercase text-neon-amber mb-4">Done-for-You · AI Video Studio</p>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-ink-primary leading-tight mb-6">
              You send your product.<br />We ship the video.
            </h1>
            <p className="text-xl text-ink-secondary leading-relaxed mb-8">
              Done-for-you AI product videos for IG, TikTok & 小紅書. Built for DTC and handmade brands. No editing skills needed — just your product photos and brand details.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-neon-amber/10 border border-neon-amber/20 text-neon-amber text-xs font-mono">From $59 / video</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface border border-border text-ink-secondary text-xs font-mono">2–3 business day turnaround</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface border border-border text-ink-secondary text-xs font-mono">Preview before final delivery</span>
            </div>
            <Link
              href="/wall"
              className="inline-flex items-center gap-2 bg-neon-amber text-zinc-950 font-mono font-bold text-sm px-6 py-3 rounded-md hover:bg-neon-amber/90 transition-colors"
            >
              See example videos →
            </Link>
          </div>

          <hr className="border-rule mb-16" />

          {/* Pricing teaser */}
          <div className="mb-16">
            <p className="text-xs font-mono tracking-kicker uppercase text-ink-muted mb-6">Pricing</p>
            <h2 className="text-2xl font-display font-bold text-ink-primary mb-8">Simple, transparent packages</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: '1 Video', price: '$59', note: 'Perfect for testing' },
                { name: '3-Pack', price: '$149', note: 'Most popular' },
                { name: '5-Pack', price: '$229', note: 'Best value' },
              ].map((pkg) => (
                <div key={pkg.name} className="border border-border rounded-md p-5 bg-surface">
                  <p className="text-xs font-mono text-ink-muted uppercase tracking-wide mb-2">{pkg.name}</p>
                  <p className="text-3xl font-display font-bold text-ink-primary mb-1">{pkg.price}</p>
                  <p className="text-xs text-ink-muted">{pkg.note}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-ink-muted mt-4">All packages include: preview round, platform-native exports (9:16), and one revision.</p>
          </div>

          <hr className="border-rule mb-16" />

          {/* What we do */}
          <div className="mb-16">
            <p className="text-xs font-mono tracking-kicker uppercase text-ink-muted mb-6">What We Do</p>
            <h2 className="text-2xl font-display font-bold text-ink-primary mb-8">From still photos to scroll-stopping video</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  title: 'Product photos → motion',
                  desc: 'We animate your existing product photography into smooth AI video — no reshoot needed.',
                },
                {
                  title: 'Hooks & captions',
                  desc: 'Platform-native copy written for IG Reels, TikTok, and 小紅書 discovery algorithms.',
                },
                {
                  title: '9:16 vertical formats',
                  desc: 'Every video delivered in the right aspect ratio and resolution for each platform.',
                },
              ].map((card) => (
                <div key={card.title} className="border border-border rounded-md p-5 bg-elevated">
                  <h3 className="font-display font-semibold text-ink-primary mb-2">{card.title}</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-rule mb-16" />

          {/* 3-step process */}
          <div className="mb-16">
            <p className="text-xs font-mono tracking-kicker uppercase text-ink-muted mb-6">How It Works</p>
            <h2 className="text-2xl font-display font-bold text-ink-primary mb-8">Three steps, done in days</h2>
            <div className="space-y-6">
              {[
                {
                  step: '01',
                  title: 'Send your product photos + brand info',
                  desc: 'Share your product images, brand colors, preferred vibe, and target platform. Takes 5 minutes.',
                },
                {
                  step: '02',
                  title: 'We produce the AI video — you review a preview',
                  desc: 'Our team runs the AI pipeline, reviews for quality, and sends you a preview within 2–3 business days.',
                },
                {
                  step: '03',
                  title: 'You post — or we send platform-ready files',
                  desc: 'Approve the preview and receive your final files, ready to upload directly to IG, TikTok, or 小紅書.',
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-5">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-neon-amber/10 border border-neon-amber/20 flex items-center justify-center">
                    <span className="text-neon-amber font-mono text-xs font-bold">{s.step}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-ink-primary mb-1">{s.title}</h3>
                    <p className="text-sm text-ink-secondary leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-rule mb-16" />

          {/* Why AI video */}
          <div className="mb-16">
            <p className="text-xs font-mono tracking-kicker uppercase text-ink-muted mb-6">Why AI Video</p>
            <h2 className="text-2xl font-display font-bold text-ink-primary mb-8">Better economics than traditional shoots</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Speed', value: 'Days, not weeks. No studio booking required.' },
                { label: 'Cost', value: 'No studio fees, no crew, no re-shoots.' },
                { label: 'Consistency', value: 'Same brand look across every video in your package.' },
                { label: 'A/B variations', value: 'Multiple hooks and formats in hours, not days.' },
              ].map((item) => (
                <div key={item.label} className="border border-border rounded-md p-4 bg-surface">
                  <p className="text-xs font-mono text-neon-amber uppercase tracking-wide mb-1">{item.label}</p>
                  <p className="text-sm text-ink-secondary">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-rule mb-16" />

          {/* Who it's for */}
          <div className="mb-16">
            <p className="text-xs font-mono tracking-kicker uppercase text-ink-muted mb-6">Who It&apos;s For</p>
            <h2 className="text-2xl font-display font-bold text-ink-primary mb-6">Built for product brands that sell visually</h2>
            <ul className="space-y-3">
              {[
                'Jewelry & accessories brands — ring, necklace, bracelet sellers',
                'Handmade & Etsy sellers — candles, ceramics, skincare',
                'DTC Shopify brands — packaged goods, cosmetics, fashion',
                'Food & beverage — specialty goods, sauces, snacks',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink-secondary">
                  <span className="text-neon-amber mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <hr className="border-rule mb-16" />

          {/* Portfolio placeholder */}
          <div className="mb-16">
            <p className="text-xs font-mono tracking-kicker uppercase text-ink-muted mb-6">Portfolio</p>
            <h2 className="text-2xl font-display font-bold text-ink-primary mb-6">Sample work</h2>
            <div className="w-full h-48 rounded-md border border-dashed border-border bg-surface flex flex-col items-center justify-center gap-2">
              <p className="text-sm text-ink-muted">More portfolio pieces coming soon</p>
              <p className="text-xs text-ink-muted"><Link href="/wall" className="text-neon-amber hover:underline">See example videos on our Wall</Link></p>
            </div>
          </div>

          <hr className="border-rule mb-16" />

          {/* FAQ */}
          <div className="mb-16">
            <p className="text-xs font-mono tracking-kicker uppercase text-ink-muted mb-6">FAQ</p>
            <h2 className="text-2xl font-display font-bold text-ink-primary mb-8">Common questions</h2>
            <div className="space-y-8">
              {[
                {
                  q: 'How long does it take?',
                  a: '2–3 business days from the moment we receive your product photos and brand brief. Rush delivery available — contact us.',
                },
                {
                  q: 'How many revisions do I get?',
                  a: 'One revision round is included with every package. Additional revision rounds are available at a flat fee.',
                },
                {
                  q: 'What file formats do you deliver?',
                  a: "MP4 (H.264) in 9:16 for IG Reels/TikTok/小紅書, optimized for each platform's upload spec. Square (1:1) available on request.",
                },
                {
                  q: 'What do I need to send you?',
                  a: 'High-resolution product photos (the more angles the better), your brand colors or hex codes, preferred vibe/mood, and the target platform.',
                },
                {
                  q: 'What does it cost?',
                  a: '1 video from $59 · 3-pack $149 · 5-pack $229. All packages include a preview round and one revision.',
                },
              ].map((faq) => (
                <div key={faq.q} className="border-b border-rule pb-6 last:border-0">
                  <h3 className="font-display font-semibold text-ink-primary mb-2">{faq.q}</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Lead capture */}
          <div id="get-sample" className="mb-16">
            <LeadCaptureForm
              source="studio"
              heading="Get a quote for your product video"
              blurb="See example videos on our Wall, then send us your product photos and brand details — we'll quote your project and get back to you within 1 business day."
              cta="Get a quote →"
              successMessage="Request received! We'll be in touch within 1 business day."
            />
          </div>

          <hr className="border-rule mb-8" />

          {/* Cross-links */}
          <div className="text-center text-sm text-ink-muted">
            <Link href="/failures" className="text-neon-amber hover:underline">See why AI video often fails</Link>
            {' · '}
            <Link href="/compare" className="text-neon-amber hover:underline">Compare AI video tools</Link>
            {' '}— and how we prevent these issues in every video we produce.
          </div>

        </div>
      </main>
    </>
  );
}
