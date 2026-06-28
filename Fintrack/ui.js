/* ═══════════════════════════════════════════════════════════
   FinTrack Pro — ui.js
   All DOM rendering, modals, toasts, navigation, and
   miscellaneous UI helpers.
═══════════════════════════════════════════════════════════ */

// ─── CATEGORY CONFIG ─────────────────────────────────────
const CATEGORIES = {
  income: [
    { id: 'salary',     label: 'Salary',       icon: '💼' },
    { id: 'freelance',  label: 'Freelance',     icon: '💻' },
    { id: 'investment', label: 'Investment',    icon: '📈' },
    { id: 'gift',       label: 'Gift / Bonus',  icon: '🎁' },
    { id: 'other_in',   label: 'Other Income',  icon: '💰' },
  ],
  expense: [
    { id: 'food',       label: 'Food & Dining', icon: '🍔' },
    { id: 'transport',  label: 'Transport',     icon: '🚌' },
    { id: 'shopping',   label: 'Shopping',      icon: '🛍️' },
    { id: 'bills',      label: 'Bills',         icon: '🧾' },
    { id: 'health',     label: 'Health',        icon: '🏥' },
    { id: 'education',  label: 'Education',     icon: '📚' },
    { id: 'travel',     label: 'Travel',        icon: '✈️' },
    { id: 'rent',       label: 'Rent',          icon: '🏠' },
    { id: 'entertain',  label: 'Entertainment', icon: '🎬' },
    { id: 'other_ex',   label: 'Other Expense', icon: '📦' },
  ],
};

/** Lookup icon by category id (searches both income + expense lists). */
function getCategoryIcon(catId) {
  const all = [...CATEGORIES.income, ...CATEGORIES.expense];
  return all.find(c => c.id === catId)?.icon || '💳';
}

/** Lookup category label. */
function getCategoryLabel(catId) {
  const all = [...CATEGORIES.income, ...CATEGORIES.expense];
  return all.find(c => c.id === catId)?.label || catId;
}

// ─── TOAST ──────────────────────────────────────────────

/**
 * Show a floating toast notification.
 * @param {string} msg
 * @param {'success'|'error'|'warn'} type
 */
