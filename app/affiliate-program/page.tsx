import { redirect } from 'next/navigation';

// Force a real server-rendered redirect (real HTTP Location header) instead
// of a statically-baked one, so non-JS clients (crawlers, curl) land on
// /studio too, not just JS-router navigations.
export const dynamic = 'force-dynamic';

// 2026-09-16: this page's entire premise — 30% recurring commission on "AVA
// Pro" ($19/mo) subscription signups, paid out via Stripe Connect over 24
// months — depended on a subscription tier that no longer exists. AVA is now
// a done-for-you per-video studio ($59+/video, one-time purchase, no
// recurring billing), so there is nothing left to compute a recurring
// commission on. No inbound-affiliate infrastructure (referral links,
// tracking, payouts) exists anywhere else in the codebase either — this page
// was the whole program. Rather than invent a new commission rate for the
// per-video model (not established anywhere in the repo/Stripe config), the
// page is removed, per the truthfulness gate applied to /case-studies on
// 2026-09-15. See drive-board/ava.md.
export default function AffiliateProgramPage() {
  redirect('/studio');
}
