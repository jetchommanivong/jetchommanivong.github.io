import { useState, useEffect } from 'react';
import PhotoHold from './PhotoHold';
import { sections } from '../data/wallAssets';
import styles from './Nav.module.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <button className={styles.logo} onClick={() => handleNav('home')}>
        JET
      </button>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        {sections.map((section, i) => (
          <li key={section.id}>
            <button
              className={styles.chip}
              style={{ '--chip': section.colour }}
              onClick={() => handleNav(section.id)}
            >
              <PhotoHold
                hold={section.chip}
                width={section.chipWidth}
                rot={i % 2 === 0 ? -4 : 5}
                flip={i % 3 === 0}
                float={false}
                className={styles.chipHold}
              />
              <span className={styles.chipLabel}>{section.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <button
        className={styles.burger}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
