const Pedido = require('../models/pedidosModelo');
const Producto = require('../models/productoModelo');

// Crear un nuevo pedido
const crearPedido = async (req, res) => {
    try {
        const { productos } = req.body;

        if (!productos || !Array.isArray(productos) || productos.length === 0) {
            return res.status(400).json({ message: 'Se requiere una lista de productos.' });
        }

        // Buscar los productos en la base de datos
        const productosDB = await Producto.find({ _id: { $in: productos } });

        if (productosDB.length !== productos.length) {
            return res.status(404).json({ message: 'Algunos productos no fueron encontrados.' });
        }

        // Calcular el precio total
        const precioTotal = productosDB.reduce((total, producto) => total + producto.precioFinal, 0);

        // Crear el nuevo pedido
        const nuevoPedido = new Pedido({
            productos,
            precioTotal
        });

        await nuevoPedido.save();

        res.status(201).json({ message: 'Pedido creado exitosamente', pedido: nuevoPedido });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el pedido', error: error.message });
    }
};

// Obtener todos los pedidos
const obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find().populate('productos');
        res.status(200).json(pedidos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener pedidos', error: error.message });
    }
};

// Obtener un pedido por ID
const obtenerPedidoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await Pedido.findById(id).populate('productos');
        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.status(200).json(pedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el pedido', error: error.message });
    }
};

// Actualizar un pedido por ID
const actualizarPedido = async (req, res) => {
    const { id } = req.params;
    const { productos } = req.body; // Solo permitimos la actualización de 'productos'

    try {
        if (!productos || !Array.isArray(productos) || productos.length === 0) {
            return res.status(400).json({ message: 'Se requiere una lista de productos para actualizar.' });
        }

        // Buscar los productos actualizados en la base de datos
        const productosDB = await Producto.find({ _id: { $in: productos } });

        if (productosDB.length !== productos.length) {
            return res.status(404).json({ message: 'Algunos productos no fueron encontrados.' });
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
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        res.status(200).json({ message: 'Pedido actualizado exitosamente', pedido: pedidoActualizado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el pedido', error: error.message });
    }
};

// Eliminar un pedido por ID
const eliminarPedido = async (req, res) => {
    const { id } = req.params;
    try {
        const pedidoEliminado = await Pedido.findByIdAndDelete(id).populate('productos');
        if (!pedidoEliminado) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.status(200).json({ message: 'Pedido eliminado exitosamente', pedido: pedidoEliminado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el pedido', error: error.message });
    }
};

module.exports = {
    crearPedido,
    obtenerPedidos,
    obtenerPedidoPorId,
    actualizarPedido,
    eliminarPedido
};