// How many messages are waiting for somebody.
//
// Two steps, because a message knows its chat and not its reader: find the
// conversations this person is in, then count what is unseen in them that
// they did not write themselves.
//
// Read with the service key. A student's own conversations are their own
// rows, but this number is wanted on every screen, and two head requests
// beat teaching every caller the policy.

import { supabaseAdmin } from '@/lib/supabase/admin';

/**
 * @param {string} me  the profile id
 * @returns {Promise<number>} never throws — a counter beside an icon is not
 *   worth failing a screen over, so anything that goes wrong reads as zero.
 */
export async function unreadFor(me) {
  if (!me) return 0;
  try {
    const db = supabaseAdmin();
    const { data: mine } = await db.from('chats').select('id').or(`a.eq.${me},b.eq.${me}`);
    const ids = (mine || []).map((c) => c.id);
    if (!ids.length) return 0;

    const { count } = await db.from('chat_messages')
      .select('id', { count: 'exact', head: true })
      .in('chat', ids).eq('seen', false).neq('author', me);
    return count || 0;
  } catch {
    return 0;
  }
}
