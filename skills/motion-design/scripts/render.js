#!/usr/bin/env node

/**
 * Portable deterministic frame-by-frame renderer for code-driven motion graphics.
 * Evaluates window.seek(t) in headless Chromium and stitches frames via FFmpeg.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync, spawn } = require('child_process');

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    input: 'index.html',
    output: 'output.mp4',
    fps: 60,
    duration: 15,
    width: 1920,
    height: 1080,
    audio: null,
    keepFrames: false,
    stillsCount: 6,
    stillsDir: 'stills'
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--input' || arg === '-i') options.input = args[++i];
    else if (arg === '--output' || arg === '-o') options.output = args[++i];
    else if (arg === '--fps') options.fps = parseInt(args[++i], 10);
    else if (arg === '--duration' || arg === '-d') options.duration = parseFloat(args[++i]);
    else if (arg === '--width' || arg === '-w') options.width = parseInt(args[++i], 10);
    else if (arg === '--height' || arg === '-h') options.height = parseInt(args[++i], 10);
    else if (arg === '--audio' || arg === '-a') options.audio = args[++i];
    else if (arg === '--keep-frames') options.keepFrames = true;
    else if (arg === '--stills-count') options.stillsCount = parseInt(args[++i], 10);
    else if (arg === '--stills-dir') options.stillsDir = args[++i];
  }
  return options;
}

function checkFfmpeg() {
  const res = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' });
  if (res.error || res.status !== 0) {
    console.error('Error: ffmpeg is not found in PATH.');
    console.error('Install ffmpeg:');
    console.error('  Windows: winget install Gyan.FFmpeg   (or choco install ffmpeg)');
    console.error('  macOS:   brew install ffmpeg');
    console.error('  Linux:   sudo apt-get install ffmpeg');
    process.exit(1);
  }
}

async function getBrowser() {
  try {
    const { chromium } = require('playwright');
    return await chromium.launch({ headless: true });
  } catch (err) {
    console.error('Playwright not found in local node_modules. Attempting to require @playwright/test or playwright-core...');
    try {
      const { chromium } = require('playwright-core');
      return await chromium.launch({ headless: true });
    } catch (e) {
      console.error('Error: Playwright is required to render frames.');
      console.error('Please run: npm install -D playwright');
      process.exit(1);
    }
  }
}

async function render() {
  const opts = parseArgs();
  checkFfmpeg();

  const inputPath = path.resolve(process.cwd(), opts.input);
  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Input file not found: ${inputPath}`);
    process.exit(1);
  }

  const framesDir = path.resolve(process.cwd(), '.motion_frames_tmp');
  const stillsDir = path.resolve(process.cwd(), opts.stillsDir);

  if (fs.existsSync(framesDir)) {
    fs.rmSync(framesDir, { recursive: true, force: true });
  }
  fs.mkdirSync(framesDir, { recursive: true });
  fs.mkdirSync(stillsDir, { recursive: true });

  console.log(`Starting render:`);
  console.log(`- Input:    ${inputPath}`);
  console.log(`- Output:   ${opts.output}`);
  console.log(`- Res:      ${opts.width}x${opts.height} @ ${opts.fps}fps`);
  console.log(`- Duration: ${opts.duration}s (${Math.round(opts.duration * opts.fps)} frames)`);

  const browser = await getBrowser();
  const page = await browser.newPage({
    viewport: { width: opts.width, height: opts.height },
    deviceScaleFactor: 1
  });

  const fileUrl = 'file://' + inputPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'load' });

  // Verify seek function exists
  const hasSeek = await page.evaluate(() => typeof window.seek === 'function');
  if (!hasSeek) {
    console.error('Error: window.seek(t) is not defined on the page.');
    console.error('Make sure index.html defines window.seek(t) to render the animation at time t.');
    await browser.close();
    process.exit(1);
  }

  const totalFrames = Math.round(opts.duration * opts.fps);
  const stillIndices = new Set();
  if (opts.stillsCount > 0) {
    const step = Math.floor(totalFrames / (opts.stillsCount + 1));
    for (let s = 1; s <= opts.stillsCount; s++) {
      stillIndices.add(Math.min(totalFrames - 1, s * step));
    }
  }

  console.log(`Capturing ${totalFrames} frames...`);

  for (let f = 0; f < totalFrames; f++) {
    const t = f / opts.fps;
    await page.evaluate((time) => window.seek(time), t);

    const frameNum = String(f).padStart(6, '0');
    const frameFile = path.join(framesDir, `frame_${frameNum}.png`);
    await page.screenshot({ path: frameFile, type: 'png' });

    if (stillIndices.has(f)) {
      const stillFile = path.join(stillsDir, `keyframe_${frameNum}_${t.toFixed(2)}s.png`);
      fs.copyFileSync(frameFile, stillFile);
    }

    if (f % Math.max(1, Math.floor(opts.fps * 2)) === 0 || f === totalFrames - 1) {
      const pct = Math.round(((f + 1) / totalFrames) * 100);
      process.stdout.write(`\rProgress: [${pct}%] Frame ${f + 1}/${totalFrames} (${t.toFixed(2)}s)`);
    }
  }

  console.log('\nFrame capture complete. Closing browser...');
  await browser.close();

  // Stitch with FFmpeg
  console.log('Stitching video with FFmpeg...');
  const outputPath = path.resolve(process.cwd(), opts.output);

  const ffmpegArgs = [
    '-y',
    '-r', String(opts.fps),
    '-i', path.join(framesDir, 'frame_%06d.png')
  ];

  if (opts.audio && fs.existsSync(path.resolve(process.cwd(), opts.audio))) {
    console.log(`Muxing audio from: ${opts.audio}`);
    ffmpegArgs.push('-i', path.resolve(process.cwd(), opts.audio));
    ffmpegArgs.push('-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-shortest');
  } else {
    ffmpegArgs.push('-c:v', 'libx264', '-pix_fmt', 'yuv420p');
  }

  ffmpegArgs.push(outputPath);

  const res = spawnSync('ffmpeg', ffmpegArgs, { stdio: 'inherit' });
  if (res.error || res.status !== 0) {
    console.error('FFmpeg encoding failed.');
    process.exit(1);
  }

  if (!opts.keepFrames) {
    fs.rmSync(framesDir, { recursive: true, force: true });
  }

  console.log(`\nRender succeeded!`);
  console.log(`Video saved to: ${outputPath}`);
  console.log(`Keyframe stills saved to: ${stillsDir}`);
}

render().catch((err) => {
  console.error('Fatal render error:', err);
  process.exit(1);
});
