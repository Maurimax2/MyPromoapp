'use client';

// Inside a room.
//
// Three things happen here, each on its own line so one failing leaves the
// others standing:
//
// · The chat — asked for every few seconds, anything newer than the last id
//   held. A poll that asks for a delta is a few bytes when nothing is
//   happening and works through any network a student in Nouakchott is on.
// · Being here — every half minute the screen tells the server it is still
//   open (lib/rooms.js), which is all «يدرسون الآن» on الرئيسية counts.
// · The call — voice, video and the host's model, through LiveKit
//   (/api/rooms/live). Without it configured the room is still a room, in
//   text; with it, each seat is a live tile.
//
// The clock at the top is everyone's without anybody keeping it: twenty-five
// minutes of work and five of rest, counted from the moment the room opened,
// so every phone works out the same minute and the room breaks together.

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from '@/components/Link';
import { useRouter } from 'next/navigation';
import {
  LiveKitRoom, RoomAudioRenderer, VideoTrack, useTracks, useIsSpeaking, useIsMuted,
  useLocalParticipant, useDataChannel, useRoomContext, useConnectionState, useAudioPlayback,
} from '@livekit/components-react';
import { Track, RoomEvent, ConnectionState } from 'livekit-client';
import Icon from '@/components/Icon';
import { SubjectTile } from '@/components/SubjectBanner';
import Flag from '@/components/Flag';
import Sheet from '@/components/Sheet';
import QuickView from '@/components/QuickView';
import { PING } from '@/lib/rooms';
import { useT } from '@/components/Lang';

// three.js is only fetched when a model is actually shown.
const Model3D = dynamic(() => import('@/components/Model3D'), {
  ssr: false,
  loading: () => <div className="rm-stage-wait">…</div>,
});

const EVERY = 10 * 1000;   // asking for new messages when there is no call
const WORK = 25 * 60;
const REST = 5 * 60;
const ROUND = WORK + REST;
const RING = 301.6;   // 2πr, r = 48
const TALKING = 45 * 1000;   // wrote in the last 45 seconds

const initials = (p) => (p?.full_name || p?.name || p?.email || '؟').trim().slice(0, 2);
const name = (p) => p?.full_name || p?.email?.split('@')[0] || 'طالب';
const FACES = ['#2A5B3E', '#A8502A', '#14555F', '#8A6A14', '#4B5B3A', '#6B4A3A'];
const faceOf = (id = '') => {
  let n = 0;
  for (let i = 0; i < id.length; i += 1) n = (n * 31 + id.charCodeAt(i)) % 997;
  return FACES[n % FACES.length];
};
const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
const pack = (o) => new TextEncoder().encode(JSON.stringify(o));
const unpack = (b) => { try { return JSON.parse(new TextDecoder().decode(b)); } catch { return null; } };

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

// ================= the call: one live tile per person =================

function Tile({ trackRef, hostId }) {
  const t = useT();
  const p = trackRef.participant;
  const speaking = useIsSpeaking(p);
  const muted = useIsMuted({ participant: p, source: Track.Source.Microphone });
  const cam = !!trackRef.publication?.track && !trackRef.publication.isMuted;
  return (
    <div className={`rm-seat${speaking ? ' talk' : ''}${cam ? ' cam' : ''}`} style={{ '--face': faceOf(p.identity) }}>
      {cam && <VideoTrack trackRef={trackRef} className={`rm-video${p.isLocal ? ' mine' : ''}`} />}
      {p.identity === hostId && <span className="rm-host"><Icon name="crown" size={13} weight="fill" /></span>}
      <span className={`rm-mic${muted ? ' off' : ''}`}><Icon name={muted ? 'micOff' : 'mic'} size={13} weight="fill" /></span>
      {!cam && <span className="rm-f">{initials(p)}</span>}
      <span className="rm-n">
        {p.isLocal ? t('أنت') : (p.name || t('طالب'))}
        {speaking && <span className="rm-bars"><i /><i /><i /></span>}
      </span>
    </div>
  );
}

