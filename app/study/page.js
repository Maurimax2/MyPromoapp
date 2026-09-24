import { redirect } from 'next/navigation';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { promosOf, allModules, moduleCounts } from '@/lib/catalogue';
import { browsingPromo } from '@/lib/promo';
import { stage } from '@/lib/duel';
import { CURRICULUM } from '@/lib/anatomy/curriculum';
import Study from './Study';

export const dynamic = 'force-dynamic';

// الدراسة — every way to study, and everything there is to study.
//
// It replaces الأرشيف and الملخصات, which were two tabs for one idea: the
// material. The four doors at the top are the things you do to it — اختبر
// نفسك, التحدّي, الملخصات, المراجعة — and the list underneath is all of it,
// year by year and semester by semester.
export default async function StudyPage() {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const sb = await supabaseServer();

  const [years, subjects, tally, duels] = await Promise.all([
    promosOf(),
    allModules(),
    moduleCounts(),
    sb.from('duels')
      .select('id, state, challenger, opponent, challenger_at, opponent_at')
      .or(`challenger.eq.${me.id},opponent.eq.${me.id}`)
      .limit(60),
  ]);

  // Only what is waiting on you. A duel you are winning is news, not a task,
  // and the door should not wear a number for it.
  const waiting = (duels.data || [])
    .filter((d) => ['invited', 'play'].includes(stage(d, me.id)))
    .length;

  // Three things can go wrong here and two of them used to look identical to
  // a working app: the read fails, or it succeeds and is empty and the file
  // stands in. Either way the screen draws last year's subjects and the panel
  // looks like it never saved anything. It says which it is.
  const trouble = years.error || subjects.error || tally.error || null;

  // Where the 3D card leads for each year: the first semester that has
  // models — the year's own, or the medicine first year a pharmacy or dental
  // first year shares. A year with no body in its programme gets no card; it
  // used to link to /anatomie, which is not a page.
  const bodies = Object.fromEntries(CURRICULUM.map((c) => [c.promo.toLowerCase(), c.semesters[0]?.id]));
  const anatomy = {};
  for (const y of years.promos || []) {
    const own = bodies[y.id];
    const shared = y.reads_from && bodies[y.reads_from];
    if (own) anatomy[y.id] = `/anatomie/${y.id}/${own}`;
    else if (shared) anatomy[y.id] = `/anatomie/${y.reads_from}/${shared}`;
  }

  return (
    <Study
      anatomy={anatomy}
      promos={years.promos}
      modules={subjects.modules}
      counts={Object.fromEntries(tally.counts)}
      mine={await browsingPromo(me, years.promos)}
      waiting={waiting}
      readError={trouble}
      fromFile={subjects.source === 'file'}
    />
  );
}
