import express from 'express'

import TareaController from '../controllers/TareaController.js';

const router = express.Router();

router.post('/', TareaController.crearTarea);
router.put('/:id', TareaController.actualizarTarea);
router.delete('/:id', TareaController.eliminarTarea);
router.get('/:id', TareaController.obtenerTareaPorId);
router.get('/', TareaController.obtenerTareas);

export default router;