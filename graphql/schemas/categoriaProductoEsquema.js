const { gql } = require('apollo-server-express');

const categoriaProductoEsquema = gql`
    type CategoriaProducto {
        id: ID!
        nombreCategoria: String!
        descripcionCategoria: String!
    }

    type Query {
        obtenerCategoriasProducto: [CategoriaProducto]
        obtenerCategoriaProductoPorId(id: ID!): CategoriaProducto
    }

    type Mutation {
        crearCategoriaProducto(nombreCategoria: String!, descripcionCategoria: String!): CategoriaProducto
        actualizarCategoriaProducto(id: ID!, nombreCategoria: String, descripcionCategoria: String): CategoriaProducto
        eliminarCategoriaProducto(id: ID!): Boolean
    }
`;

module.exports = categoriaProductoEsquema;