const Insumo = require('../models/insumoModelo');

// Crear un nuevo insumo
const crearInsumo = async (req, res) => {
    try {
        const nuevoInsumo = new Insumo(req.body);
        await nuevoInsumo.save();
        res.status(201).json({ message: 'Insumo creado', insumo: nuevoInsumo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear insumo', error: error.message });
    }
};

// Obtener todos los insumos
const obtenerInsumos = async (req, res) => {
    try {
        const insumos = await Insumo.find();
        res.status(200).json(insumos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener insumos', error: error.message });
    }
};

// Obtener un insumo por ID
const obtenerInsumoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const insumo = await Insumo.findById(id);
        if (!insumo) {
            return res.status(404).json({ message: 'Insumo no encontrado' });
        }
        res.status(200).json(insumo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener insumo', error: error.message });
    }
};

// Actualizar un insumo por ID
const actualizarInsumo = async (req, res) => {
    const { id } = req.params;
    try {
        const insumoActualizado = await Insumo.findByIdAndUpdate(id, req.body, { new: true });
        if (!insumoActualizado) {
            return res.status(404).json({ message: 'Insumo no encontrado' });
        }
        res.status(200).json({ message: 'Insumo actualizado', insumo: insumoActualizado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar insumo', error: error.message });
    }
};

// Eliminar un insumo por ID
const eliminarInsumo = async (req, res) => {
    const { id } = req.params;
    try {
        const insumoEliminado = await Insumo.findByIdAndDelete(id);
        if (!insumoEliminado) {
            return res.status(404).json({ message: 'Insumo no encontrado' });
        }
        res.status(200).json({ message: 'Insumo eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar insumo', error: error.message });
    }
};

module.exports = {
    crearInsumo,
    obtenerInsumos,
    obtenerInsumoPorId,
    actualizarInsumo,
    eliminarInsumo,
};