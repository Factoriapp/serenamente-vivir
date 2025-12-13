PROYECTO: SERENAMENTE VIVIR
DOCUMENTO MAESTRO (DM SERENAMENTE)
Actualizado al: 13 de Diciembre de 2025

---

## 1. INFORMACIÓN DEL PROYECTO

**Cliente**: Marlene Sosa
**Dominio**: serenamentevivir.com
**Repositorio**: https://github.com/Factoriapp/serenamente-vivir.git
**Estado**: Fase 1 Completada - Sistema Multi-Tenant Implementado

**Identidad Visual**:
- Paleta: Beige (#e7cf9d), Cyan (#c9e1e1), Green (#cae4b2), Cream (#f1ede2), Gray (#898989)
- Tipografía: Playfair Display (títulos) + Source Sans Pro (cuerpo)
- Tono: Sereno, cálido, femenino, profesional

---

## 2. LIBRO DE DECISIONES ESTRATÉGICAS

### Decisión de Arquitectura: Reutilización de Sistema Impulso Pro (03-Dic-2025)

Contexto: Cliente necesita website profesional con urgencia (pocos días). Se evalúa construir desde cero vs reutilizar arquitectura existente.

Decisión (Firme): Se reutiliza la arquitectura técnica completa de Impulso Profesional, adaptando identidad visual y contenido para Serenamente Vivir.

Razón Estratégica:
- Desarrollo 60-70% más rápido (código probado y mantenible)
- Escalabilidad: Mejoras en Impulso Pro → Serenamente las hereda automáticamente
- Código único: 1 bug fix beneficia a todos los tenants
- Reducción de deuda técnica futura

Implementación:
- Sistema SCSS modular (10 módulos)
- Convenciones BEM
- Variables CSS (espaciado, sombras, bordes, transiciones)
- Componentes adaptados (botones, cards, popups, footer)
- Workflow desarrollo (npm scripts, Git, compilación SASS)

Restricciones:
- NO se modifica código de Impulso Pro
- Archivos de Serenamente aislados en carpeta propia
- Cambios en Serenamente NO afectan a Impulso Pro

---

### Decisión de Priorización: Visual Primero, Optimizaciones Después (03-Dic-2025)

Contexto: Usuario prioriza ver resultado visual rápidamente sobre optimizaciones técnicas (SEO, Open Graph, lazy loading).

Decisión (Firme): Se divide implementación en 2 fases:
- Fase 1 (ALTA PRIORIDAD): Arquitectura SCSS + Visual (responsive, botones, popups)
- Fase 2 (BAJA PRIORIDAD): Optimizaciones técnicas (SEO, Open Graph, lazy loading, meta tags)

Razón Estratégica:
- Cliente necesita ver resultado visual inmediatamente
- Optimizaciones técnicas se pueden agregar después sin afectar diseño
- Permite validación rápida con cliente real (Marlene)

Estado: Fase 1 COMPLETADA (03-Dic-2025)

---

### Decisión de Arquitectura: "Doble Destino" - Separación Radical Agenda/Contacto (12-Dic-2025)

Contexto: Se evaluó unificación de Agenda y Contacto en un solo archivo `contacto-agenda.html` con estrategia de "Sesión de Valoración Gratuita (15 min)". Se concluye que ambas estrategias complican la operativa del profesional y atraen leads de baja calidad ("Curiosos"), violando el principio de "Simplicidad Radical".

Decisión (Firme): Se establece arquitectura de "Doble Destino" con separación radical:

1. ANULACIÓN DE UNIFICACIÓN:
   - Se elimina archivo `contacto-agenda.html`
   - Se crean dos páginas independientes:
     - `agenda.html`: Exclusiva para herramientas de reserva de PAGO (Transaccional - Calendly/Stripe)
     - `contacto.html`: Exclusiva para formulario de texto y datos (Relacional - Email)

2. ELIMINACIÓN DE AUTOMATIZACIÓN "GRATIS":
   - La plataforma NO dará soporte nativo ni arquitectónico a "Sesiones Gratuitas" en el frontend
   - Dashboard solo pedirá "Enlace de Reserva (Pago)"
   - No habrá lógica condicional para mostrar/ocultar eventos gratuitos
   - Sin botón "Agendar sesión gratis 15 min" en web

3. ESTRATEGIA DE FILTRO MANUAL:
   - La "Sesión Gratuita" pasa a ser herramienta de gestión privada (Back-office) del profesional
   - Flujo web estricto: PAGAS (Agenda) O ESCRIBES (Contacto)
   - Si el profesional regala tiempo, lo hace manualmente por email tras recibir contacto, no mediante botón web

Razón Estratégica:
- Proteger el tiempo del profesional de "curiosos" de bajo valor
- Simplificar desarrollo del SaaS (no gestionar dos flujos en mismo archivo)
- Maximizar percepción de autoridad ("Lo gratis no se exhibe, se concede")
- Evitar leads de baja calidad
- Cumplir con "Simplicidad Radical"

ANULACIÓN:
- Unificación Agenda/Contacto en `contacto-agenda.html` (decisión previa 13-Nov)
- Estrategia "Sesión Valoración Gratuita" visible en web
- Inst.txt anterior que mencionaba "Lead Magnet 15 min GRATIS"

---

### Decisión de Arquitectura: Implementación Sistema Multi-Tenant (13-Dic-2025)

Contexto: Serenamente Vivir es un proyecto mono-tenant (un solo dominio/cliente). Se evalúa si implementar sistema multi-tenant de Impulso Pro o simplificar.

Decisión (Firme): Se implementa sistema multi-tenant completo de Impulso Pro, aunque Serenamente sea mono-tenant en producción.

Razón Estratégica:
- Reutilización de arquitectura probada (1,400+ líneas de código reutilizado)
- Escalabilidad futura: Mejoras en Impulso Pro → Serenamente las hereda
- Desarrollo 60-70% más rápido (no reinventar la rueda)
- Bug fixes compartidos: 1 fix beneficia a todos los tenants
- Simplicidad: Feature flags ocultan complejidad innecesaria

Implementación:

Sistema implementado:
1. Config Loader - Sistema multi-tenant dinámico (`js/config-loader.js` - 442 líneas)
2. Configuración Tenant - `config/tenants/serenamente.json` (73 líneas)
3. Autenticación 3 Niveles - Teresa (Visitante) → Regina (Registrada) → Ana (Miembro)
4. Área Privada Dinámica - Hub personalizado por nivel de usuario (`js/area-privada.js` - 600+ líneas)
5. Sistema Autenticación - localStorage MVP (`js/auth.js` - 334 líneas)

Archivos HTML Core:
- `cuenta.html` - Login/Registro multi-tenant
- `area-privada.html` - Hub dinámico Teresa/Regina/Ana
- `catalogo.html` - Tienda de recursos
- `crear-usuarios-prueba.html` - Testing usuarios Regina/Ana

Configuración Tenant Serenamente:
- Colores: Beige (#e7cf9d), Cyan (#c9e1e1), Green (#cae4b2)
- Tipografía: Playfair Display + Source Sans Pro
- Diccionario: "Acompañadas", "Sesión", "Tu Espacio Privado"
- Features activos: Membresía, Meditaciones, Talleres, Retiros, Testimonios
- Features deshabilitados: Carta Astral, Fases Lunares, Rituales, Blog, Galería

Flujo "Doble Gancho" (Teresa → Regina → Ana):
1. Teresa (Visitante) - Ve Lead Magnet en serenamente_vivir.html
2. Captura - Formulario simple (email + nombre)
3. Email - "Tu regalo está en tu Espacio Privado"
4. Regina (Registrada) - Crea password → Accede a área privada
5. Upsell - Ve widgets premium bloqueados (candado)
6. Ana (Miembro) - Acceso completo tras compra membresía (29 EUR/mes)

Detección de Tenant:
- localhost / 127.0.0.1 → `serenamente` (desarrollo local)
- serenamentevivir.com → `serenamente` (producción)
- Carga `/config/tenants/serenamente.json`
- Aplica tema CSS (27 variables), diccionario (16 términos), feature flags (20 features)

Usuarios de prueba:
- `regina@test.com` / `123456` (Nivel 2 - Registrada/Compradora)
- `ana@test.com` / `123456` (Nivel 3 - Miembro Premium)

---

### Decisión de UX: Lead Magnet con Validación Proactiva (07-Dic-2025)

Contexto: Se implementa Lead Magnet en homepage siguiendo arquitectura de Impulso Pro. Se evalúa experiencia de usuario óptima.

Decisión (Firme): Se implementa validación proactiva con feedback visual en tiempo real.

Implementación:
- Formulario con 3 campos: Nombre, Email, Checkbox Privacidad
- Botón inicia como `btn-secondary` (estado deshabilitado visual)
- Validación en tiempo real (onChange):
  - Nombre no vacío
  - Email contiene @
  - Checkbox marcado
- Cuando las 3 condiciones se cumplen → Botón cambia a `btn-primary` (estado habilitado visual)
- Validación HTML5 nativa (required, type="email")
- Mensaje de éxito: "✓ ¡Perfecto! Revisa tu email para descargar el recurso."

Razón Estratégica:
- Reduce fricción (usuario sabe inmediatamente si formulario es válido)
- Cumple GDPR/LOPD (consentimiento explícito obligatorio)
- Mejora conversión (feedback visual claro)
- Pre-cualifica leads (solo usuarios comprometidos marcan checkbox)

---

### Decisión Técnica: Fix Modal - Re-inicialización Event Listeners (13-Dic-2025)

Contexto: Modal Login/Registro funcionaba con file:// pero NO con Live Server. Se detecta que `config-loader.js` ejecuta `applyDictionary()` que reemplaza `document.body.innerHTML`, destruyendo event listeners registrados por `main.js`.

Decisión (Firme): Se implementa patrón de re-inicialización de event listeners escuchando evento `dictionaryApplied`.

Implementación:
- Encapsular lógica de modales en función `initializeModals()`
- Ejecutar `initializeModals()` al cargar script (primera vez)
- Escuchar evento `dictionaryApplied` que dispara `config-loader.js`
- Re-ejecutar `initializeModals()` después de que DOM sea reemplazado
- Versionar `main.js?v=11` para forzar recarga en navegador

Razón Técnica:
- Preserva arquitectura multi-tenant (no modificar `config-loader.js`)
- Solución escalable (cualquier script puede re-inicializarse)
- Evita duplicación de lógica (un solo sistema de modales)
- Compatible con arquitectura de eventos de Impulso Pro

---

## 3. ROADMAP DE IMPLEMENTACIÓN

### Fase 1: Arquitectura SCSS + Visual (COMPLETADA - 03-Dic-2025)

Objetivo: Código mantenible + Mejoras visuales inmediatas

Implementado:
- Sistema SCSS modular (10 módulos: 44-763 líneas cada uno vs 753 monolíticas)
- Setup npm + compilación SASS (`npm run build`, `npm run watch`)
- Variables CSS ampliadas (espaciado, sombras, bordes, transiciones)
- Responsive 4 breakpoints (480px, 768px, 968px, 1200px)
- Sistema botones (primary, secondary, compact, large, w-full)
- Popups optimizados (animaciones cubic-bezier, responsive stack vertical)
- HTML limpio con CSS externo

---

### Fase 2: Sistema Multi-Tenant (COMPLETADA - 13-Dic-2025)

Objetivo: Reutilizar arquitectura Impulso Pro - Teresa → Regina → Ana

Implementado:
- Config Loader multi-tenant (442 líneas)
- Configuración tenant serenamente.json (73 líneas)
- Autenticación 3 niveles (334 líneas)
- Área privada dinámica (600+ líneas)
- HTML core (cuenta, area-privada, catalogo)
- Testing usuarios prueba
- Fix modal re-inicialización

---

### Fase 3: Optimizaciones Técnicas (PENDIENTE - Baja Prioridad)

Objetivo: SEO, Performance, Compartir en Redes

Pendiente:
- Open Graph Protocol (meta tags og:title, og:description, og:image, og:url)
- Twitter Cards
- Lazy Loading de imágenes below-fold
- Meta description optimizada
- Canonical URL
- Favicons multi-dispositivo (32x32, 16x16, apple-touch-icon)
- robots.txt
- sitemap.xml

Nota: Se implementarán cuando se valide producto con cliente real (Marlene)

---

### Fase 4: Backend Real (PLANIFICADA - 4-6 semanas)

Objetivo: Migrar de MVP (localStorage + JSON) a Producción (Base de Datos + Backend)

Planificado:
- Migrar configuración JSON → Base de Datos
- Dashboard administración para cambios en caliente
- Backend real (Supabase/Firebase)
- Autenticación OAuth (Google, Facebook)
- Pasarela de pago Stripe para membresía (29 EUR/mes)
- Email Marketing integrado (ConvertKit/Mailchimp)
- Analytics por tenant (Google Analytics 4)
- CDN para assets (Cloudflare)

---

## 4. ESTRUCTURA DE ARCHIVOS

### Archivos Maestros (Documentación)

- `Maestro_Serenamente.md` - Este archivo (Decisiones estratégicas y roadmap)
- `ARQUITECTURA-SERENAMENTE.md` - Arquitectura multi-tenant detallada
- `CHULETA-TECNICA-SERENAMENTE.md` - Guía técnica SCSS (sistema, variables, comandos, debugging)
- `CLAUDE.md` - Contexto para Claude Code
- `GEMINI.md` - Contexto para Gemini
- `CODEX.md` - Contexto para Codex
- `TESTING-MULTITENANT.md` - Guía de testing

### Páginas HTML Principales

- `serenamente_vivir.html` - Homepage (Lead Magnet)
- `tienda.html` - Catálogo servicios
- `agenda.html` - Reserva de PAGO (Calendly/Stripe)
- `contacto.html` - Formulario contacto relacional
- `tu_espacio_privado.html` - Membresía
- `meditaciones_personalizadas.html` - Catálogo meditaciones
- `cuenta.html` - Login/Registro multi-tenant
- `area-privada.html` - Hub dinámico Teresa/Regina/Ana
- `catalogo.html` - Tienda recursos

### Sistema SCSS (10 módulos)

```
scss/
├── main.scss                  (Orquestador - 22 líneas)
├── _variables.scss            (Variables CSS - 70 líneas)
├── _reset.scss                (Reset básico - 15 líneas)
├── _header.scss               (Header + navegación - 44 líneas)
├── _hero.scss                 (Banner principal - 79 líneas)
├── _buttons.scss              (Botones - 60 líneas)
├── _popups.scss               (Modales - 211 líneas)
├── _sections.scss             (Secciones contenido - 763 líneas)
├── _footer.scss               (Footer 3 columnas - 85 líneas)
└── _responsive.scss           (4 breakpoints - 354 líneas)

↓ npm run build

css/styles.css                 (AUTO-GENERADO - NO EDITAR)
```

### Sistema Multi-Tenant JavaScript

```
js/
├── config-loader.js           (Sistema multi-tenant - 442 líneas)
├── auth.js                    (Autenticación 3 niveles - 334 líneas)
├── area-privada.js            (Área privada dinámica - 600+ líneas)
└── main.js                    (Modales + Lead Magnet)

config/tenants/
└── serenamente.json           (Configuración tenant - 73 líneas)
```

---

## 5. CHANGELOG

NOTA: En este documento, al igual que en DM1 de Impulso Pro, cuando existen decisiones contradictorias, LA ÚLTIMA DECISIÓN (por fecha) PREVALECE sobre las anteriores.

---

### [13-Dic-2025] - Versión 3.0

IMPLEMENTADO:
- Sistema Multi-Tenant completo (config-loader, auth, area-privada)
- Configuración serenamente.json (tema, diccionario, features)
- Flujo Teresa → Regina → Ana
- HTML core (cuenta, area-privada, catalogo)
- Testing usuarios prueba (regina@test.com, ana@test.com)
- Fix modal re-inicialización event listeners

ARCHIVOS NUEVOS:
- config/tenants/serenamente.json
- js/config-loader.js
- js/auth.js
- js/area-privada.js
- cuenta.html
- area-privada.html
- catalogo.html
- crear-usuarios-prueba.html
- ARQUITECTURA-SERENAMENTE.md
- CHULETA-TECNICA-SERENAMENTE.md
- TESTING-MULTITENANT.md

---

### [12-Dic-2025] - Versión 2.0

DECISIÓN FIRME: Arquitectura "Doble Destino" (Anula unificación)

IMPLEMENTADO:
- agenda.html (Reserva de PAGO)
- contacto.html (Formulario relacional)
- Eliminación de "Gratis" automático
- Separación radical: Pago (Agenda) vs Consulta (Contacto)

ELIMINADO:
- contacto-agenda.html (unificación anulada)

ANULA:
- Estrategia "Calendario Protagonista" en contacto-agenda.html (12-Dic anterior)
- Unificación Agenda/Contacto (13-Nov)
- Lead Magnet "15 min GRATIS" visible en web

---

### [07-Dic-2025] - Versión 1.2

IMPLEMENTADO:
- Lead Magnet con validación proactiva
- Headers/Footers unificados en todos HTML
- Hero section con logo + banner en todas las páginas
- CSS versionado v=11
- Separadores antes de footers

AJUSTES VISUALES:
- Testimonios (imágenes 69x69px circulares, fondo #F5FAF0)
- Secciones fondos blancos
- Membresía rediseñada (1 tier simplificado)

---

### [03-Dic-2025] - Versión 1.1

FASE 1 COMPLETADA:

IMPLEMENTADO:
- Migración completa CSS inline → SCSS modular (753 líneas → 10 módulos)
- Scripts npm compilación (`npm run build`, `npm run watch`)
- Sistema variables CSS ampliado
- Responsive 4 breakpoints (código creado)
- Sistema botones mejorado (primary, secondary, compact, large)
- Popups optimizados (animaciones, accesibilidad)
- Repositorio GitHub creado

ISSUES DETECTADOS:
- Responsive requiere ajustes y testing
- Usuario mencionó "otras correcciones" (pendiente especificar)

---

### [03-Dic-2025] - Versión 1.0

CREADO:
- Maestro_Serenamente.md
- Análisis estado actual del website
- Roadmap 2 fases (Visual + Optimizaciones)
- Inicio implementación Fase 1

---

Última actualización: 13-Dic-2025
Responsable: Devito (Claude Code)
Proyecto: Serenamente Vivir - Marlene Sosa
