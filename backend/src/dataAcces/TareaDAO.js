import Tarea from '../models/Tarea.js';

class TareaDAO {
    constructor(){}

    static async crearTarea(tareaData){
        try {
            const tarea = new Tarea(tareaData);
            return await tarea.save();
        } catch(error){
            // throw error
            console.log(error);
            return error
        }
    }

    static async actualizarTarea(id, tareaData) {
        try {
            return await Tarea.findByIdAndUpdate(id, tareaData, {new: true});
        } catch(error){
            throw error
        }
    }

    static async eliminarTarea(id){
        try {
            return await Tarea.findByIdAndRemove(id);
        } catch(error){
            throw error
        }
    }

    static async obtenerTareaPorId(id){
        try {
            return await Tarea.findById(id);
        } catch(error){
            throw error;
        }
    }

    static async obtenerTareas(){
        try {
            return await Tarea.find();
        } catch (error) {
            throw error;
        }
    }
}

export default TareaDAO