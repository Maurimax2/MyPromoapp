'use client';

// One conversation. Same delta poll as a study room: a few bytes when
// nothing is happening, and nothing to get stuck half-connected.

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';

const EVERY = 4000;
const name = (p) => p?.full_name || p?.email?.split('@')[0] || 'طالب';
const initials = (p) => (p?.full_name || p?.email || '؟').trim().slice(0, 2);

export default function Talk({ chat, person, first, me }) {
  const [messages, setMessages] = useState(first);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const foot = useRef(null);
  const last = useRef(first.at(-1)?.id ?? 0);

  useEffect(() => { foot.current?.scrollIntoView({ block: 'end' }); }, [messages.length]);

  useEffect(() => {
    let alive = true;
    const tick = async () => {
      const res = await fetch(`/api/chat?chat=${chat}&after=${last.current}`);
      if (!alive || !res.ok) return;
      const { messages: fresh } = await res.json();
      if (fresh?.length) {
        last.current = fresh.at(-1).id;
        setMessages((m) => [...m, ...fresh]);
      }
    };
    const timer = setInterval(tick, EVERY);
    return () => { alive = false; clearInterval(timer); };
  }, [chat]);

  const say = async () => {
    const text = draft.trim();
    if (!text || busy) return;
    setBusy(true);
    const res = await fetch('/api/chat', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat, body: text }),
    });
    setBusy(false);
    if (!res.ok) return;
    const made = await res.json();
    last.current = made.id;
    setMessages((m) => [...m, made]);
    setDraft('');
  };

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/chat" className="icobtn" aria-label="رجوع"><Icon name="chev" size={19} /></Link>
          <div className="av" style={{ width: 38, height: 38, fontSize: 13, background: 'var(--purple)' }}>
            {initials(person)}
          </div>
          <div className="grow"><div className="head-t" style={{ fontSize: 17 }}>{name(person)}</div></div>
        </div>
      </header>

      <div className="scroll room-log">
        {messages.map((m) => (
          <div key={m.id} className={`say${m.author === me ? ' mine' : ''}`}>
            <div>{m.body}</div>
          </div>
        ))}
        {!messages.length && (
          <div className="empty">
            <div className="tile tint-purple"><Icon name="send" size={24} /></div>
            <div className="empty-t">لا رسائل بعد</div>
            <div className="empty-b">ابدأ الكلام.</div>
          </div>
        )}
        <div ref={foot} />
      </div>

      <div className="say-new">
        <input value={draft} onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && say()}
          placeholder="اكتب…" aria-label="رسالة" />
        <button disabled={!draft.trim() || busy} onClick={say} aria-label="أرسل">
          <Icon name="send" size={19} />
        </button>
      </div>
    </>
  );
}
