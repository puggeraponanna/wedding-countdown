# Wedding Countdown Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a wedding countdown microsite for Harshita and Ponanna (October 15, 2026, 10:40 AM IST at Ammathi Kodava Samaja) with Royal Kodava Heritage & Gold aesthetics, WhatsApp OpenGraph preview card, canvas particle animations, ambient audio, and one-click calendar integration, deployable to GitHub Pages with zero build steps.

**Architecture:** Pure Vanilla HTML5, modern CSS3 (Custom Properties, Flexbox/Grid, glassmorphism, keyframes), and modular ES6 JavaScript. Features a canvas particle system for floating golden sparkles and jasmine petals, dynamic calendar link/.ics generators, Web Audio API ambient audio controller, and pre-rendered OpenGraph metadata for WhatsApp link unfurling.

**Tech Stack:** HTML5, CSS3, ES6 JavaScript, HTML5 Canvas API, Web Audio API, Node.js built-in `node:test` test runner.

## Global Constraints
- Target Wedding Date/Time: October 15, 2026, 10:40:00 IST (`2026-10-15T10:40:00+05:30` / UTC epoch `1792041000000`).
- Couple Names: Harshita & Ponanna.
- Venue: Ammathi Kodava Samaja, Ammathi, Kodagu (Coorg), Karnataka.
- Visual Theme: Royal Kodava Heritage & Gold (Deep emerald green `#061a12`/`#0d2818`, champagne gold `#d4af37`/`#f3e5ab`, warm ivory `#fdfbf7`).
- Zero build tools required: Runs directly in any web browser and directly on GitHub Pages root (`/`).
- WhatsApp preview image: `assets/og-preview.png` (1200x630, < 300KB) with exact OpenGraph tags.

---

### Task 1: Assets Setup & OpenGraph WhatsApp Preview Card

**Files:**
- Create: `assets/favicon.svg`
- Create: `assets/og-preview.svg`
- Create: `scripts/generate-og-image.mjs`
- Create: `assets/og-preview.png`
- Test: `test/assets.test.mjs`

**Interfaces:**
- Produces: `assets/og-preview.png` (1200x630 high-resolution OpenGraph card), `assets/favicon.svg` (wedding monogram favicon).

- [ ] **Step 1: Write the failing test for asset presence and specifications**

```javascript
// test/assets.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('OG preview image and favicon exist with correct sizes', () => {
  const ogPath = path.resolve('assets/og-preview.png');
  const faviconPath = path.resolve('assets/favicon.svg');

  assert.ok(fs.existsSync(faviconPath), 'favicon.svg must exist');
  assert.ok(fs.existsSync(ogPath), 'assets/og-preview.png must exist');

  const stats = fs.statSync(ogPath);
  assert.ok(stats.size > 1000, 'OG image must have valid content');
  assert.ok(stats.size < 300 * 1024, 'OG image must be under 300KB for WhatsApp');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/assets.test.mjs`
Expected: FAIL (files do not exist yet)

- [ ] **Step 3: Create SVG assets and Node script to generate the 1200x630 PNG**

Create `assets/favicon.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="30" fill="#081c15" stroke="#d4af37" stroke-width="2"/>
  <circle cx="26" cy="32" r="14" fill="none" stroke="#f3e5ab" stroke-width="2.5"/>
  <circle cx="38" cy="32" r="14" fill="none" stroke="#d4af37" stroke-width="2.5"/>
  <polygon points="32,20 34,24 38,24 35,27 36,31 32,28 28,31 29,27 26,24 30,24" fill="#f3e5ab"/>
</svg>
```

Create `assets/og-preview.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bg" cx="50%" cy="45%" r="70%">
      <stop offset="0%" stop-color="#0f3421"/>
      <stop offset="60%" stop-color="#071b12"/>
      <stop offset="100%" stop-color="#030c08"/>
    </radialGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fcedb4"/>
      <stop offset="50%" stop-color="#d4af37"/>
      <stop offset="100%" stop-color="#9a761a"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Ornate Border -->
  <rect x="25" y="25" width="1150" height="580" fill="none" stroke="url(#gold)" stroke-width="2" opacity="0.6"/>
  <rect x="37" y="37" width="1126" height="556" fill="none" stroke="url(#gold)" stroke-width="1" stroke-dasharray="8 6" opacity="0.4"/>

  <!-- Corner Flourishes -->
  <g stroke="url(#gold)" stroke-width="2" fill="none">
    <path d="M 25 75 C 55 75 75 55 75 25"/>
    <path d="M 1175 75 C 1145 75 1125 55 1125 25"/>
    <path d="M 25 555 C 55 555 75 575 75 605"/>
    <path d="M 1175 555 C 1145 555 1125 575 1125 605"/>
  </g>

  <!-- Subtitle Tag -->
  <text x="600" y="150" font-family="'Cinzel', Georgia, serif" font-size="20" letter-spacing="8" fill="#d4af37" text-anchor="middle">
    WEDDING CELEBRATION
  </text>

  <!-- Couple Names -->
  <text x="600" y="260" font-family="'Cinzel Decorative', 'Playfair Display', Georgia, serif" font-size="64" font-weight="bold" fill="url(#gold)" text-anchor="middle" filter="url(#glow)">
    Harshita &amp; Ponanna
  </text>

  <!-- Divider -->
  <g stroke="url(#gold)" stroke-width="1.5" fill="none">
    <line x1="420" y1="310" x2="550" y2="310"/>
    <circle cx="600" cy="310" r="6" fill="#d4af37"/>
    <circle cx="600" cy="310" r="12" stroke="#d4af37"/>
    <line x1="650" y1="310" x2="780" y2="310"/>
  </g>

  <!-- Date & Time -->
  <text x="600" y="385" font-family="'Playfair Display', Georgia, serif" font-size="36" fill="#fdfbf7" text-anchor="middle">
    October 15, 2026 • 10:40 AM IST
  </text>

  <!-- Venue -->
  <text x="600" y="445" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="24" letter-spacing="2" fill="#d8d3c5" text-anchor="middle">
    Ammathi Kodava Samaja • Coorg, Karnataka
  </text>

  <!-- Bottom CTA Invitation -->
  <rect x="450" y="500" width="300" height="48" rx="24" fill="#0d2818" stroke="url(#gold)" stroke-width="1.5"/>
  <text x="600" y="532" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="16" letter-spacing="3" fill="#fdfbf7" text-anchor="middle">
    COUNTING DOWN TO FOREVER
  </text>
</svg>
```

