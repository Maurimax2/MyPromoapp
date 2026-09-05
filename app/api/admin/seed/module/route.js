// Moving one subject into the database.
//
// The whole catalogue at once is a minute of work and dies on a serverless
// timeout, so it goes one subject at a time: nine short requests the panel
// fires by itself, instead of one long one behind a button nobody should have
// had to press.

import { NextResponse } from 'next/server';
import { MODULES } from '@/lib/data';
import { banksFor } from '@/lib/questions';
import { currentProfile, isStaff } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';
export const maxDuration = 60;

const bytesOf = (mb) => (mb ? Math.round(Number(mb) * 1048576) : null);

/** The subjects to move, in order, so the panel knows what it is working through. */
export async function GET() {
  const profile = await currentProfile();
  if (!isStaff(profile)) return NextResponse.json({ error: 'staff only' }, { status: 403 });
  return NextResponse.json({
    modules: MODULES.map((m) => ({ id: m.id, name: m.name })),
  });
}

export async function POST(request) {
  const profile = await currentProfile();
  if (!isStaff(profile)) return NextResponse.json({ error: 'staff only' }, { status: 403 });

  const { id } = await request.json();
  const m = MODULES.find((x) => x.id === id);
  if (!m) return NextResponse.json({ error: `لا مادة باسم ${id}` }, { status: 400 });

  const db = supabaseAdmin();
  const fail = (what, { error }) => {
    if (error) throw new Error(`${what}: ${error.message}`);
  };

  try {
    // The promo has to exist before a subject can point at it. schema.sql
    // inserts the six, but a database where that insert never ran would fail
    // every subject with a foreign key error and no obvious reason.
    const { PROMOS } = await import('@/lib/data');
    const promo = PROMOS.find((p) => p.id === m.promo);
    if (promo) {
      fail('promo', await db.from('promos').upsert({
        id: promo.id, name: promo.name, label: promo.label,
        badge: promo.badge, indexed: !!promo.indexed,
        position: PROMOS.indexOf(promo),
      }));
    }

    fail('module', await db.from('modules').upsert({
      id: m.id, promo: m.promo, semester: m.semester, name: m.name,
      icon: m.icon, tint: m.tint, professors: m.professors || [],
      position: MODULES.indexOf(m),
    }));

    const chapterId = new Map();
    for (const [c, ch] of (m.chapters || []).entries()) {
      const res = await db.from('chapters')
        .upsert({ module: m.id, title: ch.title, subtitle: ch.subtitle, position: c },
                { onConflict: 'module,title' })
        .select('id').maybeSingle();
      fail(`chapter ${ch.title}`, res);
      if (res.data) chapterId.set(ch.title, res.data.id);
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
        });
      }
    }

    const parents = rows.map(({ _versions, ...r }) => r);
    let saved = [];
    if (parents.length) {
      const res = await db.from('documents')
        .upsert(parents, { onConflict: 'drive_id' })
        .select('id, drive_id');
      fail('documents', res);
      saved = res.data || [];
    }

    const idByDrive = new Map(saved.map((d) => [d.drive_id, d.id]));

    const children = rows.flatMap((r) =>
      (r._versions || []).map((v, k) => ({
        module: m.id, chapter: r.chapter, where_shown: r.where_shown, section: r.section,
        n: null, title: v.title, prof: v.prof || null, year: v.year || null,
        ext: v.ext || 'PDF', bytes: bytesOf(v.mb), drive_id: v.fid,
        parent: idByDrive.get(r.drive_id) ?? null, position: k,
      })));
    if (children.length) {
      fail('versions', await db.from('documents').upsert(children, { onConflict: 'drive_id' }));
    }

    let questions = 0;
    for (const [b, bank] of banksFor(m.id).entries()) {
      const res = await db.from('question_banks')
        .upsert({ module: m.id, title: bank.title, section: bank.section || null,
                  document: idByDrive.get(bank.fid) ?? null, position: b },
                { onConflict: 'module,title' })
        .select('id').maybeSingle();
      fail(`bank ${bank.title}`, res);
      if (!res.data) continue;

      const qs = bank.questions.map((q) => ({
        bank: res.data.id,
        n: String(q.n),
        stem: q.q,
        options: q.options,
        answer: q.answer || [],
        why: q.why || null,
        source: q.by === 'paper' ? 'paper' : 'claude',
        status: (q.answer || []).length ? 'published' : 'needs_answer',
      }));
      if (qs.length) {
        fail(`questions ${bank.title}`, await db.from('questions')
          .upsert(qs, { onConflict: 'bank,n' }));
        questions += qs.length;
      }
    }

    return NextResponse.json({
      id: m.id, name: m.name,
      documents: parents.length + children.length,
      questions,
    });
  } catch (err) {
    return NextResponse.json({ id: m.id, name: m.name, error: String(err.message) }, { status: 500 });
  }
}
