# Design Spec: Royal Gatefold Wedding Folio

## Overview
An opulent, luxury gatefold wedding folio overlay greeting guests when arriving at Harshita & Ponanna's wedding countdown microsite. Designed like a bespoke physical Indian/Kodava hardbound wedding invitation card, the folio features deep velvet maroon outer doors with intricate gold foil filigree and a grand central wax seal (`H ◆ P`). 

Tapping the folio swings the double doors outward in realistic 3D perspective (`rotateY(-130deg)` and `rotateY(130deg)`), reveals the shimmering champagne-gold inner invitation card, synchronously triggers the traditional Kodava Valaga Eravaat music, unleashes celebratory gold particles, and smoothly transitions into the countdown experience.

## Viewport & Responsive Design
- **Mobile First (iPhone & Android):**
  - Dimensions: `width: min(92vw, 390px); height: min(560px, 78vh);`
  - Perfectly proportioned like holding a grand physical wedding card in portrait orientation.
  - Large touch targets (entire seal & folio) for effortless mobile interaction.
- **Desktop:**
  - Dimensions: `width: 480px; height: 620px;`
  - Dramatic 3D depth with subtle hover tilt and lighting effects.

## Visual & Structural Anatomy
### 1. Overlay Container (`#folio-overlay` / `#envelope-overlay`)
- Fixed full-screen overlay (`z-index: 9999`) with warm Kodava maroon vignette and backdrop blur (`backdrop-filter: blur(16px)`).
- Header label: *"Royal Wedding Invitation"*
- Subtitle: *"Harshita & Ponanna"*
- Floating prompt: *"Tap the gold seal to open & celebrate 🎵"*

### 2. The Gatefold Folio (`.folio-card`)
- Outer shell with gold trim and drop shadow (`0 30px 70px rgba(0, 0, 0, 0.6)`).
- **Double Gatefold Doors:**
  - `.folio-door-left`: Takes 50% width, hinges on the left (`transform-origin: left center`).
  - `.folio-door-right`: Takes 50% width, hinges on the right (`transform-origin: right center`).
  - Deep maroon texture with gold corner filigree and traditional Kodava borders.
  - Center vertical seam trimmed with gold foil accents.
- **Central Wax Seal Medallion:**
  - 76px diameter with 3D embossed relief.
  - Initial stamp: `H ◆ P` with royal crown / floral ring.
  - Vertical silk ribbon running behind the seal.
  - Shimmering breathing glow animation before touch.
- **Inner Wedding Invitation Card (`.folio-inner-card`):**
  - Sits inside the folio frame.
  - Fine champagne pearl finish with double gold border.
  - Auspicious invocation: *"With the blessings of our elders"*
  - Names: **Harshita & Ponanna**
  - Ceremonies:
    - **Oorkuduva Ceremony:** Oct 14 • 7:00 PM
    - **Wedding (Muhurtha):** Oct 15 • 10:40 AM
    - **Venue:** Ammathi Kodava Samaja, Kodagu
  - Action Button: *"Continue to Countdown →"*

### 3. Interaction & Audio Playback
1. Tap / click anywhere on the folio or wax seal.
2. Synchronously invokes `audioController.play()`.
3. Left door rotates -130°, right door rotates +130° with realistic cubic-bezier easing.
4. Wax seal dissolves in a flash of gold sparkles.
5. Inner card is fully revealed.
6. Overlay fades away smoothly after delay or when clicking "Continue to Countdown".
7. Re-open button in top navigation allows guests to re-experience the folio anytime.
