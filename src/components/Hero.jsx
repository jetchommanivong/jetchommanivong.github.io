import { useState } from 'react';
import { motion } from 'framer-motion';
import PhotoHold from './PhotoHold';
import CrashMat from './CrashMat';
import { sections, scatter, volumes, PROPS } from '../data/wallAssets';
import { useRouteGeometry, buildConnector } from '../lib/route';
import styles from './Hero.module.css';

/* ── Decorative props ────────────────────────────────────────────────────── */

/* The cord and knot stay drawn — a rope is simple geometry. The carabiner is
   the photographed one, since hardware drawn in SVG reads as a cartoon next to
   the photographed holds. */
function Rope() {
  return (
    <div className={styles.rope} aria-hidden="true">
      <svg className={styles.ropeCord} viewBox="0 0 60 262" fill="none">
        <path
          d="M22 0 C 18 60, 30 110, 26 170 C 23 205, 30 226, 28 244"
          stroke="#6B4E9E" strokeWidth="9" strokeLinecap="round"
        />
        <path
          d="M22 0 C 18 60, 30 110, 26 170 C 23 205, 30 226, 28 244"
          stroke="rgba(255,255,255,0.22)" strokeWidth="3" strokeLinecap="round"
          strokeDasharray="7 11"
        />
        {/* Tied-off knot above the clip */}
        <ellipse cx="28" cy="252" rx="15" ry="11" fill="#5C4189" />
        <ellipse cx="28" cy="249" rx="15" ry="8" fill="#6B4E9E" />
        <path d="M15 250 C 22 244, 34 244, 41 250" stroke="rgba(0,0,0,0.25)" strokeWidth="2.5" />
      </svg>

      <PhotoHold
        hold={PROPS.carabiner}
        width={42}
        rot={3}
        float={false}
        className={styles.carabiner}
      />
    </div>
  );
}

