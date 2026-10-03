/**
 * Closed-form analytical spring physics for deterministic seek(t) animation.
 * Evaluates any frame at time t directly in O(1) without stepping through history.
 */

// Presets for common motion design feel:
export const SPRING_PRESETS = {
  // Snappy UI: buttons, toggles, leading edges, fast responses
  snappy: { stiffness: 350, damping: 26, mass: 1 },

  // Default: cards, dialogs, smooth containers, camera transitions
  default: { stiffness: 180, damping: 20, mass: 1 },

  // Heavy: large typography, 3D cards, brand logos, weighty entrances
  heavy: { stiffness: 120, damping: 18, mass: 2 },

  // Playful: badges, stickers, success icons with visible bounce/overshoot
  playful: { stiffness: 220, damping: 14, mass: 1 }
};

/**
 * Analytical solution to damped harmonic oscillator.
 * target: resting position
 * initial: starting position at t=0
 * initialVelocity: initial speed (default 0)
 * t: elapsed seconds since spring triggered
 * config: { stiffness, damping, mass }
 */
export function springValue(target, initial = 0, initialVelocity = 0, t = 0, config = SPRING_PRESETS.default) {
  if (t <= 0) return initial;

  const m = config.mass || 1;
  const k = config.stiffness || 180;
  const c = config.damping || 20;

  const w0 = Math.sqrt(k / m); // natural frequency
  const zeta = c / (2 * Math.sqrt(k * m)); // damping ratio
  const x0 = initial - target;

  if (zeta < 1) {
    // Under-damped (oscillation with overshoot)
    const wd = w0 * Math.sqrt(1 - zeta * zeta); // damped frequency
    const a = x0;
    const b = (initialVelocity + zeta * w0 * x0) / wd;
    const envelope = Math.exp(-zeta * w0 * t);
    return target + envelope * (a * Math.cos(wd * t) + b * Math.sin(wd * t));
  } else if (zeta === 1) {
    // Critically damped (fastest settle with no overshoot)
    const a = x0;
    const b = initialVelocity + w0 * x0;
    return target + Math.exp(-w0 * t) * (a + b * t);
  } else {
    // Over-damped (sluggish, zero overshoot)
    const s1 = -w0 * (zeta - Math.sqrt(zeta * zeta - 1));
    const s2 = -w0 * (zeta + Math.sqrt(zeta * zeta - 1));
    const c1 = (initialVelocity - s2 * x0) / (s1 - s2);
    const c2 = x0 - c1;
    return target + c1 * Math.exp(s1 * t) + c2 * Math.exp(s2 * t);
  }
}

/**
 * Multi-target spring tracker:
 * Allows a single animated property (e.g. cursor X, container width)
 * to transition between multiple keyframe targets over time without restarting simulation.
 *
 * keyframes: [
 *   { t: 0.0, value: 0 },
 *   { t: 1.5, value: 200, preset: 'snappy' },
 *   { t: 3.0, value: 150, preset: 'playful' }
 * ]
 */
export function track(t, keyframes) {
  if (!keyframes || keyframes.length === 0) return 0;
  if (t <= keyframes[0].t) return keyframes[0].value;

  let currentVal = keyframes[0].value;
  for (let i = 1; i < keyframes.length; i++) {
    const kf = keyframes[i];
    if (t < kf.t) break;

    const prevVal = keyframes[i - 1].value;
    const config = SPRING_PRESETS[kf.preset] || kf.config || SPRING_PRESETS.default;
    const elapsed = t - kf.t;

    // Transition from previous target to new target starting at kf.t
    currentVal = springValue(kf.value, prevVal, 0, elapsed, config);
  }

  return currentVal;
}

/**
 * Standard smooth interpolator helpers
 */
export function clamp(v, min = 0, max = 1) {
  return Math.min(Math.max(v, min), max);
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function smoothstep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

// UMD / Global export fallback for direct script tag inclusion in HTML
if (typeof window !== 'undefined') {
  window.Motion = {
    SPRING_PRESETS,
    springValue,
    track,
    clamp,
    lerp,
    smoothstep
  };
}
