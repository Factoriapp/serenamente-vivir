# 📘 PLAYBOOK DE ESTÁNDARES FACTORIAPP
**"La Sabiduría de la Agencia" - Versión 1.0 (Enero 2026)**

Este documento consolida las REGLAS DE ORO, LECCIONES APRENDIDAS y ESTÁNDARES TÉCNICOS derivados de la experiencia real en proyectos como "Serenamente Vivir" e "Impulso Profesional".
**Objetivo:** Replicar el éxito y evitar los errores en futuros desarrollos web.

---

## 1. 🏛️ FILOSOFÍA DE DESARROLLO (The Factoriapp Way)

### 1.1. Simplicidad Radical
*   **Regla:** Si el cliente no lo entiende en 30 segundos, simplifícalo.
*   **Tech:** Evitar frameworks pesados (React/Angular) para webs de contenido. Usar HTML5 + Vanilla JS + SCSS.
*   **Backend:** Arquitectura Serverless (Supabase). Coste operativo (COGS) cercano a cero.

### 1.2. Diseño "Premium First"
*   **Estética:** No entregamos "Productos Mínimos Viables" feos. El diseño debe WOW desde el día 1.
*   **Detalles:** Micro-animaciones, sombras suaves (Elevation), tipografía cuidada.

### 1.3. Local First
*   **Flujo:** Desarrollar en Local (`localhost`) → Validar → Push a Producción.
*   **Nunca** depurar "en caliente" en el servidor de producción (Hostinger) debido al caché y retardos.

---

## 2. 🗄️ ARQUITECTURA DE DATOS (Supabase & Auth)

### 2.1. Gestión de Usuarios (La Tríada)
Definimos 3 niveles de usuario estándar para todos los proyectos:
1.  **Nivel 1 (Lead/Visitante):** Solo deja su email (Lead Magnet). NO es usuario Auth.
2.  **Nivel 2 (Registrado Gratuito):** Tiene Login. Acceso a contenido básico.
3.  **Nivel 3 (Cliente Premium):** Ha pagado. Acceso total.

### 2.2. Reglas de Base de Datos BINDADA
*   **Separación de Poderes:**
    *   `auth.users` (Sistema interno Supabase) → Solo credenciales.
    *   `public.profiles` (Nuestra tabla) → Datos del usuario (Nombre, Nivel, Foto).
*   **Borrado Seguro:** Para borrar un usuario, eliminar PRIMERO de `public.profiles`, luego de `auth.users` (o configurar `ON DELETE CASCADE`).
*   **Tabla de Leads:**
    *   Los leads (Nivel 1) van a una tabla separada `public.leads`.
    *   **CRÍTICO:** El campo `email` debe ser **UNIQUE**.
*   **Seguridad RLS (Row Level Security):**
    *   Activar SIEMPRE RLS en todas las tablas (`alter table x enable row level security`).
    *   Política estándar: "El usuario solo puede ver/editar su propia fila (`auth.uid() = id`)."

---

## 3. 🎨 FRONTEND & UI (HTML/SCSS/JS)

### 3.1. Sistema SCSS Modular
No usamos CSS monolítico. Usamos una arquitectura de 10 módulos estándar:
*   `_variables.scss`: La fuente de la verdad (Colores, Espaciado, Sombras).
*   `_responsive.scss`: 4 Breakpoints estándar (Mobile 480px, Tablet 768px, Desktop 968px/1200px).
*   **Regla de Oro:** NUNCA editar `css/styles.css`. SIEMPRE editar SCSS y compilar (`npm run build`).

### 3.2. JavaScript Robusto ("Anti-Frágil")
*   **Inicialización Segura:** Encapsular lógica de inicio (ej: `initializeLeadMagnet`) y ejecutarla en `DOMContentLoaded`.
    *   *Por qué:* Evita errores de "element not found" si el script carga antes que el HTML.
*   **Manejo de Formularios:**
    *   SIEMPRE usar `event.preventDefault()` para evitar recargas de página.
    *   Usar `form.checkValidity()` para validación nativa HTML5 antes de enviar.
*   **Feedback de Usuario (UX Optimista):**
    *   Si un lead intenta registrarse dos veces (email duplicado), **NO mostrar error rojo**.
    *   Mostrar mensaje de éxito aparente: "✓ ¡Ya te tenemos! Revisa tu email". (Evita frustración y protege privacidad).

---

## 4. 🚀 INFRAESTRUCTURA Y DESPLIEGUE (Hostinger)

### 4.1. Protocolo Anti-Caché (La Vacuna)
Hostinger y los navegadores tienen un caché agresivo que oculta los cambios recientes.
*   **Capa 1 (Servidor):** Archivo `.htaccess` obligatorio en la raíz.
    *   Configuración: `ExpiresByType text/html "access plus 0 seconds"` (HTML siempre fresco).
