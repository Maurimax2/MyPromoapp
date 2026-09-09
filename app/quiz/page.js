import Link from 'next/link';
import { redirect } from 'next/navigation';
import Icon from '@/components/Icon';
import { quizzedModules } from '@/lib/data';
import { currentProfile } from '@/lib/supabase/server';
import { subjectsOf } from '@/lib/catalogue';
import { countOf, quizzedIds, bankCountOf } from '@/lib/quiz-bank';

// The counts come from the database, so this cannot be prerendered — and
// should not be: it changes whenever a paper is extracted.
export const dynamic = 'force-dynamic';

export default async function QuizIndex() {
  const me = await currentProfile();
  if (!me) redirect('/login');
  const promo = me.promo || 'pcem2';

  // Which subjects have questions is a question for the database. It used to
  // be answered by the copy of the catalogue bundled with the app, so a
  // subject that copy has never heard of — a year catalogued in the panel —
  // could hold a thousand extracted questions and never appear on this screen.
  const ids = await quizzedIds();

  const subjects = await subjectsOf(promo);
  const listed = ids
    ? subjects.filter((m) => ids.has(m.id))
    // The read failed. The file is the fallback for a database that has
    // nothing to say, never for one that refused to answer — so this is the
    // subjects of this promo the app shipped with, and the screen says why.
    : quizzedModules().filter((m) => m.promo === promo);

  const modules = await Promise.all(listed.map(async (m) => ({
    id: m.id, name: m.name, icon: m.icon || 'book', tint: m.tint || 'purple',
    questions: await countOf(m.id),
    banks: m.bankCount ?? await bankCountOf(m.id),
  })));

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
        {ids === null && (
          <div className="admin-err" style={{ padding: '0 2px' }}>
            تعذّرت قراءة بنوك الأسئلة — هذه القائمة من نسخة التطبيق، وقد تنقصها
            موادّ أُضيفت من اللوحة.
          </div>
        )}

        {modules.map((m) => (
          <Link key={m.id} href={`/quiz/${m.id}`} className="card">
            <div className="card-row">
              <div className={`tile tint-${m.tint}`}><Icon name={m.icon} size={22} /></div>
              <div className="grow">
                <div className="nm">{m.name}</div>
                <div className="mt">
                  {m.questions} سؤال · {m.banks} ملف أسئلة
                </div>
              </div>
              <span className="chev"><Icon name="chev" size={18} /></span>
            </div>
          </Link>
        ))}

        {modules.length === 0 && (
          <div className="empty">
            <div className="tile tint-purple"><Icon name="quiz" size={24} /></div>
            <div className="empty-t">لا أسئلة بعد</div>
            <div className="empty-b">
              تُستخرج الأسئلة من امتحانات المادة في لوحة التحكم، وتظهر هنا حين
              تُنشر بإجاباتها.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
