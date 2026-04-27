import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll().map(c => c.name);

  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  return NextResponse.json({
    user: user?.email ?? null,
    error: error?.message ?? null,
    cookieNames: allCookies,
    cookieCount: allCookies.length,
  });
}
