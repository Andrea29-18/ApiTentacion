import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../setup.js';
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

describe('Producto Model Test', () => {
    let insumo1, insumo2, categoria;

    beforeEach(async () => {
        // Crear insumos
        insumo1 = new Insumo({ nombre: 'Tornillos', cantidadNeta: 1000, precioNeto: 0.05 });
        insumo2 = new Insumo({ nombre: 'Clavos', cantidadNeta: 500, precioNeto: 0.02 });
        await insumo1.save();
        await insumo2.save();

        // Crear categoría
        categoria = new CategoriaProducto({ nombreCategoria: 'Construcción', descripcionCategoria: 'Materiales de construcción.' });
        await categoria.save();
    });

    afterEach(async () => {
        await Producto.deleteMany({});
        await Insumo.deleteMany({});
        await CategoriaProducto.deleteMany({});
    });

    it('Debería crear un producto correctamente', async () => {
        const producto = new Producto({
            nombreProducto: 'Caja de Herramientas',
            cantidadStock: 50,
            precioFinal: 29.99,
            fechaVencimiento: new Date('2025-12-31'),
            insumos: [insumo1._id, insumo2._id],
            catalogoProducto: categoria._id
        });

        const productoGuardado = await producto.save();

        expect(productoGuardado._id).toBeDefined();
        expect(productoGuardado.nombreProducto).toBe('Caja de Herramientas');
        expect(productoGuardado.cantidadStock).toBe(50);
        expect(productoGuardado.precioFinal).toBe(29.99);
        expect(productoGuardado.fechaVencimiento).toEqual(new Date('2025-12-31'));
        expect(productoGuardado.insumos.length).toBe(2);
        expect(productoGuardado.catalogoProducto).toEqual(categoria._id);
    });

    it('Debería fallar al crear un producto sin nombreProducto', async () => {
        const productoInvalido = new Producto({
            cantidadStock: 10,
            precioFinal: 15.99,
            fechaVencimiento: new Date(),
            insumos: [insumo1._id],
            catalogoProducto: categoria._id
        });

        await expect(productoInvalido.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });

    it('Debería fallar al crear un producto sin insumos', async () => {
        const productoInvalido = new Producto({
            nombreProducto: 'Martillo',
            cantidadStock: 30,
            precioFinal: 9.99,
            fechaVencimiento: new Date(),
            catalogoProducto: categoria._id
        });

        await productoInvalido.save();

        const productoGuardado = await Producto.findOne({ nombreProducto: 'Martillo' });
        expect(productoGuardado.insumos.length).toBe(0);
    });
});