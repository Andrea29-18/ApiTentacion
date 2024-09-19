const mongoose = require('mongoose');
const Producto = require('./productoModelo');

const pedidoEsquema = new mongoose.Schema({
    productos: [ // Nota que cambié el nombre a productos en minúscula para seguir la convención de nombres en singular/plural
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
