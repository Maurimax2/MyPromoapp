'use client';

// الرئيسية.
//
// In the order a student actually wants it: who is studying right now, the
// duels, where you left off, your subjects — each with its own model breaking
// out of the card — and then what your promo is saying.
//
// Duels are a section here, always, and never an empty one: when none is in
// play it offers classmates to challenge. They had been cut down to a single
// line that appeared only when one was waiting on you, which is hiding them,
// not showing them.

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import Post from '@/components/Post';
import PromoSelector from '@/components/PromoSelector';
import Sheet from '@/components/Sheet';
import PickPromo from './PickPromo';
import { imageThumb, pdfThumb } from '@/lib/thumb';
import { dueCount, trackedCount } from '@/lib/review';
import { lastOpened } from '@/lib/resume';
import { daysKnown } from '@/lib/streak';
import { streakOf, dayOf } from '@/lib/habit';
import { DailyCard, Recap } from './Daily';
import { artOf } from '@/lib/subjectArt';

// A face needs a colour, and it has to be the same colour tomorrow or a promo
// of forty people becomes a promo of forty strangers — so it is read off the
// id rather than handed out.
const FACES = ['#2A5B3E', '#A8502A', '#14555F', '#8A6A14', '#4B5B3A', '#6B4A3A'];
const faceOf = (id = '') => {
  let n = 0;
  for (let i = 0; i < id.length; i += 1) n = (n * 31 + id.charCodeAt(i)) % 997;
  return FACES[n % FACES.length];
};
const initials = (name = '') => name.trim().slice(0, 2);

// Arabic counts people differently below eleven, and a bare digit in the
// middle of the sentence reads like a score rather than like people.
const SOULS = ['', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة',
               'ثمانية', 'تسعة', 'عشرة'];
const souls = (n) => (n <= 10 ? SOULS[n] : String(n));
const days = (n) => (n === 1 ? 'يوم واحد' : n === 2 ? 'يومان' : n <= 10 ? `${n} أيام` : `${n} يومًا`);

const mb = (b) => (b ? `${(b / 1048576).toFixed(1)} Mo` : '');

/**
 * مَن يدرس الآن.
 *
 * Four faces, a count, and a live dot — and the whole row is the way into the
 * open rooms. When nobody is in one it becomes the camera and the offer to
 * open a room: the same row in the same place, so the screen does not reflow
 * depending on who happens to be online.
 */
function Here({ studying, rooms }) {
  const [open, setOpen] = useState(false);
  const n = studying.length;

  if (!n) {
    return (
      <Link href="/rooms" className="here r2">
        <span className="here-cam"><Icon name="video" size={20} /></span>
        <span className="here-say">
          <b>لا أحد يدرس الآن</b>
          <s>افتح غرفة وسيرونها</s>
        </span>
        <Icon name="chev" size={16} />
      </Link>
    );
  }

  return (
    <>
      <button className="here r2" onClick={() => setOpen(true)}>
        <span className="stack">
          {studying.slice(0, 4).map((p) => (
            <span key={p.id} className="face" style={{ background: faceOf(p.id) }}>
              {initials(p.name)}
            </span>
          ))}
        </span>
        <span className="here-say">
          <b>{souls(n)}</b> من دفعتك {n === 1 ? 'يدرس' : 'يدرسون'} الآن
        </span>
        <span className="here-dot" />
        <Icon name="chev" size={16} />
      </button>

      {open && (
        <Sheet onClose={() => setOpen(false)}>
          <div className="rooms-head">
            <b>غرف مفتوحة الآن</b>
            <s>{rooms.length ? 'ادخل واحدة، أو افتح غرفتك' : 'لا غرفة مفتوحة — كن أول من يفتح'}</s>
          </div>
          {rooms.map((r) => (
            <Link key={r.id} href={`/rooms/${r.id}`} className="room-row">
              {r.people.length > 0 && (
                <span className="stack">
                  {r.people.slice(0, 3).map((p) => (
                    <span key={p.id} className="face" style={{ background: faceOf(p.id) }}>
                      {initials(p.name)}
                    </span>
                  ))}
                </span>
              )}
              <span className="grow">
                <b dir="auto">{r.title}</b>
                <s dir="rtl">
                  {r.people.length}{r.capacity ? ` من ${r.capacity}` : ''}
                  {r.topic && <>{' · '}<bdi>{r.topic}</bdi></>}
                </s>
              </span>
              <span className="room-go">انضم</span>
            </Link>
          ))}
          <Link href="/rooms" className="room-new">+ افتح غرفة</Link>
        </Sheet>
      )}
    </>
  );
}

/**
 * التحدّيات.
 *
 * Your turn comes first and is drawn face to face; a duel you are waiting on
 * is quieter; and at the end, always, classmates you can challenge in one tap.
 */
