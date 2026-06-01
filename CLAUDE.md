# CLAUDE.md — Guía de diseño de la presentación

Presentación: **Agentic Workflows con GitHub: Automatiza tu día a día como developer**
GitHub Community Day Perú 2026 · Speaker: Laura Rangel · DevOps Engineer

Este archivo es la fuente única de verdad para el estilo visual, los assets y las reglas de composición de cada slide. Todo nuevo slide o cambio debe respetar lo definido aquí.

---

## Estructura real del proyecto

```
/
├── index.html               ← shell HTML, carga fuentes Google + main.js
├── main.js                  ← navegación, transiciones, inyección del SVG de pipes
├── style.css                ← todos los estilos globales y de slides
├── CLAUDE.md                ← este archivo
├── slides/
│   ├── slide1.js            ← Hero
│   ├── slide2.js            ← Ice breaker (typewriter)
│   ├── slide3.js            ← ¿Qué son los Agentic Workflows?
│   ├── slide4.js            ← Seguridad (4 cards secuenciales)
│   ├── slide5.js            ← ¿Para qué sirven? (grid de casos de uso)
│   ├── slide6.js            ← Demo en 3 actos
│   └── slide7.js            ← Cierre + CTA (copiar comando)
└── assets/                  ← todos los assets en carpeta plana
    ├── laura-rangel-foto.jpeg   ← foto del speaker
    ├── mona-saludo.png
    ├── mona-happy.png
    ├── mona-move.png
    ├── mona-present.png
    ├── pipe.png
    ├── pipe-codo.png
    ├── pipe-t.png
    └── pipe-x-ai.png
```

**Stack**: Vanilla JS con ES Modules nativos (`type="module"`). Sin build step, sin frameworks. Corre directo en GitHub Pages desde la raíz de `main`.

---

## Arquitectura de slides

Cada slide es un módulo ES6 que exporta un objeto con esta forma:

```js
export default {
  render()         { return `<div>...html...</div>`; },  // llamado una vez al inicio
  setup(el)        { /* lógica al entrar al slide */ },
  teardown(el)     { /* limpieza al salir */ },
  handleInput()    { /* retorna true si consumió el input, false para avanzar */ }
};
```

`main.js` pre-renderiza todos los slides en el DOM al cargar la página y los mueve con `translateX` para la transición horizontal. El SVG de pipes de fondo se inyecta automáticamente en cada slide desde `main.js` (constante `PIPES_SVG`).

**Navegación**: `→` / `Space` / `click` avanzan. `←` retrocede. Touch swipe también funciona.

---

## Paleta de colores (variables reales en style.css)

```css
:root {
  --bg: #07070f;                          /* fondo base */
  --pink: #ff2d78;                        /* acento principal */
  --cyan: #00e5ff;                        /* acento secundario */
  --text: #e2e2f0;                        /* texto general */
  --dim: #555;                            /* texto muy tenue (hints UI) */
  --dim2: #888;                           /* texto tenue */
  --card-bg: #0c0c1a;                     /* fondo de cards */
  --border-cyan: rgba(0, 229, 255, 0.18);
  --border-pink: rgba(255, 45, 120, 0.3);
  --font-mono: 'Space Mono', 'Courier New', monospace;
  --font-body: 'Inter', system-ui, sans-serif;
}
```

**Reglas de uso**:
- Títulos principales: primera parte en `--pink`, segunda en `--cyan`.
- Subtítulos descriptivos: `#fff` (blanco puro), `opacity: 1`.
- Nombre del speaker: `#fff`, bold. Rol: `--pink`, uppercase, letter-spacing.
- Etiqueta de evento (top-left del slide 1): `--cyan`, uppercase, borde izquierdo cyan.
- Hints de navegación (bottom-left) y contador `[XX/07]` (bottom-right): `--dim`.
- Escribir siempre **GitHub** (G y H mayúsculas), nunca "Github".

---

## Tipografía

```css
--font-mono: 'Space Mono', 'Courier New', monospace;   /* títulos, código, UI, labels */
--font-body: 'Inter', system-ui, sans-serif;           /* body, descripciones largas */
```

> **REGLA DE ORO — formato desktop / auditorio.** Esto es una presentación proyectada en una sala grande, NO una web responsive de móvil. Todo el texto debe leerse desde la última fila. Cuando dudes entre un tamaño y otro, elige el más grande. Ningún texto de contenido baja de `~14px` en el extremo mínimo del `clamp()`. Usar siempre `clamp(min, vw, max)` para que escale con el viewport, pero con mínimos y máximos generosos como los de la tabla de abajo.

**Jerarquía actual** (valores reales en `style.css`, ya calibrados para desktop):

