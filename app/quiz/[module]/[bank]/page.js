import { notFound } from 'next/navigation';
import BackButton from '@/components/BackButton';
import Quiz from '@/components/Quiz';
import { moduleById } from '@/lib/data';
import { bankOf, allOf } from '@/lib/quiz-bank';

// Not prerendered any more: the banks live in the database now, and which
// ones exist changes every time somebody extracts a paper.
export const dynamic = 'force-dynamic';

export default async function BankPage({ params }) {
  const { module: id, bank: slug } = await params;
  const m = moduleById(id);
  if (!m) notFound();

  const bank = slug === 'tout' ? null : await bankOf(id, slug);
  if (slug !== 'tout' && !bank) notFound();

  const questions = bank ? bank.questions : await allOf(id);
  if (!questions.length) notFound();

  return (
    <>
      <header className="head" style={{ paddingBottom: 14 }}>
        <div className="head-row">
          <BackButton fallback={`/quiz/${id}`} />
          <div className="grow">
            <div className="head-t" style={{ fontSize: 17 }}>
              {bank ? bank.title : 'كل الأسئلة'}
            </div>
            <div className="head-s">{m.name} · {questions.length} سؤال</div>
          </div>
        </div>
      </header>
      <div className="scroll">
        <Quiz
          questions={questions}
          moduleId={id}
          moduleName={m.name}
          source={bank ? bank.title : null}
        />
      </div>
    </>
  );
}
