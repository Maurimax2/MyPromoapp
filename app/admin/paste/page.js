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
  // The exam papers, so the screen can hand somebody the file itself. Neither
  // ChatGPT nor Gemini can open a Drive link — one asks to be connected to a
  // Workspace, the other sees no document and answers with an empty list — so
  // the paper has to be downloaded and attached, and this is where it is got.
  const [{ data: promos }, { data: modules }, { data: papers }] = await Promise.all([
    db.from('promos').select('id, name, position').order('position'),
    db.from('modules').select('id, name, promo, semester, position').order('position'),
    db.from('documents')
      .select('id, module, title, drive_id, year, ext')
      .eq('where_shown', 'quiz').not('drive_id', 'is', null)
      .order('position'),
  ]);

  return (
    <PasteScreen
      promos={promos || []}
      modules={modules || []}
      papers={papers || []}
      prompt={PROMPT}
    />
  );
}
