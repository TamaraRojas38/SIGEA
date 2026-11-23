
import unicodedata


def handle_response(texto):
    mensaje = texto.lower().strip()

    # Normalizar tildes para reconocer distintas escrituras
    mensaje = unicodedata.normalize("NFD", mensaje)
    mensaje = "".join(
        c for c in mensaje
        if unicodedata.category(c) != "Mn"
    )

    # SALUDOS
    if any(p in mensaje for p in [
        "hola", "buenas", "buen dia",
        "buenas tardes", "buenas noches"
    ]):
        return "¡Hola! Soy el asistente virtual de SIGEA. ¿En qué puedo ayudarte?"

    # AYUDA
    elif any(p in mensaje for p in [
        "ayuda", "que podes hacer", "que podés hacer",
        "que puedo hacer", "que haces"
    ]):
        return (
            "¡Puedo orientarte sobre los módulos de SIGEA!\n\n"
            "• Alumnos\n• Docentes\n• Materias\n"
            "• Cursos y divisiones\n• Calificaciones\n"
            "• Asistencias\n• Reportes\n\n"
            "Escribí tu consulta y te ayudaré."
        )

    # ==================================
    # ALUMNOS: ACCIONES ESPECIFICAS
    # ==================================

    elif any(p in mensaje for p in [
        "registrar alumno", "registrar un alumno",
        "agregar alumno", "agregar un alumno",
        "cargar alumno", "cargar un alumno",
        "dar de alta un alumno"
    ]):
        return (
            "Para registrar un alumno en SIGEA:\n\n"
            "1. Ingresá al sistema.\n"
            "2. Entrá al módulo Alumnos.\n"
            "3. Seleccioná Agregar alumno.\n"
            "4. Completá los datos solicitados.\n"
            "5. Guardá el registro.\n\n"
            "¡Listo! El alumno quedará registrado."
        )

    elif any(p in mensaje for p in [
        "editar alumno", "modificar alumno",
        "actualizar alumno"
    ]):
        return (
            "Para modificar un alumno:\n\n"
            "1. Ingresá al módulo Alumnos.\n"
            "2. Buscá al estudiante.\n"
            "3. Seleccioná Editar.\n"
            "4. Modificá sus datos.\n"
            "5. Guardá los cambios."
        )

    elif any(p in mensaje for p in [
        "eliminar alumno", "borrar alumno"
    ]):
        return (
            "Para eliminar un alumno:\n\n"
            "1. Entrá al módulo Alumnos.\n"
            "2. Buscá al estudiante.\n"
            "3. Seleccioná Eliminar.\n"
            "4. Confirmá la operación."
        )

    # ==================================
    # CALIFICACIONES
    # ==================================

    elif any(p in mensaje for p in [
        "cargar nota", "cargar notas",
        "cargar la nota", "cargar las notas",
        "registrar nota", "registrar notas",
        "registrar una nota", "registrar las notas",
        "poner nota", "ingresar nota",
        "ingresar calificacion",
        "cargar calificacion", "cargar calificaciones"
    ]):
        return (
            "Para cargar las calificaciones de un alumno:\n\n"
            "1. Ingresá al módulo Calificaciones.\n"
            "2. Buscá y seleccioná al alumno.\n"
            "3. Elegí la materia correspondiente.\n"
            "4. Ingresá la nota solicitada.\n"
            "5. Guardá la calificación.\n\n"
            "Verificá que la nota corresponda al alumno y a la materia."
        )

    elif any(p in mensaje for p in [
        "consultar nota", "consultar notas",
        "ver notas", "ver calificaciones",
        "buscar calificacion"
    ]):
        return (
            "Para consultar las calificaciones:\n\n"
            "1. Entrá al módulo Calificaciones.\n"
            "2. Buscá al alumno.\n"
            "3. Seleccioná la materia o período.\n"
            "4. Consultá las notas registradas."
        )

    elif any(p in mensaje for p in [
        "modificar nota", "editar nota",
        "corregir nota", "modificar calificacion"
    ]):
        return (
            "Para modificar una calificación:\n\n"
            "1. Entrá al módulo Calificaciones.\n"
            "2. Buscá al alumno y la materia.\n"
            "3. Seleccioná la nota.\n"
            "4. Corregí la calificación.\n"
            "5. Guardá los cambios."
        )

    # ==================================
    # ASISTENCIAS
    # ==================================

    elif any(p in mensaje for p in [
        "registrar asistencia", "registrar la asistencia",
        "como registro asistencia", "como registro la asistencia",
        "tomar asistencia", "pasar lista",
        "cargar asistencia", "cargar la asistencia",
        "registrar ausencia", "cargar ausencia"
    ]):
        return (
            "Para registrar la asistencia:\n\n"
            "1. Ingresá al módulo Asistencias.\n"
            "2. Seleccioná el curso.\n"
            "3. Elegí la fecha correspondiente.\n"
            "4. Marcá los alumnos presentes y ausentes.\n"
            "5. Guardá el registro."
        )

    elif any(p in mensaje for p in [
        "consultar asistencia", "ver asistencia",
        "ver ausencias", "consultar ausencias"
    ]):
        return (
            "Para consultar las asistencias:\n\n"
            "1. Entrá al módulo Asistencias.\n"
            "2. Seleccioná el alumno o curso.\n"
            "3. Elegí el período que querés consultar.\n"
            "4. Revisá las asistencias y ausencias."
        )

    # ==================================
    # DOCENTES
    # ==================================

    elif any(p in mensaje for p in [
        "registrar docente", "registrar un docente",
        "agregar docente", "agregar un docente",
        "cargar docente", "nuevo profesor",
        "registrar profesor"
    ]):
        return (
            "Para registrar un docente:\n\n"
            "1. Ingresá al módulo Docentes.\n"
            "2. Seleccioná Agregar docente.\n"
            "3. Completá los datos solicitados.\n"
            "4. Revisá la información.\n"
            "5. Guardá el registro."
        )

    elif any(p in mensaje for p in [
        "editar docente", "modificar docente",
        "actualizar docente", "editar profesor"
    ]):
        return (
            "Para modificar un docente:\n\n"
            "1. Entrá al módulo Docentes.\n"
            "2. Buscá al profesor.\n"
            "3. Seleccioná Editar.\n"
            "4. Actualizá sus datos.\n"
            "5. Guardá los cambios."
        )

    elif any(p in mensaje for p in [
        "eliminar docente", "borrar docente",
        "eliminar profesor"
    ]):
        return (
            "Para eliminar un docente:\n\n"
            "1. Entrá al módulo Docentes.\n"
            "2. Buscá al profesor.\n"
            "3. Seleccioná Eliminar.\n"
            "4. Confirmá la operación."
        )

    # ==================================
    # MATERIAS
    # ==================================

    elif any(p in mensaje for p in [
        "registrar materia", "agregar materia",
        "crear materia", "nueva asignatura"
    ]):
        return (
            "Para registrar una materia:\n\n"
            "1. Entrá al módulo Materias.\n"
            "2. Seleccioná Agregar materia.\n"
            "3. Escribí el nombre de la asignatura.\n"
            "4. Completá los datos solicitados.\n"
            "5. Guardá el registro."
        )

    elif any(p in mensaje for p in [
        "editar materia", "modificar materia",
        "actualizar materia"
    ]):
        return (
            "Para modificar una materia:\n\n"
            "1. Entrá al módulo Materias.\n"
            "2. Buscá la asignatura.\n"
            "3. Seleccioná Editar.\n"
            "4. Modificá sus datos.\n"
            "5. Guardá los cambios."
        )

    elif any(p in mensaje for p in [
        "eliminar materia", "borrar materia"
    ]):
        return (
            "Para eliminar una materia:\n\n"
            "1. Entrá al módulo Materias.\n"
            "2. Buscá la asignatura.\n"
            "3. Seleccioná Eliminar.\n"
            "4. Confirmá la operación."
        )

    # ==================================
    # CURSOS Y DIVISIONES
    # ==================================

    elif any(p in mensaje for p in [
        "crear curso", "crear un curso",
        "agregar curso", "agregar un curso",
        "registrar curso", "registrar un curso",
        "crear division", "crear una division",
        "agregar division", "agregar una division"
    ]):
        return (
            "Para crear un curso o división:\n\n"
            "1. Ingresá al módulo Cursos.\n"
            "2. Seleccioná Agregar curso.\n"
            "3. Completá el año y la división.\n"
            "4. Ingresá los demás datos solicitados.\n"
            "5. Guardá el registro."
        )

    elif any(p in mensaje for p in [
        "editar curso", "modificar curso",
        "eliminar curso", "borrar curso"
    ]):
        return (
            "Para administrar un curso:\n\n"
            "1. Entrá al módulo Cursos.\n"
            "2. Buscá el curso correspondiente.\n"
            "3. Seleccioná Editar o Eliminar.\n"
            "4. Realizá la operación y guardá los cambios."
        )

    # ==================================
    # REPORTES
    # ==================================

    elif any(p in mensaje for p in [
        "generar reporte", "generar un reporte",
        "generar informe", "crear reporte",
        "reporte de alumnos", "reporte de notas",
        "reporte de calificaciones",
        "reporte de asistencias"
    ]):
        return (
            "Para generar un reporte:\n\n"
            "1. Ingresá al módulo Reportes.\n"
            "2. Seleccioná el tipo de información.\n"
            "3. Aplicá los filtros disponibles.\n"
            "4. Consultá los resultados.\n"
            "5. Utilizá la opción de exportar si está disponible."
        )

    # ==================================
    # CONSULTAS GENERALES POR MODULO
    # ==================================

    elif any(p in mensaje for p in ["alumno", "alumnos", "estudiante", "estudiantes"]):
        return (
            "El módulo Alumnos permite registrar, consultar, "
            "editar y eliminar información de los estudiantes."
        )

    elif any(p in mensaje for p in ["docente", "docentes", "profesor", "profesores"]):
        return (
            "El módulo Docentes permite administrar la información "
            "de los profesores de la institución."
        )

    elif any(p in mensaje for p in ["materia", "materias", "asignatura"]):
        return (
            "El módulo Materias permite gestionar las asignaturas "
            "de la institución."
        )

    elif any(p in mensaje for p in ["curso", "cursos", "division", "divisiones"]):
        return (
            "El módulo Cursos permite organizar los cursos y divisiones "
            "de la institución educativa."
        )

    elif any(p in mensaje for p in ["calificacion", "calificaciones", "nota", "notas"]):
        return (
            "El módulo Calificaciones permite registrar, modificar "
            "y consultar las notas de los alumnos."
        )

    elif any(p in mensaje for p in ["asistencia", "asistencias", "ausencia", "ausencias"]):
        return (
            "El módulo Asistencias permite registrar y consultar "
            "la asistencia y las ausencias de los alumnos."
        )

    elif any(p in mensaje for p in ["reporte", "reportes", "informe", "informes", "listados"]):
        return (
            "El módulo Reportes permite consultar información académica "
            "y generar listados de alumnos, calificaciones y asistencias."
        )

    # IDENTIDAD DEL SISTEMA
    elif "sigea" in mensaje:
        return (
            "SIGEA es el Sistema de Gestión Escolar Académica, "
            "diseñado para organizar y administrar la información escolar."
        )

    # RESPUESTA PREDETERMINADA
    else:
        return (
            "No comprendí tu consulta.\n\n"
            "Escribí AYUDA para conocer los módulos sobre los que "
            "puedo orientarte."
        )
