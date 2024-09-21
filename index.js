require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

// Esquemas
const insumoEsquema = require('./graphql/schemas/insumoEsquema');
const categoriaProductoEsquema = require('./graphql/schemas/categoriaProductoEsquema');
const pedidoEsquema = require('./graphql/schemas/pedidoEsquema');
const ubicacionEsquema = require('./graphql/schemas/ubicacionEsquema');
const productoEsquema = require('./graphql/schemas/productoEsquema');

//resolver
const insumoResolvers = require('./graphql/resolvers/insumoResolver');
const categoriaProductoResolvers = require('./graphql/resolvers/categoriaProductoResolver');
const pedidoResolvers = require('./graphql/resolvers/pedidoResolver');
const ubicacionResolvers = require('./graphql/resolvers/ubicacionResolver');
const productoResolvers = require('./graphql/resolvers/productoResolver');

// Documentación de la API
const swaggerDocs = require('./docs/swagger');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
const puerto = process.env.PORT || 8080;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conexión a la BD exitosa'))
    .catch(err => console.error('Error de conexión a la BD', err));

// Configuración de Swagger
swaggerDocs(app);

// Configuración de Apollo Server
const servidorApollo = new ApolloServer({
    typeDefs: [insumoEsquema, categoriaProductoEsquema, pedidoEsquema, ubicacionEsquema, productoEsquema],
    resolvers: [insumoResolvers, categoriaProductoResolvers, pedidoResolvers, ubicacionResolvers, productoResolvers],
});


// Middleware de Apollo Server
servidorApollo.start().then(() => {
    servidorApollo.applyMiddleware({ app });
    
    // Rutas de la API REST
// Importar rutas
const insumoRutas = require('./routes/insumoRutas');
const ubicacionRutas = require('./routes/ubicacionRutas');
const productoRutas = require('./routes/productoRutas');
const categoriaProductoRutas = require('./routes/categoriaProductoRutas');
const pedidoRutas = require('./routes/pedidoRutas');

// Usar las rutas
app.use('/insumos', insumoRutas);
app.use('/ubicaciones', ubicacionRutas);
app.use('/productos', productoRutas);
app.use('/categoriasProducto', categoriaProductoRutas);
app.use('/pedidos', pedidoRutas);

// Middleware de error
app.use(errorMiddleware);;

// Inicia el servidor
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
    console.log(`Documentación de la API disponible en: http://localhost:${puerto}/api-docs`);
    console.log(`Servidor GraphQL disponible en: http://localhost:${puerto}${servidorApollo.graphqlPath}`);
});
});
