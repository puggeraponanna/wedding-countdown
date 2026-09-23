# Traditional Coorg Sacred Lamp (Kuthu Bolucha) Implementation Plan

Replace the disjointed envelope overlay with an auspicious **Kuthu Bolucha (Traditional Coorg Sacred Brass Lamp)** integrated directly into the hero section of the page. Tapping the lamp ignites the flame, unleashes golden sparkles, and plays the Kodava Valaga Eravaat music.

## Proposed Changes

### 1. `js/lamp.js`
- Create `createLampState()` tracking `isLit()`, `light()`, `extinguish()`, `toggle()`.
- Create `initSacredLamp({ lampElement, statusTextElement, audioController, onLight })`.
- Synchronously call `audioController.play()` on tap.
- Update UI classes (`is-lit`), accessibility attributes (`aria-pressed`), and status text.

### 2. `css/lamp.css`
- Exquisite brass lamp styling with metallic gradients and drop shadows.
- Organic 2D flame flicker animation (`@keyframes flameFlicker`) with radiant golden glow.
- Ceremonial interactive prompt badge with breathing pulse.
- Responsive styling for mobile devices (<480px) and desktops.

### 3. `index.html`
- Remove `#envelope-overlay` and `#open-envelope-btn`.
- Add `#sacred-lamp` in the hero section.
- Link `css/lamp.css` (replace `envelope.css`).
- Import and initialize `initSacredLamp` in the module script.

### 4. `test/lamp.test.mjs` & `test/html.test.mjs`
- Unit tests for lamp state, lighting action, audio integration, and DOM presence.

## Verification
- Run test suite: `node --test test/*.test.mjs`.
- Verify on `http://192.168.1.3:8000` (phone) and `http://localhost:8000` (Mac).
- Confirm flame lights up, music plays, and page feels completely cohesive and natural.
