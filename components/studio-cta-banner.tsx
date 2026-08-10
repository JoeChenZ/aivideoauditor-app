import Link from 'next/link';

export default function StudioCtaBanner() {
  return (
    <div className="mt-16 border border-neon-amber/30 rounded-md p-6 bg-paper flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-ink-secondary leading-relaxed">
        <span className="font-semibold text-ink-primary">Don&apos;t want to fight the tools?</span>{' '}
        We&apos;ll produce your product video for you — scroll-stopping, platform-native, done in 2-3 days.
      </p>
      <Link
        href="/studio"
        className="shrink-0 inline-flex items-center gap-2 bg-neon-amber/15 hover:bg-neon-amber/25 border border-neon-amber/40 text-neon-amber font-mono font-semibold text-[11px] tracking-wide uppercase px-5 py-2.5 rounded-md transition-colors whitespace-nowrap"
      >
        We&apos;ll produce it for you →
      </Link>
    </div>
  );
}
