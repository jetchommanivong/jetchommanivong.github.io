/**
 * Central manifest for the photographed bouldering holds in /public/bouldering-holds.
 *
 * Every entry records the file's natural pixel size so callers can size holds by
 * width alone and let height follow the real aspect ratio. Do not render a hold
 * wider than its natural width — these are photos, and they go soft when upscaled.
 */

const DIR = '/bouldering-holds';

/* ── Large holds: the five numbered section markers ──────────────────────── */

export const BIG = {
  purple:    { src: `${DIR}/big-hold-1.png`, w: 448, h: 436 },
  yellow:    { src: `${DIR}/big-hold-2.png`, w: 472, h: 512 },
  teal:      { src: `${DIR}/big-hold-3.png`, w: 397, h: 396 },
  orange:    { src: `${DIR}/big-hold-4.png`, w: 339, h: 375 },
  tealAlt:   { src: `${DIR}/big-hold-5.png`, w: 268, h: 284 },
  orangeAlt: { src: `${DIR}/big-hold-6.png`, w: 275, h: 300 },
  blue:      { src: `${DIR}/big-hold-7.png`, w: 285, h: 316 },

  maroonDome: { src: `${DIR}/big-hold-8.png`,  w: 245, h: 275 },
  tan:        { src: `${DIR}/big-hold-9.png`,  w: 187, h: 280 },
  magenta:    { src: `${DIR}/big-hold-10.png`, w: 272, h: 274 },
  rail:       { src: `${DIR}/big-hold-11.png`, w: 326, h: 132 },
};

/* ── Small holds, grouped by colour family ───────────────────────────────── */

export const SMALL = {
  purple1: { src: `${DIR}/hold-1.png`,  w: 256, h: 196 },
  purple2: { src: `${DIR}/hold-10.png`, w: 130, h: 107 },
  purple3: { src: `${DIR}/hold-11.png`, w: 170, h: 143 },

  yellow1: { src: `${DIR}/hold-2.png`,  w: 241, h: 183 },
  yellow2: { src: `${DIR}/hold-8.png`,  w: 127, h: 106 },
  yellow3: { src: `${DIR}/hold-12.png`, w: 58,  h: 58  },

  teal1:   { src: `${DIR}/hold-3.png`,  w: 228, h: 172 },
  teal2:   { src: `${DIR}/hold-6.png`,  w: 159, h: 123 },
  teal3:   { src: `${DIR}/hold-14.png`, w: 78,  h: 70  },

  orange1: { src: `${DIR}/hold-4.png`,  w: 207, h: 170 },
  maroon1: { src: `${DIR}/hold-15.png`, w: 87,  h: 78  },

  blue1:   { src: `${DIR}/hold-5.png`,  w: 262, h: 169 },
  blue2:   { src: `${DIR}/hold-16.png`, w: 89,  h: 81  },
  blue3:   { src: `${DIR}/hold-17.png`, w: 70,  h: 57  },

  grey1:   { src: `${DIR}/hold-7.png`,  w: 113, h: 108 },
  grey2:   { src: `${DIR}/hold-9.png`,  w: 166, h: 140 },
  grey3:   { src: `${DIR}/hold-13.png`, w: 78,  h: 71  },

  purple4: { src: `${DIR}/hold-18.png`, w: 59,  h: 41  },
  purple5: { src: `${DIR}/hold-20.png`, w: 41,  h: 64  },
  purple6: { src: `${DIR}/hold-24.png`, w: 54,  h: 43  },
  purple7: { src: `${DIR}/hold-25.png`, w: 170, h: 144 },
  mauve1:  { src: `${DIR}/hold-21.png`, w: 47,  h: 63  },
  maroon2: { src: `${DIR}/hold-26.png`, w: 218, h: 155 },
  teal4:   { src: `${DIR}/hold-22.png`, w: 54,  h: 68  },
  blue4:   { src: `${DIR}/hold-19.png`, w: 60,  h: 37  },
  blue5:   { src: `${DIR}/hold-23.png`, w: 64,  h: 52  },
  blue6:   { src: `${DIR}/hold-32.png`, w: 199, h: 139 },
  yellow4: { src: `${DIR}/hold-30.png`, w: 130, h: 108 },
  olive1:  { src: `${DIR}/hold-28.png`, w: 67,  h: 51  },
  grey4:   { src: `${DIR}/hold-27.png`, w: 73,  h: 58  },
  grey5:   { src: `${DIR}/hold-29.png`, w: 167, h: 139 },
  grey6:   { src: `${DIR}/hold-31.png`, w: 114, h: 111 },
};

