import { getList } from "../api/listas";
import { getTasks } from "../api/task";
import { printTasks } from "../helpers/task";
import { usuarioAuth } from "../helpers/userAuth";

(() => {
  document.addEventListener("DOMContentLoaded", async () => {
    // obtenemos los datos del usuer
    const usuario = await usuarioAuth(); // Llamando a la funcion que se encarga de validar si hay un usuario autenticado
    // Traerme las tareas
    console.log(usuario); // ver datos del usuario en consola

    // Obtener el main
    const divContainer = document.querySelector("#container");
    const selectorAlerta = document.querySelector("#alerta");

    // extraer el userName
    const { userName, _id } = usuario;

    const { tareas } = await getTasks(userName);
    console.log(tareas);

    // Segun
    printTasks(tareas, divContainer, selectorAlerta);

    // Filtrar las tareas
    // Filtrar las tareas por estado
    const tareasCompletadas = tareas.filter(
      (tarea) => tarea.estado === "completado"
    );
    const tareasEnProceso = tareas.filter(
      (tarea) => tarea.estado === "En proceso"
    );
    const tareasPendientes = tareas.filter(
      (tarea) => tarea.estado === "pendiente"
    );

    const btnFiltrar = document.querySelector("#filtrarBtn");
    btnFiltrar.addEventListener("click", () => {
      // Vamos a eliminar el container
      divContainer.innerHTML = ""; // Eliminando todo
      // Leer lo que haya en el selector
      const optionSelector = document.querySelector('#estadoTarea').value;
      console.log(optionSelector);
      if(optionSelector === 'pendiente') printTasks(tareasPendientes, divContainer, selectorAlerta);
      if(optionSelector === 'todos') printTasks(tareas, divContainer, selectorAlerta);
      if(optionSelector === 'completado') printTasks(tareasCompletadas, divContainer, selectorAlerta);
    });

    // Personalizar saludo de header
    const header = document.querySelector("#userNameHeader");
    header.textContent = `Bienvenido: ${userName}`;

    // Cerrar sesion
    const cerrarSesion = document.querySelector("#singOut");
    cerrarSesion.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "./login.html";
    });

    const titulo = document.querySelector("#titulo");
    const spanTitulo = document.createElement("SPAN");

    if (tareas.length === 0) {
      console.log("Usuario sin tareas");
      titulo.textContent = "Comienza a crear tus Tareas";
      return;
    }

    titulo.textContent = "Administra tus Tareas";
    console.log("Usuario con tareas");

    
  });
})();
