const TareaDAO = require('../dataAcces/TareaDAO');


class TareaController {
    static async crearTarea(req, res) {
        try {
            const {titulo, descripcion, fechaInicio, 
                fechaVencimiento, estado, prioridad, listaPerteneciente, recordatorio} = req.body;
                if (!titulo || !descripcion || !fechaInicio || !fechaVencimiento || !estado 
                    || !prioridad || !listaPerteneciente || !recordatorio) {
                    return error = new Error('Faltan campos por llenar')
                }
                const tareaData = {titulo, descripcion, fechaInicio, 
                    fechaVencimiento, estado, prioridad, listaPerteneciente, recordatorio}
                const tarea = await TareaDAO.crearTarea(tareaData);
                return res.status(200).json(tarea);
        } catch(error){
            return error = new Error('Error al crear tarea');
        }
    }

    static async actualizarTarea(req, res) {
        try {
            const id = req.params.id;
            const tareaData = req.body;

            const tarea = await TareaDAO.actualizarTarea(id, tareaData)

            if(!tarea){
                return error = new Error('No se encontro la tarea a actualizar');
            }

            res.status(201).json(tarea)
        } catch (error) {
            return error = new Error('Error al actualizar tarea');
        }
    }

    static async eliminarTarea(req, res){
        try {
            const id = req.params.id;

            const tarea = await TareaDAO.eliminarTarea(id);

            if(!tarea){
                return error = new Error('No se encontro la tarea a eliminar');
            }

            return res.status(200).json(tarea)
        } catch (error) {
            return error = new Error('Error al eliminar tarea');
        }
    }

    static async obtenerTareaPorId(req, res){
        try {
            const id = req.params.id;

            const tarea = await TareaDAO.obtenerTareaPorId(id);

            if(!tarea){
                return error = new Error('No se encontro la tarea');
            }

            return res.status(200).json({message: "Tarea obtenida con exito", tarea})
        } catch (error) {
            return error = new Error('Error al buscar tarea por id');
        }
    }

    static async obtenerTareas(req, res) {
        try {
            const tareas = await TareaDAO.obtenerTareas();

            return res.status(200).json({message: "Tareas obtenidas con exito", tareas});
        } catch (error) {
            return error = new Error('Error al consultar las tareas');
        }
    }
}

module.exports = TareaController;