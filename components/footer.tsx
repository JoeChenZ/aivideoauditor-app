import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <p className="font-bold tracking-widest text-neon-purple uppercase text-xs mb-3">AI Video Auditor</p>
          <p className="text-ink-muted leading-relaxed">Pre-purchase reality check, prompt scoring, and platform change alerts across 11 AI video vendors.</p>
        </div>
        <div>
          <p className="text-ink-secondary font-semibold mb-3">Product</p>
          <ul className="space-y-2 text-ink-muted">
            <li><a href="https://chromewebstore.google.com/detail/aivideoauditor/ecomchbdfkgakaoponipjgpnjfpimdef" target="_blank" rel="noopener noreferrer" className="hover:text-ink-primary transition-colors">Install Free</a></li>
            <li><Link href="/pricing" className="hover:text-ink-primary transition-colors">Pricing</Link></li>
            <li><Link href="/tools/credit-calculator" className="hover:text-ink-primary transition-colors">Effective Cost Calculator</Link></li>
            <li><Link href="/tools/migration-planner" className="hover:text-ink-primary transition-colors">Platform Migration Planner</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-ink-secondary font-semibold mb-3">Content</p>
          <ul className="space-y-2 text-ink-muted">
            <li><Link href="/research/132-ai-video-vendor-reviews" className="hover:text-ink-primary transition-colors text-neon-green">Vendor Research (132 reviews)</Link></li>
            <li><Link href="/failures" className="hover:text-ink-primary transition-colors">Failure Reference</Link></li>
            <li><Link href="/compare" className="hover:text-ink-primary transition-colors">Head-to-Head Compare</Link></li>
            <li><Link href="/alternatives" className="hover:text-ink-primary transition-colors">Alternatives Guides</Link></li>
            <li><Link href="/graveyard" className="hover:text-ink-primary transition-colors">Vendor Stability Tracker</Link></li>
            <li><Link href="/guide-refund-categories" className="hover:text-ink-primary transition-colors">Platform Refund Policies</Link></li>
            <li><Link href="/sora-refund" className="hover:text-ink-primary transition-colors text-neon-amber">Sora 2 Reality Check</Link></li>
            <li><Link href="/affiliate-program" className="hover:text-ink-primary transition-colors">Affiliate Program</Link></li>
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
