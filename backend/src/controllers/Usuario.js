import Usuario from "../models/usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) => {
    const {email, nombre} = req.body;
    // Verificar si el usuario ya existe
    const usuarioExiste = await Usuario.findOne({email});

    if(usuarioExiste) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }

    try {
        //Registrar el usuario
        const usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save();

        // Enviar el email
        emailRegistro({
            email,
            nombre,
            token: usuarioGuardado.token,
        });

        return res.json(usuarioGuardado);
    } catch (error) {
        console.log(error)
        return res.status(404).json({msg: 'Error en el servidor'});
    }
}

const perfil = (req, res) => {
    const {usuario} = req;
    res.json(usuario);
};

const confirmar = async (req, res) => {
    console.log(req.params.token);

    const { token } = req.params;

    const confirmarUsuario = await Usuario.findOne({token});
    
    if(!confirmarUsuario) {
        const error = new Error("Token no valido");
        return res.status(404).json({msg: error.message});
    }
    try {
        // Cambiando los datos del usuario una vez confirme la cuenta
        confirmarUsuario.token = null;
        confirmarUsuario.confirmado = true;
        await confirmarUsuario.save();

        res.json({msg: 'Cuenta Confirmada'});
    } catch (error) {
        console.log(error);
    }
}

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email });

    if(!usuario) {
        const error = new Error('El Usuario no existe');
        return res.status(404).json({msg: error.message});
    }

    // Comprobar que el usuario a confirmado
    if(!usuario.confirmado) {
        const error = new Error('Tu Cuenta no ha sido confirmada');
        return res.status(403).json({ msg: error.message });
    }
    // Autenticar la constrasena

    if(await usuario.comprobarPassword(password)) {
        // Autenticar
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id),
            foto: usuario.foto,
        });
    } else {
        const error = new Error('La Password es incorrecta');
        return res.status(403).json({ msg: error.message });
    }
};

const olvidePassword = async (req, res) => {
    const { email } = req.body;

  const existeUsuario = await Usuario.findOne({ email });
  if (!existeUsuario) {
    const error = new Error("El Usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    existeUsuario.token = generarId();
    existeUsuario.save();
    // Enviar email con las instrucciones
    emailOlvidePassword({
      email,
      nombre: existeUsuario.nombre,
      token: existeUsuario.token,
    });
    res.json({
      msg: "Hemos enviado un email a su correo con las instrucciones",
    });
  } catch (error) {
    console.log(error);
  }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params;

    const tokenValido = await Usuario.findOne({ token });

    if(tokenValido) {
        res.status(200).json({ msg: 'Token valido y el usuario existe'});
    } else {
        const error = new Error('Token Invalido');
        return res.status(400).json({ msg: error.message });
    }
};

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    // Validar el token y que existe
    const usuario = await Usuario.findOne({ token });

    if(!usuario) {
        const error = new Error('Huvo un error');
        return res.status(400).json({ msg: error.message });
    }

    try {
        usuario.token = null;
        usuario.password = password;
        await usuario.save();
        return res.status(200).json({ msg: 'Password actualizado correctamente' });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ msg: 'Error en el servidor '});
    }
}

const actualizarPerfil = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id);
    if(!usuario) {
        const error = new Error('Hubo un error');
        return res.status(404).json({ msg: error.message });
    }

    const { email } = req.body;
    // Usuario intenta cambiar su email, validacion
    if(usuario.email !== email) {
        const existeEmail = await Usuario.findOne({ email });
        if(existeEmail) {
            const error = new Error('Ese Email ya esta en uso');
            return res.status(400).json({ msg: error.message });
        }
    }

    try {
        const { nombre, email, foto, telefono, preferenciaNoti } = req.body;

        usuario.nombre = nombre;
        usuario.email = email;
        usuario.foto = foto;
        usuario.telefono = telefono;
        usuario.preferenciaNoti = preferenciaNoti;

        const usuarioActualizado = await usuario.save();
        res.json(usuarioActualizado);
        return;
    } catch (error){
        console.log(error);
        return res.status(404).json({ msg: 'Error en el servidor '});
    }
}

const actualizarPassword = async (req, res) => {
    // Leer Datos
    const { id } = req.usuario;
    const { old_pwd, new_pwd } = req.body;

    // Comprobar que el usuario exista;
    const usuario = await Usuario.findById(id);
    if(!usuario) {
        const error = new Error('Hubo un error');
        return res.status(404).json({ msg: error.message });
    }

    // Comprobar su password
    if(await usuario.comprobarPassword(old_pwd)) {
        usuario.password = new_pwd;
        await usuario.save();
        return res.json({ msg: 'Password Almacenado Correctamente '});
    } else {
        const error = new Error('El password actual es incorrecto');
        return res.status(400).json({ msg: error.message });
    }
};

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword,
}