import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import AuthButton from './auth-button';

export default async function Nav() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-rule/60 bg-void/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/icon.png" alt="AIVideoAuditor" width={28} height={28} className="rounded-md" />
          <span className="flex items-baseline gap-2">
            <span className="font-display text-lg font-semibold tracking-tight text-ink-primary">AIVideoAuditor</span>
            <span className="hidden sm:inline font-mono text-[10px] tracking-kicker uppercase text-ink-muted group-hover:text-neon-amber transition-colors">vendor desk</span>
          </span>
        </Link>

        <div className="flex items-center gap-6 text-sm text-ink-secondary">
          <Link href="/research/132-ai-video-vendor-reviews" className="hover:text-ink-primary transition-colors hidden sm:block font-mono text-[11px] tracking-wide uppercase">
            Research
          </Link>
          <Link href="/vendor-changelog" className="hover:text-ink-primary transition-colors hidden md:block font-mono text-[11px] tracking-wide uppercase">
            Changelog
          </Link>
          <Link href="/billing-pattern-watch" className="hover:text-ink-primary transition-colors hidden lg:block font-mono text-[11px] tracking-wide uppercase">
            Watch
          </Link>
          <Link href="/dashboard" className="hover:text-ink-primary transition-colors hidden md:block font-mono text-[11px] tracking-wide uppercase">
            Dashboard
          </Link>

          <a
            href="https://chromewebstore.google.com/detail/aivideoauditor/ecomchbdfkgakaoponipjgpnjfpimdef"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 px-3.5 py-1.5 bg-neon-green/15 hover:bg-neon-green/25 border border-neon-green/40 text-neon-green font-mono font-semibold text-[11px] tracking-wide uppercase rounded-md transition-all whitespace-nowrap"
          >
            Install
          </a>
          <AuthButton user={user} />
        </div>
      </div>
    </nav>
  );
}
