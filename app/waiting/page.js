import { redirect } from 'next/navigation';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseServer } from '@/lib/supabase/server';
import Waiting from './Waiting';

export const dynamic = 'force-dynamic';

// The screen a new account sees, and the only one it can reach.
//
// It exists so that "you cannot see anything yet" is said once, plainly,
// instead of being discovered one refused button at a time.
export default async function WaitingPage() {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const staff = ['owner', 'admin', 'editor'].includes(me.role);

  // Approved, and still here, because there is no year on the profile. The
  // app is promo-scoped all the way down to the policies, so sending them on
  // to الرئيسية means an empty feed and a composer that refuses them. Staff
  // are exempt: the panel is not a year.
  const needsYear = !me.promo && !staff;
  if ((me.status === 'approved' || staff) && !needsYear) redirect('/feed');

  const sb = await supabaseServer();
  const [{ data: promo }, { data: years }] = await Promise.all([
    me.promo
      ? sb.from('promos').select('name').eq('id', me.promo).maybeSingle()
      : Promise.resolve({ data: null }),
    // Asked of the database, so a year the panel added is choosable at once,
    // and in the order the panel put them in: PCEM1 first, not DCEM1.
    needsYear
      ? sb.from('promos').select('id, name, badge').order('position')
      : Promise.resolve({ data: null }),
  ]);

  return (
    <Waiting
      name={me.full_name || me.email?.split('@')[0] || ''}
      email={me.email}
      promo={promo?.name || me.promo || null}
      refused={me.status === 'refused'}
      years={needsYear ? (years || []) : null}
      approved={me.status === 'approved'}
    />
  );
}
