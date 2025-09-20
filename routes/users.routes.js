const express = require('express');
const userController = require('../controllers/users.controller');
const router = express.Router();

// RUTAS DE INICIO Y FINAL DE SESION 
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);

module.exports = router;