// Days you studied.
//
// الرئيسية says «5 أيام متتالية» under your name and أنا draws five weeks of
// squares, and neither had anything behind it. This is what they read: one
// entry per calendar day on which you opened a lecture or answered a
// question. Opening the app does not count — a streak you keep by tapping an
// icon is a streak that means nothing.
//
// Kept in the browser, like the review schedule and «تابع من حيث توقّفت»,
// for the same reason: it is yours, it is worth nothing to anybody else, and
// it costs no round trip to draw.

const KEY = 'mypromo.days';
const KEEP = 120;   // enough for the heatmap and the longest run, no more

// A day is the student's own calendar day, not UTC's: Nouakchott is on UTC,
// but a phone set elsewhere should still count its own midnight.
const dayOf = (t = Date.now()) => {
  const d = new Date(t);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

function read() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; }
}

// …and told to the server too (habits.sql), so the streak survives a new
// phone and classmates can see it. A quiz answers forty questions in a few
// minutes; those are gathered and sent as one, a couple of seconds after the
// last, rather than as forty requests.
let owed = 0;
let timer = null;
function tellServer(weight) {
  owed += weight;
  clearTimeout(timer);
  timer = setTimeout(() => {
    const w = owed;
    owed = 0;
    try {
      fetch('/api/me/studied', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ weight: w }),
        keepalive: true,
      }).catch(() => {});
    } catch { /* offline: the day is still kept on this phone */ }
  }, 2500);
}

/** Count today. Cheap enough to call on every page and every answer. */
export function studied(weight = 1) {
  const days = read();
  const today = dayOf();
  days[today] = (days[today] || 0) + weight;
  const keys = Object.keys(days).sort();
  for (const k of keys.slice(0, Math.max(0, keys.length - KEEP))) delete days[k];
  try { localStorage.setItem(KEY, JSON.stringify(days)); } catch { /* private mode */ }
  if (typeof window !== 'undefined') tellServer(weight);
}

/**
 * The run that ends today — or yesterday, because a streak should not read
 * zero at breakfast on a day you have not studied *yet*.
 */
export function streak(now = Date.now()) {
  const days = read();
  const ONE = 86400000;
  let t = now;
  if (!days[dayOf(t)]) t -= ONE;
  let n = 0;
  while (days[dayOf(t)]) { n += 1; t -= ONE; }
  return n;
}

/**
 * Days as a plain object — this phone's own, and, when the server has
 * some (habits.sql), those too: a new phone starts with the old one's days.
 */
export function daysKnown(server = null) {
  const days = { ...read() };
  for (const [d, n] of Object.entries(server || {})) days[d] = Math.max(days[d] || 0, n || 1);
  return days;
}

/** The last `weeks` weeks, oldest first, Saturday-first like the Arab week. */
export function lastWeeks(weeks = 5, now = Date.now(), server = null) {
  const days = daysKnown(server);
  const ONE = 86400000;
  const today = new Date(now);
  const back = (today.getDay() + 1) % 7;          // days since Saturday
  const start = now - (back + (weeks - 1) * 7) * ONE;
  const out = [];
  for (let i = 0; i < weeks * 7; i += 1) {
    const t = start + i * ONE;
    out.push({ day: dayOf(t), n: days[dayOf(t)] || 0, future: t > now, today: dayOf(t) === dayOf(now) });
  }
  return out;
}

/** The longest run on record. */
export function longest() {
  const keys = Object.keys(read()).sort();
  let best = 0, run = 0, prev = null;
  for (const k of keys) {
    const t = new Date(`${k}T12:00:00`).getTime();
    run = prev !== null && Math.round((t - prev) / 86400000) === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    prev = t;
  }
  return best;
}