| Elemento | Clase / estilo | Tamaño |
|---|---|---|
| Título hero (slide 1) | `.hero-title` | `clamp(46px, 7vw, 92px)` |
| Subtítulo hero | `.hero-desc` | `clamp(22px, 3vw, 40px)` |
| Etiqueta evento | `.event-label-hero` | `clamp(18px, 2vw, 28px)` |
| Nombre speaker | `.hero-name` | `clamp(28px, 3vw, 40px)` |
| Rol speaker | `.hero-role` | `clamp(16px, 1.8vw, 23px)` |
| Mona hero | `.mona-wave` | `150px` |
| Título de sección (slide 2/3) | `.qs-title` / `.s4-title` | `clamp(26px, 3.8vw, 72px)` |
| Comentario `//` de slide | `.qs-comment` | `clamp(18px, 2vw, 26px)` |
| Label de sección | `.slide-label` | `clamp(13px, 1.2vw, 16px)` |
| Título de card | `.qs-card-title` | `clamp(28px, 3.2vw, 42px)` |
| Cuerpo de card | `.qs-card-body` | `clamp(17px, 1.8vw, 24px)` |
| Ícono/pipe de card | `.qs-card-icon` / `.qs-card-pipe` | `38px` |
| Badge de card | `.qs-card-tag` | `clamp(12px, 1.1vw, 15px)` |
| Header de tabla | `.vs-table thead th` | `clamp(16px, 1.6vw, 22px)` |
| Celda de tabla | `.vs-table td` | `clamp(16px, 1.6vw, 21px)` |
| Terminal de requisitos | `.s4-req-line` | `clamp(15px, 1.5vw, 20px)` |

**Reglas de tamaño**:
- Títulos de slide: arrancar mínimo en `~26px` y llegar a `~48–72px` en el máximo.
- Texto de contenido (bullets, celdas, body): mínimo `~16px`, máximo `~20–24px`.
- Labels y comentarios `//`: mínimo `~13px`, en cyan visible (no `--dim`).
- Cualquier slide nuevo debe igualar o superar estos tamaños — nunca usar los valores pequeños originales (`11px`, `12px` fijos) para contenido visible.

---

## Layout y centrado — modo desktop

Cada slide debe **ocupar el ancho del desktop de forma proporcional**, sin dejar grandes huecos muertos a un lado.

**Patrón de wrapper** (todos los slides):
```css
.X-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;   /* contenido centrado, NO flex-start */
}
```

**Patrón de contenido** centrado y ancho:
```css
.X-content,
.hero-layout {
  width: 100%;
  max-width: 1500px;         /* ancho generoso para desktop */
  margin: 0 auto;            /* centra el bloque */
}
```

**Reglas de composición**:
- `max-width` de los bloques de contenido: **`1500px`** (no `1040`/`1120`). Subir a `1700px` solo si el monitor deja demasiado margen.
- Wrappers siempre con `justify-content: center` + `margin: 0 auto` en el contenido — esto reparte el contenido y lo centra, evitando que quede pegado a la derecha o izquierda.
- El padding base del slide es `56px 80px` (en `.slide`). Para que una imagen ocupe casi toda la pantalla, romper ese padding con márgenes negativos (`margin: 0 -80px -56px`), como en slide 4.
- Mona y pipes decorativos van `position: absolute` en esquinas, **nunca** dentro del flujo flex que empuje el contenido.
- Pensar cada slide a 16:9 proyectado: el contenido principal vive en la franja central-vertical, con label arriba-izquierda y contador/hints generados por `main.js`.

---

## Slides actuales

| # | Archivo | Contenido | Interactividad especial |
|---|---|---|---|
| 1 | `slide1.js` | Hero: título, foto speaker enmarcada en pipe-codo, Mona saludando, label evento cyan | — |
| 2 | `slide2.js` | ¿Qué son? 3 cards (Contexto/Decisión/Acción) unidas por pipe.png + strip de agentes | Cada keypress revela card; pipe N aparece con card N+1; 4° revela agentes |
| 3 | `slide3.js` | Traditional vs Agentic: título dramático + tabla comparativa con íconos circulares | Keypress revela la tabla con filas en stagger |
| 4 | `slide4.js` | Cómo funciona: diagrama `aw-flow.png` con nubes cyan + terminal de requisitos | Fade-in de la imagen al entrar |
| 5 | `slide5.js` | ¿Para qué sirven? Grid 3×2 de casos de uso | — |
| 6 | `slide6.js` | Demo en 3 actos: Setup / Launch / Resultado | Cards animadas al entrar |
| 7 | `slide7.js` | Cierre + CTA: comando copiable al clipboard | Botón copia `gh extension install github/gh-aw` |

> **Nota:** los slides 5, 6 y 7 aún usan el diseño base original y **no** han sido recalibrados a modo desktop. Al retomarlos, aplicar la jerarquía de tamaños y el patrón de centrado de arriba.

---

## Personajes — Mona

Mona es el personaje de GitHub en pixel art pink/purple/cyan, 8 tentáculos. **Nunca usar Copilot u otros personajes de GitHub, solo Mona.**

