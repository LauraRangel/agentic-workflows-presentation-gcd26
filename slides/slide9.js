// Slide 9 — DSO (imagen a pantalla completa)

export default {
  render() {
    return `
      <div class="dso-wrapper">
        <div class="slide-label">// DSO</div>
        <div class="dso-img-area">
          <img src="assets/dso.png"
               alt="DSO"
               class="dso-img"
               id="dso-img" />
        </div>
      </div>
    `;
  },

  setup(el) {
    const img = el.querySelector('#dso-img');
    if (img) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => img.classList.add('dso-img--visible'))
      );
    }
  },

  teardown(el) {
    const img = el.querySelector('#dso-img');
    if (img) img.classList.remove('dso-img--visible');
  },

  handleInput() { return false; }
};
