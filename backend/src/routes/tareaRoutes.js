import express from 'express'
const TareaController = require('../controllers/TareaController');

const router = express.Router();

router.post('/', TareaController.crearTarea);
router.put('/:id', TareaController.actualizarTarea);
router.delete('/:id', TareaController.eliminarTarea);
router.get('/:id', TareaController.obtenerTareaPorId);
router.get('/', TareaController.obtenerTareas);

module.exports = router;