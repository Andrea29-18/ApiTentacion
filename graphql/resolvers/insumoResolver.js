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
        crearInsumo: async (_, { nombre, cantidadNeta, precioNeto }) => {
            const nuevoInsumo = new Insumo({ nombre, cantidadNeta, precioNeto });
            return await nuevoInsumo.save();
        },
        actualizarInsumo: async (_, { id, nombre, cantidadNeta, precioNeto }) => {
            return await Insumo.findByIdAndUpdate(id, { nombre, cantidadNeta, precioNeto }, { new: true });
        },
        eliminarInsumo: async (_, { id }) => {
            const resultado = await Insumo.findByIdAndDelete(id);
            return resultado !== null; // Devuelve true si se eliminó, false si no
        }
    }
};

module.exports = insumoResolvers;
