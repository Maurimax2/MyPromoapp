import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import { allFiles, allDocs, sectionsFor } from '@/lib/data';
import { moduleOf } from '@/lib/catalogue';

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

  // Only the material you read. Résumés live in الملخصات, questions in اختبر نفسك.
  const sections = sectionsFor(m, 'archive');

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/archive" className="icobtn" aria-label="رجوع"><Icon name="chevR" size={18} /></Link>
          <div className="grow">
            <div className="head-t" style={{ fontSize: 18 }}>{m.name}</div>
            <div className="head-s">
              {m.semester} · {allFiles(m).length} محاضرة · {allDocs(m).length} ملف
              {m.professors.length ? ` · ${m.professors.join(' · ')}` : ''}
            </div>
          </div>
          <div className={`tile sm tint-${m.tint}`}><Icon name={m.icon} size={18} /></div>
        </div>
      </header>

      <div className="scroll">
        <Link href={`/quiz/${m.id}`} className="card quizcard">
          <div className="quizcard-ic"><Icon name="quiz" size={19} /></div>
          <div className="grow">
            <div className="nm" style={{ fontSize: 14 }}>اختبر نفسك</div>
            <div className="mt">أسئلة على {m.name}</div>
          </div>
          <span className="chev"><Icon name="chev" size={18} /></span>
        </Link>

        {m.chapters.map((ch, i) => (
          <section key={ch.title} className="chapter">
            <div className="chapter-head">
              <span className="chapter-n">{i + 1}</span>
              <div className="grow">
                <div className="chapter-t">{ch.title}</div>
                <div className="chapter-s">{ch.subtitle} · {ch.lectures.length} محاضرة</div>
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
