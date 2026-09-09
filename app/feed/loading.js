// الرئيسية while the promo is being read.
//
// This is the screen every student lands on after signing in, and it waits on
// the most: posts, their authors, their attachments, the unread count, and the
// subjects. On mobile data that was a white screen for as long as all of it
// took.
//
// The violet head is drawn for real — it is a gradient, it needs no data, and
// it is how the app names itself at a glance. Only what is being waited for
// shimmers, and it shimmers at the size of the thing it stands for: the rail
// is 82% wide here because it is 82% wide there, and a placeholder of the
// wrong width moves the screen sideways at the moment it arrives.

import { SkPost } from '@/components/Skeleton';

export default function Loading() {
  return (
    <>
      <header className="hero">
        <div className="hero-row">
          <div className="sk sk-pale sk-line big" style={{ width: 116 }} />
          <div className="grow" />
          <div className="sk sk-pale" style={{ width: 38, height: 38, borderRadius: 12 }} />
          <div className="sk sk-pale" style={{ width: 38, height: 38, borderRadius: '50%' }} />
        </div>

        <div className="hero-hi">
          <div className="sk sk-pale sk-line big" style={{ width: '52%' }} />
          <div className="sk sk-pale sk-line" style={{ width: '38%', marginTop: 7 }} />
        </div>

        <div className="tools">
          {/* Five, because five is what fits without a swipe. */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="sk sk-pale" style={{ height: 46, borderRadius: 14 }} />
          ))}
        </div>
      </header>

      <div className="scroll under" style={{ gap: 14 }}>
        {/* اليوم says something in every state, so its card is always there. */}
        <div className="sk" style={{ height: 68 }} />

        <div className="sk sk-line" style={{ width: 54, margin: '0 2px' }} />
        <div className="subs">
          <div className="sk sk-sub" />
          <div className="sk sk-sub" />
        </div>

        {/* The composer, then what the promo has been saying. */}
        <div className="sk" style={{ height: 132 }} />
        <SkPost />
        <SkPost />
      </div>
    </>
  );
}
