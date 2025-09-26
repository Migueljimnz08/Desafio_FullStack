const express = require('express');
const logsController = require('../controllers/logs.controller');
const router = express.Router();
const protectedRoutes = require('../middlewares/tokenVerification');

// GET http://localhost:3000/api/logs
/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Obtiene todos los logs
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de logs
 *       401:
 *         description: No autenticado
 */
router.get('/', protectedRoutes, logsController.getLogs);

// GET http://localhost:3000/api/logs/details:logId
/**
 * @swagger
 * /api/logs/details:
 *   get:
 *     summary: Obtiene los logs con detalles
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: Lista de logs con detalles
 */
router.get('/details', logsController.getLogsWithDetails);

/**
 * @swagger
 * /api/logs:
 *   put:
 *     summary: Actualiza el estado de un log
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       400:
 *         description: Error en la petición
 *       401:
 *         description: No autenticado
 */
router.put('/', protectedRoutes, logsController.updateStatus);

module.exports = router;