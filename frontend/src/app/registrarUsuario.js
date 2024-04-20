import { showAlert } from "../helpers/alerta";

(() => {
  const formulario = document.querySelector("#form");

  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtener campos
    const userName = document.querySelector("#userName").value;
    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirmarPassword =
      document.querySelector("#confirmarPassword").value;

    // Validar formulario
    const camposVacios = [nombre, email, password, confirmarPassword].includes(
      ""
    );

    if (camposVacios) {
      console.log("No se permiten campos vacios");
      showAlert("No se permiten campos vacios", "error", formulario);
      return;
    }

    // Comenzar a validar el usuario
    const nuevoUsuario = {
      userName,
      nombre,
      email,
      password,
    };

    console.log(nuevoUsuario);
  });
})();
