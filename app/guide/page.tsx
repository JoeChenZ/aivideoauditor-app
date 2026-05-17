import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Request Runway ML Goodwill Credits — Step-by-Step Guide',
  description:
    'Runway\'s public policy says completed generations are non-refundable for output quality, but support has discretion to grant goodwill credits. Here\'s how to make the strongest possible case — Generation ID, technical failure terminology, and a PDF audit report.',
  alternates: { canonical: 'https://www.aivideoauditor.com/guide' },
  openGraph: {
    title: 'How to Request Runway ML Goodwill Credits',
    description:
      'Step-by-step guide to documenting failures and requesting goodwill credits from Runway ML. Includes email templates and a PDF audit report tool.',
    type: 'article',
  },
};

const STEPS = [
  {
    n: '01',
    title: 'Identify the failure type before you contact support',
    body: 'Runway support triage emails by specificity. Vague complaints ("it looks weird") are deprioritised. Categorise your failure first: limb artifact, physics collapse, face distortion, text rendering failure, or prompt mismatch. The more technical your description, the faster you get escalated.',
    tip: null,
  },
  {
    n: '02',
    title: 'Capture your Generation ID',
    body: 'Every Runway generation has a unique ID visible in the URL or via the share link. You need this for any refund request — it\'s how support verifies the generation on their end. Without it, your request is unverifiable and likely to be declined.',
    tip: 'AVA captures and displays your Generation ID and Share ID automatically as soon as you hit Generate.',
  },
  {
    n: '03',
    title: 'Document the failure with evidence',
    body: 'Screenshot or note the exact timestamp where the failure occurs (e.g., "limb geometry collapses at 2.4s"). If you have multiple failure points, document each one separately. Support teams weight requests with timestamped, specific evidence significantly higher than general complaints.',
    tip: 'AVA\'s red-box annotation tool lets you circle the exact defect on a CORS-safe screenshot of the frame.',
  },
  {
    n: '04',
    title: 'Translate your description to engineering terminology',
    body: 'The difference between a declined and approved refund often comes down to language. "The arm looks broken" → "Anatomical Topology & Coherence Failure". "It flickers" → "High-Frequency Temporal Aliasing & Frame Discontinuity". Support agents are trained to recognise technical failure classifications — they trigger a different internal workflow.',
    tip: 'AVA\'s Professionalizer engine automatically maps your marked failure types to engineering-grade terminology.',
  },
  {
    n: '05',
    title: 'Generate your refund request',
    body: "Runway has no direct-email intake. The path depends on your plan tier. Pro+ users: open the in-app AI Assistant (help widget bottom-right of app.runwayml.com) and submit a refund ticket — Runway support replies via email after the ticket opens. Free/Standard users don't get human support — your channel is the Runway Discord #community-help channel where moderators triage. Either way, paste the message template below as your first post and attach the PDF audit report. The PDF is what turns a vague complaint into a documented refund-ready ticket.",
    tip: null,
  },
  {
    n: '06',
    title: 'Follow up after 48 hours',
    body: 'If you don\'t hear back within 48 hours, send one follow-up referencing your original ticket. Runway support handles high volumes — a single professional follow-up significantly improves response rate. Do not send multiple follow-ups in quick succession.',
    tip: null,
  },
];

const FAQ = [
  {
    q: 'Does Runway ML refund credits for failed generations?',
    a: 'Runway\'s public help center explicitly states that completed generations consume credits "even if the result doesn\'t match your prompt, doesn\'t preserve likeness, or is otherwise unsatisfactory." Automated refunds apply only to generation errors (crashes/timeouts). However, Runway support has discretion to grant goodwill credits for well-documented clear technical failures. Outcomes vary — there is no guaranteed result.',
  },
  {
    q: 'What types of failures does Runway support tend to consider for goodwill credits?',
    a: 'Anecdotally, support has been observed to grant goodwill credits for clearly anomalous output: anatomical/limb artifacts (extra limbs, interpenetrating geometry), physics simulation failures (fluid inversion, gravity violations), face distortion (landmark regression), text rendering failures, and significant prompt-output mismatches where the output is commercially unusable. Outcomes are at Runway\'s discretion.',
  },
  {
    q: 'How long does a Runway goodwill-credit request take?',
    a: 'Typically 1–5 business days once your ticket is accepted for human review. Requests with strong evidence (Generation ID + technical description + timestamped failure) tend to receive faster human review than vague complaints. There is no guaranteed turnaround.',
  },
  {
    q: 'Does a PDF audit report help?',
    a: 'A formatted Technical Diagnostic Report with your Generation ID, share link, annotated failure screenshots, and engineering-grade failure analysis signals that you understand what went wrong and present the case professionally. It tends to make support less likely to dismiss the request as subjective, but does not guarantee approval.',
  },
  {
    q: 'Can I make goodwill-credit requests for Luma AI too?',
    a: 'Luma AI (Dream Machine) has a similar support process and similar discretionary approach to goodwill credits. AVA works on both platforms — it monitors your generations, captures your Generation ID and Asset ID, and builds the documentation for both Runway and Luma.',
  },
  {
    q: 'What if Runway denies my request?',
    a: 'Reply with the PDF audit report attached and politely reference Runway\'s commitment to generation quality. A formal technical document changes the tone of the conversation. If still declined, you can escalate with a follow-up citing the specific failure type, but Runway is under no obligation to grant credits for completed generations.',
  },
];

