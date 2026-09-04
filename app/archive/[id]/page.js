import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import { MODULES, moduleById, allFiles } from '@/lib/data';

export function generateStaticParams() {
  return MODULES.map((m) => ({ id: m.id }));
}

function Row({ n, title, ext, mb, fid }) {
  return (
    <Link className="lec" href={`/file/${fid}`}>
      <span className="num">{n}</span>
      <span className="grow">
        <span className="lec-nm" style={{ display: 'block' }}>{title}</span>
        <span className="lec-mt"><span className="ext">{ext}</span><span className="dot" />{mb} MB</span>
      </span>
      <span className="chev"><Icon name="chev" size={17} /></span>
    </Link>
  );
}

export default async function Module({ params }) {
  const { id } = await params;
  const m = moduleById(id);
  if (!m) notFound();

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/archive" className="icobtn" aria-label="رجوع"><Icon name="chevR" size={18} /></Link>
          <div className="grow">
            <div className="head-t" style={{ fontSize: 18 }}>{m.name}</div>
            <div className="head-s">
              {m.semester} · {allFiles(m).length} محاضرة
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
            {ch.lectures.map((l) => (
              <Row key={String(l.n)} n={l.n} title={l.title} ext={l.ext} mb={l.mb} fid={l.fid} />
            ))}
          </section>
        ))}

        {m.chapters.length === 0 && (
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
