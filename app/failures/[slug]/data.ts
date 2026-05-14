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
  relatedFailures?: string[];
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
  {
    slug: 'runway-audio-sync-drift',
    title: 'Runway Gen-3 Audio-Video Sync Drift — Refund Guide',
    metaTitle: 'Runway Audio Drift Refund — Lip Sync Failure, Audio Out of Sync',
    metaDesc:
      'Runway Gen-3 generated a clip where audio drifts out of sync with mouth movement, action, or footstep timing? This is Audio-Visual Temporal Misalignment. Here\'s how to get refunded.',
    technicalTerm: 'Audio-Visual Temporal Misalignment',
    risk: 'CRITICAL',
    shortDesc: 'Audio drift relative to mouth movement, footsteps, or scene events; cumulative timing error across the clip.',
    longDesc:
      'Audio-Visual Temporal Misalignment occurs when Runway\'s generated soundtrack desynchronises from the visual track. The decoder operates at a different effective frame rate than the audio sampler, so a clip that starts in-sync drifts by 100–400ms by the end. The failure is most severe on clips longer than 6s with prominent speech, percussive action (footsteps, hammer strikes, clapping), or any sound cue tied to a specific visual frame.',
    symptoms: [
      'Lip movement leads or trails dialogue audio',
      'Footstep sound plays before or after foot contact',
      'Audio cue fires on the wrong frame relative to prompt-specified beats',
      'Drift accumulates — sync OK at 0s, broken by 6s',
      'Background music tempo mismatches visible rhythm',
    ],
    examples: [
      {
        prompt: '"Drummer playing a snare roll, close-up of hands and sticks"',
        failure: 'Audio leads visual stick contact by 280ms at 0:04; drift increases through clip',
        timestamp: '0:04',
      },
      {
        prompt: '"Woman speaking directly to camera, professional lighting"',
        failure: 'Lip movement lags audio by ~180ms at 0:02, ~340ms by 0:06',
        timestamp: '0:02 → 0:06',
      },
    ],
    refundStrength: 'HIGH — Runway support recognises audio drift as a generation-pipeline defect, especially when measurable in milliseconds. Always cite the drift magnitude and timestamp.',
    faq: [
      {
        q: 'Does Runway refund audio-sync failures?',
        a: 'Yes. When you can quote the drift in milliseconds and timestamp the offset, Runway support routinely refunds. Use the term "Audio-Visual Temporal Misalignment" and attach the AVA audit report.',
      },
      {
        q: 'Why does Runway audio go out of sync?',
        a: 'The video decoder and audio sampler don\'t share a unified clock during generation; their effective rates drift relative to one another, especially across longer clips with high motion.',
      },
      {
        q: 'Which Runway prompts are highest risk for sync drift?',
        a: 'Anything with speech, percussion, or precise visual-audio events. AVA flags audio-bearing prompts longer than 5 seconds for pre-generation review.',
      },
    ],
  },
  {
    slug: 'luma-camera-path-drift',
    title: 'Luma Dream Machine Camera Path Drift — Refund Guide',
    metaTitle: 'Luma Camera Drift Refund — Camera Trajectory Failure Dream Machine',
    metaDesc:
      'Luma Dream Machine ignored your camera direction (orbit, dolly, push-in) and drifted along a different path? This is Cinematographic Trajectory Failure. Refund guide here.',
    technicalTerm: 'Cinematographic Trajectory Failure',
    risk: 'CRITICAL',
    shortDesc: 'Specified camera move (orbit, dolly, push-in, crane) drifts off the requested path mid-clip.',
    longDesc:
      'Cinematographic Trajectory Failure occurs when Luma\'s diffusion model fails to maintain the camera path specified in the prompt. A "slow dolly in" becomes a pan; an "orbit around subject" curves into a crab; a "static lock-off" introduces parasitic drift. The internal camera-conditioning network operates as a soft prior, not a hard constraint, so when scene content competes for representational capacity, the camera path degrades first.',
    symptoms: [
      'Camera path diverges from prompt instruction within 2s',
      'Specified orbit becomes a pan or crab',
      'Static lock-off introduces parasitic drift',
      'Push-in stops or reverses mid-clip',
      'Camera height changes without instruction',
    ],
    examples: [
      {
        prompt: '"Slow dolly-in toward a candle on a wooden table, shallow depth of field"',
        failure: 'Camera dollies in for 0:01, then arcs left into a pan from 0:02 to 0:05',
        timestamp: '0:02',
      },
      {
        prompt: '"Orbit slowly around a sports car parked on a desert road"',
        failure: 'Orbit arc collapses into a left-to-right crab at 0:03; no rotation in second half',
        timestamp: '0:03',
      },
    ],
    refundStrength: 'VERY HIGH — Luma\'s support staff treat camera-path failure as a recognised flagship-feature defect (camera control is a marketed differentiator).',
    faq: [
      {
        q: 'Does Luma refund credits for camera path failures?',
        a: 'Yes — camera control is a marketed Dream Machine feature, so support takes path-failure complaints seriously. Cite the prompt\'s camera language verbatim and timestamp the divergence.',
      },
      {
        q: 'Why does Luma ignore my camera direction?',
        a: 'The camera-conditioning model is a soft prior, not a hard constraint. When scene complexity demands representational capacity, the camera path is the first thing to degrade.',
      },
      {
        q: 'Which Luma camera prompts are highest risk?',
        a: 'Multi-second continuous moves (>4s), complex orbits, push-ins through scene elements, and any move involving multiple axes. AVA scans for camera-conditioning ambiguity in prompts.',
      },
    ],
  },
  {
    slug: 'veo-audio-generation-failure',
    title: 'Google Veo 3 Audio Generation Failure — Refund Guide',
    metaTitle: 'Veo 3 Audio Failure Refund — Silent, Mismatched, or Wrong Style Audio',
    metaDesc:
      'Veo 3 produced silent, mismatched, or stylistically wrong audio despite generating it natively? This is Multimodal Audio-Visual Conditioning Failure. Refund process here.',
    technicalTerm: 'Multimodal Audio-Visual Conditioning Failure',
    risk: 'CRITICAL',
    shortDesc: 'Veo 3 outputs silent track, mismatched ambience, or stylistically wrong audio relative to prompt.',
    longDesc:
      'Multimodal Audio-Visual Conditioning Failure occurs when Veo 3\'s audio decoder fails to produce sound matched to the visual content and prompt specification. The model is marketed as natively multimodal — audio generation is a headline differentiator — so when it ships silent, generates wrong-genre ambience, or produces a stylistic mismatch (e.g., daytime urban ambience for a quiet forest scene), the failure is treatable as a marketed-feature defect.',
    symptoms: [
      'Output is completely silent despite a prompt specifying sound',
      'Ambient track mismatches visible environment (city sounds in forest)',
      'Music genre or instrument set unrelated to prompt instruction',
      'Speech/dialogue absent when prompt specified it',
      'Audio cuts out mid-clip or has clipping artifacts',
    ],
    examples: [
      {
        prompt: '"Quiet forest stream with birdsong and rustling leaves"',
        failure: 'Output contained city traffic ambience instead of forest sounds',
        timestamp: '0:00 → 0:08',
      },
      {
        prompt: '"Jazz trio performing in a dimly lit lounge, upright bass prominent"',
        failure: 'Audio track was solo piano with no bass and no drum kit — wrong instrumentation',
        timestamp: 'full duration',
      },
    ],
    refundStrength: 'VERY HIGH — Native audio is Google\'s marketed differentiator for Veo 3. Failure is treatable as feature-defect, not creative-variance.',
    faq: [
      {
        q: 'Does Google refund Veo 3 audio failures?',
        a: 'Yes. Veo 3\'s native audio is a marketed flagship capability; support and Google Cloud teams accept feature-defect refunds when prompt-spec mismatch is documented.',
      },
      {
        q: 'Why does Veo 3 ship wrong-content audio?',
        a: 'The audio-visual conditioning shares representational bandwidth with visual fidelity. Under load, the audio decoder defaults to nearest-neighbour ambience instead of prompt-conditioned synthesis.',
      },
      {
        q: 'Which Veo 3 audio prompts are highest risk?',
        a: 'Specific instrumentation, specific dialect/language speech, environment-mismatched scenes, and any prompt where audio carries narrative weight. AVA pre-scans audio specifications in Veo prompts.',
      },
    ],
  },
  {
    slug: 'kling-motion-blur-overload',
    title: 'Kling Motion Blur Overload — Refund Guide',
    metaTitle: 'Kling Motion Blur Refund — Excessive Blur in Static Scenes',
    metaDesc:
      'Kling generated a clip with heavy motion blur applied to static or slow-moving elements? This is Inappropriate Motion-Vector Field Application. Refund guide.',
    technicalTerm: 'Inappropriate Motion-Vector Field Application',
    risk: 'MAJOR',
    shortDesc: 'Heavy motion blur applied to static frames, slow-moving subjects, or background elements that should be sharp.',
    longDesc:
      'Inappropriate Motion-Vector Field Application occurs when Kling\'s motion-blur module over-allocates blur to regions of the frame that should remain sharp. The motion-vector predictor mis-estimates per-pixel velocity for static or near-static elements, then applies temporal smoothing as if those pixels were moving fast. Result: unusable footage where a still subject is rendered with motion-blur trails, or a static background goes soft behind moving foreground.',
    symptoms: [
      'Static subject rendered with motion-blur trails',
      'Background goes soft while foreground stays sharp (inverted)',
      'Slow camera pan produces extreme blur as if rapid',
      'Sharp objects become smeared between frames',
      'Detail loss localised to wrong region of the frame',
    ],
    examples: [
      {
        prompt: '"Static product shot of a watch on a marble surface, no movement"',
        failure: 'Watch face rendered with horizontal motion-blur trails despite static prompt',
        timestamp: '0:00 → 0:04',
      },
      {
        prompt: '"Slow camera pan across a still bookshelf"',
        failure: 'Book spines rendered with motion-blur as if camera were sprinting, spines unreadable',
        timestamp: 'full duration',
      },
    ],
    refundStrength: 'MEDIUM-HIGH — Kling support recognises motion-vector misapplication when you can demonstrate static prompt + blurred output side-by-side.',
    faq: [
      {
        q: 'Does Kling refund credits for motion-blur over-application?',
        a: 'Yes, when the prompt specified static or slow motion and the output shows aggressive blur. Cite "Inappropriate Motion-Vector Field Application" and attach the prompt + frame stills.',
      },
      {
        q: 'Why does Kling over-apply motion blur?',
        a: 'The motion-vector predictor estimates per-pixel velocity probabilistically. Texture-rich static surfaces (marble, wood grain, fabric) can produce false-positive velocity estimates, triggering temporal smoothing.',
      },
      {
        q: 'Which Kling prompts are highest risk?',
        a: 'Static product shots, slow camera moves, texture-rich surfaces, and any prompt where sharpness is critical. AVA scans for motion-vector ambiguity in static-scene prompts.',
      },
    ],
  },
  {
    slug: 'sora-multi-character-interaction',
    title: 'Sora 2 Multi-Character Interaction Failure — Refund Guide',
    metaTitle: 'Sora 2 Multi-Character Refund — Body Merging, Identity Collapse',
    metaDesc:
      'Sora 2 merged two characters\' bodies during interaction, or lost identity coherence across both subjects? This is Multi-Agent Topology Collapse. Refund guide.',
    technicalTerm: 'Multi-Agent Topology Collapse',
    risk: 'CRITICAL',
    shortDesc: 'Two or more subjects merging, identity-swapping, or losing geometric separation during interaction.',
    longDesc:
      'Multi-Agent Topology Collapse occurs when Sora 2\'s character-conditioning model fails to maintain identity and body separation across multiple subjects in close-range interaction. Bodies fuse where they should overlap, faces swap features between subjects, or one character\'s clothing migrates onto the other. The failure is most pronounced in hugs, handshakes, dance partners, fight choreography, and any scene where two subjects share a contact region.',
    symptoms: [
      'Two characters\' bodies fusing where they should overlap',
      'Facial features swapping between subjects',
      'Clothing migrating from one character to another',
      'Limbs from different characters interpenetrating',
      'One character\'s identity collapsing into the other',
    ],
    examples: [
      {
        prompt: '"Two old friends hugging at an airport arrivals gate"',
        failure: 'Shoulders fused at contact, one face features migrated to the other by 0:02',
        timestamp: '0:02',
      },
      {
        prompt: '"Couple slow-dancing in a candlelit room"',
        failure: 'Hand-holding region collapsed into single fused hand at 0:01; identity drift at 0:04',
        timestamp: '0:01 → 0:04',
      },
    ],
    refundStrength: 'VERY HIGH — Sora 2 markets identity preservation across subjects; multi-agent collapse is a recognised flagship-feature defect.',
    faq: [
      {
        q: 'Does OpenAI refund Sora 2 multi-character failures?',
        a: 'Yes. OpenAI support treats multi-agent topology failures seriously because identity preservation is a Sora 2 marketed capability. Cite the technical term, document with frame stills, and submit through the Sora support portal.',
      },
      {
        q: 'Why does Sora 2 merge characters?',
        a: 'The character-conditioning model shares latent capacity across all subjects in a scene. When contact regions enter the same patch tokens, identity features bleed between subjects.',
      },
      {
        q: 'Which Sora 2 prompts are highest risk?',
        a: 'Hugs, handshakes, fight choreography, dance partners, and any close-contact multi-subject scene. AVA flags multi-character interaction prompts for elevated risk scoring.',
      },
    ],
  },
  {
    slug: 'pika-lip-sync-failure',
    title: 'Pika Labs Lip Sync Failure — Refund Guide',
    metaTitle: 'Pika Lip Sync Refund — Mouth Movement Mismatch with Audio',
    metaDesc:
      'Pika Labs generated a talking-head clip where mouth shapes don\'t match the audio phonemes? This is Phoneme-Visem Mapping Failure. Refund guide.',
    technicalTerm: 'Phoneme-Viseme Mapping Failure',
    risk: 'CRITICAL',
    shortDesc: 'Mouth shapes (visemes) don\'t correspond to audio phonemes — closed mouth on vowels, open mouth on consonants.',
    longDesc:
      'Phoneme-Viseme Mapping Failure occurs when Pika\'s lip-sync module produces mouth geometry uncorrelated with the input audio. The model has learned generic mouth-movement priors but fails to align them with the specific phoneme sequence in the audio track. Closed mouths appear on vowels that require open shapes; mouth stays still through entire words; tongue position is wrong for fricatives and dentals.',
    symptoms: [
      'Mouth closed during open-vowel phonemes (a, e, o)',
      'Mouth stays still through entire spoken words',
      'Lip rounding wrong for "oo" or "oh" sounds',
      'Teeth position incorrect for fricatives (f, v, s, z)',
      'Mouth movement timing drifts from audio over the clip',
    ],
    examples: [
      {
        prompt: '"Narrator speaking the word \\"hello\\" directly to camera, audio attached"',
        failure: 'Mouth stays closed through "he-llo" duration; brief opening at 0:01 unrelated to phoneme',
        timestamp: '0:00 → 0:01',
      },
      {
        prompt: '"Person reading a paragraph from a book, lip-sync to attached audio"',
        failure: 'Mouth movement is generic chewing motion, no correlation to phoneme sequence',
        timestamp: 'full duration',
      },
    ],
    refundStrength: 'HIGH — Pika markets lip-sync as a paid-tier feature. Documented phoneme mismatch is grounds for refund.',
    faq: [
      {
        q: 'Does Pika refund lip-sync failures?',
        a: 'Yes — lip-sync is a paid-tier marketed feature on Pika. Support refunds when the user can demonstrate audio-phoneme to visual-viseme mismatch. Reference "Phoneme-Viseme Mapping Failure" in the ticket.',
      },
      {
        q: 'Why does Pika lip-sync fail?',
        a: 'The viseme-prediction model is trained on generic mouth shapes and fine-tuned to align with phoneme sequences. Under audio with strong accents, fast speech, or non-English phonemes, the alignment degrades.',
      },
      {
        q: 'Which Pika lip-sync prompts are highest risk?',
        a: 'Fast speech, non-English audio, accented speech, multi-speaker audio tracks, and dialogue with heavy fricatives or dentals. AVA flags lip-sync prompts with high phoneme complexity.',
      },
    ],
  },
  {
    slug: 'hailuo-camera-shake-artifact',
    title: 'MiniMax Hailuo Camera Shake Artifact — Refund Guide',
    metaTitle: 'Hailuo Camera Shake Refund — Involuntary Jitter on Static Shots',
    metaDesc:
      'Hailuo generated a static or slow-moving clip with involuntary camera shake or jitter? This is Parasitic Camera-Pose Variance. Refund guide.',
    technicalTerm: 'Parasitic Camera-Pose Variance',
    risk: 'MAJOR',
    shortDesc: 'Camera pose jitters or shakes unprompted on static / slow-moving shots, creating unwanted handheld feel.',
    longDesc:
      'Parasitic Camera-Pose Variance occurs when Hailuo\'s diffusion model introduces unrequested high-frequency camera-pose noise. The temporal prior assumes some camera motion across frames; on prompts specifying static or slow-moving shots, this prior leaks through as involuntary jitter. Output looks like uncorrected handheld footage where a tripod was specified.',
    symptoms: [
      'Unprompted jitter on tripod / static shots',
      'High-frequency micro-shake at 5–8 Hz across frames',
      'Slow pan rendered with handheld bobble overlay',
      'Stable subject appears to vibrate against camera',
      'Background edges show frame-to-frame parallax in static shots',
    ],
    examples: [
      {
        prompt: '"Locked-off tripod shot of a vase on a table, no movement"',
        failure: 'Camera jitters at ~6 Hz throughout the clip; vase appears to vibrate against background',
        timestamp: '0:00 → 0:08',
      },
      {
        prompt: '"Slow smooth pan across a landscape, professional gimbal feel"',
        failure: 'Pan executes but with handheld micro-bobble overlaid; not smooth',
        timestamp: 'full duration',
      },
    ],
    refundStrength: 'MEDIUM-HIGH — Hailuo support honours camera-stability refunds when prompt explicitly specified static or smooth motion.',
    faq: [
      {
        q: 'Does Hailuo refund camera-shake failures?',
        a: 'Yes when the prompt specified static / tripod / smooth motion. Quote the prompt\'s stability language verbatim and timestamp the jitter onset.',
      },
      {
        q: 'Why does Hailuo add unwanted camera shake?',
        a: 'The temporal prior assumes some inter-frame motion. On static-prompt generations, this prior leaks through as residual jitter — most visible at the 5–8 Hz band.',
      },
      {
        q: 'Which Hailuo prompts are highest risk?',
        a: 'Tripod shots, locked-off compositions, slow gimbal moves, and any prompt where stability is critical (product shots, talking heads). AVA flags stability-critical prompts.',
      },
    ],
  },
  {
    slug: 'seedance-style-preset-failure',
    title: 'ByteDance Seedance Style Preset Failure — Refund Guide',
    metaTitle: 'Seedance Style Preset Refund — Style Ignored, Default Render',
    metaDesc:
      'Seedance ignored your chosen style preset (anime, photoreal, cinematic) and rendered in the default style? This is Style Conditioning Bypass. Refund guide.',
    technicalTerm: 'Style Conditioning Bypass',
    risk: 'MAJOR',
    shortDesc: 'Selected style preset (anime, cinematic, photoreal) is ignored; output uses the model\'s default visual style.',
    longDesc:
      'Style Conditioning Bypass occurs when Seedance\'s style-selector input fails to propagate to the diffusion backbone. The chosen preset is registered in the UI and metadata but never applied to the latent at denoising time. Output looks like the model\'s default visual style regardless of what preset was clicked. Affects paid preset tiers most visibly because users are paying specifically for the style choice.',
    symptoms: [
      '"Anime" preset produces photorealistic output',
      '"Cinematic" preset produces flat / TV-look output',
      '"Photoreal" preset produces stylized / illustrative output',
      'No visible difference between adjacent preset selections on same prompt',
      'Metadata shows preset selected but render contradicts it',
    ],
    examples: [
      {
        prompt: '"Samurai in a bamboo forest" + Anime preset selected',
        failure: 'Output rendered in photoreal style; no anime cel-shading, no flat colour fills',
        timestamp: '0:00 → 0:06',
      },
      {
        prompt: '"Coffee shop interior" + Cinematic preset selected',
        failure: 'Output rendered in flat-bright lighting style; cinematic colour grading absent',
        timestamp: 'full duration',
      },
    ],
    refundStrength: 'HIGH — Style presets are paid feature tiers. Bypass failures are treatable as feature-defect.',
    faq: [
      {
        q: 'Does Seedance refund style-preset failures?',
        a: 'Yes — style presets are paid feature tiers, so bypass is a feature-defect refund. Provide the preset selection metadata + visual evidence of style mismatch.',
      },
      {
        q: 'Why does Seedance ignore style presets?',
        a: 'The style-conditioning vector is injected at specific cross-attention layers. Under high-complexity prompts, the style vector\'s contribution is overwhelmed by content conditioning, producing a default-style render.',
      },
      {
        q: 'Which Seedance style prompts are highest risk?',
        a: 'High-detail content prompts paired with style presets, multi-style requests (mixing presets), and presets selected for first-time generations. AVA flags style+content competition in prompts.',
      },
    ],
  },
  {
    slug: 'runway-watermark-bleed',
    title: 'Runway Watermark Bleed-Through — Refund Guide',
    metaTitle: 'Runway Watermark Refund — Paid Tier Showing Free Watermark',
    metaDesc:
      'Runway Standard or Pro plan output showing the free-tier watermark? This is Watermark Pipeline Misrouting. Definitive refund grounds. Guide here.',
    technicalTerm: 'Watermark Pipeline Misrouting',
    risk: 'CRITICAL',
    shortDesc: 'Paid-tier output is delivered with the free-tier watermark visible — a billing-feature defect.',
    longDesc:
      'Watermark Pipeline Misrouting occurs when Runway\'s post-generation watermarking module fails to recognise the user as a paid-tier subscriber and applies the free-tier watermark anyway. This is the single strongest refund-grounds defect because it directly contradicts the paid-tier deliverable. Affects users immediately after plan upgrades, billing renewals, or session boundary crossings.',
    symptoms: [
      'Visible Runway watermark in corner of paid-plan output',
      'Watermark appears even though billing dashboard shows active paid plan',
      'First few generations after plan upgrade still watermarked',
      'Some generations watermarked, others not, in the same session',
      'Watermark removal tool reveals trace residue in pixels',
    ],
    examples: [
      {
        prompt: 'Any prompt on a Standard or Pro tier account immediately after upgrade',
        failure: 'Output delivered with bottom-right Runway watermark visible despite paid tier',
      },
      {
        prompt: 'Bulk generation session — 5 of 12 outputs watermarked',
        failure: 'Inconsistent watermarking within single session despite continuous paid status',
      },
    ],
    refundStrength: 'VERY HIGH — strongest refund grounds in the Runway product. Billing-feature defect, no creative-variance defense available.',
    faq: [
      {
        q: 'Does Runway refund watermark-bleed failures?',
        a: 'Yes — this is the strongest refund grounds in the product. Billing-feature defects are not subject to creative-variance defenses. Refunds are routinely instant.',
      },
      {
        q: 'Why does the free watermark appear on paid output?',
        a: 'The watermarking module reads user-tier state from a cached entitlements lookup. On session boundaries or plan upgrades, this cache may serve stale free-tier state.',
      },
      {
        q: 'When is watermark-bleed risk highest?',
        a: 'Immediately after plan upgrade, immediately after billing renewal, on first generation of a new session, or after a long idle period. AVA checks tier metadata against rendered output automatically.',
      },
    ],
  },
  {
    slug: 'luma-lip-sync-failure',
    title: 'Luma Dream Machine Lip Sync Failure — Refund Guide',
    metaTitle: 'Luma Lip Sync Refund — Mouth Movement Mismatched with Speech',
    metaDesc:
      'Luma Dream Machine generated dialogue clips where lip movement does not match the spoken audio? This is Phoneme-Viseme Mapping Failure. Refund guide.',
    technicalTerm: 'Phoneme-Viseme Mapping Failure',
    risk: 'CRITICAL',
    shortDesc: 'Lip movement does not correspond to spoken phonemes; mouth opens on consonants, closes on vowels.',
    longDesc:
      'Phoneme-Viseme Mapping Failure on Luma Dream Machine occurs when the lip-shape predictor outputs visemes uncorrelated with the input or generated audio. Mouth opens on consonants, closes on vowels, lips fail to round on "oh" sounds, and overall lip-movement timing drifts from audio. Distinct from prompt-adherence failures because the audio track itself is correct — only the visual mouth-shape sequence is wrong.',
    symptoms: [
      'Mouth shape uncorrelated with audio phoneme',
      'Closed mouth during open vowels',
      'Lip rounding wrong for "oo" / "oh"',
      'Mouth motion timing drifts from audio across clip',
      'Generic chewing motion replaces phoneme-specific visemes',
    ],
    examples: [
      {
        prompt: '"Woman saying \\"good morning\\" directly to camera, professional lighting"',
        failure: 'Mouth stays nearly closed through entire phrase; brief opening at 0:01 not aligned with phonemes',
        timestamp: '0:00 → 0:02',
      },
      {
        prompt: '"News anchor delivering a single sentence, lip-synced to audio"',
        failure: 'Mouth motion is generic chewing pattern; no correlation with audio sentence structure',
        timestamp: 'full duration',
      },
    ],
    refundStrength: 'HIGH — Luma Dream Machine markets dialogue capability; lip-sync failure on paid output is treatable as feature defect.',
    faq: [
      {
        q: 'Does Luma refund lip-sync failures?',
        a: 'Yes — Luma support recognises lip-sync as a marketed Dream Machine capability. Cite "Phoneme-Viseme Mapping Failure", attach the audio + visual stills.',
      },
      {
        q: 'Why does Luma lip-sync fail?',
        a: 'The viseme-prediction network is conditioned on audio embeddings. Under fast speech, accented audio, or non-English phonemes, the embedding-to-viseme mapping degrades, producing generic mouth motion.',
      },
      {
        q: 'Which Luma dialogue prompts are highest risk?',
        a: 'Fast speech, non-English audio, accented dialogue, multi-speaker scenes, and any prompt where lip-sync is narratively load-bearing. AVA flags lip-sync prompts before generation.',
      },
    ],
  },
  {
    slug: 'sora-watermark-bleed-failure',
    title: 'OpenAI Sora Watermark Bleed — Refund Guide',
    metaTitle: 'Sora Watermark Bleed Refund — Logo Persists in Paid Output',
    metaDesc:
      'OpenAI Sora generated clips with the C2PA-style watermark or Sora logo bleeding into the visible frame on paid output? This is Provenance Tag Leakage Failure. Refund guide.',
    technicalTerm: 'Provenance Tag Leakage Failure',
    risk: 'MAJOR',
    shortDesc: 'C2PA provenance watermark or Sora logo persists in the visible frame on paid-tier output where it should be invisible or removable.',
    longDesc:
      'Provenance Tag Leakage Failure on Sora occurs when the model\'s C2PA-style provenance watermark — designed to be invisible or removable for paid users — bleeds into the visible frame, leaving a logo, corner mark, or visible texture pattern on output the customer paid to be clean. Distinct from intentional watermarking on free-tier output because the paid tier explicitly markets clean output.',
    symptoms: [
      'Sora corner logo visible on paid-tier export',
      'Faint repeating texture pattern across frame (C2PA stamp)',
      'Watermark intensity varies across the clip',
      'Watermark persists after the documented removal pass',
      'Logo overlaps subject in the lower-right region',
    ],
    examples: [
      {
        prompt: '"Cinematic drone shot of a coastline at sunset, no text, no logos, no watermarks"',
        failure: 'Faint Sora corner mark visible at bottom-right throughout the clip',
        timestamp: 'full duration',
      },
      {
        prompt: '"Close-up of a hand holding a coffee cup, clean output"',
        failure: 'Repeating C2PA-style texture pattern visible in the smooth out-of-focus background',
        timestamp: '0:00 → 0:05',
      },
    ],
    refundStrength: 'HIGH — Sora paid-tier marketing explicitly promises clean output. Watermark leakage on a paid generation is a clear product defect.',
    faq: [
      {
        q: 'Does OpenAI refund Sora watermark bleed?',
        a: 'Yes — OpenAI support treats visible provenance-tag leakage on paid-tier output as a defect. Cite "Provenance Tag Leakage Failure" and attach a still showing the visible watermark.',
      },
      {
        q: 'Why does Sora watermarking sometimes show on paid output?',
        a: 'Sora applies a C2PA-style watermarking layer at render time. On paid-tier, a removal pass strips the visible component, but if the removal pass fails or partially applies, the watermark bleeds into the final encode.',
      },
      {
        q: 'How do I prove Sora watermark bleed for a refund?',
        a: 'Export a single frame at full resolution, zoom into the affected region, and attach to your refund ticket. AVA auto-detects watermark bleed and generates the still + region annotation.',
      },
    ],
  },
  {
    slug: 'runway-prompt-ignored-failure',
    title: 'Runway Prompt Ignored — Refund Guide',
    metaTitle: 'Runway Prompt Ignored Refund — Text Conditioning Discarded',
    metaDesc:
      'Runway Gen-3 generated a clip that ignores the prompt entirely, producing generic output unrelated to the text input? This is Text Conditioning Collapse. Refund guide.',
    technicalTerm: 'Text Conditioning Collapse',
    risk: 'CRITICAL',
    shortDesc: 'Runway output ignores the prompt entirely, producing generic motion unrelated to the requested subject, action, or scene.',
    longDesc:
      'Text Conditioning Collapse on Runway Gen-3 occurs when the text-encoder embedding fails to influence the diffusion process, resulting in output that ignores the prompt entirely. The model produces visually plausible motion — but the subject, action, environment, and style bear no relation to the input text. Distinct from partial prompt adherence: this is total collapse, where the output is indistinguishable from an unconditional sample.',
    symptoms: [
      'Output subject completely different from prompt subject',
      'Action described in prompt is absent',
      'Scene / environment unrelated to prompt',
      'Style descriptors (cinematic, anime, etc.) ignored',
      'Output resembles unconditional generation from the model',
    ],
    examples: [
      {
        prompt: '"Red sports car drifting around a mountain hairpin turn, golden hour, cinematic"',
        failure: 'Output shows a static landscape with no car, no motion, no hairpin road',
        timestamp: 'full duration',
      },
      {
        prompt: '"Anime-style girl with pink hair drinking tea in a Japanese cafe"',
        failure: 'Output is a photorealistic street scene with no person, no anime style, no cafe',
        timestamp: 'full duration',
      },
    ],
    refundStrength: 'HIGH — Total prompt-adherence collapse is the strongest refund case. Runway support cannot defend output that ignores the input entirely.',
    faq: [
      {
        q: 'Does Runway refund prompt-ignored generations?',
        a: 'Yes — Runway support recognises total text-conditioning collapse as a defect. Submit the prompt + output side-by-side and cite "Text Conditioning Collapse".',
      },
      {
        q: 'Why does Runway ignore prompts sometimes?',
        a: 'Gen-3 conditions the diffusion process on a text-encoder embedding. Under specific prompt structures (highly stylised, multi-clause, contradictory adjectives, or rare vocabulary), the embedding can collapse to a near-zero vector, causing the diffusion to produce an unconditional sample.',
      },
      {
        q: 'How do I avoid Runway prompt collapse?',
        a: 'Use concrete subject + action + environment + style in that order. Avoid contradictory adjectives ("photoreal cartoon"), rare proper nouns, and overly nested clauses. AVA flags prompt structures with high collapse risk before generation.',
      },
    ],
  },
  {
    slug: 'sora-face-distortion',
    title: 'OpenAI Sora Face Distortion — Refund Guide',
    metaTitle: 'Sora Face Distortion Refund — Identity Drift, Feature Morphing',
    metaDesc:
      'OpenAI Sora generated a clip where the subject\'s face distorts, morphs, or loses identity coherence across frames? This is Facial Identity Drift. Refund guide.',
    technicalTerm: 'Facial Identity Drift',
    risk: 'CRITICAL',
    shortDesc: 'Sora output shows face morphing, identity inconsistency, or feature distortion between frames within a single clip.',
    longDesc:
      'Facial Identity Drift on Sora occurs when the diffusion process fails to preserve the subject\'s facial geometry across the temporal axis. The model encodes identity through a low-dimensional latent that is supposed to remain stable across all frames of a single generation — but on close-up or rotating-head shots, this latent can drift, causing the subject to appear as multiple slightly-different people through the duration of the clip. Distinct from anatomy artifact: the face is anatomically valid in each frame, but the identity changes.',
    symptoms: [
      'Subject\'s eye color shifts mid-clip',
      'Nose or jawline geometry morphs between frames',
      'Subject appears to age or de-age within a single clip',
      'Identity drifts into a different person on profile turns',
      'Skin tone or facial proportions change without prompt direction',
    ],
    examples: [
      {
        prompt: '"Close-up of a woman smiling, slowly turning her head left to right, cinematic"',
        failure: 'Identity drifts into a visibly different person at 0:03 during the head turn',
        timestamp: '0:03',
      },
      {
        prompt: '"Portrait of an elderly man speaking to camera, warm lighting"',
        failure: 'Eye color shifts from brown to green at 0:02, jawline morphs at 0:04',
        timestamp: '0:02 → 0:04',
      },
    ],
    refundStrength: 'HIGH — Sora is marketed on character consistency. Identity drift on close-up paid output is a clear feature defect.',
    faq: [
      {
        q: 'Does OpenAI refund Sora identity drift failures?',
        a: 'Yes — submit the clip with timestamps where identity shifts. Cite "Facial Identity Drift" and reference the inconsistency between specific frames. Refunds for close-up character work on Sora are routinely approved.',
      },
      {
        q: 'Why does Sora change a subject\'s face mid-clip?',
        a: 'Sora\'s temporal attention has a finite receptive field; over long durations or fast head motion, the identity latent can drift outside its stable basin and resample to a nearby person in the model\'s training distribution. This is most likely on profile rotations and close-ups.',
      },
      {
        q: 'How do I prevent Sora face drift?',
        a: 'Keep clips under 4 seconds for close-up character work. Avoid fast head turns past 45°. Use reference-image grounding when available. AVA flags high-drift-risk prompt structures before generation.',
      },
    ],
  },
  {
    slug: 'veo-physics-collapse',
    title: 'Google Veo Physics Collapse — Refund Guide',
    metaTitle: 'Veo Physics Collapse Refund — Fluid Gravity Newtonian Failure',
    metaDesc:
      'Google Veo generated output where water flows upward, objects float, or physics breaks Newtonian rules? This is Physics Simulation Constraint Violation. Refund guide.',
    technicalTerm: 'Physics Simulation Constraint Violation',
    risk: 'MAJOR',
    shortDesc: 'Veo output violates fundamental physics — fluid inversion, floating objects, broken gravity, impossible collisions.',
    longDesc:
      'Physics Simulation Constraint Violation on Veo occurs when the diffusion model produces visually plausible motion that defies Newtonian mechanics. Veo markets itself on photorealism and physical realism — when paid output ships with water flowing upward, objects floating in air, or collisions producing no physical response, the failure is objectively verifiable and clearly model-attributable rather than user-prompt-attributable.',
    symptoms: [
      'Liquid flowing upward against gravity',
      'Solid objects floating without buoyancy or support',
      'Collisions producing no displacement or deformation',
      'Falling objects following non-parabolic trajectories',
      'Steam, smoke, or particles moving inconsistently with airflow',
    ],
    examples: [
      {
        prompt: '"Waterfall cascading down a granite cliff into a forest pool, photorealistic"',
        failure: 'Water visibly flows upward at 0:02 in the central column of the falls',
        timestamp: '0:02',
      },
      {
        prompt: '"Coffee being poured from a French press into a glass mug, slow motion"',
        failure: 'Stream stays in mid-air after the press is lifted; no continuous flow connection to mug',
        timestamp: '0:04',
      },
    ],
    refundStrength: 'HIGH — Physics violations are objectively verifiable and contradict Veo\'s marketed photorealism. Strong refund precedent.',
    faq: [
      {
        q: 'Will Google refund Veo physics failures?',
        a: 'Yes — physics violations are objectively verifiable and uniquely attributable to model failure. Submit with timestamp evidence and cite "Physics Simulation Constraint Violation". Veo support honours these tickets.',
      },
      {
        q: 'Why does Veo violate physics in output?',
        a: 'Like all video diffusion models, Veo has no explicit physics simulator — it learns motion statistically from training data. When prompts combine complex fluid dynamics with long duration (>4s) or specific viewing angles, the learned prior can collapse and produce physically impossible motion.',
      },
      {
        q: 'How do I avoid Veo physics collapse?',
        a: 'Keep fluid and collision-heavy clips short (≤4 seconds). Specify camera angle (top-down vs. side) explicitly. Avoid multi-body interactions in a single prompt. AVA pre-flights physics-risky prompts before you spend credits.',
      },
    ],
  },
  {
    slug: 'kling-watermark-bleed',
    title: 'Kling Watermark Bleed — Refund Guide',
    metaTitle: 'Kling Watermark Refund — Logo Persists After Pro Upgrade',
    metaDesc:
      'Kling AI generated a paid-tier video that still has the Kling watermark visible or bleeding into the frame? This is Watermark Removal Pipeline Failure. Refund guide.',
    technicalTerm: 'Watermark Removal Pipeline Failure',
    risk: 'MAJOR',
    shortDesc: 'Kling paid output retains the free-tier watermark, has watermark fragments bleeding into the frame, or shows the watermark intermittently.',
    longDesc:
      'Watermark Removal Pipeline Failure on Kling occurs when the post-processing step that strips the free-tier watermark from paid output silently fails or runs partially. Paid Kling subscribers should never see the Kling logo on their generated clips — when it appears, the customer paid for a clean output and received the free-tier product. This is a billing-grade defect with very strong refund precedent.',
    symptoms: [
      'Kling logo visible in the corner of paid output',
      'Watermark fades in and out across the duration',
      'Faint watermark ghost remains where it was stripped',
      'Watermark shows on first or last 5 frames only',
      'Logo bleeds into subject area mid-clip',
    ],
    examples: [
      {
        prompt: '"Cinematic drone shot over a mountain lake at sunrise" (Pro tier subscription)',
        failure: 'Kling watermark visible bottom-right throughout entire clip despite Pro account',
        timestamp: '0:00 → 0:05',
      },
      {
        prompt: '"Cat chasing a laser pointer in a living room" (Pro tier subscription)',
        failure: 'Watermark ghost visible at 0:01 and 0:04, fully cleaned in between',
        timestamp: '0:01, 0:04',
      },
    ],
    refundStrength: 'VERY HIGH — Watermark on paid output is a billing-grade defect. The customer paid the Pro/Premium price and received the free product.',
    faq: [
      {
        q: 'Does Kling refund watermark bleed on paid output?',
        a: 'Yes — submit the clip + Generation ID + confirmation of paid-tier subscription. Cite "Watermark Removal Pipeline Failure". Kling support classes this as a billing defect and refunds are routinely approved.',
      },
      {
        q: 'Why does Kling sometimes leave a watermark on paid output?',
        a: 'Kling renders watermarked output first and applies a separate stripping pass for paid users. Under load or on specific aspect ratios, the strip pass can fail silently or run partially, leaving the watermark fully or fragmentarily visible in the delivered file.',
      },
      {
        q: 'Can I check for watermark bleed before submitting a refund?',
        a: 'Yes — scrub through the clip frame by frame on the corners where the Kling watermark normally appears. AVA\'s post-generation scanner flags watermark presence in paid output automatically.',
      },
    ],
  },
  {
    slug: 'luma-prompt-adherence-failure',
    title: 'Luma Dream Machine Prompt Adherence Failure — Refund Guide',
    metaTitle: 'Luma Prompt Ignored Refund — Subject Action Style Discarded',
    metaDesc:
      'Luma Dream Machine generated a clip that ignores the prompt — wrong subject, wrong action, wrong style? This is Text Conditioning Drift. Refund guide.',
    technicalTerm: 'Text Conditioning Drift',
    risk: 'CRITICAL',
    shortDesc: 'Luma output partially or completely ignores the prompt — wrong subject, wrong action, wrong scene, or wrong style despite explicit specification.',
    longDesc:
      'Text Conditioning Drift on Luma Dream Machine occurs when the text-encoder conditioning fails to steer the diffusion process toward the prompt-specified subject, action, or scene. Unlike total collapse, Luma drift typically produces output that contains some prompt elements but discards others — a partial-attendance failure where the model commits to a different interpretation than the input requested. Most common on multi-element prompts with rare vocabulary or specific style descriptors.',
    symptoms: [
      'Wrong subject (cat instead of dog, etc.) despite explicit prompt',
      'Action described in prompt is absent or replaced with generic motion',
      'Scene environment is wrong (indoor instead of outdoor, etc.)',
      'Style descriptors (anime, watercolor, etc.) are ignored',
      'Multi-subject prompts collapse to single-subject output',
    ],
    examples: [
      {
        prompt: '"Watercolor-style golden retriever running on a beach at sunset"',
        failure: 'Output is photorealistic, the dog is standing not running, scene is in a park not beach',
        timestamp: 'full duration',
      },
      {
        prompt: '"Two children flying a kite in an open meadow, hand-drawn animation style"',
        failure: 'Output shows one child standing still in a forest, photorealistic',
        timestamp: 'full duration',
      },
    ],
    refundStrength: 'HIGH — Prompt-adherence failure on paid output is a clear feature defect. Luma support honours refund tickets that document specific divergence.',
    faq: [
      {
        q: 'Does Luma refund prompt-adherence failures?',
        a: 'Yes — submit the prompt and the output side-by-side, listing each prompt element the model discarded. Cite "Text Conditioning Drift". Luma support recognises this as a generation defect when documented specifically.',
      },
      {
        q: 'Why does Luma ignore parts of my prompt?',
        a: 'Luma\'s text encoder maps multi-clause prompts to a single conditioning vector. When clauses conflict in style (e.g. "watercolor + photorealistic"), describe rare subjects, or contain too many independent elements, the vector collapses toward the model\'s training prior — discarding the unusual elements.',
      },
      {
        q: 'How do I structure Luma prompts to maximize adherence?',
        a: 'Use single-clause prompts with subject + action + style in that order. Avoid contradictory descriptors. Test rare-vocabulary subjects with a reference image when possible. AVA pre-flights Luma prompts for drift risk before generation.',
      },
    ],
  },
  {
    slug: 'pika-physics-collapse',
    title: 'Pika Labs Physics Collapse — Refund Guide',
    metaTitle: 'Pika Physics Collapse Refund — Fluid Gravity Motion Failure',
    metaDesc:
      'Pika Labs generated a clip where physics breaks — fluid flows wrong, objects float, gravity inverts? This is Physics Simulation Constraint Violation. Refund guide.',
    technicalTerm: 'Physics Simulation Constraint Violation',
    risk: 'MAJOR',
    shortDesc: 'Pika output produces visually plausible motion that violates Newtonian mechanics — inverted fluid, floating objects, broken gravity, or massless collisions.',
    longDesc:
      'Physics Simulation Constraint Violation on Pika Labs occurs when the model produces output that ignores fundamental physics. Like other video diffusion models, Pika has no explicit physics engine — it learns motion statistically. On prompts involving fluid dynamics, gravity, or multi-body interactions, the learned prior can collapse and ship objectively impossible motion in paid output. Most common on Pika clips longer than 3 seconds with rapid scene motion.',
    symptoms: [
      'Water, rain, or snow flowing upward',
      'Heavy objects floating without support',
      'Collisions with no displacement, deformation, or sound implication',
      'Falling objects on inverted parabolic paths',
      'Cloth or hair physics moving in unnatural directions',
    ],
    examples: [
      {
        prompt: '"Glass of red wine being knocked over and spilling on a white tablecloth"',
        failure: 'Wine flows upward off the table instead of down; glass remains upright',
        timestamp: '0:02',
      },
      {
        prompt: '"Snow falling on a mountain village at night, peaceful"',
        failure: 'Snow falls upward toward the sky for the final 2 seconds',
        timestamp: '0:03 → 0:05',
      },
    ],
    refundStrength: 'HIGH — Physics failures on paid Pika output are objectively verifiable and clearly attributable to model error, not user input.',
    faq: [
      {
        q: 'Does Pika refund credits for physics-violation output?',
        a: 'Yes — Pika support honours refund tickets when physics violations are documented with timestamp evidence. Cite "Physics Simulation Constraint Violation" and include the Generation ID.',
      },
      {
        q: 'Why does Pika produce physically impossible motion?',
        a: 'Pika\'s motion prior is learned from training video. On prompts with rare physical setups (fluid + gravity + impact in <5 seconds), the model statistically interpolates rather than simulates — producing motion that looks plausible frame-by-frame but breaks Newtonian rules over time.',
      },
      {
        q: 'How do I avoid Pika physics collapse?',
        a: 'Keep fluid-heavy clips under 3 seconds. Specify camera position explicitly. Avoid multi-body physical interactions in a single prompt. AVA flags physics-risk prompts before generation.',
      },
    ],
  },
  {
    slug: 'sora-text-rendering-failure',
    title: 'OpenAI Sora Text Rendering Failure — Refund Guide',
    metaTitle: 'Sora Text Rendering Refund — Garbled Letters & Wrong Words',
    metaDesc:
      'OpenAI Sora rendered text as garbled glyphs, wrong words, or unreadable letters in your paid clip? This is OCR-Coupled Token Drift. Refund guide.',
    technicalTerm: 'OCR-Coupled Token Drift',
    risk: 'MAJOR',
    shortDesc: 'Sora output contains visible text that is misspelled, illegible, or replaced with non-Latin pseudo-letterforms despite an explicit string in the prompt.',
    longDesc:
      'OCR-Coupled Token Drift on Sora occurs when the model attempts to render explicit text from the prompt but the diffusion process collapses character-level detail. Sora treats text as a visual texture rather than a string, so prompt tokens for "OPEN" can render as "OPLN" or "OPΣN" with character drift increasing on letters wider than 4 chars. Most common on signage, book covers, and screens shown in the foreground.',
    symptoms: [
      'Words missing or duplicating letters (e.g. "COFFEE" → "COFFFE")',
      'Mixed Latin / non-Latin glyphs in a single word',
      'Letter shapes morph mid-clip',
      'Numbers swapped (e.g. "Exit 12" → "Exit 1Z")',
      'Sign content readable in early frames, unreadable by 0:03',
    ],
    examples: [
      {
        prompt: '"A neon sign that reads OPEN 24 HOURS in a rainy street"',
        failure: 'Sign reads "OPLN 24 HOLRS" — characters drift after first frame',
        timestamp: '0:01 → 0:05',
      },
      {
        prompt: '"Book cover with the title The Great Gatsby on a wooden desk"',
        failure: 'Title renders as "The Greaι Gatsby" with mixed Greek and Latin characters',
        timestamp: '0:00 → 0:04',
      },
    ],
    refundStrength: 'HIGH — Text rendering is a documented Sora weakness and OpenAI honours refund tickets when failure is shown in a still frame.',
    faq: [
      {
        q: 'Does OpenAI refund Sora credits for unreadable text?',
        a: 'Yes — submit a refund ticket citing "OCR-Coupled Token Drift" with the generation ID and a still frame. OpenAI support typically credits within 48 hours.',
      },
      {
        q: 'Why does Sora struggle to render readable text?',
        a: 'Sora has no explicit OCR head — text is rendered as visual texture through the same diffusion process that paints faces and clouds. Strings longer than 4 characters drift because per-character supervision is sparse in the training data.',
      },
      {
        q: 'How can I get Sora to render text correctly?',
        a: 'Use short strings (≤ 4 chars), keep text in the centre of frame, and avoid backgrounds with high visual entropy. AVA flags text-heavy prompts before generation.',
      },
    ],
  },
  {
    slug: 'sora-anatomy-artifact',
    title: 'OpenAI Sora Anatomy Artifact — Refund Guide',
    metaTitle: 'Sora Anatomy Refund — Extra Fingers, Limbs & Body Distortion',
    metaDesc:
      'OpenAI Sora generated a clip with extra fingers, doubled limbs, or impossible body geometry? This is Skeletal Prior Collapse. Refund guide with evidence template.',
    technicalTerm: 'Skeletal Prior Collapse',
    risk: 'CRITICAL',
    shortDesc: 'Sora output contains anatomically impossible human or animal bodies — extra fingers, doubled limbs, missing joints, or rotated skeletal connections — on paid output.',
    longDesc:
      'Skeletal Prior Collapse on Sora occurs when the model fails to maintain joint count and skeletal topology across frames. Sora learns body structure statistically from training video; under specific conditions (fast motion, multiple people, close-up of hands) the prior degenerates and produces output with 6 fingers, doubled arms, or limbs joined at impossible angles. Common in promotional clips of athletes, dancers, and crowd scenes.',
    symptoms: [
      'Six or seven fingers on a clearly framed hand',
      'Two left arms or two right legs on the same body',
      'Limbs joining torso at impossible angles (e.g. arm exits from waist)',
      'Joint flickering — knee or elbow appears and disappears between frames',
      'Crowd members merging into single multi-headed figure',
    ],
    examples: [
      {
        prompt: '"Pianist playing a Steinway grand piano, close-up of hands on keys"',
        failure: 'Right hand has 6 fingers throughout the clip, visible on the keys',
        timestamp: '0:00 → 0:05',
      },
      {
        prompt: '"Three friends laughing at a cafe table, candid shot"',
        failure: 'Centre friend has two left arms — one on the table, one gesturing',
        timestamp: '0:02',
      },
    ],
    refundStrength: 'HIGH — Anatomy artifacts on paid Sora output are visually undeniable and refund tickets are honoured by OpenAI support when timestamp evidence is provided.',
    faq: [
      {
        q: 'Does OpenAI refund Sora credits for anatomy artifacts?',
        a: 'Yes — submit a refund ticket citing "Skeletal Prior Collapse" with the generation ID and a still frame showing the artifact. Credit usually issues within 48 hours.',
      },
      {
        q: 'Why does Sora generate bodies with extra fingers or limbs?',
        a: 'Sora has no explicit skeletal model — body structure is learned statistically through diffusion. Under fast motion or hand close-ups, per-finger or per-joint detail is undertrained, so the prior produces a topologically wrong but locally plausible result.',
      },
      {
        q: 'How do I reduce anatomy artifacts on Sora?',
        a: 'Avoid extreme close-ups of hands and feet. Reduce motion magnitude. Specify visible body part counts ("two hands, five fingers each"). AVA flags hand-heavy and crowd prompts as anatomy-risk before generation.',
      },
    ],
  },
  {
    slug: 'sora-audio-sync-drift',
    title: 'OpenAI Sora Audio Sync Drift — Refund Guide',
    metaTitle: 'Sora Audio Sync Refund — Sound Lags or Leads Visual',
    metaDesc:
      'OpenAI Sora generated a clip where the audio drifts out of sync with the visual after a few seconds? This is Audio-Visual Temporal Misalignment. Refund guide.',
    technicalTerm: 'Audio-Visual Temporal Misalignment',
    risk: 'MAJOR',
    shortDesc: 'Sora-generated audio drifts out of sync with the visual stream — footsteps land before feet touch ground, voices precede or lag mouth movement, ambient cues misfire.',
    longDesc:
      'Audio-Visual Temporal Misalignment on Sora occurs when the generated audio track and visual track are produced as loosely coupled streams. Sora 2 introduced native audio generation but synchronisation is statistical, not strict. On longer clips (≥ 4 seconds) or scenes with multiple discrete audio events (footsteps, impacts, dialogue), the audio can lead or lag the visual by 100-500ms — small enough to be subconsciously jarring, large enough to fail any professional QC.',
    symptoms: [
      'Footstep audio fires before foot lands on the ground',
      'Door slam audio precedes the visual door closing',
      'Voice plays while mouth is closed or stationary',
      'Ambient audio (rain, traffic) starts or stops outside visual cue',
      'Drift increases over the duration of the clip',
    ],
    examples: [
      {
        prompt: '"A man walking down a wooden hallway, footsteps echoing"',
        failure: 'Footstep audio fires 200ms before each foot lands — gets worse over 5 seconds',
        timestamp: '0:01 → 0:05',
      },
      {
        prompt: '"Coffee shop scene, barista calling out an order"',
        failure: 'Barista voice plays for 1.2s while mouth is closed; mouth movement starts at 0:03',
        timestamp: '0:02 → 0:04',
      },
    ],
    refundStrength: 'HIGH — Audio sync is a marketed Sora 2 capability. Refund tickets citing temporal misalignment on paid clips are honoured with timestamp evidence.',
    faq: [
      {
        q: 'Does OpenAI refund Sora audio sync failures?',
        a: 'Yes — Sora support honours refunds when audio-visual misalignment is documented with paired timestamps (audio event time vs visual event time). Cite "Audio-Visual Temporal Misalignment" in the ticket.',
      },
      {
        q: 'Why does Sora audio drift out of sync?',
        a: 'Sora generates audio and visual through separate but cross-conditioned diffusion paths. There is no strict alignment constraint, so per-event timing drifts statistically — most visible on percussive events (footsteps, impacts) where 100ms is perceptible.',
      },
      {
        q: 'How do I avoid audio sync drift on Sora?',
        a: 'Keep clips short (≤ 4 seconds). Avoid scenes with multiple discrete audio events. Prefer continuous audio (music, ambient noise) over percussive cues. AVA flags percussive-heavy prompts as audio-sync risk.',
      },
    ],
  },
  {
    slug: 'veo-motion-failure',
    title: 'Google Veo Motion Failure — Refund Guide',
    metaTitle: 'Veo Motion Failure Refund — Stilted, Frozen, or Repeating Motion',
    metaDesc:
      'Google Veo generated a clip where motion stalls, repeats, or freezes mid-clip? This is Motion Prior Degeneration. Refund guide with evidence template.',
    technicalTerm: 'Motion Prior Degeneration',
    risk: 'MAJOR',
    shortDesc: 'Veo output contains stilted, repeating, or frozen motion segments — subjects move 1 second then freeze for 2, or loop the same 0.5s motion repeatedly.',
    longDesc:
      'Motion Prior Degeneration on Veo occurs when the temporal coherence model fails to maintain progressive motion across the clip duration. The model can lock into a short looping motion pattern, or simply stop generating new motion mid-clip while the visual remains rendered. Most common on Veo clips longer than 4 seconds with single-subject motion (dancing, walking, sports).',
    symptoms: [
      'Subject motion freezes mid-action while clip continues rendering',
      'Same 0.5-1.0 second motion clip loops 3+ times in the same shot',
      'Walking or running motion stutters — foot positions snap rather than transition',
      'Hand or face freezes while body continues moving (or vice versa)',
      'Final 1-2 seconds of clip are visibly slower than first 1-2 seconds',
    ],
    examples: [
      {
        prompt: '"Ballet dancer performing a pirouette in a sunlit studio"',
        failure: 'Dancer completes one rotation at 0:02, then freezes mid-rotation for remaining 3 seconds',
        timestamp: '0:02 → 0:05',
      },
      {
        prompt: '"Chef whisking eggs in a stainless steel bowl, kitchen scene"',
        failure: 'Whisking motion loops the same 0.8 second pattern 4 times in 4 seconds',
        timestamp: '0:00 → 0:04',
      },
    ],
    refundStrength: 'HIGH — Motion quality is a marketed Veo capability. Refund tickets citing motion-prior degeneration on paid output are honoured with timestamp evidence.',
    faq: [
      {
        q: 'Does Google refund Veo motion failures?',
        a: 'Yes — Veo support recognises motion-prior degeneration on paid clips as a defect. Cite "Motion Prior Degeneration" with the generation ID and timestamps of the freeze or loop.',
      },
      {
        q: 'Why does Veo motion freeze or loop?',
        a: 'Veo\'s temporal coherence model uses a learned motion prior that degenerates on long-duration prompts. The model can fall into a low-entropy looping state rather than committing to progressive motion, especially when prompt motion vocabulary is ambiguous.',
      },
      {
        q: 'How do I avoid Veo motion freezes?',
        a: 'Keep motion-heavy clips under 4 seconds. Specify motion progression explicitly ("starts at X, ends at Y"). Avoid prompts with cyclic motion verbs (whisking, drumming, dancing) on long durations. AVA flags loop-risk prompts before generation.',
      },
    ],
  },
  {
    slug: 'kling-lip-sync-failure',
    title: 'Kling Lip Sync Failure — Refund Guide',
    metaTitle: 'Kling Lip Sync Refund — Mouth Movement Misaligned with Audio',
    metaDesc:
      'Kling AI generated a clip where character mouth movement does not match the audio dialogue? This is Phoneme-Viseme Misalignment. Refund guide.',
    technicalTerm: 'Phoneme-Viseme Misalignment',
    risk: 'MAJOR',
    shortDesc: 'Kling output contains a speaking character whose mouth shape does not match the spoken phoneme — wrong mouth openness, wrong lip shape for the consonant or vowel being voiced.',
    longDesc:
      'Phoneme-Viseme Misalignment on Kling occurs when the visual mouth shape (viseme) fails to match the audio phoneme being spoken. Kling supports lip-sync workflows where users provide an audio track or a dialogue prompt — but the model\'s viseme generation is statistical and frequently produces wrong mouth shapes, particularly on bilabials (p, b, m) and rounded vowels (o, u, w). The result is uncanny dubbing-style speech.',
    symptoms: [
      'Mouth open during silence (consonant b, p, m has lips closed)',
      'Lips closed during open vowels (a, e, i)',
      'Mouth shape too small for loud or shouted dialogue',
      'Visible jaw motion with no audio to match',
      'Sync drift accumulates over 3+ seconds of dialogue',
    ],
    examples: [
      {
        prompt: '"A teacher saying \'Please open your books to page five\' at a chalkboard"',
        failure: 'Mouth open during "p" sounds and closed during "ee" — completely inverted',
        timestamp: '0:00 → 0:04',
      },
      {
        prompt: '"News anchor reading a headline about climate change"',
        failure: 'Lip motion stops at 0:02 while audio continues for full 5 seconds',
        timestamp: '0:02 → 0:05',
      },
    ],
    refundStrength: 'HIGH — Lip-sync is a marketed Kling capability for video dubbing and avatar use cases. Refund tickets with paired audio + still frame evidence are honoured.',
    faq: [
      {
        q: 'Does Kling refund credits for lip-sync failures?',
        a: 'Yes — Kling support honours refunds when phoneme-viseme misalignment is shown via paired audio timestamp + still frame. Cite "Phoneme-Viseme Misalignment" in the ticket.',
      },
      {
        q: 'Why does Kling mismatch mouth shapes to audio?',
        a: 'Kling\'s lip-sync head learns viseme generation statistically from training video — without explicit phoneme-to-viseme rules. Bilabial closures and rounded vowels are undertrained, so the model produces visually plausible but linguistically wrong mouth shapes.',
      },
      {
        q: 'How do I improve Kling lip-sync quality?',
        a: 'Keep dialogue clips short (≤ 3 seconds). Avoid consonant-dense words. Use side-profile framing where mouth shape is partially obscured. AVA flags dialogue-heavy prompts as lip-sync risk before generation.',
      },
    ],
  },
  {
    slug: 'veo-camera-motion-ignored-failure',
    title: 'Google Veo Camera Motion Ignored — Refund Guide',
    metaTitle: 'Veo Camera Motion Refund — Dolly Pan Crane Instruction Discarded',
    metaDesc:
      'Google Veo generated a clip where the requested camera motion (dolly, pan, crane, tracking shot) was ignored and the camera stayed static? This is Camera-Conditioning Failure. Refund guide.',
    technicalTerm: 'Camera-Conditioning Embedding Failure',
    risk: 'MAJOR',
    shortDesc: 'Veo output uses a static camera or generic camera motion instead of the dolly, pan, crane, or tracking shot specified in the prompt.',
    longDesc:
      'Camera-Conditioning Embedding Failure on Veo occurs when the camera-motion instructions in the prompt fail to influence the trajectory of the rendered virtual camera. Veo markets cinematographic camera control as a headline feature — dolly-ins, crane shots, tracking shots, push-pulls. When the model ignores these and falls back to a static or generic motion, paid output is a clear feature defect.',
    symptoms: [
      'Camera stays static despite explicit dolly / pan / crane request',
      'Camera motion direction is wrong (left when right was requested)',
      'Camera motion magnitude is far smaller than specified',
      'Camera motion happens but applied to wrong subject framing',
      'Tracking shot loses the subject within 1 second',
    ],
    examples: [
      {
        prompt: '"Slow dolly-in toward a chess piece on a wooden board, cinematic"',
        failure: 'Camera stays completely static for the full duration; no dolly motion',
        timestamp: '0:00 → 0:05',
      },
      {
        prompt: '"Tracking shot following a runner left-to-right through a forest path"',
        failure: 'Camera stays static and the runner exits frame at 0:02',
        timestamp: '0:00 → 0:03',
      },
    ],
    refundStrength: 'HIGH — Camera control is a marketed Veo capability. Refund tickets citing camera-conditioning failure on a paid generation are honoured.',
    faq: [
      {
        q: 'Does Google refund Veo camera motion failures?',
        a: 'Yes — Veo support recognises camera-conditioning failures on paid output as a defect. Cite "Camera-Conditioning Embedding Failure" with the prompt and a still showing static framing.',
      },
      {
        q: 'Why does Veo ignore camera motion sometimes?',
        a: 'Veo encodes camera instructions through a dedicated conditioning channel separate from the subject prompt. Under specific subject + motion combinations (especially close-up macro shots and abstract subjects), the camera channel can be down-weighted, producing static output.',
      },
      {
        q: 'How do I phrase camera motion to maximise Veo compliance?',
        a: 'State the camera motion FIRST, before subject. Use canonical cinematography vocabulary (dolly-in, dolly-out, crane up, push, pull, orbit). Avoid metaphorical motion verbs ("the camera dances"). AVA pre-flights camera-motion prompts.',
      },
    ],
  },
  {
    slug: 'pika-watermark-bleed',
    title: 'Pika Watermark Bleed — Refund Guide',
    metaTitle: 'Pika Watermark Refund — Free-Tier Watermark on Paid Output',
    metaDesc:
      'Pika Labs generated a paid clip that still has a watermark? This is Tier-Conditional Watermark Routing failure. Refund guide with template.',
    technicalTerm: 'Tier-Conditional Watermark Routing',
    risk: 'MAJOR',
    shortDesc: 'Pika Labs output retains a corner watermark or "Pika" branding even on paid Standard / Pro tier where the watermark is supposed to be stripped.',
    longDesc:
      'Tier-Conditional Watermark Routing on Pika occurs when the post-generation watermark-strip pipeline fails to read the user\'s subscription tier from the request envelope. The watermark is added during generation and removed in a post-process step keyed on subscription state. When the auth header race-condition fires (rare, but well-documented in Pika user reports), the strip step skips and a paid clip ships with the free-tier watermark visible.',
    symptoms: [
      'Pika logo visible in bottom-right corner on paid Standard/Pro output',
      'Faint watermark texture across the clip',
      'Watermark appears on some clips in a batch but not others (request-level race)',
      'Re-running the identical prompt produces watermark-free output',
    ],
    examples: [
      {
        prompt: '"A sailing yacht at sunset, slow dolly forward"',
        failure: 'Bottom-right Pika watermark visible throughout the 4-second clip',
        timestamp: '0:00 → 0:04',
      },
    ],
    refundStrength: 'HIGH — Pika support refunds watermark-on-paid as a billing error within 24h with the generation ID.',
    faq: [
      {
        q: 'Will Pika refund credits for watermarked paid output?',
        a: 'Yes — open a ticket citing "watermark on paid tier output" with the generation ID. Pika treats this as a billing-system bug and refunds credits without question.',
      },
      {
        q: 'Why does the Pika watermark sometimes appear on paid clips?',
        a: 'The watermark-strip step is keyed on subscription state read from request metadata. Under specific routing conditions the metadata read can fail-open and the strip step is skipped.',
      },
      {
        q: 'How do I avoid the Pika watermark bug?',
        a: 'Re-run the same prompt — the bug is request-level, not prompt-level. AVA flags watermark-present output before you publish.',
      },
    ],
  },
  {
    slug: 'kling-physics-collapse',
    title: 'Kling Physics Collapse — Refund Guide',
    metaTitle: 'Kling Physics Refund — Gravity, Mass, Collision Failures',
    metaDesc:
      'Kling generated a clip that violates basic physics — falling objects float, water doesn\'t splash, characters pass through walls? Refund guide with template.',
    technicalTerm: 'Physics Prior Degeneration',
    risk: 'MAJOR',
    shortDesc: 'Kling output violates Newtonian physics — gravity inverts, mass conservation breaks, characters phase through solid objects, or fluid dynamics fail.',
    longDesc:
      'Physics Prior Degeneration on Kling is a known weakness of Kuaishou\'s diffusion model — physics is encoded statistically through training video, not via a simulation prior. Under fast motion, multiple interacting objects, or fluid scenes, the model produces output that is visually plausible frame-by-frame but physically impossible across frames. Common in sports, cooking, and action prompts.',
    symptoms: [
      'Falling object hovers or accelerates upward',
      'Water splash dissipates before contact with surface',
      'Character passes through wall, floor, or door',
      'Thrown object changes mass mid-flight',
      'Liquid pours upward or stops mid-air',
    ],
    examples: [
      {
        prompt: '"A basketball player dunking, slow motion"',
        failure: 'Ball passes through the rim from above without contact',
        timestamp: '0:02',
      },
      {
        prompt: '"Hot coffee being poured into a cup"',
        failure: 'Coffee stream stops mid-air 5cm above the cup, then resumes',
        timestamp: '0:01',
      },
    ],
    refundStrength: 'MODERATE — Kling refunds physics-violation tickets when the failure is unambiguous and timestamped. Ambiguous physics edge-cases get debate from support.',
    faq: [
      {
        q: 'Does Kling refund credits for physics failures?',
        a: 'Yes for clear violations (objects passing through walls, gravity inversion). Open a ticket citing "Physics Prior Degeneration" with the timestamp.',
      },
      {
        q: 'Why does Kling produce physics-violating output?',
        a: 'Kling has no physics simulation — physics is encoded statistically through training video. Under fast motion or multi-object interaction the prior degenerates and produces locally plausible but globally impossible motion.',
      },
      {
        q: 'How do I reduce physics failures on Kling?',
        a: 'Avoid prompts with rapid object interaction (sports, splashing liquids, collisions). Slower motion + simpler scenes have a much higher success rate.',
      },
    ],
  },
  {
    slug: 'hailuo-physics-collapse',
    title: 'Hailuo (Minimax) Physics Collapse — Refund Guide',
    metaTitle: 'Hailuo Physics Refund — Minimax Physics Failures',
    metaDesc:
      'Minimax Hailuo generated a clip with gravity inversion or mass-conservation failures? Refund guide for paid output.',
    technicalTerm: 'Statistical Physics Prior Failure',
    risk: 'MAJOR',
    shortDesc: 'Minimax Hailuo output produces motion that violates basic physics — objects float, mass changes, fluids defy gravity — on paid output.',
    longDesc:
      'Statistical Physics Prior Failure on Hailuo is the same class of issue as Kling — Minimax\'s model has no physics simulation step. The model is particularly weak on multi-object scenes and fluid dynamics. Hailuo refund policy treats these as defects when timestamped and the prompt didn\'t explicitly request the impossible behaviour.',
    symptoms: [
      'Object falls upward or stops mid-fall',
      'Liquid pour discontinues',
      'Two objects pass through each other',
      'Character\'s feet float above the ground while walking',
    ],
    examples: [
      {
        prompt: '"A child throwing a ball into the air"',
        failure: 'Ball leaves hand, continues upward, exits frame — never falls',
        timestamp: '0:00 → 0:03',
      },
    ],
    refundStrength: 'MODERATE — Hailuo refunds clear physics violations on paid Pro tier output with timestamp evidence.',
    faq: [
      {
        q: 'Does Minimax refund Hailuo credits for physics failures?',
        a: 'Yes for unambiguous violations. Open a ticket citing physics-prior failure with the generation ID and a still.',
      },
      {
        q: 'Why does Hailuo violate physics?',
        a: 'Minimax\'s diffusion model encodes physics statistically through training video — there is no underlying physics engine. Under fast motion or fluid scenes the prior produces wrong output.',
      },
      {
        q: 'How do I avoid Hailuo physics failures?',
        a: 'Prefer slow, single-object scenes. Avoid liquids and collisions in the prompt. AVA pre-flights physics-risk prompts.',
      },
    ],
  },
  {
    slug: 'veo-face-distortion',
    title: 'Veo Face Distortion — Refund Guide',
    metaTitle: 'Google Veo Face Refund — Identity Drift & Feature Distortion',
    metaDesc:
      'Google Veo generated a clip where the face distorts mid-scene or changes identity across cuts? Refund guide for paid Veo output.',
    technicalTerm: 'Identity Embedding Drift',
    risk: 'CRITICAL',
    shortDesc: 'Google Veo output shows facial feature distortion mid-clip or identity change across cuts on paid output — face morphs subtly between frames or fully changes identity in a multi-shot prompt.',
    longDesc:
      'Identity Embedding Drift on Veo occurs because video diffusion models encode face structure as a regional likelihood prior rather than as a persistent identity embedding. Across frames, the per-frame face-likelihood prior re-rolls and the rendered face drifts in eye spacing, jaw shape, or skin texture. In multi-shot prompts the drift compounds across cuts and the character becomes unrecognisable. This is a critical defect for any branded or character-consistent use case.',
    symptoms: [
      'Eye spacing or jaw shape shifts between frames of a continuous shot',
      'Skin texture re-rolls — pore pattern changes per frame',
      'Character identity fully changes between two cuts of the same person',
      'Facial expression shifts independent of prompt direction',
    ],
    examples: [
      {
        prompt: '"Close-up of a woman smiling, then turning to the side"',
        failure: 'Jaw line and eye spacing visibly change during the turn — feels like two different people',
        timestamp: '0:02',
      },
    ],
    refundStrength: 'HIGH — Google Veo support refunds face-drift tickets on paid output when timestamps are provided.',
    faq: [
      {
        q: 'Does Google refund Veo credits for face distortion?',
        a: 'Yes — Veo treats identity drift on paid output as a defect. Cite "Identity Embedding Drift" with a still frame showing the change.',
      },
      {
        q: 'Why does Veo distort faces across frames?',
        a: 'Video diffusion has no persistent identity embedding — face structure is a per-frame likelihood prior that re-rolls. Across long clips or cuts, the rolls drift and identity changes.',
      },
      {
        q: 'How do I avoid Veo face drift?',
        a: 'Keep face on screen for shorter durations. Avoid cuts within a single generation. Use reference images where supported.',
      },
    ],
  },
  {
    slug: 'sora-camera-control-failure',
    title: 'Sora Camera Control Failure — Refund Guide',
    metaTitle: 'Sora Camera Refund — Camera Motion Ignored on Paid Output',
    metaDesc:
      'OpenAI Sora ignored your camera motion direction (dolly, pan, crane)? Refund guide for paid Sora camera-conditioning failures.',
    technicalTerm: 'Camera Conditioning Bypass',
    risk: 'MAJOR',
    shortDesc: 'OpenAI Sora ignores explicit camera motion direction (dolly-in, pan, crane, orbit) and produces a static or differently-moving shot.',
    longDesc:
      'Camera Conditioning Bypass on Sora occurs when the camera-motion conditioning channel is down-weighted relative to the subject prompt during generation. Sora encodes camera instructions separately from subject prompts; under certain prompt structures (especially when the subject prompt is long or visually complex) the camera channel can be effectively ignored. Result: you ask for a dolly-in and get a static medium shot.',
    symptoms: [
      'Prompt asks for dolly-in, output is locked-off static',
      'Prompt asks for orbit, output is a pan or no motion',
      'Camera motion magnitude is smaller than requested',
      'Camera motion direction is wrong (left instead of right)',
    ],
    examples: [
      {
        prompt: '"Slow dolly-in to a chef plating a dish in a fine-dining kitchen"',
        failure: 'Output is a locked-off medium shot — no dolly motion at all',
        timestamp: '0:00 → 0:05',
      },
    ],
    refundStrength: 'HIGH — OpenAI refunds Sora camera-conditioning failures on paid output with timestamp + prompt evidence.',
    faq: [
      {
        q: 'Does OpenAI refund Sora credits for ignored camera motion?',
        a: 'Yes — Sora camera-conditioning failures on paid output are honoured by OpenAI support when the prompt explicitly named the camera motion.',
      },
      {
        q: 'Why does Sora ignore camera motion?',
        a: 'Camera conditioning is a separate channel from the subject prompt. Under complex subject prompts the camera channel can be down-weighted to zero effective influence.',
      },
      {
        q: 'How do I make Sora respect camera motion?',
        a: 'Put the camera motion FIRST in the prompt before subject. Use canonical cinematography terms (dolly-in, dolly-out, crane up, orbit). Avoid combining camera motion with complex subject choreography.',
      },
    ],
  },
  {
    slug: 'luma-motion-failure',
    title: 'Luma Dream Machine Motion Failure — Refund Guide',
    metaTitle: 'Luma Motion Refund — Dream Machine Motion Drift & Stutter',
    metaDesc:
      'Luma Dream Machine output has stuttering motion, frozen frames, or motion drift on paid generation? Refund guide.',
    technicalTerm: 'Temporal Coherence Degradation',
    risk: 'MAJOR',
    shortDesc: 'Luma Dream Machine output exhibits motion stutter, frame freezing, or directional drift mid-clip on paid output.',
    longDesc:
      'Temporal Coherence Degradation on Luma occurs when the temporal attention window between frames partially collapses, causing the model to either freeze on a single frame for multiple time-steps or to drift motion direction without prompt change. This is particularly common past the 4-second mark on Dream Machine — the longer the clip, the more attention windows have an opportunity to degenerate.',
    symptoms: [
      'Mid-clip frame freeze for 200-500ms',
      'Motion direction changes without prompt change',
      'Motion stutter (forward, back, forward) in a clip that should be unidirectional',
      'Final second of a 5-second clip noticeably degraded vs first second',
    ],
    examples: [
      {
        prompt: '"A skateboarder rolling forward down a street"',
        failure: 'Skateboarder freezes at 0:03, resumes at 0:04 in a slightly different position',
        timestamp: '0:03',
      },
    ],
    refundStrength: 'HIGH — Luma refunds temporal-coherence failures on paid Dream Machine output with timestamps.',
    faq: [
      {
        q: 'Does Luma refund credits for motion stutter?',
        a: 'Yes — temporal coherence failures are refundable on paid output. Cite "Temporal Coherence Degradation" with the timestamp.',
      },
      {
        q: 'Why does Luma stutter or freeze mid-clip?',
        a: 'Temporal attention windows between frames partially collapse, causing the model to repeat or freeze on a single frame for multiple decoder steps.',
      },
      {
        q: 'How do I reduce Luma motion failures?',
        a: 'Keep clips under 4 seconds where possible. Avoid complex multi-direction motion in a single prompt. AVA pre-flights long-duration motion prompts.',
      },
    ],
  },
  {
    slug: 'seedance-prompt-adherence-failure',
    title: 'Seedance (ByteDance) Prompt Adherence Failure — Refund Guide',
    metaTitle: 'Seedance Prompt Refund — ByteDance Prompt Ignored on Paid Output',
    metaDesc:
      'ByteDance Seedance ignored major parts of your prompt on paid output? Refund guide for prompt-adherence failures.',
    technicalTerm: 'Cross-Attention Prompt Drop',
    risk: 'MAJOR',
    shortDesc: 'ByteDance Seedance produces output that ignores significant parts of the prompt — wrong subject, wrong setting, wrong action — on paid output.',
    longDesc:
      'Cross-Attention Prompt Drop on Seedance is a known limitation of ByteDance\'s diffusion model. The model uses a cross-attention text encoder to condition generation on the prompt; under specific prompt structures (long prompts, prompts with multiple subjects, or prompts mixing concrete + abstract concepts) the cross-attention can drop entire prompt clauses. The output then reflects only a subset of the prompt with the rest silently ignored.',
    symptoms: [
      'Output shows wrong subject (asked for cat, got dog)',
      'Setting completely different from prompt (asked for beach, got forest)',
      'Multiple-subject prompts produce only one subject',
      'Action verb ignored (asked for running, got standing)',
    ],
    examples: [
      {
        prompt: '"A red panda and a fox playing chess at a wooden table in a forest"',
        failure: 'Output shows a single red panda alone at a table — fox and chess board absent',
        timestamp: '0:00 → 0:05',
      },
    ],
    refundStrength: 'HIGH — ByteDance Seedance support refunds prompt-adherence failures on paid output with the prompt and output evidence.',
    faq: [
      {
        q: 'Does Seedance refund credits for ignored prompts?',
        a: 'Yes — prompt-adherence failures on paid Seedance output are refundable. Cite "Cross-Attention Prompt Drop" with the prompt and the failing clip.',
      },
      {
        q: 'Why does Seedance ignore parts of the prompt?',
        a: 'The cross-attention text encoder can drop entire prompt clauses under long or compositionally complex prompts. There is no signal in the output that this happened.',
      },
      {
        q: 'How do I improve Seedance prompt adherence?',
        a: 'Keep prompts short and single-subject. Put the most important element FIRST. Avoid mixing abstract and concrete concepts in the same prompt. AVA pre-flights compositional risk.',
      },
    ],
  },
];

