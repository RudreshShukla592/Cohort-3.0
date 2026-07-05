// confetti.js — lightweight, dependency-free confetti burst.
// Pure DOM + CSS animation, no canvas library needed.

const layer = document.getElementById('confettiLayer');
const COLORS = ['#7c9eff', '#b18cff', '#4ade80', '#fbbf24', '#f87171'];

export function fireConfetti() {
  const pieceCount = 60;

  for (let i = 0; i < pieceCount; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';

    const size = 6 + Math.random() * 6;
    const left = Math.random() * 100;
    const duration = 2.2 + Math.random() * 1.4;
    const delay = Math.random() * 0.3;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    Object.assign(piece.style, {
      left: `${left}vw`,
      width: `${size}px`,
      height: `${size * 0.4}px`,
      background: color,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    });

    layer.append(piece);
    // Clean up DOM after the animation finishes so nodes don't pile up.
    setTimeout(() => piece.remove(), (duration + delay) * 1000 + 100);
  }
}
