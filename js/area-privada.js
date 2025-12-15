// ============================================
// LÓGICA ESPECÍFICA PARA area-privada.html
// ============================================ 

// Se ejecuta cuando el DOM está completamente cargado
window.addEventListener('DOMContentLoaded', function() {
    console.log('[area-privada.js] DOMContentLoded - Iniciando lógica.');

    // 1. Verificación y redirección de usuario (usando función global de auth.js)
    const usuario = obtenerUsuarioActual(); // Viene de js/auth.js

    if (!usuario) {
        console.warn('[area-privada.js] No hay usuario autenticado. Redirigiendo a index.html...');
        window.location.href = 'index.html';
        return;
    }

    // 2. Actualizar el header con el nombre del usuario
    const primerNombre = obtenerPrimerNombre(usuario.nombre); // Viene de js/auth.js
    const nombreUsuarioHeaderElement = document.getElementById('nombreUsuarioHeader'); // Nuevo ID del header estándar
    if (nombreUsuarioHeaderElement) {
        nombreUsuarioHeaderElement.textContent = primerNombre;
    }

    // Mostrar el userMenuContainer si hay usuario
    const userMenuContainer = document.getElementById('userMenuContainer');
    const btnIniciarSesion = document.getElementById('btnIniciarSesion');
    if (usuario) {
        if (btnIniciarSesion) btnIniciarSesion.style.display = 'none';
        if (userMenuContainer) userMenuContainer.style.display = 'inline-block';
    } else {
        if (btnIniciarSesion) btnIniciarSesion.style.display = 'inline-block';
        if (userMenuContainer) userMenuContainer.style.display = 'none';
    }

    // 3. Aplicar vista según nivel de usuario
    if (usuario.nivel === 3) {
        aplicarVistaAna(usuario);
    } else if (usuario.nivel === 2) {
        aplicarVistaRegina(usuario);
    } else {
        console.warn('[area-privada.js] Usuario con nivel insuficiente. Redirigiendo a index.html...');
        window.location.href = 'index.html';
    }

    // 4. Inicializar funcionalidad de Tabs de Anuncios y Pomodoro (si existen)
    inicializarTablonAnuncios();
    inicializarPomodoro(); // Asumiendo que esta función encapsula toda la lógica del Pomodoro.
});

// ========================================== 
// VISTA ANA (PREMIUM - NIVEL 3)
// ========================================== 
function aplicarVistaAna(usuario) {
    console.log('[area-privada.js] Aplicando vista ANA (Premium)');

    // Aplicar tema premium al body (si existe y es relevante)
    document.body.classList.add('theme-premium');

    // Mostrar secciones de Ana
    mostrarSeccionesPorTipo('ana');

    // Actualizar success badge
    const successBadge = document.getElementById('successBadge');
    if (successBadge) {
        successBadge.classList.remove('regina');
        const successMessage = document.getElementById('successMessage');
        if (successMessage) successMessage.textContent = '✅ Como Miembro Premium, tienes acceso ilimitado';
    }

    // Actualizar tablón de anuncios (saludo)
    const tablonContent = document.getElementById('tablonContentText');
    if (tablonContent) {
        // Asumiendo que el contenido ya está en el HTML, solo ajustamos el saludo
        tablonContent.innerHTML = tablonContent.innerHTML.replace('¡Hola!', '¡Hola equipo!');
    }

    // Setear nivel de usuario para la Tienda (si es necesario)
    localStorage.setItem('userLevel', 'premium');
    console.log('✅ Nivel de usuario seteado: PREMIUM (Ana)');
}

