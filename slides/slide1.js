// Slide 1 — Hero
export default {
  render() {
    return `
      <div class="s1-wrapper">

        <!-- Label del evento: flotante arriba -->
        <div class="event-label-hero">// GITHUB COMMUNITY DAY '26</div>

        <!-- Contenido principal centrado -->
        <div class="hero-layout">

          <div class="hero-left">
            <h1 class="hero-title">
              <span class="accent-pink">Agentic<br>Workflows</span><br>
              <span class="accent-cyan">con GitHub:</span>
            </h1>
            <p class="hero-desc">
              Automatiza tu día a día<br>como developer
            </p>
            <div class="hero-speaker">
              <span class="hero-name">Laura Rangel</span>
              <span class="hero-role">DevOps Engineer</span>
            </div>
          </div>

          <div class="hero-right">
            <div class="photo-frame">
              <img src="assets/pipe-codo.png" class="corner corner-tl" alt="" />
              <img src="assets/pipe-codo.png" class="corner corner-tr" alt="" />
              <img src="assets/pipe-codo.png" class="corner corner-bl" alt="" />
              <img src="assets/pipe-codo.png" class="corner corner-br" alt="" />
              <div class="photo-inner">
                <img src="assets/laura-rangel-foto.jpeg" alt="Laura Rangel" class="speaker-photo" />
              </div>
            </div>
          </div>

        </div>

        <!-- Mona saludando: referencia GitHub, esquina inferior derecha -->
        <div class="mona-github-tag">
          <img src="assets/mona-saludo.png" class="mona-wave" alt="Mona GitHub" />
        </div>

      </div>
    `;
  },

  setup(_el) {},
  teardown(_el) {}
};
