// test/audio.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { createAudioState } from '../js/audio.js';

test('createAudioState manages play and mute transitions', () => {
  const state = createAudioState();
  assert.equal(state.isPlaying(), false);

  state.setPlaying(true);
  assert.equal(state.isPlaying(), true);

  state.toggle();
  assert.equal(state.isPlaying(), false);
});
