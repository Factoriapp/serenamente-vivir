// ============================================
// SISTEMA DE AUTENTICACIÓN SIMPLE
// ============================================
// NOTA: Este es un sistema de demostración usando localStorage
// Para producción, necesitarás un backend real con base de datos

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

// Obtener solo el primer nombre (para mostrar en header y área privada)
function obtenerPrimerNombre(nombreCompleto) {
    if (!nombreCompleto) return '';
    return nombreCompleto.trim().split(' ')[0];
}

// Obtener usuarios del localStorage
function obtenerUsuarios() {
    const usuarios = localStorage.getItem('usuarios');
    return usuarios ? JSON.parse(usuarios) : [];
}

// Guardar usuarios en localStorage
function guardarUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Obtener usuario actual logueado
function obtenerUsuarioActual() {
    try {
        const usuario = localStorage.getItem('usuarioActual');
        if (!usuario) return null;

        const usuarioObj = JSON.parse(usuario);

        // Asegurar que el usuario tiene el campo 'nivel' basado en tipoUsuario
        if (!usuarioObj.nivel) {
            usuarioObj.nivel = mapearTipoANivel(usuarioObj.tipoUsuario || 'gratuito');
        }

        return usuarioObj;
    } catch(e) {
        console.error('❌ JSON corrupto en localStorage:', e);
        localStorage.removeItem('usuarioActual'); // Limpiar dato malo
        return null;
    }
}

// Mapear tipoUsuario a nivel numérico
function mapearTipoANivel(tipoUsuario) {
    switch(tipoUsuario) {
        case 'miembro':
            return 3; // Ana (Premium)
        case 'comprador':
            return 2; // Regina (Registrada/Compradora)
        case 'gratuito':
        default:
            return 1; // Teresa (Visitante registrada)
    }
}

// Guardar usuario actual
function guardarUsuarioActual(usuario) {
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
}

// Cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    // Recargar la página actual para mostrar los botones de login/registro
    window.location.reload();
}

