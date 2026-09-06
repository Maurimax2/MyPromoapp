// Talking to one person.
//
// The pair is stored sorted and unique, so opening a chat with the same
// person twice reaches the one that exists rather than making a second —
// which is how a chat list fills with duplicates nobody can explain.

import { NextResponse } from 'next/server';
import { currentProfile, isStaff, supabaseServer } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

const allowed = (p) => !!p && (p.status === 'approved' || isStaff(p));
const pair = (x, y) => (x < y ? [x, y] : [y, x]);

/** Open the chat with somebody, making it if it is not there. */
export async function POST(request) {
  const me = await currentProfile();
  if (!allowed(me)) return NextResponse.json({ error: 'حسابك بانتظار الموافقة' }, { status: 403 });

  const { person } = await request.json();
  if (!person || person === me.id) {
    return NextResponse.json({ error: 'مع من؟' }, { status: 400 });
  }

  const db = supabaseAdmin();

  // Only inside your own promo. A first year should not be able to open a
  // private channel to a stranger four years above them.
  const { data: them } = await db.from('profiles')
    .select('id, promo, status').eq('id', person).maybeSingle();
  if (!them || them.status !== 'approved') {
    return NextResponse.json({ error: 'لا يوجد هذا الطالب' }, { status: 404 });
  }
  if (them.promo !== me.promo && !isStaff(me)) {
    return NextResponse.json({ error: 'من دفعتك فقط' }, { status: 403 });
  }

  const [a, b] = pair(me.id, person);
  const { data: already } = await db.from('chats')
    .select('id').eq('a', a).eq('b', b).maybeSingle();
  if (already) return NextResponse.json({ id: already.id });

  const { data, error } = await db.from('chats').insert({ a, b }).select('id').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id });
}

/** New messages in one chat, or everything since a given id. */
export async function GET(request) {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const url = new URL(request.url);
  const chat = url.searchParams.get('chat');
  const after = url.searchParams.get('after');
  if (!chat) return NextResponse.json({ error: 'no chat' }, { status: 400 });

  const sb = await supabaseServer();
  let q = sb.from('chat_messages')
    .select('id, body, author, created_at')
    .eq('chat', chat).order('created_at').limit(300);
  if (after) q = q.gt('id', after);

  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ messages: data || [] });
}

export async function PUT(request) {
  const me = await currentProfile();
  if (!allowed(me)) return NextResponse.json({ error: 'حسابك بانتظار الموافقة' }, { status: 403 });

  const { chat, body } = await request.json();
  const text = String(body || '').trim().slice(0, 2000);
  if (!chat || !text) return NextResponse.json({ error: 'اكتب شيئًا' }, { status: 400 });

  const db = supabaseAdmin();
  const { data: room } = await db.from('chats').select('a, b').eq('id', chat).maybeSingle();
  if (!room || (room.a !== me.id && room.b !== me.id)) {
    return NextResponse.json({ error: 'ليست محادثتك' }, { status: 403 });
  }

  const { data, error } = await db.from('chat_messages')
    .insert({ chat, author: me.id, body: text })
    .select('id, body, author, created_at').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await db.from('chats').update({ last_at: new Date().toISOString() }).eq('id', chat);
  return NextResponse.json(data);
}