function ChalkBoard() {
  return (
    <div className={styles.chalkboard} aria-hidden="true">
      <ul>
        <li><span>◇</span>User-centred problem solver</li>
        <li><span>◎</span>Accessible designer</li>
        <li><span>◈</span>Collaborative team player</li>
      </ul>
      <span className={styles.chalkHeart}>♥</span>
    </div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */

/* Clearance between a hold's edge and its note, in px. Constant at every
   viewport width, which is the point of measuring rather than using percentages. */
const NOTE_GAP = 22;

/**
 * Places a note against one edge of its measured hold.
 *
 * The returned anchor is a translate percentage that pulls the note's *near*
 * edge onto that point, so the note's own width and height never need to be
 * known here — they change at breakpoints, and duplicating them in JS would
 * mean two places to keep in sync.
 */
function placeNote(point, section) {
  const dx = section.noteDX ?? 0;
  const dy = section.noteDY ?? 0;

  switch (section.noteSide) {
    case 'left':
      return { x: point.x - point.halfW - NOTE_GAP, y: point.y + dy, ax: '-100%', ay: '-50%' };
    case 'below':
      return { x: point.x + dx, y: point.y + point.halfH + NOTE_GAP, ax: '-50%', ay: '0%' };
    default:
      return { x: point.x + point.halfW + NOTE_GAP, y: point.y + dy, ax: '0%', ay: '-50%' };
  }
}

export default function Hero() {
  const [activeId, setActiveId] = useState(null);
  const { wallRef, holdRefs, geometry, remeasure } = useRouteGeometry(sections.length);

  const goTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const connectors = sections.slice(0, -1).map((section, i) => {
    const a = geometry.points[i];
    const b = geometry.points[i + 1];
    if (!a || !b) return null;
    return {
      id: section.id,
      colour: section.colour,
      ...buildConnector(a, b, i % 2 === 0 ? 1 : -1),
    };
  });

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.grain} />

      <div className={styles.wall} ref={wallRef}>
        {/* Grey volumes sit furthest back */}
        {volumes.map((v, i) => (
          <div
            key={`vol-${i}`}
            className={styles.volume}
            style={{ '--x': `${v.x}%`, '--y': `${v.y}%` }}
          >
            <PhotoHold
              hold={v.vol}
              width={v.width}
              rot={v.rot}
              flip={v.flip}
              float={false}
            />
          </div>
        ))}

        {/* Decorative holds */}
        {scatter.map((s, i) => (
          <div
            key={`sc-${i}`}
            className={styles.scatterHold}
            style={{ '--x': `${s.x}%`, '--y': `${s.y}%` }}
          >
            <PhotoHold
              hold={s.hold}
              width={s.width}
              rot={s.rot}
              flip={s.flip}
              floatDuration={2.6 + ((i * 37) % 16) / 10}
              floatDelay={-((i * 13) % 40) / 10}
            />
          </div>
        ))}

        <Rope />

        {/* Dashed route between the numbered holds */}
        <svg
          className={styles.routeLines}
          width={geometry.w}
          height={geometry.h}
          viewBox={`0 0 ${geometry.w || 1} ${geometry.h || 1}`}
          aria-hidden="true"
        >
          {connectors.map((c) =>
            c?.d ? (
              <g
                key={c.id}
                style={{
                  opacity: activeId === null || activeId === c.id ? 1 : 0.35,
                  transition: 'opacity 0.25s ease',
                }}
              >
                <path
                  d={c.d}
                  fill="none"
                  stroke={c.colour}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="13 12"
                />
                <polygon
                  points="0,-7 13,0 0,7"
                  fill={c.colour}
                  transform={`translate(${c.tip.x} ${c.tip.y}) rotate(${c.angle})`}
                />
              </g>
            ) : null
          )}
        </svg>

        {/* The five numbered section holds */}
        {sections.map((section, i) => (
          <div
            key={section.id}
            ref={(el) => { holdRefs.current[i] = el; }}
            className={styles.routeHold}
            style={{ '--x': `${section.x}%`, '--y': `${section.y}%` }}
            onMouseEnter={() => setActiveId(section.id)}
            onMouseLeave={() => setActiveId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.35 + i * 0.11, ease: 'easeOut' }}
              onAnimationComplete={remeasure}
            >
              <PhotoHold
                hold={section.hold}
                width={section.width}
                rot={section.rot}
                alt={`${section.label} — climbing hold`}
                glow={`${section.colour}aa`}
                active={activeId === section.id}
                interactive
                floatDuration={3 + i * 0.24}
                floatDelay={-i * 0.7}
                onClick={() => goTo(section.id)}
              >
                <button
                  className={styles.holdLabel}
                  style={{
                    '--lx': `${section.labelOffset.x}px`,
                    '--ly': `${section.labelOffset.y}px`,
                  }}
                  onClick={() => goTo(section.id)}
                >
                  <span className={styles.holdNum}>{section.num}</span>
                  <span className={styles.holdName}>{section.label}</span>
                </button>
              </PhotoHold>
            </motion.div>
          </div>
        ))}

        {/* Taped notes, pinned a fixed gap from their hold's measured edge */}
        {sections.map((section, i) => {
          const point = geometry.points[i];
          if (!point) return null;

          const place = placeNote(point, section);

          return (
            <motion.div
              key={`note-${section.id}`}
              className={styles.note}
              style={{
                '--nx': `${Math.round(place.x)}px`,
                '--ny': `${Math.round(place.y)}px`,
                '--ax': place.ax,
                '--ay': place.ay,
                '--tilt': `${i % 2 === 0 ? -1.4 : 1.2}deg`,
              }}
              /* Opacity only — animating `y` here would make Framer Motion write
                 an inline `transform`, silently overriding the anchoring and
                 tilt that .note sets in CSS. */
              initial={{ opacity: 0 }}
              animate={{ opacity: activeId === null || activeId === section.id ? 1 : 0.5 }}
              transition={{ duration: 0.4, delay: 0.55 + i * 0.11 }}
              onMouseEnter={() => setActiveId(section.id)}
              onMouseLeave={() => setActiveId(null)}
              onClick={() => goTo(section.id)}
            >
              <span className={styles.noteTape} style={{ background: section.colour }} />
              <p>{section.note}</p>
            </motion.div>
          );
        })}

        <ChalkBoard />

        {/* Headline block */}
        <div className={styles.content}>
          <motion.p
            className={styles.greeting}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hi, I'm
          </motion.p>

          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            Jet Chommanivong
          </motion.h1>

          <motion.p
            className={styles.role}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
          >
            UX Designer
          </motion.p>

          <motion.span
            className={styles.rule}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.45, delay: 0.34 }}
          />

          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42 }}
          >
            I design intuitive digital experiences that help people and
            businesses achieve more.
          </motion.p>

          <motion.button
            className={styles.cta}
            onClick={() => goTo('work')}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.52 }}
            whileHover={{ x: 4 }}
          >
            VIEW MY WORK
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
              <path
                d="M1 6h15M11 1l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Crash mat along the base, with the chalk bag and brush from the brief */}
      <CrashMat
        items={[
          { prop: 'chalkBag', x: 9,    width: 118, rot: -2, sink: 24 },
          { prop: 'brush',    x: 16.5, width: 78,  rot: -7, sink: 6 },
        ]}
      />
    </section>
  );
}
