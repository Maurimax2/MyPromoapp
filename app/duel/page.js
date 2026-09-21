import Link from 'next/link';
import { redirect } from 'next/navigation';
import Icon from '@/components/Icon';
import BackButton from '@/components/BackButton';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { outcome, stage } from '@/lib/duel';

export const dynamic = 'force-dynamic';

const WHO = (p) => p?.full_name || p?.email?.split('@')[0] || 'زميل';

// تحدّي زميلك.
//
// Four piles, in the order they matter: what is waiting for your answer, what
// is waiting for theirs, and what is over. A screen sorted only by date would
// bury the one thing on it you can act on.
export default async function Duels() {
  const me = await currentProfile();
  if (!me) redirect('/login');
  if (me.status !== 'approved') redirect('/waiting');

  const sb = await supabaseServer();
  const { data, error } = await sb
    .from('duels')
    .select(`id, title, state, questions, challenger, opponent,
             challenger_score, opponent_score, challenger_at, opponent_at, created_at,
             a:profiles!duels_challenger_fkey(full_name, email),
             b:profiles!duels_opponent_fkey(full_name, email)`)
    .order('created_at', { ascending: false })
    .limit(40);

  const duels = (error ? [] : (data || [])).map((d) => ({ ...d, at: stage(d, me.id) }));
  const invited = duels.filter((d) => d.at === 'invited');
  const toPlay = duels.filter((d) => d.at === 'play');
  const theirs = duels.filter((d) => d.at === 'sent' || d.at === 'waiting');
  const over = duels.filter((d) => d.at === 'done' || d.at === 'refused');

  const Row = ({ d, action }) => {
    const iAmChallenger = d.challenger === me.id;
    const them = iAmChallenger ? d.b : d.a;
    const mine = iAmChallenger ? d.challenger_score : d.opponent_score;
    const hers = iAmChallenger ? d.opponent_score : d.challenger_score;
    // Only a finished duel shows two numbers. Half a result is a leak: it
    // tells the one who answered first what the other has to beat.
    const how = d.at === 'done' ? outcome(mine, hers) : null;

    return (
      <Link href={`/duel/${d.id}`} className="card duel-row">
        <div className="card-row">
          {/* Clay for the two that are waiting on you — an invitation to
              answer, and a duel it is your turn in. Everything else here is
              news you can read later. */}
          <div className={`tile ${d.at === 'invited' || d.at === 'play' ? 'tint-clay'
            : 'tint-olive'}`}>
            <Icon name="swords" size={19} />
          </div>
          <div className="grow">
            <div className="nm" dir="auto">{d.title}</div>
            <div className="mt">
              {WHO(them)}
              {action ? ` · ${action}` : ''}
            </div>
          </div>
          {how && (
            <div className={`duel-score ${how}`} dir="ltr">
              {mine}–{hers}
            </div>
          )}
          {!how && <span className="chev"><Icon name="chev" size={18} /></span>}
        </div>
      </Link>
    );
  };

  return (
    <>
      <header className="head" style={{ paddingBottom: 14 }}>
        <div className="head-row">
          <BackButton fallback="/feed" />
          <div className="grow">
            <div className="head-t">تحدّي زميلك</div>
            <div className="head-s">
              {invited.length + toPlay.length
                ? `${invited.length + toPlay.length} بانتظارك`
                : 'نفس الأسئلة، ونتيجتان'}
            </div>
          </div>
        </div>
      </header>

      <div className="scroll">
        <Link href="/duel/new" className="card quizcard">
          <div className="quizcard-ic"><Icon name="plus" size={19} /></div>
          <div className="grow">
            <div className="nm" style={{ fontSize: 14 }}>تحدٍّ جديد</div>
            <div className="mt">اختر المادة والزميل، وأرسِل الدعوة</div>
          </div>
          <span className="chev"><Icon name="chev" size={18} /></span>
        </Link>

        {error && (
          <div className="notice">
            <Icon name="alert" size={19} />
            <div>
              <div className="notice-t">التحدّيات غير متاحة بعد</div>
              <div className="notice-b">راجع أحد المشرفين — قاعدة البيانات تحتاج تحديثًا.</div>
            </div>
          </div>
        )}

        {invited.length > 0 && (
          <>
            <div className="eyebrow">دعوة بانتظار ردّك</div>
            {invited.map((d) => <Row key={d.id} d={d} action="تحدّاك" />)}
          </>
        )}

        {toPlay.length > 0 && (
          <>
            <div className="eyebrow">دورك</div>
            {toPlay.map((d) => <Row key={d.id} d={d} action="أجب الآن" />)}
          </>
        )}

        {theirs.length > 0 && (
          <>
            <div className="eyebrow">بانتظاره</div>
            {theirs.map((d) => (
              <Row key={d.id} d={d} action={d.at === 'sent' ? 'لم يقبل بعد' : 'لم يجب بعد'} />
            ))}
          </>
        )}

        {over.length > 0 && (
          <>
            <div className="eyebrow">انتهت</div>
            {over.map((d) => (
              <Row key={d.id} d={d} action={d.at === 'refused' ? 'اعتذر' : null} />
            ))}
          </>
        )}

        {!error && !duels.length && (
          <div className="empty">
            <div className="tile tint-olive"><Icon name="swords" size={24} /></div>
            <div className="empty-t">لا تحدّيات بعد</div>
            <div className="empty-b">
              اختر مادة وزميلًا، وأرسل له دعوة. حين يقبل، تجيبان على الأسئلة
              نفسها — وتظهر النتيجتان معًا.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
