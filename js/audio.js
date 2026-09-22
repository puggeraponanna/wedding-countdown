// js/audio.js

export function createAudioState() {
  let playing = false;
  return {
    isPlaying: () => playing,
    setPlaying: (val) => { playing = !!val; },
    toggle: () => {
      playing = !playing;
      return playing;
    },
  };
}

/**
 * Initializes ambient audio using Web Audio API synthesis (warm meditative melodic bells/harp)
 * combined with audio element support.
 */
export function initAudio({ buttonElement, statusElement }) {
  if (typeof window === 'undefined') return;

  const state = createAudioState();
  let audioCtx = null;
  let synthInterval = null;

  // Gentle pentatonic Indian classical / romantic scale notes (in Hz)
  // Sa, Re, Ga, Pa, Dha (Raag Mohanam / Bhupali - celebrated, auspicious wedding raga)
  const notes = [
    261.63, // C4 (Sa)
    293.66, // D4 (Re)
    329.63, // E4 (Ga)
    392.00, // G4 (Pa)
    440.00, // A4 (Dha)
    523.25, // C5 (Sa')
    587.33, // D5 (Re')
    659.25, // E5 (Ga')
  ];

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playGentleBell(freq) {
    if (!state.isPlaying()) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.9);
    } catch {
      // Audio autoplay policy catch
    }
  }

  function startAmbientChimes() {
    // Play an opening gentle chord
    playGentleBell(notes[0]);
    setTimeout(() => playGentleBell(notes[2]), 400);
    setTimeout(() => playGentleBell(notes[4]), 800);

    synthInterval = setInterval(() => {
      if (!state.isPlaying()) return;
      const note = notes[Math.floor(Math.random() * notes.length)];
      playGentleBell(note);
    }, 2200);
  }

  function stopAmbientChimes() {
    if (synthInterval) clearInterval(synthInterval);
  }

  function updateUi() {
    const isPlaying = state.isPlaying();
    if (buttonElement) {
      buttonElement.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
      buttonElement.classList.toggle('playing', isPlaying);
    }
    if (statusElement) {
      statusElement.textContent = isPlaying ? 'Sound: On' : 'Sound: Off';
    }
  }

  function toggle() {
    const willPlay = state.toggle();
    if (willPlay) {
      getAudioContext();
      startAmbientChimes();
    } else {
      stopAmbientChimes();
    }
    updateUi();
    return willPlay;
  }

  if (buttonElement) {
    buttonElement.addEventListener('click', toggle);
  }

  return {
    toggle,
    isPlaying: () => state.isPlaying(),
  };
}
