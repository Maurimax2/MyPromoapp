// Folding several subjects into one.
//
// DCEM1 arrived with SEMIOLOGIE catalogued as a dozen separate subjects —
// one per system. It is one subject, and those are its chapters. Deleting
// the strays would have taken their files with them, which is the whole
// reason this exists rather than a second use of DELETE: every file, every
// question paper and every question moves across, and only the emptied
// subject row is removed.
//
// Each folded subject becomes one chapter, named after itself. That is what
// somebody means by "those are its chapters": the files stay together and
// keep the name they were filed under.
//
// It asks twice, like deleting does. A call without `confirm` writes nothing
// and answers with what would move.

import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/staff';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { isAdmin } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function POST(request) {
  const gate = await requireStaff();
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });
  if (!isAdmin(gate.profile)) {
    return NextResponse.json({ error: 'دمج المواد للمشرفين وحدهم' }, { status: 403 });
  }
  const profile = gate.profile;

  const { into, from, rename, confirm } = await request.json();
  if (!into) return NextResponse.json({ error: 'أيّ مادة نُبقي؟' }, { status: 400 });

  // The subject being kept is never also one of the ones being folded in.
  const sources = [...new Set((Array.isArray(from) ? from : []).filter((id) => id && id !== into))];
  if (!sources.length) return NextResponse.json({ error: 'اختر المواد التي تُدمج' }, { status: 400 });

  const db = supabaseAdmin();

  const { data: rows, error: lookup } = await db.from('modules')
    .select('id, name, promo, semester').in('id', [into, ...sources]);
  if (lookup) {
    return NextResponse.json({ error: `تعذّرت قراءة المواد — ${lookup.message}` }, { status: 500 });
  }

  const found = new Map((rows || []).map((m) => [m.id, m]));
  const target = found.get(into);
  if (!target) return NextResponse.json({ error: 'لم نجد المادة المُبقاة' }, { status: 404 });

  const missing = sources.filter((id) => !found.has(id));
  if (missing.length) {
    return NextResponse.json({ error: `لم نجد ${missing.join('، ')}` }, { status: 404 });
  }

  // A subject only ever folds into one of its own year. Moving a file across
  // years would take it out of the archive of the promo it belongs to.
  const astray = sources.filter((id) => found.get(id).promo !== target.promo);
  if (astray.length) {
    return NextResponse.json({ error: 'المواد المدموجة يجب أن تكون في السنة نفسها' }, { status: 400 });
  }

  // ---- what would move ----------------------------------------------------
  const tally = async (id) => {
    const [docs, banks] = await Promise.all([
      db.from('documents').select('*', { count: 'exact', head: true }).eq('module', id),
      db.from('question_banks').select('*', { count: 'exact', head: true }).eq('module', id),
    ]);
    return {
      id,
      name: found.get(id).name,
      // A count that could not be read must not be printed as a believable zero.
      documents: docs.error ? null : docs.count || 0,
      banks: banks.error ? null : banks.count || 0,
    };
  };

  const moving = await Promise.all(sources.map(tally));

  // A subject kept under a new name was one of the strays itself: SEMIOLOGIE
  // CARDIOLOGIQUE renamed to SEMIOLOGIE is the container now, so its own
  // lectures are the cardiology chapter — not loose files sitting above the
  // three chapters beside them. Renaming is the whole signal, and the preview
  // names the chapter so this is read before it is done, not discovered after.
  const renamed = Boolean(rename?.trim() && rename.trim() !== target.name);
  const { data: loose } = renamed
    ? await db.from('documents').select('id').eq('module', target.id).is('chapter', null)
    : { data: [] };
  const foldKeeper = renamed && (loose || []).length > 0;

  const chapterNames = [
    ...(foldKeeper ? [target.name] : []),
    ...moving.map((m) => m.name),
  ];

  if (!confirm) {
    return NextResponse.json({
      preview: true,
      into: { id: target.id, name: rename?.trim() || target.name },
      renaming: renamed,
      chapters: chapterNames.length,
      chapterNames,
      documents: moving.reduce((n, m) => n + (m.documents || 0), 0)
        + (foldKeeper ? loose.length : 0),
      banks: moving.reduce((n, m) => n + (m.banks || 0), 0),
      moving,
    });
  }

  // ---- the move -----------------------------------------------------------
  // Files first, subject rows last. There are no transactions here, so the
  // order is the safety: a run that dies halfway leaves files moved but the
  // emptied subject still standing, and running it again finishes the job.
  // The other order loses files.

  // What the target already calls its chapters and its papers, so nothing
  // collides with the unique (module, title) indexes. Looked up rather than
  // written blind: `ON CONFLICT` cannot be used against this schema.
  const [{ data: haveChapters }, { data: haveBanks }] = await Promise.all([
    db.from('chapters').select('id, title, position').eq('module', target.id),
    db.from('question_banks').select('title').eq('module', target.id),
  ]);

  const chapterAt = new Map((haveChapters || []).map((c) => [c.title, c.id]));
  const bankTitles = new Set((haveBanks || []).map((b) => b.title));
  let position = (haveChapters || []).reduce((n, c) => Math.max(n, c.position + 1), 0);

  const done = [];

  /** The chapter a folded subject becomes. Run twice, it keeps the one it has. */
  const chapterFor = async (title) => {
    const had = chapterAt.get(title);
    if (had) return { id: had };
    const { data: made, error } = await db.from('chapters')
      .insert({ module: target.id, title, position })
      .select('id').single();
    if (error) return { error };
    chapterAt.set(title, made.id);
    position += 1;
    return { id: made.id };
  };

  // The kept subject's own lectures first, so they sit above the ones folded
  // in rather than after them.
  if (foldKeeper) {
    const { id: chapter, error } = await chapterFor(target.name);
    if (error) {
      return NextResponse.json({
        error: `تعذّر إنشاء فصل ${target.name} — ${error.message}`, done,
      }, { status: 500 });
    }
    const { error: moved } = await db.from('documents')
      .update({ chapter }).eq('module', target.id).is('chapter', null);
    if (moved) {
      return NextResponse.json({
        error: `تعذّر ترتيب ملفات ${target.name} — ${moved.message}`, done,
      }, { status: 500 });
    }
    done.push(target.name);
  }

  for (const source of sources) {
    const name = found.get(source).name;

    const { id: chapter, error: made } = await chapterFor(name);
    if (made) {
      return NextResponse.json({
        error: `تعذّر إنشاء فصل ${name} — ${made.message}`,
        done,
      }, { status: 500 });
    }

    const { error: moved } = await db.from('documents')
      .update({ module: target.id, chapter }).eq('module', source);
    if (moved) {
      return NextResponse.json({
        error: `تعذّر نقل ملفات ${name} — ${moved.message}`,
        done,
      }, { status: 500 });
    }

    // Question papers keep their own names unless the target already has one
    // by that name, in which case the subject it came from tells them apart.
    const { data: papers } = await db.from('question_banks')
      .select('id, title').eq('module', source);
    for (const paper of papers || []) {
      const title = bankTitles.has(paper.title) ? `${name} — ${paper.title}` : paper.title;
      const { error } = await db.from('question_banks')
        .update({ module: target.id, title }).eq('id', paper.id);
      if (error) {
        return NextResponse.json({
          error: `تعذّر نقل أسئلة ${name} — ${error.message}`,
          done,
        }, { status: 500 });
      }
      bankTitles.add(title);
    }

    done.push(name);
  }

  // Emptied. What cascades off these rows now is their own leftover chapter
  // rows — the files and the papers have already left.
  const { error: swept } = await db.from('modules').delete().in('id', sources);
  if (swept) {
    return NextResponse.json({
      error: `نُقل المحتوى ولم تُحذف المواد الفارغة — ${swept.message}`,
      done,
    }, { status: 500 });
  }

  if (rename?.trim() && rename.trim() !== target.name) {
    await db.from('modules').update({ name: rename.trim() }).eq('id', target.id);
  }

  await db.from('audit_log').insert({
    actor: profile.id, action: 'modules_merged',
    target_type: 'module', target_id: target.id,
    detail: {
      promo: target.promo,
      into: rename?.trim() || target.name,
      folded: moving.map((m) => ({ name: m.name, documents: m.documents, banks: m.banks })),
    },
  }).then(() => {}, () => {});

  return NextResponse.json({
    ok: true,
    into: rename?.trim() || target.name,
    chapters: done.length,
    documents: moving.reduce((n, m) => n + (m.documents || 0), 0)
      + (foldKeeper ? loose.length : 0),
    banks: moving.reduce((n, m) => n + (m.banks || 0), 0),
  });
}
