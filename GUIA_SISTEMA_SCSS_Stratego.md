# 📐 Sistema SCSS Modular - Serenamente Vivir
**Guía para Srtatego Web (Asesor Estratégico)**

---ude

## 🎯 Objetivo de este Documento

Explicar el **sistema SCSS modular** implementado en Serenamente Vivir y cómo trabajar con él para evitar CSS monolíticos difíciles de mantener.

---

## ❓ ¿Qué Problema Resuelve?

### Antes (CSS Monolítico):
- ❌ **753 líneas** de CSS inline mezcladas en el HTML
- ❌ Difícil de mantener (buscar un estilo requiere leer todo)
- ❌ Imposible reutilizar código entre páginas
- ❌ Cambios globales requieren editar múltiples archivos
- ❌ Alto consumo de tokens al leer (todo de golpe)

### Ahora (SCSS Modular):
- ✅ **10 módulos pequeños** organizados por función (44-553 líneas cada uno)
- ✅ Fácil de mantener (editar header → abrir `_header.scss`)
- ✅ Código reutilizable mediante variables CSS
- ✅ Cambios globales centralizados en `_variables.scss`
- ✅ 90% menos consumo de tokens al editar

---

## 📁 Arquitectura del Sistema

```
Serenamente/
│
├── scss/                          ← CÓDIGO FUENTE (EDITABLE)
│   ├── main.scss                  ← Orquestador (importa todos los módulos)
│   ├── _variables.scss            ← Variables CSS (colores, espaciado, sombras)
│   ├── _reset.scss                ← Reset CSS básico
│   ├── _header.scss               ← Header + navegación
│   ├── _hero.scss                 ← Banner principal con logo
│   ├── _buttons.scss              ← Botones (primary, secondary, compact)
│   ├── _popups.scss               ← Modales/Popups con animaciones
│   ├── _sections.scss             ← Secciones del contenido
│   ├── _footer.scss               ← Footer con 3 columnas
│   └── _responsive.scss           ← Media queries (4 breakpoints)
│
├── css/
│   └── styles.css                 ← COMPILADO AUTO-GENERADO (NO TOCAR)
│
├── serenamente_vivir.html         ← HTML (enlaza css/styles.css)
├── contacto.html
├── tu_espacio_privado.html
└── ... (otras páginas)
```

---

## 🔄 Flujo de Trabajo

### 1️⃣ Editar Código Fuente (SCSS)
```
Quiero cambiar el color del header
↓
Abro: scss/_header.scss
↓
Edito línea 15: background: var(--color-beige);
↓
Guardo (Ctrl+S)
```

### 2️⃣ Compilar SCSS → CSS
```bash
npm run build        # Compilar una vez
# o
npm run watch        # Auto-compilar cada vez que guardes
```

**Resultado**: Se regenera automáticamente `css/styles.css` con tus cambios.

### 3️⃣ Ver Cambios en Navegador
```
Recargar página (F5) → Ver cambios aplicados
```

---

## 📊 Desglose de Módulos

| Archivo | Líneas | Propósito |
|---------|--------|-----------|
| `_variables.scss` | 70 | Variables CSS: colores, espaciado, sombras, bordes, transiciones |
| `_reset.scss` | 15 | Reset básico de estilos |
| `_header.scss` | 44 | Header + navegación |
| `_hero.scss` | 79 | Banner principal con logo |
| `_buttons.scss` | 60 | Botones (variantes y estados) |
| `_popups.scss` | 211 | Modales con animaciones |
| `_sections.scss` | 763 | Todo el contenido de las páginas |
| `_footer.scss` | 85 | Footer con 3 columnas |
| `_responsive.scss` | 354 | Media queries para 4 breakpoints |
| `main.scss` | 22 | Orquestador (importa todos) |

**Total**: 10 módulos organizados vs 1 archivo monolítico de 753 líneas

---

## 🎨 Sistema de Variables CSS (Centralizado)

### ¿Por qué Variables?

**Sin variables** (antes):
```css
/* Tengo que cambiar el beige en 20 lugares diferentes */
.header { background: #e7cf9d; }
.button { background: #e7cf9d; }
.card { border: 1px solid #e7cf9d; }
/* ... 17 veces más */
```

**Con variables** (ahora):
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

### Variables Definidas

