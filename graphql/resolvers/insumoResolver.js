const Insumo = require('../../models/insumoModelo');

const insumoResolvers = {
    Query: {
        obtenerInsumos: async () => {
            return await Insumo.find();
        },
        obtenerInsumoPorId: async (_, { id }) => {
            return await Insumo.findById(id);
        }
    },
    Mutation: {
        crearInsumo: async (_, { input }) => {
            const nuevoInsumo = new Insumo(input);
            return await nuevoInsumo.save();
        },
        actualizarInsumo: async (_, { id, input }) => {
            return await Insumo.findByIdAndUpdate(id, input, { new: true });
        },
        eliminarInsumo: async (_, { id }) => {
            const resultado = await Insumo.findByIdAndDelete(id);
            return resultado !== null;
        },
        calcularCosteo: async (_, { insumosUtilizados }) => {
            let costoTotal = 0;

            for (const item of insumosUtilizados) {
                const insumo = await Insumo.findById(item.insumoId);
                if (!insumo) {
                    throw new Error(`Insumo con ID ${item.insumoId} no encontrado`);
                }

                const precioPorUnidad = insumo.precioNeto / insumo.cantidadNeta;
                const costoInsumo = precioPorUnidad * item.cantidadUtilizada;
                costoTotal += costoInsumo;
            }

            return costoTotal;
        }
    }
};

module.exports = insumoResolvers;