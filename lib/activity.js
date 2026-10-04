// Where in the app somebody is, in words an admin reads.
//
// A screen is named from its address, in one place, so the phone sends a path
// and the panel prints a label — and the day a screen is added, this is the one
// file that has to hear about it. Anything not listed is «أخرى», never dropped:
// a person on a screen nobody named is still a person using the app.

export const SCREENS = {
  feed:          'الرئيسية',
  study:         'الدراسة',
  archive:       'يتصفّح المواد',
  file:          'يقرأ محاضرة',
  quiz:          'يختبر نفسه (QCM)',
  review:        'المراجعة',
  duel:          'في تحدٍّ',
  rooms:         'في غرفة دراسة',
  chat:          'يحادث زميلًا',
  qa:            'أسئلة وأجوبة',
  notes:         'الملخصات',
  anatomy:       'نموذج 3D',
  timetable:     'جدول الحصص',
  profile:       'ملفه',
  points:        'الترتيب والنقاط',
  notifications: 'الإشعارات',
  friends:       'الأصدقاء',
  saved:         'المحفوظات',
  other:         'أخرى',
};

// The first part of the address → the screen.
const BY_ROOT = {
  feed: 'feed', study: 'study', archive: 'archive', lectures: 'archive', file: 'file',
  quiz: 'quiz', review: 'review', duel: 'duel', rooms: 'rooms', chat: 'chat',
  qa: 'qa', notes: 'notes', anatomie: 'anatomy', model: 'anatomy', timetable: 'timetable',
  profile: 'profile', u: 'profile', points: 'points', notifications: 'notifications',
  friends: 'friends', saved: 'saved',
};

/** `/file/abc` → `file`. Never throws, never returns something unlisted. */
export function screenOf(path) {
  const root = String(path || '').split('?')[0].split('/').filter(Boolean)[0] || 'feed';
  return BY_ROOT[root] || 'other';
}

/** app | desktop | pwa | web — the ways somebody has MyPromo open. */
export const PLATFORMS = { app: 'تطبيق الهاتف', desktop: 'تطبيق الحاسوب', pwa: 'أيقونة الشاشة', web: 'المتصفح' };

/** Seen this recently = online. The phone reports every minute. */
export const ONLINE_MS = 150 * 1000;

/** A visit after this long away counts as opening the app again. */
export const NEW_VISIT_MS = 30 * 60 * 1000;
