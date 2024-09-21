const CategiriaProducto = require('../../models/categoriaProductoModelo');

const categoriaProductoResolvers = {
    Query: {
        obtenerCategoriasProducto: async () => {
            return await CategiriaProducto.find();
        },
        obtenerCategoriaProductoPorId: async (_, { id }) => {
            return await CategiriaProducto.findById(id);
        }
    },
    Mutation: {
        crearCategoriaProducto: async (_, { nombreCategoria, descripcionCategoria }) => {
            const nuevaCategoriaProducto = new CategiriaProducto({ nombreCategoria, descripcionCategoria });
            return await nuevaCategoriaProducto.save();
        },
        actualizarCategoriaProducto: async (_, { id, nombreCategoria, descripcionCategoria }) => {
            return await CategiriaProducto.findByIdAndUpdate(id, { nombreCategoria, descripcionCategoria }, { new: true });
        },
        eliminarCategoriaProducto: async (_, { id }) => {
            const resultado = await CategiriaProducto.findByIdAndDelete(id);
            return resultado !== null; // Devuelve true si se eliminó, false si no
        }
    }
};

module.exports = categoriaProductoResolvers;