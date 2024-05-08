export const printTasks = (tareas) => {

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
      fechaInicioTexto.textContent = tarea.fechaInicio;
      tarjeta.appendChild(fechaInicioTexto);

      // Fecha de vencimiento
      const fechaVencimiento = document.createElement("div");
      fechaVencimiento.classList.add("font-semibold", "text-gray-600");
      fechaVencimiento.textContent = "Fecha de vencimiento:";
      tarjeta.appendChild(fechaVencimiento);
      const fechaVencimientoTexto = document.createElement("div");
      fechaVencimientoTexto.classList.add("text-gray-800");
      fechaVencimientoTexto.textContent = tarea.fechaVencimiento;
      tarjeta.appendChild(fechaVencimientoTexto);

      // Estado
      const estado = document.createElement("div");
      estado.classList.add("font-semibold", "text-gray-600");
      estado.textContent = "Estado:";
      tarjeta.appendChild(estado);
      const estadoTexto = document.createElement("div");
      estadoTexto.classList.add("text-gray-800");
      estadoTexto.textContent = tarea.estado;
      tarjeta.appendChild(estadoTexto);

      // Prioridad
      const prioridad = document.createElement("div");
      prioridad.classList.add("font-semibold", "text-gray-600");
      prioridad.textContent = "Prioridad:";
      tarjeta.appendChild(prioridad);
      const prioridadTexto = document.createElement("div");
      prioridadTexto.classList.add("text-gray-800");
      prioridadTexto.textContent = tarea.prioridad;
      tarjeta.appendChild(prioridadTexto);

      tarjetasContainer.appendChild(tarjeta);

      // Editar
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
        "mr-2"
      );
      editarBtn.addEventListener("click", () => {
        // Aquí puedes agregar la lógica para editar la tarea
      });
      tarjeta.appendChild(editarBtn);

      // Eliminar
      const eliminarBtn = document.createElement("button");
      eliminarBtn.textContent = "Eliminar";
      eliminarBtn.classList.add(
        "bg-red-500",
        "hover:bg-red-700",
        "text-white",
        "font-bold",
        "py-2",
        "px-4",
        "rounded"
      );
      eliminarBtn.addEventListener("click", () => {
        // Aquí puedes agregar la lógica para eliminar la tarea
      });
      tarjeta.appendChild(eliminarBtn);
    });

    // Agregar las tarjetas al documento
    document.body.appendChild(tarjetasContainer);
};