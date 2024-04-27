import mongoose from 'mongoose';

const tareaSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    fechaInicio: {
        type: Date,
        required: true,
        trim: true,
        default: Date.now(),
    },
    fechaVencimiento: {
        type: Date,
        required: true,
        trim: true
    },
    estado: {
        type: String,
        required: true,
        trim: true
    },
    prioridad: {
        type: Number,
        required: true,
        trim: true
    },
    listaPerteneciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lista",
        required: true,
        default: null
    },
    recordatorio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recordatorio",
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    }
})

const Tarea = mongoose.model('Tarea', tareaSchema);

export default Tarea;