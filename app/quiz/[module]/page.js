import { notFound } from 'next/navigation';
import BackButton from '@/components/BackButton';
import Quiz from '@/components/Quiz';
import { MODULES, quizFor, moduleById } from '@/lib/data';

export function generateStaticParams() {
  return MODULES.filter((m) => quizFor(m.id)).map((m) => ({ module: m.id }));
}

export default async function QuizPage({ params }) {
  const { module: id } = await params;
  const quiz = quizFor(id);
  const m = moduleById(id);
  if (!quiz) notFound();

  return (
    <>
      <header className="head" style={{ paddingBottom: 14 }}>
        <div className="head-row">
          <BackButton fallback={`/archive/${id}`} />
          <div className="grow">
            <div className="head-t" style={{ fontSize: 17 }}>اختبر نفسك</div>
            <div className="head-s">{quiz.title} · {quiz.questions.length} أسئلة</div>
          </div>
        </div>
      </header>
      <Quiz questions={quiz.questions} moduleId={id} moduleName={m ? m.name : ''} />
    </>
  );
}