function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  const icons = { success: '✅', error: '❌', warn: '⚠️' };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-emoji">${icons[type] || '💬'}</span>
    <span class="toast-msg">${msg}</span>
  `;
  container.appendChild(toast);

  // Auto-dismiss after 3s
  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 350);
  }, 3000);
}

// ─── MODAL ──────────────────────────────────────────────

/** Open a modal by its element id. */
function openModal(id) {
  const modal = document.getElementById(id);
  modal.removeAttribute('hidden');
  // Trap focus on first focusable element
  const first = modal.querySelector('input, button, select, textarea');
  if (first) setTimeout(() => first.focus(), 80);
}

/** Close a modal by its element id. */
function closeModal(id) {
  document.getElementById(id).setAttribute('hidden', '');
}

// ─── NAVIGATION ─────────────────────────────────────────

const SECTIONS = ['dashboard', 'transactions', 'analytics'];

/**
 * Show the given section and update the active nav link.
 * @param {string} sectionId - one of SECTIONS
 */
function showSection(sectionId) {
  SECTIONS.forEach(id => {
    document.getElementById(`section-${id}`)
            .classList.toggle('hidden', id !== sectionId);
  });

  // Update nav active state
  document.querySelectorAll('.nav-item').forEach(a => {
    a.classList.toggle('active', a.dataset.section === sectionId);
  });

  // Update page heading
  const labels = { dashboard: 'Dashboard', transactions: 'Transactions', analytics: 'Analytics' };
  document.getElementById('page-heading').textContent = labels[sectionId] || '';

  // Trigger animation on newly-visible cards
  triggerAnimations();
}

// ─── ANIMATE CARDS ───────────────────────────────────────

/** Finds all [data-animate] cards in visible sections and adds .visible */
function triggerAnimations() {
  document.querySelectorAll('[data-animate]').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 60) {
      el.classList.add('visible');
    }
  });
}

// ─── STAT CARDS ──────────────────────────────────────────

/**
 * Animated number counter from 0 to target.
 * @param {HTMLElement} el
 * @param {number} target
 * @param {boolean} isCurrency
 */
function animateNumber(el, target, isCurrency = true) {
  const duration = 800;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;

    el.textContent = isCurrency
      ? formatCurrency(current)
      : `${Math.round(current)}%`;

    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/**
 * Refresh all four stat cards from current transactions.
 */
function renderStats() {
  const txns = getTransactions();

  const income  = txns.filter(t => t.type === 'income')
                      .reduce((s, t) => s + t.amount, 0);
  const expense = txns.filter(t => t.type === 'expense')
                      .reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;
  const savings = income > 0 ? Math.round(((income - expense) / income) * 100) : 0;

  animateNumber(document.getElementById('stat-balance'), balance);
  animateNumber(document.getElementById('stat-income'),  income);
  animateNumber(document.getElementById('stat-expense'), expense);
  animateNumber(document.getElementById('stat-savings'), Math.max(0, savings), false);
}

// ─── ACTIVITY LIST (Dashboard recent 5) ──────────────────

/** Render up to 5 most-recent transactions in the Dashboard activity panel. */
function renderActivity() {
  const list = document.getElementById('activity-list');
  const txns = getTransactions().slice(0, 5);

  if (!txns.length) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <div class="empty-title">No transactions yet</div>
        <div class="empty-sub">Add your first income or expense above.</div>
      </div>`;
    return;
  }

  list.innerHTML = txns.map((t, i) => `
    <div class="activity-item" style="animation-delay:${i * 0.06}s">
      <div class="activity-icon">${getCategoryIcon(t.category)}</div>
      <div class="activity-info">
        <div class="activity-name">${escHtml(t.name)}</div>
        <div class="activity-cat">${getCategoryLabel(t.category)} · ${formatDate(t.date)}</div>
      </div>
      <div class="activity-amount ${t.type}">
        ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
      </div>
    </div>
  `).join('');
}

// ─── TRANSACTION LIST ─────────────────────────────────────

/** State for filters & sort */
const filterState = {
  type:   'all',
  search: '',
  sort:   'newest',
};

/**
 * Apply filterState to all transactions and render them.
 */
