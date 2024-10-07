import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../setup';
import CategoriaProducto from '../../models/categoriaProductoModelo';
import { beforeAll, afterAll, describe, it, expect, afterEach } from '@jest/globals';

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await disconnectDB();
});

describe('CategoriaProducto Model Test', () => {
    afterEach(async () => {
        await CategoriaProducto.deleteMany({});
    });

    it('Debería crear una categoría de producto correctamente', async () => {
        const categoria = new CategoriaProducto({
            nombreCategoria: 'Electrónica',
            descripcionCategoria: 'Productos relacionados con dispositivos electrónicos.'
        });

        const categoriaGuardada = await categoria.save();

        expect(categoriaGuardada._id).toBeDefined();
        expect(categoriaGuardada.nombreCategoria).toBe('Electrónica');
        expect(categoriaGuardada.descripcionCategoria).toBe('Productos relacionados con dispositivos electrónicos.');
    });

    it('Debería fallar al crear una categoría sin nombreCategoria', async () => {
        const categoriaInvalida = new CategoriaProducto({
            descripcionCategoria: 'Descripción sin nombre de categoría.'
        });

        await expect(categoriaInvalida.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });

    it('Debería fallar al crear una categoría sin descripcionCategoria', async () => {
        const categoriaInvalida = new CategoriaProducto({
            nombreCategoria: 'Sin Descripción'
        });

        await expect(categoriaInvalida.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });
});