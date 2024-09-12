const mongoose = require('mongoose');

const productoEsquema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
    fechaVencimiento: {
        type: Date,
        required: true,
    },
});

const Producto = mongoose.model('Producto', productoEsquema);
module.exports = Producto;