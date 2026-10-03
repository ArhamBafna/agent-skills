---
name: motion-design
description: Build deterministic, code-rendered motion design videos, product launch reels, UI state morph loops, and kinetic typography using pure HTML/Canvas/SVG, closed-form springs, Playwright, and FFmpeg. Use when asked to create a promo video, animate UI components, produce a product launch showreel, build kinetic motion graphics, render animation to MP4, or when invoking /motion-design.
---

# Motion Design Studio

Deterministic code-to-video studio. Writes `index.html`, runs `window.seek(t)`, captures frames via headless browser (`scripts/render.js`), stitches with FFmpeg.

---

## Core Rules (Anti-AI Slop)

1. **No async timers**: Never use `setTimeout`, `setInterval`, or `Date.now()`. Time fluctuates under CPU load. All state must be pure math function of time: `window.seek(t)`.
2. **No standard CSS bezier curves for mass**: Curves lack weight. Use closed-form springs (`references/motion.js`) for inertia, momentum, overshoot.
3. **No 16:9 to 9:16 crop**: Re-layout type, cards, UI responsive to canvas size.
4. **Never skip stills inspection**: Check keyframe stills before finish. Fix text clipping, overlap, empty canvas.
5. **Deterministic randomness**: Seed noise/randomness. Frame at time $t$ must render identical pixels every run.
6. **No generic AI aesthetic**: Avoid purple gradient soup with floating cards. Pick intentional direction: Brutalist, Editorial, Kinetic, Playful.

---

## Phased Workflow

```
[1: Tool Check] -> [2: Codebase Scan & Confirm] -> [3: Intake Interview]
       |
[4: Setup & Staging] -> [5: Code Assembly (seek(t))] -> [6: Render & Stitch]
       |
[7: Two-Stage Critique] -> [8: Final Export]
```

---

### Phase 1: Pre-flight Tool Verification

Verify tools:
1. `node -v`
2. `ffmpeg -version`
3. `npx playwright --version`

**Tool missing**:
- Show install command:
  - Windows: `winget install Gyan.FFmpeg` / `winget install OpenJS.NodeJS`
  - macOS: `brew install ffmpeg node`
  - Linux: `sudo apt-get install ffmpeg nodejs npm`
- Ask user: "Tool X missing. Install for you or install manual?" Wait confirmation.

**Criterion**: `node`, `ffmpeg`, `npx playwright` succeed.

---

### Phase 2: Codebase Scan & User Confirmation

Scan workspace first. Never ask user for existing info:
1. Scan root: `package.json`, `README.md`, assets (`public/`, `assets/`, `images/`), CSS color tokens.
2. Extract: name, headline/tagline, colors (Primary, Accent, Background), logo/image assets.
3. Confirm with user:
   > "Found: Name: [X], Headline: [Y], Colors: [Z], Assets: [W]. Correct or adjust?"

**Criterion**: User confirms or adjusts brand info.

---

### Phase 3: Intake Interview

Ask user missing production parameters:
1. **Target Folder**: Suggest `./motion/`.
2. **Animation Style**: Product Launch Reel, UI Morph Loop, or Kinetic Typography.
3. **Aspect Ratio**: `16:9` (1920x1080), `9:16` (1080x1920), `1:1` (1080x1080), or `All three`.
4. **Duration**: Default 15s (5s-60s custom).
5. **Audio**: Ask yes/no. If yes, get file path (`.mp3`/`.wav`). If no, proceed silent.

**Criterion**: All 5 parameters confirmed.

---

### Phase 4: Setup & Staging

1. Create target folder (e.g. `./motion/`).
2. Copy bundled tools from skill path:
   - Copy `scripts/render.js` -> `<target-folder>/render.js`
   - Copy `references/motion.js` -> `<target-folder>/motion.js`
3. Stage audio file if provided.
4. **Load references**:
   - Short reel / UI morph / kinetic text: read [`references/spec-template.md`](references/spec-template.md). Do NOT load `director-brief-template.md`.
   - Multi-scene story film: read [`references/director-brief-template.md`](references/director-brief-template.md). Do NOT load `spec-template.md`.

**Criterion**: Target folder has `render.js`, `motion.js`, staged assets, and `SPEC.md`.

---

### Phase 5: Code Assembly (`index.html`)

Write self-contained `index.html` in target folder:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 100vw; height: 100vh; overflow: hidden;
      background: #090a0f; display: flex; align-items: center; justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    #stage { position: relative; width: 100%; height: 100%; overflow: hidden; }
  </style>
  <script src="./motion.js"></script>
</head>
<body>
  <div id="stage"><!-- UI, SVG, Canvas --></div>
  <script>
    window.seek = function(t) {
      // 1. Compute values: Motion.track(t, keyframes)
      // 2. Apply to DOM transforms, opacities, canvas
    };
  </script>
</body>
</html>
```

#### Motion Guidelines
- **Spring presets**:
  - `snappy` (350/26): buttons, toggles, badges.
  - `default` (180/20): cards, layout changes, camera moves.
  - `heavy` (120/18, mass 2): headlines, brand logos.
  - `playful` (220/14): celebratory icons, bounce tags.
- **Multi-target moves**: Use `Motion.track(t, keyframes)`. Never reset simulation.
- **Rhythm**: Shift visual state every 2-3 seconds.

**Criterion**: `index.html` loads cleanly. `window.seek(t)` runs without error for all $t \in [0, \text{duration}]$.

---

### Phase 6: Frame Rendering & Stitching

Run renderer via Node.js in project folder:

```powershell
# 16:9 Widescreen
node render.js --input index.html --output output.mp4 --fps 60 --duration 15 --width 1920 --height 1080

# With Audio
node render.js --input index.html --output output.mp4 --fps 60 --duration 15 --width 1920 --height 1080 --audio music.mp3

# 9:16 Vertical
node render.js --input index.html --output output_vertical.mp4 --fps 60 --duration 15 --width 1080 --height 1920
```

Script actions:
1. Launch headless Chromium, verify `window.seek`.
2. Capture $N$ frames at 60fps to temp directory.
3. Save 6 keyframes to `./stills/`.
4. Encode MP4 with FFmpeg (mux audio if provided).

**Criterion**: `output.mp4` and stills in `./stills/` exist on disk.

---

### Phase 7: Two-Stage Critique

#### Stage 7A: Autonomous Visual Critique
1. Inspect images in `./stills/` (`keyframe_*.png`).
2. Grade 5 pillars (target >= 8/10):
   - Text inside borders, no clipping.
   - High contrast against background.
   - Elements centered or cleanly anchored.
   - All fonts, SVGs, images loaded.
3. Flaws found: edit `index.html`, re-render, repeat until pass.

#### Stage 7B: Human Review
1. Report file paths:
   - Final `output.mp4` path.
   - Keyframe images in `./stills/`.
   - Scene timeline summary.
2. Ask user for review or desired adjustments.

**Criterion**: Autonomous check passes; user reviews final video.

---

## Troubleshooting

| Problem | Cause | Fix |
| :--- | :--- | :--- |
| `window.seek is not defined` | JS syntax error in `index.html` | Check browser console for errors. |
| Playwright missing | Package not installed | Run `npm install -D playwright` in project folder. |
| Stuttering video | Used `Date.now()` or linear math | Use `Motion.track(t, keyframes)` with closed-form springs. |
| Text cut off in 9:16 | Hardcoded pixel widths | Use responsive units (`vw`, `%`, `clamp()`) or compute in `seek(t)`. |
| FFmpeg error | Missing codec or PATH missing | Verify `ffmpeg -version` in PATH. |
