(() => {
const handleSubmit = async (e) => {
    e.preventDefault();
    // Obtener datos del formulario
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;


    console.log(email);
    console.log(password);
}


const formulario = document.querySelector('#form');
formulario.addEventListener('submit', handleSubmit);


})();