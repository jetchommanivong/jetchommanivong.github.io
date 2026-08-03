import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './CaseStudy.css'

/* Evidence placeholders are authoring aids — never shipped to the live site. */
const SHOW_SLOTS = import.meta.env.DEV

/* ── Figure ──────────────────────────────────────────────────────────────── */

function Figure({ src, alt, caption, wide, onZoom }) {
  return (
    <figure className={`cs-figure ${wide ? 'cs-figure--wide' : ''}`}>
      <button
        type="button"
        className="cs-figure__frame"
        onClick={() => onZoom({ src, alt, caption })}
        aria-label={`Enlarge image: ${alt || caption || ''}`}
      >
        <img src={src} alt={alt || ''} loading="lazy" />
        <span className="cs-figure__zoom" aria-hidden="true">⤢</span>
      </button>
      {caption && <figcaption className="cs-figure__caption">{caption}</figcaption>}
    </figure>
  )
}

/* ── Blocks ──────────────────────────────────────────────────────────────── */

function Block({ block, onZoom }) {
  switch (block.type) {
    case 'summary':
      return (
        <div className="cs-summary">
          {block.items.map(item => (
            <div key={item.label} className="cs-summary__item">
              <p className="cs-summary__label">{item.label}</p>
              <p className="cs-summary__text">{item.text}</p>
            </div>
          ))}
        </div>
      )

    case 'prose': {
      const paras = Array.isArray(block.text) ? block.text : [block.text]
      return (
        <div className="cs-prose">
          {paras.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      )
    }

    case 'figure':
      return <Figure {...block} onZoom={onZoom} />

    case 'gallery':
      return (
        <div className={`cs-gallery cs-gallery--${block.columns || 2}`}>
          {block.items.map(item => (
            <Figure key={item.src} {...item} onZoom={onZoom} />
          ))}
        </div>
      )

    case 'steps':
      return (
        <ol className="cs-steps">
          {block.items.map((step, i) => (
            <li key={step.phase} className="cs-step">
              <div className="cs-step__marker">
                <span className="cs-step__num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="cs-step__body">
                <h4 className="cs-step__phase">{step.phase}</h4>
                <p className="cs-step__detail">{step.detail}</p>
                {step.src && (
                  <Figure
                    src={step.src}
                    alt={step.alt}
                    caption={step.caption}
                    onZoom={onZoom}
                  />
                )}
              </div>
            </li>
          ))}
        </ol>
      )

    case 'stats':
      return (
        <div className="cs-stats">
          {block.items.map(stat => (
            <div key={stat.label} className="cs-stat">
              <span className="cs-stat__value">{stat.value}</span>
              <span className="cs-stat__label">{stat.label}</span>
            </div>
          ))}
        </div>
      )

    case 'themes':
      return (
        <ul className="cs-themes">
          {block.items.map(theme => (
            <li key={theme.label} className="cs-theme">
              <h4 className="cs-theme__label">{theme.label}</h4>
              <p className="cs-theme__finding">{theme.finding}</p>
            </li>
          ))}
        </ul>
      )

    case 'quotes':
      return (
        <div className="cs-quotes">
          {block.items.map((q, i) => {
            const text = typeof q === 'string' ? q : q.text
            const attribution = typeof q === 'string' ? null : q.attribution
            return (
              <blockquote key={i} className="cs-quote">
                <p>“{text}”</p>
                {attribution && <cite className="cs-quote__cite">{attribution}</cite>}
              </blockquote>
            )
          })}
        </div>
      )

    case 'callout':
      return (
        <aside className="cs-callout">
          {block.title && <p className="cs-callout__title">{block.title}</p>}
          <p className="cs-callout__text">{block.text}</p>
        </aside>
      )

    case 'slot':
      if (!SHOW_SLOTS) return null
      return (
        <div className={`cs-slot ${block.tall ? 'cs-slot--tall' : ''}`}>
          <p className="cs-slot__badge">Evidence slot · dev only</p>
          <p className="cs-slot__title">{block.title}</p>
          <p className="cs-slot__hint">{block.hint}</p>
        </div>
      )

    default:
      return null
  }
}

/* ── Lightbox ────────────────────────────────────────────────────────────── */

function Lightbox({ image, onClose }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      className="cs-lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt || 'Enlarged image'}
    >
      <button className="cs-lightbox__close" onClick={onClose} aria-label="Close image">✕</button>
      <motion.figure
        className="cs-lightbox__inner"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.97, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={e => e.stopPropagation()}
      >
        <img src={image.src} alt={image.alt || ''} />
        {image.caption && <figcaption>{image.caption}</figcaption>}
      </motion.figure>
    </motion.div>
  )
}