// ========================================== 
// VISTA REGINA (REGISTRADA - NIVEL 2)
// ========================================== 
function aplicarVistaRegina(usuario) {
    console.log('[area-privada.js] Aplicando vista REGINA (Cuenta Estándar)');

    // Mostrar secciones de Regina
    mostrarSeccionesPorTipo('regina');

    // Actualizar badge del header (si existe)
    // El nuevo header no tiene 'headerBadgeAna', esta lógica es obsoleta
    // const headerBadge = document.getElementById('headerBadgeAna');
    // if (headerBadge) { headerBadge.classList.add('regina'); } 

    // Actualizar success badge
    const successBadge = document.getElementById('successBadge');
    if (successBadge) {
        successBadge.classList.add('regina');
        const successMessage = document.getElementById('successMessage');
        if (successMessage) successMessage.textContent = '👋 Bienvenida, accede a tu contenido gratuito';
    }

    // Actualizar tablón de anuncios (saludo - solo primer nombre)
    const tablonContent = document.getElementById('tablonContentText');
    if (tablonContent) {
        const primerNombre = obtenerPrimerNombre(usuario.nombre);
        tablonContent.innerHTML = tablonContent.innerHTML.replace('¡Hola!', `¡Hola ${primerNombre}!`);
    }

    // Setear nivel de usuario para la Tienda (si es necesario)
    localStorage.setItem('userLevel', 'estandar');
    console.log('✅ Nivel de usuario seteado: ESTÁNDAR (Regina)');
}

// ========================================== 
// FUNCIONES DE CONTROL DE VISIBILIDAD (Adaptadas)
// ========================================== 
function mostrarSeccionesPorTipo(tipo) {
    const todasLasSecciones = document.querySelectorAll('[data-user-type]');

    todasLasSecciones.forEach(seccion => {
        const tipoSeccion = seccion.getAttribute('data-user-type');
        if (tipoSeccion === tipo) {
            seccion.classList.remove('hidden');
        } else {
            seccion.classList.add('hidden');
        }
    });
    console.log(`[area-privada.js] Secciones visibles para tipo: ${tipo}`);
}

// ============================================ 
// FUNCIONALIDAD DEL HEADER (Adaptada al estándar)
// ============================================ 

// El nuevo header llama a toggleUserDropdown y cerrarSesion (de auth.js)
// Asegurémonos de que toggleUserDropdown existe, si no, lo definimos o usamos el de main.js
if (typeof window.toggleUserDropdown !== 'function') {
    window.toggleUserDropdown = function() {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
    };
}

// Cerrar dropdown al hacer click fuera (adaptado a user-menu-container)
document.addEventListener('click', function(e) {
    const userMenuContainer = document.getElementById('userMenuContainer');
    const userDropdown = document.getElementById('userDropdown');

    if (userMenuContainer && !userMenuContainer.contains(e.target)) {
        if (userDropdown) {
            userDropdown.style.display = 'none';
        }
    }
});

// ============================================ 
// TABLÓN DE ANUNCIOS - FUNCIONALIDAD
// ============================================ 

function inicializarTablonAnuncios() {
    const tablon = document.getElementById('tablonAnuncios');
    if (!tablon) return;

    const tablonCloseBtn = tablon.querySelector('.tablon-close');
    if (tablonCloseBtn) {
        tablonCloseBtn.addEventListener('click', function() {
            tablon.classList.add('hidden');
            const hoy = new Date().toDateString();
            localStorage.setItem('tablonCerrado', hoy);
        });
    }

    // Verificar si el tablón debe mostrarse
    const tablonCerrado = localStorage.getItem('tablonCerrado');
    const hoy = new Date().toDateString();
    if (tablonCerrado === hoy) {
        tablon.classList.add('hidden');
    }
}

// ============================================ 
// LÓGICA DE PERMISOS EN ENLACES (Mantenido)
// ============================================ 

document.addEventListener('DOMContentLoaded', () => {
    const recursosLinks = document.querySelectorAll('.recurso-link');

    recursosLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const recursoId = this.dataset.recursoId;
            const nivelRequerido = this.dataset.nivelRequerido;

            const usuario = obtenerUsuarioActual();
            if (!usuario) {
                window.location.href = 'index.html'; // Redirigir si no hay usuario
                return;
            }

            const userNivel = usuario.nivel === 3 ? 'premium' : 'estandar';

            if (tienePermiso(userNivel, nivelRequerido)) {
                window.location.href = `/recurso/${recursoId}`; // Esto es un placeholder de backend
            } else {
                mostrarModalUpsell(nivelRequerido);
            }
        });
    });
});

