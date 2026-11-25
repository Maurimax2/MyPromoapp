import { NextResponse } from 'next/server';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { waitingOn } from '@/lib/duel';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// How many duels are waiting on you.
//
// The number on الدراسة in the bottom bar usually arrives with the heartbeat
// (/api/me/ping answers with it), so the app does not make two calls where one
// will do. This is asked only on the way out of a duel, which is where the
// number changes.
export async function GET() {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ waiting: 0 });
  return NextResponse.json({ waiting: await waitingOn(await supabaseServer(), me.id) });
}
