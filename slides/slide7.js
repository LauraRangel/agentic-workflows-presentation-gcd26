// Slide 7 — Demo: del ticket al PR
// Video con controles personalizados (play/pause, velocidad, sonido).
// La barra espaciadora controla play/pause cuando estás en este slide;
// las flechas siguen navegando entre slides.

let _state = null;

export default {
  render() {
    return `
      <div class="demo-wrapper">

        <div class="slide-label">// DEMO</div>

        <h2 class="demo-title">
          Ahora <span class="accent-pink">veamos</span> qué hace nuestro <span class="accent-cyan">Agentic Workflow</span>
        </h2>
        <p class="demo-subtitle">// del ticket al PR</p>

        <div class="demo-video-wrap">
          <video class="demo-video" id="demo-video" playsinline preload="metadata">
            <source src="assets/demo-flujo.webm" type="video/webm" />
            <source src="assets/flow-jira-ticket.mp4" type="video/mp4" />
          </video>
          <!-- Foto final: queda fija cuando el video termina -->
          <img src="assets/flujo-ticket-jira.jpeg"
               alt="Resultado del flujo: ticket → PR"
               class="demo-endcard" id="demo-endcard" />
        </div>

        <!-- Controles personalizados -->
        <div class="demo-controls">
          <button class="demo-btn demo-btn--play" id="demo-play" type="button" aria-label="Play/Pausa">
            <span id="demo-play-icon">▶</span>
          </button>
          <button class="demo-btn" id="demo-speed" type="button" aria-label="Velocidad">
            <span id="demo-speed-label">1x</span>
          </button>
          <button class="demo-btn" id="demo-mute" type="button" aria-label="Sonido">
            <span id="demo-mute-icon">🔊</span>
          </button>
        </div>

        <p class="demo-foot">// a continuación: demo en vivo · compartiendo pantalla</p>

      </div>
    `;
  },

  setup(el) {
    const video      = el.querySelector('#demo-video');
    const endcard    = el.querySelector('#demo-endcard');
    const playBtn    = el.querySelector('#demo-play');
    const playIcon   = el.querySelector('#demo-play-icon');
    const speedBtn   = el.querySelector('#demo-speed');
    const speedLabel = el.querySelector('#demo-speed-label');
    const muteBtn    = el.querySelector('#demo-mute');
    const muteIcon   = el.querySelector('#demo-mute-icon');

    _state = { video };

    if (!video) return;

    // Estado inicial: pausado en el primer frame, con sonido disponible
    video.pause();
    video.currentTime = 0;
    video.muted = false;
    video.playbackRate = 1.0;
    playIcon.textContent = '▶';
    speedLabel.textContent = '1x';
    muteIcon.textContent = '🔊';
    if (endcard) endcard.classList.remove('visible'); // foto oculta al inicio

    // Play / Pause — si el video terminó, reinicia desde el principio
    const togglePlay = (e) => {
      if (e) e.stopPropagation();
      if (video.ended || video.currentTime >= video.duration) {
        video.currentTime = 0;
        if (endcard) endcard.classList.remove('visible');
        video.play();
      } else if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    };
    playBtn.onclick = togglePlay;
    _state.togglePlay = togglePlay;

    video.onplay  = () => { playIcon.textContent = '⏸'; if (endcard) endcard.classList.remove('visible'); };
    video.onpause = () => { playIcon.textContent = '▶'; };

    // Al terminar: queda la foto fija (no hay loop) para hablar sobre el resultado
    video.onended = () => {
      playIcon.textContent = '▶';
      if (endcard) endcard.classList.add('visible');
    };

    // Velocidad: alterna 1x ↔ 0.5x
    speedBtn.onclick = (e) => {
      e.stopPropagation();
      video.playbackRate = video.playbackRate === 1.0 ? 0.5 : 1.0;
      speedLabel.textContent = video.playbackRate === 1.0 ? '1x' : '0.5x';
    };

    // Sonido: mute / unmute
    muteBtn.onclick = (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      muteIcon.textContent = video.muted ? '🔇' : '🔊';
    };

    // Click sobre el propio video también alterna play/pause
    video.onclick = togglePlay;
  },

  teardown(el) {
    const video = el.querySelector('#demo-video');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    _state = null;
  },

  // Solo la barra espaciadora controla play/pause (no avanza de slide).
  // La flecha derecha (source 'arrow') y el click avanzan al slide 8.
  handleInput(source) {
    if (source === 'space' && _state && _state.video && _state.togglePlay) {
      _state.togglePlay();
      return true; // consume el Space → no avanza
    }
    return false; // arrow / click / swipe → avanza
  }
};
