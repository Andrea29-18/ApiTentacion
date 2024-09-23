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
            precioNeto: 5.0
        });

        const insumoGuardado = await insumo.save();

        expect(insumoGuardado._id).toBeDefined();
        expect(insumoGuardado.nombre).toBe('Tornillos');
        expect(insumoGuardado.cantidadNeta).toBe(100);
        expect(insumoGuardado.precioNeto).toBe(5.0);
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

    // Nuevo test para el cálculo de costeo
    it('Debería calcular correctamente el costeo de los insumos utilizados', async () => {
        // Crear varios insumos
        const insumoHarina = new Insumo({
            nombre: 'Harina',
            cantidadNeta: 1000, // 1 kilo
            precioNeto: 50 // Precio de 1 kilo de harina
        });
        const insumoAzucar = new Insumo({
            nombre: 'Azúcar',
            cantidadNeta: 500, // 500 gramos
            precioNeto: 20 // Precio de 500 gramos de azúcar
        });

        // Guardar insumos en la base de datos
        await insumoHarina.save();
        await insumoAzucar.save();

        // Datos simulados para el cálculo de costeo
        const insumosUtilizados = [
            { insumoId: insumoHarina._id, cantidadUtilizada: 500 }, // 500 gramos de harina
            { insumoId: insumoAzucar._id, cantidadUtilizada: 250 }  // 250 gramos de azúcar
        ];

        // Simular la lógica de cálculo
        let costoTotal = 0;
        for (const item of insumosUtilizados) {
            const insumo = await Insumo.findById(item.insumoId);
            const precioPorUnidad = insumo.precioNeto / insumo.cantidadNeta;
            const costoInsumo = precioPorUnidad * item.cantidadUtilizada;
            costoTotal += costoInsumo;
        }

        // El costo total esperado es (50 / 1000 * 500) + (20 / 500 * 250) = 25 + 10 = 35
        expect(costoTotal).toBeCloseTo(35);
    });
});
