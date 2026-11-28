// «نسيت كلمة السر؟» — a request that somebody on the team answers.
//
// The emailed link could never be a recovery: it opens in the phone's browser,
// which does not hold the half of the sign-in the app started, so it landed on
// the door again — and Supabase's own mailer sends two messages an hour. So a
// forgotten password is a request: it appears in اللوحة ← الأعضاء, an admin
// checks the person against their WhatsApp number or university number, and
// sends them a temporary password.
//
// The request is a row of audit_log, so it needs no table of its own. The
// answer is the same whether or not the account exists: this door must not be
// a way to find out who has one.

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { normalisePhone, normaliseUsername } from '@/lib/identity';
import { getT } from '@/lib/lang';

export const runtime = 'nodejs';

const HOUR = 60 * 60 * 1000;

async function find(db, typed) {
  if (typed.includes('@')) {
    // ilike for the case, with its own wildcards made literal.
    const exact = typed.toLowerCase().replace(/[\\%_]/g, (c) => `\\${c}`);
    const { data } = await db.from('profiles').select('id').ilike('email', exact).limit(1);
    return data?.[0]?.id || null;
  }
  if (/^[\d\s+().-]+$/.test(typed)) {
    const { data } = await db.from('profile_private').select('id').eq('phone', normalisePhone(typed)).limit(1);
    return data?.[0]?.id || null;
  }
  const { data } = await db.from('profiles').select('id')
    .eq('username', normaliseUsername(typed.replace(/^@/, ''))).limit(1);
  return data?.[0]?.id || null;
}

export async function POST(request) {
  const t = await getT();
  const { who } = await request.json().catch(() => ({}));
  const typed = String(who || '').trim().slice(0, 200);
  if (typed.length < 3) {
    return NextResponse.json({ error: t('اكتب بريدك أو اسم المستخدم أو رقم هاتفك') }, { status: 400 });
  }

  const db = supabaseAdmin();
  const id = await find(db, typed);
  if (id) {
    // One request an hour per account: tapping the button twice, or somebody
    // else typing your number, does not fill the panel.
    const { data: recent } = await db.from('audit_log').select('id')
      .eq('action', 'password_reset_asked').eq('target_id', id)
      .gte('at', new Date(Date.now() - HOUR).toISOString()).limit(1);
    if (!recent?.length) {
      const { error } = await db.from('audit_log').insert({
        actor: id, action: 'password_reset_asked', target_type: 'profile', target_id: id,
        detail: { typed },
      });
      if (error) console.error('reset-request: not kept —', error.message);
    }
  }
  return NextResponse.json({ ok: true });
}
