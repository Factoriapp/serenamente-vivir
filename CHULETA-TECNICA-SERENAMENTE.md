# 🗺️ CHULETA TÉCNICA - Serenamente Vivir

**Versión**: 1.0
**Última actualización**: 13-Dic-2025
**Proyecto**: Serenamente Vivir

---

## ⚡ Reglas Críticas (Memorizar)

- **NUNCA** editar `css/styles.css` → editar `scss/*.scss`
- **NUNCA** hardcodear colores HEX → usar `var(--color-*)`
- **SIEMPRE** compilar después de editar SCSS → `npm run build`
- **SIEMPRE** usar variables de espaciado `var(--spacing-*)`
- **Sistema SCSS**: `npm run watch` (desarrollo) | `npm run build` (manual)

---

## 🗂️ Dónde Buscar Qué

| Necesito... | Dónde está | Líneas aprox |
|-------------|------------|--------------|
| **Colores (beige, cyan, green)** | `scss/_variables.scss` → `:root` | ~70 |
| **Espaciado, sombras, bordes** | `scss/_variables.scss` → `:root` | ~70 |
| **Editar header + navegación** | `scss/_header.scss` | 44 |
| **Editar hero (logo + banner)** | `scss/_hero.scss` | 79 |
| **Editar botones** | `scss/_buttons.scss` | 60 |
| **Editar modales/popups** | `scss/_popups.scss` | 211 |
| **Editar secciones contenido** | `scss/_sections.scss` | 763 |
| **Editar footer** | `scss/_footer.scss` | 85 |
| **Responsive (4 breakpoints)** | `scss/_responsive.scss` | 354 |
| **Ver orden de imports** | `scss/main.scss` | 22 |

---

## 🎯 Workflow por Tarea

### 🎨 Cambiar un color global
1. Edita `scss/_variables.scss` → busca `--color-beige` (o el color que necesites)
2. Cambia valor: `--color-beige: #NUEVO_COLOR;`
3. Ejecuta `npm run build`
4. Recarga navegador → Todos los elementos con ese color cambian

### 🖼️ Editar el header
1. Edita `scss/_header.scss` (44 líneas)
2. Encuentra el selector (ej: `.header-content`)
3. Modifica estilos
4. Ejecuta `npm run build`

### 🔘 Crear un nuevo botón
1. Edita `scss/_buttons.scss` (60 líneas)
2. Agrega nueva clase: `.btn-tertiary { ... }`
3. Usa variables CSS: `background: var(--color-green);`
4. Ejecuta `npm run build`
5. Usa en HTML: `<button class="btn-tertiary">Texto</button>`

### 📱 Modificar responsive
1. Edita `scss/_responsive.scss` (354 líneas)
2. Encuentra breakpoint: `@media (max-width: 768px) { ... }`
3. Modifica estilos para tablet/móvil
4. Ejecuta `npm run build`
5. Prueba en DevTools (F12 → Responsive Mode)

### 🧩 Agregar nueva sección
1. Edita `scss/_sections.scss` (763 líneas - archivo más grande)
2. Agrega nueva clase: `.mi-seccion { ... }`
3. Usa grid/flex layouts existentes como referencia
4. Ejecuta `npm run build`

### 🎭 Editar modal/popup
1. Edita `scss/_popups.scss` (211 líneas)
2. Encuentra clase del modal (ej: `.modal`)
3. Modifica estilos/animaciones
4. Ejecuta `npm run build`

---

## 📊 Estado del Proyecto

- **Versión actual**: 1.0
- **Sistema SCSS**: ✅ Operativo (10 módulos)
- **Páginas HTML principales**:
  - ✅ `serenamente_vivir.html` (Homepage + Lead Magnet)
  - ✅ `tienda.html` (Catálogo servicios)
  - ✅ `agenda.html` (Reserva de pago)
  - ✅ `contacto.html` (Formulario relacional)
  - ✅ `tu_espacio_privado.html` (Membresía)
  - ✅ `meditaciones_personalizadas.html`
  - ✅ `cuenta.html` (Login/Registro)
  - ✅ `area-privada.html` (Hub dinámico Teresa/Regina/Ana)
  - ✅ `catalogo.html` (Tienda recursos)
- **Sistema Multi-Tenant**: ✅ Implementado (config-loader.js + serenamente.json)
- **Responsive**: ✅ 4 breakpoints activos (480px, 768px, 968px, 1200px)

