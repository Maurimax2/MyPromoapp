// Which of a subject's files can a student actually open?
//
//   GET /api/admin/files/check?module=<id>&offset=0
//
// A few dozen files per call — each one is asked of Google the way a stranger
// would ask (lib/drive-open.js), and a long subject would not finish inside
// one request. The screen keeps calling with the next offset until `done`.

import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/staff';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { openness } from '@/lib/drive-open';

export const runtime = 'nodejs';
export const maxDuration = 60;

const PAGE = 60;

export async function GET(request) {
  const gate = await requireStaff();
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });

  const url = new URL(request.url);
  const module = url.searchParams.get('module');
  const offset = Math.max(0, Number(url.searchParams.get('offset')) || 0);
  if (!module) return NextResponse.json({ error: 'اختر مادة' }, { status: 400 });

  const db = supabaseAdmin();
  const { data, count, error } = await db.from('documents')
    .select('id, title, drive_id', { count: 'exact' })
    .eq('module', module).not('drive_id', 'is', null)
    .order('id', { ascending: true }).range(offset, offset + PAGE - 1);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const files = data || [];
  const verdict = await openness(files.map((f) => f.drive_id));

  return NextResponse.json({
    total: count || 0,
    from: offset,
    checked: files.length,
    done: offset + files.length >= (count || 0),
    closed: files.filter((f) => verdict.get(f.drive_id) === 'closed')
      .map((f) => ({ id: f.id, title: f.title, drive_id: f.drive_id })),
    unknown: files.filter((f) => verdict.get(f.drive_id) === 'unknown').length,
  });
}
