// test/audio.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { createAudioState, WEDDING_MUSIC_TRACK } from '../js/audio.js';

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
