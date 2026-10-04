import { redirect } from 'next/navigation';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { subjectsOf } from '@/lib/catalogue';
import { promoById } from '@/lib/data';
import { sessionsOf, hasPlanning, SEMESTER } from '@/lib/timetable';
import { withLinks } from '@/lib/timetable-links';
import Timetable from './Timetable';

export const dynamic = 'force-dynamic';

// جدول الحصص — the faculty's planning for the student's own year, a day at a
// time, with a way to revise each lecture.
export default async function TimetablePage() {
  const profile = await currentProfile();
  if (!profile) redirect('/login');
  const promo = profile.promo || 'pcem2';

  if (!hasPlanning(promo)) {
    return <Timetable promo={promoById(promo)?.name || promo.toUpperCase()} sessions={[]} now={Date.now()} />;
  }

  const sb = await supabaseServer();
  const subjects = (await subjectsOf(promo)).map((m) => ({ id: m.id, name: m.name }));
  const sessions = await withLinks(sessionsOf(promo), subjects, sb);

  return (
    <Timetable
      promo={promoById(promo)?.name || promo.toUpperCase()}
      semester={SEMESTER}
      sessions={sessions}
      now={Date.now()}
    />
  );
}
