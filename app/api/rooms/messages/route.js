// What is said inside a room. Only people who joined can read or write it.

import { NextResponse } from 'next/server';
import { currentProfile, isStaff, supabaseServer } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

export async function GET(request) {
  const profile = await currentProfile();
  if (!profile) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const url = new URL(request.url);
  const room = url.searchParams.get('room');
  const after = url.searchParams.get('after');
  if (!room) return NextResponse.json({ error: 'no room' }, { status: 400 });

  const sb = await supabaseServer();
  let q = sb.from('room_messages')
    .select('id, body, created_at, author:profiles(id, full_name, email)')
    .eq('room', room).order('created_at').limit(200);
  if (after) q = q.gt('id', after);

  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ messages: data || [] });
}

export async function POST(request) {
  const profile = await currentProfile();
  if (!profile) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const { room, body } = await request.json();
  const text = String(body || '').trim().slice(0, 2000);
  if (!room || !text) return NextResponse.json({ error: 'اكتب شيئًا' }, { status: 400 });

  const db = supabaseAdmin();
  const { data: member } = await db.from('room_members')
    .select('person').eq('room', room).eq('person', profile.id).maybeSingle();
  if (!member && !isStaff(profile)) {
    return NextResponse.json({ error: 'انضم إلى الغرفة أولًا' }, { status: 403 });
  }

  const { data, error } = await db.from('room_messages')
    .insert({ room, author: profile.id, body: text })
    .select('id, body, created_at').single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await db.from('room_members').update({ seen_at: new Date().toISOString() })
    .eq('room', room).eq('person', profile.id);

  return NextResponse.json({
    ...data,
    author: { id: profile.id, full_name: profile.full_name, email: profile.email },
  });
}
