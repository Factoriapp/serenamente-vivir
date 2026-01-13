/**
 * SUPABASE CLIENT CONFIGURATION
 * ----------------------------
 * Configuración real para el proyecto Serenamente Vivir.
 */

const SUPABASE_URL = 'https://pprkvdouocehtewpeviu.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_8Pdc5x9Z4kn_Fc2ExXNuxA_8m5Aazu6';

// Inicializar el cliente de Supabase
let supabase = null;

if (typeof supabase === 'undefined' || supabase === null) {
    if (typeof supabase !== 'undefined' && typeof supabase.createClient === 'function') {
        supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase Client inicializado correctamente');
    } else if (typeof document !== 'undefined') {
        // En navegadores, a veces el SDK se carga directamente en el objeto window o requiere el constructor
        // Verificamos si existe la función global createClient (típico del CDN v2)
        if (typeof supabase === 'undefined' || supabase === null) {
            try {
                // El CDN de Supabase suele exponer supabase.createClient o una función global createClient
                if (window.supabase && typeof window.supabase.createClient === 'function') {
                    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
                    console.log('✅ Supabase Client inicializado desde window.supabase');
                } else if (typeof createClient === 'function') {
                    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
                    console.log('✅ Supabase Client inicializado desde createClient global');
                }
            } catch (e) {
                console.error('❌ Error al intentar inicializar Supabase:', e);
            }
        }
    }
}

// Exportar para uso global
window.supabase = supabase;
