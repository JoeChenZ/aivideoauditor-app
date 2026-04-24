import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Key Guide — AI Video Auditor',
  description: 'Step-by-step guide to getting your Kling AI API key for free direct access.',
};

const STEPS = [
  {
    n: '01',
    title: 'Create a Kling AI account',
    body: "Go to klingai.com and sign up for a free account. You'll need to verify your email address.",
    note: null,
  },
  {
    n: '02',
    title: 'Navigate to the Developer Console',
    body: 'Once logged in, click your avatar in the top-right corner. Select "API" or "Developer" from the dropdown menu. This takes you to the API management section.',
    note: "If you don't see an API option, you may need to complete profile verification first.",
  },
  {
    n: '03',
    title: 'Create an API key',
    body: 'Click "Create API Key" or "Generate Key". Give it a descriptive name like "AI Video Auditor". Kling will generate an Access Key ID and an Access Key Secret.',
    note: null,
  },
  {
    n: '04',
    title: 'Copy both parts',
    body: "You'll receive two strings: an Access Key ID (starts with a short alphanumeric prefix) and an Access Key Secret (longer string). Copy both — the secret is shown only once.",
    note: 'The secret is only displayed at creation time. Store it somewhere safe before closing the modal.',
  },
  {
    n: '05',
    title: 'Format for AI Video Auditor',
    body: "Combine them as: accessKeyId:accessKeySecret — that's the ID, a colon, then the secret. Example: abc123:xyz789secretkey. This is the format the Key Vault expects.",
    note: null,
  },
  {
    n: '06',
    title: 'Add to your vault',
    body: "Go to the Key Vault page, set a master password if you haven't already, click \"Add Key\", select Kling AI, and paste your formatted key. It's encrypted immediately.",
    note: null,
  },
];

const FAQ = [
  {
    q: 'Does Kling AI have a free tier?',
    a: 'Kling AI offers a limited free trial with credits. After that, generations are pay-as-you-go starting at $0.07 per 5-second standard video.',
  },
  {
    q: 'What if I lose my Access Key Secret?',
    a: "You cannot retrieve a lost secret — it's shown only once. Go back to the Kling developer console and generate a new API key. Then update your vault entry.",
  },
  {
    q: 'Can I add multiple Kling API keys?',
    a: 'Yes. The Key Vault supports multiple entries per provider. Useful if you have separate keys for different projects or billing accounts.',
  },
  {
    q: 'How do I know my key is working?',
    a: 'After adding your key and unlocking your vault, the Dashboard Health Board will show a green "Operational" status for Kling AI within 30 seconds.',
  },
];

export default function GuidePage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-bold tracking-widest text-neon-purple uppercase mb-4">Step-by-Step</p>
        <h1 className="text-4xl font-bold text-ink-primary mb-4">
          Getting Your Kling AI API Key
        </h1>
        <p className="text-ink-secondary leading-relaxed mb-12 text-lg">
          You need a direct API key from Kling AI to use AI Video Auditor. Here&apos;s how to get one in under 5 minutes.
        </p>

        {/* Steps */}
        <section className="mb-16 space-y-8">
          {STEPS.map((s) => (
            <div key={s.n} className="flex gap-6">
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-full bg-neon-purple/20 border border-neon-purple/30 flex items-center justify-center">
                  <span className="text-neon-purple font-mono font-bold text-xs">{s.n}</span>
                </div>
              </div>
              <div>
                <h3 className="text-ink-primary font-semibold mb-2">{s.title}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{s.body}</p>
                {s.note && (
                  <div className="mt-3 bg-neon-amber/5 border border-neon-amber/20 rounded-lg px-4 py-2.5">
                    <p className="text-neon-amber text-xs leading-relaxed">⚠ {s.note}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Key format example */}
        <section className="bg-elevated border border-border rounded-2xl p-6 mb-16">
          <p className="text-ink-secondary font-semibold mb-3 text-sm">Expected key format</p>
          <code className="font-mono text-neon-green text-sm">accessKeyId:accessKeySecret</code>
          <p className="text-ink-muted text-xs mt-2">Both parts separated by a single colon. No spaces.</p>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-ink-primary mb-6">FAQ</h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="bg-surface border border-border rounded-xl p-5">
                <p className="text-ink-primary font-medium mb-2 text-sm">{item.q}</p>
                <p className="text-ink-secondary text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/vault"
            className="inline-flex items-center justify-center gap-2 bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple/40 text-neon-purple font-semibold px-6 py-3 rounded-xl transition-all"
          >
            Add your API key →
          </Link>
          <Link
            href="/why-byok"
            className="inline-flex items-center justify-center gap-2 bg-elevated hover:bg-elevated/80 border border-border text-ink-secondary font-medium px-6 py-3 rounded-xl transition-all text-sm"
          >
            Why go direct?
          </Link>
        </div>
      </div>
    </main>
  );
}
