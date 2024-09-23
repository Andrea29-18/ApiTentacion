const CategoriaProducto = require('../models/categoriaProductoModelo');

// Crear una nueva categoria de producto
const crearCategoriaProducto = async (req, res) => {
    try {
        const nuevaCategoriaProducto = new CategoriaProducto(req.body);
        await nuevaCategoriaProducto.save();
        res.status(201).json({ message: 'Categoria de producto creada', categoriaProducto: nuevaCategoriaProducto });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear categoria de producto', error: error.message });
    }
};

// Obtener todas las categorias de producto
const obtenerCategoriasProducto = async (req, res) => {
    try {
        const categoriasProducto = await CategoriaProducto.find();
        res.status(200).json(categoriasProducto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener categorias de producto', error: error.message });
    }
};

// Obtener una categoria de producto por ID
const obtenerCategoriaProductoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const categoriaProducto = await CategoriaProducto.findById(id);
        if (!categoriaProducto) {
            return res.status(404).json({ message: 'Categoria de producto no encontrada' });
        }
        res.status(200).json(categoriaProducto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener categoria de producto', error: error.message });
    }
};

// Actualizar una categoria de producto por ID
const actualizarCategoriaProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const categoriaProductoActualizada = await CategoriaProducto.findByIdAndUpdate(id, req.body, { new: true });
        if (!categoriaProductoActualizada) {
            return res.status(404).json({ message: 'Categoria de producto no encontrada' });
        }
        res.status(200).json({ message: 'Categoria de producto actualizada', categoriaProducto: categoriaProductoActualizada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar categoria de producto', error: error.message });
    }
};

// Eliminar una categoria de producto por ID
const eliminarCategoriaProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const categoriaProductoEliminada = await CategoriaProducto.findByIdAndDelete(id);
        if (!categoriaProductoEliminada) {
            return res.status(404).json({ message: 'Categoria de producto no encontrada' });
        }
        res.status(200).json({ message: 'Categoria de producto eliminada', categoriaProducto: categoriaProductoEliminada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar categoria de producto', error: error.message });
    }
};

module.exports = {
    crearCategoriaProducto,
    obtenerCategoriasProducto,
    obtenerCategoriaProductoPorId,
    actualizarCategoriaProducto,
    eliminarCategoriaProducto
};