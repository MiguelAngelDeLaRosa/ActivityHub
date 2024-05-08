import axios from "axios";
import clienteAxios from "../helpers/clienteAxios";

export const getCategorys = async (userName) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    // Configuracion necesario para solicitar al servidor
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    // Obtener de la api
    const {data} = await clienteAxios(`/listas/${userName}`, config); //Extraemos unicamente la data que recibiremos por parte del server
    return data;
  } catch (error) {
    console.log(error);
  }
};


export const saveList = async (lista) => {
    try {
        const token = localStorage.getItem("token");
    if (!token) return;
    // Configuracion necesario para solicitar al servidor
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await clienteAxios.post('/listas', lista, config);
    console.log(data)
    return data;
    } catch (error) {
        console.log(error);
    }
}

export const getList = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    // Configuracion necesario para solicitar al servidor
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const {data} = await clienteAxios(`/listas/${id}`, config);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const deleteList = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    // Configuracion necesario para solicitar al servidor
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const {data} = await clienteAxios.delete(`/listas/${id}`, config);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const updateList = async (id, listaActualizada) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    // Configuracion necesario para solicitar al servidor
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(config);

    const {data} = await clienteAxios.put(`/listas/${id}`, listaActualizada, config);
    return data;
  } catch (error) {
    console.log(error);
  }
}