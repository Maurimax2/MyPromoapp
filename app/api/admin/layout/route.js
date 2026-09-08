// Saving how a screen is arranged.
//
// Only what the blocks understand is stored — a row written from the panel
// cannot smuggle a key the screen will later trip over.

import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/staff';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { cleanLayout } from '@/lib/home-blocks';

export const runtime = 'nodejs';

export async function POST(request) {
  const gate = await requireStaff();
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });

  const { screen = 'home', blocks } = await request.json();
  const kept = cleanLayout(blocks);
  if (!kept) return NextResponse.json({ error: 'ترتيب غير مفهوم' }, { status: 400 });

  const db = supabaseAdmin();
  const row = {
    blocks: kept,
    updated_at: new Date().toISOString(),
    updated_by: gate.profile.id,
  };

  // Look first, then write. Never ON CONFLICT against this schema — several of
  // its unique keys are partial indexes and Postgres cannot infer a target
  // from those.
  const { data: already, error: lookup } = await db.from('layouts')
    .select('screen').eq('screen', screen).maybeSingle();
  if (lookup) {
    const missing = /relation .* does not exist|layouts/i.test(lookup.message || '');
    return NextResponse.json({
      error: missing
        ? 'قاعدة البيانات ناقصة جدول layouts — شغّل آخر SQL في Supabase'
        : `تعذّرت القراءة — ${lookup.message}`,
    }, { status: 500 });
  }

  const { error } = already
    ? await db.from('layouts').update(row).eq('screen', screen)
    : await db.from('layouts').insert({ screen, ...row });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, blocks: kept });
}
