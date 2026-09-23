// js/lamp.js

/**
 * Creates and tracks the state of the sacred lamp.
 */
export function createLampState() {
  let lit = false;
  let unfurled = false;

  return {
    isLit: () => lit,
    isUnfurled: () => unfurled,
    light: () => { lit = true; },
    extinguish: () => { lit = false; },
    unfurl: () => { unfurled = true; },
    reset: () => {
      lit = false;
      unfurled = false;
    },
    toggle: () => {
      lit = !lit;
      return lit;
    }
  };
}

/**
 * Initializes the Traditional Kodava Sacred Hanging Lamp (Thook Bolcha) Ceremonial Entrance.
 *
 * @param {Object} options
 * @param {HTMLElement} options.lampElement - The interactive lamp container/button
 * @param {HTMLElement} [options.overlayElement] - Full-screen curtain overlay
 * @param {HTMLElement} [options.statusTextElement] - Status message element
 * @param {HTMLElement} [options.reopenButton] - Button to re-trigger the ceremonial entrance
 * @param {Object} [options.audioController] - Controller to play wedding music
 * @param {number} [options.unfurlDelay=1800] - Delay in ms after lighting before curtains unfurl
 * @param {Function} [options.onLight] - Callback when lamp is lit
 * @param {Function} [options.onUnfurl] - Callback when overlay unfurls
 */
export function initSacredLamp({
  lampElement,
  overlayElement,
  statusTextElement,
  reopenButton,
  audioController,
  unfurlDelay = 1800,
  onLight,
  onUnfurl
}) {
  const state = createLampState();
  let unfurlTimer = null;

  const UNLIT_TEXT = 'Tap to light';
  const LIT_TEXT = '';

  function updateUi(isLit) {
    if (lampElement) {
      lampElement.classList.toggle('is-lit', isLit);
      lampElement.setAttribute('aria-pressed', isLit ? 'true' : 'false');
      lampElement.title = isLit
        ? 'Sacred Thook Bolcha Lit'
        : 'Click to light the sacred Thook Bolcha and begin celebration';
    }

    if (statusTextElement) {
      statusTextElement.textContent = isLit ? LIT_TEXT : UNLIT_TEXT;
    }
  }

  function unfurlCurtains() {
    state.unfurl();

    if (overlayElement) {
      overlayElement.classList.add('is-unfurling');
      setTimeout(() => {
        overlayElement.classList.add('hidden');
        overlayElement.style.display = 'none';
      }, 1400);
    }

    if (typeof onUnfurl === 'function') {
      try {
        onUnfurl();
      } catch (err) {
        console.warn('onUnfurl error:', err);
      }
    }
  }

  function light() {
    if (state.isLit()) return;
    state.light();
    updateUi(true);

    if (audioController && typeof audioController.play === 'function') {
      try {
        audioController.play();
      } catch (err) {
        console.warn('Audio play error on lighting lamp:', err);
      }
    }

    if (typeof onLight === 'function') {
      try {
        onLight();
      } catch (err) {
        console.warn('onLight callback error:', err);
      }
    }

    // Schedule unfurling of curtains
    if (unfurlDelay >= 0) {
      if (unfurlTimer) clearTimeout(unfurlTimer);
      unfurlTimer = setTimeout(() => {
        unfurlCurtains();
      }, unfurlDelay);
    }
  }

  function reopen() {
    if (unfurlTimer) clearTimeout(unfurlTimer);
    state.reset();
    updateUi(false);

    if (overlayElement) {
      overlayElement.style.display = 'flex';
      overlayElement.classList.remove('hidden', 'is-unfurling');
    }
  }

  if (lampElement) {
    lampElement.setAttribute('aria-pressed', 'false');

    lampElement.addEventListener('click', (e) => {
      e.stopPropagation();
      light();
    });

    lampElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        light();
      }
    });
  }

  if (reopenButton) {
    reopenButton.addEventListener('click', (e) => {
      e.stopPropagation();
      reopen();
    });
  }

  return {
    light,
    reopen,
    unfurl: unfurlCurtains,
    isLit: () => state.isLit(),
    isUnfurled: () => state.isUnfurled()
  };
}
