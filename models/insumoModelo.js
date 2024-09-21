const mongoose = require('mongoose');

const insumoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    cantidadNeta: {
        type: Number,
        required: true
    },
    precioNeto: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Insumo', insumoSchema, 'insumos');