export function getFailure(slug: string): FailureData | undefined {
  return FAILURES.find((f) => f.slug === slug);
}

// Cross-model failure clusters. Used by the page renderer to surface
// thematically-related failures on other models below the CTA. Routes
// internal PageRank between sibling pages (e.g. Sora watermark ←→ Runway
// watermark) rather than dumping all 32 other slugs as a flat grid.
export const FAILURE_CLUSTERS: Record<string, string[]> = {
  watermark: [
    'runway-watermark-bleed',
    'sora-watermark-bleed-failure',
    'kling-watermark-bleed',
    'pika-watermark-bleed',
  ],
  physics: [
    'runway-physics-collapse',
    'luma-physics-collapse',
    'sora-physics-collapse',
    'veo-physics-collapse',
    'pika-physics-collapse',
    'kling-physics-collapse',
    'hailuo-physics-collapse',
  ],
  face: [
    'runway-face-distortion',
    'luma-face-distortion',
    'seedance-face-distortion',
    'sora-face-distortion',
    'veo-face-distortion',
  ],
  text: [
    'runway-text-rendering-failure',
    'veo-text-rendering-failure',
    'kling-text-rendering-failure',
    'runway-hallucinated-text',
    'sora-text-rendering-failure',
  ],
  anatomy: [
    'runway-limb-artifact',
    'veo-hand-artifact',
    'kling-anatomy-artifact',
    'hailuo-anatomy-artifact',
    'sora-anatomy-artifact',
  ],
  promptAdherence: [
    'sora-prompt-adherence-failure',
    'runway-prompt-ignored-failure',
    'veo-camera-motion-ignored-failure',
    'luma-prompt-adherence-failure',
    'seedance-prompt-adherence-failure',
  ],
  camera: [
    'runway-camera-jitter',
    'luma-camera-path-drift',
    'hailuo-camera-shake-artifact',
    'veo-camera-motion-ignored-failure',
    'sora-camera-control-failure',
  ],
  motion: [
    'pika-motion-failure',
    'seedance-motion-drift',
    'kling-motion-blur-overload',
    'runway-temporal-flicker',
    'veo-motion-failure',
    'luma-motion-failure',
  ],
  audioLipSync: [
    'runway-audio-sync-drift',
    'veo-audio-generation-failure',
    'pika-lip-sync-failure',
    'luma-lip-sync-failure',
    'sora-audio-sync-drift',
    'kling-lip-sync-failure',
  ],
};

