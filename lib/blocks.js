// Blocks, from the server's side.
//
// The policies in supabase/blocks.sql keep a blocked person out of everything
// a student reads. These are for what the server writes with its own key,
// which no policy sees: a chat message, a friend request, a duel, a
// notification.
//
// Before blocks.sql is pasted there is no table, and nobody has blocked
// anybody — so every question here answers «no» rather than failing the thing
// that asked.

import { supabaseAdmin } from '@/lib/supabase/admin';

/** Is there a block between these two, whichever of them made it? */
export async function blockedBetween(x, y) {
  if (!x || !y || x === y) return false;
  try {
    const { data, error } = await supabaseAdmin().from('blocks').select('blocker')
      .or(`and(blocker.eq.${x},blocked.eq.${y}),and(blocker.eq.${y},blocked.eq.${x})`)
      .limit(1);
    return !error && (data || []).length > 0;
  } catch {
    return false;
  }
}

/** Of these people, the ones with a block either way with `actor`. */
export async function blockedAmong(actor, people) {
  const list = [...new Set((people || []).filter(Boolean))];
  if (!actor || !list.length) return new Set();
  try {
    const db = supabaseAdmin();
    const [{ data: mine, error: e1 }, { data: theirs, error: e2 }] = await Promise.all([
      db.from('blocks').select('blocked').eq('blocker', actor).in('blocked', list),
      db.from('blocks').select('blocker').eq('blocked', actor).in('blocker', list),
    ]);
    if (e1 || e2) return new Set();
    return new Set([...(mine || []).map((r) => r.blocked), ...(theirs || []).map((r) => r.blocker)]);
  } catch {
    return new Set();
  }
}

/** The table is not there yet: blocks.sql has not been pasted. */
export const noBlocksTable = (e) => /blocks|relation|does not exist|schema cache/i.test(e?.message || '');
