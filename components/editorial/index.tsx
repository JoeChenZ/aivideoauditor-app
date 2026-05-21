import { ReactNode } from 'react';
import Link from 'next/link';

type WithChildren = { children: ReactNode; className?: string };

export function Kicker({ children, className = '' }: WithChildren) {
  return (
    <p className={`font-mono text-[11px] font-bold tracking-kicker uppercase text-neon-amber ${className}`}>
      {children}
    </p>
  );
}

export function Eyebrow({ children, className = '' }: WithChildren) {
  return (
    <p className={`font-mono text-[11px] tracking-kicker uppercase text-ink-muted ${className}`}>
      {children}
    </p>
  );
}

export function ArticleHeader({
  kicker,
  title,
  lede,
  byline,
}: {
  kicker?: string;
  title: ReactNode;
  lede?: ReactNode;
  byline?: ReactNode;
}) {
  return (
    <header className="mb-12 pb-10 border-b border-rule/60">
      {kicker ? <Kicker className="mb-5">{kicker}</Kicker> : null}
      <h1 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.04] tracking-tight text-ink-primary font-semibold">
        {title}
      </h1>
      {lede ? (
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-secondary">
          {lede}
        </p>
      ) : null}
      {byline ? (
        <div className="mt-6 font-mono text-xs text-ink-muted tracking-wide">
          {byline}
        </div>
      ) : null}
    </header>
  );
}

export function RuleDivider({ label, className = '' }: { label?: string; className?: string }) {
  if (!label) {
    return <hr className={`border-rule/60 my-12 ${className}`} aria-hidden />;
  }
  return (
    <div className={`flex items-center gap-4 my-12 ${className}`} aria-label={label}>
      <span className="h-px flex-1 bg-rule/60" aria-hidden />
      <span className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted">{label}</span>
      <span className="h-px flex-1 bg-rule/60" aria-hidden />
    </div>
  );
}

export function DataCallout({
  label,
  value,
  delta,
  tone = 'neutral',
}: {
  label: string;
  value: ReactNode;
  delta?: ReactNode;
  tone?: 'neutral' | 'warn' | 'good' | 'bad';
}) {
  const toneClass =
    tone === 'warn' ? 'text-neon-amber' :
    tone === 'good' ? 'text-neon-green' :
    tone === 'bad'  ? 'text-neon-red'   :
    'text-ink-primary';
  return (
    <div className="border-l-2 border-rule pl-4 py-1">
      <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-1.5">{label}</p>
      <p className={`font-display text-3xl leading-none font-semibold ${toneClass}`}>{value}</p>
      {delta ? <p className="mt-1.5 font-mono text-xs text-ink-secondary">{delta}</p> : null}
    </div>
  );
}

export function PullQuote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <figure className="my-10 max-w-prose">
      <blockquote className="border-l-2 border-neon-amber/60 pl-6 font-display text-2xl leading-snug italic text-ink-primary">
        &ldquo;{children}&rdquo;
      </blockquote>
      {cite ? (
        <figcaption className="mt-3 pl-6 font-mono text-xs tracking-wide uppercase text-ink-muted">
          — {cite}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function SourceCite({
  num,
  title,
  source,
  href,
  date,
}: {
  num: number;
  title: string;
  source: string;
  href?: string;
  date?: string;
}) {
  const inner = (
    <>
      <span className="font-mono text-xs text-ink-muted shrink-0 w-6">[{num}]</span>
      <span className="flex-1">
        <span className="text-ink-secondary">{title}</span>
        <span className="block font-mono text-xs text-ink-muted mt-0.5">
          {source}{date ? ` · ${date}` : ''}
        </span>
      </span>
    </>
  );
  const className = "flex gap-3 py-2 text-sm leading-relaxed group";
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${className} hover:text-ink-primary transition-colors`}>
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  );
}

export function SectionHead({
  kicker,
  title,
  className = '',
}: {
  kicker?: string;
  title: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-6 ${className}`}>
      {kicker ? <Kicker className="mb-3">{kicker}</Kicker> : null}
      <h2 className="font-display text-3xl md:text-4xl leading-tight tracking-tight text-ink-primary font-semibold">
        {title}
      </h2>
    </div>
  );
}

export function Prose({ children, className = '' }: WithChildren) {
  return (
    <div className={`max-w-prose space-y-5 text-ink-secondary leading-relaxed [&_p]:text-base [&_strong]:text-ink-primary [&_strong]:font-semibold [&_a]:text-neon-purple [&_a]:underline [&_a]:decoration-neon-purple/40 [&_a]:underline-offset-2 hover:[&_a]:decoration-neon-purple ${className}`}>
      {children}
    </div>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-10 font-mono text-xs text-ink-muted">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i}>
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-ink-secondary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-ink-secondary' : ''}>{item.label}</span>
            )}
            {!isLast ? <span className="mx-2 text-rule">/</span> : null}
          </span>
        );
      })}
    </nav>
  );
}

export function PageShell({ children, className = '' }: WithChildren) {
  return (
    <main className={`min-h-screen pt-16 pb-24 px-6 ${className}`}>
      <div className="max-w-reading mx-auto">{children}</div>
    </main>
  );
}

export function WidePageShell({ children, className = '' }: WithChildren) {
  return (
    <main className={`min-h-screen pt-16 pb-24 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </main>
  );
}
