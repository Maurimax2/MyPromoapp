// Where the emailed link lands.
//
// Exchanges the code for a session, then makes sure the person has a profile.
// A profile is created `pending` — signing in is not the same as being let in,
// and an admin decides the difference. The exception is the staff listed in
// ADMIN_EMAILS, who are approved on sight so that somebody can let the first
// student in.
//
// Staff land in the panel, not the app. For now that is everyone who signs
// in: only the four of us use the web app, and we use it to load the
// content, so the tap on the emailed link should end at /admin.

import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { supabaseAdmin, staffEmails, syncStaffRole } from '@/lib/supabase/admin';
import { originOf } from '@/lib/origin';

const STAFF = ['owner', 'admin', 'editor'];

export async function GET(request) {
  const url = new URL(request.url);
  // See lib/origin.js: a redirect that changes host loses the session cookie
  // that was just written.
  const origin = originOf(request);
  const code = url.searchParams.get('code');
  if (!code) return NextResponse.redirect(new URL('/login', origin));

  const sb = await supabaseServer();
  const { error } = await sb.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(new URL('/login?e=1', origin));

  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.redirect(new URL('/login?e=1', origin));

  const admin = supabaseAdmin();
  const staff = staffEmails().includes((user.email || '').toLowerCase());

  let { data: profile } = await admin
    .from('profiles').select('role, status').eq('id', user.id).maybeSingle();

  if (!profile) {
    profile = {
      id: user.id,
      email: user.email,
      role: staff ? 'admin' : 'student',
      status: staff ? 'approved' : 'pending',
    };
    await admin.from('profiles').insert(profile);
  } else {
    profile = await syncStaffRole({ ...profile, id: user.id, email: user.email });
  }

  // The app, or the one screen an account waiting for approval can reach.
  // `next` is only honoured for staff and only as a path of our own, so a
  // crafted link cannot send somebody somewhere else.
  const next = url.searchParams.get('next');
  const asked = next && /^\/[a-z0-9/-]*$/i.test(next) ? next : null;
  const home = profile.status !== 'approved' && !STAFF.includes(profile.role) ? '/waiting'
    : asked && STAFF.includes(profile.role) ? asked
    : '/feed';
  return NextResponse.redirect(new URL(home, origin));
}
