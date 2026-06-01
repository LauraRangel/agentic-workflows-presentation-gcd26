// Slide 5 — ¿Y la seguridad?
// 2 columnas: items revelados por keypress | imagen security-architecture.png
// Cada reveal dispara un pulse de brillo sobre la imagen.

const ITEMS = [
  { n: '01', title: 'Tokens de solo lectura',  desc: 'el agente observa · no escribe directo' },
  { n: '02', title: 'Safe outputs',            desc: 'solo comentarios, labels y PRs validados' },
  { n: '03', title: 'Firewall de red',         desc: 'solo dominios que tú permites' },
  { n: '04', title: 'Detección de amenazas',   desc: 'monitoreo activo durante la ejecución' },
  { n: '05', title: 'Human in the loop',       desc: 'nada llega a producción sin tu aprobación', highlight: true },
];

let _state = null;

export default {
  render() {
    const items = ITEMS.map((it, i) => `
      <li class="sec5-item ${it.highlight ? 'sec5-item--hl' : ''}" id="sec5-item-${i}">
        <span class="sec5-badge ${it.highlight ? 'sec5-badge--hl' : ''}">${it.n}</span>
        <div class="sec5-item-text">
          <div class="sec5-item-title">${it.title}</div>
          <div class="sec5-item-desc">${it.desc}</div>
        </div>
      </li>
    `).join('');

    return `
      <div class="sec5-wrapper">

        <!-- Columna izquierda -->
        <div class="sec5-left">
          <div class="slide-label">// SEGURIDAD</div>

          <h2 class="sec5-title">
            ¿Y la<br>
            <span class="accent-pink">seguridad?</span>
          </h2>

          <p class="sec5-comment">// 5 capas entre el agente y tu código</p>

          <ul class="sec5-list">${items}</ul>

          <p class="sec5-closing" id="sec5-closing">
            // el agente observa todo · escribe solo lo que tú permites
          </p>
        </div>

        <!-- Columna derecha: imagen con overlay de pulse -->
        <div class="sec5-right">
          <div class="sec5-img-wrap">
            <img src="assets/security-architecture.png"
                 alt="Arquitectura de seguridad"
                 class="sec5-img" />
          </div>
        </div>

      </div>
    `;
  },

  setup(el) {
    _state = { shown: 0, pulseTimer: null };
    this._el = el;

    ITEMS.forEach((_, i) => {
      el.querySelector(`#sec5-item-${i}`)?.classList.remove('visible');
    });
    el.querySelector('#sec5-closing')?.classList.remove('visible');
    el.querySelector('#sec5-pulse')?.classList.remove('pulsing');
  },

  teardown(_el) {
    if (_state?.pulseTimer) clearTimeout(_state.pulseTimer);
    _state = null;
  },

  _pulse() {
    const pulse = this._el.querySelector('#sec5-pulse');
    if (!pulse) return;
    pulse.classList.remove('pulsing');
    void pulse.offsetWidth; // reinicia animación
    pulse.classList.add('pulsing');
    if (_state.pulseTimer) clearTimeout(_state.pulseTimer);
    _state.pulseTimer = setTimeout(() => pulse.classList.remove('pulsing'), 600);
  },

  handleInput() {
    if (!_state || !this._el) return false;
    const el = this._el;

    if (_state.shown < ITEMS.length) {
      el.querySelector(`#sec5-item-${_state.shown}`)?.classList.add('visible');
      _state.shown++;

      // Tras el último item, muestra la línea de cierre
      if (_state.shown === ITEMS.length) {
        el.querySelector('#sec5-closing')?.classList.add('visible');
      }
      return true;
    }

    return false; // avanza al slide 6
  }
};
