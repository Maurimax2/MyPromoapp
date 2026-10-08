import { redirect } from 'next/navigation';
import { currentProfile } from '@/lib/supabase/server';
import { subjectsOf } from '@/lib/catalogue';

// A semester's anatomy used to be a page of its own, listing regions. It is
// the subject's «Atlas» tab now, lecture by lecture, beside the lectures it
// goes with — so an old link lands there.
export const dynamic = 'force-dynamic';

const ANATOMY = /(^|-)anatomie(-s\d)?$/i;

export default async function SemesterPage({ params }) {
  const me = await currentProfile();
  if (!me) redirect('/login');
  const { promo, semestre } = await params;
  const semester = String(semestre).toUpperCase();
  let to = '/study';
  try {
    const rows = await subjectsOf(String(promo).toLowerCase());
    const m = rows.find((r) => ANATOMY.test(r.id) && String(r.semester).toUpperCase() === semester);
    if (m) to = `/archive/${m.id}?tab=atlas`;
  } catch { /* the study screen is always there */ }
  redirect(to);
}
