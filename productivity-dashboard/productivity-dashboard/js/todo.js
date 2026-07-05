// todo.js — Todo List feature.
// Data (array of task objects) is the single source of truth.
// The DOM is just a rendering of that data — every change re-renders
// from the array, then saves the array to Local Storage.

import { showToast } from './toast.js';

const STORAGE_KEY = 'todos';

let tasks = []; // module-scoped state, not a global

export function initTodo() {
  const form = document.getElementById('todoForm');
  const input = document.getElementById('todoInput');
  const list = document.getElementById('todoList');
  const emptyState = document.getElementById('todoEmpty');
  const countLabel = document.getElementById('todoCount');

  loadTasks();
  render();

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // stop page reload
    addTask(input.value);
    input.value = '';
    input.focus();
  });

  // Event delegation: one listener on the list handles clicks on
  // any task's complete/important/delete button, even future ones.
  list.addEventListener('click', (event) => {
    const btn = event.target.closest('button');
    if (!btn) return;
    const item = event.target.closest('.list-item');
    const id = item.dataset.id;

    if (btn.classList.contains('complete-btn')) toggleComplete(id);
    if (btn.classList.contains('important-btn')) toggleImportant(id);
    if (btn.classList.contains('delete-btn')) deleteTask(id);
  });

  function addTask(text) {
    const trimmed = text.trim();
    if (!trimmed) {
      showToast('Type a task before adding it.', 'error');
      return;
    }
    tasks.push({
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
      important: false,
      createdAt: Date.now(),
    });
    save();
    render();
  }

  function toggleComplete(id) {
    tasks = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    save();
    render();
  }

  function toggleImportant(id) {
    tasks = tasks.map((t) => (t.id === id ? { ...t, important: !t.important } : t));
    save();
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    save();
    render();
  }

  function render() {
    list.innerHTML = ''; // clear before re-render

    // Important + incomplete tasks float to the top for visibility.
    const sorted = [...tasks].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return b.important - a.important;
    });

    sorted.forEach((task) => list.append(buildTaskElement(task)));

    emptyState.hidden = tasks.length > 0;
    countLabel.textContent = `${tasks.length} task${tasks.length === 1 ? '' : 's'}`;
  }

  function buildTaskElement(task) {
    const li = document.createElement('li');
    li.className = `list-item${task.completed ? ' completed' : ''}${task.important ? ' important' : ''}`;
    li.dataset.id = task.id;

    li.innerHTML = `
      <button class="item-check complete-btn" aria-label="Toggle complete">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>
      </button>
      <span class="item-text"></span>
      <div class="item-actions">
        <button class="important-btn${task.important ? ' active-important' : ''}" aria-label="Mark important">★</button>
        <button class="delete-btn" aria-label="Delete task">✕</button>
      </div>
    `;

    // Set text via textContent (not innerHTML) to avoid any injection risk.
    li.querySelector('.item-text').textContent = task.text;
    return li;
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function loadTasks() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      tasks = JSON.parse(raw);
    } catch {
      tasks = []; // corrupted data shouldn't crash the app
    }
  }
}
