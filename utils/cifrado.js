import crypto from 'crypto';
import { Buffer } from 'buffer';
const algoritmo = 'aes-256-cbc';
const clave = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export const cifrarTexto = (texto) => {
    const cipher = crypto.createCipheriv(algoritmo, Buffer.from(clave), iv);
    let cifrado = cipher.update(texto);
    cifrado = Buffer.concat([cifrado, cipher.final()]);
    return iv.toString('hex') + ':' + cifrado.toString('hex');
};

export const descifrarTexto = (texto) => {
    const textoPartes = texto.split(':');
    const iv = Buffer.from(textoPartes.shift(), 'hex');
    const cifrado = Buffer.from(textoPartes.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algoritmo, Buffer.from(clave), iv);
    let descifrado = decipher.update(cifrado);
    descifrado = Buffer.concat([descifrado, decipher.final()]);
    return descifrado.toString();
};

// Nueva función para comparar contraseñas
export const compararContrasena = (contrasenaIngresada, contrasenaAlmacenada) => {
    const contrasenaDescifrada = descifrarTexto(contrasenaAlmacenada);
    return contrasenaIngresada === contrasenaDescifrada;
};

export default { cifrarTexto, descifrarTexto, compararContrasena };