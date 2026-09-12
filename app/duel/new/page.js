import { redirect } from 'next/navigation';
import BackButton from '@/components/BackButton';
import { currentProfile } from '@/lib/supabase/server';
import { modulesOf } from '@/lib/catalogue';
import { quizzedIds } from '@/lib/quiz-bank';
import NewDuel from './NewDuel';

export const dynamic = 'force-dynamic';

export default async function NewDuelPage({ searchParams }) {
  const me = await currentProfile();
  if (!me) redirect('/login');
  if (me.status !== 'approved') redirect('/waiting');
  if (!me.promo) redirect('/waiting');

  // Only the subjects that have questions. A subject offered here and then
  // found empty is a wasted trip, and this screen already costs one.
  const [modules, quizzed] = await Promise.all([modulesOf(me.promo), quizzedIds()]);
  const subjects = (modules || [])
    .filter((m) => !quizzed || quizzed.has(m.id))
    .map((m) => ({ id: m.id, name: m.name }));

  const to = (await searchParams)?.to || '';

  return (
    <>
      <header className="head" style={{ paddingBottom: 14 }}>
        <div className="head-row">
          <BackButton fallback="/duel" />
          <div className="grow">
            <div className="head-t" style={{ fontSize: 17 }}>تحدٍّ جديد</div>
            <div className="head-s">نفس الأسئلة، ونتيجتان</div>
          </div>
        </div>
      </header>

      <div className="scroll">
        <NewDuel subjects={subjects} to={to} />
      </div>
    </>
  );
}
