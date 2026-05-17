import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Request Luma AI / Dream Machine Goodwill Credits — Step-by-Step',
  description:
    'Luma\'s policy doesn\'t guarantee refunds for output-quality failures, but support has discretion to grant goodwill credits. Here\'s how to make the strongest possible case — Asset ID capture, technical failure terminology, and a PDF audit report.',
  alternates: { canonical: 'https://www.aivideoauditor.com/luma-refund-guide' },
  openGraph: {
    title: 'How to Request Luma AI Dream Machine Goodwill Credits',
    description:
      'Step-by-step guide to documenting failures and requesting goodwill credits from Luma AI Dream Machine.',
    type: 'article',
  },
};

const STEPS = [
  {
    n: '01',
    title: 'Identify which failure mode you actually hit',
    body: 'Luma Dream Machine support categorises failures before they triage them. Vague reports ("the video came out bad") get routed to a slower queue. Categorise first: motion mismatch, fluid-simulation collapse, anatomical drift, prompt-image mismatch, or temporal flicker. The clearer your category, the faster the response.',
    tip: null,
  },
  {
    n: '02',
    title: 'Capture the Asset ID and shareable link',
    body: 'Every Dream Machine generation has a unique Asset ID embedded in the URL after generation completes (e.g., lumalabs.ai/dream-machine/creations/...). You also have a public share link. Both are required for refund verification — without them, Luma support cannot confirm which generation you\'re reporting and the request is typically declined.',
    tip: 'AVA captures and surfaces your Asset ID and Share Link automatically the moment the generation finishes.',
  },
  {
    n: '03',
    title: 'Document the specific failure timestamp',
    body: 'Note the exact second where the failure occurs ("limb interpenetration at 0:02.4", "water flowing upward at 0:04.1"). Luma\'s support team weights timestamped, frame-level evidence significantly higher than general complaints. If multiple failures occur, list each with its own timestamp.',
    tip: 'AVA\'s frame-mark tool drops a red annotation on the exact defective frame on a CORS-safe screenshot.',
  },
  {
    n: '04',
    title: 'Translate the description into engineering terminology',
    body: 'The single most underused trick: replace casual descriptions with the technical category. "The arm bent weirdly" → "Anatomical Topology & Coherence Failure". "The water did something weird" → "Physics Simulation Constraint Violation". Support agents are trained to recognise these classifications and they trigger a different (faster) internal workflow.',
    tip: 'AVA\'s Professionalizer engine maps your tagged failure category to the corresponding engineering term automatically.',
  },
  {
    n: '05',
    title: 'Send your refund request',
    body: 'Email support@lumalabs.ai (or use the in-app feedback widget). Include: your Luma account email, Asset ID, share link, technical failure category, timestamped description, the credit cost, and a clear request. Keep tone professional and factual — not emotional. Attach the PDF audit report if you have one — it noticeably strengthens the ticket. Goodwill credits are at Luma\'s discretion and not guaranteed.',
    tip: null,
  },
  {
    n: '06',
    title: 'Follow up after 72 hours',
    body: 'Luma\'s support cadence is typically slightly slower than Runway\'s. If you don\'t hear back within 72 hours, send one polite follow-up referencing your original message. Multiple rapid follow-ups hurt — one well-timed one helps.',
    tip: null,
  },
];

const FAQ = [
  {
    q: 'Does Luma AI refund credits for failed Dream Machine generations?',
    a: 'Luma\'s public policy doesn\'t guarantee refunds for output-quality failures — completed generations are typically considered consumed. However, support has discretion to grant goodwill credits for clear technical defects when the case is well-documented. Your odds depend on evidence quality: Asset ID + share link + timestamped technical description significantly improve outcomes. There is no guaranteed result.',
  },
  {
    q: 'What failure types does Luma support tend to consider for goodwill credits?',
    a: 'Anecdotally, well-documented anatomical/limb artifacts (extra limbs, fused fingers), physics simulation failures (impossible fluid dynamics, gravity violations), facial landmark regression (drifting facial geometry across frames), temporal flicker (high-frequency luminance discontinuity), and significant prompt-output mismatch where the output is commercially unusable have been granted goodwill credits in some cases. Outcomes are at Luma\'s discretion — there is no published refund policy for these categories.',
  },
  {
    q: 'Where is my Luma Asset ID?',
    a: 'After generation, your video has a unique URL like lumalabs.ai/dream-machine/creations/[asset-id]. The trailing UUID is your Asset ID. You can also share the generation publicly and use the resulting share URL in your refund request — both are accepted.',
  },
  {
    q: 'How long does a Luma credit refund take to process?',
    a: 'Typically 2–7 business days once the request is accepted. Requests with strong evidence (Asset ID + technical description + timestamped failure + PDF audit report attached) move significantly faster.',
  },
  {
    q: 'Does a PDF audit report help with Luma refund requests?',
    a: 'Yes — a formatted Technical Diagnostic Report containing the Asset ID, share link, annotated failure frames, and engineering-grade failure classification signals that you understand exactly what went wrong. It also makes it harder for support to dismiss the request as subjective. Approval rate noticeably improves.',
  },
  {
    q: 'Does AVA work on both Luma and Runway?',
    a: 'Yes — AIVideoAuditor monitors both platforms. The Chrome extension auto-detects whether you\'re on lumalabs.ai or runwayml.com and captures the right identifiers (Asset ID for Luma, Generation ID for Runway). The same PDF audit workflow applies to both.',
  },
  {
    q: 'What if Luma denies my refund?',
    a: 'Reply with the PDF audit report attached and politely reference Luma\'s commitment to generation quality. A formal technical document changes the tone of the conversation. If still declined, escalate with a follow-up citing that the output is commercially unusable due to the specific documented technical defect.',
  },
];

