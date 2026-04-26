// middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { buildCSP } from '@/lib/csp';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const protectedPaths = ['/dashboard', '/vault'];
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isStaticPage = pathname.startsWith('/calculator') || pathname.startsWith('/comparisons');
  if (!isStaticPage) {
    supabaseResponse.headers.set('Content-Security-Policy', buildCSP());
    supabaseResponse.headers.set('X-Frame-Options', 'DENY');
    supabaseResponse.headers.set('X-Content-Type-Options', 'nosniff');
    supabaseResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    supabaseResponse.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  }

  return supabaseResponse;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|auth/callback|calculator|comparisons).*)',
};
