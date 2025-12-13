/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CONFIG-LOADER.JS - Sistema Multi-Tenant Whitelabel
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Propósito: Cargar configuración dinámica por tenant según el dominio
 * Arquitectura: Multi-Tenant con Base de Datos Compartida (tenant_id)
 * Fase: MVP (JSON estático) → Producción (Base de Datos)
 *
 * Funcionalidad:
 * 1. Detectar hostname y mapear a tenant_id
 * 2. Cargar configuración JSON del tenant
 * 3. Aplicar tema CSS dinámico (27 variables CSS)
 * 4. Aplicar diccionario semántico ({{client_term}}, etc.)
 * 5. Activar/Desactivar features según Feature Flags
 * 6. Cargar pack de iconos correspondiente
 *
 * Autor: Devito (Arquitecto Técnico)
 * Fecha: 14 de Noviembre de 2025
 * Versión: 1.0 - MVP
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURACIÓN GLOBAL
// ═══════════════════════════════════════════════════════════════════════════

const TENANT_CONFIG = {
    // Mapeo de dominios a tenant_id
    domainMap: {
        'impulsopro.com': 'impulso_pro',
        'www.impulsopro.com': 'impulso_pro',

        'impulsohol.com': 'impulso_hol',
        'www.impulsohol.com': 'impulso_hol',

        'serenamentevivir.com': 'serenamente',
        'www.serenamentevivir.com': 'serenamente',
        'localhost': 'serenamente', // Desarrollo local (Serenamente)
        '127.0.0.1': 'serenamente', // Desarrollo local

        // Futuros tenants B2B
        'colegiopsicologos.impulso.pro': 'colegio_psicologos',
        'escuelaastrologia.impulso.pro': 'escuela_astrologia'
    },

    // Tenant por defecto (fallback)
    defaultTenant: 'serenamente',

    // Ruta base de configuraciones
    configBasePath: '/config/tenants/'
};

// Variable global para almacenar la configuración cargada
window.TENANT_CONFIG = null;

// ═══════════════════════════════════════════════════════════════════════════
// FUNCIÓN PRINCIPAL: Cargar Configuración del Tenant
// ═══════════════════════════════════════════════════════════════════════════

