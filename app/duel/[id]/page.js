import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import Icon from '@/components/Icon';
import BackButton from '@/components/BackButton';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { outcome, stage, saysTime } from '@/lib/duel';
import { artOf } from '@/lib/subjectArt';
import Play from './Play';
import Answer from './Answer';
import Watch from './Watch';
import Share from './Share';

export const dynamic = 'force-dynamic';

const WHO = (p) => p?.full_name || p?.email?.split('@')[0] || 'زميل';

const SAYS = { won: 'فزت!', lost: 'خسرت هذه المرة', drew: 'تعادلتما' };

// The same colour a face has everywhere else in the app.
const FACES = ['#2A5B3E', '#A8502A', '#14555F', '#8A6A14', '#4B5B3A', '#6B4A3A'];
const faceOf = (id = '') => {
  let n = 0;
  for (let i = 0; i < id.length; i += 1) n = (n * 31 + id.charCodeAt(i)) % 997;
  return FACES[n % FACES.length];
};

// Two faces and a bolt between them: every stage of a duel opens on this.
function Versus({ me, them, meNote = null, themNote = null, dim = false }) {
  return (
    <div className="ar-vs">
      <span className="ar-p">
        <span className="ar-f" style={{ background: me.face }}>{me.ini}</span>
        <b>أنت</b>
        {meNote}
      </span>
      <span className="ar-mid">
        <Icon name="bolt" size={34} weight="fill" />
        <b>VS</b>
      </span>
      <span className={`ar-p${dim ? ' dim' : ''}`}>
        <span className="ar-f them" style={{ background: them.face }}>{them.ini}</span>
        <b dir="auto">{them.first}</b>
        {themNote}
      </span>
    </div>
  );
}

