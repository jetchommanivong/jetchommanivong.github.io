import PhotoHold from './PhotoHold';
import { PROPS } from '../data/wallAssets';
import styles from './CrashMat.module.css';

/**
 * The crash mat at the base of a wall, with climbing gear resting on it.
 *
 * Every wall stands on one, so the mats are what separate one wall from the
 * next. Each item names a key in PROPS, an `x` position across the mat, and
 * `sink` — how far its base sits into the padding, since a chalk bag settles
 * into a mat and a pair of shoes does not.
 *
 * `children` turns the mat into real content — the closing wall puts the site
 * footer on it. The gear is always decorative, so it stays hidden from
 * assistive tech either way, but the mat itself must not be when it carries
 * text someone needs to read.
 */
export default function CrashMat({
  items = [],
  seam = '58%',
  height,
  className = '',
  children = null,
}) {
  return (
    <div
      className={`${styles.mat} ${children ? styles.matFooter : ''} ${className}`}
      style={{ '--seam': seam, ...(height ? { '--mat-height': `${height}px` } : null) }}
      {...(children ? null : { 'aria-hidden': 'true' })}
    >
      <div className={styles.props} aria-hidden="true">
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

      {children}
    </div>
  );
}
