// The words around the timetable — Arabic, because the interface is. The
// lectures themselves (module, title, teacher) are French and never pass
// through here.

export const WEEKDAY = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
export const MONTH = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

const at = (day) => new Date(`${day}T12:00:00Z`);

export const weekdayOf = (day) => WEEKDAY[at(day).getUTCDay()];
export const dayNumber = (day) => at(day).getUTCDate();
export const monthOf = (day) => MONTH[at(day).getUTCMonth()];
/** «الإثنين 5 أكتوبر» */
export const longDay = (day) => `${weekdayOf(day)} ${dayNumber(day)} ${monthOf(day)}`;

/** «بعد 45 دقيقة», «بعد ساعة و20 دقيقة» — how long until something starts. */
export function inTime(min) {
  if (min <= 1) return 'بعد لحظات';
  if (min < 60) return min === 2 ? 'بعد دقيقتين' : `بعد ${min} ${min <= 10 ? 'دقائق' : 'دقيقة'}`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  const hours = h === 1 ? 'ساعة' : h === 2 ? 'ساعتين' : `${h} ${h <= 10 ? 'ساعات' : 'ساعة'}`;
  return m ? `بعد ${hours} و${m} دقيقة` : `بعد ${hours}`;
}

/** «اليوم», «غدًا», «بعد غد», or the weekday and date. */
export function whenIs(day, today) {
  const n = Math.round((Date.parse(day) - Date.parse(today)) / 86400000);
  if (n === 0) return 'اليوم';
  if (n === 1) return 'غدًا';
  if (n === 2) return 'بعد غد';
  return n > 0 && n < 7 ? weekdayOf(day) : longDay(day);
}

// What a slot is when it is not a plain lecture.
export const KIND = {
  tp: 'أعمال تطبيقية', td: 'أعمال موجّهة', exam: 'امتحان',
  revision: 'حصة مراجعة', break: 'عطلة',
};