function Duels({ duels, rivals, me }) {
  const mine = duels.filter((d) => d.at === 'invited' || d.at === 'play');
  const theirs = duels.filter((d) => d.at === 'sent' || d.at === 'waiting');

  return (
    <section className="h-duels r3">
      <div className="h-sec">
        <span className="h-sec-ic clay"><Icon name="swords" size={17} /></span>
        <b>التحدّيات</b>
        {mine.length > 0 && <span className="h-sec-n">{mine.length} ينتظرك</span>}
        <Link href="/duel" className="h-sec-all">الكل</Link>
      </div>

      <div className="h-strip">
        {mine.map((d) => (
          <Link key={d.id} href={`/duel/${d.id}`} className="duel-turn">
            <span className="duel-turn-top">
              <span className="duel-live" />
              <b>{d.at === 'invited' ? 'تحدٍّ ينتظر ردّك' : 'دورك'}</b>
              {d.seconds > 0 && (
                <span className="duel-turn-t"><Icon name="clock" size={12} /> {d.seconds} ث</span>
              )}
            </span>
            <span className="duel-vs">
              <span className="duel-p">
                <span className="duel-f" style={{ background: faceOf(me.id) }}>{initials(me.name)}</span>
                <s>أنت</s>
              </span>
              <span className="duel-mid">
                <b>VS</b>
                {d.count ? <s dir="ltr">{d.count} QCM</s> : null}
              </span>
              <span className="duel-p">
                <span className="duel-f them" style={{ background: faceOf(d.them.id) }}>{initials(d.them.name)}</span>
                <s>{d.them.name.split(' ')[0]}</s>
              </span>
            </span>
            <span className="duel-turn-bot">
              <bdi className="grow">{d.title}</bdi>
              <span className="duel-go">{d.at === 'invited' ? 'اقبل' : 'أجب الآن'}</span>
            </span>
          </Link>
        ))}

        {theirs.map((d) => (
          <Link key={d.id} href={`/duel/${d.id}`} className="duel-wait">
            <span className="duel-wait-top">
              <span className="duel-f sm" style={{ background: faceOf(d.them.id) }}>{initials(d.them.name)}</span>
              <Icon name="clock" size={19} />
            </span>
            <b>{d.them.name}</b>
            <bdi className="duel-wait-t">{d.title}</bdi>
            <s>{d.at === 'sent' ? 'أرسلت الدعوة…' : 'بانتظار إجابته…'}</s>
          </Link>
        ))}

        <div className="duel-rivals">
          <b>تحدَّ زميلًا</b>
          {rivals.map((r) => (
            <span key={r.id} className="duel-rival">
              <span className="duel-f xs" style={{ background: faceOf(r.id) }}>{initials(r.name)}</span>
              <span className="grow">{r.name}</span>
              <Link href={`/duel/new?to=${encodeURIComponent(r.handle)}`} className="duel-rival-go"
                    aria-label={`تحدَّ ${r.name}`}>
                <Icon name="swords" size={15} weight="fill" />
              </Link>
            </span>
          ))}
          <Link href="/duel/new" className="duel-rivals-any">أو اختر أيّ زميل ←</Link>
        </div>
      </div>
    </section>
  );
}

/**
 * تابع من حيث توقّفت.
 *
 * Something true to say in every state, at one height, so the screen does not
 * jump while the browser is being read: the lecture you had open, questions
 * that are due, a calm all-clear, or the invitation to a first quiz.
 */
function Continue({ review, resume }) {
  const due = review?.due ?? 0;
  const started = (review?.tracked ?? 0) > 0;

  const said = resume
    ? { at: `/file/${resume.fid}`, icon: 'book', kicker: 'تابع من حيث توقّفت', title: resume.title,
        art: resume.subject ? artOf(resume.subject) : null }
    : !review ? { at: '/review', icon: 'quiz', kicker: 'المراجعة', title: 'المراجعة' }
    : due > 0 ? { at: '/review', icon: 'clock', kicker: 'ما أخطأت فيه يعود إليك',
                  title: `${due} ${due === 1 ? 'سؤال يستحقّ' : 'أسئلة تستحقّ'} المراجعة` }
    : started ? { at: '/review', icon: 'quiz', kicker: 'أحسنت — سنعيدها عليك في وقتها', title: 'لا شيء للمراجعة الآن' }
    : { at: '/quiz', icon: 'quiz', kicker: 'ما تخطئ فيه يعود إليك وحده', title: 'ابدأ أوّل اختبار' };

  // How far in, when the reader got far enough to know. A bar at 2% reads as
  // a broken bar, so nothing is drawn until there is something to show.
  const far = resume?.page && resume?.pages
    ? Math.min(100, Math.round((resume.page / resume.pages) * 100))
    : 0;

  return (
    <Link href={said.at} className="h-cont r4">
      <span className="h-cont-art" style={{ background: said.art?.bg || '#2A5B3E' }}>
        {said.art
          ? <img src={said.art.img} alt="" />
          : resume?.thumb
            ? <img className="thumb" src={resume.thumb} alt="" />
            : <Icon name={said.icon} size={22} />}
      </span>
      <span className="grow">
        <s>{said.kicker}</s>
        <b dir="auto">{said.title}</b>
        {far >= 3 && <span className="h-cont-bar"><i style={{ width: `${far}%` }} /></span>}
      </span>
      {far >= 3
        ? <span className="h-cont-n" dir="ltr">{resume.page} / {resume.pages}</span>
        : <Icon name="chev" size={17} />}
    </Link>
  );
}

