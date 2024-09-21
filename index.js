require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const insumoEsquema = require('./graphql/schemas/insumoEsquema');
const insumoResolvers = require('./graphql/resolvers/insumoResolver');
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
    typeDefs: insumoEsquema,
    resolvers: insumoResolvers,
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

// Usar las rutas
app.use('/insumos', insumoRutas);
app.use('/ubicaciones', ubicacionRutas);
app.use('/productos', productoRutas);
app.use('/categoriasProducto', categoriaProductoRutas);

// Middleware de error
app.use(errorMiddleware);;

// Inicia el servidor
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
    console.log(`Documentación de la API disponible en: http://localhost:${puerto}/api-docs`);
    console.log(`Servidor GraphQL disponible en: http://localhost:${puerto}${servidorApollo.graphqlPath}`);
});
});