| Asset | Expresión | Slide asignado | Posición | Tamaño |
|---|---|---|---|---|
| `mona-saludo.png` | Saludando, tentáculo levantado | Slide 1 (hero) | bottom-right | 120px |
| `mona-present.png` | Presentando, sonriente | Slide 2 o 3 | bottom-right | 100px |
| `mona-move.png` | En movimiento | Slide 5 o 6 (demo) | bottom-right | 100px |
| `mona-happy.png` | Frontal feliz | Slide 7 (cierre) | bottom-right o center | 120px |

**Reglas**:
- Mona siempre en una esquina o margen. **Nunca al centro ni tapando texto**.
- Puede "asomar" desde un pipe (`pipe-codo.png` + Mona como composición).
- Idle bobbing permitido: animación vertical de 2-3px, loop infinito.
- En slides sin Mona asignada, no agregar una solo para decorar.

---

## Pipes — assets y uso

Los pipes son isométricos en pixel art, orientación base `-|` (horizontal que dobla hacia abajo = `┐`).

| Asset | Forma | Uso principal |
|---|---|---|
| `pipe.png` | Recto horizontal | Conectores, líneas de flujo |
| `pipe-codo.png` | Codo 90° (forma `┐` natural) | Esquinas de marcos de fotos |
| `pipe-t.png` | Conexión en T | Ramificaciones, bifurcaciones |
| `pipe-x-ai.png` | Cruce X con chip | Hub técnico, slides de arquitectura |

**Rotaciones correctas para marcos de foto** (basadas en que la forma natural es `┐`):

```css
.corner-tl { transform: scaleX(-1);     } /* ┌ */
.corner-tr { transform: rotate(0deg);   } /* ┐ */
.corner-bl { transform: rotate(180deg); } /* └ */
.corner-br { transform: scaleY(-1);     } /* ┘ */
```

**Reglas**:
- El SVG de pipes de fondo se inyecta globalmente desde `main.js` (opacidad 0.22, `pointer-events: none`, `z-index: 0`).
- `.slide > div` tiene `position: relative; z-index: 1` para que el contenido quede siempre encima.
- En slides muy textuales, máximo 2 pipes decorativos extra para no sobrecargar.

---

## UI elements estándar

### Etiqueta de evento — slide 1 únicamente
```html
<div class="event-label-hero">// GITHUB COMMUNITY DAY '26</div>
```
Posición: `absolute`, `top: 0`, `left: 0`. Color: `--cyan`. Borde izquierdo cyan.

### Label de sección — todos los slides
```html
<div class="slide-label">// NOMBRE SECCIÓN</div>
```
Color `--cyan`, `opacity: 1`, `font-size: clamp(13px, 1.2vw, 16px)`, `letter-spacing: 4px`. (Antes era `11px` / `opacity 0.65` — se subió para que se lea en proyección.)

### Contador y hints (generados por main.js — no tocar en slides)
- Bottom-right: `[01/07]` en `--cyan`
- Bottom-left: `← → SPACE · CLICK` en `--dim`

### Cursor parpadeante
```html
<span class="cursor"></span>
```
Clase `.cursor` en `style.css`: bloque cyan de 9×1em, animación `blink` step-end infinita.

### Code block
```html
<div class="code-block">...</div>
```
Fondo `#000`, borde izquierdo 3px `--cyan`. Clases de color: `.kw` (pink), `.fn` (cyan), `.str` (verde), `.cm` (dim), `.num` (naranja), `.var` (purple).

---

## Animaciones permitidas

- **Typewriter** (`slide2.js`): texto aparece letra por letra con `setTimeout` a 32ms/char.
- **Fade-in secuencial** (`slide4.js`, `slide6.js`): elementos aparecen uno a uno con keypress o con `animation-delay`.
- **Mona idle bobbing**: `transform: translateY` 0 → -3px → 0, loop infinito, `ease-in-out`.
- **Transición de slide**: `translateX` horizontal, 380ms, `cubic-bezier(0.4, 0, 0.2, 1)`.

**Nunca**: gradientes animados, partículas, parallax, blur, librerías de animación externas.

---

## Tono y voz

- Español, segunda persona (tú).
- Técnico y honesto, sin marketing vacío.
- Frases cortas. Una idea por línea en bullets.
- Código siempre con syntax highlighting manual (clases `.kw`, `.fn`, etc.). Sin librerías como Prism o Highlight.js.
- Comentarios en slides estilo `// nota` en `--dim` para contexto sin saturar.

---

## Deploy

GitHub Pages desde rama `main`, carpeta raíz (`/`). No requiere build step. Los ES Modules nativos funcionan en todos los browsers modernos con el servidor de GitHub Pages.

```bash
git add . && git commit -m "update" && git push
# → auto-deploy en ~30 segundos
```
