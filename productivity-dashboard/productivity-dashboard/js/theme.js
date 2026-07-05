// theme.js — Light/Dark theme switch.
// The actual "no flash of wrong theme" fix lives in an inline <script>
// at the top of index.html <head> (runs before CSS paints).
// This module only wires up the toggle button for *changing* the theme afterwards.

const STORAGE_KEY = 'theme';

export function initTheme() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');

  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    root.setAttribute('data-theme', next);   // every CSS var updates instantly
    localStorage.setItem(STORAGE_KEY, next); // persist choice
  });
}

/** Exposed so keyboard shortcuts (main.js) can trigger a toggle too. */
export function toggleTheme() {
  document.getElementById('themeToggle').click();
}
