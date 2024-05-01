import express from 'express'

import TareaController from '../controllers/TareaController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', checkAuth, TareaController.crearTarea);
router.put('/:id', checkAuth, TareaController.actualizarTarea);
router.delete('/:id', checkAuth, TareaController.eliminarTarea);
router.get('/tarea/:id', checkAuth, TareaController.obtenerTareaPorId);
router.get('/:userName', checkAuth, TareaController.obtenerTareas);

export default router;