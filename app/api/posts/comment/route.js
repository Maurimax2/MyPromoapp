// Answering somebody.

import { NextResponse } from 'next/server';
import { currentProfile, isStaff } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

export async function POST(request) {
  const profile = await currentProfile();
  if (!profile || (profile.status !== 'approved' && !isStaff(profile))) {
    return NextResponse.json({ error: 'حسابك بانتظار الموافقة' }, { status: 403 });
  }

  const { post, body } = await request.json();
  const text = String(body || '').trim().slice(0, 2000);
  if (!post || !text) return NextResponse.json({ error: 'اكتب ردًّا' }, { status: 400 });

  const db = supabaseAdmin();
  const { data, error } = await db.from('comments')
    .insert({ post, author: profile.id, body: text })
    .select('id, body, created_at').single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ...data, author: { full_name: profile.full_name, email: profile.email } });
}

export async function DELETE(request) {
  const profile = await currentProfile();
  if (!profile) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const { id } = await request.json();
  const db = supabaseAdmin();
  const { data: c } = await db.from('comments').select('author').eq('id', id).maybeSingle();
  if (!c) return NextResponse.json({ error: 'لا رد' }, { status: 404 });
  if (c.author !== profile.id && !isStaff(profile)) {
    return NextResponse.json({ error: 'ليس ردّك' }, { status: 403 });
  }

  const { error } = await db.from('comments').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
