const mongoose = require('mongoose');
const Producto = require('../../models/productoModelo');

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
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
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
