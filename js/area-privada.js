// ============================================
// ÁREA PRIVADA - FLUJO VERTICAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    const usuario = obtenerUsuarioActual();

    // Verificar si el usuario está logueado
    if (!usuario) {
        window.location.href = 'index.html';
        return;
    }

    const tipoUsuario = usuario.tipoUsuario || 'gratuito';

    // Solo necesita estar registrado/logueado para acceder
    // Teresa (gratuita), Regina (compradora) y Ana (miembro) tienen acceso

    // ============================================
    // ACTUALIZAR HEADER
    // ============================================

    const userName = document.getElementById('userName');
    const userBadge = document.getElementById('userBadge');

    if (userName) userName.textContent = usuario.nombre;

    if (userBadge) {
        userBadge.classList.remove('user-badge-inline--free', 'user-badge-inline--customer', 'user-badge-inline--premium');

        switch(tipoUsuario) {
            case 'miembro':
                userBadge.textContent = 'Premium';
                userBadge.classList.add('user-badge-inline--premium');
                break;
            case 'comprador':
                userBadge.textContent = 'Cliente';
                userBadge.classList.add('user-badge-inline--customer');
                break;
            default:
                userBadge.textContent = 'Gratuito';
                userBadge.classList.add('user-badge-inline--free');
        }
    }

    // ============================================
    // BLOQUE 1: CONSUMO
    // ============================================

    renderContinuarViendo(usuario, tipoUsuario);
    renderRecursos(usuario, tipoUsuario);
    renderExplorar(usuario, tipoUsuario);

    // ============================================
    // BLOQUE 2: UPSELL
    // ============================================

    renderUpsell(usuario, tipoUsuario);

    // ============================================
    // BLOQUE 3: GESTIÓN
    // ============================================

    renderGestion(usuario, tipoUsuario);

    console.log('Área privada cargada - Tipo: ' + tipoUsuario);
});

// ============================================
// RENDERIZAR: CONTINUAR VIENDO
// ============================================

function renderContinuarViendo(usuario, tipoUsuario) {
    const container = document.getElementById('continuarViendoWidget');
    if (!container) return;

    let html = '';

    // Si tiene curso en progreso
    if (usuario.ultimoCurso || (usuario.cursosComprados && usuario.cursosComprados.length > 0)) {
        const curso = usuario.ultimoCurso || (usuario.cursosComprados ? usuario.cursosComprados[0] : null);

        if (curso) {
            html = `
                <div class="content-card content-card--featured">
                    <div class="card-header">
                        <h3 class="card-title">▶️ Continuar Viendo</h3>
                        <span class="card-icon">🎯</span>
                    </div>
                    <h4 style="margin-bottom: 0.5rem; font-size: 1.1rem;">${curso.titulo || 'Curso en progreso'}</h4>
                    <p style="color: var(--color-text-light); margin-bottom: 1rem;">
                        ${curso.leccion ? 'Lección ' + curso.leccion : 'Progreso: ' + (curso.progreso || 0) + '%'}
                    </p>
                    <div class="card-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${curso.progreso || 0}%"></div>
                        </div>
                        <div class="progress-text">${curso.progreso || 0}% completado</div>
                    </div>
                    <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                        Continuar Curso
                    </button>
                </div>
            `;
        }
    }
    // Si no hay curso en progreso, no mostrar nada

    container.innerHTML = html;
}

// ============================================
// RENDERIZAR: MIS RECURSOS
// ============================================

