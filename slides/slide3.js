// Slide 3 — Traditional vs Agentic
// Título dramático siempre visible → keypress revela tabla con stagger

const ROWS = [
  { img: 'assets/code.png',        color: 'pink', feature: 'Lenguaje',      traditional: 'YAML con pasos explícitos',        agentic: 'Markdown en lenguaje natural' },
  { img: 'assets/complejidad.png', color: 'cyan', feature: 'Complejidad',    traditional: 'Requiere expertise en YAML y API',  agentic: 'Describes la intención' },
  { img: 'assets/decisions.png',   color: 'pink', feature: 'Decisiones',     traditional: 'Lógica fija if/then',              agentic: 'Decisiones contextuales con IA' },
  { img: 'assets/herramientas.png',color: 'cyan', feature: 'Herramientas',   traditional: 'Selección manual de actions',      agentic: 'Descubrimiento automático via MCP' },
];

let _state = null;

export default {
  render() {
    const rows = ROWS.map((r, i) => `
      <tr class="vs-row ${i % 2 === 1 ? 'vs-row--alt' : ''}" id="vs-row-${i}">
        <td class="vs-icon-cell">
          <div class="vs-icon vs-icon--${r.color}">
            <img src="${r.img}" alt="" class="vs-icon-img" />
          </div>
        </td>
        <td class="vs-feat">${r.feature}</td>
        <td class="vs-trad">${r.traditional}</td>
        <td class="vs-agent"><span class="vs-check">✓</span>${r.agentic}</td>
      </tr>
    `).join('');

    return `
      <div class="s3-wrapper">

        <div class="slide-label">// TRADITIONAL VS AGENTIC</div>

        <!-- Título dramático — siempre visible -->
        <h2 class="s3-question">
          ENTONCES...<br>
          <span class="accent-pink">¿Los AW son workflows</span><br>
          <span class="accent-cyan">con Copilot CLI?</span>
        </h2>

        <!-- Tabla — aparece en el primer keypress -->
        <div class="vs-block" id="vs-block">
          <table class="vs-table">
            <thead>
              <tr>
                <th colspan="2" class="vs-th-feat-header">Feature</th>
                <th class="vs-th-trad">
                  <span class="vs-col-dot"></span>
                  Traditional GitHub Actions
                </th>
                <th class="vs-th-agent">
                  <span class="vs-col-dot vs-col-dot--cyan"></span>
                  Agentic Workflows
                </th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
            <tfoot>
              <tr>
                <td colspan="2"></td>
                <td class="vs-tfoot-dot"><span class="vs-col-dot"></span></td>
                <td class="vs-tfoot-dot"><span class="vs-col-dot vs-col-dot--cyan"></span></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Pipe codo: arriba-izquierda -->
        <img src="assets/pipe-codo.png" class="s3-pipe-tl" alt="" />

        <!-- Mona: arriba-derecha, con margen para no chocar con el pipe -->
        <div class="s3-mona">
          <img src="assets/mona-move.png" alt="Mona" class="mona-slide" />
        </div>

      </div>
    `;
  },

  setup(el) {
    _state = { shown: false };
    this._el = el;
    const vs = el.querySelector('#vs-block');
    if (vs) { vs.style.display = 'none'; vs.classList.remove('visible'); }
    el.querySelectorAll('.vs-row').forEach(r => r.classList.remove('visible'));
  },

  teardown(_el) { _state = null; },

  handleInput() {
    if (!_state || !this._el) return false;
    const el = this._el;

    if (!_state.shown) {
      const vs = el.querySelector('#vs-block');
      if (vs) {
        vs.style.display = 'block';
        void vs.offsetWidth;
        vs.classList.add('visible');
        el.querySelectorAll('.vs-row').forEach((row, i) => {
          setTimeout(() => row.classList.add('visible'), i * 100);
        });
      }
      _state.shown = true;
      return true;
    }

    return false;
  }
};
