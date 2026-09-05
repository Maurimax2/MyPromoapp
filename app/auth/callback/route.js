// Where the emailed link lands.
//
// Exchanges the code for a session, then makes sure the person has a profile.
// A profile is created `pending` — signing in is not the same as being let in,
// and an admin decides the difference. The exception is the staff listed in
// ADMIN_EMAILS, who are approved on sight so that somebody can let the first
// student in.

import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { supabaseAdmin, staffEmails } from '@/lib/supabase/admin';

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  if (!code) return NextResponse.redirect(new URL('/login', url.origin));

  const sb = await supabaseServer();
  const { error } = await sb.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(new URL('/login?e=1', url.origin));

  const { data: { user } } = await sb.auth.getUser();
  if (user) {
    const admin = supabaseAdmin();
    const { data: existing } = await admin
      .from('profiles').select('id').eq('id', user.id).maybeSingle();

    if (!existing) {
      const staff = staffEmails().includes((user.email || '').toLowerCase());
      await admin.from('profiles').insert({
        id: user.id,
        email: user.email,
        role: staff ? 'admin' : 'student',
        status: staff ? 'approved' : 'pending',
      });
    }
  }

  return NextResponse.redirect(new URL('/feed', url.origin));
}
