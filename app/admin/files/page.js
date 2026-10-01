import { supabaseServer } from '@/lib/supabase/server';
import FilesScreen from './FilesScreen';

export const dynamic = 'force-dynamic';

// Files the catalogue lists that a student cannot open: Drive shares a file
// with "anyone with the link" or it does not, and when it stops, the app
// shows a request-access screen. This is where that is seen before a student
// reports it.
export default async function Files() {
  const sb = await supabaseServer();
  const { data } = await sb.from('modules')
    .select('id, name, promo, semester').order('promo').order('position');
  return <FilesScreen modules={data || []} />;
}