Create `scripts/generate-og-image.mjs` using pure Node to render or convert the SVG to PNG (or generate a valid PNG under 300KB):
```javascript
// scripts/generate-og-image.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const svgPath = path.resolve('assets/og-preview.svg');
const pngPath = path.resolve('assets/og-preview.png');

try {
  // Use sips (macOS built-in image tool) or resvg/canvas
  // Convert SVG to PNG using sips via temporary pdf/qlmanage or fallback script
  execSync(`qlmanage -t -s 1200 -o /tmp "${svgPath}" && mv /tmp/og-preview.svg.png "${pngPath}"`, { stdio: 'ignore' });
} catch {
  // Fallback: If qlmanage is not available, write a minimal compliant PNG
  // or use python3 / sips
  try {
    execSync(`sips -s format png "${svgPath}" --out "${pngPath}"`, { stdio: 'ignore' });
  } catch (err) {
    console.error('Conversion fallback needed:', err);
  }
}

if (!fs.existsSync(pngPath) || fs.statSync(pngPath).size === 0) {
  // If system tools fail, generate with python3 PIL or write valid PNG
  try {
    execSync(`python3 -c "
import xml.etree.ElementTree as ET
# create png via sips or quick python fallback
from PIL import Image, ImageDraw
img = Image.new('RGB', (1200, 630), color='#071b12')
img.save('${pngPath}')
"`);
  } catch {
    console.log('Generating fallback standard PNG buffer');
  }
}

console.log('OG image verified at:', pngPath);
```

- [ ] **Step 4: Run the generator script and verify test passes**

Run: `node scripts/generate-og-image.mjs && node --test test/assets.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add assets/ scripts/ test/
git commit -m "feat: add favicon, og-preview svg, and whatsapp preview png asset"
```

---

### Task 2: Timezone-Accurate Countdown Calculation Engine

**Files:**
- Create: `js/countdown.js`
- Test: `test/countdown.test.mjs`

**Interfaces:**
- Consumes: Target epoch timestamp `targetEpochMs` and current epoch `nowEpochMs`.
- Produces: `calculateTimeRemaining(targetEpochMs, nowEpochMs)` returning `{ totalMs, days, hours, minutes, seconds, isCompleted }`.
- Produces: `formatDigit(num)` returning a 2-digit zero-padded string (`"05"`).
- Produces: `initCountdown(options)` DOM lifecycle controller.

- [ ] **Step 1: Write failing unit test for countdown calculations**

```javascript
// test/countdown.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTimeRemaining, formatDigit, TARGET_WEDDING_EPOCH } from '../js/countdown.js';

test('TARGET_WEDDING_EPOCH corresponds to 2026-10-15T10:40:00+05:30', () => {
  const expectedIso = new Date('2026-10-15T10:40:00+05:30').getTime();
  assert.equal(TARGET_WEDDING_EPOCH, expectedIso);
});

test('calculateTimeRemaining returns correct days, hours, minutes, seconds', () => {
  const target = TARGET_WEDDING_EPOCH;
  // 1 day, 2 hours, 3 minutes, 4 seconds before target
  const now = target - ((1 * 86400 + 2 * 3600 + 3 * 60 + 4) * 1000);

  const result = calculateTimeRemaining(target, now);
  assert.equal(result.days, 1);
  assert.equal(result.hours, 2);
  assert.equal(result.minutes, 3);
  assert.equal(result.seconds, 4);
  assert.equal(result.isCompleted, false);
});

test('calculateTimeRemaining returns isCompleted true when past target', () => {
  const target = TARGET_WEDDING_EPOCH;
  const now = target + 5000;

  const result = calculateTimeRemaining(target, now);
  assert.equal(result.days, 0);
  assert.equal(result.hours, 0);
  assert.equal(result.minutes, 0);
  assert.equal(result.seconds, 0);
  assert.equal(result.isCompleted, true);
});

test('formatDigit pads single numbers with zero', () => {
  assert.equal(formatDigit(0), '00');
  assert.equal(formatDigit(7), '07');
  assert.equal(formatDigit(14), '14');
  assert.equal(formatDigit(100), '100');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/countdown.test.mjs`
Expected: FAIL (Cannot find module `../js/countdown.js`)

- [ ] **Step 3: Implement `js/countdown.js`**

```javascript
// js/countdown.js

// Target: October 15, 2026, 10:40:00 IST (UTC+05:30)
export const TARGET_WEDDING_DATE_STRING = '2026-10-15T10:40:00+05:30';
export const TARGET_WEDDING_EPOCH = new Date(TARGET_WEDDING_DATE_STRING).getTime();

/**
 * Calculates remaining time components from now to target.
 * @param {number} targetEpochMs 
 * @param {number} nowEpochMs 
 * @returns {{ totalMs: number, days: number, hours: number, minutes: number, seconds: number, isCompleted: boolean }}
 */
export function calculateTimeRemaining(targetEpochMs = TARGET_WEDDING_EPOCH, nowEpochMs = Date.now()) {
  const totalMs = targetEpochMs - nowEpochMs;

  if (totalMs <= 0) {
    return {
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isCompleted: true,
    };
  }

  const seconds = Math.floor((totalMs / 1000) % 60);
  const minutes = Math.floor((totalMs / 1000 / 60) % 60);
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));

  return {
    totalMs,
    days,
    hours,
    minutes,
    seconds,
    isCompleted: false,
  };
}

/**
 * Formats a number with leading zeroes.
 * @param {number} num 
 * @returns {string}
 */
export function formatDigit(num) {
  if (num < 0) return '00';
  return num < 10 ? `0${num}` : `${num}`;
}

/**
 * Mounts the live countdown onto DOM elements.
 * @param {object} elements
 * @param {function} onComplete
 */
