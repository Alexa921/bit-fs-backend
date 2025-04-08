import express from "express";
import ProductosController from "../controladores/productos.js";

const ruta = express.Router();

// CRUD
ruta.post("/", ProductosController.crear);
ruta.get("/", ProductosController.leerTodos);
ruta.get("/:id", ProductosController.leerUno);
ruta.put("/:id", ProductosController.actualizar);
ruta.delete("/:id", ProductosController.eliminar);


// Rutas de USUARIOS
// Ruta para registrar un nuevo usuario
app.post("/usuarios/registrar", (request, response) => {
    usuariosController.Registrar(request, response);
  });
  
  // Ruta para actualizar los datos de un usuario
  app.post("/usuarios/actualizar", (request, response) => {
    usuariosController.Actualizar(request, response);
  });
  
  // Ruta para borrar un usuario
  app.post("/usuarios/borrar", (request, response) => {
    usuariosController.Borrar(request, response);
  });
  
  // Ruta para listar todos los usuarios
  app.get("/usuarios/listarTodos", (request, response) => {
    usuariosController.ListarTodos(request, response);
  });
  
  // Ruta para listar un usuario específico por email
  app.post("/usuarios/listarUnico", (request, response) => {
    usuariosController.ListarUnico(request, response);
  });
  
  // Ruta para realizar login de un usuario
  app.post("/usuarios/login", (request, response) => {
    usuariosController.Login(request, response);
  });
  
  // Ruta de prueba para verificar el estado del usuario (por completar)
  app.post("/usuarios/state", (request, response) => {
    response.json({ message: "Estado de la solicitud recibido" });
  });
  
  // Ruta para activar un usuario mediante email y código
  app.get("/usuarios/activar/:email/:codigo", (request, response) => {
    usuariosController.Activar(request, response);
  });

  export default ruta;