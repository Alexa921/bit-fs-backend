var usuariosController = {};
var usuariosModel =
  require("../controladores/modelos/usuariosModel").usuariosModel;

usuariosController.Registrar = function (request, response) {
  var post = {
    nombre: request.body.nombre,
    email: request.body.email,
    password: request.body.password,
  };

  if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
    response.json({
      state: false,
      mensaje: "El campo de nombre es obligatorio",
    });
    return false;
  }

  if (post.email == undefined || post.email == null || post.email == "") {
    response.json({
      state: false,
      mensaje: "El campo de email es obligatorio",
    });
    return false;
  }

  if (
    post.password == undefined ||
    post.password == null ||
    post.password == ""
  ) {
    response.json({
      state: false,
      mensaje: "El campo de password es obligatorio",
    });
    return false;
  }

  
usuariosModel.Registrar(post, function (res) {
    if (res.state == true) {
      response.json({ state: true, mensaje: "Usuario guardado correctamente" });
    } else {
      response.json({ state: false, mensaje: "Error al guardar el usuario" });
    }
  });
};

usuariosController.ListarTodos = function (request, response) {
  usuariosModel.ListarTodos(null, function (respuesta) {
    response.json(respuesta);
  });
};

usuariosController.Actualizar = function (request, response) {
  var post = {
    nombre: request.body.nombre,
    email: request.body.email,
  };

  if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
    response.json({
      state: false,
      mensaje: "El campo de nombre es obligatorio",
    });
    return false;
  }

  if (post.email == undefined || post.email == null || post.email == "") {
    response.json({
      state: false,
      mensaje: "El campo de email es obligatorio",
    });
    return false;
  }

  usuariosModel.Existe(post, function (ex) {
    if (ex.posicion == -1) {
      response.json({
        state: false,
        mensaje: "No podemos actualizar un email que existe no en la base de datos",
      });
      return false;
    } else {
      post.posicion = ex.posicion;
      usuariosModel.Actualizar(post, function (respuesta) {
        if (respuesta.state == true) {
          response.json({
            state: true,
            mensaje: "Usuario actualizadp correctamente",
          });
          return false;
        }
      });
    }
  });
};

usuariosController.Borrar = function (request, response) {
    var post = {
      email: request.body.email,
    };
  
    if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
      response.json({
        state: false,
        mensaje: "El campo de nombre es obligatorio",
      });
      return false;
    }
  
    if (post.email == undefined || post.email == null || post.email == "") {
      response.json({
        state: false,
        mensaje: "El campo de email es obligatorio",
      });
      return false;
    }
  
    usuariosModel.Existe(post, function (ex) {
      if (ex.posicion == -1) {
        response.json({
          state: false,
          mensaje: "No podemos eliminar un email que existe no en la base de datos",
        });
        return false;
      } else {
        post.posicion = ex.posicion;
        usuariosModel.Borrar(post, function (respuesta) {
          if (respuesta.state == true) {
            response.json({
              state: true,
              mensaje: "Usuario eliminado correctamente",
            });
            return false;
          }
        });
      }
    });
  };

module.exports.usuariosController = usuariosController;