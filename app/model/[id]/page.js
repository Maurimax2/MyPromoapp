import { notFound, redirect } from 'next/navigation';
import BackButton from '@/components/BackButton';
import Model3D from '@/components/Model3D';
import { currentProfile } from '@/lib/supabase/server';
import { bundleOf } from '@/lib/anatomy/bundles';

// Nothing here is read from the database — the geometry is a file served from
// our own origin — but the screen is still behind a sign-in like every other,
// and the middleware still decides whether the account is approved.
export const dynamic = 'force-dynamic';

export default async function ModelPage({ params }) {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const { id } = await params;
  const bundle = bundleOf(id);
  if (!bundle) notFound();

  return (
    <>
      <header className="head" style={{ paddingBottom: 12 }}>
        <div className="head-row">
          <BackButton fallback={`/archive/${bundle.module}`} />
          <div className="grow">
            {/* The model names a structure, so its title is French like every
                other piece of study material. The chrome around it is Arabic. */}
            <div className="head-t" style={{ fontSize: 17 }} dir="auto">{bundle.title}</div>
            <div className="head-s" dir="auto">{bundle.subtitle}</div>
          </div>
        </div>
      </header>

      <Model3D id={bundle.id} title={bundle.title} />
    </>
  );
}
