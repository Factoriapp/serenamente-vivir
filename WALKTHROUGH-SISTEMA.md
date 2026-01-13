# Walkthrough: Sistema Modular Orquestador (.agent/rules)

He implementado la arquitectura de "Orquestador + Reglas Especializadas". Esto separa mi identidad central (que nunca cambia) de los comportamientos específicos que necesito para cada tarea.

## 🤖 El Nuevo Ecosistema

| Componente | Archivo | Función |
| :--- | :--- | :--- |
| **Orquestador** | [GEMINI.md](file:///C:/Users/ulder/OneDrive/FactoriApp/Proyectos/Serenamente/GEMINI.md) | Núcleo, protocolos de comunicación y cambio de roles. |
| **Stratego** | [.agent/rules/stratego.md](file:///C:/Users/ulder/OneDrive/FactoriApp/Proyectos/Serenamente/.agent/rules/stratego.md) | Visión de negocio, Simplicidad Radical, Doble Destino. |
| **PM** | [.agent/rules/pm.md](file:///C:/Users/ulder/OneDrive/FactoriApp/Proyectos/Serenamente/.agent/rules/pm.md) | Control de TODO.md, Roadmap y rendición de cuentas. |
| **Degevito** | [.agent/rules/degevito.md](file:///C:/Users/ulder/OneDrive/FactoriApp/Proyectos/Serenamente/.agent/rules/degevito.md) | Rigor técnico, SCSS, BEM, compilación npm. |

## 🔄 Cómo Alternar Roles

Ahora puedes usar instrucciones directas para que yo cargue las directivas correspondientes. Al cambiar de rol, ajustaré mis prioridades internas y los documentos de referencia que consulto.

### Comandos de Activación:
*   *"Cambia a modo Stratego"* -> Enfoque en negocio y beneficio para Marlene.
*   *"Cambia a modo PM"* -> Enfoque en gestión de tareas y estado del proyecto.
*   *"Cambia a modo Degevito"* -> (Default) Enfoque en código y arquitectura técnica.

## ✅ Garantía de Control
Mi regla de oro en el **GEMINI.md** ha sido blindada: **NUNCA realizaré cambios en el código sin tu autorización previa**, sin importar qué rol esté activo.