function tienePermiso(userNivel, nivelRequerido) {
    const niveles = { 'estandar': 1, 'premium': 2 };
    return niveles[userNivel] >= niveles[nivelRequerido];
}

function mostrarModalUpsell(nivelRequerido) {
    alert(`Este recurso es exclusivo para miembros ${nivelRequerido.toUpperCase()}.

¿Quieres actualizar tu membresía?`);
    // Futuro: abrir modal de upsell
}


// ============================================ 
// POMODORO TIMER - FUNCIONALIDAD
// ============================================ 

let pomodoroState = {
    minutes: 25,
    seconds: 0,
    totalSeconds: 25 * 60,
    currentMode: 'focus',
    isRunning: false,
    interval: null,
    completedPomodoros: 0,
    totalMinutes: 0
};

function inicializarPomodoro() {
    const pomodoroTrigger = document.querySelector('.pomodoro-trigger');
    const pomodoroCloseBtn = document.querySelector('.pomodoro-close');
    const pomodoroOverlay = document.getElementById('pomodoroOverlay');
    const pomodoroModes = document.querySelectorAll('.pomodoro-mode');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.querySelector('.pomodoro-btn-reset'); // Assuming this has the correct class

    if (!pomodoroTrigger) return; // Si no existe el componente, no inicializar

    pomodoroTrigger.addEventListener('click', openPomodoro);
    if (pomodoroCloseBtn) pomodoroCloseBtn.addEventListener('click', closePomodoro);
    if (pomodoroOverlay) pomodoroOverlay.addEventListener('click', closePomodoro);

    pomodoroModes.forEach(modeBtn => {
        modeBtn.addEventListener('click', function() {
            const mode = this.dataset.mode;
            const minutes = parseInt(this.innerText.match(/\d+/)[0]);
            setMode(mode, minutes);
        });
    });

    if (startBtn) startBtn.addEventListener('click', startTimer);
    if (pauseBtn) pauseBtn.addEventListener('click', pauseTimer);
    if (resetBtn) resetBtn.addEventListener('click', resetTimer);

    // Cargar estadísticas al iniciar
    const stats = localStorage.getItem('pomodoroStats');
    if (stats) {
        const data = JSON.parse(stats);
        if (data.date === new Date().toDateString()) {
            pomodoroState.completedPomodoros = data.completed;
            pomodoroState.totalMinutes = data.totalMinutes;
            updateStats();
        }
    }

    // Pedir permiso para notificaciones
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}


function openPomodoro() {
    const pomodoroDrawer = document.getElementById('pomodoroDrawer');
    const pomodoroOverlay = document.getElementById('pomodoroOverlay');
    if (pomodoroDrawer) pomodoroDrawer.classList.add('active');
    if (pomodoroOverlay) pomodoroOverlay.classList.add('active');
}

function closePomodoro() {
    const pomodoroDrawer = document.getElementById('pomodoroDrawer');
    const pomodoroOverlay = document.getElementById('pomodoroOverlay');
    if (pomodoroDrawer) pomodoroDrawer.classList.remove('active');
    if (pomodoroOverlay) pomodoroOverlay.classList.remove('active');
}

function setMode(mode, minutes) {
    if (pomodoroState.isRunning) {
        pauseTimer();
    }

    pomodoroState.currentMode = mode;
    pomodoroState.minutes = minutes;
    pomodoroState.seconds = 0;
    pomodoroState.totalSeconds = minutes * 60;

    updateDisplay();
    updateProgressBar(100);

    const labels = {
        focus: 'Sesión de Trabajo Concentrado',
        short: 'Descanso Breve',
        long: 'Descanso Largo'
    };
    const pomodoroLabel = document.getElementById('pomodoroLabel');
    if (pomodoroLabel) pomodoroLabel.textContent = labels[mode];

    document.querySelectorAll('.pomodoro-mode').forEach(el => {
        el.classList.remove('active');
    });
    const activeModeBtn = document.querySelector(`.pomodoro-mode[data-mode="${mode}"]`);
    if (activeModeBtn) activeModeBtn.classList.add('active');
}

