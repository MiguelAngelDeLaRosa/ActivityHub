import { formatDate, formatDateEdit } from "../helpers/dateFormat";
import { usuarioAuth } from "../helpers/userAuth";
import { alerta } from "../helpers/alerta";
import { getCategorys, saveTask, updateTask } from "../api/task";

(() => {
  document.addEventListener("DOMContentLoaded", async () => {
    // Y lo primero que queremos hacer es...
    const usuario = await usuarioAuth(); // Llamando a la funcion que se encarga de validar si hay un usuario autenticado
    console.log(usuario); // ver datos del usuario en consola

    // extraer el userName
    const { userName } = usuario;
    const data = await getCategorys(userName); // Obtenemos una respuesta del servidor
    const { listas } = data; // Aqui extraemos las listas

    // Personalizar saludo de header
    const header = document.querySelector("#userNameHeader");
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

    // Leer los parámetros de la consulta de la URL
    const params = new URLSearchParams(window.location.search);

    // Obtener los valores de los parámetros
    const _id = params.get("_id");
    const titulo = params.get("titulo");
    const descripcion = params.get("descripcion");
    const estado = params.get("estado");
    const fechaInicio = params.get("fechaInicio");
    const fechaVencimiento = params.get("fechaVencimiento");
    const listaPerteneciente = params.get("lista");
    const prioridad = params.get("prioridad");
    const recordatorio = params.get("recordatorio");

    console.log(_id);
    console.log(titulo);
    console.log(descripcion);
    console.log(estado);
    console.log(prioridad);
    console.log(fechaInicio);
    console.log(fechaVencimiento);
    console.log(listaPerteneciente);
    console.log(recordatorio);

    // formatear las fechas
    const fechaInicioFormateada = formatDateEdit(fechaInicio);
    const fechaFinFormateada = formatDateEdit(fechaVencimiento);

    // insertar datos en el html
    document.querySelector("#nombre").value = titulo;
    document.querySelector("#descripcion").value = descripcion;
    document.querySelector("#prioridad").value = prioridad;
    document.querySelector("#recordatorio").checked = recordatorio === "true"; // Convertir a booleano
    document.querySelector("#categoria").value = listaPerteneciente;
    document.querySelector("#estado").value = estado;
    document.querySelector("#start-date").value = fechaInicioFormateada;
    document.querySelector("#end-date").value = fechaFinFormateada;
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
      const estadoActualizado = document.querySelector("#estado").value;
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
      const tarea = {
        titulo,
        descripcion,
        prioridad,
        fechaInicio,
        fechaVencimiento,
        listaPerteneciente,
        recordatorio,
        usuario: usuario._id,
        estado: estadoActualizado,
      };

      console.log(tarea);

      // Enviamos la tarea al servidor
      const { data } = await updateTask(_id, tarea);
      // Mostrar alerta
      alerta("Se ha guardado la tarea", "succes", alertaDiv);
      console.log(data);
       setTimeout(() => {
           window.location.href = '../pages/index.html';
       }, 3000);
    });
  });
})();
