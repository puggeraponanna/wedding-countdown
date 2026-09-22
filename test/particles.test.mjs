// test/particles.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { createParticle, PARTICLE_CONFIG } from '../js/particles.js';

test('createParticle initializes valid sparkle or petal', () => {
  const p = createParticle(800, 600);
  assert.ok(['sparkle', 'petal'].includes(p.type));
  assert.ok(p.x >= 0 && p.x <= 800);
  assert.ok(p.y >= 0 && p.y <= 600);
  assert.ok(p.size > 0);
  assert.ok(p.opacity > 0 && p.opacity <= 1);
});

test('PARTICLE_CONFIG provides balanced density', () => {
  assert.ok(PARTICLE_CONFIG.maxMobileParticles <= 40);
  assert.ok(PARTICLE_CONFIG.maxDesktopParticles <= 80);
});
