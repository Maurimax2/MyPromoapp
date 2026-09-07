// Adding a year.
//
// Six were hard-coded because six is what UNEM has. That was a fact about
// today, not a rule — so a year is a row like anything else, and the panel can
// make one.

import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/staff';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { isAdmin } from '@/lib/supabase/server';

export const runtime = 'nodejs';

// Each year needs a colour of its own — it is shown on every post, so two
// years must never share one. Picked in order, cycling if it ever runs out.
const BADGES = ['#8B5CF6', '#6B21B5', '#F97316', '#C2410C', '#7C3AED', '#9A3412',
                '#0E7490', '#4D7C0F', '#BE123C', '#1D4ED8'];

const slug = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 30);

export async function POST(request) {
  const gate = await requireStaff();
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });
  const profile = gate.profile;

  const { name, label } = await request.json();
  const short = String(name || '').trim().toUpperCase();
  const arabic = String(label || '').trim();

  if (!short) return NextResponse.json({ error: 'اكتب اسم السنة، مثل PCEM1' }, { status: 400 });
  if (!arabic) return NextResponse.json({ error: 'اكتب الاسم بالعربية' }, { status: 400 });

  const id = slug(short);
  if (!id) return NextResponse.json({ error: 'الاسم بالحروف اللاتينية' }, { status: 400 });

  const db = supabaseAdmin();

  const clash = await db.from('promos').select('id').eq('id', id).maybeSingle();
  if (clash.error) return NextResponse.json({ error: clash.error.message }, { status: 500 });
  if (clash.data) return NextResponse.json({ error: 'هذه السنة موجودة' }, { status: 409 });

  const all = await db.from('promos').select('id', { count: 'exact' });
  if (all.error) return NextResponse.json({ error: all.error.message }, { status: 500 });
  const n = all.data?.length || 0;

  const { error } = await db.from('promos').insert({
    id, name: short, label: arabic,
    badge: BADGES[n % BADGES.length], position: n + 1, indexed: false,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await db.from('audit_log').insert({
    actor: profile.id, action: 'promo_added', target_type: 'promo', target_id: id,
  });

  return NextResponse.json({ id, name: short, label: arabic });
}

/**
 * Removing a year, and every subject in it.
 *
 * This is the largest thing anybody can delete here — the cascade reaches the
 * year's subjects, their files and every question. Like a subject, a call
 * without `confirm` only counts.
 */
export async function DELETE(request) {
  const gate = await requireStaff();
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });
  if (!isAdmin(gate.profile)) {
    return NextResponse.json({ error: 'حذف السنوات للمشرفين وحدهم' }, { status: 403 });
  }
  const profile = gate.profile;

  const { id, confirm } = await request.json();
  if (!id) return NextResponse.json({ error: 'لا سنة' }, { status: 400 });

  const db = supabaseAdmin();
  const { data: promo, error: lookup } = await db.from('promos')
    .select('id, name').eq('id', id).maybeSingle();
  if (lookup) {
    return NextResponse.json({ error: `تعذّرت قراءة السنة — ${lookup.message}` }, { status: 500 });
  }
  if (!promo) return NextResponse.json({ error: 'لم نجد هذه السنة' }, { status: 404 });

  const { data: modules, error: listed } = await db.from('modules')
    .select('id').eq('promo', id);
  if (listed) {
    return NextResponse.json({ error: `تعذّرت قراءة مواد السنة — ${listed.message}` }, { status: 500 });
  }

  const ids = (modules || []).map((m) => m.id);
  let documents = 0;
  if (ids.length) {
    const { count, error } = await db.from('documents')
      .select('*', { count: 'exact', head: true }).in('module', ids);
    documents = error ? null : count || 0;
  }

  // Somebody is in this year. Their profile survives — it is the year that
  // goes — but they land in an app with nothing in it, so say so first.
  const { count: people } = await db.from('profiles')
    .select('*', { count: 'exact', head: true }).eq('promo', id);

  if (!confirm) {
    return NextResponse.json({
      preview: true, name: promo.name, subjects: ids.length, documents, people: people || 0,
    });
  }

  // As above: nothing deleted is not an error, so check what came back.
  const { data: gone, error } = await db.from('promos').delete().eq('id', id).select('id');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!gone?.length) {
    return NextResponse.json({ error: 'لم تُحذف — لم نجد هذه السنة' }, { status: 404 });
  }

  try {
    await db.from('audit_log').insert({
      actor: profile.id, action: 'promo_deleted',
      target_type: 'promo', target_id: String(id),
      detail: { name: promo.name, subjects: ids.length, documents, people: people || 0 },
    });
  } catch {
    // Already gone.
  }

  return NextResponse.json({ ok: true, name: promo.name, subjects: ids.length, documents });
}
