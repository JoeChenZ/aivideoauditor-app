'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

// Extension ID — stable once loaded unpacked from the same directory.
// Update this if the extension is re-published to the Chrome Web Store.
const EXTENSION_ID = 'dnehhjbgpfjdihfigahimmpgnemplljn';

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

      chrome.runtime.sendMessage(
        EXTENSION_ID,
        { type: 'AVA_AUTH_TOKEN', token: session.access_token, email: session.user.email },
        (response: { ok?: boolean } | undefined) => {
          if (chrome.runtime.lastError || !response?.ok) {
            setStatus('no_extension');
          } else {
            setStatus('success');
            // Close this tab after a short delay
            setTimeout(() => window.close(), 2000);
          }
        },
      );
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
