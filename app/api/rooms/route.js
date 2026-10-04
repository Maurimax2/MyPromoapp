// Study rooms: making one, joining one, leaving one, closing one.
//
// A room is a few people agreeing to be somewhere at the same time. It
// belongs to a promo and it ends — a room nobody closes is a dead channel a
// week later, which is how every student group chat dies.

import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { currentProfile, isStaff } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { friendsIn } from '@/lib/friends';
import { notifyMany } from '@/lib/notify';
import { later } from '@/lib/push';

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

  const { title, topic, module, capacity, private: wantsPrivate } = await request.json();
  const name = String(title || '').trim().slice(0, 90);
  if (!name) return NextResponse.json({ error: 'سمِّ الغرفة' }, { status: 400 });

  const size = Math.min(Math.max(Number(capacity) || 12, 2), 50);

  const db = supabaseAdmin();
  // A private room is entered with a link, and the link carries this: long
  // enough that it cannot be guessed, and unrelated to the room's number.
  const isPrivate = !!wantsPrivate;
  const code = isPrivate ? crypto.randomBytes(12).toString('base64url') : null;
  const { data: room, error } = await db.from('rooms').insert({
    promo: profile.promo,
    module: module || null,
    title: name,
    topic: String(topic || '').trim().slice(0, 200) || null,
    host: profile.id,
    capacity: size,
    ...(isPrivate ? { private: true, code } : {}),
  }).select('id').single();

  if (error) {
    const late = isPrivate && /private|code|schema cache/i.test(error.message);
    return NextResponse.json({ error: late ? 'الغرف الخاصة غير مفعّلة بعد — الصق supabase/rooms-private.sql في Supabase' : error.message },
      { status: late ? 503 : 500 });
  }

  // Whoever opens a room is in it. A room with nobody in it is a mistake
  // waiting to be explained.
  await db.from('room_members').insert({ room: room.id, person: profile.id });

  // A room is only worth opening if somebody comes: friends are asked. Not
  // for a private one — its whole point is that only the people sent the link
  // know it exists.
  if (!isPrivate) {
    await later(async () => {
      await notifyMany(await friendsIn(profile.id, profile.promo), {
        actor: profile.id, kind: 'friend_room', body: name, link: `/rooms/${room.id}`,
      });
    });
  }

  return NextResponse.json({ id: room.id, code });
}

export async function PATCH(request) {
  const profile = await currentProfile();
  if (!allowed(profile)) return NextResponse.json({ error: 'غير مسموح' }, { status: 403 });

  const { id, join, close, here, code } = await request.json();
  if (!id) return NextResponse.json({ error: 'no room' }, { status: 400 });

  const db = supabaseAdmin();
  // `*`, so a database that has not had rooms-private.sql yet still answers.
  const { data: room } = await db.from('rooms').select('*').eq('id', id).maybeSingle();
  if (!room) return NextResponse.json({ error: 'لا غرفة' }, { status: 404 });

  if (room.private) {
    // A private room is for the people who hold its link, from any year: a
    // member, the host, or somebody joining with the right code.
    const { data: inside } = await db.from('room_members')
      .select('person').eq('room', id).eq('person', profile.id).maybeSingle();
    const invited = !!join && !!code && code === room.code;
    if (!inside && room.host !== profile.id && !isStaff(profile) && !invited) {
      return NextResponse.json({ error: 'هذه غرفة خاصة — تحتاج رابط الدعوة' }, { status: 403 });
    }
  } else if (room.promo !== profile.promo && !isStaff(profile)) {
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

  // Still here: the room screen says so every half minute while it is open
  // (lib/rooms.js). Only a member can be here; a visitor is only looking.
  if (here) {
    const { error } = await db.from('room_members')
      .update({ seen_at: new Date().toISOString() })
      .eq('room', id).eq('person', profile.id);
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
