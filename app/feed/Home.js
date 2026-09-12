'use client';

// الرئيسية.
//
// A violet head carrying who you are and what the app can do, then a white
// card that says what today asks of you, then your subjects, then your promo.
//
// The head is the only coloured surface in the app. It holds the tools
// because five icons on violet do not compete with the white cards below
// them, and because the screen then names itself at a glance.

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';
import Post from '@/components/Post';
import PromoSelector from '@/components/PromoSelector';
import PickPromo from './PickPromo';
import { imageThumb, pdfThumb } from '@/lib/thumb';
import { dueCount, trackedCount } from '@/lib/review';

// What the head offers. Everything left out of it has another door on the
// same screen, and two buttons to one place is the thing to avoid:
//
//   المحاضرات   a lecture is opened from its subject, below
//   نماذج 3D    a model belongs to the subject it explains, not to a rail
//   المحادثات   the header icon, reachable from every screen
//   المراجعة    the اليوم card, right under this head
//   جدول الحصص  the same card
//   الملخصات / الأرشيف / الملف   the bottom bar
const TOOLS = [
  { id: 'quiz',   label: 'اختبر نفسك',  icon: 'quiz',  href: '/quiz' },
  { id: 'qa',     label: 'سؤال وجواب',  icon: 'msgs',  href: '/qa' },
  { id: 'rooms',  label: 'غرف الدراسة', icon: 'video', href: '/rooms' },
  { id: 'points', label: 'النقاط',      icon: 'award', href: '/points' },
  { id: 'duel',   label: 'تحدّي زميلك', icon: 'swords', href: '/duel' },
];

const TODAY = new Intl.DateTimeFormat('ar', { weekday: 'long', day: 'numeric', month: 'long' });

/**
 * ما عليك اليوم.
 *
 * The one card under the head, and the only place المراجعة is reached from —
 * which is why it has no tile of its own any more. It has something to say in
 * every state, so the layout does not shift depending on how much a student
 * has answered: a due count, a calm all-clear, or an invitation to start.
 *
 * جدول الحصص belongs here too and is not built yet; when it is, it is a
 * second row in this card, not a sixth icon in the head.
 */
function Today({ review }) {
  // Before the browser has read the schedule there is no honest number to
  // print, so the card carries its own name and nothing else.
  const due = review?.due ?? 0;
  const started = (review?.tracked ?? 0) > 0;

  const said = !review ? { text: 'المراجعة', hint: null, at: '/review' }
    : due > 0 ? { text: `${due} ${due === 1 ? 'سؤال يستحقّ' : 'أسئلة تستحقّ'} المراجعة`,
                  hint: 'ما أخطأت فيه يعود إليك', at: '/review', now: true }
    : started ? { text: 'لا شيء للمراجعة الآن', hint: 'أحسنت — سنعيدها عليك في وقتها', at: '/review' }
    : { text: 'ابدأ أوّل اختبار', hint: 'ما تخطئ فيه يعود إليك وحده', at: '/quiz' };

  return (
    <Link href={said.at} className="card today">
      <span className={`today-ic${said.now ? ' due' : ''}`}>
        <Icon name={said.now ? 'clock' : 'quiz'} size={20} />
      </span>
      <span className="grow">
        <b>{said.text}</b>
        {said.hint && <s>{said.hint}</s>}
      </span>
      <Icon name="chev" size={18} className="today-go" />
    </Link>
  );
}

const mb = (b) => (b ? `${(b / 1048576).toFixed(1)} Mo` : '');

