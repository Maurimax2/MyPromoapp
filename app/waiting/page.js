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
  if (me.status === 'approved' || staff) redirect('/feed');

  const sb = await supabaseServer();
  const { data: promo } = me.promo
    ? await sb.from('promos').select('name').eq('id', me.promo).maybeSingle()
    : { data: null };

  return (
    <Waiting
      name={me.full_name || me.email?.split('@')[0] || ''}
      email={me.email}
      promo={promo?.name || me.promo || null}
      refused={me.status === 'refused'}
    />
  );
}
