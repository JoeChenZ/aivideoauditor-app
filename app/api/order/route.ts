import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY ?? '';
// contact@aivideoauditor.com is a Hostinger mailbox nobody watches daily.
// joejoego23@gmail.com is the inbox Joe actually reads — a first paying customer
// must not sit unseen in an unmonitored mailbox.
const NOTIFY_TO = ['contact@aivideoauditor.com', 'joejoego23@gmail.com'];
const FROM_EMAIL = 'hello@recommd.com'; // Verified Brevo sender
const FROM_NAME = 'AIVideoAuditor Orders';

async function sendBrevoEmail(payload: object): Promise<void> {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Brevo error ${res.status}: ${text}`);
  }
}

async function addBrevoContact(email: string): Promise<void> {
  // Backstop: add customer email to Brevo contacts so no order is silently lost
  await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      updateEnabled: true,
      listIds: [2], // Default list — update list ID if needed
    }),
  });
  // Don't throw on contact add failure — it's a backstop, not critical path
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const {
    brandName,
    productDescription,
    style,
    quantity,
    rush,
    extraFormats,
    email,
    notes,
    total,
  } = body as Record<string, unknown>;

  // Always log the order as a backstop
  console.log('[Order received]', JSON.stringify(body, null, 2));

  // -- Durable persistence FIRST. Email is best-effort; the row is the record of truth.
  // Before this, an order existed only as a Brevo email + an ephemeral Vercel log line:
  // if Brevo failed, the customer saw "success" and the order vanished. (2026-09-13)
  let persistError: string | null = null;
  try {
    const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (SB_URL && SB_KEY) {
      const r = await fetch(`${SB_URL}/rest/v1/lead_signups`, {
        method: 'POST',
        headers: {
          apikey: SB_KEY,
          Authorization: `Bearer ${SB_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          email: String(email ?? 'unknown'),
          source: 'order',
          metadata: { brandName, productDescription, style, quantity, rush, extraFormats, notes, total },
        }),
      });
      if (!r.ok) throw new Error(`supabase ${r.status}: ${(await r.text()).slice(0, 200)}`);
    } else {
      throw new Error('Supabase env not configured');
    }
  } catch (err) {
    persistError = err instanceof Error ? err.message : String(err);
    console.error('[Order persist FAILED — order exists only in this log line]', persistError);
  }

  // -- Notification email to Joe --
  const notifyPayload = {
    sender: { name: FROM_NAME, email: FROM_EMAIL },
    to: NOTIFY_TO.map((e) => ({ email: e, name: 'AVA Orders' })),
    subject: `New AVA order from ${brandName} — qty ${quantity}`,
    htmlContent: `
      <h2>New Video Order</h2>
      <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
        <tr><td><b>Brand name</b></td><td>${brandName}</td></tr>
        <tr><td><b>Product description</b></td><td>${productDescription}</td></tr>
        <tr><td><b>Style</b></td><td>${style}</td></tr>
        <tr><td><b>Quantity</b></td><td>${quantity} video(s)</td></tr>
        <tr><td><b>Rush delivery</b></td><td>${rush ? 'Yes (+$30)' : 'No'}</td></tr>
        <tr><td><b>Extra formats</b></td><td>${extraFormats ? 'Yes (+$15)' : 'No'}</td></tr>
        <tr><td><b>Customer email</b></td><td>${email}</td></tr>
        <tr><td><b>Notes</b></td><td>${notes || '—'}</td></tr>
        <tr><td><b>Estimated total</b></td><td><strong>$${total}</strong></td></tr>
      </table>
    `,
  };

  // -- Customer confirmation email --
  const confirmPayload = {
    sender: { name: FROM_NAME, email: FROM_EMAIL },
    to: [{ email: email as string }],
    subject: 'We received your AIVideoAuditor order',
    htmlContent: `
      <p style="font-family:sans-serif;font-size:15px">
        Hi there,<br/><br/>
        We received your order for <strong>${quantity} video(s)</strong> for <strong>${brandName}</strong>.
        We&apos;ll be in touch with next steps. If we cannot produce a video we are happy to ship from your photo, we will tell you and refund you in full.<br/><br/>
        Heads up: your card statement will show the charge as <strong>FRESHVERDICT</strong> — that&apos;s our billing entity, so don&apos;t worry if the name looks different from AIVideoAuditor.<br/><br/>
        Questions? Reply to this email or reach us at
        <a href="mailto:contact@aivideoauditor.com">contact@aivideoauditor.com</a>.<br/><br/>
        — The AIVideoAuditor team
      </p>
    `,
  };

  let emailError: string | null = null;

  try {
    if (!BREVO_API_KEY) {
      throw new Error('BREVO_API_KEY is not set');
    }
    await Promise.all([
      sendBrevoEmail(notifyPayload),
      sendBrevoEmail(confirmPayload),
    ]);
    // Backstop: add customer to Brevo contacts list
    await addBrevoContact(email as string);
  } catch (err) {
    emailError = err instanceof Error ? err.message : String(err);
    console.error('[Order email failed — order still logged above]', emailError);
    // Fail-safe: still return success to user; order is logged
  }

  return NextResponse.json({
    success: true,
    ...(emailError ? { _emailWarning: 'Email send failed — order was logged' } : {}),
    ...(persistError ? { _persistWarning: 'Order not persisted to database' } : {}),
  });
}