const FAILURE_TYPES = [
  {
    slug: 'limb-artifact',
    label: 'Limb / Anatomy Artifact',
    technical: 'Anatomical Topology & Coherence Failure',
    desc: 'Extra fingers, fused limbs, interpenetrating geometry, impossible joint articulations across frames.',
    risk: 'CRITICAL',
  },
  {
    slug: 'physics-collapse',
    label: 'Fluid / Physics Collapse',
    technical: 'Physics Simulation Constraint Violation',
    desc: 'Particularly common on Luma: water flowing upward, smoke implosion, cloth interpenetration, particle drift.',
    risk: 'MAJOR',
  },
  {
    slug: 'face-distortion',
    label: 'Face Distortion',
    technical: 'Facial Landmark Regression Failure',
    desc: 'Asymmetric eye placement, jaw drift between frames, non-Euclidean facial proportions.',
    risk: 'CRITICAL',
  },
  {
    slug: 'temporal-flicker',
    label: 'Temporal Flicker',
    technical: 'High-Frequency Temporal Aliasing & Frame Discontinuity',
    desc: 'Stroboscopic luminance shifts between adjacent frames, motion-blur artifacts that misalign with motion.',
    risk: 'MAJOR',
  },
  {
    slug: 'prompt-mismatch',
    label: 'Prompt-Output Mismatch',
    technical: 'Semantic Adherence Failure',
    desc: 'Output substantively diverges from prompt — wrong subject, missing key elements, wrong scene composition.',
    risk: 'MAJOR',
  },
];

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Get a Luma AI Dream Machine Credit Refund',
  description: 'Step-by-step guide to documenting failures and requesting goodwill credits from Luma AI Dream Machine.',
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

export default function LumaRefundGuidePage() {
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
          <p className="text-xs font-mono font-bold tracking-widest text-neon-red uppercase mb-4">
            Luma Refund Guide
          </p>
          <h1 className="text-4xl font-bold text-ink-primary mb-4 leading-tight">
            How to Get a Luma AI Dream Machine Credit Refund
          </h1>
          <p className="text-ink-secondary leading-relaxed mb-3 text-lg">
            Dream Machine charged you for a broken generation. You can get those credits back.
            Here&apos;s exactly how — capture the Asset ID, classify the failure with the right
            technical terms, and write a request support can&apos;t ignore.
          </p>
          <p className="text-ink-muted text-sm font-mono mb-12">
            Works for Dream Machine 1.6, Photon, Ray2 · See also: <Link href="/guide" className="text-neon-purple underline">Runway refund guide</Link>
          </p>

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

          <section aria-label="Luma failure types" className="mb-16">
            <h2 className="text-xl font-bold text-ink-primary mb-2">Luma Failure Type Reference</h2>
            <p className="text-ink-secondary text-sm mb-6">
              Use these technical terms in your refund request. Each maps to a failure category
              Luma&apos;s support team recognises.
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

          <section className="mb-16">
            <h2 className="text-xl font-bold text-ink-primary mb-4">Refund Email Template</h2>
            <p className="text-ink-secondary text-sm mb-4">
              Send this to <strong className="text-ink-primary">support@lumalabs.ai</strong>.
              Fill in the bracketed fields. AVA generates this automatically with your real Asset ID.
            </p>
            <div className="bg-elevated border border-border rounded-xl p-5 font-mono text-xs text-ink-secondary leading-relaxed whitespace-pre-wrap">
{`Subject: Credit Refund — Technical Generation Failure (Asset ID: [YOUR_ASSET_ID])

Hi Luma Support,

I am requesting a credit refund for a Dream Machine generation that produced unusable output due to a technical failure.

Generation Details:
- Asset ID:      [YOUR_ASSET_ID]
- Share Link:    [YOUR_SHARE_LINK]
- Account Email: [YOUR_LUMA_EMAIL]
- Date/Time:     [DATE_UTC]
- Credits Used:  [X]
- Failure Type:  [TECHNICAL_TERM e.g. Anatomical Topology & Coherence Failure]

Technical Failure Details:
[DESCRIPTION OF FAILURE — timestamped, frame-specific]

The output is commercially unusable due to the documented defect above.
Please refund [X] credits to my account.

Thank you,
[YOUR_NAME]`}
            </div>
          </section>

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

          <div className="bg-surface border border-neon-green/20 rounded-2xl p-8 text-center">
            <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
              Do It in One Click
            </p>
            <h2 className="text-2xl font-bold text-ink-primary mb-3">
              AVA builds this refund request for you
            </h2>
            <p className="text-ink-secondary text-sm mb-6 max-w-md mx-auto">
              Install the extension, mark the broken frames, and get a professional refund letter
              or PDF Technical Audit Report — all evidence pre-filled with your real Asset ID and Share Link.
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
