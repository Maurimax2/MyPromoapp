// Marking the answer that settled a question.
//
// Only the person who asked decides, and only one answer at a time — a
// question with three accepted answers has answered nothing.

import { NextResponse } from 'next/server';
import { currentProfile, isStaff } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { notify } from '@/lib/notify';

export const runtime = 'nodejs';

export async function POST(request) {
  const profile = await currentProfile();
  if (!profile) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const { comment, on } = await request.json();
  if (!comment) return NextResponse.json({ error: 'no answer' }, { status: 400 });

  const db = supabaseAdmin();
  const { data: c } = await db.from('comments').select('id, post').eq('id', comment).maybeSingle();
  if (!c) return NextResponse.json({ error: 'لا جواب' }, { status: 404 });

  const { data: post } = await db.from('posts').select('author').eq('id', c.post).maybeSingle();
  if (!post) return NextResponse.json({ error: 'لا سؤال' }, { status: 404 });
  if (post.author !== profile.id && !isStaff(profile)) {
    return NextResponse.json({ error: 'صاحب السؤال وحده يقبل الجواب' }, { status: 403 });
  }

  // One at a time: clear the rest before setting this one.
  await db.from('comments').update({ accepted: false }).eq('post', c.post);
  if (on) await db.from('comments').update({ accepted: true }).eq('id', comment);
  await db.from('posts').update({ answered: !!on }).eq('id', c.post);

  // Having your answer accepted is the best thing that happens on this app.
  if (on) {
    const { data: ans } = await db.from('comments')
      .select('author, body').eq('id', comment).maybeSingle();
    if (ans) {
      await notify({
        person: ans.author, actor: profile.id, kind: 'accepted',
        post: c.post, comment, body: ans.body,
      });
    }
  }

  return NextResponse.json({ ok: true });
}
