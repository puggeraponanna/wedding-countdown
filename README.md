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
