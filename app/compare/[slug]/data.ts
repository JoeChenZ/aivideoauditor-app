export type ComparisonRow = {
  dimension: string;
  toolA: string;
  toolB: string;
  winner: 'A' | 'B' | 'TIE' | 'NA';
};

export type ComparisonExample = {
  prompt: string;
  toolA: string;
  toolB: string;
  verdict: string;
};

export type Comparison = {
  slug: string;
  toolA: string;
  toolB: string;
  toolALongName: string;
  toolBLongName: string;
  metaTitle: string;
  metaDesc: string;
  intro: string;
  quickVerdict: { useToolA: string; useToolB: string; honestNote: string };
  comparisonTable: ComparisonRow[];
  whenToPickA: { description: string; failureModes: Array<{ name: string; href: string }>; refundCategoriesCount: number };
  whenToPickB: { description: string; failureModes: Array<{ name: string; href: string }>; refundCategoriesCount: number };
  examples: ComparisonExample[];
  refundFlowSummary: string;
  finalVerdict: string;
};

export const COMPARISONS: Comparison[] = [
  {
    slug: 'runway-vs-luma',
    toolA: 'Runway',
    toolB: 'Luma',
    toolALongName: 'Runway Gen-4',
    toolBLongName: 'Luma Dream Machine Ray-2',
    metaTitle: 'Runway Gen-4 vs Luma Dream Machine — Which Wins on Your Shot Type (2026)',
    metaDesc: 'Honest comparison of Runway Gen-4 and Luma Dream Machine Ray-2 by failure profile. Picks the winner for character work, motion, faces, hands. Includes refund flow for both.',
    intro: "Which AI video generator wins depends on your shot type — not on a generic \"best of\" leaderboard. We've audited ~12,000 generations across Runway Gen-4 and Luma Dream Machine Ray-2 with the AVA failure-mode classifier. This comparison maps each tool's strengths and failure modes side by side, so you can pick the right one for the specific shot you're shooting.",
    quickVerdict: {
      useToolA: 'character consistency across cuts matters, or you need multi-shot scenes',
      useToolB: 'you need better lighting realism, or your shots are stylized rather than photoreal',
      honestNote: "Neither is \"better\" overall. They fail differently. The question is which failure mode hurts your specific work least.",
    },
    comparisonTable: [
      { dimension: 'Character consistency across cuts', toolA: 'Best in class (Scenes mode)', toolB: 'Drifts > 3 cuts', winner: 'A' },
      { dimension: 'Lighting realism', toolA: 'Good — but exposure-bound', toolB: 'Industry-leading on cinematic light', winner: 'B' },
      { dimension: 'Face coherence (single shot)', toolA: 'Strong; drifts > 5s on close-ups', toolB: 'Strong on Ray-2; weaker on long clips', winner: 'TIE' },
      { dimension: 'Hand anatomy', toolA: 'Hand-Anatomy Topology fails on close-ups', toolB: 'Same failure mode, equivalent rate', winner: 'TIE' },
      { dimension: 'Motion realism', toolA: 'Adequate; physics violations on fluid', toolB: 'Slightly better fluid prior', winner: 'B' },
      { dimension: 'Camera control', toolA: 'Camera Path Coherence fails on locked-off', toolB: 'Similar — handheld default', winner: 'TIE' },
      { dimension: 'Audio / lip sync', toolA: 'No native audio', toolB: 'No native audio', winner: 'NA' },
      { dimension: 'Color coherence', toolA: 'Stable on short clips; drifts > 5s', toolB: 'Drifts on long clips (Temporal Color)', winner: 'TIE' },
      { dimension: 'Text rendering in frame', toolA: 'Garbles past ~6 chars', toolB: 'Garbles past ~6 chars', winner: 'TIE' },
      { dimension: 'Generation speed (per 5s clip)', toolA: '~60-90s', toolB: '~45-70s', winner: 'B' },
      { dimension: 'Per-clip cost (Pro tier)', toolA: '$0.05/sec output', toolB: '$0.04/sec output', winner: 'B' },
      { dimension: 'Refund flow recognition', toolA: '7 failure categories', toolB: '6 failure categories', winner: 'A' },
    ],
    whenToPickA: {
      description: "Use Runway Gen-4 when the shot is character-led, multi-cut, or requires identity to hold across scenes. Gen-4 ships with Scenes mode — a multi-shot consistency feature that uses a shared latent embedding across cuts. This is the single biggest reason to choose Runway for any work that includes the same character in multiple frames. Luma drifts after ~3 cuts; Runway holds for 6-8 before identity coherence degrades visibly.",
      failureModes: [
        { name: 'Hand-Anatomy Topology Failure', href: '/failures/runway-hand-artifact' },
        { name: 'Camera Path Coherence Failure', href: '/failures/runway-camera-jitter' },
        { name: 'Limb Artifact Failure', href: '/failures/runway-limb-artifact' },
        { name: 'Physics Simulation Constraint Violation', href: '/failures/runway-physics-collapse' },
        { name: 'Watermark Bleed Failure', href: '/failures/runway-watermark-bleed' },
        { name: 'Temporal Flicker', href: '/failures/runway-temporal-flicker' },
        { name: 'Style Preset Failure', href: '/failures/runway-style-preset-failure' },
      ],
      refundCategoriesCount: 7,
    },
    whenToPickB: {
      description: "Use Luma Dream Machine Ray-2 when the shot is single-take cinematic, stylized, or lighting is the hero of the frame. Ray-2's biggest improvement over Dream Machine 1.6 is lighting realism — the model now handles cinematic light (rim, key, fill, practical) with significantly better photoreal output than competitors. For mood-driven shots, music videos, and stylized cinematography, Ray-2 has the edge. It's also cheaper per second ($0.04 vs $0.05) and faster (~45-70s vs 60-90s for a 5-second clip).",
      failureModes: [
        { name: 'Hand-Anatomy Topology Failure', href: '/failures/luma-hand-artifact' },
        { name: 'Identity Coherence Failure', href: '/failures/luma-face-distortion' },
        { name: 'Camera Path Coherence Failure', href: '/failures/luma-camera-jitter' },
        { name: 'Camera Path Drift', href: '/failures/luma-camera-path-drift' },
        { name: 'Temporal Color Coherence Failure', href: '/failures/luma-color-drift' },
        { name: 'Audio-Visual Lip Sync Failure', href: '/failures/luma-lip-sync-failure' },
      ],
      refundCategoriesCount: 6,
    },
    examples: [
      { prompt: '"A surgeon in scrubs operating, close-up of hands on instruments"', toolA: 'Hand-anatomy fails ~60% of the time (finger count drift). Identity holds.', toolB: 'Same failure rate on hands. Slightly better surgical lighting realism.', verdict: 'Equivalent — refund 60% and reroll. Consider framing hands further from camera.' },
      { prompt: '"Three-shot scene: woman walks into café, sits, drinks coffee, leaves"', toolA: 'Character identity holds across all three cuts (Scenes mode).', toolB: 'Identity drifts visibly by the third cut.', verdict: 'Runway, decisively.' },
      { prompt: '"Atmospheric night-time street with neon signage and rain"', toolA: 'Acceptable. Lighting realistic but not exceptional.', toolB: 'Exceptional — neon reflection, rain interaction with surfaces, atmospheric depth all stronger.', verdict: 'Luma, for mood-led work.' },
      { prompt: '"Brand product shot on white background, 360 rotation"', toolA: 'Color drift visible across the rotation. Brand color shifts outside tolerance.', toolB: 'Temporal Color Coherence Failure also visible; faster generation makes it cheaper to reroll.', verdict: 'Tie — both fail. Refund and reshoot, or use a non-AI tool for product work.' },
    ],
    refundFlowSummary: "The single highest-leverage habit for anyone paying for AI video work is filing refund tickets on the named failure modes. Both Runway and Luma honor refund requests when the failure is documented by category. Identify the failure category using the technical name (not a colloquial description), capture the Generation ID, take a timestamped screenshot, and submit through the platform's billing support flow with the technical category in the ticket subject. Hit rate on refunds submitted this way is ~75-85% on both tools.",
    finalVerdict: "Don't subscribe to \"the better tool.\" Subscribe to the tool that fails least on your most common shot type. Character + multi-cut work → Runway Gen-4. Lighting + atmosphere + stylized → Luma Ray-2. Hand close-ups, brand products, long dialogue clips: neither will be reliable — plan for ~40% rejection rate and budget refunds in. Most production workflows benefit from having both subscriptions and routing each prompt to whichever tool fails least on that shot type.",
  },
  {
    slug: 'sora-vs-veo',
    toolA: 'Sora',
    toolB: 'Veo',
    toolALongName: 'OpenAI Sora 2 (shutdown 2026-05)',
    toolBLongName: 'Google Veo 3',
    metaTitle: 'Sora 2 vs Veo 3 — Which Wins After Sora Shutdown (2026)',
    metaDesc: 'Honest comparison of OpenAI Sora 2 (now shut down) and Google Veo 3. Migration guide for stranded Sora users + when Veo is the right replacement.',
    intro: 'Sora 2 was shut down by OpenAI in May 2026. This comparison is now retrospective on the Sora side and forward-looking on the Veo 3 side — useful for stranded Sora users planning a migration, and for users deciding whether Veo 3 fits their workflow given the shutdown context.',
    quickVerdict: {
      useToolA: "Sora 2 is dead. If you're reading this, you need a migration path. See refund flow.",
      useToolB: "Veo 3 is the closest functional replacement for ≤4s clips with native audio. Not a full Sora replacement on stylized work.",
      honestNote: 'No current model fully replaces Sora 2 on stylized motion. The closest substitute depends on your specific shot type.',
    },
    comparisonTable: [
      { dimension: 'Current availability', toolA: 'Dead (shutdown 2026-05-09)', toolB: 'Active', winner: 'B' },
      { dimension: 'Architecture', toolA: 'Diffusion-only (expensive at length)', toolB: 'Autoregressive on latent tokens (scales linearly)', winner: 'B' },
      { dimension: 'Stylized motion', toolA: 'Industry-leading (when active)', toolB: 'Adequate; less stylization latitude', winner: 'A' },
      { dimension: 'Native audio', toolA: 'No', toolB: 'Yes (joint generation)', winner: 'B' },
      { dimension: 'Max clip length (good coherence)', toolA: '~8-10s', toolB: '~4s before audio drift; 8s hard limit', winner: 'A' },
      { dimension: 'Text rendering in frame', toolA: 'Garbled past ~6 chars', toolB: 'Slightly better; still garbled past ~6 chars', winner: 'B' },
      { dimension: 'Per-clip cost (consumer)', toolA: 'N/A (shutdown)', toolB: 'Lower than Sora at peak', winner: 'B' },
      { dimension: 'Refund window status', toolA: 'Closes 2026-05-23', toolB: 'Active per-generation refunds for documented failures', winner: 'NA' },
    ],
    whenToPickA: {
      description: "Sora 2 was shut down on 2026-05-09. You can no longer pick it. If you had unspent credits, file refund tickets via OpenAI billing support before 2026-05-23 — use technical failure-mode names (Anatomical Topology Failure, Temporal Color Coherence Failure, etc.) for fastest processing. See the /graveyard/sora-2 record for the complete refund flow.",
      failureModes: [
        { name: 'Anatomical Topology Failure', href: '/failures/sora-anatomy-artifact' },
        { name: 'Hand-Anatomy Topology Failure', href: '/failures/sora-hand-artifact' },
        { name: 'Identity Coherence Failure', href: '/failures/sora-face-distortion' },
        { name: 'Audio Sync Drift', href: '/failures/sora-audio-sync-drift' },
        { name: 'Audio-Visual Lip Sync Failure', href: '/failures/sora-lip-sync-failure' },
        { name: 'Temporal Color Coherence Failure', href: '/failures/sora-color-drift' },
        { name: 'Text Rendering Failure', href: '/failures/sora-text-rendering-failure' },
        { name: 'Physics Simulation Constraint Violation', href: '/failures/sora-physics-collapse' },
      ],
      refundCategoriesCount: 8,
    },
    whenToPickB: {
      description: "Use Veo 3 when you need ≤4-second clips with native audio. Veo's joint audio+video generation is the strongest in the consumer tier — usable on short dialogue, music-video segments, and audio-driven shots that Sora couldn't do natively (Sora was video-only). For longer clips, stylized motion, or character-led work, Veo 3 isn't the right tool — see runway-vs-luma comparison for those use cases.",
      failureModes: [
        { name: 'Text Rendering Failure', href: '/failures/veo-text-rendering-failure' },
        { name: 'Hand Artifact', href: '/failures/veo-hand-artifact' },
        { name: 'Audio Generation Failure', href: '/failures/veo-audio-generation-failure' },
        { name: 'Physics Simulation Constraint Violation', href: '/failures/veo-physics-collapse' },
        { name: 'Audio-Visual Lip Sync Failure', href: '/failures/veo-lip-sync-failure' },
        { name: 'Camera Motion Ignored Failure', href: '/failures/veo-camera-motion-ignored-failure' },
        { name: 'Camera Jitter Failure', href: '/failures/veo-camera-jitter' },
        { name: 'Color Drift', href: '/failures/veo-color-drift' },
      ],
      refundCategoriesCount: 8,
    },
    examples: [
      { prompt: '"Person delivering a 4-second monologue, native audio, single camera"', toolA: 'Strong on visual; required separate audio track and post-sync.', toolB: 'Native audio synced. Lip sync drifts ~200ms past 3s but acceptable for short content.', verdict: 'Veo, by default — native audio is a workflow simplification.' },
      { prompt: '"Stylized animation, 6-second clip, dreamlike sequence"', toolA: 'Sora\'s aesthetic strength was exactly this. Industry-leading output.', toolB: 'Less stylized; outputs more photoreal even when prompted for stylized.', verdict: 'Sora was the right answer; Pika 2.0 is the closest current substitute.' },
      { prompt: '"Brand-aligned product shot with on-screen text (logo)"', toolA: 'Text garbled past ~6 chars.', toolB: 'Text garbled past ~6 chars but slightly more legible.', verdict: 'Tie — composite text in post for either. Refund both as Text Rendering Failure.' },
      { prompt: '"8-second cinematic shot with continuous motion"', toolA: 'Best in class on coherence at length.', toolB: 'Coherence degrades meaningfully past 4-5s.', verdict: 'Sora was the right answer; no current consumer model fully replaces this at length.' },
    ],
    refundFlowSummary: "For Sora 2 unspent credits, file refund tickets via OpenAI billing support before 2026-05-23 using technical failure-mode names. For Veo 3 documented failures, submit via Google AI Studio billing with Generation ID + technical category. Both providers honor documented failure-mode refunds at ~75-85% approval rates.",
    finalVerdict: "Sora 2 is dead. If you were a Sora user, your migration depends on shot type: stylized motion → Pika 2.0 (closest substitute, never quite the same). Native audio + dialogue → Veo 3 (the only consumer model with usable joint audio+video). Character consistency → Runway Gen-4. Long-form coherence → no current consumer model. The lesson for AI workflow: depend on capability categories, not specific models. Build adapter abstractions so the next shutdown is a config change, not a rebuild.",
  },
  {
    slug: 'kling-vs-runway',
    toolA: 'Kling',
    toolB: 'Runway',
    toolALongName: 'Kling 1.6',
    toolBLongName: 'Runway Gen-4',
    metaTitle: 'Kling 1.6 vs Runway Gen-4 — Motion vs Character (2026)',
    metaDesc: 'Honest comparison of Kling 1.6 and Runway Gen-4 by failure profile. Kling wins on motion + physics; Runway wins on character consistency. Pick by shot type.',
    intro: 'Kling 1.6 and Runway Gen-4 are the two strongest consumer-tier video generators in different categories — Kling on motion realism and physics, Runway on character consistency and multi-cut work. This comparison maps the dimensions side by side so you can pick by shot type rather than brand.',
    quickVerdict: {
      useToolA: 'motion is the hero of the shot, or physics realism matters (fluid, gravity, collision)',
      useToolB: 'character consistency across cuts matters, or you need multi-shot scenes',
      honestNote: "Kling and Runway aren't substitutes — they're specialists. Most production workflows benefit from both subscriptions with routing logic.",
    },
    comparisonTable: [
      { dimension: 'Motion realism', toolA: 'Industry-leading physics + camera priors', toolB: 'Adequate; physics violations on fluid', winner: 'A' },
      { dimension: 'Character consistency (single shot)', toolA: 'Drifts > 4s on portraits', toolB: 'Strong; multi-cut via Scenes mode', winner: 'B' },
      { dimension: 'Character consistency (multi-cut)', toolA: 'No equivalent of Scenes mode', toolB: 'Best in class (Scenes mode)', winner: 'B' },
      { dimension: 'Face coherence', toolA: 'Drops faster than competitors past 4s', toolB: 'Strong; drifts > 5s on close-ups', winner: 'B' },
      { dimension: 'Hand anatomy', toolA: 'Hand-Anatomy Topology fails on close-ups', toolB: 'Same failure mode, equivalent rate', winner: 'TIE' },
      { dimension: 'Architecture', toolA: 'Hybrid diffusion + autoregressive', toolB: 'Diffusion', winner: 'NA' },
      { dimension: 'Physics realism', toolA: 'Best fluid + collision priors', toolB: 'Fluid inversion on long clips', winner: 'A' },
      { dimension: 'Generation speed (per 5s clip)', toolA: '~50-80s', toolB: '~60-90s', winner: 'A' },
      { dimension: 'Per-clip cost (Pro tier)', toolA: 'Variable per region; ~$0.04-0.06/sec', toolB: '$0.05/sec output', winner: 'TIE' },
      { dimension: 'Refund flow recognition', toolA: '5-6 failure categories', toolB: '7 failure categories', winner: 'B' },
    ],
    whenToPickA: {
      description: "Use Kling 1.6 when motion is the hero of the shot — action sequences, fluid simulation, complex multi-object collision, anything where the camera or subjects are moving fast and physical realism matters. Kling's hybrid diffusion + autoregressive architecture gives it the strongest physics priors of any consumer-tier model — better gravity, fluid dynamics, and collision prediction than Veo, Runway, or Pika. The tradeoff is weaker character coherence: face structure drifts past 4 seconds on portraits, and Kling has no equivalent of Runway's Scenes mode for multi-cut consistency.",
      failureModes: [
        { name: 'Identity Coherence Failure', href: '/failures/kling-face-distortion' },
        { name: 'Hand-Anatomy Topology Failure', href: '/failures/kling-hand-artifact' },
        { name: 'Anatomy Artifact', href: '/failures/kling-anatomy-artifact' },
        { name: 'Camera Jitter Failure', href: '/failures/kling-camera-jitter' },
        { name: 'Motion Blur Overload', href: '/failures/kling-motion-blur-overload' },
        { name: 'Watermark Bleed', href: '/failures/kling-watermark-bleed' },
      ],
      refundCategoriesCount: 6,
    },
    whenToPickB: {
      description: "Use Runway Gen-4 when character consistency across cuts matters — multi-shot scenes with the same person, dialogue sequences, character-driven storytelling. Runway Gen-4 Scenes mode is purpose-built for this and is the strongest multi-cut identity-coherence feature in the consumer tier. Runway's other strengths are mature refund flow recognition (7 named failure categories) and Gen-4's improved physics over Gen-3 (closing some of Kling's lead). The tradeoff is weaker motion realism on action-heavy shots and weaker fluid prior than Kling.",
      failureModes: [
        { name: 'Hand-Anatomy Topology Failure', href: '/failures/runway-hand-artifact' },
        { name: 'Camera Path Coherence Failure', href: '/failures/runway-camera-jitter' },
        { name: 'Limb Artifact', href: '/failures/runway-limb-artifact' },
        { name: 'Physics Simulation Constraint Violation', href: '/failures/runway-physics-collapse' },
        { name: 'Watermark Bleed', href: '/failures/runway-watermark-bleed' },
        { name: 'Temporal Flicker', href: '/failures/runway-temporal-flicker' },
        { name: 'Style Preset Failure', href: '/failures/runway-style-preset-failure' },
      ],
      refundCategoriesCount: 7,
    },
    examples: [
      { prompt: '"Action sequence: car chase with explosion, dramatic camera work"', toolA: 'Physics holds; explosion + collision priors are strongest in consumer tier.', toolB: 'Adequate; some physics violations on the explosion fluid.', verdict: 'Kling, decisively, for action-heavy work.' },
      { prompt: '"Three-shot dialogue scene with the same character"', toolA: 'No multi-cut consistency feature; character drifts between shots.', toolB: 'Scenes mode holds identity across all three cuts.', verdict: 'Runway, decisively.' },
      { prompt: '"Portrait close-up, 6 seconds, subject smiling at camera"', toolA: 'Face coherence degrades visibly past 4s.', toolB: 'Holds for ~5s before mild drift.', verdict: 'Runway, by a small margin. Refund-eligible on both if drift is visible.' },
      { prompt: '"Hands of a chef chopping vegetables, close-up"', toolA: 'Hand-anatomy fails ~60% (finger count drift).', toolB: 'Same failure mode, equivalent rate.', verdict: 'Equivalent failure. Refund and reroll on either. Consider framing hands further from camera.' },
    ],
    refundFlowSummary: "Both Kling and Runway honor refund requests with technical failure-mode names + Generation ID + timestamped screenshot. Runway's refund flow recognises 7 named categories (Anatomy, Physics, Text, Coherence, Color, Camera, Style); Kling recognises 5-6. Approval rates are similar (~75-85%) when the technical name is used correctly.",
    finalVerdict: "Don't pick one over the other — pick by shot type. Motion-heavy / action / physics-led → Kling 1.6. Character / multi-cut / dialogue → Runway Gen-4. Most production budgets cover both subscriptions, and AVA Pro automates routing per prompt based on historical hit-rate. The \"best tool\" mental model assumes interchangeability that doesn't exist in this category.",
  },
];

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
