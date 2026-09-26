// Sub-subjects — «الفصل» — for the modules that need one.
//
// Most subjects are flat: one name, files under it. Some are not — a subject
// taught as several distinct series under one name — and for those, a file
// belongs to a chapter as well as a subject. Not every subject gets one; a
// module with none simply has none, and nothing here forces it to.

import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/staff';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

export async function GET(request) {
  const gate = await requireStaff();
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });

  const module = new URL(request.url).searchParams.get('module');
  if (!module) return NextResponse.json({ error: 'أي مادة؟' }, { status: 400 });

  const db = supabaseAdmin();
  const { data, error } = await db.from('chapters')
    .select('id, title, subtitle, position').eq('module', module).order('position');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ chapters: data || [] });
}

export async function POST(request) {
  const gate = await requireStaff();
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });

  const { module, title } = await request.json();
  const name = String(title || '').trim().slice(0, 120);
  if (!module) return NextResponse.json({ error: 'أي مادة؟' }, { status: 400 });
  if (!name) return NextResponse.json({ error: 'اكتب اسم الفصل' }, { status: 400 });

  const db = supabaseAdmin();

  // Look first, then insert — chapters_module_title_key is a real unique
  // constraint, but the same name typed twice from two tabs is meant to be
  // the same chapter, not a 409 the panel has to explain.
  const { data: had, error: readErr } = await db.from('chapters')
    .select('id').eq('module', module).eq('title', name).maybeSingle();
  if (readErr) return NextResponse.json({ error: readErr.message }, { status: 500 });
  if (had) return NextResponse.json({ id: had.id, title: name });

  const { count } = await db.from('chapters')
    .select('id', { count: 'exact', head: true }).eq('module', module);

  const { data, error } = await db.from('chapters')
    .insert({ module, title: name, position: count || 0 })
    .select('id').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id, title: name });
}
