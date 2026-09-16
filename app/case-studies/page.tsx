import { redirect } from 'next/navigation';

// Force a real server-rendered redirect (real HTTP Location header) instead
// of a statically-baked one, so non-JS clients (crawlers, curl) land on
// /studio too, not just JS-router navigations.
export const dynamic = 'force-dynamic';

// 2026-09-15: this section previously published "case studies" presented as
// real, anonymized AVA customers (with invented dollar-recovery figures and
// first-person quotes). AVA has zero real paying customers today, so that
// content was fabricated social proof and has been removed rather than
// rewritten — see MANDATE.md §3 (truthfulness gate: no fabricated results,
// no fake social proof, no made-up client names or metrics).
export default function CaseStudiesIndex() {
  redirect('/studio');
}
