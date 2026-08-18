import { motion } from 'framer-motion';
import WallPanel from './WallPanel';
import { POOLS, FEATURES } from '../data/wallAssets';
import styles from './Skills.module.css';

/* Matches .inner's max-width — the dressing goes in the margins beside it. */
const CONTENT = 1100;

const MAT = [{ prop: 'liquidChalk', x: 9, width: 36, rot: -5, sink: 10 }];

/* Grades are self-assessed and deliberately not all V4 — the honest spread is
   more convincing to an interviewer than a wall of maxed-out bars. */
const SKILLS = [
  { label: 'Research & Discovery', grade: 'V1', colour: 'var(--hold-teal)' },
  { label: 'Wireframing & Prototyping', grade: 'V2', colour: 'var(--hold-teal)' },
  { label: 'Visual / UI Design', grade: 'V3', colour: 'var(--hold-orange)' },
  { label: 'Figma', grade: 'V3', colour: 'var(--hold-orange)' },
  { label: 'Usability Testing', grade: 'V4', colour: 'var(--hold-purple)' },
  { label: 'Design Systems', grade: 'V4', colour: 'var(--hold-purple)' },
];

const TOOLS = [
  'Figma', 'Adobe Illustrator', 'Photoshop',
  'React', 'Vite', 'Firebase', 'HTML & CSS', 'Git',
];

export default function Skills() {
  return (
    <WallPanel
      id="skills"
      variant="arete"
      accent="var(--hold-orange)"
      seed={37}
      pool={POOLS.warm}
      featurePool={FEATURES.warm}
      featureCount={2}
      holdCount={6}
      contentWidth={CONTENT}
      matItems={MAT}
      className={styles.section}
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className="section-tag">Skills</p>
          <h2 className={styles.heading}>My grades</h2>
          <p className={styles.intro}>
            Climbers grade problems by how hard they are to send. These are mine.
          </p>
        </div>

        <div className={styles.columns}>
          <div>
            <div className={styles.skills}>
              {SKILLS.map((skill, i) => (
                <motion.div
                  key={skill.label}
                  className={styles.skillRow}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <span className={styles.skillLabel}>{skill.label}</span>
                  <span
                    className={styles.skillGrade}
                    style={{ '--grade': skill.colour }}
                  >
                    {skill.grade}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <p className={`section-tag ${styles.blockTitle}`}>Tools I use</p>
            <div className={styles.tools}>
              {TOOLS.map((tool) => (
                <span key={tool} className={styles.tool}>{tool}</span>
              ))}
            </div>

            <div className={styles.growing}>
              <p className={`section-tag ${styles.blockTitle}`}>Still projecting</p>
              <p>
                Illustrator, Front-end Development
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </WallPanel>
  );
}
