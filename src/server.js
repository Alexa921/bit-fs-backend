import express from 'express';
import morgan from 'morgan';
import rutasProductos from './rutas/productos.js';
import rutasUsuarios from './rutas/usuarios.js'; 

const servidor = express();

servidor.use(morgan('dev'));
servidor.use(express.json());
servidor.use(express.urlencoded({ extended: false }));

servidor.use('/productos', rutasProductos);
servidor.use('/usuarios', rutasUsuarios);

servidor.get('/', (req, res) => {
  res.json({ mensaje: '✅ Raíz funcionando correctamente', data: null });
});

export default servidor;