export default function Home({ me, posts, subjects, mySubjects = [],
                               promos = [], reading, unseen = 0,
                               studying = [], rooms = [], duels = [], rivals = [],
                               readError = null, refused = 0,
                               daily = null, today = 0, habitDays = null, recap = null }) {
  const router = useRouter();
  // These three live in this browser, so they can only be read once we are in
  // one. Until then each draws its own resting state rather than a number that
  // changes a tick later.
  const [review, setReview] = useState(null);
  const [resume, setResume] = useState(null);
  const [streak, setStreak] = useState(0);
  const [writing, setWriting] = useState(false);
  const [body, setBody] = useState('');
  const [files, setFiles] = useState([]);      // what has been uploaded, not what is chosen
  const [module, setModule] = useState('');    // the subject it belongs to
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const picker = useRef(null);
  const field = useRef(null);

  useEffect(() => {
    setReview({ due: dueCount(), tracked: trackedCount() });
    setResume(lastOpened());
    // This phone's days and the server's (habits.sql), counted with the
    // freezes the server counts, so the number here and on أنا agree.
    setStreak(streakOf(Object.keys(daysKnown(habitDays)), dayOf()).current);
  }, [habitDays]);

  // `/feed?write=1` opens the composer, for the few places that link here to
  // post something.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('write')) {
      setWriting(true);
      setTimeout(() => {
        field.current?.focus();
        field.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }, 0);
    }
  }, []);

  // Files go up as they are chosen, not when the post is sent — a student on
  // LTE should be waiting while they write, not after.
  const take = async (list) => {
    setError('');
    for (const file of Array.from(list).slice(0, 6 - files.length)) {
      const kind = file.type.startsWith('image/') ? 'image' : 'file';
      const holding = { name: file.name, kind, bytes: file.size,
                        pending: true, id: crypto.randomUUID(),
                        thumb: kind === 'image' ? imageThumb(file) : null };
      setFiles((f) => [...f, holding]);

      if (kind === 'file') {
        pdfThumb(file).then((thumb) => {
          if (thumb) setFiles((f) => f.map((x) => (x.id === holding.id ? { ...x, thumb } : x)));
        });
      }

      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFiles((f) => f.filter((x) => x.id !== holding.id));
        setError(data.error || `تعذّر الرفع (${res.status})`);
        continue;
      }
      setFiles((f) => f.map((x) => (
        x.id === holding.id ? { ...data, id: holding.id, thumb: x.thumb } : x)));
    }
  };

  const send = async () => {
    if (busy) return;
    setBusy(true); setError('');
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        body,
        module: module || null,
        media: files.filter((f) => !f.pending).map(({ kind, path, name, bytes }) =>
          ({ kind, path, name, bytes })),
      }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(data.error || `تعذّر النشر (${res.status})`); return; }
    setBody(''); setFiles([]); setModule(''); setWriting(false);
    router.refresh();
  };

  const ready = !busy && (body.trim() || files.some((f) => !f.pending))
    && !files.some((f) => f.pending);
  const first = me.name.split(' ')[0];

  return (
    <>
      {/* ================= who you are, today ================= */}
      <header className="h-top r1">
        <Link href="/profile" className="h-me" style={{ background: faceOf(me.id) }} aria-label="أنا">
          {initials(me.name)}
        </Link>
        <span className="h-hi">
          <b>أهلًا {first}</b>
          <span className="h-sub">
            {streak > 0 && (
              <span className="h-streak"><Icon name="flame" size={13} weight="fill" /> <b>{days(streak)}</b> متتالية ·</span>
            )}
            <PromoSelector promos={promos} current={reading} mine={me.promo} />
          </span>
        </span>
        <Link href="/notifications" className="h-bell"
              aria-label={`الإشعارات${unseen ? ` — ${unseen} جديدة` : ''}`}>
          <Icon name="bell" size={21} />
          {unseen > 0 && <span className="tally">{unseen > 9 ? '+9' : unseen}</span>}
        </Link>
      </header>

      <div className="scroll flow h-flow">
        <Here studying={studying} rooms={rooms} />

        <Recap recap={recap} />

        {daily && <DailyCard q={daily.q} mine={daily.mine} tally={daily.tally} today={today} />}

        <Duels duels={duels} rivals={rivals} me={me} />

        <Continue review={review} resume={resume} />

        {/* ================= موادك — each with its model breaking out ================= */}
        {subjects.length > 0 && (
          <section className="r5">
            <div className="h-sec">
              <b>موادك</b>
              <Link href="/study" className="h-sec-all">كل المواد</Link>
            </div>
            <div className="h-subjects">
              {subjects.map((m, i) => {
                const a = artOf(m.name);
                return (
                  <Link key={m.id} href={`/archive/${m.id}`} className="h-subj" style={{ background: a.bg }}>
                    <img className="float" src={a.img} alt="" style={{ animationDelay: `${-i * 0.9}s` }} />
                    <b dir="ltr">{m.name}</b>
                    <s>{m.lectures ? `${m.lectures} محاضرة` : 'لا ملفات بعد'}</s>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <div className="split" />

        {/* ================= the promo ================= */}
        <div className="h-sec r6">
          <b>من دفعتك</b>
          <Link href="/qa" className="h-sec-all">الكل</Link>
        </div>

        {!me.promo ? <PickPromo /> : !writing ? (
          <button className="h-say" onClick={() => {
            setWriting(true);
            setTimeout(() => field.current?.focus(), 0);
          }}>
            <span className="face" style={{ background: faceOf(me.id) }}>{initials(me.name)}</span>
            <span className="grow">شارك ملخّصًا أو اسأل دفعتك…</span>
            <span className="h-say-pdf"><Icon name="file" size={18} /></span>
          </button>
        ) : (
        <div className="composer">
          <div className="composer-top">
            <div className="face composer-me" style={{ background: faceOf(me.id) }}>
              {initials(me.name)}
            </div>
            <textarea
              ref={field}
              className="composer-field"
              dir="auto"
              rows={3}
              placeholder="شارك شيئًا مع دفعتك…"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              aria-label="منشور جديد"
            />
          </div>

          {files.length > 0 && (
            <div className="draft">
              {files.map((f) => (
                <div key={f.id} className={`draft-f${f.pending ? ' up' : ''}`}>
                  {f.thumb
                    ? <img className="draft-thumb" src={f.thumb} alt="" />
                    : <Icon name={f.kind === 'image' ? 'image' : 'file'} size={17} />}
                  <span className="grow" dir="ltr">{f.name}</span>
                  <span className="draft-mb">{f.pending ? '…' : mb(f.bytes)}</span>
                  {!f.pending && (
                    <button aria-label="احذف"
                      onClick={() => setFiles((l) => l.filter((x) => x.id !== f.id))}>
                      <Icon name="x" size={15} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {(body.trim() || files.length > 0) && mySubjects.length > 0 && (
            <select
              className="admin-input sm"
              value={module}
              onChange={(e) => setModule(e.target.value)}
              aria-label="المادة"
            >
              <option value="">بلا مادة</option>
              {/* Your own year's subjects, never the rail's: the rail can be
                  showing another year, and the post is going into yours. */}
              {mySubjects.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          )}

          {error && <div className="admin-err">{error}</div>}

          <div className="composer-acts">
            <input
              ref={picker} type="file" hidden multiple
              accept="image/*,application/pdf"
              onChange={(e) => { take(e.target.files); e.target.value = ''; }}
            />
            <button onClick={() => picker.current?.click()}>
              <span className="ic-img"><Icon name="image" size={18} /></span>صورة
            </button>
            <button onClick={() => picker.current?.click()}>
              <span className="ic-pdf"><Icon name="file" size={18} /></span>ملف
            </button>
            <button className="composer-send" disabled={!ready} onClick={send}>
              {busy ? '…' : 'انشر'}
            </button>
          </div>
        </div>
        )}

        {/* Silence here is what cost an afternoon: the feed came back refused
            and drew an empty screen, which reads exactly like "nobody has
            posted yet". */}
        {readError && (
          <div className="admin-err" style={{ padding: '0 2px' }}>
            تعذّرت قراءة المنشورات — {readError}
          </div>
        )}

        {!readError && refused > 0 && (
          <div className="admin-err" style={{ padding: '0 2px' }}>
            في دفعتك {refused} منشورًا لا يسمح لك الخادم بقراءتها — تحقّق من
            حالة حسابك وسنتك في اللوحة.
          </div>
        )}

        {posts.length > 0
          ? posts.map((p) => <Post key={p.id} post={p} me={me} />)
          : (
            <div className="empty">
              <div className="tile tint-olive"><Icon name="msg" size={24} /></div>
              <div className="empty-t">لا منشورات بعد</div>
              <div className="empty-b">كن أول من ينشر في دفعتك.</div>
            </div>
          )}
      </div>
    </>
  );
}