---

## 🚀 Comandos Rápidos

```bash
# Desarrollo SCSS
npm run watch      # Auto-compilar al guardar (RECOMENDADO para desarrollo)
npm run build      # Compilar una vez (cambios puntuales)
npm run build:prod # Minificar para producción

# Verificación
ls scss/           # Ver módulos SCSS disponibles
cat scss/main.scss # Ver orden de imports

# Git
git status         # Ver archivos modificados
git add .          # Agregar todos los cambios
git commit -m ""   # Crear commit
git push           # Subir a GitHub
```

---

## 📁 Estructura del Proyecto

```
Serenamente/
├── serenamente_vivir.html       # Homepage (Lead Magnet)
├── tienda.html                  # Catálogo servicios
├── agenda.html                  # Reserva de pago (Calendly/Stripe)
├── contacto.html                # Formulario contacto relacional
├── tu_espacio_privado.html      # Membresía
├── meditaciones_personalizadas.html
├── cuenta.html                  # Login/Registro multi-tenant
├── area-privada.html            # Hub dinámico Teresa/Regina/Ana
├── catalogo.html                # Tienda recursos
│
├── config/                      # 🔧 Configuración Multi-Tenant
│   └── tenants/
│       └── serenamente.json     # Config tenant (tema, diccionario, features)
│
├── css/
│   └── styles.css               # ⚠️ AUTO-GENERADO (NO EDITAR)
│
├── scss/                        # 📝 CÓDIGO FUENTE (EDITABLE)
│   ├── main.scss                # Orquestador (importa todos)
│   ├── _variables.scss          # Variables CSS (colores, espaciado, etc.)
│   ├── _reset.scss              # Reset CSS básico
│   ├── _header.scss             # Header + navegación
│   ├── _hero.scss               # Banner principal con logo
│   ├── _buttons.scss            # Botones (primary, secondary, compact)
│   ├── _popups.scss             # Modales con animaciones
│   ├── _sections.scss           # Secciones del contenido (MÁS GRANDE)
│   ├── _footer.scss             # Footer con 3 columnas
│   └── _responsive.scss         # Media queries (4 breakpoints)
│
├── js/                          # 🔧 JavaScript Multi-Tenant + Auth
│   ├── config-loader.js         # Sistema multi-tenant (442 líneas)
│   ├── auth.js                  # Autenticación 3 niveles (334 líneas)
│   ├── area-privada.js          # Área privada dinámica (600+ líneas)
│   └── main.js                  # Modales + Lead Magnet
│
├── Imagenes/                    # Assets visuales
│
├── Maestro_Serenamente.md       # 📚 Decisiones estratégicas y roadmap
├── ARQUITECTURA-SERENAMENTE.md  # 🏗️ Arquitectura multi-tenant
├── CHULETA-TECNICA-SERENAMENTE.md # 🗺️ Este archivo (guía técnica)
├── CLAUDE.md                    # Contexto para Claude Code
├── GEMINI.md                    # Contexto para Gemini
├── CODEX.md                     # Contexto para Codex
└── TESTING-MULTITENANT.md       # Guía de testing
```

---

## 🎨 Sistema de Variables CSS (Centralizado)

### ¿Por qué Variables?

**Sin variables** (❌ ANTES):
```css
/* Tengo que cambiar el beige en 20 lugares diferentes */
.header { background: #e7cf9d; }
.button { background: #e7cf9d; }
.card { border: 1px solid #e7cf9d; }
/* ... 17 veces más */
```

**Con variables** (✅ AHORA):
```css
/* Cambio UNA VEZ en _variables.scss */
:root {
  --color-beige: #e7cf9d;
}

/* Uso en todos lados */
.header { background: var(--color-beige); }
.button { background: var(--color-beige); }
.card { border: 1px solid var(--color-beige); }
```

**Beneficio:** Cambiar 1 línea → 20+ elementos actualizados automáticamente

---

### Paleta de Colores (Identidad Serenamente)

**Archivo:** `scss/_variables.scss` → `:root`

