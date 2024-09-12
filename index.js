const express = require('express');
const conectarBaseDatos = require('./config/database/conexion');
const insertarDatosIniciales = require('./config/database/integracion');
require('dotenv').config();

const app = express();
const puerto = 3003;

conectarBaseDatos();

insertarDatosIniciales();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
});