// Verificar si el usuario está logueado
function verificarAutenticacion() {
    const usuario = obtenerUsuarioActual();
    if (!usuario) {
        // Redirigir a la página principal si no está autenticado
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Actualizar tipo de usuario (gratuito → comprador → miembro)
function actualizarTipoUsuario(nuevoTipo) {
    const usuario = obtenerUsuarioActual();
    if (!usuario) return false;

    // Actualizar en el usuario actual
    usuario.tipoUsuario = nuevoTipo;
    usuario.nivel = mapearTipoANivel(nuevoTipo);
    guardarUsuarioActual(usuario);

    // Actualizar en la lista de usuarios
    const usuarios = obtenerUsuarios();
    const index = usuarios.findIndex(u => u.id === usuario.id);
    if (index !== -1) {
        usuarios[index].tipoUsuario = nuevoTipo;
        usuarios[index].nivel = mapearTipoANivel(nuevoTipo);
        guardarUsuarios(usuarios);
    }

    return true;
}

// ============================================
// MIGRACIÓN AUTOMÁTICA DE USUARIOS ANTIGUOS
// ============================================
// Asegura que todos los usuarios tengan el campo 'nivel'
function migrarUsuariosAntiguos() {
    // 1. Migrar lista de usuarios
    const usuarios = obtenerUsuarios();
    let migrados = false;

    usuarios.forEach(usuario => {
        if (!usuario.nivel) {
            usuario.nivel = mapearTipoANivel(usuario.tipoUsuario || 'gratuito');
            migrados = true;
        }
    });

    if (migrados) {
        guardarUsuarios(usuarios);
        console.log('✅ Usuarios migrados: campo "nivel" agregado');
    }

    // 2. Migrar usuario actual si está logueado
    const usuarioActual = localStorage.getItem('usuarioActual');
    if (usuarioActual) {
        const usuario = JSON.parse(usuarioActual);
        if (!usuario.nivel) {
            usuario.nivel = mapearTipoANivel(usuario.tipoUsuario || 'gratuito');
            guardarUsuarioActual(usuario);
            console.log('✅ Usuario actual migrado: campo "nivel" agregado');
        }
    }
}

// Ejecutar migración automáticamente al cargar el script
migrarUsuariosAntiguos();

// Mostrar mensaje de error
function mostrarError(mensaje, elementoId = 'mensajeError') {
    const elemento = document.getElementById(elementoId);
    if (elemento) {
        elemento.textContent = mensaje;
        elemento.style.display = 'block';
        setTimeout(() => {
            elemento.style.display = 'none';
        }, 5000);
    }
}

// Mostrar mensaje de éxito
function mostrarExito(mensaje, elementoId = 'mensajeExito') {
    const elemento = document.getElementById(elementoId);
    if (elemento) {
        elemento.textContent = mensaje;
        elemento.style.display = 'block';
        setTimeout(() => {
            elemento.style.display = 'none';
        }, 3000);
    }
}

// ============================================
// FORMULARIO DE REGISTRO
// ============================================

if (document.getElementById('registroForm')) {
    const registroForm = document.getElementById('registroForm');

    registroForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terminos = document.getElementById('terminos').checked;

        // Validaciones
        if (!nombre || !email || !password || !confirmPassword) {
            mostrarError('Por favor completa todos los campos');
            return;
        }

        if (password !== confirmPassword) {
            mostrarError('Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            mostrarError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (!terminos) {
            mostrarError('Debes aceptar los términos y condiciones');
            return;
        }

        // Verificar si el email ya existe
        const usuarios = obtenerUsuarios();
        const emailExiste = usuarios.some(u => u.email === email);

        if (emailExiste) {
            mostrarError('Este email ya está registrado. ¿Deseas iniciar sesión?');
            return;
        }

        // Crear nuevo usuario
        const nuevoUsuario = {
            id: Date.now().toString(),
            nombre: nombre,
            email: email,
            password: password, // En producción, esto debe estar encriptado
            tipoUsuario: 'gratuito', // Puede ser 'gratuito', 'comprador' o 'miembro'
            nivel: 1, // 1: Teresa (gratuito), 2: Regina (comprador), 3: Ana (miembro)
            fechaRegistro: new Date().toISOString()
        };

        // Guardar usuario
        usuarios.push(nuevoUsuario);
        guardarUsuarios(usuarios);

        // Mostrar mensaje de éxito
        mostrarExito('¡Cuenta creada exitosamente! Redirigiendo...');

        // Limpiar formulario
        registroForm.reset();

        // Loguear automáticamente y redirigir
        setTimeout(() => {
            const usuarioSinPassword = { ...nuevoUsuario };
            delete usuarioSinPassword.password;
            guardarUsuarioActual(usuarioSinPassword);
            window.location.href = 'area-privada.html';
        }, 2000);
    });
}

// ============================================
// FORMULARIO DE LOGIN
// ============================================

if (document.getElementById('loginForm')) {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Obtener valores del formulario (usando IDs del modal)
        const emailInput = document.getElementById('loginEmail') || document.getElementById('email');
        const passwordInput = document.getElementById('loginPassword') || document.getElementById('password');

        const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
        const password = passwordInput ? passwordInput.value : '';

        // Validaciones básicas
        if (!email || !password) {
            mostrarError('Por favor completa todos los campos', 'loginMensajeError');
            return;
        }

        // Buscar usuario
        const usuarios = obtenerUsuarios();
        const usuario = usuarios.find(u => u.email === email && u.password === password);

        if (!usuario) {
            mostrarError('Email o contraseña incorrectos', 'loginMensajeError');
            return;
        }

        // Guardar sesión (sin la contraseña)
        const usuarioSinPassword = { ...usuario };
        delete usuarioSinPassword.password;

        // Asegurar que tiene el campo nivel
        if (!usuarioSinPassword.nivel) {
            usuarioSinPassword.nivel = mapearTipoANivel(usuarioSinPassword.tipoUsuario || 'gratuito');
        }

        guardarUsuarioActual(usuarioSinPassword);

        // Cerrar modal si existe
        if (typeof cerrarModalLogin === 'function') {
            cerrarModalLogin();
            // Recargar la página para actualizar el header
            window.location.reload();
        } else {
            // Si no hay modal (página de login), redirigir al área de miembros
            window.location.href = 'area-privada.html';
        }
    });
}

// ============================================
// BOTÓN DE CERRAR SESIÓN
// ============================================

if (document.getElementById('cerrarSesion')) {
    document.getElementById('cerrarSesion').addEventListener('click', function() {
        // Cerrar sesión directamente sin diálogo molesto
        cerrarSesion();
    });
}

// ============================================
// PROTECCIÓN DE ÁREA DE MIEMBROS
// ============================================

// Si estamos en la página de área de miembros, verificar autenticación
if (window.location.pathname.includes('area-privada.html')) {
    if (verificarAutenticacion()) {
        // Mostrar nombre del usuario
        const usuario = obtenerUsuarioActual();
        const nombreUsuario = document.getElementById('nombreUsuario');
        if (nombreUsuario && usuario) {
            nombreUsuario.textContent = usuario.nombre;
        }
    }
}

// ============================================
// MENSAJE DE CONSOLA
// ============================================

console.log('🔐 Sistema de autenticación cargado');
console.log('⚠️ NOTA: Este es un sistema de demostración usando localStorage');
console.log('⚠️ Para producción, implementa un backend con base de datos real');
