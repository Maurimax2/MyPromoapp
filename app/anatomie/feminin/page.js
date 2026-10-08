import { redirect } from 'next/navigation';

// The female pelvis is a lesson now — L'utérus et ses annexes, PCEM2 S2 —
// reached from the lecture it explains, in its pelvis, with its plates. This
// address was a screen of its own; an old link lands on the lesson.
export const dynamic = 'force-dynamic';

export default function FemininPage() {
  redirect('/anatomie/pcem2/s2/genital-feminin');
}
