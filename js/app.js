

(() => {
    const STORAGE_ALUMNOS = "sigeaAlumnos";
    const STORAGE_DOCENTES = "sigeaDocentes";

    function obtenerDatos(clave) {
        return JSON.parse(localStorage.getItem(clave) || "[]");
    }

    function guardarDatos(clave, datos) {
        localStorage.setItem(clave, JSON.stringify(datos));
    }

    function nuevoId() {
        return crypto.randomUUID
            ? crypto.randomUUID()
            : Date.now().toString() + Math.random().toString(16).slice(2);
    }

    // ==========================================
    // MÓDULO DE ALUMNOS
    // ==========================================

    const formAlumno = document.getElementById("formAlumno");

    if (formAlumno) {
        const lista = document.getElementById("listaAlumnos");

        const campos = {
            nombre: document.getElementById("nombre"),
            apellido: document.getElementById("apellido"),
            dni: document.getElementById("dni"),
            curso: document.getElementById("curso"),
            telefono: document.getElementById("telefono")
        };

        let alumnoSeleccionado = null;

        function limpiarFormulario() {
            formAlumno.reset();
            alumnoSeleccionado = null;
        }

        function renderizarAlumnos() {
            const alumnos = obtenerDatos(STORAGE_ALUMNOS);
            lista.replaceChildren();

            alumnos.forEach(alumno => {
                const item = document.createElement("li");

                const informacion = document.createElement("span");
                informacion.textContent =
                    `${alumno.nombre} ${alumno.apellido} | DNI: ${alumno.dni} | Curso: ${alumno.curso} | Teléfono: ${alumno.telefono}`;

                const editar = document.createElement("button");
                editar.type = "button";
                editar.textContent = "Editar";

                editar.addEventListener("click", () => {
                    campos.nombre.value = alumno.nombre;
                    campos.apellido.value = alumno.apellido;
                    campos.dni.value = alumno.dni;
                    campos.curso.value = alumno.curso;
                    campos.telefono.value = alumno.telefono;

                    alumnoSeleccionado = alumno.id;
                });

                const eliminar = document.createElement("button");
                eliminar.type = "button";
                eliminar.textContent = "Eliminar";

                eliminar.addEventListener("click", () => {
                    if (!confirm("¿Deseás eliminar este alumno?")) return;

                    const actualizados = obtenerDatos(STORAGE_ALUMNOS)
                        .filter(a => a.id !== alumno.id);

                    guardarDatos(STORAGE_ALUMNOS, actualizados);

                    if (alumnoSeleccionado === alumno.id) {
                        limpiarFormulario();
                    }

                    renderizarAlumnos();
                });

                item.append(informacion, editar, eliminar);
                lista.appendChild(item);
            });
        }

        formAlumno.addEventListener("submit", event => {
            event.preventDefault();

            const accion = event.submitter?.textContent.trim().toLowerCase();

            let alumnos = obtenerDatos(STORAGE_ALUMNOS);

            if (accion === "eliminar") {
                if (!alumnoSeleccionado) {
                    alert("Primero seleccioná un alumno del listado.");
                    return;
                }

                if (!confirm("¿Confirmás la eliminación del alumno?")) return;

                alumnos = alumnos.filter(a => a.id !== alumnoSeleccionado);
                guardarDatos(STORAGE_ALUMNOS, alumnos);
                limpiarFormulario();
                renderizarAlumnos();
                alert("Alumno eliminado correctamente.");
                return;
            }

            if (accion === "modificar") {
                if (!alumnoSeleccionado) {
                    alert("Primero seleccioná un alumno del listado.");
                    return;
                }

                const alumno = alumnos.find(a => a.id === alumnoSeleccionado);

                if (!alumno) return;

                Object.assign(alumno, {
                    nombre: campos.nombre.value.trim(),
                    apellido: campos.apellido.value.trim(),
                    dni: campos.dni.value.trim(),
                    curso: campos.curso.value.trim(),
                    telefono: campos.telefono.value.trim()
                });

                guardarDatos(STORAGE_ALUMNOS, alumnos);
                limpiarFormulario();
                renderizarAlumnos();
                alert("Alumno modificado correctamente.");
                return;
            }

            const nuevoAlumno = {
                id: nuevoId(),
                nombre: campos.nombre.value.trim(),
                apellido: campos.apellido.value.trim(),
                dni: campos.dni.value.trim(),
                curso: campos.curso.value.trim(),
                telefono: campos.telefono.value.trim()
            };

            alumnos.push(nuevoAlumno);
            guardarDatos(STORAGE_ALUMNOS, alumnos);

            limpiarFormulario();
            renderizarAlumnos();

            alert("Alumno registrado correctamente.");
        });

        renderizarAlumnos();
    }

    // ==========================================
    // MÓDULO DE DOCENTES
    // ==========================================

    const formDocente = document.getElementById("formDocente");

    if (formDocente) {
        const lista = document.getElementById("listaDocentes");

        const campos = {
            nombre: document.getElementById("nombreDocente"),
            materia: document.getElementById("materia"),
            especialidad: document.getElementById("especialidad"),
            telefono: document.getElementById("telefono")
        };

        let docenteSeleccionado = null;

        function limpiarFormulario() {
            formDocente.reset();
            docenteSeleccionado = null;
        }

        function renderizarDocentes() {
            const docentes = obtenerDatos(STORAGE_DOCENTES);
            lista.replaceChildren();

            docentes.forEach(docente => {
                const item = document.createElement("li");

                const informacion = document.createElement("span");
                informacion.textContent =
                    `${docente.nombre} | Materia: ${docente.materia} | Especialidad: ${docente.especialidad} | Teléfono: ${docente.telefono}`;

                const editar = document.createElement("button");
                editar.type = "button";
                editar.textContent = "Editar";

                editar.addEventListener("click", () => {
                    campos.nombre.value = docente.nombre;
                    campos.materia.value = docente.materia;
                    campos.especialidad.value = docente.especialidad;
                    campos.telefono.value = docente.telefono;

                    docenteSeleccionado = docente.id;
                });

                const eliminar = document.createElement("button");
                eliminar.type = "button";
                eliminar.textContent = "Eliminar";

                eliminar.addEventListener("click", () => {
                    if (!confirm("¿Deseás eliminar este docente?")) return;

                    const actualizados = obtenerDatos(STORAGE_DOCENTES)
                        .filter(d => d.id !== docente.id);

                    guardarDatos(STORAGE_DOCENTES, actualizados);

                    if (docenteSeleccionado === docente.id) {
                        limpiarFormulario();
                    }

                    renderizarDocentes();
                });

                item.append(informacion, editar, eliminar);
                lista.appendChild(item);
            });
        }

        formDocente.addEventListener("submit", event => {
            event.preventDefault();

            const accion = event.submitter?.textContent.trim().toLowerCase();

            let docentes = obtenerDatos(STORAGE_DOCENTES);

            if (accion === "eliminar") {
                if (!docenteSeleccionado) {
                    alert("Primero seleccioná un docente del listado.");
                    return;
                }

                if (!confirm("¿Confirmás la eliminación del docente?")) return;

                docentes = docentes.filter(d => d.id !== docenteSeleccionado);
                guardarDatos(STORAGE_DOCENTES, docentes);
                limpiarFormulario();
                renderizarDocentes();
                alert("Docente eliminado correctamente.");
                return;
            }

            if (accion === "modificar") {
                if (!docenteSeleccionado) {
                    alert("Primero seleccioná un docente del listado.");
                    return;
                }

                const docente = docentes.find(d => d.id === docenteSeleccionado);

                if (!docente) return;

                Object.assign(docente, {
                    nombre: campos.nombre.value.trim(),
                    materia: campos.materia.value.trim(),
                    especialidad: campos.especialidad.value.trim(),
                    telefono: campos.telefono.value.trim()
                });

                guardarDatos(STORAGE_DOCENTES, docentes);
                limpiarFormulario();
                renderizarDocentes();
                alert("Docente modificado correctamente.");
                return;
            }

            const nuevoDocente = {
                id: nuevoId(),
                nombre: campos.nombre.value.trim(),
                materia: campos.materia.value.trim(),
                especialidad: campos.especialidad.value.trim(),
                telefono: campos.telefono.value.trim()
            };

            docentes.push(nuevoDocente);
            guardarDatos(STORAGE_DOCENTES, docentes);

            limpiarFormulario();
            renderizarDocentes();

            alert("Docente registrado correctamente.");
        });

        
        renderizarDocentes();
    }

    // ==========================================
    // MÓDULO DE MATERIAS
    // ==========================================

    const formMateria = document.getElementById("formMateria");

    if (formMateria) {
        const lista = document.getElementById("listaMaterias");

        const campos = {
            nombre: document.getElementById("nombreMateria"),
            curso: document.getElementById("cursoMateria"),
            profesor: document.getElementById("profesorMateria")
        };

        let materiaSeleccionada = null;

        function limpiarFormularioMateria() {
            formMateria.reset();
            materiaSeleccionada = null;
        }

        function renderizarMaterias() {
            const materias = obtenerDatos("sigeaMaterias");
            lista.replaceChildren();

            materias.forEach(materia => {
                const item = document.createElement("li");

                const informacion = document.createElement("span");
                informacion.textContent =
                    `${materia.nombre} | Curso: ${materia.curso} | Profesor: ${materia.profesor}`;

                const editar = document.createElement("button");
                editar.type = "button";
                editar.textContent = "Editar";

                editar.addEventListener("click", () => {
                    campos.nombre.value = materia.nombre;
                    campos.curso.value = materia.curso;
                    campos.profesor.value = materia.profesor;

                    materiaSeleccionada = materia.id;
                });

                const eliminar = document.createElement("button");
                eliminar.type = "button";
                eliminar.textContent = "Eliminar";

                eliminar.addEventListener("click", () => {
                    if (!confirm("¿Deseás eliminar esta materia?")) return;

                    const actualizadas = obtenerDatos("sigeaMaterias")
                        .filter(m => m.id !== materia.id);

                    guardarDatos("sigeaMaterias", actualizadas);

                    if (materiaSeleccionada === materia.id) {
                        limpiarFormularioMateria();
                    }

                    renderizarMaterias();
                });

                item.append(informacion, editar, eliminar);
                lista.appendChild(item);
            });
        }

        formMateria.addEventListener("submit", event => {
            event.preventDefault();

            const materias = obtenerDatos("sigeaMaterias");

            const nuevaMateria = {
                id: nuevoId(),
                nombre: campos.nombre.value.trim(),
                curso: campos.curso.value.trim(),
                profesor: campos.profesor.value.trim()
            };

            materias.push(nuevaMateria);

            guardarDatos("sigeaMaterias", materias);

            limpiarFormularioMateria();
            renderizarMaterias();

            alert("Materia registrada correctamente.");
        });

        document.getElementById("btnModificar").addEventListener("click", () => {
            if (!materiaSeleccionada) {
                alert("Primero seleccioná una materia del listado.");
                return;
            }

            const materias = obtenerDatos("sigeaMaterias");

            const materia = materias.find(m => m.id === materiaSeleccionada);

            if (!materia) return;

            materia.nombre = campos.nombre.value.trim();
            materia.curso = campos.curso.value.trim();
            materia.profesor = campos.profesor.value.trim();

            guardarDatos("sigeaMaterias", materias);

            limpiarFormularioMateria();
            renderizarMaterias();

            alert("Materia modificada correctamente.");
        });

        document.getElementById("btnEliminar").addEventListener("click", () => {
            if (!materiaSeleccionada) {
                alert("Primero seleccioná una materia del listado.");
                return;
            }

            if (!confirm("¿Confirmás la eliminación de esta materia?")) return;

            const materias = obtenerDatos("sigeaMaterias")
                .filter(m => m.id !== materiaSeleccionada);

            guardarDatos("sigeaMaterias", materias);

            limpiarFormularioMateria();
            renderizarMaterias();

            alert("Materia eliminada correctamente.");
        });

        document.getElementById("btnLimpiar").addEventListener("click", limpiarFormularioMateria);

        
        renderizarMaterias();
    }

    // ==========================================
    // MÓDULO DE CURSOS
    // ==========================================

    const formCurso = document.getElementById("formCurso");

    if (formCurso) {
        const lista = document.getElementById("listaCursos");

        const campos = {
            curso: document.getElementById("nombreCurso"),
            division: document.getElementById("divisionCurso")
        };

        let cursoSeleccionado = null;

        function limpiarFormularioCurso() {
            formCurso.reset();
            cursoSeleccionado = null;
        }

        function renderizarCursos() {
            const cursos = obtenerDatos("sigeaCursos");

            lista.replaceChildren();

            cursos.forEach(curso => {
                const item = document.createElement("li");

                const informacion = document.createElement("span");

                informacion.textContent =
                    `${curso.curso} | División: ${curso.division}`;

                const editar = document.createElement("button");
                editar.type = "button";
                editar.textContent = "Editar";

                editar.addEventListener("click", () => {
                    campos.curso.value = curso.curso;
                    campos.division.value = curso.division;

                    cursoSeleccionado = curso.id;
                });

                const eliminar = document.createElement("button");
                eliminar.type = "button";
                eliminar.textContent = "Eliminar";

                eliminar.addEventListener("click", () => {
                    if (!confirm("¿Deseás eliminar este curso?")) return;

                    const actualizados = obtenerDatos("sigeaCursos")
                        .filter(c => c.id !== curso.id);

                    guardarDatos("sigeaCursos", actualizados);

                    if (cursoSeleccionado === curso.id) {
                        limpiarFormularioCurso();
                    }

                    renderizarCursos();
                });

                item.append(informacion, editar, eliminar);
                lista.appendChild(item);
            });
        }

        formCurso.addEventListener("submit", event => {
            event.preventDefault();

            const cursos = obtenerDatos("sigeaCursos");

            const nuevoCurso = {
                id: nuevoId(),
                curso: campos.curso.value.trim(),
                division: campos.division.value.trim()
            };

            cursos.push(nuevoCurso);

            guardarDatos("sigeaCursos", cursos);

            limpiarFormularioCurso();
            renderizarCursos();

            alert("Curso registrado correctamente.");
        });

        document.getElementById("btnModificarCurso").addEventListener("click", () => {
            if (!cursoSeleccionado) {
                alert("Primero seleccioná un curso del listado.");
                return;
            }

            const cursos = obtenerDatos("sigeaCursos");

            const curso = cursos.find(c => c.id === cursoSeleccionado);

            if (!curso) return;

            curso.curso = campos.curso.value.trim();
            curso.division = campos.division.value.trim();

            guardarDatos("sigeaCursos", cursos);

            limpiarFormularioCurso();
            renderizarCursos();

            alert("Curso modificado correctamente.");
        });

        document.getElementById("btnEliminarCurso").addEventListener("click", () => {
            if (!cursoSeleccionado) {
                alert("Primero seleccioná un curso del listado.");
                return;
            }

            if (!confirm("¿Confirmás la eliminación de este curso?")) return;

            const cursos = obtenerDatos("sigeaCursos")
                .filter(c => c.id !== cursoSeleccionado);

            guardarDatos("sigeaCursos", cursos);

            limpiarFormularioCurso();
            renderizarCursos();

            alert("Curso eliminado correctamente.");
        });

        document.getElementById("btnLimpiarCurso").addEventListener("click", limpiarFormularioCurso);

        
        renderizarCursos();
    }

    // ==========================================
    // MÓDULO DE CALIFICACIONES
    // ==========================================

    const formCalificacion = document.getElementById("formCalificacion");

    if (formCalificacion) {
        const lista = document.getElementById("listaCalificaciones");

        const campos = {
            alumno: document.getElementById("alumnoCalificacion"),
            materia: document.getElementById("materiaCalificacion"),
            nota: document.getElementById("notaCalificacion"),
            observaciones: document.getElementById("observacionesCalificacion")
        };

        let calificacionSeleccionada = null;

        function limpiarFormularioCalificacion() {
            formCalificacion.reset();
            calificacionSeleccionada = null;
        }

        function cargarAlumnos() {
            const alumnos = obtenerDatos("sigeaAlumnos");

            campos.alumno.replaceChildren(
                new Option("Seleccionar alumno", "")
            );

            alumnos.forEach(alumno => {
                const opcion = new Option(
                    `${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}`,
                    alumno.id
                );

                campos.alumno.add(opcion);
            });
        }

        function cargarMaterias() {
            const materias = obtenerDatos("sigeaMaterias");

            campos.materia.replaceChildren(
                new Option("Seleccionar materia", "")
            );

            materias.forEach(materia => {
                const opcion = new Option(
                    `${materia.nombre} - ${materia.curso}`,
                    materia.id
                );

                campos.materia.add(opcion);
            });
        }

        function renderizarCalificaciones() {
            const calificaciones = obtenerDatos("sigeaCalificaciones");

            const alumnos = obtenerDatos("sigeaAlumnos");
            const materias = obtenerDatos("sigeaMaterias");

            lista.replaceChildren();

            calificaciones.forEach(calificacion => {
                const alumno = alumnos.find(a => a.id === calificacion.alumnoId);
                const materia = materias.find(m => m.id === calificacion.materiaId);

                const item = document.createElement("li");

                const informacion = document.createElement("span");

                informacion.textContent =
                    `Alumno: ${alumno ? alumno.nombre + " " + alumno.apellido : "Alumno no disponible"} | ` +
                    `Materia: ${materia ? materia.nombre : "Materia no disponible"} | ` +
                    `Nota: ${calificacion.nota} | ` +
                    `Observaciones: ${calificacion.observaciones || "Sin observaciones"}`;

                const editar = document.createElement("button");
                editar.type = "button";
                editar.textContent = "Editar";

                editar.addEventListener("click", () => {
                    campos.alumno.value = calificacion.alumnoId;
                    campos.materia.value = calificacion.materiaId;
                    campos.nota.value = calificacion.nota;
                    campos.observaciones.value = calificacion.observaciones;

                    calificacionSeleccionada = calificacion.id;
                });

                const eliminar = document.createElement("button");
                eliminar.type = "button";
                eliminar.textContent = "Eliminar";

                eliminar.addEventListener("click", () => {
                    if (!confirm("¿Deseás eliminar esta calificación?")) return;

                    const actualizadas = obtenerDatos("sigeaCalificaciones")
                        .filter(c => c.id !== calificacion.id);

                    guardarDatos("sigeaCalificaciones", actualizadas);

                    if (calificacionSeleccionada === calificacion.id) {
                        limpiarFormularioCalificacion();
                    }

                    renderizarCalificaciones();
                });

                item.append(informacion, editar, eliminar);
                lista.appendChild(item);
            });
        }

        formCalificacion.addEventListener("submit", event => {
            event.preventDefault();

            if (!campos.alumno.value || !campos.materia.value) {
                alert("Seleccioná un alumno y una materia.");
                return;
            }

            const nota = Number(campos.nota.value);

            if (nota < 1 || nota > 10 || !Number.isFinite(nota)) {
                alert("La calificación debe estar entre 1 y 10.");
                return;
            }

            const calificaciones = obtenerDatos("sigeaCalificaciones");

            const nuevaCalificacion = {
                id: nuevoId(),
                alumnoId: campos.alumno.value,
                materiaId: campos.materia.value,
                nota: nota,
                observaciones: campos.observaciones.value.trim()
            };

            calificaciones.push(nuevaCalificacion);

            guardarDatos("sigeaCalificaciones", calificaciones);

            limpiarFormularioCalificacion();
            renderizarCalificaciones();

            alert("Calificación registrada correctamente.");
        });

        document.getElementById("btnModificarCalificacion").addEventListener("click", () => {
            if (!calificacionSeleccionada) {
                alert("Primero seleccioná una calificación del listado.");
                return;
            }

            if (!campos.alumno.value || !campos.materia.value) {
                alert("Seleccioná un alumno y una materia.");
                return;
            }

            const nota = Number(campos.nota.value);

            if (nota < 1 || nota > 10 || !Number.isFinite(nota)) {
                alert("La calificación debe estar entre 1 y 10.");
                return;
            }

            const calificaciones = obtenerDatos("sigeaCalificaciones");

            const calificacion = calificaciones.find(
                c => c.id === calificacionSeleccionada
            );

            if (!calificacion) return;

            calificacion.alumnoId = campos.alumno.value;
            calificacion.materiaId = campos.materia.value;
            calificacion.nota = nota;
            calificacion.observaciones = campos.observaciones.value.trim();

            guardarDatos("sigeaCalificaciones", calificaciones);

            limpiarFormularioCalificacion();
            renderizarCalificaciones();

            alert("Calificación modificada correctamente.");
        });

        document.getElementById("btnEliminarCalificacion").addEventListener("click", () => {
            if (!calificacionSeleccionada) {
                alert("Primero seleccioná una calificación del listado.");
                return;
            }

            if (!confirm("¿Confirmás la eliminación de esta calificación?")) return;

            const calificaciones = obtenerDatos("sigeaCalificaciones")
                .filter(c => c.id !== calificacionSeleccionada);

            guardarDatos("sigeaCalificaciones", calificaciones);

            limpiarFormularioCalificacion();
            renderizarCalificaciones();

            alert("Calificación eliminada correctamente.");
        });

        document.getElementById("btnLimpiarCalificacion").addEventListener(
            "click",
            limpiarFormularioCalificacion
        );

        cargarAlumnos();
        cargarMaterias();
       
        renderizarCalificaciones();
    }

    // ==========================================
    // MÓDULO DE ASISTENCIAS
    // ==========================================

    const formAsistencia = document.getElementById("formAsistencia");

    if (formAsistencia) {
        const lista = document.getElementById("listaAsistencias");

        const campos = {
            alumno: document.getElementById("alumnoAsistencia"),
            fecha: document.getElementById("fechaAsistencia"),
            estado: document.getElementById("estadoAsistencia"),
            observaciones: document.getElementById("observacionesAsistencia")
        };

        let asistenciaSeleccionada = null;

        function limpiarFormularioAsistencia() {
            formAsistencia.reset();
            asistenciaSeleccionada = null;
        }

        function cargarAlumnosAsistencia() {
            const alumnos = obtenerDatos("sigeaAlumnos");

            campos.alumno.replaceChildren(
                new Option("Seleccionar alumno", "")
            );

            alumnos.forEach(alumno => {
                const opcion = new Option(
                    `${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}`,
                    alumno.id
                );

                campos.alumno.add(opcion);
            });
        }

        function renderizarAsistencias() {
            const asistencias = obtenerDatos("sigeaAsistencias");
            const alumnos = obtenerDatos("sigeaAlumnos");

            lista.replaceChildren();

            asistencias.forEach(asistencia => {
                const alumno = alumnos.find(
                    a => a.id === asistencia.alumnoId
                );

                const item = document.createElement("li");
                const informacion = document.createElement("span");

                informacion.textContent =
                    `Alumno: ${alumno ? alumno.nombre + " " + alumno.apellido : "Alumno no disponible"} | ` +
                    `Fecha: ${asistencia.fecha} | ` +
                    `Estado: ${asistencia.estado} | ` +
                    `Observaciones: ${asistencia.observaciones || "Sin observaciones"}`;

                const editar = document.createElement("button");
                editar.type = "button";
                editar.textContent = "Editar";

                editar.addEventListener("click", () => {
                    campos.alumno.value = asistencia.alumnoId;
                    campos.fecha.value = asistencia.fecha;
                    campos.estado.value = asistencia.estado;
                    campos.observaciones.value = asistencia.observaciones;

                    asistenciaSeleccionada = asistencia.id;
                });

                const eliminar = document.createElement("button");
                eliminar.type = "button";
                eliminar.textContent = "Eliminar";

                eliminar.addEventListener("click", () => {
                    if (!confirm("¿Deseás eliminar esta asistencia?")) return;

                    const actualizadas = obtenerDatos("sigeaAsistencias")
                        .filter(a => a.id !== asistencia.id);

                    guardarDatos("sigeaAsistencias", actualizadas);

                    if (asistenciaSeleccionada === asistencia.id) {
                        limpiarFormularioAsistencia();
                    }

                    renderizarAsistencias();
                });

                item.append(informacion, editar, eliminar);
                lista.appendChild(item);
            });
        }

        formAsistencia.addEventListener("submit", event => {
            event.preventDefault();

            if (!campos.alumno.value || !campos.fecha.value || !campos.estado.value) {
                alert("Completá los campos obligatorios.");
                return;
            }

            const asistencias = obtenerDatos("sigeaAsistencias");

            const duplicada = asistencias.some(a =>
                a.alumnoId === campos.alumno.value &&
                a.fecha === campos.fecha.value
            );

            if (duplicada) {
                alert("Este alumno ya tiene una asistencia registrada para esa fecha.");
                return;
            }

            const nuevaAsistencia = {
                id: nuevoId(),
                alumnoId: campos.alumno.value,
                fecha: campos.fecha.value,
                estado: campos.estado.value,
                observaciones: campos.observaciones.value.trim()
            };

            asistencias.push(nuevaAsistencia);

            guardarDatos("sigeaAsistencias", asistencias);

            limpiarFormularioAsistencia();
            renderizarAsistencias();

            alert("Asistencia registrada correctamente.");
        });

        document.getElementById("btnModificarAsistencia").addEventListener("click", () => {
            if (!asistenciaSeleccionada) {
                alert("Primero seleccioná una asistencia del listado.");
                return;
            }

            if (!campos.alumno.value || !campos.fecha.value || !campos.estado.value) {
                alert("Completá los campos obligatorios.");
                return;
            }

            const asistencias = obtenerDatos("sigeaAsistencias");

            const duplicada = asistencias.some(a =>
                a.id !== asistenciaSeleccionada &&
                a.alumnoId === campos.alumno.value &&
                a.fecha === campos.fecha.value
            );

            if (duplicada) {
                alert("Este alumno ya tiene una asistencia registrada para esa fecha.");
                return;
            }

            const asistencia = asistencias.find(
                a => a.id === asistenciaSeleccionada
            );

            if (!asistencia) return;

            asistencia.alumnoId = campos.alumno.value;
            asistencia.fecha = campos.fecha.value;
            asistencia.estado = campos.estado.value;
            asistencia.observaciones = campos.observaciones.value.trim();

            guardarDatos("sigeaAsistencias", asistencias);

            limpiarFormularioAsistencia();
            renderizarAsistencias();

            alert("Asistencia modificada correctamente.");
        });

        document.getElementById("btnEliminarAsistencia").addEventListener("click", () => {
            if (!asistenciaSeleccionada) {
                alert("Primero seleccioná una asistencia del listado.");
                return;
            }

            if (!confirm("¿Confirmás la eliminación de esta asistencia?")) return;

            const asistencias = obtenerDatos("sigeaAsistencias")
                .filter(a => a.id !== asistenciaSeleccionada);

            guardarDatos("sigeaAsistencias", asistencias);

            limpiarFormularioAsistencia();
            renderizarAsistencias();

            alert("Asistencia eliminada correctamente.");
        });

        document.getElementById("btnLimpiarAsistencia").addEventListener(
            "click",
            limpiarFormularioAsistencia
        );

        cargarAlumnosAsistencia();
        renderizarAsistencias();
    }

})();




