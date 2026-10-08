import { notFound, redirect } from 'next/navigation';
import BackButton from '@/components/BackButton';
import Model3D from '@/components/Model3D';
import Body3D from '@/components/Body3D';
import { currentProfile } from '@/lib/supabase/server';
import { subjectsOf } from '@/lib/catalogue';
import { CREDIT, bundleOf } from '@/lib/anatomy/bundles';
import { regionOf } from '@/lib/anatomy/curriculum';
import { lessonOf } from '@/lib/anatomy/lessons';
import { PLANCHES } from '@/lib/anatomy/planches';

// One lesson of anatomy: the part of the body a lecture is about, in 3D, with
// that lecture's drawings and its questions.
//
// Most lessons are the whole body cut down to the lecture (Body3D). A few
// open a regional model instead — the skull, whose landmarks and bone parts
// only the regional viewer draws (Model3D). Both wear the same tools.
//
// The address is the one the regions always had, so a search result or an
// old link that names a region still opens it.
export const dynamic = 'force-dynamic';

const ANATOMY = /(^|-)anatomie(-s\d)?$/i;

/** The subject this lesson belongs to, for the way back. */
async function subjectOf(promo, semester) {
  try {
    const rows = await subjectsOf(String(promo).toLowerCase());
    const m = rows.find((r) => ANATOMY.test(r.id) && String(r.semester).toUpperCase() === semester);
    return m ? `/archive/${m.id}?tab=atlas` : '/study';
  } catch {
    return '/study';
  }
}

export default async function LessonPage({ params, searchParams }) {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const { promo, semestre, region: id } = await params;
  const q = (await searchParams) || {};
  const lesson = lessonOf(promo, semestre, id);
  const semester = lesson?.semester || String(semestre).toUpperCase().replace(/^S?/, 'S');
  const back = await subjectOf(promo, semester);
  const plates = (lesson?.planches || []).map((p) => PLANCHES.find((x) => x.id === p)).filter(Boolean);

  if (lesson && !lesson.region) {
    return (
      <div className="m3d-page bd-page">
        <header className="m3d-top">
          <BackButton fallback={back} className="m3d-back" />
          <div className="grow">
            {/* The lesson names material, so it is French in both interfaces. */}
            <b dir="ltr">{lesson.title}</b>
            <s dir="ltr">{lesson.subtitle}</s>
          </div>
        </header>
        <Body3D
          set={lesson.set || 'corps'}
          lesson={{ id: lesson.id, scene: lesson.scene, quiz: lesson.quiz || null, planches: lesson.planches || [] }}
        />
      </div>
    );
  }

  const region = regionOf(promo, semestre, lesson?.region || id);
  if (!region) notFound();

  // The credit is per model and several are on screen at once, so every
  // source that contributed geometry is named. One of them is share-alike.
  const credit = [...new Set(
    region.bundles.map((b) => bundleOf(b)?.credit || CREDIT))].join(' · ');

  return (
    // On a dark stage, the way the prototype has it: bone reads best against
    // the dark, and the controls around it step back into glass.
    <div className="m3d-page">
      <header className="m3d-top">
        <BackButton fallback={back} className="m3d-back" />
        <div className="grow">
          <b dir="ltr">{lesson?.title || region.title}</b>
          <s dir="ltr">{lesson?.subtitle || region.subtitle}</s>
        </div>
      </header>

      <Model3D
        id={region.lead || region.bundles[0]}
        title={region.title}
        layers={region.bundles}
        lead={region.lead || region.bundles[0]}
        frame={region.frame || null}
        takes={region.takes || null}
        // Arriving from a search: `pick` is a structure or a named part of a
        // bone, `point` a landmark — opened chosen, the camera turned to it.
        pick={typeof q.pick === 'string' ? q.pick : null}
        point={typeof q.point === 'string' ? q.point : null}
        credit={credit}
        plates={plates}
      />
    </div>
  );
}
