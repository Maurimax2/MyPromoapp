'use client';

// A badge, drawn: the family is the shape, the tier is the metal.
//
// Six shapes, so a shelf of badges reads by kind before a single label is
// read — hexagon for what you shared, shield for whom you helped, rosette for
// what the promo gave back, star for what you learnt, flame for the days in a
// row, laurel for the hundred. Four metals, bronze to emerald, for how far up
// its ladder a badge sits.
//
// Drawn in SVG rather than shipped as images: seventeen badges in four metals
// would be sixty-eight files, and a locked one is the same drawing in grey.

import { useId } from 'react';
import Icon from '@/components/Icon';

// Metal ramps: light edge, body, shadow, and the recessed inner face.
const METAL = {
  1: { hi: '#F6C9A0', mid: '#C98A5A', lo: '#7F4E2A', face: '#B0703F', ink: '#3E200B' },
  2: { hi: '#FFFFFF', mid: '#C9D0D6', lo: '#7D8791', face: '#A5AEB7', ink: '#26303A' },
  3: { hi: '#FFEFB5', mid: '#F2C85E', lo: '#A87A1E', face: '#DDAA3D', ink: '#4F3A08' },
  4: { hi: '#C4F2D6', mid: '#43A26E', lo: '#1B4A31', face: '#2E8157', ink: '#F4FFF8' },
};
const GREY = { hi: '#F2F0EA', mid: '#DAD7CE', lo: '#AEAAA0', face: '#CBC7BD', ink: '#9A968C' };

// A scalloped circle: the edge of a rosette.
function scallop(n, r, bump) {
  let d = '';
  for (let i = 0; i < n; i += 1) {
    const a0 = (i / n) * Math.PI * 2 - Math.PI / 2;
    const a1 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2;
    const x0 = 50 + r * Math.cos(a0), y0 = 50 + r * Math.sin(a0);
    const x1 = 50 + r * Math.cos(a1), y1 = 50 + r * Math.sin(a1);
    d += `${i ? '' : `M${x0.toFixed(2)} ${y0.toFixed(2)}`} A${bump} ${bump} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} `;
  }
  return `${d}Z`;
}

// A soft star: points rounded enough to read as a medal, not a sheriff's badge.
function star(n, ro, ri) {
  const pts = [];
  for (let i = 0; i < n * 2; i += 1) {
    const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 ? ri : ro;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join(' L')} Z`;
}

const SHAPE = {
  hex: 'M50 4 L89.8 27 V73 L50 96 L10.2 73 V27 Z',
  shield: 'M50 4 L88 16.5 V46 C88 70.5 71.5 87.5 50 96 C28.5 87.5 12 70.5 12 46 V16.5 Z',
  rosette: scallop(18, 44, 7.6),
  star: star(8, 47, 37),
  flame: 'M50 3 C60 18 83 34 83 60 A33 33 0 0 1 17 60 C17 45 26 36 33 25 C35 34 39 38 43 40 C41 26 44 14 50 3 Z',
  laurel: 'M50 8 A40 40 0 1 1 49.99 8 Z',
};

// Laurel leaves around the lower two-thirds of the hundred's disc.
function Laurel({ fill }) {
  const leaves = [];
  for (const side of [-1, 1]) {
    for (let i = 0; i < 7; i += 1) {
      const a = (Math.PI / 2) + side * (0.35 + i * 0.3);
      const x = 50 + 46 * Math.cos(a), y = 52 + 44 * Math.sin(a);
      const rot = (a * 180) / Math.PI + (side > 0 ? 60 : -60);
      leaves.push(<ellipse key={`${side}${i}`} cx={x} cy={y} rx="7.5" ry="3.4" transform={`rotate(${rot} ${x} ${y})`} fill={fill} />);
    }
  }
  return <g>{leaves}</g>;
}

export default function BadgeArt({ kind = 'hex', tier = 1, icon, done = true, size = 56, still = false }) {
  const uid = useId().replace(/:/g, '');
  const m = done ? METAL[tier] || METAL[1] : GREY;
  const d = SHAPE[kind] || SHAPE.hex;
  const g = (k) => `${k}-${uid}`;

  return (
    <span
      className={`bdg${done ? ' on' : ''}${still ? ' still' : ''}`}
      data-tier={tier}
      style={{ width: size, height: size, '--bdg-ink': m.ink }}
    >
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <linearGradient id={g('rim')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={m.hi} />
            <stop offset=".48" stopColor={m.mid} />
            <stop offset="1" stopColor={m.lo} />
          </linearGradient>
          <linearGradient id={g('face')} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={m.hi} stopOpacity=".55" />
            <stop offset=".4" stopColor={m.face} />
            <stop offset="1" stopColor={m.lo} stopOpacity=".9" />
          </linearGradient>
          <linearGradient id={g('shine')} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".5" stopColor="#fff" stopOpacity=".75" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id={g('clip')}><path d={d} /></clipPath>
        </defs>

        {/* The top two tiers hang from a ribbon. */}
        {done && tier >= 3 && (
          <g className="bdg-ribbon">
            <path d="M34 70 L26 99 L36 93 L42 100 L47 76 Z" fill={tier === 4 ? '#2A5B3E' : '#A8502A'} />
            <path d="M66 70 L74 99 L64 93 L58 100 L53 76 Z" fill={tier === 4 ? '#1E4630' : '#8E3F1D'} />
          </g>
        )}
        {kind === 'laurel' && <Laurel fill={done ? m.mid : m.lo} />}

        <path d={d} fill={`url(#${g('rim')})`} />
        <path d={d} fill={`url(#${g('face')})`} transform="translate(50 50) scale(.78) translate(-50 -50)" />
        <path d={d} fill="none" stroke={m.hi} strokeOpacity=".7" strokeWidth="1.6"
          transform="translate(50 50) scale(.78) translate(-50 -50)" />

        {done && tier === 4 && (
          <g className="bdg-glints" fill="#fff">
            <path d="M22 20 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6 Z" />
            <path d="M79 70 l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2 -3 -3 -1.2 3 -1.2 Z" />
          </g>
        )}

        {done && !still && (
          <g clipPath={`url(#${g('clip')})`}>
            <g transform="rotate(20 50 50)">
              <rect className="bdg-shine" x="-70" y="-20" width="36" height="140" fill={`url(#${g('shine')})`} />
            </g>
          </g>
        )}
      </svg>
      <span className="bdg-ic"><Icon name={icon} size={Math.round(size * 0.36)} weight={done ? 'fill' : 'regular'} /></span>
      {!done && <span className="bdg-lock"><Icon name="lock" size={Math.max(9, Math.round(size * 0.18))} weight="fill" /></span>}
    </span>
  );
}
