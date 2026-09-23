// A ticket into a room's call: voice, video, and the host's model.
//
// The call itself is LiveKit's (LIVEKIT_URL, LIVEKIT_API_KEY,
// LIVEKIT_API_SECRET — set in Vercel, never in the client). This only decides
// who gets in, and it decides the same way the chat does: a member of an open
// room in your promo. The identity in the ticket is the profile id, signed
// here, so when the room hears «the host is showing Crâne» it can check who
// actually said it.
//
// Without the three variables the room still works — as text — and says why
// the buttons are missing rather than failing on a tap.

import { NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';
import { currentProfile, isStaff } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { liveName } from '@/lib/rooms';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const profile = await currentProfile();
  if (!profile) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const url = process.env.LIVEKIT_URL;
  const key = process.env.LIVEKIT_API_KEY;
  const secret = process.env.LIVEKIT_API_SECRET;
  if (!url || !key || !secret) {
    // Not a failure: the room works without a call, so it is answered as one.
    return NextResponse.json({ error: 'الصوت والصورة غير مفعّلين بعد', off: true });
  }

  const { room: id } = await request.json().catch(() => ({}));
  if (!id) return NextResponse.json({ error: 'no room' }, { status: 400 });

  const db = supabaseAdmin();
  const { data: room } = await db.from('rooms')
    .select('id, host, promo, closed').eq('id', id).maybeSingle();
  if (!room) return NextResponse.json({ error: 'لا غرفة' }, { status: 404 });
  if (room.closed) return NextResponse.json({ error: 'الغرفة مغلقة' }, { status: 409 });
  if (room.promo !== profile.promo && !isStaff(profile)) {
    return NextResponse.json({ error: 'ليست غرفة دفعتك' }, { status: 403 });
  }

  const { data: member } = await db.from('room_members')
    .select('person').eq('room', id).eq('person', profile.id).maybeSingle();
  if (!member) return NextResponse.json({ error: 'انضم إلى الغرفة أولًا' }, { status: 403 });

  const token = new AccessToken(key, secret, {
    identity: profile.id,
    name: profile.full_name || profile.email.split('@')[0],
    // Long enough for an evening of revision; a new one is asked for on the
    // next visit anyway.
    ttl: '6h',
  });
  token.addGrant({
    roomJoin: true,
    room: liveName(room.id),
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
  });

  return NextResponse.json({ url, token: await token.toJwt(), host: room.host });
}
