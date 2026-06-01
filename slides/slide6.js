// Slide 6 — Casos de uso (todo en un solo momento)
// Al entrar: pregunta + spoiler + comparativa 2 columnas con stagger.
// Un keypress avanza al slide 7.

const TRAD = [
  { title: 'Correr tests',       desc: 'rápido, determinístico' },
  { title: 'Build y deploy',     desc: 'predecible, auditable' },
  { title: 'Linting y formateo', desc: 'reglas fijas' },
  { title: 'Release automation', desc: 'sin contexto necesario' },
];

const AGENTIC = [
  { name: 'IssueOps',         desc: 'triage automático de issues' },
  { name: 'OrchestrationOps', desc: 'flujos complejos multi-paso' },
  { name: 'MonitorOps',       desc: 'monitoreo del estado del repo' },
  { name: 'ChatOps',          desc: 'comandos via comentarios' },
  { name: 'BatchOps',         desc: 'operaciones en lote' },
];

let _state = null;

export default {
  render() {
    const tradItems = TRAD.map((t, i) => `
      <li class="uc-row uc-row--trad" id="uc-trad-${i}" style="--d:${(i + 1) * 110}ms">
        <span class="uc-row-mark uc-row-mark--cyan">✓</span>
        <div class="uc-row-text">
          <span class="uc-row-title">${t.title}</span>
          <span class="uc-row-desc">${t.desc}</span>
        </div>
      </li>`).join('');

    const agenticItems = AGENTIC.map((a, i) => `
      <li class="uc-row uc-row--agentic" id="uc-ag-${i}" style="--d:${(i + 1) * 110}ms">
        <span class="uc-row-dot"></span>
        <div class="uc-row-text">
          <span class="uc-row-title uc-row-title--cyan">${a.name}</span>
          <span class="uc-row-desc">${a.desc}</span>
        </div>
      </li>`).join('');

    return `
      <div class="uc-wrapper">

        <div class="slide-label">// CASOS DE USO</div>

        <!-- Header: pregunta + spoiler -->
        <div class="uc-header">
          <h2 class="uc-m1-title">
            ¿Debo cambiar todo mi CI/CD <span class="accent-pink">por un flujo agéntico?</span>
          </h2>
          <p class="uc-m1-sub">// spoiler: NO. son capas, no rivales.</p>
        </div>

        <!-- Comparativa 2 columnas -->
        <div class="uc-compare">

          <div class="uc-col-block">
            <div class="uc-col-title">// github actions · para esto</div>
            <ul class="uc-rows">${tradItems}</ul>
          </div>

          <div class="uc-sep">
            <img src="assets/pipe-t.png" class="uc-sep-pipe" alt="" />
          </div>

          <div class="uc-col-block">
            <div class="uc-col-title uc-col-title--cyan">// agentic workflows · para esto</div>
            <ul class="uc-rows">${agenticItems}</ul>
          </div>

        </div>

        <p class="uc-closing" id="uc-closing">
          // el agente vive encima de tu pipeline — no lo reemplaza
        </p>

        <img src="assets/pipe-codo.png" class="uc-pipe-tr" alt="" />
        <img src="assets/pipe.png"      class="uc-pipe-bl" alt="" />

        <div class="uc-mona">
          <img src="assets/mona-move.png" alt="Mona" class="mona-slide" />
        </div>

      </div>
    `;
  },

  setup(el) {
    if (_state) _state.timers.forEach(clearTimeout);
    _state = { timers: [] };

    // Reset y re-trigger del stagger
    el.querySelectorAll('.uc-row').forEach(r => {
      r.classList.remove('visible');
      void r.offsetWidth;
      r.classList.add('visible');
    });

    const closing = el.querySelector('#uc-closing');
    if (closing) {
      closing.classList.remove('visible');
      const total = (Math.max(TRAD.length, AGENTIC.length) + 1) * 110 + 300;
      _state.timers.push(setTimeout(() => closing.classList.add('visible'), total));
    }
  },

  teardown(_el) {
    if (_state) _state.timers.forEach(clearTimeout);
    _state = null;
  },

  handleInput() {
    return false; // un keypress avanza al slide 7
  }
};
