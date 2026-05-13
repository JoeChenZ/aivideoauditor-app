'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const EXTENSION_API = 'https://aivideoauditor-extension.vercel.app';

type Tier = 'pro' | 'business';

export function CheckoutButton({
  tier,
  label,
  variant = 'primary',
}: {
  tier: Tier;
  label: string;
  variant?: 'primary' | 'amber';
}) {
  const supabase = createClient();
  const router = useRouter();
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSignedIn(!!session);
    });
  }, [supabase]);

  async function startCheckout() {
    setError(null);
    setBusy(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push(`/login?redirectTo=/pricing&tier=${tier}`);
        return;
      }

      const res = await fetch(`${EXTENSION_API}/api/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ tier }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? `Checkout failed (${res.status})`);
      }

      const { url } = await res.json();
      if (!url) throw new Error('No checkout URL returned');
      window.location.href = url;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout failed');
      setBusy(false);
    }
  }

  const baseClasses = 'block w-full text-center font-mono font-bold px-6 py-3 rounded-xl transition-all mb-2 disabled:cursor-not-allowed';
  const variantClasses = variant === 'amber'
    ? 'bg-neon-amber/20 hover:bg-neon-amber/30 disabled:bg-neon-amber/10 border border-neon-amber/40 text-neon-amber'
    : 'bg-neon-purple/20 hover:bg-neon-purple/30 disabled:bg-neon-purple/10 border border-neon-purple/40 text-neon-purple';

  const labelText = busy
    ? 'Loading checkout…'
    : signedIn === null
      ? 'Checking session…'
      : signedIn
        ? `${label} →`
        : `Sign in to subscribe →`;

  return (
    <>
      <button
        onClick={startCheckout}
        disabled={busy || signedIn === null}
        className={`${baseClasses} ${variantClasses}`}
      >
        {labelText}
      </button>
      {error && (
        <div className="mb-4 bg-neon-red/10 border border-neon-red/30 rounded-lg px-4 py-2">
          <p className="text-xs text-neon-red">{error}</p>
        </div>
      )}
    </>
  );
}
