const express = require('express');
const router = express.Router();
const {
    crearInsumo,
    obtenerInsumos,
    obtenerInsumoPorId,
    actualizarInsumo,
    eliminarInsumo,
    calcularCosteo
} = require('../controller/insumoControlador');

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
 *         id:
 *           type: string
 *           description: ID autogenerado del insumo
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
 *         id: 60d0fe4f5311236168a109ca
 *         nombre: Azúcar
 *         cantidadNeta: 100
 *         precioNeto: 50
 */

/**
 * @swagger
 * tags:
 *   name: Insumos
 *   description: API para la gestión de insumos
 */

/**
 * @swagger
 * /insumos:
 *   post:
 *     summary: Crear un nuevo insumo
 *     tags: [Insumos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Insumo'
 *     responses:
 *       201:
 *         description: Insumo creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Insumo'
 *       500:
 *         description: Error al crear el insumo
 */
router.post('/', crearInsumo);

/**
 * @swagger
 * /insumos:
 *   get:
 *     summary: Obtener todos los insumos
 *     tags: [Insumos]
 *     responses:
 *       200:
 *         description: Lista de todos los insumos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Insumo'
 */
router.get('/', obtenerInsumos);

/**
 * @swagger
 * /insumos/{id}:
 *   get:
 *     summary: Obtener un insumo por ID
 *     tags: [Insumos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del insumo
 *     responses:
 *       200:
 *         description: Insumo obtenido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Insumo'
 *       404:
 *         description: Insumo no encontrado
 *       500:
 *         description: Error al obtener el insumo
 */
router.get('/:id', obtenerInsumoPorId);

/**
 * @swagger
 * /insumos/{id}:
 *   put:
 *     summary: Actualizar un insumo por ID
 *     tags: [Insumos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del insumo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Insumo'
 *     responses:
 *       200:
 *         description: Insumo actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Insumo'
 *       404:
 *         description: Insumo no encontrado
 *       500:
 *         description: Error al actualizar el insumo
 */
router.put('/:id', actualizarInsumo);

/**
 * @swagger
 * /insumos/{id}:
 *   delete:
 *     summary: Eliminar un insumo por ID
 *     tags: [Insumos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del insumo
 *     responses:
 *       200:
 *         description: Insumo eliminado con éxito
 *       404:
 *         description: Insumo no encontrado
 *       500:
 *         description: Error al eliminar el insumo
 */
router.delete('/:id', eliminarInsumo);

/**
 * @swagger
 * /insumos/costeo:
 *   post:
 *     summary: Calcular el costo de los insumos utilizados
 *     tags: [Insumos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               insumosUtilizados:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     insumoId:
 *                       type: string
 *                       description: ID del insumo
 *                     cantidadUtilizada:
 *                       type: number
 *                       description: Cantidad utilizada de ese insumo
 *     responses:
 *       200:
 *         description: Costo total calculado con éxito
 *       404:
 *         description: Insumo no encontrado
 *       500:
 *         description: Error al calcular el costeo
 */
router.post('/costeo', calcularCosteo);

module.exports = router;