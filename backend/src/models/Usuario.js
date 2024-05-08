import mongoose from 'mongoose';
import bycript from 'bcrypt';
import generarId from '../helpers/generarId.js';

const usuarioSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
      },
      nombre: {
        type: String,
        required: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      foto: {
        type: String,
        default: null,
        trim: true,
      },
      telefono: {
        type: Number,
        default: null,
        trim: true,
      },
      token: {
        type: String,
        default: function () {
          return generarId();
        },
      },
      confirmado: {
        type: Boolean,
        default: null,
      },
      preferenciaNoti: {
        type: Boolean,
        default: null,
      }
});

usuarioSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        next();
    }
    const salt = await bycript.genSalt(10);
    this.password = await bycript.hash(this.password, salt);
});

usuarioSchema.methods.comprobarPassword = async function (
    passwordFormulario
) {
    return await bycript.compare(passwordFormulario, this.password); // Compara y retorna true o false
};

usuarioSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transfom: function( doc, ret, options ){
      delete ret._id;
      delete ret.password;
  }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;