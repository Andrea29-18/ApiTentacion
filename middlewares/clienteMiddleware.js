const { validarContrasena, validarCorreo, validarTelefono } = require('../utils/validacion');

const validarCliente = async function (next) {
    // Validar la contraseña
    if (!validarContrasena(this.contrasena)) {
        return next(new Error('La contraseña no es válida. Debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo.'));
    }

    // Validar el correo
    if (!validarCorreo(this.correo)) {
        return next(new Error('El correo no es válido.'));
    }

    // Validar el teléfono
    if (!validarTelefono(this.telefono)) {
        return next(new Error('El número de teléfono no es válido. Debe tener 10 dígitos y contener solo números.'));
    }

    next();
};

module.exports = { validarCliente };