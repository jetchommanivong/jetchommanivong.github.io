import { caseStudies } from './caseStudies';

/** `#RRGGBB` → `rgba(…)`, so tints stay tied to the one accent per project. */
function withAlpha(hex, alpha) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/**
 * Wall presentation for each project: which holds make up its route and where
 * they sit.
 *
 * Everything else — name, tagline, accent colour, the case study itself — comes
 * from `caseStudies.js`, so the wall can never drift out of sync with the
 * writing or use a different colour from its own case study.
 *
 * Holds run BOTTOM (Brief) → TOP (Shipped) — routes climb upward. Each route
 * keeps to its own vertical lane so the three never tangle:
 * PixelPolish 5–22%, Fridgit 43–58%, Evitas 78–93%.
 */
const ROUTES = [
  {
    id: 'pixelpolish',
    grade: 'V3',
    noteX: 27,
    noteY: 30,
    // Only one orange small hold exists, so it is reused and flipped.
    holds: [
      { x: 9,  y: 80, img: 'orangeAlt', size: 1.3,  label: 'Brief',         sub: 'Client goals & nail service tiers' },
      { x: 20, y: 67, img: 'orange1',   size: 0.95, label: 'Research',      sub: 'User flows & competitor audit' },
      { x: 7,  y: 54, img: 'maroon1',   size: 0.8,  label: 'Wireframes',    sub: 'Booking flow & admin panel layout' },
      { x: 22, y: 41, img: 'orange1',   size: 1.0,  flip: true, label: 'Visual Design', sub: 'Vibrant palette & UI components' },
      { x: 10, y: 28, img: 'maroon1',   size: 0.75, flip: true, label: 'Testing',       sub: '15-person usability study' },
      { x: 5,  y: 15, img: 'orange',    size: 1.1,  label: 'Shipped',       sub: 'pixelpolish.com.au' },
    ],
  },
  {
    id: 'fridgit',
    grade: 'V2',
    noteX: 62,
    noteY: 30,
    holds: [
      { x: 44, y: 80, img: 'blue',  size: 1.2,  label: 'Brief',      sub: 'Shared-home food waste' },
      { x: 57, y: 67, img: 'blue1', size: 1.0,  label: 'Research',   sub: 'Interviews & diary study' },
      { x: 43, y: 54, img: 'blue2', size: 0.8,  label: 'Concept',    sub: 'Voice-first interaction model' },
      { x: 58, y: 41, img: 'blue1', size: 0.9,  flip: true, label: 'Prototype',  sub: 'Inventory & household screens' },
      { x: 45, y: 28, img: 'blue3', size: 0.75, label: 'Testing',    sub: 'Trust & shared ownership' },
      { x: 52, y: 15, img: 'blue1', size: 1.1,  flip: true, label: 'Delivered',  sub: 'DECO2850 Studio 2, UQ' },
    ],
  },
  {
    id: 'eva',
    grade: 'V4',
    noteX: 62,
    noteY: 62,
    holds: [
      { x: 80, y: 80, img: 'purple',  size: 1.2,  label: 'Brief',         sub: 'Practice goals & audience' },
      { x: 92, y: 67, img: 'purple1', size: 1.0,  label: 'Brand',         sub: 'Dandelion mark & palette' },
      { x: 78, y: 54, img: 'purple3', size: 0.9,  label: 'Wireframes',    sub: 'Layout structure & navigation' },
      { x: 90, y: 41, img: 'purple2', size: 0.8,  label: 'Visual Design', sub: 'Identity system & UI components' },
      { x: 80, y: 28, img: 'purple3', size: 0.9,  flip: true, label: 'Client Review', sub: 'Feedback rounds & refinements' },
      { x: 93, y: 15, img: 'purple1', size: 1.15, flip: true, label: 'Shipped',       sub: 'evitasde.com' },
    ],
  },
];

/**
 * Routes joined to their case studies. Throws loudly at import time if an id
 * has no matching case study — a silent mismatch would render a blank note.
 */
export const projects = ROUTES.map(route => {
  const study = caseStudies.find(c => c.id === route.id);
  if (!study) throw new Error(`No case study found for route "${route.id}"`);

  return {
    ...route,
    name: study.name,
    tagline: study.tagline,
    year: study.year,
    role: study.role,
    color: study.color,
    glow: withAlpha(study.color, 0.5),
    dim: withAlpha(study.color, 0.1),
    caseStudy: study,
  };
});

/* Decorative holds are no longer listed here or in wallAssets. WallPanel
   generates them from a seed (see lib/scatter.js) and Wall.jsx passes the
   keep-out rects for these three lanes and their notes. */
