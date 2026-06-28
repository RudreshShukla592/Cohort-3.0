/* ═══════════════════════════════════════════════════════════
   FinTrack Pro — chart.js
   Chart.js wrappers: cashflow line, bar, doughnut charts.
═══════════════════════════════════════════════════════════ */

// Hold chart instances so we can update (not recreate) them
let cashflowChart = null;
let barChart      = null;
let doughnutChart = null;

// ─── THEME-AWARE COLORS ──────────────────────────────────

function isDark() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

function getChartColors() {
  return {
    gridColor:  isDark() ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.06)',
    labelColor: isDark() ? '#8b949e' : '#64748b',
    bgCard:     isDark() ? '#161b22' : '#ffffff',
  };
}

// ─── CASHFLOW CHART (Dashboard line chart) ───────────────

/**
 * Build monthly income/expense totals for the last 6 months.
 * Returns { labels, incomeData, expenseData }
 */
function buildMonthlyData() {
  const txns = getTransactions();
  const months = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - i);
    months.push({
      key:   `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,'0')}`,
      label: d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
    });
  }

  const incomeData  = months.map(m =>
    txns.filter(t => t.type === 'income'  && t.date.startsWith(m.key))
        .reduce((s, t) => s + t.amount, 0)
  );
  const expenseData = months.map(m =>
    txns.filter(t => t.type === 'expense' && t.date.startsWith(m.key))
        .reduce((s, t) => s + t.amount, 0)
  );

  return { labels: months.map(m => m.label), incomeData, expenseData };
}

/** Create or update the cashflow chart on the Dashboard. */
function renderCashflowChart() {
  const ctx = document.getElementById('cashflow-chart');
  if (!ctx) return;

  const { labels, incomeData, expenseData } = buildMonthlyData();
  const { gridColor, labelColor } = getChartColors();

  const commonOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: true, labels: { color: labelColor, font: { family: 'Poppins', size: 12 } } } },
    scales: {
      x: { grid: { color: gridColor }, ticks: { color: labelColor, font: { family: 'Poppins', size: 11 } } },
      y: {
        grid: { color: gridColor },
        ticks: {
          color: labelColor, font: { family: 'Poppins', size: 11 },
          callback: v => formatCurrency(v),
        },
        beginAtZero: true,
      },
    },
  };

  if (cashflowChart) {
    // Update existing chart instead of destroying & recreating
    cashflowChart.data.labels = labels;
    cashflowChart.data.datasets[0].data = incomeData;
    cashflowChart.data.datasets[1].data = expenseData;
    cashflowChart.options.plugins.legend.labels.color = labelColor;
    cashflowChart.options.scales.x.grid.color  = gridColor;
    cashflowChart.options.scales.y.grid.color  = gridColor;
    cashflowChart.options.scales.x.ticks.color = labelColor;
    cashflowChart.options.scales.y.ticks.color = labelColor;
    cashflowChart.update('active');
    return;
  }

  cashflowChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Income',
          data:  incomeData,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16,185,129,.08)',
          borderWidth: 2.5,
          pointBackgroundColor: '#10b981',
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Expenses',
          data:  expenseData,
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239,68,68,.07)',
          borderWidth: 2.5,
          pointBackgroundColor: '#ef4444',
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: commonOptions,
  });
}

// ─── BAR CHART (Analytics page) ──────────────────────────

function renderBarChart() {
  const ctx = document.getElementById('bar-chart');
  if (!ctx) return;

  const { labels, incomeData, expenseData } = buildMonthlyData();
  const { gridColor, labelColor } = getChartColors();

  if (barChart) {
    barChart.data.labels = labels;
    barChart.data.datasets[0].data = incomeData;
    barChart.data.datasets[1].data = expenseData;
    barChart.update('active');
    return;
  }

  barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Income',   data: incomeData,  backgroundColor: 'rgba(16,185,129,.75)',  borderRadius: 6 },
        { label: 'Expenses', data: expenseData, backgroundColor: 'rgba(239,68,68,.7)',   borderRadius: 6 },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: labelColor, font: { family: 'Poppins', size: 12 } } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: labelColor, font: { family: 'Poppins' } } },
        y: {
          grid: { color: gridColor },
          ticks: { color: labelColor, callback: v => formatCurrency(v), font: { family: 'Poppins', size: 11 } },
          beginAtZero: true,
        },
      },
    },
  });
}

// ─── DOUGHNUT CHART (Analytics – expense breakdown) ──────

function renderDoughnutChart() {
  const ctx = document.getElementById('doughnut-chart');
  if (!ctx) return;

  const txns   = getTransactions().filter(t => t.type === 'expense');
  const totals = {};
  txns.forEach(t => { totals[t.category] = (totals[t.category] || 0) + t.amount; });

  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const labels  = entries.map(([id]) => getCategoryLabel(id));
  const data    = entries.map(([, v]) => v);

  const PALETTE = [
    '#10b981','#3b82f6','#f59e0b','#ef4444',
    '#8b5cf6','#06b6d4','#f97316','#84cc16',
    '#ec4899','#6366f1',
  ];

  const { labelColor } = getChartColors();

  if (doughnutChart) {
    doughnutChart.data.labels   = labels;
    doughnutChart.data.datasets[0].data = data;
    doughnutChart.update('active');
    return;
  }

  doughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: PALETTE,
        borderWidth: 2,
        borderColor: isDark() ? '#161b22' : '#fff',
        hoverOffset: 10,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: labelColor, font: { family: 'Poppins', size: 11 }, padding: 14, boxWidth: 12 },
        },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.label}: ${formatCurrency(ctx.parsed)}`,
          },
        },
      },
    },
  });
}

// ─── UPDATE ALL CHARTS ───────────────────────────────────

/** Call this after any data change to refresh all charts. */
function updateAllCharts() {
  renderCashflowChart();
  renderBarChart();
  renderDoughnutChart();
}
