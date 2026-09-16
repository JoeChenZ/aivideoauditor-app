import { redirect } from 'next/navigation';

// Force a real server-rendered redirect (real HTTP Location header) instead
// of a statically-baked one, so non-JS clients (crawlers, curl) land on
// /studio too, not just JS-router navigations.
export const dynamic = 'force-dynamic';

// 2026-09-16: this was the post-payment "Welcome to AVA Pro" thank-you page
// for the retired $19/mo subscription. It was already noindex'd and
// robots.ts-disallowed, and its only checkout path (/early-access) has had
// its founders'-round offer removed, so it is now unreachable by any live
// flow. Left in place it would silently welcome anyone who stumbles on the
// URL to a subscription that does not exist. See drive-board/ava.md.
export default function ProSuccessPage() {
  redirect('/studio');
}
