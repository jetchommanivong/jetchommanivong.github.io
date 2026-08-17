import styles from './About.module.css';

const INTERESTS = ['Bouldering', 'Photography', 'UX Design', 'Typography', 'Creative Direction'];

export default function About() {
  return (
    <section id="about" className={styles.section}>
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
    </section>
  );
}
