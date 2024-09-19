const mongoose = require('mongoose');

const categoriaProductoEsquema = new mongoose.Schema({
    nombreCategoria: {
        type: String,
        required: true
    },
    descripcionCategoria: {
        type: String,
        required: true
    }
});

const CategoriaProducto = mongoose.model('CategoriaProducto', categoriaProductoEsquema);
module.exports = CategoriaProducto;