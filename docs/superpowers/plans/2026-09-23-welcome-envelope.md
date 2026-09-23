# Royal Gatefold Wedding Folio Implementation Plan

Replace the small postal envelope with a grand **Royal Gatefold Wedding Folio** that feels like holding a luxury hardbound Indian wedding invitation card. Double doors swing open in 3D perspective to reveal the wedding card, seamlessly starting the music.

## Proposed Changes

### 1. `css/envelope.css`
- Modern 3D CSS gatefold architecture with `perspective: 1400px`.
- Left and right doors with `transform-origin: left center` and `transform-origin: right center`.
- Opulent gold filigree borders, corner flourishes, and vertical center seam.
- Grand 76px gold wax medallion seal with `H ◆ P` monogram and breathing gold aura.
- Elegant inner invitation card featuring Harshita & Ponanna, ceremony schedules, and venue.
- Responsive sizing optimized specifically for mobile screens (`min(92vw, 390px)` wide, `min(560px, 78vh)` high).

### 2. `index.html`
- Update overlay markup to reflect the gatefold doors and royal invitation presentation.
- Retain re-open button in top bar (`#open-envelope-btn`).
- Preserve all existing IDs so existing JS controller logic works without breaking.

### 3. `js/envelope.js`
- Enhance timing and trigger: support gatefold door state (`is-open`), sound play, and continue button.
- Make delay generous so guests have time to appreciate the opened folio before it fades, or immediately dismiss when clicking "Continue to Countdown".

### 4. `test/envelope.test.mjs` & `test/html.test.mjs`
- Update unit tests to verify gatefold structure, doors, seal, and audio trigger.

## Verification
- Run test suite: `node --test test/*.test.mjs`.
- Inspect on `http://localhost:8000` on both desktop and mobile viewports.
- Confirm audio starts on first click.
- Prompt user to test locally (NO deployment without user permission).
