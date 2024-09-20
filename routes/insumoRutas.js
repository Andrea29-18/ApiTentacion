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
 * /insumos:
 *   post:
 *     tags: [Insumos]
 *     description: Crear un nuevo insumo
 *     responses:
 *       201:
 *         description: Insumo creado
 */
router.post('/', insumoControlador.crearInsumo);

/**
 * @swagger
 * /insumos:
 *   get:
 *     tags: [Insumos]
 *     description: Obtener todos los insumos
 *     responses:
 *       200:
 *         description: Lista de insumos
 */
router.get('/', insumoControlador.obtenerInsumos);

/**
 * @swagger
 * /insumos/{id}:
 *   get:
 *     tags: [Insumos]
 *     description: Obtener un insumo por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del insumo
 *     responses:
 *       200:
 *         description: Insumo encontrado
 */
router.get('/:id', insumoControlador.obtenerInsumoPorId);

/**
 * @swagger
 * /insumos/{id}:
 *   put:
 *     tags: [Insumos]
 *     description: Actualizar un insumo por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del insumo
 *     responses:
 *       200:
 *         description: Insumo actualizado
 */
router.put('/:id', insumoControlador.actualizarInsumo);

/**
 * @swagger
 * /insumos/{id}:
 *   delete:
 *     tags: [Insumos]
 *     description: Eliminar un insumo por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del insumo
 *     responses:
 *       204:
 *         description: Insumo eliminado
 */
router.delete('/:id', insumoControlador.eliminarInsumo);

module.exports = router;