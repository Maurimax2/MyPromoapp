// Signing out.
//
// A POST, not a link: a browser that prefetches links must never be able to
// end somebody's session by looking at a page.

import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { originOf } from '@/lib/origin';

export async function POST(request) {
  const sb = await supabaseServer();
  await sb.auth.signOut();
  return NextResponse.redirect(new URL('/login', originOf(request)), 303);
}
