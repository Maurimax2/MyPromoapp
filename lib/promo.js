// Which year's content is on screen.
//
// A student belongs to one promo and that never changes by tapping something:
// it is who they are, it is what their feed is, and it is what they may post
// into. But the material of the other years is not secret — a PCEM2 student
// revising for DCEM1, or somebody who simply wants last year's papers, was
// stuck with their own year's files and nothing else.
//
// So the two are told apart. `profile.promo` is who you are. This is what you
// are reading, and the line between them is what the faculty published versus
// what your promo wrote:
//
//   الأرشيف, اختبر نفسك, the subjects on الرئيسية   ask here — faculty material,
//                                                   readable for any year
//   الرئيسية's feed, الملخصات                        do not — a post and a
//                                                   summary belong to the
//                                                   promo that wrote them,
//                                                   and are written into it
//
// Asked in one place because the screen somebody adds next month is the one
// that would forget.

import { cookies } from 'next/headers';

export const PROMO_COOKIE = 'promo';

/**
 * The year being browsed: the one chosen, or the student's own.
 *
 * `known` is the promos the database actually has. A cookie naming a year
 * that has since been removed reads as no choice at all rather than emptying
 * every screen — the panel can add and remove years, and a stale cookie must
 * not outlive one.
 */
export async function browsingPromo(profile, known) {
  const mine = profile?.promo || 'pcem2';
  const chosen = (await cookies()).get(PROMO_COOKIE)?.value;
  if (!chosen || chosen === mine) return mine;

  const ids = Array.isArray(known)
    ? known.map((p) => (typeof p === 'string' ? p : p.id))
    : null;
  if (ids && !ids.includes(chosen)) return mine;

  return chosen;
}
