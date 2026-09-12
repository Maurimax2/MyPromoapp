// Setting one up: what a subject can be duelled on, and the draw itself.
//
// The draw happens here rather than in the browser. It is the one thing in a
// duel both players have to agree about, and a list a player's own device
// chose is a list that player could choose again.

import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/supabase/server';
import { moduleOf } from '@/lib/catalogue';
import { allOf } from '@/lib/quiz-bank';
import { groupByLecture } from '@/lib/quiz-lectures';
import { pick, usable, LENGTH } from '@/lib/duel';

export const runtime = 'nodejs';

export async function GET(request) {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const url = new URL(request.url);
  const module = url.searchParams.get('module');
  const lecture = url.searchParams.get('lecture');
  if (!module) return NextResponse.json({ error: 'أيّ مادة؟' }, { status: 400 });

  const m = await moduleOf(module);
  if (!m || m.promo !== me.promo) {
    return NextResponse.json({ error: 'لا مادة بهذا الاسم' }, { status: 404 });
  }

  // The same rule the draw uses, so every count on screen is a count the
  // draw could actually fill.
  const all = (await allOf(module)).filter(usable);
  const groups = groupByLecture(m.chapters, all) || [];

  // Nothing chosen yet: what there is to choose from. A lecture with fewer
  // than two usable questions is left out rather than offered and then
  // refused.
  if (!lecture) {
    return NextResponse.json({
      name: m.name,
      total: all.length,
      length: LENGTH,
      lectures: groups
        .filter((g) => g.fid.startsWith('L') && g.fid !== 'L-none' && g.questions.length >= 2)
        .map((g) => ({ id: g.fid.slice(1), n: g.n, title: g.title, count: g.questions.length })),
    });
  }

  const from = lecture === 'all'
    ? all
    : (groups.find((g) => g.fid === `L${lecture}`)?.questions || []);

  if (from.length < 2) {
    return NextResponse.json({ error: 'لا أسئلة كافية هنا' }, { status: 400 });
  }

  const drawn = pick(from);
  return NextResponse.json({
    name: m.name,
    // The answers go with them, and a duel shows each one the moment you
    // confirm — the same as اختبر نفسك.
    //
    // That is a deliberate trade. Somebody willing to open the browser's
    // console could read an answer before ticking it, and there is no version
    // of this that both stops them and teaches anybody anything: a duel that
    // withholds the correction until the end is a duel you learn nothing from
    // while you are taking it, which is most of what these questions are for.
    // What is not left to the browser is the score — that is worked out on
    // the server from the ticks actually sent, so a score cannot simply be
    // asserted, only earned or cheated for question by question.
    // No `id`: that is the key المراجعة files a question under, and a duel
    // does not write to it. Both halves of a duel have to behave the same
    // way, and the player answering the second half is served from the rows
    // the duel stored, which cannot reconstruct that key reliably. A duel is
    // a duel; المراجعة is fed by اختبر نفسك.
    questions: drawn.map((q) => ({
      dbId: q.dbId, q: q.q, options: q.options,
      answer: q.answer, why: q.why, by: q.by, topic: q.topic,
    })),
  });
}
