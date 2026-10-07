// The words around the timetable, in the interface's language. The lectures
// themselves (module, title, teacher) are French and never pass through here.
// Every function takes the screen's t last; without one it answers in Arabic.

export const WEEKDAY = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
export const MONTH = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
const WEEKDAY_FR = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const MONTH_FR = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

const fr = (t) => t?.lang === 'fr';
const at = (day) => new Date(`${day}T12:00:00Z`);

export const weekdayOf = (day, t) => (fr(t) ? WEEKDAY_FR : WEEKDAY)[at(day).getUTCDay()];
export const dayNumber = (day) => at(day).getUTCDate();
export const monthOf = (day, t) => (fr(t) ? MONTH_FR : MONTH)[at(day).getUTCMonth()];
/** «الإثنين 5 أكتوبر» · «lundi 5 octobre» */
export const longDay = (day, t) => `${weekdayOf(day, t)} ${dayNumber(day)} ${monthOf(day, t)}`;

/** «بعد 45 دقيقة», «بعد ساعة و20 دقيقة» — how long until something starts. */
export function inTime(min, t) {
  if (fr(t)) {
    if (min <= 1) return 'dans un instant';
    if (min < 60) return `dans ${min} min`;
    const h = Math.floor(min / 60);
    const m = min % 60;
    return m ? `dans ${h} h ${String(m).padStart(2, '0')}` : `dans ${h} h`;
  }
  if (min <= 1) return 'بعد لحظات';
  if (min < 60) return min === 2 ? 'بعد دقيقتين' : `بعد ${min} ${min <= 10 ? 'دقائق' : 'دقيقة'}`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  const hours = h === 1 ? 'ساعة' : h === 2 ? 'ساعتين' : `${h} ${h <= 10 ? 'ساعات' : 'ساعة'}`;
  return m ? `بعد ${hours} و${m} دقيقة` : `بعد ${hours}`;
}

/** «اليوم», «غدًا», «بعد غد», or the weekday and date. */
export function whenIs(day, today, t) {
  const n = Math.round((Date.parse(day) - Date.parse(today)) / 86400000);
  if (n === 0) return fr(t) ? "aujourd'hui" : 'اليوم';
  if (n === 1) return fr(t) ? 'demain' : 'غدًا';
  if (n === 2) return fr(t) ? 'après-demain' : 'بعد غد';
  return n > 0 && n < 7 ? weekdayOf(day, t) : longDay(day, t);
}

// What a slot is when it is not a plain lecture.
export const KIND = {
  tp: 'أعمال تطبيقية', td: 'أعمال موجّهة', exam: 'امتحان',
  revision: 'حصة مراجعة', break: 'عطلة',
};
