import "dotenv/config";
import "./conexiones/basededatos.js"; 
import servidor from "./server.js";
import cors from "cors";

// Middleware de CORS
servidor.use(cors({
  origin: function (origin, callback) {
    console.log(origin)
    if(!origin) return callback(null, true)
    if(config.listablanca.indexOf(origin) === -1 ) {
      return callback("error de cors sin permiso: " + origin, false)
    }
    else {
      return callback(null, true)
    }
  },credentials:true
}));

const puerto = process.env.PORT || 3001;

try {
  servidor.listen(puerto, () => {
    console.log(`Servidor escuchando por el puerto: ${puerto}`);
  });


} catch (error) {
  console.error("Ocurrió un error, el servidor no está corriendo.\n", error);
}

