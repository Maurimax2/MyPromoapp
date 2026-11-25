'use client';

// One conversation. Same delta poll as a study room: a few bytes when
// nothing is happening, and nothing to get stuck half-connected.

import { useEffect, useRef, useState } from 'react';
import Link from '@/components/Link';
import Icon from '@/components/Icon';
import Flag from '@/components/Flag';
import { useT } from '@/components/Lang';

// It asked every 4 s whether or not anybody was looking — 900 calls an hour
// for one open chat, on a free plan whose limit is the number of calls (owner,
// 2026-11: Vercel nearly stopped the app). Now every 10 s while the chat is
// alive, every 30 s once two minutes have gone by with nothing said, nothing at
// all while the app is in the background, and once at once when it comes back.
const QUICK = 10 * 1000;
const SLOW = 30 * 1000;
const QUIET = 2 * 60 * 1000;
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
  const heard = useRef(Date.now());   // when something was last said, by either of you

  useEffect(() => { foot.current?.scrollIntoView({ block: 'end' }); }, [messages.length]);

  useEffect(() => {
    let alive = true;
    let timer = null;
    let busy = false;
    const later = () => {
      clearTimeout(timer);
      timer = setTimeout(tick, Date.now() - heard.current > QUIET ? SLOW : QUICK);
    };
    async function tick() {
      if (!alive || busy) return;
      // In a pocket: stop, and let `back` pick it up again.
      if (document.visibilityState !== 'visible') return;
      busy = true;
      try {
        const res = await fetch(`/api/chat?chat=${chat}&after=${last.current}`);
        if (alive && res.ok) {
          const { messages: fresh } = await res.json();
          if (alive && fresh?.length) {
            last.current = fresh.at(-1).id;
            heard.current = Date.now();
            setMessages((m) => [...m, ...fresh]);
          }
        }
      } catch { /* the next one will ask again */ }
      busy = false;
      if (alive) later();
    }
    const back = () => {
      if (document.visibilityState === 'visible') tick();
      else clearTimeout(timer);
    };
    later();
    document.addEventListener('visibilitychange', back);
    return () => { alive = false; clearTimeout(timer); document.removeEventListener('visibilitychange', back); };
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
    heard.current = Date.now();
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
