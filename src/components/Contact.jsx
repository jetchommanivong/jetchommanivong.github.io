import { motion } from 'framer-motion';
import WallPanel from './WallPanel';
import { POOLS, FEATURES } from '../data/wallAssets';
import styles from './Contact.module.css';

/* Matches .inner's max-width. This is the narrowest column on the site, which
   leaves the deepest margins — so this wall needs the FEWEST holds, not the
   most. It closes the page and sits directly above the footer; a crowded wall
   here reads as noise rather than as a closing note. */
const CONTENT = 700;

const MAT = [{ prop: 'carabiner', x: 92, width: 30, rot: 74, sink: 8 }];

/* The last wall in the gym — you land here, so this mat is the site footer. */
const FOOTER = (
  <div className={styles.footer}>
    <p>Designed &amp; built by Jet Chommanivong · {new Date().getFullYear()}</p>
    <p className={styles.footerSub}>UX Design · Bachelor of IT</p>
  </div>
);

export default function Contact() {
  return (
    <WallPanel
      id="contact"
      variant="cave"
      accent="var(--hold-blue)"
      seed={53}
      pool={POOLS.cool}
      featurePool={FEATURES.cool}
      featureCount={1}
      holdCount={4}
      contentWidth={CONTENT}
      holdCap={104}
      matItems={MAT}
      matHeight={96}
      footer={FOOTER}
      className={styles.section}
    >
      <div className={styles.inner}>
        <motion.p
          className="section-tag"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Contact
        </motion.p>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Start a route
          <br />
          <span className={styles.headingAccent}>together</span>
        </motion.h2>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Whether it's a project, an opportunity, or just a conversation —
          I'm always up for it.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <a href="mailto:jetchommanivong@gmail.com" className={styles.emailBtn}>
            Say hello
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className={styles.linkedinLink}
          >
            LinkedIn ↗
          </a>
        </motion.div>
      </div>
    </WallPanel>
  );
}
