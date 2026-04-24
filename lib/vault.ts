// lib/vault.ts

export type Provider = 'runway' | 'kling' | 'seedance' | 'luma';

export interface VaultEntry {
  provider: Provider;
  ciphertext: string; // base64-encoded encrypted API key
  iv: string;         // base64-encoded 12-byte AES-GCM IV
  salt: string;       // base64-encoded 16-byte PBKDF2 salt
}

function toBase64(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function fromBase64(b64: string): Uint8Array {
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0));
}

async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const baseKey = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100_000, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptApiKey(
  apiKey: string,
  password: string,
  provider: Provider
): Promise<VaultEntry> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv   = crypto.getRandomValues(new Uint8Array(12));
  const key  = await deriveKey(password, salt);
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(apiKey)
  );
  return {
    provider,
    ciphertext: toBase64(ciphertext),
    iv:         toBase64(iv),
    salt:       toBase64(salt),
  };
}

export async function decryptApiKey(
  entry: VaultEntry,
  password: string
): Promise<string> {
  const salt       = fromBase64(entry.salt);
  const iv         = fromBase64(entry.iv);
  const ciphertext = fromBase64(entry.ciphertext);
  const key        = await deriveKey(password, salt);
  const plaintext  = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  );
  return new TextDecoder().decode(plaintext);
}

const STORAGE_KEY = 'ava_vault_v1';

export function loadVaultEntries(): VaultEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as VaultEntry[];
  } catch {
    return [];
  }
}

export function saveVaultEntry(entry: VaultEntry): void {
  const entries = loadVaultEntries().filter(e => e.provider !== entry.provider);
  entries.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function removeVaultEntry(provider: Provider): void {
  const entries = loadVaultEntries().filter(e => e.provider !== provider);
  if (entries.length === 0) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }
}

export function clearVault(): void {
  localStorage.removeItem(STORAGE_KEY);
}
