import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <p className="font-bold tracking-widest text-neon-purple uppercase text-xs mb-3">AI Video Auditor</p>
          <p className="text-ink-muted leading-relaxed">BYOK infrastructure for AI video generation. Your keys, your credits.</p>
        </div>
        <div>
          <p className="text-ink-secondary font-semibold mb-3">Product</p>
          <ul className="space-y-2 text-ink-muted">
            <li><Link href="/dashboard" className="hover:text-ink-primary transition-colors">Dashboard</Link></li>
            <li><Link href="/vault" className="hover:text-ink-primary transition-colors">Key Vault</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-ink-secondary font-semibold mb-3">Learn</p>
          <ul className="space-y-2 text-ink-muted">
            <li><Link href="/why-byok" className="hover:text-ink-primary transition-colors">Why BYOK</Link></li>
            <li><Link href="/guide" className="hover:text-ink-primary transition-colors">API Key Guide</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-ink-secondary font-semibold mb-3">Trust</p>
          <ul className="space-y-2 text-ink-muted">
            <li><Link href="/security" className="hover:text-ink-primary transition-colors">Security</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-6 text-xs text-ink-muted">
        © {new Date().getFullYear()} AI Video Auditor. No API keys are ever stored on our servers.
      </div>
    </footer>
  );
}
