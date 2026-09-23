# Design Spec: Traditional Coorg Sacred Lamp (Kuthu Bolucha)

## Overview
Replace the full-screen envelope/folio overlay with a traditional Kodava Sacred Lamp (*Kuthu Bolucha* / *Thali-bolucha*) integrated directly onto the page. In Kodava tradition, every auspicious occasion, *Oorkuduva*, and *Valaga* begins by lighting the sacred brass lamp.

Visitors land directly on the wedding countdown microsite. An ornate antique brass Coorg lamp invites guests to *"Tap to light the sacred lamp & play Valaga 🎵"*. Tapping the lamp ignites a radiant golden flame, unleashes golden sparkles and jasmine embers, and immediately plays the traditional **Kodava Valaga Eravaat** instrumental music.

## Objectives
1. **Natural Spatial Flow:** Eliminate the disconnect of an envelope box opening and vanishing into a full-screen website.
2. **Deep Cultural Resonance:** Honor traditional Kodava wedding customs where ceremonies start with lighting the sacred flame.
3. **Flawless Audio Ignition:** The intentional user tap to light the lamp unlocks browser audio policy 100% of the time.
4. **Mobile Perfection:** Beautiful, responsive layout on all devices (iPhone, Android, tablet, desktop) without modal overlays.

## Visual & Structural Design
### 1. The Sacred Lamp Component (`#sacred-lamp`)
- Positioned in the hero section right above/alongside the couple's proclamation.
- **Antique Brass SVG Body:**
  - Traditional tiered bell-metal base with ornamental rim.
  - Fluted slender pedestal stem.
  - Classic petal-shaped oil bowl (*thali*) with wick spout.
  - Royal brass bird/finial atop the crest.
  - Rich antique gold & bronze metallic gradients.
- **The Flame (`.lamp-flame`):**
  - **Unlit State:** Soft glowing golden ember with pulsing invitation aura.
  - **Lit State:** Radiant teardrop flame with warm yellow/white core, glowing amber perimeter, and organic flickering animation (`@keyframes flameFlicker`).
  - Warm radial lighting overlay casting golden ambient warmth onto the brass body.
- **Interactive Callout Pill (`#lamp-callout`):**
  - **Before Tap:** *"✨ Tap to light the sacred lamp & play Valaga 🎵"* with breathing attention pulse.
  - **After Tap:** *"🪔 Sacred Lamp Lit • Playing Kodava Valaga Eravaat"* with active soundwave animation.

### 2. Audio & Particle Integration
- On tap / click on the lamp:
  - `lampState.light()` transitions lamp to lit state.
  - `audioController.play()` starts Kodava Valaga Eravaat immediately.
  - Canvas particle system triggers celebratory golden petal & ember shower.
  - Soundwaves on the top-bar audio pill and toggle animate synchronously.

### 3. Clean-up of Previous Overlay
- Remove `#envelope-overlay` and `css/envelope.css`.
- Remove `#open-envelope-btn`.
- Keep top-bar audio toggle (`#audio-toggle`) and floating pill (`#audio-pill`) in sync.

## Verification
- Unit tests verifying lamp state management, lighting transition, audio play invocation, and DOM markup.
- Test on local network server (`0.0.0.0:8000`) for mobile and desktop verification.
