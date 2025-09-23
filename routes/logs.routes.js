const express = require('express');
const logsController = require('../controllers/logs.controller');
const router = express.Router();
const protectedRoutes = require('../middlewares/tokenVerification'); 

// GET ALL LOGS
// GET http://localhost:3000/api/logs
// ENDPOINT POR SEVERITY /logs?severity=2

router.get('/', protectedRoutes, logsController.getLogs);

module.exports = router;