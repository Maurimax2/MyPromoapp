// «I am here, on this screen.» — sent by the phone every four minutes while the
// app is in front of somebody, and once when it is opened.
//
//   POST { path, opened?, platform? }  →  { waiting }
//
// It answers with the number of duels waiting on you, for the bottom bar. The
// bar used to ask for that itself, on its own call, right beside this one —
// two calls on every launch where one will do, on a free plan whose limit is
// the number of calls (owner, 2026-11: Vercel nearly stopped the app).
//
// Never a reason for anything to fail: a missing table, a refused write or a
// signed-out caller all answer with a quiet status, and the phone ignores it.

import { NextResponse } from 'next/server';
import { currentProfile, supabaseServer } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { screenOf } from '@/lib/activity';
import { waitingOn } from '@/lib/duel';

export const runtime = 'nodejs';

const PLATFORMS = ['app', 'desktop', 'pwa', 'web'];
const missing = (e) => /presence|app_opens|relation|does not exist|schema cache/i.test(e?.message || '');

export async function POST(request) {
  const me = await currentProfile();
  if (!me) return new NextResponse(null, { status: 204 });
  // Only people who are in: a pending or refused account is not «using the app».
  const staff = ['owner', 'admin', 'editor'].includes(me.role);
  if (me.status !== 'approved' && !staff) return new NextResponse(null, { status: 204 });

  // Counted while the presence is written; the answer waits for both.
  const counting = supabaseServer().then((sb) => waitingOn(sb, me.id)).catch(() => 0);
  const answer = async (status = 200) => (status === 200
    ? NextResponse.json({ waiting: await counting })
    : new NextResponse(null, { status }));

  const b = await request.json().catch(() => ({}));
  const screen = screenOf(b.path);
  const platform = PLATFORMS.includes(b.platform) ? b.platform : 'web';
  const now = new Date().toISOString();
  const db = supabaseAdmin();

  // Look first, then write — never ON CONFLICT against this schema.
  const { data: had, error } = await db.from('presence').select('opens').eq('person', me.id).maybeSingle();
  if (error) return answer(missing(error) ? 200 : 500);

  const opens = (had?.opens || 0) + (b.opened ? 1 : 0);
  if (had) {
    await db.from('presence').update({ promo: me.promo || null, screen, platform, seen_at: now, opens }).eq('person', me.id);
  } else {
    const { error: made } = await db.from('presence')
      .insert({ person: me.id, promo: me.promo || null, screen, platform, seen_at: now, first_seen: now, opens });
    // Two tabs racing to be first: the other one made the row.
    if (made?.code === '23505') {
      await db.from('presence').update({ screen, platform, seen_at: now }).eq('person', me.id);
    }
  }
  if (b.opened) {
    await db.from('app_opens').insert({ person: me.id, promo: me.promo || null, platform });
  }
  return answer();
}