function startTimer() {
    if (pomodoroState.isRunning) return;

    pomodoroState.isRunning = true;
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    if (startBtn) startBtn.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'block';

    const pomodoroTrigger = document.querySelector('.pomodoro-trigger');
    if (pomodoroTrigger) pomodoroTrigger.classList.add('running');

    pomodoroState.interval = setInterval(() => {
        if (pomodoroState.seconds === 0) {
            if (pomodoroState.minutes === 0) {
                completePomodoro();
                return;
            }
            pomodoroState.minutes--;
            pomodoroState.seconds = 59;
        } else {
            pomodoroState.seconds--;
        }

        updateDisplay();
        updateProgressBar();
    }, 1000);
}

function pauseTimer() {
    pomodoroState.isRunning = false;
    clearInterval(pomodoroState.interval);
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    if (startBtn) startBtn.style.display = 'block';
    if (pauseBtn) pauseBtn.style.display = 'none';

    const pomodoroTrigger = document.querySelector('.pomodoro-trigger');
    if (pomodoroTrigger) pomodoroTrigger.classList.remove('running');
}

function resetTimer() {
    pauseTimer();
    const modeMinutes = {
        focus: 25,
        short: 5,
        long: 15
    };
    setMode(pomodoroState.currentMode, modeMinutes[pomodoroState.currentMode]);
}

function completePomodoro() {
    pauseTimer();

    if (pomodoroState.currentMode === 'focus') {
        pomodoroState.completedPomodoros++;
        pomodoroState.totalMinutes += 25;
        updateStats();
    }

    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('¡Pomodoro Completado!', {
            body: pomodoroState.currentMode === 'focus' ? '¡Hora de un descanso!' : '¡Hora de volver al trabajo!',
            icon: '/favicon.png'
        });
    }

    alert(pomodoroState.currentMode === 'focus' ? '¡Sesión completada! Hora de descansar 🎉' : '¡Descanso terminado! Volvamos al trabajo 💪');

    if (pomodoroState.currentMode === 'focus') {
        setMode('short', 5);
    } else {
        setMode('focus', 25);
    }
}

function updateDisplay() {
    const mins = String(pomodoroState.minutes).padStart(2, '0');
    const secs = String(pomodoroState.seconds).padStart(2, '0');
    const pomodoroTimeElement = document.getElementById('pomodoroTime');
    if (pomodoroTimeElement) pomodoroTimeElement.textContent = `${mins}:${secs}`;
}

function updateProgressBar(percent = null) {
    const pomodoroProgressBar = document.getElementById('pomodoroProgressBar');
    if (!pomodoroProgressBar) return;

    if (percent === null) {
        const elapsed = pomodoroState.totalSeconds - (pomodoroState.minutes * 60 + pomodoroState.seconds);
        percent = (elapsed / pomodoroState.totalSeconds) * 100;
    }
    pomodoroProgressBar.style.width = `${100 - percent}%`;
}

function updateStats() {
    const completedPomodorosElement = document.getElementById('completedPomodoros');
    const totalTimeElement = document.getElementById('totalTime');

    if (completedPomodorosElement) completedPomodorosElement.textContent = pomodoroState.completedPomodoros;
    if (totalTimeElement) totalTimeElement.textContent = `${pomodoroState.totalMinutes} min`;

    localStorage.setItem('pomodoroStats', JSON.stringify({
        completed: pomodoroState.completedPomodoros,
        totalMinutes: pomodoroState.totalMinutes,
        date: new Date().toDateString()
    }));
}