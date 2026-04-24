'use client';
import { useState } from 'react';
import { encryptApiKey, saveVaultEntry } from '@/lib/vault';
import type { Provider } from '@/lib/vault';

const PROVIDERS: { id: Provider; label: string }[] = [
  { id: 'runway',   label: 'Runway' },
  { id: 'kling',    label: 'Kling AI' },
  { id: 'seedance', label: 'Seedance (Volcengine)' },
  { id: 'luma',     label: 'Luma Dream Machine' },
];

type FormStatus = 'idle' | 'saving' | 'success' | 'error';

export function KeyForm({ onSaved }: { onSaved: () => void }) {
  const [provider, setProvider] = useState<Provider>('runway');
  const [apiKey,   setApiKey]   = useState('');
  const [password, setPassword] = useState('');
  const [status,   setStatus]   = useState<FormStatus>('idle');
  const [error,    setError]    = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!apiKey.trim() || !password.trim()) return;
    setStatus('saving');
    setError('');
    try {
      const entry = await encryptApiKey(apiKey.trim(), password, provider);
      saveVaultEntry(entry);
      setApiKey('');
      setPassword('');
      setStatus('success');
      onSaved();
      setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setError('Encryption failed. Please try again.');
      setStatus('error');
    }
  }

  const isDisabled = status === 'saving' || !apiKey.trim() || !password.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="provider" className="block text-xs font-medium text-ink-secondary mb-1">Provider</label>
        <select
          id="provider"
          value={provider}
          onChange={e => {
            const value = e.target.value;
            if (['runway', 'kling', 'seedance', 'luma'].includes(value)) {
              setProvider(value as Provider);
            }
          }}
          className="w-full bg-elevated border border-border rounded-lg px-3 py-2 text-ink-primary text-sm focus:outline-none focus:border-neon-purple"
        >
          {PROVIDERS.map(p => (
            <option key={p.id} value={p.id}>{p.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="api-key" className="block text-xs font-medium text-ink-secondary mb-1">API Key</label>
        <input
          id="api-key"
          type="password"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          placeholder="sk-..."
          autoComplete="off"
          className="w-full bg-elevated border border-border rounded-lg px-3 py-2 text-ink-primary text-sm font-mono focus:outline-none focus:border-neon-purple placeholder:text-ink-muted"
        />
      </div>

      <div>
        <label htmlFor="vault-password" className="block text-xs font-medium text-ink-secondary mb-1">Vault Password</label>
        <input
          id="vault-password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Your encryption password"
          autoComplete="new-password"
          className="w-full bg-elevated border border-border rounded-lg px-3 py-2 text-ink-primary text-sm focus:outline-none focus:border-neon-purple placeholder:text-ink-muted"
        />
        <p className="text-xs text-ink-muted mt-1">
          Used to encrypt your key locally. Never sent to any server.
        </p>
      </div>

      {status === 'error' && (
        <p className="text-xs text-neon-red">{error}</p>
      )}

      <button
        type="submit"
        disabled={isDisabled}
        className="w-full bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple/40 text-neon-purple font-semibold text-sm py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'saving'  ? 'Encrypting...' :
         status === 'success' ? '✓ Saved to Vault' :
                                'Encrypt & Save to Vault'}
      </button>
    </form>
  );
}
