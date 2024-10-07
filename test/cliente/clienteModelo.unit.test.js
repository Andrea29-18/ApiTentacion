import { connectDB, disconnectDB } from '../setup.js';
import Cliente from '../../models/clienteModelo.js';
import { beforeAll, afterAll, describe, it, expect, afterEach } from '@jest/globals';

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

    it('Debería validar el número de teléfono', async () => {
        const clienteInvalido = new Cliente({
            nombre: 'Juan',
            apellidos: 'Pérez',
            telefono: '123456789', // Teléfono inválido
            fechaNacimiento: new Date('1990-01-01'),
            correo: 'juan@ejemplo.com',
            contrasena: 'Password1!',
        });

        await expect(clienteInvalido.save()).rejects.toThrow('El número de teléfono no es válido. Debe tener 10 dígitos y contener solo números.');
    });

    it('Debería validar el correo', async () => {
        const clienteInvalido = new Cliente({
            nombre: 'Juan',
            apellidos: 'Pérez',
            telefono: '1234567890',
            fechaNacimiento: new Date('1990-01-01'),
            correo: 'correoInvalido',
            contrasena: 'Password1!',
        });

        await expect(clienteInvalido.save()).rejects.toThrow('El correo no es válido.');
    });

    it('Debería validar la contraseña', async () => {
        const clienteInvalido = new Cliente({
            nombre: 'Juan',
            apellidos: 'Pérez',
            telefono: '1234567890',
            fechaNacimiento: new Date('1990-01-01'),
            correo: 'juan@ejemplo.com',
            contrasena: 'abc',
        });

        await expect(clienteInvalido.save()).rejects.toThrow('La contraseña no es válida.');
    });

    it('Debería cifrar y descifrar la contraseña correctamente', async () => {
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
        expect(clienteGuardado.contrasena).toBe('Password1!'); // Debería descifrar correctamente
    });
});