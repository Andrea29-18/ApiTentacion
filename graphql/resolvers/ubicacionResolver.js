const Ubicacion = require('../../models/ubicacionModelo');

const ubicacionResolvers = {
    Query: {
        obtenerUbicaciones: async () => {
            return await Ubicacion.find();
        },
        obtenerUbicacionPorId: async (_, { id }) => {
            return await Ubicacion.findById(id);
        }
    },
    Mutation: {
        crearUbicacion: async (_, { descripcion, longitud, latitud }) => {
            const nuevaUbicacion = new Ubicacion({ descripcion, longitud, latitud });
            return await nuevaUbicacion.save();
        },
        actualizarUbicacion: async (_, { id, descripcion, longitud, latitud }) => {
            return await Ubicacion.findByIdAndUpdate(id, { descripcion, longitud, latitud }, { new: true });
        },
        eliminarUbicacion: async (_, { id }) => {
            const resultado = await Ubicacion.findByIdAndDelete(id);
            return resultado !== null; // Devuelve true si se eliminó, false si no
        }
    }
};

module.exports = ubicacionResolvers;