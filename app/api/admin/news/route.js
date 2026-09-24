// Announcements — the team speaking to the whole faculty, or to one year.
//
//   POST   { title, body?, promo?, link? }  send it: a row in every
//                                           recipient's bell, and a push
//   DELETE { id }                           take it back out of the bells
//
// An admin's call, like approving people: an editor keeps the catalogue, a
// message to two thousand phones is something else.

import { NextResponse } from 'next/server';
import { currentProfile, isAdmin } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { pushTo, later } from '@/lib/push';

export const runtime = 'nodejs';
// A push to a whole faculty is a couple of thousand requests.
export const maxDuration = 60;

/** Everybody approved in the year, or in every year. */
async function audience(promo) {
  const db = supabaseAdmin();
  const out = [];
  for (let from = 0; from < 100000; from += 1000) {
    let q = db.from('profiles').select('id').eq('status', 'approved').range(from, from + 999);
    if (promo) q = q.eq('promo', promo);
    const { data, error } = await q;
    if (error || !data?.length) break;
    out.push(...data.map((p) => p.id));
    if (data.length < 1000) break;
  }
  return out;
}

export async function POST(request) {
  const me = await currentProfile();
  if (!isAdmin(me)) return NextResponse.json({ error: 'للمشرفين فقط' }, { status: 403 });

  const b = await request.json().catch(() => ({}));
  const title = String(b.title || '').trim().slice(0, 80);
  const body = String(b.body || '').trim().slice(0, 600) || null;
  const promo = b.promo ? String(b.promo) : null;
  let link = String(b.link || '').trim() || null;
  if (!title) return NextResponse.json({ error: 'اكتب عنوانًا' }, { status: 400 });
  // A path inside the app, or a web address — never javascript: or data:.
  if (link && !link.startsWith('/') && !/^https:\/\//i.test(link)) {
    return NextResponse.json({ error: 'الرابط يبدأ بـ / أو https://' }, { status: 400 });
  }
  if (link?.startsWith('//')) link = null;

  const db = supabaseAdmin();
  if (promo) {
    const { data: p } = await db.from('promos').select('id').eq('id', promo).maybeSingle();
    if (!p) return NextResponse.json({ error: 'سنة غير معروفة' }, { status: 400 });
  }

  const { data: made, error } = await db.from('announcements')
    .insert({ author: me.id, promo, title, body, link })
    .select('id, created_at').single();
  if (error) {
    const off = /announcements|relation|schema cache/i.test(error.message || '');
    return NextResponse.json({ error: off ? 'الصق push.sql في Supabase أولًا' : error.message },
      { status: off ? 503 : 500 });
  }

  const people = (await audience(promo)).filter((id) => id !== me.id);
  const url = link || '/notifications';
  for (let i = 0; i < people.length; i += 500) {
    await db.from('notifications').insert(people.slice(i, i + 500).map((person) => ({
      person, actor: me.id, kind: 'news', body: title, link: url, announcement: made.id,
    })));
  }

  await later(() => pushTo(people, {
    kind: 'news', title, body: body ? (body.length > 140 ? `${body.slice(0, 139)}…` : body) : '',
    url, tag: `news-${made.id}`,
  }));

  return NextResponse.json({ id: made.id, to: people.length });
}

export async function DELETE(request) {
  const me = await currentProfile();
  if (!isAdmin(me)) return NextResponse.json({ error: 'للمشرفين فقط' }, { status: 403 });
  const { id } = await request.json().catch(() => ({}));
  if (!id) return NextResponse.json({ error: 'أيّ إعلان؟' }, { status: 400 });
  // The bell rows go with it (on delete cascade). A push already on a lock
  // screen cannot be taken back; this is for the ones that were wrong.
  const db = supabaseAdmin();
  await db.from('notifications').delete().eq('announcement', id);
  const { error } = await db.from('announcements').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
