// Where sign-in lets you out.
//
// It used to send everybody to /admin and let the panel pass students on.
// The panel stopped doing that — being turned away now says who you are and
// why, which is right when you typed /admin and wrong as the first thing a
// student sees after signing in. So the decision is made here, once, by the
// only side that can see the profile.

import { NextResponse } from 'next/server';
import { currentProfile, homeFor } from '@/lib/supabase/server';
import { originOf } from '@/lib/origin';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const profile = await currentProfile();
  const where = !profile ? '/login'
    : profile.status !== 'approved' && !['owner', 'admin', 'editor'].includes(profile.role)
      ? '/waiting'
      : homeFor(profile);
  return NextResponse.redirect(new URL(where, originOf(request)));
}
