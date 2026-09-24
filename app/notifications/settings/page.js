import { redirect } from 'next/navigation';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import PushSettings from './PushSettings';

export const dynamic = 'force-dynamic';

// الإشعارات ← الإعدادات: this phone on or off, and which kinds.
export default async function PushSettingsPage() {
  const me = await currentProfile();
  if (!me) redirect('/login');
  const { data, error } = await supabaseAdmin().from('push_prefs')
    .select('off').eq('person', me.id).maybeSingle();
  return <PushSettings off={data?.off || []} ready={!error} />;
}
