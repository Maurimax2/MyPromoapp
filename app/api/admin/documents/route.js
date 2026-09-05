// Saving what the import screen was shown, after a person has corrected it.

import { NextResponse } from 'next/server';
import { currentProfile, isStaff, isAdmin } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

export async function POST(request) {
  const profile = await currentProfile();
  if (!isStaff(profile)) return NextResponse.json({ error: 'staff only' }, { status: 403 });

  const { module, items } = await request.json();
  if (!module || !Array.isArray(items) || !items.length) {
    return NextResponse.json({ error: 'لا شيء لحفظه' }, { status: 400 });
  }

  const db = supabaseAdmin();
  const rows = items.map((it, i) => ({
    module,
    where_shown: it.where || 'archive',
    section: it.section || 'lecture',
    title: it.title,
    ext: it.ext || 'PDF',
    bytes: it.bytes ?? null,
    drive_id: it.drive_id,
    position: i,
    created_by: profile.id,
  }));

  const { error, count } = await db
    .from('documents')
    .upsert(rows, { onConflict: 'drive_id', count: 'exact' });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await db.from('audit_log').insert({
    actor: profile.id, action: 'imported_documents',
    target_type: 'module', target_id: module, detail: { count: rows.length },
  });

  return NextResponse.json({ saved: count ?? rows.length });
}

// Correcting one file after the fact: its name, the screen it appears on,
// what kind of thing it is. The Drive original is never touched — only what
// MyPromo says about it.
export async function PATCH(request) {
  const profile = await currentProfile();
  if (!isStaff(profile)) return NextResponse.json({ error: 'staff only' }, { status: 403 });

  const { id, title, where_shown, section, n, prof, year, published } = await request.json();
  if (!id) return NextResponse.json({ error: 'no file' }, { status: 400 });
  if (title !== undefined && !String(title).trim()) {
    return NextResponse.json({ error: 'الاسم لا يمكن أن يكون فارغًا' }, { status: 400 });
  }

  const db = supabaseAdmin();
  const { error } = await db.from('documents').update({
    ...(title !== undefined ? { title: String(title).trim() } : {}),
    ...(where_shown ? { where_shown } : {}),
    ...(section ? { section } : {}),
    ...(n !== undefined ? { n: n || null } : {}),
    ...(prof !== undefined ? { prof: prof || null } : {}),
    ...(year !== undefined ? { year: year || null } : {}),
    ...(published !== undefined ? { published } : {}),
  }).eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await db.from('audit_log').insert({
    actor: profile.id, action: 'document_edited',
    target_type: 'document', target_id: String(id),
  });

  return NextResponse.json({ ok: true });
}

// Removing a file from MyPromo. Admins only, and only ever the row: the file
// itself belongs to someone else's Drive and is not ours to delete.
export async function DELETE(request) {
  const profile = await currentProfile();
  if (!isAdmin(profile)) return NextResponse.json({ error: 'admins only' }, { status: 403 });

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: 'no file' }, { status: 400 });

  const db = supabaseAdmin();
  const { error } = await db.from('documents').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await db.from('audit_log').insert({
    actor: profile.id, action: 'document_deleted',
    target_type: 'document', target_id: String(id),
  });

  return NextResponse.json({ ok: true });
}
