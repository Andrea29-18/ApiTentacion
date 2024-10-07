import express from 'express';
import productoControlador from '../controller/productoControlador';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Operaciones relacionadas con productos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       required:
 *         - nombreProducto
 *         - cantidadStock
 *         - precioFinal
 *         - fechaVencimiento
 *         - insumos
 *         - catalogoProducto
 *       properties:
 *         nombreProducto:
 *           type: string
 *           description: Nombre del producto
 *         cantidadStock:
 *           type: number
 *           description: Cantidad de stock del producto
 *         precioFinal:
 *           type: number
 *           description: Precio final del producto
 *         fechaVencimiento:
 *           type: string
 *           format: date
 *           description: Fecha de vencimiento del producto
 *         insumos:
 *           type: array
 *           items:
 *             type: string
 *             description: ID de los insumos del producto
 *           description: Lista de insumos utilizados en el producto
 *         catalogoProducto:
 *           type: string
 *           description: ID de la categoría de producto
 *       example:
 *         nombreProducto: "Pan"
 *         cantidadStock: 100
 *         precioFinal: 10
 *         fechaVencimiento: "2022-12-31"
 *         insumos: ["613f6f7b5b3a3b5e7f9b3a6a"]
 *         catalogoProducto: "613f6f7b5b3a3b5e7f9b3a6b"
 */

/**
 * @swagger
 * /productos:
 *   post:
 *     tags: [Productos]
 *     summary: Crear un nuevo producto
 *     description: Crea un producto nuevo en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 producto:
 *                   $ref: '#/components/schemas/Producto'
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
router.post('/', productoControlador.crearProducto);

/**
 * @swagger
 * /productos:
 *   get:
 *     tags: [Productos]
 *     summary: Obtener todos los productos
 *     description: Recupera una lista de todos los productos disponibles.
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
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
router.get('/', productoControlador.obtenerProductos);

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     tags: [Productos]
 *     summary: Obtener un producto por ID
 *     description: Recupera un producto por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
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
router.get('/:id', productoControlador.obtenerProductoPorId);

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     tags: [Productos]
 *     summary: Actualizar un producto por ID
 *     description: Actualiza un producto existente en la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 producto:
 *                   $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
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
router.put('/:id', productoControlador.actualizarProducto);

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     tags: [Productos]
 *     summary: Eliminar un producto por ID
 *     description: Elimina un producto de la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 producto:
 *                   $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
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
router.delete('/:id', productoControlador.eliminarProducto);

export default router;