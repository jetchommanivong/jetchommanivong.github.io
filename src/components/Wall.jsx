import { useState } from 'react';
import { motion } from 'framer-motion';
import Hold from './Hold';
import PhotoHold from './PhotoHold';
import CrashMat from './CrashMat';
import { projects } from '../data/projects';
import { wallScatter, wallVolumes } from '../data/wallAssets';
import { useRouteGeometry, buildConnector } from '../lib/route';
import styles from './Wall.module.css';

/* Flat index of a hold across all routes — the geometry hook keeps one array. */
const holdIndex = (projectIndex, holdIdx) =>
  projects.slice(0, projectIndex).reduce((n, p) => n + p.holds.length, 0) + holdIdx;

const TOTAL_HOLDS = projects.reduce((n, p) => n + p.holds.length, 0);

/* ── Wall dressing ───────────────────────────────────────────────────────── */

function WallVolume({ x, y, vol, width, rot = 0, flip = false }) {
  return (
    <div className={styles.volume} style={{ '--x': `${x}%`, '--y': `${y}%` }}>
      <PhotoHold hold={vol} width={width} rot={rot} flip={flip} float={false} />
    </div>
  );
}

/* ── Sticky note card pinned next to each route ─────────────────────────── */
/* `dimmed` means *another* route is hovered. At rest the note stays fully
   opaque — anything less lets the holds behind it show through the paper. */
