// background.js — Dynamic background tied to time of day.

const TIME_CLASSES = ['time-morning', 'time-afternoon', 'time-evening', 'time-night'];

function getCategory(hour) {
  if (hour >= 5 && hour < 11) return 'time-morning';
  if (hour >= 11 && hour < 17) return 'time-afternoon';
  if (hour >= 17 && hour < 21) return 'time-evening';
  return 'time-night'; // covers 21–5, closing the loop with no gaps
}

function applyBackground(bgLayer) {
  const hour = new Date().getHours();
  const category = getCategory(hour);

  // Remove any previous time-of-day class, then add the current one.
  bgLayer.classList.remove(...TIME_CLASSES);
  bgLayer.classList.add(category);
}

export function initBackground() {
  const bgLayer = document.getElementById('bgLayer');

  applyBackground(bgLayer);

  // Re-check every 15 minutes in case the tab stays open across a boundary
  // (e.g. open at 10:58, still open at 11:05 — should flip to afternoon).
  setInterval(() => applyBackground(bgLayer), 15 * 60 * 1000);
}