function LiveSeats({ hostId, strip }) {
  const tracks = useTracks([{ source: Track.Source.Camera, withPlaceholder: true }], { onlySubscribed: false });
  // The host first, then you, then everybody else in the order they came.
  const order = (t) => (t.participant.identity === hostId ? 0 : t.participant.isLocal ? 1 : 2);
  const sorted = [...tracks].sort((a, b) => order(a) - order(b));
  return (
    <div className={`rm-seats r3${strip ? ' strip' : ''}`}>
      {sorted.map((t) => <Tile key={t.participant.identity} trackRef={t} hostId={hostId} />)}
    </div>
  );
}

// The host's model, carried on the call's data channel so nothing about it
// is written anywhere. Only the host's messages are believed for the model —
// the identity on each one was signed by our server when the ticket was made.
//
// A file is different: anybody in the call may open one, and what they open
// everybody sees (a student asked for it, 2026-11-01). Each phone draws it in
// Google's preview, so it is the same file for all — not the same page.
function ShowSync({ hostId, isHost, myId, show, held, file, onShow, onHeld, onFile, sendRef }) {
  const room = useRoomContext();
  const latest = useRef({ show, held, file });
  latest.current = { show, held, file };

  const { send } = useDataChannel('show', (msg) => {
    const m = unpack(msg.payload);
    if (!m) return;
    if (m.t === 'file') {
      onFile(m.fid ? { fid: m.fid, title: m.title || '', by: msg.from?.identity || null } : null);
      return;
    }
    if (msg.from?.identity !== hostId) return;
    if (m.t === 'show' || m.t === 'state') { onShow(m.key ?? null); onHeld(m.name ?? null); }
    if (m.t === 'pick') onHeld(m.name ?? null);
  });

  useEffect(() => {
    sendRef.current = (o, to) => send(pack(o), { reliable: true, ...(to ? { destinationIdentities: to } : {}) });
    return () => { sendRef.current = null; };
  }, [send, sendRef]);

  // Somebody walks in while the host is explaining: tell them what is on the
  // screen, so they land on the same bone instead of an empty room. A file is
  // told by whoever opened it.
  useEffect(() => {
    const came = (p) => {
      const { show: key, held: nm, file: f } = latest.current;
      if (isHost && key) setTimeout(() => sendRef.current?.({ t: 'state', key, name: nm }, [p.identity]), 600);
      if (f && f.by === myId) setTimeout(() => sendRef.current?.({ t: 'file', fid: f.fid, title: f.title }, [p.identity]), 700);
    };
    room.on(RoomEvent.ParticipantConnected, came);
    return () => { room.off(RoomEvent.ParticipantConnected, came); };
  }, [room, isHost, myId, sendRef]);

  return null;
}

// The chat, carried on the call: a message written (and saved) by one phone
// reaches the others here, without anybody asking the server. Believed only
// when its author is the participant who sent it — that identity was signed
// by our server when the ticket was made.
function ChatSync({ onMessage, sendRef }) {
  const { send } = useDataChannel('chat', (msg) => {
    const m = unpack(msg.payload);
    if (!m?.id || !m.author?.id || m.author.id !== msg.from?.identity) return;
    onMessage([m]);
  });
  useEffect(() => {
    sendRef.current = (m) => send(pack(m), { reliable: true });
    return () => { sendRef.current = null; };
  }, [send, sendRef]);
  return null;
}

