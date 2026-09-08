// المراجعة.
//
// The questions come from the database — every one of them, for the subjects
// this year has — and the browser decides which are due. Reading them here
// rather than in the browser is what lets a question extracted this morning
// turn up in tonight's revision.

import { quizzedModules } from '@/lib/data';
import { allOf } from '@/lib/quiz-bank';
import ReviewScreen from './ReviewScreen';

export const dynamic = 'force-dynamic';

export default async function Review() {
  const all = (await Promise.all(
    quizzedModules().map(async (m) =>
      (await allOf(m.id)).map((q) => ({ ...q, module: m.name }))),
  )).flat();

  return <ReviewScreen all={all} />;
}
