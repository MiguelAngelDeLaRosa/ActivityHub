const {Lista} = require('../models/Lista');
const Tarea = require('../models/Tarea');

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
            return await Lista.findByIdAndRemove(id);
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

    static async obtenerListas(){
        try {
            return await Lista.find();
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

module.exports = ListaDAO