function renderRecursos(usuario, tipoUsuario) {
    const container = document.getElementById('recursosContent');
    if (!container) return;

    let html = '';

    if (tipoUsuario === 'miembro') {
        // MIEMBRO PREMIUM: Acceso total a recursos variados
        html = `
            <div style="background: var(--color-success-bg); padding: 1.5rem; border-radius: 12px; border-left: 4px solid var(--color-success); margin-bottom: 2rem;">
                <p style="margin: 0; color: var(--color-success-dark); font-weight: 500;">
                    ✓ [Como Miembro Premium, tienes acceso ilimitado a TODOS los recursos]
                </p>
            </div>
            <div class="library-list">
                <div class="library-item" onclick="console.log('🔧 Acceso a recurso - En desarrollo')" style="cursor: pointer;">
                    <div class="library-item-icon">🎓</div>
                    <div class="library-item-content">
                        <div class="library-item-title">[Cursos y Formaciones]</div>
                        <div class="library-item-meta">[Acceso completo • Sin límites]</div>
                    </div>
                    <span style="color: var(--color-primary);">→</span>
                </div>
                <div class="library-item" onclick="console.log('🔧 Acceso a recurso - En desarrollo')" style="cursor: pointer;">
                    <div class="library-item-icon">📄</div>
                    <div class="library-item-content">
                        <div class="library-item-title">[Guías y PDFs Premium]</div>
                        <div class="library-item-meta">[Descargables exclusivos]</div>
                    </div>
                    <span style="color: var(--color-primary);">→</span>
                </div>
                <div class="library-item" onclick="console.log('🔧 Acceso a recurso - En desarrollo')" style="cursor: pointer;">
                    <div class="library-item-icon">🎬</div>
                    <div class="library-item-content">
                        <div class="library-item-title">[Videos y Masterclasses]</div>
                        <div class="library-item-meta">[En vivo y grabados]</div>
                    </div>
                    <span style="color: var(--color-primary);">→</span>
                </div>
                <div class="library-item" onclick="console.log('🔧 Acceso a recurso - En desarrollo')" style="cursor: pointer;">
                    <div class="library-item-icon">🛠️</div>
                    <div class="library-item-content">
                        <div class="library-item-title">[Plantillas y Herramientas]</div>
                        <div class="library-item-meta">[Recursos prácticos]</div>
                    </div>
                    <span style="color: var(--color-primary);">→</span>
                </div>
            </div>
        `;

    } else if (tipoUsuario === 'comprador' && usuario.cursosComprados && usuario.cursosComprados.length > 0) {
        // COMPRADOR: Solo sus recursos comprados (pueden ser cursos, PDFs, etc.)
        html = '<div class="library-list">';
        usuario.cursosComprados.forEach(recurso => {
            const iconos = {
                curso: '🎓',
                pdf: '📄',
                video: '🎬',
                plantilla: '🛠️'
            };
            const icono = iconos[recurso.tipo] || '📦';

            html += `
                <div class="library-item" onclick="console.log('🔧 Acceso a recurso:', '${recurso.titulo}')" style="cursor: pointer;">
                    <div class="library-item-icon">${icono}</div>
                    <div class="library-item-content">
                        <div class="library-item-title">${recurso.titulo}</div>
                        <div class="library-item-meta">${recurso.progreso ? 'Progreso: ' + recurso.progreso + '%' : '[Disponible]'}</div>
                    </div>
                    <span style="color: var(--color-primary);">→</span>
                </div>
            `;
        });
        html += '</div>';

    } else {
        // GRATUITO o COMPRADOR sin recursos
        html = `
            <div class="empty-state">
                <div class="empty-state-icon">📦</div>
                <h3>[No tienes recursos aún]</h3>
                <p>[Usa el botón "Explorar Más Contenido" más abajo para descubrir recursos disponibles]</p>
            </div>
        `;
    }

    container.innerHTML = html;
}

// ============================================
// RENDERIZAR: EXPLORAR CATÁLOGO
// ============================================

function renderExplorar(usuario, tipoUsuario) {
    const container = document.getElementById('explorarContent');
    if (!container) return;

    // Widget para explorar más contenido (para todos los niveles)
    const html = `
        <div class="content-card" style="background: linear-gradient(135deg, var(--color-bg-primary-light), var(--color-white)); border: 2px solid var(--color-primary);">
            <div class="card-header">
                <h3 class="card-title">🔍 [Explorar Más Contenido]</h3>
                <span class="card-icon">✨</span>
            </div>
            <p style="color: var(--color-text-light); margin-bottom: 1.5rem;">
                [Descubre nuevos recursos, formaciones y herramientas disponibles en nuestro catálogo completo]
            </p>
            <a href="oferta-de-servicios.html" class="btn btn-primary" style="width: 100%;">
                [Ver Catálogo Completo] →
            </a>
        </div>
    `;

    container.innerHTML = html;
}

// ============================================
// RENDERIZAR: UPSELL
// ============================================