```css
/* Colores principales */
--color-beige: #e7cf9d;       /* Primario - cálido, femenino */
--color-cyan: #c9e1e1;        /* Secundario - tranquilo, sereno */
--color-green: #cae4b2;       /* Acento - naturaleza, crecimiento */
--color-cream: #f1ede2;       /* Neutral - suave */
--color-gray: #898989;        /* Texto secundario */
--color-bg: #f5f3f0;          /* Fondo general */

/* Colores funcionales */
--color-text: #333333;        /* Texto principal */
--color-text-light: #666666;  /* Texto ligero */
--color-border: #e0e0e0;      /* Bordes sutiles */
--color-white: #ffffff;       /* Blanco puro */

/* Estados */
--color-success: #cae4b2;     /* Verde éxito */
--color-error: #dc3545;       /* Rojo error */
--color-warning: #e7cf9d;     /* Beige advertencia */
```

**Uso:**
```css
.mi-elemento {
  background: var(--color-beige);
  color: var(--color-gray);
  border: 1px solid var(--color-border);
}
```

---

### Sistema de Espaciado

**Archivo:** `scss/_variables.scss` → `:root`

```css
--spacing-xs: 0.5rem;  /* 8px  - Espacios mínimos */
--spacing-sm: 1rem;    /* 16px - Espacios pequeños */
--spacing-md: 2rem;    /* 32px - Espacios medianos */
--spacing-lg: 3rem;    /* 48px - Espacios grandes */
--spacing-xl: 5rem;    /* 80px - Espacios extra grandes */
```

**Uso:**
```css
.seccion {
  padding: var(--spacing-lg);       /* 48px arriba/abajo/izq/der */
  margin-bottom: var(--spacing-md); /* 32px abajo */
}
```

**Beneficio:** Espaciado consistente en todo el sitio

---

### Sombras (Elevation)

**Archivo:** `scss/_variables.scss` → `:root`

```css
--shadow-soft: 0 4px 20px rgba(0, 0, 0, 0.08);     /* Sombra suave */
--shadow-medium: 0 6px 30px rgba(0, 0, 0, 0.12);   /* Sombra media */
--shadow-hover: 0 8px 40px rgba(0, 0, 0, 0.15);    /* Sombra hover */
```

**Uso:**
```css
.card {
  box-shadow: var(--shadow-soft);
}

.card:hover {
  box-shadow: var(--shadow-hover);
}
```

---

### Bordes Redondeados

**Archivo:** `scss/_variables.scss` → `:root`

```css
--radius-small: 5px;   /* Bordes sutiles */
--radius-medium: 10px; /* Bordes estándar */
--radius-large: 20px;  /* Bordes pronunciados */
--radius-pill: 50px;   /* Bordes completos (pastilla) */
```

**Uso:**
```css
.button {
  border-radius: var(--radius-medium); /* 10px */
}

.badge {
  border-radius: var(--radius-pill);   /* 50px - forma pastilla */
}
```

---

### Transiciones

**Archivo:** `scss/_variables.scss` → `:root`

```css
--transition: all 0.3s ease;       /* Transición estándar */
--transition-fast: all 0.2s ease;  /* Transición rápida */
--transition-slow: all 0.4s ease;  /* Transición lenta */
```

**Uso:**
```css
.button {
  transition: var(--transition);
}

.button:hover {
  transform: translateY(-2px);  /* Se anima suavemente */
}
```

---

## 📂 Desglose de Módulos SCSS

### Tabla de Módulos

| Archivo | Líneas | Propósito |
|---------|--------|-----------|
| `main.scss` | 22 | **Orquestador** - Importa todos los módulos en orden |
| `_variables.scss` | 70 | **Variables CSS** - Colores, espaciado, sombras, bordes, transiciones |
| `_reset.scss` | 15 | **Reset básico** - Normaliza estilos del navegador |
| `_header.scss` | 44 | **Header + Nav** - Barra navegación superior |
| `_hero.scss` | 79 | **Hero Banner** - Logo + imagen principal |
| `_buttons.scss` | 60 | **Botones** - primary, secondary, compact |
| `_popups.scss` | 211 | **Modales/Popups** - Animaciones de entrada/salida |
| `_sections.scss` | 763 | **Secciones** - TODO el contenido de páginas (MÁS GRANDE) |
| `_footer.scss` | 85 | **Footer** - 3 columnas (navegación, legal, redes) |
| `_responsive.scss` | 354 | **Media Queries** - 4 breakpoints responsivos |

**Total**: 10 módulos organizados (vs 753 líneas inline monolíticas ❌)

---

### ¿Qué archivo editar según la tarea?

