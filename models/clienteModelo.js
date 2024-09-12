const mongoose = require('mongoose');
const { cifrarTexto, descifrarTexto } = require('../utils/cifrado');
const { cifrarContrasena, compararContrasena } = require('../utils/autenticacion');

const clienteEsquema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
        set: cifrarTexto,
        get: descifrarTexto,
    },
    fechaNacimiento: {
        type: Date,
        required: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        set: cifrarTexto,
        get: descifrarTexto,
    },
    contrasena: {
        type: String,
        required: true,
    },
});

clienteEsquema.pre('save', async function(next) {
    if (this.isModified('contrasena')) {
        this.contrasena = await cifrarContrasena(this.contrasena);
    }
    next();
});

clienteEsquema.methods.compararContrasena = function(contrasena) {
    return compararContrasena(contrasena, this.contrasena);
};

const Cliente = mongoose.model('Cliente', clienteEsquema);
module.exports = Cliente;