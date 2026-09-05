'use client';
import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { PROMOS, notesBySubject } from '@/lib/data';

// الملخصات — student notes, filed under the subject they cover, for every
// promo. Each note shows who wrote it.
export default function Notes() {
  const [promo, setPromo] = useState('pcem2');
  const [q, setQ] = useState('');

  const chosen = PROMOS.find((p) => p.id === promo);
  const groups = notesBySubject(promo)
    .map((g) => ({
      ...g,
      items: g.items.filter(
        (n) => !q || n.title.includes(q) || (n.author || '').includes(q) || g.subject.includes(q.toUpperCase()),
      ),
    }))
    .filter((g) => g.items.length);

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <header className="head">
        <div className="head-row">
          <div className="grow">
            <div className="head-t">الملخصات</div>
            <div className="head-s">{chosen.name} · {total} ملخص</div>
          </div>
          <button className="icobtn" aria-label="ملخصاتي"><Icon name="bookmark" size={19} /></button>
        </div>

        <label className="srch">
          <Icon name="search" size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث بالمادة أو باسم الطالب" type="search" aria-label="ابحث في الملخصات" />
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
      </header>

      <div className="scroll">
        {groups.map((g) => (
          <section key={g.subject} className="note-group">
            <div className="note-subject">
              <span>{g.subject}</span>
              <span className="note-subject-n">{g.items.length}</span>
            </div>
            {g.items.map((n) => {
              const body = (
                <>
                  <div className="note-top">
                    {n.author ? (
                      <div className="av" style={{ width: 38, height: 38, fontSize: 12.5, background: n.colour }}>
                        {n.initials}
                      </div>
                    ) : (
                      <div className="note-ic"><Icon name="file" size={17} /></div>
                    )}
                    <div className="grow">
                      <div className="note-title">{n.title}</div>
                      <div className="note-by">
                        {n.author ? `${n.author} · ${n.when}` : n.source}
                      </div>
                    </div>
                  </div>
                  <div className="note-foot">
                    <span className="pill grey">
                      {n.kind === 'pdf' ? 'PDF' : 'نص'}
                      {n.pages ? ` · ${n.pages} صفحات` : ''}
                      {n.mb ? ` · ${n.mb} MB` : ''}
                    </span>
                    {n.saves != null
                      ? <span className="note-saves"><Icon name="bookmark" size={15} />{n.saves}</span>
                      : <span className="note-saves"><Icon name="chev" size={15} /></span>}
                  </div>
                </>
              );
              return n.fid
                ? <Link key={n.id} href={`/file/${n.fid}`} className="card note">{body}</Link>
                : <article key={n.id} className="card note">{body}</article>;
            })}
          </section>
        ))}

        {groups.length === 0 && (
          <div className="empty">
            <div className="tile tint-purple"><Icon name="book" size={24} /></div>
            <div className="empty-t">
              {q ? 'لا نتائج' : `لا ملخصات في ${chosen.name} بعد`}
            </div>
            <div className="empty-b">
              {q ? `لا ملخص يطابق «${q}».` : 'كن أول من يشارك ملخصًا مع دفعتك.'}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
