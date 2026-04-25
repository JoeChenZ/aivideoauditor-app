// app/dashboard/page.tsx
'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import { loadVaultEntries, decryptApiKey } from '@/lib/vault';
import { ModelSelector } from '@/components/dashboard/model-selector';
import type { VideoModel } from '@/components/dashboard/model-selector';
import type { KlingMode } from '@/lib/cost';
import { CostTicker } from '@/components/dashboard/cost-ticker';
import { VideoResult } from '@/components/dashboard/video-result';
import type { GenState } from '@/components/dashboard/video-result';
import { HealthBoard } from '@/components/dashboard/health-board';
import { RoutingSuggestion } from '@/components/dashboard/routing-suggestion';
import type { KlingModel, KlingDuration } from '@/lib/cost';
import { providerFor } from '@/lib/providers';
import type { Provider, TaskStatus } from '@/lib/providers';
import Link from 'next/link';

const PROVIDER_LABELS: Record<Provider, string> = {
  kling: 'Kling AI',
  runway: 'Runway Gen-4',
  seedance: 'Seedance',
};

export default function DashboardPage() {
  const [prompt,   setPrompt]   = useState('');
  const [model,    setModel]    = useState<VideoModel>('kling-v1');
  const [mode,     setMode]     = useState<KlingMode | null>('std');
  const [duration, setDuration] = useState<5 | 10>(5);

  const [vaultPassword, setVaultPassword] = useState('');
  const [decryptedKeys, setDecryptedKeys] = useState<Partial<Record<Provider, string>>>({});
  const [keyError,      setKeyError]      = useState('');

  const [genState, setGenState] = useState<GenState>('idle');
  const [videoUrl, setVideoUrl] = useState('');
  const [genError, setGenError] = useState('');
  const [activeProvider, setActiveProvider] = useState<Provider>('kling');

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => { if (pollRef.current) clearInterval(pollRef.current); }, []);

  // Derive provider whenever model changes
  const currentProvider = providerFor(model);
  const activeKey = decryptedKeys[currentProvider] ?? '';
  const hasKey = activeKey.length > 0;
  const providerLabel = PROVIDER_LABELS[currentProvider];

  // Check if this provider has a vault entry
  const vaultEntries = useMemo(() => loadVaultEntries(), []);
  const hasVaultEntry = vaultEntries.some(e => e.provider === currentProvider);

  async function handleUnlock() {
    setKeyError('');
    const entry = vaultEntries.find(e => e.provider === currentProvider);
    if (!entry) {
      setKeyError(`No ${providerLabel} key found in Vault.`);
      return;
    }
    try {
      const key = await decryptApiKey(entry, vaultPassword);
      setDecryptedKeys(prev => ({ ...prev, [currentProvider]: key }));
      setVaultPassword('');
    } catch {
      setKeyError('Incorrect vault password.');
    }
  }

  async function handleGenerate() {
    if (!activeKey || !prompt.trim() || genState !== 'idle') return;
    setGenState('submitting');
    setGenError('');
    setVideoUrl('');
    const provider = currentProvider;
    setActiveProvider(provider);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: activeKey,
          prompt: prompt.trim(),
          model,
          mode,
          duration,
          provider,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error((data as { error?: string }).error ?? 'Submit failed');

      const { taskId } = data as { taskId: string };
      setGenState('processing');

      pollRef.current = setInterval(async () => {
        try {
          const statusRes = await fetch(`/api/generate/${taskId}`, {
            headers: {
              'x-api-key': activeKey,
              'x-provider': provider,
            },
          });
          const status = await statusRes.json() as TaskStatus;

          if (status.status === 'succeed' && status.videoUrl) {
            clearInterval(pollRef.current!);
            pollRef.current = null;
            setVideoUrl(status.videoUrl);
            setGenState('done');
          } else if (status.status === 'failed') {
            clearInterval(pollRef.current!);
            pollRef.current = null;
            setGenError(`Generation failed on ${PROVIDER_LABELS[provider]} servers.`);
            setGenState('error');
          }
        } catch {
          clearInterval(pollRef.current!);
          pollRef.current = null;
          setGenError('Lost connection while polling for status.');
          setGenState('error');
        }
      }, 5000);

    } catch (err) {
      setGenError(err instanceof Error ? err.message : 'Unknown error');
      setGenState('error');
    }
  }

  function handleApplyRouting(m: KlingModel, mo: KlingMode, d: KlingDuration) {
    setModel(m);
    setMode(mo);
    setDuration(d);
  }

  const canGen    = hasKey && prompt.trim().length > 0 && genState === 'idle';
  const isRunning = genState === 'submitting' || genState === 'processing';

  return (
    <main className="min-h-screen bg-void bg-grid-pattern bg-grid">
      <div className="max-w-2xl mx-auto px-4 py-16 space-y-6">

        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold tracking-widest text-neon-purple uppercase mb-2">Dashboard</p>
            <h1 className="text-2xl font-bold text-ink-primary">Generate Video</h1>
            <p className="text-sm text-ink-secondary mt-1">Powered by your own API key. Zero aggregator tax.</p>
          </div>
          <Link href="/vault" className="text-xs text-ink-muted hover:text-neon-purple transition-colors">
            Manage keys →
          </Link>
        </div>

        <HealthBoard />

        {/* No vault entry for this provider */}
        {!hasVaultEntry && (
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-sm font-semibold text-ink-secondary mb-2">
              No {providerLabel} key in Vault
            </h2>
            <p className="text-xs text-ink-muted mb-4">
              Add your {providerLabel} API key to start generating with this model.
            </p>
            <Link
              href="/vault"
              className="inline-flex items-center gap-1.5 bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple/40 text-neon-purple text-xs font-semibold px-4 py-2 rounded-lg transition-all"
            >
              Go to Vault →
            </Link>
          </div>
        )}

        {/* Vault entry exists but not yet unlocked */}
        {hasVaultEntry && !hasKey && (
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-sm font-semibold text-ink-secondary mb-3">
              Unlock {providerLabel} Key
            </h2>
            <p className="text-xs text-ink-muted mb-3">
              Enter your vault password to decrypt your {providerLabel} key for this session.
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                value={vaultPassword}
                onChange={e => setVaultPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleUnlock()}
                placeholder="Vault password"
                className="flex-1 bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-ink-primary focus:outline-none focus:border-neon-purple placeholder:text-ink-muted"
              />
              <button
                onClick={handleUnlock}
                disabled={!vaultPassword}
                className="bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple/40 text-neon-purple text-sm font-semibold px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Unlock
              </button>
            </div>
            {keyError && <p className="text-xs text-neon-red mt-2">{keyError}</p>}
          </div>
        )}

        {hasKey && (
          <div className="flex items-center gap-2 bg-neon-green/5 border border-neon-green/20 rounded-lg px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-neon-green flex-shrink-0 animate-pulse" />
            <span className="text-xs text-ink-secondary">{providerLabel} key active for this session</span>
            <button
              onClick={() => setDecryptedKeys(prev => { const n = { ...prev }; delete n[currentProvider]; return n; })}
              className="ml-auto text-xs text-ink-muted hover:text-neon-red transition-colors"
            >
              Lock
            </button>
          </div>
        )}

        <div className="bg-surface border border-border rounded-xl p-6 space-y-5">
          <div>
            <label htmlFor="prompt" className="text-xs font-medium text-ink-secondary block mb-2">
              Prompt
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="A cinematic aerial shot over a foggy mountain valley at golden hour..."
              rows={3}
              disabled={isRunning}
              className="w-full bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-ink-primary focus:outline-none focus:border-neon-purple placeholder:text-ink-muted resize-none disabled:opacity-60"
            />
          </div>

          <RoutingSuggestion prompt={prompt} onApply={handleApplyRouting} />

          <ModelSelector
            model={model}       onModelChange={setModel}
            mode={mode}         onModeChange={setMode}
            duration={duration} onDurationChange={setDuration}
          />

          <CostTicker settings={{ model, mode, duration }} />

          <button
            onClick={handleGenerate}
            disabled={!canGen || isRunning}
            className="w-full bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple/40 text-neon-purple font-semibold py-3 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
          >
            {!hasKey
              ? `🔒 Unlock ${providerLabel} key above first`
              : isRunning
              ? 'Generating...'
              : 'Generate Video →'}
          </button>
        </div>

        <VideoResult state={genState} videoUrl={videoUrl} error={genError} />

        {(genState === 'done' || genState === 'error') && (
          <button
            onClick={() => { setGenState('idle'); setVideoUrl(''); setGenError(''); }}
            className="w-full text-xs text-ink-muted hover:text-neon-purple transition-colors py-2"
          >
            Generate another →
          </button>
        )}

      </div>
    </main>
  );
}
