import PhotoHold from './PhotoHold';
import { BIG, SMALL } from '../data/wallAssets';

/**
 * Route hold used by the Wall section.
 *
 * This used to draw a hold as generated SVG. It now composites the real
 * photographs, but keeps the original prop shape (`size`, `animDelay`,
 * `animDuration`, `rotDeg`, …) so the Wall's layout numbers still mean the
 * same thing: `size` is a multiplier on an 82px base width.
 */

const LIBRARY = { ...BIG, ...SMALL };

/** Fallback when a hold has no `img` assigned yet. */
const NEUTRAL = SMALL.grey2;

export default function Hold({
  img,
  color = '#8C7E70',
  size = 1,
  glowColor = 'rgba(255,255,255,0.2)',
  isActive = false,
  isProjectHold = false,
  onClick,
  animDelay = 0,
  animDuration = 3,
  rotDeg = 0,
  flip = false,
}) {
  const asset = LIBRARY[img] ?? NEUTRAL;

  return (
    <PhotoHold
      hold={asset}
      width={Math.round(82 * size)}
      rot={rotDeg}
      flip={flip}
      floatDuration={animDuration}
      floatDelay={animDelay}
      glow={glowColor}
      active={isActive}
      interactive={isProjectHold}
      onClick={isProjectHold ? onClick : undefined}
      alt=""
      style={{ '--hold-color': color }}
    />
  );
}