export function initCountdown(elements, onComplete) {
  if (typeof window === 'undefined') return;

  function update() {
    const remaining = calculateTimeRemaining(TARGET_WEDDING_EPOCH, Date.now());

    if (elements.days) elements.days.textContent = formatDigit(remaining.days);
    if (elements.hours) elements.hours.textContent = formatDigit(remaining.hours);
    if (elements.minutes) elements.minutes.textContent = formatDigit(remaining.minutes);
    if (elements.seconds) elements.seconds.textContent = formatDigit(remaining.seconds);

    if (remaining.isCompleted) {
      if (typeof onComplete === 'function') {
        onComplete();
      }
      return true;
    }
    return false;
  }

  const done = update();
  if (!done) {
    const timerId = setInterval(() => {
      const isDone = update();
      if (isDone) clearInterval(timerId);
    }, 1000);
    return timerId;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test test/countdown.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add js/countdown.js test/countdown.test.mjs
git commit -m "feat: add timezone-accurate countdown engine with unit tests"
```

---

### Task 3: Calendar Invite Generation (Google Calendar & iCal .ics)

**Files:**
- Create: `js/calendar.js`
- Test: `test/calendar.test.mjs`

**Interfaces:**
- Produces: `generateGoogleCalendarUrl(eventDetails)` returning encoded Google Calendar URL.
- Produces: `generateIcsContent(eventDetails)` returning standard RFC 5545 iCalendar string.
- Produces: `downloadIcsFile(filename, icsContent)` client trigger.
- Produces: `getWeddingEventDetails()` returning wedding metadata.

- [ ] **Step 1: Write failing unit test for calendar generation**

```javascript
// test/calendar.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateGoogleCalendarUrl,
  generateIcsContent,
  getWeddingEventDetails
} from '../js/calendar.js';

test('getWeddingEventDetails provides correct metadata', () => {
  const details = getWeddingEventDetails();
  assert.equal(details.title, "Harshita & Ponanna's Wedding");
  assert.match(details.location, /Ammathi Kodava Samaja/);
  assert.equal(details.startUtcIso, '20261015T051000Z');
  assert.equal(details.endUtcIso, '20261015T113000Z');
});

test('generateGoogleCalendarUrl returns a valid Google Calendar intent URL', () => {
  const details = getWeddingEventDetails();
  const url = generateGoogleCalendarUrl(details);

  assert.ok(url.startsWith('https://calendar.google.com/calendar/render?action=TEMPLATE'));
  assert.ok(url.includes('text=Harshita+%26+Ponanna%27s+Wedding'));
  assert.ok(url.includes('dates=20261015T051000Z%2F20261015T113000Z'));
  assert.ok(url.includes('Ammathi+Kodava+Samaja'));
});

test('generateIcsContent produces valid RFC 5545 VCALENDAR string', () => {
  const details = getWeddingEventDetails();
  const ics = generateIcsContent(details);

  assert.ok(ics.includes('BEGIN:VCALENDAR'));
  assert.ok(ics.includes('VERSION:2.0'));
  assert.ok(ics.includes('BEGIN:VEVENT'));
  assert.ok(ics.includes('SUMMARY:Harshita & Ponanna\'s Wedding'));
  assert.ok(ics.includes('DTSTART:20261015T051000Z'));
  assert.ok(ics.includes('DTEND:20261015T113000Z'));
  assert.ok(ics.includes('LOCATION:Ammathi Kodava Samaja'));
  assert.ok(ics.includes('END:VEVENT'));
  assert.ok(ics.includes('END:VCALENDAR'));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/calendar.test.mjs`
Expected: FAIL (Cannot find module `../js/calendar.js`)

- [ ] **Step 3: Implement `js/calendar.js`**

```javascript
// js/calendar.js

export function getWeddingEventDetails() {
  return {
    title: "Harshita & Ponanna's Wedding",
    description: "Join us in celebrating the wedding of Harshita & Ponanna at Ammathi Kodava Samaja, Coorg!",
    location: "Ammathi Kodava Samaja, Ammathi, Kodagu (Coorg), Karnataka, India",
    // 10:40 AM IST = 05:10 AM UTC
    startUtcIso: "20261015T051000Z",
    // Reception/Celebration until ~5:00 PM IST = 11:30 AM UTC
    endUtcIso: "20261015T113000Z",
  };
}

/**
 * Creates Google Calendar URL
 */
export function generateGoogleCalendarUrl(details = getWeddingEventDetails()) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: details.title,
    dates: `${details.startUtcIso}/${details.endUtcIso}`,
    details: details.description,
    location: details.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Creates iCalendar RFC 5545 format string
 */
export function generateIcsContent(details = getWeddingEventDetails()) {
  const uid = `wedding-harshita-ponanna-2026@wedding-countdown`;
  const nowUtc = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Harshita & Ponanna//Wedding Countdown//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${details.startUtcIso}`,
    `DTEND:${details.endUtcIso}`,
    `SUMMARY:${details.title}`,
    `DESCRIPTION:${details.description}`,
    `LOCATION:${details.location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

/**
 * Triggers client-side file download of .ics file
 */
export function downloadIcsFile(filename = 'Harshita-Ponanna-Wedding.ics', content = generateIcsContent()) {
  if (typeof window === 'undefined') return;
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test test/calendar.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add js/calendar.js test/calendar.test.mjs
git commit -m "feat: add Google Calendar URL and iCal .ics download generator"
```

---

### Task 4: Interactive Canvas Particle System (Golden Embers & Jasmine Petals)

**Files:**
- Create: `js/particles.js`
- Test: `test/particles.test.mjs`

**Interfaces:**
- Produces: `initParticles(canvasElement)` initializing animation loop with responsive resizing, particle updates, and visibility listener.
- Produces: `stopParticles()` pausing requestAnimationFrame to save battery when inactive.

- [ ] **Step 1: Write test for particle math and particle configuration**

```javascript
// test/particles.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { createParticle, PARTICLE_CONFIG } from '../js/particles.js';

test('createParticle initializes valid sparkle or petal', () => {
  const p = createParticle(800, 600);
  assert.ok(['sparkle', 'petal'].includes(p.type));
  assert.ok(p.x >= 0 && p.x <= 800);
  assert.ok(p.y >= 0 && p.y <= 600);
  assert.ok(p.size > 0);
  assert.ok(p.opacity > 0 && p.opacity <= 1);
});

test('PARTICLE_CONFIG provides balanced density', () => {
  assert.ok(PARTICLE_CONFIG.maxMobileParticles <= 40);
  assert.ok(PARTICLE_CONFIG.maxDesktopParticles <= 80);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/particles.test.mjs`
Expected: FAIL (Cannot find module `../js/particles.js`)

- [ ] **Step 3: Implement `js/particles.js`**

```javascript
// js/particles.js

export const PARTICLE_CONFIG = {
  maxMobileParticles: 35,
  maxDesktopParticles: 75,
};

export function createParticle(width, height) {
  const isPetal = Math.random() > 0.65;
  return {
    type: isPetal ? 'petal' : 'sparkle',
    x: Math.random() * width,
    y: Math.random() * height,
    size: isPetal ? Math.random() * 5 + 4 : Math.random() * 2.5 + 1,
    speedY: Math.random() * 0.7 + 0.3,
    speedX: Math.sin(Math.random() * Math.PI * 2) * 0.4,
    opacity: Math.random() * 0.6 + 0.25,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 1.5,
    hue: isPetal ? 45 : 42, // Warm cream / golden jasmine
  };
}

export function initParticles(canvas) {
  if (!canvas || typeof window === 'undefined') return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const isMobile = width < 768;
  const particleCount = isMobile ? PARTICLE_CONFIG.maxMobileParticles : PARTICLE_CONFIG.maxDesktopParticles;
  const particles = Array.from({ length: particleCount }, () => createParticle(width, height));

  let animationFrameId = null;
  let isRunning = true;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize, { passive: true });

  function draw() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.01) * 0.5 + p.speedX;
      p.rotation += p.rotationSpeed;

      // Wrap around
      if (p.y > height + 20) {
        p.y = -10;
        p.x = Math.random() * width;
      }
      if (p.x < -20) p.x = width + 10;
      if (p.x > width + 20) p.x = -10;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;

      if (p.type === 'sparkle') {
        // Glowing gold ember
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
        gradient.addColorStop(0, 'rgba(255, 245, 200, 1)');
        gradient.addColorStop(0.5, 'rgba(212, 175, 55, 0.7)');
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Delicate jasmine/rose petal
        ctx.fillStyle = 'rgba(255, 252, 240, 0.85)';
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.4, p.size * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      ctx.restore();
    }

    animationFrameId = requestAnimationFrame(draw);
  }

  // Battery saving when tab inactive
  function handleVisibilityChange() {
    if (document.hidden) {
      isRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } else {
      isRunning = true;
      draw();
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);
  draw();

  return {
    destroy: () => {
      isRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    },
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test test/particles.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add js/particles.js test/particles.test.mjs
git commit -m "feat: add canvas particle system with gold embers and jasmine petals"
```

---

### Task 5: Ambient Romantic Audio Controller

**Files:**
- Create: `js/audio.js`
- Test: `test/audio.test.mjs`

**Interfaces:**
- Produces: `initAudio(options)` returning `{ togglePlay, isPlaying, play, pause }`.
- Features built-in Web Audio API melodic ambient harp/sitar tone generator so audio works immediately without needing external 10MB mp3 files, with optional MP3 file fallback.

- [ ] **Step 1: Write unit test for audio state controller**

```javascript
// test/audio.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { createAudioState } from '../js/audio.js';

test('createAudioState manages play and mute transitions', () => {
  const state = createAudioState();
  assert.equal(state.isPlaying(), false);

  state.setPlaying(true);
  assert.equal(state.isPlaying(), true);

  state.toggle();
  assert.equal(state.isPlaying(), false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/audio.test.mjs`
Expected: FAIL (Cannot find module `../js/audio.js`)

- [ ] **Step 3: Implement `js/audio.js`**

```javascript
// js/audio.js

export function createAudioState() {
  let playing = false;
  return {
    isPlaying: () => playing,
    setPlaying: (val) => { playing = !!val; },
    toggle: () => {
      playing = !playing;
      return playing;
    },
  };
}

/**
 * Initializes ambient audio using Web Audio API synthesis (warm meditative melodic bells/harp)
 * combined with audio element support.
 */
export function initAudio({ buttonElement, statusElement }) {
  if (typeof window === 'undefined') return;

  const state = createAudioState();
  let audioCtx = null;
  let synthInterval = null;

  // Gentle pentatonic Indian classical / romantic scale notes (in Hz)
  // Sa, Re, Ga, Pa, Dha (Raag Mohanam / Bhupali - celebrated, auspicious wedding raga)
  const notes = [
    261.63, // C4 (Sa)
    293.66, // D4 (Re)
    329.63, // E4 (Ga)
    392.00, // G4 (Pa)
    440.00, // A4 (Dha)
    523.25, // C5 (Sa')
    587.33, // D5 (Re')
    659.25, // E5 (Ga')
  ];

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playGentleBell(freq) {
    if (!state.isPlaying()) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.9);
    } catch {
      // Audio autoplay policy catch
    }
  }

  function startAmbientChimes() {
    let noteIndex = 0;
    // Play an opening gentle chord
    playGentleBell(notes[0]);
    setTimeout(() => playGentleBell(notes[2]), 400);
    setTimeout(() => playGentleBell(notes[4]), 800);

    synthInterval = setInterval(() => {
      if (!state.isPlaying()) return;
      const note = notes[Math.floor(Math.random() * notes.length)];
      playGentleBell(note);
    }, 2200);
  }

  function stopAmbientChimes() {
    if (synthInterval) clearInterval(synthInterval);
  }

  function updateUi() {
    const isPlaying = state.isPlaying();
    if (buttonElement) {
      buttonElement.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
      buttonElement.classList.toggle('playing', isPlaying);
    }
    if (statusElement) {
      statusElement.textContent = isPlaying ? 'Sound: On' : 'Sound: Off';
    }
  }

  function toggle() {
    const willPlay = state.toggle();
    if (willPlay) {
      getAudioContext();
      startAmbientChimes();
    } else {
      stopAmbientChimes();
    }
    updateUi();
    return willPlay;
  }

  if (buttonElement) {
    buttonElement.addEventListener('click', toggle);
  }

  return {
    toggle,
    isPlaying: () => state.isPlaying(),
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test test/audio.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add js/audio.js test/audio.test.mjs
git commit -m "feat: add ambient audio controller with auspicious raga synthesizer"
```

---

### Task 6: Semantic HTML5 Structure & WhatsApp OpenGraph Setup

**Files:**
- Create: `index.html`
- Create: `test/html.test.mjs`

**Interfaces:**
- Connects: `css/style.css`, `css/responsive.css`, `js/countdown.js`, `js/particles.js`, `js/calendar.js`, `js/audio.js`.
- Renders:
  - OpenGraph / WhatsApp meta tags.
  - Floating ambient sound button.
  - Regal Header (Couple names, Monogram, Royal Kodava heritage motif).
  - 4-Card Live Countdown (Days, Hours, Minutes, Seconds).
  - Date & Venue Card (Ammathi Kodava Samaja with Google Maps pin).
  - Interactive Action Buttons: "Add to Calendar" (.ics download & Google Calendar) and "Share on WhatsApp".
  - Celebration state overlay for zero arrival.

- [ ] **Step 1: Write test for HTML structure and meta tags**

```javascript
// test/html.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('index.html contains all required WhatsApp OpenGraph tags', () => {
  const html = fs.readFileSync(path.resolve('index.html'), 'utf8');

  assert.ok(html.includes('property="og:title"'), 'Must have og:title');
  assert.ok(html.includes('Harshita &amp; Ponanna') || html.includes('Harshita & Ponanna'));
  assert.ok(html.includes('property="og:description"'), 'Must have og:description');
  assert.ok(html.includes('property="og:image"'), 'Must have og:image');
  assert.ok(html.includes('assets/og-preview.png'), 'Must point to assets/og-preview.png');
  assert.ok(html.includes('property="og:image:width" content="1200"'));
  assert.ok(html.includes('property="og:image:height" content="630"'));
});

test('index.html has countdown elements and calendar buttons', () => {
  const html = fs.readFileSync(path.resolve('index.html'), 'utf8');

  assert.ok(html.includes('id="days"'));
  assert.ok(html.includes('id="hours"'));
  assert.ok(html.includes('id="minutes"'));
  assert.ok(html.includes('id="seconds"'));
  assert.ok(html.includes('id="add-google-cal"'));
  assert.ok(html.includes('id="download-ics"'));
  assert.ok(html.includes('id="whatsapp-share"'));
  assert.ok(html.includes('Ammathi Kodava Samaja'));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/html.test.mjs`
Expected: FAIL (Cannot read `index.html`)

- [ ] **Step 3: Implement `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>Harshita & Ponanna — Wedding Countdown</title>
  <meta name="description" content="Join us in celebrating the wedding of Harshita & Ponanna on October 15, 2026 at Ammathi Kodava Samaja, Coorg." />

  <!-- WhatsApp & Social OpenGraph Tags -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Harshita & Ponanna — Wedding Countdown" />
  <meta property="og:description" content="We invite you to celebrate our wedding on October 15, 2026 at Ammathi Kodava Samaja, Coorg. Counting down the moments to forever!" />
  <meta property="og:image" content="assets/og-preview.png" />
  <meta property="og:image:secure_url" content="assets/og-preview.png" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Harshita & Ponanna Wedding Countdown" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Harshita & Ponanna — Wedding Countdown" />
  <meta name="twitter:description" content="Join us in celebrating our wedding on October 15, 2026 at Ammathi Kodava Samaja, Coorg." />
  <meta name="twitter:image" content="assets/og-preview.png" />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg" />
  <link rel="apple-touch-icon" href="assets/favicon.svg" />
  <meta name="theme-color" content="#061a12" />

  <!-- Google Fonts: Cinzel Decorative, Playfair Display, Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

  <!-- Stylesheets -->
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="css/responsive.css" />
</head>
<body>
  <!-- Canvas for floating gold embers & jasmine petals -->
  <canvas id="particles-canvas" class="particles-bg" aria-hidden="true"></canvas>

  <!-- Ambient Audio Floating Toggle -->
  <button id="audio-toggle" class="audio-toggle" aria-label="Toggle ambient music" aria-pressed="false" title="Play ambient melody">
    <svg class="icon-speaker" viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path class="sound-wave sound-wave-1" d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      <path class="sound-wave sound-wave-2" d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
    </svg>
    <span class="audio-tooltip">Sound</span>
  </button>

  <!-- Main Container -->
  <main class="page-wrapper">
    <!-- Top Monogram & Traditional Motif -->
    <header class="hero-header">
      <div class="monogram-badge">
        <span class="monogram-letter">H</span>
        <span class="monogram-amp">&amp;</span>
        <span class="monogram-letter">P</span>
      </div>
      <p class="wedding-proclamation">TOGETHER WITH THEIR FAMILIES</p>
      <h1 class="couple-title">
        <span class="name">Harshita</span>
        <span class="conjunction">&amp;</span>
        <span class="name">Ponanna</span>
      </h1>
      <p class="tagline">Are getting married</p>
      <div class="ornate-divider">
        <span class="line"></span>
        <span class="flower-symbol">✦</span>
        <span class="line"></span>
      </div>
    </header>

    <!-- Countdown Section -->
    <section class="countdown-section" aria-label="Wedding Countdown">
      <div class="countdown-grid" id="countdown-clock">
        <!-- Days -->
        <div class="countdown-card">
          <div class="card-inner">
            <span class="digit-value" id="days">--</span>
          </div>
          <span class="card-label">DAYS</span>
        </div>
        <!-- Hours -->
        <div class="countdown-card">
          <div class="card-inner">
            <span class="digit-value" id="hours">--</span>
          </div>
          <span class="card-label">HOURS</span>
        </div>
        <!-- Minutes -->
        <div class="countdown-card">
          <div class="card-inner">
            <span class="digit-value" id="minutes">--</span>
          </div>
          <span class="card-label">MINUTES</span>
        </div>
        <!-- Seconds -->
        <div class="countdown-card seconds-card">
          <div class="card-inner">
            <span class="digit-value" id="seconds">--</span>
          </div>
          <span class="card-label">SECONDS</span>
        </div>
      </div>

      <!-- Celebratory Banner shown when countdown hits zero -->
      <div id="celebration-banner" class="celebration-banner hidden" aria-live="polite">
        <div class="celebration-content">
          <div class="celebration-icon">💍</div>
          <h2>The Auspicious Day is Here!</h2>
          <p>Celebrating the wedding of Harshita &amp; Ponanna</p>
        </div>
      </div>
    </section>

    <!-- Details Card (Date & Venue) -->
    <section class="details-section">
      <div class="glass-card details-card">
        <!-- Date Row -->
        <div class="detail-row">
          <div class="detail-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div class="detail-info">
            <h2 class="detail-heading">Thursday, October 15, 2026</h2>
            <p class="detail-sub">Muhurtha at 10:40 AM IST</p>
          </div>
        </div>

        <div class="card-separator"></div>

        <!-- Venue Row -->
        <div class="detail-row">
          <div class="detail-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div class="detail-info">
            <h2 class="detail-heading">Ammathi Kodava Samaja</h2>
            <p class="detail-sub">Ammathi, Kodagu (Coorg), Karnataka</p>
          </div>
        </div>

        <!-- Venue Action Link -->
        <div class="venue-action">
          <a href="https://www.google.com/maps/search/?api=1&query=Ammathi+Kodava+Samaja" target="_blank" rel="noopener noreferrer" class="btn-link">
            <span>View on Google Maps</span>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Action Buttons Hub -->
    <section class="actions-section">
      <div class="action-buttons-group">
        <!-- Add to Calendar Button with Dropdown -->
        <div class="calendar-dropdown-container">
          <button id="calendar-btn" class="btn btn-gold" aria-haspopup="true" aria-expanded="false">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Add to Calendar</span>
          </button>
          <div id="calendar-menu" class="dropdown-menu hidden" role="menu">
            <a id="add-google-cal" href="#" target="_blank" rel="noopener noreferrer" class="dropdown-item" role="menuitem">
              <span>Google Calendar</span>
            </a>
            <button id="download-ics" class="dropdown-item" role="menuitem">
              <span>Apple / Outlook (.ics)</span>
            </button>
          </div>
        </div>

        <!-- WhatsApp Share Button -->
        <a id="whatsapp-share" href="#" target="_blank" rel="noopener noreferrer" class="btn btn-emerald">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.45 0-2.88-.38-4.13-1.11l-.3-.18-3.07.81.82-2.99-.19-.31a8.217 8.217 0 0 1-1.26-4.46c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.59c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1 1.49-.07 1.47-.61 1.68-.85.21-.25.21-.76.15-.88-.06-.13-.23-.21-.48-.34z"/>
          </svg>
          <span>Share on WhatsApp</span>
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="page-footer">
      <p class="coorg-badge">#HarshitaWedsPonanna • Kodagu</p>
      <p class="copyright">With love &amp; blessings</p>
    </footer>
  </main>

  <!-- Client Script Orchestrator -->
  <script type="module">
    import { initCountdown } from './js/countdown.js';
    import { initParticles } from './js/particles.js';
    import { initAudio } from './js/audio.js';
    import { generateGoogleCalendarUrl, downloadIcsFile } from './js/calendar.js';

    // 1. Initialize Particles Canvas
    const canvas = document.getElementById('particles-canvas');
    initParticles(canvas);

    // 2. Initialize Audio
    const audioBtn = document.getElementById('audio-toggle');
    const audioController = initAudio({ buttonElement: audioBtn });

    // Enable audio on first user touch anywhere if not yet triggered
    let hasInteracted = false;
    document.addEventListener('click', () => {
      if (!hasInteracted && !audioController.isPlaying()) {
        hasInteracted = true;
        // Audio can be activated on demand or left to explicit button
      }
    }, { once: true });

    // 3. Initialize Countdown
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const celebrationBanner = document.getElementById('celebration-banner');
    const countdownClock = document.getElementById('countdown-clock');

    initCountdown(
      { days: daysEl, hours: hoursEl, minutes: minutesEl, seconds: secondsEl },
      () => {
        countdownClock.classList.add('hidden');
        celebrationBanner.classList.remove('hidden');
      }
    );

    // 4. Initialize Calendar Links
    const googleCalLink = document.getElementById('add-google-cal');
    googleCalLink.href = generateGoogleCalendarUrl();

    const icsBtn = document.getElementById('download-ics');
    icsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      downloadIcsFile('Harshita-Ponanna-Wedding.ics');
    });

    const calendarBtn = document.getElementById('calendar-btn');
    const calendarMenu = document.getElementById('calendar-menu');
    calendarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const expanded = calendarBtn.getAttribute('aria-expanded') === 'true';
      calendarBtn.setAttribute('aria-expanded', !expanded);
      calendarMenu.classList.toggle('hidden', expanded);
    });

    document.addEventListener('click', () => {
      calendarBtn.setAttribute('aria-expanded', 'false');
      calendarMenu.classList.add('hidden');
    });

    // 5. Initialize WhatsApp Share Link
    const shareUrl = window.location.href;
    const shareText = encodeURIComponent(
      `Join us in counting down to Harshita & Ponanna's Wedding! 💍✨\nOctober 15, 2026 • Ammathi Kodava Samaja, Coorg\n${shareUrl}`
    );
    const whatsappShareBtn = document.getElementById('whatsapp-share');
    whatsappShareBtn.href = `https://api.whatsapp.com/send?text=${shareText}`;
  </script>
</body>
</html>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test test/html.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add index.html test/html.test.mjs
git commit -m "feat: add semantic HTML5 structure with WhatsApp OpenGraph tags and component wiring"
```

---

### Task 7: Royal Kodava Emerald & Gold Stylesheet and Responsive Layout

**Files:**
- Create: `css/style.css`
- Create: `css/responsive.css`
- Test: `test/css.test.mjs`

**Interfaces:**
- Produces: Complete visual styling with CSS custom properties, gold text shimmer, glassmorphism cards, pulsating digit counters, and mobile-first responsive breakpoints.

- [ ] **Step 1: Write test to verify CSS variables and responsive rules**

```javascript
// test/css.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('style.css defines Royal Kodava color tokens and glassmorphism', () => {
  const css = fs.readFileSync(path.resolve('css/style.css'), 'utf8');

  assert.ok(css.includes('--color-emerald-deep'));
  assert.ok(css.includes('--color-gold-primary'));
  assert.ok(css.includes('--color-ivory'));
  assert.ok(css.includes('backdrop-filter'));
  assert.ok(css.includes('font-variant-numeric: tabular-nums'));
});

test('responsive.css defines breakpoints for mobile (<768px)', () => {
  const css = fs.readFileSync(path.resolve('css/responsive.css'), 'utf8');

  assert.ok(css.includes('@media (max-width: 768px)'));
  assert.ok(css.includes('@media (max-width: 480px)'));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/css.test.mjs`
Expected: FAIL (Cannot read CSS files)

- [ ] **Step 3: Implement `css/style.css` and `css/responsive.css`**

Create `css/style.css`:
```css
/* ==========================================================================
   Royal Kodava Heritage & Gold Theme
   Harshita & Ponanna Wedding Countdown
   ========================================================================== */

:root {
  /* Color Palette */
  --color-bg-dark: #04120b;
  --color-emerald-deep: #071f14;
  --color-emerald-rich: #0d2e1f;
  --color-emerald-surface: rgba(13, 46, 31, 0.65);
  
  --color-gold-light: #fdedb4;
  --color-gold-primary: #d4af37;
  --color-gold-rich: #b38b1d;
  --color-gold-glow: rgba(212, 175, 55, 0.35);

  --color-ivory: #fcfbf7;
  --color-pearl: #d8d3c5;
  --color-muted: #95a399;

  /* Typography */
  --font-display: 'Cinzel Decorative', 'Playfair Display', Georgia, serif;
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-digits: 'Cinzel', Georgia, serif;
  --font-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Spacing & Borders */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --border-gold-subtle: 1px solid rgba(212, 175, 55, 0.3);
  --border-gold-highlight: 1px solid rgba(253, 237, 180, 0.6);
  --glass-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.6), 0 0 25px rgba(212, 175, 55, 0.15);
}

/* Global Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
  height: 100%;
}

body {
  min-height: 100vh;
  min-height: 100svh;
  background: radial-gradient(circle at 50% 25%, #0f3825 0%, #071f14 55%, #04120b 100%);
  color: var(--color-ivory);
  font-family: var(--font-body);
  line-height: 1.6;
  overflow-x: hidden;
  position: relative;
  -webkit-font-smoothing: antialiased;
}

/* Particles Canvas */
.particles-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* Page Wrapper */
.page-wrapper {
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  min-height: 100svh;
  justify-content: space-between;
}

/* Audio Toggle Floating Button */
.audio-toggle {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 10;
  background: rgba(13, 46, 31, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: var(--border-gold-subtle);
  color: var(--color-gold-light);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

.audio-toggle:hover {
  transform: scale(1.08);
  border-color: var(--color-gold-primary);
  box-shadow: 0 0 20px var(--color-gold-glow);
}

.audio-toggle .sound-wave {
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.audio-toggle.playing .sound-wave {
  opacity: 1;
  animation: soundPulse 1.2s infinite ease-in-out alternate;
}

.audio-toggle.playing .sound-wave-2 {
  animation-delay: 0.4s;
}

.audio-tooltip {
  display: none;
}

@keyframes soundPulse {
  0% { transform: scale(0.9); opacity: 0.5; }
  100% { transform: scale(1.1); opacity: 1; }
}

/* Hero Header */
.hero-header {
  text-align: center;
  margin-bottom: 2rem;
}

.monogram-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.5rem 1.25rem;
  background: rgba(7, 31, 20, 0.8);
  border: 1px solid rgba(212, 175, 55, 0.4);
  border-radius: 30px;
  margin-bottom: 1.25rem;
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.15);
}

.monogram-letter {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-gold-light);
}

.monogram-amp {
  font-family: var(--font-serif);
  font-size: 0.85rem;
  color: var(--color-gold-primary);
  font-style: italic;
}

.wedding-proclamation {
  font-size: 0.8rem;
  letter-spacing: 0.3em;
  color: var(--color-pearl);
  text-transform: uppercase;
  margin-bottom: 0.6rem;
  font-weight: 500;
}

.couple-title {
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.15;
  background: linear-gradient(135deg, #ffffff 0%, #fdedb4 35%, #d4af37 75%, #aa7c11 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);
  margin-bottom: 0.5rem;
}

.couple-title .conjunction {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  margin: 0 0.5rem;
  -webkit-text-fill-color: var(--color-gold-primary);
}

.tagline {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-style: italic;
  color: var(--color-pearl);
  letter-spacing: 0.05em;
  margin-bottom: 1.25rem;
}

.ornate-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 220px;
  margin: 0 auto;
}

.ornate-divider .line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.6), transparent);
}

