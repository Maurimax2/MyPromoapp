// Usernames and WhatsApp numbers — one place for the rules, like
// lib/matricule.js is for the faculty's number.
//
// A username is how classmates find and challenge each other: first-years
// have no university number yet, and nobody remembers a friend's number
// anyway. A WhatsApp number is asked of first-years only, and only so that
// staff can check it is in the faculty's groups before letting them in; it
// lives in profile_private, which classmates cannot read.

/** A username as stored: lower-case, no spaces, nothing but a–z 0–9 _ . */
export const normaliseUsername = (raw) =>
  String(raw || '').trim().replace(/^@/, '').toLowerCase();

export const usernameLooksRight = (value) => /^[a-z0-9_.]{3,20}$/.test(value);

export function usernameError(raw) {
  const value = normaliseUsername(raw);
  if (!value) return 'اختر اسم مستخدم';
  if (value.length < 3) return 'اسم المستخدم: 3 أحرف على الأقل';
  if (value.length > 20) return 'اسم المستخدم: 20 حرفًا على الأكثر';
  if (!usernameLooksRight(value)) return 'اسم المستخدم: حروف لاتينية صغيرة وأرقام و _ و . فقط';
  return null;
}

/**
 * A WhatsApp number as stored: +222 and eight digits for a Mauritanian
 * number however it was typed (36123456, 36 12 34 56, 0022236123456,
 * +222 36-12-34-56), or a foreign number kept as typed with its +.
 */
export function normalisePhone(raw) {
  const text = String(raw || '').trim();
  const digits = text.replace(/[^0-9]/g, '');
  if (!digits) return '';
  if (digits.length === 8) return `+222${digits}`;
  if (digits.length === 11 && digits.startsWith('222')) return `+${digits}`;
  if (digits.length === 13 && digits.startsWith('00222')) return `+${digits.slice(2)}`;
  if (text.startsWith('+') || digits.startsWith('00')) return `+${digits.replace(/^00/, '')}`;
  return digits;
}

export function phoneError(raw) {
  const value = normalisePhone(raw);
  if (!value) return 'اكتب رقم واتساب';
  if (!/^\+?[0-9]{8,15}$/.test(value)) return 'رقم واتساب غير صالح — مثال: 36 12 34 56';
  return null;
}

/** The link that opens a chat with the number in WhatsApp. */
export const whatsappLink = (phone) => `https://wa.me/${String(phone || '').replace(/[^0-9]/g, '')}`;

/**
 * Whether a year is a first year — the years that sign up with a WhatsApp
 * number instead of a university number. From the promos row when it says,
 * from the id when the database has not been told yet.
 */
export const isFirstYear = (promo) => {
  if (!promo) return false;
  if (typeof promo === 'object') {
    if (promo.year != null) return Number(promo.year) === 1;
    return /1$/.test(String(promo.id || ''));
  }
  return ['pcem1', 'pcep1', 'pced1'].includes(String(promo).toLowerCase());
};

/** How a classmate is addressed in a link: their number, else their username. */
export const handleOf = (p) => (p?.matricule || p?.username || null);
