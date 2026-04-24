import Link from 'next/link';

const FEATURES = [
  {
    icon: '🔑',
    title: 'Bring Your Own Keys',
    body: 'Your Kling, Runway, and Seedance API keys never leave your browser. AES-256-GCM encrypted in your local vault — we never see them.',
  },
  {
    icon: '⚡',
    title: 'Smart ECtS Routing',
    body: 'Our routing engine scores every model by Expected Cost to Success — not just price. Portrait prompts go to v1.5, action to Pro mode, saving you reruns.',
  },
  {
    icon: '📊',
    title: 'Live Vendor Health',
    body: 'Real-time status board pings each API vendor every 30 seconds. Never waste a generation attempt on a degraded endpoint.',
  },
];

const STEPS = [
  { n: '01', title: 'Get your API key', body: 'Sign up at Kling AI and copy your Access Key ID + Secret from the developer console.' },
  { n: '02', title: 'Add to your vault', body: "Paste it into the Key Vault. It's encrypted locally with your master password — zero server storage." },
  { n: '03', title: 'Open the Dashboard', body: 'Unlock your vault, pick a prompt, and let the routing engine pick the optimal model automatically.' },
  { n: '04', title: 'Generate and download', body: 'Your generation runs direct from your key to Kling\'s API. Your credits, your output, your cost.' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-void bg-grid-pattern bg-grid pt-28 pb-24 px-6 text-center">
        <p className="text-xs font-bold tracking-widest text-neon-purple uppercase mb-6">
          BYOK Infrastructure for AI Video
        </p>
        <h1 className="text-5xl md:text-6xl font-bold text-ink-primary mb-6 leading-tight max-w-3xl mx-auto">
          Your Keys.<br />Your Credits.<br />
          <span className="text-neon-purple">Our Logic.</span>
        </h1>
        <p className="text-ink-secondary mb-10 max-w-xl mx-auto text-lg leading-relaxed">
          Route AI video generation across Kling, Runway, and Seedance using your own API keys.
          Stop paying the 30–70% aggregator markup.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple/40 text-neon-purple font-semibold px-8 py-3.5 rounded-xl transition-all text-base"
          >
            Open Dashboard →
          </Link>
          <Link
            href="/why-byok"
            className="inline-flex items-center justify-center gap-2 bg-elevated hover:bg-elevated/80 border border-border text-ink-secondary font-medium px-8 py-3.5 rounded-xl transition-all text-sm"
          >
            Why BYOK?
          </Link>
        </div>
      </section>

      {/* Feature grid */}
      <section className="bg-surface py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-ink-primary text-center mb-12">
            Everything you need. Nothing you don&apos;t.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-elevated border border-border rounded-2xl p-6">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-ink-primary font-semibold mb-2">{f.title}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-void py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-ink-primary text-center mb-12">How it works</h2>
          <div className="space-y-6">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-6 items-start">
                <span className="text-neon-purple font-mono font-bold text-lg shrink-0 w-8">{s.n}</span>
                <div>
                  <h3 className="text-ink-primary font-semibold mb-1">{s.title}</h3>
                  <p className="text-ink-secondary text-sm leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface border-t border-border py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-ink-primary mb-4">Ready to stop overpaying?</h2>
        <p className="text-ink-secondary mb-8 max-w-md mx-auto">Add your API key in under 2 minutes. No account required.</p>
        <Link
          href="/vault"
          className="inline-flex items-center gap-2 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-semibold px-8 py-3.5 rounded-xl transition-all"
        >
          Add My API Key →
        </Link>
      </section>
    </main>
  );
}
