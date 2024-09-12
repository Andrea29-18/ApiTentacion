const mongoose = require('mongoose');
const { cifrarTexto, descifrarTexto } = require('../utils/cifrado');
const { cifrarContrasena, compararContrasena } = require('../utils/autenticacion');

const administradorEsquema = new mongoose.Schema({
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
    usuario: {
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

administradorEsquema.pre('save', async function(next) {
    if (this.isModified('contrasena')) {
        this.contrasena = await cifrarContrasena(this.contrasena);
    }
    next();
});

administradorEsquema.methods.compararContrasena = function(contrasena) {
    return compararContrasena(contrasena, this.contrasena);
};

const Administrador = mongoose.model('Administrador', administradorEsquema);
module.exports = Administrador;
