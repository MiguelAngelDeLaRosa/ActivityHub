import Tarea from '../models/Tarea.js';
import Usuario from '../models/usuario.js';

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
            return await Tarea.findByIdAndDelete(id); // es ByIdAndDelete, no remove
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

    static async obtenerTareas(userName){
        try {

            // Primero obtenemos los datos del usuario
            const usuario = await Usuario.findOne({userName});
            //console.log(usuario);

            if(!usuario) return {msg: 'No existe el usuario'};
            // Consultamos las tareas que coincidan con el usuario
            try {
            const tareas = await Tarea.find({usuario: usuario._id}).populate('usuario').populate('listaPerteneciente')
            console.log(tareas);
            return tareas;
            } catch (error) {
                console.log(error);
                return error;
            }
        } catch (error) {
            throw error;
        }
    }
}

export default TareaDAO 