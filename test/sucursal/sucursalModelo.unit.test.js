import mongoose from 'mongoose'; // Importa mongoose
import { connectDB, disconnectDB } from '../setup';
import Sucursal from '../../models/sucursalModelo';
import Pedido from '../../models/pedidosModelo';
import Producto from '../../models/productoModelo';
import Insumo from '../../models/insumoModelo';
import CategoriaProducto from'../../models/categoriaProductoModelo';
import { beforeEach,beforeAll, afterAll, describe, it, expect, afterEach } from '@jest/globals';

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await disconnectDB();
});

describe('Sucursal Model Test', () => {
    let pedido1, pedido2;

    beforeEach(async () => {
        // Crear insumos y categorías para productos
        const insumo = new Insumo({ nombre: 'Tornillos', cantidadNeta: 1000, precioNeto: 0.05 });
        await insumo.save();

        const categoria = new CategoriaProducto({ nombreCategoria: 'Construcción', descripcionCategoria: 'Materiales de construcción.' });
        await categoria.save();

        // Crear productos
        const producto = new Producto({
            nombreProducto: 'Caja de Herramientas',
            cantidadStock: 50,
            precioFinal: 29.99,
            fechaVencimiento: new Date('2025-12-31'),
            insumos: [insumo._id],
            catalogoProducto: categoria._id
        });
        await producto.save();

        // Crear pedidos
        pedido1 = new Pedido({
            productos: [producto._id],
            precioTotal: producto.precioFinal
        });

        pedido2 = new Pedido({
            productos: [producto._id],
            precioTotal: producto.precioFinal
        });

        await pedido1.save();
        await pedido2.save();
    });

    afterEach(async () => {
        await Sucursal.deleteMany({});
        await Pedido.deleteMany({});
        await Producto.deleteMany({});
        await Insumo.deleteMany({});
        await CategoriaProducto.deleteMany({});
    });

    it('Debería crear una sucursal correctamente', async () => {
        const sucursal = new Sucursal({
            pedidos: [pedido1._id, pedido2._id],
            ubicacion: 'Av. Siempre Viva 742, Springfield'
        });

        const sucursalGuardada = await sucursal.save();

        expect(sucursalGuardada._id).toBeDefined();
        expect(sucursalGuardada.pedidos.length).toBe(2);
        expect(sucursalGuardada.ubicacion).toBe('Av. Siempre Viva 742, Springfield');
    });

    it('Debería fallar al crear una sucursal sin ubicacion', async () => {
        const sucursalInvalida = new Sucursal({
            pedidos: [pedido1._id]
        });

        await expect(sucursalInvalida.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });

    it('Debería crear una sucursal sin pedidos', async () => {
        const sucursal = new Sucursal({
            ubicacion: 'Calle Falsa 123, Springfield'
        });

        const sucursalGuardada = await sucursal.save();

        expect(sucursalGuardada._id).toBeDefined();
        expect(sucursalGuardada.pedidos.length).toBe(0);
        expect(sucursalGuardada.ubicacion).toBe('Calle Falsa 123, Springfield');
    });
});