// Reverse map: slug → cluster name. Computed once at module load.
const SLUG_TO_CLUSTER: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const [cluster, slugs] of Object.entries(FAILURE_CLUSTERS)) {
    for (const s of slugs) map[s] = cluster;
  }
  return map;
})();

// Return up to `limit` sibling failures: explicit `relatedFailures` first,
// then cluster siblings, then same-model fillers. Excludes the input slug.
export function getRelatedFailures(slug: string, limit = 6): FailureData[] {
  const current = getFailure(slug);
  if (!current) return [];

  const seen = new Set<string>([slug]);
  const out: FailureData[] = [];

  const push = (s: string) => {
    if (seen.has(s) || out.length >= limit) return;
    const f = getFailure(s);
    if (!f) return;
    seen.add(s);
    out.push(f);
  };

  // 1. Explicit relatedFailures (highest authority)
  for (const s of current.relatedFailures ?? []) push(s);

  // 2. Cluster siblings (same failure type, different model — best SEO signal)
  const cluster = SLUG_TO_CLUSTER[slug];
  if (cluster) {
    for (const s of FAILURE_CLUSTERS[cluster]) push(s);
  }

  // 3. Same-model fillers (different failure type, same model)
  const model = slug.split('-')[0];
  for (const f of FAILURES) {
    if (f.slug.startsWith(model + '-')) push(f.slug);
  }

  // 4. Anything left to hit the limit
  for (const f of FAILURES) push(f.slug);

  return out;
}
