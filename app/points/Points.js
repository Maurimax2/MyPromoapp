'use client';

// الترتيب, on screen.
//
// Two views of one number: where you stand, and where the number came from.
//
// The board used to be second, so that somebody who had just arrived saw how
// to earn a point before they saw thirty people ahead of them. It is first
// now because it is a tab in the bottom bar called الترتيب, and a tab has to
// open on the thing it is named after. The reason the board was hidden is
// answered a different way instead: your own row is pinned to the top of it,
// so you never scroll to find yourself, and how far the next place is gets
// said in words.

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Sheet from '@/components/Sheet';
import BadgeArt from '@/components/BadgeArt';
import Flame from '@/components/Flame';
import CountUp from '@/components/CountUp';
import { RULES } from '@/lib/points';
import { useT } from '@/components/Lang';

const TABS = [
  { id: 'board', label: 'الترتيب' },
  { id: 'me',    label: 'نقاطك' },
];

// A promo is small enough that everyone knows every face, so a colour read
// off the id is a person rather than a placeholder — the same six as the feed.
const FACES = ['#2A5B3E', '#A8502A', '#14555F', '#8A6A14', '#4B5B3A', '#6B4A3A'];
const faceOf = (id = '') => {
  let n = 0;
  for (let i = 0; i < id.length; i += 1) n = (n * 31 + id.charCodeAt(i)) % 997;
  return FACES[n % FACES.length];
};
const initials = (name = '') => name.trim().slice(0, 2);

