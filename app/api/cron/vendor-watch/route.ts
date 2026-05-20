import { NextRequest, NextResponse } from 'next/server';
import { createClient as createServerSupabase } from '@/lib/supabase/server';

/**
 * Vendor watch cron — daily scraper that detects new 1-star Trustpilot reviews
 * across the tracked vendor list and writes them to vendor_review_signals.
 * When the daily delta crosses a per-vendor threshold (default: ≥3 new 1-stars
 * in 24h, or ≥1 new 1-star naming a specific change keyword), it queues a
 * vendor-change alert in vendor_change_alerts.
 *
 * Schedule: 1× per day at 06:00 UTC (in vercel.json).
 * Auth: Vercel cron requests carry the CRON_SECRET as a Bearer token. We
 *   reject anything without it. Skeleton only — actual scraping disabled
 *   until the SCRAPER_ENABLED env var is set (graceful no-op).
 *
 * Operational notes:
 *   - This route is intentionally a SKELETON. Live scraping requires
 *     Trustpilot ToS clearance + careful bot-detection avoidance.
 *   - The fetch endpoints are stubbed to read from a per-vendor cache.
 *     Joe replaces with the actual scraping logic when ready.
 *   - The DB schema is documented inline below — Joe runs the SQL when
 *     wiring this up.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

type TrackedVendor = {
  slug: string;
  name: string;
  trustpilotUrl: string;
  // Keywords that indicate a vendor policy change worth alerting on:
  changeKeywords: string[];
};

const TRACKED_VENDORS: TrackedVendor[] = [
  {
    slug: 'higgsfield',
    name: 'Higgsfield',
    trustpilotUrl: 'https://www.trustpilot.com/review/higgsfield.ai',
    changeKeywords: ['unlimited', 'battery', 'cancel', 'refund denied', 'auto-renew', 'cost jumped'],
  },
  {
    slug: 'pollo',
    name: 'Pollo AI',
    trustpilotUrl: 'https://www.trustpilot.com/review/pollo.ai',
    changeKeywords: ['auto-renewed', 'unauthorized', 'refund minus', 'cancel button', 'service cut'],
  },
  {
    slug: 'krea',
    name: 'Krea',
    trustpilotUrl: 'https://www.trustpilot.com/review/krea.ai',
    changeKeywords: ['hidden cancel', 'auto-renewed', 'unlimited', 'workspace', 'downgrade'],
  },
  {
    slug: 'runway',
    name: 'Runway ML',
    trustpilotUrl: 'https://www.trustpilot.com/review/runwayml.com',
    changeKeywords: ['queue', 'wait', 'unlimited', 'plan removed', 'features removed', 'gen-4'],
  },
  {
    slug: 'luma',
    name: 'Luma AI',
    trustpilotUrl: 'https://www.trustpilot.com/review/lumalabs.ai',
    changeKeywords: ['cancel button', 'stripe', 'redirect', '404', 'credit interface'],
  },
];

type ScrapeResult = {
  vendor: string;
  newOneStars: number;
  changeKeywordHits: number;
  sampleReviewIds: string[];
};

async function scrapeVendorOneStars(_vendor: TrackedVendor): Promise<ScrapeResult> {
  // SKELETON: real scraping disabled until SCRAPER_ENABLED=true.
  // When wired, this function should:
  //   1. Fetch the vendor's Trustpilot 1-star page 1 (HTML or Trustpilot API).
  //   2. Parse out reviews newer than the last_scraped_at watermark.
  //   3. Match each new review body against vendor.changeKeywords.
  //   4. Return counts + a sample of review IDs for the alert body.
  //
  // For ops safety, the live implementation should:
  //   - Honor robots.txt + a 1 req/30s rate limit.
  //   - Use a rotating UA from a known-good list.
  //   - Cache the prior day's review IDs to detect deltas reliably.
  //   - Treat scrape failures as a non-event, not a zero-result.
  //
  // For now: return a zero result so the rest of the pipeline can be
  // exercised against a known-empty input.
  return { vendor: _vendor.slug, newOneStars: 0, changeKeywordHits: 0, sampleReviewIds: [] };
}

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const auth = req.headers.get('authorization');
  if (cronSecret) {
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === 'production') {
    // In prod, refuse to run if CRON_SECRET is unset — better to fail loudly
    // than to expose this endpoint without auth.
    return NextResponse.json({ error: 'CRON_SECRET not configured' }, { status: 500 });
  }

  const scraperEnabled = process.env.SCRAPER_ENABLED === 'true';
  if (!scraperEnabled) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      reason: 'SCRAPER_ENABLED not true — scaffold only',
      trackedVendors: TRACKED_VENDORS.map((v) => v.slug),
    });
  }

  const supabase = createServerSupabase();

  const results: ScrapeResult[] = [];
  for (const vendor of TRACKED_VENDORS) {
    const r = await scrapeVendorOneStars(vendor);
    results.push(r);

    // Persist the scrape outcome for diffing tomorrow.
    // Required SQL (run once before enabling):
    //
    //   create table if not exists vendor_review_signals (
    //     id bigserial primary key,
    //     vendor_slug text not null,
    //     scrape_run_at timestamptz not null default now(),
    //     new_one_stars int not null default 0,
    //     change_keyword_hits int not null default 0,
    //     sample_review_ids text[] not null default '{}'
    //   );
    //   create index on vendor_review_signals (vendor_slug, scrape_run_at desc);
    //
    //   create table if not exists vendor_change_alerts (
    //     id bigserial primary key,
    //     vendor_slug text not null,
    //     queued_at timestamptz not null default now(),
    //     reason text not null,
    //     evidence_review_ids text[] not null default '{}',
    //     sent_at timestamptz
    //   );
    //
    await supabase.from('vendor_review_signals').insert({
      vendor_slug: vendor.slug,
      new_one_stars: r.newOneStars,
      change_keyword_hits: r.changeKeywordHits,
      sample_review_ids: r.sampleReviewIds,
    });

    const threshold = parseInt(process.env.VENDOR_ALERT_THRESHOLD || '3', 10);
    if (r.newOneStars >= threshold || r.changeKeywordHits >= 1) {
      await supabase.from('vendor_change_alerts').insert({
        vendor_slug: vendor.slug,
        reason:
          r.changeKeywordHits >= 1
            ? `change-keyword hit (${r.changeKeywordHits})`
            : `volume threshold (${r.newOneStars} new 1-stars in 24h)`,
        evidence_review_ids: r.sampleReviewIds,
      });
    }
  }

  return NextResponse.json({
    ok: true,
    ranAt: new Date().toISOString(),
    vendorCount: TRACKED_VENDORS.length,
    results,
  });
}
