// Taking a file from a student's phone.

import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/supabase/server';
import { put } from '@/lib/storage';
import { getT } from '@/lib/lang';

export const runtime = 'nodejs';
export const maxDuration = 60;

const allowed = (p) => !!p && (p.status === 'approved'
  || ['owner', 'admin', 'editor'].includes(p.role));

export async function POST(request) {
  const t = await getT();
  const profile = await currentProfile();
  if (!allowed(profile)) {
    return NextResponse.json({ error: t('حسابك بانتظار الموافقة') }, { status: 403 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: t('لا ملف') }, { status: 400 });
  }

  try {
    return NextResponse.json(await put(file));
  } catch (err) {
    return NextResponse.json({ error: t(String(err.message)) }, { status: 400 });
  }
}
