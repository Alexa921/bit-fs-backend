import nodemailer from "nodemailer";
import { usuariosModel } from "../modelos/usuariosModel.js";
import crypto from "crypto-js";
import { config } from "../config.js";


const usuariosController = {};


usuariosController.Registrar = function (request, response) {
  console.log("📥 Llamada a usuariosController.Registrar con:", request.body);
  const post = {
    nombre: request.body.nombre,
    email: request.body.email,
    password: request.body.password,
  };

  // Validaciones
  if (!post.nombre) {
    return response.json({ state: false, mensaje: "El nombre es requerido" });
  }

  if (!post.email) {
    return response.json({ state: false, mensaje: "El email es requerido" });
  }

  if (!post.password) {
    return response.json({ state: false, mensaje: "El password es requerido" });
  }

  // Hash y datos adicionales
  post.password = crypto.SHA256(post.password + config.secret).toString();
  post.estado = "Inactive";
  post.codigo = "G-" + Math.floor(Math.random() * (99999 - 10000) + 10000);

  // Verificar si el usuario ya existe
  usuariosModel.Existe(post, function (existe) {
    if (existe.length > 0) {
      return response.json({ state: false, mensaje: "El usuario ya existe" });
    }

    usuariosModel.Registrar(post, function (data) {
      if (data.state) {
        // Configuración y envío de correo de activación
        const transporter = nodemailer.createTransport({
          host: config.email.host,
          port: config.email.port,
          secure: false,
          requireTLS: true,
          auth: {
            user: config.email.user,
            pass: config.email.pass,
          },
        });

        const mailOptions = {
          from: config.email.user,
          to: post.email,
          subject: "Activación de cuenta",
          text:
            `¡Registro exitoso!\n\nTu código de activación es: ${post.codigo}\n +
            Activa tu cuenta aquí: http://localhost:3001/usuarios/activar/${post.email}/${post.codigo}`,
        };

        transporter.sendMail(mailOptions, (error) => {
          if (error) {
            console.error("Error enviando correo:", error);
            return response.json({
              state: true,
              mensaje:
                "¡Registro exitoso! Pero no se pudo enviar el correo de activación.",
            });
          }
          return response.json({
            state: true,
            mensaje:
              "¡Registro exitoso! Por favor revisa tu correo para activar tu cuenta.",
          });
        });
      } else {
        return response.json({
          state: false,
          mensaje: "Error al registrar el usuario",
        })
      }
    });
  });
};

usuariosController.ListarTodos = function (request, response) {
  usuariosModel.ListarTodos({}, function (err, usuarios) {
    if (err) {
      return response.json({ error: err.message });
    }
    return response.json(usuarios);
  });
};

usuariosController.ListarUnico = function (request, response) {
  const post = {
    email: request.body.email,
  };

  if (!post.email) {
    return response.json({ state: false, mensaje: "El email es requerido" });
  }

  usuariosModel.ListarUnico(post, function (res) {
    response.json(res);
  });
};

usuariosController.Actualizar = function (request, response) {
  const post = {
    nombre: request.body.nombre,
    email: request.body.email,
    estado: request.body.estado,
    rol: request.body.rol,
  };

  // Validaciones
  if (!post.nombre) {
    return response.json({
      state: false,
      mensaje: "El nombre es requerido",
    });
  }

  if (!post.email) {
    return response.json({
      state: false,
      mensaje: "El email es requerido",
    });
  }

  if (!post.estado) {
    return response.json({
      state: false,
      mensaje: "El estado es requerido",
    });
  }

  if (!post.rol) {
    return response.json({
      state: false,
      mensaje: "El campo rol es obligatorio",
    });
  }

  if (["Administrador", "Cliente", "Facturador"].indexOf(post.rol) === -1) {
    return response.json({
      state: false,
      mensaje: "El rol debe ser Administrador, Cliente o Facturador",
    });
  }

  usuariosModel.Existe(post, function (existe) {
    if (existe.length === 0) {
      return response.json({
        state: false,
        mensaje: "No podemos actualizar el usuario porque no existe",
      });
    }

    usuariosModel.Actualizar(post, function (data) {
      if (data.state) {
        return response.json({
          state: true,
          mensaje: "Usuario actualizado correctamente",
        });
      } else {
        return response.json({
          state: false,
          mensaje: "Error al actualizar el usuario",
          error: data.error,
        });
      }
    });
  });
};

usuariosController.Borrar = function (request, response) {
  const post = {
    email: request.query.email || request.body.email,
  };

  if (!post.email) {
    return response.json({ state: false, mensaje: "El email es requerido" });
  }

  usuariosModel.Existe(post, function (existe) {
    if (!existe || existe.length === 0) {
      return response.json({
        state: false,
        mensaje: "No podemos borrar un usuario que no existe",
      });
    } else {
      usuariosModel.Borrar(post, function (data) {
        if (data.state) {
          return response.json({
            state: true,
            mensaje: "Usuario borrado correctamente",
          });
        } else {
          return response.json({
            state: false,
            mensaje: "Error al borrar el usuario",
          });
        }
      });
    }
  });
};

usuariosController.Login = function (request, response) {
  const post = {
    email: request.body.email,
    password: request.body.password,
  };

  // Validaciones
  if (!post.email) {
    return response.json({ state: false, mensaje: "El email es requerido" });
  }

  if (!post.password) {
    return response.json({ state: false, mensaje: "El password es requerido" });
  }

  post.password = crypto.SHA256(post.password + config.secret).toString();

  usuariosModel.Login(post, function (data) {
    if (!data || data.length === 0) {
      return response.json({
        state: false,
        mensaje: "Tus credenciales son incorrectas",
      });
    } else {
      if (data[0].estado === "Inactive") {
        return response.json({
          state: false,
          mensaje: "Tu cuenta esta inactiva, vea al correo para activarla",
        });
      } else {
        return response.json({ mensaje: "Bienvenido " + data[0].nombre });
      }
    }
  });
};

usuariosController.Activar = function (request, response) {
  const post = {
    email: request.params.email,
    codigo: request.params.codigo,
  };

  // Validaciones
  if (!post.email?.trim()) {
    return response.json({ state: false, mensaje: "El email es requerido" });
  }

  if (!post.codigo?.trim()) {
    return response.json({ state: false, mensaje: "El código es requerido" });
  }

  usuariosModel.Activar(post, function (data) {
    if (!data) {
      return response.json({
        state: false,
        mensaje: "No se puede activar el usuario",
      });
    } else {
      return response.json({
        state: true,
        mensaje: "Usuario activado correctamente",
      });
    }
  });
};

export default usuariosController;
  