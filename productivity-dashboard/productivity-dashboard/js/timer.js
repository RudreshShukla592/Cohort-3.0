// timer.js — Pomodoro Timer feature.

import { showToast } from './toast.js';

const RING_CIRCUMFERENCE = 2 * Math.PI * 100; // r=100, matches the SVG circle

const SESSION_LABELS = {
  work: 'Work Session',
  short: 'Short Break',
  long: 'Long Break',
};

let intervalId = null;      // guarded so we never run two ticking intervals
let totalSeconds = 25 * 60; // seconds for the currently selected mode
let remainingSeconds = totalSeconds;
let currentMode = 'work';
let isRunning = false;

export function initTimer() {
  const display = document.getElementById('timerDisplay');
  const ring = document.getElementById('ringProgress');
  const sessionLabel = document.getElementById('timerSessionLabel');
  const startBtn = document.getElementById('timerStart');
  const pauseBtn = document.getElementById('timerPause');
  const resetBtn = document.getElementById('timerReset');
  const modeButtons = document.querySelectorAll('.mode-btn');

  ring.style.strokeDasharray = String(RING_CIRCUMFERENCE);
  updateDisplay(display, ring);

  startBtn.addEventListener('click', () => start(display, ring, startBtn, pauseBtn));
  pauseBtn.addEventListener('click', () => pause(startBtn, pauseBtn));
  resetBtn.addEventListener('click', () => reset(display, ring, startBtn, pauseBtn));

  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (isRunning) return; // don't let mode-switch fight a running timer
      modeButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      currentMode = btn.dataset.mode;
      totalSeconds = Number(btn.dataset.minutes) * 60;
      remainingSeconds = totalSeconds;
      sessionLabel.textContent = SESSION_LABELS[currentMode];
      updateDisplay(display, ring);
    });
  });

  function start(display, ring, startBtn, pauseBtn) {
    if (isRunning) return;
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;

    // Always clear any previous interval before starting a new one —
    // this is the #1 Pomodoro bug (timer running 2x, 3x speed).
    clearInterval(intervalId);

    intervalId = setInterval(() => {
      remainingSeconds--;
      updateDisplay(display, ring);

      if (remainingSeconds <= 0) {
        clearInterval(intervalId);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        notifySessionEnd();
      }
    }, 1000);
  }

  function pause(startBtn, pauseBtn) {
    clearInterval(intervalId);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }

  function reset(display, ring, startBtn, pauseBtn) {
    clearInterval(intervalId);
    isRunning = false;
    remainingSeconds = totalSeconds;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    updateDisplay(display, ring);
  }
}

function updateDisplay(display, ring) {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const fraction = remainingSeconds / totalSeconds;
  ring.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - fraction));
}

function notifySessionEnd() {
  showToast(`${SESSION_LABELS[currentMode]} complete!`, 'success');
  playBeep();
  if (document.title) {
    const original = document.title;
    document.title = '⏰ Time is up! — Aura';
    setTimeout(() => (document.title = original), 4000);
  }
}

/** Simple two-tone beep using the Web Audio API — no audio file needed. */
function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.frequency.value = 880;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.35);
  } catch {
    // Audio not available — silently ignore, toast still shows.
  }
}
