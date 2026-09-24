// Sending somebody a challenge.
//
// An invitation, not a finished exam. The first version had the challenger
// answer ten questions and only then choose who to send them to, which is the
// wrong way round twice over: you sit the thing before knowing whether
// anybody will sit it with you, and the person challenged is handed a score
// to beat before they have agreed to play at all.
//
// So this writes a row with the questions drawn and nothing else, and tells
// the other person. Nobody answers anything until they accept.

import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { normalise, looksRight } from '@/lib/matricule';
import { normaliseUsername, usernameLooksRight } from '@/lib/identity';
import { moduleOf, sourcesOf, studies } from '@/lib/catalogue';
import { allOf } from '@/lib/quiz-bank';
import { pick, stage, myMove, countOf, secondsOf, LENGTH } from '@/lib/duel';
import { notify } from '@/lib/notify';

export const runtime = 'nodejs';

export async function POST(request) {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });
  if (me.status !== 'approved') {
    return NextResponse.json({ error: 'حسابك بانتظار الموافقة' }, { status: 403 });
  }

  const { matricule, module, lecture, count, seconds } = await request.json().catch(() => ({}));

  // Who, by university number or username — first-years have no number yet.
  // The field keeps its old name so an older app build still sends it.
  const number = normalise(matricule);
  const handle = normaliseUsername(matricule);
  const byNumber = looksRight(number);
  if (!byNumber && !usernameLooksRight(handle)) {
    return NextResponse.json({ error: 'اكتب اسم المستخدم أو الرقم الجامعي' }, { status: 400 });
  }

  const db = supabaseAdmin();

  // Who you are challenging. Their own year only: a duel across promos would
  // be two people sitting different courses, and neither could read the
  // other's row anyway.
  const { data: them } = await db.from('profiles')
    .select('id, full_name, email, promo, status')
    .eq(byNumber ? 'matricule' : 'username', byNumber ? number : handle).maybeSingle();

  if (!them || them.status !== 'approved') {
    return NextResponse.json({ error: 'لا أحد بهذا الاسم أو الرقم' }, { status: 404 });
  }
  if (them.id === me.id) {
    return NextResponse.json({ error: 'تحدَّ زميلًا، لا نفسك' }, { status: 400 });
  }
  if (them.promo !== me.promo) {
    return NextResponse.json({ error: 'زميلك في دفعة أخرى' }, { status: 400 });
  }

  // A subject of your year — including the first year the pharmacy and
  // dental years share with medicine (lib/catalogue.js).
  const m = await moduleOf(module);
  if (!m || !studies(await sourcesOf(me.promo), m)) {
    return NextResponse.json({ error: 'لا مادة بهذا الاسم' }, { status: 404 });
  }

  // The draw happens here, once, and is kept on the row. Drawing again for
  // the second player would give two people different questions and call the
  // difference a result.
  const all = await allOf(module);
  const within = lecture?.id
    ? all.filter((q) => Number(q.lecture) === Number(lecture.id))
    : all;
  const chosen = pick(within.length ? within : all, countOf(count));

  if (chosen.length < 2) {
    return NextResponse.json({
      error: all.some((q) => q.dbId != null)
        ? 'لا أسئلة كافية في هذه المادة'
        : 'أسئلة هذه المادة لم تُنقل إلى قاعدة البيانات بعد',
    }, { status: 400 });
  }

  const title = lecture?.title ? `${m.name} · ${lecture.title}` : m.name;

  const { data: made, error } = await db.from('duels').insert({
    promo: me.promo,
    module,
    lecture: lecture?.id ?? null,
    title,
    questions: chosen.map((q) => Number(q.dbId)),
    challenger: me.id,
    opponent: them.id,
    state: 'invited',
    seconds: secondsOf(seconds),
  }).select('id').single();

  if (error) {
    const behind = error.code === '42P01' || error.code === '42703';
    return NextResponse.json({
      error: behind
        ? 'قاعدة البيانات لا تعرف التحدّيات بعد — الصق supabase/social.sql أولًا'
        : error.message,
    }, { status: behind ? 503 : 500 });
  }

  // They are not looking at the screen. That is the whole point of a duel you
  // can send at midnight.
  await notify({
    person: them.id, actor: me.id, kind: 'duel',
    body: `${title} — ${chosen.length} أسئلة`,
  });

  return NextResponse.json({ id: made.id, of: chosen.length });
}

/** How many are your move — for the badge on الرئيسية. */
export async function GET() {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ waiting: 0 });

  // Counted from the same rule the screens draw from, rather than a second
  // query that means to say the same thing.
  const { data, error } = await supabaseAdmin().from('duels')
    .select('challenger, opponent, state, challenger_at, opponent_at')
    .or(`challenger.eq.${me.id},opponent.eq.${me.id}`)
    .order('created_at', { ascending: false })
    .limit(100);

  // A counter is not worth an error message.
  const waiting = error ? 0 : (data || []).filter((d) => myMove(stage(d, me.id))).length;
  return NextResponse.json({ waiting, length: LENGTH });
}
