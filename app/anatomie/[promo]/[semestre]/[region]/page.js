import { notFound, redirect } from 'next/navigation';
import BackButton from '@/components/BackButton';
import Model3D from '@/components/Model3D';
import { currentProfile } from '@/lib/supabase/server';
import { CREDIT, bundleOf } from '@/lib/anatomy/bundles';
import { regionOf } from '@/lib/anatomy/curriculum';

// A region of the body, drawn from every model that has a piece of it.
//
// The old screen opened one bundle, alone, centred on itself — which is how a
// median nerve ends up floating on a white background. Every bundle is carved
// in the same world frame, so a region names the ones its scene is made of and
// they arrive already sitting on each other.
export const dynamic = 'force-dynamic';

export default async function RegionPage({ params, searchParams }) {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const { promo, semestre, region: id } = await params;
  const region = regionOf(promo, semestre, id);
  if (!region) notFound();

  // Arriving from a search. `pick` is a structure or a named part of a bone,
  // `point` is a landmark — the region opens with it chosen and the camera
  // already turned to it, because landing on the whole region and being left
  // to find the thing again is not an answer.
  const q = (await searchParams) || {};

  // The credit is per model and several are on screen at once, so every
  // source that contributed geometry is named. One of them is share-alike.
  const credit = [...new Set(
    region.bundles.map((b) => bundleOf(b)?.credit || CREDIT))].join(' · ');

  return (
    // On a dark stage, the way the prototype has it: bone reads best against
    // the dark, and the controls around it step back into glass.
    <div className="m3d-page">
      <header className="m3d-top">
        <BackButton fallback={`/anatomie/${promo}/${semestre}`} className="m3d-back" />
        <div className="grow">
          {/* The region names material, so it is French like every other
              piece of study content. The chrome around it is Arabic. */}
          <b dir="auto">{region.title}</b>
          <s dir="auto">{region.subtitle}</s>
        </div>
      </header>

      <Model3D
        id={region.lead || region.bundles[0]}
        title={region.title}
        layers={region.bundles}
        lead={region.lead || region.bundles[0]}
        frame={region.frame || null}
        takes={region.takes || null}
        pick={typeof q.pick === 'string' ? q.pick : null}
        point={typeof q.point === 'string' ? q.point : null}
        credit={credit}
      />
    </div>
  );
}
