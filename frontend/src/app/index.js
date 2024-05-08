import { getList } from "../api/listas";
import { getTasks } from "../api/task";
import { printTasks } from "../helpers/task";
import { usuarioAuth } from "../helpers/userAuth";

(() => {
  document.addEventListener("DOMContentLoaded", async () => {
    // obtenemos los datos del usuer
    const usuario = await usuarioAuth(); // Llamando a la funcion que se encarga de validar si hay un usuario autenticado
    console.log(usuario); // ver datos del usuario en consola

    // extraer el userName
    const { userName, _id } = usuario;

    // Personalizar saludo de header
    const header = document.querySelector("#userNameHeader");
    header.textContent = `Bienvenido: ${userName}`;

    // Cerrar sesion
    const cerrarSesion = document.querySelector("#singOut");
    cerrarSesion.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "./login.html";
    });

    // Traerme las tareas
    const { tareas } = await getTasks(userName);
    console.log(tareas);

    const titulo = document.querySelector("#titulo");
    const spanTitulo = document.createElement("SPAN");

    if (tareas.length === 0) {
      console.log("Usuario sin tareas");
      titulo.textContent = "Comienza a crear tus Tareas";
      return;
    }

    titulo.textContent = "Administra tus Tareas";
    console.log("Usuario con tareas");

  

    // Segun
    printTasks(tareas);
  });
})();
