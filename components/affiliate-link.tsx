import { ReactNode } from 'react';
import { AFFILIATE_LINKS, AffiliateTool } from '@/lib/affiliate-links';

/**
 * Outbound affiliate link. Always renders rel="sponsored nofollow noopener"
 * and target="_blank" per FTC + link-hygiene requirements. Reads the URL from
 * the central registry in lib/affiliate-links.ts so tracking links swap in one
 * place. `variant="button"` renders the neon CTA pill; default is an inline link.
 */
export function AffiliateLink({
  tool,
  children,
  variant = 'inline',
  className = '',
}: {
  tool: AffiliateTool;
  children?: ReactNode;
  variant?: 'inline' | 'button';
  className?: string;
}) {
  const entry = AFFILIATE_LINKS[tool];
  const label = children ?? `Visit ${entry.name}`;

  const base =
    variant === 'button'
      ? 'inline-flex items-center gap-2 bg-neon-green/15 hover:bg-neon-green/25 border border-neon-green/40 text-neon-green font-mono font-semibold text-[11px] tracking-wide uppercase px-5 py-2.5 rounded-md transition-colors'
      : 'text-neon-purple underline decoration-neon-purple/40 underline-offset-2 hover:decoration-neon-purple transition-colors';

  return (
    <a
      href={entry.url}
      target="_blank"
      rel="sponsored nofollow noopener"
      className={`${base} ${className}`}
      data-affiliate={tool}
    >
      {label}
    </a>
  );
}

/**
 * Standard FTC affiliate disclosure block. Placed near the top of every page
 * that carries affiliate outbound links.
 */
export function AffiliateDisclosure({ className = '' }: { className?: string }) {
  return (
    <aside
      className={`border-l-2 border-neon-amber/50 pl-4 py-2 mb-10 max-w-prose ${className}`}
      aria-label="Affiliate disclosure"
    >
      <p className="font-mono text-[10px] tracking-kicker uppercase text-neon-amber mb-1.5">
        Affiliate disclosure
      </p>
      <p className="text-xs text-ink-muted leading-relaxed">
        AVA earns a commission if you subscribe through some links on this page. It
        doesn&apos;t change our rankings or what we flag — every billing gotcha and
        quality caveat below is called out whether or not the tool pays us. We only
        list tools we&apos;d point a friend to for the job.
      </p>
    </aside>
  );
}
