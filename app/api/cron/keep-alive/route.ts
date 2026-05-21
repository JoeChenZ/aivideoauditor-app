import { NextRequest, NextResponse } from 'next/server';
import { createClient as createServerSupabase } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const auth = req.headers.get('authorization');
  if (cronSecret) {
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'CRON_SECRET not configured' }, { status: 500 });
  }

  const supabase = createServerSupabase();

  const probes: Array<{ table: string; ok: boolean; ms: number; error?: string }> = [];
  const tables = ['lead_signups', 'analytics_events', 'vendor_review_signals'];

  for (const table of tables) {
    const t0 = Date.now();
    const { error } = await supabase.from(table).select('*', { count: 'exact', head: true }).limit(1);
    probes.push({ table, ok: !error, ms: Date.now() - t0, error: error?.message });
  }

  return NextResponse.json({
    ok: probes.every((p) => p.ok),
    probes,
    ran_at: new Date().toISOString(),
  });
}
