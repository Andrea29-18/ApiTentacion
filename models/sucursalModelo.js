const mongoose = require('mongoose');
const Pedido = require('./pedidosModelo'); // Asegúrate de importar correctamente el modelo Pedido

const sucursalEsquema = new mongoose.Schema({
    pedidos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pedido', // Referencia al modelo Pedido
        }
    ],
    ubicacion: {
        type: String,
        required: true,
    },
});

const Sucursal = mongoose.model('Sucursal', sucursalEsquema);
module.exports = Sucursal;