export default async function DuelPage({ params }) {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const { id } = await params;
  const sb = await supabaseServer();

  // Read as the student, so a duel that is not yours is simply not there —
  // the policy decides, not this file.
  const { data: duel } = await sb
    .from('duels')
    .select(`id, module, title, state, seconds, questions, challenger, opponent,
             challenger_score, opponent_score, challenger_at, opponent_at,
             a:profiles!duels_challenger_fkey(id, full_name, email, matricule),
             b:profiles!duels_opponent_fkey(id, full_name, email, matricule)`)
    .eq('id', id).maybeSingle();

  if (!duel) notFound();

  const at = stage(duel, me.id);
  const iAmChallenger = duel.challenger === me.id;
  const them = iAmChallenger ? duel.b : duel.a;
  const themId = iAmChallenger ? duel.opponent : duel.challenger;
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

  const myName = me.full_name || me.email.split('@')[0];
  const theirName = WHO(them);
  const P = {
    me: { face: faceOf(me.id), ini: myName.slice(0, 2) },
    them: { face: faceOf(themId), ini: theirName.slice(0, 2), first: theirName.split(' ')[0], name: theirName },
  };
  const of = duel.questions.length;
  const time = saysTime(duel.seconds || 0);
  const art = artOf(duel.title);
  const how = at === 'done' ? outcome(mine, theirs) : null;

  // «ردّ التحدّي»: the same person, the same subject, one tap.
  const again = them?.matricule
    ? `/duel/new?to=${encodeURIComponent(them.matricule)}&subject=${encodeURIComponent(duel.module || '')}`
    : '/duel/new';

  const Card = () => (
    <div className="ar-card">
      <span className="ar-card-t">
        <span className="ar-art" style={{ background: art.bg }}><img src={art.img} alt="" /></span>
        <b dir="auto">{duel.title}</b>
      </span>
      <span className="ar-chips">
        <span><Icon name="quiz" size={15} /> {of} أسئلة</span>
        <span><Icon name="clock" size={15} /> {time}</span>
      </span>
      <span className="ar-note">نفس الأسئلة لكليكما · لا يرى أحدكما نتيجة الآخر قبل النهاية</span>
    </div>
  );

  return (
    <div className={`arena ar-${at}${how ? ` ar-${how}` : ''}`}>
      <div className="ar-top">
        <BackButton fallback="/duel" className="ar-x" />
        <b className="grow">تحدٍّ</b>
        <span className="ar-x-pad" />
      </div>

      {/* While the other half can still change under you, the screen asks
          again every few seconds — otherwise the challenger sits on
          «بانتظار ردّه» long after it has been accepted. */}
      {(at === 'sent' || at === 'waiting') && <Watch />}

      {/* Somebody has challenged you. Nothing is answered until you say yes. */}
      {at === 'invited' && (
        <div className="ar-body">
          <Versus {...P} themNote={<span className="ar-pill hot"><Icon name="swords" size={12} /> تحدّاك</span>} />
          <Card />
          <span className="grow" />
          <Answer id={duel.id} />
        </div>
      )}

      {at === 'sent' && (
        <div className="ar-body">
          <Versus {...P} themNote={<span className="ar-pill wait"><Icon name="clock" size={12} /> لم يردّ بعد</span>} />
          <div className="duel-verdict ar-say">أُرسلت الدعوة</div>
          <span className="ar-sub">سنخبرك حين يقبل {P.them.first}.</span>
          <Card />
          <span className="grow" />
          <Link href="/duel/new" className="ar-ghost">تحدٍّ آخر</Link>
        </div>
      )}

      {at === 'refused' && (
        <div className="ar-body">
          <Versus {...P} dim themNote={<span className="ar-pill">اعتذر</span>} />
          <div className="duel-verdict ar-say">اعتذر عن التحدّي</div>
          <span className="ar-sub">لا شيء تخسره — تحدَّ زميلًا آخر.</span>
          <span className="grow" />
          <Link href="/duel/new" className="ar-go"><Icon name="swords" size={20} /> تحدٍّ آخر</Link>
        </div>
      )}

      {at === 'play' && questions.length > 0 && (
        <Play id={duel.id} questions={questions} title={duel.title} seconds={duel.seconds || 0}
          me={P.me} them={P.them} />
      )}

      {at === 'play' && !questions.length && (
        <div className="ar-body">
          <div className="notice">
            <Icon name="alert" size={19} />
            <div>
              <div className="notice-t">تعذّر فتح أسئلة هذا التحدّي</div>
              <div className="notice-b">ربما حُذفت من المادة. لا شيء تخسره.</div>
            </div>
          </div>
        </div>
      )}

      {at === 'waiting' && (
        <div className="ar-body">
          <Versus {...P}
            meNote={<span className="ar-pill done"><Icon name="check" size={12} /> أنهيت</span>}
            themNote={<span className="ar-pill wait"><Icon name="clock" size={12} /> يجيب…</span>} />
          <div className="duel-verdict ar-say">بانتظار {P.them.first}</div>
          {/* Right to left like the faces above it: yours sits on your side. */}
          <div className="duel-pair ar-pair" dir="rtl">
            <span className="me">{mine}</span>
            <span className="duel-dash">–</span>
            <span className="them ar-q">؟</span>
          </div>
          <span className="ar-sub">أصبت {mine} من {of}. تظهر النتيجتان معًا حين ينتهي.</span>
          <span className="grow" />
          <Link href="/duel/new" className="ar-ghost">تحدٍّ آخر</Link>
        </div>
      )}

      {/* Both halves in. The two numbers land one after the other. */}
      {at === 'done' && (
        <div className="ar-body ar-end">
          {how === 'won' && (
            <div className="qz-confetti" aria-hidden="true">
              {Array.from({ length: 18 }, (_, n) => (
                <i key={n} style={{
                  left: `${(n * 37) % 100}%`,
                  background: ['#9FD0B0', '#E08A5E', '#D9B44A', '#F3F1E9', '#3F7A57'][n % 5],
                  animationDelay: `${(n % 6) * 0.35}s`, animationDuration: `${2.6 + (n % 5) * 0.3}s`,
                  borderRadius: n % 3 === 0 ? '50%' : 2, width: 7 + (n % 3) * 2, height: n % 3 === 0 ? 8 : 12,
                }} />
              ))}
            </div>
          )}
          <span className={`ar-trophy ${how}`}><Icon name="award" size={96} weight="fill" /></span>
          <div className="duel-verdict ar-say">{SAYS[how]}</div>
          <span className="ar-sub" dir="auto">{duel.title}</span>
          <div className="ar-final duel-reveal">
            <span className="ar-p">
              <span className={`ar-f${how === 'won' ? ' win' : ''}`} style={{ background: P.me.face }}>{P.me.ini}</span>
              <s>أنت</s>
            </span>
            <div className="duel-pair" dir="rtl">
              <span className={how === 'won' ? 'me win' : 'me'}>{mine}</span>
              <span className="duel-dash">–</span>
              <span className={how === 'lost' ? 'them win' : 'them'}>{theirs}</span>
            </div>
            <span className="ar-p">
              <span className={`ar-f${how === 'lost' ? ' win' : ''}`} style={{ background: P.them.face }}>{P.them.ini}</span>
              <s dir="auto">{P.them.first}</s>
            </span>
          </div>
          <span className="ar-sub">من {of} أسئلة</span>
          <span className="grow" />
          <Link href={again} className="ar-go">
            <Icon name="swords" size={20} /> {how === 'lost' ? 'خذ ثأرك' : 'ردّ التحدّي'}
          </Link>
          <div className="ar-two">
            <Share text={`${SAYS[how].replace('!', '')} — ${mine}–${theirs} مع ${P.them.first} في ${duel.title} على MyPromo`} />
            <Link href="/duel/new" className="ar-ghost">تحدٍّ آخر</Link>
          </div>
        </div>
      )}
    </div>
  );
}
