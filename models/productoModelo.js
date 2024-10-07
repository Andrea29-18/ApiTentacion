import mongoose from 'mongoose';

const productoEsquema = new mongoose.Schema({
    nombreProducto: {
        type: String,
        required: true
    },
    cantidadStock: {
        type: Number,
        required: true
    },
    precioFinal: {
        type: Number,
        required: true
    },
    fechaVencimiento: {
        type: Date,
        required: true
    },
    insumos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Insumo' // Referencia al modelo Insumo
        }
    ],
    catalogoProducto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoriaProducto', // Referencia al modelo CategoriaProducto
        required: true
    }
});

const Producto = mongoose.model('Producto', productoEsquema);
export default Producto;