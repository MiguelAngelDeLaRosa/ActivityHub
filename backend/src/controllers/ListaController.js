/*
Controlador para la gestion de listas y tareas.
*/

// const ListaDAO = require('../dataAcces/listaDAO');
// const TareaDAO = require('../dataAcces/TareaDAO');

import ListaDAO from '../dataAcces/listaDAO.js';
import TareaDAO from '../dataAcces/TareaDAO.js';

class ListaController {
    /**
     * Crea una nueva lista con la información proporcionada.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Object} - Objeto JSON con la lista creada.
     */
    static async crearLista(req, res){
        try {
            const {nombreLista, descripcion, tareas, usuario} = req.body;

            if (!nombreLista || !descripcion) {
                return new Error('Faltan campos por llenar')
            }
            if (!Array.isArray(tareas)){
                return new Error('Falta la lista para almacenar las tareas');
            }
            const listaData = {nombreLista, descripcion, tareas, usuario};
            const lista = await ListaDAO.crearLista(listaData);

            return res.status(200).json(lista);
        } catch (error) {
            return new Error('Error al crear una lista');
        }
    }

    /**
     * Actualiza una lista existente con la información proporcionada.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Object} - Objeto JSON con la lista actualizada.
     */
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

    /**
     * Elimina una lista existente según su ID.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Object} - Objeto JSON con la lista eliminada.
     */
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

    /**
     * Obtiene una lista por su ID.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Object} - Objeto JSON con la lista obtenida.
     */
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

    /**
     * Obtiene todas las listas asociadas a un usuario.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Object} - Objeto JSON con las listas obtenidas.
     */
    static async obtenerListas(req, res){
        try {
            const userName = req.params.userName;
            const listas = await ListaDAO.obtenerListas(userName);
            console.log(userName);

            return res.status(200).json({message: "Listas obtenidas con exito", listas})
        } catch (error) {
            return new Error('Error al obtener listas')
        }
    }

    /**
     * Agrega una tarea a una lista existente.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Object} - Objeto JSON con un mensaje de éxito.
     */
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

    /**
     * Remueve una tarea de una lista existente.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Object} - Objeto JSON con un mensaje de éxito.
     */
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