| Quiero editar... | Archivo SCSS |
|------------------|--------------|
| Color beige/cyan/green | `_variables.scss` |
| Espaciado global | `_variables.scss` |
| Navegación del header | `_header.scss` |
| Logo + banner principal | `_hero.scss` |
| Botones (estilos/hover) | `_buttons.scss` |
| Modales Login/Registro | `_popups.scss` |
| Testimonios, membresía, blog | `_sections.scss` |
| Footer (columnas, redes) | `_footer.scss` |
| Tablet/móvil (responsive) | `_responsive.scss` |

---

## 📱 Responsive Design (4 Breakpoints)

### Breakpoints Definidos

**Archivo:** `scss/_variables.scss`

```scss
$breakpoint-mobile-small: 480px;   /* Móviles pequeños (iPhone SE) */
$breakpoint-tablet: 768px;         /* Tablets (iPad portrait) */
$breakpoint-desktop-small: 968px;  /* Desktop pequeño */
$breakpoint-desktop-large: 1200px; /* Desktop grande */
```

---

### Implementación en `_responsive.scss`

**Desktop grande** (por defecto):
```scss
/* Estilos base - se aplican a pantallas grandes (>1200px) */
.hero-banner {
  height: 500px;
}
```

**Desktop pequeño** (<1200px):
```scss
@media (max-width: 1200px) {
  .hero-banner {
    height: 450px;
  }
}
```

**Tablet** (<768px):
```scss
@media (max-width: 768px) {
  .hero-banner {
    height: 300px;
  }
  .popup-content {
    flex-direction: column;  /* Stack vertical en tablet */
  }
}
```

**Móvil** (<480px):
```scss
@media (max-width: 480px) {
  .hero-banner {
    height: 200px;
  }
  header nav {
    flex-direction: column;  /* Navegación vertical en móvil */
  }
}
```

---

### Testing Responsive

**DevTools (F12):**
1. Click en icono de dispositivo (Ctrl+Shift+M)
2. Seleccionar tamaños:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1024px)
   - Desktop grande (1920px)
3. Verificar que diseño se adapta correctamente

**Comando útil:**
```bash
grep "@media" scss/_responsive.scss  # Ver todas las media queries
```

---

## 🔄 Flujo de Trabajo Completo

### 1️⃣ Editar Código Fuente (SCSS)

```
Necesito cambiar el color del header
    ↓
Abro: scss/_header.scss
    ↓
Busco: .header-content { background: ... }
    ↓
Cambio: background: var(--color-beige);
    ↓
Guardo (Ctrl+S)
```

---

### 2️⃣ Compilar SCSS → CSS

**Opción A: Desarrollo activo** (recomendado)
```bash
npm run watch
```
- Auto-compila cada vez que guardas un `.scss`
- Se queda ejecutando en terminal
- Ideal para desarrollo continuo

**Opción B: Compilación manual**
```bash
npm run build
```
- Compila una sola vez
- Útil para cambios puntuales

**Resultado:**
- Se regenera `css/styles.css` con tus cambios
- El archivo compilado tiene ~1,000+ líneas (10 módulos combinados)

---

### 3️⃣ Ver Cambios en Navegador

```
Recargar página (F5)
    ↓
Si no ves cambios → Ctrl+F5 (forzar sin caché)
    ↓
Inspeccionar elemento (F12) para verificar estilos
```

---

## ⚠️ REGLAS CRÍTICAS (Detalladas)

### 🚫 NUNCA EDITAR `css/styles.css` DIRECTAMENTE

**¿Por qué?**
- Es un archivo **AUTO-GENERADO** por SASS
- Cada compilación (`npm run build`) lo **SOBREESCRIBE COMPLETAMENTE**
- Cualquier cambio manual **SE PIERDE** en la próxima compilación

**✅ Flujo correcto:**
```
1. Editar scss/_header.scss
2. Ejecutar npm run build
3. css/styles.css se regenera automáticamente
```

**❌ Flujo incorrecto:**
```
1. Editar css/styles.css directamente
2. Ejecutar npm run build
3. ⚠️ TUS CAMBIOS DESAPARECEN (sobreescritos)
```

**Analogía:**
- `scss/*.scss` = Código fuente (editamos aquí)
- `css/styles.css` = Ejecutable compilado (no tocar)

---

### ✅ SIEMPRE COMPILAR DESPUÉS DE EDITAR SCSS

