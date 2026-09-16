import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import { allFiles, allDocs, sectionsFor } from '@/lib/data';
import { moduleOf, semestersOf } from '@/lib/catalogue';
import { regionsFor } from '@/lib/anatomy/curriculum';
import { subjectName } from '@/lib/data';

// Not prerendered any more: what a subject holds is a question for the
// database, and the answer depends on who is asking.
export const dynamic = 'force-dynamic';

function Meta({ ext, mb, prof, year }) {
  return (
    <span className="lec-mt">
      <span className="ext">{ext || 'PDF'}</span>
      <span className="dot" /><span dir="ltr">{mb} MB</span>
      {prof && <><span className="dot" />{prof}</>}
      {year && <><span className="dot" />{year}</>}
    </span>
  );
}

function Doc({ title, ext, mb, prof, year, fid, n }) {
  return (
    <Link className="lec" href={`/file/${fid}`}>
      {n != null && <span className="num">{n}</span>}
      <span className="grow">
        <span className="lec-nm" style={{ display: 'block' }}>{title}</span>
        <Meta ext={ext} mb={mb} prof={prof} year={year} />
      </span>
      <span className="chev"><Icon name="chev" size={17} /></span>
    </Link>
  );
}

// The same lecture given by another teacher is not another lecture. It hangs
// off the one the student is looking at instead of competing with it in the list.
function Lecture({ l }) {
  const alts = l.versions || [];
  return (
    <>
      <Doc {...l} />
      {alts.length > 0 && (
        <details className="alts">
          <summary>{alts.length} نسخة أخرى</summary>
          {alts.map((v) => (
            <Link key={v.fid} className="alt" href={`/file/${v.fid}`}>
              <span className="grow">
                <span className="alt-nm">{v.title}</span>
                <Meta ext={v.ext} mb={v.mb} prof={v.prof} year={v.year} />
              </span>
              <span className="chev"><Icon name="chev" size={15} /></span>
            </Link>
          ))}
        </details>
      )}
    </>
  );
}

export default async function Module({ params }) {
  const { id } = await params;
  const m = await moduleOf(id);
  if (!m) notFound();

  // الرئيسية now shows one banner per subject, so this screen is where the
  // two semesters part. A subject taught in one draws no switch at all.
  const semesters = await semestersOf(m);

  // The regions of the body this subject covers, from the curriculum rather
  // than from the list of carved files.
  const regions = regionsFor(m.promo, m.semester);

  // Only the material you read. Résumés live in الملخصات, questions in اختبر نفسك.
  const sections = sectionsFor(m, 'archive');

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/archive" className="icobtn" aria-label="رجوع"><Icon name="chevR" size={18} /></Link>
          <div className="grow">
            <div className="head-t" style={{ fontSize: 18 }}>{subjectName(m.name)}</div>
            <div className="head-s">
              {/* The switch below says which semester when there is a choice;
                  when there is not, this is the only place it is written. */}
              {semesters.length > 1 ? '' : `${m.semester} · `}
              {allFiles(m).length} محاضرة · {allDocs(m).length} ملف
              {m.professors.length ? ` · ${m.professors.join(' · ')}` : ''}
            </div>
          </div>
          <div className={`tile sm tint-${m.tint}`}><Icon name={m.icon} size={18} /></div>
        </div>
      </header>

      <div className="scroll">
        {semesters.length > 1 && (
          <div className="seg" role="group" aria-label="السداسي">
            {semesters.map((s) => (
              <Link key={s.id} href={`/archive/${s.id}`}
                data-on={s.id === m.id} dir="ltr">
                {s.semester}
              </Link>
            ))}
          </div>
        )}

        <Link href={`/quiz/${m.id}`} className="card quizcard">
          <div className="quizcard-ic"><Icon name="quiz" size={19} /></div>
          <div className="grow">
            <div className="nm" style={{ fontSize: 14 }}>اختبر نفسك</div>
            <div className="mt">أسئلة على {m.name}</div>
          </div>
          <span className="chev"><Icon name="chev" size={18} /></span>
        </Link>

        {/* A model belongs to the subject it explains — that is why نماذج 3D
            came off الرئيسية. A subject with none shows nothing here.
            
            What is offered is the REGIONS of the body this subject covers,
            not the files the app happens to hold. A student opening ANATOMIE
            is studying the head and the neck; that there are ten carved
            bundles behind it is our problem, not theirs. */}
        {regions.length > 0 && (
          <section className="chapter">
            <div className="chapter-head">
              <span className="chapter-n"><Icon name="box" size={15} /></span>
              <div className="grow">
                <div className="chapter-t">نماذج ثلاثية الأبعاد</div>
                <div className="chapter-s" dir="auto">{regions[0].semesterTitle}</div>
              </div>
            </div>
            {regions.map((r) => (
              <Link
                key={r.id}
                href={`/anatomie/${r.promo.toLowerCase()}/${r.semesterId}/${r.id}`}
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
          </section>
        )}

        {m.chapters.map((ch, i) => (
          <section key={ch.title} className="chapter">
            <div className="chapter-head">
              <span className="chapter-n">{i + 1}</span>
              <div className="grow">
                <div className="chapter-t">{ch.title}</div>
                <div className="chapter-s">
                  {[ch.subtitle, `${ch.lectures.length} محاضرة`].filter(Boolean).join(' · ')}
                </div>
              </div>
            </div>
            {ch.lectures.map((l) => <Lecture key={String(l.n)} l={l} />)}
          </section>
        ))}

        {sections.map((s) => (
          <section key={s.id} id={s.id} className="chapter">
            <div className="chapter-head">
              <span className={`chapter-ic tint-${m.tint}`}><Icon name={s.icon} size={16} /></span>
              <div className="grow">
                <div className="chapter-t">{s.title}</div>
                <div className="chapter-s">{s.items.length} ملف</div>
              </div>
            </div>
            {s.items.map((it) => (
              <div key={it.fid}>
                <Doc {...it} />
                {it.correction && (
                  <Link className="alt corr" href={`/file/${it.correction}`}>
                    <span className="grow"><span className="alt-nm">Correction</span></span>
                    <span className="chev"><Icon name="chev" size={15} /></span>
                  </Link>
                )}
              </div>
            ))}
          </section>
        ))}

        {m.chapters.length === 0 && sections.length === 0 && (
          <div className="empty">
            <div className={`tile tint-${m.tint}`}><Icon name={m.icon} size={24} /></div>
            <div className="empty-t">{m.empty ? 'المجلد فارغ في Drive' : 'لم تُفهرس بعد'}</div>
            <div className="empty-b">لا توجد محاضرات في {m.name} حتى الآن.</div>
          </div>
        )}
      </div>
    </>
  );
}
