// Friends — asked by one, accepted by the other (push.sql).
//
// Within your own year, like chat: a promo is the people you sit with, and
// profiles outside it are not readable to begin with. Being friends is what
// decides who hears that you posted or opened a study room; the promo as a
// whole is too many people to be woken for every one of those.

import { supabaseAdmin } from '@/lib/supabase/admin';

/** Everybody you are friends with, as ids. */
export async function friendIds(me) {
  const { data, error } = await supabaseAdmin().from('friends')
    .select('a, b').or(`a.eq.${me},b.eq.${me}`).not('accepted_at', 'is', null);
  if (error) return [];
  return (data || []).map((r) => (r.a === me ? r.b : r.a));
}

/** Your friends, who asked you, and whom you asked — with names. */
export async function friendsOf(me) {
  const db = supabaseAdmin();
  const { data, error } = await db.from('friends')
    .select('a, b, accepted_at, created_at').or(`a.eq.${me},b.eq.${me}`)
    .order('created_at', { ascending: false });
  if (error) return { friends: [], asked: [], sent: [], off: true };

  const rows = data || [];
  const other = (r) => (r.a === me ? r.b : r.a);
  const ids = [...new Set(rows.map(other))];
  const { data: people } = ids.length
    ? await db.from('profiles').select('id, full_name, email, username, matricule, promo').in('id', ids)
    : { data: [] };
  const byId = new Map((people || []).map((p) => [p.id, p]));
  const pick = (list) => list.map((r) => byId.get(other(r))).filter(Boolean);

  return {
    friends: pick(rows.filter((r) => r.accepted_at)),
    asked: pick(rows.filter((r) => !r.accepted_at && r.b === me)),
    sent: pick(rows.filter((r) => !r.accepted_at && r.a === me)),
  };
}

/** 'none' | 'sent' | 'asked' | 'friends' — seen from `me`. */
export async function friendState(me, other) {
  const row = await rowBetween(me, other);
  if (!row) return 'none';
  if (row.accepted_at) return 'friends';
  return row.a === me ? 'sent' : 'asked';
}

export async function rowBetween(x, y) {
  const { data, error } = await supabaseAdmin().from('friends')
    .select('a, b, accepted_at')
    .or(`and(a.eq.${x},b.eq.${y}),and(a.eq.${y},b.eq.${x})`)
    .maybeSingle();
  return error ? null : data;
}

/**
 * Friends who can see what `me` just did in `promo` — told when you post or
 * open a room. A friend who has since moved year cannot open either, so is
 * not woken for it.
 */
export async function friendsIn(me, promo) {
  const ids = await friendIds(me);
  if (!ids.length || !promo) return [];
  const { data } = await supabaseAdmin().from('profiles')
    .select('id').in('id', ids).eq('promo', promo);
  return (data || []).map((p) => p.id);
}
