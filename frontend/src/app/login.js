import { alerta, showAlert } from "../helpers/alerta";
import clienteAxios from "../helpers/clienteAxios";

(function () {
  const formulario = document.querySelector("#form");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Obtener datos del formulario
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    // Validar datos
    const camposVacios = [email, password].includes(""); // true

    if (camposVacios) {
      console.log("No se permiten campos vacios");
      alerta("No se permiten campos vacios", "error", formulario);
      return;
    }

    // Enviar peticion al server
    try {
      const {data} = await clienteAxios.post("/usuarios/autenticar", {
        email,
        password,
      });
      // Mostrar alerta
      console.log(data);
      alerta('Iniciando Sesion', 'succes', formulario);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      window.location.href = `../pages/index.html`;      
    } catch (error) {
      console.log(error.response);
      alerta(error.response.data.msg, 'error', formulario);
    }

    console.log(email);
    console.log(password);
  };

  formulario.addEventListener("submit", handleSubmit);
})();
