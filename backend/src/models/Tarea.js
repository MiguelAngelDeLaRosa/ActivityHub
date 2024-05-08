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
        required: false,
        trim: true,
        default: null,
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
        required: false,
        default: null,
    },
    recordatorio: {
        type: Boolean,
        ref: "Recordatorio",
        required: false,
        default: null,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    }
});

tareaSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transfom: function( doc, ret, options ){
        delete ret._id;
    }
});

const Tarea = mongoose.model('Tarea', tareaSchema);

export default Tarea;