const FAILURE_TYPES = [
  {
    slug: 'limb-artifact',
    label: 'Limb / Anatomy Artifact',
    technical: 'Anatomical Topology & Coherence Failure',
    desc: 'Extra arms, fused fingers, interpenetrating geometry, impossible joint configurations.',
    risk: 'CRITICAL',
  },
  {
    slug: 'temporal-flicker',
    label: 'Temporal Flicker',
    technical: 'High-Frequency Temporal Aliasing & Frame Discontinuity',
    desc: 'Stroboscopic flickering, inter-frame luminance discontinuities, motion blur artifacts.',
    risk: 'MAJOR',
  },
  {
    slug: 'physics-collapse',
    label: 'Physics Collapse',
    technical: 'Physics Simulation Constraint Violation',
    desc: 'Fluid inversion (water flowing upward), object collision failures, gravity violations.',
    risk: 'MAJOR',
  },
  {
    slug: 'face-distortion',
    label: 'Face Distortion',
    technical: 'Facial Landmark Regression Failure',
    desc: 'Asymmetric eye placement, morphological drift across frames, non-Euclidean proportions.',
    risk: 'CRITICAL',
  },
  {
    slug: 'text-rendering',
    label: 'Text Rendering Failure',
    technical: 'Glyph Synthesis & Typography Coherence Failure',
    desc: 'Unreadable characters, glyph hallucination, encoding artifacts on text elements.',
    risk: 'MAJOR',
  },
];

