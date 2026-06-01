// Slide 4 — Cómo funciona (diagrama aw-flow.png)
const CLOUDS = [
  { top: '13%', left: '75%', w: '40%' },
  { top: '40%', left: '74%', w: '40%' },
  { top: '70%', left: '25%', w: '30%' },
  { top: '75%', left: '40%', w: '30%' },
];

export default {
  render() {
    const clouds = CLOUDS.map(c => `
      <div class="flow-cloud" style="top:${c.top};left:${c.left};width:${c.w};"></div>
    `).join('');

    return `
      <div class="s4-wrapper">

        <div class="slide-label">// CÓMO FUNCIONA</div>

        <h2 class="s4-title">
          ¿Cómo <span class="accent-pink">funciona</span>
          <span class="accent-cyan">por dentro?</span>
        </h2>

        <!-- Requisitos estilo terminal (overlay, no afecta la imagen) -->
        <div class="s4-reqs-term">
          <div class="s4-reqs-term-bar">
            <span class="term-dot term-dot--pink"></span>
            <span class="term-dot term-dot--cyan"></span>
            <span class="term-dot"></span>
            <span class="s4-reqs-term-title">requisitos.sh</span>
          </div>
          <div class="s4-reqs-term-body">
            <div class="s4-req-line"><span class="term-prompt">$</span> GitHub CLI <span class="accent-cyan">v2.0+</span></div>
            <div class="s4-req-line"><span class="term-prompt">$</span> GitHub Actions <span class="accent-cyan">activo</span></div>
            <div class="s4-req-line"><span class="term-prompt">$</span> Cuenta de IA <span class="accent-pink">(Copilot / Claude / Codex)</span></div>
            <div class="s4-req-line"><span class="term-prompt">$</span> Repo con acceso de <span class="accent-cyan">escritura</span></div>
          </div>
        </div>

        <div class="s4-right">
          <div class="flow-frame">
            ${clouds}
            <img src="assets/aw-flow.png"
                 alt="Agentic Workflows — cómo funciona"
                 class="flow-img"
                 id="flow-img" />
          </div>
        </div>

        <div class="s4-mona">
          <img src="assets/mona-present.png" alt="Mona" class="mona-slide" style="width:80px;" />
        </div>

      </div>
    `;
  },

  setup(el) {
    const img = el.querySelector('#flow-img');
    if (img) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => img.classList.add('flow-img--visible'))
      );
    }
  },

  teardown(el) {
    const img = el.querySelector('#flow-img');
    if (img) img.classList.remove('flow-img--visible');
  },

  handleInput() { return false; }
};
