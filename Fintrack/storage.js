/* ═══════════════════════════════════════════════════════════
   FinTrack Pro — storage.js
   All LocalStorage read/write operations in one place.
═══════════════════════════════════════════════════════════ */

const KEYS = {
  TRANSACTIONS: 'fintrack_transactions',
  THEME:        'fintrack_theme',
  PROFILE:      'fintrack_profile',
};

// ─── DEFAULT PROFILE ────────────────────────────────────
const DEFAULT_PROFILE = {
  name:     'User',
  currency: 'INR',
};

// ─── CURRENCY CONFIG ─────────────────────────────────────
const CURRENCY_MAP = {
  INR: { symbol: '₹',  locale: 'en-IN' },
  USD: { symbol: '$',  locale: 'en-US' },
  EUR: { symbol: '€',  locale: 'de-DE' },
  GBP: { symbol: '£',  locale: 'en-GB' },
  JPY: { symbol: '¥',  locale: 'ja-JP' },
};

// ─── TRANSACTIONS ────────────────────────────────────────

/**
 * Retrieve all saved transactions (array of objects).
 * Falls back to an empty array if nothing stored yet.
 */
function getTransactions() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.TRANSACTIONS)) || [];
  } catch {
    return [];
  }
}

/**
 * Persist the full transactions array.
 * @param {Array} txns
 */
function saveTransactions(txns) {
  localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(txns));
}

/**
 * Append a single new transaction object.
 * @param {Object} txn
 */
function addTransaction(txn) {
  const all = getTransactions();
  all.unshift(txn); // newest first
  saveTransactions(all);
}

/**
 * Remove a transaction by its id.
 * @param {string} id
 */
function deleteTransaction(id) {
  const filtered = getTransactions().filter(t => t.id !== id);
  saveTransactions(filtered);
}

// ─── THEME ──────────────────────────────────────────────

/** Returns 'light' or 'dark'. */
function getTheme() {
  return localStorage.getItem(KEYS.THEME) || 'light';
}

/** @param {'light'|'dark'} theme */
function saveTheme(theme) {
  localStorage.setItem(KEYS.THEME, theme);
}

// ─── PROFILE ────────────────────────────────────────────

/** Returns saved profile object with defaults filled in. */
function getProfile() {
  try {
    const stored = JSON.parse(localStorage.getItem(KEYS.PROFILE));
    return { ...DEFAULT_PROFILE, ...stored };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

/** @param {Object} profile */
function saveProfile(profile) {
  localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
}

// ─── RESET ──────────────────────────────────────────────

/** Wipe everything FinTrack stored. */
function resetAll() {
  Object.values(KEYS).forEach(k => localStorage.removeItem(k));
}

// ─── HELPERS ────────────────────────────────────────────

/**
 * Format a number as currency string using the user's preferred currency.
 * @param {number} amount
 * @returns {string}
 */
function formatCurrency(amount) {
  const { currency } = getProfile();
  const { symbol, locale } = CURRENCY_MAP[currency] || CURRENCY_MAP.INR;
  const formatted = Math.abs(amount).toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formatted}`;
}

/**
 * Generate a unique id for a transaction.
 * @returns {string}
 */
function generateId() {
  return `txn_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Format a date string (YYYY-MM-DD) into a human-readable form.
 * @param {string} dateStr
 * @returns {string}
 */
function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
