const { connectDB, disconnectDB } = require('../setup');
const Administrador = require('../../models/administradorModelo');

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await disconnectDB();
});

describe('Administrador Model Test', () => {
    afterEach(async () => {
        await Administrador.deleteMany({});
    });

    // Test para validar el número de teléfono
    it('Debería validar el número de teléfono', async () => {
        const administradorInvalido = new Administrador({
            nombre: 'Maria',
            apellidos: 'García',
            usuario: 'mgarcia',
            telefono: '12345', // Teléfono inválido (menos de 10 dígitos)
            contrasena: 'Password1!',
        });

        await expect(administradorInvalido.save()).rejects.toThrow('El número de teléfono no es válido. Debe tener 10 dígitos.');
    });

    // Test para validar la contraseña
    it('Debería validar la contraseña', async () => {
        const administradorInvalido = new Administrador({
            nombre: 'Maria',
            apellidos: 'García',
            usuario: 'mgarcia',
            telefono: '1234567890',
            contrasena: 'abc', // Contraseña inválida (menos de 8 caracteres)
        });

        await expect(administradorInvalido.save()).rejects.toThrow('La contraseña no es válida. Debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.');
    });

    // Test para cifrado del número de teléfono y la contraseña
    it('Debería cifrar el número de teléfono y la contraseña correctamente', async () => {
        const administradorValido = new Administrador({
            nombre: 'Maria',
            apellidos: 'García',
            usuario: 'mgarcia',
            telefono: '1234567890',
            contrasena: 'Password1!',
        });

        await administradorValido.save();
        const administradorGuardado = await Administrador.findOne({ usuario: 'mgarcia' });

        // Verificar que el teléfono y la contraseña están cifrados en la base de datos
        expect(administradorGuardado.telefono).not.toBe('1234567890'); // El teléfono debe estar cifrado
        expect(administradorGuardado.contrasena).not.toBe('Password1!'); // La contraseña debe estar cifrada

        // Verificar que los campos cifrados tienen el formato hexadecimal (cifrado MD5 para el teléfono y bcrypt para la contraseña)
        expect(administradorGuardado.telefono).toMatch(/[0-9a-fA-F]{32}/); // Verifica que el teléfono esté cifrado (MD5)
        expect(administradorGuardado.contrasena).toMatch(/[0-9a-fA-F]{60}/); // Verifica que la contraseña esté cifrada (bcrypt)
    });
});
