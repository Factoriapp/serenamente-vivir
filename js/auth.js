// ============================================
// SISTEMA DE AUTENTICACIÓN REAL (SUPABASE) - V 2.1
// ============================================
console.log('%c🚀 SERENAMENTE: Cargando sistema de autenticación SUPABASE (V.2.1)', 'background: #222; color: #bada55; padding: 10px; font-weight: bold;');

// Alias para facilitar el uso en el código
function getSupabase() {
    return window.serenamenteSupabase;
}

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

// Obtener solo el primer nombre
function obtenerPrimerNombre(nombreCompleto) {
    if (!nombreCompleto) return '';
    return nombreCompleto.trim().split(' ')[0];
}

/**
 * Obtiene la sesión actual de Supabase
 */
async function obtenerUsuarioActual() {
    const sb = getSupabase();
    if (!sb) {
        console.warn('⚠️ Supabase no inicializado aún.');
        return null;
    }

    try {
        const { data: { session }, error } = await sb.auth.getSession();
        if (error || !session) return null;

        // Obtener perfil detallado
        const { data: profile, error: profileError } = await sb
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

        if (profileError) {
            return session.user;
        }

        return {
            ...session.user,
            ...profile,
            nombre: profile.full_name,
            nivel: profile.user_level,
            tipoUsuario: profile.user_type
        };
    } catch (err) {
        console.error('❌ Error en obtenerUsuarioActual:', err);
        return null;
    }
}

/**
 * Cerrar sesión
 */
async function cerrarSesion() {
    const sb = getSupabase();
    if (sb) await sb.auth.signOut();
    window.location.reload();
}

/**
 * Verificar sesión
 */
async function verificarAutenticacion(nivelRequerido = 1) {
    const usuario = await obtenerUsuarioActual();
    if (!usuario) {
        window.location.href = 'index.html?login=true';
        return false;
    }
    if (usuario.nivel < nivelRequerido) {
        window.location.href = 'membresia.html';
        return false;
    }
    return true;
}

// Mensajes UI
function mostrarError(mensaje, elementoId = 'mensajeError') {
    const elemento = document.getElementById(elementoId);
    if (elemento) {
        elemento.textContent = mensaje;
        elemento.style.display = 'block';
    }
}

function mostrarExito(mensaje, elementoId = 'mensajeExito') {
    const elemento = document.getElementById(elementoId);
    if (elemento) {
        elemento.textContent = mensaje;
        elemento.style.display = 'block';
    }
}

// ============================================
// FORMULARIO DE REGISTRO
// ============================================

window.initializeRegistroForm = function () {
    const form = document.getElementById('registroForm');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const sb = getSupabase();
        if (!sb) return;

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terminos = document.getElementById('terminos').checked;

        if (password !== confirmPassword) {
            mostrarError('Las contraseñas no coinciden');
            return;
        }

        // Registro real en Supabase
        const { data, error } = await sb.auth.signUp({
            email: email,
            password: password,
            options: { data: { full_name: nombre } }
        });

        if (error) {
            mostrarError('Error: ' + error.message);
        } else {
            mostrarExito('¡Cuenta creada! Revisa tu email para confirmar.');
            form.reset();
        }
    });
};

// ============================================
// FORMULARIO DE LOGIN
// ============================================

window.initializeLoginForm = function () {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const sb = getSupabase();
        if (!sb) return;

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const { data, error } = await sb.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            mostrarError('Error: ' + error.message, 'loginMensajeError');
        } else {
            window.location.reload();
        }
    });
};
