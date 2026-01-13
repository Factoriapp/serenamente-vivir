const SUPABASE_URL = 'https://pprkvdouocehtewpeviu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcmt2ZG91b2NlaHRld3Bldml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMDEyNjQsImV4cCI6MjA4Mzg3NzI2NH0.JMb5cN33iqRD_XLGIz7nBZ_djWcagSBvSKMDOtkOfoI';
let sb = null; try { if (typeof supabase !== 'undefined') { sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); console.log('? MOTOR SUPABASE UNIFICADO Y ACTIVO'); } } catch(e) { console.error(e); }
// ============================================
// SERENAMENTE VIVIR - JAVASCRIPT PRINCIPAL
// ============================================

// CONFIGURACIÓN GLOBAL (Fácil de actualizar para Marlene)
const CONFIG = {
    brandName: 'Serenamente Vivir',
    contactEmail: 'hola@serenamentevivir.com',
    whatsapp: {
        number: '+34600000000',
        message: 'Hola Marlene, vengo de la web y me gustaría recibir más información.'
    },
    socials: {
        instagram: 'https://instagram.com/serenamente.vivir',
        facebook: 'https://facebook.com/serenamente.vivir'
    }
};

/**
 * Inyecta los datos de contacto de forma dinámica en toda la web
 * Busca elementos con data-contact-type
 */
function inicializarDatosContacto() {
    const waLinks = document.querySelectorAll('a[href*="[TU_TELEFONO]"]');
    waLinks.forEach(link => {
        const url = `https://wa.me/${CONFIG.whatsapp.number}?text=${encodeURIComponent(CONFIG.whatsapp.message)}`;
        link.href = url;
    });

    const emailPlaceholders = document.querySelectorAll('.contact-email-placeholder');
    emailPlaceholders.forEach(el => {
        el.textContent = CONFIG.contactEmail;
        if (el.tagName === 'A') el.href = `mailto:${CONFIG.contactEmail}`;
    });
}

