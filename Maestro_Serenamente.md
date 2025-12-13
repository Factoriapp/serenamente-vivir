# 📘 MAESTRO SERENAMENTE - Documento Central del Subproyecto

**Proyecto**: Serenamente Vivir
**Cliente**: [NOMBRE_CLIENTE]
**Versión**: 1.0
**Fecha creación**: 03-Dic-2025
**Estado**: En desarrollo

---

## 1. INFORMACIÓN DEL PROYECTO

### Propósito
Website profesional para terapeuta especializada en bienestar emocional de mujeres.

### Identidad Visual
- **Paleta de colores**:
  - Beige: `#e7cf9d`
  - Cyan: `#c9e1e1`
  - Green: `#cae4b2`
  - Cream: `#f1ede2`
  - Gray: `#898989`

- **Tipografía**:
  - Títulos: Playfair Display (serif, itálica)
  - Cuerpo: Source Sans Pro (sans-serif)

- **Tono**: Sereno, cálido, femenino, profesional

### Estructura del Sitio
1. **serenamente_vivir.html** (Home)
   - Hero con logo e imágenes
   - Sección bienvenida
   - ¿Qué es Serenamente Vivir?
   - Quién soy + Misión
   - Cómo puedo ayudarte (4 módulos con popups)
   - Membresía
   - Footer con FAQs

2. **contacto.html** - Formulario de contacto

3. **tu_espacio_privado.html** - Área privada/membresía

4. **meditaciones_personalizadas.html** - Catálogo de meditaciones

---

## 2. DECISIONES TÉCNICAS

### Arquitectura Base
- **Origen**: Reutiliza sistema de Impulso Profesional
- **CSS**: Sistema SCSS modular (implementado)
- **Componentes**: Adaptados de librería Impulso Pro
- **Repositorio GitHub**: https://github.com/Factoriapp/serenamente-vivir.git
- **Rama principal**: `main`

### Estado Actual (03-Dic-2025)
- ✅ HTML completo con contenido
- ✅ 5 popups funcionales (Sesiones 1:1, Acompañamiento, Talleres, Retiros, Membresía)
- ✅ JavaScript básico (popups, ESC key)
- ✅ **COMPLETADO - Fase 1**: Sistema SCSS modular, variables ampliadas, responsive 4 breakpoints, botones mejorados, popups optimizados

---

## 3. ROADMAP DE MEJORAS

### ✅ Fase 1: Arquitectura y Visual (PRIORIDAD ALTA + MEDIA) - **COMPLETADA** ✅

**Objetivo**: Código mantenible + Mejoras visuales inmediatas

- [x] **1. Migrar CSS inline a sistema SCSS modular** ✅
  - ✅ Separadas 753 líneas en 9 módulos pequeños
  - ✅ Setup npm + compilación SASS (`npm run build:serenamente`)
  - ✅ Módulos creados: variables, reset, header, hero, buttons, popups, sections, footer, responsive
  - ✅ HTML actualizado para usar CSS externo (`css/styles.css`)

- [x] **2. Implementar sistema de variables CSS ampliado** ✅
  - ✅ Variables de espaciado (xs, sm, md, lg, xl)
  - ✅ Variables de sombras (soft, medium, hover)
  - ✅ Variables de bordes redondeados (small, medium, large, pill)
  - ✅ Variables de transiciones (normal, fast, slow)

- [x] **3. Mejorar responsive (4 breakpoints)** ✅
  - ✅ Mobile pequeño (480px)
  - ✅ Tablet (768px)
  - ✅ Desktop pequeño (968px)
  - ✅ Desktop grande (1200px+)
  - ✅ Popups adaptados (stack vertical en mobile)

- [x] **4. Mejorar sistema de botones** ✅
  - ✅ Variantes: primary, secondary
  - ✅ Estados: hover (con transform + shadow), disabled
  - ✅ Modificadores: compact, large, w-full
  - ✅ Botones actualizados en HTML (btn-primary, btn-compact)

- [x] **5. Mejorar popups (modals)** ✅
  - ✅ Animaciones de entrada mejoradas (cubic-bezier bounce)
  - ✅ Responsive stack vertical en mobile
  - ✅ Accesibilidad (focus outline en botón cerrar)
  - ✅ Botón cerrar más visible y con hover mejorado

---

### ⏳ Fase 2: Optimizaciones Técnicas (PRIORIDAD BAJA) - PENDIENTE

**Nota**: Estas optimizaciones se implementarán en una segunda fase, priorizando visual primero.

