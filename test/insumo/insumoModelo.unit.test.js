const mongoose = require('mongoose');
const { connectDB, disconnectDB } = require('../setup');
const Insumo = require('../../models/insumoModelo');

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await disconnectDB();
});

describe('Insumo Model Test', () => {
    afterEach(async () => {
        await Insumo.deleteMany({});
    });

    it('Debería crear un insumo correctamente', async () => {
        const insumo = new Insumo({
            nombre: 'Tornillos',
            cantidadNeta: 100,
            precioNeto: 0.05
        });

        const insumoGuardado = await insumo.save();

        expect(insumoGuardado._id).toBeDefined();
        expect(insumoGuardado.nombre).toBe('Tornillos');
        expect(insumoGuardado.cantidadNeta).toBe(100);
        expect(insumoGuardado.precioNeto).toBe(0.05);
    });

    it('Debería fallar al crear un insumo sin nombre', async () => {
        const insumoInvalido = new Insumo({
            cantidadNeta: 50,
            precioNeto: 0.10
        });

        await expect(insumoInvalido.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });

    it('Debería fallar al crear un insumo con cantidadNeta no numérica', async () => {
        const insumoInvalido = new Insumo({
            nombre: 'Clavos',
            cantidadNeta: 'cincuenta', // Valor no numérico
            precioNeto: 0.02
        });

        await expect(insumoInvalido.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });

    it('Debería fallar al crear un insumo con precioNeto no numérico', async () => {
        const insumoInvalido = new Insumo({
            nombre: 'Tuercas',
            cantidadNeta: 200,
            precioNeto: 'cero punto cinco' // Valor no numérico
        });

        await expect(insumoInvalido.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });
});