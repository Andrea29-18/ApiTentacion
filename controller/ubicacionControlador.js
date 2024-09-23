const Ubicacion = require('../models/ubicacionModelo');

// Crear una nueva ubicación
const crearUbicacion = async (req, res) => {
    try {
        const nuevaUbicacion = new Ubicacion(req.body);
        await nuevaUbicacion.save();
        res.status(201).json({ message: 'Ubicación creada', ubicacion: nuevaUbicacion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear ubicación', error: error.message });
    }
};

// Obtener todas las ubicaciones
const obtenerUbicaciones = async (req, res) => {
    try {
        const ubicaciones = await Ubicacion.find();
        res.status(200).json(ubicaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener ubicaciones', error: error.message });
    }
};

// Obtener una ubicación por ID
const obtenerUbicacionPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const ubicacion = await Ubicacion.findById(id);
        if (!ubicacion) {
            return res.status(404).json({ message: 'Ubicación no encontrada' });
        }
        res.status(200).json(ubicacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener ubicación', error: error.message });
    }
};

// Actualizar una ubicación por ID
const actualizarUbicacion = async (req, res) => {
    const { id } = req.params;
    try {
        const ubicacionActualizada = await Ubicacion.findByIdAndUpdate(id, req.body, { new: true });
        if (!ubicacionActualizada) {
            return res.status(404).json({ message: 'Ubicación no encontrada' });
        }
        res.status(200).json({ message: 'Ubicación actualizada', ubicacion: ubicacionActualizada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar ubicación', error: error.message });
    }
};

// Eliminar una ubicación por ID
const eliminarUbicacion = async (req, res) => {
    const { id } = req.params;
    try {
        const ubicacionEliminada = await Ubicacion.findByIdAndDelete(id);
        if (!ubicacionEliminada) {
            return res.status(404).json({ message: 'Ubicación no encontrada' });
        }
        res.status(204).send(); // 204 No Content
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar ubicación', error: error.message });
    }
};

module.exports = {
    crearUbicacion,
    obtenerUbicaciones,
    obtenerUbicacionPorId,
    actualizarUbicacion,
    eliminarUbicacion,
};