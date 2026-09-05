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
  let { data: profile } = await admin
    .from('profiles').select('role').eq('id', user.id).maybeSingle();

  if (!profile) {
    const staff = staffEmails().includes((user.email || '').toLowerCase());
    const row = {
      id: user.id,
      email: user.email,
      role: staff ? 'admin' : 'student',
      status: staff ? 'approved' : 'pending',
    };
    await admin.from('profiles').insert(row);
    profile = row;
  }

  const home = STAFF.includes(profile.role) ? '/admin' : '/feed';
  return NextResponse.redirect(new URL(home, url.origin));
}
