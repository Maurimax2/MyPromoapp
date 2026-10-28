// A subject's banner: its colour, its model drawn in that colour, its name,
// and — when we know it — how far this student is through it.
//
// The model is the app's own render (public/art), turned grey and blended
// with `luminosity`, so every subject is one family however its render was
// lit. It hangs off the far edge (inline end) and the name sits at the start,
// so French mirrors it without a second layout.

import Link from 'next/link';
import { bannerOf } from '@/lib/subjectArt';

/**
 * @param {object} p
 * @param {{ id: string, name: string }} p.subject
 * @param {string} p.href
 * @param {string} [p.tag]      a line over the name, e.g. «PCEM2 · S1»
 * @param {number} [p.done]     chapters covered, when the planner knows
 * @param {number} [p.of]
 * @param {'wide'} [p.size]
 * @param {number} [p.index]    its place in a row, for the arrival stagger
 */
export default function SubjectBanner({ subject, href, tag, done = 0, of = 0, size, index = 0 }) {
  const b = bannerOf(subject.name);
  const scale = size === 'wide' ? 1.04 : 1;
  return (
    <Link
      href={href}
      className={`sban${size ? ` sban-${size}` : ''}`}
      style={{ '--a': b.a, '--b': b.b, animationDelay: `${0.2 + index * 0.07}s` }}
    >
      <span className="sban-pat" aria-hidden="true" />
      <img
        className="sban-obj"
        src={b.img}
        alt=""
        // A square the model fits inside: the renders are tall (the skull) or
        // wide (the molecule), and sizing by width alone made the tall ones
        // swallow the name.
        style={{
          width: b.w * scale,
          height: b.w * scale,
          objectFit: 'contain',
          insetInlineEnd: b.x * scale,
          top: b.y * scale,
          transform: `rotate(${b.r}deg)`,
        }}
      />
      <span className="sban-txt">
        {tag && <span className="sban-tag" dir="ltr">{tag}</span>}
        <b dir="ltr">{subject.name}</b>
      </span>
      {of > 0 && (
        <span className="sban-foot">
          <span className="sban-n" dir="ltr">{done}<em>/{of}</em></span>
          <span className="sban-track"><i style={{ width: `${Math.round((done / of) * 100)}%` }} /></span>
        </span>
      )}
    </Link>
  );
}
