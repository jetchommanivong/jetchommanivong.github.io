import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

/* ── Data ────────────────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: 'pixelpolish',
    name: 'PixelPolish',
    year: '2025',
    role: 'UX Designer & Developer',
    tools: ['Figma', 'React', 'Firebase', 'Vite'],
    tagline: 'Booking website for a boutique nail studio',
    description:
      "End-to-end design and build of a booking system for a sole-operator nail studio. " +
      "Validated with a 15-person usability study and iterated based on findings.",
    context:
      "A sole-operator nail studio needed a complete booking system she could manage herself, " +
      "with tier-based pricing, automatic time blocking, and an admin view for appointments " +
      "and availability. The challenge was making that complexity invisible to clients while " +
      "giving the owner full control, without requiring manual quoting for every booking.",
    process: [
      {
        phase: 'Design',
        detail:
          "Mapped the operator's workflow first: how she prices, blocks time, and handles " +
          "cancellations. Then translated that into a client-facing Figma prototype focused " +
          "on low-friction booking that handled edge cases automatically.",
      },
      {
        phase: 'Build',
        detail:
          "Built with React and Vite. Originally used Supabase for the backend, but " +
          "PostgREST became unstable under real load. Migrated to Firebase Firestore, " +
          "which resolved the reliability issues.",
      },
      {
        phase: 'Usability study',
        detail:
          "Ran a structured 15-person survey post-launch. Participants completed the booking " +
          "flow on the live site and answered questions on comprehension, navigation clarity, " +
          "pricing understanding, and overall experience.",
      },
      {
        phase: 'Iteration',
        detail:
          "Research consistently flagged one gap: clients couldn't visualise what each " +
          "pricing tier looked like. Built a per-tier gallery system so the owner can " +
          "upload reference images against each service level.",
      },
    ],
    stats: [
      { value: '100%', label: 'Immediate comprehension' },
      { value: '4.9 / 5', label: 'Overall satisfaction' },
      { value: '15', label: 'Participants tested' },
      { value: '100%', label: 'Navigation rated clear' },
    ],
    researchThemes: [
      {
        label: 'Visual design',
        finding:
          "Described as modern, professional, and fun/playful across all responses. " +
          "Multiple participants noted it was cleaner and easier than other nail booking " +
          "sites they'd used.",
      },
      {
        label: 'Booking flow',
        finding:
          "All 15 participants completed the booking and rated ease of use 5 / 5. " +
          "Zero reported feeling lost or unsure where to go next.",
      },
      {
        label: 'Pricing clarity',
        finding:
          "12 of 15 fully understood how their total would be calculated. The 3 who " +
          "were uncertain all pointed to the same gap: no visual reference for what " +
          "each tier looks like in practice.",
      },
      {
        label: 'Top requested additions',
        finding:
          "More nail photos (10 / 15), customer reviews (8 / 15), FAQ and aftercare " +
          "information (5 / 15), a pre-booking message option (5 / 15).",
      },
    ],
    researchQuotes: [
      "Better than a lot of other nail sites I've used in the past. Very easy to use and it's very clear on what you are booking.",
      "Super cute and really easy to understand. I cannot see anyone getting confused by this.",
      "So cute, so easy, love it!!",
    ],
    outcome: 'Live at pixelpolish.com.au',
    url: 'https://pixelpolish.com.au',
    color: '#FF6B35',
    images: [
      '/projects/pixelpolish-home.png',
      '/projects/pixelpolish-booking.png',
      '/projects/pixelpolish-booking-timeslot.png',
      '/projects/pixelpolish-prices.png',
      '/projects/pixelpolish-gallery.png',
      '/projects/pixelpolish-policies.png',
      '/projects/pixelpolish-design-prices.png',
      '/projects/pixelpolish-book.png',
      '/projects/pixel-polish-admin.png',
    ],
  },
  {
    id: 'eva',
    name: 'Evitas',
    year: '2025',
    role: 'UX / UI Designer & Developer',
    tools: ['Figma', 'Adobe Illustrator', 'React', 'Vite', 'React Router'],
    tagline: 'Brand & website for a Developmental Education practice',
    description:
      "Brand identity and website for a Developmental Education practitioner. " +
      "Translated a deeply personal brief, centred on a dandelion motif, into a " +
      "warm, inclusive identity and a fully deployed site.",
    context:
      "Eva is a Developmental Education practitioner building toward her own future " +
      "clinic. Her brief was centred on feeling rather than function. She wanted " +
      "visitors to feel something before they read anything. The dandelion was personal: " +
      "she has a vision for a feature wall where clients' handprints form the seeds, " +
      "representing growth, individuality, connection, and hope. The site needed to " +
      "carry those same values while positioning her practice for people of all ages " +
      "and all abilities.",
    process: [
      {
        phase: 'Brief & discovery',
        detail:
          "Eva came with slides from a university assignment and a clear emotional " +
          "vision. Early conversations uncovered the deeper meaning behind the dandelion, " +
          "the planned handprint wall, which became the emotional anchor for every " +
          "design decision that followed.",
      },
      {
        phase: 'Design',
        detail:
          "Created the dandelion handprint logo from scratch in Adobe Illustrator, " +
          "drawing directly from Eva's university slides and her vision of the handprint " +
          "wall. The mark became the foundation for the entire visual system, built out " +
          "in Figma. Language was crafted deliberately: 'play-based' was removed and " +
          "copy rewritten to emphasise lifespan practice, with 'people of all ages and " +
          "all abilities' as the consistent message across every page.",
      },
      {
        phase: 'Iteration',
        detail:
          "Eva's feedback pushed the palette toward more vibrant greens, and the " +
          "dandelion was scaled up to take a more prominent role in the hero. The " +
          "values section grew a distinct colour per value: coral, sky, sage, lavender, " +
          "gold, and blush, each tied to the brand's emotional core.",
      },
      {
        phase: 'Build & deploy',
        detail:
          "Built in React with Vite and React Router, deployed to evitasde.com on " +
          "Vercel. A contact and enquiry form was integrated so future clients can " +
          "reach Eva directly from the site.",
      },
    ],
    findingsLabel: 'Design decisions',
    researchThemes: [
      {
        label: 'Dandelion as brand anchor',
        finding:
          "The handprint dandelion logo was created from scratch in Adobe Illustrator, " +
          "based on Eva's university slides and her vision for the clinic feature wall. " +
          "Every subsequent visual decision, including section backgrounds, values cards, " +
          "and decorative elements, referenced that mark. It wasn't decorative: it carried " +
          "the values Eva built her practice around.",
      },
      {
        label: 'Colour & tone',
        finding:
          "Started with soft, subtle pastels per the brief. Feedback pushed toward " +
          "more vibrant greens, which became the primary brand colour, ranging from " +
          "sage through deep green, grounding the warmth without losing the calm feel.",
      },
      {
        label: 'Language & positioning',
        finding:
          "'Play-based' was removed at Eva's request. All copy was rewritten to " +
          "emphasise full lifespan practice, using inclusive language that speaks to " +
          "families, adults, and everyone in between.",
      },
      {
        label: 'Contact & enquiry',
        finding:
          "An enquiry form was a key requirement as Eva moves toward establishing " +
          "her clinic. Integrated and deployed so people can reach her directly " +
          "from the site.",
      },
    ],
    researchQuotes: [
      "I would love the website to reflect these values and feel warm, inclusive, professional, and family-friendly.",
      "One idea that is very special to me is to have a large feature wall in my future clinic with a dandelion created from my clients' handprints. To me, it represents growth, individuality, connection, hope, and the unique journey of every person and family I support.",
    ],
    outcome: 'Delivered to client · live at evitasde.com',
    url: 'https://www.evitasde.com',
    color: '#A855F7',
    images: [
      '/projects/evitas-home.png',
      '/projects/evitas-values.png',
      '/projects/evitas-home2.png',
      '/projects/evitas-about.png',
      '/projects/evitas-qualifications.png',
      '/projects/evitas-services.png',
      '/projects/evitas-services-button.png',
      '/projects/evitas-contact.png',
      '/projects/evitas-calltoaction.png',
    ],
  },
  {
    id: 'fridgit',
    name: 'Fridgit',
    year: '2025',
    role: 'UX Researcher & Developer',
    tools: ['React Native', 'Expo', 'OpenAI Whisper', 'GPT-4o-mini', 'Google Cloud Vision', 'Node.js', 'Figma'],
    tagline: 'Shared fridge inventory tracker, voice-first, built for shared homes',
    description:
      "A team of six designed and built Fridgit for DECO2850 at UQ. I ran contextual " +
      "inquiry sessions, designed the visual inventory system (pie chart display and expiry " +
      "screensaver), and built the voice recognition pipeline, migrating from the Web " +
      "Speech API to OpenAI Whisper with custom prompt engineering for natural language.",
    context:
      "Australian households waste an average of $2,500 worth of food per year, worse in " +
      "shared homes where food ownership blurs and coordination breaks down. Fridgit is a " +
      "shared fridge inventory tracker designed to live as a mounted screen near the fridge: " +
      "one glance replaces opening shelves, searching, and discovering something expired. " +
      "Voice logging and receipt scanning eliminate manual entry. Built by a six-person " +
      "team for DECO2850 Studio 2 Interaction Design at UQ, Fridgit moved through three " +
      "prototype iterations, from cardboard role-play to a working React Native app.",
    process: [
      {
        phase: 'Contextual inquiry',
        detail:
          "Ran two 'make us a sandwich' sessions. Participants were given the task and " +
          "observed moving through a real kitchen. The exercise surfaced how people " +
          "actually store and search for food, and how often they discover something " +
          "expired in the process. These sessions fed the team's early research synthesis.",
      },
      {
        phase: 'Voice pipeline (with one teammate)',
        detail:
          "Started with the Google Web Speech API, easy to integrate and parsing directly " +
          "to text. The problem: Chrome-only, ruling it out for a native app. Switched to " +
          "OpenAI Whisper, which runs cross-platform, supports multiple languages, and " +
          "accepts custom prompts. Prompt engineering handled natural speech patterns: " +
          "'a couple of tomatoes' gets estimated and categorised rather than rejected. " +
          "Background research on speech-to-system behaviour informed this. People " +
          "naturally simplify how they speak to machines, and the pipeline was tuned to " +
          "meet them there.",
      },
      {
        phase: 'Visual system design',
        detail:
          "Designed the inventory display around one question: why open the fridge at all? " +
          "A mounted screen showing a pie chart of everything inside, categorised by food " +
          "type with quantity, replaces searching shelves with a single glance. The same " +
          "logic drove the expiry screensaver: the homescreen passively shows what's " +
          "expiring soon, colour-coded red/yellow/green, so the most urgent food " +
          "information is always visible without the user going looking for it. The " +
          "category breakdown also doubles as a passive nutritional signal. A fridge " +
          "heavy in dairy and light in vegetables reads at a glance from the chart shape.",
      },
      {
        phase: 'User testing',
        detail:
          "Designed and ran the final evaluation: Likert-scale questionnaires paired " +
          "with think-aloud sessions focused on the voice interaction. Synthesised " +
          "results into six UX finding themes covering recording feedback, flow friction, " +
          "speech accuracy, trust in shared systems, and motivation.",
      },
    ],
    findingsLabel: 'Research & design insights',
    stats: [
      { value: '11', label: 'Participants interviewed' },
      { value: '3', label: 'Prototype iterations' },
      { value: '3.75 / 5', label: 'Voice command learnability' },
      { value: '6', label: 'UX finding themes' },
    ],
    researchThemes: [
      {
        label: 'App abandonment & motivation',
        finding:
          "During prototyping, I interviewed users about why they stop using tracking " +
          "apps like MyFitnessPal. The consistent answer: manually logging everything " +
          "is too tedious to sustain. This directly drove adding voice logging in " +
          "Prototype 2, shifting the focus from making logging accurate to making it " +
          "something people don't have to think about.",
      },
      {
        label: 'Limiting fridge interactions',
        finding:
          "Opening a fridge to check what's inside requires multiple interactions: open, " +
          "scan each shelf, locate the item, close. A mounted screen with a live " +
          "inventory collapses that to one. This insight shaped the whole display " +
          "paradigm. Fridgit is as much a passive information radiator as an active tracker.",
      },
      {
        label: 'Pie chart inventory display',
        finding:
          "Showing contents as a categorised pie chart makes items scannable at a " +
          "glance and signals nutritional balance passively. A fridge heavy in dairy " +
          "and light in vegetables reads from the chart shape immediately, with no " +
          "scrolling or searching required. The category breakdown also reinforces the " +
          "app's role as a prompt toward less waste and healthier eating.",
      },
      {
        label: 'Expiry screensaver',
        finding:
          "The homescreen acts as a screensaver always showing which items are " +
          "expiring soon, traffic-light coded: red (use now), yellow (use soon), " +
          "green (fine). The most time-sensitive food information surfaces passively, " +
          "without requiring users to open the app and go looking for it.",
      },
      {
        label: 'Speech pattern research',
        finding:
          "Background research showed that people speaking to a system naturally " +
          "simplify their speech: shorter sentences, slower pace, fewer idioms. " +
          "The Whisper prompt was engineered to handle both natural speech " +
          "('a couple of tomatoes') and this simplified register, estimating " +
          "quantities where needed. Multi-language support was added deliberately " +
          "for shared households where English isn't the primary language.",
      },
      {
        label: 'Voice UX & recording feedback',
        finding:
          "Users couldn't tell when the system was listening. Recording confirmation " +
          "scored 2.0 / 5 in the final Likert evaluation. The voice interface was " +
          "redesigned with minimal required presses and explicit visual recording " +
          "state, so users always knew when the system was active. Clear feedback " +
          "was treated as an ethical requirement, not just a UX one.",
      },
    ],
    researchQuotes: [
      "Surprised that the voice recognition picked up very well.",
      "Flow is not great, could be better.",
      "It would be tedious to log each and every thing per gram.",
      "If we could change one thing… we should share stuff so it doesn't expire and go to waste.",
    ],
    outcome: 'University project · DECO2850 Studio 2, UQ · 2025',
    color: '#3b82f6',
    images: [
      '/projects/inventory.png',
      '/projects/expiryitems.png',
      '/projects/household.png',
    ],
  },
]

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
            passion for accessible and inclusive design. I bring a perspective most
            designers don't get in the classroom — I'll tell you more below.
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

/* ── Case study modal ────────────────────────────────────────────────────── */

