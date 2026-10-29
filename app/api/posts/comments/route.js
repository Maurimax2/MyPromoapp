// The replies under one post, fetched only when somebody opens them.

import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { blockedAmong } from '@/lib/blocks';
import { getT } from '@/lib/lang';

export const runtime = 'nodejs';

export async function GET(request) {
  const t = await getT();
  const profile = await currentProfile();
  if (!profile) return NextResponse.json({ error: t('سجّل الدخول') }, { status: 401 });

  const post = new URL(request.url).searchParams.get('post');
  if (!post) return NextResponse.json({ error: 'no post' }, { status: 400 });

  // Read with the server's key: «كل الدفعات» shows other years' posts, whose
  // replies a student's own key cannot read. What the policies would have
  // kept out is kept out here — a removed post, a block either way — and an
  // unapproved account reads nothing (the middleware has already sent it to
  // /waiting; this is the second lock).
  if (profile.status !== 'approved' && !['owner', 'admin', 'editor'].includes(profile.role)) {
    return NextResponse.json({ comments: [] });
  }
  const db = supabaseAdmin();
  const { data: p } = await db.from('posts').select('id').eq('id', post).eq('removed', false).maybeSingle();
  if (!p) return NextResponse.json({ comments: [] });
  const { data, error } = await db.from('comments')
    .select('id, body, created_at, author:profiles!comments_author_fkey(id, full_name, email)')
    .eq('post', post).eq('removed', false)
    .order('created_at').limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const hidden = await blockedAmong(profile.id, (data || []).map((c) => c.author?.id));
  return NextResponse.json({ comments: (data || []).filter((c) => !hidden.has(c.author?.id)) });
}
