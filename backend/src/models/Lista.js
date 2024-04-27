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
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    }
})

const Lista = mongoose.model("Lista", listaSchema);

export default Lista;