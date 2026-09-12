// Saying which lecture a question revises.
//
// Two hundred and forty-two questions in ANATOMIE and nobody is going to sit
// and tag them one at a time, so this takes the whole map at once: the same
// shape as everything else the panel accepts, read somewhere else and pasted
// back. A GET hands out the text to give a model — the subject's lectures
// with their numbers, and its questions with their ids — and a POST applies
// what comes back.
//
// The lecture is named by the number the module gives it, not by a database
// id. A model that has been handed "5 — Les vaisseaux de la tête et du cou"
// can answer 5; asked for an id it has no way to check, it would invent one,
// and an invented id points at a real lecture in another subject.

import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/staff';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { readingQuestions } from '@/lib/qcm/read';

export const runtime = 'nodejs';

/** The lectures of a subject, in the order the archive lists them. */
async function lecturesOf(db, module) {
  const [{ data: chapters }, { data: docs }] = await Promise.all([
    db.from('chapters').select('id, title, position').eq('module', module).order('position'),
    db.from('documents')
      .select('id, chapter, n, title, section, where_shown, parent, position')
      .eq('module', module).eq('published', true).order('position'),
  ]);

  const chapterOf = new Map((chapters || []).map((c) => [c.id, c.title]));
  return (docs || [])
    // A lecture, not a past paper and not another teacher's copy of one.
    .filter((d) => d.where_shown === 'archive' && d.section === 'lecture' && !d.parent)
    .map((d) => ({
      id: d.id,
      n: d.n == null ? null : String(d.n),
      title: d.title,
      chapter: chapterOf.get(d.chapter) || null,
    }));
}

/**
 * The lectures by their number, and the numbers no lecture can claim.
 *
 * Two lectures with the same number is an archive that needs fixing, and
 * until somebody fixes it the number means nothing: a map built by writing
 * each one in turn would silently keep whichever came last, and every
 * question sent to that number would land on a lecture chosen by row order.
 * So an ambiguous number is refused and named, the same as one that does not
 * exist at all.
 */
function numbering(lectures) {
  const seen = new Map();
  for (const l of lectures) {
    if (!l.n) continue;
    const at = seen.get(l.n);
    if (at) at.push(l); else seen.set(l.n, [l]);
  }
  const byNumber = new Map();
  const shared = [];
  for (const [n, mine] of seen) {
    if (mine.length === 1) byNumber.set(n, mine[0].id);
    else shared.push({ n, titles: mine.map((l) => l.title) });
  }
  return { byNumber, shared };
}

/** Its questions, with what has already been said about them. */
async function questionsOf(db, module) {
  const { data: banks } = await db.from('question_banks')
    .select('id, title').eq('module', module).order('position');
  if (!banks || !banks.length) return { banks: [], rows: [] };

  const ask = (columns) => db.from('questions')
    .select(columns).in('bank', banks.map((b) => b.id)).order('id');

  const { data: rows } = await readingQuestions(
    () => ask('id, bank, n, stem, lecture'),
    () => ask('id, bank, n, stem'),
  );
  return { banks, rows: rows || [] };
}

export async function GET(request) {
  const gate = await requireStaff();
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });

  const module = new URL(request.url).searchParams.get('module');
  if (!module) return NextResponse.json({ error: 'أيّ مادة؟' }, { status: 400 });

  const db = supabaseAdmin();
  const [lectures, { banks, rows }] = await Promise.all([
    lecturesOf(db, module), questionsOf(db, module),
  ]);

  const titleOf = new Map(banks.map((b) => [b.id, b.title]));
  const done = rows.filter((q) => q.lecture != null).length;
  const { shared } = numbering(lectures);

  return NextResponse.json({
    lectures,
    // Named on the screen rather than quietly dropped: a lecture nobody can
    // send a question to is a hole in the subject, and the person looking at
    // this screen is the one who can close it.
    shared,
    banks: banks.map((b) => b.title),
    total: rows.length,
    done,
    left: rows.length - done,
    // Only the ones still unplaced: re-sending the whole subject every time
    // would have a model re-deciding work somebody has already checked.
    questions: rows.filter((q) => q.lecture == null).map((q) => ({
      id: q.id, n: q.n, paper: titleOf.get(q.bank) || null, stem: q.stem,
    })),
  });
}

export async function POST(request) {
  const gate = await requireStaff();
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });

  const { module, map } = await request.json().catch(() => ({}));
  if (!module) return NextResponse.json({ error: 'أيّ مادة؟' }, { status: 400 });
  if (!Array.isArray(map) || !map.length) {
    return NextResponse.json({ error: 'لا شيء في ما لُصق' }, { status: 400 });
  }

  const db = supabaseAdmin();
  const lectures = await lecturesOf(db, module);
  const { byNumber } = numbering(lectures);

  // Only this subject's questions may be touched, whatever the paste says.
  // An id is a number a model can be wrong about, and being wrong about one
  // here would move a question out of a subject somebody else maintains.
  const { data: banks } = await db.from('question_banks')
    .select('id').eq('module', module);
  const mine = new Set((banks || []).map((b) => b.id));
  const { data: rows } = await db.from('questions')
    .select('id, bank').in('bank', [...mine]);
  const here = new Set((rows || []).map((r) => r.id));

  let set = 0;
  const unknown = new Set();
  const foreign = [];
  const byLecture = new Map();          // document id -> question ids

  for (const entry of map) {
    const id = Number(entry?.id);
    const n = entry?.lecture === null || entry?.lecture === undefined
      ? null : String(entry.lecture).trim();
    if (!Number.isInteger(id) || !n) continue;
    if (!here.has(id)) { foreign.push(id); continue; }

    const lecture = byNumber.get(n);
    if (!lecture) { unknown.add(n); continue; }

    const at = byLecture.get(lecture);
    if (at) at.push(id); else byLecture.set(lecture, [id]);
  }

  // One update per lecture rather than one per question: a subject is a
  // couple of dozen lectures and several hundred questions.
  for (const [lecture, ids] of byLecture) {
    const { error } = await db.from('questions').update({ lecture }).in('id', ids);
    if (error) {
      const behind = error.code === '42703';
      return NextResponse.json({
        error: behind
          ? 'قاعدة البيانات لا تحتوي عمود المحاضرة — الصق supabase/schema.sql أولًا'
          : error.message,
      }, { status: behind ? 503 : 500 });
    }
    set += ids.length;
  }

  await db.from('audit_log').insert({
    actor: gate.profile.id, action: 'classified_questions',
    target_type: 'module', target_id: module,
    detail: { set, lectures: byLecture.size },
  }).then(() => {}, () => {});

  return NextResponse.json({
    set,
    lectures: byLecture.size,
    shared: numbering(lectures).shared.map((x) => x.n),
    // Named rather than counted: "3 refused" tells nobody which three.
    unknown: [...unknown],
    foreign: foreign.length,
  });
}
