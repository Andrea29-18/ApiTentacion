const express = require('express');
const { login } = require('../controller/loginControlador');
const { verificarToken, esRol } = require('../middlewares/loginMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para autenticación de usuarios
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     description: Permite a los clientes o administradores iniciar sesión y obtener un token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - contrasena
 *             properties:
 *               usuario:
 *                 type: string
 *                 description: Correo electrónico o usuario del administrador.
 *               contrasena:
 *                 type: string
 *                 description: Contraseña del usuario.
 *           example:
 *             usuario: admin@example.com
 *             contrasena: password123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación.
 *               example:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Faltan datos en la solicitud
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error en el servidor
 */

// Ruta de login
router.post('/', login);

module.exports = router;