function renderUpsell(usuario, tipoUsuario) {
    const container = document.getElementById('upsellContent');
    if (!container) return;

    let html = '';

    if (tipoUsuario === 'miembro') {
        // MIEMBRO PREMIUM: Widgets desbloqueados
        html = `
            <div class="cards-grid">
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">🎯 [Privilegio 1]</h3>
                    </div>
                    <h4 style="margin-bottom: 0.5rem;">[Título del Privilegio 1]</h4>
                    <p style="color: var(--color-text-light); margin-bottom: 1rem;">
                        [Descripción del privilegio exclusivo para miembros premium]
                    </p>
                    <button class="btn btn-primary" style="width: 100%;">
                        [Acceder/Ver Más]
                    </button>
                </div>

                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">🤖 [Privilegio 2]</h3>
                    </div>
                    <p style="color: var(--color-text-light); margin-bottom: 1rem;">
                        [Descripción del privilegio exclusivo para miembros premium]
                    </p>
                    <button class="btn btn-secondary" style="width: 100%;" onclick="console.log('🔧 Función en desarrollo')">
                        [Acceder/Ver Más]
                    </button>
                </div>

                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">📦 [Privilegio 3]</h3>
                    </div>
                    <p style="color: var(--color-text-light); margin-bottom: 1rem;">
                        [Descripción del privilegio exclusivo para miembros premium]
                    </p>
                    <button class="btn btn-secondary" style="width: 100%;">
                        [Acceder/Ver Más]
                    </button>
                </div>
            </div>
        `;

    } else {
        // GRATUITO o COMPRADOR: Widgets bloqueados + Banner upsell
        html = `
            <div class="upsell-banner">
                <h2>⭐ [Desbloquea TODOS los Privilegios Premium]</h2>
                <p>[Descripción de los beneficios de la membresía premium]</p>
                <a href="membresia.html" class="btn btn-secondary" style="background: white; color: var(--color-primary); font-weight: 600;">
                    [Ver Planes Premium] →
                </a>
            </div>

            <div class="cards-grid">
                <div class="content-card content-card--locked">
                    <div class="lock-badge">🔒 Premium</div>
                    <div class="card-header">
                        <h3 class="card-title">🎯 [Privilegio 1 Bloqueado]</h3>
                    </div>
                    <p style="color: var(--color-text-light);">
                        [Descripción del privilegio premium bloqueado]
                    </p>
                </div>

                <div class="content-card content-card--locked">
                    <div class="lock-badge">🔒 Premium</div>
                    <div class="card-header">
                        <h3 class="card-title">🤖 [Privilegio 2 Bloqueado]</h3>
                    </div>
                    <p style="color: var(--color-text-light);">
                        [Descripción del privilegio premium bloqueado]
                    </p>
                </div>

                <div class="content-card content-card--locked">
                    <div class="lock-badge">🔒 Premium</div>
                    <div class="card-header">
                        <h3 class="card-title">📦 [Privilegio 3 Bloqueado]</h3>
                    </div>
                    <p style="color: var(--color-text-light);">
                        [Descripción del privilegio premium bloqueado]
                    </p>
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}

// ============================================
// RENDERIZAR: GESTIÓN
// ============================================

function renderGestion(usuario, tipoUsuario) {
    const accountName = document.getElementById('accountName');
    const accountEmail = document.getElementById('accountEmail');
    const accountType = document.getElementById('accountType');
    const subscriptionContent = document.getElementById('subscriptionContent');

    if (accountName) accountName.textContent = usuario.nombre;
    if (accountEmail) accountEmail.textContent = usuario.email;

    if (accountType) {
        switch(tipoUsuario) {
            case 'miembro':
                accountType.textContent = 'Miembro Premium';
                accountType.style.color = 'var(--color-primary)';
                break;
            case 'comprador':
                accountType.textContent = 'Cliente';
                accountType.style.color = 'var(--color-sage)';
                break;
            default:
                accountType.textContent = 'Cuenta Gratuita';
                accountType.style.color = 'var(--color-text-light)';
        }
    }

    if (subscriptionContent) {
        if (tipoUsuario === 'miembro') {
            subscriptionContent.innerHTML = `
                <div style="padding: 1rem; background: var(--color-success-bg); border-radius: 8px; border-left: 4px solid var(--color-success); margin-bottom: 1rem;">
                    <p style="margin: 0; color: var(--color-success-dark); font-weight: 600;">
                        ✓ Suscripción Activa
                    </p>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="color: var(--color-text-light);">Próxima renovación:</span>
                    <span style="font-weight: 600;">[Fecha]</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <span style="color: var(--color-text-light);">Importe:</span>
                    <span style="font-weight: 600;">29€/mes</span>
                </div>
                <button class="btn btn-secondary" style="width: 100%;" onclick="gestionarSuscripcion()">
                    Gestionar Suscripción
                </button>
            `;
        } else {
            subscriptionContent.innerHTML = `
                <p style="color: var(--color-text-light); margin-bottom: 1rem;">
                    No tienes una suscripción activa.
                </p>
                <a href="membresia.html" class="btn btn-primary" style="width: 100%;">
                    Ver Planes Premium
                </a>
            `;
        }
    }
}

// ============================================
// FUNCIONES DE GESTIÓN
// ============================================

function gestionarSuscripcion() {
    // Funcionalidad en desarrollo - En producción conectará con Stripe/PayPal
    console.log('🔧 Gestionar suscripción - En desarrollo');
    // TODO: Abrir modal de gestión de suscripción con opciones:
    // - Ver próxima factura
    // - Actualizar método de pago
    // - Cancelar suscripción
}

// ============================================
// SIMULADORES (SOLO DESARROLLO)
// ============================================

window.simularMejoraPremium = function() {
    const usuario = obtenerUsuarioActual();
    if (usuario) {
        usuario.tipoUsuario = 'miembro';
        usuario.nivel = 3;
        usuario.ultimoCurso = { titulo: 'Curso Premium Demo', leccion: 3, progreso: 45 };
        guardarUsuarioActual(usuario);

        // ✅ CRÍTICO: Actualizar también en la lista de usuarios
        const usuarios = obtenerUsuarios();
        const index = usuarios.findIndex(u => u.id === usuario.id);
        if (index !== -1) {
            usuarios[index].tipoUsuario = 'miembro';
            usuarios[index].nivel = 3;
            usuarios[index].ultimoCurso = usuario.ultimoCurso;
            guardarUsuarios(usuarios);
        }

        console.log('✓ Simulador: Actualizado a Miembro Premium');
        location.reload();
    }
};

window.simularComprador = function() {
    const usuario = obtenerUsuarioActual();
    if (usuario) {
        usuario.tipoUsuario = 'comprador';
        usuario.nivel = 2;
        usuario.cursosComprados = [
            { id: 1, tipo: 'curso', titulo: '[Curso Demo 1]', progreso: 35 },
            { id: 2, tipo: 'pdf', titulo: '[Guía Práctica Premium]', progreso: 0 },
            { id: 3, tipo: 'video', titulo: '[Masterclass Grabada]', progreso: 60 }
        ];
        usuario.ultimoCurso = usuario.cursosComprados[0];
        guardarUsuarioActual(usuario);

        // ✅ CRÍTICO: Actualizar también en la lista de usuarios
        const usuarios = obtenerUsuarios();
        const index = usuarios.findIndex(u => u.id === usuario.id);
        if (index !== -1) {
            usuarios[index].tipoUsuario = 'comprador';
            usuarios[index].nivel = 2;
            usuarios[index].cursosComprados = usuario.cursosComprados;
            usuarios[index].ultimoCurso = usuario.ultimoCurso;
            guardarUsuarios(usuarios);
        }

        console.log('✓ Simulador: Actualizado a Comprador con 3 recursos');
        location.reload();
    }
};

window.volverGratuito = function() {
    const usuario = obtenerUsuarioActual();
    if (usuario) {
        usuario.tipoUsuario = 'gratuito';
        usuario.nivel = 1;
        delete usuario.cursosComprados;
        delete usuario.ultimoCurso;
        guardarUsuarioActual(usuario);

        // ✅ CRÍTICO: Actualizar también en la lista de usuarios
        const usuarios = obtenerUsuarios();
        const index = usuarios.findIndex(u => u.id === usuario.id);
        if (index !== -1) {
            usuarios[index].tipoUsuario = 'gratuito';
            usuarios[index].nivel = 1;
            delete usuarios[index].cursosComprados;
            delete usuarios[index].ultimoCurso;
            guardarUsuarios(usuarios);
        }

        console.log('✓ Simulador: Vuelto a Usuario Gratuito');
        location.reload();
    }
};

console.log('✨ Área privada cargada (flujo vertical)');
console.log('💡 Prueba en consola:');
console.log('   - simularComprador()');
console.log('   - simularMejoraPremium()');
console.log('   - volverGratuito()');
