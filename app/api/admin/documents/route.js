// Saving what the import screen was shown, after a person has corrected it.
//
// No ON CONFLICT here either. Postgres infers a conflict target only from a
// unique CONSTRAINT, and documents(drive_id) is a PARTIAL unique index —
// `where drive_id is not null` — which it can never infer from. The upsert
// that used to be here failed every save with "there is no unique or
// exclusion constraint matching the ON CONFLICT specification". So we look
// first: what is already stored gets updated, the rest is inserted.

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
  const rows = items
    .filter((it) => it.drive_id && String(it.title || '').trim())
    .map((it, i) => ({
      module,
      where_shown: it.where || 'archive',
      section: it.section || 'lecture',
      title: String(it.title).trim(),
      ext: it.ext || 'PDF',
      bytes: it.bytes ?? null,
      drive_id: it.drive_id,
      position: i,
      created_by: profile.id,
    }));

  if (!rows.length) return NextResponse.json({ error: 'لا شيء لحفظه' }, { status: 400 });

  // The same file can be imported twice — from a folder and again on its own —
  // so a second save must correct the row rather than make another.
  const known = new Map();
  for (let i = 0; i < rows.length; i += 100) {
    const slice = rows.slice(i, i + 100);
    const { data, error } = await db.from('documents')
      .select('id, drive_id').in('drive_id', slice.map((r) => r.drive_id));
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    for (const d of data || []) known.set(d.drive_id, d.id);
  }

  const fresh = rows.filter((r) => !known.has(r.drive_id));
  const again = rows.filter((r) => known.has(r.drive_id));

  if (fresh.length) {
    const { error } = await db.from('documents').insert(fresh);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  for (const r of again) {
    const { created_by, ...fields } = r;
    const { error } = await db.from('documents')
      .update(fields).eq('id', known.get(r.drive_id));
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const count = rows.length;

  await db.from('audit_log').insert({
    actor: profile.id, action: 'imported_documents',
    target_type: 'module', target_id: module,
    detail: { added: fresh.length, updated: again.length },
  });

  return NextResponse.json({ saved: count, added: fresh.length, updated: again.length });
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
