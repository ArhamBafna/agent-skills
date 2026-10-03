# Animation Spec Template

State-sequence blueprint. Maps time states and spring values. Not a stylistic preset.

---

## Anti-Contagion Rule
Never copy generic purple gradient card morphs. Derive states, palette, and timing strictly from user project.

---

## 1. Metadata
* **Project**: `<Name>`
* **Goal**: `<Launch Reel | UI Morph Loop | Kinetic Typography | Feature Showcase>`
* **Style**: `<Brutalist, Editorial, High-Tech, Playful, Retro>`
* **Duration**: `<Seconds, default 15s>`
* **FPS**: `60`
* **Aspect Ratio**: `<16:9 | 9:16 | 1:1 | All>`
* **Audio**: `<path/to/audio.mp3 | None>`

---

## 2. Palette & Identity
* **Background**: `<Base hex>`
* **Primary / Accent**: `<Hex>`
* **Secondary**: `<Hex>`
* **Typography**: `<Family, weight, tracking>`
* **Assets**: Screenshots, SVG logos, vector icons.

---

## 3. Beat Sheet (Keyframe Timeline)

Divide timeline into 4-6 moments. Visual payoff every 2-3 seconds. Adapt archetype:

### Archetype A: Product Launch Reel
| Time | State | Action | Spring |
| :--- | :--- | :--- | :--- |
| `0.0s - 2.5s` | **Hook** | Bold headline enters, logo settles | `heavy` |
| `2.5s - 6.0s` | **Hero UI** | Real app interface enters center; metric badge pops | `default` |
| `6.0s - 10.0s` | **Feature** | Zoom into interactive tool; cursor clicks action | `snappy` |
| `10.0s - 13.0s` | **Proof** | Metric counter ticks up, fast-paced rhythm | `snappy` |
| `13.0s - 15.0s` | **CTA** | Layout settles to resting card, URL, badge | `playful` |

### Archetype B: Kinetic Typography
| Time | State | Action | Spring |
| :--- | :--- | :--- | :--- |
| `0.0s - 3.0s` | **Punch** | Oversized words snap to center grid | `snappy` |
| `3.0s - 7.0s` | **Statement** | Contrast inversion, staggered letter tracking | `heavy` |
| `7.0s - 11.0s` | **Rhythm** | 3 rapid value statements slide across screen | `snappy` |
| `11.0s - 15.0s` | **Lockup** | Letters collapse into brand mark and URL | `default` |

### Archetype C: UI Morph Loop
| Time | State | Action | Spring |
| :--- | :--- | :--- | :--- |
| `0.0s - 2.5s` | **Origin** | Small button or search bar rests | `default` |
| `2.5s - 6.5s` | **Expansion** | Cursor click; button morphs to dashboard view | `snappy` |
| `6.5s - 11.0s` | **Transform** | View morphs to slider or interactive chart | `default` |
| `11.0s - 15.0s` | **Return** | Chart contracts back to start shape (seamless loop) | `playful` |

---

## 4. Morph Mapping

Keyframe properties for `Motion.track(t, keyframes)`:

```javascript
const containerStates = [
  { t: 0.0, value: { width: 200, height: 60, radius: 30, opacity: 0 }, preset: 'heavy' },
  { t: 0.4, value: { width: 200, height: 60, radius: 30, opacity: 1 }, preset: 'heavy' },
  { t: 2.5, value: { width: 720, height: 480, radius: 16, opacity: 1 }, preset: 'default' },
  { t: 7.0, value: { width: 840, height: 220, radius: 12, opacity: 1 }, preset: 'snappy' },
  { t: 12.0, value: { width: 340, height: 80, radius: 40, opacity: 1 }, preset: 'playful' }
];
```

---

## 5. Constraints
- [ ] No `setInterval`, `setTimeout`, `requestAnimationFrame`.
- [ ] Element positions derived strictly from `t`.
- [ ] Responsive sizing (`vw`, `vh`, `%`, SVG viewBox).
- [ ] Real project copy, zero placeholder text.
