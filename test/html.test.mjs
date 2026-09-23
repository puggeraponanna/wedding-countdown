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

test('index.html has couple illustration, countdown elements and calendar buttons', () => {
  const html = fs.readFileSync(path.resolve('index.html'), 'utf8');

  assert.ok(html.includes('assets/couple-illustration.png'), 'Must feature couple illustration');
  assert.ok(html.includes('id="days"'));
  assert.ok(html.includes('id="hours"'));
  assert.ok(html.includes('id="minutes"'));
  assert.ok(html.includes('id="seconds"'));
  assert.ok(html.includes('id="add-google-cal"'));
  assert.ok(html.includes('id="download-ics"'));
  assert.ok(html.includes('id="whatsapp-share"'));
  assert.ok(html.includes('Kodava Samaja'));
});

test('index.html contains Traditional Coorg Sacred Hanging Lamp (Thook Bolcha) ceremonial overlay', () => {
  const html = fs.readFileSync(path.resolve('index.html'), 'utf8');

  assert.ok(html.includes('id="ceremony-overlay"'), 'Must have ceremony overlay container');
  assert.ok(html.includes('curtain-left'), 'Must have left curtain panel');
  assert.ok(html.includes('curtain-right'), 'Must have right curtain panel');
  assert.ok(html.includes('id="sacred-lamp"'), 'Must have sacred lamp button container');
  assert.ok(html.includes('lamp-hanging-chain'), 'Must have hanging chain from ceiling');
  assert.ok(html.includes('lamp-svg'), 'Must have brass lamp SVG');
  assert.ok(html.includes('lamp-flame'), 'Must have lamp flame element');
  assert.ok(html.includes('lamp-callout'), 'Must have interactive callout badge');
  assert.ok(html.includes('Thook Bolcha'), 'Must reference Thook Bolcha');
  assert.ok(html.includes('id="reopen-ceremony-btn"'), 'Must have relight lamp button in header');
  assert.ok(html.includes('goddess-lakshmi'), 'Lamp must feature idol of Goddess Lakshmi');
  assert.ok(html.includes('css/lamp.css'), 'Must link lamp.css');
});

test('details section displays ceremonies and venue without muhurtha', () => {
  const html = fs.readFileSync(path.resolve('index.html'), 'utf8');

  assert.ok(!html.toLowerCase().includes('muhurtha'), 'Must not contain the word muhurtha');
  assert.ok(html.includes('Oorkuduva Ceremony'), 'Must include Oorkuduva Ceremony');
  assert.ok(html.includes('Wedding Ceremony'), 'Must include Wedding Ceremony');
  assert.ok(html.includes('Ammathi Kodava Samaja'), 'Must include Ammathi Kodava Samaja');
});

