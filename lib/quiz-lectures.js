// The same questions, grouped by what they are about.
//
// A bank is the paper a question was printed on. That is where it came from,
// not what it revises, and a student the night before an exam does not revise
// the 2021 paper — they revise the vessels of the head and neck, and they
// want that lecture's questions out of every paper at once.
//
// Both groupings are the same questions seen from a different side, so both
// hand back the same shape and one picker draws either.

/** A lecture's own heading: the number the module gives it, then its name. */
const headingOf = (lecture) => lecture.title;

/**
 * The subject's questions, arranged by lecture.
 *
 * `chapters` is the module as the catalogue assembles it — chapters holding
 * lectures, each lecture carrying the `id` its questions point at.
 *
 * Returns null when not one question in the subject has been classified.
 * A toggle between two views where one of them is empty is a toggle that
 * wastes a tap and explains nothing, so until somebody has done the work the
 * screen does not offer it.
 *
 * A lecture nobody has written a question for is left out. A question nobody
 * has placed is not: it goes in a group of its own at the end, where it can
 * still be answered and can still be seen to be unplaced. Dropping it would
 * mean the subject quietly held fewer questions in one view than the other.
 */
export function groupByLecture(chapters, questions) {
  if (!questions.some((q) => q.lecture != null)) return null;

  const held = new Map();      // document id -> questions
  const loose = [];
  for (const q of questions) {
    if (q.lecture == null) { loose.push(q); continue; }
    const at = held.get(q.lecture);
    if (at) at.push(q); else held.set(q.lecture, [q]);
  }

  const groups = [];
  for (const chapter of chapters || []) {
    for (const lecture of chapter.lectures || []) {
      const mine = held.get(lecture.id);
      if (!mine || !mine.length) continue;
      held.delete(lecture.id);
      groups.push({
        fid: `L${lecture.id}`,
        n: lecture.n ?? null,
        title: headingOf(lecture),
        section: chapter.title,
        questions: mine,
      });
    }
  }

  // Pointed at a lecture the catalogue no longer lists — re-uploaded, moved
  // to another subject, or deleted with the reference left behind. Kept
  // rather than dropped: the questions are still good questions.
  const orphaned = [...held.values()].flat();
  if (orphaned.length) {
    groups.push({
      fid: 'L-gone', n: null, title: 'محاضرة لم تعد في الأرشيف',
      section: null, questions: orphaned,
    });
  }

  if (loose.length) {
    groups.push({
      fid: 'L-none', n: null, title: 'لم تُصنَّف بعد',
      section: null, questions: loose,
    });
  }

  return groups;
}
