import Link from 'next/link';
import { redirect } from 'next/navigation';
import Icon from '@/components/Icon';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { promoById } from '@/lib/data';
import { zero, scoreOf, badgesOf } from '@/lib/points';
import { standings } from '@/lib/standings';
import { daysOf } from '@/lib/days';
import { dayOf } from '@/lib/habit';
import Sign from './Sign';
import Find from './Find';
import MeLive from './MeLive';
import Badges from './Badges';

export const dynamic = 'force-dynamic';

const ROLE = {
  owner: 'مالك', admin: 'مشرف', editor: 'محرّر',
  marketing: 'تسويق', student: 'طالب',
};

// A level is fifty points. Derived, never stored, so it can never disagree
// with الترتيب — it is the same number, read another way.
const STEP = 50;

// A promo is small enough that everyone knows every face; the same colour the
// feed and the board give you.
const FACES = ['#2A5B3E', '#A8502A', '#14555F', '#8A6A14', '#4B5B3A', '#6B4A3A'];
const faceOf = (id = '') => {
  let n = 0;
  for (let i = 0; i < id.length; i += 1) n = (n * 31 + id.charCodeAt(i)) % 997;
  return FACES[n % FACES.length];
};

// أنا — you: your level, your standing, your days, your badges, your things.
export default async function Profile() {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const sb = await supabaseServer();
  const promoId = me.promo || 'pcem2';

  // Real numbers, or none at all — an invented "12 saved" is worse than a 0.
  const since = dayOf(Date.now() - 40 * 86400000);
  const [saves, rooms, chats, duels, { board, tally }, mydays] = await Promise.all([
    sb.from('saves').select('*', { count: 'exact', head: true }).eq('person', me.id),
    sb.from('room_members').select('*', { count: 'exact', head: true }).eq('person', me.id),
    sb.from('chats').select('*', { count: 'exact', head: true })
      .or(`a.eq.${me.id},b.eq.${me.id}`),
    sb.from('duels')
      .select('challenger, opponent, challenger_score, opponent_score, challenger_at, opponent_at')
      .or(`challenger.eq.${me.id},opponent.eq.${me.id}`)
      .limit(200),
    standings(promoId, me),
    // The days behind the five-week grid, from the server (habits.sql).
    daysOf([me.id], since),
  ]);

  const mine = tally[me.id] || zero();
  const score = scoreOf(mine);
  const rank = score ? board.findIndex((p) => p.id === me.id) + 1 : null;
  const level = Math.floor(score / STEP) + 1;
  const toNext = STEP - (score % STEP);

  // A duel is won once both have answered and yours is the higher score.
  const wins = (duels.data || []).filter((d) => {
    if (!d.challenger_at || !d.opponent_at) return false;
    const mineS = d.challenger === me.id ? d.challenger_score : d.opponent_score;
    const theirs = d.challenger === me.id ? d.opponent_score : d.challenger_score;
    return (mineS ?? 0) > (theirs ?? 0);
  }).length;

  const promo = promoById(me.promo) || null;
  const name = me.full_name || me.email.split('@')[0];

  return (
    <>
      <header className="st-top r1">
        <div className="st-title">
          <span className="grow"><b>أنا</b></span>
        </div>
      </header>

      <div className="scroll st-flow">
        {/* ================= you ================= */}
        <div className="me-hero r2">
          <span className="me-ring">
            <svg width="112" height="112" viewBox="0 0 112 112" aria-hidden="true">
              <circle cx="56" cy="56" r="48" fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="6" />
              <circle className="me-ring-go" cx="56" cy="56" r="48" fill="none" stroke="#D9E8B8" strokeWidth="6"
                strokeLinecap="round" strokeDasharray="301.6"
                strokeDashoffset={String(301.6 * (1 - ((score % STEP) / STEP)))} />
            </svg>
            <span className="me-ring-f" style={{ background: faceOf(me.id) }}>{name.slice(0, 2)}</span>
            <span className="me-ring-lv">المستوى {level}</span>
          </span>
          <b className="me-hero-n">{name}</b>
          <span className="me-hero-s" dir="ltr">
            {[me.username && `@${me.username}`, promo?.name, me.matricule].filter(Boolean).join(' · ') || (ROLE[me.role] || me.role)}
          </span>
          <span className="me-hero-t">
            {score ? `${toNext} نقطة للمستوى ${level + 1}` : 'انشر ملخّصًا أو أجب زميلًا لتبدأ'}
          </span>
        </div>

        {me.status !== 'approved' && (
          <div className="notice" style={{ width: '100%' }}>
            <Icon name="alert" size={19} />
            <div>
              <div className="notice-t">حسابك بانتظار الموافقة</div>
              <div className="notice-b">سيفتح لك التطبيق كاملًا فور موافقة أحد المشرفين.</div>
            </div>
          </div>
        )}

        {/* ================= the numbers, and your days ================= */}
        <MeLive points={score} rank={rank} wins={wins}
          days={Object.fromEntries(mydays.get(me.id) || [])} />

        {/* ================= badges ================= */}
        <Badges badges={badgesOf(mine)} />

        {/* ================= a classmate, by number ================= */}
        <Find />

        {/* ================= your things ================= */}
        <div className="me-list">
          <Link href="/saved">
            <span className="me-list-ic"><Icon name="bookmark" size={19} /></span>
            <span className="grow">المحفوظات</span>
            <s>{saves.count || 0}</s>
            <Icon name="chev" size={15} />
          </Link>
          {/* المحادثات gave up its place in the bottom bar, and a
              conversation starts from a person, so it lives beside you. */}
          <Link href="/chat">
            <span className="me-list-ic"><Icon name="msgs" size={19} /></span>
            <span className="grow">المحادثات</span>
            <s>{chats.count ? `${chats.count}` : 'لا شيء بعد'}</s>
            <Icon name="chev" size={15} />
          </Link>
          <Link href="/rooms">
            <span className="me-list-ic"><Icon name="video" size={19} /></span>
            <span className="grow">غرف الدراسة</span>
            <s>{rooms.count ? `${rooms.count}` : '—'}</s>
            <Icon name="chev" size={15} />
          </Link>
          <Link href="/points">
            <span className="me-list-ic"><Icon name="award" size={19} /></span>
            <span className="grow">نقاطك بالتفصيل</span>
            <s>{score}</s>
            <Icon name="chev" size={15} />
          </Link>
        </div>

        <Sign />
      </div>
    </>
  );
}
