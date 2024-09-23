const express = require('express');
const insumoControlador = require('../controller/insumoControlador');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Insumos
 *   description: Operaciones relacionadas con insumos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Insumo:
 *       type: object
 *       required:
 *         - nombre
 *         - cantidadNeta
 *         - precioNeto
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del insumo
 *         cantidadNeta:
 *           type: number
 *           description: Cantidad neta del insumo
 *         precioNeto:
 *           type: number
 *           description: Precio neto del insumo
 *       example:
 *         nombre: "Harina"
 *         cantidadNeta: 50
 *         precioNeto: 20.5
 */

/**
 * @swagger
 * /insumos:
 *   post:
 *     tags: [Insumos]
 *     summary: Crear un nuevo insumo
 *     description: Crea un insumo nuevo en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Insumo'
 *     responses:
 *       201:
 *         description: Insumo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 insumo:
 *                   $ref: '#/components/schemas/Insumo'
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
router.post('/', insumoControlador.crearInsumo);

/**
 * @swagger
 * /insumos:
 *   get:
 *     tags: [Insumos]
 *     summary: Obtener todos los insumos
 *     description: Recupera una lista de todos los insumos disponibles.
 *     responses:
 *       200:
 *         description: Lista de insumos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Insumo'
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
router.get('/', insumoControlador.obtenerInsumos);

/**
 * @swagger
 * /insumos/{id}:
 *   get:
 *     tags: [Insumos]
 *     summary: Obtener un insumo por ID
 *     description: Recupera un insumo específico mediante su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único del insumo
 *     responses:
 *       200:
 *         description: Insumo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Insumo'
 *       404:
 *         description: Insumo no encontrado
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
router.get('/:id', insumoControlador.obtenerInsumoPorId);

/**
 * @swagger
 * /insumos/{id}:
 *   put:
 *     tags: [Insumos]
 *     summary: Actualizar un insumo por ID
 *     description: Actualiza los detalles de un insumo existente mediante su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único del insumo a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Insumo'
 *           example:
 *             nombre: "Harina refinada"
 *             cantidadNeta: 100
 *             precioNeto: 25.0
 *     responses:
 *       200:
 *         description: Insumo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 insumo:
 *                   $ref: '#/components/schemas/Insumo'
 *       404:
 *         description: Insumo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
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
router.put('/:id', insumoControlador.actualizarInsumo);

/**
 * @swagger
 * /insumos/{id}:
 *   delete:
 *     tags: [Insumos]
 *     summary: Eliminar un insumo por ID
 *     description: Elimina un insumo existente mediante su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único del insumo a eliminar
 *     responses:
 *       204:
 *         description: Insumo eliminado exitosamente
 *       404:
 *         description: Insumo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
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
router.delete('/:id', insumoControlador.eliminarInsumo);

module.exports = router;