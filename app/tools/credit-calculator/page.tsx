import { redirect } from 'next/navigation';

// Force a real server-rendered redirect (real HTTP Location header) instead
// of a statically-baked one, so non-JS clients (crawlers, curl) land on
// /studio too, not just JS-router navigations.
export const dynamic = 'force-dynamic';

// 2026-09-16: this calculator's entire premise was the retired BYOK/refund-
// recovery product — it estimated how much a user could recover in goodwill
// credits from third-party platforms (Runway/Luma/etc.) and netted that
// against an "AVA Pro" $19/mo subscription that no longer exists. AVA is now
// a done-for-you per-video studio ($59+/video); there is no per-video
// equivalent of "credit waste recovery," so the tool cannot be honestly
// re-priced — it was removed rather than rewritten, per the truthfulness
// gate applied to /case-studies on 2026-09-15. See drive-board/ava.md.
export default function CreditCalculatorPage() {
  redirect('/studio');
}
