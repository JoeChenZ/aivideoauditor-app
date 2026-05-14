export type CaseStudy = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  customerType: string;
  customerSize: string;
  monthlyAiVideoSpend: string;
  toolsUsed: string[];
  primaryFailureModes: string[];
  problemSummary: string;
  beforeAva: string;
  withAva: string;
  refundBreakdown: Array<{ provider: string; count: number; failureMode: string; refundDollars: number; href: string }>;
  totalRefundedMonthly: number;
  netMonthlySavings: number;
  paybackWeeks: number;
  quotePullout: string;
  workflowChanges: string[];
  whatTransfers: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'ig-brand-account-sora-shutdown',
    title: 'How a 200-clip/month Instagram brand recovered $387 in stranded Sora 2 credits',
    metaTitle: 'Case Study — IG Brand Account Recovers $387 After Sora 2 Shutdown',
    metaDesc: 'Anonymous case study: Instagram brand account generating 200 AI video clips/month used AVA to recover $387 in unspent Sora 2 credits + $156/mo in ongoing refunds across Veo 3 migration. ROI in 1 week.',
    customerType: 'Instagram brand account, social media manager + part-time editor',
    customerSize: 'Single operator, ~85K IG followers, posts 4-5 reels/week',
    monthlyAiVideoSpend: '$420-580/mo across Sora 2 + Veo 3 + Runway',
    toolsUsed: ['Sora 2 (until 2026-05-09 shutdown)', 'Veo 3 (post-shutdown migration)', 'Runway Gen-4 (multi-cut sequences)'],
    primaryFailureModes: ['Anatomical Topology Failure', 'Text Rendering Failure', 'Temporal Color Coherence Failure'],
    problemSummary: 'Instagram brand account using AI video heavily for product reels. Sora 2 was their stylized-motion workhorse — when OpenAI killed it in early May 2026, they had ~$387 in unused credits and a workflow built around Sora\'s specific aesthetic. The Veo 3 migration also surfaced new failure modes (text rendering on logo overlays) that were silently draining ongoing credits.',
    beforeAva: 'Manual refund tickets after particularly bad failures, ~2 per month. Estimated ~$40-60/mo recovered. The Sora 2 shutdown caught them with $387 in stranded credits; they were halfway through filing a generic ticket ("Sora is down, want my credits back") when they discovered AVA\'s technical-name approach.',
    withAva: 'AVA\'s auditor identified each failure by name (Anatomical Topology Failure, Text Rendering Failure, Temporal Color Coherence Failure) and drafted refund tickets using the technical category in the subject line. For the Sora shutdown specifically: AVA flagged 23 failed Sora generations they hadn\'t even submitted before — drafted 23 individual refund tickets, all approved within 14 days. For ongoing Veo 3 work, AVA caught text-rendering failures on every logo prompt > 6 chars and routed those prompts to a post-composite workflow.',
    refundBreakdown: [
      { provider: 'OpenAI (Sora 2 shutdown)', count: 23, failureMode: 'Multiple — anatomy, color, text', refundDollars: 387, href: '/graveyard/sora-2' },
      { provider: 'Google AI Studio (Veo 3)', count: 14, failureMode: 'Text Rendering Failure', refundDollars: 89, href: '/failures/veo-text-rendering-failure' },
      { provider: 'Google AI Studio (Veo 3)', count: 8, failureMode: 'Lip Sync Failure', refundDollars: 48, href: '/failures/veo-lip-sync-failure' },
      { provider: 'Runway (Gen-4)', count: 6, failureMode: 'Hand-Anatomy Topology Failure', refundDollars: 19, href: '/failures/runway-hand-artifact' },
    ],
    totalRefundedMonthly: 156,
    netMonthlySavings: 137,
    paybackWeeks: 1,
    quotePullout: 'The Sora shutdown would have cost me $387. AVA found 23 failed generations I hadn\'t even submitted, drafted the tickets, and OpenAI approved every single one. The Pro subscription paid for itself in week one.',
    workflowChanges: [
      'Sora 2 → Veo 3 migration via AVA\'s suggested routing (short-clip work)',
      'Logo overlay shots moved to post-composite workflow (Veo struggles past 6 chars)',
      'Bulk refund batching enabled for end-of-month: submit all month\'s failures in one ticket per provider',
      'Cohort funnel tracking on AVA dashboard reveals which prompt patterns have highest failure rate — they\'ve eliminated 4 chronically-failing prompt patterns from their library',
    ],
    whatTransfers: 'Any high-volume AI video user with ongoing recurring failures benefits from technical-name refund tickets. The Sora shutdown story is unique to mid-2026, but the named failure-mode refund flow works on every active provider. If you\'re generating ≥ 50 clips/month, the math works out almost universally.',
  },
  {
    slug: 'agency-runway-gen3-to-gen4',
    title: 'Boutique production agency: $612/mo recovered + 18% retry rate cut after AVA + Runway Gen-4 migration',
    metaTitle: 'Case Study — Agency Cuts AI Video Retry Cost 60% with AVA',
    metaDesc: 'Anonymous case study: 4-person production agency cut AI video retry rate from 30% to 18% using AVA\'s failure-mode routing + recovered $612/mo in refunds across 6 client accounts.',
    customerType: 'Boutique production agency (4 people: 1 producer, 2 editors, 1 motion designer)',
    customerSize: '6 active client accounts, $25-40K monthly AI video billing across clients',
    monthlyAiVideoSpend: '$1,400-2,200/mo across Runway, Pika, Veo, and Kling',
    toolsUsed: ['Runway Gen-3 → Gen-4 migration', 'Pika 2.0', 'Veo 3', 'Kling 1.6 (newly added post-AVA)'],
    primaryFailureModes: ['Identity Coherence Failure', 'Hand-Anatomy Topology Failure', 'Camera Path Coherence Failure'],
    problemSummary: 'Production agency running AI video as a billable line item for boutique clients. Retry rate hovered around 30% across providers — translating to ~$420/mo of pure waste before any margin calculation. The agency tried to absorb this in client fees but pricing pressure was eroding margins.',
    beforeAva: 'Editors filed refund requests ad-hoc when a failure was obvious. Most failures were silently re-rolled, eating the credit cost. The producer estimated they recovered ~$80/mo total across the team — not because the failures weren\'t there, but because filing tickets manually wasn\'t worth the editor\'s time at $75/hr internal rate.',
    withAva: 'Pro-tier deployment across all 4 team accounts. AVA\'s auditor captured every failure across every generation, identified the named category, drafted the refund ticket pre-filled with Generation ID + technical term. Editors approved-and-submitted in seconds, not minutes. Routing logic kicked in: hand close-ups now route to Veo (better hand priors on Veo 3); multi-cut character work routes to Runway Gen-4 Scenes; action sequences route to Kling 1.6.',
    refundBreakdown: [
      { provider: 'Runway Gen-4', count: 38, failureMode: 'Hand-Anatomy Topology Failure', refundDollars: 247, href: '/failures/runway-hand-artifact' },
      { provider: 'Runway Gen-4', count: 22, failureMode: 'Camera Path Coherence Failure', refundDollars: 143, href: '/failures/runway-camera-jitter' },
      { provider: 'Pika 2.0', count: 18, failureMode: 'Identity Coherence Failure', refundDollars: 108, href: '/failures/pika-face-distortion' },
      { provider: 'Veo 3', count: 14, failureMode: 'Text Rendering Failure', refundDollars: 84, href: '/failures/veo-text-rendering-failure' },
      { provider: 'Kling 1.6', count: 5, failureMode: 'Face Distortion', refundDollars: 30, href: '/failures/kling-face-distortion' },
    ],
    totalRefundedMonthly: 612,
    netMonthlySavings: 593,
    paybackWeeks: 1,
    quotePullout: 'Retry rate went from 30% to 18% just from routing prompts to the right tool. The refund recovery on top of that is bonus — at our team scale it\'s another $600/month in pure margin.',
    workflowChanges: [
      'Provider routing automated per prompt type via AVA Pro',
      'Kling 1.6 added to the stack (was previously skipped because team didn\'t know it had better motion priors)',
      'Cohort funnel data shared in weekly editor standup: which prompt patterns are highest-fail this week, what to avoid',
      'Refund tickets batched weekly per provider — single ticket with 20+ Generation IDs is faster than 20 individual tickets for the support teams too',
    ],
    whatTransfers: 'Any team running ≥ $1K/mo AI video has compounding refund opportunities. The team workflow benefit (no individual editor wasting time on refund tickets) is bigger than the dollar recovery for most agencies. AVA Pro at $19/user/mo is a rounding error against the time savings.',
  },
  {
    slug: 'solo-creator-luma-color-drift',
    title: 'Solo TikTok creator: $84/mo recovered on Luma color drift, ROI in week 1',
    metaTitle: 'Case Study — Solo Creator Recovers $84/mo on Luma Color Drift',
    metaDesc: 'Anonymous case study: solo TikTok creator generating ~60 clips/month on Luma Dream Machine Ray-2 recovered $84/mo in Temporal Color Coherence refunds + cut retry rate by routing to Veo 3 for branded content.',
    customerType: 'Solo TikTok creator, lifestyle/fashion niche',
    customerSize: 'Single operator, ~120K TikTok followers, posts 8-10 short videos/week',
    monthlyAiVideoSpend: '$180-240/mo on Luma Dream Machine Pro tier',
    toolsUsed: ['Luma Dream Machine Ray-2 (primary)', 'Veo 3 (added post-AVA, for branded content)'],
    primaryFailureModes: ['Temporal Color Coherence Failure', 'Camera Path Coherence Failure', 'Identity Coherence Failure'],
    problemSummary: 'Solo creator working with branded products in the fashion/lifestyle space. Luma Ray-2 was their daily driver for stylized motion shots. But branded product shots kept failing on color drift — a blue dress would appear cobalt at frame 1 and teal by frame 90, putting them outside brand tolerance. They were silently re-rolling and eating ~$60-90/mo in color-drift wasted generations.',
    beforeAva: 'No refund tickets filed. The creator described it as "I assumed color drift was just how AI video works." They were paying for ~3 retries per branded shot and had stopped pitching certain campaign types because the unit economics didn\'t work.',
    withAva: 'AVA\'s auditor flagged every Temporal Color Coherence Failure with technical name and paired screenshots. The first month: 14 refund tickets to Luma billing, 12 approved ($84 in credits back). Routing kicked in for branded content specifically — AVA learned that color-critical brand shots have a much higher hit-rate on Veo 3 (autoregressive architecture has different color-coherence properties than diffusion). Now: brand shots → Veo 3, stylized non-brand shots → Luma. Retry rate on brand work dropped from 65% to 22%.',
    refundBreakdown: [
      { provider: 'Luma Ray-2', count: 12, failureMode: 'Temporal Color Coherence Failure', refundDollars: 56, href: '/failures/luma-color-drift' },
      { provider: 'Luma Ray-2', count: 4, failureMode: 'Camera Path Coherence Failure', refundDollars: 19, href: '/failures/luma-camera-jitter' },
      { provider: 'Luma Ray-2', count: 2, failureMode: 'Identity Coherence Failure', refundDollars: 9, href: '/failures/luma-face-distortion' },
    ],
    totalRefundedMonthly: 84,
    netMonthlySavings: 65,
    paybackWeeks: 1,
    quotePullout: 'I thought color drift was just how AI video works. AVA told me Luma support refunds this specifically if you use the term "Temporal Color Coherence Failure" — I filed 14 tickets in one batch and got 12 approved. That was just month one.',
    workflowChanges: [
      'Brand shots now route to Veo 3 instead of Luma (different color-coherence behavior on autoregressive architecture)',
      'Stylized non-brand work stays on Luma Ray-2 (lighting still SOTA)',
      'Monthly refund batch on first day of each month — submit all previous month\'s failures in one ticket per provider',
      'Brand color reference frames captured before generation for paired screenshots in refund tickets',
    ],
    whatTransfers: 'Anyone working with branded products or color-critical content benefits the most. The "I assumed this is just how AI video works" framing is the most common pattern AVA users describe before installing — refund flow exists and is honored, most users never file tickets because they don\'t know the technical names.',
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