**Protocolo obligatorio:**
1. Edito cualquier archivo `.scss`
2. **INMEDIATAMENTE** ejecuto `npm run build`
3. Confirmo que `css/styles.css` se actualizó (ver fecha modificación)
4. Recargo navegador (Ctrl+F5 para forzar sin caché)

**Sin excepciones.** Si edito SCSS y no compilo, los cambios NO se aplican al sitio.

**Mensaje de confirmación:**
Después de `npm run build`, deberías ver:
```
Compiled scss/main.scss to css/styles.css
```

---

### ⚡ NUNCA HARDCODEAR COLORES HEX

**❌ Incorrecto:**
```css
.mi-elemento {
  background: #e7cf9d;  /* Color hardcodeado */
  color: #898989;
}
```

**✅ Correcto:**
```css
.mi-elemento {
  background: var(--color-beige);  /* Variable CSS */
  color: var(--color-gray);
}
```

**Razón:**
- Si cambias `--color-beige` en `_variables.scss` → TODOS los elementos con ese color cambian
- Sin variables → Tendrías que buscar y reemplazar #e7cf9d en 20+ lugares

---

### 📏 SIEMPRE USAR VARIABLES DE ESPACIADO

**❌ Incorrecto:**
```css
.seccion {
  padding: 48px;        /* Valor hardcodeado */
  margin-bottom: 32px;
}
```

**✅ Correcto:**
```css
.seccion {
  padding: var(--spacing-lg);       /* 48px */
  margin-bottom: var(--spacing-md); /* 32px */
}
```

**Razón:** Espaciado consistente en todo el sitio

---

## 💡 Casos de Uso Comunes (Paso a Paso)

### 🎨 Cambiar un color global

**Escenario:** Quiero cambiar el beige por un tono más cálido

**Pasos:**
1. Abrir `scss/_variables.scss`
2. Buscar línea: `--color-beige: #e7cf9d;`
3. Cambiar valor: `--color-beige: #f4d8a3;` (nuevo tono)
4. Guardar archivo (Ctrl+S)
5. Ejecutar `npm run build` en terminal
6. Recargar navegador (Ctrl+F5)

**Resultado:** Todos los elementos con `var(--color-beige)` cambian automáticamente:
- Header
- Botones primary
- Badges
- Bordes de cards
- ... (20+ elementos)

---

### 🖼️ Ajustar espaciado de una sección

**Escenario:** Los testimonios necesitan más espacio arriba/abajo

**Pasos:**
1. Abrir `scss/_sections.scss` (763 líneas)
2. Buscar clase: `.testimonials-section` (Ctrl+F)
3. Encontrar: `padding: var(--spacing-md);` (actual: 32px)
4. Cambiar a: `padding: var(--spacing-lg);` (nuevo: 48px)
5. Guardar archivo
6. Ejecutar `npm run build`
7. Recargar navegador

**Resultado:** Sección testimonios tiene más padding

---

### 📱 Modificar comportamiento responsive

**Escenario:** En tablet (768px), quiero que el hero banner sea más alto

**Pasos:**
1. Abrir `scss/_responsive.scss`
2. Buscar media query: `@media (max-width: 768px)`
3. Buscar dentro: `.hero-banner { height: 300px; }`
4. Cambiar altura: `height: 400px;`
5. Guardar archivo
6. Ejecutar `npm run build`
7. Abrir DevTools (F12) → Responsive Mode → iPad (768px)
8. Verificar que banner tiene 400px de alto

---

### 🔘 Crear un nuevo botón

**Escenario:** Necesito un botón terciario con color green

**Pasos:**
1. Abrir `scss/_buttons.scss`
2. Agregar al final:
```scss
.btn-tertiary {
  background: var(--color-green);
  color: var(--color-white);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-medium);
  transition: var(--transition);

  &:hover {
    background: darken(#cae4b2, 10%);
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
  }
}
```
3. Guardar archivo
4. Ejecutar `npm run build`
5. Usar en HTML:
```html
<button class="btn-tertiary">Mi Botón Verde</button>
```

---

### 🎭 Editar animación de modal

**Escenario:** Los modales deben aparecer más lentamente

**Pasos:**
1. Abrir `scss/_popups.scss`
2. Buscar: `.modal` (animación de entrada)
3. Encontrar: `animation: slideDown 0.3s cubic-bezier(...)`
4. Cambiar duración: `animation: slideDown 0.5s cubic-bezier(...)`
5. Guardar archivo
6. Ejecutar `npm run build`
7. Recargar navegador
8. Click en "Iniciar Sesión" → Verificar animación más lenta

