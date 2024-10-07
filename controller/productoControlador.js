import Producto from '../models/productoModelo.js';
import Insumo from '../models/insumoModelo.js';
import CategoriaProducto from '../models/categoriaProductoModelo.js';

// Crear un nuevo producto
export const crearProducto = async (req, res) => {
    try {
        const { nombreProducto, cantidadStock, precioFinal, fechaVencimiento, insumos, catalogoProducto } = req.body;

        // Verificar que la categoría de producto exista
        const categoriaExiste = await CategoriaProducto.findById(catalogoProducto);
        if (!categoriaExiste) {
            return res.status(404).json({ message: 'Categoría de producto no encontrada' });
        }

        // Verificar que los insumos existan
        for (let insumoId of insumos) {
            const insumoExiste = await Insumo.findById(insumoId);
            if (!insumoExiste) {
                return res.status(404).json({ message: `Insumo con ID ${insumoId} no encontrado` });
            }
        }

        // Crear el nuevo producto
        const nuevoProducto = new Producto({
            nombreProducto,
            cantidadStock,
            precioFinal,
            fechaVencimiento,
            insumos,
            catalogoProducto
        });

        await nuevoProducto.save();
        res.status(201).json({ message: 'Producto creado', producto: nuevoProducto });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find().populate('insumos catalogoProducto');
        res.status(200).json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
};

// Obtener un producto por ID
export const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id).populate('insumos catalogoProducto');
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
};

// Actualizar un producto por ID
export const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!productoActualizado) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto actualizado', producto: productoActualizado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};

// Eliminar un producto por ID
export const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const productoEliminado = await Producto.findByIdAndDelete(id);
        if (!productoEliminado) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado', producto: productoEliminado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
};

export default {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto
};
