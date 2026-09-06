// Taking a file from a student's phone.

import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/supabase/server';
import { put } from '@/lib/storage';

export const runtime = 'nodejs';
export const maxDuration = 60;

const allowed = (p) => !!p && (p.status === 'approved'
  || ['owner', 'admin', 'editor'].includes(p.role));

export async function POST(request) {
  const profile = await currentProfile();
  if (!allowed(profile)) {
    return NextResponse.json({ error: 'حسابك بانتظار الموافقة' }, { status: 403 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'لا ملف' }, { status: 400 });
  }

  try {
    return NextResponse.json(await put(file));
  } catch (err) {
    return NextResponse.json({ error: String(err.message) }, { status: 400 });
  }
}
