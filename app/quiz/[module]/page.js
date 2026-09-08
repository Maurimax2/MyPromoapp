import Link from 'next/link';
import { notFound } from 'next/navigation';
import BackButton from '@/components/BackButton';
import Icon from '@/components/Icon';
import { moduleById, sectionsFor } from '@/lib/data';
import QuizPicker from '@/components/QuizPicker';
// Read through the bridge, not the file: every question the panel extracts
// lives in Postgres, and this screen used to show only what a script had
// written into lib/questions/*.json months ago.
import { unansweredCount } from '@/lib/questions';
import { banksOf } from '@/lib/quiz-bank';

// Not prerendered: which banks exist changes whenever a paper is extracted.
export const dynamic = 'force-dynamic';

export default async function QuizModule({ params }) {
  const { module: id } = await params;
  const m = moduleById(id);
  if (!m) notFound();

  const banks = await banksOf(id);
  const total = banks.reduce((n, b) => n + b.questions.length, 0);
  const waiting = unansweredCount(id);
  const sources = sectionsFor(m, 'quiz');
  const sourceCount = sources.reduce((n, s) => n + s.items.length, 0);

  return (
    <>
      <header className="head" style={{ paddingBottom: 14 }}>
        <div className="head-row">
          <BackButton fallback="/quiz" />
          <div className="grow">
            <div className="head-t" style={{ fontSize: 17 }}>اختبر نفسك</div>
            <div className="head-s">
              {m.name} · {total} سؤال · {sourceCount} ملف
            </div>
          </div>
          <div className={`tile sm tint-${m.tint}`}><Icon name={m.icon} size={18} /></div>
        </div>
      </header>

      <div className="scroll">
        {total > 0 && (
          <QuizPicker banks={banks} moduleId={id} moduleName={m.name} />
        )}

        {total === 0 && (
          <div className="empty">
            <div className={`tile tint-${m.tint}`}><Icon name="quiz" size={24} /></div>
            <div className="empty-t">لا أسئلة مستخرجة بعد</div>
            <div className="empty-b">
              أوراق {m.name} كلها ممسوحة كصور — تحتاج قراءة ضوئية (OCR) قبل استخراج الأسئلة.
            </div>
          </div>
        )}

        {waiting > 0 && (
          <div className="quiz-note">
            {waiting} سؤالًا في هذه المادة بلا تصحيح في الورقة الأصلية — لن تُعرض حتى يُضاف جوابها.
          </div>
        )}

        {sources.map((s) => (
          <section key={s.id} id={s.id} className="chapter">
            <div className="chapter-head">
              <span className={`chapter-ic tint-${m.tint}`}><Icon name="file" size={16} /></span>
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