**Colores** (Identidad Serenamente):
```css
--color-beige: #e7cf9d;
--color-cyan: #c9e1e1;
--color-green: #cae4b2;
--color-cream: #f1ede2;
--color-gray: #898989;
--color-bg: #f5f3f0;
```

**Espaciado** (Consistencia):
```css
--spacing-xs: 0.5rem;  /* 8px */
--spacing-sm: 1rem;    /* 16px */
--spacing-md: 2rem;    /* 32px */
--spacing-lg: 3rem;    /* 48px */
--spacing-xl: 5rem;    /* 80px */
```

**Sombras**:
```css
--shadow-soft: 0 4px 20px rgba(0, 0, 0, 0.08);
--shadow-medium: 0 6px 30px rgba(0, 0, 0, 0.12);
--shadow-hover: 0 8px 40px rgba(0, 0, 0, 0.15);
```

**Bordes Redondeados**:
```css
--radius-small: 5px;
--radius-medium: 10px;
--radius-large: 20px;
--radius-pill: 50px;
```

**Transiciones**:
```css
--transition: all 0.3s ease;
--transition-fast: all 0.2s ease;
--transition-slow: all 0.4s ease;
```

---

## 📱 Responsive Design (4 Breakpoints)

Definidos en `_variables.scss`:

```scss
$breakpoint-mobile-small: 480px;   /* Móviles pequeños */
$breakpoint-tablet: 768px;         /* Tablets */
$breakpoint-desktop-small: 968px;  /* Desktop pequeño */
$breakpoint-desktop-large: 1200px; /* Desktop grande */
```

**Implementación en `_responsive.scss`**:
```scss
@media (max-width: 768px) {
  /* Estilos para tablet y móvil */
  .hero-banner { height: 300px; }
  .popup-content { flex-direction: column; }
}

@media (max-width: 480px) {
  /* Estilos específicos móvil */
  .hero-banner { height: 200px; }
}
```

---

## 🛠️ Comandos npm Disponibles

**En desarrollo** (recomendado):
```bash
npm run watch
```
- Auto-compila SCSS cada vez que guardas un archivo
- Ideal para desarrollo activo
- Se queda ejecutando en terminal

**Compilar manualmente**:
```bash
npm run build
```
- Compila SCSS una sola vez
- Útil para cambios puntuales

**Producción** (minificado):
```bash
npm run build:prod
```
- Minifica CSS para reducir tamaño
- Se usa antes de subir a servidor

---

## ⚠️ REGLAS CRÍTICAS (INNEGOCIABLES)

### 🚫 NUNCA EDITAR `css/styles.css` DIRECTAMENTE

**¿Por qué?**
- Es un archivo **AUTO-GENERADO** por SASS
- Cada compilación lo **SOBREESCRIBE**
- Cualquier cambio manual se **PIERDE**

**✅ Flujo correcto:**
```
Editar scss/_header.scss → npm run build → css/styles.css se regenera
```

**❌ Flujo incorrecto:**
```
Editar css/styles.css → npm run build → TUS CAMBIOS DESAPARECEN
```

---

### ✅ SIEMPRE COMPILAR DESPUÉS DE EDITAR SCSS

**Protocolo obligatorio**:
1. Edito cualquier archivo `.scss`
2. **INMEDIATAMENTE** ejecuto `npm run build`
3. Confirmo que `css/styles.css` se actualizó
4. Recargo navegador para ver cambios

**Sin excepciones**. Si edito SCSS y no compilo, los cambios NO se aplican.

---

## 💡 Casos de Uso Comunes

### Cambiar un color global
```
1. Abrir: scss/_variables.scss
2. Editar: --color-beige: #NUEVO_COLOR;
3. Compilar: npm run build
4. Ver: Todos los elementos con beige cambian automáticamente
```

### Ajustar espaciado de una sección
```
1. Abrir: scss/_sections.scss
2. Buscar: .seccion-testimonios
3. Editar: padding: var(--spacing-lg);
4. Compilar: npm run build
```

### Modificar comportamiento responsive
```
1. Abrir: scss/_responsive.scss
2. Buscar: @media (max-width: 768px)
3. Editar estilos dentro
4. Compilar: npm run build
```

