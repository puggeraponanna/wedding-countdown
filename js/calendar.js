// js/calendar.js

export function getWeddingEventDetails() {
  return {
    title: "Harshita & Ponanna's Wedding",
    description: "Join us in celebrating the wedding of Harshita & Ponanna at Ammathi Kodava Samaja, Coorg!",
    location: "Ammathi Kodava Samaja, Ammathi, Kodagu (Coorg), Karnataka, India",
    // 10:40 AM IST = 05:10 AM UTC
    startUtcIso: "20261015T051000Z",
    // Reception/Celebration until ~5:00 PM IST = 11:30 AM UTC
    endUtcIso: "20261015T113000Z",
  };
}

/**
 * Creates Google Calendar URL
 */
export function generateGoogleCalendarUrl(details = getWeddingEventDetails()) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: details.title,
    dates: `${details.startUtcIso}/${details.endUtcIso}`,
    details: details.description,
    location: details.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Creates iCalendar RFC 5545 format string
 */
export function generateIcsContent(details = getWeddingEventDetails()) {
  const uid = `wedding-harshita-ponanna-2026@wedding-countdown`;
  const nowUtc = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Harshita & Ponanna//Wedding Countdown//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${details.startUtcIso}`,
    `DTEND:${details.endUtcIso}`,
    `SUMMARY:${details.title}`,
    `DESCRIPTION:${details.description}`,
    `LOCATION:${details.location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

/**
 * Triggers client-side file download of .ics file
 */
export function downloadIcsFile(filename = 'Harshita-Ponanna-Wedding.ics', content = generateIcsContent()) {
  if (typeof window === 'undefined') return;
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
