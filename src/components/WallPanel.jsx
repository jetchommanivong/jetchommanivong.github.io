import { useMemo } from 'react';
import PhotoHold from './PhotoHold';
import CrashMat from './CrashMat';
import { scatterGutter, scatterRect, volumeRect } from '../lib/scatter';
import styles from './WallPanel.module.css';

/**
 * One bouldering wall: a surface, its dressing, and the mat it lands on.
 *
 * Every section of the site stands on its own wall, and each wall is a
 * different angle — the way a real gym is built. `variant` drives the whole
 * visual character (lighting, seams, top edge, texture) from CSS:
 *
 *   slab      leans back, catches the most light, widest top cap
 *   overhang  kicks out overhead, shadowed along the top edge
 *   vertical  dead flat, evenly lit, regular panel grid
 *   arete     a prow — lit on one side of a centre crease, shaded on the other
 *   cave      deepest and darkest, light falling off toward the edges
 *
 * Decorative holds are generated rather than listed (see lib/scatter.js). Pass
 * `contentWidth` — the max-width of whatever the section centres inside — and
 * the holds are placed in the margins beside it, sized as a fraction of that
 * margin so they cannot reach the text at any viewport width. Walls whose
 * content spans the full width instead pass `keepOut` rects and get free
 * placement around them.
 *
 * Gear stays OFF most mats. Repeating the same chalk bag down the page reads
 * as copy-paste, so each wall gets at most one prop and no prop appears twice.
 */
export default function WallPanel({
  id,
  variant = 'vertical',
  accent = 'var(--hold-teal)',
  seed = 1,
  pool = [],
  holdCount = 8,
  featurePool = [],
  featureCount = 0,

  /* Gutter mode: px max-width of the centred content column. `holdCap` bounds
     how large a hold may get when the margin is deep — see WallPanel.module.css. */
  contentWidth = null,
  gutterPad = 48,
  holdCap = null,

  /* Rect mode: used only when `contentWidth` is not given. */
  keepOut = [],
  bounds,
  widths,
  featureWidths,
  wallSize,

  volumes = [],
  matItems = [],
  matHeight,
  matSeam,
  footer = null,
  children,
  className = '',
}) {
  const gutterMode = contentWidth !== null;

  const holds = useMemo(() => {
    if (gutterMode) {
      return scatterGutter({ seed, count: holdCount, pool, featurePool, featureCount });
    }
    // Volumes are dressing too, and holds must not be bolted on top of them.
    const rects = [...keepOut, ...volumes.map(v => volumeRect(v, wallSize))];
    return scatterRect({
      seed, count: holdCount, pool, featurePool, featureCount,
      keepOut: rects, bounds, widths, featureWidths, wallSize,
    });
  }, [gutterMode, seed, holdCount, pool, featurePool, featureCount,
      keepOut, volumes, bounds, widths, featureWidths, wallSize]);

  return (
    <section
      id={id}
      className={`${styles.panel} ${className}`}
      data-variant={variant}
      style={{
        '--accent': accent,
        ...(gutterMode ? { '--content': `${contentWidth}px`, '--pad': `${gutterPad}px` } : null),
        ...(holdCap ? { '--hold-cap': `${holdCap}px` } : null),
      }}
    >
      {/* Surface: shading, seams, and screw holes. Purely visual. */}
      <span className={styles.face} aria-hidden="true" />
      <span className={styles.cap} aria-hidden="true" />

      {/* Dressing sits behind the content and never takes a click. */}
      <div className={styles.dressing} aria-hidden="true">
        {volumes.map((v, i) => (
          <div
            key={`vol-${i}`}
            className={styles.volume}
            style={{ '--x': `${v.x}%`, '--y': `${v.y}%` }}
          >
            <PhotoHold hold={v.vol} width={v.width} rot={v.rot} flip={v.flip} float={false} />
          </div>
        ))}

        {holds.map((h, i) =>
          gutterMode ? (
            <div
              key={`sc-${i}`}
              className={styles.gutterHold}
              data-side={h.side}
              style={{ '--t': h.t, '--k': h.k, '--y': `${h.y}%` }}
            >
              <PhotoHold
                hold={h.hold}
                width="100%"
                rot={h.rot}
                flip={h.flip}
                floatDuration={2.8 + ((i * 37) % 14) / 10}
                floatDelay={-((i * 13) % 40) / 10}
              />
            </div>
          ) : (
            <div
              key={`sc-${i}`}
              className={styles.scatterHold}
              style={{ '--x': `${h.x}%`, '--y': `${h.y}%` }}
            >
              <PhotoHold
                hold={h.hold}
                width={h.width}
                rot={h.rot}
                flip={h.flip}
                floatDuration={2.8 + ((i * 37) % 14) / 10}
                floatDelay={-((i * 13) % 40) / 10}
              />
            </div>
          )
        )}
      </div>

      <div className={styles.body}>{children}</div>

      {/* The floor. Every wall gets one — it is what separates this wall from
          the next, and on the closing wall it carries the site footer. */}
      <CrashMat
        className={styles.mat}
        seam={matSeam}
        height={matHeight}
        items={matItems}
      >
        {footer}
      </CrashMat>
    </section>
  );
}
