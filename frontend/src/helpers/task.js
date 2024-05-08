import { deleteTask, updateTask } from "../api/task";
import { alerta } from "./alerta";
import { formatDate } from "./dateFormat";

export const printTasks = (tareas, container, selectorAlerta) => {
  // Crear tarjetas para cada tarea
  const tarjetasContainer = document.createElement("div");
  tarjetasContainer.classList.add(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "gap-4"
  );

  tareas.forEach(async (tarea) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("bg-white", "shadow-md", "rounded-md", "p-4");

    // Lista
    const lista = document.createElement("div");
    lista.classList.add("text-2xl", "text-indigo-600", "font-semibold");
    // Cambiaremos los id de listas por  titulos
    console.log();
    lista.textContent = `Lista: ${tarea.listaPerteneciente.nombreLista}`;
    tarjeta.appendChild(lista);

    // Título
    const titulo = document.createElement("div");
    titulo.classList.add("font-bold", "text-gray-600");
    titulo.textContent = "Título:";
    tarjeta.appendChild(titulo);
    const tituloTexto = document.createElement("div");
    tituloTexto.classList.add("text-gray-800");
    tituloTexto.textContent = tarea.titulo;
    tarjeta.appendChild(tituloTexto);

    // Descripción
    const descripcion = document.createElement("div");
    descripcion.classList.add("font-semibold", "text-gray-600");
    descripcion.textContent = "Descripción:";
    tarjeta.appendChild(descripcion);
    const descripcionTexto = document.createElement("div");
    descripcionTexto.classList.add("text-gray-800");
    descripcionTexto.textContent = tarea.descripcion;
    tarjeta.appendChild(descripcionTexto);

    // Fecha de inicio
    const fechaInicio = document.createElement("div");
    fechaInicio.classList.add("font-semibold", "text-gray-600");
    fechaInicio.textContent = "Fecha de inicio:";
    tarjeta.appendChild(fechaInicio);
    const fechaInicioTexto = document.createElement("div");
    fechaInicioTexto.classList.add("text-gray-800");
    // Formatear fecha
    const fechaFormateada = formatDate(tarea.fechaInicio);
    fechaInicioTexto.textContent = fechaFormateada;
    tarjeta.appendChild(fechaInicioTexto);

    // Fecha de vencimiento
    const fechaVencimiento = document.createElement("div");
    fechaVencimiento.classList.add("font-semibold", "text-gray-600");
    fechaVencimiento.textContent = "Fecha de vencimiento:";
    tarjeta.appendChild(fechaVencimiento);
    const fechaVencimientoTexto = document.createElement("div");
    fechaVencimientoTexto.classList.add("text-gray-800");
    const fechaVencimientoFormateada = formatDate(tarea.fechaVencimiento);
    fechaVencimientoTexto.textContent = fechaVencimientoFormateada;
    tarjeta.appendChild(fechaVencimientoTexto);

    // Estado
    const estado = document.createElement("div");
    estado.classList.add("font-semibold", "text-gray-600");
    estado.textContent = "Estado:";
    tarjeta.appendChild(estado);
    const estadoTexto = document.createElement("div");
    estadoTexto.classList.add("text-gray-800", "font-bold");
    estadoTexto.textContent = tarea.estado;
    tarjeta.appendChild(estadoTexto);

    // Prioridad
    const prioridad = document.createElement("div");
    prioridad.classList.add("font-semibold", "text-gray-600");
    prioridad.textContent = "Prioridad:";
    tarjeta.appendChild(prioridad);
    const prioridadTexto = document.createElement("div");
    const priorityChanged = changePriority(tarea.prioridad);
    prioridadTexto.textContent = priorityChanged;

    // Validar color
    if (prioridadTexto.textContent === "Baja")
      prioridadTexto.classList.add("text-green-600", "font-bold");
    if (prioridadTexto.textContent === "Media")
      prioridadTexto.classList.add("text-yellow-600", "font-bold");
    prioridadTexto.classList.add("text-red-800", "font-bold");

    tarjeta.appendChild(prioridadTexto);

    tarjetasContainer.appendChild(tarjeta);

    // Contenedor para botones
    const botonesContainer = document.createElement("div");
    botonesContainer.classList.add(
      "flex",
      "flex-wrap",
      "justify-between",
      "mt-4"
    );

    // Botón Editar
    const editarBtn = document.createElement("button");
    editarBtn.textContent = "Editar";
    editarBtn.classList.add(
      "bg-blue-500",
      "hover:bg-blue-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded",
      "mb-2", // Agrega un margen inferior para separarlo del botón "Completada" en dispositivos móviles
      "md:mb-0" // No agrega margen inferior en dispositivos más grandes
    );
    editarBtn.addEventListener("click", () => {
      editarTarea(tarea)
    });
    botonesContainer.appendChild(editarBtn);

    // Botón Eliminar
    const eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.classList.add(
      "bg-red-500",
      "hover:bg-red-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded",
      "mb-2", // Agrega un margen inferior para separarlo del botón "Completada" en dispositivos móviles
      "md:mb-0" // No agrega margen inferior en dispositivos más grandes
    );
    eliminarBtn.addEventListener("click", () => {
      eliminarTarea(tarea);
    });
    botonesContainer.appendChild(eliminarBtn);

    // Botón Completada
    const completadaBtn = document.createElement("button");
    completadaBtn.textContent = "Completar";
    completadaBtn.classList.add(
      "bg-green-500",
      "hover:bg-green-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded",
      "w-full", // Establece ancho completo en dispositivos móviles
      "md:w-auto" // Establece ancho automático en dispositivos más grandes
    );
    completadaBtn.addEventListener("click", () => {
      completarTarea(tarea);
    });
    botonesContainer.appendChild(completadaBtn);

    // Agregar contenedor de botones a la tarjeta
    tarjeta.appendChild(botonesContainer);
  });

  // Agregar las tarjetas al documento
  container.appendChild(tarjetasContainer);

  const eliminarTarea = async (tarea) => {
    const { titulo, _id } = tarea;
    const confirmarEliminar = confirm(`¿Desea eliminar la tarea: ${titulo}`);
    console.log(confirmarEliminar);
    if (confirmarEliminar) {
      const eliminarTarea = await deleteTask(_id);
      console.log(eliminarTarea);
      alerta(`Tarea: ${titulo} eliminada`, "succes", selectorAlerta);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  // creacion de funciones para las tarjetas...
  const completarTarea = async (tarea) => {
    const { titulo, _id } = tarea;
    const confirmarCompletar = confirm(
      `¿Desea completar la tarea de: ${titulo}`
    );
    if (confirmarCompletar) {
      const tareaActualizada = await updateTask(_id, { estado: "completado" });
      console.log(tareaActualizada);
      alerta(`Tarea: ${titulo} actualizada`, "succes", selectorAlerta);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    return;
  };

  const editarTarea = (tarea) => {
    const { _id, titulo, descripcion, estado, fechaInicio, fechaVencimiento, listaPerteneciente, prioridad, recordatorio} = tarea;
      // Construir la URL con los parámetros de consulta
      const queryParams = new URLSearchParams();
      queryParams.set('_id', _id); // Suponiendo que tienes una propiedad 'id' en tu objeto tarea
      queryParams.set('titulo', titulo); // Otros parámetros que quieras enviar
      queryParams.set('descripcion', descripcion);
      queryParams.set('estado', estado);
      queryParams.set('fechaInicio', fechaInicio);
      queryParams.set('fechaVencimiento', fechaVencimiento);
      queryParams.set('lista', listaPerteneciente._id);
      queryParams.set('prioridad', prioridad);
      queryParams.set('recordatorio', recordatorio);


  
      console.log(listaPerteneciente);
      // Redirigir al usuario a la página de edición
      window.location.href = `../pages/editarTarea.html?${queryParams.toString()}`;  
  }
};

const changePriority = (priority) => {
  if (priority <= 4) return "Baja";
  if (priority >= 5 && priority <= 7) return "Media";
  if (priority >= 8) return "Alta";
};