function renderTransactions() {
  let txns = getTransactions();

  // Filter by type
  if (filterState.type !== 'all') {
    txns = txns.filter(t => t.type === filterState.type);
  }

  // Search
  if (filterState.search.trim()) {
    const q = filterState.search.toLowerCase();
    txns = txns.filter(t =>
      t.name.toLowerCase().includes(q) ||
      getCategoryLabel(t.category).toLowerCase().includes(q)
    );
  }

  // Sort
  txns = sortTransactions(txns, filterState.sort);

  const list = document.getElementById('transactions-list');

  if (!txns.length) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <div class="empty-title">No transactions found</div>
        <div class="empty-sub">Try adjusting your search or filters.</div>
      </div>`;
    return;
  }

  list.innerHTML = txns.map((t, i) => `
    <div class="txn-card" style="animation-delay:${Math.min(i * 0.04, 0.4)}s">
      <div class="txn-icon ${t.type}-icon">${getCategoryIcon(t.category)}</div>
      <div class="txn-info">
        <div class="txn-name">${escHtml(t.name)}</div>
        <div class="txn-meta">${getCategoryLabel(t.category)} · ${formatDate(t.date)}</div>
      </div>
      <div class="txn-amount ${t.type}">
        ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
      </div>
      <button class="txn-delete" data-id="${t.id}" aria-label="Delete transaction ${escHtml(t.name)}">
        🗑️
      </button>
    </div>
  `).join('');

  // Delete listeners
  list.querySelectorAll('.txn-delete').forEach(btn => {
    btn.addEventListener('click', () => handleDeleteTransaction(btn.dataset.id));
  });
}

/** Sort helper */
function sortTransactions(txns, mode) {
  return [...txns].sort((a, b) => {
    if (mode === 'newest')  return new Date(b.date) - new Date(a.date);
    if (mode === 'oldest')  return new Date(a.date) - new Date(b.date);
    if (mode === 'highest') return b.amount - a.amount;
    if (mode === 'lowest')  return a.amount - b.amount;
    return 0;
  });
}

// ─── CATEGORY DROPDOWN ───────────────────────────────────

/**
 * Repopulate the category <select> based on selected type.
 * @param {'income'|'expense'} type
 */
function populateCategorySelect(type) {
  const sel = document.getElementById('txn-category');
  const cats = CATEGORIES[type] || [];
  sel.innerHTML = `<option value="">Select category…</option>` +
    cats.map(c => `<option value="${c.id}">${c.icon} ${c.label}</option>`).join('');
}

// ─── PROFILE UI ──────────────────────────────────────────

/** Update topbar username + avatar initial from saved profile. */
function renderProfile() {
  const { name } = getProfile();
  const displayName = name || 'User';
  document.getElementById('topbar-username').textContent = displayName;
  document.getElementById('user-avatar').textContent = displayName.charAt(0).toUpperCase();
}

// ─── THEME ───────────────────────────────────────────────

/** Apply the given theme to <html> and update the toggle button. */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('theme-icon').textContent  = theme === 'dark' ? '☀️' : '🌙';
  document.getElementById('theme-label').textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
}

// ─── DATE DEFAULT ────────────────────────────────────────

/** Pre-fill the date input with today's date. */
function setDefaultDate() {
  const dateInput = document.getElementById('txn-date');
  dateInput.value = new Date().toISOString().split('T')[0];
}

// ─── PAGE DATE ───────────────────────────────────────────

function renderPageDate() {
  document.getElementById('page-date').textContent =
    new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

// ─── CATEGORY SUMMARY (Analytics) ────────────────────────

function renderCategorySummary() {
  const txns    = getTransactions().filter(t => t.type === 'expense');
  const totals  = {};
  txns.forEach(t => { totals[t.category] = (totals[t.category] || 0) + t.amount; });

  const sorted  = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const max     = sorted[0]?.[1] || 1;
  const el      = document.getElementById('category-summary-list');

  if (!sorted.length) {
    el.innerHTML = `<div class="empty-state"><div class="empty-icon">📊</div>
      <div class="empty-title">No expense data yet</div></div>`;
    return;
  }

  el.innerHTML = sorted.map(([catId, amt]) => `
    <div class="cat-row">
      <span class="cat-emoji">${getCategoryIcon(catId)}</span>
      <span class="cat-name">${getCategoryLabel(catId)}</span>
      <div class="cat-bar-wrap">
        <div class="cat-bar" style="width:${Math.round((amt / max) * 100)}%"></div>
      </div>
      <span class="cat-amount">${formatCurrency(amt)}</span>
    </div>
  `).join('');
}

// ─── VALIDATION ──────────────────────────────────────────

/**
 * Validate the add-transaction form.
 * Returns true if valid, false if errors were shown.
 */
function validateForm(name, amount, category, date) {
  let valid = true;

  const setErr = (id, msg) => {
    const el = document.getElementById(id);
    el.textContent = msg;
    if (msg) {
      const input = el.previousElementSibling;
      if (input) input.classList.add('input-error');
    }
  };

  const clearErrors = () => {
    ['err-name','err-amount','err-category','err-date'].forEach(id => {
      document.getElementById(id).textContent = '';
    });
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  };

  clearErrors();

  if (!name.trim()) { setErr('err-name', 'Transaction name is required.'); valid = false; }
  if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
    setErr('err-amount', 'Enter a valid positive amount.'); valid = false;
  }
  if (!category) { setErr('err-category', 'Please select a category.'); valid = false; }
  if (!date)     { setErr('err-date', 'Please pick a date.'); valid = false; }

  return valid;
}

// ─── UTIL ────────────────────────────────────────────────

/** Escape user input for safe innerHTML use. */
function escHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}
