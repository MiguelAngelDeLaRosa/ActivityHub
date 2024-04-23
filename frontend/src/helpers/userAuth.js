import clienteAxios from "./clienteAxios";

export const usuarioAuth = () => {
  // Comenzar con la validacion
  const existeUsuario = localStorage.getItem("user");
  if (existeUsuario) {
    console.log("Hay un usuario autenticado");
    const dataUser = JSON.parse(existeUsuario);
    return dataUser;
  } else {
    window.location.href = "../pages/login.html";
  }
};
