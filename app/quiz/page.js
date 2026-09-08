import Link from 'next/link';
import Icon from '@/components/Icon';
import { quizzedModules } from '@/lib/data';
import { countOf } from '@/lib/quiz-bank';

// The counts come from the database, so this cannot be prerendered — and
// should not be: it changes whenever a paper is extracted.
export const dynamic = 'force-dynamic';

export default async function QuizIndex() {
  const modules = quizzedModules();
  const counts = Object.fromEntries(
    await Promise.all(modules.map(async (m) => [m.id, await countOf(m.id)])),
  );
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
                <div className="mt">
                  {counts[m.id] ?? 0} سؤال · {m.bankCount} ملف أسئلة
                </div>
              </div>
              <span className="chev"><Icon name="chev" size={18} /></span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
