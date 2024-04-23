import { usuarioAuth } from "../helpers/userAuth";

(() => {


    // Dice, que cuando el documento(el HTML) sea cargado por completo, procedera a hacer lo que este dentro de este callback...
    document.addEventListener('DOMContentLoaded', async () => {
        // Y lo primero que queremos hacer es...
        const usuario = await usuarioAuth(); // Llamando a la funcion que se encarga de validar...
        console.log(usuario)
    })
    

})();