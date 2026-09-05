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
import { supabaseAdmin, staffEmails } from '@/lib/supabase/admin';

const STAFF = ['owner', 'admin', 'editor'];

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  if (!code) return NextResponse.redirect(new URL('/login', url.origin));

  const sb = await supabaseServer();
  const { error } = await sb.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(new URL('/login?e=1', url.origin));

  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.redirect(new URL('/login?e=1', url.origin));

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
  } else if (staff && !STAFF.includes(profile.role)) {
    // The role used to be decided only when the row was first created, so a
    // profile made before ADMIN_EMAILS existed stayed a student forever and
    // its owner was posted to the feed on every sign-in. ADMIN_EMAILS is
    // server config nobody but us can set, so it is safe to apply every time.
    await admin.from('profiles')
      .update({ role: 'admin', status: 'approved' }).eq('id', user.id);
    profile = { ...profile, role: 'admin', status: 'approved' };
  }

  const home = STAFF.includes(profile.role) ? '/admin' : '/feed';
  return NextResponse.redirect(new URL(home, url.origin));
}
