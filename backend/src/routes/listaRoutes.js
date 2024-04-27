import express from 'express'
import ListaController from '../controllers/ListaController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// router.post('/', ListaController.crearLista);
// router.put('/:id', ListaController.actualizarLista);
// router.delete('/:id', ListaController.eliminarLista);
// router.get('/:id', ListaController.obtenerListaPorId);
// router.get('/', ListaController.obtenerListas)
// router.put('/agregar/:id', ListaController.agregarTarea);
// router.put('/remover/:id', ListaController.removerTarea);

router.post('/', checkAuth, ListaController.crearLista);
router.put('/:id', checkAuth, ListaController.actualizarLista);
router.delete('/:id', checkAuth, ListaController.eliminarLista);
router.get('/:id', checkAuth, ListaController.obtenerListaPorId);
router.get('/', checkAuth, ListaController.obtenerListas)
// router.put('/agregar/:id', ListaController.agregarTarea);
// router.put('/remover/:id', ListaController.removerTarea);

export default router