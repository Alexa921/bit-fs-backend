var usuariosController =
  require("/api/controladores/usuariosController.js").usuariosController;

var usuario = [];

app.post("/usarios/resgistrar", function (request, response) {
  usuariosController.Registrar(request, response);
});

app.post("/usarios/actualizar", function (request, response) {
  usuariosController.Actualizar(request, response);
});

app.post("/usarios/borrar", function (request, response) {
  usuariosController.Borrar(request, response);
});

app.get("/usuarios/ListarTodos", function (request, response) {
  usuariosController.ListarTodos(request, response);
});