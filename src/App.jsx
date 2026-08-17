import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS } from './data/projects'
import CaseStudy from './components/CaseStudy'
import './App.css'

/* ── Nav ─────────────────────────────────────────────────────────────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const goto = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <button className="nav__logo" onClick={() => goto('home')}>
          Jet Chommanivong
        </button>
        <ul className="nav__links">
          <li><button onClick={() => goto('work')}>Work</button></li>
          <li><button onClick={() => goto('about')}>About</button></li>
          <li>
            <a href="mailto:jetchommanivong@gmail.com" className="nav__cta">
              Get in touch
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

/* ── Hero ────────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <motion.p
            className="hero__label"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            UX Design · University of Queensland
          </motion.p>

          <motion.h1
            className="hero__name"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Hi, I'm Jet.
            <br />
            <span className="hero__accent">I design for people.</span>
          </motion.h1>

          <motion.p
            className="hero__bio"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            Final-year IT student at UQ specialising in UX Design, with a genuine
            passion for accessible and inclusive design. From my deep experience as a
            specialist support worker, I understand how people experience digital and physical environments differently.
            Learn how I use this background to inform my design decisions below.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              className="btn btn--primary"
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View work
            </button>
            <a href="mailto:jetchommanivong@gmail.com" className="btn btn--ghost">
              Say hello
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── Project card ────────────────────────────────────────────────────────── */

function ProjectCard({ project, index, onOpen }) {
  const sectionCount = project.sections?.length ?? 0

  return (
    <motion.article
      className="project-card"
      style={{ '--project-color': project.color }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Decorative — the whole card is covered by one hit area below */}
      <div className="project-card__media">
        <img src={project.cover} alt="" loading="lazy" />
        <span className="project-card__media-tint" />
      </div>

      <div className="project-card__content">
        <div className="project-card__meta">
          <span className="project-card__role">{project.role}</span>
        </div>

        <h3 className="project-card__name">
          <button className="project-card__link" onClick={onOpen}>
            {project.name}
            <span className="project-card__hit" />
          </button>
        </h3>

        <p className="project-card__tagline">{project.tagline}</p>
        <p className="project-card__desc">{project.description}</p>

        {project.highlights?.length > 0 && (
          <ul className="project-card__highlights">
            {project.highlights.map(h => (
              <li key={h} className="project-card__highlight">{h}</li>
            ))}
          </ul>
        )}

        <div className="project-card__tools">
          {project.tools.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        <div className="project-card__footer">
          <span className="project-card__cta">Read the case study</span>
          <span className="project-card__count">
            {sectionCount} chapters · {project.outcome}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

/* ── Work section ────────────────────────────────────────────────────────── */

const idFromHash = () => {
  const match = window.location.hash.match(/^#case\/(.+)$/)
  return match ? match[1] : null
}

function Work() {
  const [openId, setOpenId] = useState(idFromHash)

  /* Back / forward buttons and pasted links both resolve through the hash */
  useEffect(() => {
    const sync = () => setOpenId(idFromHash())
    window.addEventListener('hashchange', sync)
    window.addEventListener('popstate', sync)
    return () => {
      window.removeEventListener('hashchange', sync)
      window.removeEventListener('popstate', sync)
    }
  }, [])

  const open = useCallback((id) => {
    window.history.pushState(null, '', `#case/${id}`)
    setOpenId(id)
  }, [])

  const close = useCallback(() => {
    window.history.pushState(null, '', window.location.pathname + window.location.search)
    setOpenId(null)
  }, [])

  const selectedIndex = PROJECTS.findIndex(p => p.id === openId)
  const selected = selectedIndex >= 0 ? PROJECTS[selectedIndex] : null
  const nextProject = selected ? PROJECTS[(selectedIndex + 1) % PROJECTS.length] : null

  return (
    <section id="work" className="section work">
      <div className="container">
        <div className="section__header">
          <h2 className="section__title">Selected Work</h2>
        </div>

        <div className="project-list">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => open(p.id)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <CaseStudy
            key={selected.id}
            project={selected}
            nextProject={nextProject !== selected ? nextProject : null}
            onClose={close}
            onNavigate={open}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

/* ── About ───────────────────────────────────────────────────────────────── */

function About() {
  const skills = [
    { label: 'UX Research',          note: 'Interviews, usability tests, synthesis' },
    { label: 'Interaction Design',   note: 'Wireframes, prototypes, flows'          },
    { label: 'UI Design',            note: 'Figma, design systems, visual polish'   },
    { label: 'Frontend Development', note: 'React, Vite, CSS'                       },
    { label: 'User Testing',         note: 'Moderated sessions, iteration'          },
  ]

  return (
    <section id="about" className="section about">
      <div className="container about__inner">
        <motion.div
          className="about__left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section__title">About</h2>
          <p className="about__bio">
            I'm a final-year IT student at the University of Queensland
            specialising in User Experience Design, with a genuine passion for
            accessible and inclusive design.
          </p>

          <div className="about__callout">
            <p>
              Alongside my studies I work as a specialist support worker,
              primarily with a client with visual impairment. This has given me
              a deeper understanding of how people experience digital and
              physical environments differently — something that isn't taught
              in school.
            </p>
          </div>

          <p className="about__bio">
            That lived context shapes everything I design. Accessibility isn't
            a checklist for me — it's the starting point.
          </p>

          <div className="about__edu">
            <p className="about__edu-label">Education</p>
            <p>Bachelor of Information Technology — UX Design Major</p>
            <p className="about__edu-year">University of Queensland · Graduating 2026</p>
          </div>
        </motion.div>

        <motion.div
          className="about__right"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <p className="about__skills-label">What I do</p>
          <ul className="skill-list">
            {skills.map(s => (
              <li key={s.label} className="skill-row">
                <span className="skill-row__name">{s.label}</span>
                <span className="skill-row__note">{s.note}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Contact ─────────────────────────────────────────────────────────────── */

function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <motion.div
          className="contact__inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="contact__heading">Let's work together</h2>
          <p className="contact__sub">
            Open to graduate roles, internships, and freelance projects.
          </p>
          <div className="contact__actions">
            <a href="mailto:jetchommanivong@gmail.com" className="btn btn--primary">
              jetchommanivong@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/jet-chommanivong-0109b5196/"
              target="_blank"
              rel="noreferrer"
              className="btn btn--ghost"
            >
              LinkedIn ↗
            </a>
          </div>
        </motion.div>
      </div>

      <footer className="footer">
        <div className="container footer__inner">
          <p>Jet Chommanivong · UX Designer · {new Date().getFullYear()}</p>
        </div>
      </footer>
    </section>
  )
}

/* ── App ─────────────────────────────────────────────────────────────────── */

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
    </>
  )
}