*   **Capa 2 (Assets):** Versionado manual en HTML ("Cache Busting").
    *   Cambiar `<script src="main.js?v=20">` a `?v=21` en cada deploy significativo.

### 4.2. Checklist de Despliegue
Antes de hacer `git push`:
1.  [ ] ¿Funciona en Local?
2.  [ ] ¿He incrementado la versión `?v=XX` en `index.html`?
3.  [ ] ¿He compilado el SCSS (`npm run build`)?
4.  [ ] ¿El `.htaccess` está presente?

---

## 5. 🧩 SISTEMA "DOBLE DESTINO" (Estrategia)
Todo proyecto web debe tener dos vías de conversión claras:
1.  **Vía Relacional (Lento/Gratis):** Formulario de Contacto o Lead Magnet. Para capturar leads fríos.
2.  **Vía Transaccional (Rápido/Pago):** Agenda o Tienda. Para cerrar ventas directas.
*   *Diseño:* Separar visualmente estas dos acciones (Botón borde vs Botón sólido).

---

## 6. 🛠️ ESTÁNDAR TÉCNICO DE REFERENCIA (El "Starter Pack")

Para no reinventar la rueda, todo nuevo proyecto debe nacer con esta estructura, heredada y perfeccionada de Serenamente.

### 6.1. Estructura de Directorios Estándar
```
Proyecto/
├── .htaccess                    # 🛡️ Seguridad y Caché (OBLIGATORIO)
├── package.json                 # 📦 Scripts de automatización
├── scss/                        # 🎨 Fuente de estilos (Editable)
│   ├── main.scss                # Orquestador
│   ├── _variables.scss          # 🧠 Cerebro de diseño (Colores/Spacing)
│   ├── _responsive.scss         # 📱 Breakpoints estándares
│   └── ... (otros módulos)
├── css/
│   └── styles.css               # ⚠️ NO TOCAR (Generado)
├── js/
│   ├── main.js                  # Lógica UI y Formularios
│   ├── auth.js                  # Autenticación Supabase
│   └── config-loader.js         # Multi-tenant (si aplica)
└── index.html                   # Landing Page
```

### 6.2. Scripts NPM Estándar (`package.json`)
Copia estos scripts para tener el entorno de desarrollo listo en segundos:
```json
"scripts": {
  "watch": "sass --watch scss:css",   // Desarrollo (Auto-compile)
  "build": "sass scss:css",           // Producción (Manual)
  "build:prod": "sass scss:css --style compressed" // Minificado
}
```

### 6.3. Arquitectura SCSS (Los 10 Mandamientos)
El archivo `_variables.scss` debe definir SIEMPRE:
1.  **Colores Semánticos:** `--color-primary`, `--color-secondary`, `--color-accent` (No usar nombres como "rojo" o "azul").
2.  **Espaciado:** `--spacing-sm`, `--spacing-md`, `--spacing-lg` (Para consistencia).
3.  **Breakpoints:**
    - Mobile: 480px
    - Tablet: 768px
    - Desktop: 1200px

---

---

## 7. 📏 ESTÁNDAR VISUAL & RESPONSIVE (La Ley de la Grilla)

El "Responsive" no es hacer que las cosas quepan a la fuerza. Es reordenar el contenido inteligentemente.

### 7.1. Patrones Prohibidos (Anti-Patterns)
*   ❌ **Anchos Fijos:** Jamás usar `width: 500px`. Usar `width: 100%; max-width: 500px;`.
*   ❌ **Mezclar Grid/Flex:** No intentar cambiar el tamaño de columnas Grid usando `flex: 50%` en los hijos. Se debe cambiar `grid-template-columns` en el padre.
*   ❌ **Texto Hormiga:** No bajar de `16px` para texto base en móvil.

### 7.2. El Sistema de Grillas Sagrado (The Grid System)
Para cualquier lista de tarjetas (Servicios, Blog, Testimonios), esta es la regla inquebrantable:

| Dispositivo | Breakpoint | Columnas | Código SCSS (Padre) |
| :--- | :--- | :--- | :--- |
| **Móvil** | < 768px | **1 Columna** | `grid-template-columns: 1fr;` |
| **Tablet** | 768px - 968px | **2 Columnas** | `grid-template-columns: repeat(2, 1fr);` |
| **Desktop** | > 968px | **3 Columnas** | `grid-template-columns: repeat(3, 1fr);` |

---

**Este Playbook es un documento vivo. Si encuentras un nuevo error recurrente, agrégalo aquí.**
