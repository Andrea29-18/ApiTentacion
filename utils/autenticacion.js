const bcrypt = require('bcrypt');

const cifrarContrasena = async (contrasena) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(contrasena, salt);
};

const compararContrasena = async (contrasena, hash) => {
    return await bcrypt.compare(contrasena, hash);
};

module.exports = { cifrarContrasena, compararContrasena };