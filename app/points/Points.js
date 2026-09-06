'use client';

// النقاط, on screen.
//
// Two views of one number: what you earned, and where that puts you. The
// board is second on purpose — a student who has just arrived should see how
// to earn something before they see thirty people ahead of them.

import { useState } from 'react';
import Icon from '@/components/Icon';
import { RULES } from '@/lib/points';

const TABS = [
  { id: 'me',    label: 'نقاطك' },
  { id: 'board', label: 'الترتيب' },
];

export default function Points({ total, rank, rows, badges, board, meId }) {
  const [tab, setTab] = useState('me');

  return (
    <div className="scroll">
      <div className="rev-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`rev-tab${tab === t.id ? ' on' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'me' ? (
        <>
          <div className="pts-hero">
            <div className="pts-n">{total}</div>
            <div className="pts-l">نقطة</div>
            {total > 0 && <div className="pts-rank">المركز {rank} في دفعتك</div>}
          </div>

          {rows.length > 0 && (
            <>
              <div className="eyebrow">من أين جاءت</div>
              <div className="card">
                {rows.map((r) => (
                  <div key={r.id} className="pts-row">
                    <span className="pts-ic"><Icon name={r.icon} size={17} /></span>
                    <span className="grow">{r.label}</span>
                    <span className="pts-x">{r.n} × {r.each}</span>
                    <b className="pts-p">{r.points}</b>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="eyebrow">الشارات</div>
          <div className="badges">
            {badges.map((b) => (
              <div key={b.id} className={`badge${b.done ? ' on' : ''}`}>
                <span className="badge-ic"><Icon name={b.icon} size={19} /></span>
                <b>{b.label}</b>
                <span className="badge-w">{b.want}</span>
                {!b.done && (
                  <>
                    <div className="fill-bar">
                      <div
                        className="fill-bar-in"
                        style={{ width: `${Math.min(100, (b.have / b.need) * 100)}%` }}
                      />
                    </div>
                    <span className="badge-n">{b.have} / {b.need}</span>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="eyebrow">كيف تُحسب</div>
          <div className="card">
            {RULES.map((r) => (
              <div key={r.id} className="pts-row">
                <span className="pts-ic"><Icon name={r.icon} size={17} /></span>
                <span className="grow">{r.label}</span>
                <b className="pts-p">+{r.each}</b>
              </div>
            ))}
          </div>
          {/* Said plainly, because a counter nobody understands is a counter
              nobody trusts. */}
          <p className="pts-note">
            القراءة لا تُحسب. النقاط لِما يستفيد منه زملاؤك.
          </p>
        </>
      ) : board.length ? (
        <div className="card pts-board">
          {board.map((p, i) => (
            <div key={p.id} className={`pts-b${p.id === meId ? ' you' : ''}`}>
              <span className={`pts-place p${i + 1 <= 3 ? i + 1 : ''}`}>{i + 1}</span>
              <span className="grow">{p.name}</span>
              <b>{p.points}</b>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <div className="tile tint-purple"><Icon name="check" size={24} /></div>
          <div className="empty-t">لا ترتيب بعد</div>
          <div className="empty-b">أول من ينشر ملخصًا أو يُجيب زميلًا يفتح القائمة.</div>
        </div>
      )}
    </div>
  );
}
