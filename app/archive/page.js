'use client';
import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { PROMOS, MODULES, fileCount, allDocs } from '@/lib/data';

// S1 and S2 are shown exactly as written — that is what students call them.
const SEMESTERS = ['S1', 'S2'];

const strip = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export default function Archive() {
  const [promo, setPromo] = useState('pcem2');
  const [sem, setSem] = useState('S1');
  const [q, setQ] = useState('');

  const chosen = PROMOS.find((p) => p.id === promo);
  const modules = MODULES.filter((m) => m.promo === promo && m.semester === sem)
    .filter((m) => !q || strip(m.name).includes(strip(q))
      || (m.lectures || []).some((l) => strip(l.title).includes(strip(q))));

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
          {PROMOS.map((p) => (
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
        {!chosen.indexed && (
          <div className="empty">
            <div className="tile tint-purple"><Icon name="archive" size={24} /></div>
            <div className="empty-t">{chosen.name} — لم تُفهرس بعد</div>
            <div className="empty-b">
              محتوى هذه الدفعة لم يُضف إلى التطبيق بعد. PCEM2 هي الدفعة الوحيدة الجاهزة حاليًا.
            </div>
          </div>
        )}

        {chosen.indexed && modules.map((m) => {
          const n = fileCount(m);
          const total = allDocs(m).length;
          const meta = m.empty ? 'المجلد فارغ في Drive'
            : m.pending ? 'لم يُفهرس بعد'
            : [`${n} محاضرة`, `${total} ملف`, m.professors.join(' · ')].filter(Boolean).join(' · ');

          const inner = (
            <div className="card-row">
              <div className={`tile tint-${m.tint}`}><Icon name={m.icon} size={22} /></div>
              <div className="grow">
                <div className="nm">{m.name}</div>
                <div className="mt">{meta}</div>
              </div>
              {n > 0
                ? <><span className="cnt">{n}</span><span className="chev"><Icon name="chev" size={18} /></span></>
                : <span className="pill grey">{m.empty ? 'فارغ' : 'قيد الفهرسة'}</span>}
            </div>
          );

          return n > 0
            ? <Link key={m.id} href={`/archive/${m.id}`} className="card">{inner}</Link>
            : <div key={m.id} className="card" style={{ opacity: .72 }}>{inner}</div>;
        })}

        {chosen.indexed && modules.length === 0 && (
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
