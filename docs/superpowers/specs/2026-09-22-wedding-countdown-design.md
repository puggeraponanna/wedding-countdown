# Wedding Countdown Page Design Specification
**Couple:** Harshita & Ponanna  
**Wedding Date & Time:** October 15, 2026, at 10:40 AM IST (`2026-10-15T10:40:00+05:30`)  
**Venue:** Ammathi Kodava Samaja, Ammathi, Kodagu (Coorg), Karnataka  
**Date:** 2026-09-22  
**Status:** Approved  

---

## 1. Overview & Vision
A wedding countdown microsite celebrating the union of Harshita and Ponanna. Built for frictionless mobile and desktop access and 1-click deployment on GitHub Pages without any build tools or runtime dependencies. Optimized specifically for social sharing with dedicated WhatsApp OpenGraph preview card metadata.

### Core Goals
1. **Regal Visual Aesthetic:** Inspired by Royal Kodava heritage—deep emerald green, radiant champagne gold, warm ivory, and subtle traditional floral accents.
2. **Precision Synchronization:** Timezone-accurate countdown to October 15, 2026, 10:40 AM IST, synchronized globally across all timezones.
3. **Flawless WhatsApp Previews:** Static OpenGraph tags and a pre-rendered 1200x630 social preview card for rich WhatsApp link unfurling.
4. **Mobile-First & Accessible:** Fully responsive design from 320px phone screens up to 4K displays, with high contrast, legible typography, and touch-optimized action targets.
5. **Zero-Friction Deployment:** Pure Vanilla HTML5/CSS3/ES6 JavaScript deployable directly to GitHub Pages with zero CI/CD build step.

---

## 2. Visual Design & Theme System

### 2.1 Color Palette
- **Background Gradient:** `#061a12` (Midnight Forest) to `#0d2818` (Deep Royal Emerald) with a subtle dark vignette (`#030d09`).
- **Metallic Gold Accents:** 
  - Primary Gold: `#d4af37`
  - Champagne Gold: `#f3e5ab`
  - Metallic Gradient: `linear-gradient(135deg, #f3e5ab 0%, #d4af37 50%, #aa7c11 100%)`
- **Text & Surfaces:**
  - Headings: `#fdfbf7` (Lustrous Ivory)
  - Digits: `#ffffff` with warm gold drop-glow (`0 0 20px rgba(212, 175, 55, 0.45)`)
  - Sublabels & Meta: `#d8d3c5` (Pearl Sand)
  - Card Glass Surface: `rgba(13, 40, 24, 0.65)` with `backdrop-filter: blur(14px)` and `border: 1px solid rgba(212, 175, 55, 0.28)`

### 2.2 Typography
- **Couple Names / Title:** *Cinzel Decorative* & *Playfair Display* (Google Fonts) with gold foil shimmer effect.
- **Numbers / Digits:** *Cinzel* with `font-variant-numeric: tabular-nums` to eliminate layout jitter during ticking.
- **Body & Captions:** *Plus Jakarta Sans* / *Montserrat* for crisp readability on mobile screens.

### 2.3 Visual Motifs & Canvas Particle System
- Subtle traditional Kodava & Indian wedding floral motifs (delicate jasmine blossoms, marigold hints, and golden dust particles).
- Custom lightweight HTML5 Canvas particle system:
  - Gentle floating golden embers and slow-drifting soft white/golden jasmine petals.
  - Automatically pauses when the browser tab is hidden (`visibilitychange` API) to conserve battery.

---

## 3. Architecture & File Structure

```text
wedding-countdown/
├── index.html              # Semantic HTML5, WhatsApp OpenGraph tags, responsive layout
├── css/
│   ├── style.css           # Global theme, typography, glassmorphism, animations
│   └── responsive.css      # Breakpoints for mobile (<480px), tablet (480-1024px), desktop (>1024px)
├── js/
│   ├── countdown.js        # IST timezone-accurate countdown logic and celebration trigger
│   ├── particles.js        # High-performance canvas particle system (petals & golden embers)
│   ├── audio.js            # Ambient audio player with browser autoplay policy handling & mute toggle
│   └── calendar.js         # Google Calendar web intent link and Apple/iCal .ics download generator
├── assets/
│   ├── og-preview.png      # WhatsApp OpenGraph banner (1200x630, <300KB)
│   ├── favicon.svg         # Golden wedding rings / monogram icon
│   └── audio/
│       └── ambient.mp3     # Soft romantic instrumental background audio
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-09-22-wedding-countdown-design.md
└── README.md               # Documentation and GitHub Pages 1-click deployment guide
```