export default function Points({ total, rank, rows, badges, board, meId, mine = null, week = false }) {
  const t = useT();
  const [tab, setTab] = useState('board');
  // A classmate tapped on the board: their card, and a way to challenge them.
  const [who, setWho] = useState(null);
  const open = (p, place) => () => { if (p.id !== meId) setWho({ ...p, place }); };

  return (
    <div className="scroll">
      <div className="rev-tabs">
        {TABS.map((it) => (
          <button
            key={it.id}
            className={`rev-tab${tab === it.id ? ' on' : ''}`}
            onClick={() => setTab(it.id)}
          >
            {t(it.label)}
          </button>
        ))}
      </div>

      {tab === 'me' ? (
        <>
          <div className="pts-hero">
            <div className="pts-n"><CountUp to={total} /></div>
            <div className="pts-l">{t('نقطة')}</div>
            {total > 0 && <div className="pts-rank">{t('المركز {rank} في دفعتك', { rank })}</div>}
          </div>

          {rows.length > 0 && (
            <>
              <div className="eyebrow">{t('من أين جاءت')}</div>
              <div className="card">
                {rows.map((r) => (
                  <div key={r.id} className="pts-row">
                    <span className="pts-ic"><Icon name={r.icon} size={17} /></span>
                    <span className="grow">{t(r.label)}</span>
                    <span className="pts-x">{r.n} × {r.each}</span>
                    <b className="pts-p">{r.points}</b>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="eyebrow">{t('الشارات')}</div>
          <div className="badges">
            {badges.map((b) => (
              <div key={b.id} className={`badge${b.done ? ' on' : ''}`}>
                <BadgeArt kind={b.kind} tier={b.tier} icon={b.icon} done={b.done} size={48} />
                <b>{t(b.label)}</b>
                <span className="badge-w">{t(b.want)}</span>
                {!b.done && (
                  <>
                    {/* Nothing drawn at zero: the bar has a minimum width, and
                        a sliver of purple reads as progress you have not made. */}
                    <div className="fill-bar">
                      {b.have > 0 && (
                        <div
                          className="fill-bar-in"
                          style={{ width: `${Math.min(100, (b.have / b.need) * 100)}%` }}
                        />
                      )}
                    </div>
                    <span className="badge-n">{b.have} / {b.need}</span>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="eyebrow">{t('كيف تُحسب')}</div>
          <div className="card">
            {RULES.map((r) => (
              <div key={r.id} className="pts-row">
                <span className="pts-ic"><Icon name={r.icon} size={17} /></span>
                <span className="grow">{t(r.label)}</span>
                <b className="pts-p">+{r.each}</b>
              </div>
            ))}
          </div>
          {/* Said plainly, because a counter nobody understands is a counter
              nobody trusts. */}
          <p className="pts-note">{t('القراءة لا تُحسب. النقاط لِما يستفيد منه زملاؤك.')}</p>
        </>
      ) : board.length ? (
        <>
          {/* The three at the top, as people rather than as rows one to
              three. The tallest stands in the middle, so the order here is
              second, first, third. */}
          {/* This week, or all time — a board somebody new can climb. */}
          <div className="pts-when" role="group" aria-label={t('المدة')}>
            <Link href="/points?w=1" data-on={!!week} replace>{t('هذا الأسبوع')}</Link>
            <Link href="/points" data-on={!week} replace>{t('كل الوقت')}</Link>
          </div>

          {board.length >= 3 && (
            <div className="podium">
              {[board[1], board[0], board[2]].map((p, i) => {
                const place = [2, 1, 3][i];
                return (
                  <button key={p.id} className={`pod pod${place}`} onClick={open(p, place)}>
                    {place === 1 && <span className="pod-crown"><Icon name="crown" size={30} weight="fill" /></span>}
                    <span className="pod-f" style={{ background: faceOf(p.id) }}>
                      {initials(p.name)}
                    </span>
                    <span className="pod-n">{p.name}</span>
                    <b className="pod-p"><CountUp to={p.points} delay={600 + place * 120} /></b>
                    <span className="pod-bar"><b>{place}</b></span>
                  </button>
                );
              })}
            </div>
          )}

          {/* You, pinned. The whole reason the board could be shown first. */}
          {mine && (
            <div className="you-row">
              <span className="you-at">{mine.at}</span>
              <span className="you-f" style={{ background: faceOf(meId) }}>
                {initials(mine.name)}
              </span>
              <span className="grow">
                <b>{t('أنت')}</b>
                <s>{mine.gap}</s>
                {mine.pct > 0 && mine.pct < 100 && (
                  <span className="you-bar"><i style={{ width: `${mine.pct}%` }} /></span>
                )}
              </span>
              <b className="you-p">{mine.points}</b>
            </div>
          )}

          <div className="pts-rules">
            {RULES.map((r) => (
              <span key={r.id}><b>+{r.each}</b>{t(r.label)}</span>
            ))}
          </div>

          <div className="eyebrow">{t('دفعتك')}</div>
          <div className="card pts-board">
            {board.map((p, i) => (
              <button key={p.id} className={`pts-b${p.id === meId ? ' you' : ''}`} onClick={open(p, i + 1)}>
                <span className={`pts-place p${i + 1 <= 3 ? i + 1 : ''}`}>{i + 1}</span>
                <span className="pts-face" style={{ background: faceOf(p.id) }}>
                  {initials(p.name)}
                </span>
                <span className="grow">{p.name}</span>
                {p.streak > 0 && (
                  <span className="pts-streak" title={t('أيام متتالية')}>
                    <Flame streak={p.streak} size={14} />{p.streak}
                  </span>
                )}
                <b>{p.points}</b>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="pts-when" role="group" aria-label={t('المدة')}>
            <Link href="/points?w=1" data-on={!!week} replace>{t('هذا الأسبوع')}</Link>
            <Link href="/points" data-on={!week} replace>{t('كل الوقت')}</Link>
          </div>
          <div className="empty">
            <div className="tile tint-olive"><Icon name="check" size={24} /></div>
            <div className="empty-t">{week ? t('لا نقاط هذا الأسبوع بعد') : t('لا ترتيب بعد')}</div>
            <div className="empty-b">{week ? t('الأسبوع بدأ السبت — أول من يجيب سؤال اليوم يتصدّر.') : t('أول من ينشر ملخصًا أو يُجيب زميلًا يفتح القائمة.')}</div>
          </div>
        </>
      )}
      {who && (
        <Sheet onClose={() => setWho(null)}>
          <div className="pts-who">
            <span className="pts-who-f" style={{ background: faceOf(who.id) }}>{initials(who.name)}</span>
            <b>{who.name}</b>
            <s>{t('المركز {place} · {points} نقطة', { place: who.place, points: who.points })}</s>
            <div className="pts-who-acts">
              {who.handle
                ? <Link href={`/duel/new?to=${encodeURIComponent(who.handle)}`} className="pts-who-go">
                <Icon name="swords" size={18} weight="fill" />{' '}{t('تحدَّه')}</Link>
                : <span className="pts-who-none">{t('لا رقم تسجيل له بعد')}</span>}
              <button className="pts-who-close" onClick={() => setWho(null)}>{t('إغلاق')}</button>
            </div>
          </div>
        </Sheet>
      )}
    </div>
  );
}
