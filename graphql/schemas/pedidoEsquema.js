const { gql } = require('apollo-server-express'); 

const pedidoEsquema = gql`
    type Pedido {
        id: ID!
        productos: [Producto]!
        precioTotal: Float!
    }

    type Query {
        obtenerPedidos: [Pedido]!
        obtenerPedidoPorId(id: ID!): Pedido
    }

    type Mutation {
        crearPedido(productos: [ID!]!): Pedido!
        actualizarPedido(id: ID!, productos: [ID!]!): Pedido!
        eliminarPedido(id: ID!): Boolean!
    }

    type Producto {
        id: ID!
        nombreProducto: String!
        cantidadStock: Int!
        precioFinal: Float!
        fechaVencimiento: String! # Asegúrate de que está definido como String
    }
`;

module.exports = pedidoEsquema;