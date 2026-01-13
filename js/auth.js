// ============================================
// SISTEMA DE AUTENTICACIÓN REAL (SUPABASE)
// ============================================

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
    if (!supabase) return null;

    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) return null;

    // Obtener perfil detallado de la tabla 'profiles'
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

    if (profileError) {
        console.error('❌ Error obteniendo perfil:', profileError);
        return session.user; // Devolvemos al menos el usuario de auth
    }

    return {
        ...session.user,
        ...profile,
        nombre: profile.full_name, // Mapeo para compatibilidad
        nivel: profile.user_level,
        tipoUsuario: profile.user_type
    };
}

/**
 * Cerrar sesión en Supabase
 */
async function cerrarSesion() {
    if (!supabase) return;
    await supabase.auth.signOut();
    window.location.reload();
}

/**
 * Verificar si el usuario está logueado y tiene el nivel necesario
 */
async function verificarAutenticacion(nivelRequerido = 1) {
    const usuario = await obtenerUsuarioActual();
    if (!usuario) {
        window.location.href = 'index.html?login=true';
        return false;
    }

    if (usuario.user_level < nivelRequerido) {
        window.location.href = 'membresia.html';
        return false;
    }

    return true;
}

/**
 * Simulación de Upgrade (en producción se haría tras pago en Stripe)
 */
async function upgradeUsuarioAMiembro() {
    const usuario = await obtenerUsuarioActual();
    if (!usuario) return false;

    if (!confirm('¿Deseas confirmar la suscripción a la Membresía Premium (29€/mes)?')) {
        return false;
    }

    const { error } = await supabase
        .from('profiles')
        .update({
            user_type: 'miembro',
            user_level: 3
        })
        .eq('id', usuario.id);

    if (error) {
        mostrarError('Error al actualizar membresía: ' + error.message);
        return false;
    }

    mostrarExito('¡Felicidades! Ahora eres miembro Premium.');
    setTimeout(() => { window.location.href = 'area-privada.html'; }, 1500);
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

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terminos = document.getElementById('terminos').checked;

        if (password !== confirmPassword) {
            mostrarError('Las contraseñas no coinciden');
            return;
        }

        if (!terminos) {
            mostrarError('Debes aceptar los términos');
            return;
        }

        // Registro en Supabase
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: nombre
                }
            }
        });

        if (error) {
            mostrarError('Error en registro: ' + error.message);
        } else {
            mostrarExito('¡Cuenta creada! Revisa tu email para confirmar y luego inicia sesión.');
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

        const email = (document.getElementById('loginEmail') || {}).value;
        const password = (document.getElementById('loginPassword') || {}).value;

        if (!email || !password) {
            mostrarError('Completa todos los campos', 'loginMensajeError');
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            mostrarError('Credenciales incorrectas: ' + error.message, 'loginMensajeError');
        } else {
            if (typeof cerrarModalLogin === 'function') {
                cerrarModalLogin();
                window.location.reload();
            } else {
                window.location.href = 'area-privada.html';
            }
        }
    });
};

console.log('🔐 Sistema Autenticación Supabase Cargado');
