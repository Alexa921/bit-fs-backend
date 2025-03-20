var usuariosModel = {}
var usuarios = []

usuariosModel.Registrar = function(post, callback) {
    usuarios.push(post)
    return callback({state:true})
}

usuariosModel.ListarTodos= function(post, callback) {
    return callback(usuarios)
}

usuariosModel.Existe = function(post, callback) {
    var posicion = usuarios.findIndex((item) => item.email = post.email)
    return callback({posicion:posicion})
}

usuariosModel.Actualizar = function (post, callback)  {
    usuarios[post.posicion].nombre = post.nombre
    return callback({ state:true });
}

usuariosModel.Borrar = function (post, callback) {
  usuarios.splice(post.posicion,1)
  return callback({ state: true });
};

module.exports.usuariosModel = usuariosModel