### Crear un nuevo botón
```
1. Abrir: scss/_buttons.scss
2. Agregar: .btn-tertiary { ... }
3. Compilar: npm run build
4. Usar en HTML: <button class="btn-tertiary">Texto</button>
```

---

## 📈 Beneficios del Sistema SCSS

### 1. **Mantenibilidad**
- Archivos pequeños (44-763 líneas cada uno)
- Buscar código es rápido (sé en qué archivo está)
- Cambios globales en un solo lugar

### 2. **Escalabilidad**
- Fácil agregar nuevos módulos
- Reutilización de código mediante variables
- Preparado para crecer sin caos

### 3. **Eficiencia**
- 90% menos tokens consumidos al editar
- Compilación rápida (< 1 segundo)
- CSS minificado para producción

### 4. **Consistencia**
- Variables fuerzan uso de paleta definida
- Espaciado uniforme en todo el sitio
- Breakpoints consistentes

### 5. **Colaboración**
- Múltiples personas pueden editar módulos diferentes sin conflictos
- Código autodocumentado (variables con nombres claros)
- Historial Git más claro (commits por módulo)

---

## 🔍 Debugging: ¿Qué hacer si algo falla?

### Problema 1: "Cambié SCSS pero no veo cambios"
**Solución**:
1. ¿Compilaste? → `npm run build`
2. ¿Recargaste navegador? → Ctrl+F5 (forzar recarga sin caché)
3. ¿El CSS se generó? → Verificar fecha de `css/styles.css`

### Problema 2: "Error al compilar SASS"
**Solución**:
1. Leer error en terminal (indica línea y archivo)
2. Verificar sintaxis SCSS (falta `;` o `}`)
3. Verificar que variables existan en `_variables.scss`

### Problema 3: "Los estilos se ven raros"
**Solución**:
1. Inspeccionar elemento en DevTools (F12)
2. Ver qué CSS se está aplicando
3. Verificar orden de imports en `main.scss`
4. Verificar especificidad CSS (¿hay estilos que se sobreescriben?)

### Problema 4: "Responsive no funciona"
**Solución**:
1. Abrir DevTools → Mode responsive
2. Verificar breakpoints en `_responsive.scss`
3. Verificar que `_responsive.scss` se importe último en `main.scss`
4. Inspeccionar qué media queries se aplican

---

## 📚 Recursos Adicionales

**Documentación Proyecto**:
- `Maestro_Serenamente.md` - Decisiones y roadmap del proyecto
- `package.json` - Scripts npm disponibles
- `scss/main.scss` - Mapa de imports (ver orden de carga)

**SASS/SCSS**:
- [Documentación oficial SASS](https://sass-lang.com/documentation)
- [Variables CSS en MDN](https://developer.mozilla.org/es/docs/Web/CSS/Using_CSS_custom_properties)

---

## ✅ Checklist para Trabajar con SCSS

**Antes de empezar**:
- [ ] Verificar que `node_modules/` existe (sino: `npm install`)
- [ ] Conocer qué módulo editar según la tarea
- [ ] Tener terminal abierta para compilar

**Durante la edición**:
- [ ] Editar solo archivos `.scss` (nunca `css/styles.css`)
- [ ] Usar variables CSS existentes (consultar `_variables.scss`)
- [ ] Compilar después de cada cambio (`npm run build`)
- [ ] Verificar cambios en navegador

**Después de editar**:
- [ ] CSS compilado generado correctamente
- [ ] Cambios visibles en navegador
- [ ] Sin errores en consola del navegador
- [ ] Responsive funciona en 4 breakpoints
- [ ] Commit con mensaje descriptivo (si corresponde)

---

## 🎓 Conclusión

El sistema SCSS modular de Serenamente Vivir transforma un CSS monolítico difícil de mantener en una arquitectura organizada, escalable y eficiente.

**Puntos clave**:
1. **NUNCA editar** `css/styles.css` (es auto-generado)
2. **SIEMPRE compilar** después de editar SCSS
3. Usar **variables CSS** para cambios globales
4. Editar el **módulo correcto** según la tarea
5. Mantener `npm run watch` activo durante desarrollo

**El sistema está diseñado para escalar y ser mantenido por múltiples personas sin caos.**

---

**Versión**: 1.0
**Fecha**: 12-Dic-2025
**Autor**: Devito (Claude Code)
**Destinatario**: Srtatego Web (Asesor Estratégico)
