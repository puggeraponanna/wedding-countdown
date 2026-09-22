// test/audio.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { createAudioState, WEDDING_MUSIC_TRACK, enableAutoPlayOnInteraction } from '../js/audio.js';

test('createAudioState manages play and mute transitions', () => {
  const state = createAudioState();
  assert.equal(state.isPlaying(), false);

  state.setPlaying(true);
  assert.equal(state.isPlaying(), true);

  state.toggle();
  assert.equal(state.isPlaying(), false);
});

test('WEDDING_MUSIC_TRACK is configured for Canon in D acoustic strings & piano', () => {
  assert.equal(WEDDING_MUSIC_TRACK.id, 'canon-in-d');
  assert.ok(WEDDING_MUSIC_TRACK.name.includes('Strings') || WEDDING_MUSIC_TRACK.name.includes('Canon'));
  assert.ok(WEDDING_MUSIC_TRACK.src.includes('assets/wedding-music.m4a'));
});

test('enableAutoPlayOnInteraction registers event listeners and starts music on gesture', async () => {
  let playCalls = 0;
  let playing = false;
  const mockController = {
    isPlaying: () => playing,
    isUserPaused: () => false,
    play: () => {
      playCalls += 1;
      playing = true;
      return Promise.resolve(true);
    },
    pause: () => {
      playing = false;
    }
  };

  const listeners = {};
  const mockWindow = {
    addEventListener: (evt, fn) => {
      listeners[evt] = fn;
    },
    removeEventListener: (evt, fn) => {
      delete listeners[evt];
    }
  };

  let startedCalled = false;
  enableAutoPlayOnInteraction(mockController, {
    windowObj: mockWindow,
    onStarted: () => { startedCalled = true; }
  });

  // Check event listeners registered
  assert.ok(listeners['click']);
  assert.ok(listeners['touchstart']);
  assert.ok(listeners['pointerdown']);

  // Simulate user gesture
  listeners['click']();
  await Promise.resolve();

  assert.ok(playCalls >= 1);
  assert.equal(mockController.isPlaying(), true);
  assert.equal(startedCalled, true);
  // Listeners should be cleaned up after successful play
  assert.equal(listeners['click'], undefined);
});
