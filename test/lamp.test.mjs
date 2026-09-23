// test/lamp.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { createLampState, initSacredLamp } from '../js/lamp.js';

test('createLampState manages unlit, lit, and unfurled states correctly', () => {
  const state = createLampState();
  assert.equal(state.isLit(), false);
  assert.equal(state.isUnfurled(), false);

  state.light();
  assert.equal(state.isLit(), true);

  state.unfurl();
  assert.equal(state.isUnfurled(), true);

  state.reset();
  assert.equal(state.isLit(), false);
  assert.equal(state.isUnfurled(), false);
});

test('initSacredLamp ignites flame, triggers audio play and unfurls overlay', async () => {
  let playCalled = false;
  let onLightCalled = false;
  let onUnfurlCalled = false;

  const mockAudio = {
    isPlaying: () => false,
    play: () => {
      playCalled = true;
      return Promise.resolve(true);
    },
    pause: () => {}
  };

  const classSet = new Set();
  const attributes = {};

  const mockLamp = {
    classList: {
      add: (cls) => classSet.add(cls),
      remove: (cls) => classSet.delete(cls),
      contains: (cls) => classSet.has(cls),
      toggle: (cls, force) => {
        if (force === undefined) {
          if (classSet.has(cls)) classSet.delete(cls); else classSet.add(cls);
        } else if (force) {
          classSet.add(cls);
        } else {
          classSet.delete(cls);
        }
      }
    },
    setAttribute: (k, v) => { attributes[k] = v; },
    getAttribute: (k) => attributes[k],
    addEventListener: () => {}
  };

  const overlayClassSet = new Set();
  const mockOverlay = {
    classList: {
      add: (cls) => overlayClassSet.add(cls),
      remove: (cls) => overlayClassSet.delete(cls),
      contains: (cls) => overlayClassSet.has(cls)
    },
    style: {}
  };

  const mockStatusText = {
    textContent: ''
  };

  const controller = initSacredLamp({
    lampElement: mockLamp,
    overlayElement: mockOverlay,
    statusTextElement: mockStatusText,
    audioController: mockAudio,
    unfurlDelay: 30, // fast for testing
    onLight: () => { onLightCalled = true; },
    onUnfurl: () => { onUnfurlCalled = true; }
  });

  assert.equal(controller.isLit(), false);
  assert.equal(attributes['aria-pressed'], 'false');

  // Trigger lamp tap
  controller.light();

  assert.equal(controller.isLit(), true);
  assert.equal(playCalled, true);
  assert.equal(onLightCalled, true);
  assert.equal(attributes['aria-pressed'], 'true');
  assert.ok(classSet.has('is-lit'));
  assert.equal(mockStatusText.textContent, '');

  // Wait for unfurl delay
  await new Promise((r) => setTimeout(r, 60));

  assert.equal(controller.isUnfurled(), true);
  assert.equal(onUnfurlCalled, true);
  assert.ok(overlayClassSet.has('is-unfurling'));
});
