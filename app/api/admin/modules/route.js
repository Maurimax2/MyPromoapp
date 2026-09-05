// Adding a subject to a year.
//
// Six promos exist and always will; subjects are what gets added, year by
// year, as somebody finds the Drive folder for them. The name is French and
// arrives exactly as the faculty writes it — ANATOMIE, BIOCHIMIE — because
// that is what a student reads on their timetable.

import { NextResponse } from 'next/server';
import { currentProfile, isStaff } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

const SEMESTERS = ['S1', 'S2'];

/** anatomie, biochimie — an id from the French name, accents flattened. */
function slug(name) {
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    .slice(0, 40);
}

export async function POST(request) {
  const profile = await currentProfile();
  if (!isStaff(profile)) return NextResponse.json({ error: 'staff only' }, { status: 403 });

  const { promo, semester, name } = await request.json();
  if (!promo) return NextResponse.json({ error: 'أي سنة؟' }, { status: 400 });
  if (!SEMESTERS.includes(semester)) return NextResponse.json({ error: 'S1 أو S2' }, { status: 400 });

  const title = String(name || '').trim();
  if (!title) return NextResponse.json({ error: 'اكتب اسم المادة' }, { status: 400 });

  const base = slug(title);
  if (!base) return NextResponse.json({ error: 'الاسم بالفرنسية' }, { status: 400 });

  const db = supabaseAdmin();

  // Two years can teach ANATOMIE, so the id carries the promo when the plain
  // one is taken. `anatomie`, then `anatomie-dcem1`.
  const { data: taken } = await db.from('modules').select('id, promo').eq('id', base).maybeSingle();
  if (taken?.promo === promo) {
    return NextResponse.json({ error: 'هذه المادة موجودة' }, { status: 409 });
  }
  const id = taken ? `${base}-${promo}` : base;

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
  const profile = await currentProfile();
  if (!isStaff(profile)) return NextResponse.json({ error: 'staff only' }, { status: 403 });

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
