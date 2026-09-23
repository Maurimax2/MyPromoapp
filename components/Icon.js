// One icon set: Phosphor, in its duotone weight.
//
// This used to be a hand-kept file of Lucide paths, one stroke weight, drawn
// thin — correct, and anonymous: every app built this year has the same line
// icons. Duotone is two tones of one colour, a quiet fill under a firm line,
// and in olive it is the thing that makes a screen read as MyPromo rather than
// as a template.
//
// The names are the app's own and did not change, so no screen had to: a
// call site still asks for `chev` or `swords`, and this file decides what that
// looks like. Imported from the `ssr` build, which carries no React context,
// so the same component draws in server components and client ones alike.

import {
  Archive, ArrowCounterClockwise, ArrowsClockwise, Atom, Baby, Bell, BookmarkSimple, BookOpenText, CalendarDots,
  CaretLeft, CaretRight, ChatCircle, ChatsCircle, Check, CheckCircle, ClockCountdown, CornersIn, CornersOut,
  Crosshair, Crown, Cube, DotsThree, DownloadSimple, Exam, Eye, EyeSlash, FileText, Fire, Flask, Gear, Heart,
  House, Image, Lightbulb, ListBullets, LockSimple, MagnifyingGlass, MagnifyingGlassMinus, MagnifyingGlassPlus, MapPin,
  Microscope, Minus, Notebook, Palette, PaperPlaneTilt, Person, Plus, ShieldCheck, SignOut, Sparkle, Sword,
  Trash, Trophy, User, VideoCamera, Warning, X, XCircle,
} from '@phosphor-icons/react/dist/ssr';

const ICONS = {
  home: House, book: BookOpenText, archive: Archive, user: User, search: MagnifyingGlass,
  // `chev` points the way you go in a right-to-left screen, `chevR` the way back.
  chev: CaretLeft, chevR: CaretRight,
  plus: Plus, minus: Minus, bell: Bell, heart: Heart, msg: ChatCircle, msgs: ChatsCircle,
  dots: DotsThree, clock: ClockCountdown, person: Person, flask: Flask, micro: Microscope,
  shield: ShieldCheck, atom: Atom, baby: Baby, alert: Warning, file: FileText,
  bookmark: BookmarkSimple, trash: Trash, settings: Gear, logout: SignOut, book2: Notebook,
  image: Image, send: PaperPlaneTilt, check: Check, x: X, quiz: Exam,
  zoomIn: MagnifyingGlassPlus, zoomOut: MagnifyingGlassMinus, expand: CornersOut, shrink: CornersIn,
  box: Cube, rotate: ArrowsClockwise, list: ListBullets, palette: Palette, focus: Crosshair,
  pin: MapPin, eye: Eye, eyeOff: EyeSlash, download: DownloadSimple, video: VideoCamera,
  award: Trophy, swords: Sword, calendar: CalendarDots, flame: Fire, crown: Crown, lock: LockSimple,
  sparkle: Sparkle, bulb: Lightbulb, again: ArrowCounterClockwise,
  // An answer marked: the circled forms, filled, so right and wrong read at a glance.
  right: CheckCircle, wrong: XCircle,
};

// A few read as a state rather than a picture, and a state wants the solid
// weight: a liked heart is filled.
const SOLID = { heartFill: Heart, right: CheckCircle, wrong: XCircle };

// …and a few are marks rather than pictures. A duotone caret fills its own
// triangle and reads as a heavy arrowhead; these want a clean line.
const LINE = new Set(['chev', 'chevR', 'x', 'check', 'plus', 'minus']);

export default function Icon({ name, size = 20, weight, stroke, ...rest }) {
  void stroke;   // the old line icons took a stroke width; duotone has none
  const Solid = SOLID[name];
  const Glyph = Solid || ICONS[name];
  if (!Glyph) return null;
  const w = Solid ? 'fill' : (weight || (LINE.has(name) ? 'bold' : 'duotone'));
  return <Glyph size={size} weight={w} aria-hidden="true" {...rest} />;
}
