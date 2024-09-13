const { connectDB, disconnectDB } = require('../setup');
const Producto = require('../../models/productoModelo');

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await disconnectDB();
});

describe('Modelo Producto', () => {
    afterEach(async () => {
        await Producto.deleteMany({});
    });

    it('debe crear un producto correctamente sin conexión a DB', () => {
        const producto = new Producto({
            nombre: 'Pastel de Chocolate',
            precio: 150,
            fechaCreacion: new Date(),
            fechaVencimiento: new Date('2024-12-31'),
        });

        expect(producto.nombre).toBe('Pastel de Chocolate');
        expect(producto.precio).toBe(150);
    });

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
