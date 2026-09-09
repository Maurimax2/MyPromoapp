import { redirect } from 'next/navigation';
import { requireStaff } from '@/lib/staff';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { PROMPT } from '@/lib/qcm/paste';
import PasteScreen from './PasteScreen';

export const dynamic = 'force-dynamic';

// أسئلة ملصوقة — questions read by whichever model the admin likes.
export default async function Paste() {
  const gate = await requireStaff();
  if (gate.error) redirect('/admin');

  const db = supabaseAdmin();
  const [{ data: promos }, { data: modules }] = await Promise.all([
    db.from('promos').select('id, name, position').order('position'),
    db.from('modules').select('id, name, promo, semester, position').order('position'),
  ]);

  return (
    <PasteScreen
      promos={promos || []}
      modules={modules || []}
      prompt={PROMPT}
    />
  );
}
