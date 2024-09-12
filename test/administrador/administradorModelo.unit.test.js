const mongoose = require('mongoose');
const Administrador = require('../../models/administradorModelo');
const { cifrarContrasena, compararContrasena } = require('../../utils/autenticacion');
const { cifrarTexto, descifrarTexto } = require('../../utils/cifrado');

describe('Modelo Administrador sin conexión a DB', () => {
    it('debe crear un administrador correctamente', async () => {
        const administrador = new Administrador({
            nombre: 'Luis',
            apellidos: 'Martínez',
            telefono: cifrarTexto('2284455667'),
            usuario: cifrarTexto('luis_martinez'),
            contrasena: await cifrarContrasena('adminPass123'),
        });

        expect(administrador.nombre).toBe('Luis');
        expect(administrador.telefono).toBe(cifrarTexto('2284455667'));
        expect(administrador.usuario).toBe(cifrarTexto('luis_martinez'));
    });

    it('debe comparar contraseñas correctamente', async () => {
        const administrador = new Administrador({
            nombre: 'Laura',
            apellidos: 'Sánchez',
            telefono: cifrarTexto('2285566778'),
            usuario: cifrarTexto('laura_sanchez'),
            contrasena: await cifrarContrasena('adminPass456'),
        });

        const esCoincidente = await compararContrasena('adminPass456', administrador.contrasena);
        expect(esCoincidente).toBe(true);
    });
});

describe('Modelo Administrador con conexión a DB', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('debe crear un administrador correctamente en la base de datos', async () => {
        const administrador = new Administrador({
            nombre: 'Carlos',
            apellidos: 'López',
            telefono: cifrarTexto('2286677889'),
            usuario: cifrarTexto('carlos_lopez'),
            contrasena: await cifrarContrasena('adminPass789'),
        });

        const resultado = await administrador.save();
        expect(resultado).toHaveProperty('_id');
        expect(resultado.nombre).toBe('Carlos');
        expect(resultado.usuario).toBe(cifrarTexto('carlos_lopez'));
    });
});
