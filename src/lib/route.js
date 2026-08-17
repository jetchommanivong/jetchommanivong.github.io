import { useState, useRef, useLayoutEffect, useCallback } from 'react';

/**
 * Measures the centre of each hold in a route, in pixels relative to a wall.
 *
 * Percentage coordinates plus a `preserveAspectRatio="none"` SVG would be less
 * code, but it stretches dashes and arrowheads unevenly with the viewport —
 * horizontal dashes end up several times longer than vertical ones. Measuring
 * gives the connector layer a true 1:1 pixel space.
 *
 * Attach the returned refs to the *outer*, non-animating wrappers. Reading a
 * bounding box off a bobbing element returns jittering values.
 */
export function useRouteGeometry(count) {
  const wallRef = useRef(null);
  const holdRefs = useRef([]);
  const [geometry, setGeometry] = useState({ w: 0, h: 0, points: [] });

  const measure = useCallback(() => {
    const wall = wallRef.current;
    if (!wall) return;
    const wr = wall.getBoundingClientRect();

    const points = holdRefs.current.slice(0, count).map((el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: r.left - wr.left + r.width / 2,
        y: r.top - wr.top + r.height / 2,
        r: Math.max(r.width, r.height) / 2,
        // Half-extents, so callers can sit flush against a hold's real edge
        // rather than against the largest circle that contains it.
        halfW: r.width / 2,
        halfH: r.height / 2,
      };
    });

    setGeometry({ w: wr.width, h: wr.height, points });
  }, [count]);

  useLayoutEffect(() => {
    measure();

    const ro = new ResizeObserver(measure);
    if (wallRef.current) ro.observe(wallRef.current);
    holdRefs.current.forEach((el) => el && ro.observe(el));

    // Hold photos settle their layout only once decoded.
    const onLoad = () => measure();
    window.addEventListener('load', onLoad);

    return () => {
      ro.disconnect();
      window.removeEventListener('load', onLoad);
    };
  }, [measure]);

  return { wallRef, holdRefs, geometry, remeasure: measure };
}

/**
 * Builds one curved connector between two holds, trimmed at both ends so the
 * line starts and finishes clear of the photographed edges.
 *
 * `bow` is +1 or -1 and flips which side the curve bulges towards, which is
 * what gives a run of connectors its zigzag feel.
 */
export function buildConnector(a, b, bow) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  if (!len) return null;

  const ux = dx / len;
  const uy = dy / len;

  // The photo bounding box overestimates an irregular hold's real radius, and
  // consecutive holds can sit close together — so cap the trim as a share of
  // the gap, otherwise a short connector gets eaten entirely.
  const trimA = Math.min(a.r * 0.86, len * 0.3);
  const trimB = Math.min(b.r * 0.9 + 10, len * 0.34);

  const start = { x: a.x + ux * trimA, y: a.y + uy * trimA };
  const end = { x: b.x - ux * trimB, y: b.y - uy * trimB };

  const mx = (start.x + end.x) / 2;
  const my = (start.y + end.y) / 2;
  const offset = len * 0.26 * bow;
  const ctrl = { x: mx - uy * offset, y: my + ux * offset };

  // Tangent at the curve end points away from the control point.
  const angle = (Math.atan2(end.y - ctrl.y, end.x - ctrl.x) * 180) / Math.PI;

  return {
    d: `M ${start.x} ${start.y} Q ${ctrl.x} ${ctrl.y} ${end.x} ${end.y}`,
    tip: end,
    angle,
  };
}
