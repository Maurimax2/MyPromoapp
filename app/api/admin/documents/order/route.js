// Putting the lectures in the order they are taught.
//
// `position` was written once, at import, as the loop index — so the archive
// listed a subject in whatever order somebody happened to upload it, and
// nothing in the panel could change that afterwards.
//
// That is not only a cosmetic problem. The lecture numbers are derived from
// this order (lib/lectures.js), and تصنيف الأسئلة sends a question to a
// lecture BY its number. An upload order is therefore a wrong set of numbers,
// and a question filed under 7 lands on whatever the uploader's file picker
// happened to hand over seventh.

import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/staff';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

/** Said, and not worth failing the reorder over. */
async function note(db, row) {
  try {
    await db.from('audit_log').insert(row);
  } catch {
    // The thing itself already happened.
  }
}

/**
 * The whole order at once, never a swap.
 *
 * Two people reordering the same subject would otherwise leave the positions
 * interleaved from two different orders, and there is no order that is half of
 * each. Sending the list means the last writer wins a coherent list rather
 * than both winning half of one.
 */
export async function PUT(request) {
  const gate = await requireStaff();
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });
  const profile = gate.profile;

  const { module, order } = await request.json().catch(() => ({}));
  if (!module) return NextResponse.json({ error: 'لا مادة' }, { status: 400 });
  if (!Array.isArray(order) || !order.length) {
    return NextResponse.json({ error: 'لا ترتيب' }, { status: 400 });
  }

  const ids = order.map(Number).filter((n) => Number.isInteger(n) && n > 0);
  if (ids.length !== order.length) {
    return NextResponse.json({ error: 'ترتيب غير صالح' }, { status: 400 });
  }
  if (new Set(ids).size !== ids.length) {
    return NextResponse.json({ error: 'ملف مكرَّر في الترتيب' }, { status: 400 });
  }

  const db = supabaseAdmin();

  // Only this subject's rows are moved. An id from another module would
  // otherwise be given a position inside a subject it does not belong to, and
  // it would sit there among lectures it has nothing to do with — visible to
  // students, and hard to explain afterwards.
  const { data: mine, error: reading } = await db
    .from('documents').select('id').eq('module', module).in('id', ids);
  if (reading) return NextResponse.json({ error: reading.message }, { status: 500 });

  const here = new Set((mine || []).map((d) => d.id));
  const foreign = ids.filter((id) => !here.has(id));
  if (foreign.length) {
    return NextResponse.json({ error: 'ملفات من مادة أخرى', foreign }, { status: 400 });
  }

  // One update per row, and no upsert. Several of this schema's unique indexes
  // are partial, so Postgres cannot infer a conflict target and an upsert
  // fails on the whole batch.
  for (let i = 0; i < ids.length; i++) {
    const { error } = await db.from('documents')
      .update({ position: i }).eq('id', ids[i]).eq('module', module);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await note(db, {
    actor: profile.id, action: 'documents_reordered',
    target_type: 'module', target_id: String(module),
  });

  return NextResponse.json({ ok: true, moved: ids.length });
}
