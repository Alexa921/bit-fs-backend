import expres from "express";
import morgan from "morgan";
import rutasProductos from "./rutas/productos.js";

const servidor = expres();

servidor.use(morgan("dev"));
servidor.use("/productos", rutasProductos);

servidor.get("/", (solcitud, respuesta) => {
  respuesta.json({ mensaje: "raiz ok", data: null });
});

export default servidor;