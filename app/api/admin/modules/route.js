// Adding a subject to a year.
//
// Six promos exist and always will; subjects are what gets added, year by
// year, as somebody finds the Drive folder for them. The name is French and
// arrives exactly as the faculty writes it — ANATOMIE, BIOCHIMIE — because
// that is what a student reads on their timetable.

import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/staff';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { isAdmin } from '@/lib/supabase/server';
import { subjectKey, subjectName } from '@/lib/data';

export const runtime = 'nodejs';

const SEMESTERS = ['S1', 'S2'];

/** anatomie, biochimie — an id from the French name, accents flattened. */
function slug(name) {
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    .slice(0, 40);
}

export async function POST(request) {
  const gate = await requireStaff();
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });
  const profile = gate.profile;

  const { promo, semester, name } = await request.json();
  if (!promo) return NextResponse.json({ error: 'أي سنة؟' }, { status: 400 });
  if (!SEMESTERS.includes(semester)) return NextResponse.json({ error: 'S1 أو S2' }, { status: 400 });

  const title = String(name || '').trim();
  if (!title) return NextResponse.json({ error: 'اكتب اسم المادة' }, { status: 400 });

  // The semester is a field of its own, so it does not belong in the id even
  // when somebody types it into the name: ANATOMIE S2 filed under S2 is the
  // anatomy subject, and `subjectKey` is what the app groups by.
  const base = slug(subjectName(title));
  if (!base) return NextResponse.json({ error: 'الاسم بالفرنسية' }, { status: 400 });

  const db = supabaseAdmin();

  // A subject runs across both semesters, and is one row for each: ANATOMIE
  // in S1 and ANATOMIE in S2 are two rows the app shows as one subject. So
  // the only real duplicate is the same name, in the same year, in the same
  // semester.
  //
  // This used to refuse the second semester outright, and — worse — it looked
  // at the single row holding the plain id rather than at whether the id it
  // was about to use was free. Adding ANATOMIE to both semesters of PCEM1
  // therefore built `anatomie-pcem1` twice, and the second insert died on the
  // primary key. That is why a year catalogued in the panel arrived in the app
  // with half its subjects missing.
  const { data: here } = await db.from('modules')
    .select('id, semester, name').eq('promo', promo);
  const key = subjectKey(title);
  if ((here || []).some((m) => m.semester === semester && subjectKey(m.name) === key)) {
    return NextResponse.json({ error: 'هذه المادة موجودة في هذا السداسي' }, { status: 409 });
  }

  // The id says what distinguishes this row: first the plain name, then the
  // year that also teaches it, then the semester within that year. Never a
  // bare `-s1`, which on a second year reads as the first year's.
  const { data: every } = await db.from('modules').select('id');
  const used = new Set((every || []).map((m) => m.id));
  const sem = semester.toLowerCase();
  let id = [base, `${base}-${promo}`, `${base}-${promo}-${sem}`].find((c) => !used.has(c));
  for (let n = 2; !id; n += 1) if (!used.has(`${base}-${n}`)) id = `${base}-${n}`;

  const { count } = await db.from('modules')
    .select('*', { count: 'exact', head: true }).eq('promo', promo);

  const { error } = await db.from('modules').insert({
    id, promo, semester, name: title, position: count || 0,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await db.from('audit_log').insert({
    actor: profile.id, action: 'module_added',
    target_type: 'module', target_id: id, detail: { promo, semester, name: title },
  });

  return NextResponse.json({ id });
}

export async function PATCH(request) {
  const gate = await requireStaff();
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });
  const profile = gate.profile;

  const { id, name, semester } = await request.json();
  if (!id) return NextResponse.json({ error: 'no subject' }, { status: 400 });
  if (semester && !SEMESTERS.includes(semester)) {
    return NextResponse.json({ error: 'S1 أو S2' }, { status: 400 });
  }

  const db = supabaseAdmin();
  const { error } = await db.from('modules').update({
    ...(name ? { name: String(name).trim() } : {}),
    ...(semester ? { semester } : {}),
  }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await db.from('audit_log').insert({
    actor: profile.id, action: 'module_edited', target_type: 'module', target_id: id,
  });
  return NextResponse.json({ ok: true });
}

/**
 * Removing a subject, and everything filed under it.
 *
 * The schema cascades: the subject's chapters, its files, its question banks
 * and every question in them go with it. That is a lot to lose to one tap, so
 * a call without `confirm` deletes nothing and answers with the tally instead
 * — the panel shows it and asks again.
 */
export async function DELETE(request) {
  const gate = await requireStaff();
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });
  if (!isAdmin(gate.profile)) {
    return NextResponse.json({ error: 'حذف المواد للمشرفين وحدهم' }, { status: 403 });
  }
  const profile = gate.profile;

  const { id, confirm } = await request.json();
  if (!id) return NextResponse.json({ error: 'لا مادة' }, { status: 400 });

  const db = supabaseAdmin();
  const { data: module, error: lookup } = await db.from('modules')
    .select('id, name, promo').eq('id', id).maybeSingle();

  // A refused read hands back no row, which reads exactly like a subject that
  // is not there. Say which it was.
  if (lookup) {
    return NextResponse.json({ error: `تعذّرت قراءة المادة — ${lookup.message}` }, { status: 500 });
  }
  if (!module) return NextResponse.json({ error: 'لم نجد هذه المادة' }, { status: 404 });

  const tally = async (table, column) => {
    const { count, error } = await db.from(table)
      .select('*', { count: 'exact', head: true }).eq(column, id);
    // A count that could not be read must not be printed as a believable zero.
    return error ? null : count || 0;
  };

  const [documents, chapters, banks] = await Promise.all([
    tally('documents', 'module'),
    tally('chapters', 'module'),
    tally('question_banks', 'module'),
  ]);

  if (!confirm) {
    return NextResponse.json({ preview: true, name: module.name, documents, chapters, banks });
  }

  // The rows come back, so that a delete which matched nothing is told apart
  // from one that worked. Postgres calls both a success.
  const { data: gone, error } = await db.from('modules').delete().eq('id', id).select('id');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!gone?.length) {
    return NextResponse.json({ error: 'لم تُحذف — لم نجد هذه المادة' }, { status: 404 });
  }

  try {
    await db.from('audit_log').insert({
      actor: profile.id, action: 'module_deleted',
      target_type: 'module', target_id: String(id),
      detail: { name: module.name, promo: module.promo, documents, chapters, banks },
    });
  } catch {
    // The subject is already gone; a log that will not write must not say
    // otherwise.
  }

  return NextResponse.json({ ok: true, name: module.name, documents, chapters, banks });
}
