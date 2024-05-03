
import TareaDAO from '../dataAcces/TareaDAO.js';

/**
 * Controlador para la gestión de tareas.
 */
class TareaController {

    /**
     * Crea una nueva tarea con la información proporcionada.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Object} - Objeto JSON con la tarea creada.
     */
    static async crearTarea(req, res) {
        try {

            // Hubo problemas con crear tareas, la validacion deberia venir de front pero para las pruebas y ver si funcionaban, comentando la validacion funciona perfectamente
             const {titulo, descripcion, fechaInicio, fechaVencimiento, estado, prioridad, listaPerteneciente, recordatorio} = req.body;
                 // if (!titulo || !descripcion || !fechaInicio || !fechaVencimiento || !estado 
                 //     || !prioridad || !listaPerteneciente || !recordatorio) {
                 //     return error = new Error('Faltan campos por llenar')
                 // }
                 if (!titulo || !descripcion || !fechaVencimiento || !estado 
                     || !prioridad ) {
                        const error = new Error('Faltan campos por llenar');
                        console.log(error)
                     return res.status(404).json({msg: error.message}); 
                 }
                const tareaData = req.body;
                const tarea = await TareaDAO.crearTarea(tareaData);
                return res.status(200).json(tarea);
        } catch(error){
            return error = new Error('Error al crear tarea');
        }
    }

    /**
     * Actualiza una tarea existente con la información proporcionada.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Object} - Objeto JSON con la tarea actualizada.
     */
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

    /**
     * Elimina una tarea existente según su ID.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Object} - Objeto JSON con la tarea eliminada.
     */
    static async eliminarTarea(req, res){
        try {
            const id = req.params.id;

            const tarea = await TareaDAO.eliminarTarea(id);
            console.log(tarea);

            if(!tarea){
                const error = new Error('No se encontro la tarea a eliminar');
                return res.status(403).json({msg: error.message});
            }

            return res.status(200).json(tarea)
        } catch (error) {
            return error = new Error('Error al eliminar tarea');
        }
    }

    /**
     * Obtiene una tarea por su ID.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Object} - Objeto JSON con la tarea obtenida.
     */
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

    /**
     * Obtiene todas las tareas asociadas a un usuario.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Object} - Objeto JSON con las tareas obtenidas.
     */
    static async obtenerTareas(req, res) {
        const userName = req.params.userName;
        try {
            const tareas = await TareaDAO.obtenerTareas(userName);

            return res.status(200).json({message: "Tareas obtenidas con exito", tareas});
        } catch (error) {
            return error = new Error('Error al consultar las tareas');
        }
    }
}

export default TareaController;