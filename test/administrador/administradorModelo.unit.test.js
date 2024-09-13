const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Producto = require('../../models/productoModelo');

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
    // Limpiar la base de datos entre pruebas
    await Producto.deleteMany({});
});

describe('Modelo Producto sin conexión a DB', () => {
    it('debe crear un producto correctamente', () => {
        const producto = new Producto({
            nombre: 'Pastel de Chocolate',
            precio: 150,
            fechaCreacion: new Date(),
            fechaVencimiento: new Date('2024-12-31'),
        });

        expect(producto.nombre).toBe('Pastel de Chocolate');
        expect(producto.precio).toBe(150);
    });
});

describe('Modelo Producto con conexión a DB', () => {
    it('debe crear un producto correctamente en la base de datos', async () => {
        const producto = new Producto({
            nombre: 'Pastel de Fresa',
            precio: 200,
            fechaCreacion: new Date(),
            fechaVencimiento: new Date('2024-11-30'),
        });

        const resultado = await producto.save();
        expect(resultado).toHaveProperty('_id');
        expect(resultado.nombre).toBe('Pastel de Fresa');
        expect(resultado.precio).toBe(200);
    });
});
