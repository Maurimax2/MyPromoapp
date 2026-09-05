import { supabaseServer } from '@/lib/supabase/server';
import ImportScreen from './ImportScreen';

export const dynamic = 'force-dynamic';

export default async function ImportPage({ searchParams }) {
  const params = await searchParams;
  const sb = await supabaseServer();
  const { data: modules } = await sb
    .from('modules').select('id, name, semester, promo').order('position');

  return <ImportScreen modules={modules || []} preset={params?.module || null} />;
}
