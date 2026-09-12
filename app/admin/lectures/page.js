import { redirect } from 'next/navigation';
import { requireStaff } from '@/lib/staff';
import { supabaseAdmin } from '@/lib/supabase/admin';
import LectureScreen from './LectureScreen';

export const dynamic = 'force-dynamic';

// تصنيف الأسئلة — which lecture each question revises.
//
// A question knows the paper it was printed on, which is where it came from
// rather than what it is about. A student the night before an exam wants the
// vessels of the head and neck out of every paper at once, and until somebody
// says which question is about what, اختبر نفسك can only offer them a year.
export default async function Lectures() {
  const gate = await requireStaff();
  if (gate.error) redirect('/admin');

  const db = supabaseAdmin();
  const [{ data: promos }, { data: modules }] = await Promise.all([
    db.from('promos').select('id, name, position').order('position'),
    db.from('modules').select('id, name, promo, semester, position').order('position'),
  ]);

  return <LectureScreen promos={promos || []} modules={modules || []} />;
}
