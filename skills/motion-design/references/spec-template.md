# Animation Spec & Storyboard Template

Use this template to map out the motion sequence before writing code. A strong spec prevents visual clutter and ensures clean transitions.

---

## 1. Metadata
* **Project**: `<Product or Feature Name>`
* **Goal**: `<Launch reel / UI morph / Feature showcase / Kinetic text>`
* **Duration**: `<Seconds, e.g. 15s>`
* **FPS**: `60`
* **Aspect Ratio**: `<16:9 (1920x1080) | 9:16 (1080x1920) | 1:1 (1080x1080)>`
* **Audio**: `<path/to/audio.mp3 | None>`

---

## 2. Visual Palette & Brand
* **Background**: `<Hex color or gradient, e.g. #090A0F>`
* **Primary / Accent**: `<Hex color, e.g. #4F46E5>`
* **Text Main**: `<Hex color, e.g. #F8FAFC>`
* **Text Muted**: `<Hex color, e.g. #94A3B8>`
* **Font Family**: `<e.g. system-ui, Inter, Outfit, or local SVG paths>`
* **Asset List**:
  * Logo: `<path or inline SVG>`
  * UI Screenshots / Mockups: `<paths>`

---

## 3. Beat Sheet (Keyframe Timeline)

Divide the timeline into clear states. Aim for visual payoff every 2-3 seconds.

| Time Range | State Name | Visual Action | Spring Preset |
| :--- | :--- | :--- | :--- |
| `0.0s - 2.5s` | **Hook / Hero** | Central badge enters with overshoot; brand headline types in | `heavy` |
| `2.5s - 5.5s` | **UI Morph 1** | Hero badge expands into interactive card; cursor clicks button | `snappy` |
| `5.5s - 9.0s` | **Feature Showcase** | Card morphs into data visualizer / command bar; metrics tick up | `default` |
| `9.0s - 12.0s` | **Speed / Power** | Fast cuts, kinetic typography highlighting 3 core values | `snappy` |
| `12.0s - 15.0s` | **Call to Action** | UI folds into glowing CTA pill; logo lockup settles | `playful` |

---

## 4. State List & Morph Mapping

Define the properties of the morphing elements across states so the `track(t, keyframes)` function can interpolate them smoothly:

```javascript
const morphStates = {
  container: [
    { t: 0.0, value: { width: 120, height: 120, radius: 60, opacity: 0 }, preset: 'heavy' },
    { t: 0.5, value: { width: 120, height: 120, radius: 60, opacity: 1 }, preset: 'heavy' },
    { t: 2.5, value: { width: 680, height: 420, radius: 24, opacity: 1 }, preset: 'default' },
    { t: 8.5, value: { width: 780, height: 180, radius: 16, opacity: 1 }, preset: 'snappy' },
    { t: 12.5, value: { width: 320, height: 72, radius: 36, opacity: 1 }, preset: 'playful' }
  ],
  cursor: [
    { t: 0.0, value: { x: -100, y: -100, visible: 0 } },
    { t: 3.0, value: { x: 450, y: 320, visible: 1 }, preset: 'default' },
    { t: 4.2, value: { x: 520, y: 380, visible: 1, click: true }, preset: 'snappy' }
  ]
};
```

---

## 5. Gotchas & Constraints Checklist
- [ ] No `setInterval`, `setTimeout`, or `requestAnimationFrame` used for animation timing.
- [ ] Every element position is calculated strictly as a function of `t`.
- [ ] Aspect ratio responsive: elements sized via `%`, `vmin`, `vmax`, or scaled coordinate system.
- [ ] Last frame matches first frame if looping is required.
