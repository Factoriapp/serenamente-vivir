/**
 * SUPABASE CLIENT CONFIGURATION
 * ----------------------------
 * V.2.2 - Conexión Robusta + Debug
 */
console.log('📡 [Supabase Client] Iniciando carga de archivo...');

const SUPABASE_URL = 'https://pprkvdouocehtewpeviu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcmt2ZG91b2NlaHRld3Bldml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMDEyNjQsImV4cCI6MjA4Mzg3NzI2NH0.JMb5cN33iqRD_XLGIz7nBZ_djWcagSBvSKMDOtkOfoI';

// Usamos una variable global clara para evitar conflictos
window.serenamenteSupabase = null;

(function () {
    try {
        // Intentar inicializar usando las diferentes formas que ofrece el CDN
        if (typeof supabase !== 'undefined' && typeof supabase.createClient === 'function') {
            window.serenamenteSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('✅ Supabase: Inicializado vía objeto global');
        } else if (typeof createClient === 'function') {
            window.serenamenteSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('✅ Supabase: Inicializado vía función global');
        } else {
            console.error('❌ Supabase: No se encontró la librería en el DOM.');
        }
    } catch (e) {
        console.error('❌ Supabase: Error crítico en inicialización:', e);
    }
})();
