import { usuarioAuth } from "../helpers/userAuth";
import { alerta } from "../helpers/alerta";
import { getCategorys, saveTask } from "../api/task";
import clienteAxios from "../helpers/clienteAxios";

(() => {
  // Dice, que cuando el documento(el HTML) sea cargado por completo, procedera a hacer lo que este dentro de este callback...
  document.addEventListener("DOMContentLoaded", async () => {
    // Y lo primero que queremos hacer es...
    const usuario = await usuarioAuth(); // Llamando a la funcion que se encarga de validar si hay un usuario autenticado
    console.log(usuario); // ver datos del usuario en consola

    // extraer el userName
    const { userName, _id } = usuario;
    const data = await getCategorys(userName); // Obtenemos una respuesta del servidor
    const { listas } = data; // Aqui extraemos las listas

    // Personalizar saludo de header
    const header = document.querySelector('#userNameHeader');
    header.textContent = `Bienvenido: ${userName}`;

    // Cerrar sesion
    const cerrarSesion = document.querySelector("#singOut");
    cerrarSesion.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "./login.html";
    });

    // cargar los datos del selector en el form desde una funcion que se encargue de todo el proceso:
    const printListas = () => {
      const selectCategoria = document.querySelector("#categoria");
      // foreach para iterar por cada lista
      listas.forEach((lista) => {
        // Aplicar destructuring
        const { _id, nombreLista } = lista;
        const option = document.createElement("OPTION");
        option.value = _id;
        option.textContent = nombreLista;

        selectCategoria.appendChild(option);
      });
    };

    printListas();
    // option.value =

    const formulario = document.querySelector("#form");

  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtener todos los valores del formulario
    const titulo = document.querySelector("#nombre").value;
    const descripcion = document.querySelector("#descripcion").value;
    const prioridad = document.querySelector("#prioridad").value;
    const fechaInicio = document.querySelector("#start-date").value;
    const fechaVencimiento = document.querySelector("#end-date").value;
    const listaPerteneciente = document.querySelector("#categoria").value;
    const recordatorio = document.querySelector("#recordatorio").checked;

    const alertaDiv = document.querySelector("#alerta");

    // Validar que los campos esten llenos
    if (
      [
        titulo,
        descripcion,
        prioridad,
        fechaInicio,
        fechaVencimiento,
        listaPerteneciente,
        recordatorio,
      ].includes("")
    ) {
      // Si algun campo esta vacio, devuelve true
      console.log("Hay campos vacios");
      return alerta("Se necesita una descripcion", "error", alertaDiv);
    }
    // Paso la validacion
    alerta("Guardando", "succes", alertaDiv);
    // Creo el objeto de tarea
    const estado = 'creada';
    const tarea = {
      titulo,
      descripcion,
      prioridad,
      fechaInicio,
      fechaVencimiento,
      listaPerteneciente,
      recordatorio,
      usuario: _id,
      estado,
    };

    console.log(tarea);

    // Enviamos la tarea al servidor
    const { data } = await saveTask(tarea);
    // Mostrar alerta
    alerta("Se ha guardado la tarea", "succes", alertaDiv);
    console.log(data);
  });

    
  });

  
})();
