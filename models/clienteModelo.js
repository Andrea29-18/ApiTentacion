import mongoose from 'mongoose';
import { cifrarTexto, descifrarTexto } from '../utils/cifrado.js';
import { validarCliente } from '../middlewares/clienteMiddleware.js';

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
        set: cifrarTexto, // Cifra el número de teléfono al guardarlo
        get: descifrarTexto, // Lo descifra al obtenerlo
    },
    fechaNacimiento: {
        type: Date,
        required: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        set: cifrarTexto, // Cifra el correo al guardarlo
        get: descifrarTexto, // Lo descifra al obtenerlo
    },
    contrasena: {
        type: String,
        required: true,
        set: cifrarTexto, // Cifra la contraseña al guardarla
        get: descifrarTexto, // La descifra al obtenerla
    },
});

// Middleware para validar antes de guardar
clienteEsquema.pre('save', validarCliente);

const Cliente = mongoose.model('Cliente', clienteEsquema);
export default Cliente;