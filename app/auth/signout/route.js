// Signing out.
//
// A POST, not a link: a browser that prefetches links must never be able to
// end somebody's session by looking at a page.
//
// It also forgets this device for push (app/api/me/push): a phone signed out
// and left on a table must stop showing the last person's messages.

import { NextResponse } from 'next/server';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { originOf } from '@/lib/origin';

export async function POST(request) {
  const device = request.cookies.get('mp-push')?.value;
  if (device) {
    try {
      const me = await currentProfile();
      if (me) await supabaseAdmin().from('push_devices').delete().eq('id', device).eq('person', me.id);
    } catch { /* signing out never fails on this */ }
  }

  const sb = await supabaseServer();
  await sb.auth.signOut();
  const res = NextResponse.redirect(new URL('/login', originOf(request)), 303);
  if (device) res.cookies.delete('mp-push');
  return res;
}
