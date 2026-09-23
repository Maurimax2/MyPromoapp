// Your best score on each paper.
//
// A subject's QCM tab draws a ring per paper — 80%, 55%, «لم تبدأ» — and the
// subject's banner says «أفضل نتيجة». This is what they read. In the browser,
// like the review schedule: it is yours, and it is worth nothing to anybody
// else.
//
// Only a whole run counts. A run is finished when the result screen appears;
// leaving half-way records nothing, so a best score is always out of every
// question on that paper.

const KEY = 'mypromo.best';

const read = () => {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; }
};

/** Keep `pct` for `key` (`<module>:<bank>`) if it beats what is there. */
export function scored(key, pct) {
  if (!key || !Number.isFinite(pct)) return;
  const all = read();
  const had = all[key];
  all[key] = { best: Math.max(had?.best ?? 0, pct), last: pct, runs: (had?.runs || 0) + 1, at: Date.now() };
  try { localStorage.setItem(KEY, JSON.stringify(all)); } catch { /* private mode */ }
}

/** Every paper's record: key → { best, last, runs, at }. */
export function bests() {
  return read();
}
