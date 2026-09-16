// شاركنا رأيك — the one route in the app that anybody may post to.
//
// The pre-launch page is read by students who have no account, so there is no
// session to check and nothing to check it against. What protects the table is
// this file: every field is measured and cut to size before it is written, the
// year has to be a year, and the same answer sent twice in a minute is treated
// as one answer sent twice.
//
// The service key never leaves the server. The browser posts here; here writes
// to Postgres. That is why the table's policies can say nobody inserts.

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { PROMOS } from '@/lib/data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// What a student may have been offered on the page. Anything else was not on
// the screen, so it was not typed by somebody using it.
const NEEDS = new Set(['QCM', 'Flashcards', 'Résumés', 'IA', "Groupes d'étude", 'Autre']);

// Long enough to say something real, short enough that nobody fills the table
// with a pasted book.
const LIMIT = { pain: 2000, wish: 2000, name: 80, phone: 40, source: 120 };

const text = (v, max) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '');

/** The years the panel knows, plus the six the app shipped with. */
async function years(db) {
  try {
    const { data } = await db.from('promos').select('id');
    if (data?.length) return new Set(data.map((p) => p.id));
  } catch { /* fall through to the file */ }
  return new Set(PROMOS.map((p) => p.id));
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'قراءة غير ممكنة' }, { status: 400 });
  }

  let db;
  try {
    db = supabaseAdmin();
  } catch {
    // Not configured. Say so as a server fault, because it is one — the
    // student did nothing wrong and the page tells them to try again.
    return NextResponse.json({ error: 'الخدمة غير متاحة الآن' }, { status: 503 });
  }

  const promo = String(body?.promo || '').toLowerCase();
  if (!(await years(db)).has(promo)) {
    return NextResponse.json({ error: 'اختر سنتك' }, { status: 400 });
  }

  const needs = Array.isArray(body?.needs)
    ? [...new Set(body.needs.filter((n) => NEEDS.has(n)))]
    : [];
  const pain = text(body?.pain, LIMIT.pain);
  const wish = text(body?.wish, LIMIT.wish);
  const reach = body?.reach === true;
  const name = reach ? text(body?.name, LIMIT.name) : '';
  const phone = reach ? text(body?.phone, LIMIT.phone) : '';
  const source = text(body?.source, LIMIT.source);

  // A form that collects nothing but a year is a tap, not an opinion. It is
  // still answered with ok: a student who taps through has not done anything
  // wrong and does not need to be told off — there is simply nothing to keep.
  if (!needs.length && !pain && !wish && !reach) {
    return NextResponse.json({ ok: true, kept: false });
  }

  // The same answer twice. A double tap or a retry on a bad connection sends
  // the identical body a few seconds apart; a student writing again tomorrow
  // is a different thing entirely and is kept.
  try {
    const since = new Date(Date.now() - 2 * 60e3).toISOString();
    const { data: recent } = await db.from('feedback')
      .select('id, pain, wish, phone')
      .eq('promo', promo)
      .gte('created_at', since)
      .limit(20);
    const same = (recent || []).some((r) => r.pain === pain && r.wish === wish && r.phone === phone);
    if (same) return NextResponse.json({ ok: true, kept: false });
  } catch { /* the look is a courtesy; failing it must not lose the answer */ }

  // Never `upsert`: Postgres infers a conflict target from a unique
  // constraint, and this table has none.
  const { error } = await db.from('feedback')
    .insert({ promo, needs, pain, wish, reach, name, phone, source });

  if (error) {
    return NextResponse.json({ error: 'تعذّر الحفظ' }, { status: 500 });
  }
  return NextResponse.json({ ok: true, kept: true });
}
