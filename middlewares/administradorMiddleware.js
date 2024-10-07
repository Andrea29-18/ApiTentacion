import { validarContrasena, validarTelefono } from '../utils/validacion';

const validarAdministrador = async function(next) {
    // Validar contraseña
    if (!validarContrasena(this.contrasena)) {
        return next(new Error('La contraseña no es válida. Debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.'));
    }

    // Validar teléfono
    if (!validarTelefono(this.telefono)) {
        return next(new Error('El número de teléfono no es válido. Debe tener 10 dígitos.'));
    }

    next();
};

export default { validarAdministrador };