// Slide 8 — Recursos + cierre
// QRs generados con qrcode.js (cargado en index.html desde CDN).

const REPOS = [
  {
    id: 'demo',
    title: 'Repo demo',
    sub: 'clónalo y pruébalo',
    url: 'https://github.com/LauraRangel/demo-jira-flow-aw',
    short: 'github.com/LauraRangel/demo-jira-flow-aw',
    accent: 'pink',
  },
  {
    id: 'pres',
    title: 'Esta presentación',
    sub: 'el código de estos slides',
    url: 'https://github.com/LauraRangel/agentic-workflows-presentation-gcd26',
    short: 'github.com/LauraRangel/agentic-workflows-presentation-gcd26',
    accent: 'cyan',
  },
];

const RESOURCES = [
  { icon: '📖', link: 'https://github.github.com/gh-aw',              label: 'Docs oficiales de Agentic Workflows', text: 'github.github.com/gh-aw' },
  { icon: '▶',  link: 'https://youtube.com/watch?v=TBVtoHrhFG4',       label: 'GitHub Agentic Workflows en acción',  text: 'youtube.com/watch?v=TBVtoHrhFG4' },
  { icon: '▶',  link: 'https://youtube.com/watch?v=kaIz0X_YByE',       label: 'Demo y casos de uso',                 text: 'youtube.com/watch?v=kaIz0X_YByE' },
];

export default {
  render() {
    const repos = REPOS.map((r, i) => `
      <div class="rs-repo" id="rs-repo-${i}">
        <div class="rs-repo-head">
          <div class="rs-repo-title accent-${r.accent}">${r.title}</div>
          <div class="rs-repo-sub">${r.sub}</div>
        </div>
        <div class="rs-qr-frame">
          <img src="assets/pipe-codo.png" class="corner corner-tl" alt="" />
          <img src="assets/pipe-codo.png" class="corner corner-tr" alt="" />
          <img src="assets/pipe-codo.png" class="corner corner-bl" alt="" />
          <img src="assets/pipe-codo.png" class="corner corner-br" alt="" />
          <div class="rs-qr" id="rs-qr-${r.id}" data-url="${r.url}"></div>
        </div>
        <div class="rs-repo-url">${r.short}</div>
      </div>
    `).join('');

    const resources = RESOURCES.map((res, i) => `
      <a class="rs-res-card" id="rs-res-${i}" href="${res.link}" target="_blank" rel="noopener">
        <span class="rs-res-icon">${res.icon}</span>
        <div class="rs-res-text">
          <span class="rs-res-label">${res.label}</span>
          <span class="rs-res-link">${res.text}</span>
        </div>
      </a>
    `).join('');

    return `
      <div class="rs-wrapper">

        <div class="slide-label">// RECURSOS</div>

        <div class="rs-header" id="rs-header">
          <h2 class="rs-title">Empieza <span class="accent-cyan">hoy</span></h2>
          <p class="rs-sub">// clona, explora y construye tu primer agente</p>
        </div>

        <!-- Fila 1: repos con QR -->
        <div class="rs-repos">${repos}</div>

        <!-- Fila 2: recursos -->
        <div class="rs-resources">
          <div class="rs-res-head">// para seguir aprendiendo</div>
          <div class="rs-res-grid">${resources}</div>
        </div>

        <!-- Footer -->
        <div class="rs-footer" id="rs-footer">
          <p class="rs-closing">
            <span class="rs-closing-1">El developer no desaparece.</span><br>
            <span class="rs-closing-2">El agente absorbe el ruido.</span>
          </p>
          <p class="rs-thanks">¡Gracias! · Laura Rangel · GitHub Community Day Perú 2026</p>
        </div>

        <!-- Mona feliz -->
        <div class="rs-mona">
          <img src="assets/mona-happy.png" alt="Mona feliz" class="rs-mona-img" />
        </div>

      </div>
    `;
  },

  setup(el) {
    // Genera los QR una sola vez (si la lib está disponible y no existen aún)
    REPOS.forEach((r) => {
      const box = el.querySelector(`#rs-qr-${r.id}`);
      if (!box) return;
      if (box.childElementCount > 0) return; // ya generado
      if (typeof QRCode === 'undefined') return; // lib no cargó

      new QRCode(box, {
        text: r.url,
        width: 150,
        height: 150,
        colorDark: '#07070f',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M,
      });
    });

    // Re-trigger de animaciones de entrada
    el.querySelector('#rs-header')?.classList.remove('in');
    el.querySelectorAll('.rs-repo, .rs-res-card').forEach(n => n.classList.remove('in'));
    el.querySelector('#rs-footer')?.classList.remove('in');

    requestAnimationFrame(() => {
      el.querySelector('#rs-header')?.classList.add('in');
      el.querySelectorAll('.rs-repo').forEach((n, i) => {
        n.style.setProperty('--d', `${i * 200}ms`);
        n.classList.add('in');
      });
      el.querySelectorAll('.rs-res-card').forEach((n, i) => {
        n.style.setProperty('--d', `${400 + i * 100}ms`);
        n.classList.add('in');
      });
      el.querySelector('#rs-footer')?.classList.add('in');
    });
  },

  teardown(_el) {},

  handleInput() { return false; }
};