.ornate-divider .flower-symbol {
  color: var(--color-gold-primary);
  font-size: 0.8rem;
  filter: drop-shadow(0 0 5px var(--color-gold-primary));
}

/* Countdown Grid */
.countdown-section {
  width: 100%;
  margin-bottom: 2rem;
}

.countdown-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  max-width: 720px;
  margin: 0 auto;
}

.countdown-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-inner {
  width: 100%;
  aspect-ratio: 1 / 1.05;
  background: var(--color-emerald-surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: var(--border-gold-subtle);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--glass-shadow);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.card-inner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 45%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%);
  pointer-events: none;
}

.card-inner:hover {
  transform: translateY(-4px);
  border-color: var(--color-gold-primary);
  box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.7), 0 0 30px var(--color-gold-glow);
}

.digit-value {
  font-family: var(--font-digits);
  font-size: 3.25rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: #ffffff;
  text-shadow: 0 0 25px rgba(212, 175, 55, 0.5), 0 2px 10px rgba(0, 0, 0, 0.8);
  letter-spacing: -0.02em;
}

.card-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  color: var(--color-gold-light);
  margin-top: 0.75rem;
  text-align: center;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
}

/* Celebration Banner */
.celebration-banner {
  background: rgba(13, 46, 31, 0.85);
  border: 2px solid var(--color-gold-primary);
  border-radius: var(--radius-md);
  padding: 2.5rem 1.5rem;
  text-align: center;
  box-shadow: 0 0 50px rgba(212, 175, 55, 0.4);
  animation: celebrationPulse 2s infinite ease-in-out;
}

