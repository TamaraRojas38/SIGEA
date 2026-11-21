// Asistente virtual SIGEA - respuestas adaptadas al perfil de demostración.
// Los perfiles se guardan en sessionStorage. No hay autenticación ni datos reales.
(() => {
  const launcher = document.createElement("button");
  launcher.id = "sigea-bot-launcher";
  launcher.type = "button";
  launcher.setAttribute("aria-label", "Abrir asistente virtual SIGEA");
  launcher.title = "Asistente virtual SIGEA";
  launcher.textContent = "💬";

  const panel = document.createElement("section");
  panel.id = "sigea-bot";
  panel.setAttribute("aria-label", "Asistente virtual SIGEA");
  panel.innerHTML = `
    <div class="sigea-bot-header">
      <div><strong>Asistente SIGEA</strong><small id="sigea-bot-subtitle">Ayuda sobre gestión escolar</small></div>
      <button id="sigea-bot-close" type="button" aria-label="Cerrar chat">×</button>
    </div>
    <div id="sigea-bot-messages" aria-live="polite"></div>
    <form class="sigea-bot-form" id="sigea-bot-form">
      <input id="sigea-bot-input" type="text" placeholder="Escribí tu consulta..." autocomplete="off" aria-label="Escribí tu consulta">
      <button id="sigea-bot-send" type="submit">Enviar</button>
    </form>`;
  document.body.append(launcher, panel);

  const messages = panel.querySelector("#sigea-bot-messages");
  const input = panel.querySelector("#sigea-bot-input");

  function getUser() {
    try { return JSON.parse(sessionStorage.getItem("sigeaUser") || "null"); }
    catch { return null; }
  }

  function addMessage(text, who = "bot") {
    const el = document.createElement("div");
    el.className = `sigea-message sigea-message-${who}`;
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }

  function roleName(role) {
    return ({
      administrador: "Administrador",
      docente: "Docente",
      alumno: "Alumno",
      tutor: "Padre / tutor"
    })[role] || "Visitante";
  }

  function answer(message) {
    const user = getUser();
    const role = user?.role || "visitante";
    const t = message.toLocaleLowerCase("es");

    if (t.includes("calific") || t.includes("nota")) {
      if (role === "docente") return "Como docente, podés dirigirte al módulo «Calificaciones» para trabajar con las notas de tus cursos, según las funciones disponibles en el sistema.";
      if (role === "alumno") return "Como alumno, podés consultar el módulo «Calificaciones». Esta versión de demostración no recupera notas reales.";
      if (role === "tutor") return "Como padre o tutor, la consulta de calificaciones debe corresponder a un estudiante vinculado y autorizado. Este prototipo no consulta datos reales.";
      if (role === "administrador") return "Como administrador, podés acceder al módulo «Calificaciones» para la gestión general, de acuerdo con las funciones implementadas.";
      return "Para consultar calificaciones, primero ingresá con tu cuenta de SIGEA. En esta demostración podés usar uno de los perfiles de prueba.";
    }

    if (t.includes("asistencia") || t.includes("inasistencia") || t.includes("falta")) {
      if (role === "docente") return "Como docente, podés orientar el registro y seguimiento de asistencia de tus cursos desde las funciones académicas disponibles.";
      if (role === "alumno") return "Como alumno, podés solicitar o consultar tu información de asistencia en el módulo correspondiente. Este prototipo no muestra registros reales.";
      if (role === "tutor") return "Como padre o tutor, la información de asistencia debe estar asociada a un estudiante autorizado. El prototipo no consulta registros reales.";
      if (role === "administrador") return "Como administrador, podés supervisar la información de asistencia según los módulos habilitados en SIGEA.";
      return "Para consultas de asistencia, iniciá sesión con un perfil de demostración.";
    }

    if (t.includes("alumno") || t.includes("estudiante")) {
      if (role === "administrador") return "Como administrador, podés ingresar al módulo «Alumnos» para consultar y administrar la información estudiantil.";
      if (role === "docente") return "Como docente, podés consultar la información de los alumnos vinculados a tus cursos, según los permisos del sistema.";
      return "El módulo «Alumnos» contiene la sección de información estudiantil. El acceso a datos personales requiere una cuenta autorizada.";
    }

    if (t.includes("docente") || t.includes("profesor")) {
      return role === "administrador"
        ? "Como administrador, podés ingresar al módulo «Docentes» para consultar y administrar la información del personal docente."
        : "El módulo «Docentes» está destinado a la información del personal docente. Para datos específicos se requieren permisos adecuados.";
    }

    if (t.includes("materia") || t.includes("curso") || t.includes("división")) {
      return role === "docente"
        ? "Como docente, podés consultar las opciones «Materias» y «Curso» para ubicar tus espacios curriculares y cursos asignados."
        : "Podés acceder a las secciones «Materias» y «Curso» desde el menú principal de SIGEA.";
    }

    if (t.includes("ayuda") || t.includes("puede hacer") || t.includes("hola") || t.includes("buenas")) {
      return user
        ? `¡Hola, ${user.name}! Detecté el perfil ${roleName(role)}. Puedo orientarte sobre alumnos, docentes, materias, cursos, calificaciones y asistencias.`
        : "¡Hola! Soy el asistente virtual de SIGEA. Para adaptar mis respuestas a tu perfil, iniciá sesión con una cuenta de demostración.";
    }

    return user
      ? `Estoy atendiendo como ${roleName(role)}. Podés consultarme sobre alumnos, docentes, materias, cursos, calificaciones o asistencias.`
      : "No identifiqué tu consulta. Podés preguntarme sobre los módulos de SIGEA o iniciar sesión para recibir orientación según tu perfil.";
  }

  function send(text) {
    const clean = text.trim();
    if (!clean) return;
    addMessage(clean, "user");
    addMessage(answer(clean), "bot");
  }

  const quick = document.createElement("div");
  quick.className = "sigea-bot-quick";
  [
    ["Alumnos", "¿Cómo se administran los alumnos?"],
    ["Calificaciones", "¿Cómo consulto las calificaciones?"],
    ["Asistencias", "¿Cómo se registran las asistencias?"],
    ["Materias y cursos", "¿Dónde consulto materias y cursos?"],
    ["Ayuda", "¿Qué puede hacer SIGEA?"]
  ].forEach(([label, question]) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = label;
    b.addEventListener("click", () => send(question));
    quick.appendChild(b);
  });
  messages.appendChild(quick);

  launcher.addEventListener("click", () => {
    panel.classList.toggle("sigea-bot-open");
    if (panel.classList.contains("sigea-bot-open")) input.focus();
  });
  panel.querySelector("#sigea-bot-close").addEventListener("click", () => panel.classList.remove("sigea-bot-open"));
  panel.querySelector("#sigea-bot-form").addEventListener("submit", event => {
    event.preventDefault();
    send(input.value);
    input.value = "";
    input.focus();
  });

  const user = getUser();
  const subtitle = panel.querySelector("#sigea-bot-subtitle");
  subtitle.textContent = user ? `Sesión demo: ${roleName(user.role)}` : "Ayuda sobre gestión escolar";
  addMessage(user
    ? `¡Hola, ${user.name}! Estoy listo para ayudarte como ${roleName(user.role)}.`
    : "¡Hola! Soy el asistente virtual de SIGEA. Iniciá sesión para que pueda adaptar mis respuestas a tu perfil.");
})();
