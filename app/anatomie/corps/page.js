import { redirect } from 'next/navigation';
import BackButton from '@/components/BackButton';
import Body3D from '@/components/Body3D';
import { currentProfile } from '@/lib/supabase/server';
import { VIEWS } from '@/lib/anatomy/body';
import { getT } from '@/lib/lang';

// Le corps entier: every system, to switch on, thin out and take apart. The
// regional models stay where they are, one per lecture; this is the table the
// lectures are about.
export const dynamic = 'force-dynamic';

export default async function BodyPage({ searchParams }) {
  const me = await currentProfile();
  if (!me) redirect('/login');
  const t = await getT();
  const q = (await searchParams) || {};
  // `?vue=neuro` opens on a ready-made dissection — the nerves, say — when a
  // link wants one.
  const start = VIEWS.some((v) => v.id === q.vue) ? q.vue : null;

  return (
    <div className="m3d-page bd-page">
      <header className="m3d-top">
        <BackButton fallback="/study" className="m3d-back" />
        <div className="grow">
          <b dir="ltr">Le corps entier</b>
          <s>{t('شرّح طبقة بطبقة، والمس أي بنية لتعرف اسمها')}</s>
        </div>
      </header>
      <Body3D start={start} quiz={q.quiz === '1'} />
    </div>
  );
}
