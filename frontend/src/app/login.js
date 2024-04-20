import { showAlert } from "../helpers/alerta";
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
      showAlert("No se permiten campos vacios", "error", formulario);
      return;
    }

    // Enviar peticion al server
    try {
      const {data} = await clienteAxios.post("/usuarios/autenticar", {
        email,
        password,
      });
      
      showAlert('Iniciando Sesion', 'succes', formulario);
      localStorage.setItem('token', data.token);
      window.location.href = '../pages/administrarTareas.html'      
    } catch (error) {
      console.log(error.response);
      showAlert(error.response.data.msg, 'error', formulario);
    }

    console.log(email);
    console.log(password);
  };

  formulario.addEventListener("submit", handleSubmit);
})();
