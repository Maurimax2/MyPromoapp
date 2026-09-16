import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import BackButton from '@/components/BackButton';
import Icon from '@/components/Icon';
import AnatomySearch from '@/components/AnatomySearch';
import { currentProfile } from '@/lib/supabase/server';
import { semesterOf, regionsFor } from '@/lib/anatomy/curriculum';

// The regions of one semester.
//
// A student does not study « le crâne.json » — they study la tête et le cou,
// and the skull is one screen inside it. This is the level in between, and it
// is what the back button from a region comes home to.
export const dynamic = 'force-dynamic';

export default async function SemesterPage({ params }) {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const { promo, semestre } = await params;
  const term = semesterOf(promo, semestre);
  if (!term) notFound();

  const regions = regionsFor(promo, term.semester);

  return (
    <>
      <header className="head" style={{ paddingBottom: 12 }}>
        <div className="head-row">
          <BackButton fallback="/archive" />
          <div className="grow">
            {/* S1 and S2 are never translated — that is what students say. */}
            <div className="head-t" style={{ fontSize: 17 }}>
              {String(promo).toUpperCase()} · {term.semester}
            </div>
            <div className="head-s" dir="auto">{term.title}</div>
          </div>
        </div>
      </header>

      <div className="wrap">
        {/* Browsing is the list below; this is arriving. A student who knows
            the name does not want to guess which of the regions holds it. */}
        <AnatomySearch />

        <p className="admin-card-b" dir="auto" style={{ margin: '14px 0 12px' }}>
          {term.subtitle}
        </p>
        {regions.map((r) => (
          <Link
            key={r.id}
            href={`/anatomie/${String(promo).toLowerCase()}/${term.id}/${r.id}`}
            className="card quizcard model"
          >
            <div className="quizcard-ic"><Icon name="box" size={19} /></div>
            <div className="grow">
              <div className="nm" style={{ fontSize: 14 }} dir="auto">{r.title}</div>
              <div className="mt" dir="auto">{r.subtitle}</div>
            </div>
            <span className="chev"><Icon name="chev" size={18} /></span>
          </Link>
        ))}
      </div>
    </>
  );
}
