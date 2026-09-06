// Liking, and changing your mind. The pair (post, person) is the primary key,
// so liking twice is impossible rather than merely discouraged; the count on
// the post is kept in step by a trigger.

import { NextResponse } from 'next/server';
import { currentProfile, isStaff } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

export async function POST(request) {
  const profile = await currentProfile();
  if (!profile || (profile.status !== 'approved' && !isStaff(profile))) {
    return NextResponse.json({ error: 'حسابك بانتظار الموافقة' }, { status: 403 });
  }

  const { post, on } = await request.json();
  if (!post) return NextResponse.json({ error: 'no post' }, { status: 400 });

  const db = supabaseAdmin();
  const { error } = on
    ? await db.from('likes').insert({ post, person: profile.id })
    : await db.from('likes').delete().eq('post', post).eq('person', profile.id);

  // Liking something you already liked is not an error worth showing.
  if (error && !/duplicate|unique/i.test(error.message)) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
