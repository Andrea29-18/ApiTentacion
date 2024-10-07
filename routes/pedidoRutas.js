import express from 'express';
const router = express.Router();
import pedidoControlador from '../controller/pedidoControlador.js';

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Operaciones relacionadas con pedidos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Pedido:
 *       type: object
 *       required:
 *         - productos
 *         - precioTotal
 *       properties:
 *         productos:
 *           type: array
 *           items:
 *             type: string
 *             description: ID del producto
 *           description: Lista de productos incluidos en el pedido
 *         precioTotal:
 *           type: number
 *           description: Precio total del pedido
 *       example:
 *         productos: ["613f6f7b5b3a3b5e7f9b3a6a", "613f6f7b5b3a3b5e7f9b3a6b"]
 *         precioTotal: 40
 */

/**
 * @swagger
 * /pedidos:
 *   post:
 *     tags: [Pedidos]
 *     summary: Crear un nuevo pedido
 *     description: Crea un pedido nuevo en la base de datos calculando el precio total automáticamente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pedido'
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 pedido:
 *                   $ref: '#/components/schemas/Pedido'
 *       400:
 *         description: Solicitud inválida, falta información
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Algunos productos no fueron encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.post('/', pedidoControlador.crearPedido);

/**
 * @swagger
 * /pedidos:
 *   get:
 *     tags: [Pedidos]
 *     summary: Obtener todos los pedidos
 *     description: Recupera una lista de todos los pedidos disponibles.
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.get('/', pedidoControlador.obtenerPedidos);

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     tags: [Pedidos]
 *     summary: Obtener un pedido por ID
 *     description: Recupera un pedido específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       404:
 *         description: Pedido no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.get('/:id', pedidoControlador.obtenerPedidoPorId);

/**
 * @swagger
 * /pedidos/{id}:
 *   put:
 *     tags: [Pedidos]
 *     summary: Actualizar un pedido por ID
 *     description: Actualiza un pedido existente en la base de datos recalculando el precio total automáticamente al actualizar los productos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productos
 *             properties:
 *               productos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de nuevos IDs de productos para incluir en el pedido
 *             example:
 *               productos: ["613f6f7b5b3a3b5e7f9b3a6c", "613f6f7b5b3a3b5e7f9b3a6d"]
 *     responses:
 *       200:
 *         description: Pedido actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 pedido:
 *                   $ref: '#/components/schemas/Pedido'
 *       400:
 *         description: Solicitud inválida, falta información
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Pedido no encontrado o algunos productos no fueron encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.put('/:id', pedidoControlador.actualizarPedido);

/**
 * @swagger
 * /pedidos/{id}:
 *   delete:
 *     tags: [Pedidos]
 *     summary: Eliminar un pedido por ID
 *     description: Elimina un pedido existente de la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 pedido:
 *                   $ref: '#/components/schemas/Pedido'
 *       404:
 *         description: Pedido no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.delete('/:id', pedidoControlador.eliminarPedido);

export default router;