function CaseStudyModal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="modal"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.3 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal__header">
          <span className="modal__project-name">{project.name}</span>
          <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal__body">
          <div className="modal__images">
            {project.images?.map((src, i) => (
              <img key={i} src={src} alt="" className="modal__img" />
            ))}
          </div>

          <div className="modal__details">
            {/* Header */}
            <div>
              <div className="project-card__meta">
                <span className="project-card__role">{project.role}</span>              </div>
              <h2 className="modal__name">{project.name}</h2>
              <p className="modal__tagline">{project.tagline}</p>
            </div>

            {/* Brief */}
            {project.context && (
              <div className="modal__section">
                <p className="modal__section-label">Brief</p>
                <p className="modal__desc">{project.context}</p>
              </div>
            )}

            {/* Process */}
            {project.process?.length > 0 && (
              <div className="modal__section">
                <p className="modal__section-label">Process</p>
                <ol className="modal__process">
                  {project.process.map((step, i) => (
                    <li key={i} className="modal__process-step">
                      <span className="modal__process-num">0{i + 1}</span>
                      <div>
                        <p className="modal__process-phase">{step.phase}</p>
                        <p className="modal__process-detail">{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Findings / Research / Design decisions */}
            {(project.stats?.length > 0 || project.researchThemes?.length > 0 || project.researchQuotes?.length > 0) && (
              <div className="modal__section">
                <p className="modal__section-label">{project.findingsLabel ?? 'User research'}</p>

                {project.stats?.length > 0 && (
                  <div className="modal__stats">
                    {project.stats.map(s => (
                      <div key={s.label} className="modal__stat">
                        <span className="modal__stat-value">{s.value}</span>
                        <span className="modal__stat-label">{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {project.researchThemes?.length > 0 && (
                  <ul className="modal__themes">
                    {project.researchThemes.map(t => (
                      <li key={t.label} className="modal__theme">
                        <span className="modal__theme-label">{t.label}</span>
                        <p className="modal__theme-finding">{t.finding}</p>
                      </li>
                    ))}
                  </ul>
                )}

                {project.researchQuotes?.length > 0 && (
                  <div className="modal__quotes">
                    {project.researchQuotes.map((q, i) => (
                      <blockquote key={i} className="modal__quote">"{q}"</blockquote>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="modal__section">
              <p className="modal__section-label">Tools</p>
              <div className="project-card__tools">
                {project.tools.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <p className="modal__outcome">↗ {project.outcome}</p>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--primary modal__cta"
                >
                  View live site ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Project card ────────────────────────────────────────────────────────── */

function ProjectCard({ project, index, onClick }) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="project-card__thumb" style={{ '--project-color': project.color }}>
        {project.images?.length
          ? (
            <div className="project-card__scroll-strip">
              <div className="project-card__scroll-inner">
                {[...project.images, ...project.images].map((src, i) => (
                  <img key={i} src={src} alt="" className="project-card__scroll-img" />
                ))}
              </div>
            </div>
          )
          : <span className="project-card__thumb-label">{project.name}</span>
        }
      </div>

      {/* Content */}
      <div className="project-card__content">
        <div className="project-card__meta">
          <span className="project-card__role">{project.role}</span>
        </div>

        <h3 className="project-card__name">{project.name}</h3>
        <p className="project-card__tagline">{project.tagline}</p>
        <p className="project-card__desc">{project.description}</p>

        <div className="project-card__tools">
          {project.tools.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        <p className="project-card__outcome">View case study →</p>
      </div>
    </motion.article>
  )
}

/* ── Work section ────────────────────────────────────────────────────────── */

function Work() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="work" className="section work">
      <div className="container">
        <div className="section__header">
          <h2 className="section__title">Selected Work</h2>
          <p className="section__sub">Case studies from recent client projects</p>
        </div>

        <div className="project-list">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onClick={() => setSelected(p)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <CaseStudyModal project={selected} onClose={() => setSelected(null)} />
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
