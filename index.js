require('dotenv').config();
const express = require('express');
const { conectorBDNube } = require('./config/database/conexion');
const errorMiddleware = require('./middlewares/errorMiddleware');
const swaggerDocs = require('./docs/swagger');
const cors = require('cors');

const app = express();
const puerto = process.env.PORT || 3003;

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

try {
    conectorBDNube();
} catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).send('Internal Server Error');
}


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuración de Swagger
swaggerDocs(app);

// Importar rutas
const loginRutas = require('./routes/loginRutas');
const ubicacionRutas = require('./routes/ubicacionRutas');
const productoRutas = require('./routes/productoRutas');
const categoriaProductoRutas = require('./routes/categoriaProductoRutas');
const pedidoRutas = require('./routes/pedidoRutas');
const insumosRutas = require('./routes/insumosRutas');
const clienteRutas = require('./routes/clienteRutas');
const administradorRutas = require('./routes/administradorRutas')
const sucursalRutas = require('./routes/sucursalRutas');

// Usar las rutas
app.use('/login', loginRutas); // Ruta para login
app.use('/ubicaciones', ubicacionRutas);
app.use('/productos', productoRutas);
app.use('/categoriasProducto', categoriaProductoRutas);
app.use('/pedidos', pedidoRutas);
app.use('/insumos', insumosRutas);
app.use('/clientes', clienteRutas);
app.use('/administradores', administradorRutas);
app.use('/sucursales', sucursalRutas);

// Middleware de error
app.use(errorMiddleware);

app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
    console.log(`Documentación de la API disponible en: http://localhost:${puerto}/api-docs`); // Ruta de la documentación
});