// js/audio.js

export const WEDDING_MUSIC_TRACK = {
  id: 'canon-in-d',
  name: 'Romantic Strings & Piano',
  subtitle: "Pachelbel's Canon in D Major",
  src: 'assets/wedding-music.m4a',
  fallbackSrc: 'assets/wedding-music.ogg',
};

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

  function fadeIn(audio, targetVolume = 0.8, durationMs = 1200) {
    if (fadeInterval) clearInterval(fadeInterval);
    audio.volume = 0.05;
    const step = (targetVolume - 0.05) / (durationMs / 50);
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
      if (audio.volume - step <= 0.05) {
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

  function play() {
    const audio = getAudioElement();
    state.setPlaying(true);
    audio.play().then(() => {
      fadeIn(audio);
    }).catch((err) => {
      console.warn('Playback error or user gesture required:', err);
      state.setPlaying(false);
      updateUi();
    });
    updateUi();
  }

  function pause() {
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
    track: WEDDING_MUSIC_TRACK,
  };
}
