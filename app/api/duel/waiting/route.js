import { NextResponse } from 'next/server';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { stage } from '@/lib/duel';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// How many duels are waiting on you.
//
// The number on الدراسة in the bottom bar, and the only number in that bar.
// "Waiting on you" means one of two things and nothing else: an invitation
// you have not answered, or a duel you have accepted and not yet played.
// A duel you are winning, or one you finished, is news — it does not get a
// badge, because a badge that is always lit is a badge nobody reads.
export async function GET() {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ waiting: 0 });

  const sb = await supabaseServer();
  const { data, error } = await sb.from('duels')
    .select('id, state, challenger, opponent, challenger_at, opponent_at, accepted_at')
    .or(`challenger.eq.${me.id},opponent.eq.${me.id}`)
    .limit(60);

  // A count is not worth an error page. Nothing shown beats a wrong number.
  if (error) return NextResponse.json({ waiting: 0 });

  const waiting = (data || [])
    .filter((d) => ['invited', 'play'].includes(stage(d, me.id)))
    .length;

  return NextResponse.json({ waiting });
}
