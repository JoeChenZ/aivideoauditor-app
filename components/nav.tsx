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
          <Image src="/icon.png" alt="AIVideoAuditor" width={32} height={32} className="rounded-lg" />
          <span className="text-sm font-bold tracking-widest text-neon-purple uppercase">AI Video Auditor</span>
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
          <AuthButton user={user} />
        </div>
      </div>
    </nav>
  );
}
