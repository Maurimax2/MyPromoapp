import Link from 'next/link';
import Icon from '@/components/Icon';
import { quizzedModules } from '@/lib/data';

export default function QuizIndex() {
  const modules = quizzedModules();
  return (
    <>
      <header className="head">
        <div className="head-row">
          <div className="grow">
            <div className="head-t">الاختبارات</div>
            <div className="head-s">اختبر نفسك قبل الامتحان</div>
          </div>
          <div className="tile sm tint-orange"><Icon name="quiz" size={18} /></div>
        </div>
      </header>
      <div className="scroll">
        {modules.map((m) => (
          <Link key={m.id} href={`/quiz/${m.id}`} className="card">
            <div className="card-row">
              <div className={`tile tint-${m.tint}`}><Icon name={m.icon} size={22} /></div>
              <div className="grow">
                <div className="nm">{m.name}</div>
                <div className="mt">{m.quiz.questions.length} أسئلة</div>
              </div>
              <span className="chev"><Icon name="chev" size={18} /></span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
