import type { Metadata } from 'next';
import Link from 'next/link';
import { WidePageShell, Breadcrumb, ArticleHeader, RuleDivider } from '@/components/editorial';
import StudioCtaBanner from '@/components/studio-cta-banner';

const URL = 'https://www.aivideoauditor.com/ai-video-prompt-structure';
const PUBLISHED = '2026-09-24';

export const metadata: Metadata = {
  title: 'AI Video Prompt Structure: The 6-Slot Template (2026)',
  description:
    'Most AI video prompts fail because they are written like image prompts. Use the 6-slot structure (subject, action, camera, lighting, style, duration) with before-and-after rewrites you can copy.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'AI Video Prompt Structure: The 6-Slot Template (2026)',
    description:
      'Subject, action, camera, lighting, style, duration. A repeatable prompt structure for Runway, Veo, Kling, Sora and Luma, with before-and-after rewrites.',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AI Video Prompt Structure: The 6-Slot Template (2026)',
  description:
    'A repeatable six-slot structure for writing AI video generation prompts, with before-and-after rewrites and the prompt patterns that reliably produce failures.',
  author: { '@type': 'Organization', name: 'AIVideoAuditor' },
  publisher: { '@type': 'Organization', name: 'AIVideoAuditor', url: 'https://www.aivideoauditor.com' },
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  image: 'https://www.aivideoauditor.com/opengraph-image',
  articleSection: 'Prompt craft',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.aivideoauditor.com' },
    { '@type': 'ListItem', position: 2, name: 'AI Video Prompt Structure', item: URL },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How should an AI video prompt be structured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Write it in six slots, in this order: subject, action, camera, lighting, style, duration. Put the thing that must not drift first, because the earliest part of a prompt is the part a video model holds onto most reliably across frames. Keep the whole prompt to one shot and one continuous action.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does my AI video ignore part of my prompt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most common cause is asking for more than one action in a single generation. A prompt that chains events, for example walks in, sits down, then picks up a cup, gives the model several competing targets for a few seconds of output, and the later instructions are the ones usually dropped. Split each action into its own generation and cut them together.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use negative prompts for AI video?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Only where the model exposes a dedicated negative prompt field. Writing no watermark or not blurry inside the main prompt describes the thing you are trying to avoid, and many video models will weight those words rather than suppress them. Check whether your model has a separate negative field before relying on one.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long should an AI video prompt be?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Long enough to fill the six slots once, and no longer. Roughly 30 to 60 words covers a single shot. Past that you are usually adding a second shot, a second action, or adjectives that compete with each other, all of which reduce how closely the output follows the prompt.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I never put in an AI video prompt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Readable text in frame, tight close-ups of hands, and more than one character interacting are the three patterns most likely to produce an unusable clip on current models. If your shot needs any of them, plan for repeat generations, or add the text and the hands in your editor instead.',
      },
    },
  ],
};

function Slot({
  n,
  name,
  job,
  example,
}: {
  n: string;
  name: string;
  job: string;
  example: string;
}) {
  return (
    <div className="border-l-2 border-neon-amber/50 pl-5 py-1">
      <div className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-1">
        Slot {n} · {name}
      </div>
      <p className="text-sm text-ink-secondary leading-relaxed mb-2">{job}</p>
      <p className="font-mono text-xs text-ink-primary">{example}</p>
    </div>
  );
}

function Rewrite({
  shot,
  before,
  after,
  why,
}: {
  shot: string;
  before: string;
  after: string;
  why: string;
}) {
  return (
    <div className="mb-10">
      <div className="font-mono text-[10px] tracking-kicker uppercase text-ink-muted mb-2">{shot}</div>
      <p className="font-mono text-xs text-ink-muted mb-2">
        <span className="text-neon-amber">BEFORE </span>
        {before}
      </p>
      <p className="font-mono text-xs text-ink-primary mb-3">
        <span className="text-neon-amber">AFTER </span>
        {after}
      </p>
      <p className="text-sm text-ink-secondary leading-relaxed">{why}</p>
    </div>
  );
}

