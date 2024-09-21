const Pedido = require('../../models/pedidosModelo');
const Producto = require('../../models/productoModelo');

const pedidoResolvers = {
    Query: {
        obtenerPedidos: async () => {
            try {
                return await Pedido.find().populate('productos');
            } catch (error) {
                throw new Error('Error al obtener los pedidos');
            }
        },
        obtenerPedidoPorId: async (_, { id }) => {
            try {
                const pedido = await Pedido.findById(id).populate('productos');
                if (!pedido) {
                    throw new Error('Pedido no encontrado');
                }
                return pedido;
            } catch (error) {
                throw new Error(error.message);
            }
        }
    },
    Mutation: {
        crearPedido: async (_, { productos }) => {
            try {
                if (!productos || !Array.isArray(productos) || productos.length === 0) {
                    throw new Error('Se requiere una lista de productos.');
                }

                // Buscar los productos en la base de datos
                const productosDB = await Producto.find({ _id: { $in: productos } });

                if (productosDB.length !== productos.length) {
                    throw new Error('Algunos productos no fueron encontrados.');
                }

                // Calcular el precio total
                const precioTotal = productosDB.reduce((total, producto) => total + producto.precioFinal, 0);

                // Crear el nuevo pedido
                const nuevoPedido = new Pedido({
                    productos,
                    precioTotal
                });

                return await nuevoPedido.save();
            } catch (error) {
                throw new Error(error.message);
            }
        },
        actualizarPedido: async (_, { id, productos }) => {
            try {
                if (!productos || !Array.isArray(productos) || productos.length === 0) {
                    throw new Error('Se requiere una lista de productos para actualizar.');
                }

                // Buscar los productos en la base de datos
                const productosDB = await Producto.find({ _id: { $in: productos } });

                if (productosDB.length !== productos.length) {
                    throw new Error('Algunos productos no fueron encontrados.');
                }

                // Calcular el nuevo precio total
                const precioTotal = productosDB.reduce((total, producto) => total + producto.precioFinal, 0);

                // Actualizar el pedido
                const pedidoActualizado = await Pedido.findByIdAndUpdate(
                    id,
                    {
                        productos,
                        precioTotal
                    },
                    { new: true, runValidators: true }
                ).populate('productos');

                if (!pedidoActualizado) {
                    throw new Error('Pedido no encontrado');
                }

                return pedidoActualizado;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        eliminarPedido: async (_, { id }) => {
            try {
                const pedidoEliminado = await Pedido.findByIdAndDelete(id).populate('productos');
                if (!pedidoEliminado) {
                    throw new Error('Pedido no encontrado');
                }
                return true;
            } catch (error) {
                throw new Error(error.message);
            }
        }
    }
};

module.exports = pedidoResolvers;