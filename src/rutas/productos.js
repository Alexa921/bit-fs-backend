import { Router } from "express";
import ProductosController from "../controladores/productos.js";

const router = Router();

// CRUD
router.post("/", ProductosController.crear);
router.get("/", ProductosController.leerTodos);
router.get("/:id", ProductosController.leerUno);
router.put("/:id", ProductosController.actualizar);
router.delete("/:id", ProductosController.eliminar);

export default router;
