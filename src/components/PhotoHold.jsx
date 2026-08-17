import { motion } from 'framer-motion';
import styles from './PhotoHold.module.css';

/**
 * Renders one photographed hold.
 *
 * Layout is deliberately left to the caller — this component only draws the
 * hold and owns its three transform layers, which have to stay separate:
 * the float animation, the resting rotation, and the hover scale would
 * otherwise overwrite one another on a single `transform`.
 *
 * `hold` is an entry from data/wallAssets ({ src, w, h }); `width` is the
 * rendered CSS width in px. Height follows the photo's real aspect ratio.
 */
export default function PhotoHold({
  hold,
  width,
  alt = '',
  rot = 0,
  flip = false,
  float = true,
  floatDuration = 3.2,
  floatDelay = 0,
  glow = null,
  active = false,
  interactive = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
  className = '',
  style,
}) {
  const height = Math.round((width * hold.h) / hold.w);

  const restShadow = 'drop-shadow(0 5px 9px rgba(28, 22, 16, 0.34))';
  const filter =
    active && glow
      ? `${restShadow} drop-shadow(0 0 12px ${glow}) drop-shadow(0 0 26px ${glow})`
      : restShadow;

  return (
    <div className={`${styles.wrap} ${className}`} style={style}>
      <div
        className={float ? styles.float : styles.still}
        style={{
          '--rot': `${rot}deg`,
          animationDuration: `${floatDuration}s`,
          animationDelay: `${floatDelay}s`,
        }}
      >
        <motion.div
          className={styles.inner}
          whileHover={interactive ? { scale: 1.08 } : undefined}
          whileTap={interactive ? { scale: 0.96 } : undefined}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
        >
          <img
            className={styles.img}
            src={hold.src}
            alt={alt}
            width={width}
            height={height}
            draggable={false}
            loading="lazy"
            decoding="async"
            style={{
              width,
              height,
              filter,
              transform: flip ? 'scaleX(-1)' : undefined,
            }}
          />
          {children}
        </motion.div>
      </div>
    </div>
  );
}
