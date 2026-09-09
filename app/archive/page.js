import { redirect } from 'next/navigation';
import { currentProfile } from '@/lib/supabase/server';
import { promosOf, allModules, moduleCounts } from '@/lib/catalogue';
import { browsingPromo } from '@/lib/promo';
import ArchiveList from './ArchiveList';

export const dynamic = 'force-dynamic';

// الأرشيف — every year the panel knows about, not the nine subjects that
// used to be written into lib/data.js.
export default async function Archive() {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const [years, subjects, tally] = await Promise.all([
    promosOf(), allModules(), moduleCounts(),
  ]);

  // Three things can go wrong here and two of them used to look identical to
  // a working app: the read fails, or it succeeds and is empty and the file
  // stands in. Either way the archive draws last year's subjects and the
  // panel looks like it never saved anything. The screen says which it is.
  const trouble = years.error || subjects.error || tally.error || null;

  return (
    <ArchiveList
      promos={years.promos}
      modules={subjects.modules}
      counts={Object.fromEntries(tally.counts)}
      mine={await browsingPromo(me, years.promos)}
      readError={trouble}
      fromFile={subjects.source === 'file'}
    />
  );
}
