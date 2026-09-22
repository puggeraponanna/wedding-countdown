// test/css.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('style.css defines Royal Kodava color tokens and glassmorphism', () => {
  const css = fs.readFileSync(path.resolve('css/style.css'), 'utf8');

  assert.ok(css.includes('--color-emerald-deep'));
  assert.ok(css.includes('--color-gold-primary'));
  assert.ok(css.includes('--color-ivory'));
  assert.ok(css.includes('backdrop-filter'));
  assert.ok(css.includes('font-variant-numeric: tabular-nums'));
});

test('responsive.css defines breakpoints for mobile (<768px)', () => {
  const css = fs.readFileSync(path.resolve('css/responsive.css'), 'utf8');

  assert.ok(css.includes('@media (max-width: 768px)'));
  assert.ok(css.includes('@media (max-width: 480px)'));
});