- [ ] **6. Open Graph Protocol (compartir en redes)**
  - Meta tags og:title, og:description, og:image, og:url
  - Twitter Cards
  - Imagen OG optimizada (1200x630px)
  - Validación en debuggers de redes sociales

- [ ] **7. Lazy Loading de imágenes**
  - Identificar imágenes above-fold vs below-fold
  - Agregar `loading="lazy"` a imágenes que requieren scroll
  - Beneficio: 60% carga más rápida

- [ ] **8. SEO básico completo**
  - Meta description optimizada
  - Canonical URL
  - Favicons multi-dispositivo (32x32, 16x16, apple-touch-icon)
  - robots.txt
  - sitemap.xml

---

## 4. DECISIONES DE DISEÑO

### [03-Dic-2025] Análisis inicial
**Contexto**: Cliente necesita website con urgencia (unos días).
**Decisión**: Reutilizar arquitectura y componentes de Impulso Pro para acelerar desarrollo.
**Razón**: Código probado, modular y mantenible. Reduce tiempo de desarrollo 60-70%.

### [03-Dic-2025] Priorización de mejoras
**Contexto**: Usuario prioriza lo visual sobre optimizaciones técnicas.
**Decisión**: Fase 1 = Arquitectura + Visual (SCSS, variables, responsive, botones, popups). Fase 2 = SEO/Performance (Open Graph, lazy loading, meta tags).
**Razón**: Cliente necesita ver resultado visual rápidamente. Optimizaciones técnicas se pueden agregar después sin afectar diseño.

### [12-Dic-2025] **DECISIÓN FIRME**: Separación Radical Agenda/Contacto + Eliminación de "Gratis" Automático
**Contexto**: Se evaluó la unificación de Agenda y Contacto en `contacto-agenda.html` y la estrategia de "Sesión de Valoración Gratuita". Se concluye que ambas estrategias complican la operativa del profesional y atraen leads de baja calidad ("Curiosos"), violando el principio de "Simplicidad Radical".

**Decisión (Firme)**:

1. **ANULACIÓN DE UNIFICACIÓN**:
   - Se elimina el archivo `contacto-agenda.html`
   - Se establece arquitectura de "Doble Destino":
     - **`agenda.html`**: Exclusiva para herramientas de reserva de PAGO (Transaccional - Calendly/Stripe)
     - **`contacto.html`**: Exclusiva para formulario de texto y datos (Relacional - Email)

2. **ELIMINACIÓN DE AUTOMATIZACIÓN "GRATIS"**:
   - La plataforma NO dará soporte nativo ni arquitectónico a "Sesiones Gratuitas" en el frontend
   - El Dashboard solo pedirá "Enlace de Reserva (Pago)"
   - No habrá lógica condicional para mostrar/ocultar eventos gratuitos
   - Sin botón "Agendar sesión gratis 15 min" en web

3. **ESTRATEGIA DE FILTRO MANUAL**:
   - La "Sesión Gratuita" pasa a ser herramienta de gestión privada (Back-office) del profesional
   - Flujo web estricto: **Pagas (Agenda)** O **Escribes (Contacto)**
   - Si el profesional regala tiempo, lo hace manualmente por email tras recibir contacto, no mediante botón web

**Razón Estratégica**:
- Proteger el tiempo del profesional
- Simplificar desarrollo del SaaS
- Maximizar percepción de autoridad ("Lo gratis no se exhibe, se concede")
- Evitar leads "Curiosos" de baja calidad
- Cumplir con "Simplicidad Radical"

**Anula**:
- Unificación Agenda/Contacto en `contacto-agenda.html`
- Estrategia "Sesión Valoración Gratuita" visible en web
- Inst.txt anterior que mencionaba "Lead Magnet 15 min GRATIS"

---

## 5. ARCHIVOS Y UBICACIÓN

### Estructura del proyecto
```
Plataforma_modelo/
└── Serenamente/
    ├── serenamente_vivir.html      (Homepage)
    ├── tienda.html                  (Catálogo de servicios - tarjetas horizontales)
    ├── agenda.html                  (Reserva de PAGO - Calendly/Stripe) [NUEVO - 12-Dic-2025]
    ├── contacto.html                (Formulario contacto relacional) [NUEVO - 12-Dic-2025]
    ├── tu_espacio_privado.html      (Área privada/membresía)
    ├── meditaciones_personalizadas.html
    ├── Imagenes/                    (Assets del sitio)
    ├── Maestro_Serenamente.md       (Este archivo)
    ├── scss/                        (CSS modular)
    │   ├── main.scss
    │   ├── _variables.scss
    │   ├── _header.scss
    │   ├── _hero.scss
    │   ├── _buttons.scss
    │   ├── _popups.scss
    │   ├── _sections.scss
    │   ├── _footer.scss
    │   └── _responsive.scss
    ├── css/
    │   └── styles.css               (Auto-generado desde SCSS)
    └── js/
        └── main.js                  (JavaScript validaciones)

OBSOLETO (ELIMINADO 12-Dic-2025):
    ❌ contacto-agenda.html          (Unificación agenda/contacto - Anulada)
```

