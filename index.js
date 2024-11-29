require('dotenv').config();
const express = require('express');
const conectarBaseDatos = require('./config/database/conexion');
const insertarDatosIniciales = require('./config/database/integracion');
const swaggerDocs = require('./docs/swagger');
const app = express();
const cors = require("cors")
const puerto = process.env.PORT || 3000;

// Conectar a la base de datos
conectarBaseDatos()
    .catch(err => {
        console.error('No se pudo conectar a la base de datos. El servidor no se iniciará.');
        process.exit(1);
    });

// Configurar CORS para permitir solicitudes de cualquier origen
app.use(cors({
    origin: '*',
    methods: "GET,PUT,POST,DELETE",
}));

// La primera vez que ejecutes la API con éxito, comenta la siguiente línea para evitar que se inserten los datos iniciales cada vez que se inicie el servidor
// insertarDatosIniciales();

// Configurar el middleware para manejar el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuración de Swagger (documentación de la API)
swaggerDocs(app);

// Usar las rutas
app.use('/login', require('./routes/loginRutas')); // Ruta para login
app.use('/ubicaciones', require('./routes/ubicacionRutas'));
app.use('/productos', require('./routes/productoRutas'));
app.use('/categoriasProducto', require('./routes/categoriaProductoRutas'));
app.use('/pedidos', require('./routes/pedidoRutas'));
app.use('/insumos', require('./routes/insumosRutas'));
app.use('/clientes', require('./routes/clienteRutas'));
app.use('/administradores', require('./routes/administradorRutas'));
app.use('/sucursales', require('./routes/sucursalRutas'));

app.get("*", (req, res) => { res.status(404).send("Recurso no encontrado") })

// Middleware de manejo de errores
app.use(require('./middlewares/errorMiddleware'));

// Iniciar el servidor
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
    console.log(`Documentación de la API disponible en: http://localhost:${puerto}/api-docs`); // Ruta de la documentación
});
