/* ═══════════════════════════════════════════════════════════
   FinTrack Pro — app.js
   Main orchestration: init, event listeners, action handlers.
   Relies on storage.js, ui.js, chart.js being loaded first.
═══════════════════════════════════════════════════════════ */

// ─── GLOBAL STATE ────────────────────────────────────────

// Which transaction type is currently selected in the add-modal
let selectedType = 'income';

// ─── INITIALISATION ──────────────────────────────────────

/** Boot sequence: restore theme, profile, render UI, then remove loader. */
function init() {
  // 1. Restore theme
  const theme = getTheme();
  applyTheme(theme);

  // 2. Restore profile
  renderProfile();
  renderPageDate();

  // 3. Render initial dashboard
  renderStats();
  renderActivity();

  // 4. Charts (dashboard cashflow)
  renderCashflowChart();

  // 5. Trigger card animations after a brief delay
  setTimeout(triggerAnimations, 100);

  // 6. Register all event listeners
  registerListeners();

  // 7. Show loading screen → fade out
  const loader = document.getElementById('loading-screen');
  // Wait for the loader bar animation to finish (~1.8s)
  setTimeout(() => loader.classList.add('fade-out'), 1900);
}

// ─── EVENT LISTENERS ─────────────────────────────────────

function registerListeners() {
  /* ── Sidebar navigation ── */
  document.querySelectorAll('.nav-item, .view-all').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const section = link.dataset.section;
      if (section) {
        showSection(section);
        // On mobile: close sidebar after navigation
        closeSidebar();
        // Render section-specific content
        if (section === 'transactions') renderTransactions();
        if (section === 'analytics') {
          renderBarChart();
          renderDoughnutChart();
          renderCategorySummary();
        }
      }
    });
  });

  /* ── Mobile hamburger ── */
  document.getElementById('hamburger').addEventListener('click', openSidebar);
  document.getElementById('sidebar-close').addEventListener('click', closeSidebar);

  /* ── Theme toggle ── */
  document.getElementById('theme-toggle').addEventListener('click', handleThemeToggle);

  /* ── Add transaction button ── */
  document.getElementById('add-btn').addEventListener('click', () => {
    resetAddForm();
    setDefaultDate();
    populateCategorySelect(selectedType);
    openModal('add-modal');
  });

  /* ── Add modal close ── */
  document.getElementById('modal-close').addEventListener('click', () => closeModal('add-modal'));

  /* ── Close modal on overlay click ── */
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });

  /* ── Keyboard: Escape closes modals ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      ['add-modal','settings-modal','confirm-modal'].forEach(id => {
        if (!document.getElementById(id).hasAttribute('hidden')) closeModal(id);
      });
    }
  });

  /* ── Type toggle buttons (Income / Expense) ── */
  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedType = btn.dataset.type;
      document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      populateCategorySelect(selectedType);
    });
  });

  /* ── Transaction form submit ── */
  document.getElementById('transaction-form').addEventListener('submit', handleAddTransaction);

  /* ── Filter tabs ── */
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      filterState.type = tab.dataset.filter;
      renderTransactions();
    });
  });

  /* ── Search ── */
  document.getElementById('search-input').addEventListener('input', e => {
    filterState.search = e.target.value;
    renderTransactions();
  });

  /* ── Sort ── */
  document.getElementById('sort-select').addEventListener('change', e => {
    filterState.sort = e.target.value;
    renderTransactions();
  });

  /* ── Settings button ── */
  document.getElementById('settings-btn').addEventListener('click', () => {
    const { name, currency } = getProfile();
    document.getElementById('settings-name').value     = name;
    document.getElementById('settings-currency').value = currency;
    openModal('settings-modal');
    closeSidebar();
  });

  /* ── Settings: save ── */
  document.getElementById('save-settings-btn').addEventListener('click', handleSaveSettings);

  /* ── Settings: close ── */
  document.getElementById('settings-modal-close').addEventListener('click', () => closeModal('settings-modal'));

  /* ── Reset button (inside settings) ── */
  document.getElementById('reset-btn').addEventListener('click', () => {
    closeModal('settings-modal');
    openModal('confirm-modal');
  });

  /* ── Confirm reset: cancel ── */
  document.getElementById('confirm-cancel').addEventListener('click', () => closeModal('confirm-modal'));

  /* ── Confirm reset: ok ── */
  document.getElementById('confirm-ok').addEventListener('click', handleReset);

  /* ── Scroll animation ── */
  window.addEventListener('scroll', triggerAnimations, { passive: true });
}

