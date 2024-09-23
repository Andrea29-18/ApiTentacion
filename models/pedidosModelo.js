const mongoose = require('mongoose');
const Producto = require('./productoModelo');

const pedidoEsquema = new mongoose.Schema({
    productos: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Producto' // Referencia al modelo Producto
        }
    ],
    precioTotal: {
        type: Number,
        required: true
    }
});

const Pedido = mongoose.model('Pedido', pedidoEsquema);
module.exports = Pedido;
