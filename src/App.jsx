import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Wall from './components/Wall';
import Process from './components/Process';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CaseStudy from './components/CaseStudy';
import { caseStudies } from './data/caseStudies';

export default function App() {
  const [openId, setOpenId] = useState(null);

  const openIndex = caseStudies.findIndex(c => c.id === openId);
  const active = openIndex >= 0 ? caseStudies[openIndex] : null;
  // Wraps around, so the last case study still offers somewhere to go next.
  const next = active ? caseStudies[(openIndex + 1) % caseStudies.length] : null;

  const close = useCallback(() => setOpenId(null), []);

  return (
    <>
      <Nav />
      <main>
        {/* Order matches the hero's numbered route: 01 → 05 */}
        <Hero />
        <About />
        <Wall onProjectClick={project => setOpenId(project.id)} />
        <Process />
        <Skills />
        <Contact />
      </main>

      <AnimatePresence>
        {active && (
          <CaseStudy
            key={active.id}
            project={active}
            nextProject={next?.id === active.id ? null : next}
            onClose={close}
            onNavigate={setOpenId}
          />
        )}
      </AnimatePresence>
    </>
  );
}