export default function AiVideoPromptStructurePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <WidePageShell>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'AI Video Prompt Structure' }]} />

        <div className="max-w-reading">
          <ArticleHeader
            kicker={`Prompt craft · Published ${PUBLISHED}`}
            title={<>Most AI video prompts fail because they are written like image prompts.</>}
            lede={
              <>
                An image prompt describes a <strong>frame</strong>. A video prompt has to describe a{' '}
                <strong>shot</strong>: what is in it, what moves, where the camera is, and how long
                any of that has to hold together. Here is a six-slot structure that covers all of it,
                the rewrites that show what changes, and the prompt patterns that reliably produce a
                clip you cannot use.
              </>
            }
            byline={<>AIVideoAuditor desk · Craft guide, not a benchmark · Verify behaviour against your model&apos;s current docs</>}
          />
        </div>

        <RuleDivider label="The six slots" />

        <div className="max-w-prose space-y-5 text-ink-secondary leading-relaxed mb-8">
          <p>
            Write every prompt in the same six slots, in the same order. The order matters more than
            the wording: put the element that must not drift at the front, because the opening of a
            prompt is the part a video model tends to hold most consistently across frames. Everything
            after it is progressively more negotiable.
          </p>
        </div>

        <div className="max-w-prose space-y-6 mb-14">
          <Slot
            n="1"
            name="Subject"
            job="Who or what the shot is about, described concretely enough to be re-identifiable. Vague subjects drift the fastest."
            example="&quot;A grey-haired barista in a green apron&quot;"
          />
          <Slot
            n="2"
            name="Action"
            job="Exactly one continuous action. Not a sequence. If you catch yourself writing then, you have written two generations."
            example="&quot;pouring steamed milk into a cup&quot;"
          />
          <Slot
            n="3"
            name="Camera"
            job="Framing plus movement. Saying nothing here does not give you a neutral camera, it gives you whatever the model defaults to, which is usually a slow drift."
            example="&quot;medium shot, locked-off camera&quot;"
          />
          <Slot
            n="4"
            name="Lighting"
            job="The single biggest lever on whether output reads as real or as rendered, and it costs you nothing to specify."
            example="&quot;warm window light from the left, soft shadows&quot;"
          />
          <Slot
            n="5"
            name="Style"
            job="Medium and treatment. Pick one register and stop. Stacking cinematic, hyperreal, 8k and anime in one prompt makes them compete."
            example="&quot;shot on 35mm film, shallow depth of field&quot;"
          />
          <Slot
            n="6"
            name="Duration"
            job="How long the shot needs to hold. Ask for the shortest clip that serves the edit. Coherence on current models degrades with length, so a 5-second ask is a materially easier ask than a 10-second one."
            example="&quot;5 seconds&quot;"
          />
        </div>

        <div className="max-w-prose mb-14">
          <p className="border-l-2 border-neon-amber/50 pl-5 py-2 font-mono text-sm text-ink-primary">
            A grey-haired barista in a green apron, pouring steamed milk into a cup, medium shot,
            locked-off camera, warm window light from the left with soft shadows, shot on 35mm film
            with shallow depth of field, 5 seconds.
          </p>
        </div>

        <RuleDivider label="Three rewrites" />

        <div className="max-w-prose mb-14">
          <Rewrite
            shot="Product shot"
            before='"beautiful cinematic product video of a candle, 8k, hyperrealistic, amazing quality, trending"'
            after='"A cream pillar candle on a walnut table, flame flickering steadily, slow push-in on a 50mm lens, low warm key light from the right against a dark background, shot on 35mm film, 5 seconds."'
            why="The before is six quality adjectives and no shot. It names no camera, no light and no motion, so the model invents all three. The after gives the model one subject, one motion, one camera move and one lighting setup, which is the whole job. Quality words like 8k and amazing quality are doing nothing here that the film stock and lens references are not doing better."
          />
          <Rewrite
            shot="Character shot"
            before='"a woman walks into the office, sits down at her desk, opens her laptop and starts typing while talking to her colleague"'
            after='"A woman in a navy blazer typing at a laptop, seated at a desk, medium close-up, locked-off camera, cool overhead office light, natural documentary style, 5 seconds."'
            why="The before chains four actions and adds a second character into a few seconds of output. That is the single most reliable way to get a clip where the prompt is partly ignored, because the model has more instructions than it has frames to satisfy them. The after keeps one person doing one thing. Shoot the walk-in as its own generation and cut the two together."
          />
          <Rewrite
            shot="Text on screen"
            before={'"a storefront with a sign that reads FRESH BREAD DAILY, morning light"'}
            after={'"A bakery storefront with an unlettered wooden sign above the door, morning light, static wide shot, 5 seconds."'}
            why="Readable text in frame remains one of the weakest areas of current video models, and longer strings degrade faster than short ones. Asking for a blank sign and adding the lettering in your editor gets you a usable clip on the first generation instead of a reroll loop."
          />
        </div>

        <RuleDivider label="What to keep out of the prompt" />

        <div className="max-w-prose space-y-5 text-ink-secondary leading-relaxed mb-14">
          <p>
            Four patterns cost more credits than anything else, because they tend to fail in ways a
            reroll does not fix. They are worth designing around rather than prompting harder at.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-3">
              <span className="text-neon-amber font-mono mt-1 shrink-0">▸</span>
              <span>
                <strong>Chained actions.</strong> Anything with then in it. One action per generation.
                See the per-model references for{' '}
                <Link href="/failures/runway-prompt-ignored-failure" className="underline underline-offset-2">
                  prompt adherence failure
                </Link>
                .
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-amber font-mono mt-1 shrink-0">▸</span>
              <span>
                <strong>Readable text in frame.</strong> Signs, labels, screens, subtitles. Add them
                in post. Reference:{' '}
                <Link href="/failures/veo-text-rendering-failure" className="underline underline-offset-2">
                  text rendering failure
                </Link>
                .
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-amber font-mono mt-1 shrink-0">▸</span>
              <span>
                <strong>Hand close-ups.</strong> Fingers at the centre of frame are still where
                anatomy breaks most visibly. Frame them further from camera. Reference:{' '}
                <Link href="/failures/runway-hand-artifact" className="underline underline-offset-2">
                  hand artifact failure
                </Link>
                .
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-amber font-mono mt-1 shrink-0">▸</span>
              <span>
                <strong>Negative phrasing in the main prompt.</strong> No watermark and not blurry
                name the thing you do not want. Use the model&apos;s dedicated negative prompt field
                if it has one, and otherwise leave it out.
              </span>
            </li>
          </ul>
        </div>

        <RuleDivider label="Adapting the structure per model" />

        <div className="max-w-prose space-y-5 text-ink-secondary leading-relaxed mb-14">
          <p>
            The six slots are model-agnostic, but which slots carry the most weight is not, and the
            models change often enough that anything specific here should be checked against current
            documentation before you rely on it. Two practical adjustments are stable enough to be
            worth stating:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-3">
              <span className="text-neon-amber font-mono mt-1 shrink-0">▸</span>
              <span>
                Models that generate audio need a seventh slot for it, and it should be as literal as
                the rest. Describe the sound you want, not the mood.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-amber font-mono mt-1 shrink-0">▸</span>
              <span>
                Image-to-video changes what slot 1 is for. The reference image already fixes the
                subject, so spend slot 1 on what should stay locked and give the remaining budget to
                action and camera.
              </span>
            </li>
          </ul>
          <p>
            For prompts that real creators actually shipped, with the model each one ran on, see the{' '}
            <Link href="/prompts" className="underline underline-offset-2">
              prompt library
            </Link>
            . For the failure modes named above, with what each one looks like and how to describe it
            when you open a support ticket, see the{' '}
            <Link href="/failures" className="underline underline-offset-2">
              failure reference
            </Link>
            .
          </p>
        </div>

        <StudioCtaBanner />
      </WidePageShell>
    </>
  );
}
