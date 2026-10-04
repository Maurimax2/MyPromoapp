// What the panel's النشاط screen shows, worked out from presence, app_opens and
// profiles. Server only: it reads with the service key.
//
// «Online» is a person seen within ONLINE_MS, decided here at the moment of
// asking. «Opened» is one row in app_opens — and app_opens only starts filling
// the day activity.sql is pasted and this ships, so anything before that is
// not in it, and the screen says so rather than printing a low number as if it
// were the whole history.

import { supabaseAdmin } from '@/lib/supabase/admin';
import { ONLINE_MS } from '@/lib/activity';

const DAY = 86400000;
const dayOf = (t) => new Date(t).toISOString().slice(0, 10);
const missing = (e) => /presence|app_opens|relation|does not exist|schema cache/i.test(e?.message || '');

/** Every row of a query, a thousand at a time. */
async function all(build, cap = 60000) {
  const out = [];
  for (let from = 0; from < cap; from += 1000) {
    const { data, error } = await build().range(from, from + 999);
    if (error) return { rows: out, error };
    out.push(...(data || []));
    if (!data || data.length < 1000) break;
  }
  return { rows: out, error: null };
}

export async function activityStats(now = Date.now()) {
  const db = supabaseAdmin();
  const since = new Date(now - 14 * DAY).toISOString();

  const [people, here, opens] = await Promise.all([
    all(() => db.from('profiles').select('id, full_name, email, promo, status, role').order('id')),
    all(() => db.from('presence').select('person, promo, screen, platform, first_seen, seen_at, opens').order('person')),
    all(() => db.from('app_opens').select('person, promo, platform, at').gte('at', since).order('id')),
  ]);

  if (here.error && missing(here.error)) return { ready: false };

  const profiles = new Map(people.rows.map((p) => [p.id, p]));
  const nameOf = (id) => {
    const p = profiles.get(id);
    return p?.full_name || p?.email?.split('@')[0] || 'زميل';
  };

  const cutoff = now - ONLINE_MS;
  const online = here.rows
    .filter((r) => Date.parse(r.seen_at) >= cutoff)
    .sort((a, b) => Date.parse(b.seen_at) - Date.parse(a.seen_at));

  const byScreen = {};
  for (const r of online) {
    (byScreen[r.screen] ||= []).push({ name: nameOf(r.person), promo: r.promo, platform: r.platform });
  }

  const today = dayOf(now);
  const openedToday = new Set(opens.rows.filter((o) => dayOf(Date.parse(o.at)) === today).map((o) => o.person));
  const openedWeek = new Set(opens.rows.filter((o) => Date.parse(o.at) >= now - 7 * DAY).map((o) => o.person));

  // Per year: how many accounts, how many have ever opened the app, how many
  // today, how many are here now.
  const years = {};
  const year = (id) => (years[id || '—'] ||= { promo: id || '—', accounts: 0, opened: 0, today: 0, online: 0 });
  const students = people.rows.filter((p) => p.status === 'approved' || ['owner', 'admin', 'editor'].includes(p.role));
  for (const p of students) year(p.promo).accounts += 1;
  const seen = new Set(here.rows.map((r) => r.person));
  for (const id of seen) if (profiles.has(id)) year(profiles.get(id).promo).opened += 1;
  for (const id of openedToday) if (profiles.has(id)) year(profiles.get(id).promo).today += 1;
  for (const r of online) if (profiles.has(r.person)) year(profiles.get(r.person).promo).online += 1;

  // The last fourteen days: people who opened it, and how many times.
  const days = [];
  for (let n = 13; n >= 0; n--) {
    const d = dayOf(now - n * DAY);
    const rows = opens.rows.filter((o) => dayOf(Date.parse(o.at)) === d);
    days.push({ day: d, people: new Set(rows.map((o) => o.person)).size, opens: rows.length });
  }

  const platforms = {};
  for (const r of here.rows) platforms[r.platform] = (platforms[r.platform] || 0) + 1;

  const startedAt = here.rows.reduce((m, r) => (m && m < r.first_seen ? m : r.first_seen), null);

  return {
    ready: true,
    at: now,
    accounts: students.length,
    everOpened: seen.size,
    never: Math.max(0, students.length - [...seen].filter((id) => profiles.has(id)).length),
    openedToday: openedToday.size,
    openedWeek: openedWeek.size,
    opensToday: opens.rows.filter((o) => dayOf(Date.parse(o.at)) === today).length,
    online: online.length,
    byScreen: Object.entries(byScreen).map(([screen, list]) => ({ screen, n: list.length, people: list.slice(0, 8) }))
      .sort((a, b) => b.n - a.n),
    years: Object.values(years).sort((a, b) => b.accounts - a.accounts),
    days,
    platforms,
    startedAt,
  };
}
