'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <Link href="/" className="text-white font-semibold text-lg tracking-tight">
          AI Video Auditor
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/wall" className="text-zinc-400 hover:text-white text-sm transition-colors">Creators Wall</Link>
          <Link href="/prompts" className="text-zinc-400 hover:text-white text-sm transition-colors">Prompts</Link>
          <Link href="/#how-it-works" className="text-zinc-400 hover:text-white text-sm transition-colors">How It Works</Link>
          <Link href="/faq" className="text-zinc-400 hover:text-white text-sm transition-colors">FAQ</Link>
          <Link href="/order" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors">
            Order a Video
          </Link>
          {user ? (
            <>
              <span className="text-zinc-400 text-xs truncate max-w-[120px]">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="text-zinc-400 hover:text-white text-sm transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <Link href="/login" className="text-zinc-400 hover:text-white text-sm transition-colors">
              Log in
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-zinc-400 hover:text-white"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-zinc-950 border-b border-zinc-800 px-6 py-4 flex flex-col gap-4">
          <Link href="/wall" className="text-zinc-300 hover:text-white text-sm" onClick={() => setOpen(false)}>Creators Wall</Link>
          <Link href="/prompts" className="text-zinc-300 hover:text-white text-sm" onClick={() => setOpen(false)}>Prompts</Link>
          <Link href="/#how-it-works" className="text-zinc-300 hover:text-white text-sm" onClick={() => setOpen(false)}>How It Works</Link>
          <Link href="/faq" className="text-zinc-300 hover:text-white text-sm" onClick={() => setOpen(false)}>FAQ</Link>
          <Link href="/order" className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium text-center" onClick={() => setOpen(false)}>Order a Video</Link>
          {user ? (
            <>
              <span className="text-zinc-400 text-xs truncate">{user.email}</span>
              <button
                onClick={() => { handleSignOut(); setOpen(false); }}
                className="text-zinc-300 hover:text-white text-sm text-left"
              >
                Log out
              </button>
            </>
          ) : (
            <Link href="/login" className="text-zinc-300 hover:text-white text-sm" onClick={() => setOpen(false)}>Log in</Link>
          )}
        </div>
      )}
    </nav>
  );
}
