'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

const samples = [
  { before: '/showcase/pairA-before.jpg', after: '/showcase/pairA-after.jpg', video: '/showcase/sample-earrings-worn.mp4', label: 'Pearl drop earrings' },
  { before: '/showcase/pairB-before.jpg', after: '/showcase/pairB-after.jpg', video: '/showcase/sample-shot-01.mp4', label: 'Peach pearl set' },
  { before: '/showcase/pairC-before.jpg', after: null, video: '/showcase/sample-story.mp4', label: 'Grey pearl studs' },
  { before: '/showcase/pairD-before.jpg', after: null, video: null, label: 'Earring collection' },
  { before: '/showcase/sample-earrings-flatlay.jpg', after: null, video: '/showcase/sample-earrings-hold.mp4', label: 'Flatlay to motion' },
  { before: '/showcase/sample-pendant-worn.jpg', after: '/showcase/sample-onmodel.jpg', video: null, label: 'Pendant - on model' },
];

export default function Samples() {
  return (
    <main className="bg-zinc-950 text-white min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">Studio Work</h1>
          <p className="text-zinc-400 text-lg">Product photos in. Platform-ready clips out.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {samples.map((sample, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08 }}
              className="space-y-2"
            >
              <div className="grid grid-cols-2 gap-2">
                <div className="relative aspect-[9/16] bg-zinc-800 rounded-lg overflow-hidden">
                  <img
                    src={sample.before}
                    alt={`${sample.label} - before`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 text-xs text-zinc-400 font-mono bg-zinc-950/60 px-1.5 py-0.5 rounded">BEFORE</span>
                </div>
                <div className="relative aspect-[9/16] bg-zinc-800 rounded-lg overflow-hidden">
                  {sample.video ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={sample.video} type="video/mp4" />
                    </video>
                  ) : sample.after ? (
                    <img
                      src={sample.after}
                      alt={`${sample.label} - after`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">No preview</div>
                  )}
                  <span className="absolute top-2 left-2 text-xs text-zinc-400 font-mono bg-zinc-950/60 px-1.5 py-0.5 rounded">AFTER</span>
                </div>
              </div>
              <p className="text-zinc-500 text-sm">{sample.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 border-t border-zinc-800 pt-12">
          <p className="text-zinc-500 text-sm mb-8">
            All clips produced for a DTC jewelry brand. From raw product photos to platform-ready 9:16 Reels in under 3 days.
          </p>
          <Link
            href="/order"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg"
          >
            Order your product videos
          </Link>
        </div>
      </div>
    </main>
  );
}
