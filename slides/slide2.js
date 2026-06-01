// Slide 2 — ¿Qué son los Agentic Workflows?
// Reveal: 3 cards + 1 agentes strip = 4 keypresses antes de avanzar

const STEPS = 4; // 3 cards + 1 strip de agentes

let _state = null;

export default {
  render() {
    return `
      <div class="qs-wrapper">
        <div class="qs-content">

          <h2 class="qs-title">
            ¿Qué son los<br>
            <span class="accent-pink">Agentic</span>&nbsp;<span class="accent-cyan">Workflows?</span><span class="cursor"></span>
          </h2>

          <p class="qs-comment">
            <span class="qs-pipe-chr">├─</span>
            automatización con IA desde markdown, corriendo en GitHub Actions
          </p>

          <!-- 3 cards reveladas una por una -->
          <div class="qs-cards-row">

            <div class="qs-card qs-card--cyan" id="qs-card-0">
              <div class="qs-card-header">
                <span class="qs-card-pipe">┃</span>
                <span class="qs-card-icon">🔍</span>
                <span class="qs-card-title" style="color:var(--cyan);">Contexto</span>
              </div>
              <div class="qs-card-body">
                Lee tu repo, issues y PRs.<br>
                El agente entiende la situación completa.
              </div>
              <div class="qs-card-tag">read-only por defecto</div>
            </div>

            <div class="qs-connector" id="qs-pipe-0">
              <img src="assets/pipe.png" class="pipe-connector" alt="" />
            </div>

            <div class="qs-card qs-card--pink" id="qs-card-1">
              <div class="qs-card-header">
                <span class="qs-card-pipe" style="color:var(--pink);">┃</span>
                <span class="qs-card-icon">🧠</span>
                <span class="qs-card-title" style="color:var(--pink);">Decisión</span>
              </div>
              <div class="qs-card-body">
                Razonamiento real, no if/else.<br>
                Elige la acción correcta al contexto.
              </div>
              <div class="qs-card-tag" style="border-color:var(--pink);color:var(--pink);">lenguaje natural</div>
            </div>

            <div class="qs-connector" id="qs-pipe-1">
              <img src="assets/pipe.png" class="pipe-connector" alt="" />
            </div>

            <div class="qs-card qs-card--cyan" id="qs-card-2">
              <div class="qs-card-header">
                <span class="qs-card-pipe">┃</span>
                <span class="qs-card-icon">⚡</span>
                <span class="qs-card-title" style="color:var(--cyan);">Acción</span>
              </div>
              <div class="qs-card-body">
                Ejecuta en GitHub Actions.<br>
                Crea issues, comments y PRs.
              </div>
              <div class="qs-card-tag">safe-outputs</div>
            </div>

          </div>

          <!-- Agentes disponibles — aparece en el 4° keypress -->
          <div class="qs-agents" id="qs-agents">
            <span class="qs-agents-label">// agentes disponibles</span>
            <div class="qs-agents-list">
              <span class="qs-agent">⬡ Copilot CLI</span>
              <span class="qs-agent-sep">─┤├─</span>
              <span class="qs-agent">⬡ Claude by Anthropic</span>
              <span class="qs-agent-sep">─┤├─</span>
              <span class="qs-agent">⬡ Codex</span>
            </div>
          </div>

        </div>

        <!-- Mona bottom-right -->
        <div class="qs-mona">
          <img src="assets/mona-present.png" alt="Mona presentando" class="mona-slide" />
        </div>

      </div>
    `;
  },

  setup(el) {
    _state = { shown: 0 };
    this._el = el;
    [0, 1, 2].forEach(i => {
      el.querySelector(`#qs-card-${i}`)?.classList.remove('visible');
      el.querySelector(`#qs-pipe-${i}`)?.classList.remove('visible');
    });
    el.querySelector('#qs-agents')?.classList.remove('visible');
  },

  teardown(_el) {
    _state = null;
  },

  handleInput() {
    if (!_state || !this._el) return false;
    const el = this._el;

    if (_state.shown < 3) {
      el.querySelector(`#qs-card-${_state.shown}`)?.classList.add('visible');
      // pipe 0 aparece junto con card 1, pipe 1 junto con card 2
      if (_state.shown > 0) {
        el.querySelector(`#qs-pipe-${_state.shown - 1}`)?.classList.add('visible');
      }
      _state.shown++;
      return true;
    }

    if (_state.shown === 3) {
      el.querySelector('#qs-agents')?.classList.add('visible');
      _state.shown++;
      return true;
    }

    return false;
  }
};
