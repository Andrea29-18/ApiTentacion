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

// Importar rutas
const rutas = {
    insumos: require('./routes/insumoRutas'),
    ubicaciones: require('./routes/ubicacionRutas'),
    productos: require('./routes/productoRutas'),
    categoriasProducto: require('./routes/categoriaProductoRutas'),
    pedidos: require('./routes/pedidoRutas')
};

const app = express();
const puerto = process.env.PORT || 8080;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a la base de datos
const conectarBD = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexión a la BD exitosa');
    } catch (err) {
        console.error('Error de conexión a la BD', err);
    }
};

// Definir servidorApollo aquí
let servidorApollo;

// Configuración de Apollo Server
const configurarApollo = async () => {
    servidorApollo = new ApolloServer({
        typeDefs: mergeTypeDefs(esquemas),
        resolvers: mergeResolvers(resolvers),
    });

    await servidorApollo.start();
    servidorApollo.applyMiddleware({ app });
};

// Configurar rutas
const configurarRutas = () => {
    Object.entries(rutas).forEach(([key, route]) => {
        app.use(`/${key}`, route);
    });
};

// Inicializar el servidor
const iniciarServidor = async () => {
    await conectarBD();
    await swaggerDocs(app);
    await configurarApollo();
    configurarRutas();
    app.use(errorMiddleware);

    app.listen(puerto, () => {
        console.log(`Servidor corriendo en el puerto ${puerto}`);
        console.log(`Documentación de la API disponible en: http://localhost:${puerto}/api-docs`);
        console.log(`Servidor GraphQL disponible en: http://localhost:${puerto}${servidorApollo.graphqlPath}`);
    });
};

// Ejecutar la inicialización del servidor
iniciarServidor();