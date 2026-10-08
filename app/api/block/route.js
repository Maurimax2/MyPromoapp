// Blocking somebody, and taking it back.
//
//   POST   { person }    block them
//   DELETE { person }    unblock them
//
// The person blocked is never told, and nothing they can read changes in a
// way that says so — they simply stop seeing you, as you stop seeing them
// (supabase/blocks.sql). A friendship or a request between the two of you
// ends with it: a friend you cannot see is not a friend. The list of whom you
// blocked is read by its own screen, /blocked.

import { NextResponse } from 'next/server';
import { currentProfile, isStaff } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { noBlocksTable } from '@/lib/blocks';
import { getT } from '@/lib/lang';

export const runtime = 'nodejs';

const allowed = (p) => !!p && (p.status === 'approved' || isStaff(p));

async function who(request) {
  const t = await getT();
  const me = await currentProfile();
  if (!allowed(me)) {
    return { error: NextResponse.json({ error: t('حسابك بانتظار الموافقة') }, { status: 403 }) };
  }
  const { person } = await request.json().catch(() => ({}));
  if (!person || typeof person !== 'string') {
    return { error: NextResponse.json({ error: t('من؟') }, { status: 400 }) };
  }
  if (person === me.id) {
    return { error: NextResponse.json({ error: t('هذا أنت') }, { status: 400 }) };
  }
  return { me, person, t };
}

export async function POST(request) {
  const { me, person, t, error: bad } = await who(request);
  if (bad) return bad;

  const db = supabaseAdmin();
  const { data: them } = await db.from('profiles').select('id').eq('id', person).maybeSingle();
  if (!them) return NextResponse.json({ error: t('لا يوجد هذا الطالب') }, { status: 404 });

  // Look first, then write — never ON CONFLICT against this schema.
  const { data: had, error: readErr } = await db.from('blocks')
    .select('blocker').eq('blocker', me.id).eq('blocked', person).maybeSingle();
  if (readErr) {
    const off = noBlocksTable(readErr);
    return NextResponse.json({ error: off ? t('الحظر غير مفعّل بعد') : readErr.message }, { status: off ? 503 : 500 });
  }
  if (!had) {
    const { error } = await db.from('blocks').insert({ blocker: me.id, blocked: person });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Whoever asked whom, the friendship goes.
  await db.from('friends').delete().eq('a', me.id).eq('b', person);
  await db.from('friends').delete().eq('a', person).eq('b', me.id);

  return NextResponse.json({ ok: true, blocked: true });
}

export async function DELETE(request) {
  const { me, person, error: bad } = await who(request);
  if (bad) return bad;

  const { error } = await supabaseAdmin().from('blocks').delete().eq('blocker', me.id).eq('blocked', person);
  if (error && !noBlocksTable(error)) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, blocked: false });
}
