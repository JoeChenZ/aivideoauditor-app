import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <p className="font-bold tracking-widest text-neon-purple uppercase text-xs mb-3">AI Video Auditor</p>
          <p className="text-ink-muted leading-relaxed">Free Chrome extension. Mark broken AI video frames, generate a refund letter or PDF audit report.</p>
        </div>
        <div>
          <p className="text-ink-secondary font-semibold mb-3">Extension</p>
          <ul className="space-y-2 text-ink-muted">
            <li><a href="https://chromewebstore.google.com/detail/aivideoauditor/dnehhjbgpfjdihfigahimmpgnemplljn" target="_blank" rel="noopener noreferrer" className="hover:text-ink-primary transition-colors">Install Free</a></li>
            <li><Link href="/#upgrade" className="hover:text-ink-primary transition-colors">Pro Plan</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-ink-secondary font-semibold mb-3">Learn</p>
          <ul className="space-y-2 text-ink-muted">
            <li><Link href="/guide" className="hover:text-ink-primary transition-colors">Refund Guide</Link></li>
            <li><Link href="/failures/runway-limb-artifact" className="hover:text-ink-primary transition-colors">Failure Types</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-ink-secondary font-semibold mb-3">Trust</p>
          <ul className="space-y-2 text-ink-muted">
            <li><Link href="/security" className="hover:text-ink-primary transition-colors">Security</Link></li>
            <li><Link href="/privacy" className="hover:text-ink-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-6 text-xs text-ink-muted flex flex-col sm:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} AIVideoAuditor. Built for Runway ML &amp; Luma AI users.</span>
        <Link href="/privacy" className="hover:text-ink-primary transition-colors">Privacy Policy</Link>
      </div>
    </footer>
  );
}
