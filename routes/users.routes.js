const express = require('express');
const userController = require('../controllers/users.controller');
const router = express.Router();

// RUTAS DE INICIO Y FINAL DE SESION 
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Inicia sesión de usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', userController.loginUser);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Cierra la sesión del usuario
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 */
router.post('/logout', userController.logoutUser);

/**
 * @swagger
 * /api/users/userInfo:
 *   get:
 *     summary: Obtiene la información del usuario autenticado
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Información del usuario
 *       401:
 *         description: No autenticado
 */
router.get('/userInfo', userController.getCurrentUser);

module.exports = router;