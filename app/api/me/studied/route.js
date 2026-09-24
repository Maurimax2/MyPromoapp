// «I studied» — sent by the phone when a lecture is opened or a question
// answered (lib/streak.js), and kept on the server so the streak survives a
// new phone and classmates can see it. Opening the app is never sent.

import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/supabase/server';
import { recordStudy } from '@/lib/days';

export const runtime = 'nodejs';

export async function POST(request) {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });
  if (me.status !== 'approved') return NextResponse.json({ ok: false });

  const { weight } = await request.json().catch(() => ({}));
  await recordStudy(me.id, me.promo, weight);
  return NextResponse.json({ ok: true });
}