function StickyNote({ project, onProjectClick, dimmed, tilt }) {
  return (
    <motion.div
      className={styles.stickyNote}
      style={{ left: `${project.noteX}%`, top: `${project.noteY}%`, '--tilt': `${tilt}deg` }}
      animate={{ opacity: dimmed ? 0.55 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.noteTape} style={{ background: project.color }} />
      <p className={styles.noteGrade} style={{ color: project.color }}>{project.grade}</p>
      <h3 className={styles.noteName}>{project.name}</h3>
      <p className={styles.noteDesc}>{project.tagline}</p>
      <button
        className={styles.noteLink}
        style={{ color: project.color }}
        onClick={() => onProjectClick(project)}
      >
        View case study →
      </button>
    </motion.div>
  );
}

/* ── Main component ──────────────────────────────────────────────────────── */
export default function Wall({ onProjectClick }) {
  const [hoveredHold, setHoveredHold] = useState(null);
  const hoveredProject = hoveredHold?.projectId ?? null;
  const { wallRef, holdRefs, geometry } = useRouteGeometry(TOTAL_HOLDS);

  // One connector per gap in each route, in the wall's own pixel space.
  const connectors = projects.flatMap((project, pi) =>
    project.holds.slice(0, -1).map((_, i) => {
      const a = geometry.points[holdIndex(pi, i)];
      const b = geometry.points[holdIndex(pi, i + 1)];
      if (!a || !b) return null;
      return {
        key: `${project.id}-${i}`,
        projectId: project.id,
        colour: project.color,
        ...buildConnector(a, b, i % 2 === 0 ? 1 : -1),
      };
    }).filter(Boolean)
  );

  const getRandomAnim = (seed) => ({
    delay: ((seed * 137.5) % 5) * -1,
    duration: 2.5 + ((seed * 73) % 2),
    rot: (((seed * 43) % 12) - 6),
  });

  return (
    <section id="work" className={styles.section}>
      <div className={styles.header}>
        <p className="section-tag">Portfolio</p>
        <div className={styles.headingRow}>
          <h2 className={styles.heading}>The Wall</h2>
        </div>
        <p className={styles.subheading}>
          Hover each hold to follow the process · Click the note to open the case study
        </p>
      </div>

      <div className={styles.wall} ref={wallRef}>

        {/* Background wall volumes */}
        {wallVolumes.map((vol, i) => (
          <WallVolume key={`vol-${i}`} {...vol} />
        ))}

        {/* Decorative holds — the wall the routes are set on */}
        {wallScatter.map((s, i) => (
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

        {/* Curved dashed route lines */}
        <svg
          className={styles.routeLines}
          width={geometry.w}
          height={geometry.h}
          viewBox={`0 0 ${geometry.w || 1} ${geometry.h || 1}`}
          aria-hidden="true"
        >
          {connectors.map((c) =>
            c.d ? (
              <g
                key={c.key}
                style={{
                  opacity: hoveredProject === c.projectId ? 0.95 : 0.4,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <path
                  d={c.d}
                  fill="none"
                  stroke={c.colour}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="11 10"
                />
                <polygon
                  points="0,-6 11,0 0,6"
                  fill={c.colour}
                  transform={`translate(${c.tip.x} ${c.tip.y}) rotate(${c.angle})`}
                />
              </g>
            ) : null
          )}
        </svg>


        {/* Project route holds */}
        {projects.map((project, pi) =>
          project.holds.map((hold, i) => {
            const anim = getRandomAnim(pi * 20 + i);
            const isRouteActive = hoveredProject === project.id;
            const isThisHold = hoveredHold?.projectId === project.id && hoveredHold?.holdIndex === i;
            const stepNum = String(i + 1).padStart(2, '0');

            return (
              <div
                key={`${project.id}-${i}`}
                ref={(el) => { holdRefs.current[holdIndex(pi, i)] = el; }}
                className={styles.holdWrapper}
                style={{
                  left: `${hold.x}%`,
                  top: `${hold.y}%`,
                  zIndex: isThisHold ? 10 : 2,
                }}
                onMouseEnter={() => setHoveredHold({ projectId: project.id, holdIndex: i })}
                onMouseLeave={() => setHoveredHold(null)}
              >
                {isThisHold && hold.label && (
                  <motion.div
                    className={styles.holdTooltip}
                    style={{ borderColor: `${project.color}55` }}
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.14, ease: 'easeOut' }}
                  >
                    <span className={styles.stepBadge} style={{ background: project.color }}>
                      {stepNum}
                    </span>
                    <div className={styles.stepText}>
                      <span className={styles.stepLabel}>{hold.label}</span>
                      {hold.sub && <span className={styles.stepSub}>{hold.sub}</span>}
                    </div>
                  </motion.div>
                )}

                <Hold
                  img={hold.img}
                  color={project.color}
                  glowColor={project.glow}
                  size={hold.size}
                  flip={hold.flip}
                  isActive={isRouteActive}
                  isProjectHold
                  onClick={() => onProjectClick(project)}
                  animDelay={anim.delay}
                  animDuration={anim.duration}
                  rotDeg={anim.rot}
                />
              </div>
            );
          })
        )}

        {/* Route grade labels — shown at the TOP hold (the summit) */}
        {projects.map((project) => {
          const topHold = project.holds[project.holds.length - 1];
          const isActive = hoveredProject === project.id;
          const dimmed = hoveredProject !== null && !isActive;
          return (
            <motion.div
              key={`label-${project.id}`}
              className={styles.routeLabel}
              style={{
                left: `${topHold.x}%`,
                top: `calc(${topHold.y}% + 52px)`,
                borderColor: project.color,
                color: isActive ? project.color : 'var(--chalk-2)',
              }}
              animate={{ opacity: dimmed ? 0.45 : 1 }}
              transition={{ duration: 0.25 }}
            >
              <span className={styles.grade} style={{ background: project.color }}>
                {project.grade}
              </span>
              <span className={styles.routeName}>{project.name}</span>
            </motion.div>
          );
        })}

        {/* Sticky notes */}
        {projects.map((project, i) => (
          <StickyNote
            key={`note-${project.id}`}
            project={project}
            onProjectClick={onProjectClick}
            dimmed={hoveredProject !== null && hoveredProject !== project.id}
            tilt={i % 2 === 0 ? -1.4 : 1.1}
          />
        ))}

        {/* The floor, so the wall reads as a room rather than a diagram */}
        <CrashMat
          className={styles.mat}
          seam="41%"
          items={[
            { prop: 'shoes',       x: 11, width: 132, rot: -3, sink: 12 },
            { prop: 'chalkBag',    x: 24, width: 112, rot: 2,  sink: 22 },
            { prop: 'brush',       x: 31, width: 72,  rot: 9,  sink: 4 },
            // Right of the seam, so the far half of the mat is not bare
            { prop: 'carabiner',   x: 68, width: 30,  rot: 74, sink: 6 },
            { prop: 'liquidChalk', x: 87, width: 34,  rot: -4, sink: 8 },
          ]}
        />
      </div>
    </section>
  );
}
