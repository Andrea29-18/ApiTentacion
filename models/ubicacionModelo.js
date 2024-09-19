const mongoose = require('mongoose');

const ubicacionEsquema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: true,
    },
    longitud: {
        type: Number,
        required: true,
    },
    latitud: {
        type: Number,
        required: true,
    },
});

const Ubicacion = mongoose.model('Ubicacion', ubicacionEsquema);
module.exports = Ubicacion;