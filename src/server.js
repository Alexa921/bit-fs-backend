import express from "express";
import morgan from "morgan";
import rutasProductos from "./rutas/productos.js";

const servidor = express();

servidor.use(morgan("dev"));
servidor.use(express.json());
servidor.use(express.urlencoded({ extended: false }));
servidor.use("/productos", rutasProductos);

servidor.get("/", (solcitud, respuesta) => {
  respuesta.json({ mensaje: "raiz ok", data: null });
});

export default servidor;