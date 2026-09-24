// test/css.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('style.css defines Royal Kodava color tokens and glassmorphism', () => {
  const css = fs.readFileSync(path.resolve('css/style.css'), 'utf8');

  assert.ok(css.includes('--color-maroon-primary'));
  assert.ok(css.includes('--color-gold-primary'));
  assert.ok(css.includes('--color-bg-base'));
  assert.ok(css.includes('backdrop-filter'));
  assert.ok(css.includes('font-variant-numeric: tabular-nums'));
});

test('responsive.css defines breakpoints for mobile (<768px)', () => {
  const css = fs.readFileSync(path.resolve('css/responsive.css'), 'utf8');

  assert.ok(css.includes('@media (max-width: 768px)'));
  assert.ok(css.includes('@media (max-width: 480px)'));
});

test('style.css defines consistent, seamless background without light/dark split', () => {
  const css = fs.readFileSync(path.resolve('css/style.css'), 'utf8');

  // html should not be clamped to height: 100% which causes background tiling/seams
  assert.ok(!css.match(/html\s*\{[^}]*(?<!min-)height:\s*100%;/));
  // body background should have fixed attachment to prevent scrolling color shifts
  assert.ok(css.includes('background-attachment: fixed'));
  // body should not use the stark #ffffff 0% to #f2e7d5 100% radial gradient that splits page into light/dark
  assert.ok(!css.includes('#ffffff 0%, #fbf6ee 45%, #f2e7d5 100%'));
});

