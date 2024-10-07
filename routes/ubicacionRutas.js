import express from 'express';
import ubicacionControlador from '../controller/ubicacionControlador.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Ubicaciones
 *   description: Operaciones relacionadas con ubicaciones
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ubicacion:
 *       type: object
 *       required:
 *         - descripcion
 *         - longitud
 *         - latitud
 *       properties:
 *         descripcion:
 *           type: string
 *           description: Descripción de la ubicación
 *         longitud:
 *           type: number
 *           description: Longitud de la ubicación
 *         latitud:
 *           type: number
 *           description: Latitud de la ubicación
 *       example:
 *         descripcion: "Xalapa"
 *         longitud: -96.916015
 *         latitud: 19.543775
 */

/**
 * @swagger
 * /ubicaciones:
 *   post:
 *     tags: [Ubicaciones]
 *     summary: Crear una nueva ubicación
 *     description: Crea una ubicación nueva en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ubicacion'
 *     responses:
 *       201:
 *         description: Ubicación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 ubicacion:
 *                   $ref: '#/components/schemas/Ubicacion'
 *       500:
 *         description: Error al crear ubicación
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
router.post('/', ubicacionControlador.crearUbicacion);

/**
 * @swagger
 * /ubicaciones:
 *   get:
 *     tags: [Ubicaciones]
 *     summary: Obtener todas las ubicaciones
 *     description: Recupera una lista de todas las ubicaciones disponibles.
 *     responses:
 *       200:
 *         description: Lista de ubicaciones obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ubicacion'
 *       500:
 *         description: Error al obtener ubicaciones
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
router.get('/', ubicacionControlador.obtenerUbicaciones);

/**
 * @swagger
 * /ubicaciones/{id}:
 *   get:
 *     tags: [Ubicaciones]
 *     summary: Obtener una ubicación por ID
 *     description: Recupera una ubicación por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la ubicación
 *     responses:
 *       200:
 *         description: Ubicación obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ubicacion'
 *       404:
 *         description: Ubicación no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error al obtener ubicación
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
router.get('/:id', ubicacionControlador.obtenerUbicacionPorId);

/**
 * @swagger
 * /ubicaciones/{id}:
 *   put:
 *     tags: [Ubicaciones]
 *     summary: Actualizar una ubicación por ID
 *     description: Actualiza una ubicación por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la ubicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ubicacion'
 *           example:
 *             descripcion: "Nuevo Nombre"
 *             longitud: -96.916015
 *             latitud: 19.543775
 *     responses:
 *       200:
 *         description: Ubicación actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 ubicacion:
 *                   $ref: '#/components/schemas/Ubicacion'
 *       404:
 *         description: Ubicación no encontrada
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
router.put('/:id', ubicacionControlador.actualizarUbicacion);

/**
 * @swagger
 * /ubicaciones/{id}:
 *   delete:
 *     tags: [Ubicaciones]
 *     summary: Eliminar una ubicación por ID
 *     description: Elimina una ubicación por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la ubicación
 *     responses:
 *       204:
 *         description: Ubicación eliminada exitosamente
 *       404:
 *         description: Ubicación no encontrada
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
router.delete('/:id', ubicacionControlador.eliminarUbicacion);

export default router;
