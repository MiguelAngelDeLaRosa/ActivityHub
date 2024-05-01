

import Tarea from '../models/Tarea.js';
import Lista from '../models/Lista.js';
import Usuario from '../models/usuario.js';

class ListaDAO {
    constructor(){}

    static async crearLista(listaData){
        try {
            const lista = new Lista(listaData);
            return await lista.save();
        } catch (error) {
            throw error;
        }
    }

    static async actualizarLista(id, listaData){
        try {
            return await Lista.findByIdAndUpdate(id, listaData, {new: true});
        } catch (error) {
            throw error;
        }
    }

    static async eliminarLista(id){
        try {
            return await Lista.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

    static async obtenerListaPorId(id){
        try {
            return await Lista.findById(id);
        } catch (error) {
            throw error;
        }
    }

    static async obtenerListas(userName){
        try {

            console.log(userName);
            // Primero obtenemos los datos del usuario
            const usuario = await Usuario.findOne({userName});
            console.log(usuario);

            if(!usuario) return {msg: 'No existe el usuario'};

            return await Lista.find({usuario: usuario._id});
        } catch (error) {
            throw error;
        }
    }

    static async agregarTarea(id, tareaData){
        try {
            const lista = await findById(id);
            const tarea = new Tarea(tareaData);
            lista.tareas.push(tarea);
            await this.actualizarLista(id, lista);
        } catch (error) {
            throw error;
        }
    }

    static async removerTarea(id, idTarea){
        try {
            const lista = await findById(id);
            lista.tareas.filter(tarea => tarea.id !== idTarea);
            await this.actualizarLista(id, lista);
        } catch (error) {
            throw error;
        }
    }
}

export default ListaDAO