/* ── Case study ──────────────────────────────────────────────────────────── */

export default function CaseStudy({ project, nextProject, onClose, onNavigate }) {
  const scrollRef = useRef(null)
  const [activeSection, setActiveSection] = useState(project.sections[0]?.id)
  const [progress, setProgress] = useState(0)
  const [zoomed, setZoomed] = useState(null)

  const handleZoom = useCallback(image => setZoomed(image), [])

  /* Escape closes the case study (unless the lightbox is catching it first) */
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape' && !zoomed) onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose, zoomed])

  /* Lock the page behind the overlay */
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [])

  /* Start at the top whenever a different project is opened */
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
    setActiveSection(project.sections[0]?.id)
  }, [project.id, project.sections])

  /* Read progress + which section is in view */
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight
      setProgress(max > 0 ? el.scrollTop / max : 0)

      const marker = el.scrollTop + el.clientHeight * 0.3
      let current = project.sections[0]?.id
      for (const section of project.sections) {
        const node = el.querySelector(`#section-${section.id}`)
        if (node && node.offsetTop <= marker) current = section.id
      }
      setActiveSection(current)
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [project.sections])

  const gotoSection = id => {
    const el = scrollRef.current
    const node = el?.querySelector(`#section-${id}`)
    if (node) el.scrollTo({ top: node.offsetTop - 24, behavior: 'smooth' })
  }

  return (
    <motion.div
      className="cs"
      style={{ '--project-color': project.color }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
    >
      {/* Top bar */}
      <header className="cs-bar">
        <div className="cs-bar__inner">
          <button className="cs-bar__back" onClick={onClose}>
            <span aria-hidden="true">←</span> All work
          </button>
          <span className="cs-bar__title">{project.name}</span>
          <div className="cs-bar__actions">
            {project.url && (
              <a href={project.url} target="_blank" rel="noreferrer" className="cs-bar__link">
                Live site ↗
              </a>
            )}
            <button className="cs-bar__close" onClick={onClose} aria-label="Close case study">✕</button>
          </div>
        </div>
        <div className="cs-bar__progress" style={{ transform: `scaleX(${progress})` }} />
      </header>

      {/* Scrolling body */}
      <div className="cs-scroll" ref={scrollRef}>
        {/* Hero */}
        <div className="cs-hero">
          <div className="cs-hero__wrap">
            <p className="cs-hero__eyebrow">{project.role}</p>
            <h1 className="cs-hero__name">{project.name}</h1>
            <p className="cs-hero__tagline">{project.tagline}</p>

            <dl className="cs-hero__meta">
              {project.meta?.map(m => (
                <div key={m.label} className="cs-hero__meta-item">
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>

            <div className="cs-hero__tools">
              {project.tools.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>

          {project.cover && (
            <div className="cs-hero__cover">
              <img src={project.cover} alt={project.coverAlt || ''} />
            </div>
          )}
        </div>

        {/* Sections + side nav */}
        <div className="cs-main">
          <nav className="cs-toc" aria-label="Case study sections">
            <p className="cs-toc__label">Contents</p>
            <ul>
              {project.sections.map(section => (
                <li key={section.id}>
                  <button
                    className={`cs-toc__link ${activeSection === section.id ? 'is-active' : ''}`}
                    onClick={() => gotoSection(section.id)}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="cs-content">
            {project.sections.map((section, i) => (
              <section
                key={section.id}
                id={`section-${section.id}`}
                className="cs-section"
              >
                <div className="cs-section__head">
                  <span className="cs-section__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="cs-section__label">{section.label}</span>
                </div>
                {section.title && <h2 className="cs-section__title">{section.title}</h2>}
                <div className="cs-section__blocks">
                  {section.blocks.map((block, bi) => (
                    <Block key={bi} block={block} onZoom={handleZoom} />
                  ))}
                </div>
              </section>
            ))}

            {/* Close-out */}
            <div className="cs-outro">
              <p className="cs-outro__outcome">{project.outcome}</p>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--primary"
                >
                  View live site ↗
                </a>
              )}
            </div>

            {nextProject && (
              <button className="cs-next" onClick={() => onNavigate(nextProject.id)}>
                <span className="cs-next__label">Next case study</span>
                <span className="cs-next__name">{nextProject.name}</span>
                <span className="cs-next__tagline">{nextProject.tagline}</span>
                <span className="cs-next__arrow" aria-hidden="true">→</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {zoomed && <Lightbox image={zoomed} onClose={() => setZoomed(null)} />}
      </AnimatePresence>
    </motion.div>
  )
}
