import { redirect } from 'next/navigation';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { isFirstYear } from '@/lib/identity';
import { yearsForJoining } from '@/lib/catalogue';
import Waiting from './Waiting';

export const dynamic = 'force-dynamic';

// The screen a new account sees, and the only one it can reach.
//
// It exists so that "you cannot see anything yet" is said once, plainly,
// instead of being discovered one refused button at a time. It is also where
// an account is finished when the door it came through asked nothing — Google,
// an emailed link — and where members who joined before usernames existed
// choose one.
export default async function WaitingPage() {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const staff = ['owner', 'admin', 'editor'].includes(me.role);

  const [{ data: years }, { data: priv, error: privError }] = await Promise.all([
    // Asked of the database, so a year the panel added is choosable at once,
    // in the panel's order — and with the service key, because an account
    // waiting for approval cannot read promos itself and used to be shown no
    // years to choose from.
    yearsForJoining().then((data) => ({ data })),
    supabaseAdmin().from('profile_private').select('phone').eq('id', me.id).maybeSingle(),
  ]);

  const mine = (years || []).find((y) => y.id === me.promo) || me.promo;

  // Approved, and still here, because there is no year on the profile. The
  // app is promo-scoped all the way down to the policies. Staff are exempt:
  // the panel is not a year.
  const needsYear = !me.promo && !staff;
  // `null` means the column exists and is empty; `undefined` means
  // accounts.sql has not been pasted, and then nobody can be asked.
  const needsUsername = me.username === null;
  // The faculty's number from the second year on; first-years have none yet.
  const numberMissing = !me.matricule && !staff;
  // A first-year's WhatsApp number, while an admin still has to check it.
  const phoneMissing = !staff && me.status === 'pending' && !privError && !priv?.phone;

  const done = !needsYear && !needsUsername && !(numberMissing && !isFirstYear(mine));
  if ((me.status === 'approved' || staff) && done) redirect('/feed');

  const named = (years || []).find((y) => y.id === me.promo);

  return (
    <Waiting
      name={me.full_name || me.email?.split('@')[0] || ''}
      email={me.email}
      promo={named?.name || me.promo || null}
      promoFirst={isFirstYear(mine)}
      refused={me.status === 'refused'}
      years={needsYear ? (years || []) : null}
      needsUsername={needsUsername}
      numberMissing={numberMissing}
      phoneMissing={phoneMissing}
      matricule={me.matricule || null}
      username={me.username || null}
      approved={me.status === 'approved'}
    />
  );
}
