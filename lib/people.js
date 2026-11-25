// People from any year, by id — for naming the other side of a duel, a chat
// or a room.
//
// Friends, duels, chats and rooms reach across years now (owner, 2026-11-25),
// but a student's own key reads only their year's profiles: a rival from
// pharmacy came back as a blank «طالب». So names are read here with the
// server's key, and only what a screen prints — the email is there for the
// part before the @ a nameless account is shown by, never to be printed.

import { supabaseAdmin } from '@/lib/supabase/admin';

/** A Map of id → { id, full_name, email, username, matricule, promo }. */
export async function peopleById(ids) {
  const want = [...new Set((ids || []).filter(Boolean))];
  if (!want.length) return new Map();
  const { data } = await supabaseAdmin().from('profiles')
    .select('id, full_name, email, username, matricule, promo').in('id', want);
  return new Map((data || []).map((p) => [p.id, p]));
}
