import { motion } from 'framer-motion';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
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

      <footer className={styles.footer}>
        <p>Designed & built by Jet Chommanivong · {new Date().getFullYear()}</p>
        <p className={styles.footerSub}>UX Design · Bachelor of IT</p>
      </footer>
    </section>
  );
}