// JSON-LD structured data
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Get a Runway ML Credit Refund',
  description: 'Step-by-step guide to documenting failures and requesting goodwill credits from Runway ML.',
  totalTime: 'PT10M',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
  tool: [{ '@type': 'HowToTool', name: 'AIVideoAuditor Chrome Extension' }],
  step: STEPS.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function GuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen py-20 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Hero */}
          <p className="text-xs font-mono font-bold tracking-widest text-neon-red uppercase mb-4">
            Refund Guide
          </p>
          <h1 className="text-4xl font-bold text-ink-primary mb-4 leading-tight">
            How to Get a Runway ML Credit Refund
          </h1>
          <p className="text-ink-secondary leading-relaxed mb-3 text-lg">
            Runway charged you credits for a broken generation. You deserve them back.
            Here&apos;s exactly how to document the failure, write the request, and
            maximise your chances of approval.
          </p>
          <p className="text-ink-muted text-sm font-mono mb-12">
            Works for Runway Gen-4, Gen-4 Turbo, Gen-3A · Also applies to Luma AI Dream Machine
          </p>

          {/* Steps */}
          <section aria-label="Refund steps" className="mb-16 space-y-0">
            <h2 className="text-xl font-bold text-ink-primary mb-8">Step-by-Step Refund Process</h2>
            {STEPS.map((s, i, arr) => (
              <article key={s.n} className="flex gap-6 relative">
                {i < arr.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-0 w-px bg-border" />
                )}
                <div className="shrink-0 z-10">
                  <div className="w-10 h-10 rounded-full bg-neon-red/20 border border-neon-red/30 flex items-center justify-center">
                    <span className="text-neon-red font-mono font-bold text-xs">{s.n}</span>
                  </div>
                </div>
                <div className="pb-10">
                  <h3 className="text-ink-primary font-semibold mb-2">{s.title}</h3>
                  <p className="text-ink-secondary text-sm leading-relaxed mb-3">{s.body}</p>
                  {s.tip && (
                    <div className="bg-neon-green/5 border border-neon-green/20 rounded-lg px-4 py-2.5">
                      <p className="text-neon-green text-xs leading-relaxed">
                        <strong>AVA does this automatically:</strong> {s.tip}
                      </p>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </section>

          {/* Failure type reference */}
          <section aria-label="Failure types" className="mb-16">
            <h2 className="text-xl font-bold text-ink-primary mb-2">Runway Failure Type Reference</h2>
            <p className="text-ink-secondary text-sm mb-6">
              Use these technical terms in your refund request. Each maps to a recognised failure category.
            </p>
            <div className="space-y-3">
              {FAILURE_TYPES.map((f) => (
                <div
                  key={f.slug}
                  className="bg-elevated border border-border rounded-xl p-4 hover:border-neon-red/30 transition-colors"
                  itemScope
                  itemType="https://schema.org/DefinedTerm"
                >
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className="font-mono font-bold text-ink-primary text-sm" itemProp="name">
                      {f.label}
                    </h3>
                    <span className={`text-xs font-mono font-bold shrink-0 ${
                      f.risk === 'CRITICAL' ? 'text-neon-red' : 'text-neon-amber'
                    }`}>{f.risk}</span>
                  </div>
                  <p className="text-xs font-mono text-neon-purple mb-1" itemProp="termCode">
                    Technical term: {f.technical}
                  </p>
                  <p className="text-ink-muted text-xs" itemProp="description">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Refund message template */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-ink-primary mb-4">Refund Message Template</h2>
            <p className="text-ink-secondary text-sm mb-4">
              Runway has no direct-email intake. Pro+ users: paste this into the
              <strong className="text-ink-primary"> in-app AI Assistant </strong>
              chat (help widget bottom-right of app.runwayml.com) to open a refund
              ticket; the support team replies via email after the ticket opens.
              Free/Standard users: post in the Runway Discord
              <strong className="text-ink-primary"> #community-help </strong>
              channel and ping <strong>@On Call - Moderators</strong>. Attach the
              PDF audit report AVA generates either way. Fill the bracketed fields —
              AVA populates them automatically with your real data.
            </p>
            <div className="bg-elevated border border-border rounded-xl p-5 font-mono text-xs text-ink-secondary leading-relaxed whitespace-pre-wrap">
{`Refund request — technical failure on a paid generation.

Generation ID:    [YOUR_GENERATION_ID]
Share Link:       [YOUR_SHARE_LINK]
Date / Time UTC:  [DATE]
Credits Charged:  [X]
Failure Category: [TECHNICAL_TERM e.g. Anatomical Topology & Coherence Failure]
Failure Timestamp(s): [e.g. 1.4s, 3.2s]

Failure summary:
[2-3 line description — what's wrong, why the output is commercially unusable]

PDF Technical Audit Report attached (frame-level evidence + engineering classification).

Requesting refund of [X] credits to my account.`}
            </div>
            <p className="text-ink-muted text-xs mt-3">
              Tip — for Discord refund requests, post in #support (NOT #general),
              tag the failure category in your first line, and upload the PDF as
              an attachment. The Runway team checks Discord during business hours
              and routes credit-refund DMs from there.
            </p>
          </section>

          {/* FAQ */}
          <section aria-label="FAQ" className="mb-16">
            <h2 className="text-xl font-bold text-ink-primary mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {FAQ.map((item) => (
                <div key={item.q} className="bg-surface border border-border rounded-xl p-5">
                  <h3 className="text-ink-primary font-semibold mb-2 text-sm">{item.q}</h3>
                  <p className="text-ink-secondary text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-surface border border-neon-green/20 rounded-2xl p-8 text-center">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
              Do It in One Click
            </p>
            <h2 className="text-2xl font-bold text-ink-primary mb-3">
              AVA builds this report for you
            </h2>
            <p className="text-ink-secondary text-sm mb-6 max-w-md mx-auto">
              Install the extension, mark the broken frames, and get a professional refund letter
              or PDF Technical Audit Report — all evidence pre-filled with your real Generation ID and share link.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://chromewebstore.google.com/detail/aivideoauditor/ecomchbdfkgakaoponipjgpnjfpimdef"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 text-neon-green font-mono font-bold px-6 py-3 rounded-xl transition-all"
              >
                Install Free Extension →
              </a>
              <Link
                href="/#upgrade"
                className="inline-flex items-center justify-center gap-2 bg-neon-amber/10 hover:bg-neon-amber/20 border border-neon-amber/30 text-neon-amber font-mono font-semibold px-6 py-3 rounded-xl transition-all text-sm"
              >
                ✦ See PDF Audit Report
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
