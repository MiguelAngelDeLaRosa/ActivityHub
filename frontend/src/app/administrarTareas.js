import { usuarioAuth } from "../helpers/userAuth";

(() => {


    // Dice, que cuando el documento(el HTML) sea cargado por completo, procedera a hacer lo que este dentro de este callback...
    document.addEventListener('DOMContentLoaded', async () => {
        // Y lo primero que queremos hacer es...
        const usuario = await usuarioAuth(); // Llamando a la funcion que se encarga de validar...
        console.log(usuario)
    });


    const formulario = document.querySelector('#form');

    formulario.addEventListener('submit', (e) => {

        e.preventDefault();
        
        // Obtener todos los valores del formulario
        const titulo = document.querySelector('#nombre').value;
        const descripcion = document.querySelector('#descripcion').value;
        const prioridad = document.querySelector('#prioridad').value;
        const fechaInicio = document.querySelector('#start-date').value;
        const fechaVencimiento = document.querySelector('#end-date').value;
        const listaPerteneciente = document.querySelector('#categoria').value;
        const recordatorio = document.querySelector('#recordatorio').value;

        // Ver valores en consola
        console.log(titulo);
        console.log(descripcion);
        console.log(prioridad);
        console.log(fechaInicio);
        console.log(fechaVencimiento);
        console.log(listaPerteneciente);
        console.log(recordatorio);



    });


    

})();