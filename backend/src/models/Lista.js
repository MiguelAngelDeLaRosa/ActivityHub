import mongoose from 'mongoose';

const listaSchema = mongoose.Schema({
    nombreLista: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    tareas: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model("Lista", listaSchema);