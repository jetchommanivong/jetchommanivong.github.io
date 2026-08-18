/**
 * Seeded scatter for a wall's decorative holds.
 *
 * Hand-authored positions drift into rows: it is very hard to type forty
 * coordinates without falling into a rhythm, and the old project wall read as
 * five neat bands because of it. Dart-throwing from a seeded PRNG breaks that
 * rhythm while staying reproducible — the same seed gives the same wall on
 * every render, every hot reload, and every build, so a layout can be reviewed
 * once and trusted.
 *
 * Two placement modes, because walls come in two shapes:
 *
 *   scatterGutter  for a wall whose content is a fixed-width centred column.
 *                  Holds go in the margins beside it, sized and positioned as
 *                  a FRACTION of the gutter, so they can never reach the text.
 *
 *   scatterRect    for a wall whose content spans the full width (the project
 *                  wall, where the routes are the content). Holds go anywhere
 *                  outside the given keep-out rectangles.
 *
 * Percentages cannot express "outside the content column": a 1100px column in
 * a 1320px wall leaves 8% margins, but the same column in a 1150px wall leaves
 * 2%. A percentage keep-out tuned on a wide screen walks straight onto the
 * text on a narrower one. That is why gutter mode works in ratios of the
 * gutter itself and never in percentages of the wall.
 */

/* mulberry32 — small, fast, and stable across engines. */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = (rand, arr) => arr[Math.floor(rand() * arr.length)];
const lerp = (rand, [lo, hi]) => lo + rand() * (hi - lo);

/* ── Gutter mode ─────────────────────────────────────────────────────────── */

/**
 * Place holds in the margins either side of a centred content column.
 *
 * `k` is the hold's width as a fraction of the gutter, and `t` is its centre
 * across the gutter, also 0–1. Constraining `t` to [k/2, 1 - k/2] keeps the
 * whole hold inside the gutter at every viewport width, with no clamping and
 * no knowledge of the actual pixel size required.
 *
 * @returns {{hold, side: 'left'|'right', t: number, k: number, y: number,
 *            rot: number, flip: boolean, feature: boolean}[]}
 */
export function scatterGutter({
  seed,
  count,
  pool,
  featurePool = [],
  featureCount = 0,
  k = [0.34, 0.6],
  featureK = [0.68, 0.92],
  yRange = [7, 84],
  minGapY = 9,
}) {
  if (!pool?.length || count <= 0) return [];

  const rand = mulberry32(seed);
  const placed = [];
  const usedY = { left: [], right: [] };

  /* Bigger holds are placed first — they are the hardest to fit, and letting
     the small ones take the good vertical slots first strands them. */
  const queue = [
    ...Array.from({ length: featurePool.length ? featureCount : 0 }, () => true),
    ...Array.from({ length: count }, () => false),
  ];

  queue.forEach((isFeature, i) => {
    // Alternate sides so neither margin ends up bare.
    const side = i % 2 === 0 ? 'left' : 'right';

    let y = null;
    for (let attempt = 0; attempt < 60; attempt++) {
      const candidate = lerp(rand, yRange);
      const gap = isFeature ? minGapY * 1.5 : minGapY;
      if (usedY[side].every(other => Math.abs(other - candidate) >= gap)) {
        y = candidate;
        break;
      }
    }
    if (y === null) return; // This margin is full — drop the hold rather than stack it.

    usedY[side].push(y);
    const width = lerp(rand, isFeature ? featureK : k);

    placed.push({
      hold: pick(rand, isFeature ? featurePool : pool),
      side,
      k: Math.round(width * 1000) / 1000,
      t: Math.round((width / 2 + rand() * (1 - width)) * 1000) / 1000,
      y: Math.round(y * 10) / 10,
      rot: Math.round((rand() * 2 - 1) * 24),
      flip: rand() > 0.5,
      feature: isFeature,
    });
  });

  return placed;
}

/* ── Rect mode ───────────────────────────────────────────────────────────── */

/* A wall is wider than it is tall, so a percent of width is a smaller distance
   than a percent of height. Squashing y keeps spacing even in actual pixels. */
const Y_WEIGHT = 0.62;

/** Does a hold's box, centred at (x, y) with half-extents (hw, hh), hit `r`? */
const hits = (x, y, hw, hh, r) =>
  x + hw >= r.x[0] && x - hw <= r.x[1] && y + hh >= r.y[0] && y - hh <= r.y[1];

/**
 * Place holds anywhere outside `keepOut`. Unlike gutter mode this tests the
 * hold's whole box, not just its centre — a 90px hold centred 1% clear of a
 * route lane still lands on it.
 *
 * @param {object}   opts
 * @param {number}   opts.seed       Any integer. Change it to reshuffle a wall.
 * @param {number}   opts.count      How many holds to place.
 * @param {object[]} opts.pool       Hold entries from wallAssets ({ src, w, h }).
 * @param {object[]} [opts.keepOut]  Rects to avoid: { x: [min, max], y: [min, max] }.
 * @param {object}   [opts.wallSize] Assumed wall box in px, for px → % of holds.
 */
export function scatterRect({
  seed,
  count,
  pool,
  featurePool = [],
  featureCount = 0,
  keepOut = [],
  bounds = { x: [3, 97], y: [5, 88] },
  minGap = 4,
  widths = [30, 48],
  featureWidths = [62, 92],
  wallSize = { w: 1320, h: 1020 },
}) {
  if (!pool?.length || count <= 0) return [];

  const rand = mulberry32(seed);
  const placed = [];

  const queue = [
    ...Array.from({ length: featurePool.length ? featureCount : 0 }, () => true),
    ...Array.from({ length: count }, () => false),
  ];

  for (const isFeature of queue) {
    const hold = pick(rand, isFeature ? featurePool : pool);
    const width = Math.round(lerp(rand, isFeature ? featureWidths : widths));
    const height = (width * hold.h) / hold.w;

    // Half-extents as a percentage of the wall, so the box can be tested.
    const hw = ((width / wallSize.w) * 100) / 2;
    const hh = ((height / wallSize.h) * 100) / 2;

    // Bounded: a crowded wall can legitimately run out of room, and an
    // unbounded loop here would hang the render rather than drop a hold.
    for (let attempt = 0; attempt < 260; attempt++) {
      const x = lerp(rand, bounds.x);
      const y = lerp(rand, bounds.y);

      if (keepOut.some(r => hits(x, y, hw, hh, r))) continue;

      const clash = placed.some(p => {
        const dx = Math.abs(p.x - x) - (p.hw + hw);
        const dy = (Math.abs(p.y - y) - (p.hh + hh)) / Y_WEIGHT;
        return dx < minGap && dy < minGap;
      });
      if (clash) continue;

      placed.push({
        hold, width, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10,
        hw, hh,
        rot: Math.round((rand() * 2 - 1) * 26),
        flip: rand() > 0.5,
        feature: isFeature,
      });
      break;
    }
  }

  return placed;
}

/**
 * Approximate keep-out rect for a placed volume, so scattered holds do not
 * land on top of one. Volumes are positioned by centre, like the holds.
 */
export function volumeRect({ x, y, vol, width }, wallSize = { w: 1320, h: 1020 }) {
  const height = (width * vol.h) / vol.w;
  const hw = ((width / wallSize.w) * 100) / 2;
  const hh = ((height / wallSize.h) * 100) / 2;
  return { x: [x - hw, x + hw], y: [y - hh, y + hh] };
}
