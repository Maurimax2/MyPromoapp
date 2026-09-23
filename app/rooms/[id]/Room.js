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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LiveKitRoom, RoomAudioRenderer, VideoTrack, useTracks, useIsSpeaking, useIsMuted,
  useLocalParticipant, useDataChannel, useRoomContext, useConnectionState, useAudioPlayback,
} from '@livekit/components-react';
import { Track, RoomEvent, ConnectionState } from 'livekit-client';
import Icon from '@/components/Icon';
import Sheet from '@/components/Sheet';
import { PING } from '@/lib/rooms';

// three.js is only fetched when a model is actually shown.
const Model3D = dynamic(() => import('@/components/Model3D'), {
  ssr: false,
  loading: () => <div className="rm-stage-wait">…</div>,
});

const EVERY = 4000;
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
        {p.isLocal ? 'أنت' : (p.name || 'طالب')}
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
// is written anywhere. Only the host's messages are believed — the identity
// on each one was signed by our server when the ticket was made.
function ShowSync({ hostId, isHost, show, held, onShow, onHeld, sendRef }) {
  const room = useRoomContext();
  const latest = useRef({ show, held });
  latest.current = { show, held };

  const { send } = useDataChannel('show', (msg) => {
    if (msg.from?.identity !== hostId) return;
    const m = unpack(msg.payload);
    if (!m) return;
    if (m.t === 'show' || m.t === 'state') { onShow(m.key ?? null); onHeld(m.name ?? null); }
    if (m.t === 'pick') onHeld(m.name ?? null);
  });

  useEffect(() => {
    sendRef.current = (o, to) => send(pack(o), { reliable: true, ...(to ? { destinationIdentities: to } : {}) });
    return () => { sendRef.current = null; };
  }, [send, sendRef]);

  // Somebody walks in while the host is explaining: tell them what is on the
  // screen, so they land on the same bone instead of an empty room.
  useEffect(() => {
    if (!isHost) return undefined;
    const came = (p) => {
      const { show: key, held: nm } = latest.current;
      if (!key) return;
      setTimeout(() => sendRef.current?.({ t: 'state', key, name: nm }, [p.identity]), 600);
    };
    room.on(RoomEvent.ParticipantConnected, came);
    return () => { room.off(RoomEvent.ParticipantConnected, came); };
  }, [room, isHost, sendRef]);

  return null;
}

function LiveControls({ isHost, canShow, showing, onPickModel, onStop, onError }) {
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
        ? 'لم يُسمح باستعمال الميكروفون — افتح إعدادات الهاتف واسمح به للتطبيق.'
        : 'لم يُسمح باستعمال الكاميرا — افتح إعدادات الهاتف واسمح بها للتطبيق.');
    }
    setBusy((x) => ({ ...x, [what]: false }));
  };

  return (
    <>
      {!canPlayAudio && (
        <button className="rm-hear" onClick={startAudio}><Icon name="speaker" size={17} /> اضغط لتسمع الغرفة</button>
      )}
      <div className="rm-ctrls">
        <button className={`rm-ctrl${isMicrophoneEnabled ? ' on' : ''}`} onClick={() => flip('mic')}
          disabled={state !== ConnectionState.Connected} aria-label="الميكروفون" aria-pressed={isMicrophoneEnabled}>
          <Icon name={isMicrophoneEnabled ? 'mic' : 'micOff'} size={21} />
        </button>
        <button className={`rm-ctrl${isCameraEnabled ? ' on' : ''}`} onClick={() => flip('cam')}
          disabled={state !== ConnectionState.Connected} aria-label="الكاميرا" aria-pressed={isCameraEnabled}>
          <Icon name={isCameraEnabled ? 'video' : 'camOff'} size={21} />
        </button>
        {isHost && canShow && (
          showing
            ? <button className="rm-ctrl wide on" onClick={onStop}><Icon name="box" size={19} /> أوقف العرض</button>
            : <button className="rm-ctrl wide" onClick={onPickModel}><Icon name="box" size={19} /> اعرض نموذجًا</button>
        )}
        {state !== ConnectionState.Connected && (
          <span className="rm-conn">{state === ConnectionState.Reconnecting ? 'يعيد الاتصال…' : 'يتصل…'}</span>
        )}
      </div>
    </>
  );
}

// ================= the room =================

