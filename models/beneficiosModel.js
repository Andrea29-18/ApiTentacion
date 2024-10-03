const mongoose = require('mongoose');

const BeneficioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    puntosRequeridos: {
        type: Number,
        required: true
    },
    activo: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Beneficio = mongoose.model('Beneficio', BeneficioSchema);
module.exports = Beneficio;
