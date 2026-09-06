'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

const name = (p) => p?.full_name || p?.email?.split('@')[0] || 'طالب';
const initials = (p) => (p?.full_name || p?.email || '؟').trim().slice(0, 2);

export default function ChatList({ chats, mates }) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);

  const open = async (person) => {
    if (busy) return;
    setBusy(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ person }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.ok) router.push(`/chat/${data.id}`);
  };

  const talking = new Set(chats.map((c) => c.person.id));
  const others = mates
    .filter((m) => !talking.has(m.id))
    .filter((m) => !q || name(m).toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/feed" className="icobtn" aria-label="رجوع"><Icon name="chev" size={19} /></Link>
          <div className="grow"><div className="head-t">المحادثات</div></div>
        </div>
        <label className="srch">
          <Icon name="search" size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)} type="search"
            placeholder="ابحث عن زميل" aria-label="ابحث" />
        </label>
      </header>

      <div className="scroll">
        {chats.map((c) => (
          <Link key={c.id} href={`/chat/${c.id}`} className="card">
            <div className="card-row">
              <div className="av" style={{ width: 44, height: 44, fontSize: 14, background: 'var(--purple)' }}>
                {initials(c.person)}
              </div>
              <div className="grow">
                <div className="nm">{name(c.person)}</div>
                <div className="mt">{c.last || 'لا رسائل بعد'}</div>
              </div>
              <span className="chev"><Icon name="chev" size={18} /></span>
            </div>
          </Link>
        ))}

        {others.length > 0 && (
          <>
            <div className="eyebrow">من دفعتك</div>
            {others.map((m) => (
              <button key={m.id} className="card" onClick={() => open(m.id)} disabled={busy}>
                <div className="card-row">
                  <div className="av" style={{ width: 44, height: 44, fontSize: 14, background: 'var(--ink-3)' }}>
                    {initials(m)}
                  </div>
                  <div className="grow"><div className="nm">{name(m)}</div></div>
                  <span className="pill">راسِل</span>
                </div>
              </button>
            ))}
          </>
        )}

        {!chats.length && !others.length && (
          <div className="empty">
            <div className="tile tint-purple"><Icon name="send" size={24} /></div>
            <div className="empty-t">لا أحد بعد</div>
            <div className="empty-b">حين ينضم زملاؤك ستجدهم هنا.</div>
          </div>
        )}
      </div>
    </>
  );
}
