// The number on المحادثات in the bottom bar.
//
// The bar is in the root layout and is drawn on every screen, so the count
// cannot come down with the page — the layout would then have to read the
// session on every request, including /login and the panel. It is asked for
// here instead, once when the bar mounts and again whenever you change screen.

import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/supabase/server';
import { unreadFor } from '@/lib/chat';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const me = await currentProfile();
  // Signed out is zero, not an error: the bar asks before it knows whether
  // anybody is signed in, and a 401 in the console every time reads as a bug.
  if (!me) return NextResponse.json({ unread: 0 });

  return NextResponse.json({ unread: await unreadFor(me.id) });
}
