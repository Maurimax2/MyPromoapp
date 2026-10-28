import { redirect } from 'next/navigation';
import { currentProfile } from '@/lib/supabase/server';
import Downloads from './Downloads';

export const dynamic = 'force-dynamic';

// التنزيلات — what this phone keeps (lib/downloads.js). The list lives on the
// phone, not on the server, so this page only checks who is asking.
export default async function DownloadsPage() {
  const me = await currentProfile();
  if (!me) redirect('/login');
  return <Downloads />;
}
