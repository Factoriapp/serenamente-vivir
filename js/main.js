// ============================================
// SERENAMENTE VIVIR - JAVASCRIPT PRINCIPAL
// ============================================

// ============================================
// FUNCIÓN AUXILIAR: Mostrar mensajes en formularios
// ============================================
function mostrarMensajeFormulario(form, mensaje, tipo = 'success') {
    // Buscar si ya existe un div de mensaje
    let mensajeDiv = form.querySelector('.form-mensaje');

    if (!mensajeDiv) {
        // Crear el div de mensaje
        mensajeDiv = document.createElement('div');
        mensajeDiv.className = 'form-mensaje';
        mensajeDiv.style.cssText = `
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 8px;
            font-size: 0.95rem;
            text-align: center;
            transition: all 0.3s ease;
        `;
        form.appendChild(mensajeDiv);
    }

    // Aplicar estilos según el tipo
    if (tipo === 'success') {
        mensajeDiv.style.background = 'linear-gradient(135deg, #d4edda, #c3e6cb)';
        mensajeDiv.style.color = '#155724';
        mensajeDiv.style.border = '1px solid #c3e6cb';
    } else {
        mensajeDiv.style.background = 'linear-gradient(135deg, #f8d7da, #f5c6cb)';
        mensajeDiv.style.color = '#721c24';
        mensajeDiv.style.border = '1px solid #f5c6cb';
    }

    // Mostrar mensaje
    mensajeDiv.textContent = mensaje;
    mensajeDiv.style.display = 'block';

    // Ocultar después de 5 segundos
    setTimeout(() => {
        mensajeDiv.style.opacity = '0';
        setTimeout(() => {
            mensajeDiv.style.display = 'none';
            mensajeDiv.style.opacity = '1';
        }, 300);
    }, 5000);
}

// ============================================
// VALIDACIÓN LEAD MAGNET - CON MENSAJES HTML5
// ============================================

if (document.getElementById('leadMagnetForm')) {
    const leadName = document.getElementById('leadName');
    const leadEmail = document.getElementById('leadEmail');
    const consentCheckbox = document.getElementById('consentCheckbox');
    const leadSubmitBtn = document.getElementById('leadSubmitBtn');

    function validar() {
        const nombre = leadName.value.trim();
        const email = leadEmail.value.trim();
        const checkbox = consentCheckbox.checked;

        // Las 3 condiciones
        const todoValido = nombre.length > 0 && email.includes('@') && checkbox;

        // Solo cambiar color (NO disabled para permitir validación HTML5)
        if (todoValido) {
            leadSubmitBtn.classList.remove('btn-secondary');
            leadSubmitBtn.classList.add('btn-primary');
        } else {
            leadSubmitBtn.classList.remove('btn-primary');
            leadSubmitBtn.classList.add('btn-secondary');
        }
    }

    // Validar en tiempo real
    leadName.addEventListener('input', validar);
    leadEmail.addEventListener('input', validar);
    consentCheckbox.addEventListener('change', validar);

    // Submit
    document.getElementById('leadMagnetForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Verificar si el formulario es válido
        if (this.checkValidity()) {
            console.log('📧 Lead enviado:', { nombre: leadName.value, email: leadEmail.value });
            mostrarMensajeFormulario(this, '✓ ¡Perfecto! Revisa tu email para descargar el recurso.', 'success');
            this.reset();
            validar(); // Resetear botón
        } else {
            // Si no es válido, forzar mostrar mensajes de validación HTML5
            this.reportValidity();
        }
    });

    // Estado inicial
    validar();
}

// ============================================
// MODAL DE LOGIN Y REGISTRO - INICIALIZACIÓN
// ============================================

function initializeModals() {
    const loginModal = document.getElementById('loginModal');
    const loginModalClose = document.getElementById('loginModalClose');
    const loginModalOverlay = document.getElementById('loginModalOverlay');
    const registroModal = document.getElementById('registroModal');
    const registroModalClose = document.getElementById('registroModalClose');
    const registroModalOverlay = document.getElementById('registroModalOverlay');

    // Función para abrir el modal de login
    window.abrirModalLogin = function() {
        if (loginModal) {
            loginModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    // Función para cerrar el modal de login
    window.cerrarModalLogin = function() {
        if (loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    // Cerrar modal de login al hacer clic en X
    if (loginModalClose) {
        loginModalClose.addEventListener('click', window.cerrarModalLogin);
    }

    // Cerrar modal de login al hacer clic en overlay
    if (loginModalOverlay) {
        loginModalOverlay.addEventListener('click', window.cerrarModalLogin);
    }

    // Función para abrir el modal de registro
    window.abrirModalRegistro = function() {
        if (registroModal) {
            registroModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    // Función para cerrar el modal de registro
    window.cerrarModalRegistro = function() {
        if (registroModal) {
            registroModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    // Cerrar modal de registro al hacer clic en X
    if (registroModalClose) {
        registroModalClose.addEventListener('click', window.cerrarModalRegistro);
    }

    // Cerrar modal de registro al hacer clic en overlay
    if (registroModalOverlay) {
        registroModalOverlay.addEventListener('click', window.cerrarModalRegistro);
    }

    // Cerrar modales con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const loginModal = document.getElementById('loginModal');
            const registroModal = document.getElementById('registroModal');

            if (loginModal && loginModal.style.display === 'flex') {
                window.cerrarModalLogin();
            }
            if (registroModal && registroModal.style.display === 'flex') {
                window.cerrarModalRegistro();
            }
        }
    });

    console.log('✅ Modales Login/Registro: Event listeners registrados');
}

// Inicializar modales por primera vez
initializeModals();

// Inicializar formularios (después de que los modales existan)
if (typeof window.initializeLoginForm === 'function') {
    window.initializeLoginForm();
}
if (typeof window.initializeRegistroForm === 'function') {
    window.initializeRegistroForm();
}

// Re-inicializar modales si config-loader.js reemplaza el DOM
document.addEventListener('dictionaryApplied', function() {
    console.log('🔄 Re-inicializando modales después de aplicar diccionario...');
    initializeModals();

    // Re-inicializar formularios
    if (typeof window.initializeLoginForm === 'function') {
        window.initializeLoginForm();
    }
    if (typeof window.initializeRegistroForm === 'function') {
        window.initializeRegistroForm();
    }
});

// Verificación de carga exitosa
console.log('✨ Serenamente Vivir - main.js cargado correctamente - ' + new Date().toLocaleTimeString());
console.log('✅ Lead Magnet: Validación activa');
