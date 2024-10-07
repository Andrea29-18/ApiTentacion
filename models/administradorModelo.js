import  mongoose from 'mongoose';
import  { cifrarTexto, descifrarTexto } from '../utils/cifrado.js';
import  { validarAdministrador } from '../middlewares/administradorMiddleware.js';

const administradorEsquema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    usuario: {
        type: String,
        required: true,
        unique: true,
        set: cifrarTexto, // Cifra el número de teléfono al guardarlo
        get: descifrarTexto, // Lo descifra al obtenerlo
    },
    telefono: {
        type: String,
        required: true,
        set: cifrarTexto, // Cifra el número de teléfono al guardarlo
        get: descifrarTexto, // Lo descifra al obtenerlo
    },
    contrasena: {
        type: String,
        required: true,
        set: cifrarTexto, // Cifra el número de teléfono al guardarlo
        get: descifrarTexto, // Lo descifra al obtenerlo
    },
});

administradorEsquema.pre('save', validarAdministrador);

const Administrador = mongoose.model('Administrador', administradorEsquema);
export default Administrador;