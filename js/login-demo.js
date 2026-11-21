// Acceso SIMULADO para demostración académica.
// No usar en producción: las credenciales están visibles en el código del navegador.
(() => {
  const cuentasDemo = {
    admin:   { password: "sigea123", role: "administrador", nombre: "Administrador" },
    docente: { password: "sigea123", role: "docente", nombre: "Docente de demostración" },
    alumno:  { password: "sigea123", role: "alumno", nombre: "Alumno de demostración" },
    tutor:   { password: "sigea123", role: "tutor", nombre: "Padre / tutor de demostración" }
  };

  const form = document.getElementById("formLogin");
  const mensaje = document.getElementById("loginMensaje");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const cuenta = cuentasDemo[usuario];

    if (!cuenta || cuenta.password !== password) {
      mensaje.textContent = "Usuario o contraseña incorrectos. Utilizá una cuenta de demostración.";
      mensaje.style.color = "#b00020";
      return;
    }

    sessionStorage.setItem("sigeaUser", JSON.stringify({
      username: usuario,
      role: cuenta.role,
      name: cuenta.nombre
    }));

    mensaje.textContent = `Acceso de demostración correcto: ${cuenta.nombre}. Volviendo al inicio...`;
    mensaje.style.color = "#176b36";
    setTimeout(() => { window.location.href = "index.html"; }, 700);
  });

  document.getElementById("cerrarSesion").addEventListener("click", () => {
    sessionStorage.removeItem("sigeaUser");
    mensaje.textContent = "Sesión de demostración cerrada.";
    mensaje.style.color = "#176b36";
  });
})();
