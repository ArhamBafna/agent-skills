# Animation Spec & Storyboard Template

This template is a **state-sequence blueprint** (chassis), NOT a stylistic preset. It maps out time states and spring values before writing code.

---

## Anti-Contagion Rule (DO NOT Copy Examples Literally)
Most AI motion videos suffer from "brief contagion": they all copy the same dark-mode SaaS card morphing with purple glows.
**DO NOT repeat this mistake.** Adapt this spec completely to the user's brand, palette, and product category.

---

## 1. Metadata
* **Project**: `<Product, Brand, or Concept Name>`
* **Goal**: `<Launch Reel | UI Morph Loop | Kinetic Typography | Feature Showcase>`
* **Style Direction**: `<e.g. Brutalist Minimalist, Warm Organic, High-Gloss Tech, Bold Editorial, Playful>`
* **Duration**: `<Seconds, default 15s>`
* **FPS**: `60`
* **Aspect Ratio**: `<16:9 (1920x1080) | 9:16 (1080x1920) | 1:1 (1080x1080) | All>`
* **Audio**: `<path/to/audio.mp3 | None>`

---

## 2. Visual Palette & Brand Identity
* **Background**: `<Base canvas color, e.g. #090A0F, #FAFAF9, or #18181B>`
* **Primary / Accent**: `<Hex color>`
* **Secondary**: `<Hex color>`
* **Typography**: `<Font family, weight, tracking>`
* **Asset Manifest**:
  * Real product screenshots / mockups
  * Brand logo (SVG or high-res PNG)
  * Vector icons / illustrations

---

## 3. Beat Sheet (Keyframe Timeline)

Divide the timeline into 4-6 distinct moments with visual payoffs every 2-3 seconds. Choose the archetype that matches the project:

### Archetype A: Product Launch Reel (Showcase)
| Time | State | Visual Action | Spring Preset |
| :--- | :--- | :--- | :--- |
| `0.0s - 2.5s` | **Hook** | Bold headline enters with high mass; logo settles | `heavy` |
| `2.5s - 6.0s` | **Hero UI** | Real app interface slides into center; key metric badge highlights | `default` |
| `6.0s - 10.0s` | **Feature Drop** | Interface zooms into interactive tool; cursor triggers instant action | `snappy` |
| `10.0s - 13.0s` | **Speed/Proof** | High-energy split screen or metric counter ticking up | `snappy` |
| `13.0s - 15.0s` | **Call to Action** | Layout settles into clean resting card, URL, and launch badge | `playful` |

### Archetype B: Kinetic Typography (Editorial / Fast-Paced)
| Time | State | Visual Action | Spring Preset |
| :--- | :--- | :--- | :--- |
| `0.0s - 3.0s` | **Strobe / Punch** | Massive oversized words snapping to center grid; sharp cuts | `snappy` |
| `3.0s - 7.0s` | **Statement** | Contrast inversion (light to dark); staggered letter tracking | `heavy` |
| `7.0s - 11.0s` | **Feature Rhythm** | 3 rapid-fire value statements sliding across screen | `snappy` |
| `11.0s - 15.0s` | **Lockup** | Letters collapse into final brand mark and website URL | `default` |

### Archetype C: UI Morph Loop (Single Continuous Element)
| Time | State | Visual Action | Spring Preset |
| :--- | :--- | :--- | :--- |
| `0.0s - 2.5s` | **Origin** | Small button or search bar sits at rest | `default` |
| `2.5s - 6.5s` | **Expansion** | Cursor clicks; button expands into full modal / dashboard view | `snappy` |
| `6.5s - 11.0s` | **Transformation** | Modal morphs into interactive slider or data chart | `default` |
| `11.0s - 15.0s` | **Return Loop** | Chart contracts seamlessly back to original button shape (seamless loop) | `playful` |

---

## 4. State List & Morph Mapping

Define animated parameters across keyframes for `Motion.track(t, keyframes)`:

```javascript
// Example: Driving a dynamic container without re-simulating physics
const containerStates = [
  { t: 0.0, value: { width: 200, height: 60, radius: 30, opacity: 0 }, preset: 'heavy' },
  { t: 0.4, value: { width: 200, height: 60, radius: 30, opacity: 1 }, preset: 'heavy' },
  { t: 2.5, value: { width: 720, height: 480, radius: 16, opacity: 1 }, preset: 'default' },
  { t: 7.0, value: { width: 840, height: 220, radius: 12, opacity: 1 }, preset: 'snappy' },
  { t: 12.0, value: { width: 340, height: 80, radius: 40, opacity: 1 }, preset: 'playful' }
];
```

---

## 5. Gotchas & Constraints Checklist
- [ ] No `setInterval`, `setTimeout`, or `requestAnimationFrame` used for animation timing.
- [ ] Every element position is calculated strictly as a function of `t`.
- [ ] Responsive sizing (`vw`, `vh`, `%`, or SVG viewBox) so it works across 16:9, 9:16, and 1:1.
- [ ] No generic placeholder text ("Lorem Ipsum", "Amazing App") — use real product content.
