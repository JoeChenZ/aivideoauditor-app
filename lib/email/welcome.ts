/**
 * Welcome email sender for lead-capture form submissions.
 *
 * Degrades gracefully: if RESEND_API_KEY is not set, this is a no-op.
 * The lead row still lands in Supabase. Once Joe drops the env var into
 * Vercel, welcome emails activate automatically on the next deploy.
 *
 * Direct fetch to https://api.resend.com/emails — no SDK dependency.
 * Resend's API is small enough that wrapping it doesn't earn its keep.
 */

type WelcomeSource =
  | 'research-132-vendor-reviews'
  | 'billing-pattern-watch'
  | 'compare-index'
  | string;

type WelcomeArgs = {
  email: string;
  source: WelcomeSource;
};

type Copy = {
  subject: string;
  body: string;
};

function bodyFor(source: WelcomeSource): Copy {
  if (source === 'research-132-vendor-reviews') {
    return {
      subject: 'You\'re on the AIVideoAuditor corpus list',
      body:
`Hi — confirming you're on the list for the AIVideoAuditor 132-review
tagged corpus and the weekly vendor-change alerts.

What you'll get, in order:

  1. As soon as the tagged CSV is finalized (Trustpilot + Reddit
     cross-check, per-review category tags, verbatim quotes), you'll
     get a one-time link to download it.
  2. When a tracked AI-video vendor materially changes pricing,
     "unlimited" routing rules, refund policy, or filter rules
     mid-subscription, you get a short alert. No more than one per
     week.
  3. When AVA Pro opens to the waitlist, you get early access.

What you will NOT get:
  - Drip sequences
  - "Just checking in" emails
  - Marketing newsletters
  - Cross-promotion with other tools

Unsubscribe one-click from any email. If you want to reach me,
just reply to this address.

Joe
AIVideoAuditor
https://www.aivideoauditor.com/research/132-ai-video-vendor-reviews`,
    };
  }
  if (source === 'billing-pattern-watch') {
    return {
      subject: 'You\'re on the AIVideoAuditor vendor-change alert list',
      body:
`Hi — confirming you're on the weekly vendor-change alert list.

What you'll get:
  - One short alert per week, but only when a tracked AI-video vendor
    materially changes a policy: pricing, "unlimited" routing rules,
    refund window, NSFW filter behavior. If no vendor changed
    anything that week, no email.
  - The first alert ships as soon as the monitoring pipeline goes
    live. We're hand-tagging the source feeds now (Trustpilot,
    Reddit, public investigations) so the first alert is
    high-signal.

What you will NOT get:
  - Drip sequences
  - Product upsell emails
  - Affiliate cross-promo

Unsubscribe one-click from any email.

Joe
AIVideoAuditor
https://www.aivideoauditor.com/billing-pattern-watch`,
    };
  }
  return {
    subject: 'You\'re on the AIVideoAuditor list',
    body:
`Hi — confirming you're on the AIVideoAuditor list.

When we have something worth sending (early Pro access, the tagged
vendor corpus, or a material vendor policy change), you'll get a
short email. No drip, no marketing spam.

Unsubscribe one-click from any email.

Joe
AIVideoAuditor`,
  };
}

export async function sendWelcomeEmail({ email, source }: WelcomeArgs): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: true, skipped: true };
  }

  const from = process.env.RESEND_FROM || 'AIVideoAuditor <hello@aivideoauditor.com>';
  const { subject, body } = bodyFor(source);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ from, to: email, subject, text: body }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return { ok: false, error: `Resend ${res.status}: ${text.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'unknown' };
  }
}
