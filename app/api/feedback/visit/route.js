// A visit to /feedback: counted so the panel can say how many opened the
// link, not only how many answered. Anybody may post here, like the form, so
// everything is cut to size and the same visitor within half an hour is one
// visit.

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const clean = (v, n) => (typeof v === 'string' ? v.replace(/[^\w.:-]/g, '').slice(0, n) : '');

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const visitor = clean(body?.visitor, 40);
  const source = clean(body?.source, 120);
  try {
    const db = supabaseAdmin();
    if (visitor) {
      const since = new Date(Date.now() - 30 * 60e3).toISOString();
      const { data } = await db.from('feedback_visits').select('id').eq('visitor', visitor).gte('created_at', since).limit(1);
      if (data?.length) return NextResponse.json({ ok: true, counted: false });
    }
    await db.from('feedback_visits').insert({ visitor, source });
  } catch { /* a visit that fails to count must never break the page */ }
  return NextResponse.json({ ok: true });
}
