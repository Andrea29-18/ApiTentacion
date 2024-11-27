const mongoose = require('mongoose'); // Importa mongoose
const { connectDB, disconnectDB } = require('../setup');
const Sucursal = require('../../models/sucursalModelo');
const Pedido = require('../../models/pedidosModelo');
const Ubicacion = require('../../models/ubicacionModelo');

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await disconnectDB();
});

describe('Sucursal Model Test', () => {
    let ubicacion, pedido1, pedido2;

    beforeEach(async () => {
        // Crear una ubicación
        ubicacion = new Ubicacion({
            descripcion: 'Sucursal principal',
            longitud: -99.1332,
            latitud: 19.4326
        });
        await ubicacion.save();

        // Crear pedidos
        pedido1 = new Pedido({
            productos: ['producto_id'], // Reemplaza 'producto_id' con un ID válido de producto
            precioTotal: 100
        });

        pedido2 = new Pedido({
            productos: ['producto_id'],
            precioTotal: 200
        });

        await pedido1.save();
        await pedido2.save();
    });

    afterEach(async () => {
        await Sucursal.deleteMany({});
        await Pedido.deleteMany({});
        await Ubicacion.deleteMany({});
    });

    it('Debería crear una sucursal correctamente', async () => {
        const sucursal = new Sucursal({
            pedidos: [pedido1._id, pedido2._id],
            ubicacion: ubicacion._id,
            nombre: 'Sucursal Centro'
        });

        const sucursalGuardada = await sucursal.save();

        expect(sucursalGuardada._id).toBeDefined();
        expect(sucursalGuardada.pedidos.length).toBe(2); // Verifica que se asignaron 2 pedidos
        expect(sucursalGuardada.ubicacion).toBe(ubicacion._id.toString()); // Asegura que la ubicación esté guardada correctamente
        expect(sucursalGuardada.nombre).toBe('Sucursal Centro');
    });

    it('Debería fallar al crear una sucursal sin ubicación', async () => {
        const sucursalInvalida = new Sucursal({
            pedidos: [pedido1._id],
            nombre: 'Sucursal Sin Ubicación'
        });

        await expect(sucursalInvalida.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });

    it('Debería crear una sucursal sin pedidos', async () => {
        const sucursal = new Sucursal({
            ubicacion: ubicacion._id,
            nombre: 'Sucursal Sin Pedidos'
        });

        const sucursalGuardada = await sucursal.save();

        expect(sucursalGuardada._id).toBeDefined();
        expect(sucursalGuardada.pedidos.length).toBe(0); // Asegúrate de que no haya pedidos
        expect(sucursalGuardada.ubicacion).toBe(ubicacion._id.toString()); // Verifica que la ubicación esté correctamente asignada
    });

    it('Debería crear una sucursal sin nombre (por defecto)', async () => {
        const sucursal = new Sucursal({
            pedidos: [pedido1._id],
            ubicacion: ubicacion._id
        });

        const sucursalGuardada = await sucursal.save();

        expect(sucursalGuardada._id).toBeDefined();
        expect(sucursalGuardada.nombre).toBeUndefined(); // Debería no tener nombre si no se proporciona
    });

    it('Debería crear una sucursal con nombre', async () => {
        const sucursal = new Sucursal({
            pedidos: [pedido1._id, pedido2._id],
            ubicacion: ubicacion._id,
            nombre: 'Sucursal Norte'
        });

        const sucursalGuardada = await sucursal.save();

        expect(sucursalGuardada.nombre).toBe('Sucursal Norte'); // Verifica que se asignó el nombre correctamente
    });

    it('Debería permitir un solo pedido', async () => {
        const sucursal = new Sucursal({
            pedidos: [pedido1._id],
            ubicacion: ubicacion._id,
            nombre: 'Sucursal Este'
        });

        const sucursalGuardada = await sucursal.save();

        expect(sucursalGuardada.pedidos.length).toBe(1); // Asegura que solo hay 1 pedido
    });

    it('Debería devolver los pedidos al consultar la sucursal', async () => {
        const sucursal = new Sucursal({
            pedidos: [pedido1._id, pedido2._id],
            ubicacion: ubicacion._id,
            nombre: 'Sucursal Sur'
        });

        const sucursalGuardada = await sucursal.save();
        const sucursalConsultada = await Sucursal.findById(sucursalGuardada._id).populate('pedidos');

        expect(sucursalConsultada.pedidos.length).toBe(2); // Verifica que los pedidos estén correctamente asociados
        expect(sucursalConsultada.pedidos[0]._id.toString()).toBe(pedido1._id.toString()); // Verifica que el pedido1 está en la sucursal
    });

});
