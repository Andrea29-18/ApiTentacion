function validarContrasena(contrasena) {
    // Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    return regex.test(contrasena);
}

function validarCorreo(correo) {
    // Validar formato del correo
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

function validarTelefono(telefono) {
    // Debe ser un número de exactamente 10 dígitos
    const regex = /^\d{10}$/;
    return regex.test(telefono);
}

module.exports = {
    validarContrasena,
    validarCorreo,
    validarTelefono
};
