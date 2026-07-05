// clock.js — Live Date & Time display.

let clockIntervalId = null; // module-scoped, not global — avoids polluting window

export function initClock() {
  const clockEl = document.getElementById('liveClock');
  const dateEl = document.getElementById('liveDate');

  function render() {
    const now = new Date();

    // 12-hour time with leading zeros and AM/PM
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    clockEl.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;

    dateEl.textContent = now.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  render(); // call once immediately — don't wait a full second to appear

  // Guard against double-initialisation creating overlapping intervals
  if (clockIntervalId) clearInterval(clockIntervalId);
  clockIntervalId = setInterval(render, 1000);
}
