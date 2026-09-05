import { notFound } from 'next/navigation';
import BackButton from '@/components/BackButton';
import Quiz from '@/components/Quiz';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { MODULES, quizFor, moduleById, sectionsFor } from '@/lib/data';

export function generateStaticParams() {
  return MODULES.filter((m) => quizFor(m.id) || sectionsFor(m, 'quiz').length)
    .map((m) => ({ module: m.id }));
}

export default async function QuizPage({ params }) {
  const { module: id } = await params;
  const quiz = quizFor(id);
  const m = moduleById(id);
  if (!m || (!quiz && !sectionsFor(m, 'quiz').length)) notFound();

  // The papers the questions come out of: past exams, isolés, QCM banks.
  const banks = sectionsFor(m, 'quiz');
  const bankCount = banks.reduce((n, s) => n + s.items.length, 0);

  return (
    <>
      <header className="head" style={{ paddingBottom: 14 }}>
        <div className="head-row">
          <BackButton fallback={`/archive/${id}`} />
          <div className="grow">
            <div className="head-t" style={{ fontSize: 17 }}>اختبر نفسك</div>
            <div className="head-s">
              {m.name}
              {quiz ? ` · ${quiz.questions.length} سؤال` : ''}
              {bankCount ? ` · ${bankCount} ملف أسئلة` : ''}
            </div>
          </div>
        </div>
      </header>
      {quiz && <Quiz questions={quiz.questions} moduleId={id} moduleName={m.name} />}

      <div className="scroll">
        {banks.map((s) => (
          <section key={s.id} className="chapter">
            <div className="chapter-head">
              <span className={`chapter-ic tint-${m.tint}`}><Icon name="quiz" size={16} /></span>
              <div className="grow">
                <div className="chapter-t">{s.title}</div>
                <div className="chapter-s">{s.items.length} ملف</div>
              </div>
            </div>
            {s.items.map((it) => (
              <div key={it.fid}>
                <Link className="lec" href={`/file/${it.fid}`}>
                  <span className="grow">
                    <span className="lec-nm" style={{ display: 'block' }}>{it.title}</span>
                    <span className="lec-mt">
                      <span className="ext">{it.ext || 'PDF'}</span>
                      <span className="dot" /><span dir="ltr">{it.mb} MB</span>
                    </span>
                  </span>
                  <span className="chev"><Icon name="chev" size={17} /></span>
                </Link>
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
      </div>
    </>
  );
}
