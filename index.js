const express = require('express');
const conectarBaseDatos = require('./config/database/conexion');
const insertarDatosIniciales = require('./config/database/integracion');
const errorMiddleware = require('./middlewares/errorMiddleware');
const swaggerDocs = require('./docs/swagger');
require('dotenv').config();

const app = express();
const puerto = process.env.PORT || 3003; // Usa el puerto del .env o 3003 por defecto

conectarBaseDatos()
    .catch(err => {
        console.error('No se pudo conectar a la base de datos. El servidor no se iniciará.');
        process.exit(1);
    });

insertarDatosIniciales();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuración de Swagger
swaggerDocs(app);

// Importar rutas
const insumoRutas = require('./routes/insumoRutas');
const ubicacionRutas = require('./routes/ubicacionRutas');

// Usar las rutas
app.use('/insumos', insumoRutas);
app.use('/ubicaciones', ubicacionRutas);

// Middleware de error
app.use(errorMiddleware);

app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
    console.log(`Documentación de la API disponible en: http://localhost:${puerto}/api-docs`); // Ruta de la documentación
});