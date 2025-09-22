const express = require('express');
const logsController = require('../controllers/logs.controller');
const router = express.Router();

// GET ALL LOGS
// GET http://localhost:3000/api/logs
router.get('/', logsController.getAllLogs);

module.exports = router;