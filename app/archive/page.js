import { redirect } from 'next/navigation';
import { currentProfile } from '@/lib/supabase/server';
import { promosOf, allModules, moduleCounts } from '@/lib/catalogue';
import ArchiveList from './ArchiveList';

export const dynamic = 'force-dynamic';

// الأرشيف — every year the panel knows about, not the nine subjects that
// used to be written into lib/data.js.
export default async function Archive() {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const [promos, modules, counts] = await Promise.all([
    promosOf(), allModules(), moduleCounts(),
  ]);

  return (
    <ArchiveList
      promos={promos}
      modules={modules}
      counts={Object.fromEntries(counts)}
      mine={me.promo || 'pcem2'}
    />
  );
}
