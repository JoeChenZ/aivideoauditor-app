'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const FREE_COPIES_KEY = 'ava_wall_copies';
const UNLOCKED_KEY = 'ava_wall_unlocked';
const FREE_LIMIT = 2;

/** Returns true if the user has already unlocked prompt copying. */
export function isUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(UNLOCKED_KEY) === '1';
}

/** Returns the current free-copy count (0–FREE_LIMIT). */
export function getFreeCount(): number {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem(FREE_COPIES_KEY) ?? '0', 10);
}

/** Increment free-copy counter. Returns the NEW count. */
export function incrementFreeCount(): number {
  const next = getFreeCount() + 1;
  localStorage.setItem(FREE_COPIES_KEY, String(next));
  return next;
}

/** Mark the user as permanently unlocked (localStorage + cookie). */
export function markUnlocked(): void {
  localStorage.setItem(UNLOCKED_KEY, '1');
  // 1-year cookie so server-side can also read it if needed
  document.cookie = `${UNLOCKED_KEY}=1; max-age=31536000; path=/; SameSite=Lax`;
}

// ─── Modal UI ────────────────────────────────────────────────────────────────

type Props = {
  /** The prompt text the user was trying to copy when they hit the gate. */
  pendingPrompt: string;
  onClose: () => void;
  /** Called after successful unlock so the parent can re-copy the prompt. */
  onUnlocked: () => void;
};

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 254;
}

export default function EmailGateModal({ pendingPrompt, onClose, onUnlocked }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!isValidEmail(trimmed)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'creators-wall' }),
      });
      // Fail-open: even on 5xx we unlock so the user isn't blocked
      const data = await res.json().catch(() => ({}));
      const ok = res.ok || (data as { ok?: boolean }).ok;
      if (ok || res.status >= 500) {
        markUnlocked();
        setStatus('success');
        setTimeout(() => {
          onUnlocked();
          onClose();
        }, 900);
      } else {
        setStatus('error');
        setErrorMsg((data as { error?: string }).error ?? 'Something went wrong — try again.');
      }
    } catch {
      // Network error — fail open
      markUnlocked();
      setStatus('success');
      setTimeout(() => {
        onUnlocked();
        onClose();
      }, 900);
    }
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-zinc-950/85 backdrop-blur-sm" aria-hidden />

      {/* Card */}
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 animate-[fadeScaleIn_0.2s_ease-out]">
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>

        {/* Headline */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-2">Copy every prompt on the wall</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Drop your email once — unlock unlimited prompt copies. No password, no account, no spam.
          </p>
        </div>

        {/* Preview of pending prompt (truncated) */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3">
          <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-semibold mb-1">Prompt you&apos;re copying</p>
          <p className="text-zinc-300 text-xs font-mono leading-relaxed line-clamp-3">{pendingPrompt}</p>
        </div>

        {/* Form */}
        {status === 'success' ? (
          <div className="flex items-center gap-3 bg-green-600/10 border border-green-500/30 rounded-xl px-4 py-3">
            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-300 text-sm font-medium">Unlocked! Copying your prompt…</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              autoFocus
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'submitting'}
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-blue-500 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-500 focus:outline-none transition-colors"
            />
            {status === 'error' && (
              <p className="text-red-400 text-xs font-mono">{errorMsg}</p>
            )}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold py-3 rounded-full transition-colors text-sm"
            >
              {status === 'submitting' ? 'Unlocking…' : 'Unlock all prompts →'}
            </button>
          </form>
        )}

        <p className="text-zinc-600 text-xs text-center -mt-2">
          No marketing spam. Unsubscribe any time.
        </p>
        {/* Sign-in alternative */}
        <div className="flex items-center gap-3 -mt-2">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-600 text-xs">or</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>
        <Link
          href="/login"
          className="block w-full text-center text-zinc-400 hover:text-white text-xs underline underline-offset-2 transition-colors"
        >
          Sign in for unlimited access
        </Link>
      </div>

      <style jsx>{`
        @keyframes fadeScaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
