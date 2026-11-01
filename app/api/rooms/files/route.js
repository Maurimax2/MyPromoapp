// A subject's lectures, for opening one on a study room's stage (Room.js).
//
//   GET ?module=<id>  →  { chapters: [{ title, lectures: [{ fid, n, title }] }] }
//
// Asked once, when somebody in a call picks a subject to open a file from —
// not on a timer.

import { NextResponse } from 'next/server';
import { currentProfile, isStaff } from '@/lib/supabase/server';
import { moduleOf } from '@/lib/catalogue';

export const runtime = 'nodejs';

export async function GET(request) {
  const profile = await currentProfile();
  if (!profile || (profile.status !== 'approved' && !isStaff(profile))) {
    return NextResponse.json({ chapters: [] }, { status: 401 });
  }
  const id = new URL(request.url).searchParams.get('module');
  if (!id) return NextResponse.json({ chapters: [] }, { status: 400 });

  const m = await moduleOf(id);
  const chapters = (m?.chapters || [])
    .map((ch) => ({
      title: ch.title,
      lectures: (ch.lectures || []).filter((l) => l.fid).map((l) => ({ fid: l.fid, n: l.n ?? null, title: l.title })),
    }))
    .filter((ch) => ch.lectures.length);
  return NextResponse.json({ chapters });
}