export default function Home({ me, posts, subjects, mySubjects = [],
                               promos = [], reading, unseen = 0,
                               readError = null, refused = 0 }) {
  const router = useRouter();
  // The review schedule lives in this browser, so the card can only be filled
  // in once we are in one. Until then it renders its own quiet resting state
  // rather than flashing a number that changes a tick later.
  const [review, setReview] = useState(null);
  const [body, setBody] = useState('');
  const [files, setFiles] = useState([]);      // what has been uploaded, not what is chosen
  const [module, setModule] = useState('');   // the subject it belongs to
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const picker = useRef(null);
  const field = useRef(null);

  // The + in the bar is the same action as the box at the top of this screen,
  // so it puts the cursor in it rather than opening a second way to post.
  useEffect(() => {
    const write = () => {
      field.current?.focus();
      field.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    };
    if (new URLSearchParams(window.location.search).has('write')) write();
    window.addEventListener('mypromo:new', write);
    return () => window.removeEventListener('mypromo:new', write);
  }, []);

  useEffect(() => { setReview({ due: dueCount(), tracked: trackedCount() }); }, []);

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
    setBody(''); setFiles([]); setModule('');
    router.refresh();
  };

  const ready = !busy && (body.trim() || files.some((f) => !f.pending))
    && !files.some((f) => f.pending);

  return (
    <>
      <header className="hero">
        <div className="hero-row">
          <Logo size={32} id="feed" white />
          <div className="hero-mark">My<i>Promo</i></div>
          <div className="grow" />
          <PromoSelector promos={promos} current={reading} mine={me.promo} />
          {/* المحادثات is a tab in the bottom bar now, so there is no icon for
              it here: one door, not two. */}
          {/* It was a <button> with no handler for weeks. */}
          <Link href="/notifications" className="hero-ic" aria-label={`الإشعارات${unseen ? ` — ${unseen} جديدة` : ''}`}>
            <Icon name="bell" size={21} />
            {unseen > 0 && <span className="tally">{unseen > 9 ? '+9' : unseen}</span>}
          </Link>
          {/* الملف gave up its slot in the bottom bar to المحادثات, so this
              picture is how you reach it — which is what a picture of you at
              the top of a screen means everywhere else anyway. */}
          <Link href="/profile" className="av hero-av" aria-label="الملف">
            {me.name.slice(0, 2)}
          </Link>
        </div>

        <div className="hero-hi">
          <b>أهلًا {me.name}</b>
          <s>{me.promo ? me.promo.toUpperCase() : 'دفعتك'} · {TODAY.format(new Date())}</s>
        </div>

        <div className="tools">
          {TOOLS.map((t) => (t.href ? (
            <Link key={t.id} href={t.href} className="tool">
              <i><Icon name={t.icon} size={23} /></i>
              <b>{t.label}</b>
            </Link>
          ) : (
            <div key={t.id} className="tool soon" aria-disabled="true" title="قريبًا">
              <i><Icon name={t.icon} size={23} /></i>
              <b>{t.label}</b>
            </div>
          )))}
        </div>
      </header>

      <div className="scroll under" style={{ gap: 14 }}>
        <Today review={review} />

        {subjects.length > 0 && (
          <>
            <div className="eyebrow" style={{ margin: '0 2px' }}>
              {reading === me.promo ? 'موادك'
                : `مواد ${(promos.find((p) => p.id === reading)?.name) || ''}`}
            </div>
            <div className="subs">
              {subjects.map((m) => (
                <Link key={m.id} href={`/archive/${m.id}`} className="sub">
                  {m.banner
                    ? <img src={m.banner} alt={m.name} />
                    : <div className={`sub-none tint-${m.tint}`}><span dir="ltr">{m.name}</span></div>}
                </Link>
              ))}
            </div>
          </>
        )}

        {/* A profile made by a magic link has no year, and a post belongs to
            one. Ask here rather than refusing at the moment of posting. */}
        {!me.promo ? <PickPromo /> : (
        <div className="composer">
          <div className="composer-top">
            <div className="av" style={{ width: 40, height: 40, fontSize: 13, background: 'var(--purple)' }}>
              {me.name.slice(0, 2)}
            </div>
            <textarea
              ref={field}
              className="composer-field"
              dir="auto"
              rows={body ? 3 : 1}
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

          {/* Which subject it belongs to. It appears only once there is
              something to post, so an empty composer stays one line — and it
              stays optional, because most of what a promo says is not about
              a subject at all. */}
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
              <span className="ic-img"><Icon name="image" size={19} /></span>صورة
            </button>
            <button onClick={() => picker.current?.click()}>
              <span className="ic-pdf"><Icon name="file" size={19} /></span>ملف
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

        {/* The posts are there and the database would not hand them over.
            Saying so is the whole point: an empty screen looks like an empty
            promo, and we lost an afternoon to that. */}
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
              <div className="tile tint-purple"><Icon name="msg" size={24} /></div>
              <div className="empty-t">لا منشورات بعد</div>
              <div className="empty-b">كن أول من ينشر في دفعتك.</div>
            </div>
          )}
      </div>
    </>
  );
}
