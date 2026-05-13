'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

// Published Chrome Web Store ID + any active dev/unpacked IDs.
// The bridge tries each in order and uses the first one that responds.
const EXTENSION_IDS = [
  'ecomchbdfkgakaoponipjgpnjfpimdef', // published Chrome Web Store
  'mglommjmfhpnoeibkfmpmjiebmcclnnl', // local unpacked dev (v1.1.0)
];

type Status = 'loading' | 'success' | 'no_extension' | 'error';

export default function ExtensionCallbackPage() {
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        setStatus('error');
        return;
      }

      const chrome = (window as any).chrome;
      if (!chrome?.runtime?.sendMessage) {
        // Extension not installed — open dashboard as fallback
        setStatus('no_extension');
        return;
      }

      const payload = { type: 'AVA_AUTH_TOKEN', token: session.access_token, email: session.user.email };

      const tryNext = (i: number) => {
        if (i >= EXTENSION_IDS.length) {
          setStatus('no_extension');
          return;
        }
        chrome.runtime.sendMessage(
          EXTENSION_IDS[i],
          payload,
          (response: { ok?: boolean } | undefined) => {
            if (chrome.runtime.lastError || !response?.ok) {
              tryNext(i + 1);
            } else {
              setStatus('success');
              setTimeout(() => window.close(), 2000);
            }
          },
        );
      };

      tryNext(0);
    })();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-surface border border-border rounded-2xl p-10 max-w-sm w-full text-center">
        <p className="text-xs font-bold tracking-widest text-neon-purple uppercase mb-6">
          AI Video Auditor
        </p>

        {status === 'loading' && (
          <>
            <div className="text-2xl mb-4">⏳</div>
            <p className="text-ink-primary font-semibold mb-2">Connecting to extension…</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-2xl mb-4">✅</div>
            <p className="text-ink-primary font-semibold mb-2">Signed in!</p>
            <p className="text-ink-secondary text-sm">You can close this tab. The extension is now unlocked.</p>
          </>
        )}

        {status === 'no_extension' && (
          <>
            <div className="text-2xl mb-4">⚠️</div>
            <p className="text-ink-primary font-semibold mb-2">Extension not detected</p>
            <p className="text-ink-secondary text-sm mb-6">
              Make sure the AIVideoAuditor extension is installed and enabled, then try signing in from the extension panel again.
            </p>
            <a href="/dashboard" className="text-neon-purple text-sm underline">
              Go to dashboard instead →
            </a>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-2xl mb-4">❌</div>
            <p className="text-ink-primary font-semibold mb-2">Something went wrong</p>
            <p className="text-ink-secondary text-sm mb-6">Your session couldn't be read. Please try signing in again.</p>
            <a href="/login?redirectTo=/auth/extension-callback" className="text-neon-purple text-sm underline">
              Try again →
            </a>
          </>
        )}
      </div>
    </div>
  );
}
