'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import { findAnatomy, hrefOf } from '@/lib/anatomy/search';

// Looking a structure up by its name.
//
// The list of regions is how a student browses; this is how they arrive. « Le
// foramen ovale » is one name and thirty-three regions is a long way to walk
// down before finding out which one holds it, so everything the app can name —
// every structure, every named part of a divided bone, every placed landmark —
// answers to what is typed and opens the region with itself already chosen.
//
// The index rides along in the page: thirteen kilobytes, and the answers come
// back as the letters are typed rather than one round trip per keystroke.

// Arabic chrome, French content: the word beside a result says what KIND of
// thing it is — which is chrome — and the name itself is never translated.
const KIND = { structure: 'بنية', part: 'جزء', landmark: 'معلم' };

export default function AnatomySearch({ placeholder = 'ابحث عن بنية تشريحية' }) {
  const [q, setQ] = useState('');
  const hits = useMemo(() => findAnatomy(q, 24), [q]);
  const asked = q.trim().length >= 2;

  return (
    <>
      <label className="srch">
        <Icon name="search" size={18} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          type="search"
          /* What is typed is French inside an Arabic interface — without this
             « foramen » is laid out right to left and reads as gibberish. */
          dir="auto"
          aria-label={placeholder}
        />
      </label>

      {asked && (
        <div className="anat-hits">
          {hits.length === 0 && (
            <div className="m3d-row" style={{ color: 'var(--ink-3)' }} dir="auto">
              لا نتيجة — {q.trim()}
            </div>
          )}
          {hits.map((h) => (
            <Link key={`${h.region}/${h.kind}/${h.name}`} className="m3d-row" href={hrefOf(h)}>
              <span className="grow" dir="auto">
                <span className="anat-hit-n">{h.name}</span>
                {/* Where it sits on the body, and on which bone when it is a
                    point or a part: « Foramen ovale » alone is a name, « sur
                    l'os sphénoïde » is the half of the answer worth having. */}
                <span className="anat-hit-w">
                  {h.on && h.on !== h.name ? `${h.on} · ` : ''}{h.where}
                </span>
              </span>
              <span className="anat-hit-k">{KIND[h.kind]}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
