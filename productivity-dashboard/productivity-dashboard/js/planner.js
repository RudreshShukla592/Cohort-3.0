// planner.js — Daily Planner feature (hourly time slots).

const STORAGE_KEY = 'plannerEntries';
const START_HOUR = 6;   // 6 AM
const END_HOUR = 23;    // 11 PM

let entries = {};       // { "6": "text", "14": "text", ... } — hour -> note
let saveTimer = null;   // for debounced saving

export function initPlanner() {
  const container = document.getElementById('plannerList');

  entries = loadEntries();
  renderSlots(container);
  highlightCurrentHour(container);

  // Recheck which slot is "current" every minute, in case the panel
  // stays open across an hour boundary.
  setInterval(() => highlightCurrentHour(container), 60 * 1000);
}

function renderSlots(container) {
  container.innerHTML = '';

  for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
    const row = document.createElement('div');
    row.className = 'planner-row';
    row.dataset.hour = hour;

    const timeLabel = document.createElement('span');
    timeLabel.className = 'planner-time';
    timeLabel.textContent = formatHour(hour);

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'planner-input';
    input.placeholder = 'Nothing planned';
    input.maxLength = 120;
    // Handle empty/undefined entries gracefully — default to ''.
    input.value = entries[hour] ?? '';

    input.addEventListener('input', () => {
      entries[hour] = input.value;
      debounceSave();
    });

    row.append(timeLabel, input);
    container.append(row);
  }
}

function highlightCurrentHour(container) {
  const currentHour = new Date().getHours();
  container.querySelectorAll('.planner-row').forEach((row) => {
    row.classList.toggle('current-hour', Number(row.dataset.hour) === currentHour);
  });
}

function formatHour(hour) {
  const period = hour >= 12 ? 'PM' : 'AM';
  const display = hour % 12 || 12;
  return `${display}:00 ${period}`;
}

/** Save only after the user pauses typing for 500ms — avoids
 *  hammering Local Storage on every single keystroke. */
function debounceSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    // Drop empty entries so cleared slots don't linger as "" forever.
    const cleaned = Object.fromEntries(
      Object.entries(entries).filter(([, text]) => text.trim() !== '')
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
  }, 500);
}

function loadEntries() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