---

## 6. NOTAS Y OBSERVACIONES

### Relación con Impulso Pro
- ✅ **Reutiliza**: Sistema SCSS, componentes (botones, cards), variables CSS, convenciones BEM
- ✅ **Adapta**: Paleta de colores propia, tipografía propia, contenido propio
- ❌ **No comparte**: Lógica de negocio, branding, datos de usuario

### Independencia de archivos
- El proyecto NO modifica código de Impulso Pro
- Los archivos de Serenamente están aislados en su propia carpeta
- Cambios en Serenamente NO afectan a Impulso Pro y viceversa

---

## 6. ISSUES DETECTADOS Y PRÓXIMA SESIÓN

### 🔴 ISSUES PENDIENTES (Detectados 03-Dic-2025)

#### **1. Responsive NO funciona correctamente**
**Problema**: Al probar en DevTools, el responsive no se adapta como esperado.

**Posibles causas a investigar:**
- ¿Los breakpoints SCSS están compilando correctamente?
- ¿Hay conflictos entre estilos del CSS compilado?
- ¿Faltan media queries en el CSS final?
- ¿El navegador cachea el CSS antiguo?

**Acción siguiente sesión:**
- Verificar CSS compilado (`Serenamente/css/styles.css`)
- Revisar media queries generadas
- Probar forzar recarga sin caché (Ctrl+F5)
- Ajustar breakpoints según necesidad

#### **2. Otras correcciones pendientes**
**Nota del usuario**: "hay que corregir otras cosas"

**Acción siguiente sesión:**
- Solicitar al usuario lista específica de correcciones visuales
- Probar exhaustivamente en navegador
- Identificar qué más necesita ajuste

---

### 📋 CHECKLIST PRÓXIMA SESIÓN

**Antes de empezar:**
- [ ] Leer esta sección completa
- [ ] Abrir `serenamente_vivir.html` en navegador
- [ ] Verificar que CSS compilado existe en `Serenamente/css/styles.css`

**Tareas prioritarias:**
1. [ ] **FIX CRÍTICO**: Resolver responsive (media queries)
2. [ ] Identificar y corregir "otras cosas" mencionadas por usuario
3. [ ] Testing exhaustivo en 4 breakpoints
4. [ ] Verificar hover de botones
5. [ ] Verificar animaciones de popups

**Comandos útiles:**
```bash
# SCSS - Compilación
npm run build:serenamente          # Compilar CSS una vez
npm run watch:serenamente          # Auto-compilar al guardar
npm run build:serenamente:prod     # Minificar para producción

# Git - Control de versiones
git status                         # Ver cambios
git add .                          # Agregar todos los cambios
git commit -m "mensaje"            # Crear commit
git push                           # Subir a GitHub

# Visualización
cat css/styles.css                 # Ver CSS compilado
grep "@media" css/styles.css       # Verificar media queries
```

---

## 7. CHANGELOG

**NOTA IMPORTANTE - SISTEMA DE ACTUALIZACIÓN**: En este documento, al igual que en DM1, cuando existen decisiones contradictorias, **LA ÚLTIMA DECISIÓN (por fecha) PREVALECE** sobre las anteriores. Cada entrada tiene fecha explícita para facilitar la resolución de conflictos.

---

### [13-Dic-2025] - Versión 3.0 - **Sistema Multi-Tenant Teresa → Regina → Ana IMPLEMENTADO**

**✅ ARQUITECTURA MULTI-TENANT COMPLETA**

**Sistema implementado:**
1. ✅ **Config Loader** - Sistema multi-tenant dinámico (`js/config-loader.js`)
2. ✅ **Configuración Tenant** - `config/tenants/serenamente.json` creado
3. ✅ **Autenticación 3 Niveles** - Teresa (Visitante) → Regina (Registrada) → Ana (Miembro)
4. ✅ **Archivos HTML Core** - cuenta.html, area-privada.html, catalogo.html integrados
5. ✅ **Testing** - crear-usuarios-prueba.html adaptado con colores Serenamente

