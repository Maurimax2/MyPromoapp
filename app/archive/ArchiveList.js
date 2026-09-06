'use client';
import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';


// S1 and S2 are shown exactly as written — that is what students call them.
const SEMESTERS = ['S1', 'S2'];

const strip = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// The subjects and the years come from the database now — the panel is where
// they are created, and a subject somebody adds for DCEM1 has to appear here
// without anybody editing a file.
export default function ArchiveList({ promos, modules: all, counts, mine }) {
  const [promo, setPromo] = useState(
    promos.some((p) => p.id === mine) ? mine : promos[0]?.id);
  const [sem, setSem] = useState('S1');
  const [q, setQ] = useState('');

  const chosen = promos.find((p) => p.id === promo) || promos[0];
  const inPromo = all.filter((m) => m.promo === promo);
  const modules = inPromo
    .filter((m) => m.semester === sem)
    .filter((m) => !q || strip(m.name).includes(strip(q)));

  return (
    <>
      <header className="head">
        <div className="head-row">
          <div className="grow">
            <div className="head-t">الأرشيف</div>
            <div className="head-s">UNEM · {chosen.name}</div>
          </div>
          <button className="icobtn" aria-label="المحفوظات"><Icon name="bookmark" size={19} /></button>
        </div>

        <label className="srch">
          <Icon name="search" size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث في الأرشيف" type="search" aria-label="ابحث في الأرشيف" />
        </label>

        <div className="chips">
          {promos.map((p) => (
            <button key={p.id} onClick={() => setPromo(p.id)}
              className={`pill${promo === p.id ? ' solid' : ' grey'}`}
              style={promo === p.id ? { background: p.badge } : undefined}>
              {p.name}
            </button>
          ))}
        </div>

        <div className="seg">
          {SEMESTERS.map((s) => (
            <button key={s} data-on={sem === s} onClick={() => setSem(s)}>{s}</button>
          ))}
        </div>
      </header>

      <div className="scroll">
        {/* A year is ready when it has subjects, not when somebody remembers
            to tick a box: whatever the panel creates shows up here. */}
        {inPromo.length === 0 && (
          <div className="empty">
            <div className="tile tint-purple"><Icon name="archive" size={24} /></div>
            <div className="empty-t">{chosen?.name} — لم تُفهرس بعد</div>
            <div className="empty-b">
              لا مواد في هذه الدفعة بعد. تُضاف من لوحة التحكم.
            </div>
          </div>
        )}

        {modules.map((m) => {
          const n = counts[m.id]?.lectures || 0;
          const total = counts[m.id]?.files || 0;
          const meta = [n ? `${n} محاضرة` : null, total ? `${total} ملف` : null]
            .filter(Boolean).join(' · ') || 'لا ملفات بعد';

          const inner = (
            <div className="card-row">
              <div className={`tile tint-${m.tint}`}><Icon name={m.icon} size={22} /></div>
              <div className="grow">
                <div className="nm">{m.name}</div>
                <div className="mt">{meta}</div>
              </div>
              {total > 0
                ? <><span className="cnt">{n || total}</span><span className="chev"><Icon name="chev" size={18} /></span></>
                : <span className="pill grey">لا ملفات</span>}
            </div>
          );

          return total > 0
            ? <Link key={m.id} href={`/archive/${m.id}`} className="card">{inner}</Link>
            : <div key={m.id} className="card" style={{ opacity: .72 }}>{inner}</div>;
        })}

        {inPromo.length > 0 && modules.length === 0 && (
          <div className="empty">
            <div className="tile tint-purple"><Icon name="search" size={24} /></div>
            <div className="empty-t">لا نتائج</div>
            <div className="empty-b">لا توجد مادة تطابق «{q}» في {sem}.</div>
          </div>
        )}
      </div>
    </>
  );
}
