import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-void bg-grid-pattern bg-grid flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-xs font-bold tracking-widest text-neon-purple uppercase mb-4">
          AI Video Auditor
        </p>
        <h1 className="text-4xl font-bold text-ink-primary mb-4">
          Your Keys. Your Credits. Our Logic.
        </h1>
        <p className="text-ink-secondary mb-8 max-w-md mx-auto text-sm leading-relaxed">
          Route AI video generation across Runway, Kling, and Seedance—using your own API keys. Zero aggregator tax.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple/40 text-neon-purple font-semibold px-6 py-3 rounded-xl transition-all"
          >
            Open Dashboard →
          </Link>
          <Link
            href="/vault"
            className="inline-flex items-center justify-center gap-2 bg-elevated hover:bg-elevated/80 border border-border text-ink-secondary font-medium px-6 py-3 rounded-xl transition-all text-sm"
          >
            Manage API Keys
          </Link>
        </div>
      </div>
    </main>
  );
}
