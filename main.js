import slide1 from './slides/slide1.js';
import slide2 from './slides/slide2.js';
import slide3 from './slides/slide3.js';
import slide4 from './slides/slide4.js';
import slide5 from './slides/slide5.js';
import slide6 from './slides/slide6.js';
import slide7 from './slides/slide7.js';
import slide8 from './slides/slide8.js';

const MODS  = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
const TOTAL = MODS.length;
const DISPLAY_TOTAL = TOTAL; // ahora hay 8 slides reales
const ANIM  = 380; // ms

// ─── Decorative pipe background (injected into every slide) ──
const PIPES_SVG = `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice"
  xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"
  style="position:absolute;inset:0;width:100%;height:100%;opacity:0.22;pointer-events:none;z-index:0;">

  <!-- Tubos horizontales cyan -->
  <rect x="0"   y="40"  width="320" height="1" fill="#1a3a6a"/>
  <rect x="0"   y="41"  width="320" height="2" fill="#2050a0"/>
  <rect x="0"   y="43"  width="320" height="1" fill="#00e5ff"/>
  <rect x="0"   y="44"  width="320" height="1" fill="#1a3a6a"/>

  <rect x="0"   y="110" width="240" height="1" fill="#1a3a6a"/>
  <rect x="0"   y="111" width="240" height="2" fill="#2050a0"/>
  <rect x="0"   y="113" width="240" height="1" fill="#00e5ff"/>
  <rect x="0"   y="114" width="240" height="1" fill="#1a3a6a"/>

  <rect x="170" y="148" width="150" height="1" fill="#1a3a6a"/>
  <rect x="170" y="149" width="150" height="2" fill="#2050a0"/>
  <rect x="170" y="151" width="150" height="1" fill="#00e5ff"/>
  <rect x="170" y="152" width="150" height="1" fill="#1a3a6a"/>

  <!-- Tubos verticales pink/purple -->
  <rect x="50"  y="0"   width="1" height="40"  fill="#3a1a4a"/>
  <rect x="51"  y="0"   width="2" height="40"  fill="#702070"/>
  <rect x="53"  y="0"   width="1" height="40"  fill="#ff2d78"/>
  <rect x="54"  y="0"   width="1" height="40"  fill="#3a1a4a"/>
  <rect x="50"  y="44"  width="1" height="66"  fill="#3a1a4a"/>
  <rect x="51"  y="44"  width="2" height="66"  fill="#702070"/>
  <rect x="53"  y="44"  width="1" height="66"  fill="#ff2d78"/>
  <rect x="54"  y="44"  width="1" height="66"  fill="#3a1a4a"/>

  <rect x="130" y="44"  width="1" height="66"  fill="#3a1a4a"/>
  <rect x="131" y="44"  width="2" height="66"  fill="#702070"/>
  <rect x="133" y="44"  width="1" height="66"  fill="#ff2d78"/>
  <rect x="134" y="44"  width="1" height="66"  fill="#3a1a4a"/>

  <rect x="210" y="0"   width="1" height="40"  fill="#3a1a4a"/>
  <rect x="211" y="0"   width="2" height="40"  fill="#702070"/>
  <rect x="213" y="0"   width="1" height="40"  fill="#ff2d78"/>
  <rect x="214" y="0"   width="1" height="40"  fill="#3a1a4a"/>

  <rect x="270" y="44"  width="1" height="104" fill="#3a1a4a"/>
  <rect x="271" y="44"  width="2" height="104" fill="#702070"/>
  <rect x="273" y="44"  width="1" height="104" fill="#ff2d78"/>
  <rect x="274" y="44"  width="1" height="104" fill="#3a1a4a"/>

  <rect x="90"  y="114" width="1" height="66"  fill="#3a1a4a"/>
  <rect x="91"  y="114" width="2" height="66"  fill="#702070"/>
  <rect x="93"  y="114" width="1" height="66"  fill="#ff2d78"/>
  <rect x="94"  y="114" width="1" height="66"  fill="#3a1a4a"/>

  <!-- Nodos / conectores cyan -->
  <rect x="46"  y="36"  width="12" height="12" fill="#0a1a3a"/>
  <rect x="48"  y="38"  width="8"  height="8"  fill="#2050a0"/>
  <rect x="50"  y="40"  width="4"  height="4"  fill="#00e5ff"/>

  <rect x="206" y="36"  width="12" height="12" fill="#0a1a3a"/>
  <rect x="208" y="38"  width="8"  height="8"  fill="#2050a0"/>
  <rect x="210" y="40"  width="4"  height="4"  fill="#00e5ff"/>

  <rect x="266" y="144" width="12" height="12" fill="#0a1a3a"/>
  <rect x="268" y="146" width="8"  height="8"  fill="#2050a0"/>
  <rect x="270" y="148" width="4"  height="4"  fill="#00e5ff"/>

  <rect x="86"  y="106" width="12" height="12" fill="#0a1a3a"/>
  <rect x="88"  y="108" width="8"  height="8"  fill="#2050a0"/>
  <rect x="90"  y="110" width="4"  height="4"  fill="#00e5ff"/>

  <!-- Nodos / conectores pink -->
  <rect x="126" y="106" width="12" height="12" fill="#2a0a3a"/>
  <rect x="128" y="108" width="8"  height="8"  fill="#702070"/>
  <rect x="130" y="110" width="4"  height="4"  fill="#ff2d78"/>

  <rect x="166" y="144" width="12" height="12" fill="#2a0a3a"/>
  <rect x="168" y="146" width="8"  height="8"  fill="#702070"/>
  <rect x="170" y="148" width="4"  height="4"  fill="#ff2d78"/>
</svg>`;

