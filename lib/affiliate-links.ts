// Central affiliate-link registry.
//
// Affiliate programs are not joined yet, so every URL below points at the
// tool's public homepage as a placeholder. When a program is joined, replace
// the single `url` for that tool with the real tracking link — every page that
// links out reads from this map, so it is a one-line change per tool.
//
// All outbound links built from this map MUST render with
// rel="sponsored nofollow noopener" and target="_blank" (see AffiliateLink).

export type AffiliateTool = 'invideo' | 'pictory' | 'heygen' | 'synthesia' | 'fliki';

export type AffiliateEntry = {
  /** Display name used in copy + aria labels. */
  name: string;
  /** Outbound URL. TODO: replace with affiliate link once program joined. */
  url: string;
  /** One-line neutral descriptor (not marketing). */
  category: string;
};

export const AFFILIATE_LINKS: Record<AffiliateTool, AffiliateEntry> = {
  invideo: {
    name: 'InVideo AI',
    // TODO: replace with affiliate link once program joined
    url: 'https://invideo.io/',
    category: 'Prompt-to-video / template editor',
  },
  pictory: {
    name: 'Pictory',
    // TODO: replace with affiliate link once program joined
    url: 'https://pictory.ai/',
    category: 'Script / blog / long-form-to-video',
  },
  heygen: {
    name: 'HeyGen',
    // TODO: replace with affiliate link once program joined
    url: 'https://www.heygen.com/',
    category: 'AI avatar / talking-head',
  },
  synthesia: {
    name: 'Synthesia',
    // TODO: replace with affiliate link once program joined
    url: 'https://www.synthesia.io/',
    category: 'AI avatar / enterprise training video',
  },
  fliki: {
    name: 'Fliki',
    // TODO: replace with affiliate link once program joined
    url: 'https://fliki.ai/',
    category: 'Text-to-video / AI voiceover (TTS)',
  },
};

export function affiliate(tool: AffiliateTool): AffiliateEntry {
  return AFFILIATE_LINKS[tool];
}
