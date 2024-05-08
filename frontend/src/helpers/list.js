import { deleteList } from "../api/listas";
import { alerta } from "./alerta";

export const printLists = (lists, container, selectorAlerta) => {
    // Crear contenedor para las tarjetas de lista
    const listsContainer = document.createElement("div");
    listsContainer.classList.add(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "gap-4"
    );
  
    // Iterar sobre cada lista y crear una tarjeta para cada una
    lists.forEach((lista) => {
      const listaCard = document.createElement("div");
      listaCard.classList.add("bg-white", "shadow-md", "rounded-md", "p-4");
  
      // Título de la lista
      const title = document.createElement("div");
      title.classList.add("text-2xl", "text-indigo-600", "font-semibold");
      title.textContent = lista.nombreLista;
      listaCard.appendChild(title);
  
      // Descripción de la lista
      const description = document.createElement("div");
      description.classList.add("font-bold", "text-gray-600");
      description.textContent = "Descripción:";
      listaCard.appendChild(description);
  
      const descriptionText = document.createElement("div");
      descriptionText.classList.add("text-gray-800");
      descriptionText.textContent = lista.descripcion || "Sin descripción";
      listaCard.appendChild(descriptionText);
  
      // Contenedor para botones
      const buttonsContainer = document.createElement("div");
      buttonsContainer.classList.add(
        "flex",
        "justify-between",
        "mt-4"
      );
  
      // Botón Editar
      const editButton = document.createElement("button");
      editButton.textContent = "Editar";
      editButton.classList.add(
        "bg-blue-500",
        "hover:bg-blue-700",
        "text-white",
        "font-bold",
        "py-2",
        "px-4",
        "rounded"
      );
      editButton.addEventListener("click", () => {
        editList(lista);
      });
      buttonsContainer.appendChild(editButton);
  
      // Botón Eliminar
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.classList.add(
        "bg-red-500",
        "hover:bg-red-700",
        "text-white",
        "font-bold",
        "py-2",
        "px-4",
        "rounded"
      );
      deleteButton.addEventListener("click", () => {
        eliminandoLista(lista);
      });
      buttonsContainer.appendChild(deleteButton);
  
      // Agregar contenedor de botones a la tarjeta
      listaCard.appendChild(buttonsContainer);
  
      // Agregar tarjeta de lista al contenedor
      listsContainer.appendChild(listaCard);

      


    });
    // Agregar contenedor de listas al contenedor principal
  container.appendChild(listsContainer);    

  const eliminandoLista = async (lista) => {
    console.log(lista);
    const { nombreLista, _id} = lista;
    const confirmarEliminar = confirm(`¿Desea eliminar la lisa ${nombreLista}`);
    console.log(_id);
    console.log(confirmarEliminar); 
    if( confirmarEliminar ) {
      const listaEliminada = await deleteList(_id);
      console.log(listaEliminada);
      if(listaEliminada._id) {
        alerta(`Lista: ${nombreLista} fue eliminada exitosamente`, 'succes', selectorAlerta);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
    return;
  }

  const editList = (lista) => {
    const { _id, nombreLista, descripcion, } = lista;
      // Construir la URL con los parámetros de consulta
      const queryParams = new URLSearchParams();
      queryParams.set('_id', _id); // Suponiendo que tienes una propiedad 'id' en tu objeto tarea
      queryParams.set('nombreLista', nombreLista); // Otros parámetros que quieras enviar
      queryParams.set('descripcion', descripcion);


  
      // Redirigir al usuario a la página de edición
      window.location.href = `../pages/editarLista.html?${queryParams.toString()}`;  
  }

}