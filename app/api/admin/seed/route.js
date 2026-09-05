// Moving the catalogue out of the code and into the database. Once.
//
// Everything the app knows today — nine modules, their chapters, 1101 files
// and 1066 questions — lives in `lib/data.js` and `lib/questions/`. This reads
// those and writes them to Postgres, after which the admin panel is the way
// they change and these files are only history.
//
// Safe to run twice: files are keyed by their Drive id and questions by their
// bank and number, so a second run updates rather than duplicates.

import { NextResponse } from 'next/server';
import { MODULES, sectionsFor } from '@/lib/data';
import { banksFor } from '@/lib/questions';
import { currentProfile, isAdmin } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';
export const maxDuration = 300;

const bytesOf = (mb) => (mb ? Math.round(Number(mb) * 1048576) : null);

export async function POST(request) {
  const profile = await currentProfile();
  if (!isAdmin(profile)) {
    return NextResponse.json({ error: 'admin only' }, { status: 403 });
  }

  const db = supabaseAdmin();
  const report = { modules: 0, chapters: 0, documents: 0, banks: 0, questions: 0 };

  // Every write below used to have its error thrown away, so the button said
  // "done" over an empty database. It says what actually happened now.
  const failures = [];
  const check = (what, { error }) => { if (error) failures.push(`${what}: ${error.message}`); };

  for (const [i, m] of MODULES.entries()) {
    check(`module ${m.id}`, await db.from('modules').upsert({
      id: m.id, promo: m.promo, semester: m.semester, name: m.name,
      icon: m.icon, tint: m.tint, professors: m.professors || [], position: i,
    }));
    report.modules += 1;

    // Chapters come back with their new ids so the lectures can point at them.
    const chapterId = new Map();
    for (const [c, ch] of (m.chapters || []).entries()) {
      const res = await db.from('chapters')
        .upsert({ module: m.id, title: ch.title, subtitle: ch.subtitle, position: c },
                { onConflict: 'module,title' })
        .select('id').maybeSingle();
      check(`chapter ${ch.title}`, res);
      if (res.data) chapterId.set(ch.title, res.data.id);
      report.chapters += 1;
    }

    const rows = [];
    for (const ch of m.chapters || []) {
      for (const [k, l] of ch.lectures.entries()) {
        rows.push({
          module: m.id, chapter: chapterId.get(ch.title) ?? null,
          where_shown: 'archive', section: 'lecture',
          n: String(l.n), title: l.title, prof: l.prof || null, year: l.year || null,
          ext: l.ext || 'PDF', bytes: bytesOf(l.mb), drive_id: l.fid,
          pages: l.pages || null, position: k, _versions: l.versions || [],
        });
      }
    }
    for (const s of m.sections || []) {
      for (const [k, it] of s.items.entries()) {
        rows.push({
          module: m.id, chapter: null, where_shown: s.where, section: s.id,
          n: null, title: it.title, prof: it.prof || null, year: it.year || null,
          ext: it.ext || 'PDF', bytes: bytesOf(it.mb), drive_id: it.fid,
          pages: it.pages || null, position: k, _versions: it.versions || [],
          _correction: it.correction || null,
        });
      }
    }

    // Parents first, then the other years that hang off them.
    const parents = rows.map(({ _versions, _correction, ...r }) => r);
    const savedRes = await db.from('documents')
      .upsert(parents, { onConflict: 'drive_id' })
      .select('id, drive_id');
    check(`documents ${m.id}`, savedRes);
    const saved = savedRes.data;
    report.documents += saved?.length ?? 0;

    const idByDrive = new Map((saved || []).map((d) => [d.drive_id, d.id]));

    const children = rows.flatMap((r) =>
      (r._versions || []).map((v, k) => ({
        module: m.id, chapter: r.chapter, where_shown: r.where_shown, section: r.section,
        n: null, title: v.title, prof: v.prof || null, year: v.year || null,
        ext: v.ext || 'PDF', bytes: bytesOf(v.mb), drive_id: v.fid,
        parent: idByDrive.get(r.drive_id) ?? null, position: k,
      })));
    if (children.length) {
      check(`versions ${m.id}`, await db.from('documents')
        .upsert(children, { onConflict: 'drive_id' }));
      report.documents += children.length;
    }

    for (const [b, bank] of banksFor(m.id).entries()) {
      const bankRes = await db.from('question_banks')
        .upsert({ module: m.id, title: bank.title, section: bank.section || null,
                  document: idByDrive.get(bank.fid) ?? null, position: b },
                { onConflict: 'module,title' })
        .select('id').maybeSingle();
      check(`bank ${bank.title}`, bankRes);
      const row = bankRes.data;
      if (!row) continue;
      report.banks += 1;

      const questions = bank.questions.map((q) => ({
        bank: row.id,
        n: String(q.n),
        stem: q.q,
        options: q.options,
        answer: q.answer || [],
        why: q.why || null,
        source: q.by === 'paper' ? 'paper' : 'claude',
        status: (q.answer || []).length ? 'published' : 'needs_answer',
      }));
      if (questions.length) {
        check(`questions ${bank.title}`, await db.from('questions')
          .upsert(questions, { onConflict: 'bank,n' }));
        report.questions += questions.length;
      }
    }
  }

  await db.from('audit_log').insert({
    actor: profile.id, action: 'seeded_catalogue', detail: { ...report, failures },
  });

  // A failed migration must not look like a finished one. The first few
  // messages are enough to say what went wrong — usually one missing table.
  if (failures.length) {
    const url = new URL('/admin', request.url);
    url.searchParams.set('seed', 'failed');
    url.searchParams.set('why', failures.slice(0, 3).join(' · ').slice(0, 300));
    return NextResponse.redirect(url, 303);
  }

  const done = new URL('/admin', request.url);
  done.searchParams.set('seed', String(report.documents));
  return NextResponse.redirect(done, 303);
}
