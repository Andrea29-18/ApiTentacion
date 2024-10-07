import mongoose  from 'mongoose';

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
export default Pedido;
