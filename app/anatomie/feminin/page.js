import { redirect } from 'next/navigation';
import BackButton from '@/components/BackButton';
import Body3D from '@/components/Body3D';
import { currentProfile } from '@/lib/supabase/server';
import { FEMALE } from '@/lib/anatomy/body';
import { getT } from '@/lib/lang';

// Le bassin féminin: the uterus and its adnexa, the bladder, the female
// pelvis, the breast and a full-term placenta — the anatomy both of the other
// sources leave out, because both are one male body.
export const dynamic = 'force-dynamic';

export default async function FemalePage({ searchParams }) {
  const me = await currentProfile();
  if (!me) redirect('/login');
  const t = await getT();
  const q = (await searchParams) || {};

  return (
    <div className="m3d-page bd-page">
      <header className="m3d-top">
        <BackButton fallback="/study" className="m3d-back" />
        <div className="grow">
          <b dir="ltr">{FEMALE.title}</b>
          <s>{t('التشريح الأنثوي: الرحم وملحقاته، المثانة، الحوض، الثدي والمشيمة')}</s>
        </div>
      </header>
      <Body3D set="feminin" quiz={q.quiz === '1'} />
    </div>
  );
}
