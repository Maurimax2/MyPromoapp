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

// An approval already checked, remembered for ten minutes so the profile is
// not read again on every screen — one database wait fewer per tap. Signed
// with a secret only the server has, so it cannot be written by hand; and
// short-lived, so an approval taken away still takes effect within minutes.
const PASS = 'mp-pass';
const PASS_FOR = 10 * 60;   // seconds

async function seal(text) {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) return null;
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`pass:${text}`));
  return btoa(String.fromCharCode(...new Uint8Array(mac))).replace(/[+/=]/g, (c) => ({ '+': '-', '/': '_', '=': '' })[c]);
}

async function passed(value, id) {
  const [who, until, mac] = String(value || '').split('.');
  if (!who || who !== id || !(Number(until) > Date.now() / 1000)) return false;
  const want = await seal(`${who}.${until}`);
  return !!want && want === mac;
}

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

  // getClaims reads the signed token locally where the project signs with
  // its own keys, and asks the auth server otherwise — the same check as
  // getUser, without the round trip when it can do without one. Either way
  // it refreshes an expiring session and writes the cookie back.
  const { data: signed, error: unsigned } = await supabase.auth.getClaims();
  let user = !unsigned && signed?.claims?.sub ? { id: signed.claims.sub } : null;
  // A token getClaims cannot read is not proof of being signed out; ask the
  // auth server before sending anybody to the door.
  if (!user) user = (await supabase.auth.getUser()).data?.user || null;

  // Already where somebody without an account is allowed to be. The API never
  // reaches here (see the matcher); it is listed anyway, because every route
  // behind it checks for itself and a redirect would answer a fetch with a
  // login page.
  const path = request.nextUrl.pathname;
  //
  // `/admin` is open here because the panel is its own door — a separate page
  // with a separate sign-in, which is the whole point of having two. Sending a
  // member of staff to the students' login instead would be the app linking to
  // the panel backwards, and it is the layout there that decides who gets in:
  // no profile shows the panel's own sign-in, a student is told plainly that
  // they are not staff.
  //
  // `/download` is where the APK is handed out, to people with no account yet.
  //
  // `/privacy`, `/terms`, `/support` and `/delete-account` are read by the app
  // stores' reviewers and by anybody deciding whether to sign up, so they
  // cannot sit behind a sign-in.
  //
  // `/feedback` is the pre-launch page: it is opened from a WhatsApp message
  // by students who have no account at all, which is the entire point of it.
  // Sending them to the door would be asking them to sign up before they are
  // allowed to say whether they want the thing.
  const open = path === '/waiting' || path === '/feedback'
    || path === '/privacy' || path === '/delete-account' || path === '/download'
    || path === '/terms' || path === '/support'
    || path.startsWith('/login') || path.startsWith('/auth')
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
    // A link somebody sent — a private room — must survive the sign-in it
    // sends them through, or the friend lands on الرئيسية and the invitation
    // is lost. Only the rooms' door is remembered: anywhere else is just home.
    const back = path.startsWith('/rooms/join/') ? `${path}${request.nextUrl.search}` : null;
    to.pathname = '/login';
    to.search = back ? `?next=${encodeURIComponent(back)}` : '';
    return NextResponse.redirect(to);
  }

  if (await passed(request.cookies.get(PASS)?.value, user.id)) return response;

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

  const until = Math.floor(Date.now() / 1000) + PASS_FOR;
  const mac = await seal(`${user.id}.${until}`);
  if (mac) {
    response.cookies.set(PASS, `${user.id}.${until}.${mac}`, {
      httpOnly: true, sameSite: 'lax', secure: request.nextUrl.protocol === 'https:', path: '/', maxAge: PASS_FOR,
    });
  }
  return response;
}

// On Vercel this runs as a function of its own, before the page's, and the free
// plan's limit is function CPU (owner, 2026-11: Vercel nearly stopped the app).
// So it runs only where it does something — a screen somebody navigates to.
//
// Not on /api: every route checks the session itself, and a route handler can
// write a refreshed cookie back. It used to run here first and then wave the
// request through, paying the same check twice on every call.
//
// Not on a file. Every `.glb`, `.json` and `.bin` of the anatomy viewer went
// through this one by one — a lesson is a dozen files, each a sign-in check —
// and so did the planches, pdf.js and tesseract. They are public files; there
// is nothing to guard. `webp` and `jpeg` were once missing too, which is why
// the pre-launch page's screenshots came back as a redirect to the door.
// `robots.txt` was sent to the door as well, so a crawler never read it.
//
// Not on a prefetch. The bottom bar's tabs prefetch their loading screen, and
// no layout above a loading screen reads the session (only /admin's does, and
// nothing prefetches the panel).
//
// `sw.js` is the push worker: the browser re-fetches it on its own schedule,
// and a redirect to the door in answer would break it.
export const config = {
  matcher: [
    {
      source: '/((?!api/|_next/static|_next/image|pdfjs|anatomy/|planches/|tesseract|tessdata|favicon.ico|manifest.webmanifest|sw.js|robots.txt|.*\\.(?:png|jpg|jpeg|webp|gif|svg|ico|apk|exe|glb|gltf|bin|json|wasm|js|mjs|map|txt|ttf|otf|woff|woff2|bcmap|pfb|gz|pdf|mp3|mp4|webm)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