/* ── Grey wall volumes ───────────────────────────────────────────────────── */

export const VOLUME = {
  tall:    { src: `${DIR}/volume-1.png`, w: 206, h: 429 },
  wide:    { src: `${DIR}/volume-2.png`, w: 193, h: 396 },
  wedge:   { src: `${DIR}/volume-3.png`, w: 461, h: 383 },
  pyramid: { src: `${DIR}/volume-4.png`, w: 613, h: 578 },
};

/* ── Gear that rests on the crash mat ────────────────────────────────────── */

const PROP_DIR = '/bouldering-assets';

export const PROPS = {
  chalkBag:    { src: `${PROP_DIR}/chalk-bag.png`,        w: 380, h: 279 },
  brush:       { src: `${PROP_DIR}/brush.png`,            w: 276, h: 53  },
  shoes:       { src: `${PROP_DIR}/bouldering-shoes.png`, w: 331, h: 201 },
  liquidChalk: { src: `${PROP_DIR}/liquid-chalk.png`,     w: 77,  h: 155 },
  carabiner:   { src: `${PROP_DIR}/carabiner.png`,        w: 101, h: 170 },
};

/**
 * The five numbered route holds that double as site navigation.
 *
 * `colour` is sampled from the lit face of each photo so UI accents sit in the
 * same family as the hold rather than fighting it.
 *
 * `labelOffset` shifts the number plate from the image's bounding-box centre to
 * the hold's actual visual centre. These are measured, not eyeballed: the
 * centroid of every pixel with alpha > 200, converted to display pixels. The
 * yellow and orange holds both sit ~59% across their frame, so centring on the
 * box alone pushes their labels noticeably off the face.
 *
 * Notes are pinned to their hold rather than given their own coordinates:
 * `noteSide` ('left' | 'right' | 'below') picks the edge to sit against, and
 * `noteDX` / `noteDY` nudge it along the free axis in pixels. Hero.jsx measures
 * the hold and places the note a fixed gap from its edge, so the two stay
 * together at every viewport width — a percentage position drifts apart as the
 * viewport grows, because the hold is sized in pixels but the position is not.
 */
