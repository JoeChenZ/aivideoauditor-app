// __tests__/vault.test.ts

// Mock localStorage for Node.js test environment
const store: Record<string, string> = {};
Object.defineProperty(global, 'localStorage', {
  value: {
    getItem:    (k: string) => store[k] ?? null,
    setItem:    (k: string, v: string) => { store[k] = v; },
    removeItem: (k: string) => { delete store[k]; },
    clear:      () => { Object.keys(store).forEach(k => delete store[k]); },
    length: 0,
    key: () => null,
  },
  writable: true,
});

import {
  encryptApiKey,
  decryptApiKey,
  saveVaultEntry,
  loadVaultEntries,
  removeVaultEntry,
  clearVault,
} from '../lib/vault';
import type { Provider } from '../lib/vault';

describe('vault encryption', () => {
  it('encrypts and decrypts an API key round-trip', async () => {
    const entry = await encryptApiKey('sk-runway-abc123', 'vault-password', 'runway');
    const decrypted = await decryptApiKey(entry, 'vault-password');
    expect(decrypted).toBe('sk-runway-abc123');
  });

  it('produces different ciphertext each time (random IV + salt)', async () => {
    const entry1 = await encryptApiKey('sk-runway-abc123', 'vault-password', 'runway');
    const entry2 = await encryptApiKey('sk-runway-abc123', 'vault-password', 'runway');
    expect(entry1.ciphertext).not.toBe(entry2.ciphertext);
    expect(entry1.iv).not.toBe(entry2.iv);
    expect(entry1.salt).not.toBe(entry2.salt);
  });

  it('throws on wrong password', async () => {
    const entry = await encryptApiKey('sk-kling-xyz', 'correct-password', 'kling');
    await expect(decryptApiKey(entry, 'wrong-password')).rejects.toThrow();
  });

  it('entry contains provider, ciphertext, iv, salt fields', async () => {
    const entry = await encryptApiKey('sk-seedance-111', 'pass', 'seedance');
    expect(entry.provider).toBe('seedance');
    expect(typeof entry.ciphertext).toBe('string');
    expect(typeof entry.iv).toBe('string');
    expect(typeof entry.salt).toBe('string');
  });

  it('throws on tampered ciphertext (GCM authentication tag failure)', async () => {
    const entry = await encryptApiKey('sk-test', 'pass', 'runway');
    const tampered = { ...entry, ciphertext: entry.ciphertext.slice(0, -4) + 'AAAA' };
    await expect(decryptApiKey(tampered, 'pass')).rejects.toThrow();
  });
});

describe('vault storage', () => {
  beforeEach(() => { clearVault(); });

  it('loadVaultEntries returns empty array when storage is empty', () => {
    expect(loadVaultEntries()).toEqual([]);
  });

  it('saves and loads a vault entry', async () => {
    const entry = await encryptApiKey('sk-test', 'pass', 'runway');
    saveVaultEntry(entry);
    const entries = loadVaultEntries();
    expect(entries).toHaveLength(1);
    expect(entries[0].provider).toBe('runway');
  });

  it('saving same provider overwrites existing entry', async () => {
    const entry1 = await encryptApiKey('sk-old', 'pass', 'runway');
    const entry2 = await encryptApiKey('sk-new', 'pass', 'runway');
    saveVaultEntry(entry1);
    saveVaultEntry(entry2);
    expect(loadVaultEntries()).toHaveLength(1);
  });

  it('stores multiple providers independently', async () => {
    saveVaultEntry(await encryptApiKey('sk-runway', 'pass', 'runway'));
    saveVaultEntry(await encryptApiKey('sk-kling',  'pass', 'kling'));
    saveVaultEntry(await encryptApiKey('sk-luma',   'pass', 'luma'));
    expect(loadVaultEntries()).toHaveLength(3);
  });

  it('removeVaultEntry removes only the specified provider', async () => {
    saveVaultEntry(await encryptApiKey('sk-runway', 'pass', 'runway'));
    saveVaultEntry(await encryptApiKey('sk-kling',  'pass', 'kling'));
    removeVaultEntry('runway');
    const entries = loadVaultEntries();
    expect(entries).toHaveLength(1);
    expect(entries[0].provider).toBe('kling');
  });

  it('clearVault removes all entries', async () => {
    saveVaultEntry(await encryptApiKey('sk-runway', 'pass', 'runway'));
    saveVaultEntry(await encryptApiKey('sk-kling',  'pass', 'kling'));
    clearVault();
    expect(loadVaultEntries()).toHaveLength(0);
  });

  it('decrypted value after save/load round-trip matches original', async () => {
    const entry = await encryptApiKey('sk-runway-real-key-99', 'my-strong-password', 'runway');
    saveVaultEntry(entry);
    const loaded = loadVaultEntries()[0];
    const decrypted = await decryptApiKey(loaded, 'my-strong-password');
    expect(decrypted).toBe('sk-runway-real-key-99');
  });
});
