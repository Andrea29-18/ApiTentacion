const { gql } = require('apollo-server');

const productoEsquema = gql`
    type Producto {
        id: ID!
        nombreProducto: String!
        cantidadStock: Int!
        precioFinal: Float!
        fechaVencimiento: String!
        insumos: [Insumo]
        catalogoProducto: CategoriaProducto
    }

    type Query {
        obtenerProductos: [Producto]
        obtenerProductoPorId(id: ID!): Producto
    }

    type Mutation {
        crearProducto(nombreProducto: String!, cantidadStock: Int!, precioFinal: Float!, fechaVencimiento: String!, insumos: [ID], catalogoProducto: ID!): Producto
        actualizarProducto(id: ID!, nombreProducto: String, cantidadStock: Int, precioFinal: Float, fechaVencimiento: String, insumos: [ID], catalogoProducto: ID): Producto
        eliminarProducto(id: ID!): Boolean
    }
`;

module.exports = productoEsquema;