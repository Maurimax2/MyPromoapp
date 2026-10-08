import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { redirect } from 'next/navigation';
import BackButton from '@/components/BackButton';
import Planches from '@/components/Planches';
import { currentProfile } from '@/lib/supabase/server';
import { getT } from '@/lib/lang';

// Planches d'anatomie — the drawings beside the 3D models.
export const dynamic = 'force-dynamic';

let sizes = null;
const sizesOf = () => {
  if (!sizes) {
    try { sizes = JSON.parse(readFileSync(join(process.cwd(), 'public/planches/sizes.json'), 'utf8')); }
    catch { sizes = {}; }
  }
  return sizes;
};

export default async function PlanchesPage({ searchParams }) {
  const me = await currentProfile();
  if (!me) redirect('/login');
  const t = await getT();
  const q = (await searchParams) || {};

  return (
    <>
      <header className="head">
        <div className="head-row">
          <BackButton fallback="/study" />
          <div className="grow">
            <div className="head-t" dir="ltr">Planches d’anatomie</div>
            <div className="head-s">{t('رسوم تشريحية حسب الجهاز — المس أي لوحة لتكبيرها')}</div>
          </div>
        </div>
      </header>
      <Planches sizes={sizesOf()}
        group={typeof q.g === 'string' ? q.g : null}
        open={typeof q.p === 'string' ? q.p : null} />
    </>
  );
}
