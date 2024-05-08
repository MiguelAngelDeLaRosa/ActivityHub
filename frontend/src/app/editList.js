import { usuarioAuth } from "../helpers/userAuth";
import { alerta } from "../helpers/alerta";
import { getCategorys, saveTask } from "../api/task";
import clienteAxios from "../helpers/clienteAxios";
import { saveList, updateList } from "../api/listas";
import { printLists } from "../helpers/list";

(() => {
    document.addEventListener('DOMContentLoaded', async () => {
        // Y lo primero que queremos hacer es...
    const usuario = await usuarioAuth(); // Llamando a la funcion que se encarga de validar si hay un usuario autenticado
    console.log(usuario); // ver datos del usuario en consola

    // extraer el userName
    const { userName } = usuario;
    

    // Obtener el main
    const divContainer = document.querySelector("#container");
    const selectorAlerta = document.querySelector("#alerta");

    // Imprimir listas
    //printLists(listas, divContainer, selectorAlerta);

    // Personalizar saludo de header
    const header = document.querySelector('#userNameHeader');
    header.textContent = `Bienvenido: ${userName}`;

    // Cerrar sesion
    const cerrarSesion = document.querySelector("#singOut");
    cerrarSesion.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "./login.html";
    });


    // Llenar el form y obtener info de la url
    // Leer los parámetros de la consulta de la URL
    const params = new URLSearchParams(window.location.search);

    // Obtener los valores de los parámetros
    const _id = params.get("_id");
    const nombreLista = params.get("nombreLista");
    const descripcion = params.get("descripcion");


    console.log(_id);
    console.log(nombreLista);
    console.log(descripcion);
    


    // insertar datos en el html
    document.querySelector("#nombreLista").value = nombreLista;
    document.querySelector("#descripcion").value = descripcion;
    
    const formulario = document.querySelector("#form");
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Hola Mundo');

        // Leer los datos del formulario
        const nombreLista = document.querySelector('#nombreLista').value;
        const descripcion = document.querySelector('#descripcion').value;
        console.log(nombreLista, descripcion);

        // Enviar los datos a la api
        const listaActualizada = await updateList(_id, {nombreLista, descripcion});
        console.log(listaActualizada);
        alerta('Lista actualizada con exito', 'succes', selectorAlerta);
        setTimeout(() => {
            window.location.href = '../pages/crearLista.html';
        }, 2000);
    })

    })
})()