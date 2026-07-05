// navigation.js — Dashboard <-> Feature view navigation.
// Single reusable click handler (event delegation) instead of one
// listener per card. Keeps track of the active panel so only one
// feature is ever visible at a time.

const FEATURE_NAMES = ['todo', 'planner', 'goals', 'timer', 'quote', 'weather'];

export function initNavigation() {
  const dashboard = document.getElementById('dashboardView');
  const featureView = document.getElementById('featureView');
  const backBtn = document.getElementById('backBtn');
  const cardGrid = document.querySelector('.card-grid');
  const panels = document.querySelectorAll('.feature-panel');

  let activeFeature = null;
  let isAnimating = false; // guards against double-click-quickly bugs

  cardGrid.addEventListener('click', (event) => {
    const card = event.target.closest('.feature-card');
    if (!card || isAnimating) return;
    openFeature(card.dataset.feature);
  });

  backBtn.addEventListener('click', closeFeature);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !featureView.hidden) closeFeature();
  });

  function openFeature(name) {
    if (!FEATURE_NAMES.includes(name)) return;
    if (activeFeature === name && !featureView.hidden) return; // already open

    isAnimating = true;
    activeFeature = name;

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== name; // show only the matching one
    });

    dashboard.hidden = true;
    featureView.hidden = false;
    featureView.classList.add('feature-enter');

    // Let other modules react (e.g. weather/quote fetch on first open)
    document.dispatchEvent(new CustomEvent('feature:opened', { detail: { name } }));

    setTimeout(() => {
      featureView.classList.remove('feature-enter');
      isAnimating = false;
    }, 350);
  }

  function closeFeature() {
    featureView.hidden = true;
    dashboard.hidden = false;
    activeFeature = null;
  }

  // Exposed for keyboard shortcuts (main.js)
  return { openFeature, closeFeature };
}
