// Posting to your promo, and taking a post back down.
//
// The author and the promo are read from the signed-in profile, never from
// the request: a student cannot post as somebody else or into a year they are
// not in, whatever they send.

import { NextResponse } from 'next/server';
import { currentProfile, isStaff } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

const KINDS = ['post', 'question', 'note'];
const MAX_BODY = 4000;
const MAX_MEDIA = 6;

const canPost = (p) => !!p && (p.status === 'approved' || isStaff(p));

export async function POST(request) {
  const profile = await currentProfile();
  if (!canPost(profile)) {
    return NextResponse.json({ error: 'حسابك بانتظار الموافقة' }, { status: 403 });
  }
  if (!profile.promo) {
    return NextResponse.json({ error: 'لم تُحدَّد سنتك بعد' }, { status: 400 });
  }

  const { body, kind, module, media } = await request.json();
  const text = String(body || '').trim().slice(0, MAX_BODY);
  const files = Array.isArray(media) ? media.slice(0, MAX_MEDIA) : [];

  // A post with neither words nor a file is not a post.
  if (!text && !files.length) {
    return NextResponse.json({ error: 'اكتب شيئًا أو أرفق ملفًا' }, { status: 400 });
  }

  const db = supabaseAdmin();
  const { data: post, error } = await db.from('posts').insert({
    author: profile.id,
    promo: profile.promo,
    body: text,
    kind: KINDS.includes(kind) ? kind : 'post',
    module: module || null,
  }).select('id').single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (files.length) {
    const { error: mediaError } = await db.from('post_media').insert(
      files.map((f, i) => ({
        post: post.id,
        kind: f.kind === 'file' ? 'file' : 'image',
        path: f.path,
        name: f.name || null,
        bytes: f.bytes ?? null,
        position: i,
      })));

    // A post whose attachments went missing is worse than no post: the
    // student thinks their summary is shared and it is not.
    if (mediaError) {
      await db.from('posts').delete().eq('id', post.id);
      return NextResponse.json({ error: mediaError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ id: post.id });
}

export async function DELETE(request) {
  const profile = await currentProfile();
  if (!profile) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: 'no post' }, { status: 400 });

  const db = supabaseAdmin();
  const { data: post } = await db.from('posts').select('author').eq('id', id).maybeSingle();
  if (!post) return NextResponse.json({ error: 'لا منشور' }, { status: 404 });

  const mine = post.author === profile.id;
  if (!mine && !isStaff(profile)) {
    return NextResponse.json({ error: 'ليس منشورك' }, { status: 403 });
  }

  // The author deletes; staff only hide, so a moderated post can be looked at
  // afterwards rather than vanishing.
  const { error } = mine
    ? await db.from('posts').delete().eq('id', id)
    : await db.from('posts').update({ removed: true }).eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
