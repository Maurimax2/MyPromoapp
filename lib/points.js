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
  // Answering, not opening: the question of the day pays when it is right.
  { id: 'daily',    each:  2, label: 'سؤال اليوم صحيحًا',  icon: 'sparkle' },
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
  // Sharing — a hexagon, the shape of a cell in a hive.
  { id: 'first',   kind: 'hex',     tier: 1, label: 'أول خطوة',     want: 'أول منشور',                  icon: 'send',    of: (c) => c.post + c.note + c.question, need: 1 },
  { id: 'giver',   kind: 'hex',     tier: 2, label: 'مِعطاء',        want: '5 ملخصات',                   icon: 'file',    of: (c) => c.note,     need: 5 },
  { id: 'library', kind: 'hex',     tier: 3, label: 'مكتبة الدفعة',  want: '20 ملخصًا',                  icon: 'file',    of: (c) => c.note,     need: 20 },
  // Helping — a shield: somebody else is better off for it.
  { id: 'helper',  kind: 'shield',  tier: 1, label: 'مُجيب',         want: '10 أجوبة',                   icon: 'msg',     of: (c) => c.answer,   need: 10 },
  { id: 'saviour', kind: 'shield',  tier: 2, label: 'المُنقِذ',       want: '3 أجوبة مقبولة',             icon: 'check',   of: (c) => c.accepted, need: 3 },
  { id: 'mentor',  kind: 'shield',  tier: 3, label: 'مرجع الدفعة',   want: '15 جوابًا مقبولًا',           icon: 'check',   of: (c) => c.accepted, need: 15 },
  { id: 'sage',    kind: 'shield',  tier: 4, label: 'الحكيم',        want: '100 جواب',                   icon: 'msg',     of: (c) => c.answer,   need: 100 },
  // The promo answering back — a rosette.
  { id: 'curious', kind: 'rosette', tier: 1, label: 'فضولي',         want: '10 أسئلة تطرحها',            icon: 'quiz',    of: (c) => c.question, need: 10 },
  { id: 'loved',   kind: 'rosette', tier: 2, label: 'محبوب',        want: '50 إعجابًا',                  icon: 'heart',   of: (c) => c.like,     need: 50 },
  { id: 'star',    kind: 'rosette', tier: 3, label: 'نجم الدفعة',    want: '250 إعجابًا',                 icon: 'heart',   of: (c) => c.like,     need: 250 },
  // Study — a star.
  { id: 'sharp',   kind: 'star',    tier: 1, label: 'دقيق',          want: 'سؤال اليوم صحيحًا 7 مرات',    icon: 'sparkle', of: (c) => c.daily,    need: 7 },
  { id: 'steady',  kind: 'star',    tier: 2, label: 'مثابر',         want: '50 سؤالًا في المراجعة',       icon: 'clock',   of: (c) => c.mastered, need: 50 },
  { id: 'scholar', kind: 'star',    tier: 3, label: 'متمكّن',         want: '250 سؤالًا في المراجعة',      icon: 'clock',   of: (c) => c.mastered, need: 250 },
  { id: 'master',  kind: 'star',    tier: 4, label: 'علّامة',         want: '1000 سؤال في المراجعة',       icon: 'award',   of: (c) => c.mastered, need: 1000 },
  // The streak badges read the longest run ever, so a break does not take
  // back a badge already earned.
  { id: 'week',    kind: 'flame',   tier: 1, label: 'أسبوع كامل',   want: '7 أيام متتالية',              icon: 'flame',   of: (c) => c.longest,  need: 7 },
  { id: 'month',   kind: 'flame',   tier: 3, label: 'شهر كامل',     want: '30 يومًا متتاليًا',            icon: 'flame',   of: (c) => c.longest,  need: 30 },
  { id: 'hundred', kind: 'laurel',  tier: 4, label: 'المئة',        want: '100 يوم متتالٍ',              icon: 'crown',   of: (c) => c.longest,  need: 100 },
];

/** What a tier is called, on the sheet that explains a badge. */
export const TIERS = { 1: 'برونزية', 2: 'فضية', 3: 'ذهبية', 4: 'زمردية' };

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
