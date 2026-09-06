// What you got wrong comes back.
//
// A Leitner schedule, kept in the browser: a question you miss returns in ten
// minutes, and each time you get it right it waits longer — a day, three days,
// a week, three weeks. Miss it again and it drops back to the start.
//
// It lives in two places on purpose. localStorage answers instantly and works
// signed out; the server is what survives changing phone. Every answer is
// written to both, and the server wins on a fresh device because the browser
// has nothing to say there.

const KEY = 'mypromo.review.v1';

// How long to wait after each consecutive correct answer.
const DELAYS = [10 * 60e3, 24 * 3600e3, 3 * 24 * 3600e3, 7 * 24 * 3600e3, 21 * 24 * 3600e3];

function read() {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
}

function write(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* private mode */ }
}

/**
 * Tell the server too, if there is an account behind this.
 *
 * Fire and forget: the schedule in the browser has already been written, so a
 * failed request costs this device nothing and the next answer will try again.
 */
function mirror(id, correct) {
  // Ids look like `anatomie:<bank>:<n>` in the code-resident catalogue and
  // like a number once the questions live in the database. Only the second
  // kind means anything to the server.
  const numeric = Number(id);
  if (!Number.isInteger(numeric) || typeof fetch === 'undefined') return;

  fetch('/api/review', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ question: numeric, correct }),
  }).catch(() => {});
}

/** Record an answer and schedule when the question should come back. */
export function record(id, correct) {
  mirror(id, correct);

  const state = read();
  const prev = state[id] || { box: 0, wrong: 0 };
  const box = correct ? Math.min(prev.box + 1, DELAYS.length - 1) : 0;

  // A question answered right from the top box is learnt; stop tracking it.
  if (correct && prev.box >= DELAYS.length - 1) {
    delete state[id];
    write(state);
    return;
  }

  state[id] = {
    box,
    wrong: prev.wrong + (correct ? 0 : 1),
    due: Date.now() + DELAYS[box],
  };
  write(state);
}

/** The ids this student owes, soonest first. */
export function dueIds(now = Date.now()) {
  const state = read();
  return Object.entries(state)
    .filter(([, v]) => v.due <= now)
    .sort((a, b) => a[1].due - b[1].due)
    .map(([id]) => id);
}

/** Everything being tracked, due or not — for the counter on the card. */
export function trackedCount() {
  return Object.keys(read()).length;
}

export function dueCount(now = Date.now()) {
  return dueIds(now).length;
}

export function reset() {
  write({});
}
