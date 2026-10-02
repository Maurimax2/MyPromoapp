// The streak flame, alive.
//
// It flickers, and how it burns says how long the streak is: a small orange
// one for the first days, a larger one with an ember rising once the week is
// done, a gold one with an aura at a month, a white-hot one at a hundred.
// The thresholds are the badges' own (lib/points.js), so the flame and the
// shelf tell the same story. A streak of nothing is a flame that is out:
// still, grey, no glow.
//
// It is only CSS — a transform on a glyph and a shadow — so a screen with
// thirty of them (the leaderboard) costs nothing, and reduced motion stops it.

import Icon from '@/components/Icon';

const tier = (n) => (n >= 100 ? 4 : n >= 30 ? 3 : n >= 7 ? 2 : n > 0 ? 1 : 0);

export default function Flame({ streak = 1, size = 14, className = '' }) {
  const t = tier(streak);
  return (
    <span className={`flame f${t} ${className}`.trim()} aria-hidden="true">
      <Icon name="flame" size={size} weight="fill" />
      {t >= 2 && <i className="flame-ember" />}
    </span>
  );
}
