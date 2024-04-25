// const ListaDAO = require('../dataAcces/listaDAO');
// const TareaDAO = require('../dataAcces/TareaDAO');

import ListaDAO from '../dataAcces/listaDAO.js';
import TareaDAO from '../dataAcces/TareaDAO.js';

class ListaController {
    static async crearLista(req, res){
        try {
            const {nombreLista, descripcion, tareas} = req.body;

            if (!nombreLista || !descripcion) {
                return new Error('Faltan campos por llenar')
            }
            if (!Array.isArray(tareas)){
                return new Error('Falta la lista para almacenar las tareas');
            }
            const listaData = {nombreLista, descripcion, tareas};
            const lista = await ListaDAO.crearLista(listaData);

            return res.status(200).json(lista);
        } catch (error) {
            return new Error('Error al crear una lista');
        }
    }

    static async actualizarLista(req, res){
        try {
            const id = req.params.id;
            const tareaData = req.body;

            const lista = await ListaDAO.actualizarLista(id, tareaData);

            if (!lista){
                return new Error('No se encontro la lista a actualizar')
            }

            return res.status(201).json(lista);
        } catch (error) {
            return new Error('Error al actualizar la lista')
        }
    }

    static async eliminarLista(req, res){
        try {
            const id = req.params.id;

            const lista = await ListaDAO.eliminarLista(id)

            if (!lista){
                return new Error('No se encontro la lista a eliminar')
            }

            return res.status(200).json(lista);
        } catch (error) {
            return new Error('Error al eliminar la lista')
        }
    }

    static async obtenerListaPorId(req, res){
        try {
            const id = req.params.id;

            const lista = await ListaDAO.obtenerListaPorId(id)

            if(!lista){
                return new Error('No se encontro la lista por id')
            }

            return res.status(200).json({message: "Lista obtenida con exito", lista})
        } catch (error) {
            return new Error('Error al obtener la lista por id')
        }
    }

    static async obtenerListas(req, res){
        try {
            const listas = await ListaDAO.obtenerListas();

            return res.status(200).json({message: "Listas obtenidas con exito", listas})
        } catch (error) {
            return new Error('Error al obtener listas')
        }
    }

    static async agregarTarea(req, res){
        try {
            const id = req.params.id;
            const tareaData = req.body;

            const lista = await ListaDAO.obtenerListaPorId(id);

            if (!lista){
                return new Error('No se encontro la lista para agregar la tarea')
            }
            
            await ListaDAO.agregarTarea(id, tareaData)
            
            return res.status(200).json({message: "Se agrego la tarea"})
        } catch (error) {
            return new Error('Error al agregar tarea a la lista')
        }
    }

    static async removerTarea(req, res){
        try {
            const id = req.params.id;
            const idTarea = req.body;

            const lista = await ListaDAO.obtenerListaPorId(id);
            const tareaResult = await TareaDAO.obtenerTareaPorId(idTarea);

            if (!lista){
                return new Error('No se encontro la lista para agregar la tarea')
            }
            if (!tareaResult){
                return new Error('La tarea a agregar no existe')
            }

            await ListaDAO.removerTarea(id, idTarea)

            return res.status(200).json({message: "Se removio la tarea"})
        } catch (error) {
            return new Error('Error al remover tarea de la lista')
        }
    }
}

export default ListaController;