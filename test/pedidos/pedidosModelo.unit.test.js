import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../setup.js';
import Pedido from '../../models/pedidosModelo.js';
import Producto from '../../models/productoModelo.js';
import Insumo from '../../models/insumoModelo.js';
import CategoriaProducto from '../../models/categoriaProductoModelo.js';
import { beforeEach,beforeAll, afterAll, describe, it, expect, afterEach } from '@jest/globals';

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await disconnectDB();
});

describe('Pedido Model Test', () => {
    let producto1, producto2, categoria;

    beforeEach(async () => {
        // Crear insumos
        const insumo1 = new Insumo({ nombre: 'Tornillos', cantidadNeta: 1000, precioNeto: 0.05 });
        const insumo2 = new Insumo({ nombre: 'Clavos', cantidadNeta: 500, precioNeto: 0.02 });
        await insumo1.save();
        await insumo2.save();

        // Crear categoría
        categoria = new CategoriaProducto({ nombreCategoria: 'Construcción', descripcionCategoria: 'Materiales de construcción.' });
        await categoria.save();

        // Crear productos
        producto1 = new Producto({
            nombreProducto: 'Caja de Herramientas',
            cantidadStock: 50,
            precioFinal: 29.99,
            fechaVencimiento: new Date('2025-12-31'),
            insumos: [insumo1._id, insumo2._id],
            catalogoProducto: categoria._id
        });

        producto2 = new Producto({
            nombreProducto: 'Martillo',
            cantidadStock: 100,
            precioFinal: 9.99,
            fechaVencimiento: new Date('2024-12-31'),
            insumos: [insumo1._id],
            catalogoProducto: categoria._id
        });

        await producto1.save();
        await producto2.save();
    });

    afterEach(async () => {
        await Pedido.deleteMany({});
        await Producto.deleteMany({});
        await Insumo.deleteMany({});
        await CategoriaProducto.deleteMany({});
    });

    it('Debería crear un pedido correctamente', async () => {
        const pedido = new Pedido({
            productos: [producto1._id, producto2._id],
            precioTotal: 39.98
        });

        const pedidoGuardado = await pedido.save();

        expect(pedidoGuardado._id).toBeDefined();
        expect(pedidoGuardado.productos.length).toBe(2);
        expect(pedidoGuardado.precioTotal).toBe(39.98);
    });

    it('Debería fallar al crear un pedido sin precioTotal', async () => {
        const pedidoInvalido = new Pedido({
            productos: [producto1._id]
        });

        await expect(pedidoInvalido.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });

    it('Debería calcular correctamente el precioTotal', async () => {
        const precioCalculado = producto1.precioFinal + producto2.precioFinal;
        const pedido = new Pedido({
            productos: [producto1._id, producto2._id],
            precioTotal: precioCalculado
        });

        const pedidoGuardado = await pedido.save();

        expect(pedidoGuardado.precioTotal).toBe(precioCalculado);
    });
});