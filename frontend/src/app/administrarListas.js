import { usuarioAuth } from "../helpers/userAuth";
import { alerta } from "../helpers/alerta";
import { getCategorys, saveTask } from "../api/task";
import clienteAxios from "../helpers/clienteAxios";
import { saveList } from "../api/listas";
import { printLists } from "../helpers/list";

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
    console.log(listas);

    // Obtener el main
    const divContainer = document.querySelector("#container");
    const selectorAlerta = document.querySelector("#alerta");

    // Imprimir listas
    printLists(listas, divContainer, selectorAlerta);

    // Personalizar saludo de header
    const header = document.querySelector('#userNameHeader');
    header.textContent = `Bienvenido: ${userName}`;

    // Cerrar sesion
    const cerrarSesion = document.querySelector("#singOut");
    cerrarSesion.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "./login.html";
    });

    
    const formulario = document.querySelector("#form");

  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtener todos los valores del formulario
    const nombreLista = document.querySelector("#nombreLista").value;
    const descripcion = document.querySelector("#descripcion").value;
    const alertaDiv = document.querySelector('#alerta');

    if(nombreLista === '' || descripcion === '') {
        console.log('campos vacios');
    }
    console.log(nombreLista, descripcion);

    // Construccion del objeto
    const list = {
        nombreLista,
        descripcion,
        tareas:[],
        usuario: _id
    };

    // Enviar la lista a la API
    const createList = await saveList(list);
    console.log(createList);
    if(createList) {
        if(createList.status === 200) {
            alerta('Lista agregada con exito', 'succes', alertaDiv);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
            return;
        }
    }
    alerta('Error al crear una lista', 'error', alertaDiv);


  });

    
  });

  
})();
