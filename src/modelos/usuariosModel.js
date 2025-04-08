// Al principio del archivo
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  estado: { type: String, required: true },
  codigo: { type: String, required: true },
});

const Mymodel = mongoose.model("usuarios", usuariosSchema);

export const usuariosModel = {
  Registrar(post, callback) {
    const instancia = new Mymodel({
      nombre: post.nombre,
      email: post.email,
      password: post.password,
      estado: "Inactivo",
      codigo: post.codigo,
    });

    instancia
      .save()
      .then(() => callback({ state: true }))
      .catch((error) => callback({ state: false, error: error.message }));
  },

  ListarTodos(filtro, callback) {
    Mymodel.find(filtro || {})
      .then((usuarios) => callback(null, usuarios))
      .catch((error) => callback({ state: false, error: error.message }));
  },

  ListarUnico(post, callback) {
    Mymodel.findOne({ email: post.email }, { nombre: 1, email: 1, estado: 1 })
      .then((usuario) => callback(null, usuario))
      .catch((error) => callback({ state: false, error: error.message }));
  },

  Existe(post, callback) {
    Mymodel.findOne({ email: post.email })
      .then((usuario) => callback(null, usuario ? true : false))
      .catch((error) => callback({ state: false, error: error.message }));
  },

  Actualizar(post, callback) {
    Mymodel.findOneAndUpdate(
      { email: post.email },
      { nombre: post.nombre, estado: post.estado },
      { new: true }
    )
      .then((usuario) => callback(null, { state: true, usuario }))
      .catch((error) => callback({ state: false, error: error.message }));
  },

  Borrar(post, callback) {
    Mymodel.findOneAndDelete({ email: post.email })
      .then((usuario) => {
        if (usuario) {
          callback(null, { state: true });
        } else {
          callback({ state: false, mensaje: "Usuario no encontrado" });
        }
      })
      .catch((error) => callback({ state: false, error: error.message }));
  },

  Login(post, callback) {
    Mymodel.findOne({ email: post.email, password: post.password })
      .then((usuario) => {
        if (usuario) {
          callback(null, usuario);
        } else {
          callback({ state: false, mensaje: "Credenciales incorrectas" });
        }
      })
      .catch((error) => callback({ state: false, error: error.message }));
  },

  Activar(post, callback) {
    Mymodel.findOneAndUpdate(
      { email: post.email, codigo: post.codigo },
      { estado: "Activo" },
      { new: true }
    )
      .then((usuario) => {
        if (usuario) {
          callback(null, {
            state: true,
            mensaje: "Cuenta activada correctamente",
          });
        } else {
          callback({
            state: false,
            mensaje: "Código de activación incorrecto o vencido",
          });
        }
      })
      .catch((error) => {
        console.error("Error al activar usuario:", error);
        callback({ state: false, error: error.message });
      });
  }
};
