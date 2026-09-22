// test/assets.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('OG preview image and favicon exist with correct sizes', () => {
  const ogPath = path.resolve('assets/og-preview.png');
  const faviconPath = path.resolve('assets/favicon.svg');

  assert.ok(fs.existsSync(faviconPath), 'favicon.svg must exist');
  assert.ok(fs.existsSync(ogPath), 'assets/og-preview.png must exist');

  const stats = fs.statSync(ogPath);
  assert.ok(stats.size > 1000, 'OG image must have valid content');
  assert.ok(stats.size < 300 * 1024, 'OG image must be under 300KB for WhatsApp');
});
