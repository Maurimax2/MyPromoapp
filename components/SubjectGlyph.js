// A subject's drawing: what the subject is about, as one icon.
//
// These replaced the 3D renders (owner, 2026-10-29): a render exists only for
// a part of the body, so ORL, ophtalmologie, chimie analytique or médecine du
// travail all landed on a picture of cells that said nothing about them. A
// drawing exists for every field, and every subject gets the right one.
//
// Phosphor, like every other icon in the app, in its duotone weight. The few
// organs Phosphor does not draw — lungs, kidney, stomach, a molecule, a cell,
// a morula — are drawn here on its grid (256, stroke 16, round ends, the
// fill at a fifth), so they sit in the same family.

import {
  Heartbeat, Brain, HeadCircuit, Eye, Ear, Tooth, Hand, Scan, Drop, ShieldPlus, Virus, Bug,
  Ambulance, Pill, Scissors, Syringe, GenderFemale, Baby, Stethoscope, Dna, Leaf, TestTube,
  Diamond, Flask, Atom, ChartBar, Briefcase, Scales, UsersThree, Translate, Waveform, Bone,
  Skull, FirstAid, Microscope, BookOpenText, Biohazard,
} from '@phosphor-icons/react/dist/ssr';

const PHOSPHOR = {
  heart: Heartbeat, brain: Brain, mind: HeadCircuit, eye: Eye, ear: Ear, tooth: Tooth, skin: Hand,
  scan: Scan, drop: Drop, shield: ShieldPlus, virus: Virus, bug: Bug, ambulance: Ambulance,
  pill: Pill, scissors: Scissors, syringe: Syringe, female: GenderFemale, baby: Baby,
  stethoscope: Stethoscope, dna: Dna, leaf: Leaf, testtube: TestTube, crystal: Diamond,
  flask: Flask, atom: Atom, chart: ChartBar, briefcase: Briefcase, scales: Scales,
  people: UsersThree, language: Translate, wave: Waveform, bone: Bone, skull: Skull,
  firstaid: FirstAid, microscope: Microscope, book: BookOpenText, hazard: Biohazard,
};

// Drawn on Phosphor's grid. `f` is filled at the duotone's fifth, `s` is line.
const DRAWN = {
  lungs: {
    f: ['M98 76c-30 4-52 56-56 104-2 26 12 36 30 34 20-2 30-14 30-34V92c0-10-1-17-4-16Z',
        'M158 76c30 4 52 56 56 104 2 26-12 36-30 34-20-2-30-14-30-34V92c0-10 1-17 4-16Z'],
    s: ['M128 36v88', 'M128 124c0 16-12 26-26 32', 'M128 124c0 16 12 26 26 32'],
  },
  kidney: {
    f: ['M150 40c-52-8-96 34-96 92s40 92 86 84c30-5 38-34 20-52-12-12-12-32 0-44 20-20 26-74-10-80Z'],
    s: ['M160 164c14 10 22 30 22 58'],
  },
  stomach: {
    f: ['M104 32v38c0 22-22 32-32 56-18 44 12 90 64 88 52-2 80-50 64-86-8-18-30-22-40-6-8 12-12 28-30 28-14 0-20-14-16-34 4-18 14-30 14-46V32'],
    s: ['M196 176c10 6 18 16 22 30'],
  },
  molecule: {
    f: ['M128 64 180 94v60l-52 30-52-30V94Z'],
    s: ['M180 154l32 20', 'M128 64V36'],
    c: [[128, 64, 14], [180, 94, 14], [180, 154, 14], [128, 184, 14], [76, 154, 14], [76, 94, 14], [218, 178, 10], [128, 30, 10]],
  },
  cell: {
    f: ['M128 32c56 0 96 42 96 96s-40 96-96 96-96-42-96-96 40-96 96-96Z'],
    s: ['M164 176c10-8 24-8 32 0', 'M70 108c6-10 18-12 26-6'],
    c: [[136, 124, 30], [84, 164, 10]],
  },
  bacteria: {
    f: ['M84 172c-18-18-18-46 0-64l40-40c18-18 46-18 64 0s18 46 0 64l-40 40c-18 18-46 18-64 0Z'],
    s: ['M80 176l-18 18c-10 10-2 22-14 30', 'M176 80l18-18c10-10 2-22 14-30', 'M112 124l20-20', 'M128 152l20-20'],
  },
  morula: {
    f: ['M128 32c53 0 96 43 96 96s-43 96-96 96-96-43-96-96 43-96 96-96Z'],
    c: [[104, 104, 28], [152, 104, 28], [104, 152, 28], [152, 152, 28]],
  },
};

/** One subject's drawing, by its glyph key (lib/subjectArt.js `glyphOf`). */
//   weight  'duotone' (the default), or 'thin' for a drawing used as a
//           watermark, where a duotone's weight would shout.
export default function SubjectGlyph({ glyph, size = 24, weight = 'duotone', className, style }) {
  const P = PHOSPHOR[glyph] || (!DRAWN[glyph] && BookOpenText);
  if (P) return <P size={size} weight={weight} className={className} style={style} aria-hidden="true" />;
  const d = DRAWN[glyph];
  const fill = weight === 'thin' ? 'none' : 'currentColor';
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" stroke="currentColor"
         strokeWidth={weight === 'thin' ? 8 : 16} strokeLinecap="round" strokeLinejoin="round"
         className={className} style={style} aria-hidden="true">
      {(d.f || []).map((p) => <path key={p} d={p} fill={fill} fillOpacity=".2" />)}
      {(d.s || []).map((p) => <path key={p} d={p} />)}
      {(d.c || []).map(([x, y, r]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={fill} fillOpacity=".2" />)}
    </svg>
  );
}
