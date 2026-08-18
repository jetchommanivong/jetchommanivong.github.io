import WallPanel from './WallPanel';
import { POOLS, FEATURES } from '../data/wallAssets';
import styles from './About.module.css';

const INTERESTS = ['Bouldering', 'Photography', 'UX Design', 'Typography', 'Creative Direction'];

/* Matches .inner's max-width — the dressing goes in the margins beside it. */
const CONTENT = 1100;

/* No gear on this mat. There are only five props and six walls, so one of them
   has to stay bare — and the slab is the one whose copy runs widest. */

export default function About() {
  return (
    <WallPanel
      id="about"
      variant="slab"
      accent="var(--hold-purple)"
      seed={11}
      pool={POOLS.violet}
      featurePool={FEATURES.violet}
      featureCount={2}
      holdCount={5}
      contentWidth={CONTENT}
      className={styles.section}
    >
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={styles.heading}>About Me</h2>
          <p className={styles.bio}>
            Final-year IT student at UQ specialising in UX Design, with a genuine
            passion for accessible and inclusive design. From my deep experience as a
            specialist support worker, I understand how people experience digital and physical environments differently.
            Learn how I use this background to inform my design decisions below.
          </p>

          <div className={styles.interests}>
            {INTERESTS.map((interest) => (
              <span key={interest} className={styles.interestTag}>
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.photoBlock}>
            <div className={styles.photoPlaceholder}>
              <span className={styles.photoIcon}>⬡</span>
              <p>Drop a photo of yourself here</p>
            </div>
          </div>
        </div>
      </div>
    </WallPanel>
  );
}
