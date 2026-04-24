import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-border bg-void/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-sm font-bold tracking-widest text-neon-purple uppercase">
          AI Video Auditor
        </Link>
        <div className="flex items-center gap-6 text-sm text-ink-secondary">
          <Link href="/why-byok" className="hover:text-ink-primary transition-colors">Why BYOK</Link>
          <Link href="/security" className="hover:text-ink-primary transition-colors">Security</Link>
          <Link href="/guide" className="hover:text-ink-primary transition-colors">Guide</Link>
          <Link
            href="/dashboard"
            className="ml-2 px-4 py-1.5 bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple/40 text-neon-purple font-semibold rounded-lg transition-all"
          >
            Dashboard →
          </Link>
        </div>
      </div>
    </nav>
  );
}