---

## 4. Detailed Component Specifications

### 4.1 WhatsApp & OpenGraph Integration
WhatsApp scraper reads raw HTML without executing JavaScript. The `<head>` will include:
```html
<meta property="og:type" content="website" />
<meta property="og:title" content="Harshita & Ponanna — Wedding Countdown" />
<meta property="og:description" content="We invite you to celebrate our wedding on October 15, 2026 at Ammathi Kodava Samaja, Coorg." />
<meta property="og:image" content="assets/og-preview.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/png" />
<meta name="twitter:card" content="summary_large_image" />
```
*Note:* A helpful instruction will be documented in `README.md` noting that on GitHub Pages, the full URL `https://<username>.github.io/<repo>/assets/og-preview.png` ensures universal WhatsApp image unfurling.

### 4.2 Countdown Clock Engine
- **Target Epoch:** UTC timestamp corresponding to `2026-10-15T10:40:00+05:30`.
- **Calculations:** Days, Hours, Minutes, Seconds computed every 1000ms.
- **Micro-Animations:** Digit cards feature subtle pulse on second tick.
- **Arrival State:** When remaining time `<= 0`, countdown switches to a congratulatory celebration banner with a celebratory confetti burst (`"The Wedding Day is Here! Celebrating Harshita & Ponanna"`).

### 4.3 Action Hub
1. **"Add to Calendar" Dropdown/Modal:**
   - **Google Calendar:** Direct URL format:
     `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Harshita+%26+Ponanna%27s+Wedding&dates=20261015T051000Z/20261015T103000Z&details=Wedding+celebration+of+Harshita+and+Ponanna&location=Ammathi+Kodava+Samaja%2C+Ammathi%2C+Coorg`
   - **Apple / Outlook / ICS:** Client-side dynamic `.ics` file generation and download using a Blob and data URI.
2. **"View Venue" Button:**
   - Links directly to Google Maps search/pin for `Ammathi Kodava Samaja`.
3. **"Share on WhatsApp" Button:**
   - Pre-formatted link: `https://api.whatsapp.com/send?text=...` to let guests easily forward the countdown invitation.

### 4.4 Ambient Audio Controller
- Floating elegant circular button with speaker icon and equalizer wave animation when playing.
- Due to browser autoplay policies, audio begins on initial user tap/interaction with a gentle invitation banner or upon clicking the sound toggle.
- Audio smoothly fades in/out on mute toggle.

---

## 5. Verification & Testing Strategy
1. **Timezone Accuracy:** Verified with test mocks simulating client time in New York (EDT), London (BST), and Bangalore (IST) to ensure exact synchronization.
2. **Responsive Checks:**
   - Mobile: 320px (iPhone SE), 375px (iPhone 13 mini), 414px (iPhone 11/Pro Max), 390px (iPhone 14/15).
   - Tablet: 768px (iPad Mini), 1024px (iPad Pro).
   - Desktop: 1440px and 1920px.
3. **Calendar Output:** Verify that `.ics` file downloads cleanly and opens in Apple Calendar / Outlook with correct date (Oct 15, 2026), time (10:40 AM IST), and venue location.
4. **Performance:** Ensure Canvas runs smoothly at 60 FPS, particle count dynamically adjusts for mobile screens, and total asset footprint remains minimal.

---

## 6. GitHub Pages Deployment Steps
1. Push project files to the `main` branch.
2. Go to GitHub Repository **Settings** > **Pages**.
3. Under **Branch**, select `main` and `/ (root)` folder.
4. Click **Save**. The countdown site will be live at `https://<username>.github.io/wedding-countdown/`.
