import "dotenv/config";
import ConexionMongodb from "./conexiones/basededatos.js";
import servidor from "./server.js";

const puerto = process.env.PORT;

let mensaje = null;

try {
  servidor.listen(puerto);
  mensaje = `mensaje = Servidor escuchando por el puerto: ${puerto};`
} catch (error) {
  mensaje = `mensaje = Ocurrió un error, el servidor no está corriendo.\nError: ${error};`
} finally {
  console.log(mensaje);
}