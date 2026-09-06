'use client';

// Inside a room.
//
// New messages arrive by asking for anything newer than the last id we hold,
// every few seconds. Not a socket: a poll that asks for a delta is a few
// bytes when nothing is happening, works through any network a student in
// Nouakchott is on, and cannot get stuck half-connected.

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

const EVERY = 4000;
const initials = (p) => (p?.full_name || p?.email || '؟').trim().slice(0, 2);
const name = (p) => p?.full_name || p?.email?.split('@')[0] || 'طالب';

export default function Room({ room, people, first, me }) {
  const router = useRouter();
  const [messages, setMessages] = useState(first);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const foot = useRef(null);
  const last = useRef(first.at(-1)?.id ?? 0);

  useEffect(() => { foot.current?.scrollIntoView({ block: 'end' }); }, [messages.length]);

  useEffect(() => {
    if (!me.inside) return undefined;
    let alive = true;

    const tick = async () => {
      const res = await fetch(`/api/rooms/messages?room=${room.id}&after=${last.current}`);
      if (!alive || !res.ok) return;
      const { messages: fresh } = await res.json();
      if (fresh?.length) {
        last.current = fresh.at(-1).id;
        setMessages((m) => [...m, ...fresh]);
      }
    };

    const timer = setInterval(tick, EVERY);
    return () => { alive = false; clearInterval(timer); };
  }, [room.id, me.inside]);

  const say = async () => {
    const text = draft.trim();
    if (!text || busy) return;
    setBusy(true); setError('');
    const res = await fetch('/api/rooms/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ room: room.id, body: text }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(data.error || `تعذّر الإرسال (${res.status})`); return; }
    last.current = data.id;
    setMessages((m) => [...m, data]);
    setDraft('');
  };

  const leave = async (close = false) => {
    await fetch('/api/rooms', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(close ? { id: room.id, close: true } : { id: room.id }),
    });
    router.push('/rooms');
  };

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/rooms" className="icobtn" aria-label="رجوع"><Icon name="chev" size={19} /></Link>
          <div className="grow">
            <div className="head-t" style={{ fontSize: 17 }}>{room.title}</div>
            <div className="head-s">{people.length}/{room.capacity} · {room.topic || 'مراجعة'}</div>
          </div>
          <button className="admin-out" onClick={() => leave(me.host)}>
            {me.host ? 'أغلق' : 'اخرج'}
          </button>
        </div>
        <div className="room-people">
          {people.map((p) => (
            <span key={p.id} className="room-av" title={name(p)}>{initials(p)}</span>
          ))}
        </div>
      </header>

      <div className="scroll room-log">
        {messages.map((m) => (
          <div key={m.id} className={`say${m.author?.id === me.id ? ' mine' : ''}`}>
            {m.author?.id !== me.id && <b>{name(m.author)}</b>}
            <div>{m.body}</div>
          </div>
        ))}
        {!messages.length && (
          <div className="empty">
            <div className="tile tint-purple"><Icon name="msg" size={24} /></div>
            <div className="empty-t">لا رسائل بعد</div>
            <div className="empty-b">ابدأ الكلام — من في الغرفة سيرى.</div>
          </div>
        )}
        {error && <div className="admin-err">{error}</div>}
        <div ref={foot} />
      </div>

      <div className="say-new">
        <input
          value={draft} onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && say()}
          placeholder="اكتب…" aria-label="رسالة" />
        <button disabled={!draft.trim() || busy} onClick={say} aria-label="أرسل">
          <Icon name="send" size={19} />
        </button>
      </div>
    </>
  );
}
