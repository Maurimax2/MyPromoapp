'use client';

// Inside a room.
//
// New messages arrive by asking for anything newer than the last id we hold,
// every few seconds. Not a socket: a poll that asks for a delta is a few
// bytes when nothing is happening, works through any network a student in
// Nouakchott is on, and cannot get stuck half-connected.
//
// The clock at the top is everyone's without anybody keeping it: twenty-five
// minutes of work and five of rest, counted from the moment the room opened.
// Every phone works out the same minute from the same timestamp, so the room
// breaks together — and there is nothing to pause, because a clock one
// person could pause would not be the room's.

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

const EVERY = 4000;
const WORK = 25 * 60;
const REST = 5 * 60;
const ROUND = WORK + REST;
const RING = 301.6;   // 2πr, r = 48
const TALKING = 45 * 1000;   // wrote in the last 45 seconds

const initials = (p) => (p?.full_name || p?.email || '؟').trim().slice(0, 2);
const name = (p) => p?.full_name || p?.email?.split('@')[0] || 'طالب';
const FACES = ['#2A5B3E', '#A8502A', '#14555F', '#8A6A14', '#4B5B3A', '#6B4A3A'];
const faceOf = (id = '') => {
  let n = 0;
  for (let i = 0; i < id.length; i += 1) n = (n * 31 + id.charCodeAt(i)) % 997;
  return FACES[n % FACES.length];
};
const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

function useClock(since) {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (now == null) return null;
  const gone = Math.max(0, Math.floor((now - new Date(since || now).getTime()) / 1000));
  const round = Math.floor(gone / ROUND);
  const into = gone % ROUND;
  const working = into < WORK;
  const left = working ? WORK - into : ROUND - into;
  const span = working ? WORK : REST;
  return { working, left, part: 1 - left / span, round: (round % 4) + 1 };
}

