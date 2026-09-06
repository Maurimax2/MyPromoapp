// النقاط — what the app counts, and what it refuses to count.
//
// The rule behind every number here: a point is paid for something another
// student can use. Writing an answer somebody accepted is worth more than
// ten posts, and reading is worth nothing at all — a counter that rewards
// opening the app rewards the wrong thing.
//
// Nothing is stored. Every total is computed from what already happened:
// posts, likes, comments, accepted answers, and the review schedule. That
// means no table to keep in step, and no way for a number to drift from the
// thing it claims to count.

export const RULES = [
  { id: 'note',     each:  6, label: 'ملخص ترفعه',        icon: 'file'  },
  { id: 'accepted', each: 10, label: 'جواب قُبل',          icon: 'check' },
  { id: 'answer',   each:  2, label: 'جواب تكتبه',         icon: 'msg'   },
  { id: 'post',     each:  2, label: 'منشور',              icon: 'send'  },
  { id: 'question', each:  1, label: 'سؤال تطرحه',         icon: 'quiz'  },
  { id: 'like',     each:  1, label: 'إعجاب على منشورك',   icon: 'heart' },
  { id: 'mastered', each:  1, label: 'سؤال أتقنته',        icon: 'clock' },
];

/** The empty tally, so every caller starts from the same shape. */
export const zero = () => Object.fromEntries(RULES.map((r) => [r.id, 0]));

export function scoreOf(counts) {
  return RULES.reduce((n, r) => n + r.each * (counts[r.id] || 0), 0);
}

/** What a total earned, rule by rule — the screen shows its own arithmetic. */
export function breakdown(counts) {
  return RULES
    .map((r) => ({ ...r, n: counts[r.id] || 0, points: r.each * (counts[r.id] || 0) }))
    .filter((r) => r.n > 0);
}

// A badge is a threshold, not a mystery. Each one says what it wants, so a
// student who has not got it knows exactly what to do — a locked badge with
// a hidden condition is just a taunt.
export const BADGES = [
  { id: 'first',   label: 'أول خطوة',  want: 'أول منشور',            icon: 'send',   of: (c) => c.post + c.note + c.question, need: 1 },
  { id: 'giver',   label: 'مِعطاء',     want: '5 ملخصات',             icon: 'file',   of: (c) => c.note,     need: 5 },
  { id: 'helper',  label: 'مُجيب',      want: '10 أجوبة',             icon: 'msg',    of: (c) => c.answer,   need: 10 },
  { id: 'saviour', label: 'المُنقِذ',    want: '3 أجوبة مقبولة',       icon: 'check',  of: (c) => c.accepted, need: 3 },
  { id: 'loved',   label: 'محبوب',     want: '50 إعجابًا',            icon: 'heart',  of: (c) => c.like,     need: 50 },
  { id: 'steady',  label: 'مثابر',     want: '50 سؤالًا في المراجعة', icon: 'clock',  of: (c) => c.mastered, need: 50 },
];

// `of` is left behind on purpose: what comes back crosses from a server
// component into a client one, and a function cannot make that trip — React
// refuses the whole render rather than dropping it quietly.
export function badgesOf(counts) {
  return BADGES.map(({ of, ...b }) => {
    const have = of(counts) || 0;
    return { ...b, have, done: have >= b.need };
  });
}

// A question counts as mastered once it has survived to the third Leitner box
// — answered right often enough that it comes back in a week, not in ten
// minutes. Getting one right on the first showing is not learning it.
export const MASTERED_BOX = 3;
