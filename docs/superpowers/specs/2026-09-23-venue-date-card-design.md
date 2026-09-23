# Design Specification: Unified Royal Venue & Date Card

**Date:** 2026-09-23  
**Status:** Approved  
**Author:** Antigravity  

## 1. Objective
Redesign the wedding details card (Date & Venue) to eliminate visual inconsistencies, establish clear hierarchy between the multi-day ceremonies and physical venue, remove the word "(Muhurtha)", and elevate the presentation to match the royal Kodava aesthetic of the site.

## 2. Requirements & Changes
1. **Remove "(Muhurtha)"**:
   - In `index.html`: Change `Wedding Ceremony (Muhurtha)` to `Wedding Ceremony`.
   - In `assets/og-preview.svg`: Update any instance of `(MUHURTHA)` to match.
   - Consistent time display:
     - Oorkuduva: `Wednesday, October 14, 2026 • 7:00 PM onwards`
     - Wedding Ceremony: `Thursday, October 15, 2026 • 10:40 AM onwards`
2. **Unified Two-Section Structure inside `.details-card`**:
   - **Section 1: Ceremonies & Timings**
     - Section Header: `✦ CEREMONIES & TIMINGS ✦` in Cinzel uppercase gold typography.
     - Stacked date badges (`OCT` / `14` and `OCT` / `15`) with subtle gold border, rich maroon background, and crisp typography replacing the generic circular outline icons.
     - Event titles in Playfair serif and subtitles in warm maroon.
   - **Divider**:
     - Delicate horizontal gold line with a centered diamond glyph.
   - **Section 2: Venue & Location**
     - Section Header: `✦ VENUE & LOCATION ✦` in matching gold header.
     - Venue title: `Ammathi Kodava Samaja` in Playfair Display serif.
     - Address: `Ammathi, Kodagu (Coorg), Karnataka`.
     - Button: Premium styled button `View on Google Maps` with location pin icon and external link chevron, centered with gold border, gentle hover glow, and responsive touch target.
3. **Responsive Design**:
   - Seamless scaling across mobile screens (<480px, <768px, and desktop).
   - Touch-friendly button sizes (min 44px height).

## 3. Files to Update
- `index.html`: Update `.details-section` markup.
- `css/style.css`: Add styles for date badges, section labels, and venue button.
- `css/responsive.css`: Add mobile adjustments for date badges and venue layout.
- `assets/og-preview.svg`: Remove `(MUHURTHA)`.
- `test/html.test.mjs`: Verify presence of ceremonies, updated titles, and absence of `muhurtha`.
