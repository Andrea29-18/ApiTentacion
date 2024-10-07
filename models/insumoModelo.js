import mongoose from 'mongoose';

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

export default mongoose.model('Insumo', insumoSchema, 'insumos');
