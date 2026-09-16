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

export default async function RegionPage({ params }) {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const { promo, semestre, region: id } = await params;
  const region = regionOf(promo, semestre, id);
  if (!region) notFound();

  // The credit is per model and several are on screen at once, so every
  // source that contributed geometry is named. One of them is share-alike.
  const credit = [...new Set(
    region.bundles.map((b) => bundleOf(b)?.credit || CREDIT))].join(' · ');

  return (
    <>
      <header className="head" style={{ paddingBottom: 12 }}>
        <div className="head-row">
          <BackButton fallback={`/anatomie/${promo}/${semestre}`} />
          <div className="grow">
            {/* The region names material, so it is French like every other
                piece of study content. The chrome around it is Arabic. */}
            <div className="head-t" style={{ fontSize: 17 }} dir="auto">{region.title}</div>
            <div className="head-s" dir="auto">{region.subtitle}</div>
          </div>
        </div>
      </header>

      <Model3D
        id={region.lead || region.bundles[0]}
        title={region.title}
        layers={region.bundles}
        lead={region.lead || region.bundles[0]}
        frame={region.frame || null}
        takes={region.takes || null}
        credit={credit}
      />
    </>
  );
}
