// Study rooms: making one, joining one, leaving one, closing one.
//
// A room is a few people agreeing to be somewhere at the same time. It
// belongs to a promo and it ends — a room nobody closes is a dead channel a
// week later, which is how every student group chat dies.

import { NextResponse } from 'next/server';
import { currentProfile, isStaff } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

const allowed = (p) => !!p && (p.status === 'approved' || isStaff(p));

export async function POST(request) {
  const profile = await currentProfile();
  if (!allowed(profile)) {
    return NextResponse.json({ error: 'حسابك بانتظار الموافقة' }, { status: 403 });
  }
  if (!profile.promo) {
    return NextResponse.json({ error: 'لم تُحدَّد سنتك بعد' }, { status: 400 });
  }

  const { title, topic, module, capacity } = await request.json();
  const name = String(title || '').trim().slice(0, 90);
  if (!name) return NextResponse.json({ error: 'سمِّ الغرفة' }, { status: 400 });

  const size = Math.min(Math.max(Number(capacity) || 12, 2), 50);

  const db = supabaseAdmin();
  const { data: room, error } = await db.from('rooms').insert({
    promo: profile.promo,
    module: module || null,
    title: name,
    topic: String(topic || '').trim().slice(0, 200) || null,
    host: profile.id,
    capacity: size,
  }).select('id').single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Whoever opens a room is in it. A room with nobody in it is a mistake
  // waiting to be explained.
  await db.from('room_members').insert({ room: room.id, person: profile.id });

  return NextResponse.json({ id: room.id });
}

export async function PATCH(request) {
  const profile = await currentProfile();
  if (!allowed(profile)) return NextResponse.json({ error: 'غير مسموح' }, { status: 403 });

  const { id, join, close } = await request.json();
  if (!id) return NextResponse.json({ error: 'no room' }, { status: 400 });

  const db = supabaseAdmin();
  const { data: room } = await db.from('rooms')
    .select('id, host, promo, capacity, closed').eq('id', id).maybeSingle();
  if (!room) return NextResponse.json({ error: 'لا غرفة' }, { status: 404 });
  if (room.promo !== profile.promo && !isStaff(profile)) {
    return NextResponse.json({ error: 'ليست غرفة دفعتك' }, { status: 403 });
  }

  if (close !== undefined) {
    if (room.host !== profile.id && !isStaff(profile)) {
      return NextResponse.json({ error: 'المضيف وحده يغلق الغرفة' }, { status: 403 });
    }
    const { error } = await db.from('rooms').update({ closed: !!close }).eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  if (join) {
    if (room.closed) return NextResponse.json({ error: 'الغرفة مغلقة' }, { status: 409 });

    const { count } = await db.from('room_members')
      .select('*', { count: 'exact', head: true }).eq('room', id);
    const { data: already } = await db.from('room_members')
      .select('person').eq('room', id).eq('person', profile.id).maybeSingle();

    if (!already && (count || 0) >= room.capacity) {
      return NextResponse.json({ error: 'الغرفة ممتلئة' }, { status: 409 });
    }
    if (!already) {
      const { error } = await db.from('room_members').insert({ room: id, person: profile.id });
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }

  const { error } = await db.from('room_members')
    .delete().eq('room', id).eq('person', profile.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
