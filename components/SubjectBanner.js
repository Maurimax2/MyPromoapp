// A subject's banner: its two shades, its drawing, its name, and — when we
// know it — how far this student is through it.
//
// The drawing (components/SubjectGlyph.js) hangs off the far edge (inline
// end) and the name sits at the start, so French mirrors it without a second
// layout. It was a 3D render until 2026-10-29; those exist only for parts of
// the body, and half the subjects had none that fitted.

import Link from 'next/link';
import SubjectGlyph from './SubjectGlyph';
import { glyphOf } from '@/lib/subjectArt';

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
  const g = glyphOf(subject.name);
  return (
    <Link
      href={href}
      className={`sban${size ? ` sban-${size}` : ''}`}
      style={{ '--a': g.a, '--b': g.b, animationDelay: `${0.2 + index * 0.07}s` }}
    >
      <span className="sban-pat" aria-hidden="true" />
      {/* The drawing twice: large and faint behind, crisp on a frosted tile. */}
      <SubjectGlyph glyph={g.glyph} size={190} weight="thin" className="sban-mark" />
      <span className="sban-icon"><SubjectGlyph glyph={g.glyph} size={44} /></span>
      <span className="sban-txt">
        {tag && <span className="sban-tag" dir="ltr">{tag}</span>}
        {/* A certificate's name runs to six words; it shrinks rather than being cut. */}
        <b dir="ltr" data-long={String(subject.name || '').length > 28 || undefined}>{subject.name}</b>
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

/** A subject's drawing on its two shades, as a square tile. */
export function SubjectTile({ name, size = 46, radius, className = '' }) {
  const g = glyphOf(name);
  return (
    <span className={`stile ${className}`}
          style={{ '--a': g.a, '--b': g.b, width: size, height: size, borderRadius: radius }}
          aria-hidden="true">
      <SubjectGlyph glyph={g.glyph} size={Math.round(size * 0.56)} />
    </span>
  );
}
