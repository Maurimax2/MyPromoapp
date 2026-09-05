import { notFound } from 'next/navigation';
import BackButton from '@/components/BackButton';
import Quiz from '@/components/Quiz';
import { MODULES, moduleById } from '@/lib/data';
import { banksFor, bankBySlug, allQuestions } from '@/lib/questions';

export function generateStaticParams() {
  return MODULES.flatMap((m) => {
    const banks = banksFor(m.id);
    if (!banks.length) return [];
    return [
      { module: m.id, bank: 'tout' },
      ...banks.map((b) => ({ module: m.id, bank: b.fid })),
    ];
  });
}

export default async function BankPage({ params }) {
  const { module: id, bank: slug } = await params;
  const m = moduleById(id);
  if (!m) notFound();

  const bank = slug === 'tout' ? null : bankBySlug(id, slug);
  if (slug !== 'tout' && !bank) notFound();

  const questions = bank ? bank.questions : allQuestions(id);
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
      <Quiz
        questions={questions}
        moduleId={id}
        moduleName={m.name}
        source={bank ? bank.title : null}
      />
    </>
  );
}
