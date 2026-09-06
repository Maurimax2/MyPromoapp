// The replies under one post, fetched only when somebody opens them.

import { NextResponse } from 'next/server';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function GET(request) {
  const profile = await currentProfile();
  if (!profile) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const post = new URL(request.url).searchParams.get('post');
  if (!post) return NextResponse.json({ error: 'no post' }, { status: 400 });

  const sb = await supabaseServer();
  const { data, error } = await sb.from('comments')
    .select('id, body, created_at, author:profiles(id, full_name, email)')
    .eq('post', post).eq('removed', false)
    .order('created_at').limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comments: data || [] });
}