export const sections = [
  {
    num: '01',
    id: 'about',
    label: 'ABOUT',
    hold: BIG.purple,
    chip: SMALL.purple1,
    chipWidth: 94,
    colour: '#7D628C',
    note: 'Get to know me, my background and what drives my work.',
    // Raised slightly so its lower edge clears hold 02's frame on wide screens.
    x: 59, y: 20, noteSide: 'right', noteDY: 26,
    width: 150, rot: -3,
    labelOffset: { x: 0, y: 15 },
  },
  {
    num: '02',
    id: 'work',
    label: 'WORK',
    hold: BIG.yellow,
    chip: SMALL.yellow1,
    chipWidth: 90,
    colour: '#E8A524',
    note: "A selection of projects and case studies I'm proud of.",
    x: 65, y: 39, noteSide: 'right', noteDY: 30,
    width: 146, rot: 4,
    labelOffset: { x: 13, y: -8 },
  },
  {
    num: '03',
    id: 'process',
    label: 'PROCESS',
    hold: BIG.teal,
    chip: SMALL.teal1,
    chipWidth: 114,
    colour: '#2F6669',
    note: 'My design process and how I approach problems.',
    // Sits at 40% rather than the reference's ~35%: the bio column is long
    // enough to reach across the wall at narrower viewports, and at 33% this
    // hold landed on top of that text below ~1500px.
    // The note hangs below because the bio still occupies the space to its left
    // and both connectors cross the space to its right.
    x: 40, y: 57, noteSide: 'below', noteDX: 30,
    width: 142, rot: -5,
    labelOffset: { x: 0, y: 6 },
  },
  {
    num: '04',
    id: 'skills',
    label: 'SKILLS',
    hold: BIG.orange,
    chip: SMALL.orange1,
    chipWidth: 98,
    colour: '#CE5C40',
    note: 'Tools I use, expertise I bring, and how I keep growing.',
    // Sits high on its right so it stays clear of the chalkboard below.
    x: 62, y: 72, noteSide: 'right', noteDY: -34,
    width: 132, rot: 6,
    labelOffset: { x: 12, y: -7 },
  },
  {
    num: '05',
    id: 'contact',
    label: 'CONTACT',
    hold: BIG.blue,
    chip: SMALL.blue1,
    chipWidth: 116,
    colour: '#315075',
    note: "Let's connect! I'd love to hear about your next project.",
    x: 32, y: 88, noteSide: 'left', noteDY: 20,
    width: 138, rot: -4,
    labelOffset: { x: -2, y: 4 },
  },
];

/**
 * Decorative holds bolted around the route. Positions steer clear of the
 * headline block (roughly x 4–46%, y 12–56%) and of the five numbered holds.
 *
 * They must also stay out from under the taped notes — a hold half-hidden
 * behind paper reads as a mistake rather than as decoration. The notes are
 * placed from measured hold geometry, so their bands shift a little with
 * viewport width; these are the occupied strips to avoid:
 *   note 1  x 64–79%  y 18–30%      note 2  x 70–83%  y 37–49%
 *   note 3  x 36–49%  y 66–79%      note 4  x 66–80%  y 62–74%
 *   note 5  x 14–28%  y 84–96%
 */
export const scatter = [
  { hold: SMALL.grey3,   x: 49, y: 13, width: 30, rot: 24 },
  { hold: SMALL.yellow3, x: 79, y: 11, width: 26, rot: -14 },
  { hold: SMALL.teal2,   x: 87, y: 19, width: 42, rot: 8,   flip: true },
  { hold: SMALL.orange1, x: 88, y: 27, width: 36, rot: -22 },
  { hold: SMALL.blue3,   x: 83, y: 30, width: 26, rot: 40 },
  { hold: SMALL.teal3,   x: 94, y: 38, width: 28, rot: 12 },
  { hold: SMALL.purple1, x: 52, y: 26, width: 46, rot: -8,  flip: true },
  { hold: SMALL.yellow3, x: 46, y: 47, width: 24, rot: 33 },
  { hold: SMALL.grey2,   x: 48, y: 45, width: 34, rot: -18 },
  { hold: SMALL.blue2,   x: 72, y: 54, width: 34, rot: 16 },
  { hold: SMALL.purple3, x: 88, y: 56, width: 44, rot: -10, flip: true },
  { hold: SMALL.teal3,   x: 63, y: 52, width: 26, rot: 52 },
  { hold: SMALL.teal1,   x: 93, y: 76, width: 40, rot: 6 },
  { hold: SMALL.yellow1, x: 52, y: 62, width: 46, rot: -12 },
  { hold: SMALL.purple2, x: 24, y: 72, width: 38, rot: 20,  flip: true },
  { hold: SMALL.maroon1, x: 9,  y: 76, width: 34, rot: -6 },
  { hold: SMALL.yellow2, x: 5,  y: 62, width: 32, rot: 28 },
  { hold: SMALL.blue1,   x: 7,  y: 92, width: 44, rot: -9 },
  { hold: SMALL.grey3,   x: 46, y: 92, width: 30, rot: 14,  flip: true },
  { hold: SMALL.blue3,   x: 57, y: 96, width: 28, rot: -30 },
  { hold: SMALL.orange1, x: 74, y: 92, width: 34, rot: 18,  flip: true },
  { hold: SMALL.purple2, x: 4,  y: 22, width: 32, rot: 15 },
  { hold: SMALL.teal3,   x: 2,  y: 38, width: 26, rot: -25 },
];

