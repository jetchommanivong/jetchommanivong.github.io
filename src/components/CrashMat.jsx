import PhotoHold from './PhotoHold';
import { PROPS } from '../data/wallAssets';
import styles from './CrashMat.module.css';

/**
 * The crash mat at the base of a wall, with climbing gear resting on it.
 *
 * Shared by the hero and the project wall so both read as the same room. Each
 * item names a key in PROPS, an `x` position across the mat, and `sink` — how
 * far its base sits into the padding, since a chalk bag settles into a mat and
 * a pair of shoes does not.
 */
export default function CrashMat({ items = [], seam = '58%', height, className = '' }) {
  return (
    <div
      className={`${styles.mat} ${className}`}
      style={{ '--seam': seam, ...(height ? { '--mat-height': `${height}px` } : null) }}
      aria-hidden="true"
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={styles.item}
          style={{ '--x': `${item.x}%`, '--sink': `${item.sink ?? 14}px` }}
        >
          <PhotoHold
            hold={PROPS[item.prop]}
            width={item.width}
            rot={item.rot ?? 0}
            flip={item.flip}
            float={false}
          />
        </div>
      ))}
    </div>
  );
}
