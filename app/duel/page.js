import Link from 'next/link';
import { redirect } from 'next/navigation';
import Icon from '@/components/Icon';
import BackButton from '@/components/BackButton';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { outcome } from '@/lib/duel';

export const dynamic = 'force-dynamic';

const WHO = (p) => p?.full_name || p?.email?.split('@')[0] || 'زميل';

// تحدّي زميلك.
//
// Three piles, in the order they matter: the ones waiting for you, the ones
// waiting for them, and the ones that are over. A screen that sorted them
// only by date would bury the one thing on it you can act on.
export default async function Duels() {
  const me = await currentProfile();
  if (!me) redirect('/login');
  if (me.status !== 'approved') redirect('/waiting');

  const sb = await supabaseServer();
  const { data, error } = await sb
    .from('duels')
    .select(`id, title, questions, challenger, opponent,
             challenger_score, opponent_score, challenger_at, opponent_at, created_at,
             a:profiles!duels_challenger_fkey(full_name, email),
             b:profiles!duels_opponent_fkey(full_name, email)`)
    .order('created_at', { ascending: false })
    .limit(40);

  const duels = error ? [] : (data || []);
  const mineToPlay = duels.filter((d) => d.opponent === me.id && !d.opponent_at);
  const waiting = duels.filter((d) => d.challenger === me.id && !d.opponent_at);
  const over = duels.filter((d) => d.opponent_at);

  const Row = ({ d, action }) => {
    const iAmChallenger = d.challenger === me.id;
    const them = iAmChallenger ? d.b : d.a;
    const mine = iAmChallenger ? d.challenger_score : d.opponent_score;
    const theirs = iAmChallenger ? d.opponent_score : d.challenger_score;
    const how = outcome(mine, theirs);

    return (
      <Link href={`/duel/${d.id}`} className="card duel-row">
        <div className="card-row">
          <div className={`tile ${how === 'won' ? 'tint-orange' : 'tint-purple'}`}>
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
              {mine}–{theirs}
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
              {mineToPlay.length ? `${mineToPlay.length} بانتظارك` : 'نفس الأسئلة، ونتيجتان'}
            </div>
          </div>
        </div>
      </header>

      <div className="scroll">
        <Link href="/duel/new" className="card quizcard">
          <div className="quizcard-ic"><Icon name="plus" size={19} /></div>
          <div className="grow">
            <div className="nm" style={{ fontSize: 14 }}>تحدٍّ جديد</div>
            <div className="mt">اختر المادة، أجب، ثمّ أرسِله</div>
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

        {mineToPlay.length > 0 && (
          <>
            <div className="eyebrow">دورك</div>
            {mineToPlay.map((d) => <Row key={d.id} d={d} action="تحدّاك" />)}
          </>
        )}

        {waiting.length > 0 && (
          <>
            <div className="eyebrow">بانتظار ردّه</div>
            {waiting.map((d) => <Row key={d.id} d={d} action="لم يجب بعد" />)}
          </>
        )}

        {over.length > 0 && (
          <>
            <div className="eyebrow">انتهت</div>
            {over.map((d) => <Row key={d.id} d={d} />)}
          </>
        )}

        {!error && !duels.length && (
          <div className="empty">
            <div className="tile tint-purple"><Icon name="swords" size={24} /></div>
            <div className="empty-t">لا تحدّيات بعد</div>
            <div className="empty-b">
              أجب على عشرة أسئلة من محاضرة، وأرسلها إلى زميل برقمه الجامعي.
              يجيب على الأسئلة نفسها، وتريان النتيجتين.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
