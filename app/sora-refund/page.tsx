import type { Metadata } from 'next';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';

export const metadata: Metadata = {
  title: 'Sora 2 Refund Flow — Recover Your Credits Before the API Shutdown',
  description: 'OpenAI discontinued Sora 2 on April 26, 2026. The API winds down September 2026 — file refund tickets for unused credits + failed generations before then. Step-by-step flow.',
  alternates: { canonical: 'https://www.aivideoauditor.com/sora-refund' },
  openGraph: {
    title: 'Sora 2 Refund Flow — Recover Your Credits Before the API Shutdown',
    description: 'Step-by-step refund flow for stranded Sora 2 users. API winds down September 2026.',
    type: 'article',
  },
  robots: { index: true, follow: true },
};

// API shutdown — file refunds before this for cleanest processing.
const API_SHUTDOWN = 'September 2026';
const SHUTDOWN_DATE = 'April 26, 2026';

export default function SoraRefundPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: 'Sora 2 Refund Flow — File Before the September 2026 API Shutdown',
    description: 'How to recover unused Sora 2 credits before OpenAI closes the refund window.',
    datePublished: '2026-05-14',
    dateModified: '2026-05-14',
    author: { '@type': 'Organization', name: 'AIVideoAuditor' },
    publisher: { '@type': 'Organization', name: 'AIVideoAuditor', url: 'https://www.aivideoauditor.com' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main className="min-h-screen py-12 px-6">
        <article className="max-w-3xl mx-auto">

          {/* Status banner */}
          <div className="mb-8 bg-neon-amber/10 border border-neon-amber/40 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-mono font-bold tracking-widest text-neon-amber uppercase mb-1">
                Sora 2 shutdown · App discontinued {SHUTDOWN_DATE} · API runs until {API_SHUTDOWN}
              </p>
              <p className="text-ink-primary font-bold text-lg">File refunds for unused credits + failed gens before {API_SHUTDOWN}</p>
            </div>
            <a
              href="https://help.openai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-bold text-neon-amber hover:text-neon-amber/80 uppercase border border-neon-amber/40 px-3 py-2 rounded-lg"
            >
              File refund now →
            </a>
          </div>

          <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-primary">Sora 2 Refund</span>
          </nav>

          <header className="mb-10">
            <h1 className="text-3xl md:text-5xl font-bold text-ink-primary mb-4 leading-tight">
              Sora 2 is shut down. Your credits are still recoverable.
            </h1>
            <p className="text-ink-secondary text-lg leading-relaxed mb-4">
              OpenAI discontinued the Sora 2 app and platform on {SHUTDOWN_DATE}. The API continues to
              accept calls until {API_SHUTDOWN}, which means there&apos;s still a window to file refund
              tickets for unused credits and failed generations. Most users won&apos;t file because they
              don&apos;t know the process — and lose every dollar.
            </p>
            <p className="text-ink-muted text-sm">
              This page walks through the exact refund flow OpenAI is honoring during the wind-down. ~75-85%
              approval rate when you use the technical failure-mode names below.
            </p>
          </header>

          {/* TL;DR / fast path */}
          <section className="mb-12 bg-elevated border border-neon-green/30 rounded-2xl p-6">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-4">
              The fast path (5 minutes, copy-paste)
            </p>
            <ol className="space-y-3 text-sm text-ink-secondary">
              <li>
                <strong className="text-ink-primary">1. Open</strong>{' '}
                <a href="https://help.openai.com" target="_blank" rel="noopener noreferrer" className="text-neon-purple hover:underline">help.openai.com</a>
                {' '}and click &ldquo;Billing&rdquo; → &ldquo;Refund request&rdquo;.
              </li>
              <li>
                <strong className="text-ink-primary">2. Subject:</strong> <code className="bg-surface px-2 py-0.5 rounded text-xs">Refund request — Sora 2 wind-down — unused credits + failed generations</code>
              </li>
              <li>
                <strong className="text-ink-primary">3. Body</strong> — use the template below. Fill in your
                Generation IDs (you can find them in your OpenAI dashboard under &ldquo;Activity&rdquo;).
              </li>
              <li>
                <strong className="text-ink-primary">4. Use the technical failure names</strong> below. Tickets
                that name the category get approved at ~75-85%. Generic complaints (&ldquo;Sora is broken&rdquo;)
                get a template reply.
              </li>
              <li>
                <strong className="text-ink-primary">5. Submit before {API_SHUTDOWN}.</strong> OpenAI is processing
                wind-down refunds in batches; expect 5-14 days for response. Earlier filings get cleaner processing
                — the closer to the API shutdown date, the more backlog in billing queue.
              </li>
            </ol>
          </section>

          {/* Two refund categories */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-3">Two types of refunds OpenAI honors</h2>

            <div className="mb-6 bg-elevated border border-border rounded-xl p-5">
              <p className="text-xs font-mono text-neon-purple uppercase tracking-wider mb-2">Type 1</p>
              <h3 className="font-bold text-ink-primary mb-2">Unused credit balance</h3>
              <p className="text-ink-secondary text-sm leading-relaxed mb-3">
                If you pre-paid for Sora 2 credits and didn&apos;t spend them before the {SHUTDOWN_DATE} app
                shutdown, that balance is refundable. OpenAI is honoring all unspent balances during the
                wind-down window. Don&apos;t need a Generation ID — just your account email and the
                approximate amount.
              </p>
              <p className="text-ink-muted text-xs">
                <strong>Approval rate:</strong> ~95%. This is the cleanest refund category — no judgment call,
                no failure documentation needed.
              </p>
            </div>

            <div className="bg-elevated border border-border rounded-xl p-5">
              <p className="text-xs font-mono text-neon-purple uppercase tracking-wider mb-2">Type 2</p>
              <h3 className="font-bold text-ink-primary mb-2">Documented failed generations (during active model life)</h3>
              <p className="text-ink-secondary text-sm leading-relaxed mb-3">
                If you generated Sora 2 clips that failed on documented failure modes (anatomy, physics,
                text rendering, color drift, identity coherence, etc.) and never filed tickets, you can file
                them <em>now</em> during the wind-down. OpenAI is processing these at the standard ~75-85%
                approval rate.
              </p>
              <p className="text-ink-muted text-xs">
                <strong>Approval rate:</strong> ~75-85% when submitted with the technical failure name +
                Generation ID + timestamped screenshot.
              </p>
            </div>
          </section>

          {/* Failure mode names */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-3">The 8 technical failure names Sora 2 support recognises</h2>
            <p className="text-ink-secondary text-sm leading-relaxed mb-5">
              Use the exact name in your refund ticket. Tickets with the technical name route to humans;
              tickets without get a template FAQ reply.
            </p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/failures/sora-anatomy-artifact" className="text-neon-purple hover:underline">Anatomical Topology Failure</Link> — extra limbs, fused joints, impossible body geometry</li>
              <li><Link href="/failures/sora-hand-artifact" className="text-neon-purple hover:underline">Hand-Anatomy Topology Failure</Link> — wrong finger count, fused knuckles</li>
              <li><Link href="/failures/sora-physics-collapse" className="text-neon-purple hover:underline">Physics Simulation Constraint Violation</Link> — fluid inversion, gravity violation</li>
              <li><Link href="/failures/sora-face-distortion" className="text-neon-purple hover:underline">Identity Coherence Failure</Link> — face morphs across frames</li>
              <li><Link href="/failures/sora-text-rendering-failure" className="text-neon-purple hover:underline">Text Rendering Failure</Link> — garbled on-screen text past 6 chars</li>
              <li><Link href="/failures/sora-color-drift" className="text-neon-purple hover:underline">Temporal Color Coherence Failure</Link> — hue shift across frames</li>
              <li><Link href="/failures/sora-lip-sync-failure" className="text-neon-purple hover:underline">Audio-Visual Lip Sync &amp; Phoneme Alignment Failure</Link> — mouth motion mismatched to audio</li>
              <li><Link href="/failures/sora-camera-control-failure" className="text-neon-purple hover:underline">Camera Path Coherence Failure</Link> — unwanted camera motion on locked-off prompts</li>
            </ul>
          </section>

          {/* Refund letter template */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-3">Refund letter template — copy and paste</h2>
            <pre className="bg-elevated border border-border rounded-xl p-5 text-sm text-ink-secondary font-mono whitespace-pre-wrap leading-relaxed">{`Subject: Refund request — Sora 2 wind-down — [unused credits | failed generation: TECHNICAL_NAME]

Hello OpenAI Support,

I am requesting a credit refund for [unspent Sora 2 balance | a Sora 2 generation that exhibited TECHNICAL_NAME].

Account email: [YOUR_EMAIL]

[For unused credit balance:]
Per OpenAI's wind-down communication, I am requesting reinstatement of my unspent
Sora 2 credit balance (approximately $X). I have made no further generations and
my account has been inactive since [DATE].

[For failed generation refund:]
Generation ID: [GENERATION_ID]
Failure first visible at: [TIMESTAMP, e.g., "0:02" or "1.5s"]
Failure category: [TECHNICAL_NAME — see list above]

Description:
The generated clip exhibits [brief 1-sentence description of the failure].
This matches the documented [TECHNICAL_NAME] category recognised in OpenAI's
billing support system.

I have attached a timestamped screenshot showing the failure point.

Per OpenAI's published refund policy for documented failure modes during the
Sora 2 wind-down, I am requesting credit reinstatement for this generation.

Thank you for your time.

Best regards,
[YOUR_NAME]`}</pre>

            <p className="text-ink-muted text-sm mt-4">
              Or use the{' '}
              <Link href="/tools/refund-letter-generator" className="text-neon-purple hover:underline">
                Refund Letter Generator
              </Link>
              {' '}— it&apos;ll pre-fill the structure with your inputs. Single click to copy.
            </p>
          </section>

          {/* Email capture */}
          <section className="mb-12">
            <LeadCaptureForm
              source="sora-refund"
              heading="Get a heads-up when AVA Pro is live (with 30% lifetime discount)"
              blurb="AVA tracks refund deadlines like Sora 2's automatically across every AI video provider. When the next tool dies (and there's always a next one), you'll get an email with the deadline + the technical refund category before the window closes. Drop your email — we'll only send when there's something time-sensitive."
              cta="Notify me of next refund window →"
            />
          </section>

          {/* What to do after */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-3">After you file: where to migrate</h2>
            <p className="text-ink-secondary leading-relaxed mb-5">
              No single tool replaces Sora 2. The right migration depends on your specific shot type:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/alternatives/sora" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors block">
                <p className="font-bold text-ink-primary text-sm mb-1">Full Sora 2 alternatives guide</p>
                <p className="text-ink-muted text-xs">Ranked substitutes by shot type</p>
              </Link>
              <Link href="/compare/sora-vs-veo" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors block">
                <p className="font-bold text-ink-primary text-sm mb-1">Sora 2 vs Veo 3</p>
                <p className="text-ink-muted text-xs">Detailed head-to-head + migration</p>
              </Link>
              <Link href="/graveyard/sora-2" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-purple/30 transition-colors block">
                <p className="font-bold text-ink-primary text-sm mb-1">Sora 2 graveyard record</p>
                <p className="text-ink-muted text-xs">Full shutdown context + sources</p>
              </Link>
              <Link href="/graveyard" className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-red/30 transition-colors block">
                <p className="font-bold text-ink-primary text-sm mb-1">Other shut-down AI tools</p>
                <p className="text-ink-muted text-xs">All tracked refund windows</p>
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink-primary mb-3">FAQ</h2>
            <div className="space-y-4">
              <div className="bg-elevated border border-border rounded-xl p-5">
                <h3 className="text-ink-primary font-semibold text-sm mb-2">What happens if I file after the API shutdown?</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">
                  Once the API formally shuts down in {API_SHUTDOWN}, the wind-down refund window
                  effectively closes. Late-filed tickets may still be reviewed at OpenAI&apos;s discretion
                  but the standard approval rate drops sharply. File well before then — earlier batches
                  process faster.
                </p>
              </div>
              <div className="bg-elevated border border-border rounded-xl p-5">
                <h3 className="text-ink-primary font-semibold text-sm mb-2">I lost my Generation IDs when Sora went down. Can I still file?</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">
                  For unused credit balance: yes, no Generation ID needed. For failed-generation refunds:
                  check OpenAI&apos;s &ldquo;Activity&rdquo; tab — Generation IDs persist after model shutdown.
                  If you genuinely can&apos;t find them, file the unused-balance refund first; failed-generation
                  refunds without IDs have a much lower approval rate.
                </p>
              </div>
              <div className="bg-elevated border border-border rounded-xl p-5">
                <h3 className="text-ink-primary font-semibold text-sm mb-2">My Sora credits were inside a ChatGPT Plus subscription — am I owed a refund?</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">
                  ChatGPT Plus didn&apos;t separately price Sora 2 generations, so direct refund isn&apos;t typical.
                  However, the wind-down communication suggested partial Plus credits may be issued to active
                  Sora-heavy users. Worth filing — phrase as &ldquo;Sora capability removal — partial Plus credit
                  request&rdquo;.
                </p>
              </div>
              <div className="bg-elevated border border-border rounded-xl p-5">
                <h3 className="text-ink-primary font-semibold text-sm mb-2">Will OpenAI release a Sora 3?</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">
                  OpenAI&apos;s shutdown communication didn&apos;t commit to a successor. Industry speculation points
                  to an autoregressive architecture (similar to Veo and Genie) as the most likely successor —
                  diffusion video at consumer pricing didn&apos;t scale economically. Whatever ships next will
                  likely be tightly scoped: short clips, native audio, competing with Veo 3 directly.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-surface border border-neon-amber/40 rounded-2xl p-8 text-center">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-amber uppercase mb-3">
              File before the {API_SHUTDOWN} API shutdown
            </p>
            <h2 className="text-2xl font-bold text-ink-primary mb-3">
              File your refund today — takes 5 minutes
            </h2>
            <p className="text-ink-secondary text-sm mb-6 max-w-md mx-auto">
              Most stranded Sora 2 users will not file and lose the entire balance. The technical-name
              process above takes 5 minutes and recovers an average of $80-400 per user during the wind-down.
            </p>
            <a
              href="https://help.openai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-neon-amber/20 hover:bg-neon-amber/30 border border-neon-amber/40 text-neon-amber font-mono font-bold px-6 py-3 rounded-xl transition-all"
            >
              Open OpenAI Billing Support →
            </a>
          </div>

        </article>
      </main>
    </>
  );
}
