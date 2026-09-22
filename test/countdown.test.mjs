// test/countdown.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTimeRemaining, formatDigit, TARGET_WEDDING_EPOCH } from '../js/countdown.js';

test('TARGET_WEDDING_EPOCH corresponds to 2026-10-15T10:40:00+05:30', () => {
  const expectedIso = new Date('2026-10-15T10:40:00+05:30').getTime();
  assert.equal(TARGET_WEDDING_EPOCH, expectedIso);
});

test('calculateTimeRemaining returns correct days, hours, minutes, seconds', () => {
  const target = TARGET_WEDDING_EPOCH;
  // 1 day, 2 hours, 3 minutes, 4 seconds before target
  const now = target - ((1 * 86400 + 2 * 3600 + 3 * 60 + 4) * 1000);

  const result = calculateTimeRemaining(target, now);
  assert.equal(result.days, 1);
  assert.equal(result.hours, 2);
  assert.equal(result.minutes, 3);
  assert.equal(result.seconds, 4);
  assert.equal(result.isCompleted, false);
});

test('calculateTimeRemaining returns isCompleted true when past target', () => {
  const target = TARGET_WEDDING_EPOCH;
  const now = target + 5000;

  const result = calculateTimeRemaining(target, now);
  assert.equal(result.days, 0);
  assert.equal(result.hours, 0);
  assert.equal(result.minutes, 0);
  assert.equal(result.seconds, 0);
  assert.equal(result.isCompleted, true);
});

test('formatDigit pads single numbers with zero', () => {
  assert.equal(formatDigit(0), '00');
  assert.equal(formatDigit(7), '07');
  assert.equal(formatDigit(14), '14');
  assert.equal(formatDigit(100), '100');
});