async function loadTenantConfig() {
    try {
        console.log('🚀 [CONFIG-LOADER] Iniciando carga de configuración...');

        // 1. Detectar tenant_id según hostname
        const tenantId = detectTenantId();
        console.log(`🏢 [CONFIG-LOADER] Tenant detectado: ${tenantId}`);

        // 2. Cargar configuración JSON del tenant
        const config = await fetchTenantConfig(tenantId);
        console.log('📦 [CONFIG-LOADER] Configuración cargada:', config);

        // 3. Almacenar configuración globalmente
        window.TENANT_CONFIG = config;

        // 4. Aplicar configuración a la página
        applyTheme(config.theme);
        applyDictionary(config.dictionary);
        applyFeatures(config.features);
        applyBranding(config.brand);
        loadIconPack(config.icon_pack);

        console.log('✅ [CONFIG-LOADER] Configuración aplicada exitosamente');

        // 5. Disparar evento personalizado para otros scripts
        document.dispatchEvent(new CustomEvent('tenantConfigLoaded', {
            detail: config
        }));

        return config;

    } catch (error) {
        console.error('❌ [CONFIG-LOADER] Error al cargar configuración:', error);

        // Fallback: aplicar configuración por defecto
        applyDefaultConfig();

        throw error;
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// DETECCIÓN DE TENANT
// ═══════════════════════════════════════════════════════════════════════════

function detectTenantId() {
    const hostname = window.location.hostname;

    // Buscar en el mapeo de dominios
    const tenantId = TENANT_CONFIG.domainMap[hostname];

    if (tenantId) {
        return tenantId;
    }

    // Si no se encuentra, usar tenant por defecto
    console.warn(`⚠️ [CONFIG-LOADER] Dominio no mapeado: ${hostname}. Usando tenant por defecto.`);
    return TENANT_CONFIG.defaultTenant;
}

// ═══════════════════════════════════════════════════════════════════════════
// CARGA DE CONFIGURACIÓN
// ═══════════════════════════════════════════════════════════════════════════

async function fetchTenantConfig(tenantId) {
    const configUrl = `${TENANT_CONFIG.configBasePath}${tenantId}.json`;

    try {
        const response = await fetch(configUrl);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const config = await response.json();

        // Validar que la configuración tenga la estructura correcta
        if (!config.tenant_id || !config.theme || !config.dictionary) {
            throw new Error('Configuración incompleta o inválida');
        }

        return config;

    } catch (error) {
        console.error(`❌ [CONFIG-LOADER] Error al cargar ${configUrl}:`, error);
        throw error;
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// APLICACIÓN DE TEMA (CSS Variables)
// ═══════════════════════════════════════════════════════════════════════════

function applyTheme(theme) {
    console.log('🎨 [CONFIG-LOADER] Aplicando tema CSS...');

    const root = document.documentElement;

    // Mapeo de configuración JSON a variables CSS del styles.css
    const cssVariableMap = {
        'primary_color': '--color-primary',
        'secondary_color': '--color-secondary',
        'accent_color': '--color-accent',
        'bg_primary': '--color-bg-primary',
        'bg_secondary': '--color-bg-secondary',
        'bg_neutral': '--color-bg-neutral',
        'text_color': '--color-text',
        'text_light': '--color-text-light',
        'text_muted': '--color-muted-text',
        'border_color': '--color-border',
        'success_color': '--color-success',
        'warning_color': '--color-warning',
        'error_color': '--color-error',
        'font_primary': '--font-primary',
        'font_secondary': '--font-secondary',
        'border_radius': '--border-radius',
        'shadow_soft': '--shadow-soft'
    };

    // Aplicar cada variable CSS
    Object.keys(cssVariableMap).forEach(configKey => {
        const cssVar = cssVariableMap[configKey];
        const value = theme[configKey];

        if (value) {
            root.style.setProperty(cssVar, value);
            console.log(`  ✓ ${cssVar}: ${value}`);
        }
    });

    // Aplicar colores derivados (versiones claras/oscuras)
    applyDerivedColors(theme);
}

function applyDerivedColors(theme) {
    const root = document.documentElement;

    // Generar versiones claras del color primario
    if (theme.primary_color) {
        const primaryLight = lightenColor(theme.primary_color, 0.9);
        const primaryDark = darkenColor(theme.primary_color, 0.2);

        root.style.setProperty('--color-bg-primary-light', primaryLight);
        root.style.setProperty('--color-primary-dark', primaryDark);
    }

    // Generar versiones claras del color secundario
    if (theme.secondary_color) {
        const secondaryLight = lightenColor(theme.secondary_color, 0.9);

        root.style.setProperty('--color-bg-secondary-light', secondaryLight);
    }
}

// Función auxiliar para aclarar color (simplificada)
function lightenColor(color, amount) {
    // Convertir hex a RGB y aclarar
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const newR = Math.round(r + (255 - r) * amount);
    const newG = Math.round(g + (255 - g) * amount);
    const newB = Math.round(b + (255 - b) * amount);

    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

// Función auxiliar para oscurecer color
function darkenColor(color, amount) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const newR = Math.round(r * (1 - amount));
    const newG = Math.round(g * (1 - amount));
    const newB = Math.round(b * (1 - amount));

    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

// ═══════════════════════════════════════════════════════════════════════════
// APLICACIÓN DE DICCIONARIO SEMÁNTICO
// ═══════════════════════════════════════════════════════════════════════════

function applyDictionary(dictionary) {
    console.log('📝 [CONFIG-LOADER] Aplicando diccionario semántico...');

    // Buscar todos los elementos con placeholders {{term}}
    const bodyHTML = document.body.innerHTML;

    let updatedHTML = bodyHTML;

    // Reemplazar cada término del diccionario
    Object.keys(dictionary).forEach(key => {
        const placeholder = `{{${key}}}`;
        const value = dictionary[key];

        // Usar regex global para reemplazar todas las ocurrencias
        const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        updatedHTML = updatedHTML.replace(regex, value);

        console.log(`  ✓ ${placeholder} → ${value}`);
    });

    // Actualizar el DOM
    document.body.innerHTML = updatedHTML;

    // Re-ejecutar event listeners que se hayan perdido
    reinitializeEventListeners();
}

function reinitializeEventListeners() {
    // Nota: Después de reemplazar innerHTML, los event listeners se pierden
    // Aquí deberíamos re-ejecutar los scripts que añaden listeners
    // Por ahora, disparamos un evento para que otros scripts se re-inicialicen
    document.dispatchEvent(new CustomEvent('dictionaryApplied'));
}

// ═══════════════════════════════════════════════════════════════════════════
// APLICACIÓN DE FEATURE FLAGS
// ═══════════════════════════════════════════════════════════════════════════

function applyFeatures(features) {
    console.log('🔧 [CONFIG-LOADER] Aplicando Feature Flags...');

    // Ocultar/mostrar módulos según features
    Object.keys(features).forEach(featureName => {
        const isEnabled = features[featureName];

        // Buscar todos los elementos con data-feature="nombre_feature"
        const elements = document.querySelectorAll(`[data-feature="${featureName}"]`);

        elements.forEach(element => {
            if (isEnabled) {
                element.style.display = ''; // Mostrar (usar el display original)
                element.removeAttribute('hidden');
                console.log(`  ✓ Feature "${featureName}" habilitada`);
            } else {
                element.style.display = 'none'; // Ocultar
                element.setAttribute('hidden', 'true');
                console.log(`  ✗ Feature "${featureName}" deshabilitada`);
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// APLICACIÓN DE BRANDING
// ═══════════════════════════════════════════════════════════════════════════

function applyBranding(brand) {
    console.log('🏷️ [CONFIG-LOADER] Aplicando branding...');

    // Actualizar título de la página
    if (brand.name) {
        const titleElements = document.querySelectorAll('[data-brand="name"]');
        titleElements.forEach(el => {
            el.textContent = brand.name;
        });
    }

    // Actualizar tagline
    if (brand.tagline) {
        const taglineElements = document.querySelectorAll('[data-brand="tagline"]');
        taglineElements.forEach(el => {
            el.textContent = brand.tagline;
        });
    }

    // Actualizar logo
    if (brand.logo_url) {
        const logoElements = document.querySelectorAll('[data-brand="logo"]');
        logoElements.forEach(el => {
            if (el.tagName === 'IMG') {
                el.src = brand.logo_url;
                el.alt = brand.name;
            } else {
                el.style.backgroundImage = `url(${brand.logo_url})`;
            }
        });
    }

    // Actualizar favicon
    if (brand.favicon) {
        const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
        link.rel = 'icon';
        link.href = brand.favicon;
        document.head.appendChild(link);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// CARGA DE PACK DE ICONOS
// ═══════════════════════════════════════════════════════════════════════════

function loadIconPack(iconPack) {
    console.log(`🎨 [CONFIG-LOADER] Cargando pack de iconos: ${iconPack}`);

    // Marcar el body con el icon pack activo (para CSS)
    document.body.setAttribute('data-icon-pack', iconPack);

    // En Fase 2, aquí cargaríamos dinámicamente los SVG desde /assets/icons/{iconPack}/
    // Por ahora, solo marcamos el atributo para que CSS pueda actuar
}

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURACIÓN POR DEFECTO (FALLBACK)
// ═══════════════════════════════════════════════════════════════════════════

function applyDefaultConfig() {
    console.warn('⚠️ [CONFIG-LOADER] Aplicando configuración por defecto...');

    // Aplicar configuración mínima de Impulso Pro
    const defaultTheme = {
        primary_color: '#003d82',
        secondary_color: '#6B9080',
        bg_primary: '#ffffff',
        text_color: '#333333'
    };

    applyTheme(defaultTheme);
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILIDADES PÚBLICAS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Obtener valor del diccionario actual
 * Uso: getTerm('client_term') → "Clientes" | "Consultantes"
 */
function getTerm(termKey) {
    if (!window.TENANT_CONFIG || !window.TENANT_CONFIG.dictionary) {
        console.warn(`⚠️ [CONFIG-LOADER] Configuración no cargada aún`);
        return termKey;
    }

    return window.TENANT_CONFIG.dictionary[termKey] || termKey;
}

/**
 * Verificar si una feature está habilitada
 * Uso: isFeatureEnabled('carta_astral') → true | false
 */
function isFeatureEnabled(featureName) {
    if (!window.TENANT_CONFIG || !window.TENANT_CONFIG.features) {
        return false;
    }

    return window.TENANT_CONFIG.features[featureName] === true;
}

/**
 * Obtener configuración completa del tenant actual
 */
function getCurrentTenantConfig() {
    return window.TENANT_CONFIG;
}

// ═══════════════════════════════════════════════════════════════════════════
// INICIALIZACIÓN AUTOMÁTICA
// ═══════════════════════════════════════════════════════════════════════════

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTenantConfig);
} else {
    // DOM ya está listo, ejecutar inmediatamente
    loadTenantConfig();
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTAR FUNCIONES PÚBLICAS
// ═══════════════════════════════════════════════════════════════════════════

window.TenantConfig = {
    load: loadTenantConfig,
    getTerm: getTerm,
    isFeatureEnabled: isFeatureEnabled,
    getCurrentConfig: getCurrentTenantConfig
};
