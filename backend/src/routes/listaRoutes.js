import express from 'express'
import ListaController from '../controllers/ListaController.js';

const router = express.Router();

router.post('/', ListaController.crearLista);
router.put('/:id', ListaController.actualizarLista);
router.delete('/:id', ListaController.eliminarLista);
router.get('/:id', ListaController.obtenerListaPorId);
router.get('/', ListaController.obtenerListas)
router.put('/agregar/:id', ListaController.agregarTarea);
router.put('/remover/:id', ListaController.removerTarea);

export default router