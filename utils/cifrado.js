const crypto = require('crypto');

const algoritmo = 'aes-256-cbc';
const clave = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const cifrarTexto = (texto) => {
    const cipher = crypto.createCipheriv(algoritmo, Buffer.from(clave), iv);
    let cifrado = cipher.update(texto);
    cifrado = Buffer.concat([cifrado, cipher.final()]);
    return iv.toString('hex') + ':' + cifrado.toString('hex');
};

const descifrarTexto = (texto) => {
    const textoPartes = texto.split(':');
    const iv = Buffer.from(textoPartes.shift(), 'hex');
    const cifrado = Buffer.from(textoPartes.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algoritmo, Buffer.from(clave), iv);
    let descifrado = decipher.update(cifrado);
    descifrado = Buffer.concat([descifrado, decipher.final()]);
    return descifrado.toString();
};

module.exports = { cifrarTexto, descifrarTexto };