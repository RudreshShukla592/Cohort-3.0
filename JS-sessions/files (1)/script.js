'use strict';

/* =========================================================
   AURORA GLIDE — vanilla JS flappy bird engine
   Organized as: DOM refs -> state -> config -> utilities ->
   subsystems (bird, pipes, clouds, weather, fx, audio) ->
   game loop -> input -> screen flow -> boot
   ========================================================= */

/* ---------------- DOM references ---------------- */
const gameWorld       = document.getElementById('game-world');
const gameArea        = document.getElementById('gameArea');
const bird             = document.getElementById('bird');
const pipesLayer       = document.getElementById('pipesLayer');
const particlesLayer   = document.getElementById('particlesLayer');
const confettiLayer    = document.getElementById('confettiLayer');
const cloudsLayer      = document.getElementById('cloudsLayer');
const ground            = document.getElementById('ground');
const sunMoon           = document.getElementById('sunMoon');

const scoreValueEl     = document.getElementById('scoreValue');
const bestValueEl      = document.getElementById('bestValue');
const startBestEl      = document.getElementById('startBest');
const finalScoreEl     = document.getElementById('finalScore');
const finalBestEl      = document.getElementById('finalBest');
const newBestBadge     = document.getElementById('newBestBadge');
const achievementsRow  = document.getElementById('achievementsRow');
const comboBadge       = document.getElementById('comboBadge');
const comboValueEl     = document.getElementById('comboValue');

const startScreen      = document.getElementById('startScreen');
const pauseScreen      = document.getElementById('pauseScreen');
const gameOverScreen   = document.getElementById('gameOverScreen');
const achievementToast = document.getElementById('achievementToast');
const achievementToastText = document.getElementById('achievementToastText');

const startBtn   = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const resumeBtn  = document.getElementById('resumeBtn');
const pauseBtn   = document.getElementById('pauseBtn');
const soundBtn   = document.getElementById('soundBtn');

/* ---------------- Config ---------------- */
const CONFIG = {
  gravity: 1650,            // px/s^2
  jumpVelocity: -480,       // px/s
  maxFallSpeed: 720,        // px/s
  birdLeftRatio: 0.28,      // horizontal position, fraction of area width
  groundHeight: 90,
  basePipeSpeed: 190,       // px/s
  baseGapHeight: 190,
  minGapHeight: 128,
  baseSpawnDistance: 260,   // px between pipe pairs
  minSpawnDistance: 210,
  pipeWidth: 68,
  difficultyStep: 10,       // score interval that ramps difficulty
  achievementScores: [10, 25, 50],
  cloudCount: 6,
};

/* ---------------- Mutable game state ---------------- */
const state = {
  screen: 'start',       // start | playing | paused | gameover
  areaWidth: 0,
  areaHeight: 0,
  playableHeight: 0,

  birdX: 0,
  birdY: 0,
  birdVelocity: 0,
  birdWidth: 46,
  birdHeight: 36,

  pipes: [],              // { el, top, bottom, cap? , x, gapY, gapHeight, passed }
  distanceSinceLastPipe: 0,

  score: 0,
  best: 0,
  comboCount: 0,

  pipeSpeed: CONFIG.basePipeSpeed,
  gapHeight: CONFIG.baseGapHeight,
  spawnDistance: CONFIG.baseSpawnDistance,

  soundOn: true,
  lastTimestamp: 0,
  rafId: null,

  unlockedAchievements: new Set(),
  weatherPhase: -1,
};

/* ---------------- Utilities ---------------- */
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const randomRange = (min, max) => Math.random() * (max - min) + min;
const $create = (tag, className) => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  return el;
};

const loadBestScore = () => {
  const stored = localStorage.getItem('auroraGlideBest');
  return stored ? parseInt(stored, 10) || 0 : 0;
};
const saveBestScore = (value) => localStorage.setItem('auroraGlideBest', String(value));

const loadSoundPref = () => {
  const stored = localStorage.getItem('auroraGlideSound');
  return stored === null ? true : stored === 'true';
};
const saveSoundPref = (value) => localStorage.setItem('auroraGlideSound', String(value));

/* ---------------- Audio (WebAudio synth, no files needed) ---------------- */
let audioCtx = null;
const getAudioCtx = () => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  return audioCtx;
};

const playTone = (frequency, duration, type = 'sine', gainPeak = 0.18) => {
  if (!state.soundOn) return;
  try {
    const ctx = getAudioCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(gainPeak, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
  } catch (err) {
    /* audio not critical to gameplay — fail silently */
  }
};

const sfx = {
  jump: () => playTone(520, 0.12, 'triangle', 0.15),
  score: () => playTone(880, 0.15, 'sine', 0.2),
  hit: () => playTone(140, 0.35, 'sawtooth', 0.22),
  achievement: () => playTone(1040, 0.2, 'sine', 0.18),
};

/* ---------------- Layout ---------------- */
const measureArena = () => {
  const rect = gameArea.getBoundingClientRect();
  state.areaWidth = rect.width;
  state.areaHeight = rect.height;
  state.playableHeight = state.areaHeight - CONFIG.groundHeight;
  state.birdX = state.areaWidth * CONFIG.birdLeftRatio;
};

/* ---------------- Bird ---------------- */
const resetBird = () => {
  state.birdY = state.playableHeight / 2 - state.birdHeight / 2;
  state.birdVelocity = 0;
  bird.style.left = `${state.birdX}px`;
  renderBird();
};

const applyGravity = (dt) => {
  state.birdVelocity = clamp(state.birdVelocity + CONFIG.gravity * dt, -Infinity, CONFIG.maxFallSpeed);
  state.birdY += state.birdVelocity * dt;
};

const jump = () => {
  if (state.screen !== 'playing') return;
  state.birdVelocity = CONFIG.jumpVelocity;
  bird.classList.remove('idle');
  spawnFeathers();
  sfx.jump();
};

const updateBirdRotation = () => {
  const rotation = clamp(state.birdVelocity / 12, -30, 85);
  bird.style.transform = `translateY(${state.birdY}px) rotate(${rotation}deg)`;
};

const renderBird = () => {
  bird.style.transform = `translateY(${state.birdY}px) rotate(0deg)`;
};

/* ---------------- Pipes ---------------- */
const createPipe = () => {
  const gapHeight = state.gapHeight;
  const margin = 36;
  const maxGapY = Math.max(margin, state.playableHeight - margin - gapHeight);
  const gapY = clamp(randomRange(margin, maxGapY), margin, maxGapY);

  const pair = $create('div', 'pipe-pair entering');
  pair.style.width = `${CONFIG.pipeWidth}px`;

  const topPipe = $create('div', 'pipe pipe-top');
  topPipe.style.top = '0px';
  topPipe.style.height = `${gapY}px`;
  const topCap = $create('div', 'pipe-cap');
  topPipe.appendChild(topCap);

  const bottomPipe = $create('div', 'pipe pipe-bottom');
  const bottomTop = gapY + gapHeight;
  bottomPipe.style.top = `${bottomTop}px`;
  bottomPipe.style.height = `${state.playableHeight - bottomTop}px`;
  const bottomCap = $create('div', 'pipe-cap');
  bottomPipe.appendChild(bottomCap);

  pair.appendChild(topPipe);
  pair.appendChild(bottomPipe);
  pipesLayer.appendChild(pair);

  const pipeData = {
    el: pair,
    x: state.areaWidth + 4,
    gapY,
    gapHeight,
    passed: false,
  };
  pair.style.transform = `translateX(${pipeData.x}px)`;
  state.pipes.push(pipeData);
};

const spawnPipes = (dt) => {
  state.distanceSinceLastPipe += state.pipeSpeed * dt;
  const lastPipe = state.pipes[state.pipes.length - 1];
  const shouldSpawn = !lastPipe || state.distanceSinceLastPipe >= state.spawnDistance;
  if (shouldSpawn) {
    createPipe();
    state.distanceSinceLastPipe = 0;
  }
};

const movePipes = (dt) => {
  const travel = state.pipeSpeed * dt;
  state.pipes.forEach((pipe) => {
    pipe.x -= travel;
    pipe.el.style.transform = `translateX(${pipe.x}px)`;
  });
  removeOffscreenPipes();
};

const removeOffscreenPipes = () => {
  state.pipes = state.pipes.filter((pipe) => {
    const offscreen = pipe.x + CONFIG.pipeWidth < -10;
    if (offscreen) pipe.el.remove();
    return !offscreen;
  });
};

const clearAllPipes = () => {
  state.pipes.forEach((pipe) => pipe.el.remove());
  state.pipes = [];
  state.distanceSinceLastPipe = 0;
};

/* ---------------- Collision detection ---------------- */
const checkCollision = () => {
  const birdLeft = state.birdX;
  const birdRight = state.birdX + state.birdWidth;
  const birdTop = state.birdY;
  const birdBottom = state.birdY + state.birdHeight;

  if (birdBottom >= state.playableHeight) {
    state.birdY = state.playableHeight - state.birdHeight;
    return true;
  }
  if (birdTop <= 0) {
    state.birdY = 0;
    state.birdVelocity = 0;
  }

  return state.pipes.some((pipe) => {
    const pipeLeft = pipe.x;
    const pipeRight = pipe.x + CONFIG.pipeWidth;
    const overlapsX = birdRight > pipeLeft && birdLeft < pipeRight;
    if (!overlapsX) return false;

    const gapTop = pipe.gapY;
    const gapBottom = pipe.gapY + pipe.gapHeight;
    const hitsTopPipe = birdTop < gapTop;
    const hitsBottomPipe = birdBottom > gapBottom;
    return hitsTopPipe || hitsBottomPipe;
  });
};

/* ---------------- Scoring & difficulty ---------------- */
const updateScore = () => {
  state.pipes.forEach((pipe) => {
    if (!pipe.passed && pipe.x + CONFIG.pipeWidth < state.birdX) {
      pipe.passed = true;
      state.score += 1;
      state.comboCount += 1;
      scoreValueEl.textContent = state.score;
      bumpScoreDisplay();
      spawnScorePop(pipe.x + CONFIG.pipeWidth, state.birdY);
      sfx.score();
      handleDifficultyRamp();
      handleWeatherShift();
      handleComboBadge();
      checkAchievements();
    }
  });
};

const bumpScoreDisplay = () => {
  scoreValueEl.classList.remove('bump');
  // eslint-disable-next-line no-unused-expressions
  void scoreValueEl.offsetWidth; // restart animation
  scoreValueEl.classList.add('bump');
};

const handleDifficultyRamp = () => {
  if (state.score % CONFIG.difficultyStep !== 0) return;
  const level = state.score / CONFIG.difficultyStep;
  state.pipeSpeed = CONFIG.basePipeSpeed + level * 16;
  state.gapHeight = Math.max(CONFIG.minGapHeight, CONFIG.baseGapHeight - level * 8);
  state.spawnDistance = Math.max(CONFIG.minSpawnDistance, CONFIG.baseSpawnDistance - level * 6);
};

const handleComboBadge = () => {
  if (state.comboCount > 0 && state.comboCount % 3 === 0) {
    comboValueEl.textContent = state.comboCount;
    comboBadge.classList.remove('hidden');
    comboBadge.style.animation = 'none';
    // eslint-disable-next-line no-unused-expressions
    void comboBadge.offsetWidth;
    comboBadge.style.animation = '';
    clearTimeout(handleComboBadge.timer);
    handleComboBadge.timer = setTimeout(() => comboBadge.classList.add('hidden'), 1400);
  }
};

const checkAchievements = () => {
  CONFIG.achievementScores.forEach((milestone) => {
    if (state.score === milestone && !state.unlockedAchievements.has(milestone)) {
      state.unlockedAchievements.add(milestone);
      showAchievement(`${milestone} score badge unlocked!`);
    }
  });
};

/* ---------------- Weather / day-night cycle ---------------- */
const handleWeatherShift = () => {
  const phase = Math.floor(state.score / CONFIG.difficultyStep) % 3;
  if (phase === state.weatherPhase) return;
  state.weatherPhase = phase;
  const weathers = ['day', 'sunset', 'night'];
  gameWorld.dataset.weather = weathers[phase];
  sunMoon.style.top = phase === 2 ? '9%' : '12%';
};

const resetWeather = () => {
  state.weatherPhase = 0;
  gameWorld.dataset.weather = 'day';
  sunMoon.style.top = '12%';
};

/* ---------------- Particle / feedback effects ---------------- */
const spawnScorePop = (x, y) => {
  const pop = $create('div', 'score-pop');
  pop.textContent = '+1';
  pop.style.left = `${x}px`;
  pop.style.top = `${y}px`;
  particlesLayer.appendChild(pop);
  pop.addEventListener('animationend', () => pop.remove());
};

const spawnFeathers = () => {
  for (let i = 0; i < 3; i += 1) {
    const feather = $create('div', 'feather');
    feather.style.left = `${state.birdX + 10}px`;
    feather.style.top = `${state.birdY + state.birdHeight / 2}px`;
    feather.style.setProperty('--fx', `${randomRange(-24, -4)}px`);
    feather.style.animationDelay = `${i * 0.03}s`;
    particlesLayer.appendChild(feather);
    feather.addEventListener('animationend', () => feather.remove());
  }
};

const triggerScreenShake = () => {
  gameWorld.classList.remove('shake');
  // eslint-disable-next-line no-unused-expressions
  void gameWorld.offsetWidth;
  gameWorld.classList.add('shake');
};

const spawnConfetti = () => {
  const colors = ['#ff6b8b', '#ffd166', '#2ee6c5', '#8b7cf6', '#ffffff'];
  const pieceCount = 46;
  for (let i = 0; i < pieceCount; i += 1) {
    const piece = $create('div', 'confetti-piece');
    piece.style.left = `${randomRange(0, state.areaWidth)}px`;
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty('--fall', `${randomRange(500, 820)}px`);
    piece.style.setProperty('--spin', `${randomRange(200, 600)}deg`);
    piece.style.animationDelay = `${randomRange(0, 0.4)}s`;
    piece.style.borderRadius = i % 2 === 0 ? '50%' : '2px';
    confettiLayer.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
};

const showAchievement = (text) => {
  achievementToastText.textContent = text;
  achievementToast.classList.remove('hidden');
  achievementToast.style.animation = 'none';
  // eslint-disable-next-line no-unused-expressions
  void achievementToast.offsetWidth;
  achievementToast.style.animation = '';
  sfx.achievement();
  clearTimeout(showAchievement.timer);
  showAchievement.timer = setTimeout(() => achievementToast.classList.add('hidden'), 2600);
};

/* ---------------- Clouds (ambient parallax, independent of gameplay) ---------------- */
const clouds = [];

const buildCloudElement = (scale) => {
  const cloud = $create('div', 'cloud');
  const width = 70 * scale;
  const height = 26 * scale;
  cloud.style.width = `${width}px`;
  cloud.style.height = `${height}px`;
  cloud.style.setProperty('--w', `${width}px`);
  const bubble = document.createElement('style');
  cloud.style.boxShadow = `
    ${width * 0.35}px ${-height * 0.5}px 0 ${-height * 0.15}px rgba(255,255,255,0.55),
    ${width * 0.65}px ${-height * 0.25}px 0 ${-height * 0.3}px rgba(255,255,255,0.55)
  `;
  return cloud;
};

const initClouds = () => {
  cloudsLayer.innerHTML = '';
  clouds.length = 0;
  for (let i = 0; i < CONFIG.cloudCount; i += 1) {
    const scale = randomRange(0.6, 1.4);
    const el = buildCloudElement(scale);
    const cloudData = {
      el,
      x: randomRange(0, state.areaWidth || 480),
      y: randomRange(20, 220),
      speed: randomRange(8, 22) * (scale > 1 ? 0.7 : 1.2),
    };
    el.style.top = `${cloudData.y}px`;
    el.style.transform = `translateX(${cloudData.x}px)`;
    cloudsLayer.appendChild(el);
    clouds.push(cloudData);
  }
};

const moveClouds = (dt) => {
  clouds.forEach((cloud) => {
    cloud.x -= cloud.speed * dt;
    if (cloud.x < -100) {
      cloud.x = state.areaWidth + randomRange(20, 100);
      cloud.y = randomRange(20, 220);
      cloud.el.style.top = `${cloud.y}px`;
    }
    cloud.el.style.transform = `translateX(${cloud.x}px)`;
  });
};

/* ---------------- Game loop ---------------- */
const gameLoop = (timestamp) => {
  if (!state.lastTimestamp) state.lastTimestamp = timestamp;
  const dt = Math.min((timestamp - state.lastTimestamp) / 1000, 0.035);
  state.lastTimestamp = timestamp;

  moveClouds(dt);

  if (state.screen === 'playing') {
    applyGravity(dt);
    updateBirdRotation();
    spawnPipes(dt);
    movePipes(dt);
    updateScore();

    if (checkCollision()) {
      endGame();
    }
  }

  state.rafId = requestAnimationFrame(gameLoop);
};

const startLoop = () => {
  state.lastTimestamp = 0;
  if (state.rafId === null) {
    state.rafId = requestAnimationFrame(gameLoop);
  }
};

/* ---------------- Screen flow ---------------- */
const showScreen = (screenEl) => {
  [startScreen, pauseScreen, gameOverScreen].forEach((el) => el.classList.add('hidden'));
  if (screenEl) screenEl.classList.remove('hidden');
};

const resetGameState = () => {
  measureArena();
  clearAllPipes();
  resetBird();
  state.score = 0;
  state.comboCount = 0;
  state.pipeSpeed = CONFIG.basePipeSpeed;
  state.gapHeight = CONFIG.baseGapHeight;
  state.spawnDistance = CONFIG.baseSpawnDistance;
  state.unlockedAchievements.clear();
  scoreValueEl.textContent = '0';
  comboBadge.classList.add('hidden');
  resetWeather();
};

const startGame = () => {
  resetGameState();
  state.screen = 'playing';
  bird.classList.remove('idle');
  gameWorld.classList.remove('paused');
  showScreen(null);
  startLoop();
};

const pauseGame = () => {
  if (state.screen !== 'playing') return;
  state.screen = 'paused';
  gameWorld.classList.add('paused');
  showScreen(pauseScreen);
};

const resumeGame = () => {
  if (state.screen !== 'paused') return;
  state.screen = 'playing';
  state.lastTimestamp = 0;
  gameWorld.classList.remove('paused');
  showScreen(null);
};

const endGame = () => {
  state.screen = 'gameover';
  gameWorld.classList.add('paused');
  triggerScreenShake();
  sfx.hit();

  const isNewBest = state.score > state.best;
  if (isNewBest) {
    state.best = state.score;
    saveBestScore(state.best);
  }

  finalScoreEl.textContent = state.score;
  finalBestEl.textContent = state.best;
  bestValueEl.textContent = state.best;
  newBestBadge.classList.toggle('hidden', !isNewBest);

  achievementsRow.innerHTML = '';
  state.unlockedAchievements.forEach((milestone) => {
    const chip = $create('span', 'badge-chip');
    chip.textContent = `🏅 ${milestone}+`;
    achievementsRow.appendChild(chip);
  });

  if (isNewBest && state.score > 0) {
    spawnConfetti();
  }

  showScreen(gameOverScreen);
};

const restartGame = () => {
  startGame();
};

/* ---------------- Input handling ---------------- */
const handlePrimaryAction = () => {
  if (state.screen === 'start') {
    startGame();
  } else if (state.screen === 'playing') {
    jump();
  }
};

const onKeyDown = (event) => {
  if (event.code === 'Space' || event.code === 'ArrowUp') {
    event.preventDefault();
    handlePrimaryAction();
  } else if (event.code === 'KeyP') {
    togglePause();
  }
};

const togglePause = () => {
  if (state.screen === 'playing') pauseGame();
  else if (state.screen === 'paused') resumeGame();
};

const onAreaPointer = (event) => {
  if (event.target.closest('.hud') || event.target.closest('.overlay')) return;
  handlePrimaryAction();
};

const toggleSound = () => {
  state.soundOn = !state.soundOn;
  soundBtn.dataset.on = String(state.soundOn);
  saveSoundPref(state.soundOn);
  if (state.soundOn) playTone(660, 0.08, 'sine', 0.12);
};

/* ---------------- Resize handling ---------------- */
const handleResize = () => {
  const wasPlaying = state.screen === 'playing';
  measureArena();
  if (!wasPlaying) {
    state.birdY = state.playableHeight / 2 - state.birdHeight / 2;
    renderBird();
  }
};

/* ---------------- Boot ---------------- */
const bindEvents = () => {
  startBtn.addEventListener('click', startGame);
  restartBtn.addEventListener('click', restartGame);
  resumeBtn.addEventListener('click', resumeGame);
  pauseBtn.addEventListener('click', togglePause);
  soundBtn.addEventListener('click', toggleSound);

  document.addEventListener('keydown', onKeyDown);
  gameArea.addEventListener('mousedown', onAreaPointer);
  gameArea.addEventListener('touchstart', (event) => {
    event.preventDefault();
    onAreaPointer(event);
  }, { passive: false });

  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleResize);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.screen === 'playing') pauseGame();
  });
};

const init = () => {
  measureArena();
  state.best = loadBestScore();
  state.soundOn = loadSoundPref();
  soundBtn.dataset.on = String(state.soundOn);

  bestValueEl.textContent = state.best;
  startBestEl.textContent = state.best;

  resetBird();
  bird.classList.add('idle');
  initClouds();
  resetWeather();
  bindEvents();
  startLoop();
};

init();