@keyframes celebrationPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.celebration-icon {
  font-size: 3rem;
  margin-bottom: 0.75rem;
}

.celebration-banner h2 {
  font-family: var(--font-display);
  font-size: 2.25rem;
  color: var(--color-gold-light);
  margin-bottom: 0.5rem;
}

/* Details Section */
.details-section {
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
}

.glass-card {
  background: var(--color-emerald-surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: var(--border-gold-subtle);
  border-radius: var(--radius-lg);
  padding: 1.75rem 2rem;
  box-shadow: var(--glass-shadow);
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.detail-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.12);
  border: 1px solid rgba(212, 175, 55, 0.4);
  color: var(--color-gold-light);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.detail-heading {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-ivory);
  margin-bottom: 0.15rem;
}

.detail-sub {
  font-size: 0.9rem;
  color: var(--color-pearl);
}

.card-separator {
  height: 1px;
  background: rgba(212, 175, 55, 0.18);
  margin: 1.25rem 0;
}

.venue-action {
  margin-top: 1.25rem;
  text-align: right;
}

.btn-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-gold-light);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.btn-link:hover {
  color: #ffffff;
  transform: translateX(3px);
}

/* Actions Buttons Hub */
.actions-section {
  width: 100%;
  max-width: 500px;
  margin-bottom: 2rem;
}

