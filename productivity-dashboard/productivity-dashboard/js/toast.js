// toast.js — small reusable notification utility.
// Kept separate so every feature can import one shared function
// instead of duplicating "create a div, style it, remove it" logic.

const container = document.getElementById('toastContainer');

/**
 * Show a toast message for a few seconds.
 * @param {string} message
 * @param {'default'|'success'|'error'} type
 */
export function showToast(message, type = 'default') {
  const toast = document.createElement('div');   // createElement
  toast.className = `toast ${type}`;              // classList via className
  toast.textContent = message;
  container.append(toast);                        // append

  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 250);         // remove after fade-out
  }, 2600);
}
