const { connectDB, disconnectDB } = require('../setup');
const Cliente = require('../../models/clienteModelo');

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await disconnectDB();
});

describe('Cliente Model Test', () => {
    afterEach(async () => {
        await Cliente.deleteMany({});
    });

    // Test para validar el número de teléfono
    it('Debería validar el número de teléfono', async () => {
        const clienteInvalido = new Cliente({
            nombre: 'Juan',
            apellidos: 'Pérez',
            telefono: '123456789', // Teléfono inválido (menos de 10 dígitos)
            fechaNacimiento: new Date('1990-01-01'),
            correo: 'juan@ejemplo.com',
            contrasena: 'Password1!',
        });

        await expect(clienteInvalido.save()).rejects.toThrow('El número de teléfono no es válido. Debe tener 10 dígitos y contener solo números.');
    });

    // Test para validar el correo
    it('Debería validar el correo', async () => {
        const clienteInvalido = new Cliente({
            nombre: 'Juan',
            apellidos: 'Pérez',
            telefono: '1234567890',
            fechaNacimiento: new Date('1990-01-01'),
            correo: 'correoInvalido', // Correo inválido (no tiene el formato correcto)
            contrasena: 'Password1!',
        });

        await expect(clienteInvalido.save()).rejects.toThrow('El correo no es válido.');
    });

    // Test para validar la contraseña
    it('Debería validar la contraseña', async () => {
        const clienteInvalido = new Cliente({
            nombre: 'Juan',
            apellidos: 'Pérez',
            telefono: '1234567890',
            fechaNacimiento: new Date('1990-01-01'),
            correo: 'juan@ejemplo.com',
            contrasena: 'abc', // Contraseña inválida (menos de 8 caracteres)
        });

        await expect(clienteInvalido.save()).rejects.toThrow('La contraseña no es válida. Debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo.');
    });

    // Test para cifrado del número de teléfono y la contraseña
    it('Debería cifrar el número de teléfono y la contraseña correctamente', async () => {
        const clienteValido = new Cliente({
            nombre: 'Juan',
            apellidos: 'Pérez',
            telefono: '1234567890',
            fechaNacimiento: new Date('1990-01-01'),
            correo: 'juan@ejemplo.com',
            contrasena: 'Password1!',
        });

        await clienteValido.save();
        const clienteGuardado = await Cliente.findOne({ correo: 'juan@ejemplo.com' });

        expect(clienteGuardado.telefono).not.toBe('1234567890'); // El teléfono debe estar cifrado
        expect(clienteGuardado.contrasena).not.toBe('Password1!'); // La contraseña debe estar cifrada

        // Verificar que el teléfono y la contraseña están en formato cifrado (hexadecimal)
        expect(clienteGuardado.telefono).toMatch(/[0-9a-fA-F]{32}/); // El teléfono debe estar cifrado
        expect(clienteGuardado.contrasena).toMatch(/[0-9a-fA-F]{32}/); // La contraseña debe estar cifrada
    });
});