function LiveControls({ isHost, canShow, showing, onPickModel, onStop, onPickFile, onError }) {
  const t = useT();
  const { localParticipant, isMicrophoneEnabled, isCameraEnabled } = useLocalParticipant();
  const state = useConnectionState();
  const { canPlayAudio, startAudio } = useAudioPlayback();
  // One flag per device: a single one swallowed the tap on the microphone
  // while the camera was still starting.
  const [busy, setBusy] = useState({});

  const flip = async (what) => {
    if (busy[what]) return;
    setBusy((x) => ({ ...x, [what]: true }));
    try {
      if (what === 'mic') await localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
      else await localParticipant.setCameraEnabled(!isCameraEnabled, { facingMode: 'user' });
    } catch {
      onError(what === 'mic'
        ? t('لم يُسمح باستعمال الميكروفون — افتح إعدادات الهاتف واسمح به للتطبيق.')
        : t('لم يُسمح باستعمال الكاميرا — افتح إعدادات الهاتف واسمح بها للتطبيق.'));
    }
    setBusy((x) => ({ ...x, [what]: false }));
  };

  return (
    <>
      {!canPlayAudio && (
        <button className="rm-hear" onClick={startAudio}><Icon name="speaker" size={17} />{' '}{t('اضغط لتسمع الغرفة')}</button>
      )}
      <div className="rm-ctrls">
        <button className={`rm-ctrl${isMicrophoneEnabled ? ' on' : ''}`} onClick={() => flip('mic')}
          disabled={state !== ConnectionState.Connected} aria-label={t('الميكروفون')} aria-pressed={isMicrophoneEnabled}>
          <Icon name={isMicrophoneEnabled ? 'mic' : 'micOff'} size={21} />
        </button>
        <button className={`rm-ctrl${isCameraEnabled ? ' on' : ''}`} onClick={() => flip('cam')}
          disabled={state !== ConnectionState.Connected} aria-label={t('الكاميرا')} aria-pressed={isCameraEnabled}>
          <Icon name={isCameraEnabled ? 'video' : 'camOff'} size={21} />
        </button>
        {isHost && canShow && (
          showing
            ? <button className="rm-ctrl wide on" onClick={onStop}><Icon name="box" size={19} />{' '}{t('أوقف العرض')}</button>
            : <button className="rm-ctrl wide" onClick={onPickModel}><Icon name="box" size={19} />{' '}{t('اعرض نموذجًا')}</button>
        )}
        <button className="rm-ctrl wide" onClick={onPickFile} disabled={state !== ConnectionState.Connected}>
          <Icon name="file" size={19} />{' '}{t('افتح ملفًا')}
        </button>
        {state !== ConnectionState.Connected && (
          <span className="rm-conn">{state === ConnectionState.Reconnecting ? t('يعيد الاتصال…') : t('يتصل…')}</span>
        )}
      </div>
    </>
  );
}

// ================= the room =================