/**
 * Grey volumes around the edges. Only two source photos exist, so each is
 * flipped, rotated and rescaled to keep the repetition from reading as a tile.
 */
export const volumes = [
  { vol: VOLUME.wide, x: 93, y: 9,  width: 152, rot: 14,  flip: true },
  { vol: VOLUME.tall, x: 99, y: 46, width: 168, rot: -8 },
  { vol: VOLUME.tall, x: 1,  y: 50, width: 148, rot: 168, flip: true },
  { vol: VOLUME.wide, x: 96, y: 88, width: 132, rot: -16 },
  { vol: VOLUME.tall, x: 3,  y: 92, width: 124, rot: 6 },
];

/* ── Project wall dressing ───────────────────────────────────────────────── */

/**
 * Volumes for the project wall. Kept to the edges and the floor: anything in
 * the middle competes with the three routes and reads as clutter.
 */
export const wallVolumes = [
  { vol: VOLUME.pyramid, x: 3,  y: 26, width: 210, rot: 0 },
  { vol: VOLUME.wedge,   x: 97, y: 16, width: 200, rot: 176, flip: true },
  { vol: VOLUME.tall,    x: 1,  y: 62, width: 150, rot: 10 },
  { vol: VOLUME.wedge,   x: 98, y: 56, width: 175, rot: -10 },
  // Floor volumes: `y` is a centre, so a tall volume placed near 95% hangs off
  // the bottom of the wall and shows below the mat. Keep centre + half-height
  // inside the wall and let the mat cover the base.
  { vol: VOLUME.pyramid, x: 33, y: 84, width: 160, rot: 4 },
  { vol: VOLUME.wide,    x: 86, y: 88, width: 110, rot: 170, flip: true },
];

/**
 * Decorative holds for the project wall — enough to read as a real wall rather
 * than three routes floating in space.
 *
 * Kept clear of the three route lanes (PixelPolish 5–22%, Fridgit 43–58%,
 * Evitas 78–93%) and of the three case-study notes.
 *
 * The notes are a fixed 172px wide but placed in percentages, so the band they
 * cover *widens* as the viewport narrows — at 1280 it is ~15% rather than ~11%.
 * These are the worst-case bands to avoid, not the ones you would measure on a
 * wide screen: x 27–42% y 28–47%, x 62–77% y 28–47%, x 62–77% y 60–79%.
 *
 * Colour is biased toward neutrals near the lanes so nothing competes with a
 * route's own holds; the routes are read by colour plus the dashed connector.
 */
