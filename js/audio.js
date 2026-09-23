// js/audio.js

export const WEDDING_MUSIC_TRACK = {
  id: 'valaga-eravatt',
  name: 'Kodava Valaga',
  subtitle: 'Traditional Eravaat Instrumental',
  src: 'assets/wedding-music.m4a?v=2',
  fallbackSrc: 'assets/wedding-music.ogg?v=2',
};

export const DEFAULT_TARGET_VOLUME = 0.20;

export function createAudioState() {
  let playing = false;

  return {
    isPlaying: () => playing,
    setPlaying: (val) => { playing = !!val; },
    toggle: () => {
      playing = !playing;
      return playing;
    },
    getTrack: () => WEDDING_MUSIC_TRACK,
  };
}

/**
 * Initializes wedding background audio with HTML5 Audio element.
 */
export function initAudio({ buttonElement, statusElement }) {
  if (typeof window === 'undefined') return;

  const state = createAudioState();
  let audioElement = null;
  let fadeInterval = null;

  function getAudioElement() {
    if (!audioElement) {
      audioElement = new Audio();
      audioElement.loop = true;
      audioElement.preload = 'auto';

      // Check format support
      const canPlayM4A = audioElement.canPlayType('audio/mp4; codecs="mp4a.40.2"');
      audioElement.src = canPlayM4A ? WEDDING_MUSIC_TRACK.src : WEDDING_MUSIC_TRACK.fallbackSrc;

      audioElement.addEventListener('play', () => {
        state.setPlaying(true);
        updateUi();
      });

      audioElement.addEventListener('pause', () => {
        state.setPlaying(false);
        updateUi();
      });

      audioElement.addEventListener('error', () => {
        if (audioElement.src.includes('.m4a') && WEDDING_MUSIC_TRACK.fallbackSrc) {
          audioElement.src = WEDDING_MUSIC_TRACK.fallbackSrc;
          if (state.isPlaying()) {
            audioElement.play().catch(() => {});
          }
        }
      });
    }
    return audioElement;
  }

  function fadeIn(audio, targetVolume = DEFAULT_TARGET_VOLUME, durationMs = 1200) {
    if (fadeInterval) clearInterval(fadeInterval);
    const startVolume = Math.min(0.02, targetVolume);
    audio.volume = startVolume;
    const step = (targetVolume - startVolume) / (durationMs / 50);
    fadeInterval = setInterval(() => {
      if (audio.volume + step >= targetVolume) {
        audio.volume = targetVolume;
        clearInterval(fadeInterval);
      } else {
        audio.volume += step;
      }
    }, 50);
  }

  function fadeOut(audio, durationMs = 600, callback) {
    if (fadeInterval) clearInterval(fadeInterval);
    const step = audio.volume / (durationMs / 50);
    fadeInterval = setInterval(() => {
      if (audio.volume - step <= 0.02) {
        audio.volume = 0;
        clearInterval(fadeInterval);
        if (typeof callback === 'function') callback();
      } else {
        audio.volume -= step;
      }
    }, 50);
  }

  function updateUi() {
    const isPlaying = state.isPlaying();

    if (buttonElement) {
      buttonElement.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
      buttonElement.classList.toggle('playing', isPlaying);
      buttonElement.title = isPlaying
        ? `Pause: ${WEDDING_MUSIC_TRACK.name} (${WEDDING_MUSIC_TRACK.subtitle})`
        : `Play: ${WEDDING_MUSIC_TRACK.name} (${WEDDING_MUSIC_TRACK.subtitle})`;
    }

    if (statusElement) {
      statusElement.textContent = isPlaying
        ? `Music: On — ${WEDDING_MUSIC_TRACK.name}`
        : 'Music: Off';
    }
  }

  let userPaused = false;

  function play() {
    userPaused = false;
    const audio = getAudioElement();
    state.setPlaying(true);
    updateUi();

    try {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        return playPromise.then(() => {
          fadeIn(audio);
          return true;
        }).catch((err) => {
          console.warn('Playback error or user gesture required:', err);
          state.setPlaying(false);
          updateUi();
          return false;
        });
      }
      return Promise.resolve(true);
    } catch (err) {
      console.warn('Sync audio play error:', err);
      state.setPlaying(false);
      updateUi();
      return Promise.resolve(false);
    }
  }

  function pause() {
    userPaused = true;
    const audio = getAudioElement();
    state.setPlaying(false);
    fadeOut(audio, 500, () => {
      audio.pause();
    });
    updateUi();
  }

  function toggle() {
    if (state.isPlaying()) {
      pause();
    } else {
      play();
    }
    return state.isPlaying();
  }

  if (buttonElement) {
    buttonElement.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });
  }

  // Preload audio ready for first play
  getAudioElement();

  return {
    play,
    pause,
    toggle,
    isPlaying: () => state.isPlaying(),
    isUserPaused: () => userPaused,
    track: WEDDING_MUSIC_TRACK,
  };
}

/**
 * Automatically unlocks and starts audio on the first user interaction anywhere on the document.
 * Also attempts initial playback in case the browser environment permits autoplay.
 */
export function enableAutoPlayOnInteraction(audioController, options = {}) {
  const win = options.windowObj || (typeof window !== 'undefined' ? window : null);
  if (!win || !audioController) return () => {};

  let interactionCleaned = false;
  const events = ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown'];

  const cleanup = () => {
    if (interactionCleaned) return;
    interactionCleaned = true;
    events.forEach((evt) => {
      win.removeEventListener(evt, onInteraction, true);
    });
  };

  const onInteraction = () => {
    if (interactionCleaned) return;
    if (typeof audioController.isUserPaused === 'function' && audioController.isUserPaused()) {
      cleanup();
      return;
    }
    if (audioController.isPlaying()) {
      cleanup();
      return;
    }

    const res = audioController.play();
    if (res && typeof res.then === 'function') {
      res.then((success) => {
        if (success) {
          cleanup();
          if (typeof options.onStarted === 'function') {
            options.onStarted();
          }
        }
      }).catch(() => {});
    } else {
      cleanup();
    }
  };

  // 1. Try immediate autoplay on page load
  try {
    const initRes = audioController.play();
    if (initRes && typeof initRes.then === 'function') {
      initRes.then((success) => {
        if (success) {
          cleanup();
          if (typeof options.onStarted === 'function') {
            options.onStarted();
          }
        }
      }).catch(() => {});
    }
  } catch {
    // Autoplay policy prevented immediate playback
  }

  // 2. Listen for first user gesture anywhere
  events.forEach((evt) => {
    win.addEventListener(evt, onInteraction, { capture: true, passive: true });
  });

  return cleanup;
}
