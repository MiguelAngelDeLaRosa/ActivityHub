import { alerta } from "../helpers/alerta";
import clienteAxios from "../helpers/clienteAxios";

(async () => {

    const alertaDiv = document.getElementById("alerta");

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    // Mostrar en consola el token
    console.log(token);

    // Llamar a la API
    const { data } = await clienteAxios(`/usuarios/confirmar/${token}`);
    

    // Construccion del contenido
    alerta(data.msg, 'succes', alertaDiv);

    const links = document.createElement('a');
    links.classList.add('block', 'text-center', 'my-5', 'text-gray-500');
    links.textContent = 'Iniciar Sesion';
    links.href = '../pages/login.html';

    alertaDiv.appendChild(links);

    return;
  } catch (error) {
    console.log(error);
    alerta(error.response.data.msg, 'error', alertaDiv);
    return;
  }
})();
