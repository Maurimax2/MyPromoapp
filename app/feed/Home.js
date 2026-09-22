'use client';

// الرئيسية.
//
// Two halves, in the order a student actually wants them: what the app knows
// about your studying, then what your promo is saying.
//
// The violet head is gone, and with it the block of five icons. It named the
// app to somebody who had just opened the app, and it pushed the one thing
// worth seeing first — that four of your promo are studying right now — below
// the fold. What replaced it:
//
//   a thin bar      the mark, your year, the bell, you
//   صفّ الوجوه      who is studying this second; tap it for the open rooms
//   ادرس            continue where you left off, then your subjects
//   من دفعتك        the composer and the feed
//
// Everything the head used to carry still has a door: اختبر نفسك and المراجعة
// are the continue card's other faces, غرف الدراسة is the row of faces,
// النقاط and تحدّي زميلك are on الملف, and المحادثات is the bottom bar.

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';
import Post from '@/components/Post';
import PromoSelector from '@/components/PromoSelector';
import Sheet from '@/components/Sheet';
import PickPromo from './PickPromo';
import { imageThumb, pdfThumb } from '@/lib/thumb';
import { dueCount, trackedCount } from '@/lib/review';
import { lastOpened } from '@/lib/resume';

// A face needs a colour, and it has to be the same colour tomorrow or a promo
// of forty people becomes a promo of forty strangers. So it is read off the
// id rather than handed out — the olive family, plus the two hues from the
// subject palette that sit beside it without arguing.
const FACES = ['#2A5B3E', '#A8502A', '#14555F', '#8A6A14', '#4B5B3A', '#6B4A3A'];
const faceOf = (id = '') => {
  let n = 0;
  for (let i = 0; i < id.length; i += 1) n = (n * 31 + id.charCodeAt(i)) % 997;
  return FACES[n % FACES.length];
};
const initials = (name = '') => name.trim().slice(0, 2);

// A subject's colour. Not read from `modules.tint`: those rows still say
// "purple" and "orange", the two names the identity just retired, and a tile
// whose cue is missing is a tile with a grey dash on it. Derived from the
// name instead, so ANATOMIE is the same colour on every phone and a subject
// a colleague adds tonight has one without anybody choosing it.
//
// The five muted hues of the palette, olive included — never clay, which
// means "this needs you" and is not a decoration.
const CUES = ['#2A5B3E', '#14555F', '#5A3A85', '#8A6A14', '#4B5B3A'];
const cueOf = (name = '') => {
  let n = 0;
  for (let i = 0; i < name.length; i += 1) n = (n * 31 + name.charCodeAt(i)) % 997;
  return CUES[n % CUES.length];
};

// Arabic counts people differently below eleven, and a bare digit in the
// middle of the sentence reads like a score rather than like people.
const SOULS = ['', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة',
               'ثمانية', 'تسعة', 'عشرة'];
const souls = (n) => (n <= 10 ? SOULS[n] : String(n));

const mb = (b) => (b ? `${(b / 1048576).toFixed(1)} Mo` : '');

/**
 * مَن يدرس الآن.
 *
 * Four faces, a count, and a live dot — and the whole row is the way into the
 * open rooms, which is the feature it exists for. It never prints a zero: an
 * empty promo gets the invitation instead, because "0 of your promo are
 * studying" is a fact nobody needed at the top of their screen.
 */
