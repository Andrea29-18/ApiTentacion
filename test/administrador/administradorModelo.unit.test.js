import { connectDB, disconnectDB } from '../setup';
import Administrador from '../../models/administradorModelo';
import { beforeAll, afterAll, describe, it, expect, afterEach } from '@jest/globals';

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

    it('Debería validar el número de teléfono', async () => {
        const administradorInvalido = new Administrador({
            nombre: 'Maria',
            apellidos: 'García',
            usuario: 'mgarcia',
            telefono: '12345', // Teléfono inválido
            contrasena: 'Password1!',
        });

        await expect(administradorInvalido.save()).rejects.toThrow('El número de teléfono no es válido. Debe tener 10 dígitos.');
    });

    it('Debería validar la contraseña', async () => {
        const administradorInvalido = new Administrador({
            nombre: 'Maria',
            apellidos: 'García',
            usuario: 'mgarcia',
            telefono: '1234567890',
            contrasena: 'abc', // Contraseña inválida
        });

        await expect(administradorInvalido.save()).rejects.toThrow('La contraseña no es válida.');
    });

    it('Debería cifrar y descifrar el número de teléfono correctamente', async () => {
        const administradorValido = new Administrador({
            nombre: 'Maria',
            apellidos: 'García',
            usuario: 'mgarcia',
            telefono: '1234567890',
            contrasena: 'Password1!',
        });

        await administradorValido.save();
        const administradorGuardado = await Administrador.findOne({ usuario: 'mgarcia' });
        expect(administradorGuardado.telefono).toBe('1234567890'); // Debería descifrar correctamente
    });
});