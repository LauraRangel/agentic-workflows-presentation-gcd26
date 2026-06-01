# Agentic Workflows con GitHub — Plantilla de presentación

Presentación interactiva en **HTML/CSS/JS vanilla** (sin frameworks, sin build step) creada para la charla **"Agentic Workflows con GitHub: Automatiza tu día a día como developer"** del GitHub Community Day Perú 2026.

Pensada como **plantilla reutilizable**: estética synthwave/cyberpunk pixel-clean, navegación por teclado/click/touch, slides animados y diseño calibrado para proyección en auditorio.

> 🎨 Paleta cyan/pink sobre fondo oscuro · Fuentes Space Mono + Inter · Cero dependencias de build.

---

## ✨ Características

- **8 slides** con transición horizontal suave y animaciones por keypress.
- **Sin build step** — ES Modules nativos, corre directo en GitHub Pages.
- **Navegación**: flechas `← →`, `Espacio`, click/tap y swipe táctil.
- **Interactividad**: typewriter, reveals secuenciales, tabla comparativa animada, video con controles personalizados, QR codes en vivo, copiar comando al portapapeles.
- **Fondo decorativo** de tuberías pixel-art inyectado automáticamente en cada slide.
- **Responsive a viewport** con `clamp()` — legible desde la última fila de la sala.

---

## 🚀 Cómo correrlo en local

Como usa ES Modules (`type="module"`), **necesita un servidor HTTP** — no funciona abriendo `index.html` directamente con `file://`.

```bash
# Con Python 3 (preinstalado en macOS/Linux)
python3 -m http.server 3000
# → abre http://localhost:3000

# O con Node
npx serve .
```

> Al editar archivos `.js`, el navegador cachea agresivamente los módulos. Usa **hard reload** (`Cmd/Ctrl + Shift + R`) o activa *Disable cache* en las DevTools.

---

## 📦 Deploy en GitHub Pages

No requiere build. Desde la raíz del repo:

1. Sube el proyecto a un repositorio de GitHub.
2. **Settings → Pages → Source**: rama `main`, carpeta `/ (root)`.
3. En ~30 s estará disponible en `https://<usuario>.github.io/<repo>/`.

```bash
git add . && git commit -m "update" && git push
# → auto-deploy
```

---

## 🗂️ Estructura

```
/
├── index.html          ← shell: carga fuentes, qrcode.js (CDN) y main.js
├── main.js             ← navegación, transiciones, inyección del SVG de pipes
├── style.css           ← todos los estilos (globales + por slide)
├── CLAUDE.md           ← guía de diseño (fuente de verdad del estilo visual)
├── slides/
│   ├── slide1.js       ← Hero: título, foto speaker, Mona
│   ├── slide2.js       ← ¿Qué son? 3 cards + agentes
│   ├── slide3.js       ← Traditional vs Agentic (tabla)
│   ├── slide4.js       ← Cómo funciona (diagrama + requisitos)
│   ├── slide5.js       ← Seguridad (5 capas)
│   ├── slide6.js       ← Casos de uso (Actions vs Agentic)
│   ├── slide7.js       ← Demo (video con controles)
│   └── slide8.js       ← Recursos + cierre (QR codes)
└── assets/             ← imágenes, video, personajes Mona y pipes
```

---

## 🧩 Cómo funciona un slide

Cada slide es un módulo ES6 que exporta un objeto con esta forma:

```js
export default {
  render()         { return `<div>...html...</div>`; }, // se llama 1 vez al cargar
  setup(el)        { /* lógica al entrar al slide */ },
  teardown(el)     { /* limpieza al salir */ },
  handleInput(src) { /* return true = consume input; false = avanza de slide */ }
};
```

`main.js` pre-renderiza todos los slides en el DOM y los desplaza con `translateX`.
El parámetro `src` de `handleInput` indica el origen del input (`'space'`, `'arrow'`, `'click'`, `'swipe'`) — útil, por ejemplo, para que la barra espaciadora controle un video sin avanzar de slide.

### Agregar un slide nuevo

1. Crea `slides/slideN.js` exportando el objeto de arriba.
2. Impórtalo en `main.js` y añádelo al array `MODS`.
3. Sigue la jerarquía de tamaños y el patrón de centrado documentados en [`CLAUDE.md`](CLAUDE.md).

---

## 🎨 Personalizar para tu charla

Todo el sistema de diseño (paleta, tipografía, tamaños, reglas de composición, uso de personajes y pipes) está documentado en **[`CLAUDE.md`](CLAUDE.md)**. Empieza por ahí.

Puntos rápidos para adaptarla:

| Quiero cambiar… | Dónde |
|---|---|
| Colores de acento | variables `--pink` / `--cyan` en `style.css` |
| Textos / contenido | el `render()` de cada `slides/slideN.js` |
| Foto del speaker | reemplaza `assets/laura-rangel-foto.jpeg` |
| Video del demo | `assets/demo-flujo.webm` (o `flow-jira-ticket.mp4`) en `slide7.js` |
| URLs de los QR | array `REPOS` en `slides/slide8.js` |
| Total de slides en el contador | `DISPLAY_TOTAL` en `main.js` |

---

## 🛠️ Stack

- HTML5 + CSS3 (custom properties, `clamp()`, transforms, keyframes)
- JavaScript ES Modules nativos — **sin frameworks ni bundler**
- [qrcode.js](https://github.com/davidshimjs/qrcodejs) vía CDN (solo para el slide de recursos)
- Google Fonts: Space Mono + Inter

---

## 📄 Licencia

El **código** de esta plantilla se distribuye bajo licencia MIT (ver [`LICENSE`](LICENSE)).

> ⚠️ **Los assets son personales**: la foto del speaker, el personaje **Mona** (propiedad de GitHub) y los logos/marcas **no** están cubiertos por la licencia MIT. Si reutilizas la plantilla, reemplaza esos assets por los tuyos.

---

Hecho con 💜 por **Laura Rangel** · DevOps Engineer · GitHub Community Day Perú 2026