export default function Room({ room, subject, people, here, first, regions, subjects = [], me }) {
  const t = useT();
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
  const hostId = room.host?.id;
  const open = me.inside && !room.closed;

  // The call: a ticket, or the reason there is none.
  const [live, setLive] = useState(null);   // { url, token } | { off, why }
  // What the host is showing, and which structure is held.
  const [show, setShow] = useState(null);
  const [held, setHeld] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [picking, setPicking] = useState(false);
  // A file somebody in the call opened for everybody: { fid, title, by }.
  const [file, setFile] = useState(null);
  // Choosing one: the sheet, the subject chosen in it, and its lectures.
  const [filing, setFiling] = useState(false);
  const [from, setFrom] = useState(null);
  const [lectures, setLectures] = useState(null);
  const sendRef = useRef(null);

  useEffect(() => { foot.current?.scrollIntoView({ block: 'end', behavior: 'smooth' }); }, [messages.length]);

  // ---- the chat ----
  //
  // A message is written once (POST) and then travels over the call to
  // everybody in it (ChatSync), which costs the server nothing. Asking the
  // server for new messages every four seconds was about 900 calls an hour
  // for each student in a room, on a plan with four hours of CPU a month
  // (owner, 2026-11-01). The server is still asked — once a minute in a call,
  // for whatever the call missed, and every ten seconds without one — and
  // never while the app is in the background.
  const calling = !!live?.token;
  const take = useCallback((fresh) => {
    if (!fresh?.length) return;
    setMessages((list) => {
      const have = new Set(list.map((x) => x.id));
      const add = fresh.filter((x) => !have.has(x.id));
      return add.length ? [...list, ...add].sort((a, b) => a.id - b.id) : list;
    });
    last.current = Math.max(last.current, ...fresh.map((x) => x.id));
  }, []);
  const chatRef = useRef(null);

  useEffect(() => {
    if (!me.inside) return undefined;
    let alive = true;
    const tick = async () => {
      if (document.visibilityState !== 'visible') return;
      const res = await fetch(`/api/rooms/messages?room=${room.id}&after=${last.current}`).catch(() => null);
      if (!alive || !res?.ok) return;
      const { messages: fresh } = await res.json();
      take(fresh);
    };
    const timer = setInterval(tick, calling ? 60 * 1000 : EVERY);
    // Back from the background: catch up at once.
    const back = () => { if (document.visibilityState === 'visible') tick(); };
    document.addEventListener('visibilitychange', back);
    return () => { alive = false; clearInterval(timer); document.removeEventListener('visibilitychange', back); };
  }, [room.id, me.inside, calling, take]);

  // Who has just written lights up for 45 seconds: the clock for that is the
  // phone's own, not a call to the server.
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 5000);
    return () => clearInterval(timer);
  }, []);

  // ---- being here ----
  useEffect(() => {
    if (!open) return undefined;
    const ping = () => {
      if (document.visibilityState !== 'visible') return;
      fetch('/api/rooms', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: room.id, here: true }),
      }).catch(() => {});
    };
    ping();
    const timer = setInterval(ping, PING);
    document.addEventListener('visibilitychange', ping);
    return () => { clearInterval(timer); document.removeEventListener('visibilitychange', ping); };
  }, [room.id, open]);

  // ---- the call ----
  useEffect(() => {
    if (!open) return undefined;
    let alive = true;
    (async () => {
      const res = await fetch('/api/rooms/live', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ room: room.id }),
      }).catch(() => null);
      const data = (await res?.json().catch(() => ({}))) || {};
      if (!alive) return;
      if (res?.ok && data.token) setLive({ url: data.url, token: data.token });
      else setLive({ off: true, why: data.error || t('تعذّر الاتصال بالصوت والصورة') });
    })();
    return () => { alive = false; };
  }, [room.id, open]);

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
    if (!res.ok) { setError(data.error || t('تعذّر الإرسال ({status})', { status: res.status })); return; }
    take([data]);
    // Everybody in the call has it now, without asking the server.
    chatRef.current?.(data);
    setDraft('');
    setNow(Date.now());
  };

  // Hand the invitation to the phone's own share sheet when it has one — the
  // quickest way into a WhatsApp chat — and to the clipboard when it does not.
  const [copied, setCopied] = useState(false);
  const invite = async () => {
    const link = `${window.location.origin}/rooms/join/${room.code}`;
    const text = t('تعال ندرس معًا في «{title}» على MyPromo', { title: room.title });
    try {
      if (navigator.share) { await navigator.share({ title: 'MyPromo', text, url: link }); return; }
    } catch { /* closed the sheet: nothing to do */ return; }
    try { await navigator.clipboard.writeText(`${text}\n${link}`); setCopied(true); setTimeout(() => setCopied(false), 3500); } catch { /* the page can still be copied from the address bar */ }
  };

  const leave = async (close = false) => {
    await fetch('/api/rooms', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(close ? { id: room.id, close: true } : { id: room.id }),
    });
    router.push('/rooms');
  };

  // A room is readable by anyone in the promo — you can look before you
  // join — but only a member can talk in it. Refreshing is what brings the
  // real `me.inside` back from the server, the way accepting a duel does.
  const join = async () => {
    if (busy) return;
    setBusy(true); setError('');
    const res = await fetch('/api/rooms', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: room.id, join: true }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(data.error || t('تعذّر الانضمام')); return; }
    router.refresh();
  };

  // ---- the host's model ----
  const present = (key) => {
    setShow(key); setHeld(null); setPicking(false); setHidden(false);
    sendRef.current?.({ t: 'show', key, name: null });
  };
  const stop = () => {
    setShow(null); setHeld(null);
    sendRef.current?.({ t: 'show', key: null, name: null });
  };
  const hostPicked = useCallback((nm) => {
    setHeld(nm);
    sendRef.current?.({ t: 'pick', name: nm });
  }, []);
  const onShow = useCallback((key) => { setShow(key); if (key) setHidden(false); }, []);
  const shown = regions.find((r) => r.key === show) || null;

  // ---- a file for everybody ----
  const pickSubject = async (id) => {
    setFrom(id); setLectures(null);
    const res = await fetch(`/api/rooms/files?module=${encodeURIComponent(id)}`).catch(() => null);
    const data = (await res?.json().catch(() => ({}))) || {};
    setLectures(data.chapters || []);
  };
  const openFiling = () => {
    setFiling(true);
    // The room's own subject is open already; the others are a tap away.
    if (!from && subjects[0]) pickSubject(subjects[0].id);
  };
  const shareFile = (l) => {
    setFile({ fid: l.fid, title: l.title, by: me.id }); setHidden(false); setFiling(false);
    sendRef.current?.({ t: 'file', fid: l.fid, title: l.title });
  };
  const closeFile = () => {
    setFile(null);
    sendRef.current?.({ t: 'file', fid: null });
  };
  const onFile = useCallback((f) => { setFile(f); if (f) setHidden(false); }, []);
  const opener = file ? (file.by === me.id ? null : people.find((p) => p.id === file.by)) : null;

  // Without a call, who is here comes from the heartbeat, and a seat lights
  // up for whoever has just written.
  const spoke = new Map();
  for (const m of messages) if (m.author?.id) spoke.set(m.author.id, new Date(m.created_at).getTime());
  const talking = (id) => now - (spoke.get(id) || 0) < TALKING;
  const sitting = people.filter((p) => here.includes(p.id));
  const connected = !!live?.token;
  // A file opened for everybody comes before the host's model.
  const stageUp = (!!file || !!shown) && !hidden;

  const quietSeats = (
    <div className={`rm-seats r3${stageUp ? ' strip' : ''}`}>
      {sitting.map((p) => (
        <div key={p.id} className={`rm-seat${talking(p.id) ? ' talk' : ''}`} style={{ '--face': faceOf(p.id) }}>
          {hostId === p.id && <span className="rm-host"><Icon name="crown" size={13} weight="fill" /></span>}
          <span className="rm-f">{initials(p)}</span>
          <span className="rm-n">
            {p.id === me.id ? t('أنت') : name(p)}
            {talking(p.id) && <span className="rm-bars"><i /><i /><i /></span>}
          </span>
        </div>
      ))}
      {!sitting.length && <div className="rm-seat free"><s>{t('لا أحد هنا الآن')}</s></div>}
    </div>
  );

  const body = (
    <div className="rm">
      <div className="rm-top r1">
        <Link href="/rooms" className="rm-back" aria-label={t('رجوع')}><Icon name="chevR" size={17} /></Link>
        <span className="grow">
          <b>{room.title}</b>
          <s dir="auto">{room.topic || t('مراجعة')}</s>
        </span>
        {room.private && <span className="rm-lock" title={t('غرفة خاصة')}><Icon name="lock" size={14} /></span>}
        {room.closed
          ? <span className="rm-live shut">{t('أُغلقت')}</span>
          : <span className="rm-live"><i />{t('مباشر · {length}', { length: sitting.length })}</span>}
        {/* A room is reported with the last things said in it; its host can
            be blocked from here like anybody else. */}
        {!me.host && (
          <Flag type="room" id={room.id} className="rm-back"
            person={hostId && hostId !== me.id ? { id: hostId, name: name(room.host) } : null}
            onBlocked={() => window.location.assign('/rooms')} />
        )}
      </div>

      {/* The way a friend comes in. Only people already in the room hold the
          code, so only they can pass it on. */}
      {room.private && room.code && !room.closed && (
        <button className="rm-invite" onClick={invite}>
          <Icon name="share" size={17} />
          <span className="grow">
            <b>{copied ? t('نُسخ الرابط — الصقه لصديقك') : t('ادعُ صديقًا برابط')}</b>
          </span>
        </button>
      )}

      <div className="rm-flow">
        {/* ================= a file opened for everybody ================= */}
        {file && hidden && (
          <button className="rm-back-to" onClick={() => setHidden(false)}>
            <Icon name="file" size={17} /> <b dir="ltr">{file.title}</b>{' '}{t('— ارجع إليه')}</button>
        )}
        {stageUp && file && (
          <div className="rm-stage rm-stage-doc r2">
            <div className="rm-stage-top">
              <span className="grow">
                <s>{opener ? t('يعرض {name}', { name: name(opener) }) : t('تعرض الآن')}</s>
                <b dir="auto">{file.title}</b>
              </span>
              {/* Whoever opened it closes it for everybody; the others hide it. */}
              {file.by === me.id
                ? <button className="rm-stage-x" onClick={closeFile} aria-label={t('أغلق الملف')}><Icon name="x" size={16} /></button>
                : <button className="rm-stage-x" onClick={() => setHidden(true)} aria-label={t('أخفِ العرض')}><Icon name="x" size={16} /></button>}
            </div>
            <div className="rm-stage-body">
              <QuickView key={file.fid} fid={file.fid} src={`/api/file/${file.fid}`} />
            </div>
          </div>
        )}

        {/* ================= the host's model ================= */}
        {shown && hidden && !file && (
          <button className="rm-back-to" onClick={() => setHidden(false)}>
            <Icon name="box" size={17} /> {me.host ? t('تعرض') : t('المضيف يعرض')} <b dir="ltr">{shown.title}</b>{' '}{t('— ارجع إليه')}</button>
        )}
        {stageUp && !file && (
          <div className="rm-stage r2">
            <div className="rm-stage-top">
              <span className="grow">
                <s>{me.host ? t('تعرض الآن') : t('يعرض {name}', { name: name(room.host) })}</s>
                <b dir="ltr">{shown.title}{held ? ` · ${held}` : ''}</b>
              </span>
              {!me.host && <button className="rm-stage-x" onClick={() => setHidden(true)} aria-label={t('أخفِ العرض')}><Icon name="x" size={16} /></button>}
            </div>
            <div className="rm-stage-body">
              <Model3D key={shown.key} {...shown.view}
                {...(me.host ? { onPicked: hostPicked } : { follow: held })} />
            </div>
          </div>
        )}

        {/* ================= the clock everyone shares ================= */}
        {!stageUp && (
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
                <s>{clock?.working === false ? t('استراحة') : t('تركيز')}</s>
              </span>
            </span>
            <span className="grow">
              <b>{clock?.working === false ? t('استراحة — قوموا تمدّدوا') : t('وقت التركيز')}</b>
              <s>{t('الجولة {v1} من 4', { v1: clock?.round ?? 1 })}</s>
              <span className="rm-rounds">
                {[1, 2, 3, 4].map((n) => (
                  <i key={n} className={clock && n < clock.round ? 'done' : clock && n === clock.round ? 'now' : ''} />
                ))}
              </span>
            </span>
          </div>
        )}

        {/* ================= who is here ================= */}
        {connected ? <LiveSeats hostId={hostId} strip={stageUp} /> : quietSeats}
        {live?.off && open && <span className="rm-free">{t('{why} — الغرفة تعمل بالكتابة.', { why: live.why })}</span>}

        {/* ================= what the room is about ================= */}
        {subject && !stageUp && (
          <Link href={`/archive/${subject.id}`} className="rm-subj r4">
            <SubjectTile name={subject.name} size={46} />
            <span className="grow">
              <s>{t('يراجعون الآن')}</s>
              <b dir="ltr">{subject.name}</b>
              <em>{t('افتح المادة معهم')}</em>
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
              <b>{t('لا رسائل بعد')}</b>
            </div>
          )}
          {error && <div className="admin-err">{error}</div>}
          <div ref={foot} />
        </div>
      </div>

      {/* ================= the controls, the composer — or join first ================= */}
      {room.closed ? (
        <div className="rm-foot rm-foot-join">
          <span className="rm-join-hint">{t('أُغلقت هذه الغرفة — لا يمكن الكتابة فيها بعد الآن.')}</span>
          <Link href="/rooms" className="rm-join">{t('غرف أخرى')}</Link>
        </div>
      ) : me.inside ? (
        <div className="rm-foot col">
          {connected && (
            <LiveControls isHost={me.host} canShow={regions.length > 0} showing={!!show}
              onPickModel={() => setPicking(true)} onStop={stop} onPickFile={openFiling} onError={setError} />
          )}
          <div className="rm-type">
            <input
              value={draft} dir="auto" onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && say()}
              placeholder={t('اكتب للغرفة…')} aria-label={t('رسالة')} />
            <button className="rm-send" disabled={!draft.trim() || busy} onClick={say} aria-label={t('أرسل')}>
              <Icon name="send" size={19} />
            </button>
            <button className="rm-leave" onClick={() => leave(me.host)}>
              {me.host ? t('أغلق') : t('غادر')}
            </button>
          </div>
        </div>
      ) : (
        <div className="rm-foot rm-foot-join">
          <span className="rm-join-hint">{t('انضم لتشارك في الحديث')}</span>
          <button className="rm-join" disabled={busy} onClick={join}>
            {busy ? '…' : t('انضم إلى الغرفة')}
          </button>
        </div>
      )}

      {/* ================= the host chooses what to show ================= */}
      {picking && (
        <Sheet onClose={() => setPicking(false)}>
          <div className="rm-pick">
            <b>{t('اعرض نموذجًا على الغرفة')}</b>
            <div className="rm-regions">
              {regions.map((r) => (
                <button key={r.key} className="rm-region" onClick={() => present(r.key)}>
                  <img src={r.img} alt="" />
                  <b dir="ltr">{r.title}</b>
                  <s dir="ltr">{r.subtitle}</s>
                </button>
              ))}
            </div>
          </div>
        </Sheet>
      )}
    </div>
  );

  // ================= anybody chooses a file for the room =================
  const fileSheet = filing && (
    <Sheet onClose={() => setFiling(false)}>
      <div className="rm-pick">
        <b>{t('افتح ملفًا للغرفة')}</b>
        <div className="rm-subjs">
          {subjects.map((m) => (
            <button key={m.id} className="rm-subj-chip" data-on={from === m.id} onClick={() => pickSubject(m.id)} dir="ltr">
              {m.name}
            </button>
          ))}
        </div>
        <div className="rm-files">
          {from && lectures === null && <div className="rm-files-wait">…</div>}
          {lectures?.length === 0 && <div className="rm-files-wait">{t('لا محاضرات في هذه المادة')}</div>}
          {lectures?.map((ch, i) => (
            <div key={`${ch.title}-${i}`} className="rm-files-ch">
              {ch.title && <s dir="auto">{ch.title}</s>}
              {ch.lectures.map((l) => (
                <button key={l.fid} className="rm-file" onClick={() => shareFile(l)}>
                  {l.n != null && <span className="rm-file-n">{l.n}</span>}
                  <span className="grow" dir="auto">{l.title}</span>
                  <Icon name="chev" size={15} />
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Sheet>
  );

  if (!connected) return body;

  return (
    <LiveKitRoom serverUrl={live.url} token={live.token} connect audio={false} video={false}
      options={{ adaptiveStream: true, dynacast: true }}
      // LiveKitRoom draws a <div>; this one should not change the layout.
      style={{ display: 'contents' }}
      onError={() => setError(t('انقطع الاتصال بالصوت والصورة'))}>
      <RoomAudioRenderer />
      <ShowSync hostId={hostId} isHost={me.host} myId={me.id} show={show} held={held} file={file}
        onShow={onShow} onHeld={setHeld} onFile={onFile} sendRef={sendRef} />
      <ChatSync onMessage={take} sendRef={chatRef} />
      {body}
      {fileSheet}
    </LiveKitRoom>
  );
}
