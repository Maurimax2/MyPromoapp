// Push — waking somebody's phone or browser.
//
// One door, `pushTo`, for everything that sends: the bell's notifications
// (lib/notify.js), chat messages, announcements and the evening reminder.
// It never throws and never slows the thing that caused it — being told is
// worth less than the like, the message or the post itself.
//
// Every kind belongs to a group a person can turn off in الإشعارات ←
// الإعدادات. `account` cannot be turned off: it is the one that says your
// account was approved, and it is sent once.

import { supabaseAdmin } from '@/lib/supabase/admin';
import { fcmReady, fcmSend } from '@/lib/fcm';
import { webReady, webSend } from '@/lib/webpush';

export const GROUP = {
  like: 'social', comment: 'social', answer: 'social', accepted: 'social',
  friend_req: 'friends', friend_ok: 'friends', friend_post: 'friends', friend_room: 'friends',
  duel: 'duels', duel_ok: 'duels', duel_no: 'duels', duel_done: 'duels',
  message: 'messages',
  streak: 'reminders', daily: 'reminders',
  news: 'news',
  approved: 'account',
};

/** The groups, in the order the settings screen shows them. */
export const GROUPS = ['messages', 'friends', 'duels', 'social', 'reminders', 'news'];

export const pushReady = () => fcmReady() || webReady();

/**
 * Send one message to every device of every person given.
 * @param {string[]} people
 * @param {{kind: string, title: string, body?: string, url?: string, tag?: string}} msg
 */
export async function pushTo(people, msg) {
  const who = [...new Set((people || []).filter(Boolean))];
  if (!who.length || !msg?.kind || !pushReady()) return { sent: 0 };

  try {
    const db = supabaseAdmin();
    const devices = [];
    const off = new Map();
    for (let i = 0; i < who.length; i += 200) {
      const group = who.slice(i, i + 200);
      const [{ data: d }, { data: p }] = await Promise.all([
        db.from('push_devices').select('id, person, platform, token, keys').in('person', group),
        db.from('push_prefs').select('person, off').in('person', group),
      ]);
      devices.push(...(d || []));
      for (const r of p || []) off.set(r.person, new Set(r.off || []));
    }

    const g = GROUP[msg.kind] || 'social';
    const wanted = devices.filter((d) => g === 'account' || !off.get(d.person)?.has(g));
    if (!wanted.length) return { sent: 0 };

    const one = (d) => (d.platform === 'web' ? webSend(d, msg) : fcmSend(d.token, msg));
    const gone = [];
    let sent = 0;
    // Twenty at a time: an announcement to a whole faculty is two thousand
    // requests, and two thousand at once is how a server runs out of sockets.
    for (let i = 0; i < wanted.length; i += 20) {
      const batch = wanted.slice(i, i + 20);
      const results = await Promise.all(batch.map((d) => one(d).catch(() => 'failed')));
      results.forEach((r, n) => {
        if (r === 'ok') sent += 1;
        if (r === 'gone') gone.push(batch[n].id);
      });
    }
    if (gone.length) await db.from('push_devices').delete().in('id', gone);
    return { sent, gone: gone.length };
  } catch {
    return { sent: 0 };
  }
}

/**
 * Run `job` after the response has gone — a push to a hundred friends must
 * not be why posting took three seconds. Outside a request (a script, a
 * test) it simply runs.
 */
export async function later(job) {
  try {
    const { after } = await import('next/server');
    after(job);
  } catch {
    try { await job(); } catch { /* see pushTo */ }
  }
}
