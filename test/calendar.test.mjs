// test/calendar.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateGoogleCalendarUrl,
  generateIcsContent,
  getWeddingEventDetails
} from '../js/calendar.js';

test('getWeddingEventDetails provides correct metadata', () => {
  const details = getWeddingEventDetails();
  assert.equal(details.title, "Ponanna & Harshita's Wedding");
  assert.match(details.location, /Kodava Samaja/);
  assert.equal(details.startUtcIso, '20261015T051000Z');
  assert.equal(details.endUtcIso, '20261015T113000Z');
});

test('generateGoogleCalendarUrl returns a valid Google Calendar intent URL', () => {
  const details = getWeddingEventDetails();
  const url = generateGoogleCalendarUrl(details);

  assert.ok(url.startsWith('https://calendar.google.com/calendar/render?action=TEMPLATE'));
  assert.ok(url.includes('text=Ponanna+%26+Harshita%27s+Wedding'));
  assert.ok(url.includes('dates=20261015T051000Z%2F20261015T113000Z'));
  assert.ok(url.includes('Kodava+Samaja'));
});

test('generateIcsContent produces valid RFC 5545 VCALENDAR string', () => {
  const details = getWeddingEventDetails();
  const ics = generateIcsContent(details);

  assert.ok(ics.includes('BEGIN:VCALENDAR'));
  assert.ok(ics.includes('VERSION:2.0'));
  assert.ok(ics.includes('BEGIN:VEVENT'));
  assert.ok(ics.includes('SUMMARY:Ponanna & Harshita\'s Wedding'));
  assert.ok(ics.includes('DTSTART:20261015T051000Z'));
  assert.ok(ics.includes('DTEND:20261015T113000Z'));
  assert.ok(ics.includes('LOCATION:Kodava Samaja'));
  assert.ok(ics.includes('END:VEVENT'));
  assert.ok(ics.includes('END:VCALENDAR'));
});
