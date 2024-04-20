import { alerta, showAlert } from "../helpers/alerta";
import clienteAxios from "../helpers/clienteAxios";

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

    // Validar que las contrasenas sean iguales
    if(password !== confirmarPassword) {
        console.log('Las contrasenas no son iguales');
        alerta('Las password no son iguales', 'error', formulario);
        return;
    }

    // Comenzar a validar el usuario
    // Creamo el objeto usuario
    const nuevoUsuario = {
      userName,
      nombre,
      email,
      password,
    };

    // Nos comunicamos con la API
    try {
        const {data} = await clienteAxios.post('/usuarios', nuevoUsuario);
    console.log(data);
    alerta('Usuario Registrado, Revisa tu email', 'succes', formulario);
    } catch (error) {
        console.log(error);
        alerta(error.response.data.msg, 'error', formulario);
    }

    console.log(nuevoUsuario);
  });
})();
