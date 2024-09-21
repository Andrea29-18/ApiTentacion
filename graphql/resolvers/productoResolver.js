const Producto = require('../../models/productoModelo');
const Insumo = require('../../models/insumoModelo');
const CategoriaProducto = require('../../models/categoriaProductoModelo');

const productoResolver = {
    Query: {
        obtenerProductos: async () => {
            try {
                return await Producto.find().populate('insumos').populate('catalogoProducto');
            } catch (error) {
                console.error(error);
                throw new Error('Error al obtener productos');
            }
        },
        obtenerProductoPorId: async (_, { id }) => {
            try {
                const producto = await Producto.findById(id).populate('insumos').populate('catalogoProducto');
                if (!producto) {
                    throw new Error('Producto no encontrado');
                }
                return producto;
            } catch (error) {
                console.error(error);
                throw new Error('Error al obtener el producto');
            }
        }
    },
    Mutation: {
        crearProducto: async (_, { nombreProducto, cantidadStock, precioFinal, fechaVencimiento, insumos, catalogoProducto }) => {
            try {
                const nuevoProducto = new Producto({
                    nombreProducto,
                    cantidadStock,
                    precioFinal,
                    fechaVencimiento,
                    insumos,
                    catalogoProducto
                });
                return await nuevoProducto.save();
            } catch (error) {
                console.error(error);
                throw new Error('Error al crear el producto');
            }
        },
        actualizarProducto: async (_, { id, nombreProducto, cantidadStock, precioFinal, fechaVencimiento, insumos, catalogoProducto }) => {
            try {
                const productoActualizado = await Producto.findByIdAndUpdate(id, {
                    nombreProducto,
                    cantidadStock,
                    precioFinal,
                    fechaVencimiento,
                    insumos,
                    catalogoProducto
                }, { new: true }).populate('insumos').populate('catalogoProducto');

                if (!productoActualizado) {
                    throw new Error('Producto no encontrado');
                }
                return productoActualizado;
            } catch (error) {
                console.error(error);
                throw new Error('Error al actualizar el producto');
            }
        },
        eliminarProducto: async (_, { id }) => {
            try {
                const productoEliminado = await Producto.findByIdAndDelete(id);
                return !!productoEliminado; // Retorna true si se eliminó
            } catch (error) {
                console.error(error);
                throw new Error('Error al eliminar el producto');
            }
        }
    },
    Producto: {
        insumos: async (producto) => {
            try {
                return await Insumo.find({ _id: { $in: producto.insumos } });
            } catch (error) {
                console.error(error);
                throw new Error('Error al obtener insumos');
            }
        },
        catalogoProducto: async (producto) => {
            try {
                return await CategoriaProducto.findById(producto.catalogoProducto);
            } catch (error) {
                console.error(error);
                throw new Error('Error al obtener la categoría del producto');
            }
        }
    }
};

module.exports = productoResolver;