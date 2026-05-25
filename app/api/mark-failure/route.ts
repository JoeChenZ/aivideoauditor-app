// POST /api/mark-failure — extension records a user-tagged failure
// GET  /api/mark-failure — returns the calling user's failure history
//
// Auth: Bearer token (Supabase JWT) sent from the extension's content/background
// script. Cookie-session is also honored for direct-from-website calls.
// CORS: allows any chrome-extension:// origin plus the production web origins.

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createSbClient } from '@supabase/supabase-js';

const VALID_CATEGORIES = new Set([
  'limb_artifact',
  'temporal_incoherence',
  'physics_collapse',
  'face_distortion',
  'text_rendering_failure',
  'prompt_mismatch',
]);

const VALID_VENDORS = new Set([
  'luma', 'runway', 'sora', 'pika', 'kling', 'veo', 'hailuo', 'vidu',
]);

const ALLOWED_WEB_ORIGINS = new Set([
  'https://aivideoauditor.com',
  'https://www.aivideoauditor.com',
]);

function corsHeaders(origin: string | null): Record<string, string> {
  // Chrome-extension origins are wildcard-allowed (we only honor authed requests anyway)
  const isExtension = !!origin && origin.startsWith('chrome-extension://');
  const isWeb = !!origin && ALLOWED_WEB_ORIGINS.has(origin);
  const allowed = isExtension || isWeb ? origin! : 'https://www.aivideoauditor.com';
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

// Resolve the calling user from either Bearer JWT or cookie session.
async function resolveUser(req: NextRequest): Promise<{ id: string; email: string | null } | null> {
  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) {
    const jwt = auth.slice(7);
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anon) return null;
    const sb = createSbClient(url, anon, {
      global: { headers: { Authorization: `Bearer ${jwt}` } },
      auth: { persistSession: false },
    });
    const { data, error } = await sb.auth.getUser(jwt);
    if (error || !data.user) return null;
    return { id: data.user.id, email: data.user.email ?? null };
  }
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return { id: data.user.id, email: data.user.email ?? null };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req.headers.get('origin')) });
}

interface PostBody {
  vendor?: string;
  generation_id?: string;
  prompt_text?: string;
  category?: string;
  frame_ref?: string;
}

export async function POST(req: NextRequest) {
  const cors = corsHeaders(req.headers.get('origin'));
  const user = await resolveUser(req);
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401, headers: cors });

  let body: PostBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400, headers: cors });
  }

  const vendor = (body.vendor || '').toLowerCase().trim();
  const category = (body.category || '').toLowerCase().trim();
  if (!VALID_VENDORS.has(vendor)) {
    return NextResponse.json({ error: 'Invalid vendor', allowed: Array.from(VALID_VENDORS) }, { status: 400, headers: cors });
  }
  if (!VALID_CATEGORIES.has(category)) {
    return NextResponse.json({ error: 'Invalid category', allowed: Array.from(VALID_CATEGORIES) }, { status: 400, headers: cors });
  }

  // Use service role for the insert because the extension's Bearer JWT may not
  // have the right cookie context for PostgREST. RLS would also work via
  // postgrest, but service-role keeps the auth path uniform.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const sb = createSbClient(url, service, { auth: { persistSession: false } });
  const { error } = await sb.from('failure_log').insert({
    user_id: user.id,
    vendor,
    generation_id: body.generation_id?.slice(0, 200) ?? null,
    prompt_text: body.prompt_text?.slice(0, 4000) ?? null,
    category,
    frame_ref: body.frame_ref?.slice(0, 500) ?? null,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: cors });
  }
  return NextResponse.json({ ok: true }, { headers: cors });
}

// GET — list recent failures for the calling user.
// ?vendor=luma (optional filter), ?limit=100 (default 50, max 200)
export async function GET(req: NextRequest) {
  const cors = corsHeaders(req.headers.get('origin'));
  const user = await resolveUser(req);
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401, headers: cors });

  const { searchParams } = new URL(req.url);
  const vendor = searchParams.get('vendor');
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10) || 50, 200);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const sb = createSbClient(url, service, { auth: { persistSession: false } });
  let q = sb
    .from('failure_log')
    .select('id, vendor, generation_id, category, marked_at')
    .eq('user_id', user.id)
    .order('marked_at', { ascending: false })
    .limit(limit);
  if (vendor && VALID_VENDORS.has(vendor)) q = q.eq('vendor', vendor);
  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500, headers: cors });

  // Aggregate count by category — useful for the scorer
  const by_category: Record<string, number> = {};
  for (const row of data ?? []) {
    by_category[row.category] = (by_category[row.category] ?? 0) + 1;
  }

  return NextResponse.json({
    total: data?.length ?? 0,
    by_category,
    rows: data ?? [],
  }, { headers: cors });
}
