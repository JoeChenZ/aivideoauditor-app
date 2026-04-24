'use client';
import { useState, useEffect } from 'react';
import {
  loadVaultEntries,
  removeVaultEntry,
  clearVault,
} from '@/lib/vault';
import type { VaultEntry, Provider } from '@/lib/vault';
import { KeyForm } from '@/components/vault/key-form';
import { KeyBadge } from '@/components/vault/key-badge';

export default function VaultPage() {
  const [entries, setEntries] = useState<VaultEntry[]>([]);

  function refresh() {
    setEntries(loadVaultEntries());
  }

  useEffect(() => { refresh(); }, []);

  function handleRemove(provider: Provider) {
    removeVaultEntry(provider);
    refresh();
  }

  function handleClearAll() {
    if (!window.confirm('Remove all stored API keys from this device?')) return;
    clearVault();
    refresh();
  }

  return (
    <main className="min-h-screen bg-void bg-grid-pattern bg-grid">
      <div className="max-w-lg mx-auto px-4 py-16">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-neon-purple uppercase mb-2">
            The Vault
          </p>
          <h1 className="text-2xl font-bold text-ink-primary">API Key Manager</h1>
          <p className="text-sm text-ink-secondary mt-1">
            Keys are encrypted with AES-256-GCM in your browser. Nothing is sent to our servers.
          </p>
        </div>

        {/* Add Key Form */}
        <div className="bg-surface border border-border rounded-xl p-6 mb-6">
          <h2 className="text-sm font-semibold text-ink-secondary mb-4">Add API Key</h2>
          <KeyForm onSaved={refresh} />
        </div>

        {/* Stored Keys */}
        {entries.length > 0 && (
          <div className="bg-surface border border-border rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-ink-secondary">
                Stored Keys ({entries.length})
              </h2>
              <button
                onClick={handleClearAll}
                aria-label="Remove all stored API keys"
                className="text-xs text-ink-muted hover:text-neon-red transition-colors"
              >
                Clear All
              </button>
            </div>
            <div className="space-y-2">
              {entries.map(e => (
                <KeyBadge
                  key={e.provider}
                  provider={e.provider as Provider}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </div>
        )}

        {/* Security Note */}
        <div className="p-4 bg-neon-purple/5 border border-neon-purple/20 rounded-xl">
          <p className="text-xs text-ink-muted leading-relaxed">
            <strong className="text-ink-secondary">🔒 Zero Server Persistence:</strong>{' '}
            Your API keys are encrypted using AES-256-GCM with a key derived from your vault password
            via PBKDF2 (100,000 iterations, SHA-256). The encrypted blob is stored in your
            browser&apos;s LocalStorage. Your plaintext key and vault password are never transmitted.
          </p>
        </div>

      </div>
    </main>
  );
}
