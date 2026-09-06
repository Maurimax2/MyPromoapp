// Telling somebody something happened.
//
// One function, called from the routes that already know. It is deliberately
// forgiving: a notification that fails to write must never be the reason a
// like, a comment or an approval fails — the thing itself matters, being
// told about it does not.

import { supabaseAdmin } from '@/lib/supabase/admin';

/**
 * @param {object} n
 * @param {string} n.person  who is told
 * @param {string} n.actor   who did it — never notified about their own doing
 * @param {string} n.kind    like | comment | accepted | approved
 */
export async function notify({ person, actor, kind, post = null, comment = null, body = null }) {
  if (!person || !kind) return;
  if (actor && person === actor) return;

  try {
    await supabaseAdmin().from('notifications').insert({
      person, actor, kind, post, comment,
      body: body ? String(body).slice(0, 140) : null,
    });
  } catch {
    // Deliberately silent. See above.
  }
}
