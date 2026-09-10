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

  // Already where somebody without an account is allowed to be. The API is
  // open here because every route behind it checks for itself, and a redirect
  // would answer a fetch with a login page.
  const path = request.nextUrl.pathname;
  //
  // `/admin` is open here because the panel is its own door — a separate page
  // with a separate sign-in, which is the whole point of having two. Sending a
  // member of staff to the students' login instead would be the app linking to
  // the panel backwards, and it is the layout there that decides who gets in:
  // no profile shows the panel's own sign-in, a student is told plainly that
  // they are not staff.
  const open = path === '/waiting' || path.startsWith('/login') || path.startsWith('/auth')
    || path.startsWith('/admin') || path.startsWith('/api/');
  if (open) return response;

  // Signed out. This used to fall through, on the understanding that every
  // screen sent people to the door itself — and اختبر نفسك did not, because
  // for months it was a static page reading a file and had nothing to check.
  // A stranger could open it and read the questions. Which is the whole
  // reason this belongs here and not on each screen: the one somebody adds
  // next month is the one that forgets.
  if (!user) {
    const to = request.nextUrl.clone();
    to.pathname = '/login';
    to.search = '';
    return NextResponse.redirect(to);
  }

  const { data: profile, error } = await supabase
    .from('profiles').select('status, role').eq('id', user.id).maybeSingle();

  // A failed lookup lets the request through. It must never be the reason
  // somebody cannot open the app they were using a minute ago.
  if (error) return response;

  // No row is not a failed lookup, it is a definite answer, and it used to
  // be treated as one of those "anything unexpected" cases and waved past.
  // Nobody without a profile is approved — that is what approval is written
  // in — so waving them past put them in an app where row-level security
  // answers every screen with nothing and no screen says why. /waiting is
  // where they belong, and reaching it is what writes their row and so puts
  // them in front of an admin.
  if (!profile) {
    const to = request.nextUrl.clone();
    to.pathname = '/waiting';
    to.search = '';
    return NextResponse.redirect(to);
  }

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
