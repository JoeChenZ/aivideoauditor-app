import Link from 'next/link';

const SECTIONS = [
  {
    label: 'Product',
    items: [
      { href: 'https://chromewebstore.google.com/detail/aivideoauditor/ecomchbdfkgakaoponipjgpnjfpimdef', label: 'Install free', external: true },
      { href: '/pricing', label: 'Pricing' },
      { href: '/tools/credit-calculator', label: 'Effective-cost calculator' },
      { href: '/tools/migration-planner', label: 'Migration planner' },
    ],
  },
  {
    label: 'Desk',
    items: [
      { href: '/research/132-ai-video-vendor-reviews', label: '132-review corpus' },
      { href: '/billing-pattern-watch', label: 'Billing pattern watch' },
      { href: '/billing-pattern-watch/heygen', label: 'HeyGen billing watch' },
      { href: '/vendor-changelog', label: 'Vendor changelog' },
      { href: '/runway-unlimited-slowdown', label: 'Runway slowdown' },
    ],
  },
  {
    label: 'Reference',
    items: [
      { href: '/failures', label: 'Failure catalogue' },
      { href: '/compare', label: 'Head-to-head' },
      { href: '/alternatives', label: 'Alternatives' },
      { href: '/sora-alternatives', label: 'Sora alternatives' },
      { href: '/invideo-alternatives', label: 'InVideo alternatives' },
      { href: '/cheapest-ai-video-generator', label: 'Cheapest AI video' },
      { href: '/best/ai-video-for-real-estate', label: 'AI video for real estate' },
      { href: '/graveyard', label: 'Stability tracker' },
    ],
  },
  {
    label: 'Trust',
    items: [
      { href: '/security', label: 'Security' },
      { href: '/privacy', label: 'Privacy' },
      { href: '/affiliate-program', label: 'Affiliate program' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-rule/60 mt-32">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_repeat(4,1fr)] gap-10 md:gap-8">
          <div className="md:pr-6">
            <p className="font-mono text-[11px] tracking-kicker uppercase text-neon-amber mb-3">
              AIVideoAuditor
            </p>
            <p className="font-display text-xl leading-snug text-ink-primary mb-4">
              The pre-purchase research desk for AI video.
            </p>
            <p className="text-sm text-ink-muted leading-relaxed max-w-xs">
              Prompt scoring, vendor reality checks, and silent-policy-change alerts across 11 platforms. Free Chrome extension.
            </p>
          </div>

          {SECTIONS.map((section) => (
            <div key={section.label}>
              <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-4">
                {section.label}
              </p>
              <ul className="space-y-2.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    {('external' in item && item.external) ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-ink-secondary hover:text-ink-primary transition-colors"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm text-ink-secondary hover:text-ink-primary transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-rule/40 flex flex-col sm:flex-row justify-between gap-3 font-mono text-[11px] text-ink-muted">
          <span>© {new Date().getFullYear()} AIVideoAuditor · Independent vendor research</span>
          <span className="tracking-wide">v0.2 · Editorial release · {new Date().toISOString().slice(0, 10)}</span>
        </div>
      </div>
    </footer>
  );
}