export default function Room({ room, subject, people, first, me }) {
  const router = useRouter();
  const [messages, setMessages] = useState(first);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  // 0 until the phone says otherwise: the server and the phone must draw the
  // same first frame, and only the phone knows what time it is for it.
  const [now, setNow] = useState(0);
  useEffect(() => setNow(Date.now()), []);
  const foot = useRef(null);
  const last = useRef(first.at(-1)?.id ?? 0);
  const clock = useClock(room.created_at);

  useEffect(() => { foot.current?.scrollIntoView({ block: 'end', behavior: 'smooth' }); }, [messages.length]);

  useEffect(() => {
    if (!me.inside) return undefined;
    let alive = true;

    const tick = async () => {
      setNow(Date.now());
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
    setNow(Date.now());
  };

  const leave = async (close = false) => {
    await fetch('/api/rooms', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(close ? { id: room.id, close: true } : { id: room.id }),
    });
    router.push('/rooms');
  };

  // Who has just said something: their seat lights up, the nearest thing to
  // hearing them that a text room has.
  const spoke = new Map();
  for (const m of messages) if (m.author?.id) spoke.set(m.author.id, new Date(m.created_at).getTime());
  const talking = (id) => now - (spoke.get(id) || 0) < TALKING;

  // One empty seat to finish the row, and the rest as a number: five dashed
  // boxes pushed the conversation off the screen.
  const free = Math.max(0, (room.capacity || 0) - people.length);
  const empty = free && people.length % 2 ? 1 : 0;

  return (
    <div className="rm">
      <div className="rm-top r1">
        <Link href="/rooms" className="rm-back" aria-label="رجوع"><Icon name="chevR" size={17} /></Link>
        <span className="grow">
          <b>{room.title}</b>
          <s dir="auto">{room.topic || 'مراجعة'}</s>
        </span>
        <span className="rm-live"><i />مباشر · {people.length}</span>
      </div>

      <div className="rm-flow">
        {/* ================= the clock everyone shares ================= */}
        <div className="rm-clock r2">
          <span className="rm-ring">
            <svg width="112" height="112" viewBox="0 0 112 112" aria-hidden="true">
              <circle cx="56" cy="56" r="48" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="8" />
              <circle cx="56" cy="56" r="48" fill="none" stroke={clock?.working === false ? '#E08A5E' : '#9FD0B0'}
                strokeWidth="8" strokeLinecap="round" strokeDasharray={RING}
                strokeDashoffset={RING * (1 - (clock?.part ?? 0))} />
            </svg>
            <span>
              <b dir="ltr">{clock ? mmss(clock.left) : '--:--'}</b>
              <s>{clock?.working === false ? 'استراحة' : 'تركيز'}</s>
            </span>
          </span>
          <span className="grow">
            <b>{clock?.working === false ? 'استراحة — قوموا تمدّدوا' : 'وقت التركيز'}</b>
            <s>الجولة {clock?.round ?? 1} من 4 · كلّكم على نفس الساعة</s>
            <span className="rm-rounds">
              {[1, 2, 3, 4].map((n) => (
                <i key={n} className={clock && n < clock.round ? 'done' : clock && n === clock.round ? 'now' : ''} />
              ))}
            </span>
          </span>
        </div>

        {/* ================= who is here ================= */}
        <div className="rm-seats r3">
          {people.map((p) => (
            <div key={p.id} className={`rm-seat${talking(p.id) ? ' talk' : ''}`} style={{ '--face': faceOf(p.id) }}>
              {room.host?.id === p.id && <span className="rm-host"><Icon name="crown" size={13} weight="fill" /></span>}
              <span className="rm-f">{initials(p)}</span>
              <span className="rm-n">
                {p.id === me.id ? 'أنت' : name(p)}
                {talking(p.id) && <span className="rm-bars"><i /><i /><i /></span>}
              </span>
            </div>
          ))}
          {Array.from({ length: empty }, (_, n) => (
            <div key={`e${n}`} className="rm-seat free"><Icon name="plus" size={18} /><s>مقعد فارغ</s></div>
          ))}
        </div>
        {free > empty && (
          <span className="rm-free">
            {free === 1 ? "مقعد واحد فارغ" : free === 2 ? "مقعدان فارغان" : free <= 10 ? `${free} مقاعد فارغة` : `${free} مقعدًا فارغًا`} من {room.capacity}
          </span>
        )}

        {/* ================= what the room is about ================= */}
        {subject && (
          <Link href={`/archive/${subject.id}`} className="rm-subj r4">
            <span className="rm-subj-art" style={{ background: subject.bg }}><img src={subject.img} alt="" /></span>
            <span className="grow">
              <s>يراجعون الآن</s>
              <b dir="ltr">{subject.name}</b>
              <em>افتح المادة معهم</em>
            </span>
            <Icon name="chev" size={15} />
          </Link>
        )}

        {/* ================= the chat ================= */}
        <div className="rm-chat">
          {messages.map((m) => {
            const mine = m.author?.id === me.id;
            return (
              <div key={m.id} className={`rm-msg${mine ? ' mine' : ''}`}>
                {!mine && <span className="rm-av" style={{ background: faceOf(m.author?.id) }}>{initials(m.author)}</span>}
                <span className="rm-bub">
                  {!mine && <b>{name(m.author)}</b>}
                  <span dir="auto">{m.body}</span>
                </span>
              </div>
            );
          })}
          {!messages.length && (
            <div className="rm-quiet">
              <Icon name="msgs" size={26} />
              <b>لا رسائل بعد</b>
              <s>ابدأ الكلام — من في الغرفة سيرى.</s>
            </div>
          )}
          {error && <div className="admin-err">{error}</div>}
          <div ref={foot} />
        </div>
      </div>

      {/* ================= type, and leave ================= */}
      <div className="rm-foot">
        <input
          value={draft} dir="auto" onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && say()}
          placeholder="اكتب للغرفة…" aria-label="رسالة" />
        <button className="rm-send" disabled={!draft.trim() || busy} onClick={say} aria-label="أرسل">
          <Icon name="send" size={19} />
        </button>
        <button className="rm-leave" onClick={() => leave(me.host)}>
          {me.host ? 'أغلق' : 'غادر'}
        </button>
      </div>
    </div>
  );
}