export default function Room({ room, subject, people, here, first, regions, me }) {
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
  const sendRef = useRef(null);

  useEffect(() => { foot.current?.scrollIntoView({ block: 'end', behavior: 'smooth' }); }, [messages.length]);

  // ---- the chat ----
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
      const data = await res?.json().catch(() => ({})) || {};
      if (!alive) return;
      if (res?.ok && data.token) setLive({ url: data.url, token: data.token });
      else setLive({ off: true, why: data.error || 'تعذّر الاتصال بالصوت والصورة' });
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
    if (!res.ok) { setError(data.error || 'تعذّر الانضمام'); return; }
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

  // Without a call, who is here comes from the heartbeat, and a seat lights
  // up for whoever has just written.
  const spoke = new Map();
  for (const m of messages) if (m.author?.id) spoke.set(m.author.id, new Date(m.created_at).getTime());
  const talking = (id) => now - (spoke.get(id) || 0) < TALKING;
  const sitting = people.filter((p) => here.includes(p.id));
  const connected = !!live?.token;
  const stageUp = !!shown && !hidden;

  const quietSeats = (
    <div className={`rm-seats r3${stageUp ? ' strip' : ''}`}>
      {sitting.map((p) => (
        <div key={p.id} className={`rm-seat${talking(p.id) ? ' talk' : ''}`} style={{ '--face': faceOf(p.id) }}>
          {hostId === p.id && <span className="rm-host"><Icon name="crown" size={13} weight="fill" /></span>}
          <span className="rm-f">{initials(p)}</span>
          <span className="rm-n">
            {p.id === me.id ? 'أنت' : name(p)}
            {talking(p.id) && <span className="rm-bars"><i /><i /><i /></span>}
          </span>
        </div>
      ))}
      {!sitting.length && <div className="rm-seat free"><s>لا أحد هنا الآن</s></div>}
    </div>
  );

  const body = (
    <div className="rm">
      <div className="rm-top r1">
        <Link href="/rooms" className="rm-back" aria-label="رجوع"><Icon name="chevR" size={17} /></Link>
        <span className="grow">
          <b>{room.title}</b>
          <s dir="auto">{room.topic || 'مراجعة'}</s>
        </span>
        {room.closed
          ? <span className="rm-live shut">أُغلقت</span>
          : <span className="rm-live"><i />مباشر · {sitting.length}</span>}
      </div>

      <div className="rm-flow">
        {/* ================= the host's model ================= */}
        {shown && hidden && (
          <button className="rm-back-to" onClick={() => setHidden(false)}>
            <Icon name="box" size={17} /> {me.host ? 'تعرض' : 'المضيف يعرض'} <b dir="ltr">{shown.title}</b> — ارجع إليه
          </button>
        )}
        {stageUp && (
          <div className="rm-stage r2">
            <div className="rm-stage-top">
              <span className="grow">
                <s>{me.host ? 'تعرض الآن' : `يعرض ${name(room.host)}`}</s>
                <b dir="ltr">{shown.title}{held ? ` · ${held}` : ''}</b>
              </span>
              {!me.host && <button className="rm-stage-x" onClick={() => setHidden(true)} aria-label="أخفِ العرض"><Icon name="x" size={16} /></button>}
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
        )}

        {/* ================= who is here ================= */}
        {connected ? <LiveSeats hostId={hostId} strip={stageUp} /> : quietSeats}
        {live?.off && open && <span className="rm-free">{live.why} — الغرفة تعمل بالكتابة.</span>}

        {/* ================= what the room is about ================= */}
        {subject && !stageUp && (
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

      {/* ================= the controls, the composer — or join first ================= */}
      {room.closed ? (
        <div className="rm-foot rm-foot-join">
          <span className="rm-join-hint">أُغلقت هذه الغرفة — لا يمكن الكتابة فيها بعد الآن.</span>
          <Link href="/rooms" className="rm-join">غرف أخرى</Link>
        </div>
      ) : me.inside ? (
        <div className="rm-foot col">
          {connected && (
            <LiveControls isHost={me.host} canShow={regions.length > 0} showing={!!show}
              onPickModel={() => setPicking(true)} onStop={stop} onError={setError} />
          )}
          <div className="rm-type">
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
      ) : (
        <div className="rm-foot rm-foot-join">
          <span className="rm-join-hint">انضم لتشارك في الحديث</span>
          <button className="rm-join" disabled={busy} onClick={join}>
            {busy ? '…' : 'انضم إلى الغرفة'}
          </button>
        </div>
      )}

      {/* ================= the host chooses what to show ================= */}
      {picking && (
        <Sheet onClose={() => setPicking(false)}>
          <div className="rm-pick">
            <b>اعرض نموذجًا على الغرفة</b>
            <s>يراه الجميع، وحين تلمس عظمًا يُحدَّد عندهم أيضًا.</s>
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

  if (!connected) return body;

  return (
    <LiveKitRoom serverUrl={live.url} token={live.token} connect audio={false} video={false}
      options={{ adaptiveStream: true, dynacast: true }}
      // LiveKitRoom draws a <div>; this one should not change the layout.
      style={{ display: 'contents' }}
      onError={() => setError('انقطع الاتصال بالصوت والصورة')}>
      <RoomAudioRenderer />
      <ShowSync hostId={hostId} isHost={me.host} show={show} held={held}
        onShow={onShow} onHeld={setHeld} sendRef={sendRef} />
      {body}
    </LiveKitRoom>
  );
}
