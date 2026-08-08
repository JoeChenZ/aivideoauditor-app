import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY ?? '';
const NOTIFY_TO = 'contact@aivideoauditor.com';
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

  // -- Notification email to Joe --
  const notifyPayload = {
    sender: { name: FROM_NAME, email: FROM_EMAIL },
    to: [{ email: NOTIFY_TO, name: 'AVA Orders' }],
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
        We&apos;ll send your secure payment link and next steps within 24 hours.<br/><br/>
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
  });
}
