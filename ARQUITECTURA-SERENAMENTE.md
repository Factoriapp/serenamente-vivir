# ARQUITECTURA TÉCNICA - SERENAMENTE VIVIR

**Versión:** 1.0
**Fecha:** 13 de Diciembre de 2025
**Responsable:** Devito (Arquitecto Técnico)
**Estado:** Sistema Multi-Tenant Implementado (Fase 1 - MVP)

---

## 📋 TABLA DE CONTENIDOS

1. [Visión General](#visión-general)
2. [Relación con Impulso Pro](#relación-con-impulso-pro)
3. [Sistema Multi-Tenant](#sistema-multi-tenant)
4. [Configuración del Tenant](#configuración-del-tenant)
5. [Flujo de Usuarios (Teresa → Regina → Ana)](#flujo-de-usuarios)
6. [Feature Flags Activos](#feature-flags-activos)
7. [Estructura de Archivos](#estructura-de-archivos)
8. [Funciones JavaScript Clave](#funciones-javascript-clave)
9. [Testing](#testing)

---

## 🎯 VISIÓN GENERAL

### Concepto Central

**Serenamente Vivir** es un website independiente para terapeuta especializada en bienestar emocional de mujeres que **reutiliza la arquitectura multi-tenant de Impulso Profesional**.

### ¿Por qué Multi-Tenant si Serenamente es mono-tenant?

**Razón estratégica:**
- ✅ **Reutilización de código probado** - Sistema ya validado en Impulso Pro
- ✅ **Escalabilidad futura** - Mejoras en Impulso Pro → Serenamente las hereda automáticamente
- ✅ **Desarrollo 60-70% más rápido** - No reinventar la rueda
- ✅ **Bug fixes compartidos** - 1 fix beneficia a todos los tenants

**En producción:**
- Serenamente es **mono-tenant** (un solo dominio: `serenamentevivir.com`)
- Pero usa arquitectura multi-tenant internamente para reutilizar componentes

---

## 🔗 RELACIÓN CON IMPULSO PRO

### ✅ Lo que Serenamente REUTILIZA de Impulso Pro:

| Componente | Descripción |
|------------|-------------|
| **Sistema SCSS Modular** | Arquitectura de archivos pequeños (10 módulos) |
| **Convenciones BEM** | Nomenclatura de clases CSS |
| **Variables CSS** | Espaciado, sombras, bordes, transiciones |
| **Componentes adaptados** | Botones, cards, popups, footer |
| **Workflow desarrollo** | npm scripts, Git, compilación SASS |
| **Config Loader** | `js/config-loader.js` (442 líneas) |
| **Sistema Autenticación** | `js/auth.js` - Teresa → Regina → Ana |
| **Área Privada Dinámica** | `js/area-privada.js` - Hub por nivel usuario |

### ❌ Lo que Serenamente NO comparte:

| Aspecto | Impulso Pro | Serenamente |
|---------|-------------|-------------|
| **Multi-tenant producción** | Múltiples dominios/tenants | Mono-tenant (solo serenamentevivir.com) |
| **Modelo de negocio** | 3 Tiers, 5 Pilares, GTM complejo | Membresía simple (€29/mes) |
| **Base de datos** | tenant_id, feature flags complejos | Sin tenant_id en producción (localStorage MVP) |
| **Paleta de colores** | Naranja/Azul corporativo | Beige/Cyan/Green femenino |
| **Tipografía** | Montserrat | Playfair Display + Source Sans Pro |
| **Contenido** | Consultores profesionales | Terapeuta bienestar emocional |

---

## 🏗️ SISTEMA MULTI-TENANT

### Arquitectura General

```
Usuario visita serenamentevivir.com
    ↓
config-loader.js detecta hostname
    ↓
Mapea a tenant_id: "serenamente"
    ↓
Carga /config/tenants/serenamente.json
    ↓
Aplica:
  1. Tema CSS (27 variables CSS)
  2. Diccionario semántico (placeholders {{term}})
  3. Feature Flags (mostrar/ocultar módulos)
  4. Branding (logo, tagline, favicon)
  5. Icon Pack (wellness)
```

### Detección de Tenant

**Archivo:** `js/config-loader.js` (líneas 106-119)

**Mapeo de dominios:**
```javascript
const domainMap = {
    'serenamentevivir.com': 'serenamente',
    'www.serenamentevivir.com': 'serenamente',
    'localhost': 'serenamente',        // Desarrollo local
    '127.0.0.1': 'serenamente'         // Live Server
};
```

**Tenant por defecto:** `serenamente`

### Carga de Configuración

**Función principal:** `loadTenantConfig()` (async)

**Flujo:**
1. Detectar `tenant_id` según hostname
2. Fetch de `/config/tenants/serenamente.json`
3. Aplicar configuración a la página:
   - `applyTheme()` - Variables CSS
   - `applyDictionary()` - Reemplazo de placeholders
   - `applyFeatures()` - Feature flags
   - `applyBranding()` - Logo, tagline, favicon
   - `loadIconPack()` - Pack de iconos

**⚠️ IMPORTANTE - Timing de carga:**
- `config-loader.js` se ejecuta en `DOMContentLoaded`
- `applyDictionary()` **reemplaza `document.body.innerHTML`**
- Los event listeners de otros scripts se pierden
- **Solución:** Scripts deben escuchar evento `dictionaryApplied` para re-inicializarse

**Ejemplo en `main.js`:**
```javascript
// Re-inicializar modales después de aplicar diccionario
document.addEventListener('dictionaryApplied', function() {
    console.log('🔄 Re-inicializando modales...');
    initializeModals();
});
```

---

## ⚙️ CONFIGURACIÓN DEL TENANT

### Archivo: `config/tenants/serenamente.json`

**Estructura completa (73 líneas):**

```json
{
  "tenant_id": "serenamente",
  "domain": "serenamentevivir.com",

  "brand": {
    "name": "Serenamente Vivir",
    "tagline": "El permiso de ser, el arte de vivir serenamente",
    "logo_url": "https://iili.io/K4AhJFs.png",
    "favicon": "/Imagenes/favicon.ico"
  },

  "theme": {
    "primary_color": "#e7cf9d",      // Beige
    "secondary_color": "#c9e1e1",    // Cyan
    "accent_color": "#cae4b2",       // Green
    "bg_primary": "#ffffff",
    "bg_secondary": "#f5f3f0",       // Cream claro
    "bg_neutral": "#f1ede2",         // Cream
    "text_color": "#333333",
    "text_light": "#666666",
    "text_muted": "#898989",         // Gray
    "border_color": "#e0e0e0",
    "success_color": "#cae4b2",
    "warning_color": "#e7cf9d",
    "error_color": "#dc3545",
    "font_primary": "'Playfair Display', serif",
    "font_secondary": "'Source Sans Pro', sans-serif",
    "border_radius": "10px",
    "shadow_soft": "0 4px 20px rgba(0, 0, 0, 0.08)"
  },

  "dictionary": {
    "client_term": "Acompañadas",
    "client_term_singular": "Acompañada",
    "client_term_alt": "Mujeres",
    "client_term_alt_singular": "Mujer",
    "session_term": "Sesión",
    "session_term_plural": "Sesiones",
    "service_term": "Servicio",
    "service_term_plural": "Servicios",
    "booking_term": "Reservar Sesión",
    "appointment_term": "Encuentro",
    "consultation_term": "Sesión Terapéutica",
    "practice_term": "Espacio Terapéutico",
    "dashboard_term": "Tu Espacio Privado",
    "profile_term": "Tu Perfil",
    "calendar_term": "Agenda",
    "billing_term": "Pagos"
  },

  "features": {
    // Features deshabilitadas (Impulso Pro)
    "carta_astral": false,
    "fases_lunares": false,
    "rituales": false,
    "facturacion_avanzada": false,
    "integracion_contabilidad": false,
    "reportes_clinicos": false,
    "historial_paciente": false,
    "cursos_online": false,
    "blog": false,
    "galeria": false,

    // Features habilitadas (Serenamente)
    "energia_sanacion": true,
    "membresia": true,
    "area_miembros": true,
    "eventos_vivo": true,
    "testimonios": true,
    "tienda": true,
    "meditaciones": true,
    "talleres": true,
    "retiros": true,
    "acompanamiento": true
  },

  "icon_pack": "wellness",
  "professional_type": "therapeutic",
  "language": "es",
  "timezone": "Europe/Madrid",
  "currency": "EUR",
  "date_format": "DD/MM/YYYY",
  "time_format": "24h"
}
```

### Aplicación de Tema CSS

**Función:** `applyTheme(theme)` - `config-loader.js` (líneas 154-193)

**Mapeo JSON → CSS Variables:**

| JSON Key | CSS Variable |
|----------|--------------|
| `primary_color` | `--color-primary` |
| `secondary_color` | `--color-secondary` |
| `accent_color` | `--color-accent` |
| `bg_primary` | `--color-bg-primary` |
| `bg_secondary` | `--color-bg-secondary` |
| `text_color` | `--color-text` |
| `font_primary` | `--font-primary` |
| ... | ... |

**Resultado:** 27 variables CSS aplicadas dinámicamente a `:root`

### Diccionario Semántico

**Función:** `applyDictionary(dictionary)` - `config-loader.js` (líneas 248-273)

**Uso en HTML:**
```html
<!-- Antes del reemplazo -->
<h2>Bienvenida {{client_term_alt}}</h2>
<p>Agenda tu {{session_term}} ahora</p>

<!-- Después del reemplazo -->
<h2>Bienvenida Mujeres</h2>
<p>Agenda tu Sesión ahora</p>
```

**⚠️ CRÍTICO:** Esta función ejecuta `document.body.innerHTML = updatedHTML`, lo que **destruye event listeners**. Los scripts deben escuchar `dictionaryApplied` para re-inicializarse.

---

## 👥 FLUJO DE USUARIOS (Teresa → Regina → Ana)

### Arquitectura de 3 Niveles

Serenamente implementa el sistema "Doble Gancho" de Impulso Pro:

| Nivel | Nombre | Estado | Acceso |
|-------|--------|--------|--------|
| **1** | **Teresa** | Visitante | Solo homepage pública |
| **2** | **Regina** | Registrada/Compradora | Área privada básica + contenido comprado |
| **3** | **Ana** | Miembro Premium | Acceso completo (membresía €29/mes) |

### Flujo Detallado

```
1. TERESA (Visitante)
   ↓
   Ve Lead Magnet en serenamente_vivir.html
   "Descarga gratis: Meditación de Calma Interior (15 min)"
   ↓
   Formulario simple: Email + Nombre + Checkbox Privacidad
   ↓

2. CAPTURA
   ↓
   Email automático: "Tu regalo está esperándote en Tu Espacio Privado"
   ↓

3. REGINA (Registrada)
   ↓
   Crea contraseña → Login → Accede a area-privada.html
   ↓
   Ve widgets:
   - ✅ Lead Magnet descargable (gratis)
   - 🔒 Biblioteca Meditaciones (bloqueado - requiere membresía)
   - 🔒 Talleres grabados (bloqueado - requiere membresía)
   - 🔒 Comunidad privada (bloqueado - requiere membresía)
   ↓

4. UPSELL
   ↓
   "Desbloquea acceso completo con la Membresía (€29/mes)"
   Botón: "Únete a la Comunidad"
   ↓

5. ANA (Miembro Premium)
   ↓
   Después de compra → Nivel = 3
   ↓
   Acceso completo:
   - ✅ Biblioteca completa de meditaciones
   - ✅ Talleres grabados
   - ✅ Sesiones grupales mensuales
   - ✅ Círculos de mujeres
   - ✅ Comunidad privada
   - ✅ Contenido exclusivo mensual
   - ✅ Descuentos en sesiones 1:1, retiros
```

### Implementación Técnica

**Archivo:** `js/auth.js` (334 líneas)

**localStorage (MVP):**
```javascript
// Usuario actual
{
  "id": "1702389847291",
  "nombre": "Ana García",
  "email": "ana@test.com",
  "tipoUsuario": "miembro",  // "gratuito" | "comprador" | "miembro"
  "nivel": 3,                 // 1: Teresa | 2: Regina | 3: Ana
  "fechaRegistro": "2025-12-13T22:15:47.291Z"
}
```

**Funciones clave:**
- `obtenerUsuarioActual()` - Retorna usuario logueado o null
- `mapearTipoANivel(tipoUsuario)` - Convierte "miembro" → 3
- `actualizarTipoUsuario(nuevoTipo)` - Upgrade Teresa → Regina → Ana
- `verificarAutenticacion()` - Protege páginas privadas

**Archivo:** `js/area-privada.js` (600+ líneas)

**Renderizado dinámico por nivel:**
```javascript
function renderizarWidgets() {
    const usuario = obtenerUsuarioActual();
    const nivel = usuario.nivel; // 1, 2, o 3

    widgets.forEach(widget => {
        if (widget.nivelRequerido <= nivel) {
            // Mostrar desbloqueado
            widget.classList.remove('widget-bloqueado');
        } else {
            // Mostrar bloqueado con candado 🔒
            widget.classList.add('widget-bloqueado');
        }
    });
}
```

---

## 🎛️ FEATURE FLAGS ACTIVOS

### Features Habilitadas en Serenamente

```javascript
"features": {
  "energia_sanacion": true,      // Reiki, sanación energética
  "membresia": true,              // Sistema membresía €29/mes
  "area_miembros": true,          // Área privada dinámica
  "eventos_vivo": true,           // Talleres, retiros presenciales
  "testimonios": true,            // Sección testimonios homepage
  "tienda": true,                 // Catálogo servicios
  "meditaciones": true,           // Biblioteca meditaciones
  "talleres": true,               // Talleres grabados
  "retiros": true,                // Retiros presenciales
  "acompanamiento": true          // Procesos continuos
}
```

### Features Deshabilitadas (Impulso Pro)

```javascript
"features": {
  "carta_astral": false,          // Específico Impulso Hol
  "fases_lunares": false,         // Específico Impulso Hol
  "rituales": false,              // Específico Impulso Hol
  "facturacion_avanzada": false,  // Impulso Pro (contabilidad)
  "reportes_clinicos": false,     // Impulso Pro (psicólogos)
  "historial_paciente": false,    // Impulso Pro (terapeutas)
  "cursos_online": false,         // No aplica en MVP Serenamente
  "blog": false,                  // No aplica en MVP Serenamente
  "galeria": false                // No aplica en MVP Serenamente
}
```

### Uso en HTML

**Mostrar/ocultar elementos según feature:**

```html
<!-- Solo se muestra si feature "meditaciones" está activa -->
<div data-feature="meditaciones">
    <h3>Biblioteca de Meditaciones</h3>
    <p>Accede a más de 50 meditaciones guiadas...</p>
</div>

<!-- Se oculta si "carta_astral" está desactivada -->
<div data-feature="carta_astral" style="display: none;">
    <h3>Tu Carta Astral</h3>
</div>
```

**Función:** `applyFeatures(features)` - `config-loader.js` (líneas 286-308)

---

## 📁 ESTRUCTURA DE ARCHIVOS

### Archivos Multi-Tenant Core

```
Serenamente/
├── config/
│   └── tenants/
│       └── serenamente.json          ← Configuración tenant (73 líneas)
│
├── js/
│   ├── config-loader.js              ← Sistema multi-tenant (442 líneas)
│   ├── auth.js                       ← Autenticación 3 niveles (334 líneas)
│   ├── area-privada.js               ← Área privada dinámica (600+ líneas)
│   └── main.js                       ← Lógica modales + Lead Magnet
│
├── serenamente_vivir.html            ← Homepage (Lead Magnet)
├── cuenta.html                       ← Login/Registro
├── area-privada.html                 ← Hub dinámico por nivel
├── catalogo.html                     ← Tienda recursos
│
├── crear-usuarios-prueba.html        ← Testing (Regina/Ana)
├── test-modal.html                   ← Testing modales aislado
└── test-multitenant.html             ← Testing sistema multi-tenant
```

### Orden de Carga en HTML

**Archivo:** `serenamente_vivir.html` (líneas 583-585)

```html
<!-- ORDEN CRÍTICO: NO CAMBIAR -->
<script src="js/config-loader.js"></script>      <!-- 1. Multi-tenant -->
<script src="js/auth.js?v=10"></script>          <!-- 2. Autenticación -->
<script src="js/main.js?v=11"></script>          <!-- 3. Modales + Validaciones -->
```

**¿Por qué este orden?**
1. `config-loader.js` debe cargar primero para aplicar configuración
2. `auth.js` depende de variables CSS aplicadas
3. `main.js` debe escuchar evento `dictionaryApplied` para re-inicializarse

---

## 🔧 FUNCIONES JAVASCRIPT CLAVE

### Config Loader (config-loader.js)

| Función | Propósito |
|---------|-----------|
| `loadTenantConfig()` | Función principal - Carga configuración completa |
| `detectTenantId()` | Mapea hostname → tenant_id |
| `fetchTenantConfig(tenantId)` | Fetch JSON desde /config/tenants/ |
| `applyTheme(theme)` | Aplica 27 variables CSS a :root |
| `applyDictionary(dictionary)` | Reemplaza placeholders {{term}} en HTML |
| `applyFeatures(features)` | Muestra/oculta elementos según feature flags |
| `applyBranding(brand)` | Actualiza logo, tagline, favicon |
| `loadIconPack(iconPack)` | Marca icon pack activo en body |

**Funciones públicas (window.TenantConfig):**
```javascript
// Obtener término del diccionario
getTerm('client_term') → "Acompañadas"

// Verificar si feature está activa
isFeatureEnabled('meditaciones') → true

// Obtener configuración completa
getCurrentConfig() → { tenant_id: "serenamente", ... }
```

### Autenticación (auth.js)

| Función | Propósito |
|---------|-----------|
| `obtenerUsuarioActual()` | Retorna usuario logueado o null |
| `guardarUsuarioActual(usuario)` | Guarda sesión en localStorage |
| `obtenerUsuarios()` | Lista todos los usuarios registrados |
| `guardarUsuarios(usuarios)` | Actualiza lista de usuarios |
| `mapearTipoANivel(tipoUsuario)` | "miembro" → 3, "comprador" → 2, "gratuito" → 1 |
| `actualizarTipoUsuario(nuevoTipo)` | Upgrade de nivel (Teresa → Regina → Ana) |
| `verificarAutenticacion()` | Protege páginas privadas |
| `cerrarSesion()` | Limpia localStorage + recarga |

### Área Privada (area-privada.js)

| Función | Propósito |
|---------|-----------|
| `renderizarAreaPrivada()` | Renderiza widgets según nivel usuario |
| `cargarRecursos()` | Carga recursos desde localStorage (MVP) |
| `filtrarPorNivel(recursos, nivel)` | Filtra recursos según nivel usuario |
| `mostrarWidgetBloqueado(widget)` | Muestra candado 🔒 + CTA upgrade |
| `desbloquearWidget(widget)` | Habilita widget para Ana (nivel 3) |

---

## 🧪 TESTING

### Usuarios de Prueba

**Archivo:** `crear-usuarios-prueba.html`

**Usuarios creados automáticamente:**

| Email | Password | Nivel | Tipo | Descripción |
|-------|----------|-------|------|-------------|
| `regina@test.com` | `123456` | 2 | Registrada/Compradora | Ve área privada básica + contenido comprado |
| `ana@test.com` | `123456` | 3 | Miembro Premium | Acceso completo (membresía) |

**Cómo usar:**
1. Abrir `crear-usuarios-prueba.html` en navegador
2. Click en "Crear Usuarios de Prueba"
3. Usuarios se guardan en localStorage
4. Login en `cuenta.html` con email/password
5. Acceder a `area-privada.html` para ver diferencias por nivel

### Testing Multi-Tenant

**Archivo:** `test-multitenant.html`

**Verifica:**
- ✅ Carga correcta de `serenamente.json`
- ✅ Aplicación de tema CSS (27 variables)
- ✅ Diccionario semántico (16 términos)
- ✅ Feature flags (20 features)
- ✅ Branding (logo, tagline)

**Cómo usar:**
1. Abrir `test-multitenant.html` en Live Server
2. Ver consola del navegador (F12)
3. Verificar logs de config-loader.js
4. Inspeccionar variables CSS en DevTools

### Testing Modales

**Archivo:** `test-modal.html`

**Verifica:**
- ✅ Modal Login abre/cierra correctamente
- ✅ Modal Registro abre/cierra correctamente
- ✅ Tecla ESC cierra modales
- ✅ Click en overlay cierra modales
- ✅ Event listeners sobreviven después de `applyDictionary()`

---

## 📊 BENEFICIOS DE LA ARQUITECTURA

### Escalabilidad

✅ **Mejoras en Impulso Pro → Serenamente las hereda**
- Bug fix en `config-loader.js` → Se aplica automáticamente
- Nueva feature en `area-privada.js` → Disponible con feature flag
- Optimización en `auth.js` → Ambos proyectos mejoran

### Mantenibilidad

✅ **Código único, múltiples tenants**
- 1 archivo `config-loader.js` para todos los tenants
- No duplicar lógica multi-tenant
- Cambios centralizados

### Desarrollo Rápido

✅ **Reutilización 60-70%**
- Sistema multi-tenant: 442 líneas reutilizadas
- Sistema auth: 334 líneas reutilizadas
- Área privada: 600+ líneas reutilizadas
- **Total: ~1,400 líneas de código reutilizado**

### Simplicidad

✅ **Feature flags ocultan complejidad**
- Serenamente no ve "carta_astral" (desactivada)
- Impulso Pro no ve "meditaciones" (desactivada)
- Un solo codebase, experiencias diferentes

---

## 🚀 ROADMAP DE IMPLEMENTACIÓN

### ✅ Fase 1 - MVP (Completada: 13-Dic-2025)

- [x] Sistema multi-tenant con JSON estático
- [x] Config Loader implementado (442 líneas)
- [x] Autenticación Teresa/Regina/Ana (334 líneas)
- [x] Área privada dinámica por nivel (600+ líneas)
- [x] Feature flags implementados (20 features)
- [x] Diccionario semántico (16 términos)
- [x] Tema CSS dinámico (27 variables)
- [x] Testing: Usuarios prueba + test-multitenant.html

### 🔄 Fase 2 - Producción (4-6 semanas)

- [ ] Migrar configuración JSON → Base de Datos
- [ ] Dashboard administración para cambios en caliente
- [ ] Backend real (Supabase/Firebase)
- [ ] Autenticación OAuth (Google, Facebook)
- [ ] Pasarela de pago (Stripe) para membresía
- [ ] Email Marketing integrado (ConvertKit)
- [ ] Analytics por tenant (Google Analytics 4)
- [ ] CDN para assets (Cloudflare)

### 🎯 Fase 3 - Escalabilidad (3-6 meses)

- [ ] Multi-tenant real en producción (múltiples clientes)
- [ ] Row Level Security en base de datos
- [ ] Dashboard multi-tenant admin
- [ ] Whitelabel completo (subdominios dinámicos)
- [ ] Billing por tenant (SaaS verdadero)

---

## 📚 DOCUMENTACIÓN RELACIONADA

**Archivos Maestros:**
- `Maestro_Serenamente.md` - Decisiones estratégicas y roadmap
- `GUIA_SISTEMA_SCSS_Stratego.md` - Chuleta técnica (SCSS, variables, comandos)
- `CLAUDE.md` - Contexto para Claude Code
- `GEMINI.md` - Contexto para Gemini
- `CODEX.md` - Contexto para Codex

**Testing:**
- `TESTING-MULTITENANT.md` - Guía de testing multi-tenant
- `crear-usuarios-prueba.html` - Crear usuarios Regina/Ana
- `test-multitenant.html` - Verificar sistema multi-tenant
- `test-modal.html` - Verificar modales

**Código fuente:**
- `config/tenants/serenamente.json` - Configuración tenant
- `js/config-loader.js` - Sistema multi-tenant
- `js/auth.js` - Autenticación 3 niveles
- `js/area-privada.js` - Área privada dinámica

---

**Última actualización**: 13-Dic-2025
**Responsable**: Devito (Claude Code)
