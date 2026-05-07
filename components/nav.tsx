import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import AuthButton from './auth-button';

export default async function Nav() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-border bg-void/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/icon.png" alt="AIVideoAuditor" width={28} height={28} className="rounded-lg" />
          <span className="font-mono text-sm font-bold text-ink-primary">AIVideoAuditor</span>
        </Link>

        <div className="flex items-center gap-5 text-sm text-ink-secondary">
          <a href="#playground" className="hover:text-ink-primary transition-colors hidden sm:block font-mono text-xs">
            Playground
          </a>
          <a href="#how-it-works" className="hover:text-ink-primary transition-colors hidden sm:block font-mono text-xs">
            How It Works
          </a>
          <Link href="/security" className="hover:text-ink-primary transition-colors hidden md:block font-mono text-xs">
            Security
          </Link>
          <Link href="/dashboard" className="hover:text-ink-primary transition-colors hidden md:block font-mono text-xs">
            Dashboard
          </Link>

          <a
            href="https://chromewebstore.google.com/detail/aivideoauditor/dnehhjbgpfjdihfigahimmpgnemplljn"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 px-4 py-1.5 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-mono font-bold text-xs rounded-lg transition-all whitespace-nowrap"
          >
            Add to Chrome →
          </a>
          <AuthButton user={user} />
        </div>
      </div>
    </nav>
  );
}
