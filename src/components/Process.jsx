import { motion } from 'framer-motion';
import WallPanel from './WallPanel';
import { POOLS, FEATURES } from '../data/wallAssets';
import styles from './Process.module.css';

/* Matches .inner's max-width — the dressing goes in the margins beside it. */
const CONTENT = 1100;

/* Placeholder copy — rewrite each step in your own words before you send this
   to anyone. The structure is what matters here, not the wording. */
const STEPS = [
  {
    step: 'Discover',
    colour: 'var(--hold-purple)',
    body: 'I start by reading the problem from every angle — talking to the client, mapping who they serve, and auditing what already exists. Nothing gets designed until I can state the problem in one sentence.',
  },
  {
    step: 'Define',
    colour: 'var(--hold-yellow)',
    dark: true,
    body: 'Research turns into decisions: user flows, a content structure, and a short list of things the design must do. This is where scope gets honest.',
  },
  {
    step: 'Ideate',
    colour: 'var(--hold-teal)',
    body: 'Fast, cheap, and plenty of them — sketches and low-fidelity wireframes explore the layout options before any pixel is committed to.',
  },
  {
    step: 'Prototype',
    colour: 'var(--hold-orange)',
    body: 'The chosen direction becomes an interactive Figma prototype with a real component system, so it can be clicked through rather than described.',
  },
  {
    step: 'Test',
    colour: 'var(--hold-blue)',
    body: 'I put the prototype in front of real users, watch where they hesitate, and iterate. Most of the best decisions in my projects came out of this step.',
  },
  {
    step: 'Ship',
    colour: 'var(--hold-purple)',
    body: 'Build, hand off, and stay involved through launch — then keep measuring, because a shipped design is a first attempt, not a finish line.',
  },
];

export default function Process() {
  return (
    <WallPanel
      id="process"
      variant="vertical"
      accent="var(--hold-teal)"
      seed={23}
      pool={POOLS.cool}
      featurePool={FEATURES.cool}
      featureCount={2}
      holdCount={6}
      contentWidth={CONTENT}
      className={styles.section}
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className="section-tag">Process</p>
          <h2 className={styles.heading}>Reading the route</h2>
          <p className={styles.intro}>
            Every problem gets worked the same way a boulder problem does — read
            it from the ground, try the moves, fall off, adjust, and go again
            until the sequence clicks.
          </p>
        </div>

        <ol className={styles.steps}>
          {STEPS.map((item, i) => (
            <motion.li
              key={item.step}
              className={`${styles.step} ${item.dark ? styles.stepDark : ''}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <span className={styles.marker} style={{ '--step': item.colour }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className={styles.stepBody}>
                <h3>{item.step}</h3>
                <p>{item.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </WallPanel>
  );
}