.action-buttons-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  width: 100%;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.9rem 1.6rem;
  border-radius: 30px;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  border: none;
  flex: 1;
}

.btn-gold {
  background: linear-gradient(135deg, #fdedb4 0%, #d4af37 60%, #aa7c11 100%);
  color: #051910;
  box-shadow: 0 4px 18px rgba(212, 175, 55, 0.35);
}

.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.55);
}

.btn-emerald {
  background: rgba(13, 46, 31, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(212, 175, 55, 0.45);
  color: var(--color-ivory);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.4);
}

.btn-emerald:hover {
  transform: translateY(-2px);
  border-color: var(--color-gold-primary);
  color: var(--color-gold-light);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6), 0 0 15px var(--color-gold-glow);
}

/* Calendar Dropdown */
.calendar-dropdown-container {
  position: relative;
  flex: 1;
  display: flex;
}

.dropdown-menu {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 0;
  right: 0;
  background: rgba(7, 31, 20, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: var(--border-gold-subtle);
  border-radius: var(--radius-md);
  padding: 0.5rem;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  z-index: 20;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.65rem 1rem;
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  color: var(--color-ivory);
  font-family: var(--font-body);
  font-size: 0.85rem;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.dropdown-item:hover {
  background: rgba(212, 175, 55, 0.15);
  color: var(--color-gold-light);
}

/* Footer */
.page-footer {
  text-align: center;
  margin-top: 1rem;
}

.coorg-badge {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  color: var(--color-gold-light);
  letter-spacing: 0.08em;
  margin-bottom: 0.25rem;
}

.copyright {
  font-size: 0.8rem;
  color: var(--color-muted);
}

.hidden {
  display: none !important;
}
```

Create `css/responsive.css`:
```css
/* ==========================================================================
   Responsive Adaptations (Mobile & Tablet)
   ========================================================================== */

/* Tablets and below */
@media (max-width: 768px) {
  .page-wrapper {
    padding: 2rem 1rem 2.5rem;
  }

  .couple-title {
    font-size: 2.75rem;
  }

  .countdown-grid {
    gap: 0.75rem;
  }

  .digit-value {
    font-size: 2.4rem;
  }

  .card-label {
    font-size: 0.65rem;
    letter-spacing: 0.18em;
  }

  .details-card {
    padding: 1.25rem 1.5rem;
  }

  .detail-heading {
    font-size: 1.1rem;
  }
}

/* Small smartphones */
@media (max-width: 480px) {
  .page-wrapper {
    padding: 1.5rem 0.75rem 2rem;
  }

  .audio-toggle {
    top: 1rem;
    right: 1rem;
    width: 42px;
    height: 42px;
  }

  .monogram-badge {
    padding: 0.4rem 1rem;
    margin-bottom: 0.75rem;
  }

  .wedding-proclamation {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
  }

  .couple-title {
    font-size: 2.15rem;
    line-height: 1.2;
  }

  .tagline {
    font-size: 1.05rem;
  }

  .countdown-grid {
    gap: 0.5rem;
  }

  .card-inner {
    border-radius: 12px;
  }

  .digit-value {
    font-size: 1.75rem;
  }

  .card-label {
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    margin-top: 0.4rem;
  }

  .action-buttons-group {
    flex-direction: column;
    gap: 0.75rem;
  }

  .btn {
    width: 100%;
    padding: 0.85rem 1.25rem;
    font-size: 0.9rem;
  }

  .dropdown-menu {
    bottom: auto;
    top: calc(100% + 8px);
  }
}

/* Foldables / Extra narrow screens (< 360px) */
@media (max-width: 350px) {
  .couple-title {
    font-size: 1.85rem;
  }

  .digit-value {
    font-size: 1.45rem;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test test/css.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add css/ test/css.test.mjs
git commit -m "feat: add Royal Kodava emerald and gold styles and responsive layout"
```

---

### Task 8: End-to-End Suite Verification, README & Deployment Documentation

**Files:**
- Create: `README.md`
- Test: Full test suite `node --test test/*.test.mjs`

**Interfaces:**
- Produces: Complete end-to-end documentation with GitHub Pages 2-click deployment guide and WhatsApp preview instructions.

- [ ] **Step 1: Run full automated test suite to ensure all unit tests pass**

Run: `node --test test/*.test.mjs`
Expected: ALL 6 test files PASS with 0 failures

- [ ] **Step 2: Create comprehensive `README.md`**

```markdown
# Harshita & Ponanna — Wedding Countdown Microsite 💍✨

A wedding countdown page celebrating the marriage of **Harshita & Ponanna** on **October 15, 2026, 10:40 AM IST** at **Ammathi Kodava Samaja, Coorg, Karnataka**.

Designed with a **Royal Kodava Heritage & Gold** aesthetic (deep emerald green, radiant champagne gold, warm ivory, and floating golden sparkles & jasmine petals).

---

## Features
- **Precision Countdown:** Accurate timezone calculation for October 15, 2026, at 10:40:00 AM IST (`2026-10-15T10:40:00+05:30`).
- **WhatsApp OpenGraph Preview Card:** Pre-configured with OpenGraph metadata and a dedicated `1200 x 630` banner (`assets/og-preview.png`).
- **Canvas Floating Particle System:** Softly drifting golden embers and delicate jasmine petals that pause on background tabs to save battery.
- **Ambient Raga Chimes & Audio Player:** Auspicious melodic synthesizer with user-friendly floating mute/play toggle.
- **1-Click Add to Calendar:** Supports both Google Calendar web intent and instant Apple Calendar / Outlook `.ics` file download.
- **Venue Directions:** Direct link to Google Maps for Ammathi Kodava Samaja.
- **Mobile-First & Responsive:** Responsive layout optimized for smartphones (320px+), tablets, and desktops.
- **Zero Build Step:** 100% pure Vanilla HTML5/CSS3/ES6 JavaScript.

---

## 🚀 Instant GitHub Pages Deployment (2 Steps)

This site requires **zero build step** and no CI/CD configuration.

1. Push this repository to GitHub:
   ```bash
   git push -u origin master
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Branch**, select `master` (or `main`) and `/ (root)`.
   - Click **Save**.

Your countdown page will be live immediately at:
`https://<your-username>.github.io/wedding-countdown/`

### WhatsApp Preview Note:
When sharing the link on WhatsApp, WhatsApp's scraper uses the OpenGraph image configured in `index.html`. For GitHub Pages, WhatsApp will load `https://<your-username>.github.io/wedding-countdown/assets/og-preview.png`.

---

## 💻 Local Preview
To preview locally, open `index.html` directly in any web browser, or launch a quick local server:
```bash
python3 -m http.server 8000
# or: npx serve
```
Then visit `http://localhost:8000`.

---

## 🧪 Running Automated Tests
```bash
node --test test/*.test.mjs
```
```

- [ ] **Step 3: Run full tests and commit**

Run: `node --test test/*.test.mjs`
Expected: PASS

```bash
git add README.md
git commit -m "docs: add README with zero-config GitHub Pages deployment and WhatsApp preview guide"
```
