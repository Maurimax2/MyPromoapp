// Moving one subject into the database.
//
// The whole catalogue at once is a minute of work and dies on a serverless
// timeout, so it goes one subject at a time: nine short requests the panel
// fires by itself.
//
// It does not use ON CONFLICT. Postgres can only infer a conflict target from
// a unique CONSTRAINT, and this schema has unique indexes — one of them
// partial (`where drive_id is not null`), which cannot be inferred from at
// all. So every write here looks first and inserts what is missing. That is
// one extra query per kind, and it works against the database as it stands
// rather than the one I meant to write.

import { NextResponse } from 'next/server';
import { MODULES, PROMOS } from '@/lib/data';
import { banksFor } from '@/lib/questions';
import { currentProfile, isStaff } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';
export const maxDuration = 60;

const bytesOf = (mb) => (mb ? Math.round(Number(mb) * 1048576) : null);

export async function GET() {
  const profile = await currentProfile();
  if (!isStaff(profile)) return NextResponse.json({ error: 'staff only' }, { status: 403 });
  return NextResponse.json({ modules: MODULES.map((m) => ({ id: m.id, name: m.name })) });
}

export async function POST(request) {
  const profile = await currentProfile();
  if (!isStaff(profile)) return NextResponse.json({ error: 'staff only' }, { status: 403 });

  const { id } = await request.json();
  const m = MODULES.find((x) => x.id === id);
  if (!m) return NextResponse.json({ error: `لا مادة باسم ${id}` }, { status: 400 });

  const db = supabaseAdmin();
  const fail = (what, { error }) => { if (error) throw new Error(`${what}: ${error.message}`); };

  /** Look up what is already there, insert the rest, return every id by key. */
  async function reconcile(table, filter, keyOf, wanted, select) {
    const found = await filter(db.from(table).select(select));
    fail(`${table} lookup`, found);

    const byKey = new Map((found.data || []).map((r) => [keyOf(r), r.id]));
    const missing = [];
    const seen = new Set(byKey.keys());
    for (const row of wanted) {
      const k = keyOf(row);
      if (seen.has(k)) continue;       // already stored, or repeated in our own data
      seen.add(k);
      missing.push(row);
    }

    if (missing.length) {
      const put = await db.from(table).insert(missing).select(select);
      fail(table, put);
      for (const r of put.data || []) byKey.set(keyOf(r), r.id);
    }
    return { byKey, added: missing.length };
  }

  try {
    const promo = PROMOS.find((p) => p.id === m.promo);
    if (promo) {
      const has = await db.from('promos').select('id').eq('id', promo.id).maybeSingle();
      fail('promo lookup', has);
      if (!has.data) {
        fail('promo', await db.from('promos').insert({
          id: promo.id, name: promo.name, label: promo.label,
          badge: promo.badge, indexed: !!promo.indexed, position: PROMOS.indexOf(promo),
        }));
      }
    }

    const known = await db.from('modules').select('id').eq('id', m.id).maybeSingle();
    fail('module lookup', known);
    const modRow = {
      id: m.id, promo: m.promo, semester: m.semester, name: m.name,
      icon: m.icon, tint: m.tint, professors: m.professors || [],
      position: MODULES.indexOf(m),
    };
    fail('module', known.data
      ? await db.from('modules').update(modRow).eq('id', m.id)
      : await db.from('modules').insert(modRow));

    // ---- chapters -------------------------------------------------------
    const { byKey: chapterId } = await reconcile(
      'chapters',
      (q) => q.eq('module', m.id),
      (r) => r.title,
      (m.chapters || []).map((ch, i) => ({
        module: m.id, title: ch.title, subtitle: ch.subtitle || null, position: i,
      })),
      'id, title',
    );

    // ---- documents ------------------------------------------------------
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

    const parents = rows.map(({ _versions, ...r }) => r).filter((r) => r.drive_id);
    const idByDrive = new Map();
    let documents = 0;

    // A module can hold more files than one URL can carry ids for, so the
    // lookup is chunked.
    for (let i = 0; i < parents.length; i += 100) {
      const slice = parents.slice(i, i + 100);
      const { byKey, added } = await reconcile(
        'documents',
        (q) => q.in('drive_id', slice.map((r) => r.drive_id)),
        (r) => r.drive_id,
        slice,
        'id, drive_id',
      );
      for (const [k, v] of byKey) idByDrive.set(k, v);
      documents += added;
    }

    const children = rows.flatMap((r) =>
      (r._versions || []).map((v, k) => ({
        module: m.id, chapter: r.chapter, where_shown: r.where_shown, section: r.section,
        n: null, title: v.title, prof: v.prof || null, year: v.year || null,
        ext: v.ext || 'PDF', bytes: bytesOf(v.mb), drive_id: v.fid,
        parent: idByDrive.get(r.drive_id) ?? null, position: k,
      }))).filter((c) => c.drive_id);

    for (let i = 0; i < children.length; i += 100) {
      const slice = children.slice(i, i + 100);
      const { added } = await reconcile(
        'documents',
        (q) => q.in('drive_id', slice.map((r) => r.drive_id)),
        (r) => r.drive_id,
        slice,
        'id, drive_id',
      );
      documents += added;
    }

    // ---- questions ------------------------------------------------------
    const banks = banksFor(m.id);
    const { byKey: bankId } = await reconcile(
      'question_banks',
      (q) => q.eq('module', m.id),
      (r) => r.title,
      banks.map((b, i) => ({
        module: m.id, title: b.title, section: b.section || null,
        document: idByDrive.get(b.fid) ?? null, position: i,
      })),
      'id, title',
    );

    let questions = 0;
    for (const bank of banks) {
      const bid = bankId.get(bank.title);
      if (!bid) continue;

      const { added } = await reconcile(
        'questions',
        (q) => q.eq('bank', bid),
        (r) => String(r.n),
        bank.questions.map((q) => ({
          bank: bid,
          n: String(q.n),
          stem: q.q,
          options: q.options,
          answer: q.answer || [],
          why: q.why || null,
          source: q.by === 'paper' ? 'paper' : 'claude',
          status: (q.answer || []).length ? 'published' : 'needs_answer',
        })),
        'id, n',
      );
      questions += added;
    }

    return NextResponse.json({ id: m.id, name: m.name, documents, questions });
  } catch (err) {
    return NextResponse.json(
      { id: m.id, name: m.name, error: String(err.message) }, { status: 500 });
  }
}
