'use client';

// One conversation. Same delta poll as a study room: a few bytes when
// nothing is happening, and nothing to get stuck half-connected.

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Flag from '@/components/Flag';
import { useT } from '@/components/Lang';

const EVERY = 4000;
const name = (p) => p?.full_name || p?.email?.split('@')[0] || 'طالب';
const initials = (p) => (p?.full_name || p?.email || '؟').trim().slice(0, 2);

export default function Talk({ chat, person, first, me }) {
  const t = useT();
  const [messages, setMessages] = useState(first);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
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
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || t('تعذّر الإرسال'));
      return;
    }
    setError('');
    const made = await res.json();
    last.current = made.id;
    setMessages((m) => [...m, made]);
    setDraft('');
  };

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/chat" className="icobtn" aria-label={t('رجوع')}><Icon name="chevR" size={19} /></Link>
          <div className="av" style={{ width: 38, height: 38, fontSize: 13, background: 'var(--olive)' }}>
            {initials(person)}
          </div>
          <div className="grow"><div className="head-t" style={{ fontSize: 17 }}>{name(person)}</div></div>
          {/* What was said here can be reported — a copy of their messages
              goes with it, since nobody else can read this chat — and the
              person blocked, which closes the chat for both of you. */}
          {person?.id && (
            <Flag type="message" id={chat} person={{ id: person.id, name: name(person) }}
              className="icobtn" onBlocked={() => window.location.assign('/chat')} />
          )}
        </div>
      </header>

      <div className="scroll room-log">
        {messages.map((m) => (
          <div key={m.id} className={`say${m.author === me ? ' mine' : ''}`}>
            <div dir="auto">{m.body}</div>
          </div>
        ))}
        {!messages.length && (
          <div className="empty">
            <div className="tile tint-olive"><Icon name="send" size={24} /></div>
            <div className="empty-t">{t('لا رسائل بعد')}</div>
            <div className="empty-b">{t('ابدأ الكلام.')}</div>
          </div>
        )}
        {error && <div className="admin-err" style={{ margin: '0 12px' }}>{error}</div>}
        <div ref={foot} />
      </div>

      <div className="say-new">
        <input value={draft} dir="auto" onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && say()}
          placeholder={t('اكتب…')} aria-label={t('رسالة')} />
        <button disabled={!draft.trim() || busy} onClick={say} aria-label={t('أرسل')}>
          <Icon name="send" size={19} />
        </button>
      </div>
    </>
  );
}
