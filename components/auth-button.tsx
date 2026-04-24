'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export default function AuthButton({ user }: { user: User | null }) {
  const router = useRouter();
  const supabase = createClient();

  async function signOut() {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  if (user) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <span className="text-ink-muted truncate max-w-[140px]">{user.email}</span>
        <button
          onClick={signOut}
          className="text-ink-secondary hover:text-ink-primary transition-colors"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="text-ink-secondary hover:text-ink-primary transition-colors text-sm"
    >
      Sign in
    </Link>
  );
}
