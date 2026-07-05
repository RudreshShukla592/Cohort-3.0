// main.js — single entry point. Imports every feature module and
// initialises them in a sensible order. Keeping this as the only
// <script> tag in index.html avoids load-order bugs.

import { initTheme, toggleTheme } from './theme.js';
import { initClock } from './clock.js';
import { initBackground } from './background.js';
import { initNavigation } from './navigation.js';
import { initTodo } from './todo.js';
import { initPlanner } from './planner.js';
import { initGoals } from './goals.js';
import { initTimer } from './timer.js';
import { initQuote } from './quote.js';
import { initWeather } from './weather.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initClock();
  initBackground();
  const nav = initNavigation();

  initTodo();
  initPlanner();
  initGoals();
  initTimer();
  initQuote();
  initWeather();

  initGreeting();
  initShortcuts(nav);
});

/** Time-aware greeting on the dashboard's home screen. */
function initGreeting() {
  const greetingEl = document.getElementById('greeting');
  const hour = new Date().getHours();

  let greeting = 'Good evening';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 17) greeting = 'Good afternoon';

  greetingEl.textContent = `${greeting}, let's get things done.`;
}

/** Keyboard shortcuts: 1-6 open a feature, Esc closes it (see navigation.js),
 *  T toggles theme, ? opens the shortcuts help modal. */
function initShortcuts(nav) {
  const modal = document.getElementById('shortcutsModal');
  const openBtn = document.getElementById('shortcutsBtn');
  const closeBtn = document.getElementById('closeShortcuts');
  const featureOrder = ['todo', 'planner', 'goals', 'timer', 'quote', 'weather'];

  openBtn.addEventListener('click', () => (modal.hidden = false));
  closeBtn.addEventListener('click', () => (modal.hidden = true));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.hidden = true; });

  document.addEventListener('keydown', (event) => {
    // Ignore shortcuts while the user is typing in an input/textarea.
    const isTyping = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);
    if (isTyping) return;

    if (event.key === '?') {
      modal.hidden = !modal.hidden;
    } else if (event.key.toLowerCase() === 't') {
      toggleTheme();
    } else if (['1', '2', '3', '4', '5', '6'].includes(event.key)) {
      const index = Number(event.key) - 1;
      nav.openFeature(featureOrder[index]);
    } else if (event.key === 'Escape' && !modal.hidden) {
      modal.hidden = true;
    }
  });
}
