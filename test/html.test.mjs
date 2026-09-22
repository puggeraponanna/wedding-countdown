// test/html.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('index.html contains all required WhatsApp OpenGraph tags', () => {
  const html = fs.readFileSync(path.resolve('index.html'), 'utf8');

  assert.ok(html.includes('property="og:title"'), 'Must have og:title');
  assert.ok(html.includes('Harshita &amp; Ponanna') || html.includes('Harshita & Ponanna'));
  assert.ok(html.includes('property="og:description"'), 'Must have og:description');
  assert.ok(html.includes('property="og:image"'), 'Must have og:image');
  assert.ok(html.includes('assets/og-preview.png'), 'Must point to assets/og-preview.png');
  assert.ok(html.includes('property="og:image:width" content="1200"'));
  assert.ok(html.includes('property="og:image:height" content="630"'));
});

test('index.html has countdown elements and calendar buttons', () => {
  const html = fs.readFileSync(path.resolve('index.html'), 'utf8');

  assert.ok(html.includes('id="days"'));
  assert.ok(html.includes('id="hours"'));
  assert.ok(html.includes('id="minutes"'));
  assert.ok(html.includes('id="seconds"'));
  assert.ok(html.includes('id="add-google-cal"'));
  assert.ok(html.includes('id="download-ics"'));
  assert.ok(html.includes('id="whatsapp-share"'));
  assert.ok(html.includes('Ammathi Kodava Samaja'));
});
