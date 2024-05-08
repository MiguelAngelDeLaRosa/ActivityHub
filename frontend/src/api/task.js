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


export const saveTask = async (task) => {
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

    const data = await clienteAxios.post('/tareas', task, config);
    console.log(data)
    return data;
    } catch (error) {
        console.log(error);
    }
}


export const updateTask = async(id,task) => {
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

    const data = await clienteAxios.put(`/tareas/${id}`, task, config);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const deleteTask = async (id) => {
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

    const {data} = await clienteAxios.delete(`/tareas/${id}`, config);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export const getTasks =  async (userName) => {
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

    // Obtener data de la api
    const { data } = await clienteAxios(`/tareas/${userName}`, config);
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
}
