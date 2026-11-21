
document.addEventListener("DOMContentLoaded", () => {

    // LEER DATOS GUARDADOS EN LOCALSTORAGE
    function obtenerDatos(clave) {
        try {
            return JSON.parse(localStorage.getItem(clave)) || [];
        } catch (error) {
            console.error("Error al leer:", clave, error);
            return [];
        }
    }

    const alumnos = obtenerDatos("sigeaAlumnos");
    const docentes = obtenerDatos("sigeaDocentes");
    const materias = obtenerDatos("sigeaMaterias");
    const cursos = obtenerDatos("sigeaCursos");
    const calificaciones = obtenerDatos("sigeaCalificaciones");
    const asistencias = obtenerDatos("sigeaAsistencias");

    // ELEMENTOS DEL HTML
    const totalAlumnos = document.getElementById("totalAlumnos");
    const totalDocentes = document.getElementById("totalDocentes");
    const totalMaterias = document.getElementById("totalMaterias");
    const totalCursos = document.getElementById("totalCursos");

    // MOSTRAR INDICADORES GENERALES
    totalAlumnos.textContent = alumnos.length;
    totalDocentes.textContent = docentes.length;
    totalMaterias.textContent = materias.length;
    totalCursos.textContent = cursos.length;

    // LISTADO DE ALUMNOS
    const tablaAlumnos = document.getElementById("tablaAlumnos");
    const filtroCurso = document.getElementById("filtroCurso");

    function renderizarAlumnos() {
        tablaAlumnos.replaceChildren();

        const cursoSeleccionado = filtroCurso.value;

        const alumnosFiltrados = alumnos.filter(alumno => {
            const curso = alumno.curso || "";
            return !cursoSeleccionado || curso === cursoSeleccionado;
        });

        alumnosFiltrados.forEach(alumno => {
            const fila = document.createElement("tr");

            const nombre = document.createElement("td");
            nombre.textContent = `${alumno.nombre || ""} ${alumno.apellido || ""}`;

            const dni = document.createElement("td");
            dni.textContent = alumno.dni || "Sin DNI";

            const curso = document.createElement("td");
            curso.textContent = alumno.curso || "Sin curso";

            fila.append(nombre, dni, curso);
            tablaAlumnos.appendChild(fila);
        });

        if (alumnosFiltrados.length === 0) {
            const fila = document.createElement("tr");
            const celda = document.createElement("td");
            celda.colSpan = 3;
            celda.textContent = "No hay alumnos registrados.";
            fila.appendChild(celda);
            tablaAlumnos.appendChild(fila);
        }
    }

    // CARGAR FILTROS DE CURSOS
    const cursosAlumnos = [
        ...new Set(alumnos.map(alumno => alumno.curso).filter(Boolean))
    ];

    cursosAlumnos.forEach(curso => {
        filtroCurso.add(new Option(curso, curso));
    });

    filtroCurso.addEventListener("change", renderizarAlumnos);
    renderizarAlumnos();

    // RESUMEN DE ASISTENCIAS
    const presentes = asistencias.filter(a =>
        (a.estado || "").toLowerCase() === "presente"
    ).length;

    const ausentes = asistencias.filter(a =>
        (a.estado || "").toLowerCase() === "ausente"
    ).length;

    const justificadas = asistencias.filter(a =>
        (a.estado || "").toLowerCase() === "justificado" ||
        (a.estado || "").toLowerCase() === "justificada"
    ).length;

    document.getElementById("totalPresentes").textContent = presentes;
    document.getElementById("totalAusentes").textContent = ausentes;
    document.getElementById("totalJustificadas").textContent = justificadas;

    // TABLA DE CALIFICACIONES
    const tablaCalificaciones = document.getElementById("tablaCalificaciones");

    calificaciones.forEach(calificacion => {

        const alumno = alumnos.find(a =>
            a.id === calificacion.alumnoId
        );

        const materia = materias.find(m =>
            m.id === calificacion.materiaId
        );

        const fila = document.createElement("tr");

        const nombreAlumno = document.createElement("td");
        nombreAlumno.textContent = alumno
            ? `${alumno.nombre} ${alumno.apellido}`
            : "Alumno no disponible";

        const nombreMateria = document.createElement("td");
        nombreMateria.textContent = materia
            ? materia.nombre
            : "Materia no disponible";

        const nota = document.createElement("td");
        nota.textContent = calificacion.nota ?? "Sin nota";

        fila.append(nombreAlumno, nombreMateria, nota);
        tablaCalificaciones.appendChild(fila);
    });

    if (calificaciones.length === 0) {
        const fila = document.createElement("tr");
        const celda = document.createElement("td");
        celda.colSpan = 3;
        celda.textContent = "No hay calificaciones registradas.";
        fila.appendChild(celda);
        tablaCalificaciones.appendChild(fila);
    }

    console.log("SIGEA - Reportes cargados correctamente.");

});
