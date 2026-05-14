import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

type LeadCaptureBody = {
  email: string;
  source: string;
  metadata?: Record<string, unknown>;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export async function POST(req: NextRequest) {
  let body: LeadCaptureBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const email = (body.email || '').trim().toLowerCase();
  const source = (body.source || '').trim().slice(0, 64);

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  if (!source) {
    return NextResponse.json({ error: 'Missing source' }, { status: 400 });
  }

  const supabase = createClient();

  const { error } = await supabase.from('lead_signups').insert({
    email,
    source,
    metadata: body.metadata ?? {},
    utm_source: body.utm_source ?? null,
    utm_medium: body.utm_medium ?? null,
    utm_campaign: body.utm_campaign ?? null,
  });

  if (error) {
    // Duplicate (email, source) is silently treated as success — better UX than surfacing the error.
    // Postgres unique-violation error code is 23505.
    const errorCode = (error as { code?: string }).code;
    if (errorCode === '23505') {
      return NextResponse.json({ ok: true, alreadyRegistered: true });
    }
    // Other errors (table missing, RLS denied) — log and return 500.
    console.error('[lead-capture] supabase error', error);
    return NextResponse.json({ error: 'Could not save signup' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
