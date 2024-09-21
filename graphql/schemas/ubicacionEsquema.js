const { gql } = require('apollo-server');

const ubicacionEsquema = gql`
    type Ubicacion {
        id: ID!
        descripcion: String!
        longitud: Float!
        latitud: Float!
    }

    type Query {
        obtenerUbicaciones: [Ubicacion]
        obtenerUbicacionPorId(id: ID!): Ubicacion
    }

    type Mutation {
        crearUbicacion(descripcion: String!, longitud: Float!, latitud: Float!): Ubicacion
        actualizarUbicacion(id: ID!, descripcion: String, longitud: Float, latitud: Float): Ubicacion
        eliminarUbicacion(id: ID!): Boolean
    }
`;

module.exports = ubicacionEsquema;