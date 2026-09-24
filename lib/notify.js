// Telling somebody something happened.
//
// One function, called from the routes that already know. It is deliberately
// forgiving: a notification that fails to write must never be the reason a
// like, a comment or an approval fails — the thing itself matters, being
// told about it does not.
//
// It writes the bell's row first, then — after the response has gone — wakes
// the person's phone (lib/push.js). The row is the record; the push is only a
// knock on the door, and a knock that fails loses nothing.

import { supabaseAdmin } from '@/lib/supabase/admin';
import { pushTo, later } from '@/lib/push';

const cut = (s, n) => {
  const t = String(s || '').replace(/\s+/g, ' ').trim();
  return t.length > n ? `${t.slice(0, n - 1)}…` : t;
};

// What the lock screen says. The title is who, the body is what — the way
// every messaging app a student already has reads.
const WORDS = {
  like:        (b) => (b ? `أعجب بمنشورك: «${cut(b, 60)}»` : 'أعجب بمنشورك'),
  comment:     (b) => (b ? `علّق: ${cut(b, 100)}` : 'علّق على منشورك'),
  answer:      (b) => (b ? `أجاب على سؤالك: ${cut(b, 90)}` : 'أجاب على سؤالك'),
  accepted:    () => 'قبِل جوابك',
  approved:    () => 'فُتح لك التطبيق — أهلًا بك',
  duel:        (b) => (b ? `تحدّاك: ${cut(b, 80)}` : 'تحدّاك'),
  duel_ok:     () => 'قبِل تحدّيك — دورك',
  duel_no:     () => 'اعتذر عن تحدّيك',
  duel_done:   (b) => (b ? `أنهى التحدّي: ${cut(b, 80)}` : 'أنهى التحدّي — ظهرت النتيجة'),
  friend_req:  () => 'يريد أن يضيفك صديقًا',
  friend_ok:   () => 'قبِل طلب صداقتك',
  friend_post: (b) => (b ? `نشر: ${cut(b, 100)}` : 'نشر منشورًا جديدًا'),
  friend_room: (b) => (b ? `فتح غرفة دراسة: ${cut(b, 60)} — انضمّ` : 'فتح غرفة دراسة — انضمّ'),
};

// Where tapping it goes, when the caller did not say.
function whereTo({ kind, post, link }) {
  if (link) return link;
  if (kind === 'answer' || kind === 'accepted') return post ? `/qa/${post}` : '/qa';
  if (kind.startsWith('duel')) return '/duel';
  if (kind.startsWith('friend_')) return '/friends';
  return '/feed';
}

const nameOf = (p) => p?.full_name || p?.email?.split('@')[0] || 'زميل';

/**
 * @param {object} n
 * @param {string} n.person  who is told
 * @param {string} n.actor   who did it — never notified about their own doing
 * @param {string} n.kind    like | comment | accepted | answer | approved | duel… | friend_…
 */
export async function notify({ person, ...rest }) {
  return notifyMany([person], rest);
}

/** The same thing, told to several people at once — one insert, one push. */
export async function notifyMany(people, {
  actor = null, kind, post = null, comment = null, body = null, link = null,
}) {
  if (!kind) return;
  const who = [...new Set((people || []).filter((p) => p && p !== actor))];
  if (!who.length) return;
  const text = body ? String(body).slice(0, 140) : null;
  const url = whereTo({ kind, post, link });

  try {
    const rows = who.map((person) => ({ person, actor, kind, post, comment, body: text, link: url }));
    const { error } = await supabaseAdmin().from('notifications').insert(rows);
    // Before push.sql is pasted there is no `link` column, and the bell must
    // not go quiet waiting for it.
    if (error && /link/.test(error.message || '')) {
      await supabaseAdmin().from('notifications').insert(rows.map(({ link: _, ...r }) => r));
    }
  } catch {
    // Deliberately silent. See above.
  }

  await later(async () => {
    let title = 'MyPromo';
    if (actor) {
      const { data } = await supabaseAdmin().from('profiles')
        .select('full_name, email').eq('id', actor).maybeSingle();
      title = nameOf(data);
    }
    await pushTo(who, {
      kind, title, url,
      body: (WORDS[kind] || (() => text || ''))(text),
      // Likes on one post collapse into one notification; so do a chat's
      // messages. Everything else stands on its own.
      tag: kind === 'like' && post ? `like-${post}` : undefined,
    });
  });
}
