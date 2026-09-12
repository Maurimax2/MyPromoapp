// Making a duel.
//
// The challenger takes it first and it is sent when they finish. You cannot
// send somebody a challenge you have not sat yourself, which is both fairer
// and the only version that does not fill the app with duels nobody started.

import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { normalise, matriculeError } from '@/lib/matricule';
import { moduleOf } from '@/lib/catalogue';
import { allOf } from '@/lib/quiz-bank';
import { score, LENGTH } from '@/lib/duel';
import { notify } from '@/lib/notify';

export const runtime = 'nodejs';

export async function POST(request) {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });
  if (me.status !== 'approved') {
    return NextResponse.json({ error: 'حسابك بانتظار الموافقة' }, { status: 403 });
  }

  const { matricule, module, lecture, answers, questions: asked } =
    await request.json().catch(() => ({}));

  const number = normalise(matricule);
  const wrong = matriculeError(number);
  if (wrong) return NextResponse.json({ error: wrong }, { status: 400 });

  const db = supabaseAdmin();

  // Who you are challenging. Their own year only: a duel across promos would
  // be two people sitting different courses, and neither could read the
  // other's row anyway.
  const { data: them } = await db.from('profiles')
    .select('id, full_name, email, promo, status')
    .eq('matricule', number).maybeSingle();

  if (!them || them.status !== 'approved') {
    return NextResponse.json({ error: 'لا أحد بهذا الرقم' }, { status: 404 });
  }
  if (them.id === me.id) {
    return NextResponse.json({ error: 'تحدَّ زميلًا، لا نفسك' }, { status: 400 });
  }
  if (them.promo !== me.promo) {
    return NextResponse.json({ error: 'زميلك في دفعة أخرى' }, { status: 400 });
  }

  const m = await moduleOf(module);
  if (!m || m.promo !== me.promo) {
    return NextResponse.json({ error: 'لا مادة بهذا الاسم' }, { status: 404 });
  }

  // The questions the challenger actually answered, in the order they were
  // shown. Sent back rather than drawn again here: drawing twice would score
  // their answers against somebody else's questions.
  const all = await allOf(module);
  const byId = new Map(all.filter((q) => q.dbId != null).map((q) => [String(q.dbId), q]));
  const chosen = (Array.isArray(asked) ? asked : [])
    .map((id) => byId.get(String(id))).filter(Boolean);

  if (chosen.length < 2) {
    // Either nothing was sent back, or this subject is still being served
    // from the bundled file and its questions have no row to point at.
    return NextResponse.json({
      error: byId.size
        ? 'لا أسئلة كافية في هذه المادة'
        : 'أسئلة هذه المادة لم تُنقل إلى قاعدة البيانات بعد',
    }, { status: 400 });
  }

  const mine = score(chosen, answers);
  const title = lecture?.title
    ? `${m.name} · ${lecture.title}`
    : m.name;

  const { data: made, error } = await db.from('duels').insert({
    promo: me.promo,
    module,
    lecture: lecture?.id ?? null,
    title,
    questions: chosen.map((q) => Number(q.dbId)),
    challenger: me.id,
    opponent: them.id,
    challenger_score: mine,
    challenger_at: new Date().toISOString(),
  }).select('id').single();

  if (error) {
    const behind = error.code === '42P01' || error.code === '42703';
    return NextResponse.json({
      error: behind
        ? 'قاعدة البيانات لا تعرف التحدّيات بعد — الصق supabase/social.sql أولًا'
        : error.message,
    }, { status: behind ? 503 : 500 });
  }

  await notify({
    person: them.id, actor: me.id, kind: 'duel',
    body: `${title} — ${mine}/${chosen.length}`,
  });

  return NextResponse.json({ id: made.id, score: mine, of: chosen.length });
}

/** How many are waiting for you — for the badge on الرئيسية. */
export async function GET() {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ waiting: 0 });

  const { count, error } = await supabaseAdmin().from('duels')
    .select('id', { count: 'exact', head: true })
    .eq('opponent', me.id).is('opponent_at', null);

  // A counter is not worth an error message.
  return NextResponse.json({ waiting: error ? 0 : (count || 0), length: LENGTH });
}
