import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import Icon from '@/components/Icon';
import BackButton from '@/components/BackButton';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { outcome, stage, saysTime } from '@/lib/duel';
import Play from './Play';
import Answer from './Answer';
import Watch from './Watch';

export const dynamic = 'force-dynamic';

const WHO = (p) => p?.full_name || p?.email?.split('@')[0] || 'زميل';

const SAYS = { won: 'فزت', lost: 'فاز هو', drew: 'تعادلتما' };

export default async function DuelPage({ params }) {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const { id } = await params;
  const sb = await supabaseServer();

  // Read as the student, so a duel that is not yours is simply not there —
  // the policy decides, not this file.
  const { data: duel } = await sb
    .from('duels')
    .select(`id, title, state, seconds, questions, challenger, opponent,
             challenger_score, opponent_score, challenger_at, opponent_at,
             a:profiles!duels_challenger_fkey(full_name, email),
             b:profiles!duels_opponent_fkey(full_name, email)`)
    .eq('id', id).maybeSingle();

  if (!duel) notFound();

  const at = stage(duel, me.id);
  const iAmChallenger = duel.challenger === me.id;
  const them = iAmChallenger ? duel.b : duel.a;
  const mine = iAmChallenger ? duel.challenger_score : duel.opponent_score;
  const theirs = iAmChallenger ? duel.opponent_score : duel.challenger_score;

  // Your turn: the same rows the duel stored, in the same order. Read with
  // the service key because the questions themselves are staff-guarded, and
  // the policy above has already decided this duel is yours.
  let questions = [];
  if (at === 'play') {
    const { data: rows } = await supabaseAdmin()
      .from('questions')
      .select('id, stem, options, answer, why, source')
      .in('id', duel.questions);

    const byId = new Map((rows || []).map((q) => [Number(q.id), q]));
    questions = duel.questions.map((qid) => byId.get(Number(qid))).filter(Boolean).map((q) => ({
      // No `id`, so nothing here writes to the review schedule — a duel is a
      // contest, not a revision session.
      q: q.stem,
      options: q.options || [],
      answer: q.answer || [],
      why: q.why || null,
      by: q.source === 'claude' ? 'claude' : 'paper',
    }));
  }

  const how = at === 'done' ? outcome(mine, theirs) : null;
  const said = {
    invited: `${WHO(them)} تحدّاك`,
    sent: `بانتظار ردّ ${WHO(them)}`,
    play: `أنت و${WHO(them)}`,
    waiting: `بانتظار ${WHO(them)}`,
    done: `أنت و${WHO(them)}`,
    refused: `اعتذر ${WHO(them)}`,
  }[at] || '';

  return (
    <>
      <header className="head" style={{ paddingBottom: 14 }}>
        <div className="head-row">
          <BackButton fallback="/duel" />
          <div className="grow">
            <div className="head-t" style={{ fontSize: 17 }} dir="auto">{duel.title}</div>
            <div className="head-s">{said}</div>
          </div>
        </div>
      </header>

      <div className="scroll">
        {/* While the other half can still change under you, the screen asks
            again every few seconds — otherwise the challenger sits on
            «بانتظار ردّه» long after it has been accepted. */}
        {(at === 'sent' || at === 'waiting') && <Watch />}

        {/* Somebody has challenged you. Nothing is answered until you say yes. */}
        {at === 'invited' && (
          <Answer id={duel.id} who={WHO(them)} title={duel.title}
            of={duel.questions.length} time={saysTime(duel.seconds || 0)} />
        )}

        {at === 'sent' && (
          <div className="card duel-result open">
            <div className="duel-verdict">أُرسلت الدعوة</div>
            <div className="duel-of" style={{ marginTop: 8 }}>
              {WHO(them)} لم يقبل بعد. سنخبرك حين يردّ.
            </div>
          </div>
        )}

        {at === 'refused' && (
          <div className="card duel-result open">
            <div className="duel-verdict">اعتذر عن التحدّي</div>
            <div className="duel-of" style={{ marginTop: 8 }}>لا شيء تخسره — تحدَّ زميلًا آخر.</div>
          </div>
        )}

        {at === 'play' && questions.length > 0 && (
          <Play id={duel.id} questions={questions} title={duel.title} seconds={duel.seconds || 0} />
        )}

        {at === 'play' && !questions.length && (
          <div className="notice">
            <Icon name="alert" size={19} />
            <div>
              <div className="notice-t">تعذّر فتح أسئلة هذا التحدّي</div>
              <div className="notice-b">ربما حُذفت من المادة. لا شيء تخسره.</div>
            </div>
          </div>
        )}

        {at === 'waiting' && (
          <div className="card duel-result open">
            <div className="duel-verdict">بانتظار {WHO(them)}</div>
            <div className="duel-pair" dir="ltr">
              <span className="me">{mine}</span>
              <span className="duel-dash">–</span>
              <span className="them">؟</span>
            </div>
            <div className="duel-of">
              أجبت {mine} من {duel.questions.length}. سنخبرك حين يجيب.
            </div>
          </div>
        )}

        {/* Both halves in. The two numbers land one after the other. */}
        {at === 'done' && (
          <div className={`card duel-result ${how} duel-reveal`}>
            <div className="duel-verdict">{SAYS[how]}</div>
            <div className="duel-pair" dir="ltr">
              <span className={how === 'won' ? 'me win' : 'me'}>{mine}</span>
              <span className="duel-dash">–</span>
              <span className={how === 'lost' ? 'them win' : 'them'}>{theirs}</span>
            </div>
            <div className="duel-of">من {duel.questions.length} أسئلة</div>
          </div>
        )}

        {at !== 'play' && at !== 'invited' && (
          <Link href="/duel/new" className="btn g">تحدٍّ آخر</Link>
        )}
      </div>
    </>
  );
}