function Here({ studying, rooms }) {
  const [open, setOpen] = useState(false);
  const n = studying.length;

  // Nobody in a room is not an empty state to apologise for — it is the
  // moment to offer the camera. Same row, same place, different offer, so
  // the screen does not reflow depending on who happens to be online.
  if (!n) {
    return (
      <Link href="/rooms" className="here">
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
      <button className="here" onClick={() => setOpen(true)}>
        {n > 0 && (
          <span className="stack">
            {studying.slice(0, 4).map((p) => (
              <span key={p.id} className="face" style={{ background: faceOf(p.id) }}>
                {initials(p.name)}
              </span>
            ))}
          </span>
        )}
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
                {/* How full it is comes first. The topic can be a long
                    French title and the line is one row: whichever goes
                    last is the one that gets the ellipsis, and "three of
                    twelve" is what decides whether you join. */}
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
 * تابع من حيث توقّفت.
 *
 * The one dark block on the screen, and the only one — ink on ivory is the
 * contrast this palette allows, and having exactly one of them is what makes
 * it read as "start here".
 *
 * It has something true to say in every state and never changes height, so
 * the screen does not jump while the browser is being read:
 *
 *   a lecture you had open    resume it
 *   questions due             المراجعة
 *   nothing due, but started  a calm all-clear
 *   never answered one        اختبر نفسك
 */
function Continue({ review, resume }) {
  const due = review?.due ?? 0;
  const started = (review?.tracked ?? 0) > 0;

  const said = resume
    ? { at: `/file/${resume.fid}`, icon: 'book', title: resume.title,
        under: resume.page && resume.pages
          ? `توقّفت عند الصفحة ${resume.page} من ${resume.pages}`
          : resume.subject ? `توقّفت عند ${resume.subject}` : 'تابع من حيث توقّفت' }
    : !review ? { at: '/review', icon: 'quiz', title: 'المراجعة', under: null }
    : due > 0 ? { at: '/review', icon: 'clock',
                  title: `${due} ${due === 1 ? 'سؤال يستحقّ' : 'أسئلة تستحقّ'} المراجعة`,
                  under: 'ما أخطأت فيه يعود إليك' }
    : started ? { at: '/review', icon: 'quiz', title: 'لا شيء للمراجعة الآن',
                  under: 'أحسنت — سنعيدها عليك في وقتها' }
    : { at: '/quiz', icon: 'quiz', title: 'ابدأ أوّل اختبار',
        under: 'ما تخطئ فيه يعود إليك وحده' };

  // How far in, when the reader got far enough to know. One page of forty is
  // 2%, and a bar that short reads as a bar that is broken, so nothing is
  // drawn until there is something to show.
  const far = resume?.page && resume?.pages
    ? Math.min(100, Math.round((resume.page / resume.pages) * 100))
    : 0;

  return (
    <Link href={said.at} className="cont">
      {resume?.thumb
        ? <span className="cont-th"><img src={resume.thumb} alt="" /></span>
        : <span className="cont-ic"><Icon name={said.icon} size={20} /></span>}
      <span className="grow">
        <b dir="auto">{said.title}</b>
        {said.under && <s dir="auto">{said.under}</s>}
        {far >= 3 && (
          <span className="cont-bar">
            <i style={{ width: `${far}%` }} />
          </span>
        )}
      </span>
      <Icon name="chev" size={17} />
    </Link>
  );
}

/**
 * دورك في تحدٍّ.
 *
 * One line, and only while a duel is actually waiting on your answer. It is
 * the only clay on the screen when it appears, which is the whole of what
 * clay means — and when nothing is waiting it is not a quiet grey row, it is
 * nothing at all. التحدّي itself lives in الدراسة.
 */
function DuelWaits({ duel }) {
  if (!duel) return null;
  return (
    <Link href={`/duel/${duel.id}`} className="duelline">
      <span className="duelline-ic"><Icon name="swords" size={19} /></span>
      <span className="grow">
        <b>{duel.at === 'invited' ? 'تحدٍّ ينتظر ردّك' : 'دورك في تحدٍّ'}</b>
        <s dir="auto">{duel.who} · <bdi>{duel.title}</bdi></s>
      </span>
      <span className="duelline-go">{duel.at === 'invited' ? 'اقبل' : 'أجب'}</span>
    </Link>
  );
}

export default function Home({ me, posts, subjects, mySubjects = [],
                               promos = [], reading, unseen = 0,
                               studying = [], rooms = [], duel = null,
                               readError = null, refused = 0 }) {
  const router = useRouter();
  // Both of these live in this browser, so the card can only be filled in
  // once we are in one. Until then it draws its own resting state rather than
  // flashing a number that changes a tick later.
  const [review, setReview] = useState(null);
  const [resume, setResume] = useState(null);
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
  }, []);

  // The + in the bar is the same action as the box on this screen, so it
  // opens that rather than offering a second way to post.
  useEffect(() => {
    const write = () => {
      setWriting(true);
      // The field does not exist until the state has been through React.
      setTimeout(() => {
        field.current?.focus();
        field.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }, 0);
    };
    if (new URLSearchParams(window.location.search).has('write')) write();
    window.addEventListener('mypromo:new', write);
    return () => window.removeEventListener('mypromo:new', write);
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

      // The first page of a PDF, drawn while the bytes are still going up.
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

  return (
    <>
      {/* A bar, not a head: the mark is small and nothing here is a coloured
          surface. What used to be a violet block is now the four things you
          actually reach for from anywhere. */}
      <header className="bar">
        <Logo size={22} />
        <b className="bar-who">دفعتك</b>
        <PromoSelector promos={promos} current={reading} mine={me.promo} />
        <div className="grow" />
        <Link href="/notifications" className="bar-ic"
              aria-label={`الإشعارات${unseen ? ` — ${unseen} جديدة` : ''}`}>
          <Icon name="bell" size={20} />
          {unseen > 0 && <span className="tally">{unseen > 9 ? '+9' : unseen}</span>}
        </Link>
        <Link href="/profile" className="face bar-me"
              style={{ background: faceOf(me.id) }} aria-label="الملف">
          {initials(me.name)}
        </Link>
      </header>

      <div className="scroll flow">
        <Here studying={studying} rooms={rooms} />
        <DuelWaits duel={duel} />

        <Continue review={review} resume={resume} />

        <div className="eb">
          <b>موادك</b>
          <Link href="/study">كل المواد</Link>
        </div>

        {subjects.length > 0 && (
          <div className="rail">
            {subjects.map((m) => (
              <Link key={m.id} href={`/archive/${m.id}`} className="stile">
                <span className="stile-cue" style={{ color: cueOf(m.name) }} />
                <b dir="ltr">{m.name}</b>
                <s>{m.lectures ? `${m.lectures} محاضرة` : 'لا ملفات بعد'}</s>
              </Link>
            ))}
          </div>
        )}

        <div className="split" />

        <div className="eb">
          <b>من دفعتك</b>
          <Link href="/qa">الكل</Link>
        </div>

        {/* A profile made by a magic link has no year, and a post belongs to
            one. Ask here rather than refusing at the moment of posting. */}
        {!me.promo ? <PickPromo /> : !writing ? (
          <button className="hsay" onClick={() => {
            setWriting(true);
            setTimeout(() => field.current?.focus(), 0);
          }}>
            <Icon name="plus" size={16} />
            شارك ملخّصًا أو اسأل دفعتك…
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
                  {/* What it looks like, not what it is called. */}
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

          {/* Which subject it belongs to. It stays optional, because most of
              what a promo says is not about a subject at all. */}
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