// ─── ACTION HANDLERS ─────────────────────────────────────

/** Handle add-transaction form submission. */
function handleAddTransaction(e) {
  e.preventDefault();

  const name     = document.getElementById('txn-name').value;
  const amount   = document.getElementById('txn-amount').value;
  const category = document.getElementById('txn-category').value;
  const date     = document.getElementById('txn-date').value;

  if (!validateForm(name, amount, category, date)) return;

  const txn = {
    id:       generateId(),
    name:     name.trim(),
    amount:   parseFloat(amount),
    category,
    date,
    type:     selectedType,
    createdAt: Date.now(),
  };

  addTransaction(txn);

  // Refresh all UI
  refreshAll();

  closeModal('add-modal');
  showToast(`${selectedType === 'income' ? 'Income' : 'Expense'} added — ${formatCurrency(txn.amount)}`, 'success');
}

/** Delete a transaction by id, with UI refresh. */
function handleDeleteTransaction(id) {
  deleteTransaction(id);
  refreshAll();
  showToast('Transaction deleted.', 'warn');
}

/** Toggle light/dark theme. */
function handleThemeToggle() {
  const current = getTheme();
  const next    = current === 'dark' ? 'light' : 'dark';
  saveTheme(next);
  applyTheme(next);
  // Charts use theme-aware colors; re-render them
  updateAllCharts();
}

/** Save user profile settings. */
function handleSaveSettings() {
  const name     = document.getElementById('settings-name').value.trim() || 'User';
  const currency = document.getElementById('settings-currency').value;

  saveProfile({ name, currency });
  renderProfile();
  refreshAll(); // Re-format all currency values
  closeModal('settings-modal');
  showToast('Settings saved!', 'success');
}

/** Reset ALL data after confirmation. */
function handleReset() {
  resetAll();
  closeModal('confirm-modal');

  // Re-apply defaults
  applyTheme('light');
  renderProfile();
  refreshAll();

  showToast('All data has been reset.', 'warn');
}

// ─── GLOBAL REFRESH ──────────────────────────────────────

/**
 * Refresh every piece of data-driven UI in one call.
 * Called after any add/delete/settings change.
 */
function refreshAll() {
  renderStats();
  renderActivity();
  renderTransactions(); // only affects DOM if that section is visible
  renderCategorySummary();
  updateAllCharts();
}

// ─── MOBILE SIDEBAR ──────────────────────────────────────

function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  // Create overlay if missing
  if (!document.getElementById('sidebar-overlay-el')) {
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.id = 'sidebar-overlay-el';
    overlay.addEventListener('click', closeSidebar);
    document.body.appendChild(overlay);
  }
  setTimeout(() => {
    const ov = document.getElementById('sidebar-overlay-el');
    if (ov) ov.classList.add('active');
  }, 10);
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  const ov = document.getElementById('sidebar-overlay-el');
  if (ov) ov.classList.remove('active');
}

// ─── RESET FORM ──────────────────────────────────────────

/** Clear the add-transaction form back to its default state. */
function resetAddForm() {
  document.getElementById('transaction-form').reset();
  document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
  document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

  // Reset type to income
  selectedType = 'income';
  document.querySelectorAll('.type-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.type === 'income');
  });
}

// ─── KICK OFF ────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', init);
