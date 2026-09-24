// A streak, worked out from the days — never stored.
//
// The input is the set of days a student studied (study_days, habits.sql).
// Everything else is computed here, the same on the server and the phone:
//
// · the streak: days in a row, ending today — or yesterday, because a
//   streak should not read zero at breakfast on a day you have not studied
//   yet;
// · freezes: every 7 days of a run earn one, up to 2 held. A day missed with
//   a freeze in hand spends it and the run carries on; without one, the run
//   ends. One missed day is what makes most people give up on a streak, so
//   the app forgives it — once in a while, and only if you earned it;
// · the longest run ever, for the milestone badges.
//
// Days are 'YYYY-MM-DD' in UTC, which in Nouakchott is also the local day.

export const FREEZE_EVERY = 7;
export const FREEZES_HELD = 2;
export const MILESTONES = [7, 30, 100];

const ONE = 86400000;
export const dayOf = (t = Date.now()) => new Date(t).toISOString().slice(0, 10);
const next = (day) => dayOf(Date.parse(`${day}T00:00:00Z`) + ONE);

/**
 * @param {Iterable<string>} studied the days with a study_days row
 * @param {string} today 'YYYY-MM-DD'
 * @returns {{ current: number, longest: number, freezes: number, frozen: string[], today: boolean }}
 */
export function streakOf(studied, today = dayOf()) {
  const days = new Set(studied);
  if (!days.size) return { current: 0, longest: 0, freezes: 0, frozen: [], today: false };

  const first = [...days].sort()[0];
  let run = 0;
  let longest = 0;
  let freezes = 0;
  let sinceFreeze = 0;
  let frozen = [];
  let runFrozen = [];

  // Walk every day from the first one studied to yesterday; today is judged
  // separately, because it is not over.
  for (let d = first; d < today; d = next(d)) {
    if (days.has(d)) {
      run += 1;
      sinceFreeze += 1;
      if (sinceFreeze >= FREEZE_EVERY) {
        sinceFreeze = 0;
        freezes = Math.min(FREEZES_HELD, freezes + 1);
      }
      longest = Math.max(longest, run);
    } else if (run > 0 && freezes > 0) {
      freezes -= 1;
      runFrozen.push(d);
    } else {
      run = 0;
      sinceFreeze = 0;
      freezes = 0;
      runFrozen = [];
    }
  }

  const studiedToday = days.has(today);
  if (studiedToday) {
    run += 1;
    longest = Math.max(longest, run);
  }
  frozen = runFrozen;

  return { current: run, longest, freezes, frozen, today: studiedToday };
}

/** The next milestone above a run, and how far it is — for «3 أيام للشارة». */
export function nextMilestone(run) {
  const target = MILESTONES.find((m) => m > run);
  return target ? { target, left: target - run } : null;
}

/** Saturday that begins the week containing `day` — the Arab week. */
export function weekStart(day = dayOf()) {
  const t = Date.parse(`${day}T00:00:00Z`);
  const back = (new Date(t).getUTCDay() + 1) % 7;   // days since Saturday
  return dayOf(t - back * ONE);
}
