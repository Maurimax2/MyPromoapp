// Asking, accepting, and letting go.
//
//   POST   { to }  ask — or, when they already asked you, accept
//   DELETE { to }  withdraw a request, decline one, or unfriend
//
// `to` is a username, a university number, or an id. Only your own year:
// the same rule chat keeps.

import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { normalise, looksRight } from '@/lib/matricule';
import { normaliseUsername } from '@/lib/identity';
import { rowBetween } from '@/lib/friends';
import { notify } from '@/lib/notify';

export const runtime = 'nodejs';

const UUID = /^[0-9a-f-]{36}$/i;

async function find(me, to) {
  const raw = String(to || '').trim().replace(/^@/, '');
  if (!raw) return null;
  const number = normalise(raw);
  const [col, val] = UUID.test(raw) ? ['id', raw]
    : looksRight(number) ? ['matricule', number]
      : ['username', normaliseUsername(raw)];
  const { data } = await supabaseAdmin().from('profiles')
    .select('id, promo, status, username').eq(col, val).maybeSingle();
  return data;
}

async function guard(request) {
  const me = await currentProfile();
  if (!me) return { error: NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 }) };
  if (me.status !== 'approved') {
    return { error: NextResponse.json({ error: 'حسابك بانتظار الموافقة' }, { status: 403 }) };
  }
  const { to } = await request.json().catch(() => ({}));
  const them = await find(me, to);
  // Somebody in another year reads the same as nobody at all — the rule
  // /u/ keeps, so this route cannot be used to ask who exists elsewhere.
  if (!them || them.status !== 'approved' || them.promo !== me.promo) {
    return { error: NextResponse.json({ error: 'لا أحد بهذا الاسم في دفعتك' }, { status: 404 }) };
  }
  if (them.id === me.id) return { error: NextResponse.json({ error: 'هذا أنت' }, { status: 400 }) };
  return { me, them };
}

export async function POST(request) {
  const { me, them, error } = await guard(request);
  if (error) return error;

  const db = supabaseAdmin();
  const row = await rowBetween(me.id, them.id);

  if (row?.accepted_at) return NextResponse.json({ state: 'friends' });
  if (row && row.a === me.id) return NextResponse.json({ state: 'sent' });

  if (row) {
    // They asked first: asking back is saying yes.
    const { error: e } = await db.from('friends')
      .update({ accepted_at: new Date().toISOString() }).eq('a', them.id).eq('b', me.id);
    if (e) return NextResponse.json({ error: e.message }, { status: 500 });
    await notify({ person: them.id, actor: me.id, kind: 'friend_ok', link: me.username ? `/u/${me.username}` : '/friends' });
    return NextResponse.json({ state: 'friends' });
  }

  const { error: e } = await db.from('friends').insert({ a: me.id, b: them.id });
  if (e) {
    // Both asked at the same moment; the pair index let one through.
    const again = await rowBetween(me.id, them.id);
    if (!again) {
      const off = /friends|relation|schema cache/i.test(e.message || '');
      return NextResponse.json({ error: off ? 'الأصدقاء غير مفعّلين بعد' : e.message }, { status: off ? 503 : 500 });
    }
    return NextResponse.json({ state: again.accepted_at ? 'friends' : again.a === me.id ? 'sent' : 'asked' });
  }
  await notify({ person: them.id, actor: me.id, kind: 'friend_req', link: '/friends' });
  return NextResponse.json({ state: 'sent' });
}

export async function DELETE(request) {
  const { me, them, error } = await guard(request);
  if (error) return error;
  const db = supabaseAdmin();
  // Whichever way round it was asked. Nobody is told: being declined or
  // unfriended is not news anybody needs to be woken for.
  await db.from('friends').delete().eq('a', me.id).eq('b', them.id);
  await db.from('friends').delete().eq('a', them.id).eq('b', me.id);
  return NextResponse.json({ state: 'none' });
}