const container  = document.getElementById('slides-container');
const progressEl = document.getElementById('progress');

let currentIdx     = 0;
let isTransitioning = false;

// Pre-render all slides into DOM
const slideEls = MODS.map((mod, i) => {
  const el = document.createElement('div');
  el.className = 'slide';
  // Pipes background first, then slide content on top
  el.innerHTML = PIPES_SVG + mod.render();
  container.appendChild(el);
  el.style.transform = i === 0 ? 'translateX(0)' : 'translateX(100%)';
  return el;
});

// Init first slide
MODS[0].setup && MODS[0].setup(slideEls[0]);
updateProgress();

function updateProgress() {
  const n = String(currentIdx + 1).padStart(2, '0');
  const t = String(DISPLAY_TOTAL).padStart(2, '0');
  progressEl.textContent = `[${n}/${t}]`;
}

function navigate(dir, source) {
  if (isTransitioning) return;

  // Let current slide consume the input first (typewriter, card reveals…)
  // `source` indica el origen: 'space' | 'arrow' | 'click' | 'swipe'
  if (dir > 0) {
    const mod = MODS[currentIdx];
    if (mod.handleInput && mod.handleInput(source)) return;
  }

  const newIdx = currentIdx + dir;
  if (newIdx < 0 || newIdx >= TOTAL) return;

  const oldIdx = currentIdx;
  const oldEl  = slideEls[oldIdx];
  const newEl  = slideEls[newIdx];

  isTransitioning = true;
  currentIdx = newIdx;
  updateProgress();

  // Snap new slide to off-screen position (no transition)
  newEl.style.transition = 'none';
  newEl.style.transform  = dir > 0 ? 'translateX(100%)' : 'translateX(-100%)';
  void newEl.offsetWidth; // force reflow

  // Animate both slides simultaneously
  const ease = `transform ${ANIM}ms cubic-bezier(0.4, 0, 0.2, 1)`;
  oldEl.style.transition = ease;
  newEl.style.transition = ease;
  oldEl.style.transform  = dir > 0 ? 'translateX(-100%)' : 'translateX(100%)';
  newEl.style.transform  = 'translateX(0)';

  // Setup new slide as it enters the viewport
  MODS[newIdx].setup && MODS[newIdx].setup(newEl);

  setTimeout(() => {
    MODS[oldIdx].teardown && MODS[oldIdx].teardown(oldEl);
    isTransitioning = false;
  }, ANIM);
}

// ─── Fullscreen ──────────────────────────────────────
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen({ navigationUI: 'hide' }).catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

document.getElementById('fs-btn').addEventListener('click', (e) => {
  e.stopPropagation();
  toggleFullscreen();
});

// Oculta el botón cuando ya está en fullscreen
document.addEventListener('fullscreenchange', () => {
  const btn = document.getElementById('fs-btn');
  if (btn) btn.style.opacity = document.fullscreenElement ? '0' : '1';
});

// ─── Input events ────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    e.preventDefault();
    navigate(1, 'arrow');
  } else if (e.key === ' ') {
    e.preventDefault();
    navigate(1, 'space');
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    navigate(-1, 'arrow');
  } else if (e.key === 'f' || e.key === 'F') {
    toggleFullscreen();
  }
});

// Click advances — but not on interactive elements
document.addEventListener('click', (e) => {
  if (e.target.closest('button') || e.target.closest('a')) return;
  navigate(1, 'click');
});

// Touch swipe
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1, 'swipe');
}, { passive: true });
