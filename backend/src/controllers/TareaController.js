const Tarea = require('../models/Tarea');

class TareaController {
    static async crearTarea(req, res, next) {
        try {
            const {titulo, descripcion, fechaInicio, 
                fechaVencimiento, estado, prioridad, listaPerteneciente, recordatorio} = req.body;
                if (titulo) {

                }
        } catch(error){

        }
    }
}