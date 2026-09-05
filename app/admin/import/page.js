import { supabaseServer } from '@/lib/supabase/server';
import ImportScreen from './ImportScreen';

export const dynamic = 'force-dynamic';

export default async function ImportPage({ searchParams }) {
  const params = await searchParams;
  const sb = await supabaseServer();

  const [{ data: promos }, { data: modules }] = await Promise.all([
    sb.from('promos').select('id, name, label, badge').order('position'),
    sb.from('modules').select('id, name, semester, promo').order('position'),
  ]);

  return (
    <ImportScreen
      promos={promos || []}
      modules={modules || []}
      preset={params?.module || null}
    />
  );
}
