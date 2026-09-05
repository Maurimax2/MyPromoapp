// Signing out.
//
// A POST, not a link: a browser that prefetches links must never be able to
// end somebody's session by looking at a page.

import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function POST(request) {
  const sb = await supabaseServer();
  await sb.auth.signOut();
  return NextResponse.redirect(new URL('/login', request.url), 303);
}
