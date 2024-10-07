import express from 'express';
const router = express.Router();
import categoriaProductoControlador from '../controller/categoriaProductoControlador';

/**
 * @swagger
 * tags:
 *   name: Categorías de Producto
 *   description: Operaciones relacionadas con las categorías de productos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoriaProducto:
 *       type: object
 *       required:
 *         - nombreCategoria
 *           descripcionCategoria
 *       properties:
 *         nombreCategoria:
 *           type: string
 *           description: Nombre de la categoría de producto
 *         descripcionCategoria:
 *           type: string
 *           description: Descripción de la categoría de producto
 *       example:
 *         nombreCategoria: "Bebidas"
 *         descripcionCategoria: "Bebidas frías y calientes"
 */

/**
 * @swagger
 * /categoriasProducto:
 *   post:
 *     tags: [Categorías de Producto]
 *     summary: Crear una nueva categoría de producto
 *     description: Crea una categoría de producto nueva en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaProducto'
 *     responses:
 *       201:
 *         description: Categoría de producto creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 categoriaProducto:
 *                   $ref: '#/components/schemas/CategoriaProducto'
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
router.post('/', categoriaProductoControlador.crearCategoriaProducto);

/**
 * @swagger
 * /categoriasProducto:
 *   get:
 *     tags: [Categorías de Producto]
 *     summary: Obtener todas las categorías de producto
 *     description: Recupera una lista de todas las categorías de producto disponibles.
 *     responses:
 *       200:
 *         description: Lista de categorías de producto obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CategoriaProducto'
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
router.get('/', categoriaProductoControlador.obtenerCategoriasProducto);

/**
 * @swagger
 * /categoriasProducto/{id}:
 *   get:
 *     tags: [Categorías de Producto]
 *     summary: Obtener una categoría de producto por ID
 *     description: Recupera una categoría de producto específica por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría de producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría de producto obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaProducto'
 *       404:
 *         description: Categoría de producto no encontrada
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
router.get('/:id', categoriaProductoControlador.obtenerCategoriaProductoPorId);

/**
 * @swagger
 * /categoriasProducto/{id}:
 *   put:
 *     tags: [Categorías de Producto]
 *     summary: Actualizar una categoría de producto por ID
 *     description: Actualiza una categoría de producto existente en la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría de producto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaProducto'
 *     responses:
 *       200:
 *         description: Categoría de producto actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 categoriaProducto:
 *                   $ref: '#/components/schemas/CategoriaProducto'
 *       404:
 *         description: Categoría de producto no encontrada
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
router.put('/:id', categoriaProductoControlador.actualizarCategoriaProducto);

/**
 * @swagger
 * /categoriasProducto/{id}:
 *   delete:
 *     tags: [Categorías de Producto]
 *     summary: Eliminar una categoría de producto por ID
 *     description: Elimina una categoría de producto de la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría de producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría de producto eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 categoriaProducto:
 *                   $ref: '#/components/schemas/CategoriaProducto'
 *       404:
 *         description: Categoría de producto no encontrada
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
router.delete('/:id', categoriaProductoControlador.eliminarCategoriaProducto);
export default router;