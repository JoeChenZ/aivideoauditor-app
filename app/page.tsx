'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-zinc-950 text-white">

      {/* HERO */}
      <section className="relative min-h-[100dvh] overflow-hidden bg-zinc-950 flex items-end">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/showcase/hero-poster.jpg"
        >
          <source src="/showcase/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 lg:pb-32 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6">
              Your product.<br />
              Now it moves.
            </h1>
            <p className="text-lg text-zinc-300 leading-relaxed mb-8 max-w-md">
              Done-for-you AI product videos for DTC brands. We audited 105 ways AI video fails so yours ships right every time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/order" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-full transition-colors">
                Order a Video - from $59
              </Link>
              <Link href="/samples" className="inline-flex items-center justify-center border border-zinc-600 hover:border-zinc-400 text-zinc-300 hover:text-white font-medium px-6 py-3 rounded-full transition-colors">
                See the Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 lg:py-32 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-16">
          Three days from photo to post.
        </h2>
        <div className="grid gap-12">
          {[
            { num: '01', title: 'Send your product photo', desc: 'Upload any product photo. Clean background preferred, but we can work with lifestyle shots too. Tell us the style you want.' },
            { num: '02', title: 'We generate and QC', desc: 'Every clip passes our consistency gate. The product never morphs between frames. Clips that fail QC are regenerated before delivery.' },
            { num: '03', title: 'Post-ready in 2-3 days', desc: '9:16 vertical, ready for IG Reels, TikTok, and platform-native formats. Yours to use anywhere.' },
          ].map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid grid-cols-[auto,1fr] gap-8 items-start"
            >
              <span className="text-8xl font-black text-zinc-700 leading-none">{step.num}</span>
              <div className="pt-2">
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SAMPLE WALL */}
      <section className="py-24 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">Work from the studio.</h2>
          <p className="text-zinc-400 mb-12">Product photos in. Scroll-stopping clips out.</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { before: '/showcase/pairA-before.jpg', video: '/showcase/sample-earrings-worn.mp4' },
              { before: '/showcase/pairB-before.jpg', video: '/showcase/sample-shot-01.mp4' },
              { before: '/showcase/sample-earrings-flatlay.jpg', video: '/showcase/sample-earrings-hold.mp4' },
            ].map((pair, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="grid grid-cols-2 gap-2"
              >
                <div className="relative aspect-[9/16] bg-zinc-800 rounded-lg overflow-hidden">
                  <img
                    src={pair.before}
                    alt="Product photo - before"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 text-xs text-zinc-400 font-mono">BEFORE</span>
                </div>
                <div className="relative aspect-[9/16] bg-zinc-800 rounded-lg overflow-hidden">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={pair.video} type="video/mp4" />
                  </video>
                  <span className="absolute top-2 left-2 text-xs text-zinc-400 font-mono">AFTER</span>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-zinc-600 text-sm mt-6">Work produced for a DTC jewelry brand.</p>
        </div>
      </section>

      {/* CREDIBILITY STRIP */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              We know every way AI video fails.
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-12">
              Before building this studio, we catalogued 105 documented failure modes across 8 AI video platforms - morphing products, warped shapes, flickering details. That research is the QC gate every clip passes before we deliver.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {[
              { stat: '105', label: 'failure modes documented' },
              { stat: '8', label: 'platforms audited' },
              { stat: '1', label: 'free revision included' },
            ].map((item) => (
              <div key={item.stat}>
                <div className="text-4xl font-bold text-blue-500 mb-1">{item.stat}</div>
                <div className="text-zinc-400 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">Simple pricing. You own the clips.</h2>
        <p className="text-zinc-400 mb-12">No subscriptions. No per-platform fees.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            {
              title: '1 Video',
              price: '$59',
              popular: false,
              features: [
                'Hero product motion',
                '9:16 vertical format',
                '2-3 day turnaround',
                '1 free revision',
              ],
              cta: 'Order 1 Video',
            },
            {
              title: '3-Video Project',
              price: '$149',
              popular: true,
              features: [
                'Three clips, one brand set',
                '9:16 vertical format',
                '2-3 day turnaround',
                '1 free revision per clip',
                'Save $28 vs singles',
              ],
              cta: 'Order 3 Videos',
            },
            {
              title: '5-Video Project',
              price: '$229',
              popular: false,
              features: [
                'Full product launch kit',
                '9:16 vertical format',
                '2-3 day turnaround',
                '1 free revision per clip',
                'Save $66 vs singles',
              ],
              cta: 'Order 5 Videos',
            },
          ].map((tier) => (
            <div
              key={tier.title}
              className={`rounded-xl p-6 flex flex-col ${
                tier.popular
                  ? 'bg-zinc-900 border border-blue-600'
                  : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              {tier.popular && (
                <span className="text-xs font-medium text-blue-400 mb-3 uppercase tracking-wider">Most Popular</span>
              )}
              <div className="text-white font-semibold mb-1">{tier.title}</div>
              <div className="text-4xl font-bold text-white mb-4">{tier.price}</div>
              <ul className="space-y-2 mb-6 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="text-zinc-400 text-sm flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">+</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/order"
                className={`inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  tier.popular
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-zinc-500 text-sm">
          Add-ons: Rush delivery (+$30) · Extra formats 1:1/16:9 (+$15) · Extra revision (+$20)
        </p>

        <div className="mt-12 text-center">
          <Link href="/order" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg">
            Order Now
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="text-white font-semibold text-lg mb-2">AI Video Auditor</div>
              <p className="text-zinc-500 text-sm">AI product videos for brands that move fast.</p>
            </div>
            <div className="flex flex-col md:items-end gap-3">
              <div className="flex gap-6 text-sm">
                <Link href="/samples" className="text-zinc-400 hover:text-white transition-colors">Samples</Link>
                <Link href="/order" className="text-zinc-400 hover:text-white transition-colors">Order</Link>
                <Link href="/faq" className="text-zinc-400 hover:text-white transition-colors">FAQ</Link>
                <a href="https://x.com/AIVideoAuditor" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">@AIVideoAuditor</a>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-6">
            <p className="text-zinc-600 text-xs">
              2026 AI Video Auditor. All generated videos are AI-assisted and QC reviewed before delivery.
            </p>
          </div>
        </div>
      </footer>

    </main>
  );
}
