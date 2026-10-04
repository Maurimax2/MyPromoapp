// The numbers behind النشاط, read again every few seconds by the open screen.

import { NextResponse } from 'next/server';
import { currentProfile, isAdmin } from '@/lib/supabase/server';
import { activityStats } from '@/lib/activity-stats';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const me = await currentProfile();
  if (!isAdmin(me)) return NextResponse.json({ error: 'للمشرفين فقط' }, { status: 403 });
  return NextResponse.json(await activityStats(), { headers: { 'cache-control': 'no-store' } });
}