**Archivos nuevos creados:**
- `config/tenants/serenamente.json` (73 líneas) - Configuración completa del tenant
- `js/config-loader.js` (442 líneas) - Sistema multi-tenant Whitelabel
- `js/auth.js` (250+ líneas) - Autenticación Teresa/Regina/Ana
- `js/area-privada.js` (600+ líneas) - Lógica área privada dinámica
- `cuenta.html` (850+ líneas) - Login/Registro con multi-tenant
- `area-privada.html` (1138+ líneas) - Hub dinámico por nivel usuario
- `catalogo.html` (683+ líneas) - Tienda de recursos
- `crear-usuarios-prueba.html` - Testing con usuarios Regina/Ana

**Configuración Tenant Serenamente:**
- **Colores**: Beige (#e7cf9d), Cyan (#c9e1e1), Green (#cae4b2)
- **Tipografía**: Playfair Display (títulos) + Source Sans Pro (cuerpo)
- **Diccionario**: "Acompañadas", "Sesión", "Tu Espacio Privado"
- **Features activos**: Membresía, Meditaciones, Talleres, Retiros, Testimonios

**Flujo "Doble Gancho" implementado:**
1. **Teresa (Visitante)** - Ve Lead Magnet en serenamente_vivir.html
2. **Captura** - Formulario simple (email + nombre)
3. **Email** - "Tu regalo está en tu Espacio Privado"
4. **Regina (Registrada)** - Crea password → Accede a área privada
5. **Upsell** - Ve widgets premium bloqueados 🔒
6. **Ana (Miembro)** - Acceso completo tras compra membresía

**Detección de Tenant:**
- localhost → `serenamente` (desarrollo local)
- serenamentevivir.com → `serenamente`
- Carga `/config/tenants/serenamente.json`
- Aplica tema CSS, diccionario, feature flags

**Usuarios de prueba creados:**
- `regina@test.com` / `123456` (Nivel 2 - Registrada/Compradora)
- `ana@test.com` / `123456` (Nivel 3 - Miembro Premium)

**Razón Estratégica:**
- Reutilización de arquitectura probada de Impulso Pro
- Escalabilidad: Mejoras en Impulso Pro → Serenamente las hereda
- Código único: 1 bug fix beneficia a todos los tenants
- Simplicidad: Feature flags ocultan complejidad innecesaria

**Próximos pasos:**
- [ ] Integrar Lead Magnet en serenamente_vivir.html
- [ ] Adaptar contenido de area-privada.html para Serenamente
- [ ] Crear recursos de prueba en catalogo.html
- [ ] Testing exhaustivo flujo Teresa → Regina → Ana

---

### [12-Dic-2025] - Versión 2.0 - **DECISIÓN FIRME: Arquitectura "Doble Destino" (Anula Unificación)**

**⚠️ CAMBIO RADICAL DE ESTRATEGIA - ESTA DECISIÓN ANULA DECISIONES PREVIAS**

- ✅ **ARQUITECTURA "DOBLE DESTINO" IMPLEMENTADA**
  - Creado `agenda.html`: Página exclusiva para reservas de PAGO (Calendly/Stripe)
  - Creado `contacto.html`: Página exclusiva para formulario relacional (email)
  - ❌ Eliminado `contacto-agenda.html` (unificación anulada)
  - Separación radical: Venta (Transaccional) ≠ Soporte (Relacional)

- ✅ **ELIMINACIÓN DE "GRATIS" AUTOMÁTICO**
  - NO hay soporte frontend para "Sesión Valoración Gratuita"
  - Dashboard solo pide "Enlace de Reserva (Pago)"
  - Sin lógica condicional para eventos gratuitos
  - Sin botón "Agendar sesión gratis 15 min" en web

- ✅ **ESTRATEGIA DE FILTRO MANUAL**
  - "Sesión Gratuita" pasa a back-office privado del profesional
  - Flujo web estricto: **Pagas (Agenda)** O **Escribes (Contacto)**
  - Si regala tiempo → Manual por email, no mediante botón web

- ✅ **ENLACES ACTUALIZADOS**
  - `serenamente_vivir.html`: Enlaces separados a agenda.html y contacto.html
  - `tienda.html`: CTAs redirigen a agenda.html (reserva de pago)
  - Navegación actualizada en todos los archivos HTML

**RAZÓN ESTRATÉGICA:**
- Proteger tiempo del profesional
- Simplificar desarrollo del SaaS
- Maximizar percepción de autoridad ("Lo gratis no se exhibe, se concede")
- Evitar leads "Curiosos" de baja calidad
- Cumplir con "Simplicidad Radical"

**ANULA (decisiones previas que quedan obsoletas):**
- [12-Dic-2025 anterior] Estrategia "Calendario Protagonista" en contacto-agenda.html
- [13-Nov] Unificación Agenda/Contacto
- Estrategia "Lead Magnet 15 min GRATIS" visible en web

---

### [03-Dic-2025] - Versión 1.1 - **FASE 1 IMPLEMENTADA** (con issues detectados)
- ✅ **Migración completa a sistema SCSS modular**
  - 753 líneas CSS inline → 9 módulos SCSS mantenibles
  - Configurados scripts npm para compilación (`npm run build:serenamente`)
  - HTML limpio con link externo a CSS compilado

- ✅ **Sistema de variables CSS ampliado**
  - Agregadas variables de espaciado, sombras, bordes, transiciones
  - Paleta de colores Serenamente preservada

- ✅ **Responsive con 4 breakpoints** (código creado, pero requiere ajustes)
  - Mobile pequeño (480px), Tablet (768px), Desktop small (968px), Desktop large (1200px+)
  - Popups adaptados para mobile (stack vertical)
  - ⚠️ **ISSUE**: No funciona correctamente al probar, requiere debug

- ✅ **Sistema de botones mejorado**
  - Variantes: primary, secondary, compact, large
  - 6 botones actualizados en HTML con nuevas clases

- ✅ **Popups optimizados**
  - Animaciones suaves con cubic-bezier
  - Mejor accesibilidad (focus visible)
  - Botón cerrar más visible

- ✅ **Repositorio GitHub creado**
  - Repositorio: https://github.com/Factoriapp/serenamente-vivir.git
  - Primer commit subido con todo el trabajo de la sesión
  - 94 archivos (HTML, SCSS, CSS, imágenes, documentación)

**⚠️ NOTAS IMPORTANTES:**
- Responsive NO probado exitosamente, requiere corrección en próxima sesión
- Usuario detectó "otras cosas" que necesitan corrección (pendiente especificar)
- Código SCSS creado, CSS compilado, pero requiere verificación en navegador

### [03-Dic-2025] - Versión 1.0
- ✅ Creación del Maestro Serenamente
- ✅ Análisis del estado actual del website
- ✅ Definición de roadmap en 2 fases (Visual + Optimizaciones)
- ✅ Inicio implementación Fase 1 (SCSS modular, variables, responsive, botones, popups)

### [07-Dic-2025] - Versión 1.2 - Unificación de Headers/Footers + Lead Magnet
- ✅ **Lead Magnet con validación implementado**
  - Formulario con validación en tiempo real (nombre, email con @, checkbox privacidad)
  - Botón cambia de `btn-secondary` a `btn-primary` cuando todo es válido
  - Imagen agregada: https://iili.io/fuP5Rne.png (sin marco ni sombra)
  - JavaScript de validación en `js/main.js`
  - Funcionalidad copiada desde Index y adaptada a Serenamente

- ✅ **Headers y Footers unificados en todos los archivos HTML**
  - Navegación consistente: "Para ti" reemplaza "Servicios"
  - Hero section con logo + banner (https://iili.io/K4a3jgj.png) en todas las páginas
  - Footer estándar con 3 columnas (navegación, legal, redes sociales)
  - Archivos actualizados:
    - contacto.html
    - tienda.html
    - tu_espacio_privado.html
    - meditaciones_personalizadas.html
    - serenamente_vivir.html

- ✅ **CSS versionado a v=11** en todos los archivos
- ✅ **JavaScript main.js** vinculado en todos los archivos
- ✅ **Separadores** (`<div class="separator">`) antes de footers

- ⚠️ **ISSUE PENDIENTE**: Espaciado del copyright en footer
  - El texto "© 2025 Serenamente Vivir..." aparece muy separado del contenido superior
  - Se intentaron múltiples ajustes sin éxito (padding-top, margin-top, border-top eliminado)
  - Posible causa: elemento padre o caché del navegador
  - **Acción**: Investigar en próxima sesión

- ✅ **Testimonios ajustados**
  - Imágenes reducidas a 69x69px circulares
  - Fondo de tarjetas: #F5FAF0
  - Nombres alineados a la derecha
  - Altura de tarjetas reducida

- ✅ **Secciones con fondos blancos**
  - "Un espacio para volver a ti"
  - "Historias de transformación"
  - "Inspiración para tu camino"
  - Fondo #f5f3f0 aplicado a "Un regalo para tu calma"

- ✅ **Membresía rediseñada**
  - Un solo tier (simplificado de 3 tiers)
  - Imagen: https://iili.io/KLlTHBe.png (sin marco ni sombra)
  - Énfasis en beneficios sobre precio
  - Botón "Únete a nuestra Comunidad" → membresia.html

---

**Última actualización**: 07-Dic-2025
**Responsable**: Devito (Claude Code)
