import { redirect } from 'next/navigation';

// 2026-09-15: individual case-study pages previously presented fabricated
// "real AVA customer" testimonials (invented dollar-recovery figures, made-up
// first-person quotes). AVA has zero real paying customers, so this was fake
// social proof — removed rather than rewritten, per MANDATE.md §3
// (truthfulness gate). Any indexed /case-studies/<slug> URL now redirects to
// the current honest offer page.
export default function CaseStudyPage() {
  redirect('/studio');
}
