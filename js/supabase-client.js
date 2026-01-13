/**
 * SUPABASE CLIENT CONFIGURATION
 * ----------------------------
 * Configuración real para el proyecto Serenamente Vivir.
 */

const SUPABASE_URL = 'https://pprkvdouocehtewpeviu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcmt2ZG91b2NlaHRld3Bldml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMDEyNjQsImV4cCI6MjA4Mzg3NzI2NH0.JMb5cN33iqRD_XLGIz7nBZ_djWcagSBvSKMDOtkOfoI';

// Inicializar el cliente de Supabase
let supabase = null;

if (typeof supabase === 'undefined' || supabase === null) {
    try {
        // En navegadores con el CDN v2, supabase se exporta globalmente
        // Probamos primero el constructor global createClient
        if (typeof createClient === 'function') {
            supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('✅ Supabase Client inicializado (createClient)');
        }
        // Si no, probamos con el objeto supabase del CDN
        else if (window.supabase && typeof window.supabase.createClient === 'function') {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('✅ Supabase Client inicializado (window.supabase)');
        }
    } catch (e) {
        console.error('❌ Error fatal al inicializar Supabase:', e);
    }
}

// Exportar para uso global
window.supabase = supabase;
