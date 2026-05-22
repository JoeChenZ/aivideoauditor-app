import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

const RECONCILE_URL = 'https://api.aivideoauditor.com/api/reconcile-pro-by-email';

// Fire-and-forget: link any pro_users row that was written by the Stripe
// webhook with this user's email but no user_id (one-time Founders Bundle
// purchases where the buyer wasn't logged in at checkout).
async function reconcileGuestPurchases(userId: string, email: string) {
  const token = process.env.ADMIN_MIGRATE_TOKEN;
  if (!token) {
    console.warn('[reconcile] ADMIN_MIGRATE_TOKEN not set, skipping');
    return;
  }
  try {
    const r = await fetch(RECONCILE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Token': token,
      },
      body: JSON.stringify({ user_id: userId, email }),
      // Never block login redirect on slow networks.
      signal: AbortSignal.timeout(2500),
    });
    if (!r.ok) {
      console.warn('[reconcile] non-200:', r.status, await r.text().catch(() => ''));
      return;
    }
    const j = await r.json().catch(() => ({}));
    if (j?.rowsLinked > 0) {
      console.log('[reconcile] linked', j.rowsLinked, 'pro_users row(s) to', userId);
    }
  } catch (err) {
    // Never break login on reconcile failure — log and move on.
    console.warn('[reconcile] error:', (err as Error)?.message);
  }
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const cookieStore = cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const userId = data?.user?.id;
      const userEmail = data?.user?.email;
      if (userId && userEmail) {
        await reconcileGuestPurchases(userId, userEmail);
      }

      const forwardedHost = request.headers.get('x-forwarded-host');
      if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`);
  }

  return NextResponse.redirect(`${origin}/login?error=no_code`);
}
