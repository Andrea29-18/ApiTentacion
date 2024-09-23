// index.js

require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const swaggerDocs = require('./docs/swagger');
const errorMiddleware = require('./middlewares/errorMiddleware');

// Importar esquemas y resolvers
const esquemas = [
    require('./graphql/schemas/insumoEsquema'),
    require('./graphql/schemas/categoriaProductoEsquema'),
    require('./graphql/schemas/pedidoEsquema'),
    require('./graphql/schemas/ubicacionEsquema'),
    require('./graphql/schemas/productoEsquema')
];

const resolvers = [
    require('./graphql/resolvers/insumoResolver'),
    require('./graphql/resolvers/categoriaProductoResolver'),
    require('./graphql/resolvers/pedidoResolver'),
    require('./graphql/resolvers/ubicacionResolver'),
    require('./graphql/resolvers/productoResolver')
];

// Importar rutas con nombres consistentes
const rutas = {
    insumos: require('./routes/insumosRutas'), // Asegúrate de que el archivo se llama 'insumosRutas.js'
    ubicaciones: require('./routes/ubicacionRutas'),
    productos: require('./routes/productoRutas'),
    categoriasProducto: require('./routes/categoriaProductoRutas'),
    pedidos: require('./routes/pedidoRutas')
};

// Inicializar Express
const app = express();

// Middleware para parsear URL-encoded y JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuración de Swagger
swaggerDocs(app);

// Función para conectar a la base de datos
const conectarBD = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexión a la BD exitosa');
    } catch (err) {
        console.error('Error de conexión a la BD', err);
        throw err; // Para que el servidor no inicie si hay un error
    }
};

// Función para configurar Apollo Server
let servidorApollo;

const configurarApollo = async () => {
    servidorApollo = new ApolloServer({
        typeDefs: mergeTypeDefs(esquemas),
        resolvers: mergeResolvers(resolvers),
    });

    await servidorApollo.start();
    servidorApollo.applyMiddleware({ app });
};

// Función para configurar las rutas
const configurarRutas = () => {
    Object.entries(rutas).forEach(([key, route]) => {
        app.use(`/${key}`, route);
    });
};

// Función para iniciar el servidor
const iniciarServidor = async () => {
    try {
        await conectarBD();
        await configurarApollo();
        configurarRutas(); // Configurar rutas después de Apollo

        // Middleware de error debe ir después de las rutas
        app.use(errorMiddleware);

        const puerto = process.env.PORT || 8080;

        // Iniciar el servidor
        app.listen(puerto, () => {
            console.log(`Servidor corriendo en el puerto ${puerto}`);
            console.log(`Documentación de la API disponible en: http://localhost:${puerto}/api-docs`);
            console.log(`Servidor GraphQL disponible en: http://localhost:${puerto}${servidorApollo.graphqlPath}`);
        });
    } catch (err) {
        console.error('No se pudo iniciar el servidor debido a un error:', err);
        process.exit(1);
    }
};

// Ejecutar la inicialización del servidor
iniciarServidor();