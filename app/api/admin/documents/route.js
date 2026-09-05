// Saving what the import screen was shown, after a person has corrected it.

import { NextResponse } from 'next/server';
import { currentProfile, isStaff } from '@/lib/supabase/server';
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
