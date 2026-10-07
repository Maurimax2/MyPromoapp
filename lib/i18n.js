// Two languages for the interface: Arabic, and French.
//
// The university is not only Arabic-speaking — some students read French
// and no Arabic at all. So the chrome (menus, buttons, screen names,
// messages) can be French too. Study content was always French and stays
// French in both: nothing here touches a lecture, a QCM or a structure name.
//
// The Arabic in the code is the key. A screen says t('الدراسة'); in Arabic
// that is the text itself, in French it is looked up in i18n-fr.js. Anything
// not in the dictionary falls back to the Arabic, so a string nobody has
// translated yet still shows something rather than nothing.
//
// Placeholders are written {name} in the key and filled from `vars`.
// Counting is not done in the dictionary but by plural() below.
//
// Chosen per phone, in a cookie, so the server draws the right language on
// the first paint (lib/lang.js) and the client switches without a reload
// (components/Lang.js). The dictionary itself is never imported here: the
// server holds it and hands it to the phone only when the phone is in French,
// so it has to stay plain strings.

export const LANGS = ['ar', 'fr'];
export const LANG_COOKIE = 'mp-lang';

export const langOf = (value) => (value === 'fr' ? 'fr' : 'ar');
export const dirOf = (lang) => (lang === 'fr' ? 'ltr' : 'rtl');

const fill = (s, vars) => (vars ? s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? '')) : s);

export function translate(dict, text, vars) {
  return fill(dict?.[text] ?? text, vars);
}

/** A t() bound to a language and its dictionary (none for Arabic) — the
 * shape both sides hand to a screen. It carries its language, so a helper
 * handed t can count in the right one. */
export const makeT = (lang, dict = null) =>
  Object.assign((text, vars) => translate(lang === 'fr' ? dict : null, text, vars), { lang });

// Counting things. Arabic has its own forms up to ten — one, two, a few, many
// — and they are the app's own (they used to live in each screen). French
// has one and many.
//   plural(t, 3, ['محاضرة واحدة', 'محاضرتان', 'محاضرات', 'محاضرة'], ['cours', 'cours'])
export function plural(t, n, [one, two, few, many], [frOne, frMany]) {
  if (t.lang === 'fr') return `${n} ${n <= 1 ? frOne : frMany}`;
  return n === 1 ? one : n === 2 ? two : n <= 10 ? `${n} ${few}` : `${n} ${many}`;
}

export const daysWord = (t, n) => plural(t, n, ['يوم واحد', 'يومان', 'أيام', 'يومًا'], ['jour', 'jours']);
export const lecturesWord = (t, n) => plural(t, n, ['محاضرة واحدة', 'محاضرتان', 'محاضرات', 'محاضرة'], ['cours', 'cours']);
export const questionsWord = (t, n) => plural(t, n, ['سؤال واحد', 'سؤالان', 'أسئلة', 'سؤالًا'], ['question', 'questions']);

// "قبل ساعتين" without a date library. Past a week, a date.
export function ago(t, iso, { dateAfterWeek = false } = {}) {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return t.lang === 'fr' ? "à l'instant" : 'الآن';
  const m = Math.floor(s / 60);
  if (m < 60) return t('قبل {m} دقيقة', { m });
  const h = Math.floor(m / 60);
  if (h < 24) return t('قبل {h} ساعة', { h });
  const d = Math.floor(h / 24);
  return dateAfterWeek && d >= 7 ? new Date(iso).toLocaleDateString('fr') : t('قبل {d} يوم', { d });
}
