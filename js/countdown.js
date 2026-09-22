// js/countdown.js

// Target: October 15, 2026, 10:40:00 IST (UTC+05:30)
export const TARGET_WEDDING_DATE_STRING = '2026-10-15T10:40:00+05:30';
export const TARGET_WEDDING_EPOCH = new Date(TARGET_WEDDING_DATE_STRING).getTime();

/**
 * Calculates remaining time components from now to target.
 * @param {number} targetEpochMs 
 * @param {number} nowEpochMs 
 * @returns {{ totalMs: number, days: number, hours: number, minutes: number, seconds: number, isCompleted: boolean }}
 */
export function calculateTimeRemaining(targetEpochMs = TARGET_WEDDING_EPOCH, nowEpochMs = Date.now()) {
  const totalMs = targetEpochMs - nowEpochMs;

  if (totalMs <= 0) {
    return {
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isCompleted: true,
    };
  }

  const seconds = Math.floor((totalMs / 1000) % 60);
  const minutes = Math.floor((totalMs / 1000 / 60) % 60);
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));

  return {
    totalMs,
    days,
    hours,
    minutes,
    seconds,
    isCompleted: false,
  };
}

/**
 * Formats a number with leading zeroes.
 * @param {number} num 
 * @returns {string}
 */
export function formatDigit(num) {
  if (num < 0) return '00';
  return num < 10 ? `0${num}` : `${num}`;
}

/**
 * Mounts the live countdown onto DOM elements.
 * @param {object} elements
 * @param {function} onComplete
 */
export function initCountdown(elements, onComplete) {
  if (typeof window === 'undefined') return;

  function update() {
    const remaining = calculateTimeRemaining(TARGET_WEDDING_EPOCH, Date.now());

    if (elements.days) elements.days.textContent = formatDigit(remaining.days);
    if (elements.hours) elements.hours.textContent = formatDigit(remaining.hours);
    if (elements.minutes) elements.minutes.textContent = formatDigit(remaining.minutes);
    if (elements.seconds) elements.seconds.textContent = formatDigit(remaining.seconds);

    if (remaining.isCompleted) {
      if (typeof onComplete === 'function') {
        onComplete();
      }
      return true;
    }
    return false;
  }

  const done = update();
  if (!done) {
    const timerId = setInterval(() => {
      const isDone = update();
      if (isDone) clearInterval(timerId);
    }, 1000);
    return timerId;
  }
}
