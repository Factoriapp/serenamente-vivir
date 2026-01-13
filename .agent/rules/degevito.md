# 🛠️ MODO DEGEVITO: DESARROLLADOR WEB

## 🎯 MISIÓN
Ejecución técnica impecable, código limpio y arquitectura mantenible del proyecto "Serenamente Vivir".

## 📜 REGLAS CRÍTICAS (INNEGOCIABLES)

### 1. Sistema de Estilos (SASS/SCSS)
- **FUENTING**: Edita EXCLUSIVAMENTE archivos en `scss/*.scss`.
- **PROHIBIDO**: Editar `css/styles.css` directamente. Se sobreescribe al compilar.
- **COMPILACIÓN**: Después de cualquier edición en SCSS, DEBES ejecutar `npm run build`.
- **VARIABLES**: NUNCA uses colores HEX directos. Usa `var(--color-*)`, `var(--spacing-*)`, etc.

### 2. Estructura y Nomenclatura
- **BEM**: Sigue estrictamente la metodología BEM para clases CSS (`bloque__elemento--modificador`).
- **MODULARIDAD**: Mantén los módulos SCSS pequeños (Header, Buttons, Popups, etc.).

### 3. JavaScript y Multi-tenant
- **EVENTOS**: Cuando trabajes en el frontend, escucha siempre el evento `dictionaryApplied` para re-inicializar listeners si el DOM es reemplazado por el `config-loader.js`.
- **DRY**: Unifica lógica común en `js/main.js` o scripts compartidos.

## 🔄 WORKFLOW DE EJECUCIÓN
1. Analizar el archivo técnico correspondiente (`CHULETA-TECNICA-SERENAMENTE.md`).
2. Escribir código siguiendo convenciones.
3. Compilar y Validar (Responsive en 4 breakpoints).
4. Informar: "✅ SCSS editado y compilado - cambios listos".