export const wallScatter = [
  // Top band
  { hold: SMALL.grey5,   x: 14, y: 6,  width: 44, rot: -12 },
  { hold: BIG.rail,      x: 33, y: 11, width: 120, rot: -6 },
  { hold: SMALL.teal4,   x: 30, y: 4,  width: 30, rot: 20 },
  { hold: SMALL.olive1,  x: 62, y: 7,  width: 34, rot: 14 },
  { hold: SMALL.grey4,   x: 70, y: 4,  width: 32, rot: -20, flip: true },
  { hold: SMALL.yellow4, x: 86, y: 8,  width: 40, rot: 10 },
  { hold: SMALL.mauve1,  x: 97, y: 5,  width: 28, rot: -14 },
  { hold: SMALL.blue4,   x: 2,  y: 12, width: 34, rot: 8 },

  // Upper middle
  { hold: SMALL.grey6,   x: 16, y: 22, width: 40, rot: 16 },
  { hold: SMALL.maroon2, x: 28, y: 20, width: 48, rot: -10, flip: true },
  { hold: SMALL.blue5,   x: 36, y: 25, width: 32, rot: 26 },
  { hold: SMALL.grey4,   x: 48, y: 20, width: 30, rot: -18 },
  { hold: SMALL.purple6, x: 62, y: 22, width: 30, rot: 12 },
  { hold: SMALL.grey5,   x: 72, y: 26, width: 42, rot: -6,  flip: true },
  { hold: SMALL.teal4,   x: 86, y: 20, width: 30, rot: 22 },
  { hold: SMALL.purple5, x: 98, y: 24, width: 26, rot: -10 },
  { hold: SMALL.olive1,  x: 2,  y: 26, width: 32, rot: 15 },

  // Middle — the note bands are the gap in this row
  { hold: SMALL.grey6,   x: 2,  y: 36, width: 38, rot: -14 },
  { hold: SMALL.yellow4, x: 14, y: 34, width: 38, rot: 12 },
  { hold: SMALL.purple7, x: 16, y: 46, width: 44, rot: -8,  flip: true },
  { hold: SMALL.grey5,   x: 42, y: 22, width: 40, rot: 18 },
  { hold: SMALL.grey4,   x: 52, y: 47, width: 28, rot: -24 },
  { hold: SMALL.grey6,   x: 76, y: 22, width: 36, rot: 20 },
  { hold: SMALL.olive1,  x: 98, y: 40, width: 30, rot: -12 },
  { hold: SMALL.mauve1,  x: 60, y: 52, width: 28, rot: 8 },
  { hold: BIG.maroonDome, x: 34, y: 51, width: 78, rot: -10 },
  { hold: BIG.magenta,   x: 67, y: 51, width: 82, rot: 12 },

  // Lower middle
  { hold: SMALL.grey5,   x: 2,  y: 60, width: 40, rot: 10 },
  { hold: SMALL.teal4,   x: 15, y: 60, width: 30, rot: -18 },
  { hold: SMALL.grey6,   x: 28, y: 58, width: 42, rot: 14,  flip: true },
  { hold: SMALL.purple6, x: 36, y: 66, width: 30, rot: -22 },
  { hold: SMALL.yellow4, x: 30, y: 73, width: 38, rot: 16 },
  { hold: SMALL.grey4,   x: 50, y: 60, width: 30, rot: -10 },
  { hold: SMALL.maroon2, x: 65, y: 84, width: 46, rot: 12 },
  { hold: SMALL.blue5,   x: 98, y: 58, width: 30, rot: 20 },
  { hold: BIG.tan,       x: 73, y: 85, width: 72, rot: 8,   flip: true },

  // Bottom band. The mat covers everything below ~90%, so nothing sits lower
  // than 88 — a hold hidden behind the padding is just a wasted asset.
  { hold: SMALL.grey6,   x: 2,  y: 84, width: 40, rot: -12 },
  { hold: SMALL.yellow4, x: 16, y: 87, width: 36, rot: 18 },
  { hold: SMALL.grey5,   x: 27, y: 76, width: 42, rot: -6 },
  { hold: SMALL.teal4,   x: 40, y: 88, width: 30, rot: 24 },
  { hold: SMALL.grey4,   x: 52, y: 87, width: 30, rot: -20, flip: true },
  { hold: SMALL.purple5, x: 60, y: 88, width: 26, rot: 10 },
  { hold: SMALL.grey6,   x: 79, y: 88, width: 38, rot: -14 },
  { hold: SMALL.olive1,  x: 90, y: 86, width: 32, rot: 16 },
  { hold: SMALL.mauve1,  x: 98, y: 88, width: 28, rot: -18 },
];
