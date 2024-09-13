const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Cliente = require('../../models/clienteModelo'); 

let mongoServer;

beforeAll(async () => {
    // Solo conectamos si no hay una conexión activa
    if (mongoose.connection.readyState === 0) {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }
});

afterAll(async () => {
    // Desconectar y detener MongoMemoryServer al final de todas las pruebas
    await mongoose.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
    }
});

afterEach(async () => {
    await Cliente.deleteMany({});
});

describe('Cliente Model Test', () => {
    it('Debería validar el número de teléfono', async () => {
        const clienteInvalido = new Cliente({
            nombre: 'Juan',
            apellidos: 'Pérez',
            telefono: '123456789', 
            fechaNacimiento: new Date('1990-01-01'),
            correo: 'juan@ejemplo.com',
            contrasena: 'Password1!'
        });

        await expect(clienteInvalido.save()).rejects.toThrow
                ('El número de teléfono no es válido. Debe tener 10 dígitos y contener solo números.');
    });

    it('Debería validar el correo', async () => {
        const clienteInvalido = new Cliente({
            nombre: 'Juan',
            apellidos: 'Pérez',
            telefono: '1234567890',
            fechaNacimiento: new Date('1990-01-01'),
            correo: 'correoInvalido',
            contrasena: 'Password1!'
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
            contrasena: 'abc'
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
            contrasena: 'Password1!'
        });

        await clienteValido.save();
        const clienteGuardado = await Cliente.findOne({ correo: 'juan@ejemplo.com' });
        expect(clienteGuardado.contrasena).toBe('Password1!');
    });
});
