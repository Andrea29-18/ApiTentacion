const { gql } = require('apollo-server');

const insumoEsquema = gql`
    type Insumo {
        id: ID!
        nombre: String!
        cantidadNeta: Int!
        precioNeto: Float!
    }

    type Query {
        obtenerInsumos: [Insumo]
        obtenerInsumoPorId(id: ID!): Insumo
    }

    type Mutation {
        crearInsumo(nombre: String!, cantidadNeta: Int!, precioNeto: Float!): Insumo
        actualizarInsumo(id: ID!, nombre: String, cantidadNeta: Int, precioNeto: Float): Insumo
        eliminarInsumo(id: ID!): Boolean
    }
`;

module.exports = insumoEsquema;