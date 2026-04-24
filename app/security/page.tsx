import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security — AI Video Auditor',
  description: 'Your API keys never leave your browser. AES-256-GCM encryption, zero server storage.',
};

const PRINCIPLES = [
  {
    title: 'Your keys never leave your browser',
    body: 'When you add an API key, it is encrypted immediately in your browser using AES-256-GCM before anything is stored. The plaintext key is never sent to our servers — not even for a millisecond.',
  },
  {
    title: 'Encrypted at rest with your master password',
    body: 'Your master password is used to derive an AES-256-GCM encryption key via PBKDF2 with 100,000 iterations and a random salt. Without your master password, the ciphertext is meaningless.',
  },
  {
    title: 'Zero server storage',
    body: "We have no database of API keys. We have no user accounts tied to credentials. There is nothing on our servers to breach. Your vault is stored only in your browser's localStorage.",
  },
  {
    title: 'Direct API calls',
    body: "Generation requests go directly from your browser to the AI provider's API (e.g., api.klingai.com) using your decrypted key. Our servers are not in the request path — we never see your traffic.",
  },
  {
    title: 'Open architecture',
    body: 'The encryption logic lives in lib/vault.ts — a single, auditable file using the Web Crypto API with zero external dependencies. There is no proprietary black box.',
  },
];

export default function SecurityPage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-bold tracking-widest text-neon-purple uppercase mb-4">Trust Model</p>
        <h1 className="text-4xl font-bold text-ink-primary mb-6">
          Your Keys, Your Credits,<br />
          <span className="text-neon-green">Our Logic.</span>
        </h1>
        <p className="text-ink-secondary leading-relaxed mb-12 text-lg">
          We built this platform with one constraint: if our servers were completely compromised, attackers would get nothing useful. Here&apos;s exactly how that works.
        </p>

        {/* Principles */}
        <section className="space-y-6 mb-16">
          {PRINCIPLES.map((p, i) => (
            <div key={p.title} className="flex gap-6">
              <div className="w-8 h-8 rounded-full bg-neon-green/20 border border-neon-green/30 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-neon-green text-xs font-bold">{i + 1}</span>
              </div>
              <div>
                <h3 className="text-ink-primary font-semibold mb-2">{p.title}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Technical specs */}
        <section className="bg-elevated border border-border rounded-2xl p-8 mb-12 font-mono text-sm">
          <p className="text-ink-secondary font-sans font-semibold mb-4 text-base">Technical Specification</p>
          <div className="space-y-2 text-ink-secondary">
            <div className="flex gap-4">
              <span className="text-ink-muted w-36 shrink-0">Encryption</span>
              <span className="text-neon-green">AES-256-GCM</span>
            </div>
            <div className="flex gap-4">
              <span className="text-ink-muted w-36 shrink-0">Key derivation</span>
              <span className="text-neon-green">PBKDF2-SHA256, 100,000 iterations</span>
            </div>
            <div className="flex gap-4">
              <span className="text-ink-muted w-36 shrink-0">Salt</span>
              <span className="text-neon-green">16 bytes, random per vault</span>
            </div>
            <div className="flex gap-4">
              <span className="text-ink-muted w-36 shrink-0">IV</span>
              <span className="text-neon-green">12 bytes, random per entry</span>
            </div>
            <div className="flex gap-4">
              <span className="text-ink-muted w-36 shrink-0">Crypto API</span>
              <span className="text-neon-green">Web Crypto API (browser-native)</span>
            </div>
            <div className="flex gap-4">
              <span className="text-ink-muted w-36 shrink-0">Storage</span>
              <span className="text-neon-green">localStorage (your device only)</span>
            </div>
            <div className="flex gap-4">
              <span className="text-ink-muted w-36 shrink-0">Server stores</span>
              <span className="text-neon-red">nothing</span>
            </div>
          </div>
        </section>

        {/* Threat model */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-ink-primary mb-6">Threat Model</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { threat: 'Our server is breached', result: 'Attacker gets nothing — no keys stored server-side', safe: true },
              { threat: 'Our database is leaked', result: 'No credential database exists to leak', safe: true },
              { threat: 'Network traffic is intercepted', result: 'Keys never traverse the network in plaintext', safe: true },
              { threat: 'Your device is compromised', result: 'localStorage is exposed — protect your device', safe: false },
            ].map((row) => (
              <div key={row.threat} className="bg-surface border border-border rounded-xl p-4">
                <p className="text-ink-secondary text-sm font-medium mb-1">{row.threat}</p>
                <p className={`text-xs leading-relaxed ${row.safe ? 'text-neon-green' : 'text-neon-amber'}`}>{row.result}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Link
          href="/vault"
          className="inline-flex items-center gap-2 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-semibold px-6 py-3 rounded-xl transition-all"
        >
          Add your API key securely →
        </Link>
      </div>
    </main>
  );
}
