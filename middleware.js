// Keeps the session alive, and keeps an unapproved account out of the app.
//
// Supabase sessions expire; without a refresh on each request a student is
// signed out mid-lecture. This runs before every page, refreshes the token if
// it needs it, and writes the cookie back.
//
// It is also where approval is enforced. Row-level security already stops a
// `pending` account reading anything, but on its own that produces an app
// that looks normal and fails one button at a time: an empty feed, a
// composer that accepts a photograph and then refuses to post it. The check
// belongs in one place rather than at the top of every screen, because the
// screen somebody adds next month is the one that will forget it.

import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request) {
  let response = NextResponse.next({ request });

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return response;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (list) => {
          for (const { name, value } of list) request.cookies.set(name, value);
          response = NextResponse.next({ request });
          for (const { name, value, options } of list) response.cookies.set(name, value, options);
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Signed out, or already where an unapproved account is allowed to be.
  const path = request.nextUrl.pathname;
  const open = path === '/waiting' || path.startsWith('/login') || path.startsWith('/auth')
    || path.startsWith('/api/');
  if (!user || open) return response;

  const { data: profile, error } = await supabase
    .from('profiles').select('status, role').eq('id', user.id).maybeSingle();

  // Anything unexpected lets the request through. A failed lookup must never
  // be the reason somebody cannot open the app they were using a minute ago.
  if (error || !profile) return response;

  const staff = ['owner', 'admin', 'editor'].includes(profile.role);
  if (profile.status !== 'approved' && !staff) {
    const to = request.nextUrl.clone();
    to.pathname = '/waiting';
    to.search = '';
    return NextResponse.redirect(to);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|pdfjs|favicon.ico|manifest.webmanifest|.*\\.(?:png|jpg|svg|ico)$).*)',
  ],
};
