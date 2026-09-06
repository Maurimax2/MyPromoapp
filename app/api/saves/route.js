// Keeping something for later.

import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

export async function POST(request) {
  const profile = await currentProfile();
  if (!profile) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const { post, document, on } = await request.json();
  if (!post && !document) return NextResponse.json({ error: 'no target' }, { status: 400 });

  const db = supabaseAdmin();
  const where = post ? { post } : { document };

  if (on) {
    const { error } = await db.from('saves').insert({ person: profile.id, ...where });
    if (error && !/duplicate|unique/i.test(error.message)) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    let q = db.from('saves').delete().eq('person', profile.id);
    q = post ? q.eq('post', post) : q.eq('document', document);
    const { error } = await q;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
