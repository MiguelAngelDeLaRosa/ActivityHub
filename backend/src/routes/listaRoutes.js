import express from 'express'
const ListaController = require('../controllers/ListaController');

const router = express.Router();

router.post('/', ListaController.crearLista);
router.put('/:id', ListaController.actualizarLista);
router.delete('/:id', ListaController.eliminarLista);
router.get('/:id', ListaController.obtenerListaPorId);
router.get('/', ListaController.obtenerListas)
router.put('/agregar/:id', ListaController.agregarTarea);
router.put('/remover/:id', ListaController.removerTarea);

module.exports = router