import { Router } from "express";
import usuariosController from "../controladores/usuarios.js"; 

const router = Router();

// Ruta para registrar un nuevo usuario
router.post("/registrar", usuariosController.Registrar);

// Ruta para actualizar los datos de un usuario
router.post("/actualizar", usuariosController.Actualizar);

// Ruta para borrar un usuario
router.post("/borrar", usuariosController.Borrar);

// Ruta para listar todos los usuarios
router.get("/listarTodos", usuariosController.ListarTodos);

// Ruta para listar un usuario específico por email
router.post("/listarUnico", usuariosController.ListarUnico);

// Ruta para realizar login de un usuario
router.post("/login", usuariosController.Login);

// Ruta de prueba para verificar el estado del usuario
router.post("/state", (req, res) => {
  res.json({ message: "Estado de la solicitud recibido" });
});

// Ruta para activar un usuario mediante email y código
router.get("/activar/:email/:codigo", usuariosController.Activar);

export default router;
