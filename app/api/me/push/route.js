// Your devices and what you want to be told.
//
//   POST   { platform, token, keys? }  this phone or browser may be woken
//   DELETE                              …no longer (this one, or all of them)
//   GET                                 what you have turned off
//   PATCH  { off: [group…] }            turn groups off and on
//
// A token belongs to whoever registered it last, so a shared phone follows
// whoever is signed in on it. Which device *this* is, is kept in a cookie —
// signing out forgets it (app/auth/signout), so a phone left on a table stops
// showing the last person's messages.

import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { GROUPS } from '@/lib/push';

export const runtime = 'nodejs';

const COOKIE = 'mp-push';
const PLATFORMS = ['android', 'ios', 'web'];
const missing = (e) => /push_(devices|prefs)|relation|does not exist|schema cache/i.test(e?.message || '');

export async function POST(request) {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const { platform, token, keys } = await request.json().catch(() => ({}));
  if (!PLATFORMS.includes(platform) || typeof token !== 'string' || token.length < 10 || token.length > 1000) {
    return NextResponse.json({ error: 'جهاز غير معروف' }, { status: 400 });
  }
  if (platform === 'web') {
    let ok = false;
    try { ok = new URL(token).protocol === 'https:'; } catch { /* stays false */ }
    if (!ok || typeof keys?.p256dh !== 'string' || typeof keys?.auth !== 'string') {
      return NextResponse.json({ error: 'اشتراك غير صالح' }, { status: 400 });
    }
  }
  const row = {
    person: me.id, platform, token,
    keys: platform === 'web' ? { p256dh: keys.p256dh, auth: keys.auth } : null,
    seen_at: new Date().toISOString(),
  };

  // Look first, then write — never ON CONFLICT against this schema.
  const db = supabaseAdmin();
  const { data: had, error: readErr } = await db.from('push_devices')
    .select('id').eq('token', token).maybeSingle();
  if (readErr) {
    return NextResponse.json({ error: missing(readErr) ? 'الإشعارات غير مفعّلة بعد' : readErr.message },
      { status: missing(readErr) ? 503 : 500 });
  }

  let id = had?.id;
  if (id) {
    const { error } = await db.from('push_devices').update(row).eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    const { data, error } = await db.from('push_devices').insert(row).select('id').single();
    if (error) {
      // Registered twice at once — the other request won; take its row.
      const { data: again } = await db.from('push_devices').select('id').eq('token', token).maybeSingle();
      if (!again) return NextResponse.json({ error: error.message }, { status: 500 });
      await db.from('push_devices').update(row).eq('id', again.id);
      id = again.id;
    } else {
      id = data.id;
    }
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, String(id), {
    httpOnly: true, sameSite: 'lax', path: '/',
    secure: request.nextUrl.protocol === 'https:', maxAge: 60 * 60 * 24 * 400,
  });
  return res;
}

export async function DELETE(request) {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const { token, all } = await request.json().catch(() => ({}));
  const db = supabaseAdmin();
  let q = db.from('push_devices').delete().eq('person', me.id);
  if (!all) {
    const id = request.cookies.get(COOKIE)?.value;
    if (token) q = q.eq('token', token);
    else if (id) q = q.eq('id', id);
    else return NextResponse.json({ ok: true });
  }
  await q;
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(COOKIE);
  return res;
}

export async function GET() {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });
  const db = supabaseAdmin();
  const [{ data: prefs }, { count }] = await Promise.all([
    db.from('push_prefs').select('off').eq('person', me.id).maybeSingle(),
    db.from('push_devices').select('id', { count: 'exact', head: true }).eq('person', me.id),
  ]);
  return NextResponse.json({ off: prefs?.off || [], devices: count || 0 });
}

export async function PATCH(request) {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const { off } = await request.json().catch(() => ({}));
  if (!Array.isArray(off)) return NextResponse.json({ error: 'off?' }, { status: 400 });
  const clean = [...new Set(off.filter((g) => GROUPS.includes(g)))];

  const db = supabaseAdmin();
  const { data: had, error: readErr } = await db.from('push_prefs')
    .select('person').eq('person', me.id).maybeSingle();
  if (readErr) {
    return NextResponse.json({ error: missing(readErr) ? 'الإشعارات غير مفعّلة بعد' : readErr.message },
      { status: missing(readErr) ? 503 : 500 });
  }
  const row = { off: clean, updated_at: new Date().toISOString() };
  const { error } = had
    ? await db.from('push_prefs').update(row).eq('person', me.id)
    : await db.from('push_prefs').insert({ person: me.id, ...row });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ off: clean });
}
