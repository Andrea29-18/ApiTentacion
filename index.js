import express from 'express';
import conectarBaseDatos from './config/database/conexion.js';
//import insertarDatosIniciales from './config/database/integracion';
import errorMiddleware from './middlewares/errorMiddleware.js';
import swaggerDocs from './docs/swagger.js';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

const app = express();
const puerto = process.env.PORT || 3003;

conectarBaseDatos()
    .catch(err => {
        console.error('No se pudo conectar a la base de datos. El servidor no se iniciará. Error:', err);
        process.exit(1);
    });

// La primera vez que ejecutes la API con exito, comentá la siguiente línea para evitar que se inserten los datos iniciales cada vez que se inicie el servidor

//insertarDatosIniciales();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuración de Swagger
swaggerDocs(app);

// Importar rutas
import ubicacionRutas from './routes/ubicacionRutas.js';
import productoRutas from './routes/productoRutas.js';
import categoriaProductoRutas from './routes/categoriaProductoRutas.js';
import pedidoRutas from './routes/pedidoRutas.js';
import insumosRutas from './routes/insumosRutas.js';

// Usar las rutas
app.use('/ubicaciones', ubicacionRutas);
app.use('/productos', productoRutas);
app.use('/categoriasProducto', categoriaProductoRutas);
app.use('/pedidos', pedidoRutas);
app.use('/insumos', insumosRutas);

// Middleware de error
app.use(errorMiddleware);

app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
    console.log(`Documentación de la API disponible en: http://localhost:${puerto}/api-docs`); // Ruta de la documentación
});