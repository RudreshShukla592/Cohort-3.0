// goals.js — Daily Goals feature. Same list/storage pattern as todo.js,
// plus a progress bar and a confetti celebration at 100% completion.

import { showToast } from './toast.js';
import { fireConfetti } from './confetti.js';

const STORAGE_KEY = 'dailyGoals';

let goals = [];
let hasCelebrated = false; // avoid re-firing confetti on every re-render

export function initGoals() {
  const form = document.getElementById('goalsForm');
  const input = document.getElementById('goalsInput');
  const list = document.getElementById('goalsList');
  const emptyState = document.getElementById('goalsEmpty');
  const progressFill = document.getElementById('goalsProgressFill');
  const progressText = document.getElementById('goalsProgressText');

  goals = loadGoals();
  // If it's a new day, start fresh so "daily" goals don't pile up forever.
  goals = pruneStaleGoals(goals);
  render();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    addGoal(input.value);
    input.value = '';
    input.focus();
  });

  list.addEventListener('click', (event) => {
    const btn = event.target.closest('button');
    if (!btn) return;
    const item = event.target.closest('.list-item');
    const id = item.dataset.id;

    if (btn.classList.contains('complete-btn')) toggleGoal(id);
    if (btn.classList.contains('delete-btn')) deleteGoal(id);
  });

  function addGoal(text) {
    const trimmed = text.trim();
    if (!trimmed) {
      showToast('Type a goal before adding it.', 'error');
      return;
    }
    goals.push({ id: crypto.randomUUID(), text: trimmed, completed: false, date: todayKey() });
    save();
    render();
  }

  function toggleGoal(id) {
    goals = goals.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g));
    save();
    render();
  }

  function deleteGoal(id) {
    goals = goals.filter((g) => g.id !== id);
    save();
    render();
  }

  function render() {
    list.innerHTML = '';
    goals.forEach((goal) => list.append(buildGoalElement(goal)));

    emptyState.hidden = goals.length > 0;
    updateProgress();
  }

  function buildGoalElement(goal) {
    const li = document.createElement('li');
    li.className = `list-item${goal.completed ? ' completed' : ''}`;
    li.dataset.id = goal.id;

    li.innerHTML = `
      <button class="item-check complete-btn" aria-label="Toggle goal complete">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>
      </button>
      <span class="item-text"></span>
      <div class="item-actions">
        <button class="delete-btn" aria-label="Delete goal">✕</button>
      </div>
    `;
    li.querySelector('.item-text').textContent = goal.text;
    return li;
  }

  function updateProgress() {
    const total = goals.length;
    const done = goals.filter((g) => g.completed).length;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);

    progressFill.style.width = `${percent}%`;
    progressText.textContent = `${done} of ${total} completed`;

    if (total > 0 && done === total && !hasCelebrated) {
      hasCelebrated = true;
      fireConfetti();
      showToast('All goals completed today! 🎉', 'success');
    }
    if (done < total) hasCelebrated = false; // reset so re-completing celebrates again
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }
}

function todayKey() {
  return new Date().toISOString().slice(0, 10); // "2026-07-05"
}

/** Goals from a previous day are cleared so "daily" stays meaningful. */
function pruneStaleGoals(list) {
  const today = todayKey();
  const fresh = list.filter((g) => g.date === today || !g.date);
  return fresh;
}

function loadGoals() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