// Inicializar al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    inicializarDatosContacto();
});


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
    document.getElementById('leadMagnetForm').addEventListener('submit', function (e) {
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
    window.abrirModalLogin = function () {
        if (loginModal) {
            loginModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    // Función para cerrar el modal de login
    window.cerrarModalLogin = function () {
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
    window.abrirModalRegistro = function () {
        if (registroModal) {
            registroModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    // Función para cerrar el modal de registro
    window.cerrarModalRegistro = function () {
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
    document.addEventListener('keydown', function (e) {
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
document.addEventListener('dictionaryApplied', function () {
    console.log('🔄 Re-inicializando modales después de aplicar diccionario...');
    initializeModals();

    // Re-inicializar formularios
    if (typeof window.initializeLoginForm === 'function') {
        window.initializeLoginForm();
    }
    if (typeof window.initializeRegistroForm === 'function') {
        window.initializeRegistroForm();
    }

    // Actualizar Header
    if (typeof window.actualizarHeaderUsuario === 'function') {
        window.actualizarHeaderUsuario();
    }
});

/**
 * Manejar el envío del formulario de contacto
 */
window.handleContactSubmit = function (event) {
    event.preventDefault();
    const form = event.target;
    const nameInput = document.getElementById('contact-name');
    const name = nameInput ? nameInput.value : 'amiga';

    // Usar la función de utilidad para mostrar el mensaje
    if (typeof mostrarMensajeFormulario === 'function') {
        mostrarMensajeFormulario(form, `✓ Gracias ${name}. Hemos recibido tu mensaje. Te responderemos en menos de 24 horas.`, 'success');
    } else {
        alert(`Gracias ${name}. Hemos recibido tu mensaje. Te responderemos en menos de 24 horas.`);
    }

    form.reset();
};

// Verificación de carga exitosa
console.log('✨ Serenamente Vivir - main.js cargado correctamente - ' + new Date().toLocaleTimeString());
console.log('✅ Lead Magnet: Validación activa');

// ============================================
// FUNCIÓN: Resaltar enlace de navegación activo
// ============================================
function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop(); // Get current file name (e.g., index.html)
    const navLinks = document.querySelectorAll('header nav a');

    navLinks.forEach(link => {
        // Remove active class from all links first
        link.classList.remove('active');

        // Special handling for the "Membresía" link on index.html
        // It points to an anchor on the same page
        if (link.getAttribute('href') === '#membership-featured' && currentPath === 'index.html') {
            link.classList.add('active');
            return;
        }

        // Regular page links
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
    console.log('✅ Navegación: Enlace activo resaltado.');
}

// Ejecutar al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    highlightActiveLink();
    if (typeof window.actualizarHeaderUsuario === 'function') {
        window.actualizarHeaderUsuario();
    }
});

// Re-ejecutar si config-loader.js reemplaza el DOM
document.addEventListener('dictionaryApplied', function () {
    console.log('🔄 Re-resaltando enlace activo después de aplicar diccionario...');
    highlightActiveLink();
    initializeCookieBanner(); // Inicializar aviso de cookies
});

/**
 * ==========================================
 * SISTEMA DE COOKIES (Simplicidad Radical)
 * ==========================================
 */
function initializeCookieBanner() {
    // Si ya han sido aceptadas, no hacer nada
    if (localStorage.getItem('cookiesAceptadas') === 'true') return;

    // Crear el elemento del banner
    const banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-banner__content">
            <p>Usamos cookies para mejorar tu experiencia serena en nuestra web. 
               <a href="cookies.html">Más información</a>
            </p>
            <button id="acceptCookies" class="btn btn-compact">Entendido</button>
        </div>
    `;

    document.body.appendChild(banner);

    // Lógica del botón
    document.getElementById('acceptCookies').addEventListener('click', function () {
        localStorage.setItem('cookiesAceptadas', 'true');
        banner.classList.add('cookie-banner--hidden');
        setTimeout(() => banner.remove(), 500);
    });
}

// ============================================

// LÓGICA DE EXPANSIÓN DE TEXTO

// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // Función: Manejar clic en "Leer más"
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('leer-mas-btn')) {
            const wrapper = e.target.previousElementSibling;
            if (wrapper && wrapper.classList.contains('texto-expandible-wrapper')) {
                wrapper.classList.toggle('is-expanded');

                // Buscar el bloque padre para desbloquear la altura
                const parentBlock = wrapper.closest('.detalle-bloque');
                if (parentBlock) {
                    parentBlock.classList.toggle('expanded-block', wrapper.classList.contains('is-expanded'));
                }

                e.target.textContent = wrapper.classList.contains('is-expanded') ? '- Leer menos' : '+ Leer más detalles';
            }
        }
    });

    // Función: Inicializar botones (ocultar si el texto es corto)
    function initReadMoreButtons() {
        const wrappers = document.querySelectorAll('.texto-expandible-wrapper');

        wrappers.forEach(wrapper => {
            const btn = wrapper.nextElementSibling;

            // Verificar si es un botón de leer más
            if (btn && btn.classList.contains('leer-mas-btn')) {
                // Si el contenido es más alto que el límite (115px según CSS), mostrar botón
                // Añadimos un pequeño margen de error (e.g. 5px)
                if (wrapper.scrollHeight > (wrapper.clientHeight + 5)) {
                    btn.style.display = 'block';
                } else {
                    btn.style.display = 'none';
                    // Opcional: Quitar el gradiente si no hay botón, aunque el CSS lo maneja por clase not(.is-expanded)
                    // Para ser más limpios, podríamos añadir una clase 'no-overflow'
                    wrapper.style.maxHeight = 'none'; // Quitar límite visual si no es necesario
                    wrapper.classList.add('no-truncation'); // Para CSS si queremos quitar el :after
                }
            }
        });
        console.log('✅ Botones "Leer más" inicializados condicionalmente.');
    }

    // Ejecutar al inicio y al redimensionar
    // Le damos un pequeño delay para asegurar renderizado de fuentes/imágenes
    setTimeout(initReadMoreButtons, 100);
    window.addEventListener('resize', initReadMoreButtons);

    // Re-ejecutar si config-loader aplica diccionario
    document.addEventListener('dictionaryApplied', function () {
        setTimeout(initReadMoreButtons, 100);
    });

});

// ============================================
// LÓGICA DE HEADER Y SESIÓN (UI)
// ============================================

/**
 * Actualiza la visibilidad de los elementos del header según el estado de la sesión
 */
window.actualizarHeaderUsuario = async function () {
    if (typeof obtenerUsuarioActual !== 'function') {
        console.warn('⚠️ actualizarHeaderUsuario: obtenerUsuarioActual no definida (¿auth.js cargado?)');
        return;
    }

    const usuario = await obtenerUsuarioActual();
    const btnIniciarSesion = document.getElementById('btnIniciarSesion');
    const userMenuContainer = document.getElementById('userMenuContainer');
    const nombreUsuarioHeader = document.getElementById('nombreUsuarioHeader');

    if (usuario) {
        // Usuario logueado → Mostrar dropdown con nombre
        if (nombreUsuarioHeader) {
            nombreUsuarioHeader.textContent = typeof obtenerPrimerNombre === 'function'
                ? obtenerPrimerNombre(usuario.nombre)
                : usuario.nombre.split(' ')[0];
        }
        if (btnIniciarSesion) btnIniciarSesion.style.display = 'none';
        if (userMenuContainer) userMenuContainer.style.display = 'inline-block';
    } else {
        // No hay usuario → Mostrar "Iniciar Sesión"
        if (btnIniciarSesion) btnIniciarSesion.style.display = 'inline-block';
        if (userMenuContainer) userMenuContainer.style.display = 'none';
    }
    console.log('✅ Header: Estado de usuario actualizado (Supabase)');
};

/**
 * Toggle dropdown de usuario
 */
window.toggleUserDropdown = function () {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
};

/**
 * Ir a Espacio Privado (verificar si está logueado)
 */
window.irAEspacioPrivado = async function () {
    const usuario = typeof obtenerUsuarioActual === 'function' ? await obtenerUsuarioActual() : null;

    if (usuario) {
        // Usuario logueado → ir al área privada
        window.location.href = 'area-privada.html';
    } else {
        // No hay usuario → abrir modal de login
        if (typeof window.abrirModalLogin === 'function') {
            window.abrirModalLogin();
        } else {
            window.location.href = 'index.html?login=true';
        }
    }
};

/**
 * Cerrar sesión con confirmación
 */
window.cerrarSesion = function () {
    if (confirm('¿Seguro que quieres cerrar sesión?')) {
        localStorage.removeItem('usuarioActual');
        window.location.reload();
    }
};

// Cerrar dropdown al hacer click fuera
document.addEventListener('click', function (e) {
    const userMenuContainer = document.getElementById('userMenuContainer');
    const userDropdown = document.getElementById('userDropdown');

    if (userMenuContainer && !userMenuContainer.contains(e.target)) {
        if (userDropdown) {
            userDropdown.style.display = 'none';
        }
    }
});


