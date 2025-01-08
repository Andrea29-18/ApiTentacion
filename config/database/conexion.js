const mongoose = require('mongoose');
require('dotenv').config();

//Conexión a la base de datos en la nube MongoAtlass
const conectorBDNube = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error al conectar con MongoDB: ${error.message}`);
    }
};

module.exports = { conectorBDNube };