---

## 🔍 Debugging: ¿Qué hacer si algo falla?

### Problema 1: "Cambié SCSS pero no veo cambios"

**Solución paso a paso:**

1. **¿Compilaste?**
   ```bash
   npm run build
   ```
   Deberías ver: `Compiled scss/main.scss to css/styles.css`

2. **¿Recargaste navegador SIN caché?**
   - Ctrl+F5 (Windows/Linux)
   - Cmd+Shift+R (Mac)
   - Esto fuerza descarga del CSS nuevo

3. **¿El CSS se generó correctamente?**
   - Verificar fecha de `css/styles.css` (debe ser reciente)
   - Comando: `ls -l css/styles.css` (ver fecha modificación)

4. **¿El cambio está en el archivo correcto?**
   - Verifica que editaste `scss/_header.scss` (no `css/styles.css`)
   - Busca tu cambio en el archivo SCSS

5. **¿Hay errores en terminal?**
   - Si `npm run build` muestra errores, léelos
   - Indica línea y archivo con problema

---

### Problema 2: "Error al compilar SASS"

**Error típico:**
```
Error: Invalid CSS after "background": expected ";", was ": var(--color-beige"
```

**Solución:**
1. **Leer error en terminal** (indica línea y archivo)
   ```
   Error: scss/_header.scss:15
   ```
2. **Abrir archivo indicado**
   ```bash
   code scss/_header.scss:15  # Abre VSCode en línea 15
   ```
3. **Verificar sintaxis SCSS:**
   - Falta `;` al final de línea
   - Falta `}` para cerrar bloque
   - Variable no existe en `_variables.scss`

**Errores comunes:**
```scss
/* ❌ Falta punto y coma */
.header {
  background: var(--color-beige)  /* Error aquí */
  color: var(--color-gray);
}

/* ✅ Correcto */
.header {
  background: var(--color-beige);  /* ; agregado */
  color: var(--color-gray);
}
```

---

### Problema 3: "Los estilos se ven raros"

**Solución:**

1. **Inspeccionar elemento (F12)**
   - Click derecho en elemento → "Inspeccionar"
   - Ver qué CSS se está aplicando
   - Ver si hay estilos tachados (sobreescritos)

2. **Verificar especificidad CSS**
   ```css
   /* Baja especificidad (se sobreescribe fácil) */
   .button { color: red; }

   /* Alta especificidad (gana) */
   header nav .button { color: blue; }  /* Este color gana */
   ```

3. **Verificar orden de imports en `main.scss`**
   ```scss
   /* Orden correcto */
   @import 'variables';   /* 1. Variables primero */
   @import 'reset';       /* 2. Reset */
   @import 'header';      /* 3. Componentes */
   @import 'responsive';  /* 4. Responsive ÚLTIMO (override todo) */
   ```

4. **Buscar `!important` (evitar si es posible)**
   ```bash
   grep "!important" scss/*.scss  # Buscar usos
   ```

---

### Problema 4: "Responsive no funciona"

**Solución:**

1. **Abrir DevTools → Modo Responsive**
   - F12 → Click icono dispositivo (Ctrl+Shift+M)
   - Seleccionar iPhone SE (375px) o iPad (768px)

2. **Verificar breakpoints en `_responsive.scss`**
   ```scss
   @media (max-width: 768px) {
     /* Estos estilos se aplican en tablet/móvil */
   }
   ```

3. **Verificar que `_responsive.scss` se importa ÚLTIMO en `main.scss`**
   ```scss
   /* main.scss - orden correcto */
   @import 'variables';
   @import 'header';
   @import 'buttons';
   @import 'responsive';  /* ⬅️ ÚLTIMO para que sobreescriba estilos anteriores */
   ```

4. **Inspeccionar qué media queries se aplican**
   - F12 → Elemento → Ver estilos aplicados
   - Buscar `@media` en panel de estilos
   - Verificar que breakpoint correcto está activo

5. **Testing manual:**
   ```
   Desktop (1920px) → ¿Se ve bien?
   Laptop (1024px)  → ¿Se ve bien?
   Tablet (768px)   → ¿Se ve bien?
   Móvil (375px)    → ¿Se ve bien?
   ```

---

## ✅ Checklist para Trabajar con SCSS

### Antes de empezar
- [ ] Verificar que `node_modules/` existe (si no: `npm install`)
- [ ] Conocer qué módulo editar según la tarea (ver tabla arriba)
- [ ] Tener terminal abierta para compilar
- [ ] Leer esta Chuleta Técnica si tengo dudas

### Durante la edición
- [ ] Editar solo archivos `.scss` (NUNCA `css/styles.css`)
- [ ] Usar variables CSS existentes (consultar `_variables.scss`)
- [ ] Seguir convenciones BEM para nombres de clases
- [ ] Compilar después de cada cambio (`npm run build`)
- [ ] Verificar cambios en navegador (Ctrl+F5)

### Después de editar
- [ ] CSS compilado generado correctamente (`css/styles.css` actualizado)
- [ ] Cambios visibles en navegador
- [ ] Sin errores en consola del navegador (F12)
- [ ] Responsive funciona en 4 breakpoints
- [ ] Commit con mensaje descriptivo (si corresponde)
- [ ] Push a GitHub (si corresponde)

---

## 📈 Beneficios del Sistema SCSS Modular

### 1. Mantenibilidad
- ✅ **Archivos pequeños** (44-763 líneas cada uno vs 753+ monolíticas)
- ✅ **Buscar código es rápido** (sé exactamente qué archivo abrir)
- ✅ **Cambios globales en un solo lugar** (variables CSS)
- ✅ **Menos errores** (código organizado y localizado)

### 2. Escalabilidad
- ✅ **Fácil agregar nuevos módulos** (crear `_nuevo-modulo.scss`)
- ✅ **Reutilización mediante variables** (no duplicar colores/espaciado)
- ✅ **Preparado para crecer** (10 módulos hoy, 20+ mañana sin caos)

### 3. Eficiencia
- ✅ **90% menos tokens consumidos** al editar (leer 60 líneas vs 753)
- ✅ **Compilación rápida** (< 1 segundo)
- ✅ **CSS minificado para producción** (`npm run build:prod`)

### 4. Consistencia
- ✅ **Variables fuerzan uso de paleta definida** (no inventar colores)
- ✅ **Espaciado uniforme** en todo el sitio
- ✅ **Breakpoints consistentes** (4 puntos de quiebre estándar)

### 5. Colaboración
- ✅ **Múltiples personas** pueden editar módulos diferentes sin conflictos
- ✅ **Código autodocumentado** (variables con nombres claros)
- ✅ **Historial Git más claro** (commits por módulo: "Fix: header responsive")

---

## 📚 Recursos Adicionales

### Documentación del Proyecto

| Archivo | Propósito |
|---------|-----------|
| `Maestro_Serenamente.md` | Decisiones estratégicas y roadmap |
| `ARQUITECTURA-SERENAMENTE.md` | Sistema multi-tenant, Teresa→Regina→Ana |
| `CHULETA-TECNICA-SERENAMENTE.md` | Este archivo (guía técnica SCSS) |
| `CLAUDE.md` | Contexto para Claude Code |
| `TESTING-MULTITENANT.md` | Guía de testing multi-tenant |
| `package.json` | Scripts npm disponibles |
| `scss/main.scss` | Mapa de imports (ver orden de carga) |

### Documentación Externa

- [Documentación oficial SASS](https://sass-lang.com/documentation)
- [Variables CSS en MDN](https://developer.mozilla.org/es/docs/Web/CSS/Using_CSS_custom_properties)
- [Guía completa de Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Guía completa de Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

## 🎓 Conclusión

El sistema SCSS modular de Serenamente Vivir transforma un CSS monolítico difícil de mantener en una arquitectura organizada, escalable y eficiente.

**Puntos clave (memorizar):**

1. ✅ **NUNCA editar** `css/styles.css` (es auto-generado)
2. ✅ **SIEMPRE compilar** después de editar SCSS (`npm run build`)
3. ✅ **Usar variables CSS** para cambios globales (`var(--color-*)`)
4. ✅ **Editar el módulo correcto** según la tarea (ver tabla arriba)
5. ✅ **Mantener `npm run watch` activo** durante desarrollo

**El sistema está diseñado para escalar y ser mantenido por múltiples personas sin caos.**

---

**Versión**: 1.0
**Fecha**: 13-Dic-2025
**Autor**: Devito (Claude Code)
**Proyecto**: Serenamente Vivir - Website Marlene Sosa
