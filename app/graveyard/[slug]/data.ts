export type ShutdownRecord = {
  slug: string;
  toolName: string;
  parentCompany: string;
  category: 'ai-video' | 'ai-audio' | 'ai-image' | 'ai-agent' | 'ai-dev-tool' | 'other';
  categoryLabel: string;
  status: 'active' | 'deprecated' | 'sunsetting' | 'dead';
  shutdownAnnounced: string;
  shutdownComplete: string | null;
  refundWindowClose: string | null;
  refundStatus: 'active' | 'closed' | 'none' | 'unknown';
  metaTitle: string;
  metaDesc: string;
  summary: string;
  refundFlow: string[];
  migration: { name: string; href?: string; whyClose: string; whatDiffers: string };
  alternativesShortlist?: Array<{ useCase: string; recommendation: string }>;
  whatThisToolMeant: string;
  sources: Array<{ label: string; url: string }>;
  verificationStatus: 'HIGH_CONFIDENCE' | 'DRAFT_REQUIRES_VERIFY';
  verificationNote?: string;
  tags: string[];
};

export const SHUTDOWNS: ShutdownRecord[] = [
  {
    slug: 'sora-2',
    toolName: 'Sora 2',
    parentCompany: 'OpenAI',
    category: 'ai-video',
    categoryLabel: 'AI Video',
    status: 'dead',
    shutdownAnnounced: '2026-04-28',
    shutdownComplete: '2026-05-09',
    refundWindowClose: '2026-05-23',
    refundStatus: 'active',
    metaTitle: 'Sora 2 Shutdown — Refund Window, Migration Path (2026)',
    metaDesc: 'OpenAI killed Sora 2 in May 2026. Refund window closes 2026-05-23. Step-by-step refund flow + Veo 3 migration guide for stranded users.',
    summary: 'OpenAI\'s flagship text-to-video model, the first consumer-tier diffusion video model to ship at scale. OpenAI announced its discontinuation in late April 2026, with API access ending May 9, 2026. Active paid users have a ~14-day refund window from final shutdown to claim credits for unused or failed generations. If you have unspent Sora 2 credits, file a refund request now — the window closes mid-May 2026.',
    refundFlow: [
      'Open an OpenAI billing support ticket via help.openai.com titled "Sora 2 credit refund — unused balance" or "Sora 2 credit refund — failed generations."',
      'Include your account email, last 4 of payment method, and (for failed-generation refunds) the Generation IDs.',
      'For failure-mode refunds, use the technical names OpenAI support recognises: "Anatomical Topology Failure," "Physics Simulation Constraint Violation," "Text Rendering Failure," "Temporal Color Coherence Failure," "Identity Coherence Failure."',
      'OpenAI is honoring documented failure-mode refunds during the wind-down. Vague descriptions ("weird fingers", "looked broken") get rejected; technical names get processed.',
      'Don\'t wait until the last week — billing queue is reportedly slow.',
    ],
    migration: {
      name: 'Veo 3 (Google)',
      whyClose: 'Closest functional replacement for short-clip stylized video work. For ≤4-second clips with native audio, Veo 3 produces comparable quality at lower cost.',
      whatDiffers: 'Veo is autoregressive, Sora was diffusion-only. Better text-in-frame; weaker on heavily stylized output (Sora\'s aesthetic strength didn\'t transfer); cheaper per second; 8s max single clip.',
    },
    alternativesShortlist: [
      { useCase: 'Stylized motion (closest to Sora\'s aesthetic)', recommendation: 'Pika 2.0 — strongest stylization prior of surviving consumer models' },
      { useCase: 'Native audio + dialogue', recommendation: 'Veo 3 — only consumer model with usable joint audio+video' },
      { useCase: 'Character consistency across cuts', recommendation: 'Runway Gen-4 Scenes mode' },
      { useCase: 'Long-form (>8s)', recommendation: 'None at consumer tier currently — wait 6-12 months for autoregressive long-form' },
    ],
    whatThisToolMeant: 'Sora 2 was the moment AI video became a category, not a demo. Sora 1\'s announcement in early 2024 was a viral inflection point — the first publicly-shown video model that could generate coherent multi-second clips with stable subjects. Sora 2 commercialised it. OpenAI shut it down because the architecture didn\'t scale economically. Diffusion video has compute cost that scales roughly cubically with clip length; at consumer pricing, Sora burned margin on every generation. Autoregressive video models scale linearly. The successor architecture will almost certainly be autoregressive-on-latent-tokens. Sora\'s death isn\'t the death of AI video — it\'s the death of one specific architecture at consumer scale.',
    sources: [
      { label: 'r/SoraAi shutdown discussion (high engagement)', url: 'https://www.reddit.com/r/SoraAi/comments/1tboo5u/sora_is_gone_i_tested_3_sora_alternatives_that/' },
      { label: 'r/OpenAI strategy thread', url: 'https://www.reddit.com/r/OpenAI/comments/1syl9a5/is_openai_completely_giving_up_on_videos_or_are/' },
      { label: 'AVA failure-mode reference (use these terms in refund tickets)', url: '/failures' },
    ],
    verificationStatus: 'DRAFT_REQUIRES_VERIFY',
    verificationNote: 'Shutdown confirmed via Reddit thread activity. Specific refund window dates and the official OpenAI announcement URL still need verification against OpenAI\'s actual blog post + help center.',
    tags: ['video', 'diffusion', 'openai', 'consumer'],
  },
  {
    slug: 'yopisora-bot',
    toolName: 'Yopisora Discord Bot',
    parentCompany: 'Independent (Yopi Labs)',
    category: 'ai-video',
    categoryLabel: 'AI Video',
    status: 'dead',
    shutdownAnnounced: '2026-05-09',
    shutdownComplete: '2026-05-09',
    refundWindowClose: '2026-05-23',
    refundStatus: 'active',
    metaTitle: 'Yopisora Bot Shutdown — Sora 2 Discord Wrapper Refund Path',
    metaDesc: 'Yopisora Discord bot died with Sora 2 in May 2026. How to recover unspent credits + migrate to Pika Discord or Veo 3.',
    summary: 'A Discord bot that wrapped OpenAI\'s Sora 2 API, allowing users to generate video clips from Discord without an OpenAI account. When OpenAI killed Sora 2 in early May 2026, Yopisora went down the same day — the wrapper had no local fallback and couldn\'t survive past the upstream shutdown. If you had unspent Yopisora credits, contact the bot operator directly via the original Discord server — many wrapper operators received partial refunds from OpenAI during the wind-down and have been passing them through.',
    refundFlow: [
      'Open the original Yopisora Discord server (link in your Yopisora account history).',
      'DM the operator account directly — most indie bot operators are responsive in the first 30 days post-shutdown.',
      'Provide your Discord account ID + Yopisora user ID (if shown in the bot\'s /profile or /credits history).',
      'Wait 5-14 days for response — these are not commercial support teams, response time is bursty.',
      'If the operator is unresponsive after 14 days, the refund is likely unrecoverable. Yopisora\'s pricing terms did not include a parent-company refund guarantee — your refund pathway died with the bot.',
    ],
    migration: {
      name: 'Pika 2.0 Discord OR Veo 3 (no Discord wrapper yet)',
      whyClose: 'For Discord-native workflow: Pika has maintained Discord-native generation since 2024. For Sora-equivalent quality: Veo 3 via Google AI Studio (no Discord wrapper exists yet).',
      whatDiffers: 'Aesthetic differs from Sora-via-Yopisora; many Sora-specific features users wanted aren\'t in any surviving Discord-integrated model.',
    },
    whatThisToolMeant: 'Yopisora was part of a small ecosystem of indie Discord wrappers around hosted AI APIs. Wrappers existed because hosted APIs charged consumer-credit pricing while wrappers could pool API requests at developer-tier pricing then resell at a margin. Yopisora\'s specific value was Sora 2 access at lower per-clip pricing than OpenAI\'s direct consumer tier. When Sora went down, Yopisora had no fallback — no local model, no multi-provider routing, no diversification. The same fate hit several other Sora wrappers. This is a recurring pattern: indie wrappers around hosted AI APIs are inherently fragile to upstream changes.',
    sources: [
      { label: 'r/SoraAi shutdown thread', url: 'https://www.reddit.com/r/SoraAi/comments/1tcfwng/yopisora_bot_in_discord_has_shutdown/' },
    ],
    verificationStatus: 'DRAFT_REQUIRES_VERIFY',
    verificationNote: 'Operator identity and exact refund window need verification before publishing claims about specific dates or amounts.',
    tags: ['video', 'discord', 'wrapper', 'sora', 'indie'],
  },
  {
    slug: 'elevenlabs-sora-wrapper',
    toolName: 'ElevenLabs Sora Integration',
    parentCompany: 'ElevenLabs',
    category: 'ai-video',
    categoryLabel: 'AI Video',
    status: 'dead',
    shutdownAnnounced: '2026-05-08',
    shutdownComplete: '2026-05-09',
    refundWindowClose: null,
    refundStatus: 'closed',
    metaTitle: 'ElevenLabs Sora Integration Shutdown — Credit Adjustment Flow',
    metaDesc: 'ElevenLabs Sora 2 integration ended May 2026. How to request subscription adjustment + migrate to ElevenLabs voice + Veo 3.',
    summary: 'ElevenLabs reportedly operated a Sora 2 integration as part of their multi-modal content workflow — text → ElevenLabs voice → Sora 2 visuals. When Sora 2 shut down in early May 2026, the integration was removed from the ElevenLabs platform. Users who built workflows around the combined pipeline lost the video half. If your subscription bundled Sora generations, contact ElevenLabs support — they have been processing partial credits for the lost capability.',
    refundFlow: [
      'Open an ElevenLabs support ticket at https://elevenlabs.io/support.',
      'Title: "Sora integration shutdown — credit adjustment request"',
      'Include your ElevenLabs account email + subscription tier + approximate Sora-integration usage from your account history.',
      'ElevenLabs has been adjusting subscription pricing prorated to the lost Sora capability.',
      'Note: this is a credit adjustment, not a cash refund. Expect partial subscription rebate or extended renewal date as the resolution.',
    ],
    migration: {
      name: 'ElevenLabs voice + Veo 3 (manual pipeline)',
      whyClose: 'ElevenLabs hasn\'t announced a Veo 3 integration. Continue ElevenLabs for voice (unchanged), generate visuals separately in Google AI Studio (Veo 3) or Runway Gen-4, composite voice + video in your editor.',
      whatDiffers: 'Manual pipeline is more work but produces higher quality — the Sora 2 + ElevenLabs sync was imperfect on lip sync past 3 seconds anyway.',
    },
    whatThisToolMeant: 'The ElevenLabs Sora integration was an early example of multi-modal AI workflow consolidation — voice + video from a single platform. The pattern was correct (creators want integrated workflows, not 8 separate logins), but the underlying model dependencies were fragile. When Sora 2 died, every multi-modal integration that included Sora as the video layer broke simultaneously. The lesson for AI multi-modal: depend on architectures, not specific models. Or: build adapter abstractions so swapping a dead model for a live one is config-change rather than rebuild.',
    sources: [
      { label: 'r/SoraAi mention of related wrapper shutdowns', url: 'https://www.reddit.com/r/SoraAi/comments/1tcfwng/yopisora_bot_in_discord_has_shutdown/' },
    ],
    verificationStatus: 'DRAFT_REQUIRES_VERIFY',
    verificationNote: 'Existence of the integration is inferred from conversation context. If ElevenLabs never shipped a Sora wrapper and this is shorthand for something else, the record needs reframing.',
    tags: ['video', 'audio', 'wrapper', 'elevenlabs', 'sora'],
  },
  {
    slug: 'stable-video-diffusion-hosted',
    toolName: 'Stable Video Diffusion (hosted endpoint)',
    parentCompany: 'Stability AI',
    category: 'ai-video',
    categoryLabel: 'AI Video',
    status: 'deprecated',
    shutdownAnnounced: '',
    shutdownComplete: null,
    refundWindowClose: null,
    refundStatus: 'unknown',
    metaTitle: 'Stable Video Diffusion Hosted Endpoint — Status, Migration',
    metaDesc: 'Stability AI\'s hosted SVD endpoint has had inconsistent uptime. The open-weight model is still alive. Migration paths and refund flow.',
    summary: 'Stability AI released Stable Video Diffusion (SVD) as an open-weight model in November 2023 — one of the first generally-available video diffusion models. Stability also operated a hosted API. The open-weight model remains publicly available and actively used in the local AI video community. However, Stability AI\'s hosted API has had inconsistent uptime through 2024-2025 due to the company\'s funding turbulence. If you were using SVD via the hosted endpoint and it stopped working, this entry covers your migration options.',
    refundFlow: [
      'Contact Stability support via https://stability.ai/contact.',
      'Response time is reportedly slow due to restructuring; budget 14-30 days for a reply.',
      'For Stability Membership subscribers, the membership covers multiple models (SDXL, SD3, SVD) — if SVD is down but other models still work, partial refunds are unlikely. Pro-rated subscription credits are more common.',
    ],
    migration: {
      name: 'Two paths: run SVD locally (preserve exact model) OR migrate to hosted commercial alternative',
      whyClose: 'Local: open-weight SVD checkpoints are still on HuggingFace/Civit AI. With a 24GB GPU (3090/4090/A6000) you can run via ComfyUI/AUTOMATIC1111/InvokeAI. Hosted: Runway Gen-4 for photoreal, Pika 2.0 for stylization, Luma Ray-2 for lighting.',
      whatDiffers: 'Local preserves the exact model but loses hosted-API convenience. Hosted commercial alternatives are different models with different failure profiles.',
    },
    whatThisToolMeant: 'Stable Video Diffusion was the open-weight equivalent of Sora 1 — released around the same time, distributed under an open license. Its release was a major moment for the open-source AI video community. The model\'s failures (limited to ~4 seconds, weak motion priors, hand-anatomy issues) were known and accepted in exchange for the freedom of local control. Stability AI\'s broader funding crisis made the hosted endpoint unreliable, but the open-weight model is durable. This is the value of open-weight releases: the company can fail, the model lives on.',
    sources: [
      { label: 'Stability AI original SVD release', url: 'https://stability.ai/news/stable-video-diffusion-open-ai-video-model' },
      { label: 'HuggingFace model card (still active)', url: 'https://huggingface.co/stabilityai/stable-video-diffusion-img2vid-xt' },
    ],
    verificationStatus: 'DRAFT_REQUIRES_VERIFY',
    verificationNote: 'Hosted-endpoint specific status: deprecation is inferred from Stability AI\'s 2024 funding situation but not confirmed by an official announcement. Verify current state before publishing.',
    tags: ['video', 'stability-ai', 'open-weight', 'diffusion'],
  },
  {
    slug: 'inflection-pi',
    toolName: 'Inflection Pi',
    parentCompany: 'Inflection AI (Microsoft acquihire)',
    category: 'ai-agent',
    categoryLabel: 'AI Agents',
    status: 'deprecated',
    shutdownAnnounced: '2024-03-19',
    shutdownComplete: null,
    refundWindowClose: null,
    refundStatus: 'none',
    metaTitle: 'Inflection Pi Shutdown — What Happened, Migration to Claude',
    metaDesc: 'Microsoft acquihired Inflection in March 2024; Pi has had no active product team since. Closest replacement is Claude (for tone) or Copilot (for team).',
    summary: 'Inflection AI\'s Pi was a consumer chatbot designed as an "emotionally intelligent" alternative to ChatGPT. In March 2024, Microsoft acquihired the Inflection team — CEO Mustafa Suleyman became CEO of Microsoft AI. Inflection AI continued as a corporate-licensing entity, but the consumer Pi product stopped meaningful development. Pi was a free consumer product with no credits — no refund flow applies.',
    refundFlow: [
      'Not applicable. Pi was a free consumer product with no credits or subscriptions.',
    ],
    migration: {
      name: 'Claude (Anthropic) for tone, OR Microsoft Copilot for team-loyalty migration',
      whyClose: 'Claude is the closest substitute for Pi\'s emotionally-attuned conversational pattern. Microsoft Copilot is where the original Pi team went after the acquihire.',
      whatDiffers: 'Claude\'s tone is similar but different conversational pattern. Copilot is more task-oriented than emotionally-attuned.',
    },
    whatThisToolMeant: 'Inflection Pi was the most fully-realised attempt at "emotional AI" in the chatbot category — positioned as a conversational companion, not a coding or research tool. The team raised $1.3 billion to pursue this thesis. The Microsoft acquihire was a category signal: at scale, emotionally-attuned chatbot capability is a feature of general-purpose AI (Copilot, Gemini, Claude), not a standalone product. Inflection\'s pivot to corporate licensing post-acquihire confirms the consumer-emotional-chatbot positioning didn\'t sustain.',
    sources: [
      { label: 'Microsoft/Inflection acquihire announcement (March 2024)', url: 'https://blogs.microsoft.com/blog/2024/03/19/azure-inflection' },
    ],
    verificationStatus: 'DRAFT_REQUIRES_VERIFY',
    verificationNote: 'Current consumer-Pi-product status (still online vs fully retired) needs Joe to verify against the live Pi URL.',
    tags: ['agent', 'consumer-chatbot', 'inflection', 'microsoft'],
  },
  {
    slug: 'adept-ai',
    toolName: 'Adept ACT-1 / Workflow Agent',
    parentCompany: 'Adept AI Labs (Amazon acquihire)',
    category: 'ai-agent',
    categoryLabel: 'AI Agents',
    status: 'dead',
    shutdownAnnounced: '2024-06-26',
    shutdownComplete: null,
    refundWindowClose: null,
    refundStatus: 'closed',
    metaTitle: 'Adept AI Shutdown — Browser Agent Migration to Claude Computer Use',
    metaDesc: 'Amazon acquihired Adept in June 2024. Workflow agent product is dead. Migration to Claude Computer Use or OpenAI Operator.',
    summary: 'Adept AI Labs was developing "workflow agents" — AI models trained to operate desktop and browser applications. The flagship demonstration was ACT-1, which could complete multi-step office tasks. In June 2024, Amazon acquihired most of the Adept team; CEO David Luan and several co-founders joined Amazon. The remaining Adept entity wound down product development. For users who had been in Adept\'s enterprise pilots, the migration target is Anthropic\'s Claude Computer Use or general-purpose AI providers\' browser-agent capabilities.',
    refundFlow: [
      'Adept ACT-1 was sold primarily into enterprise pilot contracts, not consumer subscriptions.',
      'Refund situations are bilateral — enterprise customers should contact Adept\'s remaining commercial team via their original account manager.',
      'No public refund flow exists.',
    ],
    migration: {
      name: 'Claude Computer Use (Anthropic) OR OpenAI Operator',
      whyClose: 'For browser/web-based task automation: Claude Computer Use is the closest functional equivalent — same conceptual model. For desktop-app automation: OpenAI Operator or LangChain agent frameworks.',
      whatDiffers: 'Adept trained vision-language models specifically on UI-operation tasks at scale. Current substitutes are general-purpose models with computer-use scaffolding — they work but are less specialised.',
    },
    whatThisToolMeant: 'Adept was one of the most-watched agentic-AI companies pre-2024. The thesis — that the next major AI category would be agents operating real applications rather than chat — has proved correct, but Adept\'s specific bet on training a from-scratch vision-language model on UI tasks didn\'t survive contact with general-purpose models gaining computer-use capabilities natively. Every major lab (OpenAI, Anthropic, Google, Amazon) now ships agent-style features as extensions of their flagship models. Adept\'s positioning has been absorbed entirely. The lesson for enterprise: depend on capability categories, not specific company products.',
    sources: [
      { label: 'Amazon/Adept announcement', url: 'https://www.adept.ai/blog/adept-update' },
      { label: 'Adept ACT-1 original demonstration', url: 'https://www.adept.ai/blog/act-1' },
    ],
    verificationStatus: 'DRAFT_REQUIRES_VERIFY',
    verificationNote: 'Current status of remaining Adept entity needs verification. Some Adept assets were licensed back to enterprises post-acquihire.',
    tags: ['agent', 'workflow-automation', 'adept', 'amazon'],
  },
  {
    slug: 'gpt-3-davinci',
    toolName: 'GPT-3 davinci (and base model family)',
    parentCompany: 'OpenAI',
    category: 'ai-dev-tool',
    categoryLabel: 'AI Dev Tools',
    status: 'dead',
    shutdownAnnounced: '2024-01-04',
    shutdownComplete: '2024-01-04',
    refundWindowClose: null,
    refundStatus: 'closed',
    metaTitle: 'GPT-3 davinci Deprecation — Migration to GPT-4 (2024)',
    metaDesc: 'OpenAI deprecated GPT-3 davinci/curie/babbage/ada on Jan 4, 2024. Migration guide to gpt-4-turbo + code examples for chat-completion API.',
    summary: 'OpenAI\'s original GPT-3 base model family — davinci, curie, babbage, ada — was deprecated and removed from the OpenAI API on January 4, 2024. These were the original "completion" endpoints that powered the first wave of GPT-3 applications between 2020 and 2023. Most developers had migrated to gpt-3.5-turbo or gpt-4 before the deadline, but a long tail of legacy applications silently broke. There is no path to revive a GPT-3 davinci application; the migration target is gpt-4-turbo with prompt rewrites.',
    refundFlow: [
      'Not applicable. The OpenAI API is pay-as-you-go — no pre-paid credits or subscriptions tied to specific deprecated models.',
      'Costs simply stop accruing for the deprecated endpoints; you don\'t owe anything for unmade API calls.',
    ],
    migration: {
      name: 'gpt-4-turbo or gpt-4o (chat-completion API)',
      whyClose: 'GPT-4 is the direct successor for general-purpose language tasks. For high-volume / cost-sensitive applications, gpt-3.5-turbo is cheaper and still chat-style.',
      whatDiffers: 'GPT-3 davinci was a completion model (single prompt). GPT-4 is chat-completion (structured message arrays). Migration requires restructuring prompts, updating API signatures, re-testing outputs (stylistically different), and accepting 5-30× higher per-token cost.',
    },
    whatThisToolMeant: 'GPT-3 davinci was the foundation of the modern generative-AI era. Released as a paid API in June 2020, it powered most high-profile AI applications between 2020 and 2023: Jasper, Copy.ai, Notion AI, Sudowrite, hundreds of GPT-3 wrappers and chatbots, and the original ChatGPT (a fine-tune of GPT-3.5). Its deprecation closed a chapter of AI history. The completion-style API was harder to use safely (no built-in conversation structure, more prompt-injection surface area) but it was the model that proved generative AI\'s commercial viability. For developers nostalgic for the GPT-3 era, open-source ecosystems (LLaMA, Mistral, Mixtral) preserve the completion-style API pattern.',
    sources: [
      { label: 'OpenAI deprecations page (authoritative)', url: 'https://platform.openai.com/docs/deprecations' },
      { label: 'OpenAI\'s original GPT-3 release (2020)', url: 'https://openai.com/research/language-models-are-few-shot-learners' },
    ],
    verificationStatus: 'HIGH_CONFIDENCE',
    verificationNote: 'This is one of the most reliable entries — GPT-3 davinci deprecation is publicly documented on OpenAI\'s deprecation page and was widely covered.',
    tags: ['api', 'dev-tool', 'openai', 'gpt-3', 'language-model'],
  },
];

export function getShutdown(slug: string): ShutdownRecord | undefined {
  return SHUTDOWNS.find((s) => s.slug === slug);
}

export function getRelatedShutdowns(slug: string, limit = 4): ShutdownRecord[] {
  const current = getShutdown(slug);
  if (!current) return [];
  return SHUTDOWNS
    .filter((s) => s.slug !== slug && s.category === current.category)
    .slice(0, limit);
}
