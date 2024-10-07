import mongoose from 'mongoose';

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
export default Sucursal;