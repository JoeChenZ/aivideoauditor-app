export type FailureData = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  technicalTerm: string;
  risk: 'CRITICAL' | 'MAJOR';
  shortDesc: string;
  longDesc: string;
  symptoms: string[];
  examples: { prompt: string; failure: string; timestamp?: string }[];
  refundStrength: string;
  faq: { q: string; a: string }[];
};

export const FAILURES: FailureData[] = [
  {
    slug: 'runway-limb-artifact',
    title: 'Runway ML Limb & Anatomy Artifact — Get a Credit Refund',
    metaTitle: 'Runway ML Limb Artifact Refund — Extra Limbs, Anatomy Failures',
    metaDesc:
      'Runway Gen-4 generated a video with extra arms, fused fingers, or impossible limb geometry? This is an Anatomical Topology Failure. Here\'s how to document it and get your credits refunded.',
    technicalTerm: 'Anatomical Topology & Coherence Failure',
    risk: 'CRITICAL',
    shortDesc: 'Extra arms, fused fingers, interpenetrating geometry, impossible joint configurations.',
    longDesc:
      'Anatomical Topology & Coherence Failure occurs when Runway\'s diffusion model produces skeletal structures with non-manifold mesh topology — physically impossible configurations that cannot exist in the real world. This includes supernumerary limbs (extra arms or legs), interpenetrating geometry (limbs passing through each other), discontinuous joint articulation, and finger-count hallucination. It most commonly occurs with human subjects in motion, especially during dance, sports, or close-up hand shots.',
    symptoms: [
      'Extra arm or leg appearing mid-clip',
      'Fingers fusing together or splitting into more than 5',
      'Elbow or knee bending in the wrong direction',
      'Limb geometry collapsing or stretching unnaturally',
      'Arm passing through torso',
    ],
    examples: [
      {
        prompt: '"Ballet dancer performing a grand jeté across a sunlit stage"',
        failure: 'Third arm appeared at 1.2s, leg geometry collapsed at 4.1s',
        timestamp: '1.2s',
      },
      {
        prompt: '"Close-up of hands playing piano, dramatic lighting"',
        failure: '6 fingers on right hand, knuckle geometry collapsed at 0:03',
        timestamp: '0:03',
      },
    ],
    refundStrength: 'VERY HIGH — Runway support treats limb artifacts as a recognised critical failure mode with strong refund precedent.',
    faq: [
      {
        q: 'Does Runway refund credits for limb artifact failures?',
        a: 'Yes. Runway support classifies limb artifacts as a recognised critical failure mode. Requests with a Generation ID, technical failure description (use "Anatomical Topology & Coherence Failure"), and a timestamped failure point are routinely approved.',
      },
      {
        q: 'Why does Runway generate extra limbs?',
        a: 'The diffusion model\'s denoising process can produce non-manifold geometry when multiple articulated bodies are in motion, especially in complex lighting. This is a known limitation of video diffusion models at current resolutions.',
      },
      {
        q: 'Which Runway prompts are highest risk for limb artifacts?',
        a: 'Dance sequences, sports, hand close-ups, multiple subjects, and any prompt with rapid movement. AVA\'s L1 scanner flags these automatically before you spend credits.',
      },
    ],
  },
  {
    slug: 'runway-physics-collapse',
    title: 'Runway ML Physics Collapse — Fluid, Gravity & Simulation Failures',
    metaTitle: 'Runway ML Physics Collapse Refund — Fluid Inversion, Gravity Violations',
    metaDesc:
      'Runway generated water flowing upward, objects falling the wrong way, or steam not dispersing? That\'s a Physics Simulation Constraint Violation. Document it correctly and get your credits back.',
    technicalTerm: 'Physics Simulation Constraint Violation',
    risk: 'MAJOR',
    shortDesc: 'Fluid inversion (water flowing upward), object collision failures, gravity violations.',
    longDesc:
      'Physics Simulation Constraint Violation occurs when Runway\'s model violates fundamental Newtonian mechanics in the generated video. Unlike CGI physics engines, video diffusion models have no explicit physics simulator — they learn physical behaviour statistically from training data. When the prompt includes complex fluid dynamics, gravity interactions, or multi-body physics over longer durations, the model often produces outputs that defy the laws of physics. The failure is most severe after the 5-second mark, where temporal coherence degrades significantly.',
    symptoms: [
      'Water, lava, or smoke flowing upward against gravity',
      'Objects falling or moving in the wrong direction',
      'Fluid not splashing or dispersing upon impact',
      'Steam rising downward or remaining static',
      'Collision between objects producing no physical response',
    ],
    examples: [
      {
        prompt: '"Molten lava flowing down a volcanic mountain into the ocean"',
        failure: 'Lava flow vectors inverted — fluid moves upward against gravity',
        timestamp: '0.9s',
      },
      {
        prompt: '"Water fountain exploding upward, slow motion, 120fps"',
        failure: 'Fluid inversion at 0:04 — water falls upward instead of arcing',
        timestamp: '0:04',
      },
    ],
    refundStrength: 'HIGH — Physics violations are objectively verifiable and clearly attributable to model failure, not user error.',
    faq: [
      {
        q: 'Will Runway refund credits for physics simulation failures?',
        a: 'Yes, particularly when the failure is objectively verifiable (e.g., fluid moving upward against gravity). Include your Generation ID, timestamp of the failure, and describe it as "Physics Simulation Constraint Violation" to trigger the correct support workflow.',
      },
      {
        q: 'Why does Runway fail at complex physics?',
        a: 'Video diffusion models learn physics statistically rather than using a simulation engine. Complex fluid dynamics, especially over longer clips (5s+), exceed what the model can consistently reproduce from training data alone.',
      },
      {
        q: 'How can I avoid physics failures in Runway?',
        a: 'Keep clips under 5 seconds for physics-heavy content. Split complex scenes into separate generations. Avoid combining fluid dynamics with camera movement. AVA\'s L1 scanner warns you before you generate.',
      },
    ],
  },
  {
    slug: 'runway-face-distortion',
    title: 'Runway ML Face Distortion — Facial Landmark Regression Failures',
    metaTitle: 'Runway ML Face Distortion Refund — Asymmetric Eyes, Facial Drift',
    metaDesc:
      'Runway produced a video with distorted faces, asymmetric eyes, or facial morphing over time? That\'s a Facial Landmark Regression Failure. Use this guide to request your credit refund.',
    technicalTerm: 'Facial Landmark Regression Failure',
    risk: 'CRITICAL',
    shortDesc: 'Asymmetric eye placement, morphological drift across frames, non-Euclidean proportions.',
    longDesc:
      'Facial Landmark Regression Failure occurs when Runway\'s face generation pipeline produces topologically invalid facial geometry or fails to maintain consistent facial identity across frames. The failure manifests as asymmetric landmark placement, morphological drift (the face gradually changes shape over the clip), or non-Euclidean proportions where nose width, eye spacing, or mouth position falls outside anatomical norms. Face distortion is especially severe in close-up shots and when the subject moves or turns their head.',
    symptoms: [
      'Eyes misaligned — one significantly higher than the other',
      'Face gradually morphing or melting across the clip duration',
      'Nose or mouth in anatomically impossible positions',
      'Facial proportions changing between frames',
      'Uncanny valley distortion in close-up shots',
    ],
    examples: [
      {
        prompt: '"A news anchor sitting at a desk, looking directly into camera"',
        failure: 'Left-eye displacement ~15% of face width, morphological drift at 0.3s intervals',
        timestamp: '0.4s',
      },
    ],
    refundStrength: 'VERY HIGH — Face distortion is visually unmistakable and clearly makes the output commercially unusable.',
    faq: [
      {
        q: 'Does Runway refund for face distortion?',
        a: 'Yes. Face distortion is classified as a critical failure mode by Runway support. Reference "Facial Landmark Regression Failure" and include the timestamp where distortion first appears along with your Generation ID.',
      },
      {
        q: 'Why does Runway distort faces?',
        a: 'The identity-preserving latent space traversal breaks down when the subject moves or the camera angle changes. The model must interpolate facial geometry frame-by-frame, and drift accumulates over time.',
      },
      {
        q: 'Are Runway face failures worse in certain conditions?',
        a: 'Yes. Close-up shots, head movement, multiple subjects, and longer clips all increase face distortion risk. If you need a clean talking head, keep it under 4 seconds with minimal movement.',
      },
    ],
  },
  {
    slug: 'runway-text-rendering-failure',
    title: 'Runway ML Text Rendering Failure — Unreadable Glyphs & Typography',
    metaTitle: 'Runway ML Text Rendering Failure Refund — Unreadable Text, Glyph Artifacts',
    metaDesc:
      'Runway generated a video where text is unreadable, letters are garbled, or glyphs are hallucinated? That\'s a Glyph Synthesis & Typography Coherence Failure. Here\'s how to get your credits back.',
    technicalTerm: 'Glyph Synthesis & Typography Coherence Failure',
    risk: 'MAJOR',
    shortDesc: 'Unreadable characters, glyph hallucination, encoding artifacts on text elements.',
    longDesc:
      'Glyph Synthesis & Typography Coherence Failure is one of the most consistent and predictable failure modes in current video diffusion models, including Runway Gen-4. Unlike image models that have improved text rendering significantly, video models struggle to maintain coherent glyph synthesis across temporal frames. The model has no explicit typographic rendering engine — it synthesizes text pixel-by-pixel through the denoising process, producing unstable, unreadable, or hallucinated characters that morph frame-by-frame.',
    symptoms: [
      'Letters replaced with unrecognisable symbols or encoded characters',
      'Words that flicker between different garbled versions',
      'Individual characters melting, stretching, or morphing',
      'Partial text appearing coherent then breaking down',
      'Background texture leaking into text elements',
    ],
    examples: [
      {
        prompt: '"BREAKING NEWS chyron at bottom of frame, news anchor at desk"',
        failure: 'Character-level hallucination — unrecognisable symbols replacing Latin characters',
        timestamp: '1.8s',
      },
      {
        prompt: '"Street corner at night, neon sign reading OPEN"',
        failure: '"OPΞИ" rendered — glyph corruption with neon bleed artifact',
        timestamp: '0.5s',
      },
    ],
    refundStrength: 'HIGH — Text rendering failures are objectively verifiable and Runway support acknowledges this as a known limitation.',
    faq: [
      {
        q: 'Can I get a Runway refund for text that came out garbled?',
        a: 'Yes. Reference "Glyph Synthesis & Typography Coherence Failure" in your refund request. Runway\'s support team acknowledges text rendering as a known limitation of the video diffusion pipeline, which strengthens refund claims.',
      },
      {
        q: 'Why can\'t Runway render text correctly?',
        a: 'Video diffusion models synthesize text pixel-by-pixel through the denoising process rather than using a typographic renderer. Consistent glyph synthesis across temporal frames is an unsolved problem at current model scales.',
      },
      {
        q: 'Is there a workaround for text in Runway videos?',
        a: 'Yes — generate the video without text, then add text in post-production using a compositing tool like After Effects, DaVinci Resolve, or CapCut. AVA\'s L1 scanner flags text-in-frame prompts before generation.',
      },
    ],
  },
  {
    slug: 'runway-temporal-flicker',
    title: 'Runway ML Temporal Flicker — Frame Discontinuity & Aliasing',
    metaTitle: 'Runway ML Temporal Flicker Refund — Stroboscopic Flicker, Frame Artifacts',
    metaDesc:
      'Runway video has stroboscopic flickering, frame flashes, or inter-frame luminance discontinuities? That\'s High-Frequency Temporal Aliasing. Document and request your credit refund here.',
    technicalTerm: 'High-Frequency Temporal Aliasing & Frame Discontinuity',
    risk: 'MAJOR',
    shortDesc: 'Stroboscopic flickering, inter-frame luminance discontinuities, motion blur artifacts.',
    longDesc:
      'High-Frequency Temporal Aliasing & Frame Discontinuity occurs when adjacent frames in the generated video have significant luminance, colour, or geometry differences that exceed perceptual thresholds. The result is stroboscopic flickering visible to the naked eye that makes the video unusable for any professional context. This failure mode is particularly prevalent when the prompt requests high frame rates (e.g., 120fps slow motion — Runway cannot generate true high frame rates), complex lighting changes, or rapid motion.',
    symptoms: [
      'Visible stroboscopic flicker throughout the clip',
      'Random bright or dark flashes in specific areas',
      'Colour shifting between frames (e.g., warm/cool flicker)',
      'Motion blur appearing and disappearing inconsistently',
      'Sharp texture boundaries flickering at high frequency',
    ],
    examples: [
      {
        prompt: '"Water fountain exploding upward, slow motion, 120fps"',
        failure: 'Temporal aliasing inconsistent with specified slow-motion parameters — stroboscopic flash',
        timestamp: '2.8s',
      },
    ],
    refundStrength: 'MEDIUM-HIGH — Temporal flicker is clearly perceptible and makes professional use impossible, but may require strong documentation.',
    faq: [
      {
        q: 'Will Runway refund for flickering or flashing video?',
        a: 'Yes, when the flicker is severe enough to make the video commercially unusable. Use the technical term "High-Frequency Temporal Aliasing & Frame Discontinuity" and specify the timestamps where flicker occurs and its subjective severity.',
      },
      {
        q: 'Why does Runway video flicker?',
        a: 'The diffusion denoising process treats each frame semi-independently. Without strong temporal consistency conditioning, adjacent frames can differ significantly in luminance and geometry — perceived as flickering.',
      },
      {
        q: 'Can flickering be fixed in post?',
        a: 'Mild flicker can be reduced with deflicker filters in DaVinci Resolve or After Effects. Severe flickering (full-frame luminance swings) is generally not fixable without frame replacement. AVA\'s L1 scanner flags high-flicker-risk prompts like "120fps" before generation.',
      },
    ],
  },
  {
    slug: 'runway-hallucinated-text',
    title: 'Runway ML Hallucinated Text — Get a Credit Refund',
    metaTitle: 'Runway ML Garbled Text Refund — Sign / Label / Subtitle Failures',
    metaDesc:
      'Runway Gen-4 produced a video where the sign, label, or text reads as garbled non-letters? This is a Glyph Synthesis Failure. Here\'s how to document and get refunded.',
    technicalTerm: 'Glyph Synthesis & Semantic Adherence Failure',
    risk: 'MAJOR',
    shortDesc: 'Text in the prompt renders as non-letters, wrong characters, or unreadable glyph soup.',
    longDesc:
      'Glyph Synthesis & Semantic Adherence Failure occurs when the diffusion model attempts to render in-scene text (signs, labels, screens, t-shirts, subtitles) but produces shapes that resemble letters without forming actual readable characters. Common manifestations: text that looks like Cyrillic-but-isn\'t, mirrored or flipped glyphs, letterforms that change frame-to-frame within the same word, and substitution of the prompted text with unrelated characters. Text generation is among the highest-fail categories in video diffusion models because each frame must independently produce coherent typography while maintaining temporal consistency.',
    symptoms: [
      'Storefront sign reads as garbled non-Latin characters',
      'Same word morphs into different letters frame-to-frame',
      'T-shirt or product label text is unreadable',
      'Subtitles show wrong words or scrambled glyphs',
      'Letters mirror, flip, or stretch unnaturally',
    ],
    examples: [
      {
        prompt: '"A storefront with a neon sign that reads OPEN 24 HOURS"',
        failure: 'Sign reads "QPFN 2H HOIIRS" with shifting glyphs frame-to-frame',
        timestamp: '0:00 - 0:05',
      },
      {
        prompt: '"Person wearing a t-shirt that says HELLO WORLD"',
        failure: 'T-shirt text renders as "HFLLU WURIY" with mirrored second L',
        timestamp: '0:02',
      },
    ],
    refundStrength: 'HIGH — Hallucinated text is an explicit prompt-adherence failure and is one of the easier categories to get refunded if the prompt specified the exact text.',
    faq: [
      {
        q: 'Will Runway refund for garbled text in a generation?',
        a: 'Yes, especially when your prompt specified the exact text that was supposed to render. Use the technical term "Glyph Synthesis & Semantic Adherence Failure" and quote both the prompt-specified text and what was actually rendered, with timestamps.',
      },
      {
        q: 'Why does Runway hallucinate letters?',
        a: 'Video diffusion models are trained primarily on natural imagery — text in their training set is sparse and inconsistent. Each frame is denoised semi-independently, so even when the model produces letter-like shapes, they rarely form coherent words and rarely stay stable across frames.',
      },
      {
        q: 'How do I get Runway to render text correctly?',
        a: 'Short text (1-3 letters) and large display formats have a slightly higher success rate. Long text is currently unreliable on Gen-4. AVA\'s L1 scanner flags any prompt containing quoted text as high-text-failure-risk so you can adjust before spending credits.',
      },
    ],
  },
  {
    slug: 'runway-camera-jitter',
    title: 'Runway ML Camera Jitter & Stability Failure — Get a Credit Refund',
    metaTitle: 'Runway ML Camera Jitter Refund — Unstable Camera, Shake, Pan Stutter',
    metaDesc:
      'Runway Gen-4 generated camera movement that contradicts your prompt — static prompt with shaky camera, smooth pan with stutter? This is a Camera Path Coherence Failure.',
    technicalTerm: 'Camera Path Coherence Failure',
    risk: 'MAJOR',
    shortDesc: 'Camera movement contradicts the prompt: jitter on a static shot, stutter on a smooth pan, or random reframing mid-clip.',
    longDesc:
      'Camera Path Coherence Failure occurs when the model produces camera motion that materially contradicts the prompted shot description. Examples: a "static locked-off" shot exhibits hand-held-style jitter; a "smooth dolly forward" instead stutters or pauses mid-motion; a "slow pan left" reverses direction or accelerates non-linearly. This is technically a violation of the prompt\'s shot-design specification, not a content failure, and is often missed by creators on first review because the subject content might look fine in isolation. It almost always renders the clip unusable in a cut.',
    symptoms: [
      'Static prompt produces hand-held-style shake',
      'Smooth pan or dolly stutters or pauses unexpectedly',
      'Camera reverses direction mid-clip without prompt instruction',
      'Frame composition drifts when no movement was requested',
      'Pan or zoom acceleration is non-linear when uniform motion was prompted',
    ],
    examples: [
      {
        prompt: '"Static locked-off shot of a dog sitting on a couch"',
        failure: 'Camera exhibits 3px frame-to-frame jitter throughout, ruining the static framing',
        timestamp: '0:00 - 0:05',
      },
      {
        prompt: '"Smooth dolly forward into a forest clearing"',
        failure: 'Camera pauses at 0:02.4, jumps forward, then continues — visible cut not in prompt',
        timestamp: '0:02',
      },
    ],
    refundStrength: 'MEDIUM-HIGH — Camera failures are a clear prompt-adherence violation and are usually granted when documented with the shot-type prompt language quoted.',
    faq: [
      {
        q: 'Will Runway refund for camera shake or stutter?',
        a: 'Yes, when the prompted shot description specified the camera behavior (e.g., "static", "smooth", "locked-off") and the generation contradicts it. Quote your camera-direction prompt language alongside the technical failure term "Camera Path Coherence Failure".',
      },
      {
        q: 'Why does Runway produce wrong camera motion?',
        a: 'Camera motion in video diffusion is conditioned by both the prompt and the model\'s learned distribution of training-video camerawork. When the prompt is ambiguous or the requested shot type is rare in training data, the model defaults to its mean — typically slight handheld jitter — which contradicts more controlled requests.',
      },
      {
        q: 'How can I get Runway to produce a stable static shot?',
        a: 'Use explicit cinematography language: "tripod-mounted", "locked-off camera", "no camera movement", "static frame". Adding shutter-speed details ("fast shutter") sometimes helps. AVA\'s prompt-risk scan flags ambiguous camera language before you generate.',
      },
    ],
  },
  {
    slug: 'runway-color-drift',
    title: 'Runway ML Color Drift & Grading Inconsistency — Get a Credit Refund',
    metaTitle: 'Runway ML Color Drift Refund — Color Cast Shift, Grade Inconsistency',
    metaDesc:
      'Runway Gen-4 produced video where the color grade or temperature shifts mid-clip? This is a Tonal Coherence Failure. Here\'s how to document for refund.',
    technicalTerm: 'Tonal Coherence & Color Grading Failure',
    risk: 'MAJOR',
    shortDesc: 'White balance, exposure, or color grade shifts visibly mid-clip without any prompted lighting change.',
    longDesc:
      'Tonal Coherence & Color Grading Failure manifests as the overall color cast, white balance, or exposure level shifting across frames of a single clip without any prompted reason. Common cases: a "warm sunset" clip cooling to neutral midway through; a "cool blue night" clip warming up at the end; exposure drifting darker without prompted shadow growth. This kind of failure is especially destructive because it makes the clip impossible to color-match against other footage in an edit — even one shot of drift can break a montage. The defect is subtle to spot in isolation but obvious next to a reference frame.',
    symptoms: [
      'Warm tones shift to cool (or vice versa) across the clip',
      'White balance drifts visibly between first and last frame',
      'Exposure brightens or darkens without prompted lighting change',
      'Saturation level inconsistent between adjacent frames',
      'Color grade that was strong at clip-start fades or inverts',
    ],
    examples: [
      {
        prompt: '"Warm sunset over a calm lake, cinematic"',
        failure: 'Clip starts in warm orange-red grade, drifts to neutral by 0:03, ends in cool blue by 0:05',
        timestamp: '0:00 → 0:05',
      },
      {
        prompt: '"Cool moonlit interior, blue tones"',
        failure: 'Cool blue cast at start; warm yellow ambient creeps in by 0:04 without prompted light source',
        timestamp: '0:04',
      },
    ],
    refundStrength: 'MEDIUM — Color drift is harder to argue than structural failures, but a refund is achievable when you cite specific timestamp deltas and reference the prompt\'s lighting/color language.',
    faq: [
      {
        q: 'Will Runway refund for color drift or grading inconsistency?',
        a: 'Yes, when the drift makes the clip unusable in editorial context. Document the start-frame versus end-frame color difference (use specific terms like "warm-to-cool drift" or "white balance shift"), quote your prompt\'s color/lighting language, and request the refund under "Tonal Coherence Failure".',
      },
      {
        q: 'Why does Runway color drift across a clip?',
        a: 'Each frame is denoised semi-independently with finite temporal-consistency conditioning. Color and exposure values can drift slowly across frames because the model has no globally enforced grading constraint — only locally enforced consistency between adjacent frames.',
      },
      {
        q: 'Can color drift be fixed in post-production?',
        a: 'Mild drift can be corrected by setting a CDL or LUT keyframe over the clip in DaVinci Resolve, but this requires manual frame-by-frame work and rarely matches what the prompt asked for. AVA\'s post-gen scan compares first vs. last frame color statistics so you catch drift before you start editing.',
      },
    ],
  },

  // ── Luma Dream Machine ─────────────────────────────────────────────────
  {
    slug: 'luma-physics-collapse',
    title: 'Luma Dream Machine Physics Collapse — Get a Credit Refund',
    metaTitle: 'Luma AI Physics Refund — Fluid Inversion, Gravity Bug',
    metaDesc:
      'Luma Dream Machine generated water flowing upward, smoke imploding, or gravity violations? This is a Physics Simulation Constraint Violation — Luma\'s most common failure category.',
    technicalTerm: 'Physics Simulation Constraint Violation',
    risk: 'MAJOR',
    shortDesc: 'Particularly common on Luma: water flowing upward, smoke imploding, cloth interpenetration, particle drift.',
    longDesc:
      'Luma\'s fluid and particle physics is its single most visible weakness. Generations that involve water, smoke, fog, dust, hair, or any soft-body simulation frequently produce non-physical behavior — fluid inversion, smoke moving against airflow, particles that interpenetrate solid surfaces. The model has clearly seen these phenomena in training but lacks a real physics constraint at inference time, so the output drifts toward "plausible-looking-pixels" rather than "physically-coherent-motion." For a refund request, this category has high precedent — Luma support recognises Physics Simulation Constraint Violation as a documented failure mode.',
    symptoms: [
      'Water flowing upward or sideways without gravity cause',
      'Smoke or fog moving against indicated air direction',
      'Falling objects that pause mid-air before resuming',
      'Cloth interpenetrating bodies or solid props',
      'Particles drifting in opposite directions within the same frame',
    ],
    examples: [
      {
        prompt: '"Slow-motion water fountain exploding upward, cinematic"',
        failure: 'Water at 0:03 reverses direction, falls UPWARD against gravity, then resumes downward at 0:04',
        timestamp: '0:03',
      },
      {
        prompt: '"Smoke rising from a campfire on a still night"',
        failure: 'Smoke drifts left at 0:01, right at 0:03 without wind cue; net motion incoherent',
        timestamp: '0:01 → 0:03',
      },
    ],
    refundStrength: 'HIGH — Luma support recognises physics failures as a documented refund category; well-timestamped reports approve in 1-3 business days.',
    faq: [
      {
        q: 'Will Luma refund credits for physics failures?',
        a: 'Yes. Cite "Physics Simulation Constraint Violation", include the Asset ID, attach a PDF audit report or video clip showing the timestamp where physics violates. Luma support has refund precedent for this category.',
      },
      {
        q: 'Why does Luma struggle with physics?',
        a: 'Video diffusion models learn appearance correlations from training data — they don\'t maintain a runtime physics constraint solver. Without explicit physical priors, fluid, smoke, and particle motion drift toward visually-plausible but physically-incoherent trajectories.',
      },
      {
        q: 'Which prompts trigger physics failures most often?',
        a: 'Slow-motion water, smoke trails, soft-body materials (cloth, hair), falling objects, complex camera motion through fluids. AVA flags these prompt patterns as high-physics-risk before you spend credits.',
      },
    ],
  },
  {
    slug: 'luma-face-distortion',
    title: 'Luma Dream Machine Face Distortion — Get a Credit Refund',
    metaTitle: 'Luma AI Face Distortion Refund — Asymmetric Eyes, Drift',
    metaDesc:
      'Luma Dream Machine produced a video with morphing facial features, asymmetric eye placement, or jaw drift between frames? This is a Facial Landmark Regression Failure.',
    technicalTerm: 'Facial Landmark Regression Failure',
    risk: 'CRITICAL',
    shortDesc: 'Asymmetric eye placement, jaw drift between frames, non-Euclidean facial proportions in Luma generations.',
    longDesc:
      'Luma renders faces well in static frames but struggles to maintain landmark stability across the temporal axis. Eyes drift apart or together, jawlines shift, ears morph in size. This is a Facial Landmark Regression Failure — the model\'s per-frame inference is internally coherent but globally drifts. For commercial use (any clip with a recognisable subject), this single failure mode makes a clip unusable. Luma support classifies this as a critical generation defect.',
    symptoms: [
      'Eye spacing changes visibly across the clip',
      'Jawline reshapes mid-motion',
      'Ear size or position drifts',
      'Skin texture pixelates or smooths inconsistently',
      'Facial expression "lerps" through inconsistent intermediate forms',
    ],
    examples: [
      {
        prompt: '"Close-up portrait of a young woman smiling, warm light"',
        failure: 'Left eye drifts inward by 0:02, jawline narrows by 0:04, expression mismatch between halves',
        timestamp: '0:02',
      },
      {
        prompt: '"Man speaking into camera, documentary lighting"',
        failure: 'Mouth shape inconsistent with prompted speech; lip-sync drift through 0:01-0:03',
        timestamp: '0:01 - 0:03',
      },
    ],
    refundStrength: 'VERY HIGH — Luma support treats face distortion as a critical-tier failure; documentation with timestamps approves quickly.',
    faq: [
      {
        q: 'Will Luma refund credits for face distortion?',
        a: 'Yes. Use "Facial Landmark Regression Failure" terminology, cite the Asset ID, timestamp the worst drift moment, and attach the PDF audit report. This category has high precedent for refund approval.',
      },
      {
        q: 'Why does Luma distort faces?',
        a: 'Diffusion video models inherit facial-landmark inconsistency from their training distribution. The denoising step is largely per-frame; temporal regularisation tries to smooth across frames but with limited success on small high-detail features like eyes.',
      },
      {
        q: 'Which Luma prompts highest-risk for face distortion?',
        a: 'Close-up portraits, multi-character scenes, fast head motion, side profiles. AVA\'s pre-flight check flags these patterns.',
      },
    ],
  },

  // ── Google Veo ─────────────────────────────────────────────────────────
  {
    slug: 'veo-text-rendering-failure',
    title: 'Google Veo Hallucinated Text — Get a Credit Refund',
    metaTitle: 'Google Veo Text Refund — Signs, Labels, Subtitles Garbled',
    metaDesc:
      'Google Veo 3 produced a video where the sign, label, or screen text renders as garbled non-letters? This is a Glyph Synthesis Failure. Document and request a refund.',
    technicalTerm: 'Glyph Synthesis & Semantic Adherence Failure',
    risk: 'MAJOR',
    shortDesc: 'Text in the prompt renders as non-letters, mirrored glyphs, or unrelated characters in Veo generations.',
    longDesc:
      'Like all video diffusion models, Google Veo struggles with in-scene text rendering. Signs, labels, screen UI, and t-shirt graphics frequently produce shapes that resemble letters but don\'t form readable words. Veo 3 marginally improved on Gen-3 here but still fails on text >5 characters and on cursive / stylised typography. This is a Glyph Synthesis Failure, and because Veo is a Google product with the most rigorous refund process of the major platforms, well-documented requests approve at a higher rate than competitors.',
    symptoms: [
      'Storefront sign reads as garbled non-letters',
      'Same word changes characters frame-to-frame',
      'Subtitles show wrong words or mirrored glyphs',
      'T-shirt or product label text is unreadable',
      'Numbers render incorrectly even when explicitly prompted',
    ],
    examples: [
      {
        prompt: '"Coffee shop storefront with a neon sign reading OPEN 24 HOURS"',
        failure: 'Sign reads "OPΞИ 24 HOIIRS" with mirrored second-letter forms',
        timestamp: '0:00 - 0:08',
      },
      {
        prompt: '"Whiteboard with the words BRAINSTORM SESSION written on it"',
        failure: 'Whiteboard text is illegible glyphs; letter shapes morph between frames',
        timestamp: '0:02',
      },
    ],
    refundStrength: 'HIGH — Google\'s refund process is the most structured of major AI video platforms; well-documented text-failure cases approve consistently.',
    faq: [
      {
        q: 'Will Google Veo refund credits for garbled text?',
        a: 'Yes, when your prompt specified exact text and the output produced glyph noise. Cite "Glyph Synthesis Failure" plus the Generation ID, quote both the prompt text and what was actually rendered, and attach the PDF audit report.',
      },
      {
        q: 'Why does Veo hallucinate letters?',
        a: 'Video diffusion training emphasises natural imagery; text is sparse in the training set and rarely temporally stable, so the model produces letter-shaped artefacts rather than coherent typography.',
      },
      {
        q: 'How do I render text correctly on Veo?',
        a: 'Use short text (1-3 letters), avoid cursive, use large display fonts. Veo handles text marginally better than Runway Gen-4 but still fails > 5 characters most of the time. AVA flags any prompt with quoted text as high-text-risk before generation.',
      },
    ],
  },
  {
    slug: 'veo-hand-artifact',
    title: 'Google Veo Hand & Anatomy Artifact — Get a Credit Refund',
    metaTitle: 'Google Veo Hand Refund — Six Fingers, Limb Distortion',
    metaDesc:
      'Google Veo 3 generated a video with six fingers, fused digits, or impossible hand geometry? This is an Anatomical Topology Failure — refund precedent on the Google support side.',
    technicalTerm: 'Anatomical Topology & Coherence Failure',
    risk: 'CRITICAL',
    shortDesc: 'Extra fingers, fused digits, impossible hand geometry in Veo close-up shots.',
    longDesc:
      'Google Veo represents a generational improvement on hand rendering vs. earlier models, but anatomical topology failures still occur on close-up shots and rapid hand motion. The failure manifests as: supernumerary fingers (6+), fingers fusing together, impossible knuckle articulation, or thumb-finger interpenetration. Veo\'s refund process is structured and well-documented; cases with frame-level evidence consistently approve.',
    symptoms: [
      '6+ fingers visible on a hand',
      'Fingers fused into a single mass',
      'Knuckle bending in physically impossible direction',
      'Thumb penetrating palm geometry',
      'Hand morphing between frames during motion',
    ],
    examples: [
      {
        prompt: '"Close-up of hands typing on a laptop keyboard, soft lighting"',
        failure: 'Right hand shows 6 fingers at 0:02; finger geometry morphs through 0:03-0:05',
        timestamp: '0:02',
      },
      {
        prompt: '"Person holding a coffee cup, gentle motion"',
        failure: 'Thumb interpenetrates cup at 0:01, fingers fuse at 0:04',
        timestamp: '0:01',
      },
    ],
    refundStrength: 'VERY HIGH — Google\'s refund process recognises anatomical topology failures as a critical-tier defect with strong refund precedent.',
    faq: [
      {
        q: 'Will Google Veo refund credits for hand artifacts?',
        a: 'Yes. Cite "Anatomical Topology Failure", attach a PDF audit report with annotated frames, include the Generation ID. Google\'s structured refund process treats this as a critical-tier defect.',
      },
      {
        q: 'Why does Veo still produce hand artifacts?',
        a: 'Hands have high articulation complexity. Despite Veo\'s training improvements, the per-frame denoising process produces non-manifold mesh topology in cases where the model has insufficient signal — close-ups, multi-finger contact, and motion blur all amplify the failure rate.',
      },
      {
        q: 'Which Veo prompts have highest hand-failure risk?',
        a: 'Close-up hand shots, hands-on-objects, multi-hand scenes, rapid finger motion. AVA\'s pre-flight check flags these patterns.',
      },
    ],
  },

  // ── Kling ──────────────────────────────────────────────────────────────
  {
    slug: 'kling-anatomy-artifact',
    title: 'Kling AI Anatomy & Motion Artifact — Get a Credit Refund',
    metaTitle: 'Kling AI Refund — Limb Distortion, Motion Failures',
    metaDesc:
      'Kling 1.6 or 2.0 produced limb morphing, extra joints, or motion that violates anatomical constraints? This is an Anatomical Topology Failure — request a refund.',
    technicalTerm: 'Anatomical Topology & Coherence Failure',
    risk: 'CRITICAL',
    shortDesc: 'Limbs morphing, extra joints, anatomy that violates constraints during Kling motion sequences.',
    longDesc:
      'Kling produces strong static frames but anatomy degrades quickly under motion. Common failures: arms that bend in two directions, legs that detach and reattach mid-stride, fingers that count up or down across frames, torso geometry collapsing during rotation. Kling\'s refund process is less structured than Google\'s but the platform does honour technical-failure refunds when documented properly.',
    symptoms: [
      'Limb count changes across frames',
      'Joint articulation reverses direction mid-motion',
      'Body geometry collapses during rotation',
      'Foot or hand detaches from limb',
      'Subject morphs through multiple body shapes',
    ],
    examples: [
      {
        prompt: '"Dancer performing a slow grand jeté, soft stage light"',
        failure: 'Third arm appears at 0:02, right leg geometry collapses during landing at 0:04',
        timestamp: '0:02',
      },
      {
        prompt: '"Runner mid-stride on a beach at sunrise"',
        failure: 'Left foot detaches from leg at 0:03; reattaches incorrectly at 0:04',
        timestamp: '0:03',
      },
    ],
    refundStrength: 'HIGH — Kling honours technical-failure refunds; well-documented requests with specific terminology approve within 2-5 business days.',
    faq: [
      {
        q: 'Will Kling AI refund credits for anatomy failures?',
        a: 'Yes. Use "Anatomical Topology Failure" terminology, cite the Generation ID, timestamp the failure, and submit through Kling\'s support flow. Attach the PDF audit report for fastest processing.',
      },
      {
        q: 'Why does Kling produce limb artifacts on motion?',
        a: 'Kling\'s temporal consistency budget is allocated more aggressively to surface texture than to articulated-body topology. Under fast motion, the per-frame denoising drifts toward locally-plausible but globally-incoherent skeletal configurations.',
      },
      {
        q: 'Which Kling prompts highest-risk for anatomy failures?',
        a: 'Dance, sports, sprinting, multi-figure scenes, close-up hands. AVA\'s pre-flight scanner flags these patterns.',
      },
    ],
  },

  // ── Seedance / ByteDance ───────────────────────────────────────────────
  // ── OpenAI Sora ────────────────────────────────────────────────────────
  {
    slug: 'sora-physics-collapse',
    title: 'OpenAI Sora Physics Collapse — Get a Credit Refund',
    metaTitle: 'OpenAI Sora Physics Refund — Fluid, Gravity, Object Interaction Failures',
    metaDesc:
      'OpenAI Sora 2 generated water flowing upward, objects passing through walls, or gravity violations? This is a Physics Simulation Constraint Violation. Document for a credit refund.',
    technicalTerm: 'Physics Simulation Constraint Violation',
    risk: 'MAJOR',
    shortDesc: 'Fluid inversion, gravity violations, object interpenetration, and impossible collision behavior in Sora generations.',
    longDesc:
      'OpenAI Sora produces the highest fidelity output of any commercial video model, but physics simulation remains a structural weakness. Sora has no runtime physics solver — it learns Newtonian behavior statistically from training data. Common failures: liquids that arc upward against gravity, falling objects that pause mid-air, characters walking through solid props, and collisions that produce no physical response. The failure rate climbs sharply on clips longer than 8 seconds, in scenes with multi-body interaction, and in slow-motion prompts. OpenAI\'s refund pathway routes through ChatGPT support; technically-documented requests with Generation IDs and timestamps approve at a meaningfully higher rate than complaint-style submissions.',
    symptoms: [
      'Water, smoke, or fluid moving against gravity vector',
      'Character or object passing through wall/floor geometry',
      'Falling object pauses mid-air without prompted reason',
      'Collision between props produces no physical reaction',
      'Slow-motion liquid loses momentum coherence',
    ],
    examples: [
      {
        prompt: '"A glass of milk shattering on a wooden floor, slow motion, cinematic"',
        failure: 'Milk droplets reverse direction at 0:02, rising upward; shards interpenetrate floor geometry at 0:03',
        timestamp: '0:02',
      },
      {
        prompt: '"Ocean waves crashing onto a rocky shoreline at golden hour"',
        failure: 'Wave crest pauses mid-collapse at 0:04, water flows backward into the wave at 0:05',
        timestamp: '0:04',
      },
    ],
    refundStrength: 'HIGH — OpenAI honours technical-failure refunds when documented with Generation ID, prompt, and frame-timestamped failure evidence. Physics violations are objectively verifiable.',
    faq: [
      {
        q: 'Will OpenAI Sora refund credits for physics failures?',
        a: 'Yes. Route the request through ChatGPT support, cite "Physics Simulation Constraint Violation", include the Generation ID, quote the prompt, and timestamp the moment physics breaks. Objectively-verifiable failures (e.g., fluid moving upward) approve fastest.',
      },
      {
        q: 'Why does Sora still produce physics failures?',
        a: 'Sora is a diffusion transformer trained on video — it learns physical behavior as a statistical correlation, not via a runtime physics solver. Complex multi-body interactions, fluid dynamics, and slow-motion prompts exceed the model\'s learned distribution.',
      },
      {
        q: 'Which Sora prompts have highest physics-failure risk?',
        a: 'Slow-motion fluid shots, multi-object collisions, prompts longer than 8 seconds, soft-body materials (cloth, hair, water), and complex camera movement through physical scenes. AVA\'s L1 scanner flags these patterns before generation.',
      },
    ],
  },
  {
    slug: 'sora-prompt-adherence-failure',
    title: 'OpenAI Sora Prompt Adherence Failure — Get a Credit Refund',
    metaTitle: 'OpenAI Sora Prompt Adherence Refund — Output Ignores Prompt Instructions',
    metaDesc:
      'OpenAI Sora 2 ignored your prompt — wrong subject, missing element, wrong setting, or wrong action? This is a Semantic Adherence Failure. Document for a credit refund.',
    technicalTerm: 'Semantic Adherence & Prompt Conditioning Failure',
    risk: 'MAJOR',
    shortDesc: 'Sora output ignores or contradicts explicit prompt instructions — wrong subject, missing key element, wrong setting, or wrong action.',
    longDesc:
      'Semantic Adherence & Prompt Conditioning Failure occurs when Sora\'s output diverges materially from the prompt specification. Examples: a prompt for "a black cat on a red sofa" returns a tabby on a beige couch; "person waving" returns the person standing still; "rainy night street" returns a sunny afternoon scene. This failure is distinct from physics or anatomy errors — the output may look beautiful and physically coherent while bearing no resemblance to what was requested. The cause is conditioning collapse: the model\'s prompt-encoder loses signal to its visual prior on complex or compound prompts. Adherence failure is the highest-leverage refund category because it\'s objectively verifiable against the prompt text.',
    symptoms: [
      'Subject in output differs from subject in prompt (different breed, color, age)',
      'Prompted action absent or replaced with a different action',
      'Setting or environment swapped (e.g., indoor instead of outdoor)',
      'Compound prompts: most elements present but one explicit detail missing',
      'Style or mood directive ignored (e.g., "cinematic" returns flat lighting)',
    ],
    examples: [
      {
        prompt: '"A black cat sleeping on a red leather sofa in a dimly lit room"',
        failure: 'Output shows orange tabby cat, beige fabric sofa, brightly-lit room — three of four explicit specifications ignored',
        timestamp: '0:00 - 0:08',
      },
      {
        prompt: '"Astronaut planting a flag on a desert dune at sunset"',
        failure: 'Astronaut walks but never plants flag; flag never appears in shot',
        timestamp: '0:00 - 0:10',
      },
    ],
    refundStrength: 'VERY HIGH — Prompt adherence is the most objectively-verifiable refund category. The prompt is the contract; the output either matches it or it doesn\'t.',
    faq: [
      {
        q: 'Will OpenAI Sora refund credits when the output ignored my prompt?',
        a: 'Yes. This is the most clear-cut refund category. Quote your exact prompt and itemise which explicit specifications the output ignored. Cite "Semantic Adherence Failure" and include the Generation ID. Adherence failures approve at the highest rate of any category.',
      },
      {
        q: 'Why does Sora ignore explicit prompt instructions?',
        a: 'On compound prompts, the prompt-encoder\'s conditioning signal competes with the model\'s visual prior. When a specific detail conflicts with the model\'s "most likely visual" learned from training, the prior often wins. The longer and more compound your prompt, the higher the adherence-failure risk.',
      },
      {
        q: 'How do I write Sora prompts that adhere reliably?',
        a: 'Lead with the most important specification. Keep prompts under 35 words. Avoid contradictory details (e.g., "dimly lit" + "bright sunset"). AVA\'s prompt-risk scanner predicts adherence-failure probability before generation.',
      },
    ],
  },

  // ── Pika Labs ──────────────────────────────────────────────────────────
  {
    slug: 'pika-motion-failure',
    title: 'Pika Labs Motion Failure — Get a Credit Refund',
    metaTitle: 'Pika Labs Motion Refund — Stalled Motion, Tempo Drift, Static Output',
    metaDesc:
      'Pika 2.0 generated stalled motion, jittery movement, or output where the subject barely moves? This is a Motion Coherence Failure. Document for a credit refund.',
    technicalTerm: 'Motion Coherence & Temporal Allocation Failure',
    risk: 'MAJOR',
    shortDesc: 'Stalled motion, jittery movement, near-static output, or tempo drift on Pika generations.',
    longDesc:
      'Motion Coherence & Temporal Allocation Failure is Pika\'s most reported failure category. The model frequently allocates its temporal budget aggressively toward visual fidelity at the cost of motion magnitude — prompts for "running", "dancing", or "falling" return outputs where the subject is nearly stationary. The reverse also occurs: prompts for "slow", "calm", "gentle" return jittery, over-energetic motion. Pika\'s refund pathway is through their Discord support flow and in-app submission; technical-failure-coded requests route faster than generic complaints.',
    symptoms: [
      'Subject moves significantly less than the prompt requests',
      'Tempo or speed of motion contradicts prompted pace',
      'Motion stalls or pauses without prompted cause',
      'Jittery micro-motion replaces requested smooth motion',
      'Camera motion absent when explicitly requested',
    ],
    examples: [
      {
        prompt: '"Person sprinting across a finish line at full speed"',
        failure: 'Subject jogs slowly with minimal forward motion across 5s clip; no sprint tempo observed',
        timestamp: '0:00 - 0:05',
      },
      {
        prompt: '"Gentle breeze rustling leaves on a tree, calm morning"',
        failure: 'Leaves shake erratically as if in storm-force wind throughout clip',
        timestamp: '0:00 - 0:04',
      },
    ],
    refundStrength: 'HIGH — Motion failures are objectively verifiable against the prompt language. Pika\'s support honours technical-failure refunds when the prompt-output mismatch is quoted explicitly.',
    faq: [
      {
        q: 'Will Pika Labs refund credits for motion failures?',
        a: 'Yes. Submit through Pika\'s in-app support or Discord. Quote the motion-related language in your prompt ("sprinting", "gentle breeze") and itemise the actual observed motion. Cite "Motion Coherence Failure" and include the Generation ID.',
      },
      {
        q: 'Why does Pika allocate motion poorly?',
        a: 'Pika prioritises visual detail in its temporal-budget allocation. On prompts with implicit motion magnitude, the model defaults toward "most-likely visual" rather than "most-likely-correct motion tempo" — the result is mismatched motion energy.',
      },
      {
        q: 'Which Pika prompts highest-risk for motion failures?',
        a: 'Prompts with implicit motion magnitude ("running", "diving", "falling"), prompts longer than 5 seconds, multi-subject coordinated motion, and prompts mixing motion and detailed visual description. AVA flags these patterns.',
      },
    ],
  },

  // ── MiniMax Hailuo ─────────────────────────────────────────────────────
  {
    slug: 'hailuo-anatomy-artifact',
    title: 'MiniMax Hailuo Anatomy Artifact — Get a Credit Refund',
    metaTitle: 'MiniMax Hailuo Refund — Limb Distortion, Face Drift, Anatomy Failures',
    metaDesc:
      'MiniMax Hailuo generated limb distortions, fused fingers, or facial drift across frames? This is an Anatomical Topology Failure. Document for a credit refund.',
    technicalTerm: 'Anatomical Topology & Coherence Failure',
    risk: 'CRITICAL',
    shortDesc: 'Limb distortion, fused fingers, supernumerary digits, or facial morphology drift in Hailuo generations.',
    longDesc:
      'Anatomical Topology & Coherence Failure is Hailuo\'s most common critical-tier failure. The model produces high-quality static frames but anatomy degrades across motion: fingers fuse or multiply, limbs reshape, facial proportions drift between frames. Hailuo (MiniMax) refunds via their developer console support flow; the support team recognises anatomical topology failures as a documented refund category when accompanied by Generation ID, prompt text, and timestamped frame evidence.',
    symptoms: [
      '6+ fingers or fused digits visible on hand',
      'Limb count changes across the clip duration',
      'Facial proportions drift between frames',
      'Joint articulation reverses direction',
      'Body topology collapses during rotation or fast motion',
    ],
    examples: [
      {
        prompt: '"Dancer performing a pirouette in a sunlit studio"',
        failure: 'Left hand shows 6 fingers at 0:02; right arm geometry collapses during rotation at 0:04',
        timestamp: '0:02',
      },
      {
        prompt: '"Close-up of a chef chopping vegetables with a knife"',
        failure: 'Fingers fuse into a single mass at 0:03; reseparate incorrectly at 0:04',
        timestamp: '0:03',
      },
    ],
    refundStrength: 'VERY HIGH — Hailuo support classifies anatomical topology failures as a critical-tier refund category. Well-documented requests approve within 1-3 business days.',
    faq: [
      {
        q: 'Will MiniMax Hailuo refund credits for anatomy failures?',
        a: 'Yes. Submit through the Hailuo developer console support flow. Cite "Anatomical Topology Failure", include the Generation ID, quote the prompt, and timestamp the frame where anatomy breaks. Attach a PDF audit report for fastest processing.',
      },
      {
        q: 'Why does Hailuo produce anatomy failures?',
        a: 'Hailuo\'s diffusion architecture inherits the same per-frame denoising limitations as other video models. Articulated-body topology degrades under motion because the model lacks a runtime skeletal constraint solver — finger-count and limb-count are emergent rather than enforced.',
      },
      {
        q: 'Which Hailuo prompts highest-risk for anatomy failures?',
        a: 'Close-up hand shots, dance and sports, multi-subject scenes, prompts with detailed facial expression, and rapid motion. AVA flags these patterns before generation.',
      },
    ],
  },

  // ── Kling text-specific gap-fill ───────────────────────────────────────
  {
    slug: 'kling-text-rendering-failure',
    title: 'Kling AI Text Rendering Failure — Get a Credit Refund',
    metaTitle: 'Kling AI Text Refund — Garbled Signs, Labels, Subtitles',
    metaDesc:
      'Kling 1.6 or 2.0 produced a video where the prompted text renders as garbled glyphs or wrong characters? This is a Glyph Synthesis Failure. Get refunded.',
    technicalTerm: 'Glyph Synthesis & Semantic Adherence Failure',
    risk: 'MAJOR',
    shortDesc: 'Prompted in-scene text renders as garbled glyphs, mirrored letters, or unrelated characters in Kling generations.',
    longDesc:
      'Kling renders typography poorly across both 1.6 and 2.0 model versions. Storefront signs, product labels, screen UI, and t-shirt graphics commonly produce shapes that resemble letters but don\'t form readable words. This is a Glyph Synthesis & Semantic Adherence Failure — and because the prompt explicitly specified the text, it\'s objectively verifiable as a prompt-adherence violation. Kling honours text-failure refunds when documented properly through their support flow.',
    symptoms: [
      'Sign or label text renders as garbled non-letters',
      'Same word changes characters frame-to-frame',
      'Mirrored or flipped glyphs in the output',
      'T-shirt text or screen UI text is unreadable',
      'Wrong language characters appear (e.g., Cyrillic-like in a Latin prompt)',
    ],
    examples: [
      {
        prompt: '"A bookstore window with a sign reading GRAND OPENING"',
        failure: 'Sign reads "GRRND OPENINK" with mirrored second N and shifting glyphs across frames',
        timestamp: '0:00 - 0:06',
      },
      {
        prompt: '"Whiteboard with the word DEMO written on it, office setting"',
        failure: 'Whiteboard text renders as "DΞMO" with morphing first character across 0:02-0:04',
        timestamp: '0:02',
      },
    ],
    refundStrength: 'HIGH — Text rendering failures are objectively verifiable against the prompt. Kling support honours these refunds when the prompt\'s exact text and the output\'s rendered text are both quoted.',
    faq: [
      {
        q: 'Will Kling refund credits for garbled text?',
        a: 'Yes, when your prompt specified the exact text that should render. Quote both the prompt text and the actual rendered text in your support request. Cite "Glyph Synthesis Failure" and include the Generation ID.',
      },
      {
        q: 'Why can\'t Kling render text correctly?',
        a: 'Like all video diffusion models, Kling synthesizes text pixel-by-pixel through the denoising process. Coherent glyph synthesis across temporal frames is an unsolved problem at current model scales — text in training data is sparse and temporally unstable.',
      },
      {
        q: 'Is there a way to get text into a Kling video?',
        a: 'Generate the video without text, then composite the text in post-production using CapCut, DaVinci Resolve, or After Effects. AVA\'s L1 scanner flags any prompt containing quoted text as high-text-failure-risk before generation.',
      },
    ],
  },

  // ── Seedance face gap-fill ─────────────────────────────────────────────
  {
    slug: 'seedance-face-distortion',
    title: 'ByteDance Seedance Face Distortion — Get a Credit Refund',
    metaTitle: 'Seedance Face Refund — Asymmetric Eyes, Facial Drift',
    metaDesc:
      'ByteDance Seedance 2.0 generated facial morphing, asymmetric eyes, or expression drift across frames? This is a Facial Landmark Regression Failure.',
    technicalTerm: 'Facial Landmark Regression Failure',
    risk: 'CRITICAL',
    shortDesc: 'Asymmetric eye placement, facial morphing across frames, expression drift in Seedance close-up generations.',
    longDesc:
      'Seedance produces strong static facial renders but landmark stability degrades across the temporal axis. Eye spacing shifts, jaw geometry reshapes, ear position drifts, and skin texture pixelates inconsistently. The failure is most severe in close-up shots and during head motion or facial expression changes. Seedance\'s refund process is reachable through ByteDance\'s in-app support flow; technical-failure-coded requests with attached PDF audit reports route faster than generic complaints.',
    symptoms: [
      'Eye spacing changes visibly across the clip',
      'Jawline reshapes during head motion',
      'Ear size or position drifts between frames',
      'Skin texture quality inconsistent across frames',
      'Facial expression interpolates through inconsistent intermediate forms',
    ],
    examples: [
      {
        prompt: '"Close-up of a woman smiling, soft window light"',
        failure: 'Left eye drifts inward by 0:02; jawline narrows by 0:04; expression mismatch between frame halves',
        timestamp: '0:02',
      },
      {
        prompt: '"Man laughing at a dinner table, warm restaurant lighting"',
        failure: 'Mouth shape inconsistent with prompted laugh; right ear morphs in size across 0:01-0:03',
        timestamp: '0:01',
      },
    ],
    refundStrength: 'VERY HIGH — Seedance support classifies facial landmark regression as a critical-tier failure. Documented requests with frame-level evidence approve quickly.',
    faq: [
      {
        q: 'Will Seedance refund credits for face distortion?',
        a: 'Yes. Submit through ByteDance\'s in-app support flow. Use "Facial Landmark Regression Failure" terminology, cite the Generation ID, timestamp the worst-drift frame, and attach a PDF audit report. This is a high-precedent refund category.',
      },
      {
        q: 'Why does Seedance distort faces across frames?',
        a: 'Seedance allocates per-frame compute aggressively to visual detail. The temporal-coherence module has limited budget for small high-frequency features (eye spacing, jaw geometry, ear placement), so these drift across the clip.',
      },
      {
        q: 'Which Seedance prompts highest-risk for face distortion?',
        a: 'Close-up portraits, prompts with facial expression changes, side profiles, multi-character scenes, and fast head motion. AVA\'s pre-flight scanner flags these patterns before generation.',
      },
    ],
  },

  {
    slug: 'seedance-motion-drift',
    title: 'ByteDance Seedance Motion Drift — Get a Credit Refund',
    metaTitle: 'Seedance Refund — Motion Drift, Tempo Failure',
    metaDesc:
      'ByteDance Seedance 2.0 generated motion that doesn\'t match the prompted action? This is a Motion Coherence Failure. Document the failure for a credit refund.',
    technicalTerm: 'Motion Coherence & Tempo Failure',
    risk: 'MAJOR',
    shortDesc: 'Motion direction or tempo doesn\'t match the prompt; speed shifts or motion stalls during Seedance generations.',
    longDesc:
      'Seedance produces high visual fidelity but motion coherence is its weak point. Prompted "smooth dolly forward" generates a stutter; "slow pan" accelerates non-linearly; "walking" turns into a jerky shuffle. This is a Motion Coherence & Tempo Failure — the model interprets motion direction from prompt but allocates frame budget inconsistently across the temporal axis. Seedance\'s refund process is reachable through ByteDance\'s in-app support; technical documentation routes faster than complaint-style descriptions.',
    symptoms: [
      'Smooth motion prompts produce stutter or pause',
      'Motion tempo changes within the clip',
      'Subject motion reverses direction mid-clip',
      'Camera motion accelerates non-linearly',
      'Motion blur misaligned with implied movement',
    ],
    examples: [
      {
        prompt: '"Smooth dolly forward into a city street at golden hour"',
        failure: 'Camera pauses at 0:02, jumps forward at 0:03, resumes smooth motion — visible cut not in prompt',
        timestamp: '0:02',
      },
      {
        prompt: '"Person walking calmly down a hallway"',
        failure: 'Walk tempo varies from 1.2x at 0:01 to 0.6x at 0:03; gait inconsistent',
        timestamp: '0:01 → 0:03',
      },
    ],
    refundStrength: 'MEDIUM-HIGH — Seedance honours motion-failure refunds when the prompt explicitly specified motion behavior. Quote the prompt\'s motion language in your request.',
    faq: [
      {
        q: 'Will Seedance refund credits for motion failures?',
        a: 'Yes, when the prompt specified motion behavior the output violated. Quote the prompt\'s motion language ("smooth", "slow pan", "walking calmly"), cite "Motion Coherence Failure", timestamp the failure, attach the PDF audit report.',
      },
      {
        q: 'Why does Seedance produce inconsistent motion?',
        a: 'Seedance allocates per-frame compute aggressively to visual detail. The temporal-coherence module sometimes loses budget when scene complexity is high, causing motion-tempo drift even with explicit motion prompts.',
      },
      {
        q: 'Which Seedance prompts highest-risk for motion failures?',
        a: 'Long-duration motion (>5s), continuous camera moves, multi-subject coordinated motion, fast tempo changes. AVA flags ambiguous motion language in prompts before generation.',
      },
    ],
  },
];

export function getFailure(slug: string): FailureData | undefined {
  return FAILURES.find((f) => f.slug === slug);
}
