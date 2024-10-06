import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi  from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API D.Tentacion',
            version: '1.0.0',
            description: 'Documentación de la API REST para la gestión de pastelerías',
        },
    },
    apis: ['./routes/*.js'], // Ruta a los archivos donde están las definiciones de los endpoints
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const swaggerUiOptions = {
    explorer: true,
};

const swaggerUiMiddleware = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOptions));

    // Ruta para exportar la documentación en JSON
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerDocs);
    });
};

export default swaggerUiMiddleware;
