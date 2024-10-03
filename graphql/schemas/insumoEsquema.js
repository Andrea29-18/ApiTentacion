const { gql } = require('apollo-server');

const insumoEsquema = gql`
    type Insumo {
        id: ID!
        nombre: String!
        cantidadNeta: Int!
        precioNeto: Float!
    }

    input InsumoInput {
        nombre: String!
        cantidadNeta: Int!
        precioNeto: Float!
    }

    input InsumoUtilizadoInput {
        insumoId: ID!
        cantidadUtilizada: Float!
    }

    type Query {
        obtenerInsumos: [Insumo]
        obtenerInsumoPorId(id: ID!): Insumo
    }

    type Mutation {
        crearInsumo(input: InsumoInput!): Insumo
        actualizarInsumo(id: ID!, input: InsumoInput): Insumo
        eliminarInsumo(id: ID!): Boolean
        calcularCosteo(insumosUtilizados: [InsumoUtilizadoInput!]!): Float
    }
`;

module.